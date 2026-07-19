/* ============================================
   Wael Limousine — Service Worker
   Strategy: cache-first for assets, network-first for HTML
   ============================================ */

const CACHE_VERSION = 'wl-v1.4.0';
const STATIC_CACHE = `${CACHE_VERSION}-static`;
const RUNTIME_CACHE = `${CACHE_VERSION}-runtime`;

const PRECACHE_URLS = [
  '/',
  '/index.html',
  '/css/styles.css',
  '/js/script.js',
  '/manifest.webmanifest',
  '/images/og-image.png',
  '/images/favicon-32x32.png',
  '/images/apple-touch-icon.png',
  '/images/cars/mitsubishi-xpander.jpg',
  '/icons/icon-192.png',
  '/icons/icon-512.png',
  '/icons/icon-maskable-512.png',
  'https://fonts.googleapis.com/css2?family=Cinzel:wght@500;600;700;800&family=Cairo:wght@300;400;500;600;700;800&family=Amiri:wght@400;700&family=Inter:wght@400;500;600;700&display=swap',
  'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css'
];

// Install: pre-cache the shell
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(STATIC_CACHE)
      .then((cache) => cache.addAll(PRECACHE_URLS))
      .then(() => self.skipWaiting())
      .catch((err) => console.warn('[SW] Pre-cache failed:', err))
  );
});

// Activate: clean up old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys
          .filter((key) => key !== STATIC_CACHE && key !== RUNTIME_CACHE)
          .map((key) => caches.delete(key))
      )
    ).then(() => self.clients.claim())
  );
});

// Fetch: network-first for HTML, cache-first for everything else
self.addEventListener('fetch', (event) => {
  const { request } = event;
  if (request.method !== 'GET') return;

  const url = new URL(request.url);
  const isHTML = request.mode === 'navigate' || (request.headers.get('accept') || '').includes('text/html');
  const isSameOrigin = url.origin === self.location.origin;

  // Network-first for HTML and same-origin pages
  if (isHTML && isSameOrigin) {
    event.respondWith(
      fetch(request)
        .then((response) => {
          const copy = response.clone();
          caches.open(RUNTIME_CACHE).then((cache) => cache.put(request, copy));
          return response;
        })
        .catch(() => caches.match(request).then((cached) => cached || caches.match('/index.html')))
    );
    return;
  }

  // Cache-first for assets (images, CSS, JS, fonts)
  event.respondWith(
    caches.match(request).then((cached) => {
      if (cached) return cached;
      return fetch(request)
        .then((response) => {
          if (response.ok && (isSameOrigin || url.hostname.includes('fonts.g') || url.hostname.includes('cdnjs'))) {
            const copy = response.clone();
            caches.open(RUNTIME_CACHE).then((cache) => cache.put(request, copy));
          }
          return response;
        })
        .catch(() => cached);
    })
  );
});
