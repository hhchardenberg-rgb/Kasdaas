import { hasValue, tx, type Text } from "./i18n";
import type { Coordinates, Place } from "./types";

/** Google Maps directions (opens the Maps app on iOS/Android when installed). */
export function routeUrl(target: { mapsQuery?: string; coordinates?: Coordinates }): string | undefined {
  if (target.mapsQuery) return `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(target.mapsQuery)}`;
  const c = target.coordinates;
  if (c && !c.placeholder) return `https://www.google.com/maps/dir/?api=1&destination=${c.lat},${c.lng}`;
  return undefined;
}

export function placeRouteUrl(p: Place) {
  return routeUrl(p);
}

function digits(v: string) {
  return v.replace(/[^\d+]/g, "");
}

export function telUrl(phone: Text | undefined): string | undefined {
  if (!hasValue(phone)) return undefined;
  return `tel:${digits(tx(phone, "en"))}`;
}

export function whatsappUrl(number: Text | undefined, message?: string): string | undefined {
  if (!hasValue(number)) return undefined;
  const n = digits(tx(number, "en")).replace(/^\+/, "");
  return `https://wa.me/${n}${message ? `?text=${encodeURIComponent(message)}` : ""}`;
}

export function mailUrl(email: Text | undefined): string | undefined {
  if (!hasValue(email)) return undefined;
  return `mailto:${tx(email, "en")}`;
}
