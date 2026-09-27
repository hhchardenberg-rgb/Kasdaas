import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    id: "/",
    name: "Kas Daas — Bonaire",
    short_name: "Kas Daas",
    description: "Your guide to Kas Daas & Bonaire · Jouw gids voor Kas Daas & Bonaire",
    start_url: "/?source=pwa",
    scope: "/",
    display: "standalone",
    orientation: "portrait",
    background_color: "#0d3642",
    theme_color: "#fbf8f3",
    categories: ["travel", "lifestyle"],
    icons: [
      { src: "/icons/icon-192.png", sizes: "192x192", type: "image/png", purpose: "any" },
      { src: "/icons/icon-512.png", sizes: "512x512", type: "image/png", purpose: "any" },
      { src: "/icons/icon-maskable-512.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
    ],
    shortcuts: [
      { name: "WiFi", url: "/villa/wifi", icons: [{ src: "/icons/icon-192.png", sizes: "192x192" }] },
      { name: "Discover / Ontdek", url: "/discover", icons: [{ src: "/icons/icon-192.png", sizes: "192x192" }] },
      { name: "Help", url: "/help", icons: [{ src: "/icons/icon-192.png", sizes: "192x192" }] },
    ],
  };
}
