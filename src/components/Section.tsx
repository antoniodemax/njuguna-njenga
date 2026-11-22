import type { ReactNode } from 'react'

interface Props {
  id: string
  title: string
  intro?: string
  children: ReactNode
  className?: string
}

/** One band of the page: heading and a line of context, then the content at full width. */
export function Section({ id, title, intro, children, className = '' }: Props) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className={`relative px-5 py-16 sm:px-8 md:py-24 ${className}`}>
      <div className="relative mx-auto max-w-[1200px]">
        <div className="mb-10 max-w-[46rem] md:mb-14">
          <h2
            id={`${id}-title`}
            className="font-display text-[clamp(2.5rem,6vw,4.25rem)] font-bold leading-[0.95] tracking-[-0.01em]"
          >
            {title}
          </h2>
          {intro && <p className="mt-4 text-lg text-muted">{intro}</p>}
        </div>
        {children}
      </div>
    </section>
  )
}
