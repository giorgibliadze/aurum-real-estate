import type { Metadata } from "next";
import { Mail, Phone } from "lucide-react";

import { ContactButtons } from "@/components/contact/ContactButtons";
import { ContactForm } from "@/components/contact/ContactForm";
import { CONTACT_EMAIL, CONTACT_PHONE } from "@/lib/constants";
import { getDictionary } from "@/i18n/get-dictionary";
import { isLocale, type Locale } from "@/i18n/config";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale: Locale = isLocale(rawLocale) ? rawLocale : "ka";
  const dict = await getDictionary(locale);

  return {
    title: dict.contact.title,
    description: dict.contact.subtitle,
  };
}

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  const locale: Locale = isLocale(rawLocale) ? rawLocale : "ka";
  const dict = await getDictionary(locale);

  return (
    <div className="mx-auto max-w-4xl px-6 py-14">
      <div className="mb-10 text-center">
        <h1 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
          {dict.contact.title}
        </h1>
        <p className="mt-2 text-white/50">{dict.contact.subtitle}</p>
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        <div className="flex flex-col gap-6">
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
            <div className="flex items-center gap-3 border-b border-white/5 pb-4">
              <Phone className="h-5 w-5 text-gold-light" />
              <div>
                <p className="text-xs text-white/40">{dict.contact.phoneLabel}</p>
                <p className="font-medium text-white">{CONTACT_PHONE}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 pt-4">
              <Mail className="h-5 w-5 text-gold-light" />
              <div>
                <p className="text-xs text-white/40">{dict.contact.emailLabel}</p>
                <p className="font-medium text-white">{CONTACT_EMAIL}</p>
              </div>
            </div>
          </div>

          <ContactButtons />
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
          <h2 className="mb-4 text-lg font-semibold text-white">{dict.contact.formTitle}</h2>
          <ContactForm />
        </div>
      </div>
    </div>
  );
}
