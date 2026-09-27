/**
 * ─────────────────────────────────────────────────────────────────────────────
 *  🔒 GUEST PASSWORD — access to the whole guide.
 *  Server-side only: used by proxy.ts and the welcome page's server action.
 *  NEVER import this file from a client component.
 *
 *  Change the password with the GUEST_PASSWORD environment variable (preferred)
 *  or here. Changing it logs everyone out: guests need the new password.
 *  Set GUEST_PASSWORD="off" to disable the password entirely.
 * ─────────────────────────────────────────────────────────────────────────────
 */
export const guestAccess = {
  password: process.env.GUEST_PASSWORD || "beachhousebonaire",
  /** How long a device stays unlocked. */
  cookieDays: 180,
};
