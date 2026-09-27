"use client";
/**
 * Browser-only values as proper external stores: correct on the server
 * (fallback), correct after hydration, no setState-in-effect.
 */
import { useSyncExternalStore } from "react";

const noSubscribe = () => () => {};

export function useIsClient(): boolean {
  return useSyncExternalStore(noSubscribe, () => true, () => false);
}

function subscribeOnline(cb: () => void) {
  window.addEventListener("online", cb);
  window.addEventListener("offline", cb);
  return () => {
    window.removeEventListener("online", cb);
    window.removeEventListener("offline", cb);
  };
}

export function useOnline(): boolean {
  return useSyncExternalStore(subscribeOnline, () => navigator.onLine, () => true);
}

export function isStandaloneDisplay(): boolean {
  return window.matchMedia("(display-mode: standalone)").matches || (navigator as unknown as { standalone?: boolean }).standalone === true;
}

export function useStandalone(): boolean {
  return useSyncExternalStore(noSubscribe, isStandaloneDisplay, () => false);
}

/** A query-string parameter of the initial URL (static pages can't read it on the server). */
export function useInitialSearchParam(name: string): string | null {
  return useSyncExternalStore(noSubscribe, () => new URLSearchParams(window.location.search).get(name), () => null);
}

export function useOrigin(): string {
  return useSyncExternalStore(noSubscribe, () => window.location.origin, () => "");
}
