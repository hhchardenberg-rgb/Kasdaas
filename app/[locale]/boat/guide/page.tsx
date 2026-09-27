import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ChevronDown, Lock, MapPin } from "lucide-react";
import { isLocale, isPlaceholder, tx, type Locale } from "@/lib/i18n";
import { currentBoatAccess } from "@/lib/boat/access";
import { boatManual } from "@/content/boat/private/manual";
import { dictionaries } from "@/content/ui";
import { toRows } from "@/lib/checklist";
import type { BoatControl } from "@/lib/types";
import { Icon } from "@/components/ui/icon";
import { Tx } from "@/components/ui/tx";
import { Photo } from "@/components/ui/photo";
import { Checklist } from "@/components/ui/checklist";
import { ContactList } from "@/components/villa/contact";
import { SosButton } from "@/components/boat/sos";
import { DecisionTrees, type ProblemView } from "@/components/boat/decision-tree";
import { ForgetBoatButton } from "@/components/boat/forget-button";
import { MediaSlot } from "@/components/boat/media-slot";
import { MapView } from "@/components/map/map-view";

/**
 * 🔒 PRIVATE BOAT MANUAL
 * Rendered per request, only when the httpOnly boat cookie carries a valid,
 * unexpired, non-revoked token. Otherwise it is indistinguishable from a
 * non-existent page (404). Never linked, never in the sitemap, never indexed.
 */
export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: PageProps<"/[locale]/boat/guide">): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: locale === "nl" ? "Boothandleiding" : "Boat manual",
    robots: { index: false, follow: false, nocache: true, googleBot: { index: false, follow: false } },
    referrer: "no-referrer",
  };
}

function ControlCards({ items, locale }: { items: BoatControl[]; locale: Locale }) {
  return (
    <div className="space-y-2.5">
      {items.map((c) => (
        <details key={c.id} className="card overflow-hidden [&[open]_.chev]:rotate-180">
          <summary className="flex min-h-16 cursor-pointer items-center gap-4 px-4 py-3">
            <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-ocean-100 text-ocean-800"><Icon name={c.icon} className="h-5 w-5" /></span>
            <span className="flex-1 font-semibold">{tx(c.title, locale)}</span>
            <ChevronDown className="chev h-5 w-5 text-muted transition-transform" aria-hidden />
          </summary>
          <div className="space-y-3 px-4 pb-5 text-[0.95rem] leading-relaxed">
            <p><Tx value={c.text} locale={locale} /></p>
            {c.media?.map((m, i) => <MediaSlot key={i} slot={m} locale={locale} />)}
          </div>
        </details>
      ))}
    </div>
  );
}

function Section({ id, title, children }: { id: string; title: string; children: React.ReactNode }) {
  return (
    <section id={id} className="scroll-mt-24">
      <h2 className="mb-4 text-[1.55rem] leading-tight">{title}</h2>
      {children}
    </section>
  );
}

