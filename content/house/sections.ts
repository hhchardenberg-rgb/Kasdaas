import { l, todo } from "../_helpers";
import type { HouseSection } from "@/lib/types";
import { photos } from "../images";

/**
 * ─────────────────────────────────────────────────────────────────────────────
 *  VILLA GUIDE
 *  Each section becomes a page under /villa/<id>. Each topic becomes an
 *  expandable card. Add, remove or reorder topics freely — no code changes
 *  needed. Text written as todo("…") still has to be provided by the owner.
 *
 *  Rule of thumb: only describe what is actually true for Kas Daas.
 *  Topics marked `confirmPresence: true` should be removed if the facility
 *  does not exist.
 * ─────────────────────────────────────────────────────────────────────────────
 */

export const arrival: HouseSection = {
  id: "arrival",
  icon: "key",
  art: "villa",
  image: photos.exterior,
  eyebrow: l("Aankomst", "Arrival"),
  title: l("Welkom thuis", "Welcome home"),
  intro: l(
    "Alles voor een ontspannen aankomst: de route, parkeren en hoe je binnenkomt.",
    "Everything for a relaxed arrival: the route, parking and how to get in.",
  ),
  topics: [
    {
      id: "address",
      icon: "map-pin",
      title: l("Adres", "Address"),
      summary: todo("ADRES KAS DAAS", "KAS DAAS ADDRESS"),
      body: [
        l("Belnem, Kralendijk — direct aan zee.", "Belnem, Kralendijk — right on the sea."),
        l("GPS: 12.1198683, -68.2914733", "GPS: 12.1198683, -68.2914733"),
      ],
      keywords: ["adres", "address", "locatie", "location", "waar"],
    },
    {
      id: "route",
      icon: "route",
      title: l("Route naar Kas Daas", "Getting to Kas Daas"),
      body: [
        todo("ROUTEBESCHRIJVING VANAF HET VLIEGVELD", "DIRECTIONS FROM THE AIRPORT"),
        todo("HERKENNINGSPUNTEN ONDERWEG / LAATSTE AFSLAG", "LANDMARKS ON THE WAY / FINAL TURN"),
      ],
      tips: [
        l(
          "Gebruik de knop ‘Route’ hieronder om de navigatie op je telefoon te openen.",
          "Use the ‘Directions’ button below to open navigation on your phone.",
        ),
      ],
      keywords: ["route", "directions", "navigatie", "vliegveld", "airport", "rijden"],
    },
    {
      id: "parking",
      icon: "car",
      image: photos.parking,
      title: l("Parkeren", "Parking"),
      body: [todo("WAAR PARKEREN BIJ DE VILLA / AANTAL PLEKKEN", "WHERE TO PARK AT THE VILLA / NUMBER OF SPOTS")],
      keywords: ["parkeren", "parking", "auto", "car"],
    },
    {
      id: "check-in",
      icon: "clock",
      title: l("Check-in", "Check-in"),
      summary: l("Inchecken vanaf 16:00 — daarna is de villa helemaal van jou.", "Check in from 4:00 pm — from then on, the villa is all yours."),
      body: [
        l("Je kunt inchecken vanaf 16:00 uur.", "You can check in from 4:00 pm."),
        todo("WERKWIJZE CHECK-IN (ZELF INCHECKEN / ONTVANGST)", "CHECK-IN PROCEDURE (SELF CHECK-IN / WELCOME)"),
        todo("VROEGER AANKOMEN: MOGELIJKHEDEN", "ARRIVING EARLY: OPTIONS"),
      ],
      keywords: ["check-in", "checkin", "inchecken", "aankomst", "arrival", "tijd"],
    },
    {
      id: "access",
      icon: "key",
      title: l("Sleutel & toegang", "Keys & access"),
      body: [todo("HOE KOM JE BINNEN (SLEUTELKLUIS, CODE, OVERHANDIGING)", "HOW TO GET IN (KEY BOX, CODE, HANDOVER)")],
      steps: [
        todo("STAP 1 TOEGANG", "ACCESS STEP 1"),
        todo("STAP 2 TOEGANG", "ACCESS STEP 2"),
      ],
      tips: [
        l(
          "Deel toegangscodes niet met anderen en sluit de villa af als je weggaat.",
          "Please don't share access codes and lock the villa whenever you leave.",
        ),
      ],
      keywords: ["sleutel", "key", "code", "toegang", "access", "deur", "door", "slot", "lock"],
    },
    {
      id: "first-arrival",
      icon: "sparkles",
      title: l("De eerste momenten", "Your first moments"),
      body: [
        l(
          "Zet je tassen neer, open de deuren naar buiten en kom even aan. Een paar dingen die handig zijn om meteen te doen:",
          "Drop your bags, open the doors to the outside and take a moment to arrive. A few things worth doing straight away:",
        ),
      ],
      steps: [
        l("Verbind met de wifi (zie WiFi).", "Connect to the WiFi (see WiFi)."),
        l("Zet de airco aan in de slaapkamers die je gebruikt.", "Switch on the air conditioning in the bedrooms you'll use."),
        l("Zet deze gids op je beginscherm — dan heb je alles altijd bij de hand.", "Add this guide to your home screen — so everything is always at hand."),
        todo("OVERIGE AANDACHTSPUNTEN BIJ AANKOMST (BIJV. WELKOMSTPAKKET)", "OTHER ARRIVAL NOTES (E.G. WELCOME PACK)"),
      ],
      keywords: ["aankomst", "arrival", "eerste", "first", "welkom", "welcome"],
    },
    {
      id: "contact-person",
      icon: "user",
      title: l("Jouw contactpersoon", "Your contact person"),
      body: [
        l(
          "Dennis is de house manager van Kas Daas. Heb je een vraag, gaat er iets mis of kun je hulp gebruiken? Bel of app hem gerust.",
          "Dennis is the house manager of Kas Daas. Got a question, something not working, or need a hand? Feel free to call or message him.",
        ),
        todo("BEREIKBAARHEID CONTACTPERSOON", "AVAILABILITY OF CONTACT PERSON"),
      ],
      keywords: ["contact", "beheerder", "host", "manager", "house manager", "dennis", "telefoon", "phone", "whatsapp"],
    },
  ],
};

