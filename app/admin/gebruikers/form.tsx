"use client";
import { useActionState } from "react";
import { createAccount, removeAccount, resetPassword, type AccountState } from "./actions";

const input = "mt-1 h-12 w-full rounded-xl border border-sand-300 bg-white px-3";

function Credentials({ c }: { c: NonNullable<AccountState["credentials"]> }) {
  const text = `Gebruikersnaam: ${c.username}\nWachtwoord: ${c.password}`;
  return (
    <div className="mt-3 rounded-xl bg-sand-100 p-3" data-credentials>
      <p className="text-xs font-bold uppercase tracking-wider text-muted">Inloggegevens, maar één keer zichtbaar</p>
      <pre className="mt-1 whitespace-pre-wrap font-mono text-sm">{text}</pre>
      <button type="button" onClick={() => navigator.clipboard.writeText(text)} className="mt-2 h-10 rounded-full bg-white px-4 text-sm font-semibold">Kopiëren</button>
      <p className="mt-2 text-xs text-ink-soft">Stuur dit veilig door. De persoon kan het wachtwoord daarna zelf wijzigen onder “Mijn account”.</p>
    </div>
  );
}

export function NewAccountForm() {
  const [state, action, pending] = useActionState<AccountState, FormData>(createAccount, {});
  return (
    <form action={action} className="card mt-3 space-y-4 p-5">
      <label className="block text-sm font-semibold">
        Naam
        <input name="name" required maxLength={60} placeholder="Bijvoorbeeld: Dennis" className={input} />
      </label>
      <label className="block text-sm font-semibold">
        Gebruikersnaam
        <input name="username" required autoCapitalize="none" spellCheck={false} placeholder="bijvoorbeeld: eigenaar" className={input} />
      </label>
      <label className="block text-sm font-semibold">
        Rol
        <select name="role" defaultValue="owner" className={input}>
          <option value="owner">Eigenaar (teksten en bootlinks)</option>
          <option value="admin">Beheerder (ook gebruikers beheren)</option>
        </select>
      </label>
      <button disabled={pending} className="h-12 w-full rounded-full bg-ocean-800 font-semibold text-white disabled:opacity-60">
        {pending ? "Account maken…" : "Account maken"}
      </button>
      {state.error && <p className="text-sm font-semibold text-danger">{state.error}</p>}
      {state.done && <p className="text-sm font-semibold text-ocean-800">{state.done}</p>}
      {state.credentials && <Credentials c={state.credentials} />}
    </form>
  );
}

export function AccountActions({ username, name }: { username: string; name: string }) {
  const [resetState, resetAction, resetting] = useActionState<AccountState, FormData>(resetPassword, {});
  const [removeState, removeAction, removing] = useActionState<AccountState, FormData>(removeAccount, {});
  return (
    <div className="mt-3">
      <div className="flex flex-wrap gap-2">
        <form
          action={resetAction}
          onSubmit={(e) => {
            if (!confirm(`Een nieuw wachtwoord maken voor ${name}? Het oude werkt dan niet meer.`)) e.preventDefault();
          }}
        >
          <input type="hidden" name="username" value={username} />
          <button disabled={resetting || removing} className="h-10 rounded-full bg-sand-100 px-4 text-sm font-semibold disabled:opacity-60">
            {resetting ? "Bezig…" : "Nieuw wachtwoord"}
          </button>
        </form>
        <form
          action={removeAction}
          onSubmit={(e) => {
            if (!confirm(`Het account van ${name} verwijderen? Aangepaste teksten blijven staan.`)) e.preventDefault();
          }}
        >
          <input type="hidden" name="username" value={username} />
          <button disabled={resetting || removing} className="h-10 rounded-full px-4 text-sm font-semibold text-coral disabled:opacity-60">
            {removing ? "Bezig…" : "Verwijderen"}
          </button>
        </form>
      </div>
      {resetState.error && <p className="mt-2 text-sm font-semibold text-danger">{resetState.error}</p>}
      {removeState.error && <p className="mt-2 text-sm font-semibold text-danger">{removeState.error}</p>}
      {resetState.credentials && (
        <>
          <p className="mt-2 text-sm font-semibold text-ocean-800">{resetState.done}</p>
          <Credentials c={resetState.credentials} />
        </>
      )}
    </div>
  );
}
