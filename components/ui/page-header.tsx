import type { ArtVariant, ImageRef } from "@/lib/types";
import type { Locale } from "@/lib/i18n";
import { Photo } from "./photo";
import { BackButton } from "./back-button";

/** Editorial page header with a full-bleed image and title overlay. */
export function PageHeader({ title, eyebrow, text, art, image, uid, locale, back = true, children, compact }: {
  title: string; eyebrow?: string; text?: string; art: ArtVariant; image?: ImageRef; uid: string; locale: Locale;
  back?: boolean; children?: React.ReactNode; compact?: boolean;
}) {
  return (
    <header className="relative">
      <Photo image={image} art={art} uid={uid} locale={locale} priority className={compact ? "h-[15rem]" : "h-[19rem]"} hint={!!children}>
        <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/25 to-transparent" />
      </Photo>
      {back && (
        <div className="absolute left-4 top-[calc(var(--safe-top)+4.25rem)]">
          <BackButton />
        </div>
      )}
      <div className="absolute inset-x-0 bottom-0 px-5 pb-6 text-white">
        {eyebrow && <p className="mb-1.5 text-[0.7rem] font-bold uppercase tracking-[0.18em] text-white/80">{eyebrow}</p>}
        <h1 className="text-[2.2rem] leading-[1.04] [text-wrap:balance]">{title}</h1>
        {text && <p className="mt-2 max-w-md text-[0.95rem] leading-relaxed text-white/85">{text}</p>}
      </div>
    </header>
  );
}
