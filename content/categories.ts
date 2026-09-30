import { l } from "./_helpers";
import type { ArtVariant, DiningStyle, IconName, Localized, PlaceCategory, PlaceTag } from "@/lib/types";

/** Discover categories, in display order. Rename or reorder freely. */
export const categories: { id: PlaceCategory; icon: IconName; art: ArtVariant; label: Localized; intro: Localized }[] = [
  { id: "food", icon: "utensils", art: "food", label: l("Eten & drinken", "Eat & drink", "Comer y beber"), intro: l("Handgekozen adresjes, van strandlunch tot diner aan het water.", "Handpicked spots, from beach lunches to dinner by the water.", "Lugares escogidos con cariño, desde almuerzos en la playa hasta cenas junto al agua.") },
  { id: "beaches", icon: "umbrella", art: "beach", label: l("Stranden", "Beaches", "Playas"), intro: l("Van turquoise baaien tot verlaten stranden.", "From turquoise bays to deserted beaches.", "De bahías turquesas a playas desiertas.") },
  { id: "snorkeling", icon: "fish", art: "reef", label: l("Snorkelen", "Snorkeling", "Snorkel"), intro: l("Het rif begint op een paar meter van de kant.", "The reef starts a few metres from shore.", "El arrecife empieza a pocos metros de la orilla.") },
  { id: "diving", icon: "waves", art: "reef", label: l("Duiken", "Diving", "Buceo"), intro: l("Een van de mooiste duikbestemmingen ter wereld.", "One of the finest dive destinations in the world.", "Uno de los mejores destinos de buceo del mundo.") },
  { id: "activities", icon: "sparkles", art: "wind", label: l("Activiteiten", "Activities", "Actividades"), intro: l("Wind, water en avontuur.", "Wind, water and adventure.", "Viento, agua y aventura.") },
  { id: "sunset", icon: "sunset", art: "sunset", label: l("Zonsondergang", "Sunset", "Atardecer"), intro: l("De mooiste plekken om de dag af te sluiten.", "The best places to end the day.", "Los mejores lugares para terminar el día.") },
  { id: "nature", icon: "leaf", art: "nature", label: l("Natuur", "Nature", "Naturaleza"), intro: l("Cactussen, flamingo's en ongerepte kust.", "Cacti, flamingos and untouched coastline.", "Cactus, flamencos y costa virgen.") },
  { id: "roadtrips", icon: "car", art: "salt", label: l("Roadtrips", "Road trips", "Rutas en coche"), intro: l("Het eiland rond, met onderweg de mooiste stops.", "Around the island, with the best stops on the way.", "Por toda la isla, con las mejores paradas del camino.") },
  { id: "drinks", icon: "wine", art: "night", label: l("Drinks & nightlife", "Drinks & nightlife", "Copas y vida nocturna"), intro: l("Borrels, cocktails en een lokaal biertje.", "Sundowners, cocktails and a local beer.", "Copas al atardecer, cócteles y una cerveza local.") },
  { id: "groceries", icon: "shopping-bag", art: "practical", label: l("Boodschappen", "Groceries", "Supermercados"), intro: l("Waar je alles voor de villa haalt.", "Where to stock up for the villa.", "Dónde hacer la compra para la villa.") },
  { id: "breakfast", icon: "coffee", art: "coffee", label: l("Ontbijt & koffie", "Breakfast & coffee", "Desayuno y café"), intro: l("Een goede start van de dag.", "A good start to the day.", "Un buen comienzo del día.") },
  { id: "snacks", icon: "ice-cream", art: "town", label: l("Snacks & ijs", "Snacks & ice cream", "Tentempiés y helados"), intro: l("Voor tussendoor.", "For in between.", "Para entre horas.") },
  { id: "kids", icon: "baby", art: "beach", label: l("Met kinderen", "With kids", "Con niños"), intro: l("Ontspannen uitjes voor het hele gezin.", "Relaxed outings for the whole family.", "Salidas tranquilas para toda la familia.") },
  { id: "hidden-gems", icon: "gem", art: "sea", label: l("Hidden gems", "Hidden gems", "Joyas escondidas"), intro: l("Plekken die je niet in elke gids vindt.", "Places you won't find in every guide.", "Lugares que no encontrarás en cualquier guía.") },
  { id: "rainy-day", icon: "cloud-rain", art: "town", label: l("Bij minder weer", "Rainy day", "Día de lluvia"), intro: l("Ook als de zon zich even verstopt.", "For when the sun takes a break.", "Para cuando el sol se toma un descanso.") },
  { id: "practical", icon: "info", art: "practical", label: l("Praktisch", "Practical", "Práctico"), intro: l("Ziekenhuis, apotheek, tanken en meer.", "Hospital, pharmacy, fuel and more.", "Hospital, farmacia, gasolina y más.") },
];

