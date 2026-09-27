/**
 * Content model for the Kas Daas guest guide.
 *
 * All content lives in /content and is typed here. Components only ever read
 * content through /lib/content.ts, so a CMS (Sanity, Contentful, Payload, …)
 * can later replace the local files without touching the UI.
 */
import type { Localized, LocalizedList, Text } from "./i18n";

/** Names of icons that content can reference (see components/ui/icon.tsx). */
export type IconName =
  | "home" | "key" | "map-pin" | "car" | "clock" | "user" | "wifi" | "sofa"
  | "chef-hat" | "bed" | "bath" | "sun" | "waves" | "trees" | "wind" | "fan"
  | "thermometer" | "flame" | "microwave" | "refrigerator" | "coffee" | "washing-machine"
  | "tv" | "speaker" | "plug" | "lightbulb" | "shower-head" | "utensils" | "armchair"
  | "droplets" | "zap" | "bug" | "door-open" | "shield" | "glass-water" | "trash"
  | "log-out" | "phone" | "heart-pulse" | "siren" | "wrench" | "alert" | "sparkles"
  | "anchor" | "ship" | "life-buoy" | "fuel" | "battery" | "compass" | "navigation"
  | "gauge" | "cloud-sun" | "smartphone" | "package" | "hand" | "leaf" | "fish"
  | "banknote" | "globe" | "sunrise" | "sunset" | "mountain" | "bike" | "binoculars"
  | "calendar" | "shopping-bag" | "pill" | "info" | "camera" | "umbrella" | "baby"
  | "gem" | "ice-cream" | "wine" | "cloud-rain" | "route" | "footprints" | "sailboat"
  | "shirt" | "dishwasher" | "cooking-pot";

/** Art-directed illustration shown when no photo is available yet. */
export type ArtVariant =
  | "villa" | "pool" | "terrace" | "shower" | "interior" | "sea" | "sunset" | "reef"
  | "boat" | "nature" | "food" | "town" | "salt" | "flamingo" | "night" | "coffee"
  | "beach" | "wind" | "practical";

export interface ImageRef {
  /** Path in /public (e.g. "/images/villa/hero.jpg") or absolute URL (add host to next.config). */
  src: string;
  alt: Localized;
}

export interface Coordinates {
  lat: number;
  lng: number;
  /** Approximate coordinates (demo) — must be verified before going live. */
  approximate?: boolean;
  /** Not a real location yet; never used for routes. */
  placeholder?: boolean;
}

// ─────────────────────────────────────────────────────────────── Villa guide

export interface HouseTopic {
  id: string;
  icon: IconName;
  title: Localized;
  /** One-liner shown collapsed. */
  summary?: Localized;
  /** Paragraphs. */
  body?: Localized[];
  /** Numbered how-to steps. */
  steps?: Localized[];
  /** Small highlighted tips. */
  tips?: Localized[];
  image?: ImageRef;
  art?: ArtVariant;
  /** Extra search terms (both languages). */
  keywords?: string[];
  /** Highlight this topic with a large photo card. */
  feature?: boolean;
  /**
   * The owner still needs to confirm this facility exists at Kas Daas
   * (e.g. "pool, if present"). Remove the topic if it doesn't apply.
   */
  confirmPresence?: boolean;
}

export interface HouseSection {
  id: string;
  icon: IconName;
  eyebrow: Localized;
  title: Localized;
  intro: Localized;
  art: ArtVariant;
  image?: ImageRef;
  topics: HouseTopic[];
}

export interface ChecklistItem {
  id: string;
  label: Localized;
  detail?: Localized;
}

export interface Problem {
  id: string;
  icon: IconName;
  title: Localized;
  /** Try this first. */
  steps: Localized[];
  /** When to contact the host / emergency services. */
  escalate?: Localized;
  urgent?: boolean;
  keywords?: string[];
}

// ──────────────────────────────────────────────────────────────── Discover

export type PlaceCategory =
  | "food" | "beaches" | "snorkeling" | "diving" | "activities" | "sunset"
  | "nature" | "roadtrips" | "drinks" | "groceries" | "breakfast" | "snacks"
  | "kids" | "hidden-gems" | "rainy-day" | "practical";

export type PlaceTag =
  | "favorite" | "sunset" | "local" | "romantic" | "family" | "snorkeling"
  | "lunch" | "dinner" | "quick-bite" | "breakfast" | "waterfront" | "worth-the-drive"
  | "after-the-beach" | "nature" | "diving" | "drinks" | "active" | "book-ahead";

