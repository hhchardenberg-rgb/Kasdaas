/*
 * Kas Daas — service worker
 *
 * Offline strategy
 *  - Static build assets (/_next/static, fonts, icons): cache-first (immutable).
 *  - Guide pages: network-first with a short timeout, falling back to the
 *    cached copy — so guests on a weak connection get a fast, working page.
 *  - The whole public guide is warmed in the background after the first visit.
 *
 * Private boat manual (/xx/boat/guide)
 *  - Only cached after it was served to someone with a valid token.
 *  - Kept in a separate cache and only until the token expires (read from the
 *    page's <meta name="kd-offline-until">). Expired copies are deleted.
 *  - Served from cache ONLY when the network is unreachable. If the server says
 *    access is gone (404), the offline copy is deleted immediately.
 *  - "Remove boat info from this device" wipes it.
 */
const VERSION = "kd-v2";
const PAGES = `${VERSION}-pages`;
const ASSETS = `${VERSION}-assets`;
const BOAT = "kd-boat";
const META = "kd-meta";
const NAV_TIMEOUT = 3500;

const BOAT_GUIDE = /^\/(nl|en)\/boat\/guide\/?$/;
const BOAT_LINK = /^\/boat\/[A-Za-z0-9_-]{20,}$/;
const NEVER = /^\/(admin|boat\/forget|api)(\/|$)/;

self.addEventListener("install", () => self.skipWaiting());

self.addEventListener("activate", (event) => {
  event.waitUntil(
    (async () => {
      const keep = [PAGES, ASSETS, BOAT, META];
      for (const key of await caches.keys()) if (!keep.includes(key)) await caches.delete(key);
      await purgeExpiredBoat();
      await self.clients.claim();
    })(),
  );
});

self.addEventListener("message", (event) => {
  const data = event.data || {};
  if (data.type === "locale" && (data.locale === "nl" || data.locale === "en")) {
    event.waitUntil(caches.open(META).then((c) => c.put("/__kd/locale", new Response(data.locale))));
  }
  if (data.type === "warm" && Array.isArray(data.urls)) event.waitUntil(warm(data.urls));
  if (data.type === "forget-boat") event.waitUntil(caches.delete(BOAT));
});

self.addEventListener("fetch", (event) => {
  const req = event.request;
  if (req.method !== "GET") return;
  const url = new URL(req.url);
  if (url.origin !== self.location.origin) return;
  if (NEVER.test(url.pathname) || url.pathname === "/sw.js") return;

  if (
    url.pathname.startsWith("/_next/static/") ||
    url.pathname.startsWith("/_next/image") || // optimised photos: cached once seen, so they work offline
    url.pathname.startsWith("/icons/") ||
    url.pathname.startsWith("/images/")
  ) {
    event.respondWith(cacheFirst(req));
    return;
  }

  // React Server Component payloads: never cached. When offline, failing makes
  // Next.js fall back to a full navigation, which we serve from cache below.
  if (req.headers.get("RSC") === "1" || url.searchParams.has("_rsc")) return;

  if (req.mode === "navigate") {
    if (BOAT_GUIDE.test(url.pathname)) return event.respondWith(boatGuide(event, req, url));
    if (BOAT_LINK.test(url.pathname)) return event.respondWith(boatLink(req));
    return event.respondWith(page(event, req, url));
  }

  // Other same-origin GETs (manifest, favicon…): stale-while-revalidate.
  event.respondWith(staleWhileRevalidate(event, req));
});

// ─────────────────────────────────────────────────────────── strategies

async function cacheFirst(req) {
  const cache = await caches.open(ASSETS);
  const hit = await cache.match(req);
  if (hit) return hit;
  try {
    const res = await fetch(req);
    if (res.ok) cache.put(req, res.clone());
    return res;
  } catch {
    return Response.error();
  }
}

async function staleWhileRevalidate(event, req) {
  const cache = await caches.open(ASSETS);
  const hit = await cache.match(req);
  const net = fetch(req)
    .then((res) => {
      if (res.ok) cache.put(req, res.clone());
      return res;
    })
    .catch(() => null);
  if (hit) {
    event.waitUntil(net);
    return hit;
  }
  return (await net) || Response.error();
}

function withTimeout(promise, ms) {
  return Promise.race([promise, new Promise((resolve) => setTimeout(() => resolve("timeout"), ms))]);
}

async function preferredLocale() {
  const hit = await caches.open(META).then((c) => c.match("/__kd/locale"));
  const v = hit ? await hit.text() : "";
  return v === "nl" || v === "en" ? v : "en";
}

