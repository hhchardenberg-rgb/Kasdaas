"use client";
import { ArrowLeft } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useDict } from "@/components/providers";
import { hasInAppPrevious, parentPath, replaceCurrent } from "@/lib/nav-history";

/**
 * Goes back to the previous page of the guide. When the guest arrived directly
 * (link from WhatsApp, home-screen app, bookmark), it goes to the logical parent
 * page instead of leaving the app.
 */
export function BackButton({ fallback }: { fallback?: string }) {
  const router = useRouter();
  const pathname = usePathname();
  const { t } = useDict();
  return (
    <button
      type="button"
      onClick={() => {
        if (hasInAppPrevious()) router.back();
        else {
          const target = fallback ?? parentPath(pathname);
          replaceCurrent(target);
          router.replace(target);
        }
      }}
      className="glass grid h-11 w-11 place-items-center rounded-full text-ink shadow-[var(--shadow-soft)]"
      aria-label={t.common.back}
    >
      <ArrowLeft className="h-5 w-5" aria-hidden />
    </button>
  );
}
