const CACHE_NAME = 'github-user-search-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/css/app.<hash>.css',
  '/js/app.<hash>.js',
  '/js/chunk-vendors.<hash>.js'
];
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      console.log('Caching resources');
      return cache.addAll(urlsToCache);
    })
  );
 
  self.skipWaiting();
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      console.log('offline match')
      return response || fetch(event.request);
    })
  );
});
self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (!cacheWhitelist.includes(cacheName)) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  self.clients.claim();
});