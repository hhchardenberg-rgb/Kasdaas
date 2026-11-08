import "server-only";
import { createHash, createHmac, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";
import { findUser, type Role } from "@/lib/users";

/**
 * Admin sign-in. The cookie holds the username, a password version and an expiry,
 * signed with an HMAC derived from ADMIN_PASSWORD — never a password.
 * Changing a password (or deleting the account) signs that person out;
 * changing ADMIN_PASSWORD signs everyone out.
 */
export const ADMIN_COOKIE = "kd_admin";
const SESSION_S = 12 * 3600;
/** Reserved username for the developer's login (ADMIN_PASSWORD). */
export const ENV_ADMIN = "admin";

export interface Session {
  username: string;
  name: string;
  role: Role;
}

export function adminPassword(): string | undefined {
  const p = process.env.ADMIN_PASSWORD;
  return p && p.length >= 10 ? p : undefined;
}

const sha = (s: string) => createHash("sha256").update(s).digest();

export function isEnvAdminPassword(given: string): boolean {
  const expected = adminPassword();
  return !!expected && timingSafeEqual(sha(given), sha(expected));
}

function mac(payload: string, secret: string): string {
  return createHmac("sha256", secret).update(`kd-admin-v2:${payload}`).digest("base64url");
}

export async function startSession(username: string, pwv: string): Promise<void> {
  const secret = adminPassword();
  if (!secret) return;
  const payload = Buffer.from(JSON.stringify({ u: username, v: pwv, e: Math.floor(Date.now() / 1000) + SESSION_S })).toString("base64url");
  (await cookies()).set(ADMIN_COOKIE, `${payload}.${mac(payload, secret)}`, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/admin",
    maxAge: SESSION_S,
  });
}

export async function endSession(): Promise<void> {
  (await cookies()).set(ADMIN_COOKIE, "", { path: "/admin", maxAge: 0 });
}

/** The signed-in person, or null. Looks the account up on every call, so deleted accounts lose access at once. */
export async function getSession(): Promise<Session | null> {
  const secret = adminPassword();
  if (!secret) return null;
  const value = (await cookies()).get(ADMIN_COOKIE)?.value ?? "";
  const [payload, given] = value.split(".");
  if (!payload || !given) return null;
  const expected = Buffer.from(mac(payload, secret));
  const actual = Buffer.from(given);
  if (actual.length !== expected.length || !timingSafeEqual(actual, expected)) return null;
  let data: { u?: string; v?: string; e?: number };
  try {
    data = JSON.parse(Buffer.from(payload, "base64url").toString());
  } catch {
    return null;
  }
  if (!data.u || !data.e || data.e < Date.now() / 1000) return null;
  if (data.u === ENV_ADMIN) return { username: ENV_ADMIN, name: "Beheerder", role: "admin" };
  try {
    const user = await findUser(data.u);
    if (!user || user.pwv !== data.v) return null;
    return { username: user.username, name: user.name, role: user.role };
  } catch (e) {
    console.error("[admin] could not load account", e);
    return null;
  }
}
