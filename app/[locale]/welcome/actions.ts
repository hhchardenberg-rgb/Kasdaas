"use server";
import { cookies, headers } from "next/headers";
import { redirect, RedirectType } from "next/navigation";
import { GUEST_COOKIE, guestCookieOptions, guestToken, isGuestPassword } from "@/lib/guest-access";

export interface UnlockState {
  error?: "wrong" | "tooMany";
}

// Simple in-memory throttle (per server instance) against guessing.
const attempts = new Map<string, { n: number; until: number }>();

export async function unlockGuide(_prev: UnlockState, form: FormData): Promise<UnlockState> {
  const locale = form.get("locale") === "nl" ? "nl" : "en";
  const h = await headers();
  const key = (h.get("x-forwarded-for")?.split(",")[0] || h.get("x-real-ip") || "local").trim().slice(0, 64);
  const now = Date.now();
  const rec = attempts.get(key);
  if (rec && rec.until > now) return { error: "tooMany" };

  if (!isGuestPassword(String(form.get("password") ?? ""))) {
    const n = (rec?.n ?? 0) + 1;
    attempts.set(key, { n: n >= 8 ? 0 : n, until: n >= 8 ? now + 60_000 : 0 });
    return { error: "wrong" };
  }
  attempts.delete(key);
  const jar = await cookies();
  jar.set(GUEST_COOKIE, guestToken(), guestCookieOptions);
  const next = String(form.get("next") ?? "");
  // Only allow internal guide paths as destination.
  // Replace (not push): the password screen should not stay in the history,
  // otherwise "back" would return to it.
  redirect(/^\/(nl|en)(\/[\w\-/]*)?(\?[\w\-=&%.]*)?$/.test(next) ? next : `/${locale}`, RedirectType.replace);
}
