"use client";

import Image from "next/image";
import { useState } from "react";

import { cn } from "@/lib/utils";
import { BuildingSvgOverlay } from "./BuildingSvgOverlay";
import { FiltersSidebar } from "./FiltersSidebar";
import { FloorApartmentsModal } from "./FloorApartmentsModal";
import {
  BUILDING_IMAGE_MODE_1,
  MODE_1_APARTMENTS,
  MODE_1_AREA_BOUNDS,
  MODE_1_FLOOR_COUNT,
  MODE_1_FLOOR_POLYGONS,
  MODE_1_PRICE_BOUNDS,
  floorBandY,
} from "./sample-data";
import type { SampleStatus } from "./types";

interface FloorGridModeProps {
  locale: string;
}

export function FloorGridMode({ locale }: FloorGridModeProps) {
  const [hoveredFloorId, setHoveredFloorId] = useState<string | null>(null);
  const [modalFloor, setModalFloor] = useState<number | null>(null);

  const [roomsFilter, setRoomsFilter] = useState<number | null>(null);
  const [priceRange, setPriceRange] = useState<[number, number]>(MODE_1_PRICE_BOUNDS);
  const [areaRange, setAreaRange] = useState<[number, number]>(MODE_1_AREA_BOUNDS);
  const [statusFilter, setStatusFilter] = useState<SampleStatus | null>(null);

  const floors = Array.from({ length: MODE_1_FLOOR_COUNT }, (_, i) => MODE_1_FLOOR_COUNT - i);

  const matchesFilters = (a: (typeof MODE_1_APARTMENTS)[number]) => {
    if (roomsFilter !== null) {
      const matches = roomsFilter === 4 ? a.rooms >= 4 : a.rooms === roomsFilter;
      if (!matches) return false;
    }
    if (a.price < priceRange[0] || a.price > priceRange[1]) return false;
    if (a.area < areaRange[0] || a.area > areaRange[1]) return false;
    if (statusFilter !== null && a.status !== statusFilter) return false;
    return true;
  };

  const availableByFloor = (floor: number) =>
    MODE_1_APARTMENTS.filter(
      (a) => a.floor === floor && a.status === "available" && matchesFilters(a),
    ).length;

  const selectedFloorId = modalFloor !== null ? `floor-${modalFloor}` : null;
  const activeFloor = hoveredFloorId
    ? Number(hoveredFloorId.replace("floor-", ""))
    : modalFloor;
  const lowestFloorPolygon = MODE_1_FLOOR_POLYGONS[MODE_1_FLOOR_POLYGONS.length - 1];
  const modalApartments =
    modalFloor !== null
      ? MODE_1_APARTMENTS.filter((a) => a.floor === modalFloor && matchesFilters(a))
      : [];

  return (
    <div className="flex flex-col lg:flex-row">
      <aside className="order-2 shrink-0 border-white/10 bg-black/40 p-5 backdrop-blur-xl lg:order-1 lg:h-[calc(100vh-4.5rem)] lg:w-[280px] lg:overflow-y-auto lg:border-r gold-scroll">
        <FiltersSidebar
          floors={floors}
          availableByFloor={availableByFloor}
          selectedFloor={modalFloor}
          onSelectFloor={setModalFloor}
          roomsFilter={roomsFilter}
          onRoomsFilterChange={setRoomsFilter}
          priceRange={priceRange}
          onPriceRangeChange={setPriceRange}
          priceBounds={MODE_1_PRICE_BOUNDS}
          areaRange={areaRange}
          onAreaRangeChange={setAreaRange}
          areaBounds={MODE_1_AREA_BOUNDS}
          statusFilter={statusFilter}
          onStatusFilterChange={setStatusFilter}
        />
      </aside>

      <main className="order-1 flex-1 p-4 lg:order-2 lg:h-[calc(100vh-4.5rem)] lg:overflow-y-auto">
        <div className="flex gap-2">
          <div className="relative aspect-[3/2] w-full flex-1 overflow-hidden rounded-2xl bg-black shadow-2xl ring-1 ring-gold/20">
            <Image
              src={BUILDING_IMAGE_MODE_1}
              alt="Aurum Residences — შენობის სართულების სქემა"
              fill
              priority
              sizes="(min-width: 1024px) 70vw, 100vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/35" />

            <svg
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
              className="absolute inset-0 h-full w-full"
              style={{ pointerEvents: "none" }}
              aria-hidden="true"
            >
              {MODE_1_FLOOR_POLYGONS.map((area) => (
                <line
                  key={area.id}
                  x1={area.points[0].x}
                  x2={area.points[1].x}
                  y1={area.points[0].y}
                  y2={area.points[1].y}
                  stroke="rgba(255,255,255,0.38)"
                  strokeWidth={0.12}
                  vectorEffect="non-scaling-stroke"
                />
              ))}
              <line
                x1={lowestFloorPolygon.points[3].x}
                x2={lowestFloorPolygon.points[2].x}
                y1={lowestFloorPolygon.points[3].y}
                y2={lowestFloorPolygon.points[2].y}
                stroke="rgba(255,255,255,0.38)"
                strokeWidth={0.12}
                vectorEffect="non-scaling-stroke"
              />
            </svg>
            <BuildingSvgOverlay
              areas={MODE_1_FLOOR_POLYGONS}
              hoveredId={hoveredFloorId}
              selectedId={selectedFloorId}
              onHover={setHoveredFloorId}
              onSelect={(area) => setModalFloor(area.floor)}
            />
          </div>

          <div className="relative hidden w-10 shrink-0 sm:block">
            {floors.map((floor) => {
              const { top, bottom } = floorBandY(floor);
              const centerY = (top + bottom) / 2;
              const isActive = activeFloor === floor;
              return (
                <div
                  key={floor}
                  className={cn(
                    "absolute right-0 flex h-6 w-8 -translate-y-1/2 items-center justify-center rounded-md border text-xs font-semibold transition-colors",
                    isActive
                      ? "border-gold bg-gold text-black"
                      : "border-white/10 bg-black/60 text-white/60",
                  )}
                  style={{ top: `${centerY}%` }}
                >
                  {floor}
                </div>
              );
            })}
          </div>
        </div>

        <p className="mt-3 text-center text-sm text-white/50">
          გადაატარეთ კურსორი სართულზე მისი გამოსაკვეთად, დააჭირეთ — ბინების სანახავად.
        </p>
      </main>

      <FloorApartmentsModal
        floor={modalFloor}
        apartments={modalApartments}
        locale={locale}
        onOpenChange={(open) => {
          if (!open) setModalFloor(null);
        }}
      />
    </div>
  );
}
