import type { PolygonArea, SampleApartment } from "./types";

export const BUILDING_IMAGE_MODE_1 =
  "/images/building-selector/building-view-1.png";
export const BUILDING_IMAGE_MODE_2 =
  "/images/building-selector/building-view-2.png";
const BUILDING_SELECTOR_GALLERY_IMAGES = [
  BUILDING_IMAGE_MODE_1,
  BUILDING_IMAGE_MODE_2,
  "/images/building-selector/building-view-3.png",
  "/images/building-selector/building-view-4.png",
];

export const MODE_1_FLOOR_COUNT = 9;

// Overlay coordinates are percentages in the SVG viewBox="0 0 100 100".
// Edit these from exported SVG/Figma/Inkscape polygons so facade perspective stays exact.
export const MODE_1_FLOOR_POLYGONS: PolygonArea[] = [
  {
    id: "floor-9",
    label: "სართული 9",
    floor: 9,
    points: [
      { x: 19.2, y: 18.8 },
      { x: 76.9, y: 18.2 },
      { x: 78.1, y: 25.1 },
      { x: 16.7, y: 25.4 },
    ],
  },
  {
    id: "floor-8",
    label: "სართული 8",
    floor: 8,
    points: [
      { x: 16.7, y: 25.4 },
      { x: 78.1, y: 25.1 },
      { x: 79.0, y: 31.8 },
      { x: 15.2, y: 32.0 },
    ],
  },
  {
    id: "floor-7",
    label: "სართული 7",
    floor: 7,
    points: [
      { x: 15.2, y: 32.0 },
      { x: 79.0, y: 31.8 },
      { x: 79.3, y: 38.7 },
      { x: 14.5, y: 38.9 },
    ],
  },
  {
    id: "floor-6",
    label: "სართული 6",
    floor: 6,
    points: [
      { x: 14.5, y: 38.9 },
      { x: 79.3, y: 38.7 },
      { x: 79.8, y: 45.7 },
      { x: 14.1, y: 45.8 },
    ],
  },
  {
    id: "floor-5",
    label: "სართული 5",
    floor: 5,
    points: [
      { x: 14.1, y: 45.8 },
      { x: 79.8, y: 45.7 },
      { x: 80.0, y: 52.8 },
      { x: 14.2, y: 52.9 },
    ],
  },
  {
    id: "floor-4",
    label: "სართული 4",
    floor: 4,
    points: [
      { x: 14.2, y: 52.9 },
      { x: 80.0, y: 52.8 },
      { x: 80.4, y: 60.0 },
      { x: 14.3, y: 60.1 },
    ],
  },
  {
    id: "floor-3",
    label: "სართული 3",
    floor: 3,
    points: [
      { x: 14.3, y: 60.1 },
      { x: 80.4, y: 60.0 },
      { x: 80.9, y: 68.0 },
      { x: 14.1, y: 68.1 },
    ],
  },
  {
    id: "floor-2",
    label: "სართული 2",
    floor: 2,
    points: [
      { x: 14.1, y: 68.1 },
      { x: 80.9, y: 68.0 },
      { x: 81.5, y: 76.2 },
      { x: 14.0, y: 76.5 },
    ],
  },
  {
    id: "floor-1",
    label: "სართული 1",
    floor: 1,
    points: [
      { x: 14.0, y: 76.5 },
      { x: 81.5, y: 76.2 },
      { x: 80.8, y: 82.8 },
      { x: 13.3, y: 82.7 },
    ],
  },
];

const FLOOR_POLYGON_BY_FLOOR = new Map(
  MODE_1_FLOOR_POLYGONS.map((polygon) => [polygon.floor, polygon]),
);

export function floorBandY(floor: number): { top: number; bottom: number } {
  const points = FLOOR_POLYGON_BY_FLOOR.get(floor)?.points;
  return { top: points?.[0]?.y ?? 0, bottom: points?.[2]?.y ?? 0 };
}

const ROOM_BASE_AREA: Record<number, number> = { 1: 45, 2: 65.2, 3: 75.5, 4: 90 };
const BLOCKS_MODE_1 = ["A", "B", "C", "D"] as const;

function floorPlanImage(index: number) {
  const n = (index % 41) + 1;
  return `/images/real-estate/floor-plans/layout-${String(n).padStart(2, "0")}.jpg`;
}