export const houseRules: HouseSection = {
  id: "house-rules",
  icon: "scroll",
  art: "villa",
  image: photos.livingLounge,
  eyebrow: l("Huisregels", "House rules"),
  title: l("Huisregels", "House rules"),
  intro: l(
    "Een paar afspraken, zodat iedereen — ook de buren — kan genieten van Kas Daas.",
    "A few agreements, so everyone — the neighbours included — can enjoy Kas Daas.",
  ),
  topics: [
    {
      id: "check-in-out-times",
      icon: "clock",
      title: l("Check-in & check-out", "Check-in & check-out"),
      summary: l("Inchecken vanaf 16:00 · uitchecken tot 10:00", "Check in from 4:00 pm · check out by 10:00 am"),
      body: [
        l("Je kunt inchecken vanaf 16:00 uur en uitchecken tot 10:00 uur.", "You can check in from 4:00 pm and check out until 10:00 am."),
      ],
      keywords: ["check-in", "check-out", "inchecken", "uitchecken", "tijd", "time", "16:00", "10:00", "huisregels", "house rules"],
    },
    {
      id: "minimum-age",
      icon: "id-card",
      title: l("Minimumleeftijd", "Minimum age"),
      summary: l("De hoofdhuurder is minimaal 21 jaar", "The main renter must be at least 21"),
      body: [l("De minimumleeftijd om Kas Daas te huren is 21 jaar.", "The minimum age to rent Kas Daas is 21.")],
      keywords: ["leeftijd", "age", "21", "minimumleeftijd", "minimum age", "huren", "rent"],
    },
    {
      id: "children",
      icon: "baby",
      title: l("Kinderen", "Children"),
      summary: l("Kinderen van 0–17 jaar zijn welkom", "Children aged 0–17 are welcome"),
      body: [l("Kinderen van 0 tot en met 17 jaar zijn welkom.", "Children aged 0 to 17 are welcome.")],
      tips: [
        l(
          "Houd jonge kinderen altijd in het oog: de villa heeft steile trappen en er is geen hek rond het zwembad en langs de zeekant.",
          "Always keep an eye on young children: the villa has steep stairs and there is no fence around the pool or along the sea edge.",
        ),
      ],
      keywords: ["kinderen", "children", "kids", "baby", "gezin", "family"],
    },
    {
      id: "pets",
      icon: "dog",
      title: l("Huisdieren", "Pets"),
      summary: l("Eén hond tot 10 kg is welkom", "One dog under 10 kg is welcome"),
      body: [
        l(
          "Honden die minder dan 10 kg wegen zijn toegestaan, met een maximum van één huisdier. Andere huisdieren zijn niet toegestaan.",
          "Dogs weighing less than 10 kg are allowed, with a maximum of one pet. Other pets are not allowed.",
        ),
      ],
      keywords: ["huisdier", "huisdieren", "pet", "pets", "hond", "dog", "kat", "cat"],
    },
    {
      id: "events",
      icon: "party",
      title: l("Evenementen & feesten", "Events & parties"),
      summary: l("Geen evenementen toegestaan", "No events allowed"),
      body: [l("Evenementen en feesten zijn in Kas Daas niet toegestaan.", "Events and parties are not allowed at Kas Daas.")],
      keywords: ["evenement", "evenementen", "event", "events", "feest", "party", "feestje", "bruiloft", "wedding"],
    },
    {
      id: "smoking",
      icon: "no-smoking",
      title: l("Roken", "Smoking"),
      summary: l("Roken is niet toegestaan", "Smoking is not allowed"),
      body: [l("Roken is niet toegestaan.", "Smoking is not allowed.")],
      tips: [l("Rook nooit in de slaapkamers!", "Never smoke in the bedrooms!")],
      keywords: ["roken", "smoking", "smoke", "sigaret", "cigarette", "vapen", "vape"],
    },
  ],
};

