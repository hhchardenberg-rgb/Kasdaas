"use server";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { endSession, ENV_ADMIN, getSession, isEnvAdminPassword, startSession } from "@/lib/admin-session";
import { checkLogin, findUser, setPassword, verifyPassword } from "@/lib/users";

export interface LoginState {
  error?: string;
}

export interface PasswordState {
  error?: string;
  done?: string;
}

/** Failed attempts per username (and overall), to slow down guessing. */
const attempts = new Map<string, { n: number; until: number }>();
const WINDOW = 60_000;

function locked(key: string): boolean {
  const rec = attempts.get(key);
  return !!rec && rec.until > Date.now();
}

function fail(key: string, limit: number) {
  const rec = attempts.get(key) ?? { n: 0, until: 0 };
  rec.n += 1;
  if (rec.n >= limit) {
    rec.until = Date.now() + WINDOW;
    rec.n = 0;
  }
  attempts.set(key, rec);
}

export async function login(_prev: LoginState, form: FormData): Promise<LoginState> {
  const username = String(form.get("username") ?? "").trim().toLowerCase();
  const password = String(form.get("password") ?? "");
  if (!username || !password) return { error: "Vul je gebruikersnaam en wachtwoord in." };
  if (locked(username) || locked("*")) return { error: "Te veel pogingen. Probeer het over een minuut opnieuw." };

  let pwv: string | null = null;
  if (username === ENV_ADMIN) {
    if (isEnvAdminPassword(password)) pwv = "env";
  } else {
    try {
      const user = await checkLogin(username, password);
      if (user) pwv = user.pwv;
    } catch (e) {
      console.error("[admin] login failed", e);
      return { error: "Inloggen lukt nu niet. Probeer het zo opnieuw." };
    }
  }
  if (!pwv) {
    fail(username, 5);
    fail("*", 30);
    return { error: "Gebruikersnaam of wachtwoord klopt niet." };
  }
  attempts.delete(username);
  await startSession(username, pwv);
  redirect("/admin");
}

export async function logout(): Promise<void> {
  await endSession();
  revalidatePath("/admin");
  redirect("/admin");
}

/** Lets a signed-in person change their own password. */
export async function changePassword(_prev: PasswordState, form: FormData): Promise<PasswordState> {
  const session = await getSession();
  if (!session) return { error: "Je bent uitgelogd. Log opnieuw in." };
  if (session.username === ENV_ADMIN) return { error: "Het wachtwoord van 'admin' wijzig je in de omgevingsvariabele ADMIN_PASSWORD." };
  const current = String(form.get("current") ?? "");
  const next = String(form.get("next") ?? "");
  if (next.length < 10) return { error: "Kies een nieuw wachtwoord van minimaal 10 tekens." };
  if (next !== String(form.get("confirm") ?? "")) return { error: "De twee nieuwe wachtwoorden zijn niet hetzelfde." };
  if (locked(`pw:${session.username}`)) return { error: "Te veel pogingen. Probeer het over een minuut opnieuw." };
  try {
    const user = await findUser(session.username);
    if (!user || !(await verifyPassword(current, user.hash))) {
      fail(`pw:${session.username}`, 5);
      return { error: "Je huidige wachtwoord klopt niet." };
    }
    await setPassword(user.username, next);
    const updated = await findUser(user.username);
    if (updated) await startSession(updated.username, updated.pwv);
    return { done: "Je wachtwoord is gewijzigd." };
  } catch (e) {
    console.error("[admin] password change failed", e);
    return { error: "Opslaan lukt nu niet. Probeer het opnieuw." };
  }
}
