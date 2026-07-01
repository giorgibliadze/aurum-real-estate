export type SampleStatus = "available" | "reserved" | "sold";

export interface PolygonPoint {
  x: number;
  y: number;
}

export interface PolygonArea {
  id: string;
  label: string;
  floor: number;
  block?: string;
  apartmentId?: string;
  status?: SampleStatus;
  points: PolygonPoint[];
}

export interface SampleApartment {
  id: string;
  number: string;
  floor: number;
  block: string;
  rooms: number;
  bathrooms: number;
  area: number;
  balconyArea: number;
  price: number;
  pricePerM2: number;
  status: SampleStatus;
  floorPlanImage: string;
  galleryImages: string[];
}

export const STATUS_COLORS: Record<SampleStatus, string> = {
  available: "#34d399",
  reserved: "#d4af37",
  sold: "#f0554d",
};

export const STATUS_LABELS: Record<SampleStatus, string> = {
  available: "თავისუფალი",
  reserved: "დაჯავშნილი",
  sold: "გაყიდული",
};
