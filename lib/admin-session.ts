import "server-only";
import { createHash, createHmac, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";

/**
 * Admin sign-in. The cookie holds an HMAC derived from ADMIN_PASSWORD and an
 * expiry — never the password itself. Changing ADMIN_PASSWORD signs everyone out.
 */
export const ADMIN_COOKIE = "kd_admin";
const SESSION_S = 12 * 3600;

export function adminPassword(): string | undefined {
  const p = process.env.ADMIN_PASSWORD;
  return p && p.length >= 10 ? p : undefined;
}

const sha = (s: string) => createHash("sha256").update(s).digest();

export function isAdminPassword(given: string): boolean {
  const expected = adminPassword();
  return !!expected && timingSafeEqual(sha(given), sha(expected));
}

function sign(exp: number, password: string): string {
  return createHmac("sha256", password).update(`kd-admin-v1:${exp}`).digest("base64url");
}

export async function startAdminSession(): Promise<void> {
  const password = adminPassword();
  if (!password) return;
  const exp = Math.floor(Date.now() / 1000) + SESSION_S;
  (await cookies()).set(ADMIN_COOKIE, `${exp}.${sign(exp, password)}`, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/admin",
    maxAge: SESSION_S,
  });
}

export async function endAdminSession(): Promise<void> {
  (await cookies()).set(ADMIN_COOKIE, "", { path: "/admin", maxAge: 0 });
}

export async function isAdmin(): Promise<boolean> {
  const password = adminPassword();
  if (!password) return false;
  const value = (await cookies()).get(ADMIN_COOKIE)?.value ?? "";
  const [expStr, mac] = value.split(".");
  const exp = Number(expStr);
  if (!exp || !mac || exp < Date.now() / 1000) return false;
  const expected = Buffer.from(sign(exp, password));
  const given = Buffer.from(mac);
  return given.length === expected.length && timingSafeEqual(given, expected);
}
