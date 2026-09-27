import { ChevronDown, Lightbulb } from "lucide-react";
import type { HouseTopic } from "@/lib/types";
import { tx, type Locale } from "@/lib/i18n";
import { dictionaries } from "@/content/ui";
import { Icon } from "@/components/ui/icon";
import { Tx } from "@/components/ui/tx";
import { Photo } from "@/components/ui/photo";

function TopicBody({ topic, locale, extra }: { topic: HouseTopic; locale: Locale; extra?: React.ReactNode }) {
  const t = dictionaries[locale];
  return (
    <div className="space-y-4 text-[0.95rem] leading-relaxed text-ink-soft">
      {topic.body && topic.body.length > 0 && (
        <div className="prose-kd">
          {topic.body.map((p, i) => (
            <p key={i}><Tx value={p} locale={locale} /></p>
          ))}
        </div>
      )}
      {topic.steps && topic.steps.length > 0 && (
        <div>
          <p className="mb-2 text-[0.68rem] font-bold uppercase tracking-[0.14em] text-muted">{t.villa.steps}</p>
          <ol className="space-y-2.5">
            {topic.steps.map((s, i) => (
              <li key={i} className="flex gap-3">
                <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-ocean-100 text-xs font-bold text-ocean-800">{i + 1}</span>
                <span className="text-ink"><Tx value={s} locale={locale} /></span>
              </li>
            ))}
          </ol>
        </div>
      )}
      {topic.tips?.map((tip, i) => (
        <p key={i} className="flex gap-2.5 rounded-2xl bg-sand-100 p-3.5 text-[0.88rem] text-ink">
          <Lightbulb className="mt-0.5 h-4 w-4 shrink-0 text-gold" aria-hidden />
          <span><Tx value={tip} locale={locale} /></span>
        </p>
      ))}
      {extra}
    </div>
  );
}

/** Elegant expandable card for one villa topic. */
export function TopicCard({ topic, locale, extra }: { topic: HouseTopic; locale: Locale; extra?: React.ReactNode }) {
  const t = dictionaries[locale];
  if (topic.feature) {
    return (
      <article id={topic.id} className="card scroll-mt-24 overflow-hidden">
        <Photo image={topic.image} art={topic.art ?? "villa"} uid={`tp-${topic.id}`} locale={locale} hint className="aspect-[16/10] w-full" />
        <div className="p-5">
          <p className="eyebrow mb-1 flex items-center gap-1.5"><Icon name={topic.icon} className="h-3.5 w-3.5" />{tx(topic.title, locale)}</p>
          {topic.summary && <p className="mb-4 font-display text-[1.3rem] leading-snug text-ink"><Tx value={topic.summary} locale={locale} /></p>}
          <TopicBody topic={topic} locale={locale} extra={extra} />
        </div>
      </article>
    );
  }
  return (
    <details id={topic.id} className="card group scroll-mt-24 overflow-hidden [&[open]_.chev]:rotate-180">
      <summary className="flex min-h-16 cursor-pointer items-center gap-4 px-4 py-3.5">
        <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-sand-100 text-ocean-700">
          <Icon name={topic.icon} className="h-5 w-5" />
        </span>
        <span className="min-w-0 flex-1">
          <span className="block font-semibold text-ink">{tx(topic.title, locale)}</span>
          {topic.summary && <span className="mt-0.5 block truncate text-[0.82rem] text-muted"><Tx value={topic.summary} locale={locale} /></span>}
          {topic.confirmPresence && <span className="mt-1 inline-block rounded-full bg-coral-soft px-2 py-0.5 text-[0.62rem] font-bold uppercase tracking-wider text-coral">{t.villa.confirmPresence}</span>}
        </span>
        <ChevronDown className="chev h-5 w-5 shrink-0 text-muted transition-transform" aria-hidden />
      </summary>
      <div className="px-4 pb-5 pl-[4.75rem]">
        <TopicBody topic={topic} locale={locale} extra={extra} />
      </div>
    </details>
  );
}
