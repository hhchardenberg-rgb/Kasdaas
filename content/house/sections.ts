import { l, todo } from "../_helpers";
import type { HouseSection } from "@/lib/types";
import { photos } from "../images";

/**
 * ─────────────────────────────────────────────────────────────────────────────
 *  VILLA GUIDE
 *  Each section becomes a page under /villa/<id>. Each topic becomes an
 *  expandable card. Add, remove or reorder topics freely — no code changes
 *  needed. Text written as todo("…") still has to be provided by the owner.
 *
 *  Rule of thumb: only describe what is actually true for Kas Daas.
 *  Topics marked `confirmPresence: true` should be removed if the facility
 *  does not exist.
 * ─────────────────────────────────────────────────────────────────────────────
 */

export const arrival: HouseSection = {
  id: "arrival",
  icon: "key",
  art: "villa",
  image: photos.exterior,
  eyebrow: l("Aankomst", "Arrival", "Llegada"),
  title: l("Welkom thuis", "Welcome home", "Bienvenido a casa"),
  intro: l(
    "Alles voor een ontspannen aankomst: de route, parkeren en hoe je binnenkomt.",
    "Everything for a relaxed arrival: the route, parking and how to get in.", "Todo para una llegada tranquila: la ruta, el aparcamiento y cómo entrar.",
  ),
  topics: [
    {
      id: "address",
      icon: "map-pin",
      title: l("Adres", "Address", "Dirección"),
      summary: l("Punt Vierkant 6A, Kralendijk", "Punt Vierkant 6A, Kralendijk", "Punt Vierkant 6A, Kralendijk"),
      body: [
        l("Punt Vierkant 6A, Belnem, Kralendijk — direct aan zee.", "Punt Vierkant 6A, Belnem, Kralendijk — right on the sea.", "Punt Vierkant 6A, Belnem, Kralendijk, justo frente al mar."),
        l("GPS: 12.1198683, -68.2914733", "GPS: 12.1198683, -68.2914733", "GPS: 12.1198683, -68.2914733"),
      ],
      keywords: ["adres", "address", "locatie", "location", "waar", "dirección", "ubicación"],
    },
    {
      id: "route",
      icon: "route",
      title: l("Route naar Kas Daas", "Getting to Kas Daas", "Cómo llegar a Kas Daas"),
      body: [
        todo("ROUTEBESCHRIJVING VANAF HET VLIEGVELD", "DIRECTIONS FROM THE AIRPORT", "RUTA DESDE EL AEROPUERTO"),
        todo("HERKENNINGSPUNTEN ONDERWEG / LAATSTE AFSLAG", "LANDMARKS ON THE WAY / FINAL TURN", "PUNTOS DE REFERENCIA EN EL CAMINO / ÚLTIMO GIRO"),
      ],
      tips: [
        l(
          "Gebruik de knop ‘Route’ hieronder om de navigatie op je telefoon te openen.",
          "Use the ‘Directions’ button below to open navigation on your phone.", "Usa el botón ‘Ruta’ de abajo para abrir la navegación en tu teléfono.",
        ),
      ],
      keywords: ["route", "directions", "navigatie", "vliegveld", "airport", "rijden", "ruta", "cómo llegar", "aeropuerto"],
    },
    {
      id: "parking",
      icon: "car",
      image: photos.parking,
      title: l("Parkeren", "Parking", "Aparcamiento"),
      body: [todo("WAAR PARKEREN BIJ DE VILLA / AANTAL PLEKKEN", "WHERE TO PARK AT THE VILLA / NUMBER OF SPOTS", "DÓNDE APARCAR EN LA VILLA / NÚMERO DE PLAZAS")],
      keywords: ["parkeren", "parking", "auto", "car", "aparcamiento", "aparcar", "coche"],
    },
    {
      id: "check-in",
      icon: "clock",
      title: l("Check-in", "Check-in", "Check-in"),
      summary: l("Inchecken vanaf 16:00 — daarna is de villa helemaal van jou.", "Check in from 4:00 pm — from then on, the villa is all yours.", "Check-in a partir de las 16:00; desde ese momento, la villa es toda tuya."),
      body: [
        l("Je kunt inchecken vanaf 16:00 uur.", "You can check in from 4:00 pm.", "Puedes hacer el check-in a partir de las 16:00."),
        l(
          "Bij check-in word je persoonlijk ontvangen. Je krijgt dan de tags, de sleutels en de polsbandjes.",
          "You'll be welcomed in person at check-in, when you receive the tags, keys and wristbands.", "Te recibiremos en persona en el check-in, donde te entregaremos los tags, las llaves y las pulseras.",
        ),
        todo("VROEGER AANKOMEN: MOGELIJKHEDEN", "ARRIVING EARLY: OPTIONS", "LLEGADA ANTICIPADA: OPCIONES"),
      ],
      keywords: ["check-in", "checkin", "inchecken", "aankomst", "arrival", "tijd", "llegada"],
    },
    {
      id: "access",
      icon: "key",
      title: l("Sleutel & toegang", "Keys & access", "Llaves y acceso"),
      summary: l("Tags voor de deuren, sleutels voor de kluis, waterdichte polsbandjes", "Tags for the doors, keys for the safe, waterproof wristbands", "Tags para las puertas, llaves para la caja fuerte, pulseras impermeables"),
      body: [
        l(
          "Je krijgt twee tags voor de buiten- en binnendeuren van het huis, en twee sleutels voor de kluis. De kluis heeft geen code — hij gaat alleen open met de sleutel.",
          "You'll receive two tags for the outer and inner doors of the house, and two keys for the safe. The safe has no code — it only opens with the key.", "Recibirás dos tags para las puertas exteriores e interiores de la casa y dos llaves de la caja fuerte. La caja fuerte no tiene código: solo se abre con la llave.",
        ),
        l(
          "Daarnaast krijg je twee waterdichte polsbandjes met een tag erin — die kun je gewoon omhouden als je gaat zwemmen of snorkelen.",
          "You'll also get two waterproof wristbands with a tag inside — you can simply keep them on when you go swimming or snorkeling.", "También recibirás dos pulseras impermeables con un tag dentro; puedes llevarlas puestas tranquilamente para nadar o hacer snorkel.",
        ),
        l(
          "Tags, sleutels en polsbandjes worden bij check-in persoonlijk overhandigd. De kluis staat in de laundry room.",
          "Tags, keys and wristbands are handed over in person at check-in. The safe is in the laundry room.", "Los tags, las llaves y las pulseras se entregan en persona en el check-in. La caja fuerte está en el cuarto de lavado.",
        ),
      ],
      tips: [
        l(
          "Houd tags en sleutels bij je en sluit de villa af als je weggaat.",
          "Keep the tags and keys with you and lock the villa whenever you leave.", "Lleva siempre contigo los tags y las llaves y cierra la villa cada vez que salgas.",
        ),
      ],
      keywords: ["sleutel", "sleutels", "key", "keys", "code", "toegang", "access", "deur", "door", "slot", "lock", "kluis", "safe", "tag", "polsbandje", "wristband", "bandje", "llave", "llaves", "acceso", "puerta", "cerradura", "caja fuerte", "pulsera"],
    },
    {
      id: "first-arrival",
      icon: "sparkles",
      title: l("De eerste momenten", "Your first moments", "Tus primeros momentos"),
      body: [
        l(
          "Zet je tassen neer, open de deuren naar buiten en kom even aan. Een paar dingen die handig zijn om meteen te doen:",
          "Drop your bags, open the doors to the outside and take a moment to arrive. A few things worth doing straight away:", "Deja las maletas, abre las puertas al exterior y tómate un momento para llegar. Algunas cosas que conviene hacer enseguida:",
        ),
      ],
      steps: [
        l("Verbind met de wifi (zie WiFi).", "Connect to the WiFi (see WiFi).", "Conéctate al wifi (ver Wifi)."),
        l("Zet de airco aan in de slaapkamers die je gebruikt.", "Switch on the air conditioning in the bedrooms you'll use.", "Enciende el aire acondicionado en los dormitorios que vayas a usar."),
        l("Zet deze gids op je beginscherm — dan heb je alles altijd bij de hand.", "Add this guide to your home screen — so everything is always at hand.", "Añade esta guía a tu pantalla de inicio, así lo tendrás todo siempre a mano."),
        todo("OVERIGE AANDACHTSPUNTEN BIJ AANKOMST (BIJV. WELKOMSTPAKKET)", "OTHER ARRIVAL NOTES (E.G. WELCOME PACK)", "OTRAS NOTAS DE LLEGADA (P. EJ. PAQUETE DE BIENVENIDA)"),
      ],
      keywords: ["aankomst", "arrival", "eerste", "first", "welkom", "welcome", "llegada", "primero", "bienvenida"],
    },
    {
      id: "contact-person",
      icon: "user",
      title: l("Jouw contactpersoon", "Your contact person", "Tu persona de contacto"),
      body: [
        l(
          "Dennis is de house manager van Kas Daas. Heb je een vraag, gaat er iets mis of kun je hulp gebruiken? Bel of app hem gerust.",
          "Dennis is the house manager of Kas Daas. Got a question, something not working, or need a hand? Feel free to call or message him.", "Dennis es el encargado de Kas Daas. ¿Tienes una pregunta, algo no funciona o necesitas ayuda? No dudes en llamarle o escribirle.",
        ),
        todo("BEREIKBAARHEID CONTACTPERSOON", "AVAILABILITY OF CONTACT PERSON", "DISPONIBILIDAD DE LA PERSONA DE CONTACTO"),
      ],
      keywords: ["contact", "beheerder", "host", "manager", "house manager", "dennis", "telefoon", "phone", "whatsapp", "anfitrión", "encargado", "teléfono"],
    },
  ],
};

