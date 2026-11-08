"use server";
import { revalidatePath } from "next/cache";
import { getSession } from "@/lib/admin-session";
import { createUser, deleteUser, findUser, generatePassword, setPassword, USERNAME_RE, type Role } from "@/lib/users";

export interface AccountState {
  error?: string;
  done?: string;
  /** Shown once, right after creating an account or resetting a password. */
  credentials?: { username: string; password: string };
}

async function requireAdmin(): Promise<string | null> {
  const session = await getSession();
  return session?.role === "admin" ? null : "Alleen een beheerder kan accounts beheren. Laad de pagina opnieuw.";
}

export async function createAccount(_prev: AccountState, form: FormData): Promise<AccountState> {
  const denied = await requireAdmin();
  if (denied) return { error: denied };
  const name = String(form.get("name") ?? "").trim().slice(0, 60);
  const username = String(form.get("username") ?? "").trim().toLowerCase();
  const role: Role = form.get("role") === "admin" ? "admin" : "owner";
  if (!name) return { error: "Vul een naam in." };
  if (!USERNAME_RE.test(username)) return { error: "Kies een gebruikersnaam van 3 tot 32 tekens: kleine letters, cijfers, punt, streepje of underscore." };
  const password = generatePassword();
  try {
    await createUser({ username, name, role, password });
  } catch (e) {
    if (e instanceof Error && e.message === "exists") return { error: "Deze gebruikersnaam is al in gebruik." };
    console.error("[admin] create account failed", e);
    return { error: "Het account maken is niet gelukt. Probeer het opnieuw." };
  }
  revalidatePath("/admin/gebruikers");
  return { done: `Account van ${name} is aangemaakt.`, credentials: { username, password } };
}

export async function resetPassword(_prev: AccountState, form: FormData): Promise<AccountState> {
  const denied = await requireAdmin();
  if (denied) return { error: denied };
  const username = String(form.get("username") ?? "");
  try {
    const user = await findUser(username);
    if (!user) return { error: "Dit account bestaat niet meer." };
    const password = generatePassword();
    await setPassword(user.username, password);
    revalidatePath("/admin/gebruikers");
    return { done: `Nieuw wachtwoord voor ${user.name}. Die is nu overal uitgelogd.`, credentials: { username: user.username, password } };
  } catch (e) {
    console.error("[admin] reset password failed", e);
    return { error: "Het wachtwoord opnieuw instellen is niet gelukt. Probeer het opnieuw." };
  }
}

export async function removeAccount(_prev: AccountState, form: FormData): Promise<AccountState> {
  const denied = await requireAdmin();
  if (denied) return { error: denied };
  const username = String(form.get("username") ?? "");
  try {
    await deleteUser(username);
    revalidatePath("/admin/gebruikers");
    return { done: "Account verwijderd." };
  } catch (e) {
    console.error("[admin] delete account failed", e);
    return { error: "Verwijderen is niet gelukt. Probeer het opnieuw." };
  }
}
