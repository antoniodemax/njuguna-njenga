import { Download } from 'lucide-react'
import { useInstallPrompt } from '../hooks/useInstallPrompt'

/**
 * "Install app" button. It only appears when the browser says the site can be installed
 * (Chrome and Edge, not already installed), and disappears once it has been.
 */
export function InstallButton() {
  const { canInstall, install } = useInstallPrompt()
  if (!canInstall) return null

  return (
    <button type="button" className="btn btn-ghost cursor-pointer" onClick={() => void install()}>
      <Download size={17} strokeWidth={2} aria-hidden="true" />
      Install app
    </button>
  )
}
