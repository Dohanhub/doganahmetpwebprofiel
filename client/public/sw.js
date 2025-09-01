// Simplified service worker - completely disabled to prevent promise rejections
console.log('[SW] Service worker disabled to prevent connection issues');

// No background processes, no health monitoring, no cache management
// This ensures no unhandled promise rejections

self.addEventListener('install', (event) => {
  console.log('[SW] Service worker installing (minimal mode)');
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  console.log('[SW] Service worker activating (minimal mode)');
  event.waitUntil(self.clients.claim());
});

// No fetch handling to prevent any network-related promise rejections
self.addEventListener('fetch', (event) => {
  // Pass through all requests without interception
  return;
});