async function page(event, req, url) {
  const cache = await caches.open(PAGES);
  const key = url.pathname;
  const net = fetch(req)
    .then((res) => {
      if (res.ok && !res.redirected && res.type === "basic") cache.put(key, res.clone());
      return res;
    })
    .catch(() => null);
  const cached = await cache.match(key);
  const first = await withTimeout(net, cached ? NAV_TIMEOUT : 15000);
  if (first && first !== "timeout") return first;
  if (cached) {
    event.waitUntil(net);
    return cached;
  }
  const late = await net;
  if (late) return late;
  // Nothing for this URL: fall back to the cached home page.
  const locale = /^\/(nl|en)(\/|$)/.test(key) ? key.slice(1, 3) : await preferredLocale();
  return (await cache.match(`/${locale}`)) || offlinePage(locale);
}

async function boatGuide(event, req, url) {
  const cache = await caches.open(BOAT);
  const key = url.pathname.replace(/\/$/, "");
  try {
    const res = await fetch(req);
    if (res.ok) {
      const html = await res.clone().text();
      const m = html.match(/name="kd-offline-until" content="(\d+)"/);
      if (m) {
        const headers = new Headers(res.headers);
        headers.set("x-kd-until", m[1]);
        await cache.put(key, new Response(html, { status: 200, headers }));
      }
    } else if (res.status === 404 || res.status === 401 || res.status === 403) {
      await caches.delete(BOAT); // access revoked or expired → forget the offline copy
    }
    return res;
  } catch {
    const hit = await validBoat(cache, key);
    return hit || offlinePage(key.slice(1, 3));
  }
}

async function boatLink(req) {
  try {
    return await fetch(req);
  } catch {
    const cache = await caches.open(BOAT);
    const locale = await preferredLocale();
    const hit = (await validBoat(cache, `/${locale}/boat/guide`)) || (await validBoat(cache, `/${locale === "nl" ? "en" : "nl"}/boat/guide`));
    return hit || offlinePage(locale);
  }
}

async function validBoat(cache, key) {
  const hit = await cache.match(key);
  if (!hit) return null;
  const until = Number(hit.headers.get("x-kd-until") || 0);
  if (!until || until < Date.now()) {
    await cache.delete(key);
    return null;
  }
  return hit;
}

async function purgeExpiredBoat() {
  const cache = await caches.open(BOAT);
  for (const req of await cache.keys()) await validBoat(cache, new URL(req.url).pathname);
}

// ─────────────────────────────────────────────────────────── warming

async function warm(urls) {
  const pages = await caches.open(PAGES);
  const assets = await caches.open(ASSETS);
  const seen = new Set();
  const queue = urls.filter((u) => typeof u === "string" && u.startsWith("/") && !BOAT_GUIDE.test(u));
  const worker = async () => {
    while (queue.length) {
      const path = queue.shift();
      try {
        const res = await fetch(path, { credentials: "same-origin" });
        if (!res.ok || res.redirected) continue;
        const html = await res.clone().text();
        await pages.put(path, res);
        for (const m of html.matchAll(/\/_next\/static\/[^"'\s)\\]+/g)) {
          const asset = m[0];
          if (seen.has(asset)) continue;
          seen.add(asset);
          if (!(await assets.match(asset))) {
            const a = await fetch(asset).catch(() => null);
            if (a && a.ok) await assets.put(asset, a);
          }
        }
      } catch {
        /* keep going */
      }
    }
  };
  await Promise.all([worker(), worker(), worker()]);
  for (const extra of ["/manifest.webmanifest", "/icons/icon-192.png"]) {
    const r = await fetch(extra).catch(() => null);
    if (r && r.ok) await assets.put(extra, r);
  }
}

function offlinePage(locale) {
  const nl = locale === "nl";
  const html = `<!doctype html><html lang="${nl ? "nl" : "en"}"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover"><title>Kas Daas — offline</title>
<style>body{margin:0;min-height:100dvh;display:grid;place-items:center;background:#0d3642;color:#fbf8f3;font-family:Georgia,serif;text-align:center;padding:24px}p{font-family:system-ui,sans-serif;opacity:.8;max-width:22rem;line-height:1.5}a{color:#e9c38f}</style></head>
<body><div><h1>Kas Daas</h1><p>${nl ? "Je bent offline en deze pagina is nog niet opgeslagen. Open de gids één keer met internet, dan werkt hij daarna ook offline." : "You're offline and this page hasn't been saved yet. Open the guide once with internet and it will work offline afterwards."}</p><p><a href="/${nl ? "nl" : "en"}">${nl ? "Naar home" : "Go home"}</a></p></div></body></html>`;
  return new Response(html, { status: 200, headers: { "Content-Type": "text/html; charset=utf-8" } });
}
