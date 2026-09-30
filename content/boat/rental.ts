import { l, todo } from "../_helpers";
import type { BoatFact, ImageRef } from "@/lib/types";
import { photos } from "../images";

/**
 * ─────────────────────────────────────────────────────────────────────────────
 *  BOAT RENTAL — PUBLIC PAGE (/boat)
 *  Visible to every guest. Only promise what is filled in here.
 *  The manual for renters lives in /content/boat/private (server-only).
 * ─────────────────────────────────────────────────────────────────────────────
 */
export const boatRental = {
  eyebrow: l("Onze boot", "Our boat", "Nuestro barco"),
  title: l("Bonaire vanaf het water", "Discover Bonaire from the water", "Descubre Bonaire desde el agua"),
  subtitle: l("Jouw dag op zee", "Your day on the water", "Tu día en el agua"),
  intro: l(
    "Naast de villa heeft Kas Daas een eigen boot die je tijdens je verblijf kunt huren. Ontdek verborgen baaien, snorkel boven het rif en zie het eiland vanaf zee.",
    "Alongside the villa, Kas Daas has its own boat you can rent during your stay. Discover hidden bays, snorkel above the reef and see the island from the sea.", "Además de la villa, Kas Daas tiene su propio barco que puedes alquilar durante tu estancia. Descubre calas escondidas, haz snorkel sobre el arrecife y contempla la isla desde el mar.",
  ),
  boatName: todo("NAAM / TYPE BOOT", "BOAT NAME / TYPE", "NOMBRE / TIPO DE BARCO"),
  description: [todo("OMSCHRIJVING VAN DE BOOT (TYPE, LENGTE, MOTOR, UITSTRALING)", "DESCRIPTION OF THE BOAT (TYPE, LENGTH, ENGINE, CHARACTER)", "DESCRIPCIÓN DEL BARCO (TIPO, ESLORA, MOTOR, CARÁCTER)")],
  /** First photo is the page header. Add photos of the boat itself here. */
  gallery: [photos.aerialBoats, photos.dolphins, photos.aerialCoast] as ImageRef[],
  facts: [
    { id: "capacity", icon: "user", label: l("Capaciteit", "Capacity", "Capacidad"), value: todo("MAX. AANTAL PERSONEN", "MAX. NUMBER OF PEOPLE", "NÚMERO MÁX. DE PERSONAS") },
    { id: "price", icon: "banknote", label: l("Huurprijs", "Rental price", "Precio de alquiler"), value: todo("HUURPRIJS (PER DAGDEEL / DAG)", "RENTAL PRICE (PER HALF DAY / DAY)", "PRECIO DE ALQUILER (POR MEDIO DÍA / DÍA)") },
    { id: "deposit", icon: "shield", label: l("Borg", "Deposit", "Fianza"), value: todo("BORG (INDIEN VAN TOEPASSING)", "DEPOSIT (IF APPLICABLE)", "FIANZA (SI PROCEDE)") },
    { id: "license", icon: "compass", label: l("Vaarbewijs", "Boating licence", "Licencia de navegación"), value: todo("VAARBEWIJS- / ERVARINGSEISEN", "LICENCE / EXPERIENCE REQUIREMENTS", "REQUISITOS DE LICENCIA / EXPERIENCIA") },
    { id: "fuel", icon: "fuel", label: l("Brandstof", "Fuel", "Combustible"), value: todo("BRANDSTOFREGELING", "FUEL ARRANGEMENT", "ACUERDO SOBRE EL COMBUSTIBLE") },
    { id: "availability", icon: "calendar", label: l("Beschikbaarheid", "Availability", "Disponibilidad"), value: todo("BESCHIKBAARHEID / HOE RESERVEREN", "AVAILABILITY / HOW TO BOOK", "DISPONIBILIDAD / CÓMO RESERVAR") },
  ] satisfies BoatFact[],
  included: [todo("WAT IS INBEGREPEN (BIJV. SNORKELSETS, KOELBOX, ZWEMVESTEN)", "WHAT'S INCLUDED (E.G. SNORKEL SETS, COOLER, LIFE JACKETS)", "QUÉ INCLUYE (P. EJ. EQUIPOS DE SNORKEL, NEVERA, CHALECOS)")],
  conditions: [todo("HUURVOORWAARDEN", "RENTAL CONDITIONS", "CONDICIONES DE ALQUILER")],
  ideas: [
    l("Een ochtend snorkelen rond Klein Bonaire", "A morning snorkeling around Klein Bonaire", "Una mañana de snorkel alrededor de Klein Bonaire"),
    l("De kust zien vanaf het water", "Seeing the coastline from the water", "Ver la costa desde el agua"),
    l("Terug zijn voor een drankje bij zonsondergang", "Back in time for a sunset drink", "De vuelta a tiempo para una copa al atardecer"),
  ],
  /** Contact for boat enquiries: the boat manager (WhatsApp assumed on the same number). */
  contact: { phone: "+599 701 3200", whatsapp: "+599 701 3200" },
  ctaText: l("Informeer naar beschikbaarheid", "Check availability", "Consultar disponibilidad"),
  whatsappMessage: l(
    "Hoi! We verblijven in Kas Daas en willen graag informeren naar de boot. Onze voorkeursdatum is: ",
    "Hi! We're staying at Kas Daas and would love to ask about the boat. Our preferred date is: ", "¡Hola! Nos alojamos en Kas Daas y nos gustaría preguntar por el barco. Nuestra fecha preferida es: ",
  ),
  disclaimer: l(
    "Huur is altijd onder voorbehoud van beschikbaarheid, weersomstandigheden en de huurvoorwaarden.",
    "Rental is always subject to availability, weather conditions and the rental terms.", "El alquiler siempre está sujeto a disponibilidad, a las condiciones meteorológicas y a las condiciones de alquiler.",
  ),
};
