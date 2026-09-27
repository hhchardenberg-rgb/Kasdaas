import "server-only";
import { cookies } from "next/headers";
import { revokedBoatTokenIds } from "@/content/boat/private/access";
import { createBoatToken, verifyBoatToken, type VerifyResult } from "./token-core";

export const BOAT_COOKIE = "kd_boat";

/** Development-only fallback so the flow can be tried locally. Never used in production. */
const DEV_SECRET = "dev-only-insecure-boat-secret-change-me-0123456789";

export function boatSecret(): string | undefined {
  const s = process.env.BOAT_TOKEN_SECRET;
  if (s && s.length >= 32) return s;
  return process.env.NODE_ENV === "production" ? undefined : DEV_SECRET;
}

function revokedIds(): string[] {
  const env = (process.env.BOAT_REVOKED_IDS ?? "").split(",").filter(Boolean);
  return [...revokedBoatTokenIds, ...env];
}

export function verifyBoatAccess(token: string | undefined): VerifyResult {
  return verifyBoatToken(boatSecret(), token, { revoked: revokedIds() });
}

/** Reads the boat cookie of the current request and validates it. */
export async function currentBoatAccess(): Promise<VerifyResult> {
  const jar = await cookies();
  return verifyBoatAccess(jar.get(BOAT_COOKIE)?.value);
}

export function issueBoatToken(days: number) {
  const secret = boatSecret();
  if (!secret) throw new Error("BOAT_TOKEN_SECRET is not configured.");
  const exp = new Date(Date.now() + Math.max(1, Math.min(days, 60)) * 86400_000);
  return createBoatToken(secret, exp);
}
