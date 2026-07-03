import { AURUM_APARTMENTS } from "@/data/buildings/aurum/apartments";

export type ApartmentStatus = "available" | "reserved" | "sold";

export const STATUS_COLORS: Record<ApartmentStatus, string> = {
  available: "#34d399",
  reserved: "#d4af37",
  sold: "#f0554d",
};

export interface Point {
  x: number;
  y: number;
}

export interface Apartment {
  id: string;
  number: string;
  /** 1-based running count across the whole building — used for display. */
  sequence: number;
  floor: number;
  block: "A" | "B";
  rooms: number;
  bathrooms: number;
  /** Total area in m², including balcony when known. */
  area: number;
  /** Living (interior, excluding balcony) area when known. */
  livingArea: number;
  balconyArea: number;
  price: number;
  pricePerM2: number;
  status: ApartmentStatus;
  /** Percentage coordinates (0-100) over the building-specific floor-plan image. */
  polygonPoints: Point[];
  floorPlanImage: string;
  galleryImages: string[];
}

export const BUILDING_TOTAL_FLOORS = 13;
export const TOTAL_FLOORS = 13;

export const APARTMENTS: Apartment[] = AURUM_APARTMENTS;

export function getApartmentById(id: string) {
  return APARTMENTS.find((apartment) => apartment.id === id);
}

export function getApartmentsByFloor(floor: number) {
  return APARTMENTS.filter((apartment) => apartment.floor === floor);
}

export function getSimilarApartments(apartment: Apartment, count = 3) {
  const sameRooms = APARTMENTS.filter(
    (candidate) =>
      candidate.id !== apartment.id &&
      candidate.rooms === apartment.rooms &&
      candidate.status === "available",
  );

  if (sameRooms.length >= count) return sameRooms.slice(0, count);

  const fallback = APARTMENTS.filter(
    (candidate) => candidate.id !== apartment.id && !sameRooms.includes(candidate),
  );

  return [...sameRooms, ...fallback].slice(0, count);
}
