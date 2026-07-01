"use client";

import Image from "next/image";
import { useState } from "react";

import { Dialog, DialogContent } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { useI18n } from "@/i18n/context";
import { BUILDING_IMAGES } from "@/data/buildingImages";

const FLOOR_PLAN_COUNT = 41;
const FLOOR_PLAN_IMAGES = Array.from(
  { length: FLOOR_PLAN_COUNT },
  (_, i) => `/images/real-estate/floor-plans/layout-${String(i + 1).padStart(2, "0")}.jpg`,
);

type Tab = "exterior" | "floorPlans";

export function GalleryView() {
  const { dict } = useI18n();
  const [tab, setTab] = useState<Tab>("exterior");
  const [lightbox, setLightbox] = useState<string | null>(null);

  const imageLabels: Record<string, string> = dict.buildingImages;
  const images =
    tab === "exterior" ? BUILDING_IMAGES.map((img) => img.src) : FLOOR_PLAN_IMAGES;

  return (
    <div className="mx-auto max-w-6xl px-6 py-14">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
          {dict.gallery.title}
        </h1>
        <p className="mt-2 text-white/50">{dict.gallery.subtitle}</p>
      </div>

      <div className="mb-8 flex justify-center gap-2">
        {(["exterior", "floorPlans"] as Tab[]).map((t) => (
          <button
            key={t}
            type="button"
            aria-pressed={tab === t}
            onClick={() => setTab(t)}
            className={cn(
              "rounded-full border px-4 py-2 text-sm font-medium transition-colors",
              tab === t
                ? "border-gold bg-gold/15 text-gold-light"
                : "border-white/10 text-white/60 hover:border-gold/40 hover:text-white",
            )}
          >
            {t === "exterior" ? dict.gallery.tabExterior : dict.gallery.tabFloorPlans}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
        {images.map((src, i) => (
          <button
            key={src}
            type="button"
            onClick={() => setLightbox(src)}
            className="relative aspect-square overflow-hidden rounded-xl border border-white/10 transition-opacity hover:opacity-80"
          >
            <Image
              src={src}
              alt={tab === "exterior" ? (imageLabels[BUILDING_IMAGES[i]?.id] ?? src) : `${dict.gallery.tabFloorPlans} ${i + 1}`}
              fill
              sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
              className="object-cover"
            />
          </button>
        ))}
      </div>

      <Dialog open={lightbox !== null} onOpenChange={(open) => !open && setLightbox(null)}>
        {lightbox && (
          <DialogContent className="max-w-3xl bg-black" hideClose={false}>
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl">
              <Image src={lightbox} alt="" fill sizes="800px" className="object-contain" />
            </div>
          </DialogContent>
        )}
      </Dialog>
    </div>
  );
}
