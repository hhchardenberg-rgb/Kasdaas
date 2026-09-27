import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArrowRight, LifeBuoy, LogOut, Wifi } from "lucide-react";
import { isLocale, tx } from "@/lib/i18n";
import { houseSections } from "@/lib/content";
import { dictionaries } from "@/content/ui";
import { photos } from "@/content/images";
import { PageHeader } from "@/components/ui/page-header";
import { Photo } from "@/components/ui/photo";

export async function generateMetadata({ params }: PageProps<"/[locale]/villa">): Promise<Metadata> {
  const { locale } = await params;
  return { title: isLocale(locale) ? dictionaries[locale].villa.title : "Villa" };
}

export default async function VillaPage({ params }: PageProps<"/[locale]/villa">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const t = dictionaries[locale];
  const b = `/${locale}/villa`;
  const shortcuts = [
    { href: `${b}/wifi`, icon: Wifi, title: t.villa.wifiTitle, sub: t.villa.wifiSub },
    { href: `${b}/departure`, icon: LogOut, title: t.villa.departureTitle, sub: t.villa.departureSub },
    { href: `/${locale}/help`, icon: LifeBuoy, title: t.villa.helpTitle, sub: t.villa.helpSub },
  ];
  return (
    <>
      <PageHeader title={t.villa.title} eyebrow="Kas Daas" text={t.villa.subtitle} art="interior" image={photos.livingOcean} uid="villa-hdr" locale={locale} back={false} />
      <div className="space-y-10 px-5 pt-6">
        <ul className="grid grid-cols-3 gap-2.5">
          {shortcuts.map(({ href, icon: I, title, sub }) => (
            <li key={href}>
              <Link href={href} className="card flex h-full flex-col gap-3 p-3.5 transition active:scale-[0.98]">
                <span className="grid h-10 w-10 place-items-center rounded-xl bg-ocean-100 text-ocean-800"><I className="h-5 w-5" aria-hidden /></span>
                <span>
                  <span className="block text-[0.9rem] font-semibold leading-tight">{title}</span>
                  <span className="mt-0.5 block text-[0.72rem] leading-snug text-muted">{sub}</span>
                </span>
              </Link>
            </li>
          ))}
        </ul>

        <section>
          <p className="eyebrow mb-4">{t.villa.duringStay}</p>
          <div className="space-y-5">
            {houseSections.map((s, i) => (
              <Link key={s.id} href={`${b}/${s.id}`} className="card group block overflow-hidden transition active:scale-[0.99]">
                <Photo image={s.image} art={s.art} uid={`vs-${s.id}`} locale={locale} priority={i < 2} className="aspect-[16/9] w-full" />
                <div className="flex items-end justify-between gap-4 p-5">
                  <div className="min-w-0">
                    <p className="eyebrow mb-1">{tx(s.eyebrow, locale)} · {s.topics.length} {t.villa.topics}</p>
                    <h2 className="text-[1.55rem] leading-tight">{tx(s.title, locale)}</h2>
                    <p className="mt-1.5 text-[0.9rem] leading-relaxed text-ink-soft">{tx(s.intro, locale)}</p>
                  </div>
                  <ArrowRight className="mb-1 h-5 w-5 shrink-0 text-ocean-700 transition group-hover:translate-x-0.5" aria-hidden />
                </div>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
