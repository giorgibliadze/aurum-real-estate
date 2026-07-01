import type { Dictionary, Locale } from "./config";

const dictionaries: Record<Locale, () => Promise<Dictionary>> = {
  ka: () => import("./locales/ka").then((m) => m.ka),
  en: () => import("./locales/en").then((m) => m.en),
  ru: () => import("./locales/ru").then((m) => m.ru),
};

export function getDictionary(locale: Locale): Promise<Dictionary> {
  return dictionaries[locale]();
}
