"use client";

import { CalendarCheck, Download, MessageCircle } from "lucide-react";

import { buildWhatsAppLink } from "@/lib/constants";
import { formatApartmentNumber } from "@/lib/format";
import { useI18n } from "@/i18n/context";
import type { Apartment } from "@/data/apartments";

interface ApartmentDetailCTAsProps {
  apartment: Apartment;
}

export function ApartmentDetailCTAs({ apartment }: ApartmentDetailCTAsProps) {
  const { dict } = useI18n();

  const number = formatApartmentNumber(apartment);
  const contactMessage = `${dict.contact.whatsappDefaultMessage} ${dict.selector.apartmentWord} ${number}.`;
  const bookVisitMessage = `${dict.apartmentDetail.ctaBookVisit}: ${dict.selector.apartmentWord} ${number} (${dict.apartmentFields.floor} ${apartment.floor}, ${dict.apartmentFields.block} ${apartment.block}).`;

  return (
    <div className="no-print flex flex-col gap-2.5">
      <a
        href={buildWhatsAppLink(contactMessage)}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center gap-2 rounded-lg bg-gold px-4 py-3 text-sm font-semibold text-black transition-opacity hover:opacity-90"
      >
        <MessageCircle className="h-4 w-4" />
        {dict.apartmentDetail.ctaContact}
      </a>
      <a
        href={buildWhatsAppLink(bookVisitMessage)}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center gap-2 rounded-lg border border-white/15 px-4 py-3 text-sm font-semibold text-white transition-colors hover:border-gold/50 hover:text-gold-light"
      >
        <CalendarCheck className="h-4 w-4" />
        {dict.apartmentDetail.ctaBookVisit}
      </a>
      <button
        type="button"
        onClick={() => window.print()}
        className="flex items-center justify-center gap-2 rounded-lg border border-white/15 px-4 py-3 text-sm font-semibold text-white transition-colors hover:border-gold/50 hover:text-gold-light"
      >
        <Download className="h-4 w-4" />
        {dict.apartmentDetail.ctaDownloadPdf}
      </button>
    </div>
  );
}
