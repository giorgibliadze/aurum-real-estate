"use client";

import { Maximize, Minimize, Minus, Plus, RotateCcw } from "lucide-react";

import { useI18n } from "@/i18n/context";

interface BuildingControlsProps {
  zoom: number;
  minZoom: number;
  maxZoom: number;
  onZoomIn: () => void;
  onZoomOut: () => void;
  onReset: () => void;
  isFullscreen: boolean;
  onToggleFullscreen: () => void;
}

export function BuildingControls({
  zoom,
  minZoom,
  maxZoom,
  onZoomIn,
  onZoomOut,
  onReset,
  isFullscreen,
  onToggleFullscreen,
}: BuildingControlsProps) {
  const { dict } = useI18n();

  return (
    <div className="flex items-center justify-center">
      <div className="inline-flex items-center gap-1 rounded-full border border-white/10 bg-black/70 px-1.5 py-1.5 shadow-[0_12px_34px_rgba(0,0,0,0.38)] backdrop-blur-xl">
        <button
          type="button"
          onClick={onReset}
          className="flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium text-white/80 transition-colors hover:bg-white/10 hover:text-gold-light"
        >
          <RotateCcw className="h-3.5 w-3.5" />
          {dict.buildingControls.rotate}
        </button>

        <span className="h-4 w-px bg-white/10" />

        <span className="flex items-center gap-1.5 px-2 text-xs font-medium text-white/50">
          {dict.buildingControls.zoomLabel}
        </span>
        <button
          type="button"
          onClick={onZoomOut}
          disabled={zoom <= minZoom}
          aria-label={dict.buildingControls.zoomOut}
          className="rounded-full p-1.5 text-white/80 transition-colors hover:bg-white/10 hover:text-gold-light disabled:opacity-30"
        >
          <Minus className="h-3.5 w-3.5" />
        </button>
        <button
          type="button"
          onClick={onZoomIn}
          disabled={zoom >= maxZoom}
          aria-label={dict.buildingControls.zoomIn}
          className="rounded-full p-1.5 text-white/80 transition-colors hover:bg-white/10 hover:text-gold-light disabled:opacity-30"
        >
          <Plus className="h-3.5 w-3.5" />
        </button>

        <span className="h-4 w-px bg-white/10" />

        <button
          type="button"
          onClick={onToggleFullscreen}
          className="flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium text-white/80 transition-colors hover:bg-white/10 hover:text-gold-light"
        >
          {isFullscreen ? (
            <Minimize className="h-3.5 w-3.5" />
          ) : (
            <Maximize className="h-3.5 w-3.5" />
          )}
          {isFullscreen ? dict.buildingControls.exitFullscreen : dict.buildingControls.fullscreen}
        </button>
      </div>
    </div>
  );
}
