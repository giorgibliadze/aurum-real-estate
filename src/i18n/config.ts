import type { ka } from "./locales/ka";

export type Dictionary = typeof ka;

export const LOCALES = ["ka", "en", "ru"] as const;
export type Locale = (typeof LOCALES)[number];
export const DEFAULT_LOCALE: Locale = "ka";

/** Language names are shown in their own language, not translated. */
export const LOCALE_LABELS: Record<Locale, string> = {
  ka: "ქართული",
  en: "English",
  ru: "Русский",
};

/** Short codes + flags shown in the navbar switcher (compact form of LOCALE_LABELS). */
export const LOCALE_CODES: Record<Locale, string> = {
  ka: "KA",
  en: "EN",
  ru: "RU",
};

export const LOCALE_FLAGS: Record<Locale, string> = {
  ka: "🇬🇪",
  en: "🇬🇧",
  ru: "🇷🇺",
};

export function isLocale(value: string): value is Locale {
  return (LOCALES as readonly string[]).includes(value);
}