export const tagLabels: Record<PlaceTag, Localized> = {
  favorite: l("Kas Daas favoriet", "Kas Daas favourite", "Favorito de Kas Daas"),
  sunset: l("Sunset", "Sunset", "Atardecer"),
  local: l("Lokaal", "Local", "Local"),
  romantic: l("Romantisch", "Romantic", "Romántico"),
  family: l("Gezin", "Family", "Familiar"),
  snorkeling: l("Snorkelen", "Snorkeling", "Snorkel"),
  lunch: l("Lunch", "Lunch", "Almuerzo"),
  dinner: l("Diner", "Dinner", "Cena"),
  "quick-bite": l("Snel hapje", "Quick bite", "Algo rápido"),
  breakfast: l("Ontbijt", "Breakfast", "Desayuno"),
  waterfront: l("Aan het water", "Waterfront", "Junto al agua"),
  "worth-the-drive": l("Het ritje waard", "Worth the drive", "Merece el viaje"),
  "after-the-beach": l("Na het strand", "After the beach", "Después de la playa"),
  nature: l("Natuur", "Nature", "Naturaleza"),
  diving: l("Duiken", "Diving", "Buceo"),
  drinks: l("Drinks", "Drinks", "Copas"),
  active: l("Actief", "Active", "Activo"),
  "book-ahead": l("Vooraf boeken", "Book ahead", "Reserva con antelación"),
};

/** Restaurant guide filters (on top of "Our favourites"). */
export const diningStyles: { id: DiningStyle; label: Localized }[] = [
  { id: "fine-dining", label: l("Fine dining", "Fine dining", "Alta cocina") },
  { id: "casual", label: l("Casual", "Casual", "Informal") },
  { id: "lunch", label: l("Lunch", "Lunch", "Almuerzo") },
  { id: "breakfast", label: l("Ontbijt", "Breakfast", "Desayuno") },
  { id: "foodtruck", label: l("Foodtrucks", "Food trucks", "Food trucks") },
  { id: "fish", label: l("Vis", "Seafood", "Pescado y marisco") },
  { id: "meat", label: l("Vlees", "Meat", "Carne") },
  { id: "international", label: l("Internationaal", "International", "Internacional") },
  { id: "local", label: l("Lokaal", "Local", "Local") },
  { id: "waterfront", label: l("Aan het water", "Waterfront", "Junto al agua") },
  { id: "sunset", label: l("Sunset", "Sunset", "Atardecer") },
  { id: "takeaway", label: l("Afhalen", "Takeaway", "Para llevar") },
];

/** Map filter groups. */
export const mapGroups: { id: string; label: Localized; icon: IconName; categories: PlaceCategory[]; color: string }[] = [
  { id: "food", label: l("Eten", "Food", "Comida"), icon: "utensils", categories: ["food", "breakfast", "snacks", "drinks"], color: "#B8643F" },
  { id: "beach", label: l("Strand", "Beach", "Playa"), icon: "umbrella", categories: ["beaches", "sunset"], color: "#C9A36A" },
  { id: "snorkel", label: l("Snorkel", "Snorkel", "Snorkel"), icon: "fish", categories: ["snorkeling"], color: "#2B7A86" },
  { id: "dive", label: l("Duik", "Dive", "Buceo"), icon: "waves", categories: ["diving"], color: "#15475A" },
  { id: "activity", label: l("Activiteit", "Activity", "Actividad"), icon: "sparkles", categories: ["activities", "nature", "roadtrips", "kids", "hidden-gems", "rainy-day"], color: "#5F7457" },
  { id: "shopping", label: l("Winkels", "Shopping", "Compras"), icon: "shopping-bag", categories: ["groceries"], color: "#7B6A8F" },
  { id: "practical", label: l("Praktisch", "Practical", "Práctico"), icon: "info", categories: ["practical"], color: "#6B7478" },
];
