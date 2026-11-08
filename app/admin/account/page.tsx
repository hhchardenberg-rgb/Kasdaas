import { redirect } from "next/navigation";
import { ENV_ADMIN, getSession } from "@/lib/admin-session";
import { AdminShell } from "../_components/shell";
import { ChangePasswordForm } from "./form";

export const dynamic = "force-dynamic";

export default async function AccountPage() {
  const session = await getSession();
  if (!session) redirect("/admin");
  return (
    <AdminShell session={session} active="account" title="Mijn account" intro={`Je bent ingelogd als ${session.name} (${session.username}).`}>
      <h2 className="mt-8 text-xl">Wachtwoord wijzigen</h2>
      {session.username === ENV_ADMIN ? (
        <p className="card mt-3 p-4 text-sm text-ink-soft">Het wachtwoord van de gebruiker <code>admin</code> wijzig je in de omgevingsvariabele <code>ADMIN_PASSWORD</code>.</p>
      ) : (
        <ChangePasswordForm />
      )}
    </AdminShell>
  );
}
