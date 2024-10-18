const CACHE_NAME = 'coffo-cache-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/blog.html',
  '/coffees.html',
  '/contact.html',
  '/about.html',
  '/css/animate.min.css',
  '/css/bootstrap-grid.css.map',
  '/css/nice-select.css',
  '/css/normalize.css',
  '/css/responsive.css',
  '/css/slick.css',
  '/css/style.css',
  '/css/meanmenu.css',
  '/css/jquery-ui.css',
  '/css/icomoon.css',
  '/css/bootstrap-grid.min.css',
  '/css/icomoon.css',
  '/js/custom.js',
  '/js/jquery.min.js',
  '/js/modernizer.js',
  '/js/plugin.js',
  '/js/popper.min.js',
  '/js/slider-setting.js',
  '/js/sw.js',
  '/manifest.json',
  '/icons/icon-196x196.png',
  '/icons/icon-512x512.png'
];

// Instalando o Service Worker e armazenando em cache
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(urlsToCache);
      })
  );
});

// Interceptando requisições para servir conteúdo do cache
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        return response || fetch(event.request);
      })
  );
});

// Atualizando o cache quando o Service Worker é ativado
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
});
