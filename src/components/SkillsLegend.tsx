import { certifications } from '../content/certifications'
import { skills } from '../content/skills'
import { Section } from './Section'

export function SkillsLegend() {
  return (
    <Section id="skills" title="Skills" aside="The tools I work with, grouped by where they sit in a system.">
      <dl className="border-t border-rule">
        {skills.map((group) => (
          <div key={group.name} className="grid gap-x-6 gap-y-1 border-b border-rule py-4 md:grid-cols-[12rem_1fr]">
            <dt className="font-display text-xl font-semibold leading-tight">{group.name}</dt>
            <dd className="text-[0.975rem]">{group.items.join(', ')}</dd>
          </div>
        ))}
      </dl>
    </Section>
  )
}

export function Certifications() {
  return (
    <Section
      id="certifications"
      title="Certifications"
      aside="Earned certifications are marked in green. The two still in progress are marked in red."
    >
      <div className="grid gap-x-10 gap-y-8 md:grid-cols-2">
        {certifications.map((group) => (
          <div key={group.name}>
            <h3 className="border-b border-ink pb-2 font-display text-xl font-semibold">{group.name}</h3>
            <ul>
              {group.items.map((cert) => (
                <li key={cert.name} className="flex gap-3 border-b border-rule py-2.5 text-[0.975rem]">
                  <span
                    aria-hidden="true"
                    className={`mt-[0.55em] size-2.5 shrink-0 border ${
                      cert.inProgress ? 'border-redline' : 'border-approved bg-approved'
                    }`}
                  />
                  <span>
                    {cert.name}
                    {(cert.issuer || cert.year) && (
                      <span className="text-pencil"> ({[cert.issuer, cert.year].filter(Boolean).join(', ')})</span>
                    )}
                    {cert.inProgress && <span className="font-semibold text-redline"> In progress</span>}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </Section>
  )
}
