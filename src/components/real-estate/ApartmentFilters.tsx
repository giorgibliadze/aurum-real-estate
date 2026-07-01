"use client";

import { Slider } from "@/components/ui/slider";
import { formatArea, formatPrice } from "@/lib/format";
import { cn } from "@/lib/utils";
import { useI18n } from "@/i18n/context";
import { STATUS_COLORS, type ApartmentStatus } from "@/data/apartments";

const ROOM_OPTIONS = [1, 2, 3, 4] as const;

interface ApartmentFiltersProps {
  roomsFilter: number | null;
  onRoomsFilterChange: (value: number | null) => void;
  priceRange: [number, number];
  onPriceRangeChange: (value: [number, number]) => void;
  priceBounds: [number, number];
  areaRange: [number, number];
  onAreaRangeChange: (value: [number, number]) => void;
  areaBounds: [number, number];
  statusFilter: ApartmentStatus | null;
  onStatusFilterChange: (value: ApartmentStatus | null) => void;
}

export function ApartmentFilters({
  roomsFilter,
  onRoomsFilterChange,
  priceRange,
  onPriceRangeChange,
  priceBounds,
  areaRange,
  onAreaRangeChange,
  areaBounds,
  statusFilter,
  onStatusFilterChange,
}: ApartmentFiltersProps) {
  const { dict } = useI18n();
  const statuses = Object.keys(dict.statuses) as ApartmentStatus[];

  return (
    <div className="flex flex-col gap-7">
      <div>
        <h3 className="mb-3 text-xs font-semibold uppercase tracking-[0.15em] text-white/50">
          {dict.selector.roomsLabel}
        </h3>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            aria-pressed={roomsFilter === null}
            onClick={() => onRoomsFilterChange(null)}
            className={cn(
              "rounded-full border px-3 py-1.5 text-sm font-medium transition-colors",
              roomsFilter === null
                ? "border-gold bg-gold/15 text-gold-light"
                : "border-white/10 text-white/60 hover:border-gold/40 hover:text-white",
            )}
          >
            {dict.selector.all}
          </button>
          {ROOM_OPTIONS.map((rooms) => (
            <button
              key={rooms}
              type="button"
              aria-pressed={roomsFilter === rooms}
              onClick={() => onRoomsFilterChange(roomsFilter === rooms ? null : rooms)}
              className={cn(
                "rounded-full border px-3 py-1.5 text-sm font-medium transition-colors",
                roomsFilter === rooms
                  ? "border-gold bg-gold/15 text-gold-light"
                  : "border-white/10 text-white/60 hover:border-gold/40 hover:text-white",
              )}
            >
              {rooms === 4 ? "4+" : rooms}
            </button>
          ))}
        </div>
      </div>

      <div>
        <h3 className="mb-4 text-xs font-semibold uppercase tracking-[0.15em] text-white/50">
          {dict.selector.priceLabel}
        </h3>
        <Slider
          min={priceBounds[0]}
          max={priceBounds[1]}
          step={1000}
          value={priceRange}
          onValueChange={(v) => onPriceRangeChange([v[0], v[1]])}
        />
        <div className="mt-3 flex justify-between text-xs font-medium text-white/60">
          <span>{formatPrice(priceRange[0])}</span>
          <span>{formatPrice(priceRange[1])}</span>
        </div>
      </div>

      <div>
        <h3 className="mb-4 text-xs font-semibold uppercase tracking-[0.15em] text-white/50">
          {dict.selector.areaLabel}
        </h3>
        <Slider
          min={areaBounds[0]}
          max={areaBounds[1]}
          step={1}
          value={areaRange}
          onValueChange={(v) => onAreaRangeChange([v[0], v[1]])}
        />
        <div className="mt-3 flex justify-between text-xs font-medium text-white/60">
          <span>{formatArea(areaRange[0], dict.common.areaUnit)}</span>
          <span>{formatArea(areaRange[1], dict.common.areaUnit)}</span>
        </div>
      </div>

      <div>
        <h3 className="mb-3 text-xs font-semibold uppercase tracking-[0.15em] text-white/50">
          {dict.selector.statusLabel}
        </h3>
        <div className="flex flex-col gap-2">
          {statuses.map((status) => {
            const isActive = statusFilter === status;
            return (
              <button
                key={status}
                type="button"
                aria-pressed={isActive}
                onClick={() => onStatusFilterChange(isActive ? null : status)}
                className={cn(
                  "flex items-center gap-2.5 rounded-lg border px-3 py-2 text-sm font-medium transition-colors",
                  isActive
                    ? "border-gold/60 bg-white/[0.06] text-white"
                    : "border-white/10 text-white/60 hover:border-white/20 hover:text-white",
                )}
              >
                <span
                  className="h-2.5 w-2.5 rounded-full"
                  style={{ backgroundColor: STATUS_COLORS[status] }}
                />
                {dict.statuses[status]}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
