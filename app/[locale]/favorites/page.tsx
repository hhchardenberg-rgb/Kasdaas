import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale } from "@/lib/i18n";
import { getPlaces } from "@/lib/content";
import { dictionaries } from "@/content/ui";
import { FavoritesList } from "@/components/places/favorites-list";

export async function generateMetadata({ params }: PageProps<"/[locale]/favorites">): Promise<Metadata> {
  const { locale } = await params;
  return { title: isLocale(locale) ? dictionaries[locale].favorites.title : "My Bonaire" };
}

export default async function FavoritesPage({ params }: PageProps<"/[locale]/favorites">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const t = dictionaries[locale];
  return (
    <div className="pt-bar px-5">
      <p className="eyebrow mb-1.5">Kas Daas</p>
      <h1 className="text-[2.1rem] leading-tight">{t.favorites.title}</h1>
      <p className="mt-1.5 mb-6 text-[0.95rem] text-ink-soft">{t.favorites.subtitle}</p>
      <FavoritesList places={getPlaces()} />
    </div>
  );
}