function galleryImages(index: number) {
  return [0, 1, 2].map(
    (offset) => BUILDING_SELECTOR_GALLERY_IMAGES[(index + offset) % BUILDING_SELECTOR_GALLERY_IMAGES.length],
  );
}

function buildMode1Apartments(): SampleApartment[] {
  const apartments: SampleApartment[] = [];
  let index = 0;
  let sequence = 20; // matches the reference's "#8-23" style numbering

  for (let floor = MODE_1_FLOOR_COUNT; floor >= 1; floor--) {
    BLOCKS_MODE_1.forEach((block, blockIndex) => {
      sequence += 1;
      const rooms = ((floor + blockIndex) % 4) + 1;
      const bathrooms = rooms >= 3 ? 2 : 1;
      const area = Math.round((ROOM_BASE_AREA[rooms] - blockIndex * 3.2) * 10) / 10;
      const balconyArea = Math.round((3 + rooms * 1.5) * 10) / 10;
      const pricePerM2 = Math.round((1550 + floor * 18 + blockIndex * 12) / 10) * 10;
      const price = Math.round((area * pricePerM2) / 100) * 100;

      const statusCycle = index % 9;
      const status =
        statusCycle === 8 ? "sold" : statusCycle >= 6 ? "reserved" : ("available" as const);

      apartments.push({
        id: `m1-f${floor}-${block}`,
        number: `${floor}-${sequence}`,
        floor,
        block,
        rooms,
        bathrooms,
        area,
        balconyArea,
        price,
        pricePerM2,
        status,
        floorPlanImage: floorPlanImage(index),
        galleryImages: galleryImages(index),
      });

      index++;
    });
  }

  return apartments;
}

export const MODE_1_APARTMENTS: SampleApartment[] = buildMode1Apartments();

// Direct-mode apartment polygons are percentage coordinates in viewBox="0 0 100 100".
// Replace these with exported SVG/Figma/Inkscape polygons when real apartment outlines are available.
type ApartmentPolygonSeed = Omit<PolygonArea, "apartmentId" | "block" | "label" | "status"> & {
  apartmentId: string;
  bayIndex: number;
  block: string;
};

