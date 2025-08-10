// Define the name of the cache
const CACHE_NAME = 'lightcycles-cache-v1';

// List all the files we want to cache
// This includes the main HTML, the manifest, and all CDN scripts
const urlsToCache = [
    './',
    './index.html',
    './manifest.json',
    'https://cdn.tailwindcss.com',
    'https://fonts.googleapis.com/css2?family=VT323&display=swap',
    'https://cdn.jsdelivr.net/npm/@phosphor-icons/web@2.1.1/assets/web/Phosphor.woff2',
    'https://www.gstatic.com/firebasejs/11.6.1/firebase-app.js',
    'https://www.gstatic.com/firebasejs/11.6.1/firebase-auth.js',
    'https://www.gstatic.com/firebasejs/11.6.1/firebase-firestore.js'
];

// The `install` event is triggered when the service worker is first installed.
// We open the cache and add all the files we want to save for offline use.
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            console.log('Opened cache');
            return cache.addAll(urlsToCache);
        }).catch(err => console.error('Failed to cache files:', err))
    );
});

// The `fetch` event is triggered for every network request the app makes.
// We check if the requested file is in our cache. If it is, we return the cached version.
// If it's not, we go to the network to get it.
self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request).then((response) => {
            if (response) {
                return response; // Return cached response
            }
            return fetch(event.request); // Go to network
        }).catch(err => console.error('Fetch failed:', err))
    );
});

