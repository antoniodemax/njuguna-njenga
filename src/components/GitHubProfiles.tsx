import { ArrowUpRight } from 'lucide-react'
import { FaGithub } from 'react-icons/fa6'
import { profile } from '../content/profile'
import { Section } from './Section'

export function GitHubProfiles() {
  return (
    <Section
      id="github"
      title="More on GitHub"
      intro="The projects above are a small part of it. Everything else I build, try and learn from is in the open on two profiles."
      className="overflow-hidden"
    >
      <div aria-hidden="true" className="glow left-1/2 top-[30%] h-[62%] w-[78%] -translate-x-1/2 opacity-75" />
      <ul className="relative grid gap-5 md:grid-cols-2">
        {profile.githubProfiles.map((account) => (
          <li key={account.handle}>
            <a
              href={account.url}
              target="_blank"
              rel="noreferrer"
              className="glass group flex h-full flex-col gap-6 rounded-3xl p-7 transition-transform duration-300 hover:-translate-y-1.5 sm:p-9"
            >
              <span className="flex items-start justify-between gap-4">
                <FaGithub size={52} aria-hidden="true" />
                <span className="grid size-12 place-items-center rounded-full bg-ember text-[#1a0d05] transition-transform duration-300 group-hover:rotate-45">
                  <ArrowUpRight size={22} strokeWidth={2.25} aria-hidden="true" />
                </span>
              </span>
              <span>
                <span className="block font-display text-[clamp(1.9rem,4vw,2.75rem)] font-bold leading-none [overflow-wrap:anywhere]">
                  {account.handle}
                </span>
                <span className="mt-3 block max-w-[40ch] text-muted">{account.about}</span>
              </span>
              <span className="mt-auto font-display text-lg font-semibold underline decoration-ember decoration-2 underline-offset-[6px]">
                Open profile<span className="sr-only"> {account.handle} on GitHub</span>
              </span>
            </a>
          </li>
        ))}
      </ul>
    </Section>
  )
}
