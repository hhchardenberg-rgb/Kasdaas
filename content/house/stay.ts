import { l, todo } from "../_helpers";
import type { Localized } from "@/lib/i18n";

/**
 * ─────────────────────────────────────────────────────────────────────────────
 *  STAY BASICS — check-in / check-out and WiFi
 * ─────────────────────────────────────────────────────────────────────────────
 */
export const stay = {
  checkInTime: l("Vanaf 16:00", "From 4:00 pm", "A partir de las 16:00", "Ab 16:00 Uhr"),
  checkOutTime: l("Uiterlijk 10:00", "By 10:00 am", "Antes de las 10:00", "Bis 10:00 Uhr"),
  /** Late check-out possible? */
  lateCheckOut: l("Late check-out is in principe niet mogelijk, maar vragen kan altijd.", "Late check-out isn't normally possible, but feel free to ask.", "Normalmente no es posible un check-out tardío, pero siempre puedes preguntar.", "Ein später Check-out ist normalerweise nicht möglich, aber frag gern nach."),
};

export const wifi = {
  network: "KASDAAS",
  password: "beachhousebonaire",
  /** "WPA" (most common), "WEP" or "nopass" — used for the WiFi QR code. */
  security: "WPA" as "WPA" | "WEP" | "nopass",
  /** Optional second network (e.g. outdoor / pool area). */
  extraNetworks: [] as { name: string; password: string; note?: Localized }[],
  coverage: todo("WIFI-BEREIK (BIJV. OOK BIJ HET ZWEMBAD?)", "WIFI COVERAGE (E.G. ALSO BY THE POOL?)", "COBERTURA WIFI (P. EJ. ¿TAMBIÉN EN LA PISCINA?)", "WLAN-ABDECKUNG (Z. B. AUCH AM POOL?)"),
  router: todo("LOCATIE ROUTER / WAT TE DOEN BIJ STORING", "ROUTER LOCATION / WHAT TO DO IF IT DROPS", "UBICACIÓN DEL ROUTER / QUÉ HACER SI SE CAE", "STANDORT DES ROUTERS / WAS TUN BEI AUSFALL"),
  tip: l(
    "Tip: zet je telefoon op wifi zodra je binnen bent — handig voor video's, kaarten en het downloaden van deze gids voor offline gebruik.",
    "Tip: switch your phone to WiFi as soon as you're inside — handy for videos, maps and saving this guide for offline use.", "Consejo: conecta tu teléfono al wifi nada más entrar; práctico para vídeos, mapas y para guardar esta guía para usarla sin conexión.", "Tipp: Verbinde dein Handy mit dem WLAN, sobald du drinnen bist – praktisch für Videos, Karten und um diesen Guide für die Offline-Nutzung zu speichern.",
  ),
};
