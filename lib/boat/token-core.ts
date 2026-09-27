/**
 * Boat access tokens — compact, signed, expiring.
 *
 * Layout (27 bytes → 36 base64url chars):
 *   [0]      version (1)
 *   [1..6]   random id (6 bytes, hex id used for revocation)
 *   [7..10]  expiry, unix seconds (uint32 BE)
 *   [11..26] HMAC-SHA256(secret, bytes 0..10), truncated to 16 bytes
 *
 * Stateless by design: works on serverless hosting without a database.
 * Revocation happens through a list of ids (see content/boat/private/access.ts).
 * Kept free of framework imports so the CLI script can use it directly.
 */
import { createHmac, randomBytes, timingSafeEqual } from "node:crypto";

const VERSION = 1;
const PAYLOAD_LEN = 11;
const SIG_LEN = 16;

export interface BoatTokenInfo {
  id: string;
  /** Expiry as unix seconds. */
  exp: number;
}

export type VerifyResult =
  | ({ ok: true } & BoatTokenInfo)
  | { ok: false; reason: "malformed" | "signature" | "expired" | "revoked" | "no-secret" };

function sign(secret: string, payload: Buffer): Buffer {
  return createHmac("sha256", secret).update(payload).digest().subarray(0, SIG_LEN);
}

export function createBoatToken(secret: string, expiresAt: Date): { token: string } & BoatTokenInfo {
  if (!secret || secret.length < 32) throw new Error("BOAT_TOKEN_SECRET must be at least 32 characters.");
  const payload = Buffer.alloc(PAYLOAD_LEN);
  payload[0] = VERSION;
  randomBytes(6).copy(payload, 1);
  const exp = Math.floor(expiresAt.getTime() / 1000);
  payload.writeUInt32BE(exp, 7);
  const token = Buffer.concat([payload, sign(secret, payload)]).toString("base64url");
  return { token, id: payload.subarray(1, 7).toString("hex"), exp };
}

export function verifyBoatToken(
  secret: string | undefined,
  token: string | undefined,
  opts: { now?: number; revoked?: Iterable<string> } = {},
): VerifyResult {
  if (!secret || secret.length < 32) return { ok: false, reason: "no-secret" };
  if (!token || !/^[A-Za-z0-9_-]{36}$/.test(token)) return { ok: false, reason: "malformed" };
  const raw = Buffer.from(token, "base64url");
  if (raw.length !== PAYLOAD_LEN + SIG_LEN || raw[0] !== VERSION) return { ok: false, reason: "malformed" };
  const payload = raw.subarray(0, PAYLOAD_LEN);
  if (!timingSafeEqual(sign(secret, payload), raw.subarray(PAYLOAD_LEN))) return { ok: false, reason: "signature" };
  const id = payload.subarray(1, 7).toString("hex");
  const exp = payload.readUInt32BE(7);
  const now = opts.now ?? Math.floor(Date.now() / 1000);
  if (exp <= now) return { ok: false, reason: "expired" };
  for (const r of opts.revoked ?? []) if (r.trim().toLowerCase() === id) return { ok: false, reason: "revoked" };
  return { ok: true, id, exp };
}
