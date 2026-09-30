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
  tagline: l("Jouw gids voor Kas Daas & Bonaire", "Your guide to Kas Daas & Bonaire", "Tu guía de Kas Daas y Bonaire"),
  description: l(
    "De digitale gastengids van Kas Daas: alles over de villa, onze favoriete plekken op Bonaire en de boot.",
    "The digital guest guide of Kas Daas: everything about the villa, our favourite places on Bonaire and the boat.", "La guía digital para huéspedes de Kas Daas: todo sobre la villa, nuestros lugares favoritos de Bonaire y el barco.",
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
    address: "Punt Vierkant 6A, Kralendijk, Bonaire",
    /** Neighbourhood (from the owner's listing). */
    area: "Belnem, Kralendijk",
    /** Exact location of the villa (provided by the owner). */
    coordinates: { lat: 12.1198683, lng: -68.2914733 } as Coordinates,
    /** Link used for the route button (directions to the coordinates above). */
    mapsUrl: "https://www.google.com/maps/dir/?api=1&destination=12.1198683,-68.2914733",
  },

  /** The host / property manager guests can contact. */
  host: {
    name: "Dennis",
    phone: "+599 782 9691",
    /** Assumed to be the same number as the phone — change if WhatsApp uses another number. */
    whatsapp: "+599 782 9691",
    email: todo("E-MAILADRES BEHEERDER", "HOST EMAIL ADDRESS", "CORREO ELECTRÓNICO DEL ANFITRIÓN"),
    availability: todo("BEREIKBAARHEID BEHEERDER (BIJV. DAGELIJKS 08:00–20:00)", "HOST AVAILABILITY (E.G. DAILY 8 AM–8 PM)", "DISPONIBILIDAD DEL ANFITRIÓN (P. EJ. A DIARIO DE 8:00 A 20:00)"),
  },

  /**
   * Emergency & important numbers.
   * VERIFY before going live. 911 is the general emergency number in the
   * Caribbean Netherlands; confirm it is still current.
   */
  emergencyContacts: [
    {
      id: "emergency",
      label: l("Alarmnummer (politie, brandweer, ambulance)", "Emergency (police, fire, ambulance)", "Emergencias (policía, bomberos, ambulancia)"),
      phone: "911",
      primary: true,
    },
    {
      id: "hospital",
      label: l("Ziekenhuis Fundashon Mariadal", "Hospital Fundashon Mariadal", "Hospital Fundashon Mariadal"),
      phone: todo("TELEFOONNUMMER ZIEKENHUIS", "HOSPITAL PHONE NUMBER", "TELÉFONO DEL HOSPITAL"),
    },
    {
      id: "doctor",
      label: l("Huisarts / doktersdienst", "Doctor / GP on call", "Médico / médico de guardia"),
      phone: todo("TELEFOONNUMMER HUISARTS", "DOCTOR PHONE NUMBER", "TELÉFONO DEL MÉDICO"),
    },
    {
      id: "police",
      label: l("Politie (geen spoed)", "Police (non-emergency)", "Policía (no urgente)"),
      phone: todo("TELEFOONNUMMER POLITIE GEEN SPOED", "POLICE NON-EMERGENCY NUMBER", "TELÉFONO DE LA POLICÍA (NO URGENTE)"),
    },
  ] satisfies Contact[],

  /** Default WhatsApp message when a guest taps "WhatsApp the host". */
  whatsappGreeting: l("Hoi! We verblijven in Kas Daas en hebben een vraag: ", "Hi! We're staying at Kas Daas and have a question: ", "¡Hola! Nos alojamos en Kas Daas y tenemos una pregunta: "),
};
