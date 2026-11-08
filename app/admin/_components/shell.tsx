import Link from "next/link";
import type { Session } from "@/lib/admin-session";
import { logout } from "../actions";

const NAV = [
  { href: "/admin", label: "Overzicht", id: "home" },
  { href: "/admin/teksten", label: "Teksten", id: "teksten" },
  { href: "/admin/bootlinks", label: "Bootlinks", id: "bootlinks" },
  { href: "/admin/gebruikers", label: "Gebruikers", id: "gebruikers", adminOnly: true },
  { href: "/admin/account", label: "Mijn account", id: "account" },
] as const;

export type NavId = (typeof NAV)[number]["id"];

/** Page frame for the signed-in admin area: header, navigation, sign-out. */
export function AdminShell({
  session,
  active,
  title,
  intro,
  wide,
  children,
}: {
  session: Session;
  active: NavId;
  title: string;
  intro?: string;
  wide?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-dvh">
      <header className="border-b border-sand-300 bg-white/70">
        <div className="mx-auto flex max-w-3xl items-center justify-between gap-3 px-5 py-3">
          <p className="font-display text-xl">Kas Daas <span className="eyebrow ml-1 align-middle">Beheer</span></p>
          <form action={logout} className="flex items-center gap-3">
            <span className="hidden text-sm text-ink-soft min-[420px]:inline">{session.name}</span>
            <button className="h-10 rounded-full bg-sand-100 px-4 text-sm font-semibold">Uitloggen</button>
          </form>
        </div>
        <nav aria-label="Beheer" className="mx-auto flex max-w-3xl gap-1.5 overflow-x-auto px-5 pb-3">
          {NAV.filter((n) => !("adminOnly" in n && n.adminOnly) || session.role === "admin").map((n) => (
            <Link
              key={n.id}
              href={n.href}
              aria-current={n.id === active ? "page" : undefined}
              className={`shrink-0 rounded-full px-4 py-2 text-sm font-semibold ${n.id === active ? "bg-ocean-800 text-white" : "bg-sand-100 text-ink hover:bg-sand-200"}`}
            >
              {n.label}
            </Link>
          ))}
        </nav>
      </header>
      <main className={`mx-auto px-5 py-8 ${wide ? "max-w-3xl" : "max-w-lg"}`}>
        <h1 className="text-3xl">{title}</h1>
        {intro && <p className="mt-2 text-sm leading-relaxed text-ink-soft">{intro}</p>}
        {children}
      </main>
    </div>
  );
}
