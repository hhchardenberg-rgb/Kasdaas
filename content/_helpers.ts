import type { Localized } from "@/lib/i18n";

/**
 * Marks information that the owner still has to provide.
 * Renders as "[WIFI-NETWERK INVULLEN]" in Dutch and "[TO FILL IN: WIFI NETWORK]" in English.
 * Search the codebase for `todo(` to find every open item (or run `npm run content:todo`).
 */
export function todo(nl: string, en: string): Localized {
  return { nl: `[${nl} INVULLEN]`, en: `[TO FILL IN: ${en}]` };
}

/** Shorthand for a localized string. */
export function l(nl: string, en: string): Localized {
  return { nl, en };
}
