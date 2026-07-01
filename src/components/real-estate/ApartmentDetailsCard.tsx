"use client";

import Image from "next/image";
import Link from "next/link";
import {
  Bath,
  BedDouble,
  Building2,
  MessageCircle,
  Scaling,
  SquareArrowOutUpRight,
} from "lucide-react";
import { useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { buildWhatsAppLink } from "@/lib/constants";
import { formatApartmentNumber, formatArea, formatPrice } from "@/lib/format";
import { cn } from "@/lib/utils";
import { useI18n } from "@/i18n/context";
import { STATUS_COLORS, type Apartment } from "@/data/apartments";

interface ApartmentDetailsCardProps {
  apartment: Apartment | null;
}

function StatCell({ icon, value, label }: { icon: React.ReactNode; value: string; label: string }) {
  return (
    <div className="flex flex-col items-center gap-1 rounded-xl border border-white/10 bg-black/20 py-3 text-center">
      <span className="text-gold-light">{icon}</span>
      <span className="text-sm font-semibold text-white">{value}</span>
      <span className="text-[10px] leading-tight text-white/40">{label}</span>
    </div>
  );
}

export function ApartmentDetailsCard({ apartment }: ApartmentDetailsCardProps) {
  const { dict, locale } = useI18n();
  const [detailsOpen, setDetailsOpen] = useState(false);

  if (!apartment) {
    return (
      <div className="flex flex-col items-center justify-center gap-3 rounded-2xl border border-white/10 bg-white/[0.03] p-8 text-center">
        <Building2 className="h-8 w-8 text-gold/60" />
        <p className="text-sm text-white/50">{dict.detailsCard.emptyPrompt}</p>
      </div>
    );
  }

  const statusColor = STATUS_COLORS[apartment.status];
  const whatsAppMessage = `${dict.contact.whatsappDefaultMessage} ${dict.selector.apartmentWord} ${formatApartmentNumber(apartment)} (${dict.apartmentFields.floor} ${apartment.floor}, ${dict.apartmentFields.block} ${apartment.block}).`;

  return (
    <div className="flex flex-col rounded-2xl border border-white/10 bg-white/[0.03] p-5 backdrop-blur-xl">
      <div className="mb-3 flex items-center gap-2 text-xs font-semibold" style={{ color: statusColor }}>
        <span className="h-2 w-2 rounded-full" style={{ backgroundColor: statusColor }} />
        {dict.statuses[apartment.status]}
      </div>

      <h3 className="text-2xl font-semibold text-white">
        {dict.selector.apartmentWord} {formatApartmentNumber(apartment)}
      </h3>
      <p className="mt-1 text-sm text-white/50">
        {dict.apartmentFields.floor} {apartment.floor} • {dict.apartmentFields.block}{" "}
        {apartment.block}
      </p>

      <div className="my-4 rounded-xl border border-gold/20 bg-gold/[0.06] p-4">
        <p className="text-2xl font-semibold text-gold-light">{formatPrice(apartment.price)}</p>
        <p className="mt-0.5 text-xs text-white/40">
          {formatPrice(apartment.pricePerM2)} / {dict.common.areaUnit}
        </p>
      </div>

      <div className="grid grid-cols-4 gap-2">
        <StatCell
          icon={<BedDouble className="h-4 w-4" />}
          value={String(apartment.rooms)}
          label={dict.apartmentFields.rooms}
        />
        <StatCell
          icon={<Bath className="h-4 w-4" />}
          value={String(apartment.bathrooms)}
          label={dict.apartmentFields.bathrooms}
        />
        <StatCell
          icon={<Scaling className="h-4 w-4" />}
          value={formatArea(apartment.area, dict.common.areaUnit)}
          label={dict.apartmentFields.totalArea}
        />
        <StatCell
          icon={<Building2 className="h-4 w-4" />}
          value={formatArea(apartment.balconyArea, dict.common.areaUnit)}
          label={dict.apartmentFields.balconyArea}
        />
      </div>

      <div className="mt-6 flex flex-col gap-2">
        <Link
          href={`/${locale}/apartments/${apartment.id}`}
          className={cn(
            "flex items-center justify-center gap-2 rounded-lg bg-gold px-4 py-2.5 text-sm font-semibold text-black",
            "transition-opacity hover:opacity-90",
          )}
        >
          <SquareArrowOutUpRight className="h-4 w-4" />
          {dict.detailsCard.fullDetails}
        </Link>
        <button
          type="button"
          onClick={() => setDetailsOpen(true)}
          className="rounded-lg border border-white/15 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:border-gold/50 hover:text-gold-light"
        >
          {dict.detailsCard.quickView}
        </button>
        <a
          href={buildWhatsAppLink(whatsAppMessage)}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(
            "flex items-center justify-center gap-2 rounded-lg border border-white/15 px-4 py-2.5",
            "text-sm font-semibold text-white transition-colors hover:border-gold/50 hover:text-gold-light",
          )}
        >
          <MessageCircle className="h-4 w-4" />
          {dict.detailsCard.contact}
        </a>
      </div>

      <Dialog open={detailsOpen} onOpenChange={setDetailsOpen}>
        {detailsOpen && (
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                {dict.selector.apartmentWord} {formatApartmentNumber(apartment)}
              </DialogTitle>
              <DialogDescription>
                {dict.apartmentFields.floor} {apartment.floor} · {dict.apartmentFields.block}{" "}
                {apartment.block} · {apartment.rooms} {dict.apartmentFields.rooms}
              </DialogDescription>
            </DialogHeader>
            <div className="px-6 pb-6">
              <div className="relative mb-4 aspect-[4/3] w-full overflow-hidden rounded-xl border border-stone-200">
                <Image
                  src={apartment.floorPlanImage}
                  alt={`${dict.selector.apartmentWord} ${formatApartmentNumber(apartment)} — ${dict.apartmentDetail.floorPlanTitle}`}
                  fill
                  sizes="(min-width: 640px) 600px, 100vw"
                  className="object-cover"
                />
              </div>
              <div className="grid grid-cols-3 gap-3">
                {apartment.galleryImages.map((src, i) => (
                  <div
                    key={`${src}-${i}`}
                    className="relative aspect-square overflow-hidden rounded-lg border border-stone-200"
                  >
                    <Image
                      src={src}
                      alt={`${dict.selector.apartmentWord} ${formatApartmentNumber(apartment)} ${dict.apartmentDetail.galleryTitle} ${i + 1}`}
                      fill
                      sizes="200px"
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>
          </DialogContent>
        )}
      </Dialog>
    </div>
  );
}