const MODE_2_APARTMENT_POLYGON_SEEDS: ApartmentPolygonSeed[] = [
  { id: "m2-f9-A", apartmentId: "m2-f9-A", floor: 9, block: "A", bayIndex: 0, points: [{ x: 12.2, y: 20.5 }, { x: 27.6, y: 20.2 }, { x: 28.5, y: 27.2 }, { x: 11.4, y: 27.7 }] },
  { id: "m2-f9-B", apartmentId: "m2-f9-B", floor: 9, block: "B", bayIndex: 1, points: [{ x: 30.1, y: 20.1 }, { x: 44.4, y: 20.0 }, { x: 44.9, y: 27.1 }, { x: 29.7, y: 27.4 }] },
  { id: "m2-f9-C", apartmentId: "m2-f9-C", floor: 9, block: "C", bayIndex: 2, points: [{ x: 55.4, y: 20.0 }, { x: 69.8, y: 20.2 }, { x: 70.1, y: 27.3 }, { x: 54.9, y: 27.1 }] },
  { id: "m2-f9-D", apartmentId: "m2-f9-D", floor: 9, block: "D", bayIndex: 3, points: [{ x: 72.2, y: 20.2 }, { x: 87.7, y: 20.6 }, { x: 88.6, y: 27.8 }, { x: 71.5, y: 27.2 }] },

  { id: "m2-f8-A", apartmentId: "m2-f8-A", floor: 8, block: "A", bayIndex: 0, points: [{ x: 11.4, y: 28.0 }, { x: 28.5, y: 27.5 }, { x: 28.8, y: 34.6 }, { x: 11.2, y: 35.0 }] },
  { id: "m2-f8-B", apartmentId: "m2-f8-B", floor: 8, block: "B", bayIndex: 1, points: [{ x: 29.7, y: 27.7 }, { x: 44.9, y: 27.5 }, { x: 45.1, y: 34.5 }, { x: 29.6, y: 34.7 }] },
  { id: "m2-f8-C", apartmentId: "m2-f8-C", floor: 8, block: "C", bayIndex: 2, points: [{ x: 54.9, y: 27.5 }, { x: 70.1, y: 27.7 }, { x: 70.2, y: 34.8 }, { x: 54.8, y: 34.6 }] },
  { id: "m2-f8-D", apartmentId: "m2-f8-D", floor: 8, block: "D", bayIndex: 3, points: [{ x: 71.5, y: 27.6 }, { x: 88.6, y: 28.1 }, { x: 88.9, y: 35.2 }, { x: 71.4, y: 34.7 }] },

  { id: "m2-f7-A", apartmentId: "m2-f7-A", floor: 7, block: "A", bayIndex: 0, points: [{ x: 11.2, y: 35.3 }, { x: 28.8, y: 34.9 }, { x: 29.0, y: 42.0 }, { x: 11.0, y: 42.5 }] },
  { id: "m2-f7-B", apartmentId: "m2-f7-B", floor: 7, block: "B", bayIndex: 1, points: [{ x: 29.6, y: 35.0 }, { x: 45.1, y: 34.8 }, { x: 45.3, y: 42.0 }, { x: 29.7, y: 42.2 }] },
  { id: "m2-f7-C", apartmentId: "m2-f7-C", floor: 7, block: "C", bayIndex: 2, points: [{ x: 54.8, y: 34.8 }, { x: 70.2, y: 35.0 }, { x: 70.3, y: 42.2 }, { x: 54.7, y: 42.0 }] },
  { id: "m2-f7-D", apartmentId: "m2-f7-D", floor: 7, block: "D", bayIndex: 3, points: [{ x: 71.4, y: 35.0 }, { x: 88.9, y: 35.5 }, { x: 89.2, y: 42.7 }, { x: 71.3, y: 42.2 }] },

  { id: "m2-f6-A", apartmentId: "m2-f6-A", floor: 6, block: "A", bayIndex: 0, points: [{ x: 11.0, y: 42.8 }, { x: 29.0, y: 42.3 }, { x: 29.2, y: 49.5 }, { x: 10.9, y: 50.0 }] },
  { id: "m2-f6-B", apartmentId: "m2-f6-B", floor: 6, block: "B", bayIndex: 1, points: [{ x: 29.7, y: 42.5 }, { x: 45.3, y: 42.3 }, { x: 45.5, y: 49.5 }, { x: 29.7, y: 49.7 }] },
  { id: "m2-f6-C", apartmentId: "m2-f6-C", floor: 6, block: "C", bayIndex: 2, points: [{ x: 54.7, y: 42.3 }, { x: 70.3, y: 42.5 }, { x: 70.3, y: 49.7 }, { x: 54.6, y: 49.5 }] },
  { id: "m2-f6-D", apartmentId: "m2-f6-D", floor: 6, block: "D", bayIndex: 3, points: [{ x: 71.3, y: 42.5 }, { x: 89.2, y: 43.0 }, { x: 89.3, y: 50.2 }, { x: 71.2, y: 49.7 }] },

  { id: "m2-f5-A", apartmentId: "m2-f5-A", floor: 5, block: "A", bayIndex: 0, points: [{ x: 10.9, y: 50.3 }, { x: 29.2, y: 49.9 }, { x: 29.3, y: 56.9 }, { x: 10.8, y: 57.4 }] },
  { id: "m2-f5-B", apartmentId: "m2-f5-B", floor: 5, block: "B", bayIndex: 1, points: [{ x: 29.7, y: 50.1 }, { x: 45.5, y: 49.9 }, { x: 45.6, y: 56.9 }, { x: 29.7, y: 57.1 }] },
  { id: "m2-f5-C", apartmentId: "m2-f5-C", floor: 5, block: "C", bayIndex: 2, points: [{ x: 54.6, y: 49.9 }, { x: 70.3, y: 50.1 }, { x: 70.3, y: 57.1 }, { x: 54.5, y: 56.9 }] },
  { id: "m2-f5-D", apartmentId: "m2-f5-D", floor: 5, block: "D", bayIndex: 3, points: [{ x: 71.2, y: 50.1 }, { x: 89.3, y: 50.5 }, { x: 89.5, y: 57.7 }, { x: 71.1, y: 57.1 }] },

  { id: "m2-f4-A", apartmentId: "m2-f4-A", floor: 4, block: "A", bayIndex: 0, points: [{ x: 10.8, y: 57.7 }, { x: 29.3, y: 57.3 }, { x: 29.4, y: 64.3 }, { x: 10.7, y: 64.8 }] },
  { id: "m2-f4-B", apartmentId: "m2-f4-B", floor: 4, block: "B", bayIndex: 1, points: [{ x: 29.7, y: 57.5 }, { x: 45.6, y: 57.3 }, { x: 45.7, y: 64.3 }, { x: 29.8, y: 64.5 }] },
  { id: "m2-f4-C", apartmentId: "m2-f4-C", floor: 4, block: "C", bayIndex: 2, points: [{ x: 54.5, y: 57.3 }, { x: 70.3, y: 57.5 }, { x: 70.3, y: 64.5 }, { x: 54.4, y: 64.3 }] },
  { id: "m2-f4-D", apartmentId: "m2-f4-D", floor: 4, block: "D", bayIndex: 3, points: [{ x: 71.1, y: 57.5 }, { x: 89.5, y: 58.0 }, { x: 89.6, y: 65.1 }, { x: 71.0, y: 64.5 }] },

  { id: "m2-f3-A", apartmentId: "m2-f3-A", floor: 3, block: "A", bayIndex: 0, points: [{ x: 10.7, y: 65.0 }, { x: 29.4, y: 64.7 }, { x: 29.4, y: 71.4 }, { x: 10.6, y: 71.9 }] },
  { id: "m2-f3-B", apartmentId: "m2-f3-B", floor: 3, block: "B", bayIndex: 1, points: [{ x: 29.8, y: 64.9 }, { x: 45.7, y: 64.7 }, { x: 45.8, y: 71.4 }, { x: 29.8, y: 71.6 }] },
  { id: "m2-f3-C", apartmentId: "m2-f3-C", floor: 3, block: "C", bayIndex: 2, points: [{ x: 54.4, y: 64.7 }, { x: 70.3, y: 64.9 }, { x: 70.3, y: 71.6 }, { x: 54.4, y: 71.4 }] },
  { id: "m2-f3-D", apartmentId: "m2-f3-D", floor: 3, block: "D", bayIndex: 3, points: [{ x: 71.0, y: 64.9 }, { x: 89.6, y: 65.3 }, { x: 89.8, y: 72.2 }, { x: 70.9, y: 71.6 }] },

  { id: "m2-f2-A", apartmentId: "m2-f2-A", floor: 2, block: "A", bayIndex: 0, points: [{ x: 10.6, y: 72.3 }, { x: 29.4, y: 71.8 }, { x: 29.5, y: 78.1 }, { x: 10.5, y: 78.7 }] },
  { id: "m2-f2-B", apartmentId: "m2-f2-B", floor: 2, block: "B", bayIndex: 1, points: [{ x: 29.8, y: 72.0 }, { x: 45.8, y: 71.8 }, { x: 45.8, y: 78.1 }, { x: 29.8, y: 78.3 }] },
  { id: "m2-f2-C", apartmentId: "m2-f2-C", floor: 2, block: "C", bayIndex: 2, points: [{ x: 54.4, y: 71.8 }, { x: 70.3, y: 72.0 }, { x: 70.3, y: 78.3 }, { x: 54.3, y: 78.1 }] },
  { id: "m2-f2-D", apartmentId: "m2-f2-D", floor: 2, block: "D", bayIndex: 3, points: [{ x: 70.9, y: 72.0 }, { x: 89.8, y: 72.5 }, { x: 89.9, y: 78.9 }, { x: 70.8, y: 78.3 }] },

  { id: "m2-f1-A", apartmentId: "m2-f1-A", floor: 1, block: "A", bayIndex: 0, points: [{ x: 10.5, y: 79.0 }, { x: 29.5, y: 78.5 }, { x: 29.4, y: 84.7 }, { x: 10.6, y: 85.1 }] },
  { id: "m2-f1-B", apartmentId: "m2-f1-B", floor: 1, block: "B", bayIndex: 1, points: [{ x: 29.8, y: 78.7 }, { x: 45.8, y: 78.5 }, { x: 45.7, y: 84.6 }, { x: 29.8, y: 84.8 }] },
  { id: "m2-f1-C", apartmentId: "m2-f1-C", floor: 1, block: "C", bayIndex: 2, points: [{ x: 54.3, y: 78.5 }, { x: 70.3, y: 78.7 }, { x: 70.2, y: 84.8 }, { x: 54.4, y: 84.6 }] },
  { id: "m2-f1-D", apartmentId: "m2-f1-D", floor: 1, block: "D", bayIndex: 3, points: [{ x: 70.8, y: 78.7 }, { x: 89.9, y: 79.2 }, { x: 89.8, y: 85.2 }, { x: 70.8, y: 84.8 }] },
];

