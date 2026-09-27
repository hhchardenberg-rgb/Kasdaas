/**
 * End-to-end check of the 10 UX scenarios from the brief.
 *
 *   BOAT_TOKEN_SECRET=… npm run build && BOAT_TOKEN_SECRET=… npm start -- -p 3100
 *   BOAT_TOKEN_SECRET=… BASE=http://localhost:3100 npm run test:e2e
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
  ok("S0 Wrong password rejected", await page.getByRole("alert").isVisible());
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
  const first = await page.locator('main a[href*="/villa/departure"]').first().isVisible();
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
  for (const path of ["/en", "/nl", "/en/boat", "/nl/boat", "/en/more", "/en/villa", "/en/discover", "/sitemap.xml", "/robots.txt"]) {
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

ok("No runtime errors", errors.length === 0, errors.slice(0, 5).join(" | "));
await browser.close();
console.log(failed ? `\n${failed} check(s) failed.` : "\nAll scenarios pass.");
process.exit(failed ? 1 : 0);
