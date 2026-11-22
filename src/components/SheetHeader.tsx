import { FileText, Menu, X } from 'lucide-react'
import { useEffect, useId, useState } from 'react'
import { profile } from '../content/profile'
import { useActiveSection } from '../hooks/useActiveSection'
import { Logo } from './Logo'

const links = [
  { id: 'about', label: 'About' },
  { id: 'projects', label: 'Projects' },
  { id: 'work', label: 'Work' },
  { id: 'github', label: 'GitHub' },
  { id: 'contact', label: 'Contact' },
]

// Sections without their own nav link count towards the link before them.
const groups: Record<string, string[]> = {
  about: ['about'],
  projects: ['projects'],
  work: ['work', 'experience'],
  github: ['github'],
  contact: ['contact'],
}

export function SheetHeader() {
  const active = useActiveSection(groups)
  const [open, setOpen] = useState(false)
  const menuId = useId()
  const MenuIcon = open ? X : Menu

  useEffect(() => {
    if (!open) return
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  return (
    <header className="glass sticky top-0 z-30 h-[4.5rem] border-x-0! border-t-0! px-5 sm:px-8">
      <div className="mx-auto flex h-full max-w-[1200px] items-center justify-between gap-4">
        <a
          href="#top"
          onClick={() => setOpen(false)}
          className="flex min-h-11 shrink-0 items-center gap-3 font-display text-2xl font-bold"
        >
          <Logo size={34} />
          <span className="max-[419px]:sr-only">{profile.name}</span>
        </a>

        {/* Wide screens: plain text links, the current one underlined in ember */}
        <nav aria-label="Sections" className="hidden lg:block">
          <ul className="flex gap-x-2">
            {links.map((link) => {
              const current = active === link.id
              return (
                <li key={link.id}>
                  <a
                    href={`#${link.id}`}
                    aria-current={current ? 'location' : undefined}
                    className={`flex min-h-11 items-center px-3 font-display text-[1.35rem] font-semibold underline-offset-[10px] transition-colors duration-200 ${
                      current
                        ? 'text-fg underline decoration-ember decoration-[3px]'
                        : 'text-fg/85 decoration-2 hover:text-fg hover:underline hover:decoration-fg/40'
                    }`}
                  >
                    {link.label}
                  </a>
                </li>
              )
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <a href={profile.cv} target="_blank" rel="noreferrer" className="btn btn-primary">
            <FileText size={17} strokeWidth={2} aria-hidden="true" />
            View CV
          </a>
          {/* Phones and tablets: links behind a menu button */}
          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            aria-controls={menuId}
            aria-label={open ? 'Close menu' : 'Open menu'}
            className="grid size-11 shrink-0 cursor-pointer place-items-center rounded-xl border border-line bg-white/5 lg:hidden"
          >
            <MenuIcon size={22} strokeWidth={1.75} aria-hidden="true" />
          </button>
        </div>
      </div>

      {open && (
        <nav
          id={menuId}
          aria-label="Sections"
          className="absolute inset-x-0 top-full border-b border-line bg-surface px-5 py-2 sm:px-8 lg:hidden"
        >
          <ul>
            {links.map((link) => {
              const current = active === link.id
              return (
                <li key={link.id} className="border-b border-line last:border-b-0">
                  <a
                    href={`#${link.id}`}
                    onClick={() => setOpen(false)}
                    aria-current={current ? 'location' : undefined}
                    className={`flex min-h-14 items-center font-display text-2xl font-semibold underline-offset-[8px] ${
                      current ? 'underline decoration-ember decoration-[3px]' : ''
                    }`}
                  >
                    {link.label}
                  </a>
                </li>
              )
            })}
          </ul>
        </nav>
      )}
    </header>
  )
}
