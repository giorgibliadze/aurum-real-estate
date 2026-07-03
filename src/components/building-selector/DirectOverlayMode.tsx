"use client";

import Image from "next/image";
import { useMemo, useState } from "react";

import { DIRECT_SELECTION_PATHS } from "./direct-selection-paths";
import { DirectPathOverlay } from "./DirectPathOverlay";
import { DetailsPanel } from "./DetailsPanel";
import { FiltersSidebar } from "./FiltersSidebar";
import { FloorPlanSchematic } from "./FloorPlanSchematic";
import {
  BUILDING_IMAGE_MODE_2,
  BUILDING_SELECTOR_TOTAL_FLOORS,
  MODE_2_APARTMENTS,
  MODE_2_AREA_BOUNDS,
  MODE_2_PRICE_BOUNDS,
  MODE_2_VIEW_BOX,
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
  const [hoveredPathId, setHoveredPathId] = useState<string | null>(null);

  const floors = useMemo(
    () =>
      Array.from(
        { length: BUILDING_SELECTOR_TOTAL_FLOORS },
        (_, i) => BUILDING_SELECTOR_TOTAL_FLOORS - i,
      ),
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
  const hasFloorData = (floor: number) => MODE_2_APARTMENTS.some((a) => a.floor === floor);

  const dimmedPathIds = new Set(
    DIRECT_SELECTION_PATHS.flatMap((path) => {
      const apartment = apartmentById.get(path.apartmentId);
      return !apartment || isDimmed(apartment) ? [path.id] : [];
    }),
  );

  return (
    <div className="flex flex-col lg:flex-row">
      <aside className="order-2 shrink-0 border-white/10 bg-black/40 p-5 backdrop-blur-xl lg:order-1 lg:h-[calc(100vh-4.5rem)] lg:w-[280px] lg:overflow-y-auto lg:border-r gold-scroll">
        <FiltersSidebar
          floors={floors}
          availableByFloor={availableByFloor}
          hasFloorData={hasFloorData}
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

      <main className="order-1 flex-1 p-4 sm:p-5 lg:order-2 lg:flex lg:h-[calc(100vh-4.5rem)] lg:flex-col lg:justify-center lg:overflow-y-auto">
        <div className="mx-auto flex w-full max-w-[1180px] flex-col items-center">
          <div className="relative aspect-[210.77728/143.84155] w-full overflow-hidden rounded-[22px] border border-gold/25 bg-[linear-gradient(145deg,#0B0B0B_0%,#111111_48%,#151515_100%)] shadow-[0_30px_90px_rgba(0,0,0,0.62),0_0_0_1px_rgba(255,255,255,0.04)_inset,0_0_48px_rgba(212,175,55,0.1)_inset] transition duration-300 hover:border-gold/45 hover:shadow-[0_34px_105px_rgba(0,0,0,0.72),0_0_0_1px_rgba(255,255,255,0.05)_inset,0_0_64px_rgba(212,175,55,0.14)_inset]">
            <div className="absolute inset-0 flex items-center justify-center">
              <Image
                src={BUILDING_IMAGE_MODE_2}
                alt="Aurum Residences — ბინების პირდაპირი შერჩევა"
                fill
                priority
                unoptimized={BUILDING_IMAGE_MODE_2.endsWith(".svg")}
                sizes="(min-width: 1024px) 65vw, 100vw"
                className="h-full max-h-full w-full max-w-full object-contain"
              />

              <DirectPathOverlay
                paths={DIRECT_SELECTION_PATHS}
                apartmentById={apartmentById}
                viewBox={MODE_2_VIEW_BOX}
                dimmedIds={dimmedPathIds}
                hoveredId={hoveredPathId}
                selectedApartmentId={selectedApartmentId}
                onHover={setHoveredPathId}
                onSelect={setSelectedApartmentId}
              />
            </div>
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_48%,rgba(243,223,161,0.13),transparent_42%),linear-gradient(to_bottom,rgba(0,0,0,0.08),transparent_42%,rgba(0,0,0,0.18))]" />
          </div>
          <p className="mt-3 text-center text-sm text-white/50">
            გადაატარეთ კურსორი ბინაზე მისი გამოსაკვეთად, დააჭირეთ — დეტალების სანახავად.
          </p>
        </div>
      </main>

      <aside className="order-3 flex shrink-0 flex-col gap-5 overflow-y-auto border-white/10 bg-black/40 p-5 backdrop-blur-xl gold-scroll lg:h-[calc(100vh-4.5rem)] lg:w-[320px] lg:border-l">
        <DetailsPanel apartment={selectedApartment} locale={locale} />
        <FloorPlanSchematic apartments={MODE_2_APARTMENTS} selectedApartment={selectedApartment} />
      </aside>
    </div>
  );
}
