import "server-only";

/**
 * ─────────────────────────────────────────────────────────────────────────────
 *  🔒 BOAT ACCESS — REVOCATION LIST
 *  Boat links are signed and expire automatically. To block a link before it
 *  expires, add its ID (printed when the link was created) below, or set the
 *  environment variable BOAT_REVOKED_IDS="id1,id2" and redeploy.
 * ─────────────────────────────────────────────────────────────────────────────
 */
export const revokedBoatTokenIds: string[] = [
  // "a1b2c3d4e5f6", // example: booking Smith, revoked 2026-10-01
];
