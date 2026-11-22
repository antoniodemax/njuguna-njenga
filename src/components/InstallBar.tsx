import { Share, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { profile } from '../content/profile'
import { useInstallPrompt } from '../hooks/useInstallPrompt'

const DISMISSED_KEY = 'install-bar-dismissed'
/** Seconds after page load before the bar appears, so it never interrupts the first look. */
const DELAY_SECONDS = 4

type Device = 'ios' | 'other'

/** What kind of phone this is, or null when the bar should not be offered at all. */
function eligibleDevice(): Device | null {
  const standalone =
    window.matchMedia('(display-mode: standalone)').matches ||
    (navigator as Navigator & { standalone?: boolean }).standalone === true
  if (standalone) return null // already installed and running as an app
  if (!window.matchMedia('(max-width: 767px)').matches) return null // phones only
  try {
    if (localStorage.getItem(DISMISSED_KEY)) return null
  } catch {
    // Storage unavailable (private mode): still offer it for this visit.
  }
  // iPads report themselves as Macs, hence the touch check.
  const ios =
    /iPhone|iPad|iPod/.test(navigator.userAgent) ||
    (navigator.userAgent.includes('Macintosh') && navigator.maxTouchPoints > 1)
  return ios ? 'ios' : 'other'
}

/**
 * A small bar at the bottom of the screen on phones, offering to install the site.
 * Android: an Install button that opens the browser's install dialog.
 * iPhone: the two steps to do it by hand, because Apple does not let a site trigger it.
 * It can be closed, and stays away once closed or installed.
 */
export function InstallBar() {
  const { canInstall, install } = useInstallPrompt()
  const [device, setDevice] = useState<Device | null>(null)

  useEffect(() => {
    const timer = window.setTimeout(() => setDevice(eligibleDevice()), DELAY_SECONDS * 1000)
    return () => window.clearTimeout(timer)
  }, [])

  const dismiss = () => {
    setDevice(null)
    try {
      localStorage.setItem(DISMISSED_KEY, '1')
    } catch {
      // Storage unavailable: it is hidden for this visit at least.
    }
  }

  // On Android there is nothing to offer until the browser says the site is installable.
  if (!device || (device === 'other' && !canInstall)) return null

  return (
    <aside
      aria-label="Install this site as an app"
      className="install-bar glass fixed inset-x-3 bottom-3 z-40 flex items-center gap-3 rounded-2xl bg-surface/95 p-3"
    >
      <img src="/icon-192.png" alt="" width={44} height={44} className="size-11 shrink-0 rounded-xl" />
      <div className="min-w-0 flex-1 leading-snug">
        <p className="font-display text-lg font-semibold leading-tight">{profile.name}</p>
        {device === 'ios' ? (
          <p className="text-[0.9rem] text-muted">
            To install, tap <Share size={15} strokeWidth={2} aria-label="Share" className="inline align-[-2px] text-fg" />{' '}
            then <span className="text-fg">Add to Home Screen</span>.
          </p>
        ) : (
          <p className="text-[0.9rem] text-muted">Install this portfolio as an app.</p>
        )}
      </div>
      {device === 'other' && (
        <button
          type="button"
          className="btn btn-primary shrink-0 cursor-pointer px-4"
          onClick={async () => {
            if (await install()) dismiss()
          }}
        >
          Install
        </button>
      )}
      <button
        type="button"
        onClick={dismiss}
        aria-label="Close"
        className="grid size-11 shrink-0 cursor-pointer place-items-center rounded-xl text-muted hover:bg-white/10 hover:text-fg"
      >
        <X size={20} strokeWidth={2} aria-hidden="true" />
      </button>
    </aside>
  )
}
