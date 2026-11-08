import "server-only";
import { jsonStore, storageAvailable } from "@/lib/storage";
import type { EditableLocale } from "./registry";

/**
 * Text edits made by the owner. Only differences from the code are stored:
 * a key that is absent shows the original text.
 */
export interface TextOverride {
  /** The Dutch text (the source of truth). */
  nl: string;
  /** Translations that are in sync with `nl`. A missing language shows the Dutch text until it is translated. */
  tr: Partial<Record<EditableLocale, string>>;
  /** Languages whose translation was corrected by hand (lost when the Dutch text changes). */
  manual?: EditableLocale[];
  /** The Dutch text in the code when this was saved, to notice later changes in the code. */
  baseNl: string;
  by: string;
  at: string;
}

export interface LogEntry {
  at: string;
  by: string;
  key: string;
  /** Short description for the history list. */
  what: string;
}

export interface OverridesDoc {
  texts: Record<string, TextOverride>;
  log: LogEntry[];
  /** Increases with every save, so a slow request can't apply an older state over a newer one. */
  rev: number;
}

const LOG_LIMIT = 300;

export const overridesStore = jsonStore<OverridesDoc>(
  "cms-texts",
  () => ({ texts: {}, log: [], rev: 0 }),
  (raw) => {
    const d = raw as Partial<OverridesDoc> | null;
    return {
      texts: d && typeof d.texts === "object" && d.texts ? d.texts : {},
      log: Array.isArray(d?.log) ? d.log : [],
      rev: typeof d?.rev === "number" ? d.rev : 0,
    };
  },
);

export const overridesAvailable = storageAvailable;

export function withLog(doc: OverridesDoc, entry: LogEntry): OverridesDoc {
  return { ...doc, rev: doc.rev + 1, log: [entry, ...doc.log].slice(0, LOG_LIMIT) };
}
