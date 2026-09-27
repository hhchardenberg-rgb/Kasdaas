# CONTENT_TODO — wat moet de eigenaar nog aanleveren?

Deze checklist bevat **alle** informatie die nog ontbreekt in de Kas Daas-gids.
In de app zijn ontbrekende gegevens zichtbaar als gestreepte labels, bijvoorbeeld
`[WIFI-NETWERK INVULLEN]` (NL) / `[TO FILL IN: WIFI NETWORK]` (EN).

> 💡 **Tip:** `npm run content:todo` toont een actuele lijst van alle open punten
> met bestand en regelnummer. In de broncode staan ze als `todo("…", "…")`.
> Vervang zo'n `todo(…)` door de echte tekst: `l("Nederlandse tekst", "English text")`,
> of — voor taalonafhankelijke waarden zoals een telefoonnummer — gewoon `"+599 …"`.

Alle teksten graag in **Nederlands én Engels** aanleveren.

> ✅ **Al verwerkt uit de eigen Vrbo-advertentie (p336665):** 35 foto's (villa + Bonaire),
> ligging (Belnem, Kralendijk, direct aan zee), ontwerp Piet Boon, Viking-keuken,
> 3 slaapkamers / max. 7 gasten, privézwembad, barbecue, buitendouche, rinse-area voor
> duikspullen, wasmachine/droger en de waarschuwing voor jonge kinderen. Graag nalopen.

---

## 1. Woning (villa)
Bestand: `content/house/sections.ts` → `villa` en `outdoor`

- [x] Welkomsttekst over de villa (gebaseerd op de advertentie — nalopen)
- [ ] Persoonlijke welkomstwoorden van de eigenaar (optioneel)
- [ ] Woonkamer: omschrijving en bijzonderheden
- [ ] Keuken: wat is aanwezig, waar staat wat
- [x] Slaapkamers: 3 slaapkamers, max. 7 gasten
- [x] Iedere slaapkamer: tweepersoonsbed + airco
- [x] Twee badkamers + buitendouche
- [ ] Handdoeken en toiletartikelen (wat is aanwezig)
- [ ] Handdoeken, strandlakens en beddengoed: waar en hoe wisselen
- [ ] Terras & lounge (bijv. kussens binnenzetten bij regen)
- [ ] Buiten eten: eettafel en bijzonderheden
- [ ] **Buitendouche:** locatie, bediening, warm/koud water, handdoeken, aandachtspunten
      (de sfeertekst “Even afspoelen na een ochtend in zee…” is voorbeeldtekst, aanpassen mag)
- [x] Zwembadverlichting gaat 's avonds automatisch aan
- [ ] Zwembad: regels en onderhoud
- [ ] Ligbedden / parasols (aanwezig ✓): kussens, parasols
- [ ] Barbecue (aanwezig ✓): bediening, gas/houtskool, schoonmaken
- [ ] Buitenverlichting: schakelaars / timers
- [ ] Tuin: bijzonderheden, tuinman
- [ ] Rinse-area en droogrek voor snorkel-/duikspullen; aanwezige snorkelsets/zwemvesten

## 1b. Huisregels ✅
Bestand: `content/house/sections.ts` → `houseRules`

- [x] Check-in vanaf 16:00, check-out tot 10:00
- [x] Minimumleeftijd huurder: 21 jaar
- [x] Kinderen 0–17 jaar welkom
- [x] Huisdieren: honden < 10 kg, max. één huisdier
- [x] Geen evenementen
- [x] Roken alleen buiten — nooit binnen / in de slaapkamers
- [ ] Eventuele extra regels (bijv. stilte na een bepaald tijdstip, maximaal aantal bezoekers)

## 2. Contact
Bestand: `content/site.ts` → `host`

