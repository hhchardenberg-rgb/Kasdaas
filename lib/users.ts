import "server-only";
import { randomBytes, randomInt, scrypt, timingSafeEqual } from "node:crypto";
import { jsonStore } from "@/lib/storage";

/**
 * Admin accounts. `owner` edits texts and boat links; `admin` can also manage accounts.
 * The developer's own login is not stored here: it is the user `admin` with the ADMIN_PASSWORD env variable.
 */
export type Role = "owner" | "admin";

export interface UserRecord {
  username: string;
  name: string;
  role: Role;
  /** scrypt hash, formatted as "s1", salt and hash joined by dollar signs. */
  hash: string;
  /** Changes with every password change; sessions with an older value stop working. */
  pwv: string;
  createdAt: string;
}

interface UsersDoc {
  users: UserRecord[];
}

const store = jsonStore<UsersDoc>(
  "cms-users",
  () => ({ users: [] }),
  (raw) => ({ users: Array.isArray((raw as UsersDoc)?.users) ? (raw as UsersDoc).users : [] }),
);

const scryptAsync = (password: string, salt: Buffer) =>
  new Promise<Buffer>((resolve, reject) => scrypt(password, salt, 64, (e, key) => (e ? reject(e) : resolve(key))));

export async function hashPassword(password: string): Promise<string> {
  const salt = randomBytes(16);
  return ["s1", salt.toString("base64url"), (await scryptAsync(password, salt)).toString("base64url")].join("$");
}

export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  const [version, salt, key] = hash.split("$");
  if (version !== "s1" || !salt || !key) return false;
  const expected = Buffer.from(key, "base64url");
  const actual = await scryptAsync(password, Buffer.from(salt, "base64url"));
  return expected.length === actual.length && timingSafeEqual(expected, actual);
}

const WORDS_A = ["Blauw", "Roze", "Warm", "Zout", "Stil", "Gouden", "Wild", "Helder", "Zacht", "Groen"];
const WORDS_B = ["Flamingo", "Koraal", "Passaat", "Palapa", "Zeester", "Schildpad", "Leguaan", "Cactus", "Zoutpan", "Kajak", "Vuurtoren", "Mangrove", "Lagune", "Rif"];

/** A readable, random password such as "Stil-Flamingo-Cactus-47". */
export function generatePassword(): string {
  const pick = (list: string[]) => list[randomInt(list.length)];
  const b1 = pick(WORDS_B);
  let b2 = pick(WORDS_B);
  while (b2 === b1) b2 = pick(WORDS_B);
  return `${pick(WORDS_A)}-${b1}-${b2}-${randomInt(10, 100)}`;
}

let dummyHash: Promise<string> | undefined;

/** Checks a login. An unknown username costs the same time as a wrong password, so accounts can't be guessed by timing. */
export async function checkLogin(username: string, password: string): Promise<UserRecord | null> {
  const user = await findUser(username);
  const ok = await verifyPassword(password, user?.hash ?? (await (dummyHash ??= hashPassword("not-a-real-account"))));
  return user && ok ? user : null;
}

export const USERNAME_RE = /^[a-z0-9][a-z0-9._-]{2,31}$/;

export async function listUsers(): Promise<UserRecord[]> {
  return (await store.read()).users;
}

export async function findUser(username: string): Promise<UserRecord | undefined> {
  const name = username.trim().toLowerCase();
  return (await store.read()).users.find((u) => u.username === name);
}

export async function createUser(input: { username: string; name: string; role: Role; password: string }): Promise<void> {
  const username = input.username.trim().toLowerCase();
  const hash = await hashPassword(input.password);
  await store.update((doc) => {
    if (username === "admin" || doc.users.some((u) => u.username === username)) throw new Error("exists");
    return {
      users: [...doc.users, { username, name: input.name.trim(), role: input.role, hash, pwv: randomBytes(6).toString("hex"), createdAt: new Date().toISOString() }],
    };
  });
}

export async function setPassword(username: string, password: string): Promise<void> {
  const hash = await hashPassword(password);
  await store.update((doc) => ({
    users: doc.users.map((u) => (u.username === username ? { ...u, hash, pwv: randomBytes(6).toString("hex") } : u)),
  }));
}

export async function deleteUser(username: string): Promise<void> {
  await store.update((doc) => ({ users: doc.users.filter((u) => u.username !== username) }));
}
