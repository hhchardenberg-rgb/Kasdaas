import "server-only";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { BlobPreconditionFailedError, get, put } from "@vercel/blob";

/**
 * Registry of boat links, so the admin page can list issued links and revoke
 * them without a redeploy.
 *
 * Storage: a private JSON file in Vercel Blob (BLOB_READ_WRITE_TOKEN).
 * Without that token, outside Vercel (local development / tests), a file in
 * `.data/` is used instead. On Vercel without the token, revoking is unavailable.
 * Tokens themselves stay stateless; the registry only adds names and the
 * revocation list on top.
 */

export interface BoatLinkRecord {
  /** Token id (12 hex characters). */
  id: string;
  /** Optional label, e.g. guest name / booking. */
  label?: string;
  /** Expiry as unix seconds (0 when unknown, e.g. a link made with the CLI). */
  exp: number;
  createdAt?: string;
  revokedAt?: string;
}

interface Registry {
  links: BoatLinkRecord[];
}

const PATHNAME = "admin/boat-links.json";
const LOCAL_FILE = join(process.cwd(), ".data", "boat-links.json");
/** Records are kept this long after their link expired, then pruned. */
const KEEP_EXPIRED_S = 30 * 86400;

const blobConfigured = () => !!process.env.BLOB_READ_WRITE_TOKEN;

export function registryAvailable(): boolean {
  return blobConfigured() || !process.env.VERCEL;
}

async function readRaw(): Promise<{ data: Registry; etag?: string }> {
  if (blobConfigured()) {
    const res = await get(PATHNAME, { access: "private", useCache: false });
    if (!res || res.statusCode !== 200) return { data: { links: [] } };
    const text = await new Response(res.stream).text();
    return { data: parse(text), etag: res.blob.etag };
  }
  if (!registryAvailable()) return { data: { links: [] } };
  try {
    return { data: parse(await readFile(LOCAL_FILE, "utf8")) };
  } catch {
    return { data: { links: [] } };
  }
}

function parse(text: string): Registry {
  try {
    const d = JSON.parse(text);
    return { links: Array.isArray(d?.links) ? d.links : [] };
  } catch {
    return { links: [] };
  }
}

async function writeRaw(data: Registry, etag?: string): Promise<void> {
  const body = JSON.stringify(data, null, 1);
  if (blobConfigured()) {
    await put(PATHNAME, body, {
      access: "private",
      contentType: "application/json",
      addRandomSuffix: false,
      allowOverwrite: true,
      cacheControlMaxAge: 60,
      ...(etag ? { ifMatch: etag } : {}),
    });
    return;
  }
  if (!registryAvailable()) throw new Error("Link storage is not configured (BLOB_READ_WRITE_TOKEN).");
  await mkdir(dirname(LOCAL_FILE), { recursive: true });
  await writeFile(LOCAL_FILE, body);
}

/** Last successful read, used only as a fallback when storage is briefly unreachable. */
let lastKnown: Registry | null = null;

/** All records, newest first. Always read fresh, so a revocation applies immediately everywhere. */
export async function listBoatLinks(): Promise<BoatLinkRecord[]> {
  const { data } = await readRaw();
  lastKnown = data;
  return data.links;
}

/** Ids revoked from the admin page. Never throws: if storage is unreachable, the last known list applies. */
export async function registryRevokedIds(): Promise<string[]> {
  try {
    return (await listBoatLinks()).filter((l) => l.revokedAt).map((l) => l.id);
  } catch (e) {
    console.error("[boat registry] read failed", e);
    return lastKnown?.links.filter((l) => l.revokedAt).map((l) => l.id) ?? [];
  }
}

/** Read-modify-write with an optimistic lock (retries when another write got in between). */
async function update(mutate: (links: BoatLinkRecord[]) => BoatLinkRecord[]): Promise<BoatLinkRecord[]> {
  for (let attempt = 0; ; attempt++) {
    const { data, etag } = await readRaw();
    const now = Math.floor(Date.now() / 1000);
    const links = mutate(data.links).filter((l) => !l.exp || l.exp > now - KEEP_EXPIRED_S);
    try {
      await writeRaw({ links }, etag);
      lastKnown = { links };
      return links;
    } catch (e) {
      if (attempt < 3 && e instanceof BlobPreconditionFailedError) continue;
      throw e;
    }
  }
}

export async function recordBoatLink(record: BoatLinkRecord): Promise<void> {
  await update((links) => [record, ...links.filter((l) => l.id !== record.id)]);
}

/** Revokes a link by id. Unknown ids (e.g. links made with the CLI) are added as revoked records. */
export async function revokeBoatLink(id: string): Promise<void> {
  const at = new Date().toISOString();
  await update((links) =>
    links.some((l) => l.id === id)
      ? links.map((l) => (l.id === id ? { ...l, revokedAt: l.revokedAt ?? at } : l))
      : [{ id, exp: 0, label: "Revoked by ID", revokedAt: at }, ...links],
  );
}

/** Undo a revocation (e.g. revoked by mistake). */
export async function restoreBoatLink(id: string): Promise<void> {
  await update((links) => links.map((l) => (l.id === id ? { ...l, revokedAt: undefined } : l)).filter((l) => l.exp !== 0 || l.revokedAt));
}
