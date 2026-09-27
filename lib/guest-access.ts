/**
 * Guest password gate. Kept framework-free so proxy.ts can use it.
 * The cookie holds a hash derived from the password — never the password itself —
 * so changing the password (or the salt) locks every device out again.
 */
import { createHash, timingSafeEqual } from "node:crypto";
import { guestAccess } from "@/content/private/guest-access";

export const GUEST_COOKIE = "kd_guest";

export function guestGateEnabled(): boolean {
  return guestAccess.password.toLowerCase() !== "off";
}

function digest(value: string): Buffer {
  return createHash("sha256").update(value).digest();
}

/** The cookie value that proves the password was entered. */
export function guestToken(): string {
  const salt = process.env.GUEST_COOKIE_SALT || process.env.BOAT_TOKEN_SECRET || "kd";
  return digest(`kd-guest-v1:${salt}:${guestAccess.password}`).toString("base64url");
}

export function isValidGuestCookie(value: string | undefined): boolean {
  if (!guestGateEnabled()) return true;
  if (!value) return false;
  const a = Buffer.from(value);
  const b = Buffer.from(guestToken());
  return a.length === b.length && timingSafeEqual(a, b);
}

/** Case-insensitive, whitespace-tolerant (guests type on phones). */
export function isGuestPassword(input: string): boolean {
  const norm = (s: string) => s.trim().toLowerCase();
  return timingSafeEqual(digest(norm(input)), digest(norm(guestAccess.password)));
}

export const guestCookieOptions = {
  httpOnly: true,
  sameSite: "lax" as const,
  path: "/",
  secure: process.env.NODE_ENV === "production",
  maxAge: guestAccess.cookieDays * 86400,
};
