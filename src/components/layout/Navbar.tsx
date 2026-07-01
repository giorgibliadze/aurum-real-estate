"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, Phone, X } from "lucide-react";
import { useState } from "react";

import { buildTelLink } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { useI18n } from "@/i18n/context";
import { LanguageSwitcher } from "./LanguageSwitcher";

export function Navbar() {
  const { dict, locale } = useI18n();
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  const links = [
    { label: dict.nav.home, href: `/${locale}` },
    { label: dict.nav.apartments, href: `/${locale}/apartments` },
    { label: dict.nav.buildingSelector, href: `/${locale}/building-selector` },
    { label: dict.nav.about, href: `/${locale}/about` },
    { label: dict.nav.gallery, href: `/${locale}/gallery` },
    { label: dict.nav.contact, href: `/${locale}/contact` },
  ];

  const isActive = (href: string) => pathname === href;

  return (
    <header className="no-print sticky top-0 z-40 flex shrink-0 items-center justify-between border-b border-white/10 bg-black/70 px-5 py-3 backdrop-blur-xl">
      <Link
        href={`/${locale}`}
        className="text-lg font-semibold tracking-[0.1em] text-gold-light"
      >
        AURUM RESIDENCES
      </Link>

      <nav className="hidden items-center gap-7 md:flex">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={cn(
              "text-sm font-medium transition-colors hover:text-gold-light",
              isActive(link.href) ? "text-gold-light" : "text-white/70",
            )}
          >
            {link.label}
          </Link>
        ))}
      </nav>

      <div className="flex items-center gap-3">
        <div className="hidden sm:block">
          <LanguageSwitcher />
        </div>
        <Link
          href={`/${locale}/contact`}
          className="hidden rounded-lg bg-gold px-4 py-2 text-sm font-semibold text-black transition-opacity hover:opacity-90 lg:block"
        >
          {dict.nav.bookVisit}
        </Link>
        <a
          href={buildTelLink()}
          aria-label={dict.contact.callButton}
          className="hidden items-center justify-center rounded-full border border-white/15 p-2.5 text-white/80 transition-colors hover:border-gold/40 hover:text-gold-light sm:flex"
        >
          <Phone className="h-4 w-4" />
        </a>
        <button
          type="button"
          onClick={() => setMobileOpen((v) => !v)}
          aria-label={dict.nav.menu}
          className="rounded-lg p-2 text-white/80 hover:bg-white/10 md:hidden"
        >
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {mobileOpen && (
        <div className="absolute inset-x-0 top-full z-30 flex flex-col gap-1 border-b border-white/10 bg-black/95 px-5 py-3 md:hidden">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className={cn(
                "rounded-lg px-2 py-2 text-sm font-medium hover:bg-white/5",
                isActive(link.href) ? "text-gold-light" : "text-white/80",
              )}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href={`/${locale}/contact`}
            onClick={() => setMobileOpen(false)}
            className="mt-1 rounded-lg bg-gold px-4 py-2 text-center text-sm font-semibold text-black"
          >
            {dict.nav.bookVisit}
          </Link>
          <div className="mt-2 flex items-center gap-2 sm:hidden">
            <LanguageSwitcher />
            <a
              href={buildTelLink()}
              aria-label={dict.contact.callButton}
              className="flex items-center justify-center rounded-full border border-white/15 p-2.5 text-white/80 hover:border-gold/40 hover:text-gold-light"
            >
              <Phone className="h-4 w-4" />
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
