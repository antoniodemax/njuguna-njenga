import { decisions } from '../content/architecture'
import { m365, rova } from '../content/systems'
import { Section } from './Section'
import { SystemDiagram } from './SystemDiagram'

export function Architecture() {
  return (
    <Section
      id="architecture"
      title="Architecture"
      aside="How the systems fit together, and the technical decisions behind them. Select any part of a drawing to read what it did."
    >
      <div className="grid gap-14">
        <SystemDiagram system={rova} />
        <SystemDiagram system={m365} />

        <div>
          <h3 className="font-display text-2xl font-semibold leading-tight">Technical decisions</h3>
          <p className="mb-4 max-w-[60ch] text-[0.95rem] text-pencil">
            One concrete example from my own work for each area I am asked about most.
          </p>
          <dl className="grid border-l border-t border-rule md:grid-cols-2">
            {decisions.map((decision) => (
              <div key={decision.area} className="border-b border-r border-rule p-5">
                <dt className="font-display text-xl font-semibold leading-tight">{decision.area}</dt>
                <dd className="mt-1 max-w-[52ch] text-[0.975rem]">{decision.what}</dd>
                <dd className="mt-2 text-[0.9rem] text-pencil">{decision.where}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </Section>
  )
}
