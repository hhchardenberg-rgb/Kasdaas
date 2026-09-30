import "server-only";

/**
 * ─────────────────────────────────────────────────────────────────────────────
 *  🔒 BOAT ACCESS — REVOCATION LIST
 *  Boat links are signed and expire automatically. The easiest way to block a
 *  link before it expires is the Revoke button on /admin (works immediately).
 *  Alternatively add its ID below, or set BOAT_REVOKED_IDS="id1,id2", and redeploy.
 * ─────────────────────────────────────────────────────────────────────────────
 */
export const revokedBoatTokenIds: string[] = [
  // "a1b2c3d4e5f6", // example: booking Smith, revoked 2026-10-01
];
