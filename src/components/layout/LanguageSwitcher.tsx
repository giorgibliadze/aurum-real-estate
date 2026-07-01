"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown } from "lucide-react";
import { useState } from "react";

import { cn } from "@/lib/utils";
import { LOCALES, LOCALE_CODES, LOCALE_FLAGS, LOCALE_LABELS } from "@/i18n/config";
import { useI18n } from "@/i18n/context";

function pathWithLocale(pathname: string, nextLocale: string) {
  const segments = pathname.split("/");
  segments[1] = nextLocale;
  return segments.join("/") || "/";
}

export function LanguageSwitcher() {
  const pathname = usePathname();
  const { locale } = useI18n();
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-haspopup="listbox"
        className="flex items-center gap-1.5 rounded-lg border border-white/10 px-2.5 py-1.5 text-sm font-medium text-white/80 transition-colors hover:border-gold/40 hover:text-gold-light"
      >
        <span aria-hidden>{LOCALE_FLAGS[locale]}</span>
        {LOCALE_CODES[locale]}
        <ChevronDown className={cn("h-3.5 w-3.5 transition-transform", open && "rotate-180")} />
      </button>

      {open && (
        <>
          <button
            type="button"
            aria-hidden
            tabIndex={-1}
            className="fixed inset-0 z-30 cursor-default"
            onClick={() => setOpen(false)}
          />
          <ul
            role="listbox"
            className="absolute right-0 z-40 mt-2 w-36 overflow-hidden rounded-xl border border-white/10 bg-black/95 py-1 shadow-2xl backdrop-blur-xl"
          >
            {LOCALES.map((code) => (
              <li key={code}>
                <Link
                  href={pathWithLocale(pathname, code)}
                  onClick={() => setOpen(false)}
                  aria-label={LOCALE_LABELS[code]}
                  className={cn(
                    "flex items-center gap-2 px-3 py-2 text-sm font-medium transition-colors",
                    code === locale
                      ? "bg-gold/15 text-gold-light"
                      : "text-white/70 hover:bg-white/5 hover:text-white",
                  )}
                >
                  <span aria-hidden>{LOCALE_FLAGS[code]}</span>
                  {LOCALE_CODES[code]}
                </Link>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}
