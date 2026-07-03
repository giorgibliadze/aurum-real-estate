import type { Apartment, Point } from "@/data/apartments";
import { getAurumApartmentImage } from "./images";

type UnitSeed = {
  suffix: string;
  area: number;
  polygon: Point[];
  rooms?: number;
};

const DEFAULT_PRICE_PER_M2 = 0;

function rect(x: number, y: number, width: number, height: number): Point[] {
  return [
    { x, y },
    { x: x + width, y },
    { x: x + width, y: y + height },
    { x, y: y + height },
  ];
}

function roomsFromArea(area: number) {
  if (area >= 95) return 4;
  if (area >= 68) return 3;
  if (area >= 48) return 2;
  return 1;
}

const FLOOR_1_UNITS: UnitSeed[] = [
  { suffix: "01", area: 191.7, rooms: 4, polygon: rect(35, 16.5, 18, 13) },
  { suffix: "02", area: 45.0, rooms: 1, polygon: rect(49, 34, 13, 9) },
  { suffix: "03", area: 187.2, rooms: 4, polygon: rect(47, 47, 15, 21) },
];

const FLOOR_2_UNITS: UnitSeed[] = [
  { suffix: "01", area: 132.8, rooms: 4, polygon: rect(34, 17, 13, 14) },
  { suffix: "02", area: 82.6, rooms: 3, polygon: rect(54, 16, 12, 12) },
  { suffix: "03", area: 58.0, rooms: 2, polygon: rect(44, 33, 10, 8.5) },
  { suffix: "04", area: 40.5, rooms: 1, polygon: rect(42, 41.5, 9, 7.5) },
  { suffix: "05", area: 36.9, rooms: 1, polygon: rect(42.5, 49, 8.5, 6.8) },
  { suffix: "06", area: 54.6, rooms: 2, polygon: rect(49, 53.5, 8.2, 8) },
  { suffix: "07", area: 51.3, rooms: 2, polygon: rect(38.5, 53.5, 8.8, 9) },
  { suffix: "08", area: 48.0, rooms: 2, polygon: rect(52, 45.5, 8.5, 8) },
];

const FLOOR_3_UNITS: UnitSeed[] = [
  { suffix: "01", area: 71.5, rooms: 3, polygon: rect(34, 16.5, 11, 11) },
  { suffix: "02", area: 50.2, rooms: 2, polygon: rect(45.5, 15.5, 6, 9.5) },
  { suffix: "04", area: 77.0, rooms: 3, polygon: rect(52, 15.5, 13, 10.5) },
  { suffix: "05", area: 73.0, rooms: 3, polygon: rect(34, 28, 11, 10) },
  { suffix: "06", area: 58.1, rooms: 2, polygon: rect(45, 32, 10.5, 8.5) },
  { suffix: "08", area: 40.4, rooms: 1, polygon: rect(42.5, 40.5, 8.5, 7.5) },
  { suffix: "10", area: 37.1, rooms: 1, polygon: rect(43, 48, 8.5, 7) },
  { suffix: "09", area: 55.1, rooms: 2, polygon: rect(50.5, 45.5, 7.8, 8.2) },
  { suffix: "11", area: 51.4, rooms: 2, polygon: rect(38.5, 54, 9, 8) },
  { suffix: "12", area: 49.0, rooms: 2, polygon: rect(49, 54, 8.5, 8) },
];

const TYPICAL_UNITS: UnitSeed[] = [
  { suffix: "01", area: 72.1, rooms: 3, polygon: rect(34, 16.5, 11, 10.5) },
  { suffix: "02", area: 50.2, rooms: 2, polygon: rect(45.5, 15.5, 6, 9.5) },
  { suffix: "04", area: 77.7, rooms: 3, polygon: rect(52, 15.5, 13, 10.5) },
  { suffix: "05", area: 73.8, rooms: 3, polygon: rect(34, 28, 11, 10) },
  { suffix: "06", area: 58.1, rooms: 2, polygon: rect(45, 32, 10.5, 8.5) },
  { suffix: "08", area: 40.4, rooms: 1, polygon: rect(42.5, 40.5, 8.5, 7.5) },
  { suffix: "10", area: 37.1, rooms: 1, polygon: rect(43, 48, 8.5, 7) },
  { suffix: "09", area: 55.2, rooms: 2, polygon: rect(50.5, 45.5, 7.8, 8.2) },
  { suffix: "11", area: 51.5, rooms: 2, polygon: rect(38.5, 54, 9, 8) },
  { suffix: "12", area: 49.0, rooms: 2, polygon: rect(49, 54, 8.5, 8) },
];

function unitSeedsForFloor(floor: number) {
  if (floor === 1) return FLOOR_1_UNITS;
  if (floor === 2) return FLOOR_2_UNITS;
  if (floor === 3) return FLOOR_3_UNITS;
  return TYPICAL_UNITS;
}

function buildAurumApartments(): Apartment[] {
  const apartments: Apartment[] = [];

  for (let floor = 1; floor <= 13; floor++) {
    unitSeedsForFloor(floor).forEach((unit, unitIndex) => {
      const rooms = unit.rooms ?? roomsFromArea(unit.area);
      const balconyArea = Math.round(Math.max(0, unit.area * 0.08) * 10) / 10;
      const livingArea = Math.round((unit.area - balconyArea) * 10) / 10;
      const sequence = apartments.length + 1;
      const apartmentImage = getAurumApartmentImage(sequence);

      apartments.push({
        id: `aurum-f${floor}-${unit.suffix}`,
        number: `${floor}${unit.suffix}`,
        sequence,
        floor,
        block: unitIndex % 2 === 0 ? "A" : "B",
        rooms,
        bathrooms: rooms >= 3 ? 2 : 1,
        area: unit.area,
        livingArea,
        balconyArea,
        price: 0,
        pricePerM2: DEFAULT_PRICE_PER_M2,
        status: "available",
        polygonPoints: unit.polygon,
        floorPlanImage: apartmentImage,
        galleryImages: [apartmentImage],
      });

    });
  }

  return apartments;
}

export const AURUM_APARTMENTS = buildAurumApartments();

export function getAurumApartmentsByFloor(floor: number) {
  return AURUM_APARTMENTS.filter((apartment) => apartment.floor === floor);
}
