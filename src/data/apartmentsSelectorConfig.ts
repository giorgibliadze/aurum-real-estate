import { LASHAS_FLOOR_PATHS } from "@/data/lashasFloorPaths";

export const apartmentsFloors = Array.from({ length: 13 }, (_, index) => 13 - index);
export const apartmentsPolygons = [...LASHAS_FLOOR_PATHS].sort((a, b) => b.floor - a.floor);

export const APARTMENTS_SELECTOR_CONFIG = {
  mode: "apartments",
  floorCount: 13,
  floors: apartmentsFloors,
  images: [
    {
      id: "მთავარი ხედი",
      src: "/images/real-estate/apartments/lashasupdated.svg",
    },
  ],
  image: "/images/real-estate/apartments/lashasupdated.svg",
  overlayViewBox: "-70.253563 -6.578321 391.68002 302.11429",
  viewerClassName: "mx-auto aspect-[391.68002/302.11429] w-full max-w-[1180px]",
  overlays: apartmentsPolygons,
} as const;
