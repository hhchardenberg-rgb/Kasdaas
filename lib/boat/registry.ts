import "server-only";
import { jsonStore, storageAvailable } from "@/lib/storage";

/**
 * Registry of boat links, so the admin page can list issued links and revoke
 * them without a redeploy. Tokens themselves stay stateless; the registry only
 * adds names and the revocation list on top. Storage: see lib/storage.ts.
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

/** Records are kept this long after their link expired, then pruned. */
const KEEP_EXPIRED_S = 30 * 86400;

const store = jsonStore<Registry>(
  "boat-links",
  () => ({ links: [] }),
  (raw) => ({ links: Array.isArray((raw as Registry)?.links) ? (raw as Registry).links : [] }),
);

export const registryAvailable = storageAvailable;

/** Last successful read, used only as a fallback when storage is briefly unreachable. */
let lastKnown: Registry | null = null;

/** All records, newest first. Always read fresh, so a revocation applies immediately everywhere. */
export async function listBoatLinks(): Promise<BoatLinkRecord[]> {
  const data = await store.read();
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

async function update(mutate: (links: BoatLinkRecord[]) => BoatLinkRecord[]): Promise<void> {
  const now = Math.floor(Date.now() / 1000);
  const saved = await store.update((data) => ({
    links: mutate(data.links).filter((l) => !l.exp || l.exp > now - KEEP_EXPIRED_S),
  }));
  lastKnown = saved;
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
      : [{ id, exp: 0, label: "Ingetrokken via ID", revokedAt: at }, ...links],
  );
}

/** Undo a revocation (e.g. revoked by mistake). */
export async function restoreBoatLink(id: string): Promise<void> {
  await update((links) => links.map((l) => (l.id === id ? { ...l, revokedAt: undefined } : l)).filter((l) => l.exp !== 0 || l.revokedAt));
}
