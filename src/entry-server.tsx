import { StrictMode } from 'react'
import { renderToString } from 'react-dom/server'
import App from './App.tsx'

export { profileJsonLd, siteUrl } from './seo'

/** Renders the page to HTML at build time so crawlers get real content, not an empty shell. */
export function render() {
  return renderToString(
    <StrictMode>
      <App />
    </StrictMode>,
  )
}
