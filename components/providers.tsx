"use client";
import { createContext, useContext } from "react";
import { dictionaries, type Dictionary } from "@/content/ui";
import type { Locale } from "@/lib/i18n";

const Ctx = createContext<{ locale: Locale; t: Dictionary }>({ locale: "en", t: dictionaries.en });

export function LocaleProvider({ locale, children }: { locale: Locale; children: React.ReactNode }) {
  return <Ctx.Provider value={{ locale, t: dictionaries[locale] }}>{children}</Ctx.Provider>;
}

export const useDict = () => useContext(Ctx);
