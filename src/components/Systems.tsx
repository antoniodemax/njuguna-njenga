import { m365, rova } from '../content/systems'
import { Section } from './Section'
import { SystemDiagram } from './SystemDiagram'

export function Systems() {
  return (
    <Section
      id="systems"
      title="Systems"
      aside="Each drawing is a system I architected. Select any part to read what it did."
    >
      <div className="grid gap-14">
        <SystemDiagram system={rova} />
        <SystemDiagram system={m365} />
      </div>
    </Section>
  )
}
