"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { BedDouble, Layers3, Ruler, SquareArrowOutUpRight, Tag } from "lucide-react";

import {
  AURUM_BUILDING_NAME,
  type AurumApartment,
  aurumApartmentsData,
  aurumFloorFilters,
  aurumStatusColors,
} from "@/data/aurum/apartments";
import { useI18n } from "@/i18n/context";
import { formatArea, formatPrice } from "@/lib/format";
import { cn } from "@/lib/utils";

interface AurumApartmentsListingProps {
  initialFloor: number | null;
}

function apartmentImage(apartment: AurumApartment) {
  return apartment.galleryImages[0] ?? apartment.floorPlanImage;
}

function AurumApartmentCard({
  apartment,
  selectedFloor,
}: {
  apartment: AurumApartment;
  selectedFloor: number | null;
}) {
  const { dict, locale } = useI18n();
  const statusColor = aurumStatusColors[apartment.status];
  const detailsHref =
    selectedFloor === null
      ? `/${locale}/aurum/apartments/${apartment.id}`
      : `/${locale}/aurum/apartments/${apartment.id}?floor=${selectedFloor}`;

  return (
    <Link
      href={detailsHref}
      className="group block overflow-hidden rounded-xl border border-white/10 bg-white/[0.035] shadow-[0_16px_46px_rgba(0,0,0,0.26)] transition-colors hover:border-gold/40"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-black">
        <Image
          src={apartmentImage(apartment)}
          alt={`${dict.selector.apartmentWord} ${apartment.number}`}
          fill
          sizes="(min-width: 1280px) 25vw, (min-width: 768px) 33vw, 100vw"
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <span
          className="absolute left-3 top-3 rounded-full px-2.5 py-1 text-xs font-semibold backdrop-blur-sm"
          style={{ backgroundColor: `${statusColor}33`, color: statusColor }}
        >
          {dict.statuses[apartment.status]}
        </span>
      </div>

      <div className="p-4">
        <div className="mb-4 flex items-start justify-between gap-3">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.14em] text-white/35">
              {dict.selector.apartmentWord}
            </p>
            <h3 className="mt-1 text-xl font-semibold text-white">№{apartment.number}</h3>
          </div>
          <p className="rounded-lg border border-gold/20 bg-gold/[0.08] px-3 py-1.5 text-sm font-semibold text-gold-light">
            {formatPrice(apartment.price)}
          </p>
        </div>

        <dl className="grid grid-cols-2 gap-2 text-sm">
          <div className="flex items-center gap-2 rounded-lg border border-white/10 bg-black/20 px-3 py-2 text-white/65">
            <Layers3 className="h-4 w-4 text-gold-light" />
            <dt className="sr-only">{dict.apartmentFields.floor}</dt>
            <dd>
              {dict.apartmentFields.floor} {apartment.floor}
            </dd>
          </div>
          <div className="flex items-center gap-2 rounded-lg border border-white/10 bg-black/20 px-3 py-2 text-white/65">
            <Ruler className="h-4 w-4 text-gold-light" />
            <dt className="sr-only">{dict.apartmentFields.totalArea}</dt>
            <dd>{formatArea(apartment.area, dict.common.areaUnit)}</dd>
          </div>
          <div className="flex items-center gap-2 rounded-lg border border-white/10 bg-black/20 px-3 py-2 text-white/65">
            <BedDouble className="h-4 w-4 text-gold-light" />
            <dt className="sr-only">{dict.apartmentFields.rooms}</dt>
            <dd>
              {apartment.rooms} {dict.apartmentFields.rooms}
            </dd>
          </div>
          <div className="flex items-center gap-2 rounded-lg border border-white/10 bg-black/20 px-3 py-2 text-white/65">
            <Tag className="h-4 w-4 text-gold-light" />
            <dt className="sr-only">{dict.apartmentFields.price}</dt>
            <dd>{dict.statuses[apartment.status]}</dd>
          </div>
        </dl>

        <div className="mt-4 flex items-center justify-center gap-2 rounded-lg bg-gold px-4 py-2.5 text-sm font-semibold text-black transition-opacity group-hover:opacity-90">
          <SquareArrowOutUpRight className="h-4 w-4" />
          {dict.detailsCard.fullDetails}
        </div>
      </div>
    </Link>
  );
}

