"use client";

import { STATUS_COLORS, type SampleApartment } from "./types";
import type { DirectSelectionPath } from "./direct-selection-paths";

interface DirectPathOverlayProps {
  paths: DirectSelectionPath[];
  apartmentById: Map<string, SampleApartment>;
  viewBox: string;
  hoveredId?: string | null;
  selectedApartmentId?: string | null;
  dimmedIds?: Set<string>;
  onHover?: (id: string | null) => void;
  onSelect?: (apartmentId: string) => void;
}

export function DirectPathOverlay({
  paths,
  apartmentById,
  viewBox,
  hoveredId = null,
  selectedApartmentId = null,
  dimmedIds,
  onHover,
  onSelect,
}: DirectPathOverlayProps) {
  return (
    <svg
      viewBox={viewBox}
      preserveAspectRatio="xMidYMid meet"
      className="absolute inset-0 h-full max-h-full w-full max-w-full"
      style={{ pointerEvents: "none" }}
      aria-hidden={false}
    >
      {paths.map((path) => {
        const apartment = apartmentById.get(path.apartmentId);
        const isHovered = hoveredId === path.id;
        const isSelected = selectedApartmentId === path.apartmentId;
        const isDimmed = dimmedIds?.has(path.id) ?? false;
        const color = apartment ? STATUS_COLORS[apartment.status] : "#d4af37";

        return (
          <path
            key={path.id}
            d={path.d}
            role="button"
            tabIndex={isDimmed ? -1 : 0}
            aria-pressed={isSelected}
            aria-label={apartment ? `ბინა #${apartment.number}` : path.id}
            fill={isSelected ? "#3b82f6" : color}
            stroke={isSelected ? "#60a5fa" : isHovered ? "#34d399" : color}
            strokeWidth={isSelected ? 0.72 : isHovered ? 0.56 : 0.36}
            vectorEffect="non-scaling-stroke"
            className={isSelected ? "animate-glow-pulse" : undefined}
            style={{
              cursor: isDimmed ? "default" : "pointer",
              fillOpacity: isDimmed ? 0.03 : isSelected ? 0.34 : isHovered ? 0.28 : 0.1,
              outline: "none",
              pointerEvents: isDimmed ? "none" : "auto",
              strokeOpacity: isDimmed ? 0.12 : isSelected || isHovered ? 1 : 0.6,
              transition:
                "fill-opacity 150ms ease, stroke-opacity 150ms ease, stroke-width 150ms ease",
            }}
            onMouseEnter={() => {
              if (!isDimmed) onHover?.(path.id);
            }}
            onMouseLeave={() => onHover?.(null)}
            onFocus={() => {
              if (!isDimmed) onHover?.(path.id);
            }}
            onBlur={() => onHover?.(null)}
            onClick={() => {
              if (!isDimmed) onSelect?.(path.apartmentId);
            }}
            onKeyDown={(event) => {
              if (!isDimmed && (event.key === "Enter" || event.key === " ")) {
                event.preventDefault();
                onSelect?.(path.apartmentId);
              }
            }}
          />
        );
      })}
    </svg>
  );
}
