import { l, todo } from "../_helpers";
import type { ChecklistItem, Problem } from "@/lib/types";

/**
 * ─────────────────────────────────────────────────────────────────────────────
 *  DEPARTURE — check-out checklist (interactive, ticked items are remembered
 *  on the guest's phone). Add / remove items freely.
 * ─────────────────────────────────────────────────────────────────────────────
 */
export const departure = {
  intro: l(
    "Wat fijn dat je bij ons was. De check-out is altijd persoonlijk. Met deze korte checklist ben je er klaar voor.",
    "We're so glad you stayed with us. Check-out is always in person. This short checklist gets you ready.",
  ),
  checklist: [
    { id: "time", label: l("Uitchecken vóór 10:00", "Check out by 10:00 am") },
    { id: "waste", label: l("Afval weggebracht", "Waste taken out"), detail: l("In de afvalbak rechtsvoor de woning.", "In the bin at the front right of the house.") },
    { id: "dishes", label: l("Vaat afgewassen in de vaatwasser", "Dishes washed in the dishwasher") },
    { id: "fridge", label: l("Koelkast leeg", "Fridge emptied"), detail: todo("WAT TE DOEN MET OVERGEBLEVEN ETEN", "WHAT TO DO WITH LEFTOVER FOOD") },
    { id: "towels", label: l("Handdoeken verzameld", "Towels gathered"), detail: todo("WAAR GEBRUIKTE HANDDOEKEN HEEN MOETEN", "WHERE USED TOWELS GO") },
    { id: "linen", label: l("Beddengoed", "Bed linen"), detail: todo("BEDDENGOED AFHALEN OF LATEN LIGGEN?", "STRIP THE BEDS OR LEAVE AS IS?") },
    { id: "airco", label: l("Airco en lampen uit", "Air conditioning and lights off") },
    { id: "windows", label: l("Ramen en deuren dicht", "Windows and doors closed") },
    { id: "key", label: l("Tags, sleutels & polsbandjes klaar", "Tags, keys & wristbands ready"), detail: l("Tags, sleutels en polsbandjes lever je in bij de persoonlijke check-out.", "Hand in the tags, keys and wristbands at the in-person check-out.") },
    { id: "other", label: l("Overige instructies", "Other instructions"), detail: todo("OVERIGE VERTREKINSTRUCTIES", "OTHER DEPARTURE INSTRUCTIONS") },
  ] satisfies ChecklistItem[],
  goodbye: l(
    "Goede reis naar huis. Hopelijk tot een volgende keer op Bonaire — Kas Daas wacht op je.",
    "Safe travels home. We hope to see you again on Bonaire — Kas Daas will be waiting.",
  ),
};

/**
 * ─────────────────────────────────────────────────────────────────────────────
 *  PROBLEMS — "what do I do if…". Steps are shown in order; `escalate` explains
 *  when to contact the host. Never add technical steps that aren't confirmed.
 * ─────────────────────────────────────────────────────────────────────────────
 */
