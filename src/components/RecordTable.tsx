import { education, record } from '../content/record'
import { Section } from './Section'

/** Career history as a compact timeline, newest first. */
export function RecordTable() {
  return (
    <Section id="experience" title="Experience">
      <ol>
        {record.map((entry) => (
          <li
            key={`${entry.company}-${entry.dates}`}
            className="grid gap-x-8 gap-y-1 border-t border-line py-5 md:grid-cols-[11rem_minmax(0,22rem)_1fr]"
          >
            <p className="text-[0.95rem] text-ember">{entry.dates}</p>
            <div>
              <h3 className="font-display text-2xl font-semibold leading-tight">{entry.role}</h3>
              <p className="text-[0.95rem] text-muted">{entry.company}</p>
            </div>
            <p className="max-w-[60ch] text-[0.975rem] text-muted max-md:mt-2">{entry.change}</p>
          </li>
        ))}
        <li className="grid gap-x-8 gap-y-1 border-y border-line py-5 md:grid-cols-[11rem_1fr]">
          <p className="text-[0.95rem] text-ember">{education.dates}</p>
          <div>
            <h3 className="font-display text-2xl font-semibold leading-tight">{education.degree}</h3>
            <p className="text-[0.95rem] text-muted">{education.school}</p>
          </div>
        </li>
      </ol>
    </Section>
  )
}
