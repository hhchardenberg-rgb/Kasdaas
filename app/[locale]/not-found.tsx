"use client";
import Link from "next/link";
import { useDict } from "@/components/providers";

export default function NotFound() {
  const { t, locale } = useDict();
  return (
    <div className="pt-bar grid min-h-[70dvh] place-items-center px-6 text-center">
      <div>
        <p className="eyebrow mb-3">404</p>
        <h1 className="text-3xl">{t.common.notFoundTitle}</h1>
        <p className="mt-3 text-ink-soft">{t.common.notFoundText}</p>
        <Link href={`/${locale}`} className="mt-6 inline-flex min-h-12 items-center rounded-full bg-ocean-800 px-6 font-semibold text-white">
          {t.common.backHome}
        </Link>
      </div>
    </div>
  );
}
