"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Plus, Share, X } from "lucide-react";
import { useDict } from "@/components/providers";
import { readStore, writeStore } from "@/lib/client-store";

type BIPEvent = Event & { prompt: () => Promise<void>; userChoice: Promise<{ outcome: string }> };

let deferred: BIPEvent | null = null;
const subs = new Set<() => void>();
if (typeof window !== "undefined") {
  window.addEventListener("beforeinstallprompt", (e) => {
    e.preventDefault();
    deferred = e as BIPEvent;
    subs.forEach((s) => s());
  });
}

export function isStandalone() {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(display-mode: standalone)").matches || (navigator as unknown as { standalone?: boolean }).standalone === true;
}

export function isIOS() {
  if (typeof navigator === "undefined") return false;
  return /iphone|ipad|ipod/i.test(navigator.userAgent) || (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);
}

/** Try the native install flow; returns false when the browser needs manual steps (iOS). */
export async function triggerInstall(): Promise<boolean> {
  if (!deferred) return false;
  await deferred.prompt();
  await deferred.userChoice.catch(() => null);
  deferred = null;
  return true;
}

export function InstallSheet({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { t } = useDict();
  const [canPrompt, setCanPrompt] = useState(false);
  useEffect(() => {
    const u = () => setCanPrompt(!!deferred);
    u();
    subs.add(u);
    return () => void subs.delete(u);
  }, []);
  if (!open) return null;
  const ios = isIOS();
  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-ink/40 animate-fade" onClick={onClose}>
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="install-title"
        className="w-full max-w-lg rounded-t-[2rem] bg-sand-50 px-6 pt-5 pb-[calc(var(--safe-bottom)+1.5rem)] shadow-[var(--shadow-lift)] animate-sheet"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mx-auto mb-4 h-1 w-10 rounded-full bg-sand-300" />
        <div className="flex items-start gap-4">
          <Image src="/icons/icon-192.png" alt="" width={56} height={56} className="h-14 w-14 rounded-2xl shadow-[var(--shadow-soft)]" />
          <div className="min-w-0 flex-1">
            <h2 id="install-title" className="text-xl">{t.install.title}</h2>
            <p className="mt-1 text-sm leading-relaxed text-ink-soft">{t.install.text}</p>
          </div>
          <button type="button" onClick={onClose} className="-mr-2 -mt-1 grid h-10 w-10 place-items-center rounded-full text-muted" aria-label={t.common.close}>
            <X className="h-5 w-5" aria-hidden />
          </button>
        </div>
        {ios && !canPrompt ? (
          <ol className="mt-5 space-y-3">
            <li className="flex items-center gap-3 rounded-2xl bg-white p-3 shadow-[var(--shadow-soft)]">
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-ocean-100 text-ocean-700"><Share className="h-5 w-5" aria-hidden /></span>
              <span className="text-sm"><b>1.</b> {t.install.iosStep1} <span className="block text-xs text-muted">{t.install.iosHint}</span></span>
            </li>
            <li className="flex items-center gap-3 rounded-2xl bg-white p-3 shadow-[var(--shadow-soft)]">
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-ocean-100 text-ocean-700"><Plus className="h-5 w-5" aria-hidden /></span>
              <span className="text-sm"><b>2.</b> {t.install.iosStep2}</span>
            </li>
          </ol>
        ) : (
          <button
            type="button"
            onClick={async () => {
              await triggerInstall();
              onClose();
            }}
            className="mt-5 h-13 w-full rounded-full bg-ocean-800 py-3.5 text-[0.95rem] font-semibold text-white"
          >
            {t.install.button}
          </button>
        )}
        <button type="button" onClick={onClose} className="mt-2 h-12 w-full rounded-full text-sm font-semibold text-muted">
          {t.install.later}
        </button>
      </div>
    </div>
  );
}

/**
 * Shows the install sheet once, from the second visit on, when not yet
 * installed — only on the home screen, never in the middle of a task.
 */
export function InstallPrompt() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const onHome = /^\/(nl|en|es)\/?$/.test(pathname);
  useEffect(() => {
    // Count visits once per browser session.
    try {
      if (sessionStorage.getItem("kd:visit")) return;
      sessionStorage.setItem("kd:visit", "1");
    } catch {}
    writeStore("visits", readStore<number>("visits", 0) + 1);
  }, []);
  useEffect(() => {
    if (!onHome || isStandalone()) return;
    if (readStore<number>("visits", 0) < 2 || readStore<boolean>("installDismissed", false)) return;
    const timer = setTimeout(() => setOpen(true), 6000);
    return () => clearTimeout(timer);
  }, [onHome]);
  return (
    <InstallSheet
      open={open}
      onClose={() => {
        setOpen(false);
        writeStore("installDismissed", true);
      }}
    />
  );
}