function buildMode2Apartments(): SampleApartment[] {
  const apartments: SampleApartment[] = [];
  let index = 100;

  MODE_2_APARTMENT_POLYGON_SEEDS.forEach((polygonSeed) => {
    const floor = polygonSeed.floor;
    const bayIndex = polygonSeed.bayIndex;
    const rooms = ((floor + bayIndex) % 4) + 1;
    const bathrooms = rooms >= 3 ? 2 : 1;
    const area = Math.round((ROOM_BASE_AREA[rooms] + (floor % 3) * 2) * 10) / 10;
    const balconyArea = Math.round((3 + rooms * 1.6) * 10) / 10;
    const pricePerM2 = Math.round((1600 + floor * 20 + bayIndex * 15) / 10) * 10;
    const price = Math.round((area * pricePerM2) / 100) * 100;

    const statusCycle = index % 7;
    const status =
      statusCycle === 6 ? "sold" : statusCycle >= 4 ? "reserved" : ("available" as const);

    apartments.push({
      id: polygonSeed.apartmentId,
      number: `${floor}-${String(bayIndex + 1).padStart(2, "0")}`,
      floor,
      block: polygonSeed.block,
      rooms,
      bathrooms,
      area,
      balconyArea,
      price,
      pricePerM2,
      status,
      floorPlanImage: floorPlanImage(index),
      galleryImages: galleryImages(index),
    });

    index++;
  });

  return apartments;
}

