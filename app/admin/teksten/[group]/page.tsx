import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { getSession } from "@/lib/admin-session";
import { overridesAvailable, overridesStore } from "@/lib/cms/overrides";
import { syncContent } from "@/lib/cms/sync";
import { allEditorEntries, matchesFilter, matchesQuery, parseFilter, summarize } from "@/lib/cms/view";
import { GROUPS } from "@/lib/cms/registry";
import { AdminShell } from "../../_components/shell";
import { EntryList, FilterChips } from "../../_components/entry-list";

export const dynamic = "force-dynamic";
/** Saving a text includes translating it. */
export const maxDuration = 60;

export default async function TextGroupPage({ params, searchParams }: PageProps<"/admin/teksten/[group]">) {
  const session = await getSession();
  if (!session) redirect("/admin");
  const { group } = await params;
  const info = GROUPS.find((g) => g.id === group);
  if (!info) notFound();
  await syncContent();
  const sp = await searchParams;
  const q = (Array.isArray(sp.q) ? sp.q[0] : sp.q)?.trim() ?? "";
  const filter = parseFilter(Array.isArray(sp.filter) ? sp.filter[0] : sp.filter);

  const all = overridesAvailable() ? allEditorEntries(await overridesStore.read()) : [];
  const mine = all.filter((e) => e.groupId === group);
  const counts = summarize(mine);
  const shown = mine.filter((e) => matchesFilter(e, filter) && (!q || matchesQuery(e, q)));
  const base = `/admin/teksten/${group}`;

  return (
    <AdminShell session={session} active="teksten" title={info.label} intro={info.description} wide>
      <p className="mt-3 text-sm">
        <Link href="/admin/teksten" className="font-semibold text-ocean-800 underline-offset-4 hover:underline">← Alle onderdelen</Link>
      </p>
      <form action={base} className="mt-4 flex gap-2" role="search">
        {filter !== "all" && <input type="hidden" name="filter" value={filter} />}
        <input name="q" defaultValue={q} placeholder="Zoek in dit onderdeel" aria-label="Zoeken" className="h-12 min-w-0 flex-1 rounded-xl border border-sand-300 bg-white px-3" />
        <button className="h-12 rounded-full bg-ocean-800 px-5 font-semibold text-white">Zoek</button>
      </form>
      <FilterChips base={base} filter={filter} q={q} counts={counts} />
      {shown.length === 0 ? <p className="mt-6 text-sm text-ink-soft">Niets gevonden.</p> : <EntryList entries={shown} open={filter !== "all" || !!q} />}
    </AdminShell>
  );
}
