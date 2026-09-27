"use client";
import { useEffect, useState } from "react";
import { WifiOff, Wifi } from "lucide-react";
import { useDict } from "@/components/providers";
import { useOnline } from "@/lib/use-browser";

export function OfflineIndicator() {
  const { t } = useDict();
  const online = useOnline();
  const [justBack, setJustBack] = useState(false);
  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    const onOnline = () => {
      setJustBack(true);
      timer = setTimeout(() => setJustBack(false), 2500);
    };
    window.addEventListener("online", onOnline);
    return () => {
      window.removeEventListener("online", onOnline);
      clearTimeout(timer);
    };
  }, []);
  useEffect(() => {
    document.documentElement.dataset.offline = online ? "false" : "true";
  }, [online]);
  if (online && !justBack) return null;
  return (
    <div role="status" className="pointer-events-none fixed inset-x-0 top-[calc(var(--safe-top)+3.75rem)] z-30 flex justify-center px-4 animate-fade">
      <span className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold shadow-[var(--shadow-soft)] ${!online ? "bg-ink text-white" : "bg-sage text-white"}`}>
        {!online ? <WifiOff className="h-3.5 w-3.5" aria-hidden /> : <Wifi className="h-3.5 w-3.5" aria-hidden />}
        {!online ? t.common.offline : t.common.backOnline}
      </span>
    </div>
  );
}
