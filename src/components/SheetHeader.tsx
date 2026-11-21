import { Moon, Sun } from 'lucide-react'
import { profile } from '../content/profile'
import { useActiveSection } from '../hooks/useActiveSection'
import { useTheme } from '../hooks/useTheme'
import { Logo } from './Logo'

const links = [
  { id: 'about', label: 'About', hideOnPhone: true },
  { id: 'systems', label: 'Systems' },
  { id: 'record', label: 'Record' },
  { id: 'skills', label: 'Skills' },
  { id: 'contact', label: 'Contact' },
]

// Sections without their own nav link count towards the link before them.
const groups: Record<string, string[]> = {
  about: ['about'],
  systems: ['systems', 'side-builds'],
  record: ['record'],
  skills: ['skills', 'certifications'],
  contact: ['contact'],
}

export function SheetHeader() {
  const { theme, toggle } = useTheme()
  const active = useActiveSection(groups)
  const Icon = theme === 'dark' ? Sun : Moon
  const toggleLabel = theme === 'dark' ? 'Switch to light sheet' : 'Switch to blueprint'

  return (
    <header className="sticky top-0 z-20 flex items-center justify-between gap-x-2 border-b border-rule bg-sheet px-2 py-2 max-[339px]:flex-wrap sm:gap-x-6 sm:px-8">
      <a href="#top" className="flex min-h-11 shrink-0 items-center gap-3 pl-1 font-display text-xl font-bold sm:pl-0">
        <Logo size={26} />
        <span className="max-sm:sr-only">{profile.name}</span>
      </a>
      <div className="flex items-center gap-x-1 sm:gap-x-3">
        <nav aria-label="Sections">
          <ul className="flex">
            {links.map((link) => {
              const current = active === link.id
              return (
                <li key={link.id} className={'hideOnPhone' in link ? 'max-sm:hidden' : undefined}>
                  <a
                    href={`#${link.id}`}
                    aria-current={current ? 'location' : undefined}
                    className={`flex min-h-11 items-center px-1 font-display text-base font-semibold underline-offset-[6px] sm:px-3 sm:text-lg ${
                      current ? 'underline decoration-brand decoration-2' : 'decoration-1 hover:underline'
                    }`}
                  >
                    {link.label}
                  </a>
                </li>
              )
            })}
          </ul>
        </nav>
        <button
          type="button"
          onClick={toggle}
          aria-label={toggleLabel}
          title={toggleLabel}
          className="grid size-11 shrink-0 cursor-pointer place-items-center border border-ink transition-colors duration-200 hover:bg-ink hover:text-sheet"
        >
          <Icon size={17} strokeWidth={1.75} aria-hidden="true" />
        </button>
      </div>
    </header>
  )
}
