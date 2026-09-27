import { NextResponse } from "next/server";
import { BOAT_COOKIE } from "@/lib/boat/access";

/** Removes boat access from this browser (the "remove boat info" button). */
export async function POST() {
  const res = new NextResponse(null, { status: 204, headers: { "Cache-Control": "no-store" } });
  res.cookies.delete(BOAT_COOKIE);
  return res;
}