export const houseRules: HouseSection = {
  id: "house-rules",
  icon: "scroll",
  art: "villa",
  image: photos.livingLounge,
  eyebrow: l("Huisregels", "House rules", "Normas de la casa"),
  title: l("Huisregels", "House rules", "Normas de la casa"),
  intro: l(
    "Een paar afspraken, zodat iedereen — ook de buren — kan genieten van Kas Daas.",
    "A few agreements, so everyone — the neighbours included — can enjoy Kas Daas.", "Unos pocos acuerdos para que todos, vecinos incluidos, puedan disfrutar de Kas Daas.",
  ),
  topics: [
    {
      id: "check-in-out-times",
      icon: "clock",
      title: l("Check-in & check-out", "Check-in & check-out", "Check-in y check-out"),
      summary: l("Inchecken vanaf 16:00 · uitchecken tot 10:00", "Check in from 4:00 pm · check out by 10:00 am", "Check-in desde las 16:00 · check-out antes de las 10:00"),
      body: [
        l("Je kunt inchecken vanaf 16:00 uur en uitchecken tot 10:00 uur.", "You can check in from 4:00 pm and check out until 10:00 am.", "Puedes hacer el check-in a partir de las 16:00 y el check-out hasta las 10:00."),
      ],
      keywords: ["check-in", "check-out", "inchecken", "uitchecken", "tijd", "time", "16:00", "10:00", "huisregels", "house rules", "hora", "normas de la casa"],
    },
    {
      id: "minimum-age",
      icon: "id-card",
      title: l("Minimumleeftijd", "Minimum age", "Edad mínima"),
      summary: l("De hoofdhuurder is minimaal 21 jaar", "The main renter must be at least 21", "El titular de la reserva debe tener al menos 21 años"),
      body: [l("De minimumleeftijd om Kas Daas te huren is 21 jaar.", "The minimum age to rent Kas Daas is 21.", "La edad mínima para alquilar Kas Daas es de 21 años.")],
      keywords: ["leeftijd", "age", "21", "minimumleeftijd", "minimum age", "huren", "rent", "edad", "edad mínima", "alquilar"],
    },
    {
      id: "children",
      icon: "baby",
      title: l("Kinderen", "Children", "Niños"),
      summary: l("Kinderen van 0–17 jaar zijn welkom", "Children aged 0–17 are welcome", "Los niños de 0 a 17 años son bienvenidos"),
      body: [l("Kinderen van 0 tot en met 17 jaar zijn welkom.", "Children aged 0 to 17 are welcome.", "Los niños de 0 a 17 años son bienvenidos.")],
      tips: [
        l(
          "Houd jonge kinderen altijd in het oog: de villa heeft steile trappen en er is geen hek rond het zwembad en langs de zeekant.",
          "Always keep an eye on young children: the villa has steep stairs and there is no fence around the pool or along the sea edge.", "Vigila siempre a los niños pequeños: la villa tiene escaleras empinadas y no hay valla alrededor de la piscina ni junto al borde del mar.",
        ),
      ],
      keywords: ["kinderen", "children", "kids", "baby", "gezin", "family", "niños", "bebé", "familia"],
    },
    {
      id: "pets",
      icon: "dog",
      title: l("Huisdieren", "Pets", "Mascotas"),
      summary: l("Eén hond tot 10 kg is welkom", "One dog under 10 kg is welcome", "Se admite un perro de menos de 10 kg"),
      body: [
        l(
          "Honden die minder dan 10 kg wegen zijn toegestaan, met een maximum van één huisdier. Andere huisdieren zijn niet toegestaan.",
          "Dogs weighing less than 10 kg are allowed, with a maximum of one pet. Other pets are not allowed.", "Se admiten perros de menos de 10 kg, con un máximo de una mascota. No se admiten otras mascotas.",
        ),
      ],
      keywords: ["huisdier", "huisdieren", "pet", "pets", "hond", "dog", "kat", "cat", "mascota", "mascotas", "perro", "gato"],
    },
    {
      id: "events",
      icon: "party",
      title: l("Evenementen & feesten", "Events & parties", "Eventos y fiestas"),
      summary: l("Geen evenementen toegestaan", "No events allowed", "No se permiten eventos"),
      body: [l("Evenementen en feesten zijn in Kas Daas niet toegestaan.", "Events and parties are not allowed at Kas Daas.", "No se permiten eventos ni fiestas en Kas Daas.")],
      keywords: ["evenement", "evenementen", "event", "events", "feest", "party", "feestje", "bruiloft", "wedding", "evento", "eventos", "fiesta", "boda"],
    },
    {
      id: "smoking",
      icon: "no-smoking",
      title: l("Roken", "Smoking", "Fumar"),
      summary: l("Alleen buiten roken", "Smoking outside only", "Solo se fuma fuera"),
      body: [l("Binnen roken is niet toegestaan. Buiten roken mag wel.", "Smoking is not allowed indoors. Smoking outside is fine.", "No está permitido fumar dentro. Fuera sí se puede fumar.")],
      keywords: ["roken", "smoking", "smoke", "sigaret", "cigarette", "vapen", "vape", "fumar", "tabaco", "cigarrillo"],
    },
  ],
};

