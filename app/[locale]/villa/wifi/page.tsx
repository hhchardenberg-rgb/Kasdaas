import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Wifi } from "lucide-react";
import { hasValue, isLocale, tx } from "@/lib/i18n";
import { wifi } from "@/lib/content";
import { dictionaries } from "@/content/ui";
import { qrSvg, wifiPayload } from "@/lib/qr";
import { Tx } from "@/components/ui/tx";
import { WifiConnect } from "@/components/villa/wifi-connect";
import { BackButton } from "@/components/ui/back-button";

export const metadata: Metadata = { title: "WiFi" };

export default async function WifiPage({ params }: PageProps<"/[locale]/villa/wifi">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const t = dictionaries[locale];
  const ready = hasValue(wifi.network) && (wifi.security === "nopass" || hasValue(wifi.password));
  const qr = ready ? await qrSvg(wifiPayload(tx(wifi.network, locale), tx(wifi.password, locale), wifi.security)) : null;

  return (
    <div className="pt-bar px-5">
      <div className="mb-5 flex items-center gap-3">
        <BackButton fallback={`/${locale}/villa`} />
      </div>
      <div className="overflow-hidden rounded-[2rem] bg-ocean-900 text-sand-50 shadow-[var(--shadow-lift)]">
        <div className="relative px-6 pt-7 pb-6">
          <div className="absolute -right-10 -top-10 h-44 w-44 rounded-full bg-ocean-700/40" aria-hidden />
          <Wifi className="relative h-8 w-8 text-sand-300" strokeWidth={1.5} aria-hidden />
          <h1 className="relative mt-4 text-4xl">WiFi</h1>
          <dl className="relative mt-6 space-y-4">
            <div>
              <dt className="text-[0.68rem] font-bold uppercase tracking-[0.18em] text-sand-300/80">{t.wifi.network}</dt>
              <dd className="mt-1 break-all text-xl font-semibold"><Tx value={wifi.network} locale={locale} /></dd>
            </div>
            <div>
              <dt className="text-[0.68rem] font-bold uppercase tracking-[0.18em] text-sand-300/80">{t.wifi.password}</dt>
              <dd className="mt-1 break-all font-mono text-xl font-semibold tracking-wide"><Tx value={wifi.password} locale={locale} /></dd>
            </div>
          </dl>
          {ready ? (
            <div className="relative mt-6">
              <WifiConnect ssid={tx(wifi.network, locale)} password={tx(wifi.password, locale)} />
            </div>
          ) : (
            <p className="relative mt-6 rounded-2xl bg-white/10 p-3 text-sm text-sand-100">{t.wifi.notSet}</p>
          )}
        </div>
        {qr && (
          <div className="flex items-center gap-4 bg-white/5 px-6 py-5">
            <div className="h-32 w-32 shrink-0 overflow-hidden rounded-xl bg-white p-1.5" dangerouslySetInnerHTML={{ __html: qr }} />
            <div>
              <p className="font-semibold">{t.wifi.scanTitle}</p>
              <p className="mt-1 text-sm leading-snug text-sand-200/80">{t.wifi.scanText}</p>
            </div>
          </div>
        )}
      </div>

      <div className="mt-6 space-y-3">
        {wifi.extraNetworks.map((n) => (
          <div key={n.name} className="card p-4 text-sm">
            <p className="font-semibold">{n.name}</p>
            <p className="font-mono text-ink-soft">{n.password}</p>
            {n.note && <p className="mt-1 text-muted">{tx(n.note, locale)}</p>}
          </div>
        ))}
        <div className="card p-4">
          <p className="text-[0.68rem] font-bold uppercase tracking-[0.14em] text-muted">{t.wifi.coverage}</p>
          <p className="mt-1 text-[0.92rem]"><Tx value={wifi.coverage} locale={locale} /></p>
        </div>
        <div className="card p-4">
          <p className="text-[0.68rem] font-bold uppercase tracking-[0.14em] text-muted">{t.wifi.router}</p>
          <p className="mt-1 text-[0.92rem]"><Tx value={wifi.router} locale={locale} /></p>
        </div>
        <p className="rounded-2xl bg-sand-100 p-4 text-[0.88rem] leading-relaxed text-ink-soft">{tx(wifi.tip, locale)}</p>
      </div>
    </div>
  );
}
