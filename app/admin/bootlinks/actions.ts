"use server";
import { revalidatePath } from "next/cache";
import { issueBoatToken } from "@/lib/boat/access";
import { recordBoatLink, restoreBoatLink, revokeBoatLink } from "@/lib/boat/registry";
import { getSession } from "@/lib/admin-session";
import { qrSvg } from "@/lib/qr";
import { site } from "@/content/site";

export interface LinkResult {
  error?: string;
  warning?: string;
  url?: string;
  id?: string;
  expires?: string;
  qr?: string;
  message?: string;
}

export interface RevokeState {
  error?: string;
  done?: string;
}

const SIGNED_OUT = "Je bent uitgelogd. Laad de pagina opnieuw en log in.";
const fmtDate = (exp: number) => new Date(exp * 1000).toISOString().replace("T", " ").slice(0, 16) + " UTC";

/** Creates a signed boat link and records it so it can be revoked later. */
export async function createBoatLink(_prev: LinkResult, form: FormData): Promise<LinkResult> {
  if (!(await getSession())) return { error: SIGNED_OUT };
  const days = Math.min(60, Math.max(1, Number(form.get("days")) || 3));
  const label = String(form.get("label") ?? "").trim().slice(0, 80) || undefined;
  const raw = String(form.get("lang") ?? "");
  const lang = raw === "en" || raw === "es" || raw === "de" ? raw : "nl";
  try {
    const { token, id, exp } = issueBoatToken(days);
    const base = String(form.get("origin") || site.url).replace(/\/$/, "");
    const url = `${base}/boat/${token}`;
    const expires = fmtDate(exp);
    const message = {
      nl: `Hier vind je alle informatie over de boot 🚤\n${url}\n\nDeze link is persoonlijk en geldig tot ${expires}.`,
      en: `Here's everything you need to know about the boat 🚤\n${url}\n\nThis link is personal and valid until ${expires}.`,
      es: `Aquí tienes toda la información sobre el barco 🚤\n${url}\n\nEste enlace es personal y válido hasta ${expires}.`,
      de: `Hier findest du alle Infos zum Boot 🚤\n${url}\n\nDieser Link ist persönlich und gültig bis ${expires}.`,
    }[lang];
    let warning: string | undefined;
    try {
      await recordBoatLink({ id, label, exp, createdAt: new Date().toISOString() });
      revalidatePath("/admin/bootlinks");
    } catch (e) {
      console.error("[admin] could not record link", e);
      warning = `De link werkt, maar staat niet in de lijst en kan dus niet met een knop worden ingetrokken. Intrekken kan wel via dit ID: ${id}`;
    }
    return { url, id, expires, qr: await qrSvg(url), message, warning };
  } catch (e) {
    return { error: e instanceof Error ? e.message : "De link maken is niet gelukt." };
  }
}

const ID = /^[0-9a-f]{12}$/;

/** Revokes a link: works immediately, no redeploy. Accepts an id, or a full link / token. */
export async function revokeLink(_prev: RevokeState, form: FormData): Promise<RevokeState> {
  if (!(await getSession())) return { error: SIGNED_OUT };
  const id = idFromInput(String(form.get("id") ?? ""));
  if (!id) return { error: "Dit is geen geldig ID (12 tekens, 0-9 en a-f) of bootlink." };
  try {
    await revokeBoatLink(id);
    revalidatePath("/admin/bootlinks");
    return { done: `Link ${id} is ingetrokken.` };
  } catch (e) {
    console.error("[admin] revoke failed", e);
    return { error: "Intrekken is niet gelukt. Probeer het opnieuw." };
  }
}

export async function restoreLink(_prev: RevokeState, form: FormData): Promise<RevokeState> {
  if (!(await getSession())) return { error: SIGNED_OUT };
  const id = String(form.get("id") ?? "").trim().toLowerCase();
  if (!ID.test(id)) return { error: "Ongeldig ID." };
  try {
    await restoreBoatLink(id);
    revalidatePath("/admin/bootlinks");
    return { done: `Link ${id} werkt weer.` };
  } catch (e) {
    console.error("[admin] restore failed", e);
    return { error: "Opslaan is niet gelukt. Probeer het opnieuw." };
  }
}

/** Accepts "a1b2c3d4e5f6", a 36-char token or a full https://…/boat/<token> link. */
function idFromInput(input: string): string | null {
  const v = input.trim();
  if (ID.test(v.toLowerCase())) return v.toLowerCase();
  const token = v.split("/").pop()?.split(/[?#]/)[0] ?? "";
  if (!/^[A-Za-z0-9_-]{36}$/.test(token)) return null;
  const raw = Buffer.from(token, "base64url");
  return raw.length === 27 ? raw.subarray(1, 7).toString("hex") : null;
}
