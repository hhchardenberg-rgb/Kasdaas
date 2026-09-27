import { l, todo } from "../_helpers";

/**
 * ─────────────────────────────────────────────────────────────────────────────
 *  STAY BASICS — check-in / check-out and WiFi
 * ─────────────────────────────────────────────────────────────────────────────
 */
export const stay = {
  checkInTime: todo("CHECK-INTIJD", "CHECK-IN TIME"),
  checkOutTime: todo("CHECK-OUTTIJD", "CHECK-OUT TIME"),
  /** Late check-out possible? */
  lateCheckOut: todo("LATE CHECK-OUT MOGELIJK? VOORWAARDEN", "LATE CHECK-OUT POSSIBLE? CONDITIONS"),
};

export const wifi = {
  network: todo("WIFI-NETWERK", "WIFI NETWORK"),
  password: todo("WIFI-WACHTWOORD", "WIFI PASSWORD"),
  /** "WPA" (most common), "WEP" or "nopass" — used for the WiFi QR code. */
  security: "WPA" as "WPA" | "WEP" | "nopass",
  /** Optional second network (e.g. outdoor / pool area). */
  extraNetworks: [] as { name: string; password: string; note?: { nl: string; en: string } }[],
  coverage: todo("WIFI-BEREIK (BIJV. OOK BIJ HET ZWEMBAD?)", "WIFI COVERAGE (E.G. ALSO BY THE POOL?)"),
  router: todo("LOCATIE ROUTER / WAT TE DOEN BIJ STORING", "ROUTER LOCATION / WHAT TO DO IF IT DROPS"),
  tip: l(
    "Tip: zet je telefoon op wifi zodra je binnen bent — handig voor video's, kaarten en het downloaden van deze gids voor offline gebruik.",
    "Tip: switch your phone to WiFi as soon as you're inside — handy for videos, maps and saving this guide for offline use.",
  ),
};
