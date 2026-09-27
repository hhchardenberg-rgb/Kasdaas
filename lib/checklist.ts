import { isPlaceholder, tx, type Locale } from "./i18n";
import type { ChecklistItem } from "./types";
import type { ChecklistRow } from "@/components/ui/checklist";

export function toRows(items: ChecklistItem[], locale: Locale): ChecklistRow[] {
  return items.map((i) => ({
    id: i.id,
    label: tx(i.label, locale),
    detail: i.detail ? tx(i.detail, locale) : undefined,
    detailIsPlaceholder: i.detail ? isPlaceholder(i.detail) : false,
  }));
}
