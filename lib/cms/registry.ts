import "server-only";
import { isPlaceholder, type Localized } from "@/lib/i18n";
import { site, houseSections, stay, wifi, departure, problems, itineraries, practical, boatRental, categories, diningStyles, mapGroups, tagLabels } from "@/lib/content";
import { food } from "@/content/places/food";
import { beaches, underwater, activities, groceries, practicalPlaces } from "@/content/places/explore";
import { boatManual } from "@/content/boat/private/manual";

/**
 * Registry of every text the owner can edit in the admin.
 *
 * It walks the content modules once per process and finds
 *  - every translated text (a `Localized` object: nl/en/es/de), and
 *  - a few language-neutral fields (phone numbers, links, WiFi details).
 * Each gets a stable key built from its position in the content
 * (e.g. `houseSections.arrival.topics.address.title`; array items use their `id`).
 *
 * Edits are applied *in place* on these objects (see sync.ts), so every page
 * that reads content the normal way automatically shows the edited text.
 * The original values are captured here, before anything was applied.
 */

export type EditableLocale = "en" | "es" | "de";
export const EDITABLE_LOCALES: EditableLocale[] = ["en", "es", "de"];

export interface CmsEntry {
  key: string;
  /** "text": translated in four languages. "neutral": one value for all (phone, link, password). */
  kind: "text" | "neutral";
  groupId: string;
  /** Item labels, outermost first, e.g. ["Aankomst", "Adres"]. */
  trail: string[];
  /** What this field is, in Dutch, e.g. "Samenvatting" or "Stap 2". */
  field: string;
  /** Values at startup (before any edit). Neutral entries repeat one value in all four. */
  original: Localized;
  /** Current effective values. */
  read(): Localized;
  /** Overwrite the current values. Neutral entries use `nl` for all. */
  write(value: Localized): void;
}

export interface CmsGroup {
  id: string;
  label: string;
  description: string;
}

/** Order = order in the admin. */
export const GROUPS: CmsGroup[] = [
  { id: "algemeen", label: "Algemeen", description: "Titel, beschrijving en contactpersoon van de gids" },
  { id: "villa", label: "Villa-gids", description: "Aankomst, huisregels, de villa, comfort en eilandleven" },
  { id: "verblijf", label: "Verblijf & wifi", description: "Check-in en check-out, wifi-gegevens" },
  { id: "vertrek", label: "Vertrek", description: "Check-outlijst" },
  { id: "hulp", label: "Hulp bij problemen", description: "Wat te doen als er iets niet werkt" },
  { id: "restaurants", label: "Restaurants", description: "Eten en drinken" },
  { id: "stranden", label: "Stranden", description: "Stranden op Bonaire" },
  { id: "onderwater", label: "Snorkelen & duiken", description: "Snorkel- en duikplekken" },
  { id: "activiteiten", label: "Activiteiten & uitjes", description: "Wat te doen op het eiland" },
  { id: "boodschappen", label: "Boodschappen & praktische plekken", description: "Supermarkten, ziekenhuis, apotheek, tankstation" },
  { id: "dagplannen", label: "Dagplannen", description: "Routes en dagindelingen" },
  { id: "praktisch", label: "Goed om te weten", description: "Praktische info over Bonaire" },
  { id: "labels", label: "Categorieën & labels", description: "Namen van categorieën en filters" },
  { id: "boot", label: "Bootverhuur (openbaar)", description: "De openbare bootpagina" },
  { id: "bootgids", label: "Boothandleiding (privé)", description: "Alleen zichtbaar voor huurders van de boot" },
];

interface Root {
  name: string;
  value: unknown;
  groupId: string;
}

function roots(): Root[] {
  return [
    { name: "site", value: site, groupId: "algemeen" },
    { name: "houseSections", value: houseSections, groupId: "villa" },
    { name: "stay", value: stay, groupId: "verblijf" },
    { name: "wifi", value: wifi, groupId: "verblijf" },
    { name: "departure", value: departure, groupId: "vertrek" },
    { name: "problems", value: problems, groupId: "hulp" },
    { name: "food", value: food, groupId: "restaurants" },
    { name: "beaches", value: beaches, groupId: "stranden" },
    { name: "underwater", value: underwater, groupId: "onderwater" },
    { name: "activities", value: activities, groupId: "activiteiten" },
    { name: "groceries", value: groceries, groupId: "boodschappen" },
    { name: "practicalPlaces", value: practicalPlaces, groupId: "boodschappen" },
    { name: "itineraries", value: itineraries, groupId: "dagplannen" },
    { name: "practical", value: practical, groupId: "praktisch" },
    { name: "categories", value: categories, groupId: "labels" },
    { name: "diningStyles", value: diningStyles, groupId: "labels" },
    { name: "mapGroups", value: mapGroups, groupId: "labels" },
    { name: "tagLabels", value: tagLabels, groupId: "labels" },
    { name: "boatRental", value: boatRental, groupId: "boot" },
    { name: "boatManual", value: boatManual, groupId: "bootgids" },
  ];
}

