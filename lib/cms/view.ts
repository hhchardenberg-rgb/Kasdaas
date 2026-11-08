import "server-only";
import { isPlaceholder } from "@/lib/i18n";
import { EDITABLE_LOCALES, GROUPS, getRegistry, type CmsEntry, type EditableLocale } from "./registry";
import type { OverridesDoc } from "./overrides";
import { effectiveValue } from "./sync";

/** What the admin editor needs to show one text. Plain data, safe to pass to client components. */
export type EditStatus = "todo" | "original" | "edited" | "pending";

export interface EditorEntry {
  key: string;
  kind: "text" | "neutral";
  groupId: string;
  trail: string[];
  field: string;
  /** The Dutch text to edit (empty for texts that still have to be filled in). */
  nl: string;
  /** Shown in the empty field for texts that still have to be filled in. */
  hint?: string;
  status: EditStatus;
  /** Translations as guests see them now. */
  tr: Record<EditableLocale, string>;
  /** Languages whose translation was corrected by hand. */
  manual: EditableLocale[];
  /** The text in the code has changed since this edit was saved. */
  upstreamChanged: boolean;
}

function toEditor(entry: CmsEntry, doc: OverridesDoc): EditorEntry {
  const ov = doc.texts[entry.key];
  const base = { key: entry.key, kind: entry.kind, groupId: entry.groupId, trail: entry.trail, field: entry.field };
  if (ov) {
    const eff = effectiveValue(entry, ov);
    const pending = entry.kind === "text" && EDITABLE_LOCALES.some((l) => !ov.tr[l]);
    return {
      ...base,
      nl: ov.nl,
      status: pending ? "pending" : "edited",
      tr: { en: eff.en, es: eff.es, de: eff.de },
      manual: ov.manual ?? [],
      upstreamChanged: ov.baseNl !== entry.original.nl,
    };
  }
  const todo = isPlaceholder(entry.original);
  return {
    ...base,
    nl: todo ? "" : entry.original.nl,
    hint: todo ? entry.original.nl.replace(/^\[|\]$/g, "").replace(/\s*INVULLEN$/, "") : undefined,
    status: todo ? "todo" : "original",
    tr: { en: entry.original.en, es: entry.original.es, de: entry.original.de },
    manual: [],
    upstreamChanged: false,
  };
}

export function allEditorEntries(doc: OverridesDoc): EditorEntry[] {
  return getRegistry().entries.map((e) => toEditor(e, doc));
}

export interface GroupSummary {
  id: string;
  label: string;
  description: string;
  total: number;
  todo: number;
  pending: number;
  edited: number;
}

export function summarize(entries: EditorEntry[]): { groups: GroupSummary[]; total: number; todo: number; pending: number; edited: number } {
  const groups = GROUPS.map((g) => {
    const mine = entries.filter((e) => e.groupId === g.id);
    return {
      ...g,
      total: mine.length,
      todo: mine.filter((e) => e.status === "todo").length,
      pending: mine.filter((e) => e.status === "pending").length,
      edited: mine.filter((e) => e.status === "edited" || e.status === "pending").length,
    };
  }).filter((g) => g.total > 0);
  return {
    groups,
    total: entries.length,
    todo: entries.filter((e) => e.status === "todo").length,
    pending: entries.filter((e) => e.status === "pending").length,
    edited: entries.filter((e) => e.status === "edited" || e.status === "pending").length,
  };
}

export type Filter = "all" | "todo" | "edited" | "pending";

export function parseFilter(v: string | undefined): Filter {
  return v === "todo" || v === "edited" || v === "pending" ? v : "all";
}

export function matchesFilter(e: EditorEntry, filter: Filter): boolean {
  if (filter === "todo") return e.status === "todo";
  if (filter === "edited") return e.status === "edited" || e.status === "pending";
  if (filter === "pending") return e.status === "pending";
  return true;
}

export function matchesQuery(e: EditorEntry, q: string): boolean {
  const hay = `${e.trail.join(" ")} ${e.field} ${e.nl} ${e.hint ?? ""}`.toLowerCase();
  return q
    .toLowerCase()
    .split(/\s+/)
    .filter(Boolean)
    .every((t) => hay.includes(t));
}

export function groupLabel(id: string): string {
  return GROUPS.find((g) => g.id === id)?.label ?? id;
}

/** A readable place for the translator and the history: "Villa-gids › Aankomst › Adres › Samenvatting". */
export function whereLabel(entry: CmsEntry): string {
  return [groupLabel(entry.groupId), ...entry.trail, entry.field].join(" › ");
}
