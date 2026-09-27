"use client";
import { Check, RotateCcw } from "lucide-react";
import { useDict } from "@/components/providers";
import { fmt } from "@/content/ui";
import { haptic, useStore } from "@/lib/client-store";

export interface ChecklistRow {
  id: string;
  label: string;
  detail?: string;
  detailIsPlaceholder?: boolean;
}

const EMPTY: string[] = [];

/** Interactive checklist; ticks are remembered on this device. */
export function Checklist({ storageKey, items, doneText }: { storageKey: string; items: ChecklistRow[]; doneText?: string }) {
  const { t } = useDict();
  const [done, setDone] = useStore<string[]>(`check:${storageKey}`, EMPTY);
  const count = items.filter((i) => done.includes(i.id)).length;
  const pct = items.length ? Math.round((count / items.length) * 100) : 0;
  return (
    <div>
      <div className="mb-4 flex items-center justify-between gap-3">
        <p className="text-sm font-semibold text-ink-soft" aria-live="polite">
          {count === items.length && doneText ? doneText : fmt(t.departure.progress, { done: count, total: items.length })}
        </p>
        {count > 0 && (
          <button type="button" onClick={() => setDone([])} className="inline-flex h-9 items-center gap-1.5 rounded-full px-3 text-xs font-semibold text-muted hover:bg-sand-100">
            <RotateCcw className="h-3.5 w-3.5" aria-hidden />
            {t.departure.resetList}
          </button>
        )}
      </div>
      <div className="mb-5 h-1.5 overflow-hidden rounded-full bg-sand-200" aria-hidden>
        <div className="h-full rounded-full bg-sage transition-all duration-500" style={{ width: `${pct}%` }} />
      </div>
      <ul className="space-y-2.5">
        {items.map((item) => {
          const checked = done.includes(item.id);
          return (
            <li key={item.id}>
              <label className={`card flex min-h-16 cursor-pointer items-start gap-4 p-4 transition ${checked ? "bg-sage-soft/60 shadow-none" : ""}`}>
                <input
                  type="checkbox"
                  className="peer sr-only"
                  checked={checked}
                  onChange={() => {
                    haptic(checked ? 6 : 12);
                    setDone((prev) => (prev.includes(item.id) ? prev.filter((x) => x !== item.id) : [...prev, item.id]));
                  }}
                />
                <span
                  className={`mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-full border-2 transition peer-focus-visible:ring-2 peer-focus-visible:ring-ocean-500 ${checked ? "border-sage bg-sage text-white" : "border-sand-300 bg-white"}`}
                  aria-hidden
                >
                  {checked && <Check className="h-4 w-4" strokeWidth={3} />}
                </span>
                <span className="min-w-0 flex-1">
                  <span className={`block font-semibold ${checked ? "text-ink-soft line-through decoration-sage/60" : "text-ink"}`}>{item.label}</span>
                  {item.detail && (
                    <span className="mt-1 block text-[0.85rem] leading-snug text-muted">
                      {item.detailIsPlaceholder ? <span className="placeholder-text">{item.detail}</span> : item.detail}
                    </span>
                  )}
                </span>
              </label>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
