"use client";
import { useActionState } from "react";
import { useOrigin } from "@/lib/use-browser";
import { createBoatLink, login, restoreLink, revokeLink, type LinkResult, type LoginState, type RevokeState } from "./actions";

const input = "mt-1 h-12 w-full rounded-xl border border-sand-300 bg-white px-3";

export function LoginForm() {
  const [state, action, pending] = useActionState<LoginState, FormData>(login, {});
  return (
    <form action={action} className="card mt-6 space-y-4 p-5">
      <label className="block text-sm font-semibold">
        Admin password
        <input name="password" type="password" required autoComplete="current-password" className={input} />
      </label>
      <button disabled={pending} className="h-12 w-full rounded-full bg-ocean-800 font-semibold text-white disabled:opacity-60">
        {pending ? "Signing in…" : "Sign in"}
      </button>
      {state.error && <p className="text-sm font-semibold text-danger">{state.error}</p>}
    </form>
  );
}

export function BoatLinkForm() {
  const [state, action, pending] = useActionState<LinkResult, FormData>(createBoatLink, {});
  const origin = useOrigin();
  return (
    <div className="mt-3 space-y-6">
      <form action={action} className="card space-y-4 p-5">
        <input type="hidden" name="origin" value={origin} />
        <label className="block text-sm font-semibold">
          Guest / booking <span className="font-normal text-muted">(optional, only shown here)</span>
          <input name="label" maxLength={80} placeholder="e.g. Smith, 12–15 Oct" className={input} />
        </label>
        <div className="grid grid-cols-2 gap-3">
          <label className="block text-sm font-semibold">
            Valid for (days)
            <input name="days" type="number" min={1} max={60} defaultValue={3} className={input} />
          </label>
          <label className="block text-sm font-semibold">
            Message language
            <select name="lang" defaultValue="nl" className={input}>
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
          <p className="text-xs text-muted">ID: <code>{state.id}</code> · expires {state.expires}</p>
          {state.warning && <p className="text-sm font-semibold text-coral">{state.warning}</p>}
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

export function LinkRowAction({ id, kind, label }: { id: string; kind: "revoke" | "restore"; label?: string }) {
  const [state, action, pending] = useActionState<RevokeState, FormData>(kind === "revoke" ? revokeLink : restoreLink, {});
  return (
    <form
      action={action}
      onSubmit={(e) => {
        if (kind === "revoke" && !confirm(`Revoke the boat link${label ? ` for ${label}` : ""}? It stops working immediately.`)) e.preventDefault();
      }}
      className="shrink-0"
    >
      <input type="hidden" name="id" value={id} />
      <button
        disabled={pending}
        title={state.error}
        className={`h-10 rounded-full px-4 text-sm font-semibold disabled:opacity-60 ${kind === "revoke" ? "bg-coral text-white" : "bg-sand-100"}`}
      >
        {pending ? "…" : state.error ? "Retry" : kind === "revoke" ? "Revoke" : "Restore"}
      </button>
    </form>
  );
}

export function RevokeByIdForm() {
  const [state, action, pending] = useActionState<RevokeState, FormData>(revokeLink, {});
  return (
    <form action={action} className="card mt-3 space-y-3 p-5">
      <label className="block text-sm font-semibold">
        Link ID or boat link
        <input name="id" required placeholder="a1b2c3d4e5f6 or https://…/boat/…" className={input} autoComplete="off" />
      </label>
      <button disabled={pending} className="h-12 w-full rounded-full bg-coral font-semibold text-white disabled:opacity-60">
        {pending ? "Revoking…" : "Revoke"}
      </button>
      {state.error && <p className="text-sm font-semibold text-danger">{state.error}</p>}
      {state.done && <p className="text-sm font-semibold text-ocean-800">{state.done}</p>}
    </form>
  );
}
