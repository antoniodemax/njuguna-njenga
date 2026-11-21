import { ArrowUpRight, Code, Workflow } from 'lucide-react'
import type { ReactNode } from 'react'
import { caseStudies, sideBuilds, statusLabels, type ProjectStatus } from '../content/projects'
import { Section } from './Section'

const button =
  'inline-flex min-h-11 items-center gap-2 rounded-[2px] border border-ink px-4 font-display text-base font-semibold whitespace-nowrap transition-colors duration-200'
const primary = `${button} bg-ink text-sheet hover:opacity-85`
const secondary = `${button} hover:bg-ink hover:text-sheet`

/** Filled green = shipped work. Outlined = prototype or demo. The label always says which. */
function Status({ status }: { status: ProjectStatus }) {
  const shipped = status === 'production' || status === 'completed'
  return (
    <span className="inline-flex items-center gap-2 whitespace-nowrap text-[0.95rem] font-semibold">
      <span
        aria-hidden="true"
        className={`size-2.5 shrink-0 border ${shipped ? 'border-approved bg-approved' : 'border-ink'}`}
      />
      {statusLabels[status]}
    </span>
  )
}

function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="border-t border-rule py-4 md:px-5 md:odd:pl-0 md:even:border-l md:even:pr-0">
      <dt className="font-display text-lg font-semibold leading-tight">{label}</dt>
      <dd className="mt-1 max-w-[58ch] text-[0.975rem]">{children}</dd>
    </div>
  )
}

export function Projects() {
  return (
    <Section
      id="projects"
      title="Projects"
      aside="Three systems I architected for clients, then four things I built on my own. Every project has its link at the top."
    >
      <div className="grid gap-14">
        {caseStudies.map((study) => (
          <article key={study.id} aria-labelledby={`project-${study.id}`} className="border-t-2 border-ink">
            <header className="flex flex-wrap items-center justify-between gap-x-6 gap-y-3 py-4">
              <div>
                <h3 id={`project-${study.id}`} className="font-display text-[1.75rem] font-semibold leading-tight">
                  {study.name}
                </h3>
                <p className="flex flex-wrap items-center gap-x-4 gap-y-1 text-[0.95rem] text-pencil">
                  <span>
                    {study.category}, {study.period}
                  </span>
                  <span className="text-ink">
                    <Status status={study.status} />
                  </span>
                </p>
              </div>
              <a href={study.diagram} className={primary}>
                <Workflow size={17} strokeWidth={1.75} aria-hidden="true" />
                View system diagram<span className="sr-only"> for {study.name}</span>
              </a>
            </header>
            <dl className="grid border-b border-rule md:grid-cols-2">
              <Field label="Problem">{study.problem}</Field>
              <Field label="System designed">{study.system}</Field>
              <Field label="Architecture and decisions">
                <ul className="grid gap-1.5">
                  {study.decisions.map((decision) => (
                    <li key={decision} className="flex gap-2.5">
                      <span aria-hidden="true" className="mt-[0.7em] h-px w-3 shrink-0 bg-ink" />
                      <span>{decision}</span>
                    </li>
                  ))}
                </ul>
              </Field>
              <Field label="Outcome">{study.outcome}</Field>
            </dl>
          </article>
        ))}

        <div>
          <h3 className="font-display text-[1.75rem] font-semibold leading-tight">Side builds</h3>
          <p className="mb-4 max-w-[60ch] text-[0.95rem] text-pencil">
            Built outside client work. Each one has a live demo; none is presented as a production system.
          </p>
          <ul className="border-t-2 border-ink">
            {sideBuilds.map((build) => (
              <li
                key={build.name}
                className="flex flex-wrap items-center justify-between gap-x-8 gap-y-3 border-b border-rule py-4"
              >
                <div className="min-w-0 flex-1 basis-72">
                  <h4 className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
                    <span className="font-display text-xl font-semibold leading-tight">{build.name}</span>
                    <Status status={build.status} />
                  </h4>
                  <p className="max-w-[56ch]">{build.line}</p>
                  <p className="text-[0.95rem] text-pencil">
                    {[build.category, build.stack].filter(Boolean).join('. Built with ')}
                  </p>
                </div>
                <p className="flex flex-wrap gap-2">
                  <a href={build.demo} target="_blank" rel="noreferrer" className={primary}>
                    Live demo<span className="sr-only"> of {build.name}</span>
                    <ArrowUpRight size={17} strokeWidth={1.75} aria-hidden="true" />
                  </a>
                  {build.repo && (
                    <a href={build.repo} target="_blank" rel="noreferrer" className={secondary}>
                      <Code size={17} strokeWidth={1.75} aria-hidden="true" />
                      Code<span className="sr-only"> for {build.name}</span>
                    </a>
                  )}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  )
}
