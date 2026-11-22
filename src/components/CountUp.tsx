import { useEffect, useRef } from 'react'

interface Props {
  value: number
  suffix?: string
  /** Seconds the count takes. */
  duration?: number
  /** Seconds to wait before starting. */
  delay?: number
}

const format = (n: number) => n.toLocaleString('en-US')

/**
 * A number that counts up from zero each time it scrolls into view: on page load if it is
 * already on screen, and again whenever the reader scrolls back to it. The final value is
 * in the HTML from the start, so it is correct without JavaScript and for reduced motion.
 */
export function CountUp({ value, suffix = '', duration = 1.1, delay = 0 }: Props) {
  const ref = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    let frame = 0

    const settle = () => {
      cancelAnimationFrame(frame)
      el.textContent = format(value)
    }

    const play = () => {
      cancelAnimationFrame(frame)
      const start = performance.now() + delay * 1000
      el.textContent = format(0)
      const tick = (now: number) => {
        const t = Math.min(1, Math.max(0, (now - start) / (duration * 1000)))
        // Ease out: fast at first, settling on the final figure.
        const eased = 1 - (1 - t) ** 3
        el.textContent = format(Math.round(value * eased))
        if (t < 1) frame = requestAnimationFrame(tick)
      }
      frame = requestAnimationFrame(tick)
    }

    // Play on entering the screen; settle on leaving, so the next entry starts clean.
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) play()
        else settle()
      },
      { threshold: 0.6 },
    )
    observer.observe(el)

    return () => {
      observer.disconnect()
      settle()
    }
  }, [value, duration, delay])

  return (
    <span className="tabular-nums">
      <span ref={ref}>{format(value)}</span>
      {suffix}
    </span>
  )
}
