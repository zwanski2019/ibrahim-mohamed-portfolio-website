const CACHE_NAME = 'gravatar-cache-v1';
const GRAVATAR_URL = 'https://www.gravatar.com';

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) =>
      cache.add('https://www.gravatar.com/avatar/?d=mp&f=y')
    )
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', (event) => {
  const { request } = event;
  if (request.url.startsWith(GRAVATAR_URL)) {
    event.respondWith(
      caches.open(CACHE_NAME).then(async (cache) => {
        const cached = await cache.match(request);
        if (cached) {
          return cached;
        }
        try {
          const networkResponse = await fetch(request);
          cache.put(request, networkResponse.clone());
          return networkResponse;
        } catch (error) {
          return cached;
        }
      })
    );
  }
});
