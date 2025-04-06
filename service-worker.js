
// /*
// 1. Usando `self.location.origin`:
// ```javascript
// // Dentro do service worker
// const BASE_URL = self.location.origin;
// ```

// 2. Usando `location.href`:
// ```javascript
// const BASE_URL = location.href.split('/').slice(0, 3).join('/');
// ```

// 3. Método mais robusto com `new URL()`:
// ```javascript
// const BASE_URL = new URL('./', self.location).href;
// ```
// */
// let env = null

// async function fetchEnvironment() {
//     try {
//         const response = await fetch('/.netlify/functions/env');
//         const data = await response.json();
//         env = data;
//         // console.log('API Key carregada--:', env);
//         // console.log('API ENV carregada');
//     } catch (error) {
//         console.error('Erro ao carregar API env:', error);
//     }
// }




// const BASE_URL = new URL('./', self.location).href;
// // console.log("service",BASE_URL)


let cacheName =  "testes"; 
// fetchEnvironment().then(() => {
//     if (env && env.service) {
//         cacheName = env.service;
//     }
// });


// console.log("cacheName",cacheName)

const filesToCachegIT = [
  '/',
  '404.html',
  '404.html',
  '404.html',
  '404.html',
  '404.html',
  'index.html',

  '.gitattributes', 
  '.gitignore', 
  '.netlify/state.json', 
  'css/animation.css', 
  'css/files.css', 
  'css/highlightjs-default.min.css',
   'css/markdown.css', 'css/markdown_V2.css',
    'css/menu.css', 'css/navegadores.css', 
    'css/profile.css', 'css/style.css', 'css/ultils.css',
     'img/00-47-21-570_512.webp', 
     'img/book_page.png', 'img/cursor-black.svg',
      'img/cursor.svg', 'img/icons8-play-50.png', 'img/image.png', 
      'img/letras(1024).jpg', 'img/letras(1680).jpg', 'img/letras(768).jpg',
       'img/letras-320.jpg', 'img/livro_web__1__Copyright-removebg-preview.png', 
       'img/Premium.jpg', 'img/Premium3.png', 'img/social-media-profile.svg', 'index.cjs', 
       'index.html', 'js/beta.js', 'js/Cache-Storage-API.js', 'js/env-config.js', 'js/files.js', 
       'js/global.js', 'js/highlight.min.js', 'js/install.js', 'js/marked.min.js', 'js/player.js',
        'js/Premium.js', 'js/profile.js', 'js/screen.js', 'js/script.js', 'js/scroll.js', 
        'js/settings.js', 'js/testes.js', 'js/utils.js', 'LICENSE', 'main.py', 'manifest.json',
         'manifest.webmanifest', 'netlify/functions/env.js', 'netlify.toml', 'package-lock.json', 
         'package.json', 'README.md', 'requests.js', 'service-worker.js', 'templates/abrir.html', 
         'templates/login.html', 'templates/profile.html', 'templates/register.html', 
         'templates/requests_f.js', 'templates/style.css'];

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

  