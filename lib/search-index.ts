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

const both = (x?: Localized | Localized[]) => (x ? (Array.isArray(x) ? x : [x]).flatMap((v) => [v.nl, v.en, v.es]) : []);

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
  add({ id: "emergency", type: "help", title: t.help.emergency, snippet: t.help.emergencyText, href: `${b}/help#emergency-numbers`, titles: ["noodnummers", "emergency", "alarmnummer", "emergencia"], extra: ["911", "112", "sos", "politie", "police", "ambulance", "brandweer", "fire", "ziekenhuis", "hospital", "dokter", "doctor", "policía", "ambulancia", "bomberos", "médico", "urgencias"] });
  add({ id: "host", type: "help", title: t.help.title, snippet: t.help.subtitle, href: `${b}/help`, titles: ["contact", "host", "beheerder", "hulp", "help", "contacto", "anfitrión", "ayuda"], extra: ["whatsapp", "bellen", "call", "telefoon", "phone", "email", "llamar", "teléfono", "correo"] });

  for (const p of getPlaces()) {
    const cat = categories.find((c) => c.id === p.category);
    add({
      id: `place-${p.id}`, type: "place", title: tx(p.name, locale), snippet: [cat ? tx(cat.label, locale) : "", p.area ? tx(p.area, locale) : ""].filter(Boolean).join(" · "), href: `${b}/places/${p.id}`,
      titles: [tx(p.name, "nl"), tx(p.name, "en"), tx(p.name, "es")],
      extra: [...(p.keywords ?? []), ...both(p.summary), ...both(p.restaurant?.cuisine), ...(p.alsoIn ?? []), p.category, ...both(cat?.label)],
    });
  }
  for (const c of categories) {
    add({ id: `cat-${c.id}`, type: "page", title: tx(c.label, locale), snippet: tx(c.intro, locale), href: `${b}/discover/${c.id}`, titles: both(c.label), extra: [c.id] });
  }
  add({ id: "restaurants", type: "page", title: t.discover.restaurants, snippet: t.discover.restaurantsText, href: `${b}/discover/restaurants`, titles: ["restaurants", "restaurant", "eten", "food", "diner", "dinner", "restaurantes", "comer", "cena"], extra: ["lunch", "uit eten", "eat out", "reserveren", "almuerzo", "reservar"] });
  for (const it of itineraries) {
    add({ id: `plan-${it.id}`, type: "plan", title: tx(it.title, locale), snippet: tx(it.subtitle, locale), href: `${b}/plans/${it.id}`, titles: both(it.title), extra: ["dagplan", "day plan", "itinerary", "planning", "plan de día", "itinerario", ...both(it.subtitle)] });
  }
  for (const pr of practical) {
    add({ id: `prac-${pr.id}`, type: "practical", title: tx(pr.title, locale), snippet: t.practical.title, href: `${b}/good-to-know#${pr.id}`, titles: both(pr.title), extra: pr.keywords ?? [] });
  }
  add({ id: "boat", type: "boat", title: t.boat.rent, snippet: { nl: "Bonaire vanaf het water", en: "Discover Bonaire from the water", es: "Descubre Bonaire desde el agua" }[locale], href: `${b}/boat`, titles: ["boot", "boat", "barco"], extra: ["huren", "rent", "rental", "verhuur", "varen", "sailing", "boottocht", "boat trip", "klein bonaire", "alquiler", "alquilar", "lancha", "navegar", "excursión en barco"] });
  add({ id: "map", type: "page", title: t.map.title, snippet: t.map.subtitle, href: `${b}/map`, titles: ["kaart", "map", "mapa"], extra: ["route", "locatie", "location", "navigatie", "ruta", "ubicación", "navegación"] });
  add({ id: "favorites", type: "page", title: t.favorites.title, snippet: t.favorites.subtitle, href: `${b}/favorites`, titles: ["mijn bonaire", "my bonaire", "favorieten", "favourites", "favorites", "mi bonaire", "favoritos"], extra: ["bewaard", "saved", "hartje", "heart", "guardado", "corazón"] });

  return out;
}
