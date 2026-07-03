"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";

import { useI18n } from "@/i18n/context";
import { LASHAS_FLOOR_PATHS } from "@/data/lashasFloorPaths";
import { BUILDING_TOTAL_FLOORS } from "@/data/apartments";
import { cn } from "@/lib/utils";
import { BuildingControls } from "./BuildingControls";

interface InteractiveBuildingProps {
  imageSrc: string;
  selectedFloor: number | null;
  enabledFloors: number[];
  onSelectFloor: (floor: number) => void;
}

const MIN_ZOOM = 1;
const MAX_ZOOM = 2;
const ZOOM_STEP = 0.2;
const FLOOR_HIGHLIGHT_COLOR = "#d4af37";
const LASHAS_VIEW_BOX = "0 0 210 297";

export function InteractiveBuilding({
  imageSrc,
  selectedFloor,
  enabledFloors,
  onSelectFloor,
}: InteractiveBuildingProps) {
  const { dict } = useI18n();
  const [zoom, setZoom] = useState(1);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [hoveredFloor, setHoveredFloor] = useState<number | null>(null);
  const viewerRef = useRef<HTMLDivElement>(null);
  const usesLashasPaths = imageSrc.includes("lashas-background.svg");
  const enabledFloorSet = useMemo(() => new Set(enabledFloors), [enabledFloors]);

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

  return (
    <div
      ref={viewerRef}
      className={cn(
        "flex h-full flex-col gap-4",
        isFullscreen ? "justify-center bg-black p-6" : "",
      )}
    >
      <div
        className={cn(
          "relative flex shrink-0 items-center justify-center overflow-hidden rounded-[22px] border border-gold/30 bg-[linear-gradient(145deg,#0B0B0B_0%,#111111_48%,#151515_100%)] shadow-[0_32px_95px_rgba(0,0,0,0.68),0_0_0_1px_rgba(255,255,255,0.04)_inset,0_0_58px_rgba(212,175,55,0.12)_inset] transition duration-300 hover:border-gold/45",
          isFullscreen
            ? "flex-1"
            : usesLashasPaths
              ? "mx-auto aspect-[210/297] w-full max-w-[min(100%,46svh)] sm:max-w-[min(100%,50svh)] lg:max-w-[min(100%,54vh)]"
              : "h-[58svh] min-h-[360px] w-full sm:h-[64svh] md:min-h-[500px] lg:h-[72vh] lg:max-h-[840px]",
        )}
      >
        <div
          className="absolute inset-0 flex origin-center items-center justify-center transition-transform duration-300 ease-out"
          style={{ transform: `scale(${zoom})` }}
        >
          <Image
            src={imageSrc}
            alt={dict.selector.imageAlt}
            fill
            priority
            unoptimized={imageSrc.endsWith(".svg")}
            sizes="(min-width: 1024px) 70vw, 100vw"
            className="h-full max-h-full w-full max-w-full object-contain"
          />

          {usesLashasPaths ? (
            <svg
              viewBox={LASHAS_VIEW_BOX}
              preserveAspectRatio="xMidYMid meet"
              className="absolute inset-0 h-full max-h-full w-full max-w-full"
            >
              {LASHAS_FLOOR_PATHS.map(({ floor, d }) => {
                if (floor < 1 || floor > BUILDING_TOTAL_FLOORS) return null;

                const isEnabled = enabledFloorSet.has(floor);
                const isSelected = selectedFloor === floor;
                const isHovered = hoveredFloor === floor;
                const color = FLOOR_HIGHLIGHT_COLOR;

                return (
                  <path
                    key={floor}
                    d={d}
                    role={isEnabled ? "button" : undefined}
                    tabIndex={isEnabled ? 0 : -1}
                    aria-disabled={isEnabled ? undefined : true}
                    aria-pressed={isEnabled ? isSelected : undefined}
                    aria-label={`${dict.apartmentFields.floor} ${floor}`}
                    onMouseEnter={isEnabled ? () => setHoveredFloor(floor) : undefined}
                    onMouseLeave={isEnabled ? () => setHoveredFloor(null) : undefined}
                    onFocus={isEnabled ? () => setHoveredFloor(floor) : undefined}
                    onBlur={isEnabled ? () => setHoveredFloor(null) : undefined}
                    onClick={isEnabled ? () => onSelectFloor(floor) : undefined}
                    onKeyDown={(e) => {
                      if (!isEnabled) return;
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
                      "outline-none transition-[fill-opacity,stroke-opacity,stroke-width,filter] duration-150",
                      isEnabled ? "cursor-pointer" : "cursor-not-allowed",
                      isSelected && "animate-glow-pulse",
                    )}
                    style={{
                      fillOpacity: !isEnabled ? 0.045 : isSelected ? 0.34 : isHovered ? 0.24 : 0.1,
                      strokeOpacity: !isEnabled ? 0.22 : isSelected ? 1 : isHovered ? 0.9 : 0.55,
                      filter: isSelected || isHovered ? `drop-shadow(0 0 6px ${color})` : undefined,
                    }}
                  />
                );
              })}
            </svg>
          ) : null}
        </div>
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_48%,rgba(243,223,161,0.1),transparent_44%),linear-gradient(to_bottom,rgba(0,0,0,0.05),transparent_45%,rgba(0,0,0,0.16))]" />

        {usesLashasPaths && hoveredFloor && (
          <div className="pointer-events-none absolute left-1/2 top-5 z-10 -translate-x-1/2 whitespace-nowrap rounded-full bg-black/85 px-3 py-1.5 text-xs font-medium text-white shadow-lg ring-1 ring-gold/40">
            {dict.apartmentFields.floor} {hoveredFloor}
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
