import { Menu, Moon, Sun, X } from 'lucide-react'
import { useEffect, useId, useState } from 'react'
import { profile } from '../content/profile'
import { useActiveSection } from '../hooks/useActiveSection'
import { useTheme } from '../hooks/useTheme'
import { Logo } from './Logo'

const links = [
  { id: 'about', label: 'About' },
  { id: 'projects', label: 'Projects' },
  { id: 'architecture', label: 'Architecture' },
  { id: 'experience', label: 'Experience' },
  { id: 'contact', label: 'Contact' },
]

// Sections without their own nav link count towards the link before them.
const groups: Record<string, string[]> = {
  about: ['about'],
  projects: ['projects'],
  architecture: ['architecture'],
  experience: ['experience', 'skills', 'certifications'],
  contact: ['contact'],
}

const squareButton =
  'grid size-11 shrink-0 cursor-pointer place-items-center border border-ink transition-colors duration-200 hover:bg-ink hover:text-sheet'

export function SheetHeader() {
  const { theme, toggle } = useTheme()
  const active = useActiveSection(groups)
  const [open, setOpen] = useState(false)
  const menuId = useId()
  const ThemeIcon = theme === 'dark' ? Sun : Moon
  const MenuIcon = open ? X : Menu
  const themeLabel = theme === 'dark' ? 'Switch to light sheet' : 'Switch to blueprint'

  useEffect(() => {
    if (!open) return
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  return (
    <header className="sticky top-0 z-20 border-b border-rule bg-sheet">
      <div className="flex items-center justify-between gap-x-3 px-2 py-2 sm:px-8 md:gap-x-6">
        <a
          href="#top"
          onClick={() => setOpen(false)}
          className="flex min-h-11 shrink-0 items-center gap-3 pl-1 font-display text-xl font-bold sm:pl-0"
        >
          <Logo size={26} />
          <span className="max-[359px]:sr-only">{profile.name}</span>
        </a>

        <div className="flex items-center gap-x-2 md:gap-x-3">
          {/* Wide screens: links inline */}
          <nav aria-label="Sections" className="hidden md:block">
            <ul className="flex">
              {links.map((link) => {
                const current = active === link.id
                return (
                  <li key={link.id}>
                    <a
                      href={`#${link.id}`}
                      aria-current={current ? 'location' : undefined}
                      className={`flex min-h-11 items-center px-2.5 font-display text-lg font-semibold underline-offset-[6px] lg:px-3 ${
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

          <button type="button" onClick={toggle} aria-label={themeLabel} title={themeLabel} className={squareButton}>
            <ThemeIcon size={17} strokeWidth={1.75} aria-hidden="true" />
          </button>

          {/* Phones and small tablets: links behind a menu button */}
          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            aria-controls={menuId}
            aria-label={open ? 'Close menu' : 'Open menu'}
            className={`${squareButton} md:hidden`}
          >
            <MenuIcon size={19} strokeWidth={1.75} aria-hidden="true" />
          </button>
        </div>
      </div>

      {open && (
        <nav id={menuId} aria-label="Sections" className="border-t border-rule md:hidden">
          <ul>
            {links.map((link) => {
              const current = active === link.id
              return (
                <li key={link.id} className="border-b border-rule last:border-b-0">
                  <a
                    href={`#${link.id}`}
                    onClick={() => setOpen(false)}
                    aria-current={current ? 'location' : undefined}
                    className={`flex min-h-12 items-center px-4 font-display text-xl font-semibold underline-offset-[6px] sm:px-8 ${
                      current ? 'underline decoration-brand decoration-2' : ''
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