- [x] House manager: Dennis
- [x] Telefoonnummer: +599 782 9691
- [x] WhatsApp-nummer (aangenomen: zelfde nummer — controleren)
- [ ] E-mailadres
- [ ] Bereikbaarheid (bijv. dagelijks 08:00–20:00)
- [x] Contactpersoon ter plaatse: Dennis
- [ ] Bereikbaarheid van Dennis (`content/house/sections.ts` → aankomst)

## 3. Foto's
Zet bestanden in `public/images/…` en verwijs ernaar via `image: { src, alt }`.
Zolang er geen foto is, toont de app een passende illustratie met “Foto volgt”.

Alle foto's staan centraal in `content/images.ts` (bestanden in `public/images/`).

- [x] Hero-foto van de villa
- [x] Foto per villa-sectie en per onderwerp (o.a. buitendouche, zwembad, terras, slaapkamer, keuken, BBQ)
- [x] Sfeerfoto's Bonaire (zoutpannen, flamingo's, kitesurfen, Kralendijk, dolfijnen)
- [ ] **Foto's van de boot zelf** → `content/boat/rental.ts` → `gallery` (nu: luchtfoto's van de kust)
- [ ] Controleer of de gekozen foto's goed passen; vervang gerust in `content/images.ts`
- [ ] Foto's voor aanbevolen plekken (eigen foto's of met toestemming) → `image` per plek
- [ ] Foto's per dagplan (optioneel)
- [ ] Controleer het app-icoon (`npm run icons` na aanpassen van `scripts/generate-icons.mjs`)

## 4. Aankomst
Bestand: `content/house/sections.ts` → `arrival`, `content/house/stay.ts`, `content/site.ts` → `home`

- [x] Adres: Punt Vierkant 6A, Kralendijk
- [x] Coördinaten van de villa (12.1198683, -68.2914733) — kaart en routeknop werken
- [x] Route-link naar de villa (op basis van de coördinaten)
- [ ] Routebeschrijving vanaf het vliegveld + herkenningspunten
- [ ] Parkeren: waar en hoeveel plekken
- [x] Check-intijd: vanaf 16:00
- [x] Check-in: persoonlijke ontvangst, overhandiging van tags, sleutels en polsbandjes
- [ ] Mogelijkheden bij vroeger aankomen
- [x] Toegang: 2 tags (buiten- en binnendeuren), 2 sleutels voor de kluis (geen code), 2 waterdichte polsbandjes met tag
- [x] Overhandiging bij check-in; kluis staat in de laundry room
- [ ] Overige aandachtspunten bij aankomst (bijv. welkomstpakket)
- [x] WiFi-netwerk (KASDAAS) en wachtwoord — QR-code en iPhone-profiel worden automatisch gemaakt
- [ ] WiFi-bereik en locatie router / wat te doen bij storing

## 5. Apparatuur (comfort)
Bestand: `content/house/sections.ts` → `comfort`

- [ ] Airconditioning: afstandsbediening, standen, ideale temperatuur + stappen
- [x] Ventilator woonkamer: grote zwarte afstandsbediening (1 = uit, 2 = aan)
- [ ] Overige ventilatoren (slaapkamers)
- [ ] Warm water (boiler / zonneboiler / doorstroom)
- [ ] Verlichting: schakelaars, dimmers
- [ ] Stopcontacten: stekkertype, spanning, adapters
- [ ] Televisie / streaming / inloggen
- [ ] Muziek / audio / bluetooth
- [ ] Viking-gasfornuis: bediening (aansteken, gasfles, veiligheid)
- [ ] Oven, magnetron
- [ ] Koelkast / vriezer / ijsblokjes
- [ ] Vaatwasser (tablets, programma)
- [ ] Koffiezetapparaat (cups / bonen)
- [x] Wasmachine / droger in de laundry room, tussendoor wassen mag
- [ ] Wasmiddel en programma

