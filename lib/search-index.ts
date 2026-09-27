import { tx, type Locale, type Localized } from "./i18n";
import { categories, departure, getPlaces, houseSections, itineraries, practical, problems } from "./content";
import { dictionaries } from "@/content/ui";

export type SearchType = "villa" | "place" | "plan" | "practical" | "help" | "boat" | "page";

export interface SearchEntry {
  id: string;
  type: SearchType;
  title: string;
  snippet: string;
  href: string;
  /** Title words, weighted higher. */
  t: string;
  /** Everything else searchable. */
  k: string;
}

const both = (x?: Localized | Localized[]) => (x ? (Array.isArray(x) ? x : [x]).flatMap((v) => [v.nl, v.en]) : []);

/** Builds the search index for one locale (both languages' keywords are included, so "airco" and "air conditioning" both work). */
export function buildSearchIndex(locale: Locale): SearchEntry[] {
  const t = dictionaries[locale];
  const b = `/${locale}`;
  const out: SearchEntry[] = [];
  const add = (e: Omit<SearchEntry, "t" | "k"> & { titles: string[]; extra: string[] }) =>
    out.push({ id: e.id, type: e.type, title: e.title, snippet: e.snippet, href: e.href, t: e.titles.join(" "), k: e.extra.join(" ") });

  add({ id: "wifi", type: "villa", title: "WiFi", snippet: t.wifi.network + " · " + t.wifi.password, href: `${b}/villa/wifi`, titles: ["wifi", "wi-fi"], extra: ["internet", "wachtwoord", "password", "netwerk", "network", "router", "wlan"] });
  add({
    id: "departure", type: "villa", title: `${t.departure.title} · Check-out`, snippet: tx(departure.intro, locale), href: `${b}/villa/departure`,
    titles: ["check-out", "checkout", "vertrek", "departure"],
    extra: ["uitchecken", "leaving", "vertrekken", "sleutel", "key", "afval", "checklist", ...departure.checklist.flatMap((c) => both(c.label))],
  });

  for (const s of houseSections) {
    for (const topic of s.topics) {
      add({
        id: `topic-${topic.id}`, type: "villa", title: tx(topic.title, locale), snippet: tx(s.title, locale), href: `${b}/villa/${s.id}#${topic.id}`,
        titles: both(topic.title), extra: [...(topic.keywords ?? []), ...both(topic.summary), ...both(s.title)],
      });
    }
  }
  for (const p of problems) {
    add({ id: `problem-${p.id}`, type: "help", title: tx(p.title, locale), snippet: t.help.problems, href: `${b}/help#${p.id}`, titles: both(p.title), extra: p.keywords ?? [] });
  }
  add({ id: "emergency", type: "help", title: t.help.emergency, snippet: t.help.emergencyText, href: `${b}/help#emergency-numbers`, titles: ["noodnummers", "emergency", "alarmnummer"], extra: ["911", "112", "sos", "politie", "police", "ambulance", "brandweer", "fire", "ziekenhuis", "hospital", "dokter", "doctor"] });
  add({ id: "host", type: "help", title: t.help.title, snippet: t.help.subtitle, href: `${b}/help`, titles: ["contact", "host", "beheerder", "hulp", "help"], extra: ["whatsapp", "bellen", "call", "telefoon", "phone", "email"] });

  for (const p of getPlaces()) {
    const cat = categories.find((c) => c.id === p.category);
    add({
      id: `place-${p.id}`, type: "place", title: tx(p.name, locale), snippet: [cat ? tx(cat.label, locale) : "", p.area ? tx(p.area, locale) : ""].filter(Boolean).join(" · "), href: `${b}/places/${p.id}`,
      titles: [tx(p.name, "nl"), tx(p.name, "en")],
      extra: [...(p.keywords ?? []), ...both(p.summary), ...both(p.restaurant?.cuisine), ...(p.alsoIn ?? []), p.category, ...both(cat?.label)],
    });
  }
  for (const c of categories) {
    add({ id: `cat-${c.id}`, type: "page", title: tx(c.label, locale), snippet: tx(c.intro, locale), href: `${b}/discover/${c.id}`, titles: both(c.label), extra: [c.id] });
  }
  add({ id: "restaurants", type: "page", title: t.discover.restaurants, snippet: t.discover.restaurantsText, href: `${b}/discover/restaurants`, titles: ["restaurants", "restaurant", "eten", "food", "diner", "dinner"], extra: ["lunch", "uit eten", "eat out", "reserveren"] });
  for (const it of itineraries) {
    add({ id: `plan-${it.id}`, type: "plan", title: tx(it.title, locale), snippet: tx(it.subtitle, locale), href: `${b}/plans/${it.id}`, titles: both(it.title), extra: ["dagplan", "day plan", "itinerary", "planning", ...both(it.subtitle)] });
  }
  for (const pr of practical) {
    add({ id: `prac-${pr.id}`, type: "practical", title: tx(pr.title, locale), snippet: t.practical.title, href: `${b}/good-to-know#${pr.id}`, titles: both(pr.title), extra: pr.keywords ?? [] });
  }
  add({ id: "boat", type: "boat", title: t.boat.rent, snippet: locale === "nl" ? "Bonaire vanaf het water" : "Discover Bonaire from the water", href: `${b}/boat`, titles: ["boot", "boat"], extra: ["huren", "rent", "rental", "verhuur", "varen", "sailing", "boottocht", "boat trip", "klein bonaire"] });
  add({ id: "map", type: "page", title: t.map.title, snippet: t.map.subtitle, href: `${b}/map`, titles: ["kaart", "map"], extra: ["route", "locatie", "location", "navigatie"] });
  add({ id: "favorites", type: "page", title: t.favorites.title, snippet: t.favorites.subtitle, href: `${b}/favorites`, titles: ["mijn bonaire", "my bonaire", "favorieten", "favourites", "favorites"], extra: ["bewaard", "saved", "hartje", "heart"] });

  return out;
}
