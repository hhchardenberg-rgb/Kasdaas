"use client";
import { useActionState, useState } from "react";
import { login, type LoginState } from "../actions";

const input = "mt-1 h-12 w-full rounded-xl border border-sand-300 bg-white px-3";

export function LoginForm() {
  const [state, action, pending] = useActionState<LoginState, FormData>(login, {});
  // React clears an uncontrolled form after a submit; keep the username so only the password has to be retyped.
  const [username, setUsername] = useState("");
  return (
    <form action={action} className="card mt-6 space-y-4 p-5">
      <label className="block text-sm font-semibold">
        Gebruikersnaam
        <input name="username" value={username} onChange={(e) => setUsername(e.target.value)} required autoComplete="username" autoCapitalize="none" spellCheck={false} className={input} />
      </label>
      <label className="block text-sm font-semibold">
        Wachtwoord
        <input name="password" type="password" required autoComplete="current-password" className={input} />
      </label>
      <button disabled={pending} className="h-12 w-full rounded-full bg-ocean-800 font-semibold text-white disabled:opacity-60">
        {pending ? "Inloggen…" : "Inloggen"}
      </button>
      {state.error && <p role="alert" className="text-sm font-semibold text-danger">{state.error}</p>}
    </form>
  );
}
