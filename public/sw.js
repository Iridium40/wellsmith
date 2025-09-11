const CACHE_NAME = 'wellsmith-v1';
const STATIC_CACHE_URLS = [
  '/',
  '/index.html',
  '/favicon.ico',
  '/robots.txt',
  '/sitemap.xml',
];

// Install event - cache static assets only
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        // Only cache actual static files, not SPA routes
        return cache.addAll(STATIC_CACHE_URLS.filter(url => {
          // Only cache files that actually exist as static assets
          return url === '/' || url.includes('.') || url === '/index.html';
        }));
      })
      .then(() => {
        return self.skipWaiting();
      })
      .catch((error) => {
        console.log('Service worker install failed:', error);
        // Don't fail the install if some files can't be cached
        return self.skipWaiting();
      })
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => {
      return self.clients.claim();
    })
  );
});

// Fetch event - serve from cache, fallback to network
self.addEventListener('fetch', (event) => {
  // Skip non-GET requests
  if (event.request.method !== 'GET') {
    return;
  }

  // Skip external requests
  if (!event.request.url.startsWith(self.location.origin)) {
    return;
  }

  // Skip SPA routes - let them be handled by the main app
  const url = new URL(event.request.url);
  if (url.pathname.startsWith('/') && !url.pathname.includes('.') && url.pathname !== '/') {
    return;
  }

  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // Return cached version or fetch from network
        return response || fetch(event.request)
          .then((fetchResponse) => {
            // Don't cache non-successful responses
            if (!fetchResponse || fetchResponse.status !== 200 || fetchResponse.type !== 'basic') {
              return fetchResponse;
            }

            // Only cache actual static assets (files with extensions)
            if (url.pathname.includes('.') || url.pathname === '/') {
              const responseToCache = fetchResponse.clone();
              caches.open(CACHE_NAME)
                .then((cache) => {
                  cache.put(event.request, responseToCache);
                })
                .catch((error) => {
                  console.log('Cache put failed:', error);
                });
            }

            return fetchResponse;
          })
          .catch((error) => {
            console.log('Fetch failed:', error);
            // Return a basic response for failed fetches
            return new Response('Network error', { status: 408 });
          });
      })
  );
});
