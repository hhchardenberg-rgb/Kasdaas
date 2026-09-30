/**
 * Tiny, dependency-free i18n layer.
 * Every piece of content is either a plain string (language-neutral, e.g. a
 * brand name) or a `Localized` object with a Dutch, English, Spanish and German version.
 */
export const locales = ["nl", "en", "es", "de"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "en";

export type Localized = { nl: string; en: string; es: string; de: string };
export type Text = string | Localized;
export type LocalizedList = { nl: string[]; en: string[]; es: string[]; de: string[] };

export function isLocale(value: string | undefined | null): value is Locale {
  return !!value && (locales as readonly string[]).includes(value);
}

/** Resolve a Text for a locale. */
export function tx(value: Text | undefined | null, locale: Locale): string {
  if (value == null) return "";
  if (typeof value === "string") return value;
  return value[locale];
}

export function txList(value: LocalizedList | undefined, locale: Locale): string[] {
  return value ? value[locale] : [];
}

/**
 * Placeholders are written as "[SOMETHING INVULLEN]" / "[TO FILL IN: SOMETHING]".
 * Anything wrapped in square brackets is treated as "not yet provided":
 * it is shown in a distinct style and never used for actions (calls, links, QR).
 */
const PLACEHOLDER = /^\s*\[[^\]]*\]\s*$/;

export function isPlaceholder(value: Text | undefined | null): boolean {
  if (value == null) return false;
  if (typeof value === "string") return PLACEHOLDER.test(value);
  return PLACEHOLDER.test(value.nl) || PLACEHOLDER.test(value.en) || PLACEHOLDER.test(value.es) || PLACEHOLDER.test(value.de);
}

/** True when a value exists and is not a placeholder — safe to use for actions. */
export function hasValue(value: Text | undefined | null): value is Text {
  return value != null && tx(value, "en").trim() !== "" && !isPlaceholder(value);
}

/** Pick the best locale from an Accept-Language header: Dutch → nl, Spanish → es, German → de, everything else → en. */
export function localeFromAcceptLanguage(header: string | null | undefined): Locale {
  if (!header) return defaultLocale;
  const first = header
    .split(",")
    .map((part) => {
      const [tag, q] = part.trim().split(";q=");
      return { tag: tag.toLowerCase(), q: q ? parseFloat(q) : 1 };
    })
    .sort((a, b) => b.q - a.q)[0];
  if (first?.tag.startsWith("nl")) return "nl";
  if (first?.tag.startsWith("es")) return "es";
  if (first?.tag.startsWith("de")) return "de";
  return "en";
}

export const LOCALE_COOKIE = "kd_locale";

/** Native language names, for the language switcher. */
export const localeNames: Record<Locale, string> = { nl: "Nederlands", en: "English", es: "Español", de: "Deutsch" };

/** BCP 47 tag for Intl formatting. */
export const intlLocale: Record<Locale, string> = { nl: "nl-NL", en: "en-GB", es: "es-ES", de: "de-DE" };

/** Open Graph locale. */
export const ogLocale: Record<Locale, string> = { nl: "nl_NL", en: "en_US", es: "es_ES", de: "de_DE" };

/** Pick one of three literal strings for a locale (for small inline texts). */
export function pick<T>(locale: Locale, values: Record<Locale, T>): T {
  return values[locale];
}
