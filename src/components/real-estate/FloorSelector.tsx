"use client";

import { cn } from "@/lib/utils";
import { useI18n } from "@/i18n/context";
import { BUILDING_TOTAL_FLOORS, type Apartment } from "@/data/apartments";

interface FloorSelectorProps {
  apartments: Apartment[];
  selectedFloor: number | null;
  onSelectFloor: (floor: number | null) => void;
}

export function FloorSelector({ apartments, selectedFloor, onSelectFloor }: FloorSelectorProps) {
  const { dict } = useI18n();
  const floors = Array.from(
    { length: BUILDING_TOTAL_FLOORS },
    (_, i) => BUILDING_TOTAL_FLOORS - i,
  );

  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-xs font-semibold uppercase tracking-[0.18em] text-white/60">
          {dict.selector.floorLabel}
        </h3>
        {selectedFloor !== null && (
          <button
            type="button"
            onClick={() => onSelectFloor(null)}
            className="text-xs font-medium text-gold-light transition-colors hover:text-gold"
          >
            {dict.selector.showAll}
          </button>
        )}
      </div>

      <div className="flex flex-col gap-2">
        {floors.map((floor) => {
          const hasFloorData = apartments.some((a) => a.floor === floor);
          const availableOnFloor = apartments.filter(
            (a) => a.floor === floor && a.status === "available",
          ).length;
          const isActive = selectedFloor === floor;

          return (
            <button
              key={floor}
              type="button"
              aria-pressed={isActive}
              disabled={!hasFloorData}
              onClick={() => onSelectFloor(isActive ? null : floor)}
              className={cn(
                "flex w-full items-center justify-between rounded-lg border px-4 py-3 text-sm font-medium shadow-[0_8px_24px_rgba(0,0,0,0.18)] transition-all",
                !hasFloorData
                  ? "cursor-not-allowed border-white/5 bg-white/[0.015] text-white/25 shadow-none"
                  : isActive
                  ? "border-gold/70 bg-gold/18 text-white shadow-[0_0_22px_rgba(212,175,55,0.14)]"
                  : "border-white/10 bg-white/[0.025] text-white/75 hover:border-gold/35 hover:bg-white/[0.045] hover:text-white",
              )}
            >
              {floor}
              <span
                className={cn(
                  "h-1.5 w-1.5 rounded-full",
                  hasFloorData && availableOnFloor > 0
                    ? "bg-status-available shadow-[0_0_10px_rgba(52,211,153,0.8)]"
                    : "bg-white/15",
                )}
              />
            </button>
          );
        })}
      </div>
    </div>
  );
}
