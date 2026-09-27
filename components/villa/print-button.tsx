"use client";
import { Printer } from "lucide-react";

export function PrintButton({ label }: { label: string }) {
  return (
    <button type="button" onClick={() => window.print()} className="inline-flex min-h-12 items-center gap-2 rounded-full bg-ocean-800 px-6 font-semibold text-white print:hidden">
      <Printer className="h-4 w-4" aria-hidden /> {label}
    </button>
  );
}
