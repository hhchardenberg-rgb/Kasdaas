import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ChevronRight } from "lucide-react";
import { isLocale, locales, tx } from "@/lib/i18n";
import { getItinerary, getPlace, itineraries } from "@/lib/content";
import { dictionaries } from "@/content/ui";
import { PageHeader } from "@/components/ui/page-header";
import { Icon } from "@/components/ui/icon";
import { Tx } from "@/components/ui/tx";
import { DemoBadge } from "@/components/places/place-card";
import { ShareButton } from "@/components/ui/share-button";

export function generateStaticParams() {
  return locales.flatMap((locale) => itineraries.map((i) => ({ locale, id: i.id })));
}

export async function generateMetadata({ params }: PageProps<"/[locale]/plans/[id]">): Promise<Metadata> {
  const { locale, id } = await params;
  const it = getItinerary(id);
  return { title: it && isLocale(locale) ? tx(it.title, locale) : "Plan" };
}

export default async function PlanPage({ params }: PageProps<"/[locale]/plans/[id]">) {
  const { locale, id } = await params;
  const it = getItinerary(id);
  if (!isLocale(locale) || !it) notFound();
  const t = dictionaries[locale];
  const multi = it.days.length > 1;
  return (
    <>
      <PageHeader title={tx(it.title, locale)} eyebrow={tx(it.length, locale)} text={tx(it.subtitle, locale)} art={it.art} image={it.image} uid={`plan-${it.id}`} locale={locale} />
      <div className="px-5 pt-6">
        <div className="mb-6 flex items-center justify-between gap-3">
          <p className="text-sm italic text-muted">{t.plans.suggestion}</p>
          <ShareButton title={tx(it.title, locale)} className="bg-white text-ink shadow-[var(--shadow-soft)]" />
        </div>
        {it.demo && <DemoBadge locale={locale} className="mb-6 !bg-coral-soft" />}

        {multi && (
          <nav className="no-scrollbar -mx-5 mb-8 flex gap-2 overflow-x-auto px-5" aria-label={t.plans.day}>
            {it.days.map((d, i) => (
              <a key={i} href={`#day-${i + 1}`} className="chip bg-white text-ink-soft shadow-[var(--shadow-soft)]">{t.plans.day} {i + 1}</a>
            ))}
          </nav>
        )}

        <div className="space-y-10">
          {it.days.map((day, di) => (
            <section key={di} id={`day-${di + 1}`} className="scroll-mt-24">
              {day.title && <h2 className="mb-5 text-[1.45rem]">{tx(day.title, locale)}</h2>}
              <ol className="relative">
                <span className="absolute bottom-6 left-[3.35rem] top-6 w-px bg-sand-300" aria-hidden />
                {day.steps.map((s, si) => {
                  const place = s.placeId ? getPlace(s.placeId) : undefined;
                  const body = (
                    <>
                      <span className="block font-semibold leading-snug text-ink">{tx(s.title, locale)}</span>
                      {s.text && <span className="mt-0.5 block text-[0.85rem] leading-snug text-ink-soft">{tx(s.text, locale)}</span>}
                      {place && (
                        <span className="mt-1 inline-flex items-center gap-0.5 text-[0.8rem] font-semibold text-ocean-700">
                          <Tx value={place.name} locale={locale} />
                          <ChevronRight className="h-3.5 w-3.5" aria-hidden />
                        </span>
                      )}
                    </>
                  );
                  return (
                    <li key={si} className="relative flex items-start gap-3 pb-5">
                      <time className="w-10 shrink-0 pt-3 text-right font-display text-[0.95rem] tabular-nums text-ink-soft">{s.time}</time>
                      <span className="relative z-10 mt-1.5 grid h-8 w-8 shrink-0 place-items-center rounded-full bg-white text-ocean-700 shadow-[var(--shadow-soft)] ring-4 ring-sand-50">
                        <Icon name={s.icon ?? "sun"} className="h-4 w-4" />
                      </span>
                      {place ? (
                        <Link href={`/${locale}/places/${place.id}`} className="card min-w-0 flex-1 p-4 transition active:scale-[0.99]">{body}</Link>
                      ) : (
                        <div className="card min-w-0 flex-1 p-4">{body}</div>
                      )}
                    </li>
                  );
                })}
              </ol>
            </section>
          ))}
        </div>
      </div>
    </>
  );
}
