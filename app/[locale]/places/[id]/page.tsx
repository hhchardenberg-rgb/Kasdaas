import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CalendarCheck, Globe, Lightbulb, Navigation, Phone, Quote } from "lucide-react";
import { hasValue, isLocale, locales, tx, type Locale } from "@/lib/i18n";
import { getCategory, getPlace, getPlaces, placesIn, tagLabels } from "@/lib/content";
import { dictionaries } from "@/content/ui";
import { placeRouteUrl, telUrl } from "@/lib/links";
import type { ActivityInfo, Place } from "@/lib/types";
import { Photo } from "@/components/ui/photo";
import { Tx } from "@/components/ui/tx";
import { BackButton } from "@/components/ui/back-button";
import { ShareButton } from "@/components/ui/share-button";
import { ActionLink } from "@/components/ui/action-button";
import { FavoriteButton } from "@/components/places/favorite-button";
import { DemoBadge, FavouriteBadge, PlaceCarousel } from "@/components/places/place-card";
import { RecentTracker } from "@/components/places/recent-tracker";

export function generateStaticParams() {
  return locales.flatMap((locale) => getPlaces().map((p) => ({ locale, id: p.id })));
}

export async function generateMetadata({ params }: PageProps<"/[locale]/places/[id]">): Promise<Metadata> {
  const { locale, id } = await params;
  const p = getPlace(id);
  if (!p || !isLocale(locale)) return {};
  return { title: tx(p.name, locale), description: tx(p.summary, locale) };
}

const priceLabel = (n?: number) => (n ? "$".repeat(n) : undefined);

export default async function PlacePage({ params }: PageProps<"/[locale]/places/[id]">) {
  const { locale, id } = await params;
  const place = getPlace(id);
  if (!isLocale(locale) || !place) notFound();
  const t = dictionaries[locale];
  const category = getCategory(place.category);
  const route = placeRouteUrl(place);
  const call = telUrl(place.phone);
  const related = placesIn(place.category).filter((p) => p.id !== place.id).slice(0, 6);
  const name = tx(place.name, locale);

  return (
    <article>
      <RecentTracker id={place.id} />
      <div className="relative">
        <Photo image={place.image} art={place.art} uid={`pd-${place.id}`} locale={locale} priority hint hintClassName="right-4 bottom-12" className="h-[26rem] w-full">
          <div className="absolute inset-0 bg-gradient-to-b from-ink/30 via-transparent to-transparent" />
        </Photo>
        <div className="absolute inset-x-4 top-[calc(var(--safe-top)+4.25rem)] flex justify-between">
          <BackButton fallback={`/${locale}/discover`} />
          <div className="flex gap-2">
            <ShareButton title={name} text={`${t.place.shareText} ${name}`} className="glass text-ink shadow-[var(--shadow-soft)]" />
            <FavoriteButton id={place.id} className="glass h-11 w-11 text-ink shadow-[var(--shadow-soft)]" />
          </div>
        </div>
      </div>

      <div className="relative -mt-8 rounded-t-[2rem] bg-sand-50 px-5 pt-7">
        <div className="mb-3 flex flex-wrap gap-1.5">
          {place.favorite && <FavouriteBadge locale={locale} />}
          {place.demo && <DemoBadge locale={locale} className="!bg-coral-soft" />}
        </div>
        <p className="eyebrow">
          {category && tx(category.label, locale)}
          {place.area ? ` · ${tx(place.area, locale)}` : ""}
        </p>
        <h1 className="mt-2 text-[2.3rem] leading-[1.05] [text-wrap:balance]"><Tx value={place.name} locale={locale} /></h1>
        <p className="mt-3 text-[1.02rem] leading-relaxed text-ink-soft">{tx(place.summary, locale)}</p>

        <div className="mt-6 flex flex-wrap gap-2">
          {route && <ActionLink href={route} icon={Navigation} variant="primary" external netLabel={t.common.needsInternet}>{t.common.route}</ActionLink>}
          {call && <ActionLink href={call} icon={Phone}>{t.common.call}</ActionLink>}
          {place.reservationUrl && <ActionLink href={place.reservationUrl} icon={CalendarCheck} external netLabel={t.common.needsInternet}>{t.common.reserve}</ActionLink>}
          {place.website && <ActionLink href={place.website} icon={Globe} external netLabel={t.common.needsInternet}>{t.common.website}</ActionLink>}
        </div>

        {place.whyWeRecommend && (
          <section className="mt-8 rounded-[1.5rem] bg-ocean-900 p-6 text-sand-50">
            <Quote className="h-6 w-6 text-sand-300" aria-hidden />
            <p className="mt-2 text-[0.68rem] font-bold uppercase tracking-[0.18em] text-sand-300">
              {place.favorite ? t.place.oneOfOurFavourites : t.place.why}
            </p>
            <p className="mt-2 font-display text-[1.35rem] leading-snug">{tx(place.whyWeRecommend, locale)}</p>
          </section>
        )}

        {place.description && <p className="mt-6 leading-relaxed text-ink-soft">{tx(place.description, locale)}</p>}

        <Facts place={place} locale={locale} />

        {place.activity && <ActivityBlock activity={place.activity} locale={locale} />}

        {place.tip && (
          <p className="mt-6 flex gap-3 rounded-2xl bg-sand-100 p-4 text-[0.92rem] leading-relaxed">
            <Lightbulb className="mt-0.5 h-5 w-5 shrink-0 text-gold" aria-hidden />
            <span><b className="block text-[0.68rem] uppercase tracking-[0.14em] text-muted">{t.place.practicalTip}</b>{tx(place.tip, locale)}</span>
          </p>
        )}

        {place.tags && place.tags.length > 0 && (
          <ul className="mt-6 flex flex-wrap gap-2">
            {place.tags.map((tag) => (
              <li key={tag} className="rounded-full bg-white px-3 py-1.5 text-xs font-semibold text-ink-soft shadow-[var(--shadow-soft)]">{tx(tagLabels[tag], locale)}</li>
            ))}
          </ul>
        )}

        {related.length > 0 && (
          <section className="mt-12">
            <h2 className="mb-4 text-[1.45rem]">{t.place.related}</h2>
            <PlaceCarousel places={related} locale={locale} />
          </section>
        )}
      </div>
    </article>
  );
}

