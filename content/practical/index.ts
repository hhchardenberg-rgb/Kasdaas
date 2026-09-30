import { l, todo } from "../_helpers";
import type { PracticalTopic } from "@/lib/types";

/**
 * ─────────────────────────────────────────────────────────────────────────────
 *  GOOD TO KNOW ON BONAIRE — general island information.
 *  General facts are kept deliberately broad; verify before going live and
 *  add villa-specific details where marked.
 * ─────────────────────────────────────────────────────────────────────────────
 */
export const practical: PracticalTopic[] = [
  {
    id: "groceries",
    icon: "shopping-bag",
    title: l("Boodschappen", "Groceries", "Supermercados"),
    body: [
      l("Er zijn verschillende grote supermarkten rond Kralendijk. Vers product wordt vaak op vaste dagen aangevoerd — ga vroeg voor de beste keuze.", "There are several large supermarkets around Kralendijk. Fresh produce often arrives on set days — go early for the best choice.", "Hay varios supermercados grandes en los alrededores de Kralendijk. Los productos frescos suelen llegar en días fijos: ve temprano para tener más donde elegir."),
      todo("DICHTSTBIJZIJNDE SUPERMARKT VANAF KAS DAAS", "NEAREST SUPERMARKET FROM KAS DAAS", "SUPERMERCADO MÁS CERCANO A KAS DAAS"),
    ],
    placeIds: ["van-den-tweel", "warehouse"],
    keywords: ["boodschappen", "groceries", "supermarkt", "supermarket", "winkel", "eten kopen", "compra", "comestibles", "supermercado"],
  },
  {
    id: "fuel",
    icon: "fuel",
    title: l("Tanken", "Fuel", "Combustible"),
    body: [
      l("Tankstations vind je vooral rond Kralendijk. Tank vol voordat je naar het noorden of Washington Slagbaai gaat.", "Gas stations are mainly around Kralendijk. Fill up before heading north or to Washington Slagbaai.", "Las gasolineras están sobre todo alrededor de Kralendijk. Llena el depósito antes de ir al norte o a Washington Slagbaai."),
      todo("DICHTSTBIJZIJNDE TANKSTATION / BETAALWIJZE", "NEAREST GAS STATION / PAYMENT METHOD", "GASOLINERA MÁS CERCANA / FORMA DE PAGO"),
    ],
    placeIds: ["gas-station-placeholder"],
    keywords: ["tanken", "fuel", "benzine", "petrol", "gas", "tankstation", "gasolina"],
  },
  {
    id: "pharmacy",
    icon: "pill",
    title: l("Apotheek", "Pharmacy", "Farmacia"),
    body: [todo("APOTHEEK IN DE BUURT EN OPENINGSTIJDEN", "NEARBY PHARMACY AND OPENING HOURS", "FARMACIA CERCANA Y HORARIO")],
    placeIds: ["pharmacy-placeholder"],
    keywords: ["apotheek", "pharmacy", "medicijnen", "medicine", "drogist", "farmacia", "medicamentos"],
  },
  {
    id: "medical",
    icon: "heart-pulse",
    title: l("Medische hulp", "Medical help", "Ayuda médica"),
    body: [
      l("Bij spoed: bel het alarmnummer. Het ziekenhuis van Bonaire ligt in Kralendijk.", "In an emergency: call the emergency number. Bonaire's hospital is in Kralendijk.", "En caso de emergencia: llama al número de emergencia. El hospital de Bonaire está en Kralendijk."),
      todo("HUISARTS / DOKTERSPOST VOOR TOERISTEN", "GP / DOCTOR'S SERVICE FOR VISITORS", "MÉDICO DE CABECERA / SERVICIO MÉDICO PARA VISITANTES"),
    ],
    placeIds: ["hospital"],
    keywords: ["dokter", "doctor", "huisarts", "ziekenhuis", "hospital", "medisch", "medical", "ehbo", "médico"],
  },
  {
    id: "money",
    icon: "banknote",
    title: l("Geld & pinnen", "Money & cards", "Dinero y tarjetas"),
    body: [
      l("Op Bonaire betaal je met Amerikaanse dollars. Pinnen en creditcards worden op de meeste plekken geaccepteerd; houd wat contant geld bij de hand voor kleine stalletjes.", "Bonaire uses the US dollar. Debit and credit cards are accepted in most places; keep some cash for small stalls.", "En Bonaire se usa el dólar estadounidense. Las tarjetas de débito y crédito se aceptan en casi todas partes; lleva algo de efectivo para los puestos pequeños."),
      todo("DICHTSTBIJZIJNDE GELDAUTOMAAT", "NEAREST ATM", "CAJERO AUTOMÁTICO MÁS CERCANO"),
    ],
    keywords: ["geld", "money", "pinnen", "atm", "dollar", "usd", "creditcard", "credit card", "cash", "contant", "fooi", "tip", "dinero", "tarjeta de crédito", "efectivo", "propina"],
  },
  {
    id: "traffic",
    icon: "car",
    title: l("Verkeer & parkeren", "Driving & parking", "Conducir y aparcar"),
    body: [
      l("Je rijdt rechts. Let op geiten en ezels op de weg, zeker in de schemering. Rotondes zijn gebruikelijk.", "Drive on the right. Watch out for goats and donkeys on the road, especially at dusk. Roundabouts are common.", "Se conduce por la derecha. Cuidado con las cabras y los burros en la carretera, sobre todo al anochecer. Hay muchas rotondas."),
      l("Parkeer bij stranden en duikstekken zonder waardevolle spullen in de auto — veel mensen laten de ramen zelfs op een kier.", "At beaches and dive sites, park without valuables in the car — many people even leave the windows slightly open.", "En playas y puntos de buceo, aparca sin objetos de valor en el coche; mucha gente incluso deja las ventanillas un poco abiertas."),
    ],
    keywords: ["verkeer", "traffic", "rijden", "driving", "parkeren", "parking", "auto", "car", "huurauto", "rental car", "tráfico", "conducir", "aparcamiento", "aparcar", "coche", "coche de alquiler"],
  },
  {
    id: "drinking-water",
    icon: "glass-water",
    title: l("Drinkwater", "Drinking water", "Agua potable"),
    body: [
      l("Op Bonaire wordt drinkwater gemaakt van zeewater.", "On Bonaire, drinking water is produced from seawater.", "En Bonaire, el agua potable se produce a partir del agua de mar."),
      l("Het kraanwater in Kas Daas kun je gewoon drinken.", "The tap water at Kas Daas is fine to drink.", "El agua del grifo de Kas Daas se puede beber sin problema."),
    ],
    keywords: ["drinkwater", "drinking water", "kraanwater", "tap water", "water", "agua potable", "agua del grifo", "agua"],
  },
  {
    id: "sun",
    icon: "sun",
    title: l("Zon", "Sun", "Sol"),
    body: [
      l("Dicht bij de evenaar is de zon veel sterker dan je denkt, ook als het waait of bewolkt is. Smeer vaak, draag een pet en drink veel water.", "Close to the equator the sun is much stronger than you think, even when it's windy or cloudy. Reapply often, wear a cap and drink plenty of water.", "Cerca del ecuador el sol es mucho más fuerte de lo que crees, incluso con viento o nubes. Vuelve a ponerte crema a menudo, lleva gorra y bebe mucha agua."),
      l("Gebruik rifvriendelijke zonnebrand om het koraal te beschermen.", "Use reef-safe sunscreen to protect the coral.", "Usa protector solar respetuoso con los arrecifes para proteger el coral."),
    ],
    keywords: ["zon", "sun", "zonnebrand", "sunscreen", "verbranden", "sunburn", "hitte", "heat", "sol", "protector solar", "crema solar", "quemadura", "calor"],
  },
  {
    id: "mosquitoes",
    icon: "bug",
    title: l("Muggen", "Mosquitoes", "Mosquitos"),
    body: [l("Gebruik anti-muggenmiddel, vooral rond zonsopkomst en -ondergang en na een regenbui.", "Use insect repellent, especially around sunrise, sunset and after a rain shower.", "Usa repelente de insectos, sobre todo al amanecer, al atardecer y después de un chaparrón.")],
    keywords: ["muggen", "mosquito", "mosquitoes", "insecten", "deet", "mosquitos"],
  },
  {
    id: "internet",
    icon: "smartphone",
    title: l("Internet & roaming", "Internet & roaming", "Internet y roaming"),
    body: [
      l("Bonaire valt buiten de Europese roamingregels. Controleer je bundel of koop een lokale of eSIM-databundel.", "Bonaire falls outside EU roaming rules. Check your plan or get a local or eSIM data bundle.", "Bonaire queda fuera de las normas de roaming de la UE. Revisa tu tarifa o consigue un paquete de datos local o una eSIM."),
      l("Deze gids werkt ook offline zodra je hem één keer hebt geopend.", "This guide also works offline once you've opened it.", "Esta guía también funciona sin conexión una vez que la has abierto."),
    ],
    keywords: ["internet", "roaming", "data", "simkaart", "sim", "esim", "4g", "5g", "bereik", "signal", "cobertura"],
  },
  {
    id: "time",
    icon: "clock",
    title: l("Tijdzone", "Time zone", "Zona horaria"),
    body: [l("Bonaire gebruikt Atlantic Standard Time (UTC−4), zonder zomertijd.", "Bonaire uses Atlantic Standard Time (UTC−4), with no daylight saving.", "Bonaire usa la hora estándar del Atlántico (UTC−4), sin horario de verano.")],
    keywords: ["tijd", "time", "tijdzone", "timezone", "tijdsverschil", "time difference", "hora", "zona horaria", "diferencia horaria"],
  },
  {
    id: "electricity",
    icon: "plug",
    title: l("Elektriciteit", "Electricity", "Electricidad"),
    body: [todo("SPANNING EN STEKKERTYPE IN DE VILLA / ADAPTERS", "VOLTAGE AND PLUG TYPE IN THE VILLA / ADAPTERS", "VOLTAJE Y TIPO DE ENCHUFE EN LA VILLA / ADAPTADORES")],
    keywords: ["stroom", "electricity", "stekker", "plug", "adapter", "voltage", "opladen", "electricidad", "enchufe", "adaptador"],
  },
  {
    id: "waste",
    icon: "trash",
    title: l("Afval", "Waste", "Basura"),
    body: [
      l("Afval is een uitdaging op een klein eiland. Neem op stranden alles weer mee en gebruik zo min mogelijk plastic.", "Waste is a challenge on a small island. Take everything back from the beach and use as little plastic as possible.", "La basura es un reto en una isla pequeña. Llévate todo de vuelta de la playa y usa el menor plástico posible."),
      l("In Kas Daas gaat je afval in de afvalbak rechtsvoor de woning.", "At Kas Daas, rubbish goes in the bin at the front right of the house.", "En Kas Daas, la basura va al contenedor situado delante, a la derecha de la casa."),
    ],
    keywords: ["afval", "waste", "trash", "recycling", "plastic", "basura", "reciclaje"],
  },
  {
    id: "customs",
    icon: "hand",
    title: l("Lokale gebruiken", "Local customs", "Costumbres locales"),
    body: [
      l("‘Bon dia’ (goedemorgen), ‘bon tardi’ (goedemiddag) en ‘danki’ (dank je) worden erg gewaardeerd. De officiële taal is Nederlands, in het dagelijks leven hoor je vooral Papiamentu — en bijna iedereen spreekt Engels en Spaans.", "‘Bon dia’ (good morning), ‘bon tardi’ (good afternoon) and ‘danki’ (thank you) are much appreciated. Dutch is the official language, Papiamentu is what you'll hear day to day — and nearly everyone speaks English and Spanish.", "‘Bon dia’ (buenos días), ‘bon tardi’ (buenas tardes) y ‘danki’ (gracias) se agradecen mucho. El neerlandés es el idioma oficial, el papiamento es lo que oirás a diario, y casi todo el mundo habla inglés y español."),
      l("Alles gaat op z'n Bonairiaans: rustig aan. Geniet ervan.", "Everything happens at island pace: slowly. Enjoy it.", "Todo va a ritmo isleño: despacio. Disfrútalo."),
    ],
    keywords: ["papiamentu", "taal", "language", "bon dia", "danki", "cultuur", "culture", "gebruiken", "customs", "idioma", "cultura", "costumbres"],
  },
  {
    id: "nature",
    icon: "leaf",
    title: l("Natuur beschermen", "Protecting nature", "Proteger la naturaleza"),
    body: [
      l("Het rif rond Bonaire is beschermd natuurgebied. Raak koraal niet aan, sta er niet op en voer geen vissen.", "The reef around Bonaire is a protected marine park. Don't touch or stand on coral and don't feed the fish.", "El arrecife de Bonaire es un parque marino protegido. No toques ni pises el coral y no des de comer a los peces."),
      l("Duikers en snorkelaars betalen een natuurbijdrage (nature fee). Regel die vóór je het water in gaat.", "Divers and snorkelers pay a nature fee. Arrange it before you go in the water.", "Buceadores y aficionados al snorkel pagan una tasa de naturaleza. Resuélvelo antes de meterte en el agua."),
    ],
    keywords: ["natuur", "nature", "koraal", "coral", "rif", "reef", "nature fee", "natuurbijdrage", "stinapa", "marine park", "naturaleza", "arrecife", "parque marino"],
  },
];
