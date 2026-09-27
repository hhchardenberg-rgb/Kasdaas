"use client";
import { useEffect } from "react";
import { CalendarDays } from "lucide-react";
import { useDict } from "@/components/providers";
import { fmt } from "@/content/ui";
import { useStore } from "@/lib/client-store";

export interface GuestInfo {
  name?: string;
  arrive?: string;
  depart?: string;
}

const EMPTY: GuestInfo = {};
const DATE = /^\d{4}-\d{2}-\d{2}$/;

/**
 * Personalisation via booking link, e.g.
 *   /?guest=Jermaine&arrive=2026-10-01&depart=2026-10-08
 * Stored on the device so it survives the next visit.
 */
export function useGuest() {
  const [guest, setGuest] = useStore<GuestInfo>("guest", EMPTY);
  useEffect(() => {
    const q = new URLSearchParams(window.location.search);
    const name = q.get("guest")?.trim().slice(0, 40);
    const arrive = q.get("arrive") ?? undefined;
    const depart = q.get("depart") ?? undefined;
    if (!name && !arrive && !depart) return;
    setGuest((prev) => ({
      name: name || prev.name,
      arrive: arrive && DATE.test(arrive) ? arrive : prev.arrive,
      depart: depart && DATE.test(depart) ? depart : prev.depart,
    }));
    // Clean the URL so the name isn't shared accidentally.
    const url = new URL(window.location.href);
    ["guest", "arrive", "depart"].forEach((k) => url.searchParams.delete(k));
    window.history.replaceState(null, "", url.pathname + url.search + url.hash);
  }, [setGuest]);
  return guest;
}

export function WelcomeHeading() {
  const { t } = useDict();
  const guest = useGuest();
  return (
    <h1 className="text-[2.6rem] leading-[1.02] [text-wrap:balance] sm:text-6xl">
      {guest.name ? fmt(t.home.welcomeGuest, { name: guest.name }) : t.home.greeting}
    </h1>
  );
}

export function StayDates() {
  const { t, locale } = useDict();
  const guest = useGuest();
  if (!guest.arrive && !guest.depart) return null;
  const f = (d: string) =>
    new Intl.DateTimeFormat(locale === "nl" ? "nl-NL" : "en-GB", { weekday: "short", day: "numeric", month: "long", timeZone: "UTC" }).format(new Date(d));
  return (
    <div className="grid grid-cols-2 gap-3 border-b border-sand-200 pb-4">
      {guest.arrive && (
        <div>
          <p className="text-[0.68rem] font-bold uppercase tracking-[0.14em] text-muted">{t.home.arrival}</p>
          <p className="mt-1 flex items-center gap-1.5 font-semibold"><CalendarDays className="h-4 w-4 text-ocean-500" aria-hidden />{f(guest.arrive)}</p>
        </div>
      )}
      {guest.depart && (
        <div>
          <p className="text-[0.68rem] font-bold uppercase tracking-[0.14em] text-muted">{t.home.departure}</p>
          <p className="mt-1 flex items-center gap-1.5 font-semibold"><CalendarDays className="h-4 w-4 text-ocean-500" aria-hidden />{f(guest.depart)}</p>
        </div>
      )}
    </div>
  );
}
