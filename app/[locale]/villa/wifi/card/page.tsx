import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { hasValue, isLocale, tx } from "@/lib/i18n";
import { wifi } from "@/lib/content";
import { dictionaries } from "@/content/ui";
import { qrSvg, wifiPayload } from "@/lib/qr";
import { PrintButton } from "@/components/villa/print-button";
import { BackButton } from "@/components/ui/back-button";

export const metadata: Metadata = { title: "WiFi card", robots: { index: false } };

/**
 * Printable WiFi card for in the villa. Scanning the QR code with the camera
 * (iPhone and Android) joins the network with one tap. Bilingual on purpose.
 */
export default async function WifiCardPage({ params }: PageProps<"/[locale]/villa/wifi/card">) {
  const { locale } = await params;
  if (!isLocale(locale) || !hasValue(wifi.network)) notFound();
  const t = dictionaries[locale];
  const ssid = tx(wifi.network, locale);
  const password = tx(wifi.password, locale);
  const qr = await qrSvg(wifiPayload(ssid, password, wifi.security), "#0d3642");
  return (
    <div className="pt-bar px-5 print:p-0">
      <div className="mb-5 flex items-center justify-between print:hidden">
        <BackButton fallback={`/${locale}/villa/wifi`} />
        <PrintButton label={t.wifi.print} />
      </div>
      <article className="mx-auto max-w-sm rounded-[2rem] bg-white p-8 text-center shadow-[var(--shadow-lift)] print:max-w-none print:shadow-none">
        <p className="font-display text-3xl tracking-tight">Kas Daas</p>
        <p className="mt-1 text-[0.6rem] font-bold uppercase tracking-[0.3em] text-muted">Bonaire</p>
        <h1 className="mt-8 text-5xl">WiFi</h1>
        <div className="mx-auto mt-6 w-60" dangerouslySetInnerHTML={{ __html: qr }} />
        <p className="mt-3 text-sm font-semibold">{dictionaries.nl.wifi.cardScan}</p>
        <p className="text-sm text-muted">{dictionaries.en.wifi.cardScan}</p>
        <dl className="mt-8 space-y-4">
          <div>
            <dt className="text-[0.65rem] font-bold uppercase tracking-[0.2em] text-muted">{dictionaries.nl.wifi.network} · {dictionaries.en.wifi.network}</dt>
            <dd className="mt-1 text-2xl font-semibold">{ssid}</dd>
          </div>
          <div>
            <dt className="text-[0.65rem] font-bold uppercase tracking-[0.2em] text-muted">{dictionaries.nl.wifi.password} · {dictionaries.en.wifi.password}</dt>
            <dd className="mt-1 font-mono text-2xl font-semibold">{password}</dd>
          </div>
        </dl>
      </article>
    </div>
  );
}