export const MODE_2_APARTMENTS: SampleApartment[] = buildMode2Apartments();

const MODE_2_APARTMENT_BY_ID = new Map(
  MODE_2_APARTMENTS.map((apartment) => [apartment.id, apartment]),
);

export const MODE_2_APARTMENT_POLYGONS: PolygonArea[] = MODE_2_APARTMENT_POLYGON_SEEDS.map(
  (polygonSeed) => {
    const apartment = polygonSeed.apartmentId
      ? MODE_2_APARTMENT_BY_ID.get(polygonSeed.apartmentId)
      : undefined;

    return {
      id: polygonSeed.id,
      apartmentId: polygonSeed.apartmentId,
      block: polygonSeed.block,
      floor: polygonSeed.floor,
      label: apartment ? `ბინა #${apartment.number}` : polygonSeed.id,
      points: polygonSeed.points,
      status: apartment?.status,
    };
  },
);

export const ALL_SAMPLE_APARTMENTS: SampleApartment[] = [
  ...MODE_1_APARTMENTS,
  ...MODE_2_APARTMENTS,
];

export function getSampleApartmentById(id: string): SampleApartment | undefined {
  return ALL_SAMPLE_APARTMENTS.find((a) => a.id === id);
}

export const MODE_1_PRICE_BOUNDS: [number, number] = [
  Math.min(...MODE_1_APARTMENTS.map((a) => a.price)),
  Math.max(...MODE_1_APARTMENTS.map((a) => a.price)),
];

export const MODE_1_AREA_BOUNDS: [number, number] = [
  Math.min(...MODE_1_APARTMENTS.map((a) => a.area)),
  Math.max(...MODE_1_APARTMENTS.map((a) => a.area)),
];

export const MODE_2_PRICE_BOUNDS: [number, number] = [
  Math.min(...MODE_2_APARTMENTS.map((a) => a.price)),
  Math.max(...MODE_2_APARTMENTS.map((a) => a.price)),
];

export const MODE_2_AREA_BOUNDS: [number, number] = [
  Math.min(...MODE_2_APARTMENTS.map((a) => a.area)),
  Math.max(...MODE_2_APARTMENTS.map((a) => a.area)),
];
