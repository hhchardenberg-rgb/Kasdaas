"use client";
import { useEffect } from "react";
import { useDict } from "@/components/providers";

/**
 * Registers the service worker and asks it to store the guide for offline use.
 * Disabled in development unless NEXT_PUBLIC_SW_DEV=1.
 */
export function ServiceWorkerRegister({ warm }: { warm: string[] }) {
  const { locale } = useDict();
  useEffect(() => {
    if (!("serviceWorker" in navigator)) return;
    if (process.env.NODE_ENV !== "production" && process.env.NEXT_PUBLIC_SW_DEV !== "1") return;
    let cancelled = false;
    navigator.serviceWorker
      .register("/sw.js", { scope: "/" })
      .then(() => navigator.serviceWorker.ready)
      .then((reg) => {
        if (cancelled) return;
        reg.active?.postMessage({ type: "locale", locale });
        const send = () => reg.active?.postMessage({ type: "warm", urls: warm });
        // Warm the cache when the browser is idle so it never competes with the page.
        if ("requestIdleCallback" in window) window.requestIdleCallback(send, { timeout: 4000 });
        else setTimeout(send, 2500);
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, [locale, warm]);
  return null;
}