export type DiningStyle =
  | "fine-dining" | "casual" | "lunch" | "breakfast" | "foodtruck" | "fish" | "meat"
  | "international" | "local" | "waterfront" | "sunset" | "takeaway";

export interface RestaurantInfo {
  cuisine: Localized;
  styles: DiningStyle[];
  /** true / false, or null when unknown. */
  reservationRecommended: boolean | null;
}

/** The "how to enjoy it" answers for activities. */
export interface ActivityInfo {
  why: Localized;
  forWho: Localized;
  duration: Localized;
  bring: Localized;
  bestTime: Localized;
  diyOrBook: Localized;
  keepInMind: Localized;
}

export interface Place {
  id: string;
  category: PlaceCategory;
  /** Additional categories the place appears in. */
  alsoIn?: PlaceCategory[];
  name: Text;
  summary: Localized;
  description?: Localized;
  /** "Waarom wij dit aanraden" — personal recommendation. */
  whyWeRecommend?: Localized;
  tip?: Localized;
  image?: ImageRef;
  art: ArtVariant;
  /** Area / neighbourhood, e.g. "Kralendijk". */
  area?: Text;
  address?: Text;
  coordinates?: Coordinates;
  /** Search query used for route links (more robust than coordinates). */
  mapsQuery?: string;
  website?: string;
  reservationUrl?: string;
  phone?: Text;
  /** 1–4. Only set when verified. */
  priceLevel?: 1 | 2 | 3 | 4;
  openingHours?: Localized;
  /** Travel time from Kas Daas. */
  travelTime?: Localized;
  tags?: PlaceTag[];
  /** Shown as "Kas Daas favourite". */
  favorite?: boolean;
  keywords?: string[];
  restaurant?: RestaurantInfo;
  activity?: ActivityInfo;
  /**
   * DEMO CONTENT — written to make the interface reviewable.
   * Everything about this entry must be checked by the owner before going live.
   */
  demo?: boolean;
}

// ───────────────────────────────────────────────────────────── Day plans

export interface PlanStep {
  time: string;
  title: Localized;
  text?: Localized;
  placeId?: string;
  icon?: IconName;
}

export interface PlanDay {
  title?: Localized;
  steps: PlanStep[];
}

export interface Itinerary {
  id: string;
  title: Localized;
  subtitle: Localized;
  art: ArtVariant;
  image?: ImageRef;
  /** e.g. "1 dag" / "3 days" */
  length: Localized;
  days: PlanDay[];
  demo?: boolean;
}

// ─────────────────────────────────────────────────────────── Good to know

export interface PracticalTopic {
  id: string;
  icon: IconName;
  title: Localized;
  body: Localized[];
  keywords?: string[];
  /** Links to places in the guide (e.g. supermarkets). */
  placeIds?: string[];
}

// ─────────────────────────────────────────────────────────────────── Boat

export interface BoatFact {
  id: string;
  icon: IconName;
  label: Localized;
  value: Text;
}

/** A node in a simple troubleshooting decision tree. */
export interface TreeNode {
  id: string;
  text: Localized;
  detail?: Localized;
  /** Answers — `next` is another node id, or "solved" / "contact". */
  options: { label: Localized; next: string }[];
}

export interface BoatProblem {
  id: string;
  icon: IconName;
  title: Localized;
  urgent?: boolean;
  start: string;
  nodes: TreeNode[];
}

export interface MediaSlot {
  kind: "image" | "video";
  src?: string;
  caption: Localized;
}

export interface BoatStep {
  id: string;
  title: Localized;
  text: Localized;
  media?: MediaSlot[];
}

export interface BoatControl {
  id: string;
  icon: IconName;
  title: Localized;
  text: Localized;
  media?: MediaSlot[];
}

export type ZoneKind = "allowed" | "forbidden" | "shallow" | "danger" | "mooring" | "poi";

export interface BoatZone {
  id: string;
  kind: ZoneKind;
  name: Localized;
  note?: Localized;
  /** Polygon (lat, lng) for areas, or a single point for POIs. */
  polygon?: [number, number][];
  point?: [number, number];
}

export interface Contact {
  id: string;
  label: Localized;
  /** Phone number in international format, e.g. "+599 7xx xxxx". */
  phone?: Text;
  whatsapp?: Text;
  /** VHF channel etc. */
  note?: Localized;
  primary?: boolean;
}

export type { Localized, LocalizedList, Text };
