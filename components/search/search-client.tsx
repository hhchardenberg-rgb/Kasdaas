"use client";
import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { ChevronRight, Search, X } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useDict } from "@/components/providers";
import { fmt } from "@/content/ui";
import { norm, words } from "@/lib/normalize";
import type { SearchEntry } from "@/lib/search-index";

interface Prepared extends SearchEntry {
  nt: string;
  nk: string;
  tw: string[];
  kw: string[];
}

function score(e: Prepared, q: string): number {
  const nq = norm(q);
  if (!nq) return 0;
  let s = 0;
  if (e.nt.includes(nq)) s += e.nt.startsWith(nq) ? 12 : 9;
  if (e.nk.includes(nq)) s += 4;
  const tokens = words(q);
  if (tokens.length > 1 || s === 0) {
    let all = true;
    for (const tok of tokens) {
      const inTitle = e.tw.some((w) => w.startsWith(tok));
      const inKeys = inTitle || e.kw.some((w) => w.startsWith(tok)) || e.nk.includes(tok);
      if (inTitle) s += 3;
      else if (inKeys) s += 1;
      else all = false;
    }
    if (!all) return s >= 9 ? s : 0;
  }
  return s;
}

const SUGGEST = {
  nl: ["wifi", "airco", "check-out", "pizza", "snorkel", "boot", "supermarkt"],
  en: ["wifi", "air con", "check-out", "pizza", "snorkel", "boat", "supermarket"],
  es: ["wifi", "aire acondicionado", "check-out", "pizza", "snorkel", "barco", "supermercado"],
};

export function SearchClient({ index }: { index: SearchEntry[] }) {
  const { t, locale } = useDict();
  const params = useSearchParams();
  const [q, setQ] = useState(() => params.get("q") ?? "");
  const input = useRef<HTMLInputElement>(null);

  const prepared = useMemo<Prepared[]>(
    () => index.map((e) => ({ ...e, nt: norm(e.t + " " + e.title), nk: norm(e.k + " " + e.snippet), tw: words(e.t + " " + e.title), kw: words(e.k) })),
    [index],
  );

  useEffect(() => {
    input.current?.focus();
  }, []);

  useEffect(() => {
    const url = new URL(window.location.href);
    if (q) url.searchParams.set("q", q);
    else url.searchParams.delete("q");
    window.history.replaceState(null, "", url.pathname + url.search);
  }, [q]);

  const results = useMemo(() => {
    if (!q.trim()) return [];
    return prepared
      .map((e) => ({ e, s: score(e, q) }))
      .filter((x) => x.s > 0)
      .sort((a, b) => b.s - a.s)
      .slice(0, 30)
      .map((x) => x.e);
  }, [prepared, q]);

  return (
    <div>
      <form role="search" onSubmit={(e) => e.preventDefault()} className="relative">
        <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-ocean-700" aria-hidden />
        <input
          ref={input}
          value={q}
          onChange={(e) => setQ(e.target.value)}
          type="search"
          enterKeyHint="search"
          aria-label={t.common.search}
          placeholder={t.common.searchPlaceholder}
          className="h-14 w-full rounded-full bg-white pl-12 pr-12 text-base shadow-[var(--shadow-lift)] outline-none placeholder:text-muted focus:ring-2 focus:ring-ocean-500/40"
        />
        {q && (
          <button type="button" onClick={() => { setQ(""); input.current?.focus(); }} className="absolute right-2 top-1/2 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full text-muted" aria-label={t.common.close}>
            <X className="h-5 w-5" aria-hidden />
          </button>
        )}
      </form>

      {!q.trim() && (
        <div className="mt-6">
          <p className="mb-3 text-sm text-muted">{t.search.hint}</p>
          <div className="flex flex-wrap gap-2">
            {SUGGEST[locale].map((s) => (
              <button key={s} type="button" onClick={() => setQ(s)} className="chip bg-white text-ink-soft shadow-[var(--shadow-soft)]">{s}</button>
            ))}
          </div>
        </div>
      )}

      {q.trim() && (
        <div className="mt-6" aria-live="polite">
          {results.length === 0 ? (
            <div className="card p-6 text-center">
              <p className="font-semibold">{fmt(t.search.none, { q })}</p>
              <p className="mt-1 text-sm text-muted">{t.search.noneHint}</p>
            </div>
          ) : (
            <ul className="space-y-2">
              {results.map((r) => (
                <li key={r.id}>
                  <Link href={r.href} className="card flex min-h-16 items-center gap-3 px-4 py-3 transition active:scale-[0.99]">
                    <span className="min-w-0 flex-1">
                      <span className="text-[0.62rem] font-bold uppercase tracking-[0.14em] text-ocean-500">{t.search.types[r.type]}</span>
                      <span className="block truncate font-semibold">{r.title}</span>
                      <span className="block truncate text-[0.8rem] text-muted">{r.snippet}</span>
                    </span>
                    <ChevronRight className="h-5 w-5 shrink-0 text-muted" aria-hidden />
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}
