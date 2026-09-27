# CONTENT_TODO — wat moet de eigenaar nog aanleveren?

Deze checklist bevat **alle** informatie die nog ontbreekt in de Kas Daas-gids.
In de app zijn ontbrekende gegevens zichtbaar als gestreepte labels, bijvoorbeeld
`[WIFI-NETWERK INVULLEN]` (NL) / `[TO FILL IN: WIFI NETWORK]` (EN).

> 💡 **Tip:** `npm run content:todo` toont een actuele lijst van alle open punten
> met bestand en regelnummer. In de broncode staan ze als `todo("…", "…")`.
> Vervang zo'n `todo(…)` door de echte tekst: `l("Nederlandse tekst", "English text")`,
> of — voor taalonafhankelijke waarden zoals een telefoonnummer — gewoon `"+599 …"`.

Alle teksten graag in **Nederlands én Engels** aanleveren.

---

## 1. Woning (villa)
Bestand: `content/house/sections.ts` → `villa` en `outdoor`

- [ ] Persoonlijke welkomsttekst over de villa
- [ ] Woonkamer: omschrijving en bijzonderheden
- [ ] Keuken: wat is aanwezig, waar staat wat
- [ ] Slaapkamers: aantal, bedden, bijzonderheden
- [ ] Badkamers, handdoeken en toiletartikelen
- [ ] Handdoeken, strandlakens en beddengoed: waar en hoe wisselen
- [ ] Terras & lounge (bijv. kussens binnenzetten bij regen)
- [ ] Buiten eten: eettafel en bijzonderheden
- [ ] **Buitendouche:** locatie, bediening, warm/koud water, handdoeken, aandachtspunten
      (de sfeertekst “Even afspoelen na een ochtend in zee…” is voorbeeldtekst, aanpassen mag)
- [ ] Zwembad — **aanwezig?** Zo ja: regels, verlichting, veiligheid. Zo nee: onderwerp verwijderen
- [ ] Ligbedden / parasols — aanwezig?
- [ ] BBQ / buitenkeuken — aanwezig? Bediening, gas, schoonmaken
- [ ] Buitenverlichting: schakelaars / timers
- [ ] Tuin — aanwezig? Tuinman?
- [ ] Rinse-area en droogrek voor snorkel-/duikspullen; aanwezige snorkelsets/zwemvesten

## 2. Contact
Bestand: `content/site.ts` → `host`

- [ ] Naam beheerder / host
- [ ] Telefoonnummer (internationaal formaat, bijv. `+599 7…`)
- [ ] WhatsApp-nummer
- [ ] E-mailadres
- [ ] Bereikbaarheid (bijv. dagelijks 08:00–20:00)
- [ ] Contactpersoon ter plaatse + korte introductie (`content/house/sections.ts` → aankomst)

## 3. Foto's
Zet bestanden in `public/images/…` en verwijs ernaar via `image: { src, alt }`.
Zolang er geen foto is, toont de app een passende illustratie met “Foto volgt”.

- [ ] **Hero-foto van de villa** (liggend én staand goed, min. 2000 px breed) → `content/site.ts` → `heroImage`
- [ ] Foto per villa-sectie (aankomst, jouw villa, outdoor living, comfort, eiland) → `image` in `content/house/sections.ts`
- [ ] **Buitendouche** (sfeerfoto)
- [ ] Terras, lounge, zwembad, slaapkamers, uitzicht, architectuur
- [ ] Boot: meerdere foto's → `content/boat/rental.ts` → `gallery`
- [ ] Foto's voor aanbevolen plekken (eigen foto's of met toestemming) → `image` per plek
- [ ] Foto's per dagplan (optioneel)
- [ ] Controleer het app-icoon (`npm run icons` na aanpassen van `scripts/generate-icons.mjs`)

## 4. Aankomst
Bestand: `content/house/sections.ts` → `arrival`, `content/house/stay.ts`, `content/site.ts` → `home`

