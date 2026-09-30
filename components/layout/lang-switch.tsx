"use client";
import { usePathname, useRouter } from "next/navigation";
import { useDict } from "@/components/providers";
import { LOCALE_COOKIE, localeNames, locales, type Locale } from "@/lib/i18n";
import { haptic } from "@/lib/client-store";
import { replaceCurrent } from "@/lib/nav-history";

export function rememberLocale(locale: Locale) {
  document.cookie = `${LOCALE_COOKIE}=${locale}; path=/; max-age=31536000; samesite=lax`;
  try {
    localStorage.setItem("kd:locale", JSON.stringify(locale));
  } catch {}
  navigator.serviceWorker?.controller?.postMessage({ type: "locale", locale });
}

export function LangSwitch() {
  const { locale, t } = useDict();
  const pathname = usePathname();
  const router = useRouter();
  const go = (next: Locale) => {
    if (next === locale) return;
    haptic();
    rememberLocale(next);
    const rest = pathname.replace(/^\/(nl|en|es)(?=\/|$)/, "");
    replaceCurrent(`/${next}${rest}`);
    router.replace(`/${next}${rest}${window.location.search}${window.location.hash}`);
  };
  return (
    <div role="group" aria-label={t.common.language} className="flex rounded-full bg-sand-200/70 p-0.5 text-[0.72rem] font-bold">
      {locales.map((l) => (
        <button
          key={l}
          type="button"
          onClick={() => go(l)}
          aria-pressed={l === locale}
          lang={l}
          aria-label={localeNames[l]}
          className={`h-9 min-w-10 rounded-full px-2.5 uppercase tracking-wider transition ${l === locale ? "bg-white text-ink shadow-sm" : "text-muted"}`}
        >
          {l}
        </button>
      ))}
    </div>
  );
}
