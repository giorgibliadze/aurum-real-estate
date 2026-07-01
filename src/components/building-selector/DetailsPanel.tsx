"use client";

import Link from "next/link";
import { Bath, BedDouble, Building2, MessageCircle, Scaling, SquareArrowOutUpRight } from "lucide-react";

import { formatArea, formatPrice } from "@/lib/format";
import { STATUS_COLORS, STATUS_LABELS, type SampleApartment } from "./types";

interface DetailsPanelProps {
  apartment: SampleApartment | null;
  locale: string;
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

export function DetailsPanel({ apartment, locale }: DetailsPanelProps) {
  if (!apartment) {
    return (
      <div className="flex flex-col items-center justify-center gap-3 rounded-2xl border border-white/10 bg-white/[0.03] p-8 text-center">
        <Building2 className="h-8 w-8 text-gold/60" />
        <p className="text-sm text-white/50">აირჩიეთ ბინა შენობის სქემაზე, დეტალების სანახავად</p>
      </div>
    );
  }

  const statusColor = STATUS_COLORS[apartment.status];
  const whatsAppText = encodeURIComponent(
    `გამარჩობა, დაინტერესებული ვარ ბინით #${apartment.number} (სართული ${apartment.floor}, ბლოკი ${apartment.block}).`,
  );

  return (
    <div className="flex flex-col rounded-2xl border border-white/10 bg-white/[0.03] p-5 backdrop-blur-xl">
      <div className="mb-3 flex items-center gap-2 text-xs font-semibold" style={{ color: statusColor }}>
        <span className="h-2 w-2 rounded-full" style={{ backgroundColor: statusColor }} />
        {STATUS_LABELS[apartment.status]}
      </div>

      <h3 className="text-2xl font-semibold text-white">ბინა #{apartment.number}</h3>
      <p className="mt-1 text-sm text-white/50">
        სართული {apartment.floor} • ბლოკი {apartment.block}
      </p>

      <div className="my-4 rounded-xl border border-gold/20 bg-gold/[0.06] p-4">
        <p className="text-2xl font-semibold text-gold-light">{formatPrice(apartment.price)}</p>
        <p className="mt-0.5 text-xs text-white/40">{formatPrice(apartment.pricePerM2)} / მ²</p>
      </div>

      <div className="grid grid-cols-4 gap-2">
        <StatCell icon={<BedDouble className="h-4 w-4" />} value={String(apartment.rooms)} label="ოთახები" />
        <StatCell icon={<Bath className="h-4 w-4" />} value={String(apartment.bathrooms)} label="სველი წერტილი" />
        <StatCell
          icon={<Scaling className="h-4 w-4" />}
          value={formatArea(apartment.area, "მ²")}
          label="ფართობი"
        />
        <StatCell
          icon={<Building2 className="h-4 w-4" />}
          value={formatArea(apartment.balconyArea, "მ²")}
          label="აივანი"
        />
      </div>

      <div className="mt-6 flex flex-col gap-2">
        <Link
          href={`/${locale}/building-selector/${apartment.id}`}
          className="flex items-center justify-center gap-2 rounded-lg bg-gold px-4 py-2.5 text-sm font-semibold text-black transition-opacity hover:opacity-90"
        >
          <SquareArrowOutUpRight className="h-4 w-4" />
          დეტალურად ნახვა
        </Link>
        <a
          href={`https://wa.me/995500000000?text=${whatsAppText}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 rounded-lg border border-white/15 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:border-gold/50 hover:text-gold-light"
        >
          <MessageCircle className="h-4 w-4" />
          დაგვიკავშირდით
        </a>
      </div>
    </div>
  );
}
