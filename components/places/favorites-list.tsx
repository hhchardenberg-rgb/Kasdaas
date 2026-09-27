"use client";
import Link from "next/link";
import { Heart } from "lucide-react";
import type { Place } from "@/lib/types";
import { useDict } from "@/components/providers";
import { useFavorites, useRecent } from "@/lib/client-store";
import { PlaceCard } from "./place-card";

export function FavoritesList({ places }: { places: Place[] }) {
  const { t, locale } = useDict();
  const [favs] = useFavorites();
  const [recent] = useRecent();
  const byId = new Map(places.map((p) => [p.id, p]));
  const saved = favs.map((id) => byId.get(id)).filter(Boolean) as Place[];
  const seen = recent.map((id) => byId.get(id)).filter(Boolean).slice(0, 6) as Place[];
  return (
    <div className="space-y-10">
      {saved.length === 0 ? (
        <div className="card flex flex-col items-center p-8 text-center">
          <span className="grid h-14 w-14 place-items-center rounded-full bg-coral-soft text-coral"><Heart className="h-6 w-6" aria-hidden /></span>
          <p className="mt-4 max-w-xs text-ink-soft">{t.favorites.empty}</p>
          <Link href={`/${locale}/discover`} className="mt-5 inline-flex min-h-12 items-center rounded-full bg-ocean-800 px-6 text-sm font-semibold text-white">{t.favorites.explore}</Link>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2">
          {saved.map((p) => <PlaceCard key={p.id} place={p} locale={locale} />)}
        </div>
      )}
      {seen.length > 0 && (
        <section>
          <h2 className="mb-4 text-[1.4rem]">{t.favorites.recent}</h2>
          <div className="space-y-3">
            {seen.map((p) => <PlaceCard key={p.id} place={p} locale={locale} variant="row" />)}
          </div>
        </section>
      )}
    </div>
  );
}
