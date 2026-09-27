"use client";
import { useState } from "react";
import { Check, Copy, Wifi } from "lucide-react";
import { useDict } from "@/components/providers";
import { fmt } from "@/content/ui";
import { haptic } from "@/lib/client-store";
import { usePlatform, type Platform } from "@/lib/use-browser";

async function copy(text: string) {
  try {
    await navigator.clipboard.writeText(text);
  } catch {
    const ta = document.createElement("textarea");
    ta.value = text;
    document.body.appendChild(ta);
    ta.select();
    document.execCommand("copy");
    ta.remove();
  }
}

/**
 * Platform-aware "connect" flow.
 * iPhone: installs a WiFi profile (/wifi.mobileconfig) — the only web route to join a network on iOS.
 * Android: browsers can't join networks, so we copy the password and show the two remaining taps.
 */
export function WifiConnect({ ssid, password }: { ssid: string; password: string }) {
  const { t } = useDict();
  const detected = usePlatform();
  const [override, setOverride] = useState<Platform | null>(null);
  const [copied, setCopied] = useState(false);
  const platform = override ?? detected;

  const steps = (s: string) => fmt(s, { ssid }).split("|");
  const doCopy = async () => {
    await copy(password);
    haptic(12);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const title = platform === "ios" ? t.wifi.iosTitle : platform === "android" ? t.wifi.androidTitle : t.wifi.otherTitle;
  const list = steps(platform === "ios" ? t.wifi.iosSteps : platform === "android" ? t.wifi.androidSteps : t.wifi.otherSteps);

  return (
    <div>
      {platform === "ios" ? (
        <a href="/wifi.mobileconfig" className="flex min-h-14 w-full items-center justify-center gap-2.5 rounded-full bg-sand-50 text-[1rem] font-semibold text-ocean-900">
          <Wifi className="h-5 w-5" aria-hidden /> {t.wifi.connect}
        </a>
      ) : (
        <button type="button" onClick={doCopy} className={`flex min-h-14 w-full items-center justify-center gap-2.5 rounded-full text-[1rem] font-semibold transition ${copied ? "bg-sage text-white" : "bg-sand-50 text-ocean-900"}`}>
          {copied ? <Check className="h-5 w-5" aria-hidden /> : platform === "android" ? <Wifi className="h-5 w-5" aria-hidden /> : <Copy className="h-5 w-5" aria-hidden />}
          <span aria-live="polite">{copied ? t.common.copied : platform === "android" ? t.wifi.connectAndroid : t.wifi.copyPassword}</span>
        </button>
      )}
      {platform === "ios" && (
        <button type="button" onClick={doCopy} className="mt-2 flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-white/10 text-sm font-semibold text-sand-50">
          {copied ? <Check className="h-4 w-4" aria-hidden /> : <Copy className="h-4 w-4" aria-hidden />}
          {copied ? t.common.copied : t.wifi.copyPassword}
        </button>
      )}

      <div className="mt-5 rounded-2xl bg-white/[0.07] p-4">
        <p className="text-sm font-semibold">{title}</p>
        <ol className="mt-2.5 space-y-2 text-[0.88rem] leading-snug text-sand-100/90">
          {list.map((s, i) => (
            <li key={i} className="flex gap-2.5">
              <span className="grid h-5 w-5 shrink-0 place-items-center rounded-full bg-sand-50/15 text-[0.7rem] font-bold">{i + 1}</span>
              <span>{s}</span>
            </li>
          ))}
        </ol>
        {platform === "ios" && <p className="mt-3 text-xs leading-relaxed text-sand-200/70">{t.wifi.iosNote}</p>}
        <div className="mt-3 flex items-center gap-2 text-xs text-sand-200/80">
          <span>{t.wifi.otherPhone}</span>
          {(["ios", "android"] as const)
            .filter((p) => p !== platform)
            .map((p) => (
              <button key={p} type="button" onClick={() => setOverride(p)} className="rounded-full bg-white/10 px-3 py-1.5 font-semibold text-sand-50">
                {p === "ios" ? "iPhone" : "Android"}
              </button>
            ))}
        </div>
      </div>
    </div>
  );
}
