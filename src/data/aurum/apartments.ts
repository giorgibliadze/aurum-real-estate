import { AURUM_APARTMENTS } from "@/data/buildings/aurum/apartments";
import { AURUM_APARTMENT_IMAGES } from "@/data/buildings/aurum/images";

export const AURUM_BUILDING_ID = "aurum";
export const AURUM_BUILDING_NAME = "Aurum Residences";

export const aurumApartmentImages = AURUM_APARTMENT_IMAGES;
export const aurumApartmentsData = AURUM_APARTMENTS;
export const aurumFloorFilters = Array.from({ length: 13 }, (_, index) => 13 - index);

export type AurumApartment = (typeof aurumApartmentsData)[number];
export type AurumApartmentStatus = AurumApartment["status"];

export const aurumStatusColors: Record<AurumApartmentStatus, string> = {
  available: "#34d399",
  reserved: "#d4af37",
  sold: "#f0554d",
};

export function getAurumApartmentById(id: string) {
  return aurumApartmentsData.find((apartment) => apartment.id === id);
}

export function getValidatedAurumFloor(floorParam: string | string[] | undefined) {
  const value = Array.isArray(floorParam) ? floorParam[0] : floorParam;
  if (!value) return null;

  const floor = Number(value);
  return Number.isInteger(floor) && aurumFloorFilters.includes(floor) ? floor : null;
}
