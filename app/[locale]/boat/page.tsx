import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Check, MessageCircle, Phone } from "lucide-react";
import { isLocale, tx } from "@/lib/i18n";
import { boatRental, site } from "@/lib/content";
import { dictionaries } from "@/content/ui";
import { telUrl, whatsappUrl } from "@/lib/links";
import { Photo } from "@/components/ui/photo";
import { Icon } from "@/components/ui/icon";
import { Tx } from "@/components/ui/tx";
import { ActionLink } from "@/components/ui/action-button";
import { BoatLinkNotice } from "@/components/boat/link-notice";

export async function generateMetadata({ params }: PageProps<"/[locale]/boat">): Promise<Metadata> {
  const { locale } = await params;
  return { title: isLocale(locale) ? tx(boatRental.title, locale) : "Boat" };
}

export default async function BoatPage({ params }: PageProps<"/[locale]/boat">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const t = dictionaries[locale];
  const r = boatRental;
  const wa = whatsappUrl(site.host.whatsapp, tx(r.whatsappMessage, locale));
  const call = telUrl(site.host.phone);
  const [first, ...more] = r.gallery;

  return (
    <>
      <section className="relative">
        <Photo image={first} art="boat" uid="boat-hero" locale={locale} priority hint hintClassName="right-4 top-[calc(var(--safe-top)+4.5rem)]" className="h-[80svh] max-h-[40rem] min-h-[30rem] w-full">
          <div className="absolute inset-0 bg-gradient-to-t from-ocean-950/85 via-ocean-950/10 to-transparent" />
        </Photo>
        <div className="absolute inset-x-0 bottom-0 px-5 pb-8 text-white">
          <p className="mb-2 text-[0.7rem] font-bold uppercase tracking-[0.25em] text-white/75">{tx(r.eyebrow, locale)} · {tx(r.subtitle, locale)}</p>
          <h1 className="text-[2.6rem] leading-[1.02] [text-wrap:balance]">{tx(r.title, locale)}</h1>
        </div>
      </section>

      <div className="space-y-10 px-5 pt-7">
        <BoatLinkNotice />
        <div>
          <p className="font-display text-[1.3rem] leading-snug text-ink">{tx(r.intro, locale)}</p>
          <p className="mt-4 text-sm text-muted"><Tx value={r.boatName} locale={locale} /></p>
          <div className="mt-3 space-y-3 leading-relaxed text-ink-soft">
            {r.description.map((d, i) => <p key={i}><Tx value={d} locale={locale} /></p>)}
          </div>
        </div>

        {more.length > 0 && (
          <div className="no-scrollbar -mx-5 flex snap-x gap-3 overflow-x-auto px-5">
            {more.map((img, i) => (
              <Photo key={img.src} image={img} art="boat" uid={`bg-${i}`} locale={locale} sizes="80vw" className="aspect-[4/3] w-[80%] shrink-0 snap-start rounded-[1.25rem]" />
            ))}
          </div>
        )}

        <section>
          <h2 className="mb-4 text-[1.45rem]">{t.boat.ideas}</h2>
          <ul className="space-y-2.5">
            {r.ideas.map((idea, i) => (
              <li key={i} className="flex items-center gap-3 font-display text-[1.1rem] text-ink">
                <span className="h-px w-6 bg-gold" aria-hidden />
                {tx(idea, locale)}
              </li>
            ))}
          </ul>
        </section>

        <section>
          <h2 className="mb-4 text-[1.45rem]">{t.boat.facts}</h2>
          <dl className="grid grid-cols-2 gap-2.5">
            {r.facts.map((f) => (
              <div key={f.id} className="card p-4">
                <dt className="flex items-center gap-1.5 text-[0.66rem] font-bold uppercase tracking-[0.14em] text-ocean-500">
                  <Icon name={f.icon} className="h-3.5 w-3.5" />
                  {tx(f.label, locale)}
                </dt>
                <dd className="mt-2 text-[0.9rem] font-semibold leading-snug"><Tx value={f.value} locale={locale} /></dd>
              </div>
            ))}
          </dl>
        </section>

        <section className="grid gap-4 sm:grid-cols-2">
          <div className="card p-5">
            <h2 className="mb-3 text-[1.2rem]">{t.boat.included}</h2>
            <ul className="space-y-2 text-[0.92rem]">
              {r.included.map((x, i) => (
                <li key={i} className="flex gap-2.5"><Check className="mt-0.5 h-4 w-4 shrink-0 text-sage" aria-hidden /><Tx value={x} locale={locale} /></li>
              ))}
            </ul>
          </div>
          <div className="card p-5">
            <h2 className="mb-3 text-[1.2rem]">{t.boat.conditions}</h2>
            <ul className="space-y-2 text-[0.92rem] text-ink-soft">
              {r.conditions.map((x, i) => <li key={i}><Tx value={x} locale={locale} /></li>)}
            </ul>
          </div>
        </section>

        <section className="rounded-[1.75rem] bg-ocean-900 p-6 text-sand-50">
          <p className="text-[0.68rem] font-bold uppercase tracking-[0.2em] text-sand-300">{tx(r.subtitle, locale)}</p>
          <h2 className="mt-2 text-[1.7rem] leading-tight">{tx(r.ctaText, locale)}</h2>
          <div className="mt-5 flex flex-col gap-2.5">
            {wa && <ActionLink href={wa} icon={MessageCircle} external netLabel={t.common.needsInternet} className="!bg-sand-50 !text-ocean-900">{t.boat.contact}</ActionLink>}
            {call && <ActionLink href={call} icon={Phone} className="!bg-white/10 !text-sand-50 !shadow-none">{t.boat.call}</ActionLink>}
            {!wa && !call && (
              <Link href={`/${locale}/help`} className="inline-flex min-h-12 items-center justify-center rounded-full bg-sand-50 px-5 text-[0.9rem] font-semibold text-ocean-900">
                {tx(r.ctaText, locale)}
              </Link>
            )}
          </div>
          <p className="mt-4 text-xs leading-relaxed text-sand-200/70">{tx(r.disclaimer, locale)}</p>
        </section>
      </div>
    </>
  );
}
