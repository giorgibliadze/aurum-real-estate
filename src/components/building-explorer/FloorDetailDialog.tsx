"use client";

import Image from "next/image";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type { BuildingFloor } from "./types";

interface FloorDetailDialogProps {
  floor: BuildingFloor | null;
  onOpenChange: (open: boolean) => void;
}

export function FloorDetailDialog({ floor, onOpenChange }: FloorDetailDialogProps) {
  return (
    <Dialog open={floor !== null} onOpenChange={onOpenChange}>
      {floor && (
        <DialogContent aria-describedby="floor-dialog-description">
          <DialogHeader>
            <DialogTitle>{floor.name}</DialogTitle>
            <DialogDescription id="floor-dialog-description">
              {floor.layouts.length} available layout{floor.layouts.length === 1 ? "" : "s"} on
              this floor
            </DialogDescription>
          </DialogHeader>

          <div className="grid grid-cols-2 gap-4 px-6 pb-6 sm:grid-cols-3">
            {floor.layouts.map((layout) => (
              <figure
                key={layout.id}
                className="group overflow-hidden rounded-xl border border-stone-200 bg-stone-50"
              >
                <div className="relative aspect-square w-full overflow-hidden">
                  <Image
                    src={layout.image}
                    alt={`${layout.label} floor plan`}
                    fill
                    sizes="(min-width: 640px) 220px, 45vw"
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <figcaption className="px-3 py-2 text-xs font-medium text-stone-600">
                  {layout.label}
                </figcaption>
              </figure>
            ))}
          </div>
        </DialogContent>
      )}
    </Dialog>
  );
}
