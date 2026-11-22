import { about } from '../content/about'
import { profile } from '../content/profile'
import { Section } from './Section'

// The portrait is optional: drop a file named njuguna-njenga.(jpg|jpeg|png|webp)
// into src/assets and it appears. Without one, the section is text only.
const portraits = import.meta.glob<string>('../assets/njuguna-njenga.{jpg,jpeg,png,webp}', {
  eager: true,
  query: '?url',
  import: 'default',
})
const portrait = Object.values(portraits)[0]

export function About() {
  return (
    <Section id="about" title="About me">
      <div className={portrait ? 'grid items-start gap-x-14 gap-y-10 md:grid-cols-[17rem_1fr]' : undefined}>
        {portrait && (
          <figure className="m-0 w-48 md:w-auto">
            <img
              src={portrait}
              alt={`Portrait of ${profile.name}`}
              width={520}
              height={650}
              loading="lazy"
              decoding="async"
              className="aspect-[4/5] w-full rounded-3xl border border-line object-cover"
            />
            <figcaption className="mt-3">
              <span className="block font-display text-xl font-semibold leading-tight">{profile.name}</span>
              <span className="block text-[0.95rem] leading-snug text-muted">{profile.role}</span>
            </figcaption>
          </figure>
        )}
        <div>
          <p className="max-w-[30ch] font-display text-[clamp(1.75rem,3.4vw,2.5rem)] font-semibold leading-[1.1]">
            {about.paragraphs[0]}
          </p>
          <div className="mt-6 grid max-w-[64ch] gap-4 text-lg text-muted">
            {about.paragraphs.slice(1).map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
          <dl className="mt-9 grid gap-x-8 gap-y-5 sm:grid-cols-3">
            {about.facts.map((fact) => (
              <div key={fact.label} className="border-t border-line pt-4">
                <dt className="text-[0.95rem] text-ember">{fact.label}</dt>
                <dd className="mt-1 font-display text-xl font-semibold leading-snug">{fact.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </Section>
  )
}
