import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { AlertTriangle, ChevronDown } from "lucide-react";
import { isLocale, tx } from "@/lib/i18n";
import { problems, site } from "@/lib/content";
import { dictionaries } from "@/content/ui";
import { photos } from "@/content/images";
import { PageHeader } from "@/components/ui/page-header";
import { Icon } from "@/components/ui/icon";
import { Tx } from "@/components/ui/tx";
import { ContactList, HostCard } from "@/components/villa/contact";
import { HashOpener } from "@/components/villa/hash-opener";

export async function generateMetadata({ params }: PageProps<"/[locale]/help">): Promise<Metadata> {
  const { locale } = await params;
  return { title: isLocale(locale) ? dictionaries[locale].help.title : "Help" };
}

export default async function HelpPage({ params }: PageProps<"/[locale]/help">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const t = dictionaries[locale];
  return (
    <>
      <HashOpener />
      <PageHeader title={t.help.title} eyebrow="Kas Daas" text={t.help.subtitle} art="terrace" image={photos.palapaLounge} uid="help-hdr" locale={locale} compact />
      <div className="space-y-10 px-5 pt-6">
        <HostCard locale={locale} />

        <section>
          <h2 className="text-[1.5rem]">{t.help.problems}</h2>
          <div className="mt-4 space-y-3">
            {problems.map((p) => (
              <details key={p.id} id={p.id} className="card scroll-mt-24 overflow-hidden [&[open]_.chev]:rotate-180">
                <summary className="flex min-h-16 cursor-pointer items-center gap-4 px-4 py-3.5">
                  <span className={`grid h-11 w-11 shrink-0 place-items-center rounded-2xl ${p.urgent ? "bg-danger/10 text-danger" : "bg-sand-100 text-ocean-700"}`}>
                    <Icon name={p.icon} className="h-5 w-5" />
                  </span>
                  <span className="flex-1 font-semibold">{tx(p.title, locale)}</span>
                  <ChevronDown className="chev h-5 w-5 text-muted transition-transform" aria-hidden />
                </summary>
                <div className="px-4 pb-5">
                  <p className="mb-2 text-[0.68rem] font-bold uppercase tracking-[0.14em] text-muted">{t.help.tryFirst}</p>
                  <ol className="space-y-2.5">
                    {p.steps.map((s, i) => (
                      <li key={i} className="flex gap-3 text-[0.93rem]">
                        <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-ocean-100 text-xs font-bold text-ocean-800">{i + 1}</span>
                        <span><Tx value={s} locale={locale} /></span>
                      </li>
                    ))}
                  </ol>
                  {p.escalate && (
                    <p className="mt-4 rounded-2xl bg-sand-100 p-3.5 text-[0.88rem]">
                      <b>{t.help.stillStuck}</b> {tx(p.escalate, locale)}
                    </p>
                  )}
                </div>
              </details>
            ))}
          </div>
        </section>

        <section id="emergency-numbers" className="scroll-mt-24">
          <h2 className="text-[1.5rem]">{t.help.emergency}</h2>
          <p className="mt-1 mb-4 flex items-center gap-2 text-sm text-danger">
            <AlertTriangle className="h-4 w-4" aria-hidden />
            {t.help.emergencyText}
          </p>
          <ContactList contacts={site.emergencyContacts} locale={locale} />
          <h3 className="mt-6 mb-3 text-[1.15rem]">{t.help.generalQuestions}</h3>
          <ContactList contacts={site.generalContacts} locale={locale} />
          <div className="mt-3 rounded-2xl bg-sand-100 p-4 text-sm">
            <p className="text-[0.68rem] font-bold uppercase tracking-[0.14em] text-muted">{t.help.yourLocation}</p>
            <p className="mt-1 font-semibold">Kas Daas · {site.home.area}</p>
            <p className="mt-0.5"><Tx value={site.home.address} locale={locale} /></p>
            {!site.home.coordinates.placeholder && (
              <p className="mt-0.5 font-mono text-[0.82rem] text-ink-soft">GPS {site.home.coordinates.lat}, {site.home.coordinates.lng}</p>
            )}
          </div>
        </section>
      </div>
    </>
  );
}
