import { l } from "./_helpers";
import type { ArtVariant, DiningStyle, IconName, Localized, PlaceCategory, PlaceTag } from "@/lib/types";

/** Discover categories, in display order. Rename or reorder freely. */
export const categories: { id: PlaceCategory; icon: IconName; art: ArtVariant; label: Localized; intro: Localized }[] = [
  { id: "food", icon: "utensils", art: "food", label: l("Eten & drinken", "Eat & drink", "Comer y beber", "Essen & Trinken"), intro: l("Handgekozen adresjes, van strandlunch tot diner aan het water.", "Handpicked spots, from beach lunches to dinner by the water.", "Lugares escogidos con cariño, desde almuerzos en la playa hasta cenas junto al agua.", "Handverlesene Adressen, vom Mittagessen am Strand bis zum Abendessen am Wasser.") },
  { id: "beaches", icon: "umbrella", art: "beach", label: l("Stranden", "Beaches", "Playas", "Strände"), intro: l("Van turquoise baaien tot verlaten stranden.", "From turquoise bays to deserted beaches.", "De bahías turquesas a playas desiertas.", "Von türkisfarbenen Buchten bis zu menschenleeren Stränden.") },
  { id: "snorkeling", icon: "fish", art: "reef", label: l("Snorkelen", "Snorkeling", "Snorkel", "Schnorcheln"), intro: l("Het rif begint op een paar meter van de kant.", "The reef starts a few metres from shore.", "El arrecife empieza a pocos metros de la orilla.", "Das Riff beginnt ein paar Meter vom Ufer entfernt.") },
  { id: "diving", icon: "waves", art: "reef", label: l("Duiken", "Diving", "Buceo", "Tauchen"), intro: l("Een van de mooiste duikbestemmingen ter wereld.", "One of the finest dive destinations in the world.", "Uno de los mejores destinos de buceo del mundo.", "Eines der schönsten Tauchziele der Welt.") },
  { id: "activities", icon: "sparkles", art: "wind", label: l("Activiteiten", "Activities", "Actividades", "Aktivitäten"), intro: l("Wind, water en avontuur.", "Wind, water and adventure.", "Viento, agua y aventura.", "Wind, Wasser und Abenteuer.") },
  { id: "sunset", icon: "sunset", art: "sunset", label: l("Zonsondergang", "Sunset", "Atardecer", "Sonnenuntergang"), intro: l("De mooiste plekken om de dag af te sluiten.", "The best places to end the day.", "Los mejores lugares para terminar el día.", "Die schönsten Orte, um den Tag ausklingen zu lassen.") },
  { id: "nature", icon: "leaf", art: "nature", label: l("Natuur", "Nature", "Naturaleza", "Natur"), intro: l("Cactussen, flamingo's en ongerepte kust.", "Cacti, flamingos and untouched coastline.", "Cactus, flamencos y costa virgen.", "Kakteen, Flamingos und unberührte Küste.") },
  { id: "roadtrips", icon: "car", art: "salt", label: l("Roadtrips", "Road trips", "Rutas en coche", "Roadtrips"), intro: l("Het eiland rond, met onderweg de mooiste stops.", "Around the island, with the best stops on the way.", "Por toda la isla, con las mejores paradas del camino.", "Einmal um die Insel, mit den besten Stopps unterwegs.") },
  { id: "drinks", icon: "wine", art: "night", label: l("Drinks & nightlife", "Drinks & nightlife", "Copas y vida nocturna", "Drinks & Nachtleben"), intro: l("Borrels, cocktails en een lokaal biertje.", "Sundowners, cocktails and a local beer.", "Copas al atardecer, cócteles y una cerveza local.", "Sundowner, Cocktails und ein lokales Bier.") },
  { id: "groceries", icon: "shopping-bag", art: "practical", label: l("Boodschappen", "Groceries", "Supermercados", "Einkaufen"), intro: l("Waar je alles voor de villa haalt.", "Where to stock up for the villa.", "Dónde hacer la compra para la villa.", "Wo du Vorräte für die Villa einkaufst.") },
  { id: "breakfast", icon: "coffee", art: "coffee", label: l("Ontbijt & koffie", "Breakfast & coffee", "Desayuno y café", "Frühstück & Kaffee"), intro: l("Een goede start van de dag.", "A good start to the day.", "Un buen comienzo del día.", "Ein guter Start in den Tag.") },
  { id: "snacks", icon: "ice-cream", art: "town", label: l("Snacks & ijs", "Snacks & ice cream", "Tentempiés y helados", "Snacks & Eis"), intro: l("Voor tussendoor.", "For in between.", "Para entre horas.", "Für zwischendurch.") },
  { id: "kids", icon: "baby", art: "beach", label: l("Met kinderen", "With kids", "Con niños", "Mit Kindern"), intro: l("Ontspannen uitjes voor het hele gezin.", "Relaxed outings for the whole family.", "Salidas tranquilas para toda la familia.", "Entspannte Ausflüge für die ganze Familie.") },
  { id: "hidden-gems", icon: "gem", art: "sea", label: l("Hidden gems", "Hidden gems", "Joyas escondidas", "Geheimtipps"), intro: l("Plekken die je niet in elke gids vindt.", "Places you won't find in every guide.", "Lugares que no encontrarás en cualquier guía.", "Orte, die nicht in jedem Reiseführer stehen.") },
  { id: "rainy-day", icon: "cloud-rain", art: "town", label: l("Bij minder weer", "Rainy day", "Día de lluvia", "Regentag"), intro: l("Ook als de zon zich even verstopt.", "For when the sun takes a break.", "Para cuando el sol se toma un descanso.", "Für den Fall, dass die Sonne Pause macht.") },
  { id: "practical", icon: "info", art: "practical", label: l("Praktisch", "Practical", "Práctico", "Praktisches"), intro: l("Ziekenhuis, apotheek, tanken en meer.", "Hospital, pharmacy, fuel and more.", "Hospital, farmacia, gasolina y más.", "Krankenhaus, Apotheke, Tankstelle und mehr.") },
];

