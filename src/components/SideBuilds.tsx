import { sideBuilds } from '../content/projects'
import { Section } from './Section'

const linkClass = 'font-semibold underline underline-offset-4 decoration-1 hover:decoration-2'

export function SideBuilds() {
  return (
    <Section id="side-builds" title="Side builds" aside="Things I built outside client work. All four are live.">
      <ul className="grid border-l border-t border-rule sm:grid-cols-2">
        {sideBuilds.map((build) => (
          <li key={build.name} className="border-b border-r border-rule p-5">
            <h3 className="font-display text-2xl font-semibold leading-tight">{build.name}</h3>
            <p className="mt-1 max-w-[46ch]">{build.line}</p>
            {build.stack && <p className="mt-2 text-[0.95rem] text-pencil">{build.stack}</p>}
            <p className="mt-4 flex flex-wrap gap-x-5 gap-y-1">
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
    </Section>
  )
}
