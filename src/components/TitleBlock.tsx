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
  { label: 'GitHub', value: profile.githubProfiles[0].handle, href: profile.github, icon: FaGithub, external: true },
  { label: 'Full CV', value: 'View CV', href: profile.cv, icon: FileText, external: true },
]

/** Contact section and page footer. */
export function TitleBlock() {
  return (
    <footer id="contact" aria-labelledby="contact-title" className="relative overflow-hidden px-5 pt-16 sm:px-8 md:pt-24">
      <div aria-hidden="true" className="glow bottom-[-40%] left-1/2 h-[95%] w-[95%] -translate-x-1/2" />
      <div className="relative mx-auto max-w-[1200px]">
        <h2
          id="contact-title"
          className="max-w-[14ch] font-display text-[clamp(2.75rem,8vw,5.5rem)] font-bold leading-[0.92] tracking-[-0.01em]"
        >
          Have a system that needs building?
        </h2>
        <p className="mt-5 max-w-[46ch] text-lg text-muted">
          I am open to senior AI engineering and architecture work, remote from Nairobi. Email is the fastest way to
          reach me.
        </p>

        <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {channels.map((channel) => {
            const Icon = channel.icon
            return (
              <li key={channel.label}>
                <a
                  href={channel.href}
                  {...(channel.external ? { target: '_blank', rel: 'noreferrer' } : {})}
                  className="glass group flex h-full min-h-[5.25rem] items-center gap-4 rounded-3xl px-5 py-4 transition-transform duration-300 hover:-translate-y-1"
                >
                  <span className="grid size-12 shrink-0 place-items-center rounded-full border border-line bg-white/5 transition-colors duration-200 group-hover:border-ember group-hover:bg-ember group-hover:text-[#1a0d05]">
                    <Icon size={21} aria-hidden="true" />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-[0.9rem] text-muted">{channel.label}</span>
                    <span className="block font-display text-xl font-semibold leading-tight [overflow-wrap:anywhere]">
                      {channel.value}
                    </span>
                  </span>
                </a>
              </li>
            )
          })}
        </ul>

        <div className="mt-14 flex flex-wrap items-center justify-between gap-4 border-t border-line py-6 text-[0.95rem] text-muted">
          <p className="flex items-center gap-3 text-fg">
            <Logo size={18} />
            <span className="font-display text-lg font-semibold">{profile.name}</span>
          </p>
          <p>
            {profile.role}, {profile.location}
          </p>
        </div>
      </div>
    </footer>
  )
}
