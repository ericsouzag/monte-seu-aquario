// Service worker: app shell em cache + imagens sob demanda (funciona offline depois do 1º uso)
const VERSION = 'v1';
const SHELL = 'shell-' + VERSION;
const IMGS = 'img-' + VERSION;
const FONTS = 'fonts-' + VERSION;
const SHELL_FILES = ['./', 'index.html', 'manifest.webmanifest', 'icons/icon-192.png', 'icons/icon-512.png', 'icons/apple-touch-icon.png'];

self.addEventListener('install', function (e) {
  e.waitUntil(caches.open(SHELL).then(function (c) { return c.addAll(SHELL_FILES); }).then(function () { return self.skipWaiting(); }));
});

self.addEventListener('activate', function (e) {
  e.waitUntil(
    caches.keys().then(function (keys) {
      return Promise.all(keys.filter(function (k) { return ![SHELL, IMGS, FONTS].includes(k); }).map(function (k) { return caches.delete(k); }));
    }).then(function () { return self.clients.claim(); })
  );
});

function cacheFirst(req, name) {
  return caches.open(name).then(function (cache) {
    return cache.match(req).then(function (hit) {
      if (hit) return hit;
      return fetch(req).then(function (res) {
        if (res && (res.ok || res.type === 'opaque')) cache.put(req, res.clone());
        return res;
      });
    });
  });
}

function networkFirst(req, name) {
  return fetch(req).then(function (res) {
    if (res && res.ok) { const copy = res.clone(); caches.open(name).then(function (c) { c.put(req, copy); }); }
    return res;
  }).catch(function () { return caches.match(req, { ignoreSearch: true }).then(function (hit) { return hit || caches.match('index.html'); }); });
}

self.addEventListener('fetch', function (e) {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  if (url.hostname === 'fonts.googleapis.com' || url.hostname === 'fonts.gstatic.com') {
    e.respondWith(cacheFirst(req, FONTS));
    return;
  }
  if (url.origin !== location.origin) return;
  if (/\/img\//.test(url.pathname)) { e.respondWith(cacheFirst(req, IMGS)); return; }
  e.respondWith(networkFirst(req, SHELL));
});
