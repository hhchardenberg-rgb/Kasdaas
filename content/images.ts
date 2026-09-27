import { l } from "./_helpers";
import type { ImageRef } from "@/lib/types";

/**
 * ─────────────────────────────────────────────────────────────────────────────
 *  PHOTOS — one place for every photo in the guide.
 *  Source: the owner's own photos (Vrbo listing p336665), used with permission.
 *  Files live in /public/images. To replace a photo: overwrite the file, or add
 *  a new entry here and reference it from the content.
 * ─────────────────────────────────────────────────────────────────────────────
 */
const v = (file: string, nl: string, en: string): ImageRef => ({ src: `/images/villa/${file}.jpg`, alt: l(nl, en) });
const b = (file: string, nl: string, en: string): ImageRef => ({ src: `/images/bonaire/${file}.jpg`, alt: l(nl, en) });

export const photos = {
  // Villa
  hero: v("deck-palapa-sea", "Het houten terras van Kas Daas met palapa, ligbedden en de turquoise zee", "The wooden deck of Kas Daas with palapa, loungers and the turquoise sea"),
  villaFromSea: v("villa-from-the-sea", "Kas Daas gezien vanaf de zee, met zwembad en terrassen", "Kas Daas seen from the sea, with pool and terraces"),
  exterior: v("exterior-entrance", "De voorzijde van Kas Daas met carport en palmbomen", "The front of Kas Daas with carport and palm trees"),
  parking: v("parking", "De oprit met carport bij Kas Daas", "The driveway and carport at Kas Daas"),
  livingOcean: v("living-ocean-view", "De woonkamer met open front en uitzicht op zee", "The living room opening onto the sea"),
  livingDining: v("living-dining", "Woonkamer en eethoek met hanglampen", "Living room and dining area with pendant lamps"),
  livingLounge: v("living-lounge", "Loungebank met uitzicht over de zee", "Lounge sofa overlooking the sea"),
  kitchenBar: v("kitchen-bar", "Keukeneiland met barkrukken en zeezicht", "Kitchen island with bar stools and sea view"),
  kitchen: v("kitchen", "De keuken met kookeiland", "The kitchen with cooking island"),
  hob: v("viking-hob", "Het Viking gasfornuis", "The Viking gas hob"),
  bedroomOcean: v("bedroom-ocean", "Slaapkamer met hemelbed en uitzicht op zee", "Bedroom with canopy bed and sea view"),
  bedroomCanopy: v("bedroom-canopy", "Slaapkamer met klamboe en toegang tot het terras", "Bedroom with mosquito net and access to the terrace"),
  bathroom: v("bathroom", "Badkamer met betonnen wastafel", "Bathroom with concrete washbasin"),
  linen: v("linen-shelves", "Handdoeken en linnengoed in de kast", "Towels and linen on the shelves"),
  laundry: v("laundry", "Wasruimte met wasmachine en droger", "Laundry room with washer and dryer"),
  outdoorShower: v("outdoor-shower", "De buitendouche met uitzicht op zee en de palapa", "The outdoor shower overlooking the sea and the palapa"),
  palapaLounge: v("palapa-lounge", "Loungebedden onder de palapa aan zee", "Lounge beds under the palapa by the sea"),
  poolDeck: v("pool-deck", "Het zwembad en de terrassen van Kas Daas", "The pool and terraces of Kas Daas"),
  pool: v("pool", "Het zwembad met houten terras", "The pool with wooden deck"),
  poolNight: v("pool-night", "Het verlichte zwembad bij avond", "The lit pool at night"),
  sunLoungers: v("sun-loungers", "Ligbedden op het terras boven zee", "Sun loungers on the deck above the sea"),
  bbqJetty: v("bbq-jetty", "De barbecue op het terras boven het water", "The barbecue on the deck above the water"),
  bbq: v("bbq", "De gemetselde barbecue", "The built-in barbecue"),
  diveGear: v("dive-gear-rinse", "Spoelbak en plek voor duikspullen", "Rinse tank and space for dive gear"),
  balcony: v("balcony", "Balkon met uitzicht op zee", "Balcony with sea view"),
  deckSunset: v("deck-sunset", "Het terras bij zonsondergang", "The deck at sunset"),
  sunsetGarden: v("sunset-garden", "Zonsondergang vanuit de tuin", "Sunset from the garden"),
  gardenPool: v("garden-pool", "Tuin en zwembad in het avondlicht", "Garden and pool in the evening light"),
  aerialCoast: v("aerial-coast", "Luchtfoto van de kust bij Kas Daas", "Aerial view of the coast at Kas Daas"),
  aerialBoats: v("aerial-boats", "Luchtfoto van de kust met boten op het water", "Aerial view of the coast with boats on the water"),

  // Bonaire
  saltPans: b("salt-pans", "Zoutbergen bij de zoutpannen in het zuiden", "Salt mountains at the salt pans in the south"),
  flamingos: b("flamingos", "Flamingo's boven het water", "Flamingos flying over the water"),
  dolphins: b("dolphins", "Dolfijnen in helderblauw water", "Dolphins in clear blue water"),
  kitesurf: b("kitesurf-aerial", "Kitesurfers in turquoise water, van bovenaf", "Kitesurfers in turquoise water, from above"),
  kralendijk: b("kralendijk-harbour", "Kralendijk en de haven van bovenaf", "Kralendijk and its harbour from above"),
};
