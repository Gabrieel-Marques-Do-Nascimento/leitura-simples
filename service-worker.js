const cacheName = 'site-cache-v1';
const filesToCache = [
    '/',                     // Raiz
    '/index.html',           // Página principal
    '/img/cursor.svg',       // Arquivos SVG e PNG
    '/img/cursor-black.svg',
    '/img/icons8-play-50.png',
    '/img/livro_web__1__Copyright-removebg-preview.png',
    '/js/confg.js',          // Arquivos JavaScript
    '/js/events.js',
    '/js/files.js',
    '/js/module.js',
    '/js/player.js',
    '/js/script.js',
    '/js/scroll.js',

    '/js/utils.js',
    '/css/animation.css',    // Arquivos CSS
    '/css/files.css',
    '/css/menu.css',
    '/css/style.css'
  ];
  

// Instalando o Service Worker e fazendo o cache dos arquivos
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(cacheName).then((cache) => {
      return cache.addAll(filesToCache);
    })
  );
});

// Interceptando as requisições e respondendo com o cache, se disponível
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});

if ('serviceWorker' in navigator) {
    navigator.serviceWorker
      .register('./service-worker.js')
      .then(() => console.log('Service Worker registrado com sucesso'))
      .catch((error) => console.log('Falha no registro do Service Worker', error));
  }
  