export const villa: HouseSection = {
  id: "your-villa",
  icon: "home",
  art: "interior",
  image: photos.livingOcean,
  eyebrow: l("Jouw villa", "Your villa", "Tu villa"),
  title: l("Over Kas Daas", "About Kas Daas", "Sobre Kas Daas"),
  intro: l(
    "Ruimte, licht en rust. Hier vind je hoe de villa in elkaar zit en wat je waar vindt.",
    "Space, light and calm. Here's how the villa is laid out and where to find things.", "Espacio, luz y calma. Así está distribuida la villa y aquí encontrarás cada cosa.",
  ),
  topics: [
    {
      id: "welcome",
      icon: "home",
      title: l("Welkom in Kas Daas", "Welcome to Kas Daas", "Bienvenido a Kas Daas"),
      feature: true,
      art: "villa",
      image: photos.villaFromSea,
      // Based on the owner's Vrbo listing — adjust freely.
      summary: l("Direct aan zee, in Belnem · 3 slaapkamers · tot 7 gasten", "Right on the sea, in Belnem · 3 bedrooms · up to 7 guests", "Frente al mar, en Belnem · 3 dormitorios · hasta 7 huéspedes"),
      body: [
        l(
          "Kas Daas ligt direct aan de oceaan in Belnem, in het zuiden van Kralendijk. De villa is ontworpen door de Nederlandse ontwerper Piet Boon: natuurlijke materialen, ruime terrassen, een eigen zwembad en een prachtige Viking-keuken.",
          "Kas Daas sits right on the ocean in Belnem, in the south of Kralendijk. The villa was designed by Dutch designer Piet Boon: natural materials, generous terraces, a private pool and a beautiful Viking kitchen.", "Kas Daas está justo frente al océano en Belnem, al sur de Kralendijk. La villa fue diseñada por el diseñador neerlandés Piet Boon: materiales naturales, amplias terrazas, piscina privada y una preciosa cocina Viking.",
        ),
        l(
          "De passaatwind waait uit het oosten dwars door het huis, de zee ligt aan je voeten en het rif begint vlak voor de deur — ideaal voor duikers en snorkelaars.",
          "The trade wind blows from the east right through the house, the sea is at your feet and the reef starts just off the property — ideal for divers and snorkelers.", "El alisio sopla desde el este a través de toda la casa, el mar está a tus pies y el arrecife empieza justo delante de la propiedad: ideal para buceadores y amantes del snorkel.",
        ),
        todo("PERSOONLIJKE WELKOMSTWOORDEN VAN DE EIGENAAR (OPTIONEEL)", "PERSONAL WELCOME FROM THE OWNER (OPTIONAL)", "BIENVENIDA PERSONAL DEL PROPIETARIO (OPCIONAL)"),
      ],
      tips: [
        l(
          "Let op met jonge kinderen: de villa heeft steile trappen en er is geen hek rond het zwembad en langs de zeekant.",
          "Please take care with young children: the villa has steep stairs and there is no fence around the pool or along the sea edge.", "Ten cuidado con los niños pequeños: la villa tiene escaleras empinadas y no hay valla alrededor de la piscina ni junto al borde del mar.",
        ),
      ],
      keywords: ["villa", "kas daas", "over", "about", "sobre"],
    },
    {
      id: "living",
      icon: "sofa",
      image: photos.livingDining,
      title: l("Woonkamer", "Living room", "Salón"),
      body: [todo("OMSCHRIJVING WOONKAMER EN BIJZONDERHEDEN", "DESCRIPTION OF THE LIVING ROOM AND DETAILS", "DESCRIPCIÓN DEL SALÓN Y DETALLES")],
      keywords: ["woonkamer", "living", "lounge", "bank", "sofa", "salón", "sofá"],
    },
    {
      id: "kitchen",
      icon: "chef-hat",
      image: photos.kitchenBar,
      title: l("Keuken", "Kitchen", "Cocina"),
      body: [
        todo("OMSCHRIJVING KEUKEN: WAT IS AANWEZIG, WAAR STAAT WAT", "KITCHEN DESCRIPTION: WHAT'S THERE, WHERE THINGS ARE", "DESCRIPCIÓN DE LA COCINA: QUÉ HAY Y DÓNDE ESTÁ CADA COSA"),
      ],
      tips: [l("Uitleg per apparaat vind je onder Comfort & apparatuur.", "Instructions per appliance are under Comfort & appliances.", "Las instrucciones de cada aparato están en Confort y aparatos.")],
      keywords: ["keuken", "kitchen", "koken", "cooking", "servies", "pannen", "cocina", "cocinar"],
    },
    {
      id: "bedrooms",
      icon: "bed",
      image: photos.bedroomOcean,
      title: l("Slaapkamers", "Bedrooms", "Dormitorios"),
      body: [
        l("Kas Daas heeft 3 slaapkamers en biedt plaats aan maximaal 7 gasten.", "Kas Daas has 3 bedrooms and sleeps up to 7 guests.", "Kas Daas tiene 3 dormitorios y capacidad para hasta 7 huéspedes."),
        l("Iedere slaapkamer heeft een tweepersoonsbed en airconditioning.", "Every bedroom has a double bed and air conditioning.", "Cada dormitorio tiene una cama doble y aire acondicionado."),
      ],
      keywords: ["slaapkamer", "bedroom", "bed", "slapen", "sleep", "kussen", "pillow", "dormitorio", "habitación", "cama", "dormir", "almohada"],
    },
    {
      id: "bathrooms",
      icon: "bath",
      image: photos.bathroom,
      title: l("Badkamers", "Bathrooms", "Baños"),
      summary: l("Twee badkamers en een buitendouche", "Two bathrooms and an outdoor shower", "Dos baños y una ducha exterior"),
      body: [
        l("Kas Daas heeft twee badkamers en een buitendouche.", "Kas Daas has two bathrooms and an outdoor shower.", "Kas Daas tiene dos baños y una ducha exterior."),
        todo("HANDDOEKEN EN TOILETARTIKELEN (WAT IS AANWEZIG)", "TOWELS AND TOILETRIES (WHAT'S PROVIDED)", "TOALLAS Y ARTÍCULOS DE ASEO (QUÉ SE INCLUYE)"),
      ],
      keywords: ["badkamer", "bathroom", "douche", "shower", "toilet", "handdoek", "towel", "baño", "ducha", "toalla", "toallas"],
    },
    {
      id: "linen",
      icon: "shirt",
      image: photos.linen,
      title: l("Handdoeken & beddengoed", "Towels & linen", "Toallas y ropa de cama"),
      body: [todo("HANDDOEKEN, STRANDLAKENS EN BEDDENGOED: WAAR EN HOE WISSELEN", "TOWELS, BEACH TOWELS AND LINEN: WHERE AND HOW TO SWAP", "TOALLAS, TOALLAS DE PLAYA Y ROPA DE CAMA: DÓNDE Y CÓMO CAMBIARLAS")],
      keywords: ["handdoek", "towel", "strandlaken", "beach towel", "beddengoed", "linen", "lakens", "toalla", "toallas", "toalla de playa", "ropa de cama", "sábanas"],
    },
  ],
};

export const comfort: HouseSection = {
  id: "comfort",
  icon: "wind",
  art: "interior",
  image: photos.kitchen,
  eyebrow: l("Comfort", "Comfort", "Confort"),
  title: l("Comfort & apparatuur", "Comfort & appliances", "Confort y aparatos"),
  intro: l(
    "Hoe alles werkt — van airco tot koffiemachine. Kort en duidelijk.",
    "How everything works — from air conditioning to the coffee machine. Short and clear.", "Cómo funciona todo, del aire acondicionado a la cafetera. Breve y claro.",
  ),
  topics: [
    {
      id: "airco",
      icon: "thermometer",
      title: l("Airconditioning", "Air conditioning", "Aire acondicionado"),
      summary: l("In iedere slaapkamer", "In every bedroom", "En cada dormitorio"),
      body: [
        l("Iedere slaapkamer heeft airconditioning.", "Every bedroom has air conditioning.", "Todos los dormitorios tienen aire acondicionado."),
        todo("UITLEG AIRCO: AFSTANDSBEDIENING, STANDEN, IDEALE TEMPERATUUR", "AIR CONDITIONING: REMOTE, MODES, IDEAL TEMPERATURE", "AIRE ACONDICIONADO: MANDO, MODOS, TEMPERATURA IDEAL"),
      ],
      steps: [todo("STAP 1 AIRCO AANZETTEN", "STEP 1 TURN ON AIR CONDITIONING", "PASO 1 ENCENDER EL AIRE ACONDICIONADO"), todo("STAP 2 TEMPERATUUR INSTELLEN", "STEP 2 SET TEMPERATURE", "PASO 2 AJUSTAR LA TEMPERATURA")],
      tips: [
        l(
          "Houd ramen en deuren dicht als de airco aan staat — dan koelt de kamer sneller en blijven muggen buiten.",
          "Keep windows and doors closed while the air conditioning is on — the room cools faster and mosquitoes stay out.", "Mantén ventanas y puertas cerradas con el aire acondicionado encendido: la habitación se enfría antes y los mosquitos se quedan fuera.",
        ),
      ],
      keywords: ["airco", "airconditioning", "air conditioning", "ac", "a/c", "koeling", "cooling", "temperatuur", "warm", "hot", "aire acondicionado", "aire", "frío", "calor"],
    },
    {
      id: "fans",
      icon: "fan",
      title: l("Ventilatoren", "Fans", "Ventiladores"),
      summary: l("Woonkamer: grote zwarte afstandsbediening — 1 = uit, 2 = aan", "Living room: big black remote — 1 = off, 2 = on", "Salón: mando negro grande — 1 = apagado, 2 = encendido"),
      body: [l("In de woonkamer hangt een ventilator. Die bedien je met de grote zwarte afstandsbediening.", "There's a fan in the living room. You control it with the big black remote.", "En el salón hay un ventilador. Se maneja con el mando negro grande.")],
      steps: [
        l("Pak de grote zwarte afstandsbediening.", "Take the big black remote.", "Coge el mando negro grande."),
        l("Druk op 2 om de ventilator aan te zetten.", "Press 2 to switch the fan on.", "Pulsa 2 para encender el ventilador."),
        l("Druk op 1 om hem weer uit te zetten.", "Press 1 to switch it off again.", "Pulsa 1 para volver a apagarlo."),
      ],
      keywords: ["ventilator", "fan", "plafond", "ceiling", "ventilador", "techo"],
    },
    {
      id: "hot-water",
      icon: "droplets",
      title: l("Warm water", "Hot water", "Agua caliente"),
      body: [todo("HOE WERKT WARM WATER (BOILER / ZONNEBOILER / DOORSTROOM)", "HOW HOT WATER WORKS (BOILER / SOLAR / TANKLESS)", "CÓMO FUNCIONA EL AGUA CALIENTE (CALDERA / SOLAR / INSTANTÁNEA)")],
      keywords: ["warm water", "hot water", "boiler", "douche", "shower", "agua caliente", "ducha"],
    },
    {
      id: "lighting",
      icon: "lightbulb",
      title: l("Verlichting", "Lighting", "Iluminación"),
      body: [todo("SCHAKELAARS, DIMMERS EN BUITENVERLICHTING", "SWITCHES, DIMMERS AND OUTDOOR LIGHTING", "INTERRUPTORES, REGULADORES E ILUMINACIÓN EXTERIOR")],
      keywords: ["licht", "light", "lamp", "verlichting", "lighting", "schakelaar", "switch", "luz", "iluminación", "interruptor"],
    },
    {
      id: "sockets",
      icon: "plug",
      title: l("Stopcontacten & stroom", "Sockets & power", "Enchufes y electricidad"),
      body: [todo("STEKKERTYPE, SPANNING EN WAAR ADAPTERS LIGGEN", "PLUG TYPE, VOLTAGE AND WHERE ADAPTERS ARE", "TIPO DE ENCHUFE, VOLTAJE Y DÓNDE ESTÁN LOS ADAPTADORES")],
      keywords: ["stopcontact", "socket", "stekker", "plug", "adapter", "stroom", "power", "voltage", "opladen", "charge", "enchufe", "adaptador", "electricidad", "luz", "cargar"],
    },
    {
      id: "tv",
      icon: "tv",
      title: l("Televisie", "Television", "Televisión"),
      body: [todo("TV: AFSTANDSBEDIENING, STREAMING-APPS, INLOGGEN", "TV: REMOTE, STREAMING APPS, LOGGING IN", "TV: MANDO, APPS DE STREAMING, INICIO DE SESIÓN")],
      keywords: ["tv", "televisie", "television", "netflix", "streaming", "chromecast", "televisión", "tele"],
    },
    {
      id: "audio",
      icon: "speaker",
      title: l("Muziek & audio", "Music & audio", "Música y audio"),
      body: [todo("AUDIOSYSTEEM / BLUETOOTH SPEAKER: HOE VERBINDEN", "AUDIO SYSTEM / BLUETOOTH SPEAKER: HOW TO CONNECT", "EQUIPO DE AUDIO / ALTAVOZ BLUETOOTH: CÓMO CONECTAR")],
      keywords: ["muziek", "music", "speaker", "audio", "bluetooth", "sonos", "música", "altavoz"],
    },
    {
      id: "hob",
      icon: "flame",
      image: photos.hob,
      title: l("Kookplaat", "Hob", "Placa de cocina"),
      summary: l("Professioneel Viking-gasfornuis", "Professional Viking gas hob", "Placa de gas profesional Viking"),
      body: [todo("BEDIENING GASFORNUIS (AANSTEKEN, GASFLES, VEILIGHEID)", "HOW TO USE THE GAS HOB (LIGHTING, GAS BOTTLE, SAFETY)", "CÓMO USAR LA PLACA DE GAS (ENCENDIDO, BOMBONA, SEGURIDAD)")],
      keywords: ["kookplaat", "hob", "stove", "inductie", "induction", "gas", "koken", "placa", "fogones", "cocina"],
    },
    {
      id: "oven",
      icon: "cooking-pot",
      title: l("Oven", "Oven", "Horno"),
      body: [todo("BEDIENING OVEN", "HOW TO USE THE OVEN", "CÓMO USAR EL HORNO")],
      keywords: ["oven", "bakken", "bake", "horno", "hornear"],
    },
    {
      id: "microwave",
      icon: "microwave",
      title: l("Magnetron", "Microwave", "Microondas"),
      body: [todo("BEDIENING MAGNETRON", "HOW TO USE THE MICROWAVE", "CÓMO USAR EL MICROONDAS")],
      keywords: ["magnetron", "microwave", "microondas"],
    },
    {
      id: "fridge",
      icon: "refrigerator",
      title: l("Koelkast & vriezer", "Fridge & freezer", "Nevera y congelador"),
      body: [todo("KOELKAST/VRIEZER: LOCATIE, IJSBLOKJES, BIJZONDERHEDEN", "FRIDGE/FREEZER: LOCATION, ICE, DETAILS", "NEVERA/CONGELADOR: UBICACIÓN, HIELO, DETALLES")],
      keywords: ["koelkast", "fridge", "vriezer", "freezer", "ijs", "ice", "ijsblokjes", "nevera", "frigorífico", "congelador", "hielo"],
    },
    {
      id: "dishwasher",
      icon: "dishwasher",
      title: l("Vaatwasser", "Dishwasher", "Lavavajillas"),
      body: [todo("VAATWASSER: TABLETS, PROGRAMMA, STARTEN", "DISHWASHER: TABLETS, PROGRAM, START", "LAVAVAJILLAS: PASTILLAS, PROGRAMA, INICIO")],
      keywords: ["vaatwasser", "dishwasher", "afwas", "vaat", "dishes", "lavavajillas", "platos"],
    },
    {
      id: "coffee",
      icon: "coffee",
      title: l("Koffiezetapparaat", "Coffee machine", "Cafetera"),
      body: [todo("TYPE KOFFIEAPPARAAT EN HOE HET WERKT (CUPS/BONEN)", "TYPE OF COFFEE MACHINE AND HOW IT WORKS (PODS/BEANS)", "TIPO DE CAFETERA Y CÓMO FUNCIONA (CÁPSULAS/GRANO)")],
      keywords: ["koffie", "coffee", "espresso", "nespresso", "thee", "tea", "waterkoker", "kettle", "café", "té", "hervidor"],
    },
    {
      id: "washing-machine",
      icon: "washing-machine",
      image: photos.laundry,
      title: l("Wasmachine", "Washing machine", "Lavadora"),
      body: [
        l("Wasmachine en droger staan in de laundry room. Wil je tussendoor je was doen? Dat kan gewoon.", "The washer and dryer are in the laundry room. Want to do some laundry during your stay? Go right ahead.", "La lavadora y la secadora están en el cuarto de lavado. ¿Quieres hacer una colada durante tu estancia? Adelante."),
        todo("WASMIDDEL EN PROGRAMMA", "DETERGENT AND PROGRAM", "DETERGENTE Y PROGRAMA"),
      ],
      keywords: ["wasmachine", "washing machine", "was", "laundry", "droger", "dryer", "wasmiddel", "lavadora", "colada", "ropa", "secadora"],
    },
  ],
};

