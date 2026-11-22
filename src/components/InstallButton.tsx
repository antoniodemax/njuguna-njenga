import { Download } from 'lucide-react'
import { useEffect, useState } from 'react'

// Chrome's install prompt event. It is not in the standard DOM typings.
interface InstallPromptEvent extends Event {
  prompt: () => Promise<void>
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>
}

/**
 * "Install app" button. It only appears when the browser says the site can be installed
 * (Chrome and Edge, not already installed), and disappears once it has been.
 */
export function InstallButton() {
  const [prompt, setPrompt] = useState<InstallPromptEvent | null>(null)

  useEffect(() => {
    const onPrompt = (event: Event) => {
      event.preventDefault()
      setPrompt(event as InstallPromptEvent)
    }
    const onInstalled = () => setPrompt(null)
    window.addEventListener('beforeinstallprompt', onPrompt)
    window.addEventListener('appinstalled', onInstalled)
    return () => {
      window.removeEventListener('beforeinstallprompt', onPrompt)
      window.removeEventListener('appinstalled', onInstalled)
    }
  }, [])

  if (!prompt) return null

  return (
    <button
      type="button"
      className="btn btn-ghost cursor-pointer"
      onClick={async () => {
        await prompt.prompt()
        await prompt.userChoice
        setPrompt(null)
      }}
    >
      <Download size={17} strokeWidth={2} aria-hidden="true" />
      Install app
    </button>
  )
}
