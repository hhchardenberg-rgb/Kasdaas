import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale, tx } from "@/lib/i18n";
import { itineraries } from "@/lib/content";
import { dictionaries } from "@/content/ui";
import { PageHeader } from "@/components/ui/page-header";
import { Photo } from "@/components/ui/photo";

export async function generateMetadata({ params }: PageProps<"/[locale]/plans">): Promise<Metadata> {
  const { locale } = await params;
  return { title: isLocale(locale) ? dictionaries[locale].plans.title : "Day plans" };
}

export default async function PlansPage({ params }: PageProps<"/[locale]/plans">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const t = dictionaries[locale];
  return (
    <>
      <PageHeader title={t.plans.title} eyebrow={t.brand.perfectDay} text={t.plans.subtitle} art="sunset" uid="plans-hdr" locale={locale} compact />
      <div className="grid gap-4 px-5 pt-6 sm:grid-cols-2">
        {itineraries.map((it) => (
          <Link key={it.id} href={`/${locale}/plans/${it.id}`} className="card group flex overflow-hidden transition active:scale-[0.99]">
            <Photo image={it.image} art={it.art} uid={`pl-${it.id}`} locale={locale} className="w-28 shrink-0" />
            <div className="min-w-0 flex-1 p-4">
              <p className="text-[0.64rem] font-bold uppercase tracking-[0.16em] text-ocean-500">{tx(it.length, locale)}</p>
              <h2 className="mt-1 text-[1.25rem] leading-tight">{tx(it.title, locale)}</h2>
              <p className="mt-1 text-[0.84rem] leading-snug text-ink-soft">{tx(it.subtitle, locale)}</p>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
}
