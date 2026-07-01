"use client";

import Image from "next/image";
import Link from "next/link";

import { formatArea, formatPrice } from "@/lib/format";
import { STATUS_COLORS, STATUS_LABELS, type SampleApartment } from "./types";

interface ApartmentMiniCardProps {
  apartment: SampleApartment;
  locale: string;
}

export function ApartmentMiniCard({ apartment, locale }: ApartmentMiniCardProps) {
  const statusColor = STATUS_COLORS[apartment.status];

  return (
    <Link
      href={`/${locale}/building-selector/${apartment.id}`}
      className="group flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.03] p-3 transition-colors hover:border-gold/40"
    >
      <div className="min-w-0 flex-1">
        <div className="mb-1 flex items-center gap-1.5 text-xs font-medium" style={{ color: statusColor }}>
          <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: statusColor }} />
          {STATUS_LABELS[apartment.status]}
        </div>
        <p className="truncate font-semibold text-white">ბინა #{apartment.number}</p>
        <p className="text-xs text-white/50">ბლოკი {apartment.block}</p>
        <p className="mt-1 text-xs text-white/60">
          {formatArea(apartment.area, "მ²")} · {apartment.rooms} ოთახი
        </p>
        <p className="mt-1 font-semibold text-gold-light">{formatPrice(apartment.price)}</p>
      </div>
      <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-lg border border-white/10">
        <Image
          src={apartment.floorPlanImage}
          alt={`ბინა #${apartment.number} გეგმა`}
          fill
          sizes="64px"
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>
    </Link>
  );
}
