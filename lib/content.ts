/**
 * Content access layer. Every page reads content through these functions.
 * To connect a CMS later, re-implement these functions — the UI stays as is.
 */
import { site } from "@/content/site";
import { houseSections } from "@/content/house/sections";
import { stay, wifi } from "@/content/house/stay";
import { departure, problems } from "@/content/house/departure";
import { food } from "@/content/places/food";
import { beaches, underwater, activities, groceries, practicalPlaces } from "@/content/places/explore";
import { itineraries } from "@/content/itineraries";
import { practical } from "@/content/practical";
import { boatRental } from "@/content/boat/rental";
import { categories, diningStyles, mapGroups, tagLabels } from "@/content/categories";
import type { Place, PlaceCategory } from "./types";

export { site, houseSections, stay, wifi, departure, problems, itineraries, practical, boatRental, categories, diningStyles, mapGroups, tagLabels };

const allPlaces: Place[] = [...food, ...beaches, ...underwater, ...activities, ...groceries, ...practicalPlaces];

export function getPlaces(): Place[] {
  return allPlaces;
}

export function getPlace(id: string): Place | undefined {
  return allPlaces.find((p) => p.id === id);
}

export function placesIn(category: PlaceCategory): Place[] {
  return allPlaces
    .filter((p) => p.category === category || p.alsoIn?.includes(category))
    .sort((a, b) => Number(!!b.favorite) - Number(!!a.favorite));
}

export function favoritePlaces(): Place[] {
  return allPlaces.filter((p) => p.favorite);
}

export function getCategory(id: string) {
  return categories.find((c) => c.id === id);
}

export function getSection(id: string) {
  return houseSections.find((s) => s.id === id);
}

export function getItinerary(id: string) {
  return itineraries.find((i) => i.id === id);
}

export function restaurants(): Place[] {
  return allPlaces.filter((p) => p.restaurant);
}
