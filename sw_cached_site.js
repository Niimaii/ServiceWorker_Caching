const cacheName = 'v2';

// Call Install Event
self.addEventListener('install', (e) => {
  console.log('ServiceWorker: Installed');
});

// Call Active Event
self.addEventListener('activate', (e) => {
  console.log('ServiceWorker: Activated');
  // Remove Unwanted Caches
  e.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          // If the current looped cache name does not match "cacheName"
          if (cache !== cacheName) {
            console.log('Service Worker: Clearing Old Cache');
            return caches.delete(cache);
          }
        })
      );
    })
  );
});

// Call Fetch Event (make site visible offline)
self.addEventListener('fetch', (e) => {
  console.log('Service Worker: Fetching');
  // Cache all the pages of the site
  e.respondWith(
    fetch(e.request)
      .then((res) => {
        // Make copy/clone of response
        const resClone = res.clone();
        //  Open cache
        caches.open(cacheName).then((cache) => {
          // Add response to cache
          cache.put(e.request, resClone);
        });
        return res;
      })
      .catch((err) => caches.match(e.request).then((res) => res))
  );
});
