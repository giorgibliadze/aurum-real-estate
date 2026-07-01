"use client";

import { useI18n } from "@/i18n/context";
import { STATUS_COLORS, type Apartment } from "@/data/apartments";

interface ApartmentPolygonProps {
  apartment: Apartment;
  isSelected: boolean;
  isHovered: boolean;
  isDimmed: boolean;
  onHover: (id: string | null) => void;
  onSelect: (id: string) => void;
}

function toPolygonPoints(points: Apartment["polygonPoints"]) {
  return points.map((p) => `${p.x},${p.y}`).join(" ");
}

export function ApartmentPolygon({
  apartment,
  isSelected,
  isHovered,
  isDimmed,
  onHover,
  onSelect,
}: ApartmentPolygonProps) {
  const { dict } = useI18n();
  const color = STATUS_COLORS[apartment.status];
  const points = toPolygonPoints(apartment.polygonPoints);

  const fillOpacity = isSelected ? 0.38 : isHovered ? 0.26 : 0.12;
  const strokeOpacity = isSelected ? 1 : isHovered ? 0.9 : 0.55;
  const strokeWidth = isSelected ? 0.35 : isHovered ? 0.28 : 0.16;

  return (
    <polygon
      points={points}
      role="button"
      tabIndex={isDimmed ? -1 : 0}
      aria-pressed={isSelected}
      aria-label={`${dict.selector.apartmentWord} ${apartment.number}, ${dict.apartmentFields.floor} ${apartment.floor}, ${dict.apartmentFields.block} ${apartment.block}`}
      onMouseEnter={() => !isDimmed && onHover(apartment.id)}
      onMouseLeave={() => onHover(null)}
      onFocus={() => !isDimmed && onHover(apartment.id)}
      onBlur={() => onHover(null)}
      onClick={() => !isDimmed && onSelect(apartment.id)}
      onKeyDown={(e) => {
        if (!isDimmed && (e.key === "Enter" || e.key === " ")) {
          e.preventDefault();
          onSelect(apartment.id);
        }
      }}
      fill={color}
      stroke={isSelected ? "#f3dfa1" : color}
      style={{
        fillOpacity,
        strokeOpacity: isDimmed ? 0.08 : strokeOpacity,
        transition: "fill-opacity 150ms ease, stroke-opacity 150ms ease, stroke-width 150ms ease",
        pointerEvents: isDimmed ? "none" : "auto",
        cursor: isDimmed ? "default" : "pointer",
        outline: "none",
      }}
      strokeWidth={strokeWidth}
      vectorEffect="non-scaling-stroke"
      className={isSelected ? "animate-glow-pulse" : undefined}
    />
  );
}
