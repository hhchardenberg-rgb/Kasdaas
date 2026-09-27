import "server-only";
import { l, todo } from "../../_helpers";
import type { BoatControl, BoatProblem, BoatStep, BoatZone, ChecklistItem, Contact, MediaSlot } from "@/lib/types";

/**
 * ─────────────────────────────────────────────────────────────────────────────
 *  🔒 BOAT MANUAL — PRIVATE
 *  This module can ONLY be imported on the server (`server-only`). Its content
 *  is rendered exclusively for requests carrying a valid boat access token and
 *  is never part of the public JavaScript bundles.
 *
 *  ⚠️ All technical and safety steps MUST be written/confirmed by the owner.
 *  The structure is ready; everything marked todo(…) still has to be filled in.
 *  Media: files in /public are reachable by anyone who knows the URL. For
 *  private photos/videos use unguessable file names (e.g. /images/boat/start-7f3k9q.jpg)
 *  or an access-controlled storage bucket.
 *
 *  Decision-tree answers point to another node id, or to "solved",
 *  "contact" (show owner contact) or "sos" (show the emergency screen).
 * ─────────────────────────────────────────────────────────────────────────────
 */

const photo = (nl: string, en: string): MediaSlot => ({ kind: "image", caption: l(nl, en) });
const video = (nl: string, en: string): MediaSlot => ({ kind: "video", caption: l(nl, en) });

