"use client";
import { useEffect, useState } from "react";
import { Siren, X } from "lucide-react";
import { useDict } from "@/components/providers";
import { haptic } from "@/lib/client-store";

/** Always-visible SOS button on the boat manual; opens emergency contacts. */
export function SosButton({ children }: { children: React.ReactNode }) {
  const { t } = useDict();
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);
  return (
    <>
      <button
        type="button"
        onClick={() => {
          haptic(20);
          setOpen(true);
        }}
        className="fixed left-1/2 z-40 inline-flex h-14 -translate-x-1/2 items-center gap-2.5 whitespace-nowrap rounded-full bg-danger px-7 text-base font-bold text-white shadow-[0_10px_30px_-6px_rgb(179_58_46/0.6)] bottom-[calc(var(--nav-h)+var(--safe-bottom)+0.9rem)]"
      >
        <Siren className="h-5 w-5" aria-hidden />
        {t.boatGuide.sos}
      </button>
      {open && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-ink/50 animate-fade" onClick={() => setOpen(false)}>
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="sos-title"
            className="max-h-[90dvh] w-full max-w-lg overflow-y-auto rounded-t-[2rem] bg-sand-50 px-5 pt-5 pb-[calc(var(--safe-bottom)+1.5rem)] animate-sheet"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-4 flex items-start justify-between gap-4">
              <div>
                <h2 id="sos-title" className="text-2xl text-danger">{t.boatGuide.sosTitle}</h2>
                <p className="mt-1 text-sm leading-relaxed text-ink-soft">{t.boatGuide.sosText}</p>
              </div>
              <button type="button" onClick={() => setOpen(false)} className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-sand-100" aria-label={t.common.close}>
                <X className="h-5 w-5" aria-hidden />
              </button>
            </div>
            {children}
          </div>
        </div>
      )}
    </>
  );
}
