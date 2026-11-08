"use client";
import { useActionState } from "react";
import { retranslatePending, type BulkState } from "../teksten/actions";

/** Translates texts that are still waiting for a translation (a few per click). */
export function RetranslateAll({ pending }: { pending: number }) {
  const [state, action, busy] = useActionState<BulkState, FormData>(retranslatePending, {});
  return (
    <form action={action} className="card mt-4 p-4">
      <p className="font-semibold">{pending} {pending === 1 ? "tekst wacht" : "teksten wachten"} op een vertaling</p>
      <p className="mt-1 text-sm text-ink-soft">Tot die tijd zien gasten in het Engels, Spaans en Duits de Nederlandse tekst.</p>
      <button disabled={busy} className="mt-3 h-11 rounded-full bg-ocean-800 px-5 text-sm font-semibold text-white disabled:opacity-60">
        {busy ? "Vertalen…" : "Nu vertalen"}
      </button>
      <div aria-live="polite">
        {state.error && <p className="mt-2 text-sm font-semibold text-danger">{state.error}</p>}
        {state.message && !state.error && <p className="mt-2 text-sm font-semibold text-ocean-800">{state.message}</p>}
      </div>
    </form>
  );
}
