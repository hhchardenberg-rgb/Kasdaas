import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale, tx } from "@/lib/i18n";
import { departure, stay } from "@/lib/content";
import { dictionaries } from "@/content/ui";
import { photos } from "@/content/images";
import { toRows } from "@/lib/checklist";
import { PageHeader } from "@/components/ui/page-header";
import { Checklist } from "@/components/ui/checklist";
import { Tx } from "@/components/ui/tx";

export async function generateMetadata({ params }: PageProps<"/[locale]/villa/departure">): Promise<Metadata> {
  const { locale } = await params;
  return { title: isLocale(locale) ? `${dictionaries[locale].departure.title} · Check-out` : "Check-out" };
}

export default async function DeparturePage({ params }: PageProps<"/[locale]/villa/departure">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const t = dictionaries[locale];
  return (
    <>
      <PageHeader title={t.departure.title} eyebrow="Check-out" text={tx(departure.intro, locale)} art="sunset" image={photos.deckSunset} uid="dep-hdr" locale={locale} compact />
      <div className="px-5 pt-6">
        <div className="card mb-6 flex items-center justify-between gap-4 p-5">
          <div>
            <p className="text-[0.68rem] font-bold uppercase tracking-[0.14em] text-muted">{t.departure.checkoutTime}</p>
            <p className="mt-1 font-display text-3xl"><Tx value={stay.checkOutTime} locale={locale} /></p>
          </div>
          <p className="max-w-[45%] text-right text-xs text-muted"><Tx value={stay.lateCheckOut} locale={locale} /></p>
        </div>
        <Checklist storageKey="departure" items={toRows(departure.checklist, locale)} doneText={t.departure.allDone} />
        <p className="mt-10 text-center font-display text-xl italic leading-snug text-ink-soft">{tx(departure.goodbye, locale)}</p>
      </div>
    </>
  );
}
