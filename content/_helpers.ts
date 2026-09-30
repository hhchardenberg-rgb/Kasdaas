import type { Localized } from "@/lib/i18n";

/**
 * Marks information that the owner still has to provide.
 * Renders as "[WIFI-NETWERK INVULLEN]" (nl), "[TO FILL IN: WIFI NETWORK]" (en)
 * and "[POR COMPLETAR: RED WIFI]" (es).
 * Search the codebase for `todo(` to find every open item (or run `npm run content:todo`).
 */
export function todo(nl: string, en: string, es: string): Localized {
  return { nl: `[${nl} INVULLEN]`, en: `[TO FILL IN: ${en}]`, es: `[POR COMPLETAR: ${es}]` };
}

/** Shorthand for a localized string: Dutch, English, Spanish. */
export function l(nl: string, en: string, es: string): Localized {
  return { nl, en, es };
}
