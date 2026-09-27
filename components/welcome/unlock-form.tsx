"use client";
import { useActionState, useState } from "react";
import { Eye, EyeOff, Lock } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useDict } from "@/components/providers";
import { unlockGuide, type UnlockState } from "@/app/[locale]/welcome/actions";

export function UnlockForm({ whatsapp }: { whatsapp?: string }) {
  const { t, locale } = useDict();
  const params = useSearchParams();
  const [state, action, pending] = useActionState<UnlockState, FormData>(unlockGuide, {});
  const [show, setShow] = useState(false);
  // Controlled on purpose: React resets uncontrolled form fields after an action,
  // which could wipe what the guest is typing right after an error.
  const [password, setPassword] = useState("");
  return (
    <form action={action} className="space-y-3">
      <input type="hidden" name="locale" value={locale} />
      <input type="hidden" name="next" value={params.get("next") ?? ""} />
      <label className="relative block">
        <span className="sr-only">{t.welcome.password}</span>
        <Lock className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted" aria-hidden />
        <input
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type={show ? "text" : "password"}
          required
          autoComplete="current-password"
          autoCapitalize="none"
          autoCorrect="off"
          spellCheck={false}
          placeholder={t.welcome.password}
          aria-invalid={!!state.error}
          className="h-14 w-full rounded-full bg-white pl-12 pr-14 text-base text-ink shadow-[var(--shadow-soft)] outline-none placeholder:text-muted focus:ring-2 focus:ring-ocean-500/40"
        />
        <button type="button" onClick={() => setShow(!show)} aria-label={t.welcome.show} aria-pressed={show} className="absolute right-2 top-1/2 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full text-muted">
          {show ? <EyeOff className="h-5 w-5" aria-hidden /> : <Eye className="h-5 w-5" aria-hidden />}
        </button>
      </label>
      {state.error && (
        <p role="alert" className="rounded-2xl bg-coral-soft px-4 py-2.5 text-sm font-semibold text-coral">
          {state.error === "tooMany" ? t.welcome.tooMany : t.welcome.wrong}
        </p>
      )}
      <button disabled={pending} className="h-14 w-full rounded-full bg-ocean-800 text-base font-semibold text-white shadow-[var(--shadow-soft)] disabled:opacity-60">
        {t.welcome.submit}
      </button>
      <p className="pt-1 text-center text-xs text-white/80">{t.welcome.remember}</p>
      {whatsapp && (
        <p className="text-center">
          <a href={whatsapp} target="_blank" rel="noopener noreferrer" className="text-xs font-semibold text-white underline underline-offset-4">
            {t.welcome.forgot}
          </a>
        </p>
      )}
    </form>
  );
}
