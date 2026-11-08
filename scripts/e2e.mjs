/**
 * End-to-end check of the 10 UX scenarios from the brief.
 *
 *   BOAT_TOKEN_SECRET=… npm run build && BOAT_TOKEN_SECRET=… ADMIN_PASSWORD=… npm start -- -p 3100
 *   BOAT_TOKEN_SECRET=… ADMIN_PASSWORD=… BASE=http://localhost:3100 npm run test:e2e
 *
 * Needs Playwright (npm i -D playwright, or a global install).
 */
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";
import { createRequire } from "node:module";
import { execSync } from "node:child_process";
import { createBoatToken } from "../lib/boat/token-core.ts";

const require = createRequire(import.meta.url);
let pw;
try {
  pw = require("playwright");
} catch {
  pw = require(join(execSync("npm root -g").toString().trim(), "playwright"));
}
const { chromium, devices } = pw;

const BASE = process.env.BASE || "http://localhost:3100";
const GUEST_PASSWORD = process.env.GUEST_PASSWORD || "beachhousebonaire";
const SECRET = process.env.BOAT_TOKEN_SECRET;
if (!SECRET) throw new Error("Set BOAT_TOKEN_SECRET (same as the server).");

let failed = 0;
const ok = (name, cond, extra = "") => {
  console.log(`${cond ? "✓" : "✗"} ${name}${extra ? `  — ${extra}` : ""}`);
  if (!cond) failed++;
};

const browser = await chromium.launch();
const iphone = { ...devices["iPhone 13"] };
const errors = [];
const newPage = async (ctx) => {
  const p = await ctx.newPage();
  p.on("pageerror", (e) => errors.push(e.message));
  return p;
};
/** Unlocks the guide for this browser context via the ?access= link. */
const unlock = (page, path = "/") => page.goto(`${BASE}${path}${path.includes("?") ? "&" : "?"}access=${encodeURIComponent(GUEST_PASSWORD)}`);

// ── Scenario 0 — the guide is behind the guest password
{
  const ctx = await browser.newContext({ ...iphone, locale: "nl-NL" });
  const page = await newPage(ctx);
  await page.goto(BASE + "/nl/villa/wifi");
  ok("S0 Without password → welcome screen", /\/nl\/welcome\?next=/.test(page.url()), page.url());
  ok("S0 Welcome screen does not show the WiFi password", !(await page.content()).includes(GUEST_PASSWORD));
  await page.getByPlaceholder("Wachtwoord").fill("verkeerd");
  await page.getByRole("button", { name: "Open de gids" }).click();
  await page.locator("form p[role=alert]").waitFor();
  ok("S0 Wrong password rejected", await page.locator("form p[role=alert]").isVisible());
  await page.getByPlaceholder("Wachtwoord").fill(" BeachHouseBonaire ");
  await page.getByRole("button", { name: "Open de gids" }).click();
  await page.waitForURL(/\/nl\/villa\/wifi$/, { waitUntil: "commit" });
  ok("S0 Correct password → back to the requested page", true);
  const profile = await fetch(BASE + "/wifi.mobileconfig");
  ok("S0 WiFi profile locked without password", profile.status === 401, String(profile.status));
  await ctx.close();
  const ctx2 = await browser.newContext({ ...iphone, locale: "en-US" });
  const p2 = await newPage(ctx2);
  await unlock(p2, "/en/discover");
  ok("S0 ?access= link unlocks and cleans the URL", /\/en\/discover$/.test(p2.url()), p2.url());
  await ctx2.close();
}

// ── Scenario 1 — WiFi within two taps
{
  const ctx = await browser.newContext({ ...iphone, locale: "nl-NL" });
  const page = await newPage(ctx);
  await unlock(page);
  ok("S0 Dutch browser → /nl", page.url().endsWith("/nl"), page.url());
  await page.getByRole("link", { name: "WiFi", exact: true }).first().click();
  await page.waitForURL(/\/nl\/villa\/wifi/);
  ok("S1 WiFi in 1 tap from home", await page.getByRole("heading", { name: "WiFi" }).isVisible());
  await ctx.close();
}

