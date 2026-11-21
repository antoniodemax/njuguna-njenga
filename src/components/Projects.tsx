import { caseStudies, sideBuilds, statusLabels, type ProjectStatus } from '../content/projects'
import { Section } from './Section'

const linkClass =
  'inline-flex min-h-11 items-center font-semibold underline underline-offset-4 decoration-1 hover:decoration-2'

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

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="grid gap-x-6 gap-y-1 border-t border-rule py-3 md:grid-cols-[11rem_1fr]">
      <dt className="font-display text-lg font-semibold leading-tight">{label}</dt>
      <dd className="max-w-[68ch] text-[0.975rem]">{children}</dd>
    </div>
  )
}

export function Projects() {
  return (
    <Section
      id="projects"
      title="Projects"
      aside="Three systems I architected for clients, written up as case studies, then four things I built on my own."
    >
      <div className="grid gap-12">
        {caseStudies.map((study) => (
          <article key={study.id} aria-labelledby={`project-${study.id}`}>
            <header className="flex flex-wrap items-start justify-between gap-x-6 gap-y-2 border-t border-ink pb-4 pt-3">
              <div>
                <h3 id={`project-${study.id}`} className="font-display text-2xl font-semibold leading-tight">
                  {study.name}
                </h3>
                <p className="text-[0.95rem] text-pencil">
                  {study.category}, {study.period}
                </p>
              </div>
              <Status status={study.status} />
            </header>
            <dl>
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
            <p className="border-t border-rule">
              <a href={study.diagram} className={linkClass}>
                See the system diagram<span className="sr-only"> for {study.name}</span>
              </a>
            </p>
          </article>
        ))}

        <div>
          <h3 className="font-display text-2xl font-semibold leading-tight">Side builds</h3>
          <p className="mb-4 max-w-[60ch] text-[0.95rem] text-pencil">
            Built outside client work. Each one has a live demo; none is presented as a production system.
          </p>
          <ul className="grid border-l border-t border-rule sm:grid-cols-2">
            {sideBuilds.map((build) => (
              <li key={build.name} className="border-b border-r border-rule p-5">
                <div className="flex flex-wrap items-start justify-between gap-x-4 gap-y-1">
                  <h4 className="font-display text-xl font-semibold leading-tight">{build.name}</h4>
                  <Status status={build.status} />
                </div>
                <p className="text-[0.95rem] text-pencil">{build.category}</p>
                <p className="mt-2 max-w-[46ch]">{build.line}</p>
                {build.stack && <p className="mt-1 text-[0.95rem] text-pencil">{build.stack}</p>}
                <p className="mt-2 flex flex-wrap gap-x-6">
                  <a href={build.demo} target="_blank" rel="noreferrer" className={linkClass}>
                    Open the live demo<span className="sr-only"> of {build.name}</span>
                  </a>
                  {build.repo && (
                    <a href={build.repo} target="_blank" rel="noreferrer" className={linkClass}>
                      Read the code<span className="sr-only"> for {build.name}</span>
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
