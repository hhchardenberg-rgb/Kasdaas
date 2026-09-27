import Link from "next/link";
import { ChevronRight } from "lucide-react";

export function SectionHeader({ eyebrow, title, text, href, linkLabel, as: H = "h2" }: {
  eyebrow?: string; title: string; text?: string; href?: string; linkLabel?: string; as?: "h1" | "h2" | "h3";
}) {
  return (
    <div className="mb-4 flex items-end justify-between gap-4">
      <div className="min-w-0">
        {eyebrow && <p className="eyebrow mb-1.5">{eyebrow}</p>}
        <H className={H === "h1" ? "text-[2.1rem] leading-[1.05]" : "text-[1.55rem] leading-tight"}>{title}</H>
        {text && <p className="mt-1.5 text-[0.95rem] leading-relaxed text-ink-soft">{text}</p>}
      </div>
      {href && linkLabel && (
        <Link href={href} className="mb-0.5 inline-flex shrink-0 items-center gap-0.5 rounded-full py-2 pl-3 text-sm font-semibold text-ocean-700">
          {linkLabel}
          <ChevronRight className="h-4 w-4" aria-hidden />
        </Link>
      )}
    </div>
  );
}
