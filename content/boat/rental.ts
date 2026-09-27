import { l, todo } from "../_helpers";
import type { BoatFact, ImageRef } from "@/lib/types";

/**
 * ─────────────────────────────────────────────────────────────────────────────
 *  BOAT RENTAL — PUBLIC PAGE (/boat)
 *  Visible to every guest. Only promise what is filled in here.
 *  The manual for renters lives in /content/boat/private (server-only).
 * ─────────────────────────────────────────────────────────────────────────────
 */
export const boatRental = {
  eyebrow: l("Onze boot", "Our boat"),
  title: l("Bonaire vanaf het water", "Discover Bonaire from the water"),
  subtitle: l("Jouw dag op zee", "Your day on the water"),
  intro: l(
    "Naast de villa heeft Kas Daas een eigen boot die je tijdens je verblijf kunt huren. Ontdek verborgen baaien, snorkel boven het rif en zie het eiland vanaf zee.",
    "Alongside the villa, Kas Daas has its own boat you can rent during your stay. Discover hidden bays, snorkel above the reef and see the island from the sea.",
  ),
  boatName: todo("NAAM / TYPE BOOT", "BOAT NAME / TYPE"),
  description: [todo("OMSCHRIJVING VAN DE BOOT (TYPE, LENGTE, MOTOR, UITSTRALING)", "DESCRIPTION OF THE BOAT (TYPE, LENGTH, ENGINE, CHARACTER)")],
  gallery: [] as ImageRef[],
  // gallery: [{ src: "/images/boat/boat-1.jpg", alt: l("De boot bij Klein Bonaire", "The boat at Klein Bonaire") }],
  facts: [
    { id: "capacity", icon: "user", label: l("Capaciteit", "Capacity"), value: todo("MAX. AANTAL PERSONEN", "MAX. NUMBER OF PEOPLE") },
    { id: "price", icon: "banknote", label: l("Huurprijs", "Rental price"), value: todo("HUURPRIJS (PER DAGDEEL / DAG)", "RENTAL PRICE (PER HALF DAY / DAY)") },
    { id: "deposit", icon: "shield", label: l("Borg", "Deposit"), value: todo("BORG (INDIEN VAN TOEPASSING)", "DEPOSIT (IF APPLICABLE)") },
    { id: "license", icon: "compass", label: l("Vaarbewijs", "Boating licence"), value: todo("VAARBEWIJS- / ERVARINGSEISEN", "LICENCE / EXPERIENCE REQUIREMENTS") },
    { id: "fuel", icon: "fuel", label: l("Brandstof", "Fuel"), value: todo("BRANDSTOFREGELING", "FUEL ARRANGEMENT") },
    { id: "availability", icon: "calendar", label: l("Beschikbaarheid", "Availability"), value: todo("BESCHIKBAARHEID / HOE RESERVEREN", "AVAILABILITY / HOW TO BOOK") },
  ] satisfies BoatFact[],
  included: [todo("WAT IS INBEGREPEN (BIJV. SNORKELSETS, KOELBOX, ZWEMVESTEN)", "WHAT'S INCLUDED (E.G. SNORKEL SETS, COOLER, LIFE JACKETS)")],
  conditions: [todo("HUURVOORWAARDEN", "RENTAL CONDITIONS")],
  ideas: [
    l("Een ochtend snorkelen rond Klein Bonaire", "A morning snorkeling around Klein Bonaire"),
    l("De kust zien vanaf het water", "Seeing the coastline from the water"),
    l("Terug zijn voor een drankje bij zonsondergang", "Back in time for a sunset drink"),
  ],
  ctaText: l("Informeer naar beschikbaarheid", "Check availability"),
  whatsappMessage: l(
    "Hoi! We verblijven in Kas Daas en willen graag informeren naar de boot. Onze voorkeursdatum is: ",
    "Hi! We're staying at Kas Daas and would love to ask about the boat. Our preferred date is: ",
  ),
  disclaimer: l(
    "Huur is altijd onder voorbehoud van beschikbaarheid, weersomstandigheden en de huurvoorwaarden.",
    "Rental is always subject to availability, weather conditions and the rental terms.",
  ),
};
