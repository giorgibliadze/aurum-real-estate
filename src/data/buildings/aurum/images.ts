const AURUM_APARTMENT_IMAGE_BASE = "/images/real-estate/aurum/apartment-images";

export const AURUM_APARTMENT_IMAGES = [
  "viber_image_2025-05-04_22-06-45-187.jpg",
  "viber_image_2025-05-04_22-06-45-577.jpg",
  "viber_image_2025-05-04_22-06-45-922.jpg",
  "viber_image_2025-05-04_22-06-46-265.jpg",
  "viber_image_2025-05-04_22-06-46-900.jpg",
  "viber_image_2025-05-04_22-06-47-187.jpg",
  "viber_image_2025-05-04_22-06-47-705.jpg",
  "viber_image_2025-05-04_22-06-48-066.jpg",
  "viber_image_2025-05-04_22-06-48-462.jpg",
  "viber_image_2025-05-04_22-06-48-885.jpg",
  "viber_image_2025-05-04_22-06-49-321.jpg",
  "viber_image_2025-05-04_22-06-49-666.jpg",
  "viber_image_2025-05-04_22-06-50-025.jpg",
  "viber_image_2025-05-04_22-06-50-396.jpg",
  "viber_image_2025-05-04_22-06-50-747.jpg",
  "viber_image_2025-05-04_22-06-51-106.jpg",
  "viber_image_2025-05-04_22-06-51-487.jpg",
  "viber_image_2025-05-04_22-06-51-850.jpg",
  "viber_image_2025-05-04_22-06-52-200.jpg",
  "viber_image_2025-05-04_22-06-52-570.jpg",
  "viber_image_2025-05-04_22-07-23-902.jpg",
  "viber_image_2025-05-04_22-07-24-256.jpg",
  "viber_image_2025-05-04_22-07-25-292.jpg",
  "viber_image_2025-05-04_22-07-25-689.jpg",
  "viber_image_2025-05-04_22-07-26-078.jpg",
  "viber_image_2025-05-04_22-07-26-360.jpg",
  "viber_image_2025-05-04_22-07-26-619.jpg",
  "viber_image_2025-05-04_22-07-27-047.jpg",
  "viber_image_2025-05-04_22-07-27-338.jpg",
  "viber_image_2025-05-04_22-07-27-659.jpg",
  "viber_image_2025-05-04_22-07-27-967.jpg",
  "viber_image_2025-05-04_22-07-28-344.jpg",
  "viber_image_2025-05-04_22-07-28-697.jpg",
  "viber_image_2025-05-04_22-07-29-072.jpg",
  "viber_image_2025-05-04_22-09-24-553.jpg",
  "viber_image_2025-05-04_22-09-24-583.jpg",
  "viber_image_2025-05-04_22-09-24-608.jpg",
  "viber_image_2025-05-04_22-09-25-266.jpg",
  "viber_image_2025-05-04_22-09-25-295.jpg",
  "viber_image_2025-05-04_22-09-25-350.jpg",
  "viber_image_2025-05-04_22-09-25-403.jpg",
].map((fileName) => `${AURUM_APARTMENT_IMAGE_BASE}/${fileName}`);

/**
 * Temporary mapping: uploaded file names do not include apartment numbers, so
 * one representative image is assigned deterministically by apartment sequence.
 * Edit this helper when exact apartment/photo pairings are provided.
 */
export function getAurumApartmentImage(sequence: number) {
  return AURUM_APARTMENT_IMAGES[(sequence - 1) % AURUM_APARTMENT_IMAGES.length];
}
