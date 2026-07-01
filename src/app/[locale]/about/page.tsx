import type { Metadata } from "next";
import Image from "next/image";

import { ProjectAdvantages } from "@/components/real-estate/ProjectAdvantages";
import { getDictionary } from "@/i18n/get-dictionary";
import { isLocale, type Locale } from "@/i18n/config";
import { BUILDING_IMAGES } from "@/data/buildingImages";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale: Locale = isLocale(rawLocale) ? rawLocale : "ka";
  const dict = await getDictionary(locale);

  return {
    title: dict.about.title,
    description: dict.about.subtitle,
  };
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  const locale: Locale = isLocale(rawLocale) ? rawLocale : "ka";
  const dict = await getDictionary(locale);
  const imageLabels: Record<string, string> = dict.buildingImages;

  return (
    <div>
      <section className="mx-auto max-w-3xl px-6 pb-10 pt-14 text-center">
        <h1 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
          {dict.about.title}
        </h1>
        <p className="mt-3 text-white/50">{dict.about.subtitle}</p>
      </section>

      <section className="mx-auto max-w-3xl px-6 pb-14">
        <div className="flex flex-col gap-4 text-white/70">
          {dict.about.paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-16">
        <h2 className="mb-6 text-center text-2xl font-semibold tracking-tight text-white sm:text-3xl">
          {dict.about.galleryTitle}
        </h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {BUILDING_IMAGES.map((image) => (
            <div
              key={image.id}
              className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-white/10"
            >
              <Image
                src={image.src}
                alt={imageLabels[image.id] ?? image.id}
                fill
                sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                className="object-cover"
              />
            </div>
          ))}
        </div>
      </section>

      <ProjectAdvantages
        advantages={dict.advantages}
        title={dict.home.advantagesTitle}
        subtitle={dict.home.advantagesSubtitle}
      />
    </div>
  );
}
