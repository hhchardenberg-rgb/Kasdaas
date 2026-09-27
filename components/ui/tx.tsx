import { isPlaceholder, tx, type Locale, type Text } from "@/lib/i18n";

/**
 * Renders a content value. Placeholders ("[… INVULLEN]") get a distinct,
 * clearly-unfinished style so missing content is obvious at a glance.
 */
export function Tx({ value, locale, className }: { value: Text | undefined | null; locale: Locale; className?: string }) {
  if (value == null) return null;
  const s = tx(value, locale);
  if (isPlaceholder(value)) return <span className={`placeholder-text ${className ?? ""}`}>{s}</span>;
  return className ? <span className={className}>{s}</span> : <>{s}</>;
}