export function AurumApartmentsListing({ initialFloor }: AurumApartmentsListingProps) {
  const { dict } = useI18n();
  const [selectedFloor, setSelectedFloor] = useState<number | null>(initialFloor);

  const visibleApartments = useMemo(
    () =>
      selectedFloor === null
        ? aurumApartmentsData
        : aurumApartmentsData.filter((apartment) => apartment.floor === selectedFloor),
    [selectedFloor],
  );

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_50%_0%,rgba(212,175,55,0.08),transparent_34%),linear-gradient(180deg,#090909_0%,#050505_100%)]">
      <section className="border-b border-white/10 px-6 pb-7 pt-8 text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gold-light/80">
          {AURUM_BUILDING_NAME}
        </p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
          {dict.apartmentsPage.title}
        </h1>
        <p className="mx-auto mt-2 max-w-xl text-white/50">{dict.apartmentsPage.subtitle}</p>
      </section>

      <div className="grid gap-5 px-4 py-8 sm:px-6 lg:grid-cols-[260px_minmax(0,1fr)] lg:items-start">
        <aside className="rounded-xl border border-white/10 bg-black/45 p-5 shadow-[0_24px_70px_rgba(0,0,0,0.42)] backdrop-blur-xl lg:sticky lg:top-24">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-xs font-semibold uppercase tracking-[0.18em] text-white/60">
              {dict.selector.floorLabel}
            </h2>
            {selectedFloor !== null && (
              <button
                type="button"
                onClick={() => setSelectedFloor(null)}
                className="text-xs font-medium text-gold-light transition-colors hover:text-gold"
              >
                {dict.selector.showAll}
              </button>
            )}
          </div>

          <div className="flex flex-col gap-2">
            {aurumFloorFilters.map((floor) => {
              const floorApartments = aurumApartmentsData.filter(
                (apartment) => apartment.floor === floor,
              );
              const isActive = selectedFloor === floor;

              return (
                <button
                  key={floor}
                  type="button"
                  aria-pressed={isActive}
                  disabled={floorApartments.length === 0}
                  onClick={() => setSelectedFloor(isActive ? null : floor)}
                  className={cn(
                    "flex w-full items-center justify-between rounded-lg border px-4 py-3 text-sm font-medium shadow-[0_8px_24px_rgba(0,0,0,0.18)] transition-all",
                    floorApartments.length === 0
                      ? "cursor-not-allowed border-white/5 bg-white/[0.015] text-white/25 shadow-none"
                      : isActive
                        ? "border-gold/70 bg-gold/18 text-white shadow-[0_0_22px_rgba(212,175,55,0.14)]"
                        : "border-white/10 bg-white/[0.025] text-white/75 hover:border-gold/35 hover:bg-white/[0.045] hover:text-white",
                  )}
                >
                  {floor}
                  <span className="text-xs text-white/35">{floorApartments.length}</span>
                </button>
              );
            })}
          </div>
        </aside>

        <main className="min-w-0">
          <section
            id="aurum-apartment-list"
            className="scroll-mt-24 rounded-xl border border-white/10 bg-black/35 p-4 shadow-[0_16px_46px_rgba(0,0,0,0.32)] backdrop-blur-xl"
          >
            <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <Layers3 className="h-5 w-5 text-gold-light" />
                <h2 className="text-sm font-semibold text-white">
                  {selectedFloor === null
                    ? dict.apartmentsPage.allTitle
                    : `${dict.apartmentFields.floor} ${selectedFloor}`}
                </h2>
              </div>
              <span className="text-xs font-medium text-white/45">
                {visibleApartments.length} units
              </span>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {visibleApartments.map((apartment) => (
                <AurumApartmentCard
                  key={apartment.id}
                  apartment={apartment}
                  selectedFloor={selectedFloor}
                />
              ))}
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
