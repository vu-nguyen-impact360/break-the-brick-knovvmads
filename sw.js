var CACHE_NAME = 'break-the-brick-knovvmads-cache-v1';
var GAME_CACHE_NAME = 'break-the-brick-knovvmads-cache';
var urlsNotToCache = [
  'dev.html',
  'index.html',
  'sw.js'
];
var urlsToCache = [
  'branding/logo.png',
  'branding/splash1.png',
  'index.html',
  'game.css',
  'game.js',

   // insert other files to cache
   "media/audio/game/bgm.mp3",
   "media/audio/game/click.ogg",
   "media/audio/game/collect.ogg",
   "media/audio/game/jumpmed.ogg",
   "media/audio/game/ohoh.ogg",
   "media/audio/game/time.ogg",
   "media/audio/opening/kittyopening.ogg",
   "media/audio/opening/opening.ogg",
   "media/audio/play/static.ogg",
   "media/graphics/game/ui/enter-fullscreen.png",
   "media/graphics/game/ui/exit-fullscreen.png"

];

self.addEventListener('install', function(event) {
  // Perform install steps
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        console.log('Opened cache: ' + CACHE_NAME);
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        // Cache hit - return response
        if (response) {
          return response;
        }

        return fetch(event.request).then(
          function(response) {
            // Check if we received a valid response
            if(!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }

            // IMPORTANT: Clone the response. A response is a stream
            // and because we want the browser to consume the response
            // as well as the cache consuming the response, we need
            // to clone it so we have two streams.
            var responseToCache = response.clone();

            caches.open(CACHE_NAME)
              .then(function(cache) {
                cache.put(event.request, responseToCache);
              });

            return response;
          }
        );
      })
    );
  
  /* Delete all caches that are in urlsNotToCache */
  if (urlsNotToCache && Array.isArray(urlsNotToCache) && urlsNotToCache.length >= 1) {
    // console.log('Delete all caches that are in urlsNotToCache');
    caches.open(CACHE_NAME)
      .then(function(cache) {
        urlsNotToCache.forEach(function(item, index) {
          cache.delete(item)
            .then(function(response) {
              // console.log('deleted cache: ' + item);  
            });
        });
      });
  }
});

self.addEventListener('activate', function(event) {

  var cacheWhitelist = [CACHE_NAME];
  var gameCacheName = GAME_CACHE_NAME;

  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.map(function(cacheName) {
          if (cacheWhitelist.indexOf(cacheName) === -1 && cacheName.includes(gameCacheName)) {
            console.log('deleted cache: ' + cacheName);  
            return caches.delete(cacheName);
          }
        })
      );
    })
  );

});