export const villa: HouseSection = {
  id: "your-villa",
  icon: "home",
  art: "interior",
  image: photos.livingOcean,
  eyebrow: l("Jouw villa", "Your villa"),
  title: l("Over Kas Daas", "About Kas Daas"),
  intro: l(
    "Ruimte, licht en rust. Hier vind je hoe de villa in elkaar zit en wat je waar vindt.",
    "Space, light and calm. Here's how the villa is laid out and where to find things.",
  ),
  topics: [
    {
      id: "welcome",
      icon: "home",
      title: l("Welkom in Kas Daas", "Welcome to Kas Daas"),
      feature: true,
      art: "villa",
      image: photos.villaFromSea,
      // Based on the owner's Vrbo listing — adjust freely.
      summary: l("Direct aan zee, in Belnem · 3 slaapkamers · tot 7 gasten", "Right on the sea, in Belnem · 3 bedrooms · up to 7 guests"),
      body: [
        l(
          "Kas Daas ligt direct aan de oceaan in Belnem, in het zuiden van Kralendijk. De villa is ontworpen door de Nederlandse ontwerper Piet Boon: natuurlijke materialen, ruime terrassen, een eigen zwembad en een prachtige Viking-keuken.",
          "Kas Daas sits right on the ocean in Belnem, in the south of Kralendijk. The villa was designed by Dutch designer Piet Boon: natural materials, generous terraces, a private pool and a beautiful Viking kitchen.",
        ),
        l(
          "De passaatwind waait uit het oosten dwars door het huis, de zee ligt aan je voeten en het rif begint vlak voor de deur — ideaal voor duikers en snorkelaars.",
          "The trade wind blows from the east right through the house, the sea is at your feet and the reef starts just off the property — ideal for divers and snorkelers.",
        ),
        todo("PERSOONLIJKE WELKOMSTWOORDEN VAN DE EIGENAAR (OPTIONEEL)", "PERSONAL WELCOME FROM THE OWNER (OPTIONAL)"),
      ],
      tips: [
        l(
          "Let op met jonge kinderen: de villa heeft steile trappen en er is geen hek rond het zwembad en langs de zeekant.",
          "Please take care with young children: the villa has steep stairs and there is no fence around the pool or along the sea edge.",
        ),
      ],
      keywords: ["villa", "kas daas", "over", "about"],
    },
    {
      id: "living",
      icon: "sofa",
      image: photos.livingDining,
      title: l("Woonkamer", "Living room"),
      body: [todo("OMSCHRIJVING WOONKAMER EN BIJZONDERHEDEN", "DESCRIPTION OF THE LIVING ROOM AND DETAILS")],
      keywords: ["woonkamer", "living", "lounge", "bank", "sofa"],
    },
    {
      id: "kitchen",
      icon: "chef-hat",
      image: photos.kitchenBar,
      title: l("Keuken", "Kitchen"),
      body: [
        todo("OMSCHRIJVING KEUKEN: WAT IS AANWEZIG, WAAR STAAT WAT", "KITCHEN DESCRIPTION: WHAT'S THERE, WHERE THINGS ARE"),
      ],
      tips: [l("Uitleg per apparaat vind je onder Comfort & apparatuur.", "Instructions per appliance are under Comfort & appliances.")],
      keywords: ["keuken", "kitchen", "koken", "cooking", "servies", "pannen"],
    },
    {
      id: "bedrooms",
      icon: "bed",
      image: photos.bedroomOcean,
      title: l("Slaapkamers", "Bedrooms"),
      body: [
        l("Kas Daas heeft 3 slaapkamers en biedt plaats aan maximaal 7 gasten.", "Kas Daas has 3 bedrooms and sleeps up to 7 guests."),
        todo("BEDDEN PER SLAAPKAMER EN BIJZONDERHEDEN (KLAMBOES, KLEDINGKAST)", "BEDS PER BEDROOM AND DETAILS (MOSQUITO NETS, WARDROBE)"),
      ],
      keywords: ["slaapkamer", "bedroom", "bed", "slapen", "sleep", "kussen", "pillow"],
    },
    {
      id: "bathrooms",
      icon: "bath",
      image: photos.bathroom,
      title: l("Badkamers", "Bathrooms"),
      body: [todo("BADKAMERS, HANDDOEKEN EN TOILETARTIKELEN", "BATHROOMS, TOWELS AND TOILETRIES")],
      keywords: ["badkamer", "bathroom", "douche", "shower", "toilet", "handdoek", "towel"],
    },
    {
      id: "linen",
      icon: "shirt",
      image: photos.linen,
      title: l("Handdoeken & beddengoed", "Towels & linen"),
      body: [todo("HANDDOEKEN, STRANDLAKENS EN BEDDENGOED: WAAR EN HOE WISSELEN", "TOWELS, BEACH TOWELS AND LINEN: WHERE AND HOW TO SWAP")],
      keywords: ["handdoek", "towel", "strandlaken", "beach towel", "beddengoed", "linen", "lakens"],
    },
  ],
};

