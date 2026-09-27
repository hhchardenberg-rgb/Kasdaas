import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale, tx } from "@/lib/i18n";
import { diningStyles, restaurants } from "@/lib/content";
import { dictionaries } from "@/content/ui";
import { PageHeader } from "@/components/ui/page-header";
import { PlaceBrowser, type BrowserFilter } from "@/components/places/place-browser";

export async function generateMetadata({ params }: PageProps<"/[locale]/discover/restaurants">): Promise<Metadata> {
  const { locale } = await params;
  return { title: isLocale(locale) ? dictionaries[locale].discover.restaurants : "Restaurants" };
}

export default async function RestaurantsPage({ params }: PageProps<"/[locale]/discover/restaurants">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const t = dictionaries[locale];
  const list = restaurants().sort((a, b) => Number(!!b.favorite) - Number(!!a.favorite));
  const used = new Set(list.flatMap((p) => p.restaurant?.styles ?? []));
  const filters: BrowserFilter[] = [
    { id: "all", label: t.common.all, kind: "all" },
    { id: "favorite", label: t.discover.ourFavourites, kind: "favorite" },
    ...diningStyles.filter((s) => used.has(s.id)).map((s) => ({ id: s.id, label: tx(s.label, locale), kind: "style" as const, value: s.id })),
  ];
  return (
    <>
      <PageHeader title={t.discover.restaurants} eyebrow={t.brand.recommends} text={t.discover.restaurantsText} art="food" uid="rest-hdr" locale={locale} compact />
      <div className="px-5 pt-6">
        <PlaceBrowser places={list} filters={filters} />
      </div>
    </>
  );
}
