import { useEffect, useState } from 'react'

/**
 * Reports which nav target the reader is currently in. `groups` maps each nav
 * target to the section ids that count as part of it, in page order.
 */
export function useActiveSection(groups: Record<string, string[]>) {
  const [active, setActive] = useState<string | null>(null)

  useEffect(() => {
    const sections = Object.entries(groups).flatMap(([target, ids]) => ids.map((id) => ({ id, target })))
    let frame = 0

    const measure = () => {
      frame = 0
      // The reading line sits a little below the sticky header.
      const line = window.innerHeight * 0.3
      const atBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2
      let current: string | null = null
      for (const { id, target } of sections) {
        const el = document.getElementById(id)
        if (el && el.getBoundingClientRect().top <= line) current = target
      }
      // The last section can be too short to reach the line; the end of the page counts as being in it.
      if (atBottom && sections.length > 0) current = sections[sections.length - 1].target
      setActive(current)
    }

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(measure)
    }

    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      if (frame) cancelAnimationFrame(frame)
    }
  }, [groups])

  return active
}
