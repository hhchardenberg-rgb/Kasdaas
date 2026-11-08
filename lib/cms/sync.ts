import "server-only";
import { cache } from "react";
import { getRegistry, type CmsEntry } from "./registry";
import { overridesStore, type OverridesDoc, type TextOverride } from "./overrides";
import type { Localized } from "@/lib/i18n";

/**
 * Applies the owner's edits to the content objects.
 *
 * Content is plain objects loaded once per server process. An edit replaces
 * the values of the matching object in place, so every page that reads content
 * the normal way shows it, without any page knowing about the CMS.
 * Call `await syncContent()` at the top of every page/layout/route that reads content.
 *
 * Applying is stateless: every call sets every text to exactly what the stored edits say
 * (the edit, or the pristine original). It does not matter how often it runs, in which
 * order, or in which copy of this module — the result only depends on the stored edits.
 */

/** Effective values for an entry with an override. A missing translation shows the Dutch text. */
export function effectiveValue(entry: CmsEntry, ov: TextOverride): Localized {
  if (entry.kind === "neutral") return { nl: ov.nl, en: ov.nl, es: ov.nl, de: ov.nl };
  return { nl: ov.nl, en: ov.tr.en ?? ov.nl, es: ov.tr.es ?? ov.nl, de: ov.tr.de ?? ov.nl };
}

const same = (a: Localized, b: Localized) => a.nl === b.nl && a.en === b.en && a.es === b.es && a.de === b.de;

/** The newest state this copy applied, to refuse an older one that arrives late (a slow request). */
let applied = { rev: -1, at: 0 };
const STALE_WINDOW_MS = 15_000;

export function applyOverrides(doc: Pick<OverridesDoc, "texts" | "rev">): void {
  const now = Date.now();
  // A request that read the stored edits before a save but finishes after it must not undo the save.
  if (doc.rev < applied.rev && now - applied.at < STALE_WINDOW_MS) return;
  applied = { rev: doc.rev, at: now };
  for (const entry of getRegistry().entries) {
    const ov = doc.texts[entry.key];
    const next = ov ? effectiveValue(entry, ov) : { ...entry.original };
    if (!same(entry.read(), next)) entry.write(next);
  }
}

/** Loads the edits (always fresh) and applies them. Deduplicated within one request. Never throws. */
export const syncContent = cache(async (): Promise<void> => {
  try {
    getRegistry(); // record the originals before the first edit is applied
    applyOverrides(await overridesStore.read());
  } catch (e) {
    console.error("[cms] could not load text edits", e);
  }
});
