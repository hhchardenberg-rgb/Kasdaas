"use client";
import { Heart } from "lucide-react";
import { useDict } from "@/components/providers";
import { haptic, useFavorites } from "@/lib/client-store";

export function FavoriteButton({ id, className = "", size = "md" }: { id: string; className?: string; size?: "md" | "lg" }) {
  const { t } = useDict();
  const [favs, setFavs] = useFavorites();
  const active = favs.includes(id);
  return (
    <button
      type="button"
      aria-pressed={active}
      aria-label={active ? t.favorites.removeFav : t.favorites.add}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        haptic(active ? 6 : 14);
        setFavs((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [id, ...prev]));
      }}
      className={`grid place-items-center rounded-full transition active:scale-90 ${size === "lg" ? "h-12 w-12" : "h-10 w-10"} ${className}`}
    >
      <Heart
        className={`${size === "lg" ? "h-6 w-6" : "h-5 w-5"} transition ${active ? "fill-coral text-coral" : "text-current"}`}
        strokeWidth={1.8}
        aria-hidden
      />
    </button>
  );
}