export const problems: Problem[] = [
  {
    id: "power-outage",
    icon: "zap",
    title: l("Stroomstoring", "Power outage"),
    steps: [
      l("Kijk of de buren ook zonder stroom zitten — dan is het waarschijnlijk een storing op het eiland.", "Check whether the neighbours are also without power — then it's likely an island-wide outage."),
      todo("LOCATIE STOPPENKAST EN WAT TE CONTROLEREN", "LOCATION OF THE FUSE BOX AND WHAT TO CHECK"),
      todo("WAAR LIGGEN ZAKLAMPEN / NOODVERLICHTING", "WHERE TO FIND TORCHES / EMERGENCY LIGHTS"),
    ],
    escalate: l("Blijft het donker in alleen jullie villa? Neem contact met ons op.", "Still no power in just your villa? Please contact us."),
    keywords: ["stroom", "power", "outage", "storing", "elektriciteit", "electricity", "donker", "stoppenkast", "fuse"],
  },
  {
    id: "no-water",
    icon: "droplets",
    title: l("Geen water", "No water"),
    steps: [
      todo("WAT TE CONTROLEREN BIJ GEEN WATER (HOOFDKRAAN, POMP, TANK)", "WHAT TO CHECK WHEN THERE'S NO WATER (MAIN VALVE, PUMP, TANK)"),
    ],
    escalate: l("Lukt het niet? Laat het ons meteen weten.", "No luck? Let us know right away."),
    keywords: ["water", "geen water", "no water", "kraan", "tap", "douche", "shower", "pomp", "pump"],
  },
  {
    id: "wifi-down",
    icon: "wifi",
    title: l("Wifi werkt niet", "WiFi isn't working"),
    steps: [
      l("Zet de wifi op je telefoon even uit en weer aan.", "Turn WiFi on your phone off and on again."),
      todo("LOCATIE ROUTER EN HOE HERSTARTEN", "ROUTER LOCATION AND HOW TO RESTART IT"),
      l("Wacht na een herstart ongeveer 5 minuten.", "After a restart, wait about 5 minutes."),
    ],
    escalate: l("Nog steeds geen verbinding? Stuur ons een bericht.", "Still no connection? Send us a message."),
    keywords: ["wifi", "internet", "router", "verbinding", "connection", "netwerk", "network"],
  },
  {
    id: "airco-down",
    icon: "thermometer",
    title: l("Airco werkt niet", "Air conditioning isn't working"),
    steps: [
      l("Controleer of de afstandsbediening op ‘koelen’ staat en de batterijen werken.", "Check the remote is set to ‘cool’ and the batteries work."),
      l("Zijn ramen en deuren dicht?", "Are windows and doors closed?"),
      todo("OVERIGE AIRCO-CONTROLES (BIJV. SCHAKELAAR, RESET)", "OTHER AIR CONDITIONING CHECKS (E.G. SWITCH, RESET)"),
    ],
    escalate: l("Werkt hij nog steeds niet? Laat het ons weten, dan komen we langs.", "Still not working? Let us know and we'll come by."),
    keywords: ["airco", "ac", "air conditioning", "koeling", "warm", "hot"],
  },
  {
    id: "lost-key",
    icon: "key",
    title: l("Sleutel kwijt / buitengesloten", "Lost key / locked out"),
    steps: [todo("WAT TE DOEN BIJ SLEUTEL KWIJT (RESERVESLEUTEL, CODE)", "WHAT TO DO WHEN KEYS ARE LOST (SPARE KEY, CODE)")],
    escalate: l("Neem direct contact met ons op.", "Contact us straight away."),
    keywords: ["sleutel", "key", "kwijt", "lost", "buitengesloten", "locked out"],
  },
  {
    id: "damage",
    icon: "wrench",
    title: l("Iets kapot / schade", "Something broken / damage"),
    steps: [
      l("Geen zorgen — het kan gebeuren. Maak een foto.", "No worries — it happens. Take a photo."),
      l("Stuur de foto met een korte uitleg via WhatsApp.", "Send the photo with a short note via WhatsApp."),
    ],
    keywords: ["kapot", "broken", "schade", "damage", "stuk", "defect", "lekkage", "leak"],
  },
  {
    id: "medical",
    icon: "heart-pulse",
    title: l("Medisch probleem", "Medical issue"),
    urgent: true,
    steps: [
      l("Levensbedreigend? Bel direct het alarmnummer.", "Life-threatening? Call the emergency number immediately."),
      l("Niet spoedeisend: bel de huisarts of ga naar het ziekenhuis (zie noodnummers).", "Not urgent: call a doctor or go to the hospital (see emergency numbers)."),
      todo("LOCATIE EHBO-DOOS IN DE VILLA", "LOCATION OF THE FIRST AID KIT IN THE VILLA"),
    ],
    escalate: l("Laat het ons ook even weten, dan helpen we waar we kunnen.", "Let us know as well, we'll help wherever we can."),
    keywords: ["medisch", "medical", "dokter", "doctor", "arts", "ziekenhuis", "hospital", "ehbo", "first aid", "ziek", "sick"],
  },
  {
    id: "emergency",
    icon: "siren",
    title: l("Spoed", "Emergency"),
    urgent: true,
    steps: [
      l("Bel het alarmnummer bij direct gevaar.", "Call the emergency number if there is immediate danger."),
      l("Geef het adres van de villa door (zie Aankomst → Adres).", "Give the villa's address (see Arrival → Address)."),
      l("Informeer daarna de beheerder.", "Then inform the host."),
    ],
    keywords: ["spoed", "emergency", "nood", "112", "911", "brand", "fire", "politie", "police", "ambulance", "sos"],
  },
];
