import type { NextRequest } from "next/server";
import { isLocale, localeFromAcceptLanguage, LOCALE_COOKIE, type Locale } from "./i18n";

export function requestLocale(req: NextRequest): Locale {
  const saved = req.cookies.get(LOCALE_COOKIE)?.value;
  return isLocale(saved) ? saved : localeFromAcceptLanguage(req.headers.get("accept-language"));
}
