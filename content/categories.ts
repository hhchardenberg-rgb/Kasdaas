import { l } from "./_helpers";
import type { ArtVariant, DiningStyle, IconName, Localized, PlaceCategory, PlaceTag } from "@/lib/types";

/** Discover categories, in display order. Rename or reorder freely. */
export const categories: { id: PlaceCategory; icon: IconName; art: ArtVariant; label: Localized; intro: Localized }[] = [
  { id: "food", icon: "utensils", art: "food", label: l("Eten & drinken", "Eat & drink"), intro: l("Handgekozen adresjes, van strandlunch tot diner aan het water.", "Handpicked spots, from beach lunches to dinner by the water.") },
  { id: "beaches", icon: "umbrella", art: "beach", label: l("Stranden", "Beaches"), intro: l("Van turquoise baaien tot verlaten stranden.", "From turquoise bays to deserted beaches.") },
  { id: "snorkeling", icon: "fish", art: "reef", label: l("Snorkelen", "Snorkeling"), intro: l("Het rif begint op een paar meter van de kant.", "The reef starts a few metres from shore.") },
  { id: "diving", icon: "waves", art: "reef", label: l("Duiken", "Diving"), intro: l("Een van de mooiste duikbestemmingen ter wereld.", "One of the finest dive destinations in the world.") },
  { id: "activities", icon: "sparkles", art: "wind", label: l("Activiteiten", "Activities"), intro: l("Wind, water en avontuur.", "Wind, water and adventure.") },
  { id: "sunset", icon: "sunset", art: "sunset", label: l("Zonsondergang", "Sunset"), intro: l("De mooiste plekken om de dag af te sluiten.", "The best places to end the day.") },
  { id: "nature", icon: "leaf", art: "nature", label: l("Natuur", "Nature"), intro: l("Cactussen, flamingo's en ongerepte kust.", "Cacti, flamingos and untouched coastline.") },
  { id: "roadtrips", icon: "car", art: "salt", label: l("Roadtrips", "Road trips"), intro: l("Het eiland rond, met onderweg de mooiste stops.", "Around the island, with the best stops on the way.") },
  { id: "drinks", icon: "wine", art: "night", label: l("Drinks & nightlife", "Drinks & nightlife"), intro: l("Borrels, cocktails en een lokaal biertje.", "Sundowners, cocktails and a local beer.") },
  { id: "groceries", icon: "shopping-bag", art: "practical", label: l("Boodschappen", "Groceries"), intro: l("Waar je alles voor de villa haalt.", "Where to stock up for the villa.") },
  { id: "breakfast", icon: "coffee", art: "coffee", label: l("Ontbijt & koffie", "Breakfast & coffee"), intro: l("Een goede start van de dag.", "A good start to the day.") },
  { id: "snacks", icon: "ice-cream", art: "town", label: l("Snacks & ijs", "Snacks & ice cream"), intro: l("Voor tussendoor.", "For in between.") },
  { id: "kids", icon: "baby", art: "beach", label: l("Met kinderen", "With kids"), intro: l("Ontspannen uitjes voor het hele gezin.", "Relaxed outings for the whole family.") },
  { id: "hidden-gems", icon: "gem", art: "sea", label: l("Hidden gems", "Hidden gems"), intro: l("Plekken die je niet in elke gids vindt.", "Places you won't find in every guide.") },
  { id: "rainy-day", icon: "cloud-rain", art: "town", label: l("Bij minder weer", "Rainy day"), intro: l("Ook als de zon zich even verstopt.", "For when the sun takes a break.") },
  { id: "practical", icon: "info", art: "practical", label: l("Praktisch", "Practical"), intro: l("Ziekenhuis, apotheek, tanken en meer.", "Hospital, pharmacy, fuel and more.") },
];

export const tagLabels: Record<PlaceTag, Localized> = {
  favorite: l("Kas Daas favoriet", "Kas Daas favourite"),
  sunset: l("Sunset", "Sunset"),
  local: l("Lokaal", "Local"),
  romantic: l("Romantisch", "Romantic"),
  family: l("Gezin", "Family"),
  snorkeling: l("Snorkelen", "Snorkeling"),
  lunch: l("Lunch", "Lunch"),
  dinner: l("Diner", "Dinner"),
  "quick-bite": l("Snel hapje", "Quick bite"),
  breakfast: l("Ontbijt", "Breakfast"),
  waterfront: l("Aan het water", "Waterfront"),
  "worth-the-drive": l("Het ritje waard", "Worth the drive"),
  "after-the-beach": l("Na het strand", "After the beach"),
  nature: l("Natuur", "Nature"),
  diving: l("Duiken", "Diving"),
  drinks: l("Drinks", "Drinks"),
  active: l("Actief", "Active"),
  "book-ahead": l("Vooraf boeken", "Book ahead"),
};

/** Restaurant guide filters (on top of "Our favourites"). */
export const diningStyles: { id: DiningStyle; label: Localized }[] = [
  { id: "fine-dining", label: l("Fine dining", "Fine dining") },
  { id: "casual", label: l("Casual", "Casual") },
  { id: "lunch", label: l("Lunch", "Lunch") },
  { id: "breakfast", label: l("Ontbijt", "Breakfast") },
  { id: "foodtruck", label: l("Foodtrucks", "Food trucks") },
  { id: "fish", label: l("Vis", "Seafood") },
  { id: "meat", label: l("Vlees", "Meat") },
  { id: "international", label: l("Internationaal", "International") },
  { id: "local", label: l("Lokaal", "Local") },
  { id: "waterfront", label: l("Aan het water", "Waterfront") },
  { id: "sunset", label: l("Sunset", "Sunset") },
  { id: "takeaway", label: l("Afhalen", "Takeaway") },
];

/** Map filter groups. */
export const mapGroups: { id: string; label: Localized; icon: IconName; categories: PlaceCategory[]; color: string }[] = [
  { id: "food", label: l("Eten", "Food"), icon: "utensils", categories: ["food", "breakfast", "snacks", "drinks"], color: "#B8643F" },
  { id: "beach", label: l("Strand", "Beach"), icon: "umbrella", categories: ["beaches", "sunset"], color: "#C9A36A" },
  { id: "snorkel", label: l("Snorkel", "Snorkel"), icon: "fish", categories: ["snorkeling"], color: "#2B7A86" },
  { id: "dive", label: l("Duik", "Dive"), icon: "waves", categories: ["diving"], color: "#15475A" },
  { id: "activity", label: l("Activiteit", "Activity"), icon: "sparkles", categories: ["activities", "nature", "roadtrips", "kids", "hidden-gems", "rainy-day"], color: "#5F7457" },
  { id: "shopping", label: l("Winkels", "Shopping"), icon: "shopping-bag", categories: ["groceries"], color: "#7B6A8F" },
  { id: "practical", label: l("Praktisch", "Practical"), icon: "info", categories: ["practical"], color: "#6B7478" },
];
