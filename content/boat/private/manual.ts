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

const photo = (nl: string, en: string, es: string, de: string): MediaSlot => ({ kind: "image", caption: l(nl, en, es, de) });
const video = (nl: string, en: string, es: string, de: string): MediaSlot => ({ kind: "video", caption: l(nl, en, es, de) });

export const boatManual = {
  welcome: {
    title: l("Je hebt de boot gehuurd 🚤", "Let's get you on the water 🚤", "¡Al agua! 🚤", "Ab aufs Wasser 🚤"),
    text: l(
      "Fijn dat je met de boot van Kas Daas het water op gaat. Hier staat alles wat je nodig hebt — lees het even rustig door vóór vertrek.",
      "Great to have you out on the Kas Daas boat. Everything you need is here — please read through it calmly before you head out.", "Qué bien que salgas con el barco de Kas Daas. Aquí tienes todo lo que necesitas; léelo con calma antes de zarpar.", "Schön, dass du mit dem Kas-Daas-Boot rausfährst. Hier findest du alles, was du brauchst – lies es bitte in Ruhe durch, bevor du ablegst.",
    ),
  },

  mooringLocation: todo("WAAR LIGT DE BOOT (STEIGER / LIGPLAATS) + ROUTE", "WHERE THE BOAT IS MOORED (JETTY / BERTH) + DIRECTIONS", "DÓNDE ESTÁ AMARRADO EL BARCO (MUELLE / AMARRE) + CÓMO LLEGAR", "WO DAS BOOT LIEGT (STEG / LIEGEPLATZ) + WEGBESCHREIBUNG"),

  beforeDeparture: [
    { id: "inventory", label: l("Inventaris gecontroleerd", "Inventory checked", "Inventario revisado", "Inventar geprüft"), detail: todo("INVENTARISLIJST", "INVENTORY LIST", "LISTA DE INVENTARIO", "INVENTARLISTE") },
    { id: "bring", label: l("Benodigde spullen mee", "Everything you need on board", "Todo lo que necesitas a bordo", "Alles, was du an Bord brauchst"), detail: todo("WAT MOET JE ZELF MEENEMEN", "WHAT TO BRING YOURSELF", "QUÉ TRAER TÚ MISMO", "WAS DU SELBST MITBRINGEN SOLLTEST") },
    { id: "fuel", label: l("Brandstof gecontroleerd", "Fuel checked", "Combustible revisado", "Kraftstoff geprüft"), detail: todo("HOE BRANDSTOF CONTROLEREN", "HOW TO CHECK THE FUEL", "CÓMO REVISAR EL COMBUSTIBLE", "WIE MAN DEN KRAFTSTOFF PRÜFT") },
    { id: "safety", label: l("Veiligheidsmiddelen aan boord", "Safety equipment on board", "Equipo de seguridad a bordo", "Sicherheitsausrüstung an Bord"), detail: todo("LIJST VEILIGHEIDSMIDDELEN + LOCATIE", "LIST OF SAFETY EQUIPMENT + LOCATION", "LISTA DEL EQUIPO DE SEGURIDAD + UBICACIÓN", "LISTE DER SICHERHEITSAUSRÜSTUNG + ORT") },
    { id: "phone", label: l("Telefoon opgeladen", "Phone charged", "Teléfono cargado", "Handy aufgeladen") },
    { id: "weather", label: l("Weer & omstandigheden gecheckt", "Weather & conditions checked", "Tiempo y condiciones revisados", "Wetter & Bedingungen geprüft"), detail: todo("WAAR CHECK JE HET WEER / GRENZEN WIND EN GOLVEN", "WHERE TO CHECK THE WEATHER / LIMITS FOR WIND AND WAVES", "DÓNDE CONSULTAR EL TIEMPO / LÍMITES DE VIENTO Y OLAS", "WO MAN DAS WETTER PRÜFT / GRENZEN FÜR WIND UND WELLEN") },
    { id: "boat-specific", label: l("Boot-specifieke controles", "Boat-specific checks", "Revisiones específicas del barco", "Bootsspezifische Kontrollen"), detail: todo("OVERIGE CONTROLES VOOR VERTREK", "OTHER PRE-DEPARTURE CHECKS", "OTRAS REVISIONES ANTES DE SALIR", "WEITERE KONTROLLEN VOR DER ABFAHRT") },
  ] satisfies ChecklistItem[],

  startSteps: [
    { id: "s1", title: todo("STAP 1", "STEP 1", "PASO 1", "SCHRITT 1"), text: todo("UITLEG STAP 1 STARTEN", "EXPLANATION STEP 1 STARTING", "EXPLICACIÓN PASO 1 ARRANQUE", "ERKLÄRUNG SCHRITT 1 STARTEN"), media: [photo("Foto stap 1", "Photo step 1", "Foto paso 1", "Foto Schritt 1")] },
    { id: "s2", title: todo("STAP 2", "STEP 2", "PASO 2", "SCHRITT 2"), text: todo("UITLEG STAP 2 STARTEN", "EXPLANATION STEP 2 STARTING", "EXPLICACIÓN PASO 2 ARRANQUE", "ERKLÄRUNG SCHRITT 2 STARTEN"), media: [photo("Foto stap 2", "Photo step 2", "Foto paso 2", "Foto Schritt 2")] },
    { id: "s3", title: todo("STAP 3", "STEP 3", "PASO 3", "SCHRITT 3"), text: todo("UITLEG STAP 3 STARTEN", "EXPLANATION STEP 3 STARTING", "EXPLICACIÓN PASO 3 ARRANQUE", "ERKLÄRUNG SCHRITT 3 STARTEN"), media: [video("Korte video: de boot starten", "Short video: starting the boat", "Vídeo corto: arrancar el barco", "Kurzes Video: das Boot starten")] },
  ] satisfies BoatStep[],

  controls: [
    { id: "ignition", icon: "key", title: l("Contact / start", "Ignition / start", "Encendido / arranque", "Zündung / Start"), text: todo("UITLEG CONTACT EN STARTEN", "IGNITION AND STARTING", "ENCENDIDO Y ARRANQUE", "ZÜNDUNG UND STARTEN") },
    { id: "throttle", icon: "gauge", title: l("Gashendel", "Throttle", "Acelerador", "Gashebel"), text: todo("UITLEG GASHENDEL (VOORUIT/NEUTRAAL/ACHTERUIT)", "THROTTLE (FORWARD/NEUTRAL/REVERSE)", "ACELERADOR (AVANTE/PUNTO MUERTO/ATRÁS)", "GASHEBEL (VORWÄRTS/NEUTRAL/RÜCKWÄRTS)") },
    { id: "trim", icon: "navigation", title: l("Trim", "Trim", "Trim", "Trimm"), text: todo("UITLEG TRIM", "TRIM", "TRIM", "TRIMM") },
    { id: "steering", icon: "compass", title: l("Stuur", "Steering", "Dirección", "Lenkung"), text: todo("UITLEG STUREN", "STEERING", "DIRECCIÓN", "LENKUNG") },
    { id: "gears", icon: "gauge", title: l("Schakelen", "Shifting", "Cambio de marcha", "Schalten"), text: todo("UITLEG SCHAKELEN", "SHIFTING", "CAMBIO DE MARCHA", "SCHALTEN") },
    { id: "anchor", icon: "anchor", title: l("Anker", "Anchor", "Ancla", "Anker"), text: todo("UITLEG ANKER (INDIEN AAN BOORD)", "ANCHOR (IF ON BOARD)", "ANCLA (SI HAY A BORDO)", "ANKER (FALLS AN BORD)") },
    { id: "bilge", icon: "droplets", title: l("Bilgepomp", "Bilge pump", "Bomba de achique", "Bilgepumpe"), text: todo("UITLEG BILGEPOMP (INDIEN AANWEZIG)", "BILGE PUMP (IF PRESENT)", "BOMBA DE ACHIQUE (SI HAY)", "BILGEPUMPE (FALLS VORHANDEN)") },
    { id: "battery", icon: "battery", title: l("Accu", "Battery", "Batería", "Batterie"), text: todo("UITLEG ACCU / HOOFDSCHAKELAAR", "BATTERY / MAIN SWITCH", "BATERÍA / INTERRUPTOR PRINCIPAL", "BATTERIE / HAUPTSCHALTER") },
    { id: "navigation", icon: "navigation", title: l("Navigatie", "Navigation", "Navegación", "Navigation"), text: todo("UITLEG NAVIGATIE", "NAVIGATION", "NAVEGACIÓN", "NAVIGATION") },
    { id: "gps", icon: "map-pin", title: l("Dieptemeter / GPS", "Depth sounder / GPS", "Sonda / GPS", "Echolot / GPS"), text: todo("UITLEG DIEPTEMETER/GPS (INDIEN AANWEZIG)", "DEPTH SOUNDER/GPS (IF PRESENT)", "SONDA/GPS (SI HAY)", "ECHOLOT/GPS (FALLS VORHANDEN)") },
  ] satisfies BoatControl[],

  safety: [
    { id: "life-jackets", icon: "life-buoy", title: l("Reddingsvesten", "Life jackets", "Chalecos salvavidas", "Rettungswesten"), text: todo("AANTAL, LOCATIE EN REGELS REDDINGSVESTEN", "NUMBER, LOCATION AND RULES FOR LIFE JACKETS", "NÚMERO, UBICACIÓN Y NORMAS DE LOS CHALECOS SALVAVIDAS", "ANZAHL, ORT UND REGELN FÜR RETTUNGSWESTEN") },
    { id: "kill-cord", icon: "alert", title: l("Noodstopkoord", "Kill cord", "Hombre al agua (cordón de parada)", "Notstoppleine"), text: todo("GEBRUIK NOODSTOPKOORD", "USING THE KILL CORD", "USO DEL CORDÓN DE PARADA", "GEBRAUCH DER NOTSTOPPLEINE") },
    { id: "anchoring", icon: "anchor", title: l("Ankeren", "Anchoring", "Fondear", "Ankern"), text: todo("REGELS ANKEREN (WAAR WEL/NIET)", "ANCHORING RULES (WHERE / WHERE NOT)", "NORMAS PARA FONDEAR (DÓNDE SÍ / DÓNDE NO)", "REGELN ZUM ANKERN (WO / WO NICHT)") },
    { id: "shallows", icon: "waves", title: l("Ondieptes", "Shallows", "Bajos", "Untiefen"), text: todo("ONDIEPTES EN HOE HERKENNEN", "SHALLOWS AND HOW TO SPOT THEM", "BAJOS Y CÓMO RECONOCERLOS", "UNTIEFEN UND WIE MAN SIE ERKENNT") },
    { id: "reef", icon: "fish", title: l("Rif", "Reef", "Arrecife", "Riff"), text: todo("REGELS ROND HET RIF", "RULES AROUND THE REEF", "NORMAS CERCA DEL ARRECIFE", "REGELN AM RIFF") },
    { id: "swimmers", icon: "user", title: l("Zwemmers & snorkelaars", "Swimmers & snorkelers", "Nadadores y buceadores de superficie", "Schwimmer & Schnorchler"), text: todo("AFSTAND EN SNELHEID BIJ ZWEMMERS/DUIKERS", "DISTANCE AND SPEED NEAR SWIMMERS/DIVERS", "DISTANCIA Y VELOCIDAD CERCA DE NADADORES/BUCEADORES", "ABSTAND UND GESCHWINDIGKEIT BEI SCHWIMMERN/TAUCHERN") },
    { id: "weather", icon: "cloud-sun", title: l("Weersomstandigheden", "Weather conditions", "Condiciones meteorológicas", "Wetterbedingungen"), text: todo("WANNEER NIET UITVAREN / TERUGKEREN", "WHEN NOT TO GO OUT / WHEN TO RETURN", "CUÁNDO NO SALIR / CUÁNDO VOLVER", "WANN NICHT RAUSFAHREN / WANN ZURÜCKKEHREN") },
    { id: "emergency", icon: "siren", title: l("Noodsituatie", "Emergency", "Emergencia", "Notfall"), text: todo("WAT TE DOEN BIJ NOOD (VOLGORDE)", "WHAT TO DO IN AN EMERGENCY (ORDER)", "QUÉ HACER EN UNA EMERGENCIA (ORDEN)", "WAS IM NOTFALL ZU TUN IST (REIHENFOLGE)") },
  ] satisfies BoatControl[],

  /** Boating area. Draw polygons as [lat, lng] pairs. Leave empty until provided by the owner. */
  area: {
    intro: todo("TOEGESTAAN VAARGEBIED IN WOORDEN", "PERMITTED BOATING AREA IN WORDS", "ZONA DE NAVEGACIÓN PERMITIDA EN PALABRAS", "ERLAUBTES FAHRGEBIET IN WORTEN"),
    image: undefined as string | undefined, // optional pre-drawn chart, e.g. "/images/boat/area-7f3k.png"
    zones: [] as BoatZone[],
    rules: [todo("AANLEG- EN ANKERREGELS", "MOORING AND ANCHORING RULES", "NORMAS DE AMARRE Y FONDEO", "REGELN ZUM ANLEGEN UND ANKERN")],
  },

  mooring: {
    anchoring: [todo("STAPPEN ANKEREN", "ANCHORING STEPS", "PASOS PARA FONDEAR", "SCHRITTE ZUM ANKERN")],
    docking: [todo("STAPPEN AANLEGGEN", "DOCKING STEPS", "PASOS PARA ATRACAR", "SCHRITTE ZUM ANLEGEN")],
  },

  returnChecklist: [
    { id: "moor", label: l("Boot correct aangelegd", "Boat moored correctly", "Barco bien amarrado", "Boot richtig festgemacht"), detail: todo("HOE AANLEGGEN BIJ TERUGKOMST", "HOW TO MOOR ON RETURN", "CÓMO AMARRAR AL VOLVER", "WIE MAN BEI DER RÜCKKEHR FESTMACHT") },
    { id: "engine", label: l("Motor uit", "Engine off", "Motor apagado", "Motor aus") },
    { id: "belongings", label: l("Spullen eruit", "Belongings off the boat", "Pertenencias fuera del barco", "Persönliche Sachen von Bord") },
    { id: "trash", label: l("Afval meegenomen", "Rubbish taken with you", "Basura recogida", "Müll mitgenommen") },
    { id: "inventory", label: l("Inventaris compleet", "Inventory complete", "Inventario completo", "Inventar vollständig") },
    { id: "fuel", label: l("Brandstofprocedure", "Fuel procedure", "Procedimiento de combustible", "Tankregelung"), detail: todo("BRANDSTOFPROCEDURE BIJ TERUGKOMST", "FUEL PROCEDURE ON RETURN", "PROCEDIMIENTO DE COMBUSTIBLE AL VOLVER", "TANKREGELUNG BEI DER RÜCKKEHR") },
    { id: "key", label: l("Sleutelprocedure", "Key procedure", "Procedimiento de llaves", "Schlüsselübergabe"), detail: todo("SLEUTELPROCEDURE", "KEY PROCEDURE", "PROCEDIMIENTO DE LLAVES", "ABLAUF SCHLÜSSELÜBERGABE") },
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
      title: l("Motor start niet", "Engine won't start", "El motor no arranca", "Motor springt nicht an"),
      start: "neutral",
      nodes: [
        {
          id: "neutral",
          text: l("Staat de gashendel in neutraal?", "Is the throttle in neutral?", "¿Está el acelerador en punto muerto?", "Steht der Gashebel auf Neutral?"),
          detail: l("Voorbeeldvraag — door de eigenaar te bevestigen.", "Example question — to be confirmed by the owner.", "Pregunta de ejemplo: pendiente de confirmar por el propietario.", "Beispielfrage – muss vom Eigentümer bestätigt werden."),
          options: [
            { label: l("Ja", "Yes", "Sí", "Ja"), next: "killcord" },
            { label: l("Nee — nu wel, probeer opnieuw", "No — fixed, try again", "No — corregido, inténtalo de nuevo", "Nein – korrigiert, erneut versuchen"), next: "retry" },
          ],
        },
        {
          id: "killcord",
          text: l("Zit het noodstopkoord correct vast?", "Is the kill cord attached correctly?", "¿Está bien sujeto el cordón de parada?", "Ist die Notstoppleine richtig befestigt?"),
          detail: l("Voorbeeldvraag — door de eigenaar te bevestigen.", "Example question — to be confirmed by the owner.", "Pregunta de ejemplo: pendiente de confirmar por el propietario.", "Beispielfrage – muss vom Eigentümer bestätigt werden."),
          options: [
            { label: l("Ja", "Yes", "Sí", "Ja"), next: "more" },
            { label: l("Nee — nu wel, probeer opnieuw", "No — fixed, try again", "No — corregido, inténtalo de nuevo", "Nein – korrigiert, erneut versuchen"), next: "retry" },
          ],
        },
        {
          id: "more",
          text: todo("VOLGENDE CONTROLE (BIJV. ACCUSCHAKELAAR)", "NEXT CHECK (E.G. BATTERY SWITCH)", "SIGUIENTE COMPROBACIÓN (P. EJ. INTERRUPTOR DE BATERÍA)", "NÄCHSTE KONTROLLE (Z. B. BATTERIESCHALTER)"),
          options: [
            { label: l("Opgelost", "Solved", "Resuelto", "Gelöst"), next: "solved" },
            { label: l("Nog steeds niet", "Still not working", "Sigue sin funcionar", "Funktioniert immer noch nicht"), next: "contact" },
          ],
        },
        {
          id: "retry",
          text: l("Start de motor opnieuw. Werkt het?", "Try starting the engine again. Does it work?", "Intenta arrancar el motor de nuevo. ¿Funciona?", "Versuche den Motor erneut zu starten. Klappt es?"),
          options: [
            { label: l("Ja", "Yes", "Sí", "Ja"), next: "solved" },
            { label: l("Nee", "No", "No", "Nein"), next: "contact" },
          ],
        },
      ],
    },
    {
      id: "no-trim",
      icon: "navigation",
      title: l("Motor trimt niet", "Engine won't trim", "El trim no funciona", "Trimm funktioniert nicht"),
      start: "t1",
      nodes: [
        { id: "t1", text: todo("EERSTE CONTROLE TRIM", "FIRST TRIM CHECK", "PRIMERA COMPROBACIÓN DEL TRIM", "ERSTE TRIMM-KONTROLLE"), options: [{ label: l("Opgelost", "Solved", "Resuelto", "Gelöst"), next: "solved" }, { label: l("Nog steeds niet", "Still not working", "Sigue sin funcionar", "Funktioniert immer noch nicht"), next: "contact" }] },
      ],
    },
    {
      id: "battery",
      icon: "battery",
      title: l("Accuprobleem", "Battery problem", "Problema de batería", "Batterieproblem"),
      start: "b1",
      nodes: [
        { id: "b1", text: todo("EERSTE CONTROLE ACCU", "FIRST BATTERY CHECK", "PRIMERA COMPROBACIÓN DE LA BATERÍA", "ERSTE BATTERIE-KONTROLLE"), options: [{ label: l("Opgelost", "Solved", "Resuelto", "Gelöst"), next: "solved" }, { label: l("Nog steeds niet", "Still not working", "Sigue sin funcionar", "Funktioniert immer noch nicht"), next: "contact" }] },
      ],
    },
    {
      id: "aground",
      icon: "waves",
      title: l("Vastgelopen", "Run aground", "Encallado", "Auf Grund gelaufen"),
      urgent: true,
      start: "a0",
      nodes: [
        {
          id: "a0",
          text: l("Is iemand gewond of maakt de boot water?", "Is anyone injured or is the boat taking on water?", "¿Hay alguien herido o está entrando agua en el barco?", "Ist jemand verletzt oder dringt Wasser ins Boot?"),
          options: [
            { label: l("Ja", "Yes", "Sí", "Ja"), next: "sos" },
            { label: l("Nee", "No", "No", "Nein"), next: "a1" },
          ],
        },
        { id: "a1", text: todo("WAT TE DOEN BIJ VASTLOPEN", "WHAT TO DO WHEN AGROUND", "QUÉ HACER SI ENCALLAS", "WAS TUN, WENN MAN AUF GRUND GELAUFEN IST"), options: [{ label: l("Opgelost", "Solved", "Resuelto", "Gelöst"), next: "solved" }, { label: l("Hulp nodig", "Need help", "Necesito ayuda", "Hilfe nötig"), next: "contact" }] },
      ],
    },
    {
      id: "damage",
      icon: "wrench",
      title: l("Schade", "Damage", "Daños", "Schaden"),
      start: "d1",
      nodes: [
        {
          id: "d1",
          text: l("Is de boot nog veilig om mee te varen?", "Is the boat still safe to operate?", "¿Se puede seguir navegando con seguridad?", "Kann das Boot noch sicher gefahren werden?"),
          options: [
            { label: l("Ja", "Yes", "Sí", "Ja"), next: "d2" },
            { label: l("Nee / weet ik niet", "No / not sure", "No / no estoy seguro", "Nein / nicht sicher"), next: "contact" },
          ],
        },
        { id: "d2", text: l("Maak foto's en stuur ze naar de beheerder. Vaar rustig terug.", "Take photos and send them to the owner. Return calmly.", "Haz fotos y envíaselas al propietario. Vuelve con calma.", "Mach Fotos und schicke sie dem Eigentümer. Fahr ruhig zurück."), options: [{ label: l("Contact opnemen", "Contact the owner", "Contacta con el propietario", "Eigentümer kontaktieren"), next: "contact" }] },
      ],
    },
    {
      id: "emergency",
      icon: "siren",
      title: l("Noodgeval", "Emergency", "Emergencia", "Notfall"),
      urgent: true,
      start: "sos",
      nodes: [],
    },
  ] as BoatProblem[],

  contacts: [
    // WhatsApp assumed on the same number.
    { id: "owner", label: l("Bootbeheerder", "Boat manager", "Encargado del barco", "Bootsverwalter"), phone: "+599 701 3200", whatsapp: "+599 701 3200" },
    { id: "emergency", label: l("Alarmnummer", "Emergency number", "Número de emergencia", "Notrufnummer"), phone: "911", primary: true },
    { id: "coastguard", label: l("Kustwacht", "Coast guard", "Guardia costera", "Küstenwache"), phone: todo("TELEFOONNUMMER KUSTWACHT", "COAST GUARD PHONE NUMBER", "TELÉFONO DE LA GUARDIA COSTERA", "TELEFONNUMMER DER KÜSTENWACHE"), note: todo("VHF-KANAAL", "VHF CHANNEL", "CANAL VHF", "UKW-KANAL") },
  ] satisfies Contact[],
};
