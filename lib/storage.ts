import "server-only";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { BlobPreconditionFailedError, get, put } from "@vercel/blob";

/**
 * Small JSON document store for the admin features (boat links, text edits,
 * accounts).
 *
 * Storage: a private JSON file in Vercel Blob (BLOB_READ_WRITE_TOKEN). Without
 * that token, outside Vercel (local development / tests), a file in `.data/`
 * is used instead; on Vercel without the token the store is unavailable.
 * Writes are conditional on the file's ETag and retried, so two people saving
 * at the same moment can't overwrite each other.
 */

const blobConfigured = () => !!process.env.BLOB_READ_WRITE_TOKEN;

export function storageAvailable(): boolean {
  return blobConfigured() || !process.env.VERCEL;
}

export interface JsonStore<T> {
  /** Current content (an empty document when nothing was saved yet). Always read fresh. */
  read(): Promise<T>;
  /** Read-modify-write; returns the saved document. */
  update(mutate: (current: T) => T): Promise<T>;
}

export function jsonStore<T>(name: string, empty: () => T, normalize: (raw: unknown) => T): JsonStore<T> {
  const pathname = `admin/${name}.json`;
  const localFile = join(process.cwd(), ".data", `${name}.json`);

  const parse = (text: string): T => {
    try {
      return normalize(JSON.parse(text));
    } catch {
      return empty();
    }
  };

  async function readRaw(): Promise<{ data: T; etag?: string }> {
    if (blobConfigured()) {
      const res = await get(pathname, { access: "private", useCache: false });
      if (!res || res.statusCode !== 200) return { data: empty() };
      return { data: parse(await new Response(res.stream).text()), etag: res.blob.etag };
    }
    if (!storageAvailable()) return { data: empty() };
    try {
      return { data: parse(await readFile(localFile, "utf8")) };
    } catch {
      return { data: empty() };
    }
  }

  async function writeRaw(data: T, etag?: string): Promise<void> {
    const body = JSON.stringify(data, null, 1);
    if (blobConfigured()) {
      await put(pathname, body, {
        access: "private",
        contentType: "application/json",
        addRandomSuffix: false,
        allowOverwrite: true,
        cacheControlMaxAge: 60,
        ...(etag ? { ifMatch: etag } : {}),
      });
      return;
    }
    if (!storageAvailable()) throw new Error("Opslag is niet ingesteld (BLOB_READ_WRITE_TOKEN).");
    await mkdir(dirname(localFile), { recursive: true });
    await writeFile(localFile, body);
  }

  return {
    async read() {
      return (await readRaw()).data;
    },
    async update(mutate) {
      for (let attempt = 0; ; attempt++) {
        const { data, etag } = await readRaw();
        const next = mutate(data);
        try {
          await writeRaw(next, etag);
          return next;
        } catch (e) {
          if (attempt < 4 && e instanceof BlobPreconditionFailedError) continue;
          throw e;
        }
      }
    },
  };
}
