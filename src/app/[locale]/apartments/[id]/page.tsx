import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Bath, BedDouble, Building2, Layers, Ruler } from "lucide-react";

import { ContactForm } from "@/components/contact/ContactForm";
import { ApartmentDetailCTAs } from "@/components/real-estate/ApartmentDetailCTAs";
import { ProjectAdvantages } from "@/components/real-estate/ProjectAdvantages";
import { SimilarApartments } from "@/components/real-estate/SimilarApartments";
import { formatApartmentNumber, formatArea, formatPrice } from "@/lib/format";
import { getDictionary } from "@/i18n/get-dictionary";
import { isLocale, LOCALES, type Locale } from "@/i18n/config";
import {
  APARTMENTS,
  getApartmentById,
  getSimilarApartments,
  STATUS_COLORS,
} from "@/data/apartments";

export function generateStaticParams() {
  return LOCALES.flatMap((locale) =>
    APARTMENTS.map((apartment) => ({ locale, id: apartment.id })),
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
  const apartment = getApartmentById(id);

  if (!apartment) {
    return { title: dict.apartmentDetail.notFoundTitle };
  }

  return {
    title: `${dict.selector.apartmentWord} ${formatApartmentNumber(apartment)}`,
    description: `${dict.apartmentFields.floor} ${apartment.floor} · ${apartment.rooms} ${dict.apartmentFields.rooms} · ${formatArea(apartment.area, dict.common.areaUnit)} · ${formatPrice(apartment.price)}`,
  };
}

export default async function ApartmentDetailPage({
  params,
}: {
  params: Promise<{ locale: string; id: string }>;
}) {
  const { locale: rawLocale, id } = await params;
  const locale: Locale = isLocale(rawLocale) ? rawLocale : "ka";
  const dict = await getDictionary(locale);
  const apartment = getApartmentById(id);

  if (!apartment) {
    notFound();
  }

  const statusColor = STATUS_COLORS[apartment.status];
  const similar = getSimilarApartments(apartment, 3);
  const inquiryMessage = `${dict.selector.apartmentWord} ${formatApartmentNumber(apartment)} — ${dict.apartmentDetail.contactTitle}`;

  const stats = [
    { icon: <Layers className="h-4 w-4" />, label: dict.apartmentFields.floor, value: String(apartment.floor) },
    { icon: <Building2 className="h-4 w-4" />, label: dict.apartmentFields.block, value: apartment.block },
    { icon: <BedDouble className="h-4 w-4" />, label: dict.apartmentFields.rooms, value: String(apartment.rooms) },
    { icon: <Bath className="h-4 w-4" />, label: dict.apartmentFields.bathrooms, value: String(apartment.bathrooms) },
    {
      icon: <Ruler className="h-4 w-4" />,
      label: dict.apartmentFields.totalArea,
      value: formatArea(apartment.area, dict.common.areaUnit),
    },
    {
      icon: <Ruler className="h-4 w-4" />,
      label: dict.apartmentFields.livingArea,
      value: formatArea(apartment.livingArea, dict.common.areaUnit),
    },
    {
      icon: <Ruler className="h-4 w-4" />,
      label: dict.apartmentFields.balconyArea,
      value: formatArea(apartment.balconyArea, dict.common.areaUnit),
    },
  ];

  return (
    <div className="mx-auto max-w-6xl px-6 py-10">
      <Link
        href={`/${locale}/apartments`}
        className="no-print mb-6 inline-flex items-center gap-2 text-sm font-medium text-white/60 hover:text-gold-light"
      >
        <ArrowLeft className="h-4 w-4" />
        {dict.apartmentDetail.back}
      </Link>

      <div className="mb-3 flex flex-wrap items-center gap-3">
        <h1 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
          {dict.selector.apartmentWord} {formatApartmentNumber(apartment)}
        </h1>
        <span
          className="rounded-full px-3 py-1 text-xs font-semibold"
          style={{ backgroundColor: `${statusColor}26`, color: statusColor }}
        >
          {dict.statuses[apartment.status]}
        </span>
      </div>

      <div className="grid gap-8 lg:grid-cols-[1fr_360px]">
        <div>
          <div className="mb-3 flex items-center gap-2 text-sm font-medium text-white/50">
            <Ruler className="h-4 w-4" />
            {dict.apartmentDetail.floorPlanTitle}
          </div>
          <div className="relative mb-8 aspect-[4/3] w-full overflow-hidden rounded-2xl border border-white/10">
            <Image
              src={apartment.floorPlanImage}
              alt={`${dict.selector.apartmentWord} ${formatApartmentNumber(apartment)} — ${dict.apartmentDetail.floorPlanTitle}`}
              fill
              sizes="(min-width: 1024px) 700px, 100vw"
              className="object-cover"
              priority
            />
          </div>

          <div className="mb-3 text-sm font-medium text-white/50">
            {dict.apartmentDetail.galleryTitle}
          </div>
          <div className="grid grid-cols-3 gap-3">
            {apartment.galleryImages.map((src, i) => (
              <div
                key={`${src}-${i}`}
                className="relative aspect-square overflow-hidden rounded-xl border border-white/10"
              >
                <Image
                  src={src}
                  alt={`${dict.selector.apartmentWord} ${formatApartmentNumber(apartment)} ${dict.apartmentDetail.galleryTitle} ${i + 1}`}
                  fill
                  sizes="200px"
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        </div>

        <aside className="flex flex-col gap-5">
          <div className="rounded-2xl border border-gold/20 bg-gold/[0.06] p-5">
            <p className="text-xs text-white/50">{dict.apartmentFields.price}</p>
            <p className="text-3xl font-semibold text-gold-light">
              {formatPrice(apartment.price)}
            </p>
            <p className="mt-1 text-xs text-white/40">
              {dict.apartmentFields.pricePerM2}: {formatPrice(apartment.pricePerM2)}
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="flex items-center justify-between border-b border-white/5 py-2.5 text-sm last:border-0"
              >
                <span className="flex items-center gap-2 text-white/50">
                  {stat.icon}
                  {stat.label}
                </span>
                <span className="font-medium text-white">{stat.value}</span>
              </div>
            ))}
          </div>

          <ApartmentDetailCTAs apartment={apartment} />
        </aside>
      </div>

      <div className="no-print">
        <ProjectAdvantages
          advantages={dict.advantages}
          title={dict.apartmentDetail.advantagesTitle}
        />

        <SimilarApartments apartments={similar} title={dict.apartmentDetail.similarTitle} />

        <section id="inquiry" className="mx-auto max-w-xl py-16">
          <h2 className="mb-6 text-2xl font-semibold tracking-tight text-white sm:text-3xl">
            {dict.apartmentDetail.contactTitle}
          </h2>
          <ContactForm defaultMessage={inquiryMessage} />
        </section>
      </div>
    </div>
  );
}
