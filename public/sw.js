// Service Worker for caching and offline functionality
const CACHE_NAME = 'zwanski-v1.0.0';
const STATIC_CACHE = 'zwanski-static-v1.0.0';
const DYNAMIC_CACHE = 'zwanski-dynamic-v1.0.0';

// Resources to cache immediately
const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/favicon.ico',
  '/hero-it-services.jpg',
  '/hero-it-services-optimized.webp',
  '/manifest.json'
];

// API endpoints to cache
const API_CACHE_PATTERNS = [
  /\/rest\/v1\/courses/,
  /\/rest\/v1\/skills/,
  /\/rest\/v1\/projects/,
  /\/rest\/v1\/experience/
];

// Install event - cache static assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(STATIC_CACHE)
      .then(cache => {
        console.log('Service Worker: Caching static assets');
        return cache.addAll(STATIC_ASSETS);
      })
      .then(() => self.skipWaiting())
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then(cacheNames => {
        return Promise.all(
          cacheNames.map(cacheName => {
            if (cacheName !== STATIC_CACHE && cacheName !== DYNAMIC_CACHE) {
              console.log('Service Worker: Deleting old cache', cacheName);
              return caches.delete(cacheName);
            }
          })
        );
      })
      .then(() => self.clients.claim())
  );
});

// Fetch event - serve from cache with network fallback
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip non-GET requests
  if (request.method !== 'GET') return;

  // Handle static assets with cache-first strategy
  if (STATIC_ASSETS.some(asset => url.pathname === asset)) {
    event.respondWith(
      caches.match(request)
        .then(response => response || fetch(request))
    );
    return;
  }

  // Handle API requests with network-first strategy
  if (API_CACHE_PATTERNS.some(pattern => pattern.test(url.pathname))) {
    event.respondWith(
      fetch(request)
        .then(response => {
          // Cache successful responses
          if (response.status === 200) {
            const responseClone = response.clone();
            caches.open(DYNAMIC_CACHE)
              .then(cache => cache.put(request, responseClone));
          }
          return response;
        })
        .catch(() => {
          // Fallback to cache if network fails
          return caches.match(request);
        })
    );
    return;
  }

  // Handle other requests with stale-while-revalidate
  event.respondWith(
    caches.match(request)
      .then(response => {
        const fetchPromise = fetch(request)
          .then(networkResponse => {
            if (networkResponse.status === 200) {
              caches.open(DYNAMIC_CACHE)
                .then(cache => cache.put(request, networkResponse.clone()));
            }
            return networkResponse;
          });

        return response || fetchPromise;
      })
  );
});

// Background sync for form submissions
self.addEventListener('sync', (event) => {
  if (event.tag === 'contact-form') {
    event.waitUntil(syncContactForms());
  }
});

async function syncContactForms() {
  try {
    const forms = await getStoredForms();
    for (const form of forms) {
      await submitForm(form);
      await removeStoredForm(form.id);
    }
  } catch (error) {
    console.error('Background sync failed:', error);
  }
}

// Utility functions for IndexedDB operations
async function getStoredForms() {
  // Implementation for retrieving stored forms from IndexedDB
  return [];
}

async function submitForm(formData) {
  // Implementation for submitting form data
  return fetch('/api/contact', {
    method: 'POST',
    body: JSON.stringify(formData),
    headers: { 'Content-Type': 'application/json' }
  });
}

async function removeStoredForm(formId) {
  // Implementation for removing form from IndexedDB
}