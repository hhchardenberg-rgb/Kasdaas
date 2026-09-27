import type { MetadataRoute } from "next";
import { site } from "@/content/site";

export default function robots(): MetadataRoute.Robots {
  // The private boat manual is never listed here (that would reveal it);
  // it is protected by tokens and noindex headers instead.
  if (!site.indexable) return { rules: [{ userAgent: "*", disallow: "/" }] };
  return {
    rules: [{ userAgent: "*", allow: "/", disallow: ["/admin", "/boat/"] }],
    sitemap: `${site.url}/sitemap.xml`,
  };
}
