import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale, tx } from "@/lib/i18n";
import { getPlaces, mapGroups, site } from "@/lib/content";
import { dictionaries } from "@/content/ui";
import { placeRouteUrl } from "@/lib/links";
import { categories } from "@/content/categories";
import { MapView, type MapPoint } from "@/components/map/map-view";

export async function generateMetadata({ params }: PageProps<"/[locale]/map">): Promise<Metadata> {
  const { locale } = await params;
  return { title: isLocale(locale) ? dictionaries[locale].map.title : "Map" };
}

export default async function MapPage({ params }: PageProps<"/[locale]/map">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const t = dictionaries[locale];
  const points: MapPoint[] = getPlaces()
    .filter((p) => p.coordinates && !p.coordinates.placeholder)
    .map((p) => ({
      id: p.id,
      name: tx(p.name, locale),
      sub: [tx(categories.find((c) => c.id === p.category)!.label, locale), p.area ? tx(p.area, locale) : ""].filter(Boolean).join(" · "),
      lat: p.coordinates!.lat,
      lng: p.coordinates!.lng,
      group: mapGroups.find((g) => g.categories.includes(p.category))?.id ?? "activity",
      href: `/${locale}/places/${p.id}`,
      route: placeRouteUrl(p),
    }));
  const home = site.home.coordinates;
  return (
    <div className="pt-bar px-5">
      <p className="eyebrow mb-1.5">Bonaire</p>
      <h1 className="text-[2.1rem] leading-tight">{t.map.title}</h1>
      <p className="mt-1.5 mb-5 text-[0.95rem] text-ink-soft">{t.map.subtitle}</p>
      <MapView
        points={points}
        groups={mapGroups.map((g) => ({ id: g.id, label: tx(g.label, locale), color: g.color }))}
        home={{ lat: home.lat, lng: home.lng, label: home.placeholder ? `${t.map.home} (${t.map.homePlaceholder})` : t.map.home, placeholder: home.placeholder }}
      />
    </div>
  );
}
