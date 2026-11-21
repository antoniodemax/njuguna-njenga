import { profile } from '../content/profile'
import { Logo } from './Logo'

const cell = 'border-b border-r border-rule px-5 py-4 sm:px-6'
const label = 'block text-[0.9rem] text-pencil'
const value = 'block font-display text-xl font-semibold leading-tight'
const link = `${value} underline underline-offset-4 decoration-1 hover:decoration-2 break-words`

/** The drawing's title block doubles as the contact section. */
export function TitleBlock() {
  return (
    <footer id="contact" aria-labelledby="contact-title" className="border-t border-ink">
      <div className="flex flex-wrap items-center justify-between gap-8 px-5 py-10 sm:px-8">
        <div>
          <h2 id="contact-title" className="font-display text-4xl font-bold leading-none">
            Contact
          </h2>
          <p className="mt-3 max-w-[52ch]">
            Open to senior AI engineering and architecture work, remote from Nairobi. Email is the fastest way to
            reach me.
          </p>
        </div>
        <Logo size={132} construction className="shrink-0" />
      </div>
      <dl className="grid border-t border-rule sm:grid-cols-2 lg:grid-cols-4">
        <div className={`${cell} sm:col-span-2`}>
          <dt className={label}>Drawn by</dt>
          <dd className={value}>{profile.name}</dd>
          <dd className="text-[0.95rem]">
            {profile.role}, {profile.location}
          </dd>
        </div>
        <div className={`${cell} sm:col-span-2`}>
          <dt className={label}>Email</dt>
          <dd>
            <a href={`mailto:${profile.email}`} className={link}>
              {profile.email}
            </a>
          </dd>
        </div>
        <div className={cell}>
          <dt className={label}>Phone</dt>
          <dd>
            <a href={`tel:${profile.phone.replace(/\s/g, '')}`} className={link}>
              {profile.phone}
            </a>
          </dd>
        </div>
        <div className={cell}>
          <dt className={label}>LinkedIn</dt>
          <dd>
            <a href={profile.linkedin} target="_blank" rel="noreferrer" className={link}>
              simon-njuguna
            </a>
          </dd>
        </div>
        <div className={cell}>
          <dt className={label}>GitHub</dt>
          <dd>
            <a href={profile.github} target="_blank" rel="noreferrer" className={link}>
              snjugunanjenga
            </a>
          </dd>
        </div>
        <div className={cell}>
          <dt className={label}>Full CV</dt>
          <dd>
            <a href={profile.cv} target="_blank" rel="noreferrer" className={link}>
              View CV
            </a>
          </dd>
        </div>
      </dl>
    </footer>
  )
}
