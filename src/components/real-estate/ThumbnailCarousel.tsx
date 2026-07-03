"use client";

import Image from "next/image";

import { cn } from "@/lib/utils";
import { useI18n } from "@/i18n/context";
import type { BuildingImage } from "@/data/buildingImages";

interface ThumbnailCarouselProps {
  images: readonly BuildingImage[];
  activeId: string;
  onSelect: (id: string) => void;
}

export function ThumbnailCarousel({ images, activeId, onSelect }: ThumbnailCarouselProps) {
  const { dict } = useI18n();
  const labels: Record<string, string> = dict.buildingImages;

  return (
    <div className="flex justify-center gap-3 overflow-x-auto px-1 py-1 gold-scroll">
      {images.map((image) => {
        const isActive = image.id === activeId;
        const label = labels[image.id] ?? image.id;
        return (
          <button
            key={image.id}
            type="button"
            aria-pressed={isActive}
            onClick={() => onSelect(image.id)}
            className={cn(
              "relative h-16 w-28 shrink-0 overflow-hidden rounded-lg border transition-all",
              isActive
                ? "border-gold shadow-[0_0_18px_rgba(212,175,55,0.48)]"
                : "border-white/10 opacity-70 hover:border-gold/35 hover:opacity-100",
            )}
          >
            <Image
              src={image.src}
              alt={label}
              fill
              unoptimized={image.src.endsWith(".svg")}
              sizes="112px"
              className="object-cover"
            />
            <span className="absolute inset-x-0 bottom-0 bg-black/60 px-1.5 py-0.5 text-[10px] font-medium text-white">
              {label}
            </span>
          </button>
        );
      })}
    </div>
  );
}