/** Language-neutral fields: one value, no translation. */
const NEUTRAL = new Set(["phone", "whatsapp", "email", "website", "reservationUrl", "password", "network"]);

/** Properties that never contain editable text. */
const SKIP = new Set([
  "alt", "image", "gallery", "media", "keywords", "coordinates", "icon", "art", "id", "category", "alsoIn", "tags", "favorite", "demo",
  "priceLevel", "start", "next", "kind", "mapsQuery", "mapsUrl", "url", "color", "categories", "security", "extraNetworks", "heroImage",
]);

const FIELD_LABELS: Record<string, string> = {
  title: "Titel", summary: "Samenvatting", body: "Tekst", steps: "Stappen", tips: "Tips", intro: "Inleiding", eyebrow: "Bovenkop",
  label: "Label", detail: "Toelichting", text: "Tekst", description: "Beschrijving", whyWeRecommend: "Waarom wij het aanraden", tip: "Tip",
  openingHours: "Openingstijden", travelTime: "Reistijd", cuisine: "Keuken", why: "Waarom", forWho: "Voor wie", duration: "Duur",
  bring: "Meenemen", bestTime: "Beste moment", diyOrBook: "Zelf doen of boeken", keepInMind: "Let op", name: "Naam", note: "Opmerking",
  subtitle: "Ondertitel", length: "Lengte", escalate: "Als het niet lukt", area: "Gebied", address: "Adres", tagline: "Slogan",
  availability: "Bereikbaarheid", host: "Contactpersoon", home: "Woning", value: "Waarde", phone: "Telefoonnummer", whatsapp: "WhatsApp-nummer",
  email: "E-mailadres", website: "Website", reservationUrl: "Reserveringslink", password: "Wachtwoord", network: "Netwerknaam",
  checkInTime: "Check-in", checkOutTime: "Check-out", lateCheckOut: "Late check-out", coverage: "Bereik", router: "Router", tip_: "Tip",
  whatsappGreeting: "WhatsApp-begroeting", goodbye: "Afscheid", question: "Vraag", options: "Antwoorden", activity: "Activiteit",
  restaurant: "Restaurant", included: "Inbegrepen", conditions: "Voorwaarden", ideas: "Ideeën", boatName: "Naam van de boot",
  facts: "Feiten", cta: "Knop", welcome: "Welkom", sos: "SOS", contacts: "Contacten", before: "Voor vertrek", start: "Starten",
  controls: "Bediening", safety: "Veiligheid", area_: "Gebied", mooring: "Aanleggen", anchoring: "Ankeren", docking: "Aanleggen",
  return: "Terugkeer", problems: "Problemen", checklist: "Checklist", days: "Dagen", places: "Plaatsen",
};

/** Singular names for array items ("Stap 2" rather than "Stappen 2"). */
const SINGULAR: Record<string, string> = { steps: "Stap", body: "Alinea", tips: "Tip", description: "Alinea", options: "Antwoord", days: "Dag", facts: "Feit" };

/**
 * The pristine values live on the content objects themselves (non-enumerable properties), not in this module.
 * The server may hold several copies of this module that share the same content objects; whichever copy looks
 * first records the original, and every copy reads that same record. An edit applied by one copy can therefore
 * never be mistaken for the original by another.
 */
const ORIG = "__kdOriginal";

function pristineText(obj: Localized): Localized {
  const holder = obj as unknown as Record<string, unknown>;
  if (!Object.getOwnPropertyDescriptor(obj, ORIG)) {
    Object.defineProperty(obj, ORIG, { value: Object.freeze({ nl: obj.nl, en: obj.en, es: obj.es, de: obj.de }), enumerable: false });
  }
  return { ...(holder[ORIG] as Localized) };
}

function pristineProp(container: Record<string, unknown>, prop: string): string {
  let store = Object.getOwnPropertyDescriptor(container, ORIG)?.value as Record<string, string> | undefined;
  if (!store) {
    store = {};
    Object.defineProperty(container, ORIG, { value: store, enumerable: false });
  }
  if (!(prop in store)) store[prop] = container[prop] as string;
  return store[prop];
}

