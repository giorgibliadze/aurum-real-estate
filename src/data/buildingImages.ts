export interface BuildingImage {
  id: string;
  src: string;
}

/**
 * Exterior renders of the actual building (public/images/real-estate/exterior).
 * Labels live in the i18n dictionaries (dict.buildingImages), keyed by id, so
 * they translate — this file only tracks image identity, not display text.
 *
 * The SVG apartment overlay in InteractiveBuilding is calibrated against the
 * "hero" angle — switching to another angle keeps the overlay interactive but
 * it is not pixel-recalibrated per angle (see project memory notes).
 */
export const BUILDING_IMAGES: BuildingImage[] = [
  { id: "hero", src: "/images/real-estate/exterior/lashas-background.svg" },
  { id: "angle1", src: "/images/real-estate/exterior/building-angle-1.jpg" },
  { id: "angle2", src: "/images/real-estate/exterior/building-angle-2.jpg" },
  { id: "angle3", src: "/images/real-estate/exterior/building-angle-3.jpg" },
  { id: "angle4", src: "/images/real-estate/exterior/building-angle-4.jpg" },
];

export const DEFAULT_BUILDING_IMAGE_ID = "hero";
