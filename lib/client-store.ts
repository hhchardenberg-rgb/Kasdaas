"use client";
/**
 * Tiny localStorage-backed stores (favourites, recently viewed, checklists,
 * guest name). Everything stays on the guest's device — no accounts.
 */
import { useCallback, useSyncExternalStore } from "react";

const PREFIX = "kd:";
const listeners = new Set<() => void>();
const cache = new Map<string, { raw: string | null; value: unknown }>();

function read<T>(key: string, fallback: T): T {
  let raw: string | null = null;
  try {
    raw = window.localStorage.getItem(PREFIX + key);
  } catch {
    return fallback;
  }
  const hit = cache.get(key);
  if (hit && hit.raw === raw) return hit.value as T;
  let value: T = fallback;
  try {
    value = raw == null ? fallback : (JSON.parse(raw) as T);
  } catch {}
  cache.set(key, { raw, value });
  return value;
}

export function writeStore<T>(key: string, value: T) {
  try {
    if (value === undefined || value === null) window.localStorage.removeItem(PREFIX + key);
    else window.localStorage.setItem(PREFIX + key, JSON.stringify(value));
  } catch {}
  listeners.forEach((l) => l());
}

export function readStore<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  return read(key, fallback);
}

function subscribe(cb: () => void) {
  listeners.add(cb);
  const onStorage = (e: StorageEvent) => e.key?.startsWith(PREFIX) && cb();
  window.addEventListener("storage", onStorage);
  return () => {
    listeners.delete(cb);
    window.removeEventListener("storage", onStorage);
  };
}

export function useStore<T>(key: string, fallback: T): [T, (v: T | ((prev: T) => T)) => void] {
  const value = useSyncExternalStore(subscribe, () => read(key, fallback), () => fallback);
  const set = useCallback(
    (v: T | ((prev: T) => T)) => {
      const next = typeof v === "function" ? (v as (p: T) => T)(read(key, fallback)) : v;
      writeStore(key, next);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [key],
  );
  return [value, set];
}

const EMPTY: string[] = [];
export const useFavorites = () => useStore<string[]>("favorites", EMPTY);
export const useRecent = () => useStore<string[]>("recent", EMPTY);

export function clearAllLocalData() {
  try {
    Object.keys(window.localStorage)
      .filter((k) => k.startsWith(PREFIX))
      .forEach((k) => window.localStorage.removeItem(k));
  } catch {}
  cache.clear();
  listeners.forEach((l) => l());
}

/** Subtle haptic tick on devices that support it (mostly Android). */
export function haptic(ms = 8) {
  try {
    navigator.vibrate?.(ms);
  } catch {}
}
