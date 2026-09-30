import { l } from "../_helpers";
import type { Itinerary, PlanStep } from "@/lib/types";
import { photos } from "../images";

/**
 * ─────────────────────────────────────────────────────────────────────────────
 *  DAY PLANS — curated inspiration with a timeline.
 *  ⚠️ DEMO CONTENT: times are suggestions, places refer to /content/places.
 *  `placeId` links a step to a place card (optional).
 * ─────────────────────────────────────────────────────────────────────────────
 */

const s = (time: string, nl: string, en: string, es: string, de: string, extra: Partial<PlanStep> = {}): PlanStep => ({
  time,
  title: l(nl, en, es, de),
  ...extra,
});
const note = (nl: string, en: string, es: string, de: string) => ({ text: l(nl, en, es, de) });

export const itineraries: Itinerary[] = [
  {
    id: "first-day",
    demo: true,
    art: "villa",
    image: photos.villaFromSea,
    title: l("De perfecte eerste dag", "The perfect first day", "El primer día perfecto", "Der perfekte erste Tag"),
    subtitle: l("Rustig landen, boodschappen en je eerste zonsondergang.", "Land gently, stock up and catch your first sunset.", "Aterriza con calma, haz la compra y disfruta de tu primer atardecer.", "Sanft ankommen, Vorräte einkaufen und den ersten Sonnenuntergang erleben."),
    length: l("1 dag", "1 day", "1 día", "1 Tag"),
    days: [
      {
        steps: [
          s("08:30", "Ontbijt op het terras", "Breakfast on the terrace", "Desayuno en la terraza", "Frühstück auf der Terrasse", { icon: "coffee", ...note("Neem de tijd. Je bent op Bonaire.", "Take your time. You're on Bonaire.", "Tómate tu tiempo. Estás en Bonaire.", "Lass dir Zeit. Du bist auf Bonaire.") }),
          s("10:00", "Boodschappen doen", "Grocery run", "Hacer la compra", "Einkaufen", { icon: "shopping-bag", placeId: "van-den-tweel" }),
          s("11:30", "Eerste snorkel bij Andrea", "First snorkel at Andrea", "Primer snorkel en Andrea", "Erstes Schnorcheln bei Andrea", { icon: "fish", placeId: "andrea" }),
          s("13:00", "Lunch in Kralendijk", "Lunch in Kralendijk", "Almuerzo en Kralendijk", "Mittagessen in Kralendijk", { icon: "utensils", placeId: "between-2-buns" }),
          s("14:30", "Siësta bij de villa", "Siesta at the villa", "Siesta en la villa", "Siesta in der Villa", { icon: "sun", ...note("Afspoelen onder de buitendouche en even niks.", "Rinse off under the outdoor shower and do nothing for a while.", "Date una ducha en la ducha exterior y no hagas nada durante un rato.", "Spül dich unter der Außendusche ab und tu eine Weile nichts.") }),
          s("17:45", "Zonsondergang", "Sunset", "Atardecer", "Sonnenuntergang", { icon: "sunset", placeId: "karels-beach-bar" }),
          s("19:30", "Diner aan het water", "Dinner by the water", "Cena junto al agua", "Abendessen am Wasser", { icon: "utensils", placeId: "it-rains-fishes" }),
        ],
      },
    ],
  },
  {
    id: "south",
    demo: true,
    art: "salt",
    image: photos.saltPans,
    title: l("Dagje zuiden", "A day in the south", "Un día en el sur", "Ein Tag im Süden"),
    subtitle: l("Roze zoutpannen, lege stranden en de vuurtoren.", "Pink salt pans, empty beaches and the lighthouse.", "Salinas rosas, playas vacías y el faro.", "Rosa Salinen, leere Strände und der Leuchtturm."),
    length: l("1 dag", "1 day", "1 día", "1 Tag"),
    days: [
      {
        steps: [
          s("09:00", "Snorkelen bij Salt Pier", "Snorkel at Salt Pier", "Snorkel en Salt Pier", "Schnorcheln am Salt Pier", { icon: "fish", placeId: "salt-pier" }),
          s("11:00", "Pink Beach", "Pink Beach", "Pink Beach", "Pink Beach", { icon: "umbrella", placeId: "pink-beach" }),
          s("13:00", "Slavenhuisjes & zoutpannen", "Slave huts & salt pans", "Cabañas de esclavos y salinas", "Sklavenhütten & Salinen", { icon: "camera", placeId: "salt-pans-slave-huts" }),
          s("14:30", "Vuurtoren Willemstoren", "Willemstoren Lighthouse", "Faro de Willemstoren", "Leuchtturm Willemstoren", { icon: "navigation", placeId: "willemstoren" }),
          s("15:30", "Late lunch in Lac Bay", "Late lunch at Lac Bay", "Almuerzo tardío en Lac Bay", "Spätes Mittagessen an der Lac Bay", { icon: "utensils", placeId: "jibe-city" }),
          s("18:00", "Terug naar Kas Daas", "Back to Kas Daas", "De vuelta a Kas Daas", "Zurück zum Kas Daas", { icon: "home" }),
        ],
      },
    ],
  },
  {
    id: "washington-slagbaai",
    demo: true,
    art: "nature",
    image: photos.flamingos,
    title: l("Dagje Washington Slagbaai", "A day in Washington Slagbaai", "Un día en Washington Slagbaai", "Ein Tag im Washington Slagbaai"),
    subtitle: l("Het wilde noorden: cactussen, kliffen en verlaten baaien.", "The wild north: cacti, cliffs and deserted bays.", "El norte salvaje: cactus, acantilados y calas desiertas.", "Der wilde Norden: Kakteen, Klippen und einsame Buchten."),
    length: l("1 dag", "1 day", "1 día", "1 Tag"),
    days: [
      {
        steps: [
          s("07:30", "Vroeg vertrekken, volle tank", "Leave early, full tank", "Sal temprano, con el depósito lleno", "Früh los, voller Tank", { icon: "car", ...note("Neem veel water en lunch mee.", "Bring plenty of water and lunch.", "Lleva mucha agua y comida.", "Nimm genug Wasser und Mittagessen mit.") }),
          s("08:30", "Flamingo's bij Gotomeer", "Flamingos at Gotomeer", "Flamencos en Gotomeer", "Flamingos am Gotomeer", { icon: "binoculars", placeId: "flamingos" }),
          s("09:30", "Het park in", "Into the park", "Entrada al parque", "Rein in den Park", { icon: "mountain", placeId: "washington-slagbaai" }),
          s("12:30", "Picknick & snorkelen in een baai", "Picnic & snorkel in a bay", "Pícnic y snorkel en una cala", "Picknick & Schnorcheln in einer Bucht", { icon: "fish" }),
          s("15:00", "Via Rincon terug", "Back via Rincon", "Vuelta por Rincon", "Zurück über Rincon", { icon: "route", placeId: "rincon" }),
          s("17:30", "Afspoelen & relaxen", "Rinse off & relax", "Ducha y relax", "Abduschen & entspannen", { icon: "shower-head" }),
        ],
      },
    ],
  },
  {
    id: "snorkel-day",
    demo: true,
    art: "reef",
    title: l("Snorkeldag", "Snorkel day", "Día de snorkel", "Schnorcheltag"),
    subtitle: l("Van rif naar rif langs de westkust.", "From reef to reef along the west coast.", "De arrecife en arrecife por la costa oeste.", "Von Riff zu Riff entlang der Westküste."),
    length: l("1 dag", "1 day", "1 día", "1 Tag"),
    days: [
      {
        steps: [
          s("08:30", "Ontbijt & spullen checken", "Breakfast & gear check", "Desayuno y revisión del equipo", "Frühstück & Ausrüstungscheck", { icon: "coffee" }),
          s("09:30", "1000 Steps", "1000 Steps", "1000 Steps", "1000 Steps", { icon: "fish", placeId: "1000-steps" }),
          s("12:00", "Lunch", "Lunch", "Almuerzo", "Mittagessen", { icon: "utensils" }),
          s("14:00", "Klein Bonaire", "Klein Bonaire", "Klein Bonaire", "Klein Bonaire", { icon: "sailboat", placeId: "klein-bonaire" }),
          s("17:45", "Sunset drink", "Sunset drink", "Copa al atardecer", "Drink zum Sonnenuntergang", { icon: "sunset", placeId: "karels-beach-bar" }),
        ],
      },
    ],
  },
  {
    id: "relax-day",
    demo: true,
    art: "pool",
    image: photos.pool,
    title: l("Relaxdag", "Slow day", "Día tranquilo", "Ruhiger Tag"),
    subtitle: l("De villa als je eigen resort.", "The villa as your private resort.", "La villa como tu resort privado.", "Die Villa als dein privates Resort."),
    length: l("1 dag", "1 day", "1 día", "1 Tag"),
    days: [
      {
        steps: [
          s("09:30", "Uitslapen & lang ontbijt", "Sleep in & long breakfast", "Dormir hasta tarde y desayuno largo", "Ausschlafen & langes Frühstück", { icon: "coffee" }),
          s("11:00", "Lezen op het terras", "Read on the terrace", "Leer en la terraza", "Lesen auf der Terrasse", { icon: "armchair" }),
          s("13:00", "Lunch thuis", "Lunch at home", "Almuerzo en casa", "Mittagessen zu Hause", { icon: "utensils" }),
          s("15:00", "Middag bij Ocean Oasis", "Afternoon at Ocean Oasis", "Tarde en Ocean Oasis", "Nachmittag im Ocean Oasis", { icon: "waves", placeId: "ocean-oasis" }),
          s("18:00", "Borrel bij de villa", "Drinks at the villa", "Copas en la villa", "Drinks in der Villa", { icon: "wine" }),
          s("19:30", "Afhalen & buiten eten", "Takeaway & dinner outside", "Comida para llevar y cena fuera", "Takeaway & Abendessen draußen", { icon: "utensils", placeId: "bobbejans" }),
        ],
      },
    ],
  },
  {
    id: "foodie-day",
    demo: true,
    art: "food",
    title: l("Foodie day", "Foodie day", "Día gastronómico", "Genießertag"),
    subtitle: l("Van koffie tot cocktails — Bonaire proeven.", "From coffee to cocktails — a taste of Bonaire.", "Del café a los cócteles: un bocado de Bonaire.", "Vom Kaffee bis zum Cocktail – ein Vorgeschmack auf Bonaire."),
    length: l("1 dag", "1 day", "1 día", "1 Tag"),
    days: [
      {
        steps: [
          s("09:00", "Koffie & ontbijt", "Coffee & breakfast", "Café y desayuno", "Kaffee & Frühstück", { icon: "coffee", placeId: "coffee-placeholder" }),
          s("12:30", "Lunch aan het strand", "Beach lunch", "Almuerzo en la playa", "Mittagessen am Strand", { icon: "utensils", placeId: "jibe-city" }),
          s("15:30", "IJsje in Kralendijk", "Gelato in Kralendijk", "Helado en Kralendijk", "Gelato in Kralendijk", { icon: "ice-cream", placeId: "gelato" }),
          s("17:30", "Lokaal biertje", "Local beer", "Cerveza local", "Lokales Bier", { icon: "wine", placeId: "la-cantina" }),
          s("19:30", "Diner bij Brass Boer", "Dinner at Brass Boer", "Cena en Brass Boer", "Abendessen im Brass Boer", { icon: "utensils", placeId: "brass-boer" }),
          s("21:30", "Cocktail", "Cocktail", "Cóctel", "Cocktail", { icon: "wine", placeId: "cuba-compagnie" }),
        ],
      },
    ],
  },
  {
    id: "active-day",
    demo: true,
    art: "wind",
    image: photos.kitesurf,
    title: l("Actieve dag", "Active day", "Día activo", "Aktiver Tag"),
    subtitle: l("Wind, water en trails.", "Wind, water and trails.", "Viento, agua y senderos.", "Wind, Wasser und Wanderwege."),
    length: l("1 dag", "1 day", "1 día", "1 Tag"),
    days: [
      {
        steps: [
          s("06:30", "Wandelen of mountainbiken", "Hike or mountain bike", "Senderismo o bicicleta de montaña", "Wandern oder Mountainbiken", { icon: "bike", placeId: "hiking-biking" }),
          s("09:00", "Ontbijt", "Breakfast", "Desayuno", "Frühstück", { icon: "coffee" }),
          s("10:30", "Kajakken in de mangroves", "Mangrove kayaking", "Kayak por los manglares", "Kajakfahren in den Mangroven", { icon: "sailboat", placeId: "mangroves" }),
          s("13:00", "Lunch in Lac Bay", "Lunch at Lac Bay", "Almuerzo en Lac Bay", "Mittagessen an der Lac Bay", { icon: "utensils", placeId: "jibe-city" }),
          s("14:30", "Windsurfles", "Windsurf lesson", "Clase de windsurf", "Windsurfstunde", { icon: "wind", placeId: "windsurfing" }),
          s("19:30", "Welverdiend diner", "Well-earned dinner", "Una cena bien merecida", "Wohlverdientes Abendessen", { icon: "utensils", placeId: "la-cantina" }),
        ],
      },
    ],
  },
  {
    id: "romantic-day",
    demo: true,
    art: "sunset",
    image: photos.deckSunset,
    title: l("Romantische dag", "Romantic day", "Día romántico", "Romantischer Tag"),
    subtitle: l("Met z'n tweeën, zonder haast.", "Just the two of you, no rush.", "Solo vosotros dos, sin prisas.", "Nur ihr zwei, ohne Eile."),
    length: l("1 dag", "1 day", "1 día", "1 Tag"),
    days: [
      {
        steps: [
          s("09:00", "Ontbijt op bed", "Breakfast in bed", "Desayuno en la cama", "Frühstück im Bett", { icon: "coffee" }),
          s("10:30", "Klein Bonaire", "Klein Bonaire", "Klein Bonaire", "Klein Bonaire", { icon: "sailboat", placeId: "klein-bonaire" }),
          s("15:00", "Siësta", "Siesta", "Siesta", "Siesta", { icon: "bed" }),
          s("17:30", "Zonsondergang op Seru Largu", "Sunset at Seru Largu", "Atardecer en Seru Largu", "Sonnenuntergang am Seru Largu", { icon: "sunset", placeId: "seru-largu" }),
          s("19:30", "Diner bij Brass Boer", "Dinner at Brass Boer", "Cena en Brass Boer", "Abendessen im Brass Boer", { icon: "utensils", placeId: "brass-boer" }),
        ],
      },
    ],
  },
  {
    id: "three-days",
    demo: true,
    art: "sea",
    image: photos.aerialCoast,
    title: l("Bonaire in 3 dagen", "Bonaire in 3 days", "Bonaire en 3 días", "Bonaire in 3 Tagen"),
    subtitle: l("Het beste van het eiland in een lang weekend.", "The best of the island in a long weekend.", "Lo mejor de la isla en un fin de semana largo.", "Das Beste der Insel an einem langen Wochenende."),
    length: l("3 dagen", "3 days", "3 días", "3 Tage"),
    days: [
      { title: l("Dag 1 — Aankomen", "Day 1 — Arrive", "Día 1 — Llegada", "Tag 1 – Ankommen"), steps: [
        s("10:00", "Boodschappen", "Groceries", "Supermercados", "Einkaufen", { icon: "shopping-bag", placeId: "van-den-tweel" }),
        s("14:00", "Eerste snorkel", "First snorkel", "Primer snorkel", "Erstes Schnorcheln", { icon: "fish", placeId: "andrea" }),
        s("17:45", "Zonsondergang", "Sunset", "Atardecer", "Sonnenuntergang", { icon: "sunset", placeId: "karels-beach-bar" }),
      ] },
      { title: l("Dag 2 — Onder water", "Day 2 — Underwater", "Día 2 — Bajo el agua", "Tag 2 – Unter Wasser"), steps: [
        s("09:00", "1000 Steps", "1000 Steps", "1000 Steps", "1000 Steps", { icon: "fish", placeId: "1000-steps" }),
        s("13:00", "Klein Bonaire", "Klein Bonaire", "Klein Bonaire", "Klein Bonaire", { icon: "sailboat", placeId: "klein-bonaire" }),
        s("19:30", "Diner", "Dinner", "Cena", "Abendessen", { icon: "utensils", placeId: "it-rains-fishes" }),
      ] },
      { title: l("Dag 3 — Het zuiden", "Day 3 — The south", "Día 3 — El sur", "Tag 3 – Der Süden"), steps: [
        s("09:00", "Zoutpannen & slavenhuisjes", "Salt pans & slave huts", "Salinas y cabañas de esclavos", "Salinen & Sklavenhütten", { icon: "camera", placeId: "salt-pans-slave-huts" }),
        s("12:30", "Lunch in Lac Bay", "Lunch at Lac Bay", "Almuerzo en Lac Bay", "Mittagessen an der Lac Bay", { icon: "utensils", placeId: "jibe-city" }),
        s("15:00", "Sorobon", "Sorobon", "Sorobon", "Sorobon", { icon: "waves", placeId: "sorobon" }),
      ] },
    ],
  },
  {
    id: "five-days",
    demo: true,
    art: "reef",
    title: l("Bonaire in 5 dagen", "Bonaire in 5 days", "Bonaire en 5 días", "Bonaire in 5 Tagen"),
    subtitle: l("Ruimte voor natuur, zee en niksen.", "Room for nature, sea and doing nothing.", "Tiempo para la naturaleza, el mar y no hacer nada.", "Zeit für Natur, Meer und Nichtstun."),
    length: l("5 dagen", "5 days", "5 días", "5 Tage"),
    days: [
      { title: l("Dag 1 — Landen", "Day 1 — Land", "Día 1 — Aterrizar", "Tag 1 – Landen"), steps: [
        s("10:00", "Boodschappen", "Groceries", "Supermercados", "Einkaufen", { icon: "shopping-bag", placeId: "warehouse" }),
        s("17:45", "Zonsondergang", "Sunset", "Atardecer", "Sonnenuntergang", { icon: "sunset", placeId: "te-amo-beach" }),
      ] },
      { title: l("Dag 2 — Snorkelen", "Day 2 — Snorkel", "Día 2 — Snorkel", "Tag 2 – Schnorcheln"), steps: [
        s("09:00", "1000 Steps", "1000 Steps", "1000 Steps", "1000 Steps", { icon: "fish", placeId: "1000-steps" }),
        s("14:00", "Andrea I & II", "Andrea I & II", "Andrea I y II", "Andrea I & II", { icon: "fish", placeId: "andrea" }),
      ] },
      { title: l("Dag 3 — Het wilde noorden", "Day 3 — The wild north", "Día 3 — El norte salvaje", "Tag 3 – Der wilde Norden"), steps: [
        s("08:00", "Washington Slagbaai", "Washington Slagbaai", "Washington Slagbaai", "Washington Slagbaai", { icon: "mountain", placeId: "washington-slagbaai" }),
        s("15:00", "Rincon", "Rincon", "Rincon", "Rincon", { icon: "route", placeId: "rincon" }),
      ] },
      { title: l("Dag 4 — Zuiden & Lac Bay", "Day 4 — South & Lac Bay", "Día 4 — El sur y Lac Bay", "Tag 4 – Süden & Lac Bay"), steps: [
        s("09:00", "Zoutpannen", "Salt pans", "Salinas", "Salinen", { icon: "camera", placeId: "salt-pans-slave-huts" }),
        s("12:00", "Mangroves", "Mangroves", "Manglares", "Mangroven", { icon: "sailboat", placeId: "mangroves" }),
        s("15:00", "Sorobon", "Sorobon", "Sorobon", "Sorobon", { icon: "waves", placeId: "sorobon" }),
      ] },
      { title: l("Dag 5 — Klein Bonaire", "Day 5 — Klein Bonaire", "Día 5 — Klein Bonaire", "Tag 5 – Klein Bonaire"), steps: [
        s("09:30", "Klein Bonaire", "Klein Bonaire", "Klein Bonaire", "Klein Bonaire", { icon: "sailboat", placeId: "klein-bonaire" }),
        s("19:30", "Afscheidsdiner", "Farewell dinner", "Cena de despedida", "Abschiedsessen", { icon: "utensils", placeId: "it-rains-fishes" }),
      ] },
    ],
  },
  {
    id: "seven-days",
    demo: true,
    art: "sunset",
    image: photos.sunsetGarden,
    title: l("Bonaire in 7 dagen", "Bonaire in 7 days", "Bonaire en 7 días", "Bonaire in 7 Tagen"),
    subtitle: l("Een volle week: alles zien, en toch uitrusten.", "A full week: see it all, and still rest.", "Una semana entera: verlo todo y aun así descansar.", "Eine ganze Woche: alles sehen und trotzdem ausruhen."),
    length: l("7 dagen", "7 days", "7 días", "7 Tage"),
    days: [
      { title: l("Dag 1 — Aankomen", "Day 1 — Arrive", "Día 1 — Llegada", "Tag 1 – Ankommen"), steps: [
        s("10:00", "Boodschappen", "Groceries", "Supermercados", "Einkaufen", { icon: "shopping-bag", placeId: "van-den-tweel" }),
        s("17:45", "Zonsondergang", "Sunset", "Atardecer", "Sonnenuntergang", { icon: "sunset", placeId: "karels-beach-bar" }),
      ] },
      { title: l("Dag 2 — Westkust", "Day 2 — West coast", "Día 2 — Costa oeste", "Tag 2 – Westküste"), steps: [
        s("09:00", "1000 Steps", "1000 Steps", "1000 Steps", "1000 Steps", { icon: "fish", placeId: "1000-steps" }),
        s("19:30", "Diner", "Dinner", "Cena", "Abendessen", { icon: "utensils", placeId: "ingridients" }),
      ] },
      { title: l("Dag 3 — Noorden", "Day 3 — North", "Día 3 — Norte", "Tag 3 – Norden"), steps: [
        s("08:00", "Washington Slagbaai", "Washington Slagbaai", "Washington Slagbaai", "Washington Slagbaai", { icon: "mountain", placeId: "washington-slagbaai" }),
        s("15:00", "Flamingo's", "Flamingos", "Flamencos", "Flamingos", { icon: "binoculars", placeId: "flamingos" }),
      ] },
      { title: l("Dag 4 — Relax", "Day 4 — Relax", "Día 4 — Relax", "Tag 4 – Entspannen"), steps: [
        s("10:00", "Villa-dag", "Villa day", "Día en la villa", "Villa-Tag", { icon: "sun" }),
        s("18:00", "Seru Largu", "Seru Largu", "Seru Largu", "Seru Largu", { icon: "sunset", placeId: "seru-largu" }),
      ] },
      { title: l("Dag 5 — Het zuiden", "Day 5 — The south", "Día 5 — El sur", "Tag 5 – Der Süden"), steps: [
        s("09:00", "Zoutpannen & slavenhuisjes", "Salt pans & slave huts", "Salinas y cabañas de esclavos", "Salinen & Sklavenhütten", { icon: "camera", placeId: "salt-pans-slave-huts" }),
        s("12:00", "Pink Beach", "Pink Beach", "Pink Beach", "Pink Beach", { icon: "umbrella", placeId: "pink-beach" }),
      ] },
      { title: l("Dag 6 — Op het water", "Day 6 — On the water", "Día 6 — En el agua", "Tag 6 – Auf dem Wasser"), steps: [
        s("09:00", "Een dag met de boot", "A day on the boat", "Un día en barco", "Ein Tag auf dem Boot", { icon: "ship", ...note("Vraag naar de boot van Kas Daas.", "Ask about the Kas Daas boat.", "Pregunta por el barco de Kas Daas.", "Frag nach dem Kas-Daas-Boot.") }),
        s("13:00", "Klein Bonaire", "Klein Bonaire", "Klein Bonaire", "Klein Bonaire", { icon: "sailboat", placeId: "klein-bonaire" }),
      ] },
      { title: l("Dag 7 — Lac Bay", "Day 7 — Lac Bay", "Día 7 — Lac Bay", "Tag 7 – Lac Bay"), steps: [
        s("10:00", "Mangroves", "Mangroves", "Manglares", "Mangroven", { icon: "sailboat", placeId: "mangroves" }),
        s("13:00", "Lunch & windsurfers kijken", "Lunch & windsurfer watching", "Almuerzo mirando a los windsurfistas", "Mittagessen & Windsurfer beobachten", { icon: "utensils", placeId: "jibe-city" }),
        s("19:30", "Afscheidsdiner", "Farewell dinner", "Cena de despedida", "Abschiedsessen", { icon: "utensils", placeId: "rum-runners" }),
      ] },
    ],
  },
];
