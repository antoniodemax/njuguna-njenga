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
