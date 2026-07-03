import type { Metadata } from "next";

import { AurumApartmentsListing } from "@/components/aurum/AurumApartmentsListing";
import { getValidatedAurumFloor } from "@/data/aurum/apartments";
import { getDictionary } from "@/i18n/get-dictionary";
import { isLocale, type Locale } from "@/i18n/config";

type AurumApartmentsSearchParams = Promise<{
  floor?: string | string[];
}>;

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

export default async function AurumApartmentsPage({
  searchParams,
}: {
  searchParams: AurumApartmentsSearchParams;
}) {
  const resolvedSearchParams = await searchParams;
  const initialFloor = getValidatedAurumFloor(resolvedSearchParams.floor);

  return <AurumApartmentsListing initialFloor={initialFloor} />;
}
