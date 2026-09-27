import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArrowRight, CalendarDays, Map as MapIcon, Search } from "lucide-react";
import { isLocale, tx } from "@/lib/i18n";
import { categories, favoritePlaces, getPlaces } from "@/lib/content";
import { dictionaries } from "@/content/ui";
import { PageHeader } from "@/components/ui/page-header";
import { SectionHeader } from "@/components/ui/section-header";
import { Icon } from "@/components/ui/icon";
import { Photo } from "@/components/ui/photo";
import { PlaceCard, PlaceCarousel } from "@/components/places/place-card";

export async function generateMetadata({ params }: PageProps<"/[locale]/discover">): Promise<Metadata> {
  const { locale } = await params;
  return { title: isLocale(locale) ? dictionaries[locale].discover.title : "Discover" };
}

export default async function DiscoverPage({ params }: PageProps<"/[locale]/discover">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const t = dictionaries[locale];
  const b = `/${locale}`;
  const favs = favoritePlaces();
  const worthTheDrive = getPlaces().filter((p) => p.tags?.includes("worth-the-drive"));
  const hidden = getPlaces().filter((p) => p.category === "hidden-gems" || p.alsoIn?.includes("hidden-gems"));

  return (
    <>
      <PageHeader title={t.discover.title} eyebrow={t.brand.ourBonaire} text={t.discover.subtitle} art="reef" uid="disc-hdr" locale={locale} back={false} />
      <div className="space-y-12 px-5 pt-6">
        <div className="space-y-3">
          <Link href={`${b}/search`} className="flex h-12 items-center gap-3 rounded-full bg-white px-5 text-[0.92rem] text-muted shadow-[var(--shadow-soft)]">
            <Search className="h-5 w-5 text-ocean-700" aria-hidden />
            {t.common.searchPlaceholder}
          </Link>
          <div className="grid grid-cols-2 gap-2.5">
            <Link href={`${b}/map`} className="card flex min-h-14 items-center gap-3 px-4 font-semibold">
              <MapIcon className="h-5 w-5 text-ocean-700" aria-hidden /> {t.discover.map}
            </Link>
            <Link href={`${b}/plans`} className="card flex min-h-14 items-center gap-3 px-4 font-semibold">
              <CalendarDays className="h-5 w-5 text-ocean-700" aria-hidden /> {t.discover.plans}
            </Link>
          </div>
        </div>

        <section>
          <SectionHeader eyebrow={t.brand.recommends} title={t.discover.favourites} />
          <div className="space-y-5">
            {favs.slice(0, 2).map((p, i) => <PlaceCard key={p.id} place={p} locale={locale} variant="feature" priority={i === 0} />)}
          </div>
          <div className="mt-5">
            <PlaceCarousel places={favs.slice(2)} locale={locale} />
          </div>
        </section>

        <section>
          <Link href={`${b}/discover/restaurants`} className="group relative block overflow-hidden rounded-[1.75rem] shadow-[var(--shadow-lift)]">
            <Photo art="food" uid="disc-rest" locale={locale} className="aspect-[16/10] w-full">
              <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/10 to-transparent" />
            </Photo>
            <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-5 text-white">
              <div>
                <p className="text-[0.66rem] font-bold uppercase tracking-[0.18em] text-white/75">{t.brand.handpicked}</p>
                <h2 className="mt-1 text-[1.7rem] leading-tight">{t.discover.restaurants}</h2>
                <p className="mt-0.5 text-[0.88rem] text-white/80">{t.discover.restaurantsText}</p>
              </div>
              <span className="glass grid h-11 w-11 shrink-0 place-items-center rounded-full text-ink"><ArrowRight className="h-5 w-5" aria-hidden /></span>
            </div>
          </Link>
        </section>

        <section>
          <SectionHeader title={t.discover.categories} />
          <ul className="grid grid-cols-2 gap-2.5 sm:grid-cols-3">
            {categories.map((c) => (
              <li key={c.id}>
                <Link href={`${b}/discover/${c.id}`} className="card flex min-h-16 items-center gap-3 p-3 transition active:scale-[0.98]">
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-sand-100 text-ocean-700"><Icon name={c.icon} className="h-5 w-5" /></span>
                  <span className="text-[0.88rem] font-semibold leading-tight">{tx(c.label, locale)}</span>
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <section>
          <SectionHeader eyebrow={t.brand.roadTrip} title={t.discover.worthTheDrive} />
          <PlaceCarousel places={worthTheDrive} locale={locale} />
        </section>

        {hidden.length > 0 && (
          <section>
            <SectionHeader eyebrow={t.brand.hiddenGems} title={tx(categories.find((c) => c.id === "hidden-gems")!.intro, locale)} />
            <div className="space-y-3">
              {hidden.map((p) => <PlaceCard key={p.id} place={p} locale={locale} variant="row" />)}
            </div>
          </section>
        )}
      </div>
    </>
  );
}
