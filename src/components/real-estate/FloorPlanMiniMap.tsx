"use client";

import { cn } from "@/lib/utils";
import { useI18n } from "@/i18n/context";
import { STATUS_COLORS, type Apartment } from "@/data/apartments";

interface FloorPlanMiniMapProps {
  apartments: Apartment[];
  selectedApartment: Apartment | null;
}

export function FloorPlanMiniMap({ apartments, selectedApartment }: FloorPlanMiniMapProps) {
  const { dict } = useI18n();

  const unitsOnFloor = selectedApartment
    ? apartments
        .filter((a) => a.floor === selectedApartment.floor)
        .sort((a, b) => a.block.localeCompare(b.block))
    : [];

  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
      <h3 className="mb-3 text-xs font-semibold uppercase tracking-[0.15em] text-white/50">
        {dict.selector.floorPlanSchematicTitle}
      </h3>

      {selectedApartment ? (
        <div className="relative aspect-[4/3] rounded-xl border border-white/10 bg-black/30 p-3">
          <div className="mb-2 grid grid-cols-2 gap-2 text-center text-[10px] font-medium uppercase tracking-wide text-white/30">
            {unitsOnFloor.map((unit) => (
              <span key={unit.id}>
                {dict.apartmentFields.block} {unit.block}
              </span>
            ))}
          </div>
          <div className="grid h-[calc(100%-1.5rem)] grid-cols-2 gap-2">
            {unitsOnFloor.map((unit) => {
              const isSelected = unit.id === selectedApartment.id;
              return (
                <div
                  key={unit.id}
                  className={cn(
                    "flex flex-col items-center justify-center gap-1 rounded-lg border text-xs font-semibold transition-colors",
                    isSelected
                      ? "border-status-available bg-status-available/15 text-status-available"
                      : "border-white/10 text-white/30",
                  )}
                  style={
                    !isSelected
                      ? { borderColor: `${STATUS_COLORS[unit.status]}40` }
                      : undefined
                  }
                >
                  №{unit.number}
                </div>
              );
            })}
          </div>

          <div className="absolute right-2.5 top-2.5 flex h-6 w-6 items-center justify-center rounded-full border border-white/15 bg-black/70 text-[10px] font-bold text-white/60">
            N
          </div>
        </div>
      ) : (
        <p className="text-sm text-white/40">{dict.selector.floorPlanSchematicEmpty}</p>
      )}
    </div>
  );
}