export const boatManual = {
  welcome: {
    title: l("Je hebt de boot gehuurd 🚤", "Let's get you on the water 🚤"),
    text: l(
      "Fijn dat je met de boot van Kas Daas het water op gaat. Hier staat alles wat je nodig hebt — lees het even rustig door vóór vertrek.",
      "Great to have you out on the Kas Daas boat. Everything you need is here — please read through it calmly before you head out.",
    ),
  },

  mooringLocation: todo("WAAR LIGT DE BOOT (STEIGER / LIGPLAATS) + ROUTE", "WHERE THE BOAT IS MOORED (JETTY / BERTH) + DIRECTIONS"),

  beforeDeparture: [
    { id: "inventory", label: l("Inventaris gecontroleerd", "Inventory checked"), detail: todo("INVENTARISLIJST", "INVENTORY LIST") },
    { id: "bring", label: l("Benodigde spullen mee", "Everything you need on board"), detail: todo("WAT MOET JE ZELF MEENEMEN", "WHAT TO BRING YOURSELF") },
    { id: "fuel", label: l("Brandstof gecontroleerd", "Fuel checked"), detail: todo("HOE BRANDSTOF CONTROLEREN", "HOW TO CHECK THE FUEL") },
    { id: "safety", label: l("Veiligheidsmiddelen aan boord", "Safety equipment on board"), detail: todo("LIJST VEILIGHEIDSMIDDELEN + LOCATIE", "LIST OF SAFETY EQUIPMENT + LOCATION") },
    { id: "phone", label: l("Telefoon opgeladen", "Phone charged") },
    { id: "weather", label: l("Weer & omstandigheden gecheckt", "Weather & conditions checked"), detail: todo("WAAR CHECK JE HET WEER / GRENZEN WIND EN GOLVEN", "WHERE TO CHECK THE WEATHER / LIMITS FOR WIND AND WAVES") },
    { id: "boat-specific", label: l("Boot-specifieke controles", "Boat-specific checks"), detail: todo("OVERIGE CONTROLES VOOR VERTREK", "OTHER PRE-DEPARTURE CHECKS") },
  ] satisfies ChecklistItem[],

  startSteps: [
    { id: "s1", title: todo("STAP 1", "STEP 1"), text: todo("UITLEG STAP 1 STARTEN", "EXPLANATION STEP 1 STARTING"), media: [photo("Foto stap 1", "Photo step 1")] },
    { id: "s2", title: todo("STAP 2", "STEP 2"), text: todo("UITLEG STAP 2 STARTEN", "EXPLANATION STEP 2 STARTING"), media: [photo("Foto stap 2", "Photo step 2")] },
    { id: "s3", title: todo("STAP 3", "STEP 3"), text: todo("UITLEG STAP 3 STARTEN", "EXPLANATION STEP 3 STARTING"), media: [video("Korte video: de boot starten", "Short video: starting the boat")] },
  ] satisfies BoatStep[],

  controls: [
    { id: "ignition", icon: "key", title: l("Contact / start", "Ignition / start"), text: todo("UITLEG CONTACT EN STARTEN", "IGNITION AND STARTING") },
    { id: "throttle", icon: "gauge", title: l("Gashendel", "Throttle"), text: todo("UITLEG GASHENDEL (VOORUIT/NEUTRAAL/ACHTERUIT)", "THROTTLE (FORWARD/NEUTRAL/REVERSE)") },
    { id: "trim", icon: "navigation", title: l("Trim", "Trim"), text: todo("UITLEG TRIM", "TRIM") },
    { id: "steering", icon: "compass", title: l("Stuur", "Steering"), text: todo("UITLEG STUREN", "STEERING") },
    { id: "gears", icon: "gauge", title: l("Schakelen", "Shifting"), text: todo("UITLEG SCHAKELEN", "SHIFTING") },
    { id: "anchor", icon: "anchor", title: l("Anker", "Anchor"), text: todo("UITLEG ANKER (INDIEN AAN BOORD)", "ANCHOR (IF ON BOARD)") },
    { id: "bilge", icon: "droplets", title: l("Bilgepomp", "Bilge pump"), text: todo("UITLEG BILGEPOMP (INDIEN AANWEZIG)", "BILGE PUMP (IF PRESENT)") },
    { id: "battery", icon: "battery", title: l("Accu", "Battery"), text: todo("UITLEG ACCU / HOOFDSCHAKELAAR", "BATTERY / MAIN SWITCH") },
    { id: "navigation", icon: "navigation", title: l("Navigatie", "Navigation"), text: todo("UITLEG NAVIGATIE", "NAVIGATION") },
    { id: "gps", icon: "map-pin", title: l("Dieptemeter / GPS", "Depth sounder / GPS"), text: todo("UITLEG DIEPTEMETER/GPS (INDIEN AANWEZIG)", "DEPTH SOUNDER/GPS (IF PRESENT)") },
  ] satisfies BoatControl[],

  safety: [
    { id: "life-jackets", icon: "life-buoy", title: l("Reddingsvesten", "Life jackets"), text: todo("AANTAL, LOCATIE EN REGELS REDDINGSVESTEN", "NUMBER, LOCATION AND RULES FOR LIFE JACKETS") },
    { id: "kill-cord", icon: "alert", title: l("Noodstopkoord", "Kill cord"), text: todo("GEBRUIK NOODSTOPKOORD", "USING THE KILL CORD") },
    { id: "anchoring", icon: "anchor", title: l("Ankeren", "Anchoring"), text: todo("REGELS ANKEREN (WAAR WEL/NIET)", "ANCHORING RULES (WHERE / WHERE NOT)") },
    { id: "shallows", icon: "waves", title: l("Ondieptes", "Shallows"), text: todo("ONDIEPTES EN HOE HERKENNEN", "SHALLOWS AND HOW TO SPOT THEM") },
    { id: "reef", icon: "fish", title: l("Rif", "Reef"), text: todo("REGELS ROND HET RIF", "RULES AROUND THE REEF") },
    { id: "swimmers", icon: "user", title: l("Zwemmers & snorkelaars", "Swimmers & snorkelers"), text: todo("AFSTAND EN SNELHEID BIJ ZWEMMERS/DUIKERS", "DISTANCE AND SPEED NEAR SWIMMERS/DIVERS") },
    { id: "weather", icon: "cloud-sun", title: l("Weersomstandigheden", "Weather conditions"), text: todo("WANNEER NIET UITVAREN / TERUGKEREN", "WHEN NOT TO GO OUT / WHEN TO RETURN") },
    { id: "emergency", icon: "siren", title: l("Noodsituatie", "Emergency"), text: todo("WAT TE DOEN BIJ NOOD (VOLGORDE)", "WHAT TO DO IN AN EMERGENCY (ORDER)") },
  ] satisfies BoatControl[],

  /** Boating area. Draw polygons as [lat, lng] pairs. Leave empty until provided by the owner. */
  area: {
    intro: todo("TOEGESTAAN VAARGEBIED IN WOORDEN", "PERMITTED BOATING AREA IN WORDS"),
    image: undefined as string | undefined, // optional pre-drawn chart, e.g. "/images/boat/area-7f3k.png"
    zones: [] as BoatZone[],
    rules: [todo("AANLEG- EN ANKERREGELS", "MOORING AND ANCHORING RULES")],
  },

  mooring: {
    anchoring: [todo("STAPPEN ANKEREN", "ANCHORING STEPS")],
    docking: [todo("STAPPEN AANLEGGEN", "DOCKING STEPS")],
  },

  returnChecklist: [
    { id: "moor", label: l("Boot correct aangelegd", "Boat moored correctly"), detail: todo("HOE AANLEGGEN BIJ TERUGKOMST", "HOW TO MOOR ON RETURN") },
    { id: "engine", label: l("Motor uit", "Engine off") },
    { id: "belongings", label: l("Spullen eruit", "Belongings off the boat") },
    { id: "trash", label: l("Afval meegenomen", "Rubbish taken with you") },
    { id: "inventory", label: l("Inventaris compleet", "Inventory complete") },
    { id: "fuel", label: l("Brandstofprocedure", "Fuel procedure"), detail: todo("BRANDSTOFPROCEDURE BIJ TERUGKOMST", "FUEL PROCEDURE ON RETURN") },
    { id: "key", label: l("Sleutelprocedure", "Key procedure"), detail: todo("SLEUTELPROCEDURE", "KEY PROCEDURE") },
  ] satisfies ChecklistItem[],

  /**
   * Troubleshooting decision trees. Each node asks a question; answers point
   * to another node, "solved" or "contact". The first two questions of
   * "engine won't start" are EXAMPLES — the owner must confirm or replace them.
   */
  problems: [
    {
      id: "no-start",
      icon: "key",
      title: l("Motor start niet", "Engine won't start"),
      start: "neutral",
      nodes: [
        {
          id: "neutral",
          text: l("Staat de gashendel in neutraal?", "Is the throttle in neutral?"),
          detail: l("Voorbeeldvraag — door de eigenaar te bevestigen.", "Example question — to be confirmed by the owner."),
          options: [
            { label: l("Ja", "Yes"), next: "killcord" },
            { label: l("Nee — nu wel, probeer opnieuw", "No — fixed, try again"), next: "retry" },
          ],
        },
        {
          id: "killcord",
          text: l("Zit het noodstopkoord correct vast?", "Is the kill cord attached correctly?"),
          detail: l("Voorbeeldvraag — door de eigenaar te bevestigen.", "Example question — to be confirmed by the owner."),
          options: [
            { label: l("Ja", "Yes"), next: "more" },
            { label: l("Nee — nu wel, probeer opnieuw", "No — fixed, try again"), next: "retry" },
          ],
        },
        {
          id: "more",
          text: todo("VOLGENDE CONTROLE (BIJV. ACCUSCHAKELAAR)", "NEXT CHECK (E.G. BATTERY SWITCH)"),
          options: [
            { label: l("Opgelost", "Solved"), next: "solved" },
            { label: l("Nog steeds niet", "Still not working"), next: "contact" },
          ],
        },
        {
          id: "retry",
          text: l("Start de motor opnieuw. Werkt het?", "Try starting the engine again. Does it work?"),
          options: [
            { label: l("Ja", "Yes"), next: "solved" },
            { label: l("Nee", "No"), next: "contact" },
          ],
        },
      ],
    },
    {
      id: "no-trim",
      icon: "navigation",
      title: l("Motor trimt niet", "Engine won't trim"),
      start: "t1",
      nodes: [
        { id: "t1", text: todo("EERSTE CONTROLE TRIM", "FIRST TRIM CHECK"), options: [{ label: l("Opgelost", "Solved"), next: "solved" }, { label: l("Nog steeds niet", "Still not working"), next: "contact" }] },
      ],
    },
    {
      id: "battery",
      icon: "battery",
      title: l("Accuprobleem", "Battery problem"),
      start: "b1",
      nodes: [
        { id: "b1", text: todo("EERSTE CONTROLE ACCU", "FIRST BATTERY CHECK"), options: [{ label: l("Opgelost", "Solved"), next: "solved" }, { label: l("Nog steeds niet", "Still not working"), next: "contact" }] },
      ],
    },
    {
      id: "aground",
      icon: "waves",
      title: l("Vastgelopen", "Run aground"),
      urgent: true,
      start: "a0",
      nodes: [
        {
          id: "a0",
          text: l("Is iemand gewond of maakt de boot water?", "Is anyone injured or is the boat taking on water?"),
          options: [
            { label: l("Ja", "Yes"), next: "sos" },
            { label: l("Nee", "No"), next: "a1" },
          ],
        },
        { id: "a1", text: todo("WAT TE DOEN BIJ VASTLOPEN", "WHAT TO DO WHEN AGROUND"), options: [{ label: l("Opgelost", "Solved"), next: "solved" }, { label: l("Hulp nodig", "Need help"), next: "contact" }] },
      ],
    },
    {
      id: "damage",
      icon: "wrench",
      title: l("Schade", "Damage"),
      start: "d1",
      nodes: [
        {
          id: "d1",
          text: l("Is de boot nog veilig om mee te varen?", "Is the boat still safe to operate?"),
          options: [
            { label: l("Ja", "Yes"), next: "d2" },
            { label: l("Nee / weet ik niet", "No / not sure"), next: "contact" },
          ],
        },
        { id: "d2", text: l("Maak foto's en stuur ze naar de beheerder. Vaar rustig terug.", "Take photos and send them to the owner. Return calmly."), options: [{ label: l("Contact opnemen", "Contact the owner"), next: "contact" }] },
      ],
    },
    {
      id: "emergency",
      icon: "siren",
      title: l("Noodgeval", "Emergency"),
      urgent: true,
      start: "sos",
      nodes: [],
    },
  ] as BoatProblem[],

  contacts: [
    // WhatsApp assumed on the same number.
    { id: "owner", label: l("Bootbeheerder", "Boat manager"), phone: "+599 701 3200", whatsapp: "+599 701 3200" },
    { id: "emergency", label: l("Alarmnummer", "Emergency number"), phone: "911", primary: true },
    { id: "coastguard", label: l("Kustwacht", "Coast guard"), phone: todo("TELEFOONNUMMER KUSTWACHT", "COAST GUARD PHONE NUMBER"), note: todo("VHF-KANAAL", "VHF CHANNEL") },
  ] satisfies Contact[],
};
