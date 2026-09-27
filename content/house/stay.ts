import { l, todo } from "../_helpers";

/**
 * ─────────────────────────────────────────────────────────────────────────────
 *  STAY BASICS — check-in / check-out and WiFi
 * ─────────────────────────────────────────────────────────────────────────────
 */
export const stay = {
  checkInTime: l("Vanaf 16:00", "From 4:00 pm"),
  checkOutTime: l("Uiterlijk 10:00", "By 10:00 am"),
  /** Late check-out possible? */
  lateCheckOut: l("Late check-out is in principe niet mogelijk, maar vragen kan altijd.", "Late check-out isn't normally possible, but feel free to ask."),
};

export const wifi = {
  network: "KASDAAS",
  password: "beachhousebonaire",
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
