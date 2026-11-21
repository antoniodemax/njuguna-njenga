import { useCallback, useSyncExternalStore } from 'react'

export type Theme = 'light' | 'dark'

const STORAGE_KEY = 'theme'
const listeners = new Set<() => void>()

function subscribe(listener: () => void) {
  listeners.add(listener)
  return () => listeners.delete(listener)
}

// index.html sets data-theme before first paint (saved choice, else system setting).
function getTheme(): Theme {
  return document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light'
}

// The prerendered HTML is always the light sheet; the real theme applies on hydration.
function getServerTheme(): Theme {
  return 'light'
}

export function useTheme() {
  const theme = useSyncExternalStore(subscribe, getTheme, getServerTheme)

  const toggle = useCallback(() => {
    const next: Theme = getTheme() === 'dark' ? 'light' : 'dark'
    document.documentElement.dataset.theme = next
    try {
      localStorage.setItem(STORAGE_KEY, next)
    } catch {
      // Storage can be unavailable (private mode); the toggle still works for this visit.
    }
    listeners.forEach((listener) => listener())
  }, [])

  return { theme, toggle }
}
