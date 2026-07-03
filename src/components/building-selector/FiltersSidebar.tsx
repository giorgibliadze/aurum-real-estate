"use client";

import { Slider } from "@/components/ui/slider";
import { formatArea, formatPrice } from "@/lib/format";
import { cn } from "@/lib/utils";
import { STATUS_COLORS, STATUS_LABELS, type SampleStatus } from "./types";

const ROOM_OPTIONS = [1, 2, 3, 4] as const;

interface FiltersSidebarProps {
  floors: number[];
  availableByFloor: (floor: number) => number;
  hasFloorData?: (floor: number) => boolean;
  selectedFloor: number | null;
  onSelectFloor: (floor: number | null) => void;
  roomsFilter: number | null;
  onRoomsFilterChange: (value: number | null) => void;
  priceRange: [number, number];
  onPriceRangeChange: (value: [number, number]) => void;
  priceBounds: [number, number];
  areaRange: [number, number];
  onAreaRangeChange: (value: [number, number]) => void;
  areaBounds: [number, number];
  statusFilter: SampleStatus | null;
  onStatusFilterChange: (value: SampleStatus | null) => void;
}

export function FiltersSidebar({
  floors,
  availableByFloor,
  hasFloorData,
  selectedFloor,
  onSelectFloor,
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
}: FiltersSidebarProps) {
  return (
    <div className="flex flex-col gap-7">
      <div>
        <div className="mb-3 flex items-center justify-between">
          <h3 className="text-xs font-semibold uppercase tracking-[0.15em] text-white/50">
            სართული
          </h3>
          {selectedFloor !== null && (
            <button
              type="button"
              onClick={() => onSelectFloor(null)}
              className="text-xs font-medium text-gold-light hover:text-gold"
            >
              ყველას ნახვა
            </button>
          )}
        </div>
        <div className="flex max-h-64 flex-col gap-0.5 overflow-y-auto pr-1 gold-scroll">
          {floors.map((floor) => {
            const isActive = selectedFloor === floor;
            const availableCount = availableByFloor(floor);
            const isEnabled = hasFloorData ? hasFloorData(floor) : true;
            return (
              <button
                key={floor}
                type="button"
                aria-pressed={isActive}
                disabled={!isEnabled}
                onClick={() => onSelectFloor(isActive ? null : floor)}
                className={cn(
                  "flex w-full items-center justify-between rounded-md px-3 py-2 text-sm font-medium transition-colors",
                  !isEnabled
                    ? "cursor-not-allowed text-white/25"
                    : isActive
                      ? "bg-gold text-black"
                      : "text-white/70 hover:bg-white/5 hover:text-white",
                )}
              >
                {floor}
                <span
                  className={cn(
                    "h-1.5 w-1.5 rounded-full",
                    isEnabled && availableCount > 0
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

      <div>
        <h3 className="mb-3 text-xs font-semibold uppercase tracking-[0.15em] text-white/50">
          ოთახების რაოდენობა
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
            ყველა
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
          ფასი
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
          ფართობი (მ²)
        </h3>
        <Slider
          min={areaBounds[0]}
          max={areaBounds[1]}
          step={1}
          value={areaRange}
          onValueChange={(v) => onAreaRangeChange([v[0], v[1]])}
        />
        <div className="mt-3 flex justify-between text-xs font-medium text-white/60">
          <span>{formatArea(areaRange[0], "მ²")}</span>
          <span>{formatArea(areaRange[1], "მ²")}</span>
        </div>
      </div>

      <div>
        <h3 className="mb-3 text-xs font-semibold uppercase tracking-[0.15em] text-white/50">
          სტატუსი
        </h3>
        <div className="flex flex-col gap-2">
          {(Object.keys(STATUS_LABELS) as SampleStatus[]).map((status) => {
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
                {STATUS_LABELS[status]}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
