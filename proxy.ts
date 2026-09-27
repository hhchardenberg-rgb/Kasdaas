import { NextResponse, type NextRequest } from "next/server";
import { isLocale, localeFromAcceptLanguage, LOCALE_COOKIE } from "@/lib/i18n";

/**
 * Sends every path without a language prefix to /nl/… or /en/….
 * Remembered choice (cookie) wins; otherwise the browser language decides:
 * Dutch → nl, everything else → en.
 */
export function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;
  if (isLocale(pathname.split("/")[1])) return NextResponse.next();
  const saved = req.cookies.get(LOCALE_COOKIE)?.value;
  const locale = isLocale(saved) ? saved : localeFromAcceptLanguage(req.headers.get("accept-language"));
  const url = req.nextUrl.clone();
  url.pathname = `/${locale}${pathname === "/" ? "" : pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  // Skip Next internals, static files, the boat deep-link handler (/boat/<token>) and admin.
  matcher: ["/((?!_next|api|admin|boat/|sw\\.js|manifest\\.webmanifest|icons/|images/|robots\\.txt|sitemap\\.xml|.*\\.[a-zA-Z0-9]+$).*)"],
};
