import Link from "next/link";
import { groupLabel, type EditorEntry } from "@/lib/cms/view";
import { TextEditor } from "../teksten/editor";

/** Entries grouped by the item they belong to (e.g. one topic of the villa guide), each collapsible. */
export function EntryList({ entries, open, showGroup }: { entries: EditorEntry[]; open?: boolean; showGroup?: boolean }) {
  const sections = new Map<string, EditorEntry[]>();
  for (const e of entries) {
    const key = `${showGroup ? groupLabel(e.groupId) + " › " : ""}${e.trail.join(" › ") || "Algemeen"}`;
    sections.set(key, [...(sections.get(key) ?? []), e]);
  }
  return (
    <div className="mt-4 space-y-3">
      {[...sections].map(([title, items]) => {
        const todo = items.filter((i) => i.status === "todo").length;
        return (
          <details key={title} open={open || sections.size === 1} className="card overflow-hidden [&[open]>summary_.chev]:rotate-90">
            <summary className="flex min-h-14 cursor-pointer items-center gap-3 px-4 py-3">
              <span className="chev text-muted transition-transform" aria-hidden>›</span>
              <span className="flex-1 font-semibold">{title}</span>
              {todo > 0 && <span className="rounded-full bg-coral-soft px-2.5 py-0.5 text-[0.68rem] font-bold uppercase tracking-wider text-coral">{todo} invullen</span>}
              <span className="text-sm text-muted">{items.length}</span>
            </summary>
            <div className="space-y-3 border-t border-sand-200 bg-sand-50/60 p-3">
              {items.map((e) => (
                <TextEditor key={e.key} entry={e} />
              ))}
            </div>
          </details>
        );
      })}
    </div>
  );
}

export function FilterChips({ base, filter, q, counts }: { base: string; filter: string; q?: string; counts: { todo: number; edited: number; pending: number } }) {
  const chips = [
    { id: "all", label: "Alles" },
    { id: "todo", label: `Nog invullen (${counts.todo})` },
    { id: "edited", label: `Aangepast (${counts.edited})` },
    { id: "pending", label: `Wacht op vertaling (${counts.pending})` },
  ];
  return (
    <div className="mt-4 flex flex-wrap gap-2" role="group" aria-label="Filter">
      {chips.map((c) => {
        const params = new URLSearchParams();
        if (c.id !== "all") params.set("filter", c.id);
        if (q) params.set("q", q);
        const href = `${base}${params.size ? `?${params}` : ""}`;
        return (
          <Link key={c.id} href={href} aria-current={filter === c.id ? "true" : undefined} className={`rounded-full px-4 py-2 text-sm font-semibold ${filter === c.id ? "bg-ocean-800 text-white" : "bg-sand-100"}`}>
            {c.label}
          </Link>
        );
      })}
    </div>
  );
}
