import type { Metadata } from "next";

import { GalleryView } from "@/components/real-estate/GalleryView";
import { getDictionary } from "@/i18n/get-dictionary";
import { isLocale, type Locale } from "@/i18n/config";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale: Locale = isLocale(rawLocale) ? rawLocale : "ka";
  const dict = await getDictionary(locale);

  return {
    title: dict.gallery.title,
    description: dict.gallery.subtitle,
  };
}

export default function GalleryPage() {
  return <GalleryView />;
}
