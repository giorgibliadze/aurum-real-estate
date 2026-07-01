import type { Apartment } from "@/data/apartments";

export function formatPrice(value: number) {
  return `$${value.toLocaleString("en-US")}`;
}

export function formatArea(value: number, unit: string) {
  return `${value} ${unit}`;
}

/** Display-only apartment number, e.g. "#8-23" (floor - running sequence). */
export function formatApartmentNumber(apartment: Pick<Apartment, "floor" | "sequence">) {
  return `#${apartment.floor}-${apartment.sequence}`;
}
