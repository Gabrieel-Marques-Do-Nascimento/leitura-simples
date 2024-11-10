const CACHE_NAME = 'meu-site-cache-v1';
const URLS_TO_CACHE = [
    '/',
    '/index.html',
    '/styles.css',
    '/script.js',
    '/imagem.png'
];

// Instalando o Service Worker
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                console.log('Cache armazenado');
                return cache.addAll(URLS_TO_CACHE); // Armazenando os arquivos no cache
            })
    );
});

self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request) // Verifica se o recurso está no cache
            .then((cachedResponse) => {
                if (cachedResponse) {
                    // Retorna o recurso do cache, se encontrado
                    return cachedResponse;
                }

                // Caso o recurso não esteja no cache, faz a requisição de rede
                return fetch(event.request).then((networkResponse) => {
                    // Armazena a resposta no cache para uso futuro
                    caches.open(CACHE_NAME).then((cache) => {
                        cache.put(event.request, networkResponse.clone());
                    });
                    return networkResponse;
                });
            })
    );
});


// Atualizar cache (exemplo simples)
caches.open(CACHE_NAME).then((cache) => {
    cache.put('/index.html', new Response('<html>Nova versão</html>'));
});

// Remover um item do cache
caches.open(CACHE_NAME).then((cache) => {
    cache.delete('/index.html');
});
