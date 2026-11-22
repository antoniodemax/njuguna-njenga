import { clientResults } from '../content/projects'
import { wfp } from '../content/systems'
import { Section } from './Section'
import { SystemDiagram } from './SystemDiagram'

export function ClientWork() {
  return (
    <Section
      id="work"
      title="Client work"
      intro="Alongside my own products, I architect systems for organisations. Here is one of them, before and after."
    >
      <div className="glass rounded-3xl p-5 sm:p-8">
        <SystemDiagram system={wfp} drawOnLoad />
      </div>
      <ul className="mt-10 grid gap-x-10 gap-y-8 md:grid-cols-3">
        {clientResults.map((item) => (
          <li key={item.name} className="border-t border-line pt-5">
            <h3 className="font-display text-2xl font-semibold leading-tight">{item.name}</h3>
            <p className="text-[0.95rem] text-ember">{item.client}</p>
            <p className="mt-3 text-muted">{item.result}</p>
          </li>
        ))}
      </ul>
    </Section>
  )
}
