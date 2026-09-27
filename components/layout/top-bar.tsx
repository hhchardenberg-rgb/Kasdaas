"use client";
import Link from "next/link";
import { Search } from "lucide-react";
import { usePathname } from "next/navigation";
import { useDict } from "@/components/providers";
import { LangSwitch } from "./lang-switch";

export function TopBar() {
  const { locale, t } = useDict();
  const pathname = usePathname();
  if (pathname.endsWith("/welcome")) return null;
  return (
    <div className="glass fixed inset-x-0 top-0 z-40 pt-safe print:hidden shadow-[0_1px_0_rgb(28_38_41/0.06)]">
      <div className="mx-auto flex h-14 max-w-3xl items-center justify-between gap-3 px-4">
        <Link href={`/${locale}`} className="flex items-baseline gap-2 py-2" aria-label="Kas Daas — home">
          <span className="font-display text-[1.35rem] font-medium tracking-tight text-ink">Kas Daas</span>
          <span className="hidden text-[0.62rem] font-bold uppercase tracking-[0.2em] text-muted min-[380px]:inline">Bonaire</span>
        </Link>
        <div className="flex items-center gap-2">
          <Link
            href={`/${locale}/search`}
            className="grid h-10 w-10 place-items-center rounded-full text-ink hover:bg-sand-200/70"
            aria-label={t.common.search}
          >
            <Search className="h-5 w-5" strokeWidth={1.8} aria-hidden />
          </Link>
          <LangSwitch />
        </div>
      </div>
    </div>
  );
}
