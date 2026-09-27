import Image from "next/image";
import type { ArtVariant, ImageRef } from "@/lib/types";
import type { Locale } from "@/lib/i18n";
import { site } from "@/content/site";
import { dictionaries } from "@/content/ui";
import { SceneArt } from "./scene-art";

/** A photo if one is configured, otherwise an art-directed illustration. */
export function Photo({
  image, art, uid, locale, sizes = "100vw", priority, className = "", hint = false, hintClassName = "right-3 top-3", children,
}: {
  image?: ImageRef;
  art: ArtVariant;
  uid: string;
  locale: Locale;
  sizes?: string;
  priority?: boolean;
  className?: string;
  /** Show a subtle "photo coming soon" caption when no photo is set. */
  hint?: boolean;
  /** Position of the hint (full-bleed headers sit under the fixed top bar). */
  hintClassName?: string;
  children?: React.ReactNode;
}) {
  return (
    <div className={`relative overflow-hidden bg-sand-200 ${className}`}>
      {image ? (
        <Image src={image.src} alt={image.alt[locale]} fill sizes={sizes} priority={priority} className="object-cover" />
      ) : (
        <>
          <SceneArt variant={art} uid={uid} className="absolute inset-0 h-full w-full" />
          {hint && site.showPhotoHints && (
            <span className={`absolute ${hintClassName} z-[1] rounded-full bg-white/70 px-2.5 py-1 text-[0.65rem] font-semibold uppercase tracking-wider text-ink-soft backdrop-blur`}>
              {dictionaries[locale].common.photoSoon}
            </span>
          )}
        </>
      )}
      {children}
    </div>
  );
}
