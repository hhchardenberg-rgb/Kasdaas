import { BoatLinkForm } from "./form";

export const dynamic = "force-dynamic";

export default function AdminPage() {
  const enabled = !!process.env.ADMIN_PASSWORD && process.env.ADMIN_PASSWORD.length >= 10;
  return (
    <main className="mx-auto max-w-lg px-5 py-10">
      <p className="eyebrow mb-2">Kas Daas · Admin</p>
      <h1 className="text-3xl">Boat access link</h1>
      <p className="mt-2 text-sm leading-relaxed text-ink-soft">
        Create a personal, expiring link (and QR code) to the private boat manual for a guest who rented the boat.
        Revoke a link early by adding its ID to <code>content/boat/private/access.ts</code> or the <code>BOAT_REVOKED_IDS</code> environment variable.
      </p>
      {enabled ? (
        <BoatLinkForm />
      ) : (
        <p className="mt-6 rounded-2xl bg-coral-soft p-4 text-sm text-coral">
          Admin is disabled. Set the <code>ADMIN_PASSWORD</code> environment variable (min. 10 characters) to enable it,
          or use the command line: <code>npm run boat:link -- --days 3</code>.
        </p>
      )}
    </main>
  );
}
