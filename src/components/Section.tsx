import type { ReactNode } from 'react'

interface Props {
  id: string
  title: string
  aside?: string
  children: ReactNode
}

/** One band of the sheet: title in the left margin, content on the drawing area. */
export function Section({ id, title, aside, children }: Props) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-title`}
      className="grid gap-x-8 gap-y-6 border-t border-rule px-5 py-12 sm:px-8 lg:grid-cols-12 lg:py-16"
    >
      <div className="lg:col-span-3">
        <h2 id={`${id}-title`} className="font-display text-4xl font-bold leading-none">
          {title}
        </h2>
        {aside && <p className="mt-3 max-w-[34ch] text-[0.95rem] text-pencil">{aside}</p>}
      </div>
      <div className="min-w-0 lg:col-span-9">{children}</div>
    </section>
  )
}