export default async function BoatGuidePage({ params }: PageProps<"/[locale]/boat/guide">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const access = await currentBoatAccess();
  if (!access.ok) notFound();

  const t = dictionaries[locale];
  const g = t.boatGuide;
  const m = boatManual;
  const rentalKey = `boat-${access.id}`;
  const validUntil = new Intl.DateTimeFormat(locale === "nl" ? "nl-NL" : "en-GB", {
    dateStyle: "long",
    timeStyle: "short",
    timeZone: "America/Kralendijk",
  }).format(new Date(access.exp * 1000));

  const toc: [string, string][] = [
    ["location", g.location], ["before", g.before], ["start", g.start], ["controls", g.controls], ["safety", g.safety],
    ["area", g.area], ["mooring", g.mooring], ["return", g.return], ["problems", g.problems], ["contacts", g.contacts],
  ];

  const problems: ProblemView[] = m.problems.map((p) => ({
    id: p.id,
    title: tx(p.title, locale),
    urgent: p.urgent,
    icon: <Icon name={p.icon} className="h-5 w-5" />,
    start: p.start,
    nodes: p.nodes.map((n) => ({
      id: n.id,
      text: tx(n.text, locale),
      placeholder: isPlaceholder(n.text),
      detail: n.detail ? tx(n.detail, locale) : undefined,
      options: n.options.map((o) => ({ label: tx(o.label, locale), next: o.next })),
    })),
  }));

  const owner = m.contacts.filter((c) => c.id === "owner");
  const contacts = <ContactList contacts={m.contacts} locale={locale} />;

  return (
    <>
      {/* The service worker reads this to decide how long an offline copy may be kept. */}
      <meta name="kd-offline-until" content={String(access.exp * 1000)} />

      <header className="relative">
        <Photo art="boat" uid="bg-hdr" locale={locale} priority className="h-[19rem] w-full">
          <div className="absolute inset-0 bg-gradient-to-t from-ocean-950/85 via-ocean-950/20 to-transparent" />
        </Photo>
        <div className="absolute inset-x-0 bottom-0 px-5 pb-6 text-white">
          <p className="mb-2 inline-flex items-center gap-1.5 rounded-full bg-white/15 px-2.5 py-1 text-[0.65rem] font-bold uppercase tracking-[0.16em] backdrop-blur">
            <Lock className="h-3 w-3" aria-hidden /> {t.brand.private}
          </p>
          <h1 className="text-[2.2rem] leading-[1.05]">{tx(m.welcome.title, locale)}</h1>
          <p className="mt-2 max-w-md text-[0.95rem] leading-relaxed text-white/85">{tx(m.welcome.text, locale)}</p>
        </div>
      </header>

      <div className="space-y-12 px-5 pt-6 pb-44">
        <div className="rounded-2xl bg-sand-100 p-4 text-[0.82rem] leading-relaxed text-ink-soft">
          <p><b>{g.validUntil}:</b> {validUntil}</p>
          <p className="mt-1">{g.privateNote}</p>
          <p className="mt-1">{g.offlineSaved}</p>
        </div>

        <nav aria-label={g.sections} className="no-scrollbar -mx-5 flex gap-2 overflow-x-auto px-5 pb-1">
          {toc.map(([id, label]) => (
            <a key={id} href={`#${id}`} className="chip bg-white text-ink-soft shadow-[var(--shadow-soft)]">{label}</a>
          ))}
        </nav>

        <Section id="location" title={g.location}>
          <p className="card flex gap-3 p-4 text-[0.95rem]"><MapPin className="mt-0.5 h-5 w-5 shrink-0 text-ocean-700" aria-hidden /><Tx value={m.mooringLocation} locale={locale} /></p>
        </Section>

        <Section id="before" title={g.before}>
          <Checklist storageKey={`${rentalKey}-before`} items={toRows(m.beforeDeparture, locale)} />
        </Section>

        <Section id="start" title={g.start}>
          <ol className="space-y-4">
            {m.startSteps.map((s, i) => (
              <li key={s.id} className="card p-4">
                <div className="flex items-start gap-3">
                  <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-ocean-800 text-sm font-bold text-white">{i + 1}</span>
                  <div className="min-w-0 flex-1">
                    <p className="font-semibold"><Tx value={s.title} locale={locale} /></p>
                    <p className="mt-1 text-[0.92rem] leading-relaxed text-ink-soft"><Tx value={s.text} locale={locale} /></p>
                  </div>
                </div>
                {s.media && <div className="mt-3 space-y-3">{s.media.map((md, j) => <MediaSlot key={j} slot={md} locale={locale} />)}</div>}
              </li>
            ))}
          </ol>
        </Section>

        <Section id="controls" title={g.controls}>
          <ControlCards items={m.controls} locale={locale} />
        </Section>

        <Section id="safety" title={g.safety}>
          <ControlCards items={m.safety} locale={locale} />
        </Section>

        <Section id="area" title={g.area}>
          <p className="mb-4 text-[0.95rem] leading-relaxed"><Tx value={m.area.intro} locale={locale} /></p>
          {m.area.image && (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={m.area.image} alt={g.area} className="mb-4 w-full rounded-2xl" />
          )}
          {m.area.zones.length > 0 ? (
            <>
              <MapView
                showList={false}
                zones={m.area.zones.map((z) => ({ id: z.id, kind: z.kind, name: tx(z.name, locale), note: z.note ? tx(z.note, locale) : undefined, polygon: z.polygon, point: z.point }))}
              />
              <ul className="mt-4 flex flex-wrap gap-2 text-xs">
                {[...new Set(m.area.zones.map((z) => z.kind))].map((k) => (
                  <li key={k} className="rounded-full bg-white px-3 py-1.5 font-semibold shadow-[var(--shadow-soft)]">{g.zones[k]}</li>
                ))}
              </ul>
            </>
          ) : (
            !m.area.image && <p className="grid aspect-[16/10] place-items-center rounded-2xl border-2 border-dashed border-sand-300 bg-sand-100 px-6 text-center text-sm text-muted">{g.areaSoon}</p>
          )}
          <div className="mt-4 rounded-2xl bg-sand-100 p-4">
            <p className="mb-2 text-[0.68rem] font-bold uppercase tracking-[0.14em] text-muted">{g.rules}</p>
            <ul className="space-y-1.5 text-[0.92rem]">{m.area.rules.map((r, i) => <li key={i}><Tx value={r} locale={locale} /></li>)}</ul>
          </div>
        </Section>

        <Section id="mooring" title={g.mooring}>
          <div className="grid gap-3 sm:grid-cols-2">
            {([[g.anchoring, m.mooring.anchoring], [g.docking, m.mooring.docking]] as const).map(([label, steps]) => (
              <div key={label} className="card p-4">
                <p className="mb-2 font-semibold">{label}</p>
                <ol className="list-decimal space-y-1.5 pl-5 text-[0.92rem]">{steps.map((s, i) => <li key={i}><Tx value={s} locale={locale} /></li>)}</ol>
              </div>
            ))}
          </div>
        </Section>

        <Section id="return" title={g.return}>
          <Checklist storageKey={`${rentalKey}-return`} items={toRows(m.returnChecklist, locale)} />
        </Section>

        <Section id="problems" title={g.problems}>
          <DecisionTrees problems={problems} contact={<ContactList contacts={owner} locale={locale} />} sos={contacts} />
        </Section>

        <Section id="contacts" title={g.contacts}>
          {contacts}
        </Section>

        <div className="flex justify-center">
          <ForgetBoatButton />
        </div>
      </div>

      <SosButton>{contacts}</SosButton>
    </>
  );
}
