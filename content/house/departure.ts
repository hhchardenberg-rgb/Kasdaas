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
    "We're so glad you stayed with us. Check-out is always in person. This short checklist gets you ready.", "Nos alegra mucho que te hayas alojado con nosotros. El check-out siempre es en persona. Con esta breve lista estarás listo.", "Schön, dass du bei uns warst. Der Check-out findet immer persönlich statt. Mit dieser kurzen Checkliste bist du bereit.",
  ),
  checklist: [
    { id: "time", label: l("Uitchecken vóór 10:00", "Check out by 10:00 am", "Check-out antes de las 10:00", "Check-out bis 10:00 Uhr") },
    { id: "waste", label: l("Afval weggebracht", "Waste taken out", "Basura sacada", "Müll rausgebracht"), detail: l("In de afvalbak rechtsvoor de woning.", "In the bin at the front right of the house.", "En el contenedor situado delante, a la derecha de la casa.", "In die Tonne vorne rechts am Haus.") },
    { id: "dishes", label: l("Vaat afgewassen in de vaatwasser", "Dishes washed in the dishwasher", "Platos lavados en el lavavajillas", "Geschirr in der Spülmaschine gespült") },
    { id: "fridge", label: l("Koelkast leeg", "Fridge emptied", "Nevera vaciada", "Kühlschrank geleert"), detail: l("Lang houdbare producten mag je achterlaten.", "You're welcome to leave long-life products behind.", "Puedes dejar los productos de larga duración.", "Haltbare Produkte darfst du gern dalassen.") },
    { id: "towels", label: l("Handdoeken verzameld", "Towels gathered", "Toallas recogidas", "Handtücher eingesammelt"), detail: l("Gebruikte handdoeken gaan in de wasmand.", "Used towels go in the laundry basket.", "Las toallas usadas van al cesto de la ropa.", "Benutzte Handtücher kommen in den Wäschekorb.") },
    { id: "linen", label: l("Beddengoed", "Bed linen", "Ropa de cama", "Bettwäsche"), detail: todo("BEDDENGOED AFHALEN OF LATEN LIGGEN?", "STRIP THE BEDS OR LEAVE AS IS?", "¿DESHACER LAS CAMAS O DEJARLAS COMO ESTÁN?", "BETTEN ABZIEHEN ODER SO LASSEN?") },
    { id: "airco", label: l("Airco en lampen uit", "Air conditioning and lights off", "Aire acondicionado y luces apagados", "Klimaanlage und Licht aus") },
    { id: "windows", label: l("Ramen en deuren dicht", "Windows and doors closed", "Ventanas y puertas cerradas", "Fenster und Türen geschlossen") },
    { id: "key", label: l("Tags, sleutels & polsbandjes klaar", "Tags, keys & wristbands ready", "Tags, llaves y pulseras preparados", "Tags, Schlüssel & Armbänder bereit"), detail: l("Tags, sleutels en polsbandjes lever je in bij de persoonlijke check-out.", "Hand in the tags, keys and wristbands at the in-person check-out.", "Entrega los tags, las llaves y las pulseras en el check-out en persona.", "Gib die Tags, Schlüssel und Armbänder beim persönlichen Check-out ab.") },
    { id: "other", label: l("Overige instructies", "Other instructions", "Otras instrucciones", "Weitere Hinweise"), detail: todo("OVERIGE VERTREKINSTRUCTIES", "OTHER DEPARTURE INSTRUCTIONS", "OTRAS INSTRUCCIONES DE SALIDA", "WEITERE HINWEISE ZUR ABREISE") },
  ] satisfies ChecklistItem[],
  goodbye: l(
    "Goede reis naar huis. Hopelijk tot een volgende keer op Bonaire — Kas Daas wacht op je.",
    "Safe travels home. We hope to see you again on Bonaire — Kas Daas will be waiting.", "Buen viaje de vuelta a casa. Esperamos volver a verte en Bonaire: Kas Daas te estará esperando.", "Gute Heimreise. Hoffentlich bis zum nächsten Mal auf Bonaire – Kas Daas wartet auf dich.",
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
    title: l("Stroomstoring", "Power outage", "Corte de luz", "Stromausfall"),
    steps: [
      l("Kijk of de buren ook zonder stroom zitten — dan is het waarschijnlijk een storing op het eiland.", "Check whether the neighbours are also without power — then it's likely an island-wide outage.", "Comprueba si los vecinos también se han quedado sin luz; en ese caso probablemente sea un corte en toda la isla.", "Schau, ob die Nachbarn auch keinen Strom haben – dann ist es wahrscheinlich ein inselweiter Ausfall."),
      todo("LOCATIE STOPPENKAST EN WAT TE CONTROLEREN", "LOCATION OF THE FUSE BOX AND WHAT TO CHECK", "UBICACIÓN DEL CUADRO ELÉCTRICO Y QUÉ REVISAR", "ORT DES SICHERUNGSKASTENS UND WAS ZU PRÜFEN IST"),
      todo("WAAR LIGGEN ZAKLAMPEN / NOODVERLICHTING", "WHERE TO FIND TORCHES / EMERGENCY LIGHTS", "DÓNDE HAY LINTERNAS / LUCES DE EMERGENCIA", "WO TASCHENLAMPEN / NOTBELEUCHTUNG ZU FINDEN SIND"),
    ],
    escalate: l("Blijft het donker in alleen jullie villa? Neem contact met ons op.", "Still no power in just your villa? Please contact us.", "¿Solo tu villa sigue sin luz? Ponte en contacto con nosotros.", "Nur in eurer Villa immer noch kein Strom? Bitte melde dich bei uns."),
    keywords: ["stroom", "power", "outage", "storing", "elektriciteit", "electricity", "donker", "stoppenkast", "fuse", "electricidad", "luz", "corte de luz", "apagón", "fusible", "cuadro eléctrico", "strom", "stromausfall", "sicherung", "sicherungskasten"],
  },
  {
    id: "no-water",
    icon: "droplets",
    title: l("Geen water", "No water", "No hay agua", "Kein Wasser"),
    steps: [
      todo("WAT TE CONTROLEREN BIJ GEEN WATER (HOOFDKRAAN, POMP, TANK)", "WHAT TO CHECK WHEN THERE'S NO WATER (MAIN VALVE, PUMP, TANK)", "QUÉ REVISAR SI NO HAY AGUA (LLAVE DE PASO, BOMBA, DEPÓSITO)", "WAS BEI KEINEM WASSER ZU PRÜFEN IST (HAUPTHAHN, PUMPE, TANK)"),
    ],
    escalate: l("Lukt het niet? Laat het ons meteen weten.", "No luck? Let us know right away.", "¿No lo consigues? Avísanos enseguida.", "Klappt es nicht? Sag uns sofort Bescheid."),
    keywords: ["water", "geen water", "no water", "kraan", "tap", "douche", "shower", "pomp", "pump", "agua", "sin agua", "grifo", "ducha", "bomba", "wasser", "kein wasser", "wasserhahn", "dusche", "pumpe"],
  },
  {
    id: "wifi-down",
    icon: "wifi",
    title: l("Wifi werkt niet", "WiFi isn't working", "El wifi no funciona", "WLAN funktioniert nicht"),
    steps: [
      l("Zet de wifi op je telefoon even uit en weer aan.", "Turn WiFi on your phone off and on again.", "Apaga y vuelve a encender el wifi de tu teléfono.", "Schalte das WLAN auf deinem Handy aus und wieder ein."),
      todo("LOCATIE ROUTER EN HOE HERSTARTEN", "ROUTER LOCATION AND HOW TO RESTART IT", "UBICACIÓN DEL ROUTER Y CÓMO REINICIARLO", "STANDORT DES ROUTERS UND WIE MAN IHN NEU STARTET"),
      l("Wacht na een herstart ongeveer 5 minuten.", "After a restart, wait about 5 minutes.", "Después de reiniciar, espera unos 5 minutos.", "Warte nach einem Neustart etwa 5 Minuten."),
    ],
    escalate: l("Nog steeds geen verbinding? Stuur ons een bericht.", "Still no connection? Send us a message.", "¿Sigues sin conexión? Envíanos un mensaje.", "Immer noch keine Verbindung? Schick uns eine Nachricht."),
    keywords: ["wifi", "internet", "router", "verbinding", "connection", "netwerk", "network", "conexión", "red", "verbindung", "netzwerk", "wlan"],
  },
  {
    id: "airco-down",
    icon: "thermometer",
    title: l("Airco werkt niet", "Air conditioning isn't working", "El aire acondicionado no funciona", "Klimaanlage funktioniert nicht"),
    steps: [
      l("Controleer of de afstandsbediening op ‘koelen’ staat en de batterijen werken.", "Check the remote is set to ‘cool’ and the batteries work.", "Comprueba que el mando está en ‘frío’ y que las pilas funcionan.", "Prüfe, ob die Fernbedienung auf ‚Kühlen‘ steht und die Batterien funktionieren."),
      l("Zijn ramen en deuren dicht?", "Are windows and doors closed?", "¿Están cerradas las ventanas y las puertas?", "Sind Fenster und Türen geschlossen?"),
      todo("OVERIGE AIRCO-CONTROLES (BIJV. SCHAKELAAR, RESET)", "OTHER AIR CONDITIONING CHECKS (E.G. SWITCH, RESET)", "OTRAS COMPROBACIONES DEL AIRE ACONDICIONADO (P. EJ. INTERRUPTOR, REINICIO)", "WEITERE KONTROLLEN KLIMAANLAGE (Z. B. SCHALTER, RESET)"),
    ],
    escalate: l("Werkt hij nog steeds niet? Laat het ons weten, dan komen we langs.", "Still not working? Let us know and we'll come by.", "¿Sigue sin funcionar? Avísanos y pasamos a verlo.", "Funktioniert sie immer noch nicht? Sag Bescheid, dann kommen wir vorbei."),
    keywords: ["airco", "ac", "air conditioning", "koeling", "warm", "hot", "aire acondicionado", "aire", "calor", "klimaanlage", "klima", "heiß"],
  },
  {
    id: "lost-key",
    icon: "key",
    title: l("Sleutel kwijt / buitengesloten", "Lost key / locked out", "Llave perdida / te has quedado fuera", "Schlüssel verloren / ausgesperrt"),
    steps: [todo("WAT TE DOEN BIJ SLEUTEL KWIJT (RESERVESLEUTEL, CODE)", "WHAT TO DO WHEN KEYS ARE LOST (SPARE KEY, CODE)", "QUÉ HACER SI PIERDES LAS LLAVES (LLAVE DE REPUESTO, CÓDIGO)", "WAS TUN BEI VERLORENEN SCHLÜSSELN (ERSATZSCHLÜSSEL, CODE)")],
    escalate: l("Neem direct contact met ons op.", "Contact us straight away.", "Contacta con nosotros de inmediato.", "Melde dich sofort bei uns."),
    keywords: ["sleutel", "key", "kwijt", "lost", "buitengesloten", "locked out", "llave", "perdida", "me he quedado fuera", "schlüssel", "verloren", "ausgesperrt"],
  },
  {
    id: "damage",
    icon: "wrench",
    title: l("Iets kapot / schade", "Something broken / damage", "Algo roto / daños", "Etwas kaputt / Schaden"),
    steps: [
      l("Geen zorgen — het kan gebeuren. Maak een foto.", "No worries — it happens. Take a photo.", "No te preocupes, puede pasar. Haz una foto.", "Keine Sorge – das kann passieren. Mach ein Foto."),
      l("Stuur de foto met een korte uitleg via WhatsApp.", "Send the photo with a short note via WhatsApp.", "Envía la foto con una breve explicación por WhatsApp.", "Schick das Foto mit einer kurzen Erklärung per WhatsApp."),
    ],
    keywords: ["kapot", "broken", "schade", "damage", "stuk", "defect", "lekkage", "leak", "roto", "daños", "fuga", "kaputt", "schaden", "leck"],
  },
  {
    id: "medical",
    icon: "heart-pulse",
    title: l("Medisch probleem", "Medical issue", "Problema médico", "Medizinisches Problem"),
    urgent: true,
    steps: [
      l("Levensbedreigend? Bel direct het alarmnummer.", "Life-threatening? Call the emergency number immediately.", "¿Peligro de muerte? Llama inmediatamente al número de emergencia.", "Lebensbedrohlich? Ruf sofort den Notruf an."),
      l("Niet spoedeisend: bel de huisarts of ga naar het ziekenhuis (zie noodnummers).", "Not urgent: call a doctor or go to the hospital (see emergency numbers).", "Si no es urgente: llama a un médico o ve al hospital (ver números de emergencia).", "Nicht dringend: Ruf einen Arzt an oder fahr ins Krankenhaus (siehe Notrufnummern)."),
      todo("LOCATIE EHBO-DOOS IN DE VILLA", "LOCATION OF THE FIRST AID KIT IN THE VILLA", "UBICACIÓN DEL BOTIQUÍN EN LA VILLA", "ORT DES ERSTE-HILFE-KASTENS IN DER VILLA"),
    ],
    escalate: l("Laat het ons ook even weten, dan helpen we waar we kunnen.", "Let us know as well, we'll help wherever we can.", "Avísanos también; te ayudaremos en todo lo que podamos.", "Sag uns auch Bescheid, wir helfen, wo wir können."),
    keywords: ["medisch", "medical", "dokter", "doctor", "arts", "ziekenhuis", "hospital", "ehbo", "first aid", "ziek", "sick", "médico", "primeros auxilios", "botiquín", "enfermo", "medizinisch", "arzt", "krankenhaus", "erste hilfe", "krank"],
  },
  {
    id: "emergency",
    icon: "siren",
    title: l("Spoed", "Emergency", "Emergencia", "Notfall"),
    urgent: true,
    steps: [
      l("Bel het alarmnummer bij direct gevaar.", "Call the emergency number if there is immediate danger.", "Llama al número de emergencia si hay peligro inmediato.", "Ruf bei akuter Gefahr den Notruf an."),
      l("Geef het adres van de villa door (zie Aankomst → Adres).", "Give the villa's address (see Arrival → Address).", "Indica la dirección de la villa (ver Llegada → Dirección).", "Nenne die Adresse der Villa (siehe Ankunft → Adresse)."),
      l("Informeer daarna de beheerder.", "Then inform the host.", "Después avisa al anfitrión.", "Informiere danach den Gastgeber."),
    ],
    keywords: ["spoed", "emergency", "nood", "112", "911", "brand", "fire", "politie", "police", "ambulance", "sos", "emergencia", "urgencias", "fuego", "bomberos", "policía", "ambulancia", "notfall", "notruf", "feuer", "feuerwehr", "polizei", "krankenwagen", "rettungsdienst"],
  },
];
