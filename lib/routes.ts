import type { Locale } from "./i18n";
import { categories, getPlaces, houseSections, itineraries } from "./content";

/** All public pages for a locale — used for offline warming and the sitemap. */
export function publicPaths(locale: Locale): string[] {
  const b = `/${locale}`;
  return [
    b,
    `${b}/villa`,
    `${b}/villa/wifi`,
    `${b}/villa/departure`,
    `${b}/help`,
    ...houseSections.map((s) => `${b}/villa/${s.id}`),
    `${b}/good-to-know`,
    `${b}/favorites`,
    `${b}/more`,
    `${b}/search`,
    `${b}/boat`,
    `${b}/discover`,
    `${b}/discover/restaurants`,
    `${b}/map`,
    `${b}/plans`,
    ...categories.map((c) => `${b}/discover/${c.id}`),
    ...itineraries.map((i) => `${b}/plans/${i.id}`),
    ...getPlaces().map((p) => `${b}/places/${p.id}`),
  ];
}
