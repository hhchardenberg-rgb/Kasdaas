import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { isLocale, locales, tx } from "@/lib/i18n";
import { categories, getCategory, placesIn, tagLabels } from "@/lib/content";
import { dictionaries } from "@/content/ui";
import type { PlaceTag } from "@/lib/types";
import { PageHeader } from "@/components/ui/page-header";
import { PlaceBrowser, type BrowserFilter } from "@/components/places/place-browser";

export function generateStaticParams() {
  return locales.flatMap((locale) => categories.map((c) => ({ locale, category: c.id })));
}

export async function generateMetadata({ params }: PageProps<"/[locale]/discover/[category]">): Promise<Metadata> {
  const { locale, category } = await params;
  const c = getCategory(category);
  return { title: c && isLocale(locale) ? tx(c.label, locale) : "Discover" };
}

export default async function CategoryPage({ params }: PageProps<"/[locale]/discover/[category]">) {
  const { locale, category: id } = await params;
  const category = getCategory(id);
  if (!isLocale(locale) || !category) notFound();
  const t = dictionaries[locale];
  const places = placesIn(category.id);
  const tagSet = new Set<PlaceTag>();
  places.forEach((p) => p.tags?.forEach((tag) => tag !== "favorite" && tagSet.add(tag)));
  const filters: BrowserFilter[] = [
    { id: "all", label: t.common.all, kind: "all" },
    ...(places.some((p) => p.favorite) ? [{ id: "favorite", label: t.discover.ourFavourites, kind: "favorite" as const }] : []),
    ...[...tagSet].map((tag) => ({ id: tag, label: tx(tagLabels[tag], locale), kind: "tag" as const, value: tag })),
  ];
  return (
    <>
      <PageHeader title={tx(category.label, locale)} eyebrow={t.discover.title} text={tx(category.intro, locale)} art={category.art} uid={`cat-${category.id}`} locale={locale} compact />
      <div className="px-5 pt-6">
        {category.id === "food" && (
          <Link href={`/${locale}/discover/restaurants`} className="card mb-5 flex items-center justify-between gap-3 p-4 font-semibold">
            {t.discover.restaurants}
            <ArrowRight className="h-5 w-5 text-ocean-700" aria-hidden />
          </Link>
        )}
        <PlaceBrowser places={places} filters={filters} />
      </div>
    </>
  );
}