const isObject = (v: unknown): v is Record<string, unknown> => typeof v === "object" && v !== null && !Array.isArray(v);

export function isLocalized(v: unknown): v is Localized {
  return isObject(v) && typeof v.nl === "string" && typeof v.en === "string" && typeof v.es === "string" && typeof v.de === "string" && Object.keys(v).length === 4;
}

/** The Dutch name of an item (an object with an id), taken from its name/title/label. */
function itemLabel(obj: Record<string, unknown>): string | null {
  for (const prop of ["name", "title", "label"]) {
    const v = obj[prop];
    if (typeof v === "string" && v) return v;
    if (isLocalized(v) && v.nl && !isPlaceholder(v)) return v.nl;
  }
  return typeof obj.id === "string" ? obj.id : null;
}

function build(): { entries: CmsEntry[]; byKey: Map<string, CmsEntry> } {
  const entries: CmsEntry[] = [];
  const byKey = new Map<string, CmsEntry>();
  const seen = new Set<object>();

  const add = (entry: CmsEntry) => {
    let key = entry.key;
    for (let n = 2; byKey.has(key); n++) key = `${entry.key}~${n}`;
    entry.key = key;
    entries.push(entry);
    byKey.set(key, entry);
  };

  const addText = (child: Localized, key: string, trail: string[], field: string, groupId: string) => {
    if (seen.has(child)) return;
    seen.add(child);
    const original = pristineText(child);
    add({
      key,
      kind: "text",
      groupId,
      trail,
      field,
      original,
      read: () => ({ nl: child.nl, en: child.en, es: child.es, de: child.de }),
      write: (v) => {
        child.nl = v.nl;
        child.en = v.en;
        child.es = v.es;
        child.de = v.de;
      },
    });
  };

  const walk = (value: unknown, path: string[], trail: string[], parts: string[], groupId: string) => {
    if (Array.isArray(value)) {
      const base = path[path.length - 1];
      value.forEach((child, i) => {
        if (isObject(child) && typeof child.id === "string") {
          walk(child, [...path, child.id], [...trail, itemLabel(child) ?? child.id], [], groupId);
          return;
        }
        const last = parts[parts.length - 1];
        const named = last ? `${SINGULAR[base] ?? last} ${i + 1}` : `Onderdeel ${i + 1}`;
        const here = [...path, String(i)];
        if (isLocalized(child)) addText(child, here.join("."), trail, [...parts.slice(0, -1), named].join(" › "), groupId);
        else walk(child, here, trail, [...parts.slice(0, -1), named], groupId);
      });
      return;
    }
    if (!isObject(value) || seen.has(value)) return;
    seen.add(value);

    for (const [prop, child] of Object.entries(value)) {
      if (SKIP.has(prop) || typeof child === "function") continue;
      const label = FIELD_LABELS[prop] ?? prop;
      const here = [...path, prop];

      if (NEUTRAL.has(prop) && (typeof child === "string" || isLocalized(child))) {
        const placeholder = typeof child !== "string" && isPlaceholder(child);
        const nl = typeof child === "string" ? pristineProp(value, prop) : pristineText(child).nl;
        add({
          key: here.join("."),
          kind: "neutral",
          groupId,
          trail,
          field: [...parts, label].join(" › "),
          // A placeholder keeps its four "[… INVULLEN]" variants, so it still shows as "to fill in".
          original: placeholder ? pristineText(child as Localized) : { nl, en: nl, es: nl, de: nl },
          read: () => {
            const v = value[prop];
            if (typeof v === "string") return { nl: v, en: v, es: v, de: v };
            const text = v as Localized;
            return { nl: text.nl, en: text.en, es: text.es, de: text.de };
          },
          write: (v) => {
            if (typeof value[prop] === "string") value[prop] = v.nl;
            else Object.assign(value[prop] as Localized, { nl: v.nl, en: v.en, es: v.es, de: v.de });
          },
        });
        continue;
      }

      if (isLocalized(child)) addText(child, here.join("."), trail, [...parts, label].join(" › "), groupId);
      else if (Array.isArray(child) || isObject(child)) walk(child, here, trail, [...parts, label], groupId);
    }
  };

  for (const root of roots()) walk(root.value, [root.name], [], [], root.groupId);
  return { entries, byKey };
}

let registry: ReturnType<typeof build> | null = null;

/** Built once per process, before any edit is applied, so `original` is really the original. */
export function getRegistry() {
  return (registry ??= build());
}

export function getEntry(key: string): CmsEntry | undefined {
  return getRegistry().byKey.get(key);
}

export function isPlaceholderValue(value: Localized): boolean {
  return isPlaceholder(value);
}
