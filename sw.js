// Version 22: disable the old offline cache that could keep serving stale HTML.
self.addEventListener("install",event=>{
  event.waitUntil(self.skipWaiting());
});
self.addEventListener("activate",event=>{
  event.waitUntil((async()=>{
    const names=await caches.keys();
    await Promise.all(names.map(name=>caches.delete(name)));
    await self.clients.claim();
    await self.registration.unregister();
  })());
});
// Intentionally no fetch handler: pages and assets come directly from the network.
