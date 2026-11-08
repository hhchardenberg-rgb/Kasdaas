"use server";
import { revalidatePath } from "next/cache";
import { getSession } from "@/lib/admin-session";
import { isPlaceholder } from "@/lib/i18n";
import { EDITABLE_LOCALES, getEntry, type CmsEntry, type EditableLocale } from "@/lib/cms/registry";
import { overridesStore, withLog, type OverridesDoc, type TextOverride } from "@/lib/cms/overrides";
import { applyOverrides, effectiveValue } from "@/lib/cms/sync";
import { translateText } from "@/lib/cms/translate";
import { allEditorEntries, whereLabel } from "@/lib/cms/view";

export interface SaveState {
  ok?: boolean;
  error?: string;
  /** What happened, for the person who saved. */
  message?: string;
}

const MAX_LENGTH = 4000;
const SIGNED_OUT = "Je bent uitgelogd. Laad de pagina opnieuw en log in.";

const clean = (s: string) => s.replace(/\r\n?/g, "\n").trim();

/** Fields that end up in links (tel:, mailto:, https://) must look like what they are; a "javascript:" link would reach every guest. */
function neutralError(key: string, value: string): string | null {
  const field = key.split(".").pop();
  if ((field === "website" || field === "reservationUrl") && !/^https?:\/\/[^\s<>"']+$/i.test(value)) return "Vul een webadres in dat begint met https://";
  if (field === "email" && !/^[^\s@<>"']+@[^\s@<>"']+\.[^\s@<>"']+$/.test(value)) return "Vul een geldig e-mailadres in.";
  if ((field === "phone" || field === "whatsapp") && !/^\+?[0-9][0-9 ()-]{4,24}$/.test(value)) return "Vul een telefoonnummer in, bijvoorbeeld +599 123 4567.";
  return null;
}

/** Stores `ov` for `key` (or removes it), logs it, applies it to this server and refreshes the guide. */
async function commit(entry: CmsEntry, ov: TextOverride | null, who: string, what: string): Promise<OverridesDoc> {
  const at = new Date().toISOString();
  const saved = await overridesStore.update((doc) => {
    const texts = { ...doc.texts };
    if (ov) texts[entry.key] = ov;
    else delete texts[entry.key];
    return withLog({ ...doc, texts }, { at, by: who, key: entry.key, what: `${what}: ${whereLabel(entry)}` });
  });
  applyOverrides(saved);
  // Pages are generated once and cached; this makes the next visit build them again with the new text.
  // (A page rebuilt at the very moment of saving can end up with the old text; `revalidate` in the locale
  // layout limits how long such a page can stay: at most a minute.)
  revalidatePath("/", "layout");
  return saved;
}

/** Translates `nl` for `entry` and returns the override to store (translations missing when that fails). */
async function buildOverride(entry: CmsEntry, nl: string, who: string, previous?: TextOverride): Promise<{ ov: TextOverride; error?: string }> {
  const base = { nl, baseNl: entry.original.nl, by: who, at: new Date().toISOString() };
  if (entry.kind === "neutral") return { ov: { ...base, tr: {} } };
  const reference = previous && EDITABLE_LOCALES.every((l) => previous.tr[l]) ? effectiveValue(entry, previous) : !isPlaceholder(entry.original) ? entry.original : undefined;
  const result = await translateText(nl, { where: whereLabel(entry), reference });
  if (!result.ok) return { ov: { ...base, tr: {} }, error: result.error };
  return { ov: { ...base, tr: result.tr } };
}

export async function saveText(_prev: SaveState, form: FormData): Promise<SaveState> {
  const session = await getSession();
  if (!session) return { error: SIGNED_OUT };
  const entry = getEntry(String(form.get("key") ?? ""));
  if (!entry) return { error: "Deze tekst bestaat niet meer. Laad de pagina opnieuw." };
  const nl = clean(String(form.get("nl") ?? ""));
  if (!nl) return { error: "Vul een tekst in." };
  if (nl.length > MAX_LENGTH) return { error: `Deze tekst is te lang (maximaal ${MAX_LENGTH} tekens).` };
  if (/^\[[\s\S]*\]$/.test(nl)) return { error: "Tekst tussen [ ] wordt gezien als 'nog in te vullen'. Haal de haken weg." };
  const invalid = entry.kind === "neutral" ? neutralError(entry.key, nl) : null;
  if (invalid) return { error: invalid };

  try {
    const doc = await overridesStore.read();
    const existing = doc.texts[entry.key];
    const currentNl = existing?.nl ?? (isPlaceholder(entry.original) ? "" : entry.original.nl);
    const complete = !existing || entry.kind === "neutral" || EDITABLE_LOCALES.every((l) => existing.tr[l]);
    if (nl === currentNl && complete) return { ok: true, message: "Er is niets gewijzigd." };

    // Back to exactly the original text: drop the edit, the original translations apply again.
    if (nl === entry.original.nl && !isPlaceholder(entry.original)) {
      await commit(entry, null, session.name, "Origineel hersteld");
      return { ok: true, message: "Opgeslagen: dit is weer de oorspronkelijke tekst." };
    }

    const { ov, error } = await buildOverride(entry, nl, session.name, existing);
    await commit(entry, ov, session.name, existing ? "Tekst aangepast" : "Tekst ingevuld");
    const live = "Opgeslagen. De gids is binnen een minuut bijgewerkt.";
    if (!error) {
      return { ok: true, message: entry.kind === "text" ? `${live} Vertaald naar Engels, Spaans en Duits.` : live };
    }
    return {
      ok: true,
      error: `De Nederlandse tekst is opgeslagen, maar vertalen lukte niet: ${error} Gasten zien in andere talen tijdelijk de Nederlandse tekst. Probeer 'Opnieuw vertalen' nog eens.`,
    };
  } catch (e) {
    console.error("[cms] save failed", e);
    return { error: "Opslaan is niet gelukt. Probeer het opnieuw." };
  }
}

/** The owner corrects a translation by hand. */
export async function saveTranslations(_prev: SaveState, form: FormData): Promise<SaveState> {
  const session = await getSession();
  if (!session) return { error: SIGNED_OUT };
  const entry = getEntry(String(form.get("key") ?? ""));
  if (!entry || entry.kind !== "text") return { error: "Deze tekst bestaat niet meer. Laad de pagina opnieuw." };
  try {
    const doc = await overridesStore.read();
    const existing = doc.texts[entry.key];
    const current = existing ? effectiveValue(entry, existing) : entry.original;
    const nl = existing?.nl ?? entry.original.nl;
    const tr: Partial<Record<EditableLocale, string>> = { ...(existing?.tr ?? { en: entry.original.en, es: entry.original.es, de: entry.original.de }) };
    const manual = new Set<EditableLocale>(existing?.manual ?? []);
    let changed = false;
    for (const l of EDITABLE_LOCALES) {
      const v = clean(String(form.get(l) ?? ""));
      if (!v) return { error: "Een vertaling mag niet leeg zijn. Wis je een vertaling, gebruik dan 'Opnieuw vertalen'." };
      if (v.length > MAX_LENGTH) return { error: "Een vertaling is te lang." };
      if (v !== current[l]) {
        tr[l] = v;
        manual.add(l);
        changed = true;
      }
    }
    if (!changed) return { ok: true, message: "Er is niets gewijzigd." };
    const ov: TextOverride = { nl, baseNl: existing?.baseNl ?? entry.original.nl, by: session.name, at: new Date().toISOString(), tr, manual: [...manual] };
    await commit(entry, ov, session.name, "Vertaling aangepast");
    return { ok: true, message: "Opgeslagen. De gids is binnen een minuut bijgewerkt." };
  } catch (e) {
    console.error("[cms] save translations failed", e);
    return { error: "Opslaan is niet gelukt. Probeer het opnieuw." };
  }
}

/** Translate the saved Dutch text again (e.g. after a failed attempt, or to undo manual corrections). */
export async function retranslate(_prev: SaveState, form: FormData): Promise<SaveState> {
  const session = await getSession();
  if (!session) return { error: SIGNED_OUT };
  const entry = getEntry(String(form.get("key") ?? ""));
  if (!entry || entry.kind !== "text") return { error: "Deze tekst bestaat niet meer. Laad de pagina opnieuw." };
  try {
    const doc = await overridesStore.read();
    const existing = doc.texts[entry.key];
    if (!existing) return { error: "Deze tekst is niet aangepast, dus er is niets om opnieuw te vertalen." };
    const { ov, error } = await buildOverride(entry, existing.nl, session.name, existing);
    if (error) return { error: `Vertalen lukte niet: ${error}` };
    await commit(entry, ov, session.name, "Opnieuw vertaald");
    return { ok: true, message: "Opnieuw vertaald naar Engels, Spaans en Duits." };
  } catch (e) {
    console.error("[cms] retranslate failed", e);
    return { error: "Vertalen is niet gelukt. Probeer het opnieuw." };
  }
}

/** Remove the edit: the original text and its translations are back. */
export async function resetText(_prev: SaveState, form: FormData): Promise<SaveState> {
  const session = await getSession();
  if (!session) return { error: SIGNED_OUT };
  const entry = getEntry(String(form.get("key") ?? ""));
  if (!entry) return { error: "Deze tekst bestaat niet meer. Laad de pagina opnieuw." };
  try {
    await commit(entry, null, session.name, "Origineel hersteld");
    return { ok: true, message: "De oorspronkelijke tekst is terug." };
  } catch (e) {
    console.error("[cms] reset failed", e);
    return { error: "Herstellen is niet gelukt. Probeer het opnieuw." };
  }
}

export interface BulkState {
  error?: string;
  message?: string;
}

const BATCH = 6;

/** Translates texts that are waiting for a translation (a few per click, to stay within the time limit). */
export async function retranslatePending(): Promise<BulkState> {
  const session = await getSession();
  if (!session) return { error: SIGNED_OUT };
  try {
    const doc = await overridesStore.read();
    const waiting = allEditorEntries(doc).filter((e) => e.status === "pending");
    if (waiting.length === 0) return { message: "Alles is vertaald." };
    let lastError: string | undefined;
    const batch = waiting.slice(0, BATCH);
    const results: { entry: CmsEntry; ov: TextOverride }[] = [];
    // Translating may run side by side; saving happens one at a time (the store is a single document).
    for (let i = 0; i < batch.length; i += 3) {
      await Promise.all(
        batch.slice(i, i + 3).map(async (e) => {
          const entry = getEntry(e.key);
          const existing = doc.texts[e.key];
          if (!entry || !existing) return;
          const { ov, error } = await buildOverride(entry, existing.nl, session.name, existing);
          if (error) lastError = error;
          else results.push({ entry, ov });
        }),
      );
      if (lastError) break;
    }
    let done = 0;
    for (const r of results) {
      await commit(r.entry, r.ov, session.name, "Opnieuw vertaald");
      done += 1;
    }
    const left = waiting.length - done;
    if (lastError) return { error: `${done} vertaald, daarna ging het mis: ${lastError}` };
    return { message: left > 0 ? `${done} teksten vertaald. Nog ${left} te gaan: klik nog een keer.` : `${done} teksten vertaald. Alles is nu vertaald.` };
  } catch (e) {
    console.error("[cms] retranslate pending failed", e);
    return { error: "Vertalen is niet gelukt. Probeer het opnieuw." };
  }
}

