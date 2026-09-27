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

const s = (time: string, nl: string, en: string, extra: Partial<PlanStep> = {}): PlanStep => ({
  time,
  title: l(nl, en),
  ...extra,
});
const note = (nl: string, en: string) => ({ text: l(nl, en) });

export const itineraries: Itinerary[] = [
  {
    id: "first-day",
    demo: true,
    art: "villa",
    image: photos.villaFromSea,
    title: l("De perfecte eerste dag", "The perfect first day"),
    subtitle: l("Rustig landen, boodschappen en je eerste zonsondergang.", "Land gently, stock up and catch your first sunset."),
    length: l("1 dag", "1 day"),
    days: [
      {
        steps: [
          s("08:30", "Ontbijt op het terras", "Breakfast on the terrace", { icon: "coffee", ...note("Neem de tijd. Je bent op Bonaire.", "Take your time. You're on Bonaire.") }),
          s("10:00", "Boodschappen doen", "Grocery run", { icon: "shopping-bag", placeId: "van-den-tweel" }),
          s("11:30", "Eerste snorkel bij Andrea", "First snorkel at Andrea", { icon: "fish", placeId: "andrea" }),
          s("13:00", "Lunch in Kralendijk", "Lunch in Kralendijk", { icon: "utensils", placeId: "between-2-buns" }),
          s("14:30", "Siësta bij de villa", "Siesta at the villa", { icon: "sun", ...note("Afspoelen onder de buitendouche en even niks.", "Rinse off under the outdoor shower and do nothing for a while.") }),
          s("17:45", "Zonsondergang", "Sunset", { icon: "sunset", placeId: "karels-beach-bar" }),
          s("19:30", "Diner aan het water", "Dinner by the water", { icon: "utensils", placeId: "it-rains-fishes" }),
        ],
      },
    ],
  },
  {
    id: "south",
    demo: true,
    art: "salt",
    image: photos.saltPans,
    title: l("Dagje zuiden", "A day in the south"),
    subtitle: l("Roze zoutpannen, lege stranden en de vuurtoren.", "Pink salt pans, empty beaches and the lighthouse."),
    length: l("1 dag", "1 day"),
    days: [
      {
        steps: [
          s("09:00", "Snorkelen bij Salt Pier", "Snorkel at Salt Pier", { icon: "fish", placeId: "salt-pier" }),
          s("11:00", "Pink Beach", "Pink Beach", { icon: "umbrella", placeId: "pink-beach" }),
          s("13:00", "Slavenhuisjes & zoutpannen", "Slave huts & salt pans", { icon: "camera", placeId: "salt-pans-slave-huts" }),
          s("14:30", "Vuurtoren Willemstoren", "Willemstoren Lighthouse", { icon: "navigation", placeId: "willemstoren" }),
          s("15:30", "Late lunch in Lac Bay", "Late lunch at Lac Bay", { icon: "utensils", placeId: "jibe-city" }),
          s("18:00", "Terug naar Kas Daas", "Back to Kas Daas", { icon: "home" }),
        ],
      },
    ],
  },
  {
    id: "washington-slagbaai",
    demo: true,
    art: "nature",
    image: photos.flamingos,
    title: l("Dagje Washington Slagbaai", "A day in Washington Slagbaai"),
    subtitle: l("Het wilde noorden: cactussen, kliffen en verlaten baaien.", "The wild north: cacti, cliffs and deserted bays."),
    length: l("1 dag", "1 day"),
    days: [
      {
        steps: [
          s("07:30", "Vroeg vertrekken, volle tank", "Leave early, full tank", { icon: "car", ...note("Neem veel water en lunch mee.", "Bring plenty of water and lunch.") }),
          s("08:30", "Flamingo's bij Gotomeer", "Flamingos at Gotomeer", { icon: "binoculars", placeId: "flamingos" }),
          s("09:30", "Het park in", "Into the park", { icon: "mountain", placeId: "washington-slagbaai" }),
          s("12:30", "Picknick & snorkelen in een baai", "Picnic & snorkel in a bay", { icon: "fish" }),
          s("15:00", "Via Rincon terug", "Back via Rincon", { icon: "route", placeId: "rincon" }),
          s("17:30", "Afspoelen & relaxen", "Rinse off & relax", { icon: "shower-head" }),
        ],
      },
    ],
  },
  {
    id: "snorkel-day",
    demo: true,
    art: "reef",
    title: l("Snorkeldag", "Snorkel day"),
    subtitle: l("Van rif naar rif langs de westkust.", "From reef to reef along the west coast."),
    length: l("1 dag", "1 day"),
    days: [
      {
        steps: [
          s("08:30", "Ontbijt & spullen checken", "Breakfast & gear check", { icon: "coffee" }),
          s("09:30", "1000 Steps", "1000 Steps", { icon: "fish", placeId: "1000-steps" }),
          s("12:00", "Lunch", "Lunch", { icon: "utensils" }),
          s("14:00", "Klein Bonaire", "Klein Bonaire", { icon: "sailboat", placeId: "klein-bonaire" }),
          s("17:45", "Sunset drink", "Sunset drink", { icon: "sunset", placeId: "karels-beach-bar" }),
        ],
      },
    ],
  },
  {
    id: "relax-day",
    demo: true,
    art: "pool",
    image: photos.pool,
    title: l("Relaxdag", "Slow day"),
    subtitle: l("De villa als je eigen resort.", "The villa as your private resort."),
    length: l("1 dag", "1 day"),
    days: [
      {
        steps: [
          s("09:30", "Uitslapen & lang ontbijt", "Sleep in & long breakfast", { icon: "coffee" }),
          s("11:00", "Lezen op het terras", "Read on the terrace", { icon: "armchair" }),
          s("13:00", "Lunch thuis", "Lunch at home", { icon: "utensils" }),
          s("15:00", "Pootjebaden in Sorobon", "Paddle at Sorobon", { icon: "waves", placeId: "sorobon" }),
          s("18:00", "Borrel bij de villa", "Drinks at the villa", { icon: "wine" }),
          s("19:30", "Afhalen & buiten eten", "Takeaway & dinner outside", { icon: "utensils", placeId: "bobbejans" }),
        ],
      },
    ],
  },
  {
    id: "foodie-day",
    demo: true,
    art: "food",
    title: l("Foodie day", "Foodie day"),
    subtitle: l("Van koffie tot cocktails — Bonaire proeven.", "From coffee to cocktails — a taste of Bonaire."),
    length: l("1 dag", "1 day"),
    days: [
      {
        steps: [
          s("09:00", "Koffie & ontbijt", "Coffee & breakfast", { icon: "coffee", placeId: "coffee-placeholder" }),
          s("12:30", "Lunch aan het strand", "Beach lunch", { icon: "utensils", placeId: "jibe-city" }),
          s("15:30", "IJsje in Kralendijk", "Gelato in Kralendijk", { icon: "ice-cream", placeId: "gelato" }),
          s("17:30", "Lokaal biertje", "Local beer", { icon: "wine", placeId: "la-cantina" }),
          s("19:30", "Diner", "Dinner", { icon: "utensils", placeId: "capriccio" }),
          s("21:30", "Cocktail", "Cocktail", { icon: "wine", placeId: "cuba-compagnie" }),
        ],
      },
    ],
  },
  {
    id: "active-day",
    demo: true,
    art: "wind",
    image: photos.kitesurf,
    title: l("Actieve dag", "Active day"),
    subtitle: l("Wind, water en trails.", "Wind, water and trails."),
    length: l("1 dag", "1 day"),
    days: [
      {
        steps: [
          s("06:30", "Wandelen of mountainbiken", "Hike or mountain bike", { icon: "bike", placeId: "hiking-biking" }),
          s("09:00", "Ontbijt", "Breakfast", { icon: "coffee" }),
          s("10:30", "Kajakken in de mangroves", "Mangrove kayaking", { icon: "sailboat", placeId: "mangroves" }),
          s("13:00", "Lunch in Lac Bay", "Lunch at Lac Bay", { icon: "utensils", placeId: "jibe-city" }),
          s("14:30", "Windsurfles", "Windsurf lesson", { icon: "wind", placeId: "windsurfing" }),
          s("19:30", "Welverdiend diner", "Well-earned dinner", { icon: "utensils", placeId: "la-cantina" }),
        ],
      },
    ],
  },
  {
    id: "romantic-day",
    demo: true,
    art: "sunset",
    image: photos.deckSunset,
    title: l("Romantische dag", "Romantic day"),
    subtitle: l("Met z'n tweeën, zonder haast.", "Just the two of you, no rush."),
    length: l("1 dag", "1 day"),
    days: [
      {
        steps: [
          s("09:00", "Ontbijt op bed", "Breakfast in bed", { icon: "coffee" }),
          s("10:30", "Klein Bonaire", "Klein Bonaire", { icon: "sailboat", placeId: "klein-bonaire" }),
          s("15:00", "Siësta", "Siesta", { icon: "bed" }),
          s("17:30", "Zonsondergang op Seru Largu", "Sunset at Seru Largu", { icon: "sunset", placeId: "seru-largu" }),
          s("19:30", "Diner aan het water", "Dinner by the water", { icon: "utensils", placeId: "rum-runners" }),
        ],
      },
    ],
  },
  {
    id: "three-days",
    demo: true,
    art: "sea",
    image: photos.aerialCoast,
    title: l("Bonaire in 3 dagen", "Bonaire in 3 days"),
    subtitle: l("Het beste van het eiland in een lang weekend.", "The best of the island in a long weekend."),
    length: l("3 dagen", "3 days"),
    days: [
      { title: l("Dag 1 — Aankomen", "Day 1 — Arrive"), steps: [
        s("10:00", "Boodschappen", "Groceries", { icon: "shopping-bag", placeId: "van-den-tweel" }),
        s("14:00", "Eerste snorkel", "First snorkel", { icon: "fish", placeId: "andrea" }),
        s("17:45", "Zonsondergang", "Sunset", { icon: "sunset", placeId: "karels-beach-bar" }),
      ] },
      { title: l("Dag 2 — Onder water", "Day 2 — Underwater"), steps: [
        s("09:00", "1000 Steps", "1000 Steps", { icon: "fish", placeId: "1000-steps" }),
        s("13:00", "Klein Bonaire", "Klein Bonaire", { icon: "sailboat", placeId: "klein-bonaire" }),
        s("19:30", "Diner", "Dinner", { icon: "utensils", placeId: "it-rains-fishes" }),
      ] },
      { title: l("Dag 3 — Het zuiden", "Day 3 — The south"), steps: [
        s("09:00", "Zoutpannen & slavenhuisjes", "Salt pans & slave huts", { icon: "camera", placeId: "salt-pans-slave-huts" }),
        s("12:30", "Lunch in Lac Bay", "Lunch at Lac Bay", { icon: "utensils", placeId: "jibe-city" }),
        s("15:00", "Sorobon", "Sorobon", { icon: "waves", placeId: "sorobon" }),
      ] },
    ],
  },
  {
    id: "five-days",
    demo: true,
    art: "reef",
    title: l("Bonaire in 5 dagen", "Bonaire in 5 days"),
    subtitle: l("Ruimte voor natuur, zee en niksen.", "Room for nature, sea and doing nothing."),
    length: l("5 dagen", "5 days"),
    days: [
      { title: l("Dag 1 — Landen", "Day 1 — Land"), steps: [
        s("10:00", "Boodschappen", "Groceries", { icon: "shopping-bag", placeId: "warehouse" }),
        s("17:45", "Zonsondergang", "Sunset", { icon: "sunset", placeId: "te-amo-beach" }),
      ] },
      { title: l("Dag 2 — Snorkelen", "Day 2 — Snorkel"), steps: [
        s("09:00", "1000 Steps", "1000 Steps", { icon: "fish", placeId: "1000-steps" }),
        s("14:00", "Andrea I & II", "Andrea I & II", { icon: "fish", placeId: "andrea" }),
      ] },
      { title: l("Dag 3 — Het wilde noorden", "Day 3 — The wild north"), steps: [
        s("08:00", "Washington Slagbaai", "Washington Slagbaai", { icon: "mountain", placeId: "washington-slagbaai" }),
        s("15:00", "Rincon", "Rincon", { icon: "route", placeId: "rincon" }),
      ] },
      { title: l("Dag 4 — Zuiden & Lac Bay", "Day 4 — South & Lac Bay"), steps: [
        s("09:00", "Zoutpannen", "Salt pans", { icon: "camera", placeId: "salt-pans-slave-huts" }),
        s("12:00", "Mangroves", "Mangroves", { icon: "sailboat", placeId: "mangroves" }),
        s("15:00", "Sorobon", "Sorobon", { icon: "waves", placeId: "sorobon" }),
      ] },
      { title: l("Dag 5 — Klein Bonaire", "Day 5 — Klein Bonaire"), steps: [
        s("09:30", "Klein Bonaire", "Klein Bonaire", { icon: "sailboat", placeId: "klein-bonaire" }),
        s("19:30", "Afscheidsdiner", "Farewell dinner", { icon: "utensils", placeId: "it-rains-fishes" }),
      ] },
    ],
  },
  {
    id: "seven-days",
    demo: true,
    art: "sunset",
    image: photos.sunsetGarden,
    title: l("Bonaire in 7 dagen", "Bonaire in 7 days"),
    subtitle: l("Een volle week: alles zien, en toch uitrusten.", "A full week: see it all, and still rest."),
    length: l("7 dagen", "7 days"),
    days: [
      { title: l("Dag 1 — Aankomen", "Day 1 — Arrive"), steps: [
        s("10:00", "Boodschappen", "Groceries", { icon: "shopping-bag", placeId: "van-den-tweel" }),
        s("17:45", "Zonsondergang", "Sunset", { icon: "sunset", placeId: "karels-beach-bar" }),
      ] },
      { title: l("Dag 2 — Westkust", "Day 2 — West coast"), steps: [
        s("09:00", "1000 Steps", "1000 Steps", { icon: "fish", placeId: "1000-steps" }),
        s("19:30", "Diner", "Dinner", { icon: "utensils", placeId: "capriccio" }),
      ] },
      { title: l("Dag 3 — Noorden", "Day 3 — North"), steps: [
        s("08:00", "Washington Slagbaai", "Washington Slagbaai", { icon: "mountain", placeId: "washington-slagbaai" }),
        s("15:00", "Flamingo's", "Flamingos", { icon: "binoculars", placeId: "flamingos" }),
      ] },
      { title: l("Dag 4 — Relax", "Day 4 — Relax"), steps: [
        s("10:00", "Villa-dag", "Villa day", { icon: "sun" }),
        s("18:00", "Seru Largu", "Seru Largu", { icon: "sunset", placeId: "seru-largu" }),
      ] },
      { title: l("Dag 5 — Het zuiden", "Day 5 — The south"), steps: [
        s("09:00", "Zoutpannen & slavenhuisjes", "Salt pans & slave huts", { icon: "camera", placeId: "salt-pans-slave-huts" }),
        s("12:00", "Pink Beach", "Pink Beach", { icon: "umbrella", placeId: "pink-beach" }),
      ] },
      { title: l("Dag 6 — Op het water", "Day 6 — On the water"), steps: [
        s("09:00", "Een dag met de boot", "A day on the boat", { icon: "ship", ...note("Vraag naar de boot van Kas Daas.", "Ask about the Kas Daas boat.") }),
        s("13:00", "Klein Bonaire", "Klein Bonaire", { icon: "sailboat", placeId: "klein-bonaire" }),
      ] },
      { title: l("Dag 7 — Lac Bay", "Day 7 — Lac Bay"), steps: [
        s("10:00", "Mangroves", "Mangroves", { icon: "sailboat", placeId: "mangroves" }),
        s("13:00", "Lunch & windsurfers kijken", "Lunch & windsurfer watching", { icon: "utensils", placeId: "jibe-city" }),
        s("19:30", "Afscheidsdiner", "Farewell dinner", { icon: "utensils", placeId: "rum-runners" }),
      ] },
    ],
  },
];
