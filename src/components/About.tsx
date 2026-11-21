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
    <Section id="about" title="About">
      <div className={portrait ? 'grid items-start gap-x-10 gap-y-8 md:grid-cols-[12.5rem_1fr]' : undefined}>
        {portrait && (
          <figure className="m-0 w-40 md:w-auto">
            <img
              src={portrait}
              alt={`Portrait of ${profile.name}`}
              width={520}
              height={650}
              loading="lazy"
              className="aspect-[4/5] w-full border border-ink object-cover brightness-110 grayscale"
            />
            <figcaption className="mt-2">
              <span className="block font-display text-lg font-semibold leading-tight">{profile.name}</span>
              <span className="block text-[0.9rem] leading-snug text-pencil">{profile.role}</span>
            </figcaption>
          </figure>
        )}
        <div>
          <div className="grid max-w-[66ch] gap-4 text-lg">
            {about.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
          <dl className="mt-8 border-t border-rule">
            {about.facts.map((fact) => (
              <div key={fact.label} className="grid gap-x-6 gap-y-1 border-b border-rule py-3 sm:grid-cols-[8rem_1fr]">
                <dt className="font-display text-xl font-semibold leading-tight">{fact.label}</dt>
                <dd className="text-[0.975rem]">{fact.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </Section>
  )
}
