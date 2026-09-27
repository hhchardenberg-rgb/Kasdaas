import { NextResponse, type NextRequest } from "next/server";
import { isLocale, localeFromAcceptLanguage, LOCALE_COOKIE } from "@/lib/i18n";
import { GUEST_COOKIE, guestCookieOptions, guestToken, isGuestPassword, isValidGuestCookie } from "@/lib/guest-access";

/** Pages reachable without the guest password (the boat manual has its own token). */
const OPEN = /^\/(nl|en)\/(welcome|boat\/guide)\/?$/;

/**
 * 1. Language: paths without /nl or /en are sent to the remembered or
 *    browser language (Dutch → nl, everything else → en).
 * 2. Guest password: every guide page requires the unlock cookie; otherwise
 *    the visitor lands on /<lang>/welcome. A link with ?access=<password>
 *    unlocks the device directly (handy in a WhatsApp message).
 */
export function proxy(req: NextRequest) {
  const { pathname, searchParams } = req.nextUrl;
  const first = pathname.split("/")[1];

  if (!isLocale(first)) {
    const saved = req.cookies.get(LOCALE_COOKIE)?.value;
    const locale = isLocale(saved) ? saved : localeFromAcceptLanguage(req.headers.get("accept-language"));
    const url = req.nextUrl.clone();
    url.pathname = `/${locale}${pathname === "/" ? "" : pathname}`;
    return NextResponse.redirect(url);
  }

  // Unlock via link: /nl?access=beachhousebonaire
  const access = searchParams.get("access");
  if (access !== null) {
    const url = req.nextUrl.clone();
    url.searchParams.delete("access");
    if (isGuestPassword(access)) {
      const res = NextResponse.redirect(url);
      res.cookies.set(GUEST_COOKIE, guestToken(), guestCookieOptions);
      return res;
    }
  }

  if (OPEN.test(pathname) || isValidGuestCookie(req.cookies.get(GUEST_COOKIE)?.value)) {
    return NextResponse.next();
  }

  const url = req.nextUrl.clone();
  url.pathname = `/${first}/welcome`;
  url.search = "";
  const next = pathname + req.nextUrl.search.replace(/([?&])access=[^&]*&?/, "$1").replace(/[?&]$/, "");
  if (next !== `/${first}`) url.searchParams.set("next", next);
  return NextResponse.redirect(url);
}

export const config = {
  // Skip Next internals, static files, the boat deep-link handler (/boat/<token>) and admin.
  matcher: ["/((?!_next|api|admin|boat/|sw\\.js|manifest\\.webmanifest|icons/|images/|robots\\.txt|sitemap\\.xml|.*\\.[a-zA-Z0-9]+$).*)"],
};
