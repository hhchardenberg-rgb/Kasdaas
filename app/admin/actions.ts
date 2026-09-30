"use server";
import { revalidatePath } from "next/cache";
import { issueBoatToken } from "@/lib/boat/access";
import { recordBoatLink, restoreBoatLink, revokeBoatLink } from "@/lib/boat/registry";
import { endAdminSession, isAdmin, isAdminPassword, startAdminSession } from "@/lib/admin-session";
import { qrSvg } from "@/lib/qr";
import { site } from "@/content/site";

export interface LoginState {
  error?: string;
}

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

let failures = 0;
let lockedUntil = 0;

export async function login(_prev: LoginState, form: FormData): Promise<LoginState> {
  if (Date.now() < lockedUntil) return { error: "Too many attempts. Try again in a minute." };
  if (!isAdminPassword(String(form.get("password") ?? ""))) {
    failures += 1;
    if (failures >= 5) {
      lockedUntil = Date.now() + 60_000;
      failures = 0;
    }
    return { error: "Wrong password." };
  }
  failures = 0;
  await startAdminSession();
  revalidatePath("/admin");
  return {};
}

export async function logout(): Promise<void> {
  await endAdminSession();
  revalidatePath("/admin");
}

const fmtDate = (exp: number) => new Date(exp * 1000).toISOString().replace("T", " ").slice(0, 16) + " UTC";

/** Creates a signed boat link and records it so it can be revoked later. */
export async function createBoatLink(_prev: LinkResult, form: FormData): Promise<LinkResult> {
  if (!(await isAdmin())) return { error: "Your session has expired. Reload the page and sign in again." };
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
      revalidatePath("/admin");
    } catch (e) {
      console.error("[admin] could not record link", e);
      warning = `The link works, but could not be saved to the list. You can still revoke it by ID: ${id}`;
    }
    return { url, id, expires, qr: await qrSvg(url), message, warning };
  } catch (e) {
    return { error: e instanceof Error ? e.message : "Could not create link." };
  }
}

const ID = /^[0-9a-f]{12}$/;

/** Revokes a link: works immediately, no redeploy. Accepts an id, or a full link / token. */
export async function revokeLink(_prev: RevokeState, form: FormData): Promise<RevokeState> {
  if (!(await isAdmin())) return { error: "Your session has expired. Reload the page and sign in again." };
  const id = idFromInput(String(form.get("id") ?? ""));
  if (!id) return { error: "That is not a valid link ID (12 characters, 0-9 and a-f) or boat link." };
  try {
    await revokeBoatLink(id);
    revalidatePath("/admin");
    return { done: `Link ${id} is revoked.` };
  } catch (e) {
    console.error("[admin] revoke failed", e);
    return { error: "Could not save the revocation. Try again." };
  }
}

export async function restoreLink(_prev: RevokeState, form: FormData): Promise<RevokeState> {
  if (!(await isAdmin())) return { error: "Your session has expired. Reload the page and sign in again." };
  const id = String(form.get("id") ?? "").trim().toLowerCase();
  if (!ID.test(id)) return { error: "Invalid ID." };
  try {
    await restoreBoatLink(id);
    revalidatePath("/admin");
    return { done: `Link ${id} works again.` };
  } catch (e) {
    console.error("[admin] restore failed", e);
    return { error: "Could not save. Try again." };
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
