import Link from "next/link";
import { adminPassword, getSession } from "@/lib/admin-session";
import { overridesAvailable, overridesStore } from "@/lib/cms/overrides";
import { translationConfigured } from "@/lib/cms/translate";
import { allEditorEntries, summarize } from "@/lib/cms/view";
import { syncContent } from "@/lib/cms/sync";
import { AdminShell } from "./_components/shell";
import { LoginForm } from "./_components/login-form";
import { RetranslateAll } from "./_components/retranslate-all";

export const dynamic = "force-dynamic";
/** "Nu vertalen" translates several texts in one go. */
export const maxDuration = 60;

const when = (iso: string) => new Date(iso).toISOString().replace("T", " ").slice(0, 16) + " UTC";

export default async function AdminHome() {
  if (!adminPassword()) {
    return (
      <main className="mx-auto max-w-lg px-5 py-10">
        <p className="eyebrow mb-2">Kas Daas · Beheer</p>
        <h1 className="text-3xl">Beheer</h1>
        <p className="mt-6 rounded-2xl bg-coral-soft p-4 text-sm text-coral">
          Beheer staat uit. Stel de omgevingsvariabele <code>ADMIN_PASSWORD</code> in (minimaal 10 tekens) om het in te schakelen.
        </p>
      </main>
    );
  }
  const session = await getSession();
  if (!session) {
    return (
      <main className="mx-auto max-w-lg px-5 py-10">
        <p className="eyebrow mb-2">Kas Daas · Beheer</p>
        <h1 className="text-3xl">Inloggen</h1>
        <p className="mt-2 text-sm leading-relaxed text-ink-soft">Log in om teksten van de gids aan te passen en bootlinks te beheren.</p>
        <LoginForm />
      </main>
    );
  }

  await syncContent();
  const available = overridesAvailable();
  const doc = available ? await overridesStore.read() : null;
  const summary = doc ? summarize(allEditorEntries(doc)) : null;

  return (
    <AdminShell session={session} active="home" title={`Welkom, ${session.name}`} intro="Hier beheer je de gids van Kas Daas.">
      {summary && !translationConfigured() && (
        <p className="mt-6 rounded-2xl bg-coral-soft p-4 text-sm text-coral">
          Automatisch vertalen staat nog uit, dus aanpassingen verschijnen voorlopig alleen in het Nederlands.
          {session.role === "admin" ? " Stel ANTHROPIC_API_KEY in als omgevingsvariabele." : " Vraag de ontwikkelaar dit in te stellen."}
        </p>
      )}

      <ul className="mt-6 space-y-2.5">
        <li>
          <Link href="/admin/teksten" className="card block p-4 hover:bg-white">
            <span className="block font-semibold">Teksten aanpassen</span>
            <span className="mt-0.5 block text-sm text-ink-soft">
              {summary ? `${summary.total} teksten · ${summary.todo} nog in te vullen · ${summary.edited} aangepast` : "Opslag nog niet gekoppeld"}
            </span>
          </Link>
        </li>
        {summary && summary.todo > 0 && (
          <li>
            <Link href="/admin/teksten?filter=todo" className="card block border-coral/30 bg-coral-soft/40 p-4">
              <span className="block font-semibold">Nog in te vullen</span>
              <span className="mt-0.5 block text-sm text-ink-soft">{summary.todo} plekken in de gids tonen nog een gestreept label.</span>
            </Link>
          </li>
        )}
        <li>
          <Link href="/admin/bootlinks" className="card block p-4 hover:bg-white">
            <span className="block font-semibold">Bootlinks</span>
            <span className="mt-0.5 block text-sm text-ink-soft">Persoonlijke links naar de boothandleiding maken en intrekken</span>
          </Link>
        </li>
        {session.role === "admin" && (
          <li>
            <Link href="/admin/gebruikers" className="card block p-4 hover:bg-white">
              <span className="block font-semibold">Gebruikers</span>
              <span className="mt-0.5 block text-sm text-ink-soft">Inloggegevens voor de eigenaar maken en beheren</span>
            </Link>
          </li>
        )}
      </ul>

      {summary && summary.pending > 0 && <RetranslateAll pending={summary.pending} />}

      {doc && doc.log.length > 0 && (
        <>
          <h2 className="mt-10 text-xl">Laatste wijzigingen</h2>
          <ul className="mt-3 divide-y divide-sand-200 rounded-2xl bg-white/70 px-4">
            {doc.log.slice(0, 10).map((l, i) => (
              <li key={`${l.at}-${i}`} className="py-3 text-sm">
                <p className="font-semibold">{l.what}</p>
                <p className="mt-0.5 text-xs text-muted">{l.by} · {when(l.at)}</p>
              </li>
            ))}
          </ul>
        </>
      )}
    </AdminShell>
  );
}