export const comfort: HouseSection = {
  id: "comfort",
  icon: "wind",
  art: "interior",
  image: photos.kitchen,
  eyebrow: l("Comfort", "Comfort"),
  title: l("Comfort & apparatuur", "Comfort & appliances"),
  intro: l(
    "Hoe alles werkt — van airco tot koffiemachine. Kort en duidelijk.",
    "How everything works — from air conditioning to the coffee machine. Short and clear.",
  ),
  topics: [
    {
      id: "airco",
      icon: "thermometer",
      title: l("Airconditioning", "Air conditioning"),
      body: [todo("UITLEG AIRCO: AFSTANDSBEDIENING, STANDEN, IDEALE TEMPERATUUR", "AIR CONDITIONING: REMOTE, MODES, IDEAL TEMPERATURE")],
      steps: [todo("STAP 1 AIRCO AANZETTEN", "STEP 1 TURN ON AIR CONDITIONING"), todo("STAP 2 TEMPERATUUR INSTELLEN", "STEP 2 SET TEMPERATURE")],
      tips: [
        l(
          "Houd ramen en deuren dicht als de airco aan staat — dan koelt de kamer sneller en blijven muggen buiten.",
          "Keep windows and doors closed while the air conditioning is on — the room cools faster and mosquitoes stay out.",
        ),
      ],
      keywords: ["airco", "airconditioning", "air conditioning", "ac", "a/c", "koeling", "cooling", "temperatuur", "warm", "hot"],
    },
    {
      id: "fans",
      icon: "fan",
      title: l("Ventilatoren", "Fans"),
      body: [todo("WAAR ZITTEN VENTILATOREN EN HOE BEDIEN JE ZE", "WHERE ARE THE FANS AND HOW TO USE THEM")],
      keywords: ["ventilator", "fan", "plafond", "ceiling"],
    },
    {
      id: "hot-water",
      icon: "droplets",
      title: l("Warm water", "Hot water"),
      body: [todo("HOE WERKT WARM WATER (BOILER / ZONNEBOILER / DOORSTROOM)", "HOW HOT WATER WORKS (BOILER / SOLAR / TANKLESS)")],
      keywords: ["warm water", "hot water", "boiler", "douche", "shower"],
    },
    {
      id: "lighting",
      icon: "lightbulb",
      title: l("Verlichting", "Lighting"),
      body: [todo("SCHAKELAARS, DIMMERS EN BUITENVERLICHTING", "SWITCHES, DIMMERS AND OUTDOOR LIGHTING")],
      keywords: ["licht", "light", "lamp", "verlichting", "lighting", "schakelaar", "switch"],
    },
    {
      id: "sockets",
      icon: "plug",
      title: l("Stopcontacten & stroom", "Sockets & power"),
      body: [todo("STEKKERTYPE, SPANNING EN WAAR ADAPTERS LIGGEN", "PLUG TYPE, VOLTAGE AND WHERE ADAPTERS ARE")],
      keywords: ["stopcontact", "socket", "stekker", "plug", "adapter", "stroom", "power", "voltage", "opladen", "charge"],
    },
    {
      id: "tv",
      icon: "tv",
      title: l("Televisie", "Television"),
      body: [todo("TV: AFSTANDSBEDIENING, STREAMING-APPS, INLOGGEN", "TV: REMOTE, STREAMING APPS, LOGGING IN")],
      keywords: ["tv", "televisie", "television", "netflix", "streaming", "chromecast"],
    },
    {
      id: "audio",
      icon: "speaker",
      title: l("Muziek & audio", "Music & audio"),
      body: [todo("AUDIOSYSTEEM / BLUETOOTH SPEAKER: HOE VERBINDEN", "AUDIO SYSTEM / BLUETOOTH SPEAKER: HOW TO CONNECT")],
      keywords: ["muziek", "music", "speaker", "audio", "bluetooth", "sonos"],
    },
    {
      id: "hob",
      icon: "flame",
      image: photos.hob,
      title: l("Kookplaat", "Hob"),
      summary: l("Professioneel Viking-gasfornuis", "Professional Viking gas hob"),
      body: [todo("BEDIENING GASFORNUIS (AANSTEKEN, GASFLES, VEILIGHEID)", "HOW TO USE THE GAS HOB (LIGHTING, GAS BOTTLE, SAFETY)")],
      keywords: ["kookplaat", "hob", "stove", "inductie", "induction", "gas", "koken"],
    },
    {
      id: "oven",
      icon: "cooking-pot",
      title: l("Oven", "Oven"),
      body: [todo("BEDIENING OVEN", "HOW TO USE THE OVEN")],
      keywords: ["oven", "bakken", "bake"],
    },
    {
      id: "microwave",
      icon: "microwave",
      title: l("Magnetron", "Microwave"),
      body: [todo("BEDIENING MAGNETRON", "HOW TO USE THE MICROWAVE")],
      keywords: ["magnetron", "microwave"],
    },
    {
      id: "fridge",
      icon: "refrigerator",
      title: l("Koelkast & vriezer", "Fridge & freezer"),
      body: [todo("KOELKAST/VRIEZER: LOCATIE, IJSBLOKJES, BIJZONDERHEDEN", "FRIDGE/FREEZER: LOCATION, ICE, DETAILS")],
      keywords: ["koelkast", "fridge", "vriezer", "freezer", "ijs", "ice", "ijsblokjes"],
    },
    {
      id: "dishwasher",
      icon: "dishwasher",
      title: l("Vaatwasser", "Dishwasher"),
      body: [todo("VAATWASSER: TABLETS, PROGRAMMA, STARTEN", "DISHWASHER: TABLETS, PROGRAM, START")],
      keywords: ["vaatwasser", "dishwasher", "afwas", "vaat", "dishes"],
    },
    {
      id: "coffee",
      icon: "coffee",
      title: l("Koffiezetapparaat", "Coffee machine"),
      body: [todo("TYPE KOFFIEAPPARAAT EN HOE HET WERKT (CUPS/BONEN)", "TYPE OF COFFEE MACHINE AND HOW IT WORKS (PODS/BEANS)")],
      keywords: ["koffie", "coffee", "espresso", "nespresso", "thee", "tea", "waterkoker", "kettle"],
    },
    {
      id: "washing-machine",
      icon: "washing-machine",
      image: photos.laundry,
      title: l("Wasmachine", "Washing machine"),
      body: [todo("WASMACHINE/DROGER: LOCATIE, WASMIDDEL, PROGRAMMA", "WASHER/DRYER: LOCATION, DETERGENT, PROGRAM")],
      keywords: ["wasmachine", "washing machine", "was", "laundry", "droger", "dryer", "wasmiddel"],
    },
  ],
};