function Facts({ place, locale }: { place: Place; locale: Locale }) {
  const t = dictionaries[locale];
  const rows: [string, React.ReactNode][] = [];
  if (place.restaurant) {
    rows.push([t.place.cuisine, tx(place.restaurant.cuisine, locale)]);
    const r = place.restaurant.reservationRecommended;
    rows.push([t.place.reservation, r === null ? t.place.unknown : r ? t.place.yes : t.place.no]);
  }
  if (place.priceLevel) rows.push([t.place.price, priceLabel(place.priceLevel)]);
  if (place.address) rows.push([t.place.location, <Tx key="a" value={place.address} locale={locale} />]);
  else if (place.area) rows.push([t.place.location, tx(place.area, locale)]);
  if (place.travelTime) rows.push([t.place.travelTime, tx(place.travelTime, locale)]);
  if (place.openingHours) rows.push([t.place.hours, tx(place.openingHours, locale)]);
  if (place.phone && hasValue(place.phone)) rows.push([t.common.call, <Tx key="p" value={place.phone} locale={locale} />]);
  if (!rows.length) return null;
  return (
    <dl className="card mt-6 divide-y divide-sand-100 px-5">
      {rows.map(([k, v]) => (
        <div key={k} className="flex items-start justify-between gap-4 py-3.5 text-[0.92rem]">
          <dt className="text-muted">{k}</dt>
          <dd className="text-right font-semibold">{v}</dd>
        </div>
      ))}
      {place.coordinates?.approximate && (
        <p className="py-3 text-xs text-muted">{t.place.approximate}</p>
      )}
    </dl>
  );
}

function ActivityBlock({ activity, locale }: { activity: ActivityInfo; locale: Locale }) {
  const t = dictionaries[locale];
  const q: [string, keyof ActivityInfo][] = [
    [t.place.whyFun, "why"], [t.place.forWho, "forWho"], [t.place.duration, "duration"], [t.place.bring, "bring"],
    [t.place.bestTime, "bestTime"], [t.place.diyOrBook, "diyOrBook"], [t.place.keepInMind, "keepInMind"],
  ];
  return (
    <section className="mt-8">
      <h2 className="mb-4 text-[1.45rem]">{t.place.activity}</h2>
      <dl className="grid grid-cols-2 gap-2.5">
        {q.map(([label, key], i) => (
          <div key={key} className={`card p-4 ${i === 0 || i === q.length - 1 ? "col-span-2" : ""}`}>
            <dt className="text-[0.66rem] font-bold uppercase tracking-[0.14em] text-ocean-500">{label}</dt>
            <dd className="mt-1.5 text-[0.9rem] leading-snug">{tx(activity[key], locale)}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
