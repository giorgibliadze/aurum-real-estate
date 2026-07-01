"use client";

import Image from "next/image";
import { useMemo, useState } from "react";

import { BuildingSvgOverlay } from "./BuildingSvgOverlay";
import { DetailsPanel } from "./DetailsPanel";
import { FiltersSidebar } from "./FiltersSidebar";
import { FloorPlanSchematic } from "./FloorPlanSchematic";
import {
  BUILDING_IMAGE_MODE_2,
  MODE_2_APARTMENTS,
  MODE_2_APARTMENT_POLYGONS,
  MODE_2_AREA_BOUNDS,
  MODE_2_PRICE_BOUNDS,
} from "./sample-data";
import type { SampleStatus } from "./types";

interface DirectOverlayModeProps {
  locale: string;
}

export function DirectOverlayMode({ locale }: DirectOverlayModeProps) {
  const [selectedFloor, setSelectedFloor] = useState<number | null>(null);
  const [roomsFilter, setRoomsFilter] = useState<number | null>(null);
  const [priceRange, setPriceRange] = useState<[number, number]>(MODE_2_PRICE_BOUNDS);
  const [areaRange, setAreaRange] = useState<[number, number]>(MODE_2_AREA_BOUNDS);
  const [statusFilter, setStatusFilter] = useState<SampleStatus | null>(null);

  const [selectedApartmentId, setSelectedApartmentId] = useState<string | null>(
    MODE_2_APARTMENTS.find((apartment) => apartment.status === "available")?.id ??
      MODE_2_APARTMENTS[0]?.id ??
      null,
  );
  const [hoveredPolygonId, setHoveredPolygonId] = useState<string | null>(null);

  const floors = useMemo(
    () => Array.from(new Set(MODE_2_APARTMENTS.map((a) => a.floor))).sort((a, b) => b - a),
    [],
  );

  const selectedApartment = useMemo(
    () => MODE_2_APARTMENTS.find((a) => a.id === selectedApartmentId) ?? null,
    [selectedApartmentId],
  );

  const apartmentById = useMemo(
    () => new Map(MODE_2_APARTMENTS.map((apartment) => [apartment.id, apartment])),
    [],
  );

  const isDimmed = (a: (typeof MODE_2_APARTMENTS)[number]) => {
    if (selectedFloor !== null && a.floor !== selectedFloor) return true;
    if (roomsFilter !== null) {
      const matches = roomsFilter === 4 ? a.rooms >= 4 : a.rooms === roomsFilter;
      if (!matches) return true;
    }
    if (a.price < priceRange[0] || a.price > priceRange[1]) return true;
    if (a.area < areaRange[0] || a.area > areaRange[1]) return true;
    if (statusFilter !== null && a.status !== statusFilter) return true;
    return false;
  };

  const availableByFloor = (floor: number) =>
    MODE_2_APARTMENTS.filter((a) => a.floor === floor && a.status === "available").length;

  const dimmedPolygonIds = new Set(
    MODE_2_APARTMENT_POLYGONS.flatMap((area) => {
      const apartment = area.apartmentId ? apartmentById.get(area.apartmentId) : undefined;
      return !apartment || isDimmed(apartment) ? [area.id] : [];
    }),
  );

  return (
    <div className="flex flex-col lg:flex-row">
      <aside className="order-2 shrink-0 border-white/10 bg-black/40 p-5 backdrop-blur-xl lg:order-1 lg:h-[calc(100vh-4.5rem)] lg:w-[280px] lg:overflow-y-auto lg:border-r gold-scroll">
        <FiltersSidebar
          floors={floors}
          availableByFloor={availableByFloor}
          selectedFloor={selectedFloor}
          onSelectFloor={setSelectedFloor}
          roomsFilter={roomsFilter}
          onRoomsFilterChange={setRoomsFilter}
          priceRange={priceRange}
          onPriceRangeChange={setPriceRange}
          priceBounds={MODE_2_PRICE_BOUNDS}
          areaRange={areaRange}
          onAreaRangeChange={setAreaRange}
          areaBounds={MODE_2_AREA_BOUNDS}
          statusFilter={statusFilter}
          onStatusFilterChange={setStatusFilter}
        />
      </aside>

      <main className="order-1 flex-1 p-4 lg:order-2 lg:flex lg:h-[calc(100vh-4.5rem)] lg:flex-col lg:overflow-y-auto">
        <div className="relative aspect-[3/2] w-full overflow-hidden rounded-2xl bg-black shadow-2xl ring-1 ring-gold/20">
          <Image
            src={BUILDING_IMAGE_MODE_2}
            alt="Aurum Residences — ბინების პირდაპირი შერჩევა"
            fill
            priority
            sizes="(min-width: 1024px) 65vw, 100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/15 via-transparent to-black/30" />

          <BuildingSvgOverlay
            areas={MODE_2_APARTMENT_POLYGONS}
            dimmedIds={dimmedPolygonIds}
            hoveredId={hoveredPolygonId}
            selectedId={selectedApartmentId}
            onHover={setHoveredPolygonId}
            onSelect={(area) => {
              if (area.apartmentId) setSelectedApartmentId(area.apartmentId);
            }}
          />
        </div>
        <p className="mt-3 text-center text-sm text-white/50">
          გადაატარეთ კურსორი ბინაზე მისი გამოსაკვეთად, დააჭირეთ — დეტალების სანახავად.
        </p>
      </main>

      <aside className="order-3 flex shrink-0 flex-col gap-5 overflow-y-auto border-white/10 bg-black/40 p-5 backdrop-blur-xl gold-scroll lg:h-[calc(100vh-4.5rem)] lg:w-[320px] lg:border-l">
        <DetailsPanel apartment={selectedApartment} locale={locale} />
        <FloorPlanSchematic apartments={MODE_2_APARTMENTS} selectedApartment={selectedApartment} />
      </aside>
    </div>
  );
}
