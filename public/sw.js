const CACHE_NAME = 'piano-app-v1.1.0-r1'
const scopedUrl = (path) => new URL(path, self.registration.scope).toString()
const INDEX_URL = scopedUrl('index.html')
const APP_SHELL = [
  scopedUrl('./'),
  INDEX_URL,
  scopedUrl('manifest.webmanifest'),
  scopedUrl('icons/icon.svg'),
  scopedUrl('data/dictionary-it-de.wiktionary.json'),
]

async function cacheAppShell() {
  const cache = await caches.open(CACHE_NAME)
  await cache.addAll(APP_SHELL)
  const index = await cache.match(INDEX_URL)
  if (!index) throw new Error('App-Shell konnte nicht geladen werden.')
  const html = await index.text()
  const assets = [
    ...html.matchAll(/(?:src|href)="([^"?#]*\/assets\/[^"?#]+)"/g),
  ].map((match) => new URL(match[1], self.location.origin).toString())
  await cache.addAll([...new Set(assets)])
}

self.addEventListener('install', (event) => {
  event.waitUntil(cacheAppShell().then(() => self.skipWaiting()))
})

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(
          keys
            .filter((key) => key !== CACHE_NAME)
            .map((key) => caches.delete(key)),
        ),
      ),
  )
  self.clients.claim()
})

self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return
  const url = new URL(event.request.url)
  if (url.origin !== self.location.origin) return
  if (event.request.mode === 'navigate') {
    event.respondWith(
      fetch(event.request).catch(async () => {
        const fallback = await caches.match(INDEX_URL)
        return fallback || Response.error()
      }),
    )
    return
  }
  event.respondWith(
    caches.match(event.request).then(async (cached) => {
      if (cached) return cached
      try {
        const response = await fetch(event.request)
        if (response.ok) {
          const cache = await caches.open(CACHE_NAME)
          await cache.put(event.request, response.clone())
        }
        return response
      } catch {
        return Response.error()
      }
    }),
  )
})
