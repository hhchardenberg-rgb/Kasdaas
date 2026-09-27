"use client";
import { useEffect, useState } from "react";
import { Check, Download, Trash2, WifiOff } from "lucide-react";
import { useDict } from "@/components/providers";
import { clearAllLocalData } from "@/lib/client-store";
import { InstallSheet } from "@/components/pwa/install-prompt";
import { useStandalone } from "@/lib/use-browser";

export function AppSettings() {
  const { t } = useDict();
  const installed = useStandalone();
  const [open, setOpen] = useState(false);
  const [cleared, setCleared] = useState(false);
  const [offlineReady, setOfflineReady] = useState<boolean | null>(null);
  useEffect(() => {
    navigator.serviceWorker?.getRegistration().then((r) => setOfflineReady(!!r?.active)).catch(() => setOfflineReady(false));
  }, []);
  const row = "card flex min-h-16 w-full items-center gap-4 px-4 py-3 text-left";
  return (
    <div className="space-y-2.5">
      <button type="button" className={row} onClick={() => setOpen(true)} disabled={installed}>
        <span className="grid h-10 w-10 place-items-center rounded-xl bg-ocean-100 text-ocean-800"><Download className="h-5 w-5" aria-hidden /></span>
        <span className="flex-1 font-semibold">{installed ? t.more.installed : t.more.install}</span>
        {installed && <Check className="h-5 w-5 text-sage" aria-hidden />}
      </button>
      <div className={row}>
        <span className="grid h-10 w-10 place-items-center rounded-xl bg-sand-100 text-ocean-700"><WifiOff className="h-5 w-5" aria-hidden /></span>
        <span className="flex-1 text-sm font-semibold">{offlineReady ? t.more.offlineReady : t.more.offlineNotReady}</span>
        {offlineReady && <Check className="h-5 w-5 text-sage" aria-hidden />}
      </div>
      <button
        type="button"
        className={row}
        onClick={() => {
          clearAllLocalData();
          setCleared(true);
        }}
      >
        <span className="grid h-10 w-10 place-items-center rounded-xl bg-sand-100 text-ink-soft"><Trash2 className="h-5 w-5" aria-hidden /></span>
        <span className="flex-1">
          <span className="block text-sm font-semibold">{cleared ? t.more.cleared : t.more.clearData}</span>
          <span className="block text-xs text-muted">{t.more.clearDataText}</span>
        </span>
      </button>
      <InstallSheet open={open} onClose={() => setOpen(false)} />
    </div>
  );
}
