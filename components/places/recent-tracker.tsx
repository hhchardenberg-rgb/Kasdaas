"use client";
import { useEffect } from "react";
import { useRecent } from "@/lib/client-store";

export function RecentTracker({ id }: { id: string }) {
  const [, setRecent] = useRecent();
  useEffect(() => {
    setRecent((prev) => [id, ...prev.filter((x) => x !== id)].slice(0, 12));
  }, [id, setRecent]);
  return null;
}
