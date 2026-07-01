"use client";

import { MessageCircle } from "lucide-react";

import { buildWhatsAppLink } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { useI18n } from "@/i18n/context";

export function WhatsAppButton() {
  const { dict } = useI18n();

  return (
    <a
      href={buildWhatsAppLink(dict.contact.whatsappDefaultMessage)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={dict.contact.whatsappButton}
      className={cn(
        "no-print fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full",
        "bg-[#25D366] text-white shadow-[0_4px_20px_rgba(37,211,102,0.5)] transition-transform hover:scale-105",
      )}
    >
      <MessageCircle className="h-7 w-7" fill="white" />
    </a>
  );
}
