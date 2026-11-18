// App shell: cache-first, refreshed in the background. Wikimedia images: cache-first, saved on first view.
const SHELL = "aztec-shell-v1";
const IMGS = "aztec-img-v1";
const SHELL_FILES = ["./", "index.html", "manifest.webmanifest", "icon-192.png", "icon-512.png", "apple-touch-icon.png"];

self.addEventListener("install", e => {
  e.waitUntil(caches.open(SHELL).then(c => c.addAll(SHELL_FILES)).then(() => self.skipWaiting()));
});
self.addEventListener("activate", e => {
  e.waitUntil(caches.keys().then(keys => Promise.all(
    keys.filter(k => k !== SHELL && k !== IMGS).map(k => caches.delete(k))
  )).then(() => self.clients.claim()));
});
self.addEventListener("fetch", e => {
  const req = e.request;
  if (req.method !== "GET") return;
  const url = new URL(req.url);
  if (url.hostname.endsWith("wikimedia.org")) {
    e.respondWith(caches.open(IMGS).then(async c => {
      const hit = await c.match(req.url);
      if (hit) return hit;
      const res = await fetch(req);
      if (res.ok || res.type === "opaque") c.put(req.url, res.clone());
      return res;
    }));
    return;
  }
  if (url.origin === self.location.origin) {
    e.respondWith(caches.open(SHELL).then(async c => {
      const hit = await c.match(req, {ignoreSearch: true});
      const net = fetch(req).then(res => { if (res.ok) c.put(req, res.clone()); return res; }).catch(() => hit);
      return hit || net;
    }));
  }
});