export const outdoor: HouseSection = {
  id: "outdoor-living",
  icon: "sun",
  art: "terrace",
  image: photos.poolDeck,
  eyebrow: l("Outdoor living", "Outdoor living", "Vida al aire libre"),
  title: l("Buiten leven", "Life outdoors", "La vida al aire libre"),
  intro: l(
    "Op Bonaire speelt het leven zich buiten af. Ontbijt in de ochtendzon, afspoelen na de zee, borrelen als de lucht roze kleurt.",
    "On Bonaire, life happens outside. Breakfast in the morning sun, a rinse after the sea, drinks as the sky turns pink.", "En Bonaire, la vida se hace fuera. Desayuno al sol de la mañana, una ducha después del mar, una copa mientras el cielo se vuelve rosa.",
  ),
  topics: [
    {
      id: "outdoor-shower",
      icon: "shower-head",
      title: l("Buitendouche", "Outdoor shower", "Ducha exterior"),
      feature: true,
      art: "shower",
      image: photos.outdoorShower,
      // Example copy — adjust freely.
      summary: l(
        "Even afspoelen na een ochtend in zee? Gebruik de buitendouche voordat je het terras of de villa weer in gaat.",
        "Back from the sea? Rinse off under the outdoor shower before heading back inside.", "¿Vuelves del mar? Date una ducha en la ducha exterior antes de entrar.",
      ),
      body: [
        todo("LOCATIE VAN DE BUITENDOUCHE", "LOCATION OF THE OUTDOOR SHOWER", "UBICACIÓN DE LA DUCHA EXTERIOR"),
        todo("BEDIENING EN WARM/KOUD WATER", "HOW IT WORKS AND HOT/COLD WATER", "CÓMO FUNCIONA Y AGUA CALIENTE/FRÍA"),
        todo("HANDDOEKEN VOOR BUITEN / PRAKTISCHE AANDACHTSPUNTEN", "OUTDOOR TOWELS / PRACTICAL NOTES", "TOALLAS DE EXTERIOR / NOTAS PRÁCTICAS"),
      ],
      tips: [
        l(
          "Spoel ook je snorkelspullen en zwemkleding even af — zout en zand blijven zo buiten.",
          "Give your snorkel gear and swimwear a quick rinse too — it keeps salt and sand outside.", "Enjuaga también el equipo de snorkel y el bañador: así la sal y la arena se quedan fuera.",
        ),
      ],
      keywords: ["buitendouche", "outdoor shower", "douche", "shower", "afspoelen", "rinse", "zout", "salt", "zand", "sand", "ducha exterior", "ducha", "enjuagar", "sal", "arena"],
    },
    {
      id: "terrace",
      icon: "armchair",
      title: l("Terras & lounge", "Terrace & lounge", "Terraza y zona lounge"),
      art: "terrace",
      image: photos.palapaLounge,
      summary: l("Loungen onder de palapa, met de zee onder je", "Lounging under the palapa, with the sea below you", "Relájate bajo la palapa, con el mar a tus pies"),
      body: [todo("OMSCHRIJVING TERRAS, LOUNGE EN KUSSENS (BIJV. BIJ REGEN BINNENZETTEN)", "DESCRIPTION OF TERRACE, LOUNGE AND CUSHIONS (E.G. BRING IN WHEN IT RAINS)", "DESCRIPCIÓN DE TERRAZA, LOUNGE Y COJINES (P. EJ. METERLOS SI LLUEVE)")],
      keywords: ["terras", "terrace", "lounge", "buiten", "outside", "kussens", "cushions", "terraza", "fuera", "exterior", "cojines"],
    },
    {
      id: "outdoor-dining",
      icon: "utensils",
      image: photos.balcony,
      title: l("Buiten eten", "Dining outdoors", "Comer al aire libre"),
      body: [todo("BUITENEETTAFEL EN BIJZONDERHEDEN", "OUTDOOR DINING TABLE AND DETAILS", "MESA DE COMEDOR EXTERIOR Y DETALLES")],
      keywords: ["eettafel", "dining", "buiten eten", "diner", "comedor"],
    },
    {
      id: "pool",
      icon: "waves",
      title: l("Zwembad", "Pool", "Piscina"),
      art: "pool",
      image: photos.pool,
      summary: l("Je eigen privézwembad", "Your own private pool", "Tu propia piscina privada"),
      body: [
        l("De zwembadverlichting gaat 's avonds automatisch aan.", "The pool lights switch on automatically in the evening.", "Las luces de la piscina se encienden automáticamente por la noche."),
        todo("ZWEMBAD: REGELS EN ONDERHOUD", "POOL: RULES AND MAINTENANCE", "PISCINA: NORMAS Y MANTENIMIENTO"),
      ],
      tips: [
        l("Er is geen hek rond het zwembad — houd kinderen altijd in het oog.", "There is no fence around the pool — always keep an eye on children.", "No hay valla alrededor de la piscina: vigila siempre a los niños."),
      ],
      keywords: ["zwembad", "pool", "zwemmen", "swim", "zwembadlicht", "pool light", "verlichting", "lights", "piscina", "nadar", "luz de la piscina", "luces"],
    },
    {
      id: "sunbeds",
      icon: "sun",
      title: l("Ligbedden", "Sun loungers", "Tumbonas"),
      image: photos.sunLoungers,
      body: [todo("LIGBEDDEN, PARASOLS EN KUSSENS", "SUN LOUNGERS, PARASOLS AND CUSHIONS", "TUMBONAS, SOMBRILLAS Y COJINES")],
      keywords: ["ligbed", "sunbed", "lounger", "parasol", "umbrella", "tumbona", "sombrilla"],
    },
    {
      id: "bbq",
      icon: "flame",
      title: l("Barbecue", "Barbecue", "Barbacoa"),
      image: photos.bbqJetty,
      summary: l("Grillen op het terras boven het water", "Grilling on the deck above the water", "A la parrilla en la terraza sobre el agua"),
      body: [todo("BBQ: BEDIENING, GAS/HOUTSKOOL, SCHOONMAKEN", "BBQ: HOW TO USE, GAS/CHARCOAL, CLEANING", "BARBACOA: USO, GAS/CARBÓN, LIMPIEZA")],
      keywords: ["bbq", "barbecue", "grill", "buitenkeuken", "outdoor kitchen", "barbacoa", "parrilla"],
    },
    {
      id: "outdoor-lighting",
      icon: "lightbulb",
      title: l("Buitenverlichting", "Outdoor lighting", "Iluminación exterior"),
      body: [todo("SCHAKELAARS BUITENVERLICHTING / TIMERS", "OUTDOOR LIGHT SWITCHES / TIMERS", "INTERRUPTORES / TEMPORIZADORES DE LUZ EXTERIOR")],
      keywords: ["buitenverlichting", "outdoor lights", "licht", "light", "luz"],
    },
    {
      id: "garden",
      icon: "trees",
      title: l("Tuin", "Garden", "Jardín"),
      image: photos.gardenPool,
      body: [todo("TUIN: BIJZONDERHEDEN, PLANTEN, TUINMAN", "GARDEN: DETAILS, PLANTS, GARDENER", "JARDÍN: DETALLES, PLANTAS, JARDINERO")],
      keywords: ["tuin", "garden", "planten", "plants", "tuinman", "gardener", "jardín", "plantas", "jardinero"],
    },
    {
      id: "gear-drying",
      icon: "fish",
      image: photos.diveGear,
      title: l("Snorkel- & duikspullen", "Snorkel & dive gear", "Equipo de snorkel y buceo"),
      body: [
        todo("WAAR KUN JE SPULLEN AFSPOELEN EN DROGEN (RINSE-AREA / DROOGREK)", "WHERE TO RINSE AND DRY GEAR (RINSE AREA / DRYING RACK)", "DÓNDE ENJUAGAR Y SECAR EL EQUIPO (ZONA DE ENJUAGUE / TENDEDERO)"),
        todo("AANWEZIGE SNORKELSETS / ZWEMVESTEN (INDIEN VAN TOEPASSING)", "SNORKEL SETS / VESTS PROVIDED (IF ANY)", "EQUIPOS DE SNORKEL / CHALECOS DISPONIBLES (SI LOS HAY)"),
      ],
      keywords: ["snorkel", "duik", "dive", "gear", "spullen", "drogen", "dry", "afspoelen", "rinse", "wetsuit", "bucear", "buceo", "equipo", "secar", "enjuagar", "neopreno"],
    },
  ],
};

