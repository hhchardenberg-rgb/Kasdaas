import type { MetadataRoute } from "next";
import { site } from "@/content/site";
import { publicPaths } from "@/lib/routes";

export default function sitemap(): MetadataRoute.Sitemap {
  if (!site.indexable) return [];
  // Public pages only — the boat manual is never included.
  return [...publicPaths("nl"), ...publicPaths("en")].map((p) => ({ url: `${site.url}${p}` }));
}
