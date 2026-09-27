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
    title: l("Boodschappen", "Groceries"),
    body: [
      l("Er zijn verschillende grote supermarkten rond Kralendijk. Vers product wordt vaak op vaste dagen aangevoerd — ga vroeg voor de beste keuze.", "There are several large supermarkets around Kralendijk. Fresh produce often arrives on set days — go early for the best choice."),
      todo("DICHTSTBIJZIJNDE SUPERMARKT VANAF KAS DAAS", "NEAREST SUPERMARKET FROM KAS DAAS"),
    ],
    placeIds: ["van-den-tweel", "warehouse"],
    keywords: ["boodschappen", "groceries", "supermarkt", "supermarket", "winkel", "eten kopen"],
  },
  {
    id: "fuel",
    icon: "fuel",
    title: l("Tanken", "Fuel"),
    body: [
      l("Tankstations vind je vooral rond Kralendijk. Tank vol voordat je naar het noorden of Washington Slagbaai gaat.", "Gas stations are mainly around Kralendijk. Fill up before heading north or to Washington Slagbaai."),
      todo("DICHTSTBIJZIJNDE TANKSTATION / BETAALWIJZE", "NEAREST GAS STATION / PAYMENT METHOD"),
    ],
    placeIds: ["gas-station-placeholder"],
    keywords: ["tanken", "fuel", "benzine", "petrol", "gas", "tankstation"],
  },
  {
    id: "pharmacy",
    icon: "pill",
    title: l("Apotheek", "Pharmacy"),
    body: [todo("APOTHEEK IN DE BUURT EN OPENINGSTIJDEN", "NEARBY PHARMACY AND OPENING HOURS")],
    placeIds: ["pharmacy-placeholder"],
    keywords: ["apotheek", "pharmacy", "medicijnen", "medicine", "drogist"],
  },
  {
    id: "medical",
    icon: "heart-pulse",
    title: l("Medische hulp", "Medical help"),
    body: [
      l("Bij spoed: bel het alarmnummer. Het ziekenhuis van Bonaire ligt in Kralendijk.", "In an emergency: call the emergency number. Bonaire's hospital is in Kralendijk."),
      todo("HUISARTS / DOKTERSPOST VOOR TOERISTEN", "GP / DOCTOR'S SERVICE FOR VISITORS"),
    ],
    placeIds: ["hospital"],
    keywords: ["dokter", "doctor", "huisarts", "ziekenhuis", "hospital", "medisch", "medical", "ehbo"],
  },
  {
    id: "money",
    icon: "banknote",
    title: l("Geld & pinnen", "Money & cards"),
    body: [
      l("Op Bonaire betaal je met Amerikaanse dollars. Pinnen en creditcards worden op de meeste plekken geaccepteerd; houd wat contant geld bij de hand voor kleine stalletjes.", "Bonaire uses the US dollar. Debit and credit cards are accepted in most places; keep some cash for small stalls."),
      todo("DICHTSTBIJZIJNDE GELDAUTOMAAT", "NEAREST ATM"),
    ],
    keywords: ["geld", "money", "pinnen", "atm", "dollar", "usd", "creditcard", "credit card", "cash", "contant", "fooi", "tip"],
  },
  {
    id: "traffic",
    icon: "car",
    title: l("Verkeer & parkeren", "Driving & parking"),
    body: [
      l("Je rijdt rechts. Let op geiten en ezels op de weg, zeker in de schemering. Rotondes zijn gebruikelijk.", "Drive on the right. Watch out for goats and donkeys on the road, especially at dusk. Roundabouts are common."),
      l("Parkeer bij stranden en duikstekken zonder waardevolle spullen in de auto — veel mensen laten de ramen zelfs op een kier.", "At beaches and dive sites, park without valuables in the car — many people even leave the windows slightly open."),
    ],
    keywords: ["verkeer", "traffic", "rijden", "driving", "parkeren", "parking", "auto", "car", "huurauto", "rental car"],
  },
  {
    id: "drinking-water",
    icon: "glass-water",
    title: l("Drinkwater", "Drinking water"),
    body: [
      l("Op Bonaire wordt drinkwater gemaakt van zeewater.", "On Bonaire, drinking water is produced from seawater."),
      l("Het kraanwater in Kas Daas kun je gewoon drinken.", "The tap water at Kas Daas is fine to drink."),
    ],
    keywords: ["drinkwater", "drinking water", "kraanwater", "tap water", "water"],
  },
  {
    id: "sun",
    icon: "sun",
    title: l("Zon", "Sun"),
    body: [
      l("Dicht bij de evenaar is de zon veel sterker dan je denkt, ook als het waait of bewolkt is. Smeer vaak, draag een pet en drink veel water.", "Close to the equator the sun is much stronger than you think, even when it's windy or cloudy. Reapply often, wear a cap and drink plenty of water."),
      l("Gebruik rifvriendelijke zonnebrand om het koraal te beschermen.", "Use reef-safe sunscreen to protect the coral."),
    ],
    keywords: ["zon", "sun", "zonnebrand", "sunscreen", "verbranden", "sunburn", "hitte", "heat"],
  },
  {
    id: "mosquitoes",
    icon: "bug",
    title: l("Muggen", "Mosquitoes"),
    body: [l("Gebruik anti-muggenmiddel, vooral rond zonsopkomst en -ondergang en na een regenbui.", "Use insect repellent, especially around sunrise, sunset and after a rain shower.")],
    keywords: ["muggen", "mosquito", "mosquitoes", "insecten", "deet"],
  },
  {
    id: "internet",
    icon: "smartphone",
    title: l("Internet & roaming", "Internet & roaming"),
    body: [
      l("Bonaire valt buiten de Europese roamingregels. Controleer je bundel of koop een lokale of eSIM-databundel.", "Bonaire falls outside EU roaming rules. Check your plan or get a local or eSIM data bundle."),
      l("Deze gids werkt ook offline zodra je hem één keer hebt geopend.", "This guide also works offline once you've opened it."),
    ],
    keywords: ["internet", "roaming", "data", "simkaart", "sim", "esim", "4g", "5g", "bereik", "signal"],
  },
  {
    id: "time",
    icon: "clock",
    title: l("Tijdzone", "Time zone"),
    body: [l("Bonaire gebruikt Atlantic Standard Time (UTC−4), zonder zomertijd.", "Bonaire uses Atlantic Standard Time (UTC−4), with no daylight saving.")],
    keywords: ["tijd", "time", "tijdzone", "timezone", "tijdsverschil", "time difference"],
  },
  {
    id: "electricity",
    icon: "plug",
    title: l("Elektriciteit", "Electricity"),
    body: [todo("SPANNING EN STEKKERTYPE IN DE VILLA / ADAPTERS", "VOLTAGE AND PLUG TYPE IN THE VILLA / ADAPTERS")],
    keywords: ["stroom", "electricity", "stekker", "plug", "adapter", "voltage", "opladen"],
  },
  {
    id: "waste",
    icon: "trash",
    title: l("Afval", "Waste"),
    body: [
      l("Afval is een uitdaging op een klein eiland. Neem op stranden alles weer mee en gebruik zo min mogelijk plastic.", "Waste is a challenge on a small island. Take everything back from the beach and use as little plastic as possible."),
      l("In Kas Daas gaat je afval in de afvalbak rechtsvoor de woning.", "At Kas Daas, rubbish goes in the bin at the front right of the house."),
    ],
    keywords: ["afval", "waste", "trash", "recycling", "plastic"],
  },
  {
    id: "customs",
    icon: "hand",
    title: l("Lokale gebruiken", "Local customs"),
    body: [
      l("‘Bon dia’ (goedemorgen), ‘bon tardi’ (goedemiddag) en ‘danki’ (dank je) worden erg gewaardeerd. De officiële taal is Nederlands, in het dagelijks leven hoor je vooral Papiamentu — en bijna iedereen spreekt Engels en Spaans.", "‘Bon dia’ (good morning), ‘bon tardi’ (good afternoon) and ‘danki’ (thank you) are much appreciated. Dutch is the official language, Papiamentu is what you'll hear day to day — and nearly everyone speaks English and Spanish."),
      l("Alles gaat op z'n Bonairiaans: rustig aan. Geniet ervan.", "Everything happens at island pace: slowly. Enjoy it."),
    ],
    keywords: ["papiamentu", "taal", "language", "bon dia", "danki", "cultuur", "culture", "gebruiken", "customs"],
  },
  {
    id: "nature",
    icon: "leaf",
    title: l("Natuur beschermen", "Protecting nature"),
    body: [
      l("Het rif rond Bonaire is beschermd natuurgebied. Raak koraal niet aan, sta er niet op en voer geen vissen.", "The reef around Bonaire is a protected marine park. Don't touch or stand on coral and don't feed the fish."),
      l("Duikers en snorkelaars betalen een natuurbijdrage (nature fee). Regel die vóór je het water in gaat.", "Divers and snorkelers pay a nature fee. Arrange it before you go in the water."),
    ],
    keywords: ["natuur", "nature", "koraal", "coral", "rif", "reef", "nature fee", "natuurbijdrage", "stinapa", "marine park"],
  },
];
