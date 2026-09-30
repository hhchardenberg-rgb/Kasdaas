import { NextResponse, type NextRequest } from "next/server";
import { BOAT_COOKIE, verifyBoatAccess } from "@/lib/boat/access";
import { requestLocale } from "@/lib/request-locale";

/**
 * Boat deep link: /boat/<token>
 * Valid token → store it in an httpOnly cookie and open the private manual
 * (the token disappears from the address bar). Invalid → public boat page.
 */
export async function GET(req: NextRequest, ctx: RouteContext<"/boat/[token]">) {
  const { token } = await ctx.params;
  const locale = requestLocale(req);
  const access = await verifyBoatAccess(token);
  const headers = { "X-Robots-Tag": "noindex, nofollow", "Cache-Control": "private, no-store", "Referrer-Policy": "no-referrer" };

  if (!access.ok) {
    const res = NextResponse.redirect(new URL(`/${locale}/boat?link=invalid`, req.url), { status: 303, headers });
    res.cookies.delete(BOAT_COOKIE);
    return res;
  }
  const res = NextResponse.redirect(new URL(`/${locale}/boat/guide`, req.url), { status: 303, headers });
  res.cookies.set(BOAT_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: Math.max(0, access.exp - Math.floor(Date.now() / 1000)),
  });
  return res;
}
