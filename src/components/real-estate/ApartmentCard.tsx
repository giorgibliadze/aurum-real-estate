"use client";

import Image from "next/image";
import Link from "next/link";

import { formatApartmentNumber, formatArea, formatPrice } from "@/lib/format";
import { useI18n } from "@/i18n/context";
import { STATUS_COLORS, type Apartment } from "@/data/apartments";

interface ApartmentCardProps {
  apartment: Apartment;
}

export function ApartmentCard({ apartment }: ApartmentCardProps) {
  const { dict, locale } = useI18n();
  const statusColor = STATUS_COLORS[apartment.status];

  return (
    <Link
      href={`/${locale}/apartments/${apartment.id}`}
      className="group flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] transition-colors hover:border-gold/40"
    >
      <div className="relative aspect-[4/3] w-full overflow-hidden">
        <Image
          src={apartment.floorPlanImage}
          alt={`${dict.selector.apartmentWord} №${apartment.number}`}
          fill
          sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <span
          className="absolute left-3 top-3 rounded-full px-2.5 py-1 text-xs font-semibold backdrop-blur-sm"
          style={{ backgroundColor: `${statusColor}33`, color: statusColor }}
        >
          {dict.statuses[apartment.status]}
        </span>
      </div>
      <div className="flex flex-1 flex-col p-4">
        <div className="mb-2 flex items-center justify-between">
          <h3 className="text-lg font-semibold text-white">{formatApartmentNumber(apartment)}</h3>
          <span className="text-xs text-white/40">
            {dict.apartmentFields.floor} {apartment.floor} · {dict.apartmentFields.block}{" "}
            {apartment.block}
          </span>
        </div>
        <p className="text-sm text-white/60">
          {apartment.rooms} {dict.apartmentFields.rooms} ·{" "}
          {formatArea(apartment.area, dict.common.areaUnit)}
        </p>
        <p className="mt-auto pt-3 text-lg font-semibold text-gold-light">
          {formatPrice(apartment.price)}
        </p>
      </div>
    </Link>
  );
}
