"use client";
import { useActionState, useState } from "react";
import type { EditorEntry, EditStatus } from "@/lib/cms/view";
import { resetText, retranslate, saveText, saveTranslations, type SaveState } from "./actions";

const field = "w-full rounded-xl border border-sand-300 bg-white px-3 py-2.5 text-[0.95rem] leading-relaxed";

const BADGE: Record<EditStatus, { text: string; cls: string } | null> = {
  todo: { text: "Nog invullen", cls: "bg-coral-soft text-coral" },
  pending: { text: "Wacht op vertaling", cls: "bg-coral-soft text-coral" },
  edited: { text: "Aangepast", cls: "bg-ocean-100 text-ocean-800" },
  original: null,
};

const LANGS = [
  { id: "en", label: "Engels" },
  { id: "es", label: "Spaans" },
  { id: "de", label: "Duits" },
] as const;

const rowsFor = (text: string) => Math.min(12, Math.max(2, text.split("\n").length + Math.floor(text.length / 70)));

/** One editable text: the Dutch source, its status, and (collapsed) the three translations. */
export function TextEditor({ entry }: { entry: EditorEntry }) {
  const [state, action, saving] = useActionState<SaveState, FormData>(saveText, {});
  const [retrState, retrAction, retranslating] = useActionState<SaveState, FormData>(retranslate, {});
  const [resetState, resetAction, resetting] = useActionState<SaveState, FormData>(resetText, {});
  // The page refreshes after every save, so `entry` is always the stored text; follow it when it changes.
  const [value, setValue] = useState(entry.nl);
  const [seenNl, setSeenNl] = useState(entry.nl);
  if (entry.nl !== seenNl) {
    setSeenNl(entry.nl);
    setValue(entry.nl);
  }
  const dirty = value.trim() !== entry.nl;
  const badge = BADGE[entry.status];
  const notice = [resetState, retrState, state].find((s) => s.message || s.error);
  const busy = saving || retranslating || resetting;

  return (
    <div className="card p-4" data-text-key={entry.key} data-status={entry.status}>
      <div className="flex flex-wrap items-center gap-2">
        <p className="text-[0.72rem] font-bold uppercase tracking-[0.14em] text-muted">{entry.field}</p>
        {badge && <span className={`rounded-full px-2.5 py-0.5 text-[0.68rem] font-bold uppercase tracking-wider ${badge.cls}`}>{badge.text}</span>}
        {entry.upstreamChanged && (
          <span title="De oorspronkelijke tekst is sinds jouw aanpassing gewijzigd. Jouw versie blijft staan." className="rounded-full bg-sand-200 px-2.5 py-0.5 text-[0.68rem] font-bold uppercase tracking-wider text-muted">
            Origineel gewijzigd
          </span>
        )}
      </div>

      <form action={action} className="mt-2 space-y-2.5">
        <input type="hidden" name="key" value={entry.key} />
        {entry.kind === "neutral" ? (
          <input name="nl" value={value} onChange={(e) => setValue(e.target.value)} placeholder={entry.hint} aria-label={entry.field} className={`${field} h-12`} />
        ) : (
          <textarea name="nl" value={value} onChange={(e) => setValue(e.target.value)} rows={rowsFor(value || entry.hint || "")} placeholder={entry.hint} aria-label={`${entry.field} (Nederlands)`} className={field} />
        )}
        <div className="flex flex-wrap items-center gap-2">
          <button
            disabled={busy || (!dirty && entry.status !== "todo")}
            className="h-11 rounded-full bg-ocean-800 px-5 text-sm font-semibold text-white disabled:opacity-40"
          >
            {saving ? (entry.kind === "text" ? "Opslaan en vertalen…" : "Opslaan…") : "Opslaan"}
          </button>
          {entry.status === "pending" && (
            <button formAction={retrAction} disabled={busy} className="h-11 rounded-full bg-sand-100 px-4 text-sm font-semibold disabled:opacity-40">
              {retranslating ? "Vertalen…" : "Opnieuw vertalen"}
            </button>
          )}
          {(entry.status === "edited" || entry.status === "pending") && (
            <button
              formAction={(fd) => {
                if (confirm("Terug naar de oorspronkelijke tekst? Jouw aanpassing en de bijbehorende vertalingen verdwijnen.")) {
                  resetAction(fd);
                }
              }}
              disabled={busy}
              className="h-11 rounded-full px-3 text-sm font-semibold text-muted underline-offset-4 hover:underline disabled:opacity-40"
            >
              Origineel herstellen
            </button>
          )}
        </div>
        <div aria-live="polite">
          {notice?.error && <p className="text-sm font-semibold text-danger">{notice.error}</p>}
          {notice?.message && !notice.error && <p className="text-sm font-semibold text-ocean-800">{notice.message}</p>}
        </div>
      </form>

      {entry.kind === "text" && <Translations entry={entry} />}
    </div>
  );
}

function Translations({ entry }: { entry: EditorEntry }) {
  const [state, action, saving] = useActionState<SaveState, FormData>(saveTranslations, {});
  const [vals, setVals] = useState(entry.tr);
  const sig = `${entry.tr.en}|${entry.tr.es}|${entry.tr.de}`;
  const [seenSig, setSeenSig] = useState(sig);
  if (sig !== seenSig) {
    setSeenSig(sig);
    setVals(entry.tr);
  }
  const dirty = LANGS.some((l) => vals[l.id] !== entry.tr[l.id]);
  return (
    <details className="mt-3 border-t border-sand-200 pt-3">
      <summary className="cursor-pointer text-sm font-semibold text-ink-soft">Vertalingen bekijken</summary>
      <form action={action} className="mt-3 space-y-3">
        <input type="hidden" name="key" value={entry.key} />
        {LANGS.map((l) => (
          <label key={l.id} className="block text-sm font-semibold">
            {l.label}
            {entry.manual.includes(l.id) && <span className="ml-2 text-xs font-normal text-muted">(handmatig aangepast)</span>}
            <textarea name={l.id} value={vals[l.id]} onChange={(e) => setVals({ ...vals, [l.id]: e.target.value })} rows={rowsFor(vals[l.id])} className={`${field} mt-1 font-normal`} />
          </label>
        ))}
        <p className="text-xs text-muted">Wijzig je de Nederlandse tekst, dan worden alle vertalingen opnieuw gemaakt. Alleen als je hier iets verbetert, blijft dat staan tot die tijd.</p>
        <button disabled={saving || !dirty} className="h-11 rounded-full bg-sand-100 px-5 text-sm font-semibold disabled:opacity-40">
          {saving ? "Opslaan…" : "Vertalingen opslaan"}
        </button>
        <div aria-live="polite">
          {state.error && <p className="text-sm font-semibold text-danger">{state.error}</p>}
          {state.message && !state.error && <p className="text-sm font-semibold text-ocean-800">{state.message}</p>}
        </div>
      </form>
    </details>
  );
}
