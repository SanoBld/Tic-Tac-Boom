/**
 * 💣 TIC TAC BOOM - SERVICE WORKER
 * Gère le cache pour le mode hors-ligne et les notifications push
 */

const CACHE_NAME = 'tictacboom-v1.0.0';
const urlsToCache = [
    '/',
    '/index.html',
    '/dictionary.js',
    '/manifest.json',
    '/icon-72.png',
    '/icon-96.png',
    '/icon-128.png',
    '/icon-144.png',
    '/icon-152.png',
    '/icon-192.png',
    '/icon-384.png',
    '/icon-512.png',
    'https://unpkg.com/peerjs@1.5.2/dist/peerjs.min.js',
    'https://cdn.jsdelivr.net/npm/canvas-confetti@1.6.0/dist/confetti.browser.min.js',
    'https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800&family=Outfit:wght@700;800;900&display=swap'
];

// Installation du Service Worker
self.addEventListener('install', (event) => {
    console.log('🔧 Service Worker: Installation en cours...');
    
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                console.log('📦 Service Worker: Mise en cache des fichiers...');
                return cache.addAll(urlsToCache);
            })
            .then(() => {
                console.log('✅ Service Worker: Installation terminée');
                return self.skipWaiting();
            })
            .catch((error) => {
                console.error('❌ Service Worker: Erreur installation', error);
            })
    );
});

// Activation du Service Worker
self.addEventListener('activate', (event) => {
    console.log('🚀 Service Worker: Activation en cours...');
    
    event.waitUntil(
        caches.keys()
            .then((cacheNames) => {
                return Promise.all(
                    cacheNames.map((cacheName) => {
                        if (cacheName !== CACHE_NAME) {
                            console.log('🗑️ Service Worker: Suppression ancien cache:', cacheName);
                            return caches.delete(cacheName);
                        }
                    })
                );
            })
            .then(() => {
                console.log('✅ Service Worker: Activation terminée');
                return self.clients.claim();
            })
    );
});

// Interception des requêtes réseau
self.addEventListener('fetch', (event) => {
    // Stratégie: Network First, fallback to Cache
    // Priorité au réseau pour avoir les données les plus récentes
    event.respondWith(
        fetch(event.request)
            .then((response) => {
                // Cloner la réponse pour la mettre en cache
                const responseToCache = response.clone();
                
                caches.open(CACHE_NAME)
                    .then((cache) => {
                        cache.put(event.request, responseToCache);
                    });
                
                return response;
            })
            .catch(() => {
                // En cas d'échec réseau, utiliser le cache
                return caches.match(event.request)
                    .then((response) => {
                        if (response) {
                            return response;
                        }
                        
                        // Si pas de cache, retourner une page offline pour les pages HTML
                        if (event.request.headers.get('accept').includes('text/html')) {
                            return caches.match('/');
                        }
                    });
            })
    );
});

// Gestion des notifications push
self.addEventListener('push', (event) => {
    if (!event.data) return;
    
    const data = event.data.json();
    const options = {
        body: data.body || 'Nouvelle notification',
        icon: '/icon-192.png',
        badge: '/icon-96.png',
        vibrate: [200, 100, 200],
        tag: data.tag || 'tictacboom-notification',
        requireInteraction: false,
        data: {
            url: data.url || '/'
        }
    };
    
    event.waitUntil(
        self.registration.showNotification(data.title || 'Tic Tac Boom', options)
    );
});

// Gestion des clics sur les notifications
self.addEventListener('notificationclick', (event) => {
    event.notification.close();
    
    const urlToOpen = event.notification.data.url || '/';
    
    event.waitUntil(
        clients.matchAll({ type: 'window', includeUncontrolled: true })
            .then((windowClients) => {
                // Chercher une fenêtre déjà ouverte
                for (let client of windowClients) {
                    if (client.url === urlToOpen && 'focus' in client) {
                        return client.focus();
                    }
                }
                
                // Sinon, ouvrir une nouvelle fenêtre
                if (clients.openWindow) {
                    return clients.openWindow(urlToOpen);
                }
            })
    );
});

// Synchronisation en arrière-plan
self.addEventListener('sync', (event) => {
    if (event.tag === 'sync-game-state') {
        event.waitUntil(syncGameState());
    }
});

async function syncGameState() {
    console.log('🔄 Service Worker: Synchronisation de l\'état du jeu...');
    // À implémenter selon les besoins
    return Promise.resolve();
}

// Gestion des messages du client
self.addEventListener('message', (event) => {
    if (event.data.type === 'SKIP_WAITING') {
        self.skipWaiting();
    }
    
    if (event.data.type === 'GET_VERSION') {
        event.ports[0].postMessage({ version: CACHE_NAME });
    }
    
    if (event.data.type === 'CLEAR_CACHE') {
        event.waitUntil(
            caches.keys().then((cacheNames) => {
                return Promise.all(
                    cacheNames.map((cacheName) => caches.delete(cacheName))
                );
            })
        );
    }
});

console.log('💣 Service Worker Tic Tac Boom chargé !');
