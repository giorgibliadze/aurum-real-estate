export interface Point {
  x: number;
  y: number;
}

export interface ApartmentLayout {
  id: string;
  image: string;
  label: string;
}

export interface BuildingFloor {
  id: string;
  level: number;
  name: string;
  /** SVG polygon points as percentages (0-100) of the hero image's width/height. */
  points: Point[];
  /** Anchor for the hover label / marker, as a percentage of width/height. */
  labelAnchor: Point;
  layouts: ApartmentLayout[];
}