- [ ] Adres van Kas Daas
- [ ] **Coördinaten** van de villa (kaart & route) — nu een tijdelijke plek met `placeholder: true`
- [ ] Google Maps-link naar de villa
- [ ] Routebeschrijving vanaf het vliegveld + herkenningspunten
- [ ] Parkeren: waar en hoeveel plekken
- [ ] Check-intijd en werkwijze (zelf inchecken / ontvangst)
- [ ] Mogelijkheden bij vroeger aankomen
- [ ] Sleutel & toegang (sleutelkluis, code, overhandiging) + stappen
- [ ] Overige aandachtspunten bij aankomst (bijv. welkomstpakket)
- [ ] **WiFi-netwerk** en **wachtwoord** (`content/house/stay.ts`) — de QR-code wordt dan automatisch gemaakt
- [ ] WiFi-bereik en locatie router / wat te doen bij storing

## 5. Apparatuur (comfort)
Bestand: `content/house/sections.ts` → `comfort`

- [ ] Airconditioning: afstandsbediening, standen, ideale temperatuur + stappen
- [ ] Ventilatoren
- [ ] Warm water (boiler / zonneboiler / doorstroom)
- [ ] Verlichting: schakelaars, dimmers
- [ ] Stopcontacten: stekkertype, spanning, adapters
- [ ] Televisie / streaming / inloggen
- [ ] Muziek / audio / bluetooth
- [ ] Kookplaat (incl. kinderslot), oven, magnetron
- [ ] Koelkast / vriezer / ijsblokjes
- [ ] Vaatwasser (tablets, programma)
- [ ] Koffiezetapparaat (cups / bonen)
- [ ] Wasmachine / droger

**Wonen op Bonaire** (`island` in hetzelfde bestand):
- [ ] Watergebruik specifiek voor Kas Daas (tank, waterdruk)
- [ ] Kun je het kraanwater drinken? Waterfilter?
- [ ] Stroom: zonnepanelen, locatie stoppenkast
- [ ] Waar liggen anti-muggenmiddelen / horren
- [ ] Deuren & ramen: sluiten bij vertrek, schuifpuien, horren
- [ ] Wind: parasols, deuren vastzetten
- [ ] Dieren & insecten specifiek voor de villa
- [ ] Veiligheid: kluis, alarm, afsluiten
- [ ] **Afval:** waar naartoe, ophaaldagen, scheiden

## 6. Vertrek
Bestand: `content/house/departure.ts`, `content/house/stay.ts`

- [ ] **Check-outtijd**
- [ ] Late check-out mogelijk? Voorwaarden
- [ ] Afval bij vertrek
- [ ] Vaat bij vertrek
- [ ] Wat te doen met overgebleven eten
- [ ] Gebruikte handdoeken
- [ ] Beddengoed afhalen of laten liggen
- [ ] Sleutelprocedure bij vertrek
- [ ] Overige vertrekinstructies

## 7. Bonaire-tips (algemeen)
Bestanden: `content/places/explore.ts`, `content/practical/index.ts`, `content/itineraries/index.ts`

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

- [ ] Alle voorbeeldrestaurants controleren: nog open? Past de beschrijving? Eigen favorieten?
- [ ] Per restaurant (alleen indien gecontroleerd): telefoon, website, reserveringslink, prijsklasse (`priceLevel` 1–4), openingstijden, “reserveren aanbevolen”
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
- [ ] Telefoonnummer + WhatsApp bootbeheerder
- [ ] Kustwacht: telefoonnummer + VHF-kanaal
- [ ] Locatie EHBO-doos in de villa
- [ ] Stroomstoring: locatie stoppenkast, zaklampen
- [ ] Geen water: wat controleren (hoofdkraan, pomp, tank)
- [ ] Wifi-storing: router herstarten
- [ ] Overige airco-controles
- [ ] Sleutel kwijt: reservesleutel / code

---

## Technische instellingen (eenmalig)
Zie `.env.example` en de README.

- [ ] Domeinnaam → `NEXT_PUBLIC_SITE_URL`
- [ ] `BOAT_TOKEN_SECRET` instellen (verplicht voor bootlinks)
- [ ] `ADMIN_PASSWORD` instellen (voor `/admin`) — of links maken via `npm run boat:link`
- [ ] Beslissen of de gids vindbaar mag zijn in Google → `NEXT_PUBLIC_INDEXABLE`
- [ ] `showDemoLabels` en `showPhotoHints` in `content/site.ts` uitzetten zodra alles is ingevuld
