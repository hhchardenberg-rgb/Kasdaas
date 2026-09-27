"use client";
import { useState } from "react";
import { Check, Copy } from "lucide-react";
import { useDict } from "@/components/providers";
import { haptic } from "@/lib/client-store";

export function CopyButton({ value, label, className = "" }: { value: string; label?: string; className?: string }) {
  const { t } = useDict();
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(value);
    } catch {
      const ta = document.createElement("textarea");
      ta.value = value;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      ta.remove();
    }
    haptic(12);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };
  return (
    <button
      type="button"
      onClick={copy}
      className={`inline-flex min-h-12 items-center justify-center gap-2 rounded-full px-5 text-[0.9rem] font-semibold transition ${copied ? "bg-sage text-white" : "bg-ocean-800 text-white"} ${className}`}
    >
      {copied ? <Check className="h-4 w-4" aria-hidden /> : <Copy className="h-4 w-4" aria-hidden />}
      <span aria-live="polite">{copied ? t.common.copied : label ?? t.common.copy}</span>
    </button>
  );
}
