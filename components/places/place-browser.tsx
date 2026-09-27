"use client";
import { useMemo, useState } from "react";
import { Search, X } from "lucide-react";
import type { Place } from "@/lib/types";
import { tx } from "@/lib/i18n";
import { norm } from "@/lib/normalize";
import { useDict } from "@/components/providers";
import { PlaceCard } from "./place-card";

export interface BrowserFilter {
  id: string;
  label: string;
  kind: "all" | "favorite" | "tag" | "style";
  value?: string;
}

/** Client-side filtering (chips + text) of a list of places. */
export function PlaceBrowser({ places, filters, initial = "all" }: { places: Place[]; filters: BrowserFilter[]; initial?: string }) {
  const { t, locale } = useDict();
  const [active, setActive] = useState(initial);
  const [q, setQ] = useState("");

  const shown = useMemo(() => {
    const f = filters.find((x) => x.id === active);
    const nq = norm(q);
    return places.filter((p) => {
      if (f?.kind === "favorite" && !p.favorite) return false;
      if (f?.kind === "tag" && !p.tags?.includes(f.value as never)) return false;
      if (f?.kind === "style" && !p.restaurant?.styles.includes(f.value as never)) return false;
      if (!nq) return true;
      const hay = norm([tx(p.name, locale), tx(p.summary, locale), p.area ? tx(p.area, locale) : "", p.restaurant ? tx(p.restaurant.cuisine, locale) : "", ...(p.keywords ?? [])].join(" "));
      return hay.includes(nq);
    });
  }, [places, filters, active, q, locale]);

  return (
    <div>
      <label className="relative block">
        <span className="sr-only">{t.discover.searchIn}</span>
        <Search className="pointer-events-none absolute left-4 top-1/2 h-4.5 w-4.5 -translate-y-1/2 text-muted" aria-hidden />
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder={t.discover.searchIn}
          className="h-12 w-full rounded-full bg-white pl-11 pr-11 text-[0.95rem] shadow-[var(--shadow-soft)] outline-none placeholder:text-muted focus:ring-2 focus:ring-ocean-500/40"
          type="search"
          enterKeyHint="search"
        />
        {q && (
          <button type="button" onClick={() => setQ("")} className="absolute right-1.5 top-1/2 grid h-9 w-9 -translate-y-1/2 place-items-center rounded-full text-muted" aria-label={t.common.close}>
            <X className="h-4 w-4" aria-hidden />
          </button>
        )}
      </label>

      {filters.length > 1 && (
        <div className="no-scrollbar -mx-5 mt-4 flex gap-2 overflow-x-auto px-5 pb-1" role="group" aria-label={t.discover.filterTags}>
          {filters.map((f) => (
            <button
              key={f.id}
              type="button"
              aria-pressed={active === f.id}
              onClick={() => setActive(f.id)}
              className={`chip ${active === f.id ? "bg-ocean-800 text-white shadow-[var(--shadow-soft)]" : "bg-white text-ink-soft shadow-[var(--shadow-soft)]"}`}
            >
              {f.label}
            </button>
          ))}
        </div>
      )}

      <p className="mt-5 mb-3 text-xs font-semibold text-muted" aria-live="polite">
        {shown.length} {shown.length === 1 ? t.common.result : t.common.results}
      </p>
      {shown.length === 0 ? (
        <p className="card p-6 text-center text-sm text-ink-soft">{t.discover.empty}</p>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2">
          {shown.map((p) => (
            <PlaceCard key={p.id} place={p} locale={locale} />
          ))}
        </div>
      )}
    </div>
  );
}
