import { ChevronDown } from 'lucide-react'
import type { ReactNode } from 'react'
import { certifications } from '../content/certifications'
import { skills } from '../content/skills'

const certCount = certifications.reduce((total, group) => total + group.items.length, 0)

/** A fold-out panel. The content stays in the page (and in search results) while closed. */
function Disclosure({ title, hint, children }: { title: string; hint: string; children: ReactNode }) {
  return (
    <details className="glass group rounded-3xl">
      <summary className="flex min-h-16 cursor-pointer list-none items-center justify-between gap-4 rounded-3xl px-6 py-4 sm:px-8 [&::-webkit-details-marker]:hidden">
        <span>
          <span className="block font-display text-2xl font-semibold leading-tight">{title}</span>
          <span className="block text-[0.95rem] text-muted">{hint}</span>
        </span>
        <span className="grid size-11 shrink-0 place-items-center rounded-full border border-line transition-transform duration-300 group-open:rotate-180">
          <ChevronDown size={20} strokeWidth={2} aria-hidden="true" />
        </span>
      </summary>
      <div className="px-6 pb-7 sm:px-8">{children}</div>
    </details>
  )
}

export function SkillsAndCertifications() {
  return (
    <section aria-label="Skills and certifications" className="px-5 pb-16 sm:px-8 md:pb-24">
      <div className="mx-auto grid max-w-[1200px] gap-4">
        <Disclosure title="Skills" hint={`${skills.length} areas, from AI and ML to data engineering`}>
          <dl>
            {skills.map((group) => (
              <div key={group.name} className="grid gap-x-6 gap-y-1 border-t border-line py-4 md:grid-cols-[13rem_1fr]">
                <dt className="font-display text-xl font-semibold leading-tight">{group.name}</dt>
                <dd className="text-[0.975rem] text-muted">{group.items.join(', ')}</dd>
              </div>
            ))}
          </dl>
        </Disclosure>

        <Disclosure title="Certifications and awards" hint={`${certCount} in total, two still in progress`}>
          <div className="grid gap-x-10 gap-y-8 md:grid-cols-2">
            {certifications.map((group) => (
              <div key={group.name}>
                <h3 className="border-b border-line pb-2 font-display text-xl font-semibold">{group.name}</h3>
                <ul>
                  {group.items.map((cert) => (
                    <li key={cert.name} className="flex gap-3 border-b border-line py-2.5 text-[0.975rem]">
                      <span
                        aria-hidden="true"
                        className={`mt-[0.55em] size-2.5 shrink-0 rounded-full border ${
                          cert.inProgress ? 'border-ember' : 'border-live bg-live'
                        }`}
                      />
                      <span>
                        {cert.name}
                        {(cert.issuer || cert.year) && (
                          <span className="text-muted"> ({[cert.issuer, cert.year].filter(Boolean).join(', ')})</span>
                        )}
                        {cert.inProgress && <span className="font-semibold text-ember"> In progress</span>}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Disclosure>
      </div>
    </section>
  )
}
