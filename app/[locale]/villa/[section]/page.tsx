import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Navigation } from "lucide-react";
import { hasValue, isLocale, locales, tx, type Locale } from "@/lib/i18n";
import { getSection, houseSections, site } from "@/lib/content";
import { dictionaries } from "@/content/ui";
import { routeUrl } from "@/lib/links";
import { PageHeader } from "@/components/ui/page-header";
import { TopicCard } from "@/components/villa/topic";
import { HashOpener } from "@/components/villa/hash-opener";
import { HostCard } from "@/components/villa/contact";
import { ActionLink } from "@/components/ui/action-button";
import { CopyButton } from "@/components/ui/copy-button";

export function generateStaticParams() {
  return locales.flatMap((locale) => houseSections.map((s) => ({ locale, section: s.id })));
}

export async function generateMetadata({ params }: PageProps<"/[locale]/villa/[section]">): Promise<Metadata> {
  const { locale, section } = await params;
  const s = getSection(section);
  return { title: s && isLocale(locale) ? tx(s.title, locale) : "Villa" };
}

/** Extra actions for specific topics (route button, copy address, contact). */
function extras(topicId: string, locale: Locale): React.ReactNode {
  const t = dictionaries[locale];
  if (topicId === "route") {
    const url = hasValue(site.home.mapsUrl) ? tx(site.home.mapsUrl, locale) : routeUrl({ coordinates: site.home.coordinates });
    return url ? <ActionLink href={url} icon={Navigation} variant="primary" external netLabel={t.common.needsInternet}>{t.common.route}</ActionLink> : null;
  }
  if (topicId === "address") {
    const c = site.home.coordinates;
    const value = hasValue(site.home.address) ? tx(site.home.address, locale) : c.placeholder ? null : `${c.lat}, ${c.lng}`;
    return value ? <CopyButton value={value} label={t.common.copy} /> : null;
  }
  if (topicId === "contact-person") return <HostCard locale={locale} />;
  return null;
}

export default async function SectionPage({ params }: PageProps<"/[locale]/villa/[section]">) {
  const { locale, section: id } = await params;
  const section = getSection(id);
  if (!isLocale(locale) || !section) notFound();
  const features = section.topics.filter((x) => x.feature);
  const rest = section.topics.filter((x) => !x.feature);
  return (
    <>
      <HashOpener />
      <PageHeader title={tx(section.title, locale)} eyebrow={tx(section.eyebrow, locale)} text={tx(section.intro, locale)} art={section.art} image={section.image} uid={`sec-${section.id}`} locale={locale} />
      <div className="space-y-3 px-5 pt-6">
        {features.map((topic) => (
          <div key={topic.id} className="pb-3">
            <TopicCard topic={topic} locale={locale} extra={extras(topic.id, locale)} />
          </div>
        ))}
        {rest.map((topic) => (
          <TopicCard key={topic.id} topic={topic} locale={locale} extra={extras(topic.id, locale)} />
        ))}
      </div>
    </>
  );
}
