const cacheName = 'site-cache-v2';
const filesToCache = [
    // '/',         // Raiz   
    // '/img/cursor.svg',       // Arquivos SVG e PNG
    // '/img/cursor-black.svg',
    // '/img/icons8-play-50.png',
    // '/img/livro_web__1__Copyright-removebg-preview.png',
    '/js/confg.js',          // Arquivos JavaScript
    '/js/events.js',
    '/js/files.js',
    '/js/module.js',
    '/js/player.js',
    '/js/script.js',
    '/js/scroll.js',
    '/js/service-worker.js',
    '/js/utils.js',
    '/css/animation.css',    // Arquivos CSS
    '/css/files.css',
    '/css/menu.css',
    '/css/style.css',                    
    '/index.html'// Página principal
  ];
  

// Instalando o Service Worker e fazendo o cache dos arquivos
self.addEventListener('install', (event) => {
    event.waitUntil(
      caches.open(cacheName).then((cache) => {
        return Promise.all(
          filesToCache.map((file) =>
            fetch(file, { mode: 'no-cors' }).then((response) => {
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
  