// Mock contact details — replace with the real business contact info.
export const CONTACT_PHONE = "+995 555 12 34 56";
export const CONTACT_EMAIL = "info@aurum.ge";

export const WHATSAPP_NUMBER = CONTACT_PHONE.replace(/[^\d]/g, "");

export function buildWhatsAppLink(message: string) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

export function buildTelLink() {
  return `tel:${CONTACT_PHONE.replace(/\s/g, "")}`;
}

export function buildMailtoLink() {
  return `mailto:${CONTACT_EMAIL}`;
}
