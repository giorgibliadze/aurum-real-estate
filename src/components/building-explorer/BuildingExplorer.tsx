"use client";

import Image from "next/image";
import { useState } from "react";

import { cn } from "@/lib/utils";
import { BUILDING_FLOORS, GROUND_FLOOR, HERO_IMAGE } from "./building-data";
import { FloorDetailDialog } from "./FloorDetailDialog";
import type { BuildingFloor, Point } from "./types";

function toPolygonPoints(points: Point[]) {
  return points.map((p) => `${p.x},${p.y}`).join(" ");
}

export function BuildingExplorer() {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [selectedFloor, setSelectedFloor] = useState<BuildingFloor | null>(null);

  const hoveredFloor = BUILDING_FLOORS.find((f) => f.id === hoveredId);

  return (
    <div className="mx-auto w-full max-w-4xl">
      <div className="relative aspect-video w-full overflow-hidden rounded-2xl bg-stone-900 shadow-xl ring-1 ring-stone-900/10">
        <Image
          src={HERO_IMAGE}
          alt="Aurum Residences — exterior view of the building facade"
          fill
          priority
          sizes="(min-width: 1024px) 960px, 100vw"
          className="object-cover"
        />

        <svg
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          className="absolute inset-0 h-full w-full"
        >
          <polygon
            points={toPolygonPoints(GROUND_FLOOR.points)}
            className="fill-white/0 stroke-white/25"
            strokeWidth={0.15}
            vectorEffect="non-scaling-stroke"
          />

          {BUILDING_FLOORS.map((floor) => {
            const isHovered = hoveredId === floor.id;
            return (
              <polygon
                key={floor.id}
                points={toPolygonPoints(floor.points)}
                role="button"
                tabIndex={0}
                aria-label={`View layouts on ${floor.name}`}
                onMouseEnter={() => setHoveredId(floor.id)}
                onMouseLeave={() => setHoveredId((id) => (id === floor.id ? null : id))}
                onFocus={() => setHoveredId(floor.id)}
                onBlur={() => setHoveredId((id) => (id === floor.id ? null : id))}
                onClick={() => setSelectedFloor(floor)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    setSelectedFloor(floor);
                  }
                }}
                className={cn(
                  "cursor-pointer stroke-amber-300/70 outline-none transition-[fill,opacity] duration-150",
                  isHovered ? "fill-amber-400/30" : "fill-transparent",
                )}
                strokeWidth={isHovered ? 0.3 : 0}
                vectorEffect="non-scaling-stroke"
              />
            );
          })}
        </svg>

        {hoveredFloor && (
          <div
            className="pointer-events-none absolute z-10 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap rounded-full bg-stone-900/90 px-3 py-1 text-xs font-medium text-white shadow-lg"
            style={{
              left: `${hoveredFloor.labelAnchor.x}%`,
              top: `${hoveredFloor.labelAnchor.y}%`,
            }}
          >
            {hoveredFloor.name} · {hoveredFloor.layouts.length} layouts
          </div>
        )}
      </div>

      <p className="mt-3 text-center text-sm text-stone-500">
        Hover or tab through the facade, then select a floor to preview its available layouts.
      </p>

      <FloorDetailDialog
        floor={selectedFloor}
        onOpenChange={(open) => {
          if (!open) setSelectedFloor(null);
        }}
      />
    </div>
  );
}
