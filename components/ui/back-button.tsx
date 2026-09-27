"use client";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { useDict } from "@/components/providers";

export function BackButton({ fallback }: { fallback?: string }) {
  const router = useRouter();
  const { t, locale } = useDict();
  return (
    <button
      type="button"
      onClick={() => {
        if (window.history.length > 1) router.back();
        else router.push(fallback ?? `/${locale}`);
      }}
      className="glass grid h-11 w-11 place-items-center rounded-full text-ink shadow-[var(--shadow-soft)]"
      aria-label={t.common.back}
    >
      <ArrowLeft className="h-5 w-5" aria-hidden />
    </button>
  );
}
