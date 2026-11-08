import Link from "next/link";
import { redirect } from "next/navigation";
import { getSession } from "@/lib/admin-session";
import { overridesAvailable, overridesStore } from "@/lib/cms/overrides";
import { syncContent } from "@/lib/cms/sync";
import { translationConfigured } from "@/lib/cms/translate";
import { allEditorEntries, matchesFilter, matchesQuery, parseFilter, summarize } from "@/lib/cms/view";
import { AdminShell } from "../_components/shell";
import { EntryList, FilterChips } from "../_components/entry-list";

export const dynamic = "force-dynamic";
/** Saving a text includes translating it. */
export const maxDuration = 60;

const MAX_RESULTS = 60;

export default async function TextsPage({ searchParams }: PageProps<"/admin/teksten">) {
  const session = await getSession();
  if (!session) redirect("/admin");
  await syncContent();
  const sp = await searchParams;
  const q = (Array.isArray(sp.q) ? sp.q[0] : sp.q)?.trim() ?? "";
  const filter = parseFilter(Array.isArray(sp.filter) ? sp.filter[0] : sp.filter);

  const available = overridesAvailable();
  const entries = available ? allEditorEntries(await overridesStore.read()) : [];
  const summary = summarize(entries);
  const searching = !!q || filter !== "all";
  const results = searching ? entries.filter((e) => matchesFilter(e, filter) && (!q || matchesQuery(e, q))) : [];

  return (
    <AdminShell session={session} active="teksten" title="Teksten" intro="Pas hier de Nederlandse teksten van de gids aan. Na het opslaan worden ze automatisch vertaald naar Engels, Spaans en Duits." wide>
      {!available && (
        <p className="mt-6 rounded-2xl bg-coral-soft p-4 text-sm text-coral">
          Teksten aanpassen werkt nog niet: de opslag is niet gekoppeld (BLOB_READ_WRITE_TOKEN). Neem contact op met de ontwikkelaar.
        </p>
      )}
      {available && !translationConfigured() && (
        <p className="mt-6 rounded-2xl bg-coral-soft p-4 text-sm text-coral">
          Automatisch vertalen staat nog uit, dus aanpassingen verschijnen voorlopig alleen in het Nederlands.
          {session.role === "admin" ? " Stel ANTHROPIC_API_KEY in als omgevingsvariabele." : " Vraag de ontwikkelaar dit in te stellen."}
        </p>
      )}

      <form action="/admin/teksten" className="mt-6 flex gap-2" role="search">
        {filter !== "all" && <input type="hidden" name="filter" value={filter} />}
        <input name="q" defaultValue={q} placeholder="Zoek een tekst, bijvoorbeeld 'wifi' of 'zwembad'" aria-label="Zoeken" className="h-12 min-w-0 flex-1 rounded-xl border border-sand-300 bg-white px-3" />
        <button className="h-12 rounded-full bg-ocean-800 px-5 font-semibold text-white">Zoek</button>
      </form>
      <FilterChips base="/admin/teksten" filter={filter} q={q} counts={summary} />

      {searching ? (
        <>
          <p className="mt-6 text-sm text-ink-soft">
            {results.length === 0 ? "Niets gevonden." : results.length > MAX_RESULTS ? `${results.length} resultaten, de eerste ${MAX_RESULTS} staan hieronder. Maak je zoekopdracht specifieker om de rest te zien.` : `${results.length} ${results.length === 1 ? "resultaat" : "resultaten"}`}
          </p>
          <EntryList entries={results.slice(0, MAX_RESULTS)} open showGroup />
        </>
      ) : (
        <ul className="mt-6 space-y-2.5">
          {summary.groups.map((g) => (
            <li key={g.id}>
              <Link href={`/admin/teksten/${g.id}`} className="card flex min-h-16 items-center gap-3 p-4 hover:bg-white">
                <span className="min-w-0 flex-1">
                  <span className="block font-semibold">{g.label}</span>
                  <span className="block truncate text-sm text-ink-soft">{g.description}</span>
                </span>
                {g.todo > 0 && <span className="shrink-0 rounded-full bg-coral-soft px-2.5 py-1 text-[0.68rem] font-bold uppercase tracking-wider text-coral">{g.todo} invullen</span>}
                <span className="shrink-0 text-sm text-muted">{g.total}</span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </AdminShell>
  );
}
