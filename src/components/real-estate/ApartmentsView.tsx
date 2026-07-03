"use client";

import { useMemo, useState } from "react";
import { Building2, Layers3 } from "lucide-react";

import { FloorSelector } from "@/components/real-estate/FloorSelector";
import { InteractiveBuilding } from "@/components/real-estate/InteractiveBuilding";
import { ThumbnailCarousel } from "@/components/real-estate/ThumbnailCarousel";
import { useI18n } from "@/i18n/context";
import { APARTMENTS } from "@/data/apartments";
import { APARTMENTS_SELECTOR_CONFIG } from "@/data/apartmentsSelectorConfig";
import { BUILDING_IMAGES, DEFAULT_BUILDING_IMAGE_ID } from "@/data/buildingImages";

export function ApartmentsView() {
  const { dict } = useI18n();

  const [selectedFloor, setSelectedFloor] = useState<number | null>(null);
  const [activeBuildingImageId, setActiveBuildingImageId] = useState(DEFAULT_BUILDING_IMAGE_ID);

  const activeImage =
    BUILDING_IMAGES.find((img) => img.id === activeBuildingImageId) ?? BUILDING_IMAGES[0];

  const floorsWithApartmentData = useMemo(
    () => Array.from(new Set(APARTMENTS.map((apartment) => apartment.floor))),
    [],
  );

  const selectedFloorApartments = useMemo(
    () =>
      selectedFloor === null
        ? []
        : APARTMENTS.filter((apartment) => apartment.floor === selectedFloor),
    [selectedFloor],
  );

  const handleSelectFloorFromBuilding = (floor: number) => {
    setSelectedFloor(floor);
  };

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_50%_0%,rgba(212,175,55,0.08),transparent_34%),linear-gradient(180deg,#090909_0%,#050505_100%)]">
      <section className="px-6 pb-5 pt-6 text-center">
        <h1 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
          {dict.apartmentsPage.title}
        </h1>
        <p className="mx-auto mt-2 max-w-xl text-white/50">{dict.apartmentsPage.subtitle}</p>
      </section>

      <div className="grid gap-5 px-4 pb-8 sm:px-6 lg:grid-cols-[260px_minmax(0,1fr)_300px] lg:items-start">
        <aside className="order-2 rounded-2xl border border-white/10 bg-black/45 p-5 shadow-[0_24px_70px_rgba(0,0,0,0.42)] backdrop-blur-xl lg:order-1 lg:sticky lg:top-24">
          <FloorSelector
            apartments={APARTMENTS}
            floors={APARTMENTS_SELECTOR_CONFIG.floors}
            selectedFloor={selectedFloor}
            onSelectFloor={setSelectedFloor}
          />
        </aside>

        <main className="order-1 flex min-w-0 flex-col gap-4 lg:order-2">
          <div>
            <InteractiveBuilding
              imageSrc={activeImage.src}
              floorCount={APARTMENTS_SELECTOR_CONFIG.floorCount}
              overlayViewBox={APARTMENTS_SELECTOR_CONFIG.overlayViewBox}
              floorOverlays={APARTMENTS_SELECTOR_CONFIG.overlays}
              selectedFloor={selectedFloor}
              enabledFloors={floorsWithApartmentData}
              onSelectFloor={handleSelectFloorFromBuilding}
            />
          </div>
          <div className="rounded-2xl border border-white/10 bg-black/35 p-2 shadow-[0_16px_46px_rgba(0,0,0,0.32)] backdrop-blur-xl">
            <ThumbnailCarousel
              images={BUILDING_IMAGES}
              activeId={activeBuildingImageId}
              onSelect={setActiveBuildingImageId}
            />
          </div>
        </main>

        <aside className="order-3 flex flex-col gap-4 rounded-2xl border border-white/10 bg-black/45 p-5 shadow-[0_24px_70px_rgba(0,0,0,0.42)] backdrop-blur-xl lg:sticky lg:top-24">
          <div className="flex min-h-40 flex-col items-center justify-center rounded-2xl border border-white/10 bg-white/[0.025] p-6 text-center">
            <Building2 className="h-10 w-10 text-gold" />
            <p className="mt-5 text-sm text-white/55">
              {selectedFloor === null
                ? dict.detailsCard.emptyPrompt
                : `${dict.apartmentFields.floor} ${selectedFloor}`}
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/[0.025] p-5">
            <div className="flex items-center gap-3">
              <Layers3 className="h-5 w-5 text-gold-light" />
              <h3 className="text-sm font-semibold text-white">{dict.selector.floorPlanSchematicTitle}</h3>
            </div>
            <div className="mt-5 space-y-3 text-sm">
              <div className="flex items-center justify-between text-white/60">
                <span>{dict.statuses.available}</span>
                <span className="font-semibold text-status-available">
                  {selectedFloorApartments.filter((apartment) => apartment.status === "available").length}
                </span>
              </div>
              <div className="flex items-center justify-between text-white/60">
                <span>{dict.statuses.reserved}</span>
                <span className="font-semibold text-gold">
                  {selectedFloorApartments.filter((apartment) => apartment.status === "reserved").length}
                </span>
              </div>
              <div className="flex items-center justify-between text-white/60">
                <span>{dict.statuses.sold}</span>
                <span className="font-semibold text-status-sold">
                  {selectedFloorApartments.filter((apartment) => apartment.status === "sold").length}
                </span>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
