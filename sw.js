const cacheName = 'v1';

const cacheAssets = [
  'index.html',
  '/src/main.jsx',
  '/src/index.css',
  '/src/App.jsx',
  '/src/pages/Home.jsx',
  '/src/pages/About.jsx',
  '/src/components/Navbar.jsx',
];

// Call Install Event
self.addEventListener('install', (e) => {
  console.log('ServiceWorker: Installed');
  e.waitUntil(
    caches
      .open(cacheName)
      .then((cache) => {
        console.log('Service Worker: Caching Files');
        cache.addAll(cacheAssets);
      })
      .then(() => self.skipWaiting())
  );
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
  // Check to see if the live site is up, else load cached site
  e.respondWith(fetch(e.request).catch(() => caches.match(e.request)));
});

// *** Future Stuff ***

// const cacheName = '5676083d-9bd4-4a20-a005-deb9b599fe8d';

// const worker = /** @type {ServiceWorkerGlobalScope} */ (
//   /** @type {unknown} */ (self)
// );

// worker.addEventListener('install', (event) => {
//   event.waitUntil(caches.open(cacheName));
// });

// worker.addEventListener('fetch', (event) => {
//   // Check if this is a navigation request
//   const { request } = event;
//   console.log(request);
// });
