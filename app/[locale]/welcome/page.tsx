import { Suspense } from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale, tx } from "@/lib/i18n";
import { site } from "@/lib/content";
import { dictionaries } from "@/content/ui";
import { whatsappUrl } from "@/lib/links";
import { Photo } from "@/components/ui/photo";
import { LangSwitch } from "@/components/layout/lang-switch";
import { UnlockForm } from "@/components/welcome/unlock-form";

export const metadata: Metadata = { title: "Welcome", robots: { index: false, follow: false } };

/** Password screen in front of the guide (see proxy.ts). */
export default async function WelcomePage({ params }: PageProps<"/[locale]/welcome">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const t = dictionaries[locale];
  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-ocean-950">
      <div className="fixed inset-0">
        <Photo image={site.heroImage} art="villa" uid="welcome" locale={locale} priority className="h-full w-full">
          <div className="absolute inset-0 bg-gradient-to-b from-ink/40 via-ink/30 to-ink/85" />
        </Photo>
      </div>
      <div className="relative mx-auto flex min-h-full max-w-md flex-col px-6 pt-[calc(var(--safe-top)+1.25rem)] pb-[calc(var(--safe-bottom)+2rem)]">
        <div className="flex items-center justify-between">
          <p className="font-display text-2xl text-white">Kas Daas</p>
          <LangSwitch />
        </div>
        <div className="mt-auto pt-24 text-white">
          <p className="mb-3 text-[0.7rem] font-bold uppercase tracking-[0.3em] text-white/75">Bonaire</p>
          <h1 className="text-[2.6rem] leading-[1.02] [text-wrap:balance]">{t.welcome.title}</h1>
          <p className="mt-3 mb-7 text-[0.98rem] leading-relaxed text-white/85">{t.welcome.text}</p>
          <Suspense>
            <UnlockForm whatsapp={whatsappUrl(site.host.whatsapp, tx(site.whatsappGreeting, locale))} />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