**Wonen op Bonaire** (`island` in hetzelfde bestand):
- [ ] Watergebruik specifiek voor Kas Daas (tank, waterdruk)
- [x] Kraanwater is drinkbaar
- [ ] Stroom: zonnepanelen, locatie stoppenkast
- [ ] Waar liggen anti-muggenmiddelen / horren
- [ ] Deuren & ramen: sluiten bij vertrek, schuifpuien, horren
- [ ] Wind: parasols, deuren vastzetten
- [ ] Dieren & insecten specifiek voor de villa
- [ ] Veiligheid: kluis, alarm, afsluiten
- [x] Afval: afvalbak rechtsvoor de woning

## 6. Vertrek
Bestand: `content/house/departure.ts`, `content/house/stay.ts`

- [x] Check-outtijd: tot 10:00
- [x] Late check-out: in principe niet, vragen kan altijd
- [x] Afval bij vertrek: afvalbak rechtsvoor de woning
- [x] Vaat: afwassen in de vaatwasser
- [x] Koelkast: lang houdbare producten mogen blijven
- [x] Gebruikte handdoeken in de wasmand
- [ ] Beddengoed afhalen of laten liggen
- [x] Check-out is altijd persoonlijk; tags, sleutels en polsbandjes inleveren
- [ ] Overige vertrekinstructies

## 7. Bonaire-tips (algemeen)
Bestanden: `content/places/explore.ts`, `content/practical/index.ts`, `content/itineraries/index.ts`

- [ ] Bachelor's Beach: loopafstand (± 12 min, uit de advertentie) controleren
- [ ] **Alle plekken met `demo: true` controleren** (bestaat het nog, klopt de tekst?) en daarna `demo: true` verwijderen
- [ ] Coördinaten zijn **bij benadering** (`approximate: true`) — controleren of verwijderen
- [ ] Reistijd vanaf Kas Daas per plek (`travelTime`) — optioneel
- [ ] Lokale evenementen / markten
- [ ] Dichtstbijzijnde supermarkt, tankstation, apotheek, geldautomaat vanaf Kas Daas
- [ ] Huisarts / doktersdienst voor toeristen
- [ ] Spanning en stekkertype in de villa (ook in "Goed om te weten")
- [ ] Dagplannen: tijden en volgorde nalopen, eigen favorieten toevoegen
- [ ] Algemene feiten in "Goed om te weten" nalopen (valuta USD, tijdzone UTC−4, natuurbijdrage)

## 8. Restaurants
Bestand: `content/places/food.ts`

- [x] Eigen favorieten: Ingridients, Rum Runners, Ocean Oasis, Brass Boer, Club Tropicana, It Rains Fishes, Sebastian's, The Dock
- [ ] Korte beschrijvingen van deze favorieten nalopen/personaliseren (adressen, kaartlocaties en websites zijn online opgezocht)
- [ ] Overige voorbeeldrestaurants (met `demo: true`) houden, controleren of verwijderen?
- [x] Adressen, kaartlocaties en websites van de favorieten + Karel's (online opgezocht, sept. 2026)
- [x] Telefoonnummers en reserveringslinks (online opgezocht, sept. 2026)
- [ ] Optioneel per restaurant: prijsklasse (`priceLevel` 1–4), openingstijden
- [ ] **Ontbijtzaak / koffie** (nu `[ONTBIJTZAAK INVULLEN]`)
- [ ] **Foodtruck** (nu `[FOODTRUCK INVULLEN]`)
- [ ] Ontbrekende categorieën aanvullen naar wens (fine dining, afhalen, lokaal)

## 9. Bootverhuur (publieke pagina)
Bestand: `content/boat/rental.ts`

- [ ] Naam / type boot
- [ ] Omschrijving (type, lengte, motor, uitstraling)
- [ ] Capaciteit (max. aantal personen)
- [ ] **Huurprijs** (per dagdeel / dag)
- [ ] Borg
- [ ] Vaarbewijs- / ervaringseisen
- [ ] Brandstofregeling
- [ ] Beschikbaarheid / hoe reserveren
- [ ] Wat is inbegrepen
- [ ] Huurvoorwaarden
- [ ] Foto's (zie Foto's)

