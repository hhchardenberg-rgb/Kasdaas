"use client";
import { useEffect } from "react";

/** Opens the <details> card targeted by the URL hash (e.g. from search results). */
export function HashOpener() {
  useEffect(() => {
    const open = () => {
      const id = decodeURIComponent(window.location.hash.slice(1));
      if (!id) return;
      const el = document.getElementById(id);
      if (el instanceof HTMLDetailsElement) el.open = true;
      el?.scrollIntoView({ behavior: "smooth", block: "start" });
    };
    open();
    window.addEventListener("hashchange", open);
    return () => window.removeEventListener("hashchange", open);
  }, []);
  return null;
}