export const outdoor: HouseSection = {
  id: "outdoor-living",
  icon: "sun",
  art: "terrace",
  image: photos.poolDeck,
  eyebrow: l("Outdoor living", "Outdoor living"),
  title: l("Buiten leven", "Life outdoors"),
  intro: l(
    "Op Bonaire speelt het leven zich buiten af. Ontbijt in de ochtendzon, afspoelen na de zee, borrelen als de lucht roze kleurt.",
    "On Bonaire, life happens outside. Breakfast in the morning sun, a rinse after the sea, drinks as the sky turns pink.",
  ),
  topics: [
    {
      id: "outdoor-shower",
      icon: "shower-head",
      title: l("Buitendouche", "Outdoor shower"),
      feature: true,
      art: "shower",
      image: photos.outdoorShower,
      // Example copy — adjust freely.
      summary: l(
        "Even afspoelen na een ochtend in zee? Gebruik de buitendouche voordat je het terras of de villa weer in gaat.",
        "Back from the sea? Rinse off under the outdoor shower before heading back inside.",
      ),
      body: [
        todo("LOCATIE VAN DE BUITENDOUCHE", "LOCATION OF THE OUTDOOR SHOWER"),
        todo("BEDIENING EN WARM/KOUD WATER", "HOW IT WORKS AND HOT/COLD WATER"),
        todo("HANDDOEKEN VOOR BUITEN / PRAKTISCHE AANDACHTSPUNTEN", "OUTDOOR TOWELS / PRACTICAL NOTES"),
      ],
      tips: [
        l(
          "Spoel ook je snorkelspullen en zwemkleding even af — zout en zand blijven zo buiten.",
          "Give your snorkel gear and swimwear a quick rinse too — it keeps salt and sand outside.",
        ),
      ],
      keywords: ["buitendouche", "outdoor shower", "douche", "shower", "afspoelen", "rinse", "zout", "salt", "zand", "sand"],
    },
    {
      id: "terrace",
      icon: "armchair",
      title: l("Terras & lounge", "Terrace & lounge"),
      art: "terrace",
      image: photos.palapaLounge,
      summary: l("Loungen onder de palapa, met de zee onder je", "Lounging under the palapa, with the sea below you"),
      body: [todo("OMSCHRIJVING TERRAS, LOUNGE EN KUSSENS (BIJV. BIJ REGEN BINNENZETTEN)", "DESCRIPTION OF TERRACE, LOUNGE AND CUSHIONS (E.G. BRING IN WHEN IT RAINS)")],
      keywords: ["terras", "terrace", "lounge", "buiten", "outside", "kussens", "cushions"],
    },
    {
      id: "outdoor-dining",
      icon: "utensils",
      image: photos.balcony,
      title: l("Buiten eten", "Dining outdoors"),
      body: [todo("BUITENEETTAFEL EN BIJZONDERHEDEN", "OUTDOOR DINING TABLE AND DETAILS")],
      keywords: ["eettafel", "dining", "buiten eten", "diner"],
    },
    {
      id: "pool",
      icon: "waves",
      title: l("Zwembad", "Pool"),
      art: "pool",
      image: photos.pool,
      summary: l("Je eigen privézwembad", "Your own private pool"),
      body: [todo("ZWEMBAD: REGELS, VERLICHTING, ONDERHOUD", "POOL: RULES, LIGHTING, MAINTENANCE")],
      tips: [
        l("Er is geen hek rond het zwembad — houd kinderen altijd in het oog.", "There is no fence around the pool — always keep an eye on children."),
      ],
      keywords: ["zwembad", "pool", "zwemmen", "swim"],
    },
    {
      id: "sunbeds",
      icon: "sun",
      title: l("Ligbedden", "Sun loungers"),
      image: photos.sunLoungers,
      body: [todo("LIGBEDDEN, PARASOLS EN KUSSENS", "SUN LOUNGERS, PARASOLS AND CUSHIONS")],
      keywords: ["ligbed", "sunbed", "lounger", "parasol", "umbrella"],
    },
    {
      id: "bbq",
      icon: "flame",
      title: l("Barbecue", "Barbecue"),
      image: photos.bbqJetty,
      summary: l("Grillen op het terras boven het water", "Grilling on the deck above the water"),
      body: [todo("BBQ: BEDIENING, GAS/HOUTSKOOL, SCHOONMAKEN", "BBQ: HOW TO USE, GAS/CHARCOAL, CLEANING")],
      keywords: ["bbq", "barbecue", "grill", "buitenkeuken", "outdoor kitchen"],
    },
    {
      id: "outdoor-lighting",
      icon: "lightbulb",
      title: l("Buitenverlichting", "Outdoor lighting"),
      body: [todo("SCHAKELAARS BUITENVERLICHTING / TIMERS", "OUTDOOR LIGHT SWITCHES / TIMERS")],
      keywords: ["buitenverlichting", "outdoor lights", "licht", "light"],
    },
    {
      id: "garden",
      icon: "trees",
      title: l("Tuin", "Garden"),
      image: photos.gardenPool,
      body: [todo("TUIN: BIJZONDERHEDEN, PLANTEN, TUINMAN", "GARDEN: DETAILS, PLANTS, GARDENER")],
      keywords: ["tuin", "garden", "planten", "plants", "tuinman", "gardener"],
    },
    {
      id: "gear-drying",
      icon: "fish",
      image: photos.diveGear,
      title: l("Snorkel- & duikspullen", "Snorkel & dive gear"),
      body: [
        todo("WAAR KUN JE SPULLEN AFSPOELEN EN DROGEN (RINSE-AREA / DROOGREK)", "WHERE TO RINSE AND DRY GEAR (RINSE AREA / DRYING RACK)"),
        todo("AANWEZIGE SNORKELSETS / ZWEMVESTEN (INDIEN VAN TOEPASSING)", "SNORKEL SETS / VESTS PROVIDED (IF ANY)"),
      ],
      keywords: ["snorkel", "duik", "dive", "gear", "spullen", "drogen", "dry", "afspoelen", "rinse", "wetsuit"],
    },
  ],
};

