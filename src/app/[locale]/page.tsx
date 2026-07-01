import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { ContactButtons } from "@/components/contact/ContactButtons";
import { ProjectAdvantages } from "@/components/real-estate/ProjectAdvantages";
import { getDictionary } from "@/i18n/get-dictionary";
import { isLocale, type Locale } from "@/i18n/config";
import { BUILDING_IMAGES } from "@/data/buildingImages";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  const locale: Locale = isLocale(rawLocale) ? rawLocale : "ka";
  const dict = await getDictionary(locale);
  const heroImage = BUILDING_IMAGES.find((img) => img.id === "hero") ?? BUILDING_IMAGES[0];
  const previewImages = BUILDING_IMAGES.slice(0, 3);
  const imageLabels: Record<string, string> = dict.buildingImages;

  return (
    <div>
      <section className="relative flex min-h-[85vh] items-end overflow-hidden">
        <Image
          src={heroImage.src}
          alt={dict.selector.imageAlt}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/20" />
        <div className="relative mx-auto w-full max-w-4xl px-6 pb-20 text-center">
          <p className="text-sm font-medium uppercase tracking-[0.3em] text-gold-light">
            {dict.home.heroEyebrow}
          </p>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-6xl">
            {dict.home.heroTitle}
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-lg text-white/70">{dict.home.heroSubtitle}</p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Link
              href={`/${locale}/apartments`}
              className="flex items-center justify-center gap-2 rounded-lg bg-gold px-6 py-3 text-sm font-semibold text-black transition-opacity hover:opacity-90"
            >
              {dict.home.ctaExplore}
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href={`/${locale}/contact`}
              className="flex items-center justify-center gap-2 rounded-lg border border-white/20 px-6 py-3 text-sm font-semibold text-white transition-colors hover:border-gold/50 hover:text-gold-light"
            >
              {dict.home.ctaContact}
            </Link>
          </div>
        </div>
      </section>

      <ProjectAdvantages
        advantages={dict.advantages}
        title={dict.home.advantagesTitle}
        subtitle={dict.home.advantagesSubtitle}
      />

      <section className="mx-auto max-w-6xl px-6 py-16">
        <div className="mb-10 flex flex-col items-center gap-2 text-center">
          <h2 className="text-2xl font-semibold tracking-tight text-white sm:text-3xl">
            {dict.home.galleryTitle}
          </h2>
          <p className="text-white/50">{dict.home.gallerySubtitle}</p>
        </div>
        <div className="grid gap-4 sm:grid-cols-3">
          {previewImages.map((image) => (
            <div
              key={image.id}
              className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-white/10"
            >
              <Image
                src={image.src}
                alt={imageLabels[image.id] ?? image.id}
                fill
                sizes="(min-width: 640px) 33vw, 100vw"
                className="object-cover"
              />
            </div>
          ))}
        </div>
        <div className="mt-8 text-center">
          <Link
            href={`/${locale}/gallery`}
            className="inline-flex items-center gap-2 text-sm font-semibold text-gold-light hover:text-gold"
          >
            {dict.home.galleryCta}
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      <section className="border-t border-white/10 bg-white/[0.02] px-6 py-16">
        <div className="mx-auto max-w-xl text-center">
          <h2 className="text-2xl font-semibold tracking-tight text-white sm:text-3xl">
            {dict.home.contactTeaserTitle}
          </h2>
          <p className="mt-2 text-white/50">{dict.home.contactTeaserSubtitle}</p>
          <div className="mt-6">
            <ContactButtons />
          </div>
        </div>
      </section>
    </div>
  );
}