export const island: HouseSection = {
  id: "island-living",
  icon: "leaf",
  art: "nature",
  image: photos.sunsetGarden,
  eyebrow: l("Belangrijk op Bonaire", "Good to know here", "Bueno saber aquí"),
  title: l("Wonen op Bonaire", "Island living", "Vida en la isla"),
  intro: l(
    "Bonaire is anders dan thuis — en dat is precies de charme. Een paar dingen die je verblijf in de villa nog fijner maken.",
    "Bonaire is different from home — that's exactly the charm. A few things that make your stay at the villa even better.", "Bonaire es distinto a casa, y precisamente ahí está su encanto. Algunas cosas que harán tu estancia en la villa aún mejor.",
  ),
  topics: [
    {
      id: "water-use",
      icon: "droplets",
      title: l("Water", "Water", "Agua"),
      body: [
        l(
          "Drinkwater op Bonaire wordt gemaakt uit zeewater. Ga er dus zuinig mee om — korte douches helpen echt.",
          "Water on Bonaire is made from seawater. Please use it wisely — short showers really help.", "En Bonaire el agua se obtiene del mar. Úsala con cabeza: las duchas cortas ayudan mucho.",
        ),
        todo("SPECIFIEK VOOR KAS DAAS (BIJV. WATERTANK, WATERDRUK)", "SPECIFIC TO KAS DAAS (E.G. WATER TANK, PRESSURE)", "ESPECÍFICO DE KAS DAAS (P. EJ. DEPÓSITO DE AGUA, PRESIÓN)"),
      ],
      keywords: ["water", "douche", "shower", "zuinig", "agua", "ducha"],
    },
    {
      id: "drinking-water",
      icon: "glass-water",
      title: l("Drinkwater", "Drinking water", "Agua potable"),
      summary: l("Het kraanwater kun je gewoon drinken", "You can drink the tap water", "El agua del grifo es potable"),
      body: [l("Het kraanwater in Kas Daas kun je gewoon drinken.", "The tap water at Kas Daas is fine to drink.", "El agua del grifo de Kas Daas se puede beber sin problema.")],
      keywords: ["drinkwater", "drinking water", "kraanwater", "tap water", "flessen", "bottled", "agua potable", "agua del grifo", "embotellada"],
    },
    {
      id: "electricity",
      icon: "zap",
      title: l("Elektriciteit", "Electricity", "Electricidad"),
      body: [
        l(
          "Stroom is kostbaar op het eiland. Zet airco en lampen uit als je weggaat.",
          "Power is precious on the island. Switch off air conditioning and lights when you head out.", "La electricidad es valiosa en la isla. Apaga el aire acondicionado y las luces cuando salgas.",
        ),
        todo("BIJZONDERHEDEN STROOM IN DE VILLA (ZONNEPANELEN, STOPPENKAST)", "POWER DETAILS AT THE VILLA (SOLAR PANELS, FUSE BOX)", "DETALLES ELÉCTRICOS DE LA VILLA (PANELES SOLARES, CUADRO ELÉCTRICO)"),
      ],
      keywords: ["stroom", "electricity", "power", "elektriciteit", "stoppenkast", "fuse", "electricidad", "luz", "fusible", "cuadro eléctrico"],
    },
    {
      id: "mosquitoes",
      icon: "bug",
      title: l("Muggen", "Mosquitoes", "Mosquitos"),
      body: [
        l(
          "Vooral rond zonsopkomst en -ondergang en na regen zijn er muggen. Houd deuren en ramen dicht als het licht aan is en gebruik anti-muggenmiddel.",
          "Mosquitoes are most active around sunrise, sunset and after rain. Keep doors and windows closed when the lights are on and use repellent.", "Los mosquitos están más activos al amanecer, al atardecer y después de la lluvia. Cierra puertas y ventanas cuando tengas las luces encendidas y usa repelente.",
        ),
        todo("WAAR LIGGEN ANTI-MUGGENMIDDELEN / HORREN", "WHERE TO FIND MOSQUITO REPELLENT / SCREENS", "DÓNDE HAY REPELENTE / MOSQUITERAS"),
      ],
      keywords: ["muggen", "mosquito", "mosquitoes", "insecten", "insects", "deet", "bite", "mosquitos", "insectos", "picadura"],
    },
    {
      id: "doors-windows",
      icon: "door-open",
      title: l("Deuren & ramen", "Doors & windows", "Puertas y ventanas"),
      body: [todo("DEUREN/RAMEN: SLUITEN BIJ VERTREK, SCHUIFPUIEN, HORREN", "DOORS/WINDOWS: CLOSING WHEN LEAVING, SLIDING DOORS, SCREENS", "PUERTAS/VENTANAS: CERRAR AL SALIR, PUERTAS CORREDERAS, MOSQUITERAS")],
      keywords: ["deur", "door", "raam", "window", "schuifpui", "sliding", "slot", "lock", "puerta", "ventana", "corredera", "cerradura"],
    },
    {
      id: "wind",
      icon: "wind",
      title: l("Wind", "Wind", "Viento"),
      body: [
        l(
          "De passaatwind waait bijna altijd en brengt heerlijke verkoeling. Het betekent ook: laat geen losse spullen buiten slingeren.",
          "The trade wind blows almost constantly and brings lovely cooling. It also means: don't leave loose items lying around outside.", "El alisio sopla casi sin parar y refresca de maravilla. Eso también significa: no dejes objetos sueltos fuera.",
        ),
        todo("SPECIFIEK VOOR KAS DAAS (BIJV. PARASOLS DICHT, DEUREN VASTZETTEN)", "SPECIFIC TO KAS DAAS (E.G. CLOSE PARASOLS, SECURE DOORS)", "ESPECÍFICO DE KAS DAAS (P. EJ. CERRAR SOMBRILLAS, ASEGURAR PUERTAS)"),
      ],
      keywords: ["wind", "passaat", "trade wind", "parasol", "viento", "alisio"],
    },
    {
      id: "wildlife",
      icon: "bug",
      title: l("Dieren & insecten", "Animals & insects", "Animales e insectos"),
      body: [
        l(
          "Hagedissen, leguanen, geiten en ezels horen bij het eiland. Voer ze niet en laat geen eten buiten staan.",
          "Lizards, iguanas, goats and donkeys are part of island life. Please don't feed them and don't leave food outside.", "Lagartijas, iguanas, cabras y burros forman parte de la vida en la isla. No les des de comer y no dejes comida fuera.",
        ),
        todo("SPECIFIEK VOOR KAS DAAS", "SPECIFIC TO KAS DAAS", "ESPECÍFICO DE KAS DAAS"),
      ],
      keywords: ["dieren", "animals", "leguaan", "iguana", "hagedis", "lizard", "geit", "goat", "ezel", "donkey", "insect", "animales", "lagartija", "cabra", "burro"],
    },
    {
      id: "safety",
      icon: "shield",
      title: l("Veiligheid", "Safety", "Seguridad"),
      body: [
        l(
          "Bonaire is ontspannen, maar laat geen waardevolle spullen zichtbaar in de auto liggen — ook niet bij stranden en duikstekken.",
          "Bonaire is relaxed, but don't leave valuables visible in the car — including at beaches and dive sites.", "Bonaire es tranquila, pero no dejes objetos de valor a la vista en el coche, tampoco en playas y puntos de buceo.",
        ),
        l(
          "Kas Daas is niet geschikt voor jonge kinderen zonder toezicht: steile trappen, geen hek rond het zwembad en een open zeekant.",
          "Kas Daas is not suitable for young children without supervision: steep stairs, no fence around the pool and an open sea edge.", "Kas Daas no es adecuada para niños pequeños sin supervisión: escaleras empinadas, piscina sin valla y borde del mar abierto.",
        ),
        l(
          "Bewaar waardevolle spullen in de kluis in de laundry room — die opent met de sleutel die je bij aankomst krijgt.",
          "Keep valuables in the safe in the laundry room — it opens with the key you receive on arrival.", "Guarda los objetos de valor en la caja fuerte del cuarto de lavado; se abre con la llave que recibes a tu llegada.",
        ),
        todo("ALARM / AFSLUITEN VILLA (INDIEN VAN TOEPASSING)", "ALARM / LOCKING UP THE VILLA (IF APPLICABLE)", "ALARMA / CIERRE DE LA VILLA (SI PROCEDE)"),
      ],
      keywords: ["veiligheid", "safety", "kluis", "safe", "alarm", "diefstal", "theft", "auto", "car", "seguridad", "caja fuerte", "robo", "coche"],
    },
    {
      id: "waste",
      icon: "trash",
      title: l("Afval", "Waste", "Basura"),
      summary: l("In de afvalbak rechtsvoor de woning", "In the bin at the front right of the house", "En el contenedor delante, a la derecha de la casa"),
      body: [l("Je afval kan in de afvalbak rechtsvoor de woning.", "Your rubbish goes in the bin at the front right of the house.", "La basura va al contenedor situado delante, a la derecha de la casa.")],
      keywords: ["afval", "waste", "trash", "garbage", "vuilnis", "container", "kliko", "bin", "recycling", "basura", "contenedor", "reciclaje"],
    },
  ],
};

/** All villa guide sections, in display order. */
export const houseSections: HouseSection[] = [arrival, houseRules, villa, outdoor, comfort, island];
