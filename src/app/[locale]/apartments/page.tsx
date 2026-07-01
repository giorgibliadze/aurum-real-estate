import type { Metadata } from "next";

import { ApartmentsView } from "@/components/real-estate/ApartmentsView";
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
    title: dict.apartmentsPage.title,
    description: dict.apartmentsPage.subtitle,
  };
}

export default function ApartmentsPage() {
  return <ApartmentsView />;
}
