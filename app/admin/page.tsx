import { isAdmin, adminPassword } from "@/lib/admin-session";
import { listBoatLinks, registryAvailable, type BoatLinkRecord } from "@/lib/boat/registry";
import { logout } from "./actions";
import { BoatLinkForm, LinkRowAction, LoginForm, RevokeByIdForm } from "./form";

export const dynamic = "force-dynamic";

/** Current time in unix seconds (outside render, so the page stays lint-clean). */
const nowSeconds = () => Math.floor(Date.now() / 1000);

const fmt = (iso: string) => new Date(iso).toISOString().replace("T", " ").slice(0, 16) + " UTC";

function status(l: BoatLinkRecord, now: number) {
  if (l.revokedAt) return { text: "Revoked", cls: "bg-coral-soft text-coral" };
  if (l.exp && l.exp <= now) return { text: "Expired", cls: "bg-sand-200 text-muted" };
  return { text: "Active", cls: "bg-ocean-100 text-ocean-800" };
}

export default async function AdminPage() {
  if (!adminPassword()) {
    return (
      <Shell>
        <p className="mt-6 rounded-2xl bg-coral-soft p-4 text-sm text-coral">
          Admin is disabled. Set the <code>ADMIN_PASSWORD</code> environment variable (min. 10 characters) to enable it,
          or use the command line: <code>npm run boat:link -- --days 3</code>.
        </p>
      </Shell>
    );
  }
  if (!(await isAdmin())) {
    return (
      <Shell>
        <LoginForm />
      </Shell>
    );
  }

  const storage = registryAvailable();
  let links: BoatLinkRecord[] = [];
  let loadError = false;
  try {
    links = storage ? await listBoatLinks() : [];
  } catch (e) {
    console.error("[admin] list failed", e);
    loadError = true;
  }
  const now = nowSeconds();
  const active = links.filter((l) => !l.revokedAt && (!l.exp || l.exp > now));
  const rest = links.filter((l) => !active.includes(l));

  return (
    <Shell
      signOut={
        <form action={logout}>
          <button className="h-10 rounded-full bg-sand-100 px-4 text-sm font-semibold">Sign out</button>
        </form>
      }
    >
      {!storage && (
        <p className="mt-6 rounded-2xl bg-coral-soft p-4 text-sm text-coral">
          Link storage is not configured (<code>BLOB_READ_WRITE_TOKEN</code>), so links can&apos;t be listed or revoked here.
          Connect a Vercel Blob store to this project, or revoke via <code>BOAT_REVOKED_IDS</code>.
        </p>
      )}
      {loadError && <p className="mt-6 rounded-2xl bg-coral-soft p-4 text-sm text-coral">Could not load the list of links. Reload to try again.</p>}

      <h2 className="mt-8 text-xl">New link</h2>
      <BoatLinkForm />

      <h2 className="mt-10 text-xl">Active links</h2>
      <p className="mt-1 text-sm text-ink-soft">Revoking works immediately: the link and any device that already opened it lose access (offline copies are removed the next time the phone is online).</p>
      <LinkList links={active} now={now} empty="No active links." />

      {rest.length > 0 && (
        <>
          <h2 className="mt-10 text-xl">Revoked &amp; expired</h2>
          <LinkList links={rest} now={now} empty="" />
        </>
      )}

      <h2 className="mt-10 text-xl">Revoke by ID or link</h2>
      <p className="mt-1 text-sm text-ink-soft">For links that aren&apos;t in the list (e.g. made with the command line): paste the ID or the whole link.</p>
      <RevokeByIdForm />
    </Shell>
  );
}

function LinkList({ links, now, empty }: { links: BoatLinkRecord[]; now: number; empty: string }) {
  if (links.length === 0) return empty ? <p className="card mt-3 p-4 text-sm text-muted">{empty}</p> : null;
  return (
    <ul className="mt-3 space-y-2.5">
      {links.map((l) => {
        const s = status(l, now);
        return (
          <li key={l.id} className="card flex items-center gap-3 p-4" data-link-id={l.id}>
            <div className="min-w-0 flex-1">
              <p className="truncate font-semibold">{l.label || <span className="text-muted">No name</span>}</p>
              <p className="mt-0.5 text-xs text-muted">
                <code>{l.id}</code>
                {l.exp ? ` · ${l.exp > now ? "valid until" : "expired"} ${fmt(new Date(l.exp * 1000).toISOString())}` : ""}
                {l.revokedAt ? ` · revoked ${fmt(l.revokedAt)}` : ""}
              </p>
            </div>
            <span className={`shrink-0 rounded-full px-2.5 py-1 text-[0.7rem] font-bold uppercase tracking-wider ${s.cls}`}>{s.text}</span>
            {s.text === "Active" && <LinkRowAction id={l.id} kind="revoke" label={l.label} />}
            {s.text === "Revoked" && (!l.exp || l.exp > now) && l.exp !== 0 && <LinkRowAction id={l.id} kind="restore" label={l.label} />}
          </li>
        );
      })}
    </ul>
  );
}

function Shell({ children, signOut }: { children: React.ReactNode; signOut?: React.ReactNode }) {
  return (
    <main className="mx-auto max-w-lg px-5 py-10">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="eyebrow mb-2">Kas Daas · Admin</p>
          <h1 className="text-3xl">Boat access links</h1>
        </div>
        {signOut}
      </div>
      <p className="mt-2 text-sm leading-relaxed text-ink-soft">
        Create a personal, expiring link (and QR code) to the private boat manual for a guest who rented the boat, and revoke links you no longer want to work.
      </p>
      {children}
    </main>
  );
}
