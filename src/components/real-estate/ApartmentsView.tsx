"use client";

import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";

import { ApartmentCard } from "@/components/real-estate/ApartmentCard";
import { ApartmentDetailsCard } from "@/components/real-estate/ApartmentDetailsCard";
import { ApartmentFilters } from "@/components/real-estate/ApartmentFilters";
import { FloorPlanMiniMap } from "@/components/real-estate/FloorPlanMiniMap";
import { FloorSelector } from "@/components/real-estate/FloorSelector";
import { InteractiveBuilding } from "@/components/real-estate/InteractiveBuilding";
import { ThumbnailCarousel } from "@/components/real-estate/ThumbnailCarousel";
import { useI18n } from "@/i18n/context";
import {
  AREA_BOUNDS,
  APARTMENTS,
  PRICE_BOUNDS,
  type Apartment,
  type ApartmentStatus,
} from "@/data/apartments";
import { BUILDING_IMAGES, DEFAULT_BUILDING_IMAGE_ID } from "@/data/buildingImages";

export function ApartmentsView() {
  const { dict, locale } = useI18n();
  const router = useRouter();

  const [selectedFloor, setSelectedFloor] = useState<number | null>(null);
  const [roomsFilter, setRoomsFilter] = useState<number | null>(null);
  const [priceRange, setPriceRange] = useState<[number, number]>(PRICE_BOUNDS);
  const [areaRange, setAreaRange] = useState<[number, number]>(AREA_BOUNDS);
  const [statusFilter, setStatusFilter] = useState<ApartmentStatus | null>(null);

  const [selectedApartmentId, setSelectedApartmentId] = useState<string | null>(null);
  const [hoveredApartmentId, setHoveredApartmentId] = useState<string | null>(null);
  const [activeBuildingImageId, setActiveBuildingImageId] = useState(DEFAULT_BUILDING_IMAGE_ID);

  const selectedApartment = useMemo(
    () => APARTMENTS.find((a) => a.id === selectedApartmentId) ?? null,
    [selectedApartmentId],
  );

  const activeImage =
    BUILDING_IMAGES.find((img) => img.id === activeBuildingImageId) ?? BUILDING_IMAGES[0];

  const isDimmed = (apartment: Apartment) => {
    if (selectedFloor !== null && apartment.floor !== selectedFloor) return true;
    if (roomsFilter !== null) {
      const matchesRooms =
        roomsFilter === 4 ? apartment.rooms >= 4 : apartment.rooms === roomsFilter;
      if (!matchesRooms) return true;
    }
    if (apartment.price < priceRange[0] || apartment.price > priceRange[1]) return true;
    if (apartment.area < areaRange[0] || apartment.area > areaRange[1]) return true;
    if (statusFilter !== null && apartment.status !== statusFilter) return true;
    return false;
  };

  const visibleApartments = APARTMENTS.filter((a) => !isDimmed(a));

  const handleHoverApartment = (id: string | null) => {
    setHoveredApartmentId(id);
    if (id) setSelectedApartmentId(id);
  };

  const handleOpenApartment = (id: string) => {
    router.push(`/${locale}/apartments/${id}`);
  };

  return (
    <div>
      <section className="border-b border-white/10 px-6 pb-4 pt-10 text-center">
        <h1 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
          {dict.apartmentsPage.title}
        </h1>
        <p className="mx-auto mt-2 max-w-xl text-white/50">{dict.apartmentsPage.subtitle}</p>
      </section>

      <div className="flex flex-col lg:flex-row">
        <aside className="order-2 shrink-0 overflow-y-auto border-white/10 bg-black/40 p-5 backdrop-blur-xl gold-scroll lg:order-1 lg:h-[calc(100vh-4.5rem)] lg:w-[280px] lg:border-r">
          <FloorSelector
            apartments={APARTMENTS}
            selectedFloor={selectedFloor}
            onSelectFloor={setSelectedFloor}
          />
          <div className="my-6 h-px bg-white/10" />
          <ApartmentFilters
            roomsFilter={roomsFilter}
            onRoomsFilterChange={setRoomsFilter}
            priceRange={priceRange}
            onPriceRangeChange={setPriceRange}
            priceBounds={PRICE_BOUNDS}
            areaRange={areaRange}
            onAreaRangeChange={setAreaRange}
            areaBounds={AREA_BOUNDS}
            statusFilter={statusFilter}
            onStatusFilterChange={setStatusFilter}
          />
        </aside>

        <main className="order-1 flex flex-col lg:order-2 lg:h-[calc(100vh-4.5rem)] lg:flex-1">
          <div className="lg:min-h-0 lg:flex-1">
            <InteractiveBuilding
              imageSrc={activeImage.src}
              apartments={APARTMENTS}
              isDimmed={isDimmed}
              selectedApartmentId={selectedApartmentId}
              hoveredApartmentId={hoveredApartmentId}
              onHoverApartment={handleHoverApartment}
              onSelectApartment={handleOpenApartment}
            />
          </div>
          <div className="shrink-0 border-t border-white/10 bg-black/40 backdrop-blur-xl">
            <ThumbnailCarousel
              images={BUILDING_IMAGES}
              activeId={activeBuildingImageId}
              onSelect={setActiveBuildingImageId}
            />
          </div>
        </main>

        <aside className="order-3 flex shrink-0 flex-col gap-5 overflow-y-auto border-white/10 bg-black/40 p-5 backdrop-blur-xl gold-scroll lg:h-[calc(100vh-4.5rem)] lg:w-[320px] lg:border-l">
          <ApartmentDetailsCard apartment={selectedApartment} />
          <FloorPlanMiniMap apartments={APARTMENTS} selectedApartment={selectedApartment} />
        </aside>
      </div>

      <section className="mx-auto max-w-6xl px-6 py-16">
        <h2 className="mb-8 text-2xl font-semibold tracking-tight text-white sm:text-3xl">
          {dict.apartmentsPage.allTitle}
        </h2>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {visibleApartments.map((apartment) => (
            <ApartmentCard key={apartment.id} apartment={apartment} />
          ))}
        </div>
      </section>
    </div>
  );
}