export const tagLabels: Record<PlaceTag, Localized> = {
  favorite: l("Kas Daas favoriet", "Kas Daas favourite", "Favorito de Kas Daas", "Kas-Daas-Favorit"),
  sunset: l("Sunset", "Sunset", "Atardecer", "Sonnenuntergang"),
  local: l("Lokaal", "Local", "Local", "Lokal"),
  romantic: l("Romantisch", "Romantic", "Romántico", "Romantisch"),
  family: l("Gezin", "Family", "Familiar", "Familie"),
  snorkeling: l("Snorkelen", "Snorkeling", "Snorkel", "Schnorcheln"),
  lunch: l("Lunch", "Lunch", "Almuerzo", "Mittagessen"),
  dinner: l("Diner", "Dinner", "Cena", "Abendessen"),
  "quick-bite": l("Snel hapje", "Quick bite", "Algo rápido", "Schneller Happen"),
  breakfast: l("Ontbijt", "Breakfast", "Desayuno", "Frühstück"),
  waterfront: l("Aan het water", "Waterfront", "Junto al agua", "Am Wasser"),
  "worth-the-drive": l("Het ritje waard", "Worth the drive", "Merece el viaje", "Die Fahrt wert"),
  "after-the-beach": l("Na het strand", "After the beach", "Después de la playa", "Nach dem Strand"),
  nature: l("Natuur", "Nature", "Naturaleza", "Natur"),
  diving: l("Duiken", "Diving", "Buceo", "Tauchen"),
  drinks: l("Drinks", "Drinks", "Copas", "Drinks"),
  active: l("Actief", "Active", "Activo", "Aktiv"),
  "book-ahead": l("Vooraf boeken", "Book ahead", "Reserva con antelación", "Vorher reservieren"),
};

/** Restaurant guide filters (on top of "Our favourites"). */
export const diningStyles: { id: DiningStyle; label: Localized }[] = [
  { id: "fine-dining", label: l("Fine dining", "Fine dining", "Alta cocina", "Gehobene Küche") },
  { id: "casual", label: l("Casual", "Casual", "Informal", "Ungezwungen") },
  { id: "lunch", label: l("Lunch", "Lunch", "Almuerzo", "Mittagessen") },
  { id: "breakfast", label: l("Ontbijt", "Breakfast", "Desayuno", "Frühstück") },
  { id: "foodtruck", label: l("Foodtrucks", "Food trucks", "Food trucks", "Foodtrucks") },
  { id: "fish", label: l("Vis", "Seafood", "Pescado y marisco", "Fisch & Meeresfrüchte") },
  { id: "meat", label: l("Vlees", "Meat", "Carne", "Fleisch") },
  { id: "international", label: l("Internationaal", "International", "Internacional", "International") },
  { id: "local", label: l("Lokaal", "Local", "Local", "Lokal") },
  { id: "waterfront", label: l("Aan het water", "Waterfront", "Junto al agua", "Am Wasser") },
  { id: "sunset", label: l("Sunset", "Sunset", "Atardecer", "Sonnenuntergang") },
  { id: "takeaway", label: l("Afhalen", "Takeaway", "Para llevar", "Zum Mitnehmen") },
];

/** Map filter groups. */
export const mapGroups: { id: string; label: Localized; icon: IconName; categories: PlaceCategory[]; color: string }[] = [
  { id: "food", label: l("Eten", "Food", "Comida", "Essen"), icon: "utensils", categories: ["food", "breakfast", "snacks", "drinks"], color: "#B8643F" },
  { id: "beach", label: l("Strand", "Beach", "Playa", "Strand"), icon: "umbrella", categories: ["beaches", "sunset"], color: "#C9A36A" },
  { id: "snorkel", label: l("Snorkel", "Snorkel", "Snorkel", "Schnorcheln"), icon: "fish", categories: ["snorkeling"], color: "#2B7A86" },
  { id: "dive", label: l("Duik", "Dive", "Buceo", "Tauchen"), icon: "waves", categories: ["diving"], color: "#15475A" },
  { id: "activity", label: l("Activiteit", "Activity", "Actividad", "Aktivität"), icon: "sparkles", categories: ["activities", "nature", "roadtrips", "kids", "hidden-gems", "rainy-day"], color: "#5F7457" },
  { id: "shopping", label: l("Winkels", "Shopping", "Compras", "Shopping"), icon: "shopping-bag", categories: ["groceries"], color: "#7B6A8F" },
  { id: "practical", label: l("Praktisch", "Practical", "Práctico", "Praktisches"), icon: "info", categories: ["practical"], color: "#6B7478" },
];
