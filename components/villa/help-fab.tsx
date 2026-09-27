"use client";
import Link from "next/link";
import { LifeBuoy } from "lucide-react";
import { useDict } from "@/components/providers";

/** Floating "need help?" button on villa pages. */
export function HelpFab() {
  const { t, locale } = useDict();
  return (
    <Link
      href={`/${locale}/help`}
      className="fixed right-4 z-30 inline-flex h-12 print:hidden items-center gap-2 rounded-full bg-ink px-4 text-sm font-semibold text-white shadow-[var(--shadow-lift)] bottom-[calc(var(--nav-h)+var(--safe-bottom)+0.9rem)]"
    >
      <LifeBuoy className="h-4.5 w-4.5" aria-hidden />
      {t.help.needHelp}
    </Link>
  );
}
