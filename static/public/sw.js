const cacheName = 'cache-v1'

const precacheResources = [
    '/static/public/offline.html',
    '/static/public/yekanBold.woff',
    '/static/icon/gooje-logo.svg',
    '/static/icon/gooje.ico',
    '/static/icon/gooje-logo192.png',
    '/static/icon/gooje-logo48.png',
    '/static/icon/gooje-splash.jpg',
    '/static/icon/gooje-screenshot1.jpeg',
    '/static/icon/gooje-screenshot2.jpeg',
]

self.addEventListener('install', event => {
    console.log('Service worker install event!')

    event.waitUntil(
        caches.open(cacheName).then(cache => cache.addAll(precacheResources))
    )

    self.skipWaiting()
})

self.addEventListener('activate', event => {
    console.log('Service worker activate event!')

    event.waitUntil(
        (async () => {
            // Enable navigation preload if it's supported.
            // See https://developers.google.com/web/updates/2017/02/navigation-preload
            if ('navigationPreload' in self.registration) {
                await self.registration.navigationPreload.enable()
            }
        })()
    )

    self.clients.claim()
})

self.addEventListener('fetch', event => {
    event.respondWith(
        fetch(event.request).catch(async () => {
            return (
                (await caches.match(event.request)) ||
                (await caches.match('/static/public/offline.html'))
            )
        })
    )
})
