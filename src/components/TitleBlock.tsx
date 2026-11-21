import { FileText, Mail, Phone } from 'lucide-react'
import type { ComponentType } from 'react'
import { FaGithub, FaLinkedin, FaWhatsapp } from 'react-icons/fa6'
import { profile } from '../content/profile'
import { Logo } from './Logo'

interface Channel {
  label: string
  value: string
  href: string
  icon: ComponentType<{ size?: number | string; 'aria-hidden'?: boolean | 'true' }>
  external?: boolean
}

const channels: Channel[] = [
  { label: 'Email', value: profile.email, href: `mailto:${profile.email}`, icon: Mail },
  { label: 'Call', value: profile.phone, href: `tel:${profile.phone.replace(/\s/g, '')}`, icon: Phone },
  { label: 'WhatsApp', value: profile.phone, href: profile.whatsapp, icon: FaWhatsapp, external: true },
  { label: 'LinkedIn', value: 'simon-njuguna', href: profile.linkedin, icon: FaLinkedin, external: true },
  { label: 'GitHub', value: 'snjugunanjenga', href: profile.github, icon: FaGithub, external: true },
  { label: 'Full CV', value: 'View CV', href: profile.cv, icon: FileText, external: true },
]

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

      <ul className="grid border-t border-rule sm:grid-cols-2 lg:grid-cols-3">
        {channels.map((channel) => {
          const Icon = channel.icon
          return (
            <li key={channel.label} className="border-b border-r border-rule">
              <a
                href={channel.href}
                {...(channel.external ? { target: '_blank', rel: 'noreferrer' } : {})}
                className="group flex h-full min-h-[4.75rem] items-center gap-4 px-5 py-4 transition-colors duration-200 hover:bg-ink hover:text-sheet sm:px-6"
              >
                <span className="grid size-11 shrink-0 place-items-center border border-ink transition-colors duration-200 group-hover:border-sheet">
                  <Icon size={21} aria-hidden="true" />
                </span>
                <span className="min-w-0">
                  <span className="block text-[0.9rem] text-pencil transition-colors duration-200 group-hover:text-sheet">
                    {channel.label}
                  </span>
                  <span className="block font-display text-xl font-semibold leading-tight [overflow-wrap:anywhere]">
                    {channel.value}
                  </span>
                </span>
              </a>
            </li>
          )
        })}
      </ul>

      <p className="px-5 py-4 text-[0.95rem] text-pencil sm:px-8">
        {profile.name}. {profile.role}, {profile.location}.
      </p>
    </footer>
  )
}