## 10. Boottechniek (🔒 geheime handleiding)
Bestand: `content/boat/private/manual.ts` — **alleen zichtbaar met een geldige bootlink**

- [ ] Waar ligt de boot (steiger / ligplaats) + route
- [ ] Inventarislijst
- [ ] Wat moet de huurder zelf meenemen
- [ ] Hoe brandstof controleren
- [ ] Overige controles voor vertrek
- [ ] **Boot starten:** stappen (met foto's / korte video's)
- [ ] Bediening: contact/start, gashendel, trim, stuur, schakelen, anker, bilgepomp, accu/hoofdschakelaar, navigatie, dieptemeter/GPS
- [ ] Ankeren: stappen
- [ ] Aanleggen: stappen
- [ ] Terugkomst: aanleggen, brandstofprocedure, sleutelprocedure
- [ ] **Beslisbomen** bij problemen: motor start niet (de twee voorbeeldvragen bevestigen of vervangen), motor trimt niet, accu, vastgelopen
- [ ] Foto's/video's: gebruik onraadbare bestandsnamen (map `public/` is openbaar) of beveiligde opslag

## 11. Bootveiligheid (🔒)
Bestand: `content/boat/private/manual.ts`

- [ ] Reddingsvesten: aantal, locatie, regels
- [ ] Noodstopkoord: gebruik
- [ ] Ankerregels (waar wel / niet)
- [ ] Ondieptes en hoe herkennen
- [ ] Regels rond het rif
- [ ] Afstand/snelheid bij zwemmers en duikers
- [ ] Weer: waar checken, grenzen voor wind en golven, wanneer niet uitvaren
- [ ] Wat te doen bij nood (volgorde)
- [ ] **Vaargebied:** omschrijving in woorden + kaart (polygonen in `area.zones` of een afbeelding in `area.image`):
      toegestaan, niet toegestaan, ondieptes, gevaarlijke zones, aanleg-/ankerplekken, handige locaties
- [ ] Aanleg- en ankerregels

## 12. Noodinformatie
Bestanden: `content/site.ts` → `emergencyContacts`, `content/boat/private/manual.ts` → `contacts`, `content/house/departure.ts` → `problems`

- [ ] **Controleren** dat 911 het actuele alarmnummer is
- [ ] Telefoonnummer ziekenhuis (Fundashon Mariadal)
- [ ] Telefoonnummer huisarts / doktersdienst
- [ ] Politie (geen spoed)
- [x] Bootbeheerder: +599 701 3200 (WhatsApp aangenomen op hetzelfde nummer — controleren)
- [ ] Naam bootbeheerder (optioneel)
- [ ] Kustwacht: telefoonnummer + VHF-kanaal
- [ ] Locatie EHBO-doos in de villa
- [ ] Stroomstoring: locatie stoppenkast, zaklampen
- [ ] Geen water: wat controleren (hoofdkraan, pomp, tank)
- [ ] Wifi-storing: router herstarten
- [ ] Overige airco-controles
- [ ] Sleutel kwijt: reservesleutel / code

---

## Toegang tot de gids
- [x] Wachtwoord voor de gids: `beachhousebonaire` (aanpassen via `GUEST_PASSWORD` of `content/private/guest-access.ts`)
- [ ] Deelbare link voor gasten: `https://<domein>/?access=beachhousebonaire` (opent de gids zonder te typen)

## Technische instellingen (eenmalig)
Zie `.env.example` en de README.

- [ ] Domeinnaam → `NEXT_PUBLIC_SITE_URL`
- [ ] `BOAT_TOKEN_SECRET` instellen (verplicht voor bootlinks)
- [ ] `ADMIN_PASSWORD` instellen (voor `/admin`) — of links maken via `npm run boat:link`
- [ ] Beslissen of de gids vindbaar mag zijn in Google → `NEXT_PUBLIC_INDEXABLE`
- [ ] `showDemoLabels` en `showPhotoHints` in `content/site.ts` uitzetten zodra alles is ingevuld
