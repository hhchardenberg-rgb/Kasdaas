import type { MetadataRoute } from "next";
import { site } from "@/content/site";
import { publicPaths } from "@/lib/routes";
import { locales } from "@/lib/i18n";

export default function sitemap(): MetadataRoute.Sitemap {
  if (!site.indexable) return [];
  // Public pages only — the boat manual is never included.
  return locales.flatMap((l) => publicPaths(l)).map((p) => ({ url: `${site.url}${p}` }));
}
