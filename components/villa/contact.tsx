import { Mail, MessageCircle, Phone, Siren } from "lucide-react";
import type { Contact } from "@/lib/types";
import { hasValue, tx, type Locale } from "@/lib/i18n";
import { site } from "@/content/site";
import { dictionaries } from "@/content/ui";
import { mailUrl, telUrl, whatsappUrl } from "@/lib/links";
import { Tx } from "@/components/ui/tx";
import { ActionLink } from "@/components/ui/action-button";

/** Host card with call / WhatsApp / email. Buttons only appear once numbers are filled in. */
export function HostCard({ locale, message }: { locale: Locale; message?: string }) {
  const t = dictionaries[locale];
  const h = site.host;
  const call = telUrl(h.phone);
  const wa = whatsappUrl(h.whatsapp, message ?? tx(site.whatsappGreeting, locale));
  const mail = mailUrl(h.email);
  return (
    <div className="card p-5">
      <p className="eyebrow mb-2">{t.help.host}</p>
      <p className="font-display text-[1.4rem] leading-tight"><Tx value={h.name} locale={locale} /></p>
      <dl className="mt-3 space-y-1.5 text-sm">
        <div className="flex gap-2"><dt className="text-muted">{t.common.call}:</dt><dd><Tx value={h.phone} locale={locale} /></dd></div>
        <div className="flex gap-2"><dt className="text-muted">{t.help.availability}:</dt><dd><Tx value={h.availability} locale={locale} /></dd></div>
      </dl>
      <div className="mt-5 grid grid-cols-2 gap-2">
        {wa && <ActionLink href={wa} icon={MessageCircle} variant="primary" external netLabel={t.common.needsInternet}>{t.common.whatsapp}</ActionLink>}
        {call && <ActionLink href={call} icon={Phone} variant="ghost">{t.common.call}</ActionLink>}
        {mail && <ActionLink href={mail} icon={Mail} variant="ghost" className="col-span-2">{t.help.email}</ActionLink>}
      </div>
    </div>
  );
}

export function ContactList({ contacts, locale }: { contacts: Contact[]; locale: Locale }) {
  const t = dictionaries[locale];
  return (
    <ul className="space-y-2.5">
      {contacts.map((c) => {
        const call = telUrl(c.phone);
        const wa = whatsappUrl(c.whatsapp);
        return (
          <li key={c.id} className={`card flex items-center gap-3 p-4 ${c.primary && hasValue(c.phone) ? "ring-2 ring-danger/20" : ""}`}>
            <span className={`grid h-11 w-11 shrink-0 place-items-center rounded-2xl ${c.primary ? "bg-danger/10 text-danger" : "bg-sand-100 text-ocean-700"}`}>
              {c.primary ? <Siren className="h-5 w-5" aria-hidden /> : <Phone className="h-5 w-5" aria-hidden />}
            </span>
            <div className="min-w-0 flex-1">
              <p className="text-[0.9rem] font-semibold leading-tight">{tx(c.label, locale)}</p>
              <p className="mt-0.5 text-sm text-ink-soft"><Tx value={c.phone} locale={locale} /></p>
              {c.note && <p className="mt-0.5 text-xs text-muted"><Tx value={c.note} locale={locale} /></p>}
            </div>
            <div className="flex shrink-0 gap-1.5">
              {wa && (
                <a href={wa} target="_blank" rel="noopener noreferrer" aria-label={`${t.common.whatsapp} ${tx(c.label, locale)}`} className="grid h-12 w-12 place-items-center rounded-full bg-sand-100 text-ocean-800">
                  <MessageCircle className="h-5 w-5" aria-hidden />
                </a>
              )}
              {call && (
                <a href={call} aria-label={`${t.common.call} ${tx(c.label, locale)}`} className={`grid h-12 w-12 place-items-center rounded-full ${c.primary ? "bg-danger text-white" : "bg-ocean-800 text-white"}`}>
                  <Phone className="h-5 w-5" aria-hidden />
                </a>
              )}
            </div>
          </li>
        );
      })}
    </ul>
  );
}
