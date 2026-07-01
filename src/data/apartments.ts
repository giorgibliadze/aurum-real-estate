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
  /** 1-based running count across the whole building — used for display, e.g. "#8-23". */
  sequence: number;
  floor: number;
  block: "A" | "B";
  rooms: number;
  bathrooms: number;
  /** Total area in m², including balcony. */
  area: number;
  /** Living (interior, excluding balcony) area in m². */
  livingArea: number;
  balconyArea: number;
  price: number;
  pricePerM2: number;
  status: ApartmentStatus;
  /** Percentage coordinates (0-100) over the hero building image — edit freely. */
  polygonPoints: Point[];
  floorPlanImage: string;
  galleryImages: string[];
}

/**
 * Pixel-verified against building-hero.jpg (dark-band + edge detection, not a
 * guess): the real facade shows exactly 9 visible balcony floor rows between
 * the roofline and the ground-floor canopy. Forcing more slices than that
 * would bisect real windows/balconies — see project memory for the analysis.
 */
export const TOTAL_FLOORS = 9;

/**
 * Facade calibration from the hero exterior photo: the residential facade
 * spans x 35%-64%, from y 14.6% (roof line) to y 78.8% (ground floor).
 * Divided into 9 floor bands (one per real balcony row), each split into
 * block A (left) / B (right).
 */
const FACADE_LEFT = 35;
const FACADE_RIGHT = 64;
const FACADE_MID = (FACADE_LEFT + FACADE_RIGHT) / 2;
const FACADE_TOP = 14.6;
const FACADE_BOTTOM = 78.8;
const GAP = 0.4;
const PITCH = (FACADE_BOTTOM - FACADE_TOP) / TOTAL_FLOORS;

function floorBounds(floor: number) {
  const indexFromTop = TOTAL_FLOORS - floor;
  const yTop = FACADE_TOP + indexFromTop * PITCH;
  const yBottom = yTop + PITCH;
  return { yTop, yBottom };
}

function blockPolygon(floor: number, block: "A" | "B"): Point[] {
  const { yTop, yBottom } = floorBounds(floor);
  const isTopFloor = floor === TOTAL_FLOORS;

  const left = block === "A" ? FACADE_LEFT : FACADE_MID + GAP;
  const right = block === "A" ? FACADE_MID - GAP : FACADE_RIGHT;

  // Slight inward taper on the topmost floor to echo the roofline silhouette.
  const topLeft = isTopFloor ? left + 2 : left;
  const topRight = isTopFloor ? right - 1 : right;

  return [
    { x: topLeft, y: yTop },
    { x: topRight, y: yTop },
    { x: right, y: yBottom },
    { x: left, y: yBottom },
  ];
}

const ROOM_BASE_AREA: Record<number, number> = { 1: 48, 2: 65, 3: 88, 4: 120 };

function floorPlanImage(index: number) {
  const n = (index % 41) + 1;
  return `/images/real-estate/floor-plans/layout-${String(n).padStart(2, "0")}.jpg`;
}

function galleryImages(index: number) {
  return [0, 1, 2].map((offset) => floorPlanImage(index + offset));
}

function buildApartments(): Apartment[] {
  const apartments: Apartment[] = [];
  let index = 0;

  for (let floor = 1; floor <= TOTAL_FLOORS; floor++) {
    (["A", "B"] as const).forEach((block) => {
      const rooms = ((floor + (block === "B" ? 2 : 0)) % 4) + 1;
      const bathrooms = rooms >= 3 ? 2 : 1;
      const area = Math.round((ROOM_BASE_AREA[rooms] + (floor % 3) * 2.5) * 10) / 10;
      const balconyArea = Math.round((3.5 + rooms * 1.8) * 10) / 10;
      const livingArea = Math.round((area - balconyArea * 0.6) * 10) / 10;
      const pricePerM2 = Math.round((2100 + floor * 22 + (block === "B" ? 15 : 0)) / 10) * 10;
      const price = Math.round((area * pricePerM2) / 100) * 100;

      const statusCycle = index % 10;
      const status: ApartmentStatus =
        statusCycle === 9 ? "sold" : statusCycle >= 7 ? "reserved" : "available";

      apartments.push({
        id: `floor-${floor}-${block}`,
        number: `${floor}${block === "A" ? "01" : "02"}`,
        sequence: index + 1,
        floor,
        block,
        rooms,
        bathrooms,
        area,
        livingArea,
        balconyArea,
        price,
        pricePerM2,
        status,
        polygonPoints: blockPolygon(floor, block),
        floorPlanImage: floorPlanImage(index),
        galleryImages: galleryImages(index),
      });

      index++;
    });
  }

  return apartments;
}

export const APARTMENTS: Apartment[] = buildApartments();

export const PRICE_BOUNDS: [number, number] = [
  Math.min(...APARTMENTS.map((a) => a.price)),
  Math.max(...APARTMENTS.map((a) => a.price)),
];

export const AREA_BOUNDS: [number, number] = [
  Math.min(...APARTMENTS.map((a) => a.area)),
  Math.max(...APARTMENTS.map((a) => a.area)),
];

export function getApartmentById(id: string): Apartment | undefined {
  return APARTMENTS.find((a) => a.id === id);
}

export function getSimilarApartments(apartment: Apartment, count = 3): Apartment[] {
  const sameRooms = APARTMENTS.filter(
    (a) => a.id !== apartment.id && a.rooms === apartment.rooms,
  );
  if (sameRooms.length >= count) return sameRooms.slice(0, count);

  const fallback = APARTMENTS.filter(
    (a) => a.id !== apartment.id && !sameRooms.includes(a),
  );
  return [...sameRooms, ...fallback].slice(0, count);
}
