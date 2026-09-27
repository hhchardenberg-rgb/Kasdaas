import Link from "next/link";
import { Sparkles } from "lucide-react";
import type { Place } from "@/lib/types";
import { tx, type Locale } from "@/lib/i18n";
import { site } from "@/content/site";
import { dictionaries } from "@/content/ui";
import { tagLabels, categories } from "@/content/categories";
import { Photo } from "@/components/ui/photo";
import { Tx } from "@/components/ui/tx";
import { FavoriteButton } from "./favorite-button";

type Variant = "feature" | "tile" | "row";

export function DemoBadge({ locale, className = "" }: { locale: Locale; className?: string }) {
  if (!site.showDemoLabels) return null;
  return (
    <span className={`inline-flex items-center rounded-full bg-white/85 px-2 py-0.5 text-[0.6rem] font-bold uppercase tracking-wider text-coral backdrop-blur ${className}`}>
      {dictionaries[locale].common.demo}
    </span>
  );
}

export function FavouriteBadge({ locale, className = "" }: { locale: Locale; className?: string }) {
  return (
    <span className={`inline-flex items-center gap-1 rounded-full bg-ocean-900/80 px-2.5 py-1 text-[0.62rem] font-bold uppercase tracking-wider text-sand-50 backdrop-blur ${className}`}>
      <Sparkles className="h-3 w-3" aria-hidden />
      {tx(tagLabels.favorite, locale)}
    </span>
  );
}

export function PlaceCard({ place, locale, variant = "tile", priority }: { place: Place; locale: Locale; variant?: Variant; priority?: boolean }) {
  const href = `/${locale}/places/${place.id}`;
  const category = categories.find((c) => c.id === place.category);
  const tags = (place.tags ?? []).filter((t) => t !== "favorite").slice(0, 2);

  if (variant === "row") {
    return (
      <Link href={href} className="card group flex items-center gap-4 p-2.5 pr-3 transition active:scale-[0.99]">
        <Photo image={place.image} art={place.art} uid={`r-${place.id}`} locale={locale} sizes="96px" className="h-20 w-20 shrink-0 rounded-2xl" />
        <div className="min-w-0 flex-1 py-1">
          <p className="text-[0.65rem] font-bold uppercase tracking-[0.14em] text-ocean-500">
            {category && tx(category.label, locale)}
            {place.area ? <span className="text-muted"> · {tx(place.area, locale)}</span> : null}
          </p>
          <h3 className="mt-0.5 truncate font-display text-[1.1rem] leading-snug">
            <Tx value={place.name} locale={locale} />
          </h3>
          <p className="mt-0.5 line-clamp-2 text-[0.82rem] leading-snug text-ink-soft">{tx(place.summary, locale)}</p>
        </div>
        <FavoriteButton id={place.id} className="shrink-0 text-muted" />
      </Link>
    );
  }

  if (variant === "feature") {
    return (
      <Link href={href} className="group relative block overflow-hidden rounded-[1.75rem] shadow-[var(--shadow-lift)] transition active:scale-[0.99]">
        <Photo image={place.image} art={place.art} uid={`f-${place.id}`} locale={locale} priority={priority} sizes="(max-width: 768px) 90vw, 600px" className="aspect-[4/5] w-full sm:aspect-[16/11]">
          <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/10 to-transparent" />
        </Photo>
        <div className="absolute left-4 top-4 flex flex-wrap gap-1.5">
          {place.favorite && <FavouriteBadge locale={locale} />}
          {place.demo && <DemoBadge locale={locale} />}
        </div>
        <FavoriteButton id={place.id} className="glass absolute right-3 top-3 text-ink" />
        <div className="absolute inset-x-0 bottom-0 p-5 text-white">
          <p className="text-[0.68rem] font-bold uppercase tracking-[0.16em] text-white/75">
            {category && tx(category.label, locale)}
            {place.area ? ` · ${tx(place.area, locale)}` : ""}
          </p>
          <h3 className="mt-1 text-[1.7rem] leading-tight [text-wrap:balance]">
            <Tx value={place.name} locale={locale} />
          </h3>
          <p className="mt-1.5 line-clamp-2 text-[0.9rem] leading-snug text-white/85">{tx(place.whyWeRecommend ?? place.summary, locale)}</p>
        </div>
      </Link>
    );
  }

  return (
    <Link href={href} className="card group flex h-full flex-col overflow-hidden transition active:scale-[0.99]">
      <Photo image={place.image} art={place.art} uid={`t-${place.id}`} locale={locale} sizes="(max-width: 768px) 70vw, 300px" className="aspect-[4/3] w-full">
        <div className="absolute left-3 top-3 flex flex-wrap gap-1.5">
          {place.favorite && <FavouriteBadge locale={locale} />}
        </div>
        <FavoriteButton id={place.id} className="glass absolute right-2.5 top-2.5 text-ink" />
        {place.demo && <DemoBadge locale={locale} className="absolute bottom-2.5 left-3" />}
      </Photo>
      <div className="flex flex-1 flex-col p-4">
        <p className="text-[0.65rem] font-bold uppercase tracking-[0.14em] text-ocean-500">
          {category && tx(category.label, locale)}
          {place.area ? <span className="text-muted"> · {tx(place.area, locale)}</span> : null}
        </p>
        <h3 className="mt-1 font-display text-[1.2rem] leading-snug">
          <Tx value={place.name} locale={locale} />
        </h3>
        <p className="mt-1 line-clamp-2 text-[0.85rem] leading-snug text-ink-soft">{tx(place.summary, locale)}</p>
        {tags.length > 0 && (
          <div className="mt-auto flex flex-wrap gap-1.5 pt-3">
            {tags.map((t) => (
              <span key={t} className="rounded-full bg-sand-100 px-2.5 py-1 text-[0.7rem] font-semibold text-ink-soft">
                {tx(tagLabels[t], locale)}
              </span>
            ))}
          </div>
        )}
      </div>
    </Link>
  );
}

/** Horizontal, swipeable row of cards. */
export function PlaceCarousel({ places, locale }: { places: Place[]; locale: Locale }) {
  return (
    <div className="no-scrollbar -mx-5 flex snap-x snap-mandatory gap-3.5 overflow-x-auto scroll-px-5 px-5 pb-2">
      {places.map((p) => (
        <div key={p.id} className="w-[72%] max-w-[18rem] shrink-0 snap-start">
          <PlaceCard place={p} locale={locale} />
        </div>
      ))}
    </div>
  );
}
