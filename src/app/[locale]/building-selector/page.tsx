import type { Metadata } from "next";

import { BuildingSelectorView } from "@/components/building-selector/BuildingSelectorView";
import { isLocale, type Locale } from "@/i18n/config";

export const metadata: Metadata = {
  title: "შენობის სელექტორი",
  description: "ინტერაქტიული შენობის და ბინების სელექტორის დემო გვერდი — ორი სხვადასხვა რეჟიმით.",
};

export default async function BuildingSelectorPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  const locale: Locale = isLocale(rawLocale) ? rawLocale : "ka";

  return <BuildingSelectorView locale={locale} />;
}
