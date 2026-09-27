"use client";
import { useDict } from "@/components/providers";
import { useInitialSearchParam } from "@/lib/use-browser";

/** Shown when someone opens an expired/invalid boat link (redirected here with ?link=invalid). */
export function BoatLinkNotice() {
  const { t } = useDict();
  if (useInitialSearchParam("link") !== "invalid") return null;
  return <p role="alert" className="mb-6 rounded-2xl bg-coral-soft p-4 text-sm font-semibold text-coral">{t.boat.linkInvalid}</p>;
}
