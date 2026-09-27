import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ChevronDown, ChevronRight } from "lucide-react";
import { isLocale, tx } from "@/lib/i18n";
import { getPlace, practical } from "@/lib/content";
import { dictionaries } from "@/content/ui";
import { photos } from "@/content/images";
import { PageHeader } from "@/components/ui/page-header";
import { Icon } from "@/components/ui/icon";
import { Tx } from "@/components/ui/tx";
import { HashOpener } from "@/components/villa/hash-opener";

export async function generateMetadata({ params }: PageProps<"/[locale]/good-to-know">): Promise<Metadata> {
  const { locale } = await params;
  return { title: isLocale(locale) ? dictionaries[locale].practical.title : "Good to know" };
}

export default async function GoodToKnowPage({ params }: PageProps<"/[locale]/good-to-know">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const t = dictionaries[locale];
  return (
    <>
      <HashOpener />
      <PageHeader title={t.practical.title} eyebrow="Bonaire" text={t.practical.subtitle} art="nature" image={photos.flamingos} uid="gtk-hdr" locale={locale} compact />
      <div className="space-y-3 px-5 pt-6">
        {practical.map((p) => (
          <details key={p.id} id={p.id} className="card scroll-mt-24 overflow-hidden [&[open]_.chev]:rotate-180">
            <summary className="flex min-h-16 cursor-pointer items-center gap-4 px-4 py-3.5">
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-sand-100 text-ocean-700"><Icon name={p.icon} className="h-5 w-5" /></span>
              <span className="flex-1 font-semibold">{tx(p.title, locale)}</span>
              <ChevronDown className="chev h-5 w-5 text-muted transition-transform" aria-hidden />
            </summary>
            <div className="prose-kd px-4 pb-5 pl-[4.75rem] text-[0.95rem] leading-relaxed text-ink-soft">
              {p.body.map((b, i) => <p key={i}><Tx value={b} locale={locale} /></p>)}
              {p.placeIds && (
                <ul className="mt-4 space-y-2">
                  {p.placeIds.map(getPlace).filter(Boolean).map((pl) => (
                    <li key={pl!.id}>
                      <Link href={`/${locale}/places/${pl!.id}`} className="flex min-h-11 items-center justify-between gap-2 rounded-xl bg-sand-100 px-3.5 py-2 text-sm font-semibold text-ink">
                        <Tx value={pl!.name} locale={locale} />
                        <ChevronRight className="h-4 w-4 shrink-0 text-muted" aria-hidden />
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </details>
        ))}
      </div>
    </>
  );
}
