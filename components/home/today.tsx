"use client";
import { useSyncExternalStore } from "react";

export type Period = "morning" | "afternoon" | "evening" | "night";

/** Current part of the day on Bonaire (UTC−4), regardless of the phone's time zone. */
function bonairePeriod(): Period {
  const h = Number(new Intl.DateTimeFormat("en-GB", { hour: "numeric", hourCycle: "h23", timeZone: "America/Kralendijk" }).format(new Date()));
  if (h >= 5 && h < 12) return "morning";
  if (h >= 12 && h < 17) return "afternoon";
  if (h >= 17 && h < 19) return "evening";
  return "night";
}

function subscribeClock(cb: () => void) {
  const i = setInterval(cb, 5 * 60_000);
  return () => clearInterval(i);
}

/** Shows the slot for the current time of day. Server renders all slots; client picks one. */
export function TodaySwitch({ slots }: { slots: Record<Period, React.ReactNode> }) {
  const period = useSyncExternalStore<Period | null>(subscribeClock, bonairePeriod, () => null);
  if (!period) return <div className="h-[14rem] animate-pulse rounded-[1.5rem] bg-sand-100" aria-hidden />;
  return <div className="animate-fade">{slots[period]}</div>;
}
