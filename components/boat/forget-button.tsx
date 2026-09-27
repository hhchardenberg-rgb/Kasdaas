"use client";
import { useState } from "react";
import { Trash2 } from "lucide-react";
import { useDict } from "@/components/providers";

/** Removes the access cookie and any offline copy of the boat manual from this device. */
export function ForgetBoatButton() {
  const { t, locale } = useDict();
  const [done, setDone] = useState(false);
  return (
    <button
      type="button"
      onClick={async () => {
        await fetch("/boat/forget", { method: "POST" }).catch(() => null);
        navigator.serviceWorker?.controller?.postMessage({ type: "forget-boat" });
        try {
          Object.keys(localStorage).filter((k) => k.startsWith("kd:check:boat-")).forEach((k) => localStorage.removeItem(k));
        } catch {}
        setDone(true);
        setTimeout(() => window.location.replace(`/${locale}/boat`), 700);
      }}
      className="inline-flex min-h-12 items-center gap-2 rounded-full px-4 text-sm font-semibold text-muted hover:bg-sand-100"
    >
      <Trash2 className="h-4 w-4" aria-hidden />
      {done ? t.boatGuide.forgotten : t.boatGuide.forget}
    </button>
  );
}
