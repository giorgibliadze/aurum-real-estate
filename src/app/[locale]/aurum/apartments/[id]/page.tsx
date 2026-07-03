import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  BedDouble,
  Building2,
  Layers3,
  MessageCircle,
  Ruler,
  Tag,
} from "lucide-react";

import {
  AURUM_BUILDING_NAME,
  aurumApartmentsData,
  aurumStatusColors,
  getAurumApartmentById,
  getValidatedAurumFloor,
} from "@/data/aurum/apartments";
import { getDictionary } from "@/i18n/get-dictionary";
import { isLocale, LOCALES, type Locale } from "@/i18n/config";
import { buildWhatsAppLink } from "@/lib/constants";
import { formatArea, formatPrice } from "@/lib/format";

type AurumApartmentDetailSearchParams = Promise<{
  floor?: string | string[];
}>;

function apartmentImage(apartment: (typeof aurumApartmentsData)[number]) {
  return apartment.galleryImages[0] ?? apartment.floorPlanImage;
}

function backHref(locale: Locale, floor: number | null) {
  return floor === null
    ? `/${locale}/aurum/apartments`
    : `/${locale}/aurum/apartments?floor=${floor}`;
}

export function generateStaticParams() {
  return LOCALES.flatMap((locale) =>
    aurumApartmentsData.map((apartment) => ({ locale, id: apartment.id })),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; id: string }>;
}): Promise<Metadata> {
  const { locale: rawLocale, id } = await params;
  const locale: Locale = isLocale(rawLocale) ? rawLocale : "ka";
  const dict = await getDictionary(locale);
  const apartment = getAurumApartmentById(id);

  if (!apartment) {
    return { title: dict.apartmentDetail.notFoundTitle };
  }

  return {
    title: `${dict.selector.apartmentWord} №${apartment.number}`,
    description: `${AURUM_BUILDING_NAME} · ${dict.apartmentFields.floor} ${apartment.floor} · ${formatArea(apartment.area, dict.common.areaUnit)}`,
  };
}

export default async function AurumApartmentDetailPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string; id: string }>;
  searchParams: AurumApartmentDetailSearchParams;
}) {
  const [{ locale: rawLocale, id }, resolvedSearchParams] = await Promise.all([
    params,
    searchParams,
  ]);
  const locale: Locale = isLocale(rawLocale) ? rawLocale : "ka";
  const dict = await getDictionary(locale);
  const apartment = getAurumApartmentById(id);

  if (!apartment) {
    notFound();
  }

  const selectedFloor = getValidatedAurumFloor(resolvedSearchParams.floor);
  const statusColor = aurumStatusColors[apartment.status];
  const inquiryMessage = `${AURUM_BUILDING_NAME}: ${dict.selector.apartmentWord} №${apartment.number}, ${dict.apartmentFields.floor} ${apartment.floor}.`;
  const stats = [
    {
      icon: <Layers3 className="h-4 w-4" />,
      label: dict.apartmentFields.floor,
      value: String(apartment.floor),
    },
    {
      icon: <Ruler className="h-4 w-4" />,
      label: dict.apartmentFields.totalArea,
      value: formatArea(apartment.area, dict.common.areaUnit),
    },
    {
      icon: <BedDouble className="h-4 w-4" />,
      label: dict.apartmentFields.rooms,
      value: String(apartment.rooms),
    },
    {
      icon: <Tag className="h-4 w-4" />,
      label: dict.apartmentFields.price,
      value: formatPrice(apartment.price),
    },
  ];

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_50%_0%,rgba(212,175,55,0.08),transparent_34%),linear-gradient(180deg,#090909_0%,#050505_100%)]">
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:py-10">
        <Link
          href={backHref(locale, selectedFloor)}
          className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-white/60 transition-colors hover:text-gold-light"
        >
          <ArrowLeft className="h-4 w-4" />
          {dict.apartmentDetail.back}
        </Link>

        <div className="mb-5 flex flex-wrap items-center gap-3">
          <p className="w-full text-xs font-semibold uppercase tracking-[0.18em] text-gold-light/80">
            {AURUM_BUILDING_NAME}
          </p>
          <h1 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            {dict.selector.apartmentWord} №{apartment.number}
          </h1>
          <span
            className="rounded-full px-3 py-1 text-xs font-semibold"
            style={{ backgroundColor: `${statusColor}26`, color: statusColor }}
          >
            {dict.statuses[apartment.status]}
          </span>
        </div>

        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_360px] lg:items-start">
          <section className="overflow-hidden rounded-xl border border-white/10 bg-black/35 shadow-[0_24px_70px_rgba(0,0,0,0.42)]">
            <div className="relative aspect-[4/3] bg-black sm:aspect-[16/10]">
              <Image
                src={apartmentImage(apartment)}
                alt={`${AURUM_BUILDING_NAME} ${dict.selector.apartmentWord} №${apartment.number}`}
                fill
                priority
                sizes="(min-width: 1024px) 760px, 100vw"
                className="object-cover"
              />
            </div>
          </section>

          <aside className="rounded-xl border border-white/10 bg-black/45 p-5 shadow-[0_24px_70px_rgba(0,0,0,0.42)] backdrop-blur-xl">
            <div className="rounded-xl border border-gold/20 bg-gold/[0.06] p-5">
              <p className="text-xs text-white/50">{dict.apartmentFields.price}</p>
              <p className="mt-1 text-3xl font-semibold text-gold-light">
                {formatPrice(apartment.price)}
              </p>
            </div>

            <dl className="mt-5 grid gap-2">
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="flex items-center justify-between rounded-lg border border-white/10 bg-white/[0.03] px-3 py-3 text-sm"
                >
                  <dt className="flex items-center gap-2 text-white/55">
                    <span className="text-gold-light">{stat.icon}</span>
                    {stat.label}
                  </dt>
                  <dd className="font-semibold text-white">{stat.value}</dd>
                </div>
              ))}
            </dl>

            <div className="mt-5 rounded-xl border border-white/10 bg-white/[0.025] p-4">
              <div className="mb-2 flex items-center gap-2 text-sm font-semibold text-white">
                <Building2 className="h-4 w-4 text-gold-light" />
                {AURUM_BUILDING_NAME}
              </div>
              <p className="text-sm leading-6 text-white/55">
                {dict.selector.apartmentWord} №{apartment.number} is a bright Aurum
                Residences apartment with a functional layout, generous living area,
                and direct access to the building team for availability details.
              </p>
            </div>

            <div className="mt-5 flex flex-col gap-2">
              <a
                href={buildWhatsAppLink(inquiryMessage)}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 rounded-lg bg-gold px-4 py-3 text-sm font-semibold text-black transition-opacity hover:opacity-90"
              >
                <MessageCircle className="h-4 w-4" />
                {dict.detailsCard.contact}
              </a>
              <Link
                href={backHref(locale, selectedFloor)}
                className="flex items-center justify-center gap-2 rounded-lg border border-white/15 px-4 py-3 text-sm font-semibold text-white transition-colors hover:border-gold/50 hover:text-gold-light"
              >
                <ArrowLeft className="h-4 w-4" />
                {dict.apartmentDetail.back}
              </Link>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
