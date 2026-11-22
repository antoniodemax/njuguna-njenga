import { useSyncExternalStore } from 'react'

// Chrome's install prompt event. It is not in the standard DOM typings.
interface InstallPromptEvent extends Event {
  prompt: () => Promise<void>
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>
}

// The browser fires its "this site can be installed" event once, early, so it is caught
// here at module level and shared by everything that offers an install.
let promptEvent: InstallPromptEvent | null = null
const listeners = new Set<() => void>()
const notify = () => listeners.forEach((listener) => listener())

if (typeof window !== 'undefined') {
  window.addEventListener('beforeinstallprompt', (event) => {
    // Hold the browser's own prompt so the site can offer the install at a sensible moment.
    event.preventDefault()
    promptEvent = event as InstallPromptEvent
    notify()
  })
  window.addEventListener('appinstalled', () => {
    promptEvent = null
    notify()
  })
}

function subscribe(listener: () => void) {
  listeners.add(listener)
  return () => listeners.delete(listener)
}

async function install() {
  const event = promptEvent
  if (!event) return false
  await event.prompt()
  const { outcome } = await event.userChoice
  // The event can only be used once.
  promptEvent = null
  notify()
  return outcome === 'accepted'
}

/** Whether the browser will let this site be installed right now, and a way to ask. */
export function useInstallPrompt() {
  const canInstall = useSyncExternalStore(
    subscribe,
    () => promptEvent !== null,
    () => false,
  )
  return { canInstall, install }
}
