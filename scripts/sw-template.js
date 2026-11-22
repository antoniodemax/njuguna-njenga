// Service worker. Generated into dist/sw.js at build time: the version and the list of
// files to save are filled in by scripts/prerender.mjs.
//
// What it does:
// - Saves the page and its files on the device at first visit, so later visits open
//   instantly and the site still opens with no connection.
// - Pages: tries the network first, so a new deployment shows up straight away. If the
//   network has not answered within two seconds, or there is no connection, it shows
//   the saved copy instead and refreshes it in the background.
// - Fingerprinted files under /assets/: served from the saved copy (their names change
//   whenever their content does, so a saved copy is never stale).
// - Everything else on this site: saved copy first, refreshed in the background.
const VERSION = '__VERSION__'
const CACHE = `site-${VERSION}`
const PRECACHE = __PRECACHE__
// Match on the address alone. Fonts and scripts are requested with different headers
// than the ones they were saved with, and must still be found.
const MATCH = { ignoreSearch: true, ignoreVary: true }
// How long a page load waits for the network before showing the saved copy.
const NETWORK_WAIT_MS = 2000

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches
      .open(CACHE)
      .then((cache) => cache.addAll(PRECACHE))
      .then(() => self.skipWaiting()),
  )
})

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) => Promise.all(keys.filter((key) => key !== CACHE).map((key) => caches.delete(key))))
      .then(() => self.clients.claim()),
  )
})

self.addEventListener('fetch', (event) => {
  const { request } = event
  if (request.method !== 'GET') return
  const url = new URL(request.url)
  if (url.origin !== self.location.origin) return

  if (request.mode === 'navigate') {
    // Fresh page from the network when it answers promptly; otherwise the saved copy.
    const fresh = fetch(request).then((response) => {
      if (response.ok) {
        const copy = response.clone()
        caches.open(CACHE).then((cache) => cache.put('/', copy))
      }
      return response
    })
    const saved = caches.match('/', MATCH)
    const savedAfterWait = new Promise((resolve) => setTimeout(resolve, NETWORK_WAIT_MS)).then(() => saved)
    event.respondWith(
      Promise.race([fresh, savedAfterWait.then((response) => response || fresh)]).catch(() =>
        saved.then((response) => response || Response.error()),
      ),
    )
    // Keep the worker alive until the background refresh has been saved.
    event.waitUntil(fresh.catch(() => undefined))
    return
  }

  if (url.pathname.startsWith('/assets/')) {
    event.respondWith(
      caches.match(request, MATCH).then(
        (saved) =>
          saved ||
          fetch(request).then((response) => {
            const copy = response.clone()
            caches.open(CACHE).then((cache) => cache.put(request, copy))
            return response
          }),
      ),
    )
    return
  }

  event.respondWith(
    caches.match(request, MATCH).then((saved) => {
      const fresh = fetch(request)
        .then((response) => {
          if (response.ok) {
            const copy = response.clone()
            caches.open(CACHE).then((cache) => cache.put(request, copy))
          }
          return response
        })
        .catch(() => saved)
      return saved || fresh
    }),
  )
})
