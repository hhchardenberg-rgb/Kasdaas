"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Compass, House, LayoutGrid, Sailboat, Sofa } from "lucide-react";
import { useDict } from "@/components/providers";

export function BottomNav() {
  const { locale, t } = useDict();
  const pathname = usePathname();
  const base = `/${locale}`;
  const items = [
    { href: base, label: t.nav.home, Icon: House, match: (p: string) => p === base },
    { href: `${base}/villa`, label: t.nav.villa, Icon: Sofa, match: (p: string) => p.startsWith(`${base}/villa`) || p.startsWith(`${base}/help`) },
    { href: `${base}/discover`, label: t.nav.discover, Icon: Compass, match: (p: string) => /^\/\w\w\/(discover|places|plans|map)/.test(p) },
    { href: `${base}/boat`, label: t.nav.boat, Icon: Sailboat, match: (p: string) => p.startsWith(`${base}/boat`) },
    { href: `${base}/more`, label: t.nav.more, Icon: LayoutGrid, match: (p: string) => /^\/\w\w\/(more|favorites|good-to-know|search)/.test(p) },
  ];
  return (
    <nav aria-label="Main" className="print:hidden glass fixed inset-x-0 bottom-0 z-40 border-t border-sand-200/80 pb-[var(--safe-bottom)]">
      <ul className="mx-auto grid h-[var(--nav-h)] max-w-3xl grid-cols-5">
        {items.map(({ href, label, Icon, match }) => {
          const active = match(pathname);
          return (
            <li key={href}>
              <Link
                href={href}
                aria-current={active ? "page" : undefined}
                className={`flex h-full flex-col items-center justify-center gap-1 text-[0.68rem] font-semibold tracking-wide transition-colors ${active ? "text-ocean-800" : "text-muted"}`}
              >
                <span className={`grid h-8 w-12 place-items-center rounded-full transition-colors ${active ? "bg-ocean-100" : ""}`}>
                  <Icon className="h-[1.3rem] w-[1.3rem]" strokeWidth={active ? 2 : 1.6} aria-hidden />
                </span>
                {label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
