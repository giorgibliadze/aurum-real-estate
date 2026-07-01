import Link from "next/link";

import { CONTACT_EMAIL, CONTACT_PHONE } from "@/lib/constants";
import type { Dictionary, Locale } from "@/i18n/config";

interface FooterProps {
  dict: Dictionary;
  locale: Locale;
}

export function Footer({ dict, locale }: FooterProps) {
  const links = [
    { label: dict.nav.home, href: `/${locale}` },
    { label: dict.nav.apartments, href: `/${locale}/apartments` },
    { label: dict.nav.about, href: `/${locale}/about` },
    { label: dict.nav.gallery, href: `/${locale}/gallery` },
    { label: dict.nav.contact, href: `/${locale}/contact` },
  ];

  return (
    <footer className="no-print shrink-0 border-t border-white/10 bg-black/60 px-6 py-10">
      <div className="mx-auto grid max-w-6xl gap-8 sm:grid-cols-3">
        <div>
          <p className="text-lg font-semibold tracking-[0.1em] text-gold-light">
            AURUM RESIDENCES
          </p>
          <p className="mt-3 max-w-xs text-sm text-white/50">{dict.footer.tagline}</p>
        </div>

        <div>
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.15em] text-white/40">
            {dict.footer.quickLinks}
          </p>
          <ul className="flex flex-col gap-2">
            {links.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-sm text-white/70 transition-colors hover:text-gold-light"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.15em] text-white/40">
            {dict.footer.contactTitle}
          </p>
          <p className="text-sm text-white/70">{CONTACT_PHONE}</p>
          <p className="mt-1 text-sm text-white/70">{CONTACT_EMAIL}</p>
        </div>
      </div>

      <p className="mx-auto mt-8 max-w-6xl border-t border-white/5 pt-6 text-xs text-white/30">
        © {new Date().getFullYear()} Aurum Residences. {dict.footer.rights}
      </p>
    </footer>
  );
}
