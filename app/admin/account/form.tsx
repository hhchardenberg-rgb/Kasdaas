"use client";
import { useActionState } from "react";
import { changePassword, type PasswordState } from "../actions";

const input = "mt-1 h-12 w-full rounded-xl border border-sand-300 bg-white px-3";

export function ChangePasswordForm() {
  const [state, action, pending] = useActionState<PasswordState, FormData>(changePassword, {});
  return (
    <form action={action} className="card mt-3 space-y-4 p-5">
      <label className="block text-sm font-semibold">
        Huidig wachtwoord
        <input name="current" type="password" required autoComplete="current-password" className={input} />
      </label>
      <label className="block text-sm font-semibold">
        Nieuw wachtwoord <span className="font-normal text-muted">(minimaal 10 tekens)</span>
        <input name="next" type="password" required minLength={10} autoComplete="new-password" className={input} />
      </label>
      <label className="block text-sm font-semibold">
        Nieuw wachtwoord nogmaals
        <input name="confirm" type="password" required minLength={10} autoComplete="new-password" className={input} />
      </label>
      <button disabled={pending} className="h-12 w-full rounded-full bg-ocean-800 font-semibold text-white disabled:opacity-60">
        {pending ? "Opslaan…" : "Wachtwoord wijzigen"}
      </button>
      {state.error && <p role="alert" className="text-sm font-semibold text-danger">{state.error}</p>}
      {state.done && <p className="text-sm font-semibold text-ocean-800">{state.done}</p>}
    </form>
  );
}
