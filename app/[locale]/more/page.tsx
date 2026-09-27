import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CalendarDays, ChevronRight, Heart, Info, LifeBuoy, Map as MapIcon, Search, Utensils, type LucideIcon } from "lucide-react";
import { isLocale } from "@/lib/i18n";
import { dictionaries } from "@/content/ui";
import { AppSettings } from "@/components/more/app-settings";

export async function generateMetadata({ params }: PageProps<"/[locale]/more">): Promise<Metadata> {
  const { locale } = await params;
  return { title: isLocale(locale) ? dictionaries[locale].more.title : "More" };
}

export default async function MorePage({ params }: PageProps<"/[locale]/more">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const t = dictionaries[locale];
  const b = `/${locale}`;
  const links: [string, LucideIcon, string][] = [
    [`${b}/favorites`, Heart, t.favorites.title],
    [`${b}/good-to-know`, Info, t.practical.title],
    [`${b}/plans`, CalendarDays, t.plans.title],
    [`${b}/map`, MapIcon, t.map.title],
    [`${b}/discover/restaurants`, Utensils, t.discover.restaurants],
    [`${b}/help`, LifeBuoy, t.help.title],
    [`${b}/search`, Search, t.search.title],
  ];
  return (
    <div className="pt-bar space-y-10 px-5">
      <div>
        <h1 className="text-[2.1rem] leading-tight">{t.more.title}</h1>
        <p className="mt-1.5 text-[0.95rem] text-ink-soft">{t.more.subtitle}</p>
      </div>
      <section>
        <p className="eyebrow mb-3">{t.more.guide}</p>
        <ul className="card divide-y divide-sand-100 overflow-hidden">
          {links.map(([href, I, label]) => (
            <li key={href}>
              <Link href={href} className="flex min-h-15 items-center gap-4 px-4 py-3 active:bg-sand-100">
                <I className="h-5 w-5 text-ocean-700" strokeWidth={1.7} aria-hidden />
                <span className="flex-1 font-semibold">{label}</span>
                <ChevronRight className="h-5 w-5 text-muted" aria-hidden />
              </Link>
            </li>
          ))}
        </ul>
      </section>
      <section>
        <p className="eyebrow mb-3">{t.more.app}</p>
        <AppSettings />
      </section>
      <section className="rounded-[1.5rem] bg-ocean-900 p-6 text-sand-50">
        <p className="font-display text-2xl">Kas Daas</p>
        <p className="mt-1 text-[0.65rem] font-bold uppercase tracking-[0.3em] text-sand-300">Bonaire</p>
        <h2 className="mt-5 text-lg">{t.more.about}</h2>
        <p className="mt-1 text-sm leading-relaxed text-sand-100/85">{t.more.aboutText}</p>
      </section>
    </div>
  );
}
