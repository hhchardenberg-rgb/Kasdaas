"use client";
import { useEffect, useState, useSyncExternalStore } from "react";
import { isStandaloneDisplay } from "@/lib/use-browser";

// Decided once per page load: installed app, first open in this session.
let decision: boolean | null = null;
function shouldShow(): boolean {
  if (decision === null) {
    try {
      decision = isStandaloneDisplay() && !sessionStorage.getItem("kd:splash");
      sessionStorage.setItem("kd:splash", "1");
    } catch {
      decision = false;
    }
  }
  return decision;
}
const noSubscribe = () => () => {};

/** Brief branded start screen when the installed app is opened (once per session). */
export function Splash() {
  const show = useSyncExternalStore(noSubscribe, shouldShow, () => false);
  const [phase, setPhase] = useState<"in" | "out" | "gone">("in");
  useEffect(() => {
    if (!show) return;
    const a = setTimeout(() => setPhase("out"), 900);
    const b = setTimeout(() => setPhase("gone"), 1400);
    return () => {
      clearTimeout(a);
      clearTimeout(b);
    };
  }, [show]);
  if (!show || phase === "gone") return null;
  return (
    <div
      aria-hidden
      className={`fixed inset-0 z-[60] grid place-items-center bg-ocean-900 transition-opacity duration-500 ${phase === "out" ? "opacity-0" : "opacity-100"}`}
    >
      <div className="text-center text-sand-50 animate-rise">
        <svg viewBox="0 0 64 64" className="mx-auto mb-5 h-14 w-14" aria-hidden>
          <circle cx="32" cy="28" r="12" fill="#e9c38f" />
          <rect x="6" y="40" width="52" height="2.5" rx="1.25" fill="#fbf8f3" />
          <rect x="16" y="47" width="32" height="2" rx="1" fill="#fbf8f3" opacity="0.6" />
        </svg>
        <p className="font-display text-4xl tracking-tight">Kas Daas</p>
        <p className="mt-2 text-[0.65rem] font-bold uppercase tracking-[0.3em] text-sand-300">Bonaire</p>
      </div>
    </div>
  );
}
