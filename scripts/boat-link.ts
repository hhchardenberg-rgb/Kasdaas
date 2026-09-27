/**
 * Create a private boat-manual link for a renter.
 *
 *   npm run boat:link -- --days 3 [--base https://kasdaas.example.com] [--svg qr.svg]
 *   npm run boat:link -- --verify <token>
 *
 * Needs BOAT_TOKEN_SECRET (same value as on the server), e.g. from .env.local.
 */
import { readFileSync, writeFileSync, existsSync } from "node:fs";
import QRCode from "qrcode";
import { createBoatToken, verifyBoatToken } from "../lib/boat/token-core.ts";

// Minimal .env.local loader (no dependency).
for (const f of [".env.local", ".env"]) {
  if (!existsSync(f)) continue;
  for (const line of readFileSync(f, "utf8").split("\n")) {
    const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*"?(.*?)"?\s*$/);
    if (m && !process.env[m[1]]) process.env[m[1]] = m[2];
  }
}

const args = process.argv.slice(2);
const opt = (name: string) => {
  const i = args.indexOf(`--${name}`);
  return i >= 0 ? args[i + 1] : undefined;
};

const secret = process.env.BOAT_TOKEN_SECRET;
if (!secret || secret.length < 32) {
  console.error("✗ BOAT_TOKEN_SECRET is missing or shorter than 32 characters.\n  Generate one with: openssl rand -base64 48");
  process.exit(1);
}

const toVerify = opt("verify");
if (toVerify) {
  console.log(verifyBoatToken(secret, toVerify));
  process.exit(0);
}

const days = Math.min(60, Math.max(1, Number(opt("days") ?? 3)));
const base = (opt("base") ?? process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000").replace(/\/$/, "");
const { token, id, exp } = createBoatToken(secret, new Date(Date.now() + days * 86400_000));
const url = `${base}/boat/${token}`;

console.log(`\n🚤  Boat manual link (valid ${days} day${days > 1 ? "s" : ""}, until ${new Date(exp * 1000).toISOString()})\n`);
console.log(`   ${url}\n`);
console.log(`   ID for revoking: ${id}\n`);
console.log(await QRCode.toString(url, { type: "terminal", small: true }));
const svg = opt("svg");
if (svg) {
  writeFileSync(svg, await QRCode.toString(url, { type: "svg", margin: 1 }));
  console.log(`   QR code saved to ${svg}`);
}
