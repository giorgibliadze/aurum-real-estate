import type { BuildingFloor } from "./types";

export const HERO_IMAGE = "/images/real-estate/exterior/building-hero.jpg";

export const GALLERY_IMAGES = [
  "/images/real-estate/exterior/building-angle-1.jpg",
  "/images/real-estate/exterior/building-angle-2.jpg",
  "/images/real-estate/exterior/building-angle-3.jpg",
  "/images/real-estate/exterior/building-angle-4.jpg",
];

const FLOOR_PLAN_PATH = (n: number) =>
  `/images/real-estate/floor-plans/layout-${String(n).padStart(2, "0")}.jpg`;

/**
 * Facade coordinates below were calibrated against building-hero.jpg via
 * pixel-level edge/dark-band detection (not eyeballed): the residential
 * facade sits at x 35%-64%, floor pitch is ~7.16% of image height, and the
 * topmost floor tapers slightly to match the roof silhouette.
 */
const RESIDENTIAL_TOP = 14.6;
const FLOOR_PITCH = 7.156;
const FACADE_LEFT = 35;
const FACADE_RIGHT = 64;

function floorBounds(level: number) {
  // level 1 = lowest residential floor, level 9 = topmost
  const indexFromTop = 9 - level;
  const yTop = RESIDENTIAL_TOP + indexFromTop * FLOOR_PITCH;
  const yBottom = yTop + FLOOR_PITCH;
  return { yTop, yBottom };
}

function makeLayouts(start: number, end: number, level: number) {
  const layouts = [];
  for (let n = start; n <= end; n++) {
    layouts.push({
      id: `layout-${n}`,
      image: FLOOR_PLAN_PATH(n),
      label: `Layout ${String.fromCharCode(65 + (n - start))} · Floor ${level}`,
    });
  }
  return layouts;
}

const LAYOUT_RANGES: Record<number, [number, number]> = {
  1: [1, 5],
  2: [6, 9],
  3: [10, 14],
  4: [15, 18],
  5: [19, 23],
  6: [24, 27],
  7: [28, 32],
  8: [33, 36],
  9: [37, 41],
};

export const BUILDING_FLOORS: BuildingFloor[] = Array.from({ length: 9 }, (_, i) => {
  const level = i + 1;
  const { yTop, yBottom } = floorBounds(level);
  const isTopFloor = level === 9;

  const topLeft = isTopFloor ? FACADE_LEFT + 3 : FACADE_LEFT;
  const topRight = isTopFloor ? FACADE_RIGHT - 1 : FACADE_RIGHT;

  const [start, end] = LAYOUT_RANGES[level];

  return {
    id: `floor-${level}`,
    level,
    name: `Floor ${level}`,
    points: [
      { x: topLeft, y: yTop },
      { x: topRight, y: yTop },
      { x: FACADE_RIGHT, y: yBottom },
      { x: FACADE_LEFT, y: yBottom },
    ],
    labelAnchor: {
      x: (topLeft + topRight + FACADE_RIGHT + FACADE_LEFT) / 4,
      y: (yTop + yBottom) / 2,
    },
    layouts: makeLayouts(start, end, level),
  };
}).reverse(); // top floor first, for natural top-to-bottom rendering order

export const GROUND_FLOOR: BuildingFloor = {
  id: "floor-ground",
  level: 0,
  name: "Lobby & Retail",
  points: [
    { x: 33, y: 79.0 },
    { x: 66, y: 79.0 },
    { x: 66, y: 87.0 },
    { x: 33, y: 87.0 },
  ],
  labelAnchor: { x: 49.5, y: 83 },
  layouts: [],
};
