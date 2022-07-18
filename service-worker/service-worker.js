/* eslint-disable */
const CACHE_NAME = 'roguelike-V2';

const URLS = [
  '/',
  '/leaderboard',
  '/forum',
  '/profile',
  '/bundle.js',
  '/main.css',
];

this.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Opened cache');
        return cache.addAll(URLS);
      })
      .catch((err) => {
        console.log(err);
        throw err;
      }),
  );
});

this.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        if (response) {
          return response;
        }

        const fetchRequest = event.request.clone();
        return fetch(fetchRequest)
          .then((response) => {
            if (!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }

            const responseToCache = response.clone();
            caches.open(CACHE_NAME)
              .then((cache) => {
                if (
                  event.request.url.startsWith('chrome-extension') ||
                  event.request.url.includes('extension') ||
                  !(event.request.url.indexOf('http') === 0)
                ) return;
                cache.put(event.request, responseToCache);
              });
            return response;
          });
      }),
  );
});

this.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((cacheNames) => Promise.all(
        cacheNames.filter(() => true)
          .map((name) => caches.delete(name)),
      )),
  );
});
