"use client";

import { MessageCircle, Phone } from "lucide-react";

import { buildTelLink, buildWhatsAppLink, CONTACT_PHONE } from "@/lib/constants";
import { useI18n } from "@/i18n/context";

interface ContactButtonsProps {
  whatsAppMessage?: string;
}

export function ContactButtons({ whatsAppMessage }: ContactButtonsProps) {
  const { dict } = useI18n();

  return (
    <div className="flex flex-col gap-3 sm:flex-row">
      <a
        href={buildTelLink()}
        className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-gold px-4 py-3 text-sm font-semibold text-black transition-opacity hover:opacity-90"
      >
        <Phone className="h-4 w-4" />
        {dict.contact.callButton} · {CONTACT_PHONE}
      </a>
      <a
        href={buildWhatsAppLink(whatsAppMessage ?? dict.contact.whatsappDefaultMessage)}
        target="_blank"
        rel="noopener noreferrer"
        className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-white/15 px-4 py-3 text-sm font-semibold text-white transition-colors hover:border-gold/50 hover:text-gold-light"
      >
        <MessageCircle className="h-4 w-4" />
        {dict.contact.whatsappButton}
      </a>
    </div>
  );
}
