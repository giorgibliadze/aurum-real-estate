"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";

import { useI18n } from "@/i18n/context";
import { LASHAS_FLOOR_PATHS } from "@/data/lashasFloorPaths";
import { cn } from "@/lib/utils";
import { type Apartment } from "@/data/apartments";
import { ApartmentPolygon } from "./ApartmentPolygon";
import { BuildingControls } from "./BuildingControls";

interface InteractiveBuildingProps {
  imageSrc: string;
  apartments: Apartment[];
  isDimmed: (apartment: Apartment) => boolean;
  selectedApartmentId: string | null;
  hoveredApartmentId: string | null;
  selectedFloor: number | null;
  onSelectFloor: (floor: number) => void;
  onHoverApartment: (id: string | null) => void;
  onSelectApartment: (id: string) => void;
}

const MIN_ZOOM = 1;
const MAX_ZOOM = 2;
const ZOOM_STEP = 0.2;
const FLOOR_HIGHLIGHT_COLOR = "#d4af37";

export function InteractiveBuilding({
  imageSrc,
  apartments,
  isDimmed,
  selectedApartmentId,
  hoveredApartmentId,
  selectedFloor,
  onSelectFloor,
  onHoverApartment,
  onSelectApartment,
}: InteractiveBuildingProps) {
  const { dict } = useI18n();
  const [zoom, setZoom] = useState(1);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [hoveredFloor, setHoveredFloor] = useState<number | null>(null);
  const viewerRef = useRef<HTMLDivElement>(null);
  const usesLashasPaths = imageSrc.includes("lashas-background.svg");

  useEffect(() => {
    const handleChange = () => setIsFullscreen(document.fullscreenElement === viewerRef.current);
    document.addEventListener("fullscreenchange", handleChange);
    return () => document.removeEventListener("fullscreenchange", handleChange);
  }, []);

  const toggleFullscreen = () => {
    if (document.fullscreenElement) {
      document.exitFullscreen().catch(() => {});
    } else {
      viewerRef.current?.requestFullscreen().catch(() => {});
    }
  };

  const hoveredApartment = useMemo(
    () => apartments.find((a) => a.id === hoveredApartmentId) ?? null,
    [apartments, hoveredApartmentId],
  );

  const tooltipAnchor = useMemo(() => {
    if (!hoveredApartment) return null;
    const pts = hoveredApartment.polygonPoints;
    const x = pts.reduce((sum, p) => sum + p.x, 0) / pts.length;
    const y = pts.reduce((sum, p) => sum + p.y, 0) / pts.length;
    return { x, y };
  }, [hoveredApartment]);

  return (
    <div
      ref={viewerRef}
      className={cn(
        "flex h-full flex-col gap-3",
        isFullscreen ? "justify-center bg-black p-6" : "p-4",
      )}
    >
      <div
        className={cn(
          "relative w-full shrink-0 overflow-hidden rounded-2xl bg-black shadow-2xl ring-1 ring-white/10",
          isFullscreen ? "flex-1" : "aspect-[4/3] lg:aspect-auto lg:min-h-0 lg:flex-1",
        )}
      >
        <div
          className="absolute inset-0 origin-center transition-transform duration-300 ease-out"
          style={{ transform: `scale(${zoom})` }}
        >
          <Image
            src={imageSrc}
            alt={dict.selector.imageAlt}
            fill
            priority
            unoptimized={imageSrc.endsWith(".svg")}
            sizes="(min-width: 1024px) 70vw, 100vw"
            className={cn(usesLashasPaths ? "object-contain p-3" : "object-cover")}
          />

          {usesLashasPaths ? (
            <svg viewBox="0 0 210 297" className="absolute inset-0 h-full w-full p-3">
              {LASHAS_FLOOR_PATHS.map(({ floor, d }) => {
                const isSelected = selectedFloor === floor;
                const isHovered = hoveredFloor === floor;
                const color = FLOOR_HIGHLIGHT_COLOR;

                return (
                  <path
                    key={floor}
                    d={d}
                    role="button"
                    tabIndex={0}
                    aria-pressed={isSelected}
                    aria-label={`${dict.apartmentFields.floor} ${floor}`}
                    onMouseEnter={() => setHoveredFloor(floor)}
                    onMouseLeave={() => setHoveredFloor(null)}
                    onFocus={() => setHoveredFloor(floor)}
                    onBlur={() => setHoveredFloor(null)}
                    onClick={() => onSelectFloor(floor)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        onSelectFloor(floor);
                      }
                    }}
                    fill={color}
                    stroke={isSelected ? "#f3dfa1" : color}
                    strokeWidth={isSelected ? 0.72 : isHovered ? 0.56 : 0.36}
                    vectorEffect="non-scaling-stroke"
                    className={cn(
                      "cursor-pointer outline-none transition-[fill-opacity,stroke-opacity,stroke-width,filter] duration-150",
                      isSelected && "animate-glow-pulse",
                    )}
                    style={{
                      fillOpacity: isSelected ? 0.34 : isHovered ? 0.24 : 0.1,
                      strokeOpacity: isSelected ? 1 : isHovered ? 0.9 : 0.55,
                      filter: isSelected || isHovered ? `drop-shadow(0 0 6px ${color})` : undefined,
                    }}
                  />
                );
              })}
            </svg>
          ) : (
            <svg
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
              className="absolute inset-0 h-full w-full"
            >
              {apartments.map((apartment) => (
                <ApartmentPolygon
                  key={apartment.id}
                  apartment={apartment}
                  isSelected={selectedApartmentId === apartment.id}
                  isHovered={hoveredApartmentId === apartment.id}
                  isDimmed={isDimmed(apartment)}
                  onHover={onHoverApartment}
                  onSelect={onSelectApartment}
                />
              ))}
            </svg>
          )}
        </div>

        {usesLashasPaths && hoveredFloor && (
          <div className="pointer-events-none absolute left-1/2 top-5 z-10 -translate-x-1/2 whitespace-nowrap rounded-full bg-black/85 px-3 py-1.5 text-xs font-medium text-white shadow-lg ring-1 ring-gold/40">
            {dict.apartmentFields.floor} {hoveredFloor}
          </div>
        )}

        {!usesLashasPaths && hoveredApartment && tooltipAnchor && (
          <div
            className="pointer-events-none absolute z-10 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap rounded-full bg-black/85 px-3 py-1.5 text-xs font-medium text-white shadow-lg ring-1 ring-gold/40"
            style={{ left: `${tooltipAnchor.x}%`, top: `${tooltipAnchor.y}%` }}
          >
            {dict.selector.apartmentWord} {hoveredApartment.number} ·{" "}
            {dict.statuses[hoveredApartment.status]}
          </div>
        )}
      </div>

      <BuildingControls
        zoom={zoom}
        minZoom={MIN_ZOOM}
        maxZoom={MAX_ZOOM}
        onZoomIn={() => setZoom((z) => Math.min(MAX_ZOOM, +(z + ZOOM_STEP).toFixed(2)))}
        onZoomOut={() => setZoom((z) => Math.max(MIN_ZOOM, +(z - ZOOM_STEP).toFixed(2)))}
        onReset={() => setZoom(1)}
        isFullscreen={isFullscreen}
        onToggleFullscreen={toggleFullscreen}
      />
    </div>
  );
}
