import Link from "next/link";
import { ArrowRight, MessageCircle, Phone, Search } from "lucide-react";
import { isLocale, tx, type Locale } from "@/lib/i18n";
import { favoritePlaces, getPlace, houseSections, itineraries, site, stay } from "@/lib/content";
import { dictionaries } from "@/content/ui";
import { telUrl, whatsappUrl } from "@/lib/links";
import type { ArtVariant, IconName, ImageRef, Place } from "@/lib/types";
import { Photo } from "@/components/ui/photo";
import { Icon } from "@/components/ui/icon";
import { Tx } from "@/components/ui/tx";
import { SectionHeader } from "@/components/ui/section-header";
import { PlaceCard, PlaceCarousel } from "@/components/places/place-card";
import { StayDates, WelcomeHeading } from "@/components/home/guest";
import { TodaySwitch, type Period } from "@/components/home/today";
import { notFound } from "next/navigation";

export default async function Home({ params }: PageProps<"/[locale]">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const t = dictionaries[locale];
  const b = `/${locale}`;
  const places = (ids: string[]) => ids.map(getPlace).filter(Boolean) as Place[];

  const quick: { href: string; label: string; icon: IconName; external?: boolean }[] = [
    { href: `${b}/villa/your-villa`, label: t.quick.about, icon: "home" },
    { href: `${b}/villa/wifi`, label: t.quick.wifi, icon: "wifi" },
    { href: `${b}/villa/arrival#route`, label: t.quick.route, icon: "route" },
    { href: `${b}/discover/restaurants`, label: t.quick.food, icon: "utensils" },
    { href: `${b}/discover`, label: t.quick.discover, icon: "fish" },
    { href: `${b}/boat`, label: t.quick.boat, icon: "sailboat" },
    { href: `${b}/help`, label: t.quick.help, icon: "phone" },
    { href: `${b}/villa/departure`, label: t.quick.checkout, icon: "log-out" },
  ];

  const outdoorShower = houseSections.find((s) => s.id === "outdoor-living")?.topics.find((x) => x.id === "outdoor-shower");
  const whatsapp = whatsappUrl(site.host.whatsapp, tx(site.whatsappGreeting, locale));
  const call = telUrl(site.host.phone);

  const todaySlots: Record<Period, React.ReactNode> = {
    morning: <TodayBlock locale={locale} text={t.home.todayMorning} places={places(["1000-steps", "andrea", "klein-bonaire"])} />,
    afternoon: <TodayBlock locale={locale} text={t.home.todayAfternoon} places={places(["sorobon", "jibe-city", "between-2-buns"])} />,
    evening: <TodayBlock locale={locale} text={t.home.todayEvening} places={places(["karels-beach-bar", "seru-largu", "te-amo-beach"])} />,
    night: <TodayBlock locale={locale} text={t.home.todayNight} places={places(["it-rains-fishes", "capriccio", "bobbejans"])} />,
  };

  return (
    <>
      {/* ───────────── Hero */}
      <section className="relative">
        <Photo image={site.heroImage} art="villa" uid="hero" locale={locale} priority hint hintClassName="right-4 top-[calc(var(--safe-top)+4.5rem)]" className="h-[88svh] max-h-[44rem] min-h-[34rem] w-full">
          <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/25 to-ink/10" />
        </Photo>
        <div className="absolute inset-x-0 bottom-0 px-5 pb-8 text-white">
          <p className="mb-3 text-[0.7rem] font-bold uppercase tracking-[0.3em] text-white/75">Kas Daas · Bonaire</p>
          <WelcomeHeading />
          <p className="mt-3 font-display text-xl italic text-white/90">{t.home.tagline}</p>
          <p className="mt-3 max-w-md text-[0.95rem] leading-relaxed text-white/80">{t.home.intro}</p>
          <Link
            href={`${b}/search`}
            className="mt-6 flex h-13 items-center gap-3 rounded-full bg-white/95 px-5 text-[0.92rem] text-muted shadow-[var(--shadow-lift)] backdrop-blur"
          >
            <Search className="h-5 w-5 text-ocean-700" aria-hidden />
            {t.common.searchPlaceholder}
          </Link>
        </div>
      </section>

      <div className="space-y-12 px-5 pt-8">
        {/* ───────────── Quick actions */}
        <section aria-label={t.home.quick}>
          <ul className="grid grid-cols-4 gap-x-2 gap-y-5">
            {quick.map((q) => (
              <li key={q.href}>
                <Link href={q.href} className="group flex flex-col items-center gap-2 text-center">
                  <span className="grid h-15 w-15 place-items-center rounded-[1.25rem] bg-white text-ocean-700 shadow-[var(--shadow-soft)] transition group-active:scale-95">
                    <Icon name={q.icon} className="h-6 w-6" />
                  </span>
                  <span className="text-[0.72rem] font-semibold leading-tight text-ink-soft">{q.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </section>

        {/* ───────────── Your stay */}
        <section className="card p-5">
          <p className="eyebrow mb-3">{t.home.yourStay}</p>
          <StayDates />
          <dl className="mt-4 grid grid-cols-2 gap-3 text-sm">
            <div>
              <dt className="text-[0.68rem] font-bold uppercase tracking-[0.14em] text-muted">Check-in</dt>
              <dd className="mt-1 font-semibold"><Tx value={stay.checkInTime} locale={locale} /></dd>
            </div>
            <div>
              <dt className="text-[0.68rem] font-bold uppercase tracking-[0.14em] text-muted">{t.home.checkout}</dt>
              <dd className="mt-1 font-semibold"><Tx value={stay.checkOutTime} locale={locale} /></dd>
            </div>
          </dl>
          <div className="mt-5 flex gap-2">
            {whatsapp ? (
              <a href={whatsapp} target="_blank" rel="noopener noreferrer" className="needs-net inline-flex min-h-12 flex-1 items-center justify-center gap-2 rounded-full bg-ocean-800 px-4 text-sm font-semibold text-white" data-net-label={t.common.needsInternet}>
                <MessageCircle className="h-4 w-4" aria-hidden /> {t.common.whatsapp}
              </a>
            ) : null}
            {call ? (
              <a href={call} className="inline-flex min-h-12 flex-1 items-center justify-center gap-2 rounded-full bg-sand-100 px-4 text-sm font-semibold">
                <Phone className="h-4 w-4" aria-hidden /> {t.common.call}
              </a>
            ) : null}
            {!whatsapp && !call && (
              <Link href={`${b}/help`} className="inline-flex min-h-12 flex-1 items-center justify-center gap-2 rounded-full bg-ocean-800 px-4 text-sm font-semibold text-white">
                <Phone className="h-4 w-4" aria-hidden /> {t.home.contactHost}
              </Link>
            )}
          </div>
        </section>

        {/* ───────────── Big visual entries */}
        <section className="grid gap-4 sm:grid-cols-2">
          <BigCard href={`${b}/villa`} art="interior" uid="bc-villa" locale={locale} eyebrow={t.nav.villa} title={t.home.villaGuide} text={t.home.villaGuideText} />
          <BigCard href={`${b}/discover`} art="reef" uid="bc-discover" locale={locale} eyebrow="Bonaire" title={t.home.discover} text={t.home.discoverText} />
          <BigCard href={`${b}/boat`} art="boat" uid="bc-boat" locale={locale} eyebrow={t.nav.boat} title={t.home.ourBoat} text={t.home.ourBoatText} wide />
        </section>

        {/* ───────────── Today */}
        <section>
          <SectionHeader eyebrow={t.home.today} title={t.discover.placesWeLove} />
          <TodaySwitch slots={todaySlots} />
        </section>

        {/* ───────────── Favourites */}
        <section>
          <SectionHeader eyebrow={t.brand.recommends} title={t.home.favourites} text={t.home.favouritesText} href={`${b}/discover`} linkLabel={t.common.viewAll} />
          <PlaceCarousel places={favoritePlaces()} locale={locale} />
        </section>

        {/* ───────────── From the villa: outdoor shower */}
        {outdoorShower && (
          <section>
            <SectionHeader eyebrow={t.home.fromTheVilla} title={tx(outdoorShower.title, locale)} />
            <Link href={`${b}/villa/outdoor-living#outdoor-shower`} className="card group block overflow-hidden">
              <Photo image={outdoorShower.image} art="shower" uid="home-shower" locale={locale} hint className="aspect-[16/10] w-full" />
              <div className="flex items-end justify-between gap-4 p-5">
                <p className="font-display text-[1.15rem] leading-snug text-ink">{tx(outdoorShower.summary, locale)}</p>
                <ArrowRight className="mb-1 h-5 w-5 shrink-0 text-ocean-700 transition group-hover:translate-x-0.5" aria-hidden />
              </div>
            </Link>
          </section>
        )}

        {/* ───────────── Tonight */}
        <section>
          <SectionHeader eyebrow={t.home.tonight} title={t.discover.perfectSunset} text={t.home.tonightText} href={`${b}/discover/restaurants`} linkLabel={t.common.viewAll} />
          <div className="space-y-3">
            {places(["karels-beach-bar", "it-rains-fishes", "rum-runners"]).map((p) => (
              <PlaceCard key={p.id} place={p} locale={locale} variant="row" />
            ))}
          </div>
        </section>

        {/* ───────────── Day plans */}
        <section>
          <SectionHeader eyebrow={t.home.plans} title={t.plans.title} text={t.home.plansText} href={`${b}/plans`} linkLabel={t.common.viewAll} />
          <div className="no-scrollbar -mx-5 flex snap-x snap-mandatory gap-3.5 overflow-x-auto scroll-px-5 px-5 pb-2">
            {itineraries.slice(0, 6).map((it) => (
              <Link key={it.id} href={`${b}/plans/${it.id}`} className="relative w-[60%] max-w-[15rem] shrink-0 snap-start overflow-hidden rounded-[1.5rem] shadow-[var(--shadow-soft)]">
                <Photo image={it.image} art={it.art} uid={`hp-${it.id}`} locale={locale} className="aspect-[3/4] w-full">
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-transparent to-transparent" />
                </Photo>
                <div className="absolute inset-x-0 bottom-0 p-4 text-white">
                  <p className="text-[0.62rem] font-bold uppercase tracking-[0.16em] text-white/75">{tx(it.length, locale)}</p>
                  <h3 className="mt-1 text-[1.2rem] leading-tight">{tx(it.title, locale)}</h3>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* ───────────── Good to know */}
        <section>
          <SectionHeader eyebrow={t.home.goodToKnow} title={t.practical.title} href={`${b}/good-to-know`} linkLabel={t.common.viewAll} />
          <div className="grid grid-cols-2 gap-3">
            {([
              ["sun", t.home.tipSun, t.home.tipSunText, `${b}/good-to-know#sun`],
              ["leaf", t.home.tipNature, t.home.tipNatureText, `${b}/good-to-know#nature`],
              ["banknote", t.home.tipMoney, t.home.tipMoneyText, `${b}/good-to-know#money`],
              ["clock", t.home.tipTime, t.home.tipTimeText, `${b}/good-to-know#time`],
            ] as [IconName, string, string, string][]).map(([icon, title, text, href]) => (
              <Link key={href} href={href} className="card flex flex-col gap-3 p-4">
                <span className="grid h-10 w-10 place-items-center rounded-xl bg-sand-100 text-ocean-700"><Icon name={icon} className="h-5 w-5" /></span>
                <span>
                  <span className="block text-[0.9rem] font-semibold leading-tight">{title}</span>
                  <span className="mt-0.5 block text-[0.78rem] leading-snug text-muted">{text}</span>
                </span>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}

function BigCard({ href, art, uid, locale, eyebrow, title, text, image, wide }: {
  href: string; art: ArtVariant; uid: string; locale: Locale; eyebrow: string; title: string; text: string; image?: ImageRef; wide?: boolean;
}) {
  return (
    <Link href={href} className={`group relative block overflow-hidden rounded-[1.75rem] shadow-[var(--shadow-lift)] ${wide ? "sm:col-span-2" : ""}`}>
      <Photo image={image} art={art} uid={uid} locale={locale} className={`${wide ? "aspect-[16/10] sm:aspect-[21/9]" : "aspect-[16/10] sm:aspect-[4/5]"} w-full`}>
        <div className="absolute inset-0 bg-gradient-to-t from-ink/75 via-ink/5 to-transparent" />
      </Photo>
      <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-5 text-white">
        <div>
          <p className="text-[0.66rem] font-bold uppercase tracking-[0.18em] text-white/75">{eyebrow}</p>
          <h2 className="mt-1 text-[1.7rem] leading-tight">{title}</h2>
          <p className="mt-0.5 text-[0.88rem] text-white/80">{text}</p>
        </div>
        <span className="glass grid h-11 w-11 shrink-0 place-items-center rounded-full text-ink transition group-hover:translate-x-0.5">
          <ArrowRight className="h-5 w-5" aria-hidden />
        </span>
      </div>
    </Link>
  );
}

function TodayBlock({ text, places, locale }: { text: string; places: Place[]; locale: Locale }) {
  return (
    <div>
      <p className="mb-4 font-display text-[1.25rem] leading-snug text-ink-soft italic">{text}</p>
      <PlaceCarousel places={places} locale={locale} />
    </div>
  );
}
