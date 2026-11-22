import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
// Latin subsets only: the site is in English, so the other scripts are never needed.
import '@fontsource/barlow/latin-400.css'
import '@fontsource/barlow/latin-600.css'
import '@fontsource/barlow-condensed/latin-600.css'
import '@fontsource/barlow-condensed/latin-700.css'
import './index.css'
import App from './App.tsx'

const root = document.getElementById('root')!
const app = (
  <StrictMode>
    <App />
  </StrictMode>
)

// The production build ships prerendered HTML, which React takes over; in dev the root is empty.
if (root.hasChildNodes()) hydrateRoot(root, app)
else createRoot(root).render(app)

// Production only: save the site on the device so it opens instantly, works offline and
// can be installed as an app. Registered after load so it never competes with the first paint.
if (import.meta.env.PROD && 'serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js').catch((error) => {
      // The site works without it, but say so in the console rather than fail silently.
      console.warn('Offline support could not be set up:', error)
    })
  })
}
