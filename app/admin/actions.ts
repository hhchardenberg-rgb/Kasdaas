"use server";
import { createHash, timingSafeEqual } from "node:crypto";
import { issueBoatToken } from "@/lib/boat/access";
import { qrSvg } from "@/lib/qr";
import { site } from "@/content/site";

export interface LinkResult {
  error?: string;
  url?: string;
  id?: string;
  expires?: string;
  qr?: string;
  message?: string;
}

const sha = (s: string) => createHash("sha256").update(s).digest();

let failures = 0;
let lockedUntil = 0;

/** Creates a signed boat link. Protected by ADMIN_PASSWORD (admin is disabled without it). */
export async function createBoatLink(_prev: LinkResult, form: FormData): Promise<LinkResult> {
  const expected = process.env.ADMIN_PASSWORD;
  if (!expected || expected.length < 10) return { error: "Admin is disabled: set ADMIN_PASSWORD (min. 10 characters)." };
  if (Date.now() < lockedUntil) return { error: "Too many attempts. Try again in a minute." };
  const given = String(form.get("password") ?? "");
  if (!timingSafeEqual(sha(given), sha(expected))) {
    failures += 1;
    if (failures >= 5) {
      lockedUntil = Date.now() + 60_000;
      failures = 0;
    }
    return { error: "Wrong password." };
  }
  failures = 0;
  const days = Math.min(60, Math.max(1, Number(form.get("days")) || 3));
  const lang = form.get("lang") === "en" ? "en" : "nl";
  try {
    const { token, id, exp } = issueBoatToken(days);
    const base = String(form.get("origin") || site.url).replace(/\/$/, "");
    const url = `${base}/boat/${token}`;
    const expires = new Date(exp * 1000).toISOString().replace("T", " ").slice(0, 16) + " UTC";
    const message =
      lang === "nl"
        ? `Hier vind je alle informatie over de boot 🚤\n${url}\n\nDeze link is persoonlijk en geldig tot ${expires}.`
        : `Here's everything you need to know about the boat 🚤\n${url}\n\nThis link is personal and valid until ${expires}.`;
    return { url, id, expires, qr: await qrSvg(url), message };
  } catch (e) {
    return { error: e instanceof Error ? e.message : "Could not create link." };
  }
}
