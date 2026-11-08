import { redirect } from "next/navigation";
import { getSession } from "@/lib/admin-session";
import { listBoatLinks, registryAvailable, type BoatLinkRecord } from "@/lib/boat/registry";
import { AdminShell } from "../_components/shell";
import { BoatLinkForm, LinkRowAction, RevokeByIdForm } from "./form";

export const dynamic = "force-dynamic";

/** Current time in unix seconds (outside render, so the page stays lint-clean). */
const nowSeconds = () => Math.floor(Date.now() / 1000);

const fmt = (iso: string) => new Date(iso).toISOString().replace("T", " ").slice(0, 16) + " UTC";

function status(l: BoatLinkRecord, now: number) {
  if (l.revokedAt) return { text: "Ingetrokken", cls: "bg-coral-soft text-coral" };
  if (l.exp && l.exp <= now) return { text: "Verlopen", cls: "bg-sand-200 text-muted" };
  return { text: "Actief", cls: "bg-ocean-100 text-ocean-800" };
}

export default async function BoatLinksPage() {
  const session = await getSession();
  if (!session) redirect("/admin");

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
    <AdminShell session={session} active="bootlinks" title="Bootlinks" intro="Maak een persoonlijke link (met QR-code) naar de privé boothandleiding voor een gast die de boot huurt, en trek links in die niet meer mogen werken.">
      {!storage && (
        <p className="mt-6 rounded-2xl bg-coral-soft p-4 text-sm text-coral">
          Links kunnen nu niet worden getoond of ingetrokken: de opslag is niet gekoppeld (BLOB_READ_WRITE_TOKEN). Neem contact op met de ontwikkelaar.
        </p>
      )}
      {loadError && <p className="mt-6 rounded-2xl bg-coral-soft p-4 text-sm text-coral">De lijst met links kon niet worden geladen. Laad de pagina opnieuw.</p>}

      <h2 className="mt-8 text-xl">Nieuwe link</h2>
      <BoatLinkForm />

      <h2 className="mt-10 text-xl">Actieve links</h2>
      <p className="mt-1 text-sm text-ink-soft">Intrekken werkt direct: de link en elk toestel dat de handleiding al had geopend verliezen de toegang (offline opgeslagen kopieën verdwijnen zodra de telefoon weer online is).</p>
      <LinkList links={active} now={now} empty="Geen actieve links." />

      {rest.length > 0 && (
        <>
          <h2 className="mt-10 text-xl">Ingetrokken en verlopen</h2>
          <LinkList links={rest} now={now} empty="" />
        </>
      )}

      <h2 className="mt-10 text-xl">Intrekken met ID of link</h2>
      <p className="mt-1 text-sm text-ink-soft">Voor links die niet in de lijst staan (bijvoorbeeld gemaakt via de opdrachtregel): plak het ID of de hele link.</p>
      <RevokeByIdForm />
    </AdminShell>
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
              <p className="truncate font-semibold">{l.label || <span className="text-muted">Zonder naam</span>}</p>
              <p className="mt-0.5 text-xs text-muted">
                <code>{l.id}</code>
                {l.exp ? ` · ${l.exp > now ? "geldig tot" : "verlopen op"} ${fmt(new Date(l.exp * 1000).toISOString())}` : ""}
                {l.revokedAt ? ` · ingetrokken ${fmt(l.revokedAt)}` : ""}
              </p>
            </div>
            <span className={`shrink-0 rounded-full px-2.5 py-1 text-[0.7rem] font-bold uppercase tracking-wider ${s.cls}`}>{s.text}</span>
            {s.text === "Actief" && <LinkRowAction id={l.id} kind="revoke" label={l.label} />}
            {s.text === "Ingetrokken" && (!l.exp || l.exp > now) && l.exp !== 0 && <LinkRowAction id={l.id} kind="restore" label={l.label} />}
          </li>
        );
      })}
    </ul>
  );
}
