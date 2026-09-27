# Kas Daas — Guest Guide

The digital guest experience of **Kas Daas**, a private villa on Bonaire:
villa manual, curated Bonaire guide, boat rental and a private boat manual for renters.
Installable as an app (PWA), bilingual (NL/EN) and usable offline.

> Jouw gids voor Kas Daas & Bonaire · Your guide to Kas Daas & Bonaire

## Quick start

```bash
npm install
cp .env.example .env.local      # set BOAT_TOKEN_SECRET (openssl rand -base64 48)
npm run dev                     # http://localhost:3000
```

| Command | What it does |
| --- | --- |
| `npm run dev` | Development server |
| `npm run build && npm start` | Production build (service worker / offline only work here) |
| `npm run lint` · `npm run typecheck` | Code checks |
| `npm run content:todo` | Lists every piece of content still to be filled in |
| `npm run boat:link -- --days 3` | Creates a private boat-manual link + QR code in the terminal |
| `npm run test:e2e` | Runs the 10 UX scenarios from the brief against a running server (see `scripts/e2e.mjs`) |
| `npm run icons` | Regenerates the app icons |

Requires Node 20.9+ (the CLI scripts use Node's built-in TypeScript support, Node 22.18+).

## What's where

```
content/                ← ALL texts & data (edit these, not the components)
  site.ts               general settings, host contact, emergency numbers, villa location
  images.ts             all photos (files in public/images) with NL/EN alt texts
  ui.ts                 interface texts NL/EN (EN is type-checked against NL → no missing translations)
  categories.ts         Discover categories, tags, dining styles, map filters
  house/                villa guide: sections, WiFi & check-in/out, departure checklist, problems
  places/               restaurants, beaches, snorkel/dive sites, activities, groceries, practical
  itineraries/          day plans (timelines)
  practical/            "Good to know on Bonaire"
  boat/rental.ts        public boat rental page
  boat/private/         🔒 boat manual + revocation list (server-only, never sent to non-renters)
lib/                    content access layer, i18n, token security, search index, helpers
components/             UI (design system in app/globals.css)
app/[locale]/…          pages (nl / en)
app/boat/[token]        deep-link handler for the private boat manual
app/admin               create boat links + QR codes (needs ADMIN_PASSWORD)
public/sw.js            service worker (offline)
CONTENT_TODO.md         checklist of everything the owner still has to supply
```

### Editing content

Everything is typed TypeScript data. Adding a restaurant, beach, activity or day plan means
adding one object to an array in `content/` — no component changes. Every text is
`l("Nederlands", "English")`. Missing information is written as
`todo("WIFI-NETWERK", "WIFI NETWORK")`, which renders as a clearly marked placeholder and
never becomes a clickable phone number, route or QR code.

Example recommendations are flagged `demo: true` and show a small “Sample — to be verified”
label. Verify them, then remove the flag. No phone numbers, prices or opening hours of
external businesses were filled in. Coordinates are approximate, and route buttons search by name.

**CMS later:** components only read content through `lib/content.ts`. To move to a headless CMS,
re-implement those functions (and keep the types in `lib/types.ts`). The UI stays unchanged.

## Languages

`/nl/…` and `/en/…`. On the first visit, `proxy.ts` picks Dutch for Dutch browsers and English for
everyone else. The choice from the NL/EN switch is remembered in a cookie and localStorage.
UI texts live in `content/ui.ts`, where a missing English key is a type error.

## The private boat manual 🔒

- Renters get a personal link `https://<domain>/boat/<token>` (via WhatsApp, or as a QR code).
- The token is **signed (HMAC-SHA256) and expires**. It's stateless, so no database is needed. Create
  one in `/admin` (set `ADMIN_PASSWORD`) or with `npm run boat:link -- --days 3`.
- Opening the link stores the token in an **httpOnly cookie**, removes it from the address bar and
  opens `/<lang>/boat/guide`. Without a valid cookie that URL answers **404**, like a page that
  doesn't exist.
- The manual is rendered on the server only. `content/boat/private` imports `server-only`, so it can't end
  up in the public JavaScript. The page isn't linked anywhere, isn't in the sitemap, and is sent
  with `noindex, nofollow` (meta + `X-Robots-Tag`), `Cache-Control: private, no-store` and
  `Referrer-Policy: no-referrer`.
- **Revoke** a link early by adding its ID (shown when created) to
  `content/boat/private/access.ts` or `BOAT_REVOKED_IDS`. Rotating `BOAT_TOKEN_SECRET` revokes all links.
- **Offline:** after a renter has opened the manual, the service worker keeps a copy in a separate
  cache **only until the token expires**. It serves that copy only when there's no network, and
  deletes it as soon as the server reports that access is gone. “Remove boat info from this device”
  wipes the cookie, the offline copy and the checklists.
- Media in `public/` is publicly reachable by URL. Use unguessable file names or protected
  storage for boat photos and videos.

## Offline & PWA

- Web app manifest, app icons (incl. maskable + Apple touch icon), standalone display and a
  short branded splash when the installed app is opened.
- The service worker (`public/sw.js`, production only) warms the whole public guide in the
  background after the first visit. Pages load network-first with a short timeout and fall back to
  the cache, so the guide stays fast on a weak connection.
- Favourites (“My Bonaire”), recently viewed places, checklists and the guest name are stored on the
  device. No accounts.
- External actions (routes, WhatsApp, websites) are marked “needs internet” while offline.
- The install hint appears from the second visit, on the home screen only. It uses the native prompt on
  Android and shows short Share → “Add to Home Screen” steps on iOS.

## Personal welcome

Share a link like `https://<domain>/?guest=Jermaine&arrive=2026-10-01&depart=2026-10-08`.
The home screen then says “Welcome to Kas Daas, Jermaine” and shows the stay dates. They're stored on
the device, and the parameters are removed from the URL.

## SEO

The public guide is **hidden from search engines by default** (`NEXT_PUBLIC_INDEXABLE=false`:
robots noindex + disallow, empty sitemap). Set it to `true` to make it findable. The boat
manual is never indexed.

## Deployment

Any Node host works; Vercel is the simplest. Set the environment variables from `.env.example`.
`BOAT_TOKEN_SECRET` is required in production, and without it every boat link is rejected. Map tiles
come from CARTO/OpenStreetMap (see `components/map/map-view.tsx`).
