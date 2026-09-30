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
const v = (file: string, nl: string, en: string, es: string): ImageRef => ({ src: `/images/villa/${file}.jpg`, alt: l(nl, en, es) });
const b = (file: string, nl: string, en: string, es: string): ImageRef => ({ src: `/images/bonaire/${file}.jpg`, alt: l(nl, en, es) });

export const photos = {
  // Villa
  hero: v("deck-palapa-sea", "Het houten terras van Kas Daas met palapa, ligbedden en de turquoise zee", "The wooden deck of Kas Daas with palapa, loungers and the turquoise sea", "La terraza de madera de Kas Daas con palapa, tumbonas y el mar turquesa"),
  villaFromSea: v("villa-from-the-sea", "Kas Daas gezien vanaf de zee, met zwembad en terrassen", "Kas Daas seen from the sea, with pool and terraces", "Kas Daas vista desde el mar, con piscina y terrazas"),
  exterior: v("exterior-entrance", "De voorzijde van Kas Daas met carport en palmbomen", "The front of Kas Daas with carport and palm trees", "La fachada de Kas Daas con cochera y palmeras"),
  parking: v("parking", "De oprit met carport bij Kas Daas", "The driveway and carport at Kas Daas", "La entrada y la cochera de Kas Daas"),
  livingOcean: v("living-ocean-view", "De woonkamer met open front en uitzicht op zee", "The living room opening onto the sea", "El salón abierto al mar"),
  livingDining: v("living-dining", "Woonkamer en eethoek met hanglampen", "Living room and dining area with pendant lamps", "Salón y comedor con lámparas colgantes"),
  livingLounge: v("living-lounge", "Loungebank met uitzicht over de zee", "Lounge sofa overlooking the sea", "Sofá lounge con vistas al mar"),
  kitchenBar: v("kitchen-bar", "Keukeneiland met barkrukken en zeezicht", "Kitchen island with bar stools and sea view", "Isla de cocina con taburetes y vistas al mar"),
  kitchen: v("kitchen", "De keuken met kookeiland", "The kitchen with cooking island", "La cocina con isla"),
  hob: v("viking-hob", "Het Viking gasfornuis", "The Viking gas hob", "La placa de gas Viking"),
  bedroomOcean: v("bedroom-ocean", "Slaapkamer met hemelbed en uitzicht op zee", "Bedroom with canopy bed and sea view", "Dormitorio con cama con dosel y vistas al mar"),
  bedroomCanopy: v("bedroom-canopy", "Slaapkamer met klamboe en toegang tot het terras", "Bedroom with mosquito net and access to the terrace", "Dormitorio con mosquitera y acceso a la terraza"),
  bathroom: v("bathroom", "Badkamer met betonnen wastafel", "Bathroom with concrete washbasin", "Baño con lavabo de hormigón"),
  linen: v("linen-shelves", "Handdoeken en linnengoed in de kast", "Towels and linen on the shelves", "Toallas y ropa de cama en las estanterías"),
  laundry: v("laundry", "Wasruimte met wasmachine en droger", "Laundry room with washer and dryer", "Cuarto de lavado con lavadora y secadora"),
  outdoorShower: v("outdoor-shower", "De buitendouche met uitzicht op zee en de palapa", "The outdoor shower overlooking the sea and the palapa", "La ducha exterior con vistas al mar y a la palapa"),
  palapaLounge: v("palapa-lounge", "Loungebedden onder de palapa aan zee", "Lounge beds under the palapa by the sea", "Camas balinesas bajo la palapa junto al mar"),
  poolDeck: v("pool-deck", "Het zwembad en de terrassen van Kas Daas", "The pool and terraces of Kas Daas", "La piscina y las terrazas de Kas Daas"),
  pool: v("pool", "Het zwembad met houten terras", "The pool with wooden deck", "La piscina con terraza de madera"),
  poolNight: v("pool-night", "Het verlichte zwembad bij avond", "The lit pool at night", "La piscina iluminada de noche"),
  sunLoungers: v("sun-loungers", "Ligbedden op het terras boven zee", "Sun loungers on the deck above the sea", "Tumbonas en la terraza sobre el mar"),
  bbqJetty: v("bbq-jetty", "De barbecue op het terras boven het water", "The barbecue on the deck above the water", "La barbacoa en la terraza sobre el agua"),
  bbq: v("bbq", "De gemetselde barbecue", "The built-in barbecue", "La barbacoa de obra"),
  diveGear: v("dive-gear-rinse", "Spoelbak en plek voor duikspullen", "Rinse tank and space for dive gear", "Tanque de enjuague y espacio para el equipo de buceo"),
  balcony: v("balcony", "Balkon met uitzicht op zee", "Balcony with sea view", "Balcón con vistas al mar"),
  deckSunset: v("deck-sunset", "Het terras bij zonsondergang", "The deck at sunset", "La terraza al atardecer"),
  sunsetGarden: v("sunset-garden", "Zonsondergang vanuit de tuin", "Sunset from the garden", "Atardecer desde el jardín"),
  gardenPool: v("garden-pool", "Tuin en zwembad in het avondlicht", "Garden and pool in the evening light", "Jardín y piscina con la luz del atardecer"),
  aerialCoast: v("aerial-coast", "Luchtfoto van de kust bij Kas Daas", "Aerial view of the coast at Kas Daas", "Vista aérea de la costa en Kas Daas"),
  aerialBoats: v("aerial-boats", "Luchtfoto van de kust met boten op het water", "Aerial view of the coast with boats on the water", "Vista aérea de la costa con barcos en el agua"),

  // Bonaire
  saltPans: b("salt-pans", "Zoutbergen bij de zoutpannen in het zuiden", "Salt mountains at the salt pans in the south", "Montañas de sal en las salinas del sur"),
  flamingos: b("flamingos", "Flamingo's boven het water", "Flamingos flying over the water", "Flamencos volando sobre el agua"),
  dolphins: b("dolphins", "Dolfijnen in helderblauw water", "Dolphins in clear blue water", "Delfines en aguas azules y cristalinas"),
  kitesurf: b("kitesurf-aerial", "Kitesurfers in turquoise water, van bovenaf", "Kitesurfers in turquoise water, from above", "Kitesurfistas en agua turquesa, vistos desde arriba"),
  kralendijk: b("kralendijk-harbour", "Kralendijk en de haven van bovenaf", "Kralendijk and its harbour from above", "Kralendijk y su puerto desde arriba"),
};
