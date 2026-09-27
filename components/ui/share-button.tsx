"use client";
import { useState } from "react";
import { Check, Share2 } from "lucide-react";
import { useDict } from "@/components/providers";

export function ShareButton({ title, text, path, className = "" }: { title: string; text?: string; path?: string; className?: string }) {
  const { t } = useDict();
  const [done, setDone] = useState(false);
  const share = async () => {
    const url = path ? new URL(path, window.location.origin).toString() : window.location.href;
    try {
      if (navigator.share) {
        await navigator.share({ title, text, url });
        return;
      }
      await navigator.clipboard.writeText(`${text ? text + " " : ""}${url}`);
      setDone(true);
      setTimeout(() => setDone(false), 1800);
    } catch {}
  };
  return (
    <button type="button" onClick={share} aria-label={t.common.share} className={`grid h-11 w-11 place-items-center rounded-full ${className}`}>
      {done ? <Check className="h-5 w-5" aria-hidden /> : <Share2 className="h-5 w-5" strokeWidth={1.8} aria-hidden />}
    </button>
  );
}
