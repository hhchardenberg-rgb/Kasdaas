import { redirect } from "next/navigation";
import { getSession } from "@/lib/admin-session";
import { storageAvailable } from "@/lib/storage";
import { listUsers, type UserRecord } from "@/lib/users";
import { AdminShell } from "../_components/shell";
import { AccountActions, NewAccountForm } from "./form";

export const dynamic = "force-dynamic";

const date = (iso: string) => new Date(iso).toISOString().slice(0, 10);

export default async function UsersPage() {
  const session = await getSession();
  if (!session) redirect("/admin");
  if (session.role !== "admin") redirect("/admin");

  const available = storageAvailable();
  let users: UserRecord[] = [];
  let loadError = false;
  try {
    users = available ? await listUsers() : [];
  } catch (e) {
    console.error("[admin] list users failed", e);
    loadError = true;
  }

  return (
    <AdminShell session={session} active="gebruikers" title="Gebruikers" intro="Maak inloggegevens voor de eigenaar van de woning. De eigenaar kan teksten aanpassen en bootlinks maken, zonder dat jij erbij hoeft te zijn.">
      {!available && (
        <p className="mt-6 rounded-2xl bg-coral-soft p-4 text-sm text-coral">Accounts kunnen nu niet worden opgeslagen: de opslag is niet gekoppeld (BLOB_READ_WRITE_TOKEN).</p>
      )}
      {loadError && <p className="mt-6 rounded-2xl bg-coral-soft p-4 text-sm text-coral">De accounts konden niet worden geladen. Laad de pagina opnieuw.</p>}

      <h2 className="mt-8 text-xl">Accounts</h2>
      <ul className="mt-3 space-y-2.5">
        <li className="card p-4">
          <p className="font-semibold">Beheerder <span className="font-normal text-muted">· admin</span></p>
          <p className="mt-0.5 text-xs text-muted">Jouw eigen login, met het wachtwoord uit de omgevingsvariabele ADMIN_PASSWORD. Niet te wijzigen op deze pagina.</p>
        </li>
        {users.map((u) => (
          <li key={u.username} className="card p-4" data-account={u.username}>
            <p className="font-semibold">{u.name} <span className="font-normal text-muted">· {u.username}</span></p>
            <p className="mt-0.5 text-xs text-muted">{u.role === "admin" ? "Beheerder" : "Eigenaar"} · aangemaakt {date(u.createdAt)}</p>
            <AccountActions username={u.username} name={u.name} />
          </li>
        ))}
      </ul>

      <h2 className="mt-10 text-xl">Nieuw account</h2>
      <NewAccountForm />
    </AdminShell>
  );
}
