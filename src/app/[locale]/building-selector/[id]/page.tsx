import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Bath, BedDouble, Building2, Layers, MessageCircle, Scaling } from "lucide-react";

import { formatArea, formatPrice } from "@/lib/format";
import { isLocale, type Locale } from "@/i18n/config";
import {
  ALL_SAMPLE_APARTMENTS,
  getSampleApartmentById,
} from "@/components/building-selector/sample-data";
import { STATUS_COLORS, STATUS_LABELS } from "@/components/building-selector/types";

export function generateStaticParams() {
  return ALL_SAMPLE_APARTMENTS.map((apartment) => ({ id: apartment.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const apartment = getSampleApartmentById(id);

  if (!apartment) {
    return { title: "ბინა ვერ მოიძებნა" };
  }

  return {
    title: `ბინა #${apartment.number}`,
    description: `სართული ${apartment.floor} · ${apartment.rooms} ოთახი · ${formatArea(apartment.area, "მ²")} · ${formatPrice(apartment.price)}`,
  };
}

export default async function BuildingSelectorApartmentPage({
  params,
}: {
  params: Promise<{ locale: string; id: string }>;
}) {
  const { locale: rawLocale, id } = await params;
  const locale: Locale = isLocale(rawLocale) ? rawLocale : "ka";
  const apartment = getSampleApartmentById(id);

  if (!apartment) {
    notFound();
  }

  const statusColor = STATUS_COLORS[apartment.status];
  const whatsAppText = encodeURIComponent(
    `გამარჩობა, დაინტერესებული ვარ ბინით #${apartment.number} (სართული ${apartment.floor}, ბლოკი ${apartment.block}).`,
  );

  const stats = [
    { icon: <Layers className="h-4 w-4" />, label: "სართული", value: String(apartment.floor) },
    { icon: <Building2 className="h-4 w-4" />, label: "ბლოკი", value: apartment.block },
    { icon: <BedDouble className="h-4 w-4" />, label: "ოთახები", value: String(apartment.rooms) },
    { icon: <Bath className="h-4 w-4" />, label: "სველი წერტილი", value: String(apartment.bathrooms) },
    {
      icon: <Scaling className="h-4 w-4" />,
      label: "საერთო ფართობი",
      value: formatArea(apartment.area, "მ²"),
    },
    {
      icon: <Building2 className="h-4 w-4" />,
      label: "აივნის ფართობი",
      value: formatArea(apartment.balconyArea, "მ²"),
    },
  ];

  return (
    <div className="mx-auto max-w-6xl px-6 py-10">
      <Link
        href={`/${locale}/building-selector`}
        className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-white/60 hover:text-gold-light"
      >
        <ArrowLeft className="h-4 w-4" />
        შენობის სელექტორი
      </Link>

      <div className="mb-3 flex flex-wrap items-center gap-3">
        <h1 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
          ბინა #{apartment.number}
        </h1>
        <span
          className="rounded-full px-3 py-1 text-xs font-semibold"
          style={{ backgroundColor: `${statusColor}26`, color: statusColor }}
        >
          {STATUS_LABELS[apartment.status]}
        </span>
      </div>

      <div className="grid gap-8 lg:grid-cols-[1fr_360px]">
        <div>
          <div className="mb-3 text-sm font-medium text-white/50">ფართობის გეგმა</div>
          <div className="relative mb-8 aspect-[4/3] w-full overflow-hidden rounded-2xl border border-white/10">
            <Image
              src={apartment.floorPlanImage}
              alt={`ბინა #${apartment.number} — ფართობის გეგმა`}
              fill
              sizes="(min-width: 1024px) 700px, 100vw"
              className="object-cover"
              priority
            />
          </div>

          <div className="mb-3 text-sm font-medium text-white/50">გალერეა</div>
          <div className="grid grid-cols-3 gap-3">
            {apartment.galleryImages.map((src, i) => (
              <div
                key={`${src}-${i}`}
                className="relative aspect-square overflow-hidden rounded-xl border border-white/10"
              >
                <Image
                  src={src}
                  alt={`ბინა #${apartment.number} გალერეა ${i + 1}`}
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
            <p className="text-xs text-white/50">ფასი</p>
            <p className="text-3xl font-semibold text-gold-light">{formatPrice(apartment.price)}</p>
            <p className="mt-1 text-xs text-white/40">
              ფასი 1 მ²-ზე: {formatPrice(apartment.pricePerM2)}
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

          <a
            href={`https://wa.me/995500000000?text=${whatsAppText}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 rounded-lg bg-gold px-4 py-3 text-sm font-semibold text-black transition-opacity hover:opacity-90"
          >
            <MessageCircle className="h-4 w-4" />
            დაგვიკავშირდით
          </a>
        </aside>
      </div>
    </div>
  );
}
