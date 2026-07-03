import { LASHAS_FLOOR_PATHS } from "@/data/lashasFloorPaths";

export const APARTMENTS_SELECTOR_CONFIG = {
  mode: "apartments",
  floorCount: 13,
  floors: Array.from({ length: 13 }, (_, index) => 13 - index),
  image: "/images/real-estate/exterior/lashas-background.svg",
  overlayViewBox: "0 0 210 297",
  overlays: LASHAS_FLOOR_PATHS,
} as const;
