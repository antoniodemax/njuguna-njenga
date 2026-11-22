import { ArrowUpRight, Code } from 'lucide-react'
import { projects, type Project } from '../content/projects'

function ProjectCard({ project }: { project: Project }) {
  return (
    <article>
      <a
        href={project.live}
        target="_blank"
        rel="noreferrer"
        aria-label={`Open ${project.name} live site`}
        className="group block overflow-hidden rounded-3xl border border-line bg-surface transition-transform duration-300 hover:-translate-y-1.5"
      >
        <img
          src={project.image}
          alt={`Screenshot of ${project.name}`}
          width={960}
          height={600}
          loading="lazy"
          decoding="async"
          className="aspect-[16/10] w-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
        />
      </a>
      <div className="mt-5 flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
        <h3 className="font-display text-3xl font-semibold leading-tight">{project.name}</h3>
        <p className="flex items-center gap-2 text-[0.95rem] text-muted">
          <span aria-hidden="true" className="size-2 rounded-full bg-live" />
          {project.status}
        </p>
      </div>
      <p className="mt-2 max-w-[52ch] text-muted">{project.line}</p>
      <div className="mt-4 flex flex-wrap items-center gap-2">
        <a href={project.live} target="_blank" rel="noreferrer" className="btn btn-primary">
          Open live site<span className="sr-only">: {project.name}</span>
          <ArrowUpRight size={17} strokeWidth={2} aria-hidden="true" />
        </a>
        {project.repo && (
          <a href={project.repo} target="_blank" rel="noreferrer" className="btn btn-ghost">
            <Code size={17} strokeWidth={2} aria-hidden="true" />
            Code<span className="sr-only"> for {project.name}</span>
          </a>
        )}
        <span className="ml-1 rounded-full border border-line px-3 py-1 text-[0.9rem] text-muted">
          {project.category}
        </span>
      </div>
    </article>
  )
}

// Phone reading order for each card: heading first, then projects in their listed order.
const phoneOrder = ['order-1', 'order-2', 'order-3', 'order-4', 'order-5', 'order-6', 'order-7', 'order-8']

export function Projects() {
  // Wide screens: two staggered columns, with the heading at the top of the right one.
  // Phones: the same elements in one column (the column wrappers dissolve), ordered by phoneOrder.
  const columns = [0, 1].map((side) => projects.map((project, i) => ({ project, i })).filter(({ i }) => i % 2 === side))

  return (
    <section id="projects" aria-labelledby="projects-title" className="px-5 py-16 sm:px-8 md:py-24">
      <div className="mx-auto flex max-w-[1200px] flex-col gap-14 md:grid md:grid-cols-2 md:gap-x-10 md:gap-y-0 lg:gap-x-16">
        {columns.map((column, side) => (
          <div key={side} className={`contents md:grid md:content-start md:gap-20 ${side === 1 ? 'md:pt-6' : ''}`}>
            {side === 1 && (
              <div className="order-first md:order-none">
                <h2
                  id="projects-title"
                  className="font-display text-[clamp(2.5rem,6vw,4.25rem)] font-bold leading-[0.95] tracking-[-0.01em]"
                >
                  Things I have built
                </h2>
                <p className="mt-4 max-w-[38ch] text-lg text-muted">
                  Six products you can open and use right now. Each one has its live site and, where it is public, its
                  code.
                </p>
              </div>
            )}
            {column.map(({ project, i }) => (
              <div key={project.name} className={`${phoneOrder[i]} md:order-none`}>
                <ProjectCard project={project} />
              </div>
            ))}
          </div>
        ))}
      </div>
    </section>
  )
}
