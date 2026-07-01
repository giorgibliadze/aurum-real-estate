"use client";

import { cn } from "@/lib/utils";
import { useI18n } from "@/i18n/context";
import { TOTAL_FLOORS, type Apartment } from "@/data/apartments";

interface FloorSelectorProps {
  apartments: Apartment[];
  selectedFloor: number | null;
  onSelectFloor: (floor: number | null) => void;
}

export function FloorSelector({ apartments, selectedFloor, onSelectFloor }: FloorSelectorProps) {
  const { dict } = useI18n();
  const floors = Array.from({ length: TOTAL_FLOORS }, (_, i) => TOTAL_FLOORS - i);

  return (
    <div>
      <div className="mb-3 flex items-center justify-between">
        <h3 className="text-xs font-semibold uppercase tracking-[0.15em] text-white/50">
          {dict.selector.floorLabel}
        </h3>
        {selectedFloor !== null && (
          <button
            type="button"
            onClick={() => onSelectFloor(null)}
            className="text-xs font-medium text-gold-light hover:text-gold"
          >
            {dict.selector.showAll}
          </button>
        )}
      </div>

      <div className="flex max-h-64 flex-col gap-0.5 overflow-y-auto pr-1 gold-scroll">
        {floors.map((floor) => {
          const availableOnFloor = apartments.filter(
            (a) => a.floor === floor && a.status === "available",
          ).length;
          const isActive = selectedFloor === floor;

          return (
            <button
              key={floor}
              type="button"
              aria-pressed={isActive}
              onClick={() => onSelectFloor(isActive ? null : floor)}
              className={cn(
                "flex w-full items-center justify-between rounded-md px-3 py-2 text-sm font-medium transition-colors",
                isActive
                  ? "bg-gold text-black"
                  : "text-white/70 hover:bg-white/5 hover:text-white",
              )}
            >
              {floor}
              <span
                className={cn(
                  "h-1.5 w-1.5 rounded-full",
                  availableOnFloor > 0
                    ? isActive
                      ? "bg-black/40"
                      : "bg-status-available"
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
