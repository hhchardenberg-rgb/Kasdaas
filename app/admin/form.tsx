"use client";
import { useActionState } from "react";
import { useOrigin } from "@/lib/use-browser";
import { createBoatLink, type LinkResult } from "./actions";

export function BoatLinkForm() {
  const [state, action, pending] = useActionState<LinkResult, FormData>(createBoatLink, {});
  const origin = useOrigin();
  return (
    <div className="mt-6 space-y-6">
      <form action={action} className="card space-y-4 p-5">
        <input type="hidden" name="origin" value={origin} />
        <label className="block text-sm font-semibold">
          Admin password
          <input name="password" type="password" required autoComplete="current-password" className="mt-1 h-12 w-full rounded-xl border border-sand-300 bg-white px-3" />
        </label>
        <div className="grid grid-cols-2 gap-3">
          <label className="block text-sm font-semibold">
            Valid for (days)
            <input name="days" type="number" min={1} max={60} defaultValue={3} className="mt-1 h-12 w-full rounded-xl border border-sand-300 bg-white px-3" />
          </label>
          <label className="block text-sm font-semibold">
            Message language
            <select name="lang" defaultValue="nl" className="mt-1 h-12 w-full rounded-xl border border-sand-300 bg-white px-3">
              <option value="nl">Nederlands</option>
              <option value="en">English</option>
              <option value="es">Español</option>
              <option value="de">Deutsch</option>
            </select>
          </label>
        </div>
        <button disabled={pending} className="h-12 w-full rounded-full bg-ocean-800 font-semibold text-white disabled:opacity-60">
          {pending ? "Creating…" : "Create link"}
        </button>
        {state.error && <p className="text-sm font-semibold text-danger">{state.error}</p>}
      </form>

      {state.url && (
        <div className="card space-y-4 p-5">
          <div className="mx-auto w-56 rounded-2xl bg-white p-2" dangerouslySetInnerHTML={{ __html: state.qr ?? "" }} />
          <p className="break-all rounded-xl bg-sand-100 p-3 font-mono text-xs">{state.url}</p>
          <p className="text-xs text-muted">ID (for revoking): <code>{state.id}</code> · expires {state.expires}</p>
          <div className="grid grid-cols-2 gap-2">
            <button type="button" onClick={() => navigator.clipboard.writeText(state.url!)} className="h-12 rounded-full bg-sand-100 text-sm font-semibold">Copy link</button>
            <a href={`https://wa.me/?text=${encodeURIComponent(state.message ?? "")}`} target="_blank" rel="noopener noreferrer" className="grid h-12 place-items-center rounded-full bg-ocean-800 text-sm font-semibold text-white">Send via WhatsApp</a>
          </div>
          <pre className="whitespace-pre-wrap rounded-xl bg-sand-100 p-3 text-xs">{state.message}</pre>
        </div>
      )}
    </div>
  );
}
