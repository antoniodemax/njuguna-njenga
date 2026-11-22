// Runs after the client and server builds. Writes the rendered page, structured
// data, robots.txt and sitemap.xml into dist/.
import { readFile, readdir, rm, writeFile } from 'node:fs/promises'
import { fileURLToPath, pathToFileURL } from 'node:url'
import path from 'node:path'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const dist = path.join(root, 'dist')
const ssrDir = path.join(root, 'dist-ssr')

const { render, profileJsonLd, siteUrl } = await import(pathToFileURL(path.join(ssrDir, 'entry-server.js')).href)

if (!siteUrl) throw new Error('VITE_SITE_URL is not set (see .env); canonical URL, sitemap and share image need it.')

const htmlPath = path.join(dist, 'index.html')
let html = await readFile(htmlPath, 'utf8')

const marker = '<div id="root"></div>'
if (!html.includes(marker)) throw new Error('Could not find the root element in dist/index.html')
html = html.replace(marker, `<div id="root">${render()}</div>`)

// Inline the stylesheet: it is small, and this saves a round trip before first paint.
const cssLink = html.match(/<link rel="stylesheet"[^>]*href="(\/assets\/[^"]+\.css)"[^>]*>/)
if (!cssLink) throw new Error('Could not find the stylesheet link in dist/index.html')
const css = await readFile(path.join(dist, cssLink[1]), 'utf8')
html = html.replace(cssLink[0], () => `<style>${css}</style>`)

// Preload the three fonts used above the fold so the headline does not reflow when they arrive.
const assets = await readdir(path.join(dist, 'assets'))
const preloads = ['barlow-condensed-latin-700-normal', 'barlow-condensed-latin-600-normal', 'barlow-latin-400-normal']
  .map((name) => assets.find((file) => file.startsWith(name) && file.endsWith('.woff2')))
  .filter(Boolean)
  .map((file) => `<link rel="preload" href="/assets/${file}" as="font" type="font/woff2" crossorigin />`)
html = html.replace('<title>', `${preloads.join('\n    ')}\n    <title>`)

// "<" is escaped so nothing in the data can close the script tag early.
const jsonLd = JSON.stringify(profileJsonLd()).replace(/</g, '\\u003c')
html = html.replace('</head>', `  <script type="application/ld+json">${jsonLd}</script>\n  </head>`)

await writeFile(htmlPath, html)

await writeFile(path.join(dist, 'robots.txt'), `User-agent: *\nAllow: /\n\nSitemap: ${siteUrl}/sitemap.xml\n`)

const today = new Date().toISOString().slice(0, 10)
await writeFile(
  path.join(dist, 'sitemap.xml'),
  `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${siteUrl}/</loc>
    <lastmod>${today}</lastmod>
  </url>
</urlset>
`,
)

await rm(ssrDir, { recursive: true, force: true })
console.log(`Prerendered ${siteUrl}/ (${(html.length / 1024).toFixed(1)} kB of HTML), wrote robots.txt and sitemap.xml`)