export const island: HouseSection = {
  id: "island-living",
  icon: "leaf",
  art: "nature",
  image: photos.sunsetGarden,
  eyebrow: l("Belangrijk op Bonaire", "Good to know here"),
  title: l("Wonen op Bonaire", "Island living"),
  intro: l(
    "Bonaire is anders dan thuis — en dat is precies de charme. Een paar dingen die je verblijf in de villa nog fijner maken.",
    "Bonaire is different from home — that's exactly the charm. A few things that make your stay at the villa even better.",
  ),
  topics: [
    {
      id: "water-use",
      icon: "droplets",
      title: l("Water", "Water"),
      body: [
        l(
          "Drinkwater op Bonaire wordt gemaakt uit zeewater. Ga er dus zuinig mee om — korte douches helpen echt.",
          "Water on Bonaire is made from seawater. Please use it wisely — short showers really help.",
        ),
        todo("SPECIFIEK VOOR KAS DAAS (BIJV. WATERTANK, WATERDRUK)", "SPECIFIC TO KAS DAAS (E.G. WATER TANK, PRESSURE)"),
      ],
      keywords: ["water", "douche", "shower", "zuinig"],
    },
    {
      id: "drinking-water",
      icon: "glass-water",
      title: l("Drinkwater", "Drinking water"),
      body: [todo("KUN JE HET KRAANWATER IN KAS DAAS DRINKEN? / WATERFILTER", "CAN YOU DRINK THE TAP WATER AT KAS DAAS? / WATER FILTER")],
      keywords: ["drinkwater", "drinking water", "kraanwater", "tap water", "flessen", "bottled"],
    },
    {
      id: "electricity",
      icon: "zap",
      title: l("Elektriciteit", "Electricity"),
      body: [
        l(
          "Stroom is kostbaar op het eiland. Zet airco en lampen uit als je weggaat.",
          "Power is precious on the island. Switch off air conditioning and lights when you head out.",
        ),
        todo("BIJZONDERHEDEN STROOM IN DE VILLA (ZONNEPANELEN, STOPPENKAST)", "POWER DETAILS AT THE VILLA (SOLAR PANELS, FUSE BOX)"),
      ],
      keywords: ["stroom", "electricity", "power", "elektriciteit", "stoppenkast", "fuse"],
    },
    {
      id: "mosquitoes",
      icon: "bug",
      title: l("Muggen", "Mosquitoes"),
      body: [
        l(
          "Vooral rond zonsopkomst en -ondergang en na regen zijn er muggen. Houd deuren en ramen dicht als het licht aan is en gebruik anti-muggenmiddel.",
          "Mosquitoes are most active around sunrise, sunset and after rain. Keep doors and windows closed when the lights are on and use repellent.",
        ),
        todo("WAAR LIGGEN ANTI-MUGGENMIDDELEN / HORREN", "WHERE TO FIND MOSQUITO REPELLENT / SCREENS"),
      ],
      keywords: ["muggen", "mosquito", "mosquitoes", "insecten", "insects", "deet", "bite"],
    },
    {
      id: "doors-windows",
      icon: "door-open",
      title: l("Deuren & ramen", "Doors & windows"),
      body: [todo("DEUREN/RAMEN: SLUITEN BIJ VERTREK, SCHUIFPUIEN, HORREN", "DOORS/WINDOWS: CLOSING WHEN LEAVING, SLIDING DOORS, SCREENS")],
      keywords: ["deur", "door", "raam", "window", "schuifpui", "sliding", "slot", "lock"],
    },
    {
      id: "wind",
      icon: "wind",
      title: l("Wind", "Wind"),
      body: [
        l(
          "De passaatwind waait bijna altijd en brengt heerlijke verkoeling. Het betekent ook: laat geen losse spullen buiten slingeren.",
          "The trade wind blows almost constantly and brings lovely cooling. It also means: don't leave loose items lying around outside.",
        ),
        todo("SPECIFIEK VOOR KAS DAAS (BIJV. PARASOLS DICHT, DEUREN VASTZETTEN)", "SPECIFIC TO KAS DAAS (E.G. CLOSE PARASOLS, SECURE DOORS)"),
      ],
      keywords: ["wind", "passaat", "trade wind", "parasol"],
    },
    {
      id: "wildlife",
      icon: "bug",
      title: l("Dieren & insecten", "Animals & insects"),
      body: [
        l(
          "Hagedissen, leguanen, geiten en ezels horen bij het eiland. Voer ze niet en laat geen eten buiten staan.",
          "Lizards, iguanas, goats and donkeys are part of island life. Please don't feed them and don't leave food outside.",
        ),
        todo("SPECIFIEK VOOR KAS DAAS", "SPECIFIC TO KAS DAAS"),
      ],
      keywords: ["dieren", "animals", "leguaan", "iguana", "hagedis", "lizard", "geit", "goat", "ezel", "donkey", "insect"],
    },
    {
      id: "safety",
      icon: "shield",
      title: l("Veiligheid", "Safety"),
      body: [
        l(
          "Bonaire is ontspannen, maar laat geen waardevolle spullen zichtbaar in de auto liggen — ook niet bij stranden en duikstekken.",
          "Bonaire is relaxed, but don't leave valuables visible in the car — including at beaches and dive sites.",
        ),
        l(
          "Kas Daas is niet geschikt voor jonge kinderen zonder toezicht: steile trappen, geen hek rond het zwembad en een open zeekant.",
          "Kas Daas is not suitable for young children without supervision: steep stairs, no fence around the pool and an open sea edge.",
        ),
        todo("KLUIS, ALARM, AFSLUITEN VILLA", "SAFE, ALARM, LOCKING UP THE VILLA"),
      ],
      keywords: ["veiligheid", "safety", "kluis", "safe", "alarm", "diefstal", "theft", "auto", "car"],
    },
    {
      id: "waste",
      icon: "trash",
      title: l("Afval", "Waste"),
      body: [todo("WAAR MOET HET AFVAL HEEN, OPHAALDAGEN, SCHEIDEN", "WHERE DOES THE WASTE GO, COLLECTION DAYS, SEPARATION")],
      keywords: ["afval", "waste", "trash", "garbage", "vuilnis", "container", "kliko", "bin", "recycling"],
    },
  ],
};

/** All villa guide sections, in display order. */
export const houseSections: HouseSection[] = [arrival, houseRules, villa, outdoor, comfort, island];
