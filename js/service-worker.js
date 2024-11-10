const cacheName = 'site-cache-v2';
const filesToCache = [
    '/',         // Raiz   
    // '/img/cursor.svg',       // Arquivos SVG e PNG
    // '/img/cursor-black.svg',
    // '/img/icons8-play-50.png',
    // '/img/livro_web__1__Copyright-removebg-preview.png',
    '/js/confg.js?v=2',          // Arquivos JavaScript
    '/js/events.js?v=2',
    '/js/files.js?v=2',
    '/js/module.js?v=2',
    '/js/player.js?v=2',
    '/js/script.js?v=2',
    '/js/scroll.js?v=2',
    '/js/service-worker.js?v=2',
    '/js/utils.js?v=2',
    '/css/animation.css?v=2',    // Arquivos CSS
    '/css/files.css?v=2',
    '/css/menu.css?v=2',
    '/css/style.css?v=2',                    
    '/index.html?v=2'// Página principal
  ];
  

// Instalando o Service Worker e fazendo o cache dos arquivos
self.addEventListener('install', (event) => {
    event.waitUntil(
      caches.open(cacheName).then((cache) => {
        return Promise.all(
          filesToCache.map((file) =>
            fetch(file).then((response) => {
              if (response.ok) {
                return cache.put(file, response);
              } else {
                console.error(`Falha ao buscar ${file} para cache, status: ${response.status}`);
              }
            }).catch((error) => {
              console.error(`Erro ao buscar ${file} para cache`, error);
            })
          )
        );
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
      .register('./js/service-worker.js')
      .then(() => console.log('Service Worker registrado com sucesso'))
      .catch((error) => console.log('Falha no registro do Service Worker', error));
  }
  