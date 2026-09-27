import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import "@fontsource-variable/fraunces";
import "@fontsource-variable/manrope";
import "../globals.css";
import { isLocale, locales, tx } from "@/lib/i18n";
import { site } from "@/lib/content";
import { publicPaths } from "@/lib/routes";
import { LocaleProvider } from "@/components/providers";
import { TopBar } from "@/components/layout/top-bar";
import { BottomNav } from "@/components/layout/bottom-nav";
import { ServiceWorkerRegister } from "@/components/pwa/sw-register";
import { OfflineIndicator } from "@/components/pwa/offline-indicator";
import { InstallPrompt } from "@/components/pwa/install-prompt";
import { Splash } from "@/components/pwa/splash";
import { NavigationTracker } from "@/components/layout/navigation-tracker";

export const dynamicParams = false;

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: LayoutProps<"/[locale]">): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  return {
    metadataBase: new URL(site.url),
    title: { default: `Kas Daas — ${tx(site.tagline, locale)}`, template: "%s · Kas Daas" },
    description: tx(site.description, locale),
    applicationName: "Kas Daas",
    manifest: "/manifest.webmanifest",
    appleWebApp: { capable: true, title: "Kas Daas", statusBarStyle: "default" },
    formatDetection: { telephone: false },
    icons: {
      icon: [{ url: "/icons/favicon.svg", type: "image/svg+xml" }, { url: "/icons/icon-192.png", sizes: "192x192" }],
      apple: [{ url: "/icons/apple-touch-icon.png", sizes: "180x180" }],
    },
    robots: site.indexable ? { index: true, follow: true } : { index: false, follow: false },
    alternates: { languages: { nl: "/nl", en: "/en" } },
    openGraph: {
      siteName: "Kas Daas",
      title: "Kas Daas",
      description: tx(site.description, locale),
      locale: locale === "nl" ? "nl_NL" : "en_US",
      type: "website",
    },
  };
}

export const viewport: Viewport = {
  themeColor: "#fbf8f3",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default async function LocaleLayout({ children, params }: LayoutProps<"/[locale]">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return (
    <html lang={locale}>
      <body>
        <LocaleProvider locale={locale}>
          <a
            href="#main"
            className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[70] focus:rounded-full focus:bg-white focus:px-4 focus:py-2"
          >
            {locale === "nl" ? "Naar de inhoud" : "Skip to content"}
          </a>
          <NavigationTracker />
          <Splash />
          <TopBar />
          <OfflineIndicator />
          <main id="main" className="mx-auto min-h-dvh max-w-3xl pb-nav">
            {children}
          </main>
          <BottomNav />
          <InstallPrompt />
          <ServiceWorkerRegister warm={publicPaths(locale)} />
        </LocaleProvider>
      </body>
    </html>
  );
}
