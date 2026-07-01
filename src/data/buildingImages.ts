export interface BuildingImage {
  id: string;
  src: string;
  label: string;
}

/**
 * Exterior renders of the actual building (public/images/real-estate/exterior).
 * The SVG apartment overlay in InteractiveBuilding is calibrated against the
 * "hero" angle — switching to another angle keeps the overlay interactive but
 * it is not pixel-recalibrated per angle (see building-explorer memory notes).
 */
export const BUILDING_IMAGES: BuildingImage[] = [
  {
    id: "hero",
    src: "/images/real-estate/exterior/building-hero.jpg",
    label: "მთავარი ხედი",
  },
  {
    id: "angle-1",
    src: "/images/real-estate/exterior/building-angle-1.jpg",
    label: "ხედი 1",
  },
  {
    id: "angle-2",
    src: "/images/real-estate/exterior/building-angle-2.jpg",
    label: "ხედი 2",
  },
  {
    id: "angle-3",
    src: "/images/real-estate/exterior/building-angle-3.jpg",
    label: "ხედი 3",
  },
  {
    id: "angle-4",
    src: "/images/real-estate/exterior/building-angle-4.jpg",
    label: "ხედი 4",
  },
];

export const DEFAULT_BUILDING_IMAGE_ID = "hero";
