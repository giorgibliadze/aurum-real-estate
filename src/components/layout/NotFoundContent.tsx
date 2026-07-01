"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { DEFAULT_LOCALE, isLocale, type Dictionary } from "@/i18n/config";
import { en } from "@/i18n/locales/en";
import { ka } from "@/i18n/locales/ka";
import { ru } from "@/i18n/locales/ru";

const DICTS: Record<string, Dictionary> = { ka, en, ru };

export function NotFoundContent() {
  const pathname = usePathname();
  const segment = pathname.split("/")[1] ?? "";
  const locale = isLocale(segment) ? segment : DEFAULT_LOCALE;
  const dict = DICTS[locale];

  return (
    <div className="mx-auto flex max-w-lg flex-col items-center px-6 py-24 text-center">
      <p className="text-sm font-semibold uppercase tracking-[0.2em] text-gold-light">404</p>
      <h1 className="mt-3 text-3xl font-semibold tracking-tight text-white">
        {dict.notFound.title}
      </h1>
      <p className="mt-3 text-white/50">{dict.notFound.body}</p>
      <Link
        href={`/${locale}`}
        className="mt-8 rounded-lg bg-gold px-5 py-2.5 text-sm font-semibold text-black transition-opacity hover:opacity-90"
      >
        {dict.nav.home}
      </Link>
    </div>
  );
}