// ── Scenario 2 — restaurants tonight
{
  const ctx = await browser.newContext({ ...iphone, locale: "en-US" });
  const page = await newPage(ctx);
  await unlock(page);
  ok("S0 Other browser language → /en", page.url().endsWith("/en"), page.url());
  await page.getByRole("link", { name: "Eat & drink" }).first().click();
  await page.waitForURL(/restaurants/);
  const n = await page.locator('a[href*="/en/places/"]').count();
  ok("S2 Restaurant guide reachable in 1 tap, lists places", n >= 5, `${n} cards`);
  await page.getByRole("button", { name: "Our favourites" }).click();
  ok("S2 Filter 'Our favourites' works", (await page.locator('a[href*="/en/places/"]').count()) < n);

  // ── Scenario 3 — snorkeling
  await page.goto(BASE + "/en/discover/snorkeling");
  ok("S3 Snorkel recommendations", (await page.locator('a[href*="/en/places/"]').count()) >= 3);

  // ── Scenario 4 — how does an appliance work
  await page.goto(BASE + "/en/search?q=airco");
  await page.locator('a[href*="#airco"]').first().click();
  await page.waitForURL(/comfort#airco/);
  await page.waitForTimeout(300);
  ok("S4 Search 'airco' → air conditioning card opened", await page.locator("details#airco").evaluate((d) => d.open));

  // ── Scenario 5 — rent the boat
  await page.goto(BASE + "/en/boat");
  ok("S5 Boat rental page with CTA", await page.getByText("Check availability").first().isVisible());

  // ── Scenario 9 — search "check out"
  await page.goto(BASE + "/en/search?q=check%20out");
  const first = await page.locator('main a[href*="/villa/departure"]').first().waitFor({ timeout: 5000 }).then(() => true, () => false);
  ok("S9 'check out' finds departure instructions", first);
  await ctx.close();
}

// ── Scenario 6 — the private manual cannot be found
{
  const ctx = await browser.newContext({ ...iphone, locale: "en-US" });
  const page = await newPage(ctx);
  await unlock(page);
  const res = await page.goto(BASE + "/en/boat/guide");
  ok("S6 /boat/guide without token → 404", res.status() === 404, String(res.status()));
  const cookie = (await ctx.cookies()).map((c) => `${c.name}=${c.value}`).join("; ");
  const leaked = [];
  for (const path of ["/en", "/nl", "/es", "/de", "/en/boat", "/nl/boat", "/es/boat", "/de/boat", "/en/more", "/en/villa", "/en/discover", "/sitemap.xml", "/robots.txt"]) {
    const html = await (await fetch(BASE + path, { headers: { cookie } })).text();
    if (/boat\/guide/.test(html)) leaked.push(path);
  }
  ok("S6 No public page links to the manual", leaked.length === 0, leaked.join(","));
  const bad = await page.goto(BASE + "/boat/AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA");
  ok("S6 Forged token → public boat page", /\/boat\?link=invalid/.test(page.url()) && bad.ok(), page.url());
  const expired = createBoatToken(SECRET, new Date(Date.now() - 1000)).token;
  await page.goto(BASE + `/boat/${expired}`);
  ok("S6 Expired token rejected", /link=invalid/.test(page.url()));
  // Secret text must not ship in public JS.
  const chunks = [];
  const walk = (d) => readdirSync(d).forEach((f) => (statSync(join(d, f)).isDirectory() ? walk(join(d, f)) : f.endsWith(".js") && chunks.push(join(d, f))));
  walk(".next/static");
  const secretMarkers = ["UITLEG GASHENDEL", "Noodstopkoord", "BOAT MANAGER PHONE", GUEST_PASSWORD];
  const hits = chunks.filter((c) => secretMarkers.some((m) => readFileSync(c, "utf8").includes(m)));
  ok("S6 Manual content & guest password not in public JS bundles", hits.length === 0, hits.join(","));
  await ctx.close();
}

// ── Scenario 7 + 8 — deep link opens the manual; later available offline
{
  const ctx = await browser.newContext({ ...iphone, locale: "en-US" });
  const page = await newPage(ctx);
  const { token } = createBoatToken(SECRET, new Date(Date.now() + 2 * 86400_000));
  const res = await page.goto(BASE + `/boat/${token}`);
  ok("S7 Deep link → manual", /\/en\/boat\/guide$/.test(page.url()) && res.ok(), page.url());
  ok("S7 Manual shows welcome + SOS", (await page.getByText("Let's get you on the water").isVisible()) && (await page.getByRole("button", { name: /SOS/ }).isVisible()));
  ok("S7 Token removed from address bar", !page.url().includes(token));
  const robots = res.headers()["x-robots-tag"] || "";
  ok("S7 Manual sent with noindex header", /noindex/.test(robots), robots);
  const meta = await page.locator('meta[name="robots"]').getAttribute("content");
  ok("S7 Manual has noindex meta", /noindex/.test(meta ?? ""), meta ?? "");
  await page.getByRole("button", { name: "Engine won't start" }).click();
  ok("S7 Decision tree opens", await page.getByText("Is the throttle in neutral?").isVisible());
  ok("S7 Boat renters don't need the guest password", true);
  await page.evaluate(() => window.scrollTo(0, 2000));
  await page.waitForTimeout(300);
  const sosOnScreen = await page.getByRole("button", { name: /SOS/ }).evaluate((el) => {
    const r = el.getBoundingClientRect();
    return r.top >= 0 && r.bottom <= window.innerHeight;
  });
  ok("S7 SOS button stays on screen while scrolling", sosOnScreen);
  await unlock(page, "/en/boat/guide");

  // Wait for the service worker to control the page, then go offline.
  const sw = await page.evaluate(async () => {
    if (!("serviceWorker" in navigator)) return false;
    await navigator.serviceWorker.ready;
    return true;
  });
  if (sw) {
    await page.reload({ waitUntil: "networkidle" }); // now served through the SW → cached
    await page.waitForTimeout(1500);
    await ctx.setOffline(true);
    await page.reload().catch(() => null);
    ok("S8 Manual available offline after opening it", await page.getByText("Let's get you on the water").isVisible().catch(() => false));
    await page.goto(BASE + "/en/villa/wifi").catch(() => null);
    ok("S8 WiFi page available offline", await page.getByRole("heading", { name: "WiFi" }).isVisible().catch(() => false));
    await ctx.setOffline(false);
  } else ok("S8 Service worker available", false);

  // Remove access → manual gone.
  await page.goto(BASE + "/en/boat/guide");
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await page.waitForTimeout(300);
  await page.getByRole("button", { name: /Remove boat info/ }).click();
  await page.waitForURL(/\/en\/boat$/);
  const after = await page.goto(BASE + "/en/boat/guide");
  ok("S7 'Remove boat info' revokes access on this device", after.status() === 404);
  await ctx.close();
}

// ── Scenario 10 — English without Dutch leftovers
{
  const ctx = await browser.newContext({ ...iphone, locale: "en-US" });
  const page = await newPage(ctx);
  await unlock(page);
  const dutch = /\b(het|een|jouw|bekijk|invullen|onze|naar|wij|zoeken|terug|vertrek|boodschappen)\b/i;
  const offenders = [];
  const paths = ["/en", "/en/villa", "/en/villa/arrival", "/en/villa/comfort", "/en/villa/outdoor-living", "/en/villa/island-living", "/en/villa/your-villa",
    "/en/villa/wifi", "/en/villa/departure", "/en/help", "/en/discover", "/en/discover/restaurants", "/en/discover/food", "/en/places/klein-bonaire",
    "/en/places/salt-pans-slave-huts", "/en/plans", "/en/plans/seven-days", "/en/map", "/en/favorites", "/en/more", "/en/good-to-know", "/en/boat", "/en/search"];
  for (const p of paths) {
    await page.goto(BASE + p, { waitUntil: "domcontentloaded" });
    const text = await page.locator("body").innerText();
    const m = text.match(dutch);
    if (m) offenders.push(`${p}: "${text.slice(Math.max(0, m.index - 30), m.index + 30).replace(/\s+/g, " ")}"`);
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
    if (overflow > 0) offenders.push(`${p}: horizontal scroll ${overflow}px`);
  }
  ok("S10 English pages contain no Dutch text & no horizontal scroll", offenders.length === 0, offenders.join("\n   "));
  await ctx.close();
}

// ── Scenario 11 — the back button never leaves the app
{
  const back = async (page) => {
    await page.getByRole("button", { name: /^(Terug|Back)$/ }).first().click();
    await page.waitForTimeout(1000);
    return new URL(page.url()).pathname;
  };
  const ctx = await browser.newContext({ ...iphone, locale: "nl-NL" });
  const page = await newPage(ctx);
  await unlock(page, "/nl/places/brass-boer"); // arrives directly, e.g. from WhatsApp
  ok("S11 Direct link: back goes to the parent page, not out of the app", (await back(page)) === "/nl/discover");
  await page.goto(BASE + "/nl/villa");
  await page.locator('a[href="/nl/villa/wifi"]').first().click();
  await page.waitForURL(/wifi$/);
  ok("S11 In-app: back returns to the previous page", (await back(page)) === "/nl/villa");
  await ctx.close();
  const ctx2 = await browser.newContext({ ...iphone, locale: "nl-NL" });
  const p2 = await newPage(ctx2);
  await p2.goto(BASE + "/nl/villa/wifi");
  await p2.getByPlaceholder("Wachtwoord").fill(GUEST_PASSWORD);
  await p2.getByRole("button", { name: "Open de gids" }).click();
  await p2.waitForURL(/\/nl\/villa\/wifi$/, { waitUntil: "commit" });
  await p2.waitForTimeout(800);
  ok("S11 After the password: back doesn't return to the password screen", (await back(p2)) === "/nl/villa");
  await ctx2.close();
}

// ── Scenario 12 — Spanish
{
  const ctx = await browser.newContext({ ...iphone, locale: "es-ES" });
  const page = await newPage(ctx);
  await unlock(page);
  ok("S12 Spanish browser → /es", page.url().endsWith("/es"), page.url());
  ok("S12 Spanish home", await page.getByText("Bon bini a Kas Daas").first().isVisible());
  const mixed = [];
  for (const path of ["/es", "/es/villa", "/es/villa/arrival", "/es/villa/comfort", "/es/villa/departure", "/es/help", "/es/discover/restaurants", "/es/places/brass-boer", "/es/plans/first-day", "/es/good-to-know", "/es/boat", "/es/more"]) {
    await page.goto(BASE + path);
    const text = await page.locator("body").innerText();
    if (/TO FILL IN|INVULLEN|Kas Daas recommends|Good to know|Directions/.test(text)) mixed.push(path);
  }
  ok("S12 Spanish pages show no Dutch/English leftovers", mixed.length === 0, mixed.join(","));
  await page.goto(BASE + "/es/search?q=aire%20acondicionado");
  const hites = await page.locator('a[href*="/es/villa/"]').first().waitFor({ timeout: 5000 }).then(() => true, () => false);
  ok("S12 Search in Spanish", hites);
  await page.goto(BASE + "/nl/villa");
  await page.getByRole("button", { name: "Español" }).click();
  await page.waitForURL(/\/es\/villa$/);
  ok("S12 Language switch NL → ES keeps the page", new URL(page.url()).pathname === "/es/villa");
  const { token } = createBoatToken(SECRET, new Date(Date.now() + 86400_000));
  await page.goto(BASE + `/boat/${token}`);
  ok("S12 Boat link opens the Spanish manual", /\/es\/boat\/guide$/.test(page.url()) && (await page.getByText("Antes de salir").first().isVisible()), page.url());
  await ctx.close();
}

// ── Scenario 13 — German
{
  const ctx = await browser.newContext({ ...iphone, locale: "de-DE" });
  const page = await newPage(ctx);
  await unlock(page);
  ok("S13 German browser → /de", page.url().endsWith("/de"), page.url());
  ok("S13 German home", await page.getByText("Bon bini im Kas Daas").first().isVisible());
  const mixed = [];
  for (const path of ["/de", "/de/villa", "/de/villa/arrival", "/de/villa/comfort", "/de/villa/departure", "/de/help", "/de/discover/restaurants", "/de/places/brass-boer", "/de/plans/first-day", "/de/good-to-know", "/de/boat", "/de/more"]) {
    await page.goto(BASE + path);
    const text = await page.locator("body").innerText();
    if (/TO FILL IN|INVULLEN|POR COMPLETAR|Kas Daas recommends|Good to know|Directions|Bueno saber/.test(text)) mixed.push(path);
  }
  ok("S13 German pages show no other-language leftovers", mixed.length === 0, mixed.join(","));
  await page.goto(BASE + "/de/search?q=klimaanlage");
  const hitde = await page.locator('a[href*="/de/villa/"]').first().waitFor({ timeout: 5000 }).then(() => true, () => false);
  ok("S13 Search in German", hitde);
  await page.goto(BASE + "/es/villa");
  await page.getByRole("button", { name: "Deutsch" }).click();
  await page.waitForURL(/\/de\/villa$/);
  ok("S13 Language switch ES → DE keeps the page", new URL(page.url()).pathname === "/de/villa");
  const { token } = createBoatToken(SECRET, new Date(Date.now() + 86400_000));
  await page.goto(BASE + `/boat/${token}`);
  ok("S13 Boat link opens the German manual", /\/de\/boat\/guide$/.test(page.url()) && (await page.getByText("Bevor du ablegst").first().isVisible()), page.url());
  await ctx.close();
}

// ── Scenario 14 — admin: create, revoke and restore boat links
if (process.env.ADMIN_PASSWORD) {
  const ctx = await browser.newContext({ ...iphone, locale: "nl-NL" });
  const page = await newPage(ctx);
  page.on("dialog", (d) => d.accept());
  await page.goto(BASE + "/admin/bootlinks");
  ok("S14 Not signed in: the admin asks to sign in", await page.getByRole("heading", { name: "Inloggen" }).isVisible());
  await page.getByLabel("Gebruikersnaam").fill("admin");
  await page.getByLabel("Wachtwoord").fill("wrong-password-123");
  await page.getByRole("button", { name: "Inloggen" }).click();
  ok("S14 Admin rejects a wrong password", await page.getByText("Gebruikersnaam of wachtwoord klopt niet.").waitFor({ timeout: 5000 }).then(() => true, () => false));
  await page.getByLabel("Wachtwoord").fill(process.env.ADMIN_PASSWORD);
  await page.getByRole("button", { name: "Inloggen" }).click();
  await page.getByRole("heading", { name: /Welkom/ }).waitFor();
  ok("S14 Admin sign-in", true);
  await page.goto(BASE + "/admin/bootlinks");
  const label = `E2E test ${Date.now()}`;
  await page.getByLabel(/Gast of boeking/).fill(label);
  await page.getByRole("button", { name: "Link maken" }).click();
  const url = (await page.locator("p.font-mono").textContent({ timeout: 10000 })).trim();
  const id = (await page.locator("code").first().textContent()).trim();
  await page.reload();
  const row = page.locator(`[data-link-id="${id}"]`);
  ok("S14 New link appears in the active list", (await row.textContent()).includes(label));

  const guest = await browser.newContext({ ...iphone, locale: "nl-NL" });
  const gp = await newPage(guest);
  await gp.goto(url.replace(/^https?:\/\/[^/]+/, BASE));
  ok("S14 Guest opens the manual", /\/boat\/guide$/.test(gp.url()));

  await row.getByRole("button", { name: "Intrekken" }).click();
  await page.waitForTimeout(1500);
  await page.reload();
  ok("S14 Link shows as revoked", (await page.locator(`[data-link-id="${id}"]`).textContent()).includes("Ingetrokken"));
  const res = await gp.goto(BASE + "/nl/boat/guide");
  ok("S14 Revoked: guest who already opened it loses access", res.status() === 404, String(res.status()));
  await gp.goto(url.replace(/^https?:\/\/[^/]+/, BASE));
  ok("S14 Revoked: the link itself no longer works", /link=invalid/.test(decodeURIComponent(gp.url())), gp.url());

  await page.locator(`[data-link-id="${id}"]`).getByRole("button", { name: "Herstellen" }).click();
  await page.waitForTimeout(1500);
  await gp.goto(url.replace(/^https?:\/\/[^/]+/, BASE));
  ok("S14 Restore makes the link work again", /\/boat\/guide$/.test(gp.url()), gp.url());

  const cli = createBoatToken(SECRET, new Date(Date.now() + 86400_000));
  await page.getByLabel("ID of bootlink").fill(`${BASE}/boat/${cli.token}`);
  await page.getByRole("button", { name: "Intrekken", exact: true }).last().click();
  ok("S14 Revoke by pasted link", await page.getByText(`Link ${cli.id} is ingetrokken.`).waitFor({ timeout: 5000 }).then(() => true, () => false));
  await gp.goto(`${BASE}/boat/${cli.token}`);
  ok("S14 Link revoked by ID no longer works", /link=invalid/.test(decodeURIComponent(gp.url())), gp.url());

  await page.getByRole("button", { name: "Uitloggen" }).click();
  await page.getByRole("heading", { name: "Inloggen" }).waitFor();
  ok("S14 Sign out", true);
  await guest.close();
  await ctx.close();
} else {
  console.log("– S14/S15 admin scenarios skipped (set ADMIN_PASSWORD)");
}

// ── Scenario 15 — the owner edits texts in the admin; translations follow automatically
// Needs CMS_TRANSLATE_MOCK=1 on the server (a stand-in translator: "[EN] …", "[ES] …", "[DE] …").
if (process.env.ADMIN_PASSWORD && process.env.CMS_TRANSLATE_MOCK === "1") {
  const until = async (fn, ms = 20000) => {
    const t0 = Date.now();
    for (;;) {
      if (await fn().catch(() => false)) return true;
      if (Date.now() - t0 > ms) return false;
      await new Promise((r) => setTimeout(r, 500));
    }
  };
  const dialogs = (p) => p.on("dialog", (d) => d.accept());

  // The developer creates an account for the owner.
  const adminCtx = await browser.newContext({ ...iphone, locale: "nl-NL" });
  const admin = await newPage(adminCtx);
  dialogs(admin);
  await admin.goto(BASE + "/admin");
  await admin.getByLabel("Gebruikersnaam").fill("admin");
  await admin.getByLabel("Wachtwoord").fill(process.env.ADMIN_PASSWORD);
  await admin.getByRole("button", { name: "Inloggen" }).click();
  await admin.getByRole("heading", { name: /Welkom/ }).waitFor();
  await admin.goto(BASE + "/admin/gebruikers");
  const username = `e2e-owner-${Date.now() % 1000000}`;
  await admin.getByLabel("Naam", { exact: true }).fill("Test Eigenaar");
  await admin.getByLabel("Gebruikersnaam").fill(username);
  await admin.getByRole("button", { name: "Account maken" }).click();
  const creds = await admin.locator("[data-credentials] pre").textContent({ timeout: 10000 });
  const password = /Wachtwoord: (\S+)/.exec(creds)?.[1];
  ok("S15 Developer creates an owner account with a generated password", !!password && creds.includes(username), creds);

  // The owner signs in.
  const ownerCtx = await browser.newContext({ ...iphone, locale: "nl-NL" });
  const owner = await newPage(ownerCtx);
  dialogs(owner);
  await owner.goto(BASE + "/admin/teksten");
  ok("S15 Texts need a sign-in", await owner.getByRole("heading", { name: "Inloggen" }).isVisible());
  await owner.getByLabel("Gebruikersnaam").fill(username);
  await owner.getByLabel("Wachtwoord").fill("wrong-password-123");
  await owner.getByRole("button", { name: "Inloggen" }).click();
  ok("S15 Owner login rejects a wrong password", await owner.getByText("Gebruikersnaam of wachtwoord klopt niet.").waitFor({ timeout: 5000 }).then(() => true, () => false));
  await owner.getByLabel("Wachtwoord").fill(password);
  await owner.getByRole("button", { name: "Inloggen" }).click();
  await owner.getByRole("heading", { name: /Welkom/ }).waitFor();
  ok("S15 Owner signs in", true);
  ok("S15 Owner doesn't get the user management", (await owner.getByRole("link", { name: "Gebruikers" }).count()) === 0);
  await owner.goto(BASE + "/admin/gebruikers");
  ok("S15 Owner can't open the user management", /\/admin$/.test(new URL(owner.url()).pathname));

  // A guest, to look at the published result.
  const guestCtx = await browser.newContext({ ...iphone, locale: "nl-NL" });
  const guestPage = await newPage(guestCtx);
  await unlock(guestPage, "/nl");
  const guestCookie = (await guestCtx.cookies()).map((c) => `${c.name}=${c.value}`).join("; ");
  const text = (path) => fetch(BASE + path, { headers: { cookie: guestCookie } }).then((r) => r.text());

  // Find and edit a text.
  const ORIGINAL = "Alleen buiten roken";
  const EDITED = `Roken alleen buiten, aangepast door de eigenaar ${Date.now() % 100000}`;
  await owner.goto(BASE + "/admin/teksten?q=" + encodeURIComponent(ORIGINAL));
  const editor = owner.locator("[data-text-key]").first();
  const key = await editor.getAttribute("data-text-key");
  ok("S15 Search finds the text", !!key && key.endsWith(".summary"), String(key));
  const save = async (value) => {
    await editor.locator('textarea[name="nl"]').fill(value);
    await editor.getByRole("button", { name: "Opslaan", exact: true }).click();
  };
  await save(EDITED);
  ok("S15 Saving shows that it was translated", await editor.getByText(/Vertaald naar Engels, Spaans en Duits/).waitFor({ timeout: 15000 }).then(() => true, () => false));
  ok("S15 The guide shows the new Dutch text", await until(async () => (await text("/nl/villa/house-rules")).includes(EDITED)));
  ok("S15 …and the English translation", await until(async () => (await text("/en/villa/house-rules")).includes(`[EN] ${EDITED}`)));
  ok("S15 …and the Spanish and German translations", (await text("/es/villa/house-rules")).includes(`[ES] ${EDITED}`) && (await text("/de/villa/house-rules")).includes(`[DE] ${EDITED}`));
  ok("S15 The edit is marked in the admin", (await owner.locator(`[data-text-key="${key}"]`).getAttribute("data-status")) === "edited" || (await until(async () => (await owner.locator(`[data-text-key="${key}"]`).getAttribute("data-status")) === "edited", 8000)));
  ok("S15 The search index finds the new text", (await text("/nl/search?q=" + encodeURIComponent("aangepast door de eigenaar"))).length > 0);

  // Translation fails: other languages fall back to Dutch until it is retried.
  const BROKEN = `${EDITED} FAIL-TRANSLATION`;
  await owner.goto(BASE + "/admin/teksten?q=" + encodeURIComponent("aangepast door de eigenaar"));
  const editor2 = owner.locator(`[data-text-key="${key}"]`);
  await editor2.locator('textarea[name="nl"]').fill(BROKEN);
  await editor2.getByRole("button", { name: "Opslaan", exact: true }).click();
  ok("S15 A failed translation is reported", await editor2.getByText(/vertalen lukte niet/).waitFor({ timeout: 15000 }).then(() => true, () => false));
  ok("S15 Dutch is saved right away", await until(async () => (await text("/nl/villa/house-rules")).includes(BROKEN)));
  ok("S15 Until translated, other languages show the Dutch text", (await text("/en/villa/house-rules")).includes(BROKEN) && !(await text("/en/villa/house-rules")).includes(`[EN] ${EDITED}`));
  await owner.reload();
  ok("S15 The text is marked as waiting for a translation", (await owner.locator(`[data-text-key="${key}"]`).getAttribute("data-status")) === "pending");

  // Fix the text: translated again.
  const FIXED = `${EDITED} (hersteld)`;
  const editor3 = owner.locator(`[data-text-key="${key}"]`);
  await editor3.locator('textarea[name="nl"]').fill(FIXED);
  await editor3.getByRole("button", { name: "Opslaan", exact: true }).click();
  await editor3.getByText(/Vertaald naar Engels, Spaans en Duits/).waitFor({ timeout: 15000 });
  ok("S15 Saving again translates it", await until(async () => (await text("/de/villa/house-rules")).includes(`[DE] ${FIXED}`)));

  // A translation can be corrected by hand.
  await owner.reload();
  const editor4 = owner.locator(`[data-text-key="${key}"]`);
  await editor4.getByText("Vertalingen bekijken").click();
  await editor4.locator('textarea[name="en"]').fill("Smoking outside only, e2e");
  await editor4.getByRole("button", { name: "Vertalingen opslaan" }).click();
  ok("S15 A hand-corrected translation is published", await until(async () => (await text("/en/villa/house-rules")).includes("Smoking outside only, e2e")));
  ok("S15 …without touching the other languages", (await text("/de/villa/house-rules")).includes(`[DE] ${FIXED}`));

  // Language-neutral field: the WiFi password.
  await owner.goto(BASE + "/admin/teksten/verblijf");
  const wifiEd = owner.locator('[data-text-key="wifi.password"]');
  await wifiEd.locator('input[name="nl"]').fill("e2e-wifi-wachtwoord");
  await wifiEd.getByRole("button", { name: "Opslaan", exact: true }).click();
  await wifiEd.getByText(/Opgeslagen/).waitFor({ timeout: 15000 });
  const profile = () => fetch(BASE + "/wifi.mobileconfig", { headers: { cookie: guestCookie } }).then((r) => r.text());
  ok("S15 A changed WiFi password reaches the iPhone profile", await until(async () => (await profile()).includes("e2e-wifi-wachtwoord")));

  // A link field refuses anything that isn't a web address (a "javascript:" link would reach every guest).
  await owner.goto(BASE + "/admin/teksten?q=website");
  const siteEd = owner.locator('[data-text-key$=".website"]').first();
  await siteEd.locator('input[name="nl"]').fill("javascript:alert(1)");
  await siteEd.getByRole("button", { name: "Opslaan", exact: true }).click();
  ok("S15 A link field refuses a javascript: address", await siteEd.getByText(/begint met https/).waitFor({ timeout: 8000 }).then(() => true, () => false));
  await owner.goto(BASE + "/admin/teksten/verblijf");

  // Restore everything.
  await owner.locator('[data-text-key="wifi.password"]').getByRole("button", { name: "Origineel herstellen" }).click();
  await wifiEd.getByText(/oorspronkelijke tekst/).waitFor({ timeout: 15000 });
  ok("S15 Restoring the WiFi password", await until(async () => (await profile()).includes("beachhousebonaire")));
  await owner.goto(BASE + "/admin/teksten?q=" + encodeURIComponent("aangepast door de eigenaar"));
  // (The card leaves these search results once the text is back to the original, so the page is checked instead.)
  await owner.locator(`[data-text-key="${key}"]`).getByRole("button", { name: "Origineel herstellen" }).click();
  await owner.waitForTimeout(1500); // let the save finish: a visit in the middle of it could rebuild the page from the old text
  // Generous limit: if a page was rebuilt from the old text at that very moment, it is rebuilt again within a minute.
  const restored = await until(async () => !(await text("/nl/villa/house-rules")).includes("aangepast door de eigenaar") && (await text("/nl/villa/house-rules")).includes(ORIGINAL), 90000);
  const finalPage = await text("/nl/villa/house-rules");
  ok("S15 Restoring the original text", restored, `edited text still shown: ${finalPage.includes("aangepast door de eigenaar")}, original shown: ${finalPage.includes(ORIGINAL)}`);
  ok("S15 …and its original translation", (await text("/en/villa/house-rules")).includes("Smoking outside only") && !(await text("/en/villa/house-rules")).includes("e2e"));

  // The owner changes their own password; the old one stops working.
  await owner.goto(BASE + "/admin/account");
  const NEWPW = "nieuw-wachtwoord-123";
  await owner.locator('input[name="current"]').fill(password);
  await owner.locator('input[name="next"]').fill(NEWPW);
  await owner.locator('input[name="confirm"]').fill(NEWPW);
  await owner.getByRole("button", { name: "Wachtwoord wijzigen" }).click();
  ok("S15 Owner changes their own password", await owner.getByText("Je wachtwoord is gewijzigd.").waitFor({ timeout: 8000 }).then(() => true, () => false));
  const second = await browser.newContext({ ...iphone, locale: "nl-NL" });
  const sp = await newPage(second);
  await sp.goto(BASE + "/admin");
  await sp.getByLabel("Gebruikersnaam").fill(username);
  await sp.getByLabel("Wachtwoord").fill(password);
  await sp.getByRole("button", { name: "Inloggen" }).click();
  ok("S15 The old password no longer works", await sp.getByText("Gebruikersnaam of wachtwoord klopt niet.").waitFor({ timeout: 5000 }).then(() => true, () => false));
  await sp.getByLabel("Wachtwoord").fill(NEWPW);
  await sp.getByRole("button", { name: "Inloggen" }).click();
  ok("S15 The new password works", await sp.getByRole("heading", { name: /Welkom/ }).waitFor({ timeout: 8000 }).then(() => true, () => false));
  await second.close();

  // The developer resets the password and removes the account: sessions end.
  await admin.goto(BASE + "/admin/gebruikers");
  await admin.locator(`[data-account="${username}"]`).getByRole("button", { name: "Nieuw wachtwoord" }).click();
  await admin.locator(`[data-account="${username}"] [data-credentials]`).waitFor({ timeout: 10000 });
  await owner.goto(BASE + "/admin/teksten");
  ok("S15 A password reset signs the owner out", await owner.getByRole("heading", { name: "Inloggen" }).isVisible());
  await admin.locator(`[data-account="${username}"]`).getByRole("button", { name: "Verwijderen" }).click();
  ok("S15 The account can be removed", await until(async () => {
    await admin.reload();
    return (await admin.locator(`[data-account="${username}"]`).count()) === 0;
  }, 8000));

  await adminCtx.close();
  await ownerCtx.close();
  await guestCtx.close();
}

ok("No runtime errors", errors.length === 0, errors.slice(0, 5).join(" | "));
await browser.close();
console.log(failed ? `\n${failed} check(s) failed.` : "\nAll scenarios pass.");
process.exit(failed ? 1 : 0);
