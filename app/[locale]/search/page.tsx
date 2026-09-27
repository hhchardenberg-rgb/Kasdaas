import { Suspense } from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale } from "@/lib/i18n";
import { dictionaries } from "@/content/ui";
import { buildSearchIndex } from "@/lib/search-index";
import { SearchClient } from "@/components/search/search-client";

export async function generateMetadata({ params }: PageProps<"/[locale]/search">): Promise<Metadata> {
  const { locale } = await params;
  return { title: isLocale(locale) ? dictionaries[locale].search.title : "Search" };
}

export default async function SearchPage({ params }: PageProps<"/[locale]/search">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const t = dictionaries[locale];
  return (
    <div className="pt-bar px-5">
      <h1 className="mb-5 text-[2.1rem] leading-tight">{t.search.title}</h1>
      <Suspense fallback={<div className="h-14 animate-pulse rounded-full bg-white shadow-[var(--shadow-soft)]" />}>
        <SearchClient index={buildSearchIndex(locale)} />
      </Suspense>
    </div>
  );
}
