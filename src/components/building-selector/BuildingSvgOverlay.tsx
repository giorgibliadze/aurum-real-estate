"use client";

import { STATUS_COLORS, type PolygonArea } from "./types";

interface BuildingSvgOverlayProps {
  areas: PolygonArea[];
  hoveredId?: string | null;
  selectedId?: string | null;
  dimmedIds?: Set<string>;
  onHover?: (id: string | null) => void;
  onSelect?: (area: PolygonArea) => void;
}

function areaColor(area: PolygonArea, isFloorArea: boolean) {
  if (isFloorArea) return "#d4af37";
  return area.status ? STATUS_COLORS[area.status] : "#d4af37";
}

export function BuildingSvgOverlay({
  areas,
  hoveredId = null,
  selectedId = null,
  dimmedIds,
  onHover,
  onSelect,
}: BuildingSvgOverlayProps) {
  return (
    <svg
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      className="absolute inset-0 h-full w-full"
      style={{ pointerEvents: "none" }}
      aria-hidden={false}
    >
      {areas.map((area) => {
        const isHovered = hoveredId === area.id;
        const isSelected = selectedId === area.id;
        const isDimmed = dimmedIds?.has(area.id) ?? false;
        const isFloorArea = !area.apartmentId;
        const color = areaColor(area, isFloorArea);
        const selectedColor = isFloorArea ? "#f3dfa1" : "#60a5fa";
        const hoverColor = isFloorArea ? "#f3dfa1" : "#34d399";
        const strokeColor = isSelected ? selectedColor : isHovered ? hoverColor : color;
        const fillColor = isSelected && !isFloorArea ? "#3b82f6" : color;
        const points = area.points.map((point) => `${point.x},${point.y}`).join(" ");

        return (
          <polygon
            key={area.id}
            points={points}
            role="button"
            tabIndex={isDimmed ? -1 : 0}
            aria-pressed={isSelected}
            aria-label={area.label}
            fill={fillColor}
            stroke={strokeColor}
            strokeWidth={isSelected ? 0.36 : isHovered ? 0.28 : 0.16}
            vectorEffect="non-scaling-stroke"
            className={isSelected ? "animate-glow-pulse" : undefined}
            style={{
              cursor: isDimmed ? "default" : "pointer",
              fillOpacity: isDimmed
                ? 0.03
                : isSelected
                  ? 0.34
                  : isHovered
                    ? 0.28
                    : isFloorArea
                      ? 0
                      : 0.1,
              outline: "none",
              pointerEvents: isDimmed ? "none" : "auto",
              strokeOpacity: isDimmed ? 0.12 : isSelected || isHovered ? 1 : 0.6,
              transition:
                "fill-opacity 150ms ease, stroke-opacity 150ms ease, stroke-width 150ms ease",
            }}
            onMouseEnter={() => {
              if (!isDimmed) onHover?.(area.id);
            }}
            onMouseLeave={() => onHover?.(null)}
            onFocus={() => {
              if (!isDimmed) onHover?.(area.id);
            }}
            onBlur={() => onHover?.(null)}
            onClick={() => {
              if (!isDimmed) onSelect?.(area);
            }}
            onKeyDown={(event) => {
              if (!isDimmed && (event.key === "Enter" || event.key === " ")) {
                event.preventDefault();
                onSelect?.(area);
              }
            }}
          />
        );
      })}
    </svg>
  );
}
