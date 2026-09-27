import { l, todo } from "./_helpers";
import type { Contact, Coordinates, ImageRef } from "@/lib/types";
import { photos } from "./images";

/**
 * ─────────────────────────────────────────────────────────────────────────────
 *  KAS DAAS — SITE SETTINGS
 *  General settings, contact details and the home base on the map.
 *  Everything written as todo("…") still has to be filled in by the owner.
 * ─────────────────────────────────────────────────────────────────────────────
 */
export const site = {
  name: "Kas Daas",
  tagline: l("Jouw gids voor Kas Daas & Bonaire", "Your guide to Kas Daas & Bonaire"),
  description: l(
    "De digitale gastengids van Kas Daas: alles over de villa, onze favoriete plekken op Bonaire en de boot.",
    "The digital guest guide of Kas Daas: everything about the villa, our favourite places on Bonaire and the boat.",
  ),

  /** Public URL, used for QR codes, share links and metadata. Override with NEXT_PUBLIC_SITE_URL. */
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://kasdaas.example.com",

  /**
   * Should search engines index the public guide?
   * false = hidden from Google (robots noindex + disallow). The secret boat
   * manual is never indexed, regardless of this setting.
   */
  indexable: process.env.NEXT_PUBLIC_INDEXABLE === "true",

  /** Show a small "sample — to be verified" label on demo recommendations. */
  showDemoLabels: true,

  /** Show a subtle "photo coming soon" caption on illustration placeholders. */
  showPhotoHints: true,

  /** Hero photo of the villa (put the file in /public/images/villa/). */
  heroImage: photos.hero as ImageRef | undefined,

  /** Location of Kas Daas — the home base on the map. */
  home: {
    address: todo("ADRES KAS DAAS", "KAS DAAS ADDRESS"),
    /** Neighbourhood (from the owner's listing). */
    area: "Belnem, Kralendijk",
    /** Replace with the real coordinates and remove `placeholder` (now: roughly Belnem). */
    coordinates: { lat: 12.118, lng: -68.284, placeholder: true } as Coordinates,
    /** Google Maps search / share link to the villa, used for the route button. */
    mapsUrl: todo("GOOGLE MAPS-LINK KAS DAAS", "GOOGLE MAPS LINK KAS DAAS"),
  },

  /** The host / property manager guests can contact. */
  host: {
    name: todo("NAAM BEHEERDER", "HOST NAME"),
    phone: todo("TELEFOONNUMMER BEHEERDER", "HOST PHONE NUMBER"),
    whatsapp: todo("WHATSAPP-NUMMER BEHEERDER", "HOST WHATSAPP NUMBER"),
    email: todo("E-MAILADRES BEHEERDER", "HOST EMAIL ADDRESS"),
    availability: todo("BEREIKBAARHEID BEHEERDER (BIJV. DAGELIJKS 08:00–20:00)", "HOST AVAILABILITY (E.G. DAILY 8 AM–8 PM)"),
  },

  /**
   * Emergency & important numbers.
   * VERIFY before going live. 911 is the general emergency number in the
   * Caribbean Netherlands; confirm it is still current.
   */
  emergencyContacts: [
    {
      id: "emergency",
      label: l("Alarmnummer (politie, brandweer, ambulance)", "Emergency (police, fire, ambulance)"),
      phone: "911",
      primary: true,
    },
    {
      id: "hospital",
      label: l("Ziekenhuis Fundashon Mariadal", "Hospital Fundashon Mariadal"),
      phone: todo("TELEFOONNUMMER ZIEKENHUIS", "HOSPITAL PHONE NUMBER"),
    },
    {
      id: "doctor",
      label: l("Huisarts / doktersdienst", "Doctor / GP on call"),
      phone: todo("TELEFOONNUMMER HUISARTS", "DOCTOR PHONE NUMBER"),
    },
    {
      id: "police",
      label: l("Politie (geen spoed)", "Police (non-emergency)"),
      phone: todo("TELEFOONNUMMER POLITIE GEEN SPOED", "POLICE NON-EMERGENCY NUMBER"),
    },
  ] satisfies Contact[],

  /** Default WhatsApp message when a guest taps "WhatsApp the host". */
  whatsappGreeting: l("Hoi! We verblijven in Kas Daas en hebben een vraag: ", "Hi! We're staying at Kas Daas and have a question: "),
};
