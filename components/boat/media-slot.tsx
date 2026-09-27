import { Camera, Video } from "lucide-react";
import type { MediaSlot as Slot } from "@/lib/types";
import { tx, type Locale } from "@/lib/i18n";
import { dictionaries } from "@/content/ui";

export function MediaSlot({ slot, locale }: { slot: Slot; locale: Locale }) {
  const caption = tx(slot.caption, locale);
  if (slot.src) {
    return (
      <figure>
        {slot.kind === "video" ? (
          <video src={slot.src} controls playsInline preload="metadata" className="aspect-video w-full rounded-2xl bg-ink" />
        ) : (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={slot.src} alt={caption} loading="lazy" className="aspect-[4/3] w-full rounded-2xl object-cover" />
        )}
        <figcaption className="mt-1.5 text-xs text-muted">{caption}</figcaption>
      </figure>
    );
  }
  const I = slot.kind === "video" ? Video : Camera;
  return (
    <div className="grid aspect-[16/9] w-full place-items-center rounded-2xl border-2 border-dashed border-sand-300 bg-sand-100 text-center">
      <div className="px-4">
        <I className="mx-auto h-6 w-6 text-sand-400" aria-hidden />
        <p className="mt-1.5 text-xs font-semibold text-muted">{caption}</p>
        <p className="text-[0.65rem] uppercase tracking-wider text-sand-400">{dictionaries[locale].boatGuide.mediaSoon}</p>
      </div>
    </div>
  );
}
