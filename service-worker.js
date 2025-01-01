
/*
1. Usando `self.location.origin`:
```javascript
// Dentro do service worker
const BASE_URL = self.location.origin;
```

2. Usando `location.href`:
```javascript
const BASE_URL = location.href.split('/').slice(0, 3).join('/');
```

3. Método mais robusto com `new URL()`:
```javascript
const BASE_URL = new URL('./', self.location).href;
```
*/
let env = null

async function fetchEnvironment() {
    try {
        const response = await fetch('/.netlify/functions/env');
        const data = await response.json();
        env = data;
        console.log('API Key carregada--:', env);
        console.log('API ENV carregada');
    } catch (error) {
        console.error('Erro ao carregar API Key:', error);
    }
}




const BASE_URL = new URL('./', self.location).href;
console.log("service",BASE_URL)


let cacheName =  "testes"; 
fetchEnvironment().then(() => {
    if (env && env.service) {
        cacheName = env.service;
    }
});


console.log("cacheName",cacheName)

const filesToCachegIT = [
    '/',         // Raiz   
    // '/img/cursor.svg',       // Arquivos SVG e PNG
    // '/img/cursor-black.svg',
    // '/img/icons8-play-50.png',
    // '/img/livro_web__1__Copyright-removebg-preview.png',
    '/js/settings.js',          // Arquivos JavaScript
    '/js/files.js',
    '/js/env-config.js',
    '/js/player.js',
    '/js/script.js',
    '/js/scroll.js',
    '/js/screen.js',
    '/js/beta.js',
    '/js/profile.js',
    '/netlify/functions/env.js',
    '/js/beta.js',
    '/js/marked.min.js',
    '/js/Premium.js',
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
          filesToCachegIT.map((file) =>
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
      .register('./service-worker.js')
      .then(() => console.log('Service Worker registrado com sucesso'))
      .catch((error) => console.log('Falha no registro do Service Worker', error));
  }

  