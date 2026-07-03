import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { ContactButtons } from "@/components/contact/ContactButtons";
import { ProjectAdvantages } from "@/components/real-estate/ProjectAdvantages";
import { getDictionary } from "@/i18n/get-dictionary";
import { isLocale, type Locale } from "@/i18n/config";
import { BUILDING_IMAGES } from "@/data/buildingImages";

const HOME_HERO_IMAGE = "/images/real-estate/exterior/home-hero-building.png";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  const locale: Locale = isLocale(rawLocale) ? rawLocale : "ka";
  const dict = await getDictionary(locale);
  const previewImages = [
    { id: "homeHero", src: HOME_HERO_IMAGE },
    ...BUILDING_IMAGES.filter((image) => image.src.endsWith(".jpg")).slice(0, 2),
  ];
  const imageLabels: Record<string, string> = dict.buildingImages;

  return (
    <div>
      <section className="relative flex min-h-[calc(100svh-4.5rem)] items-end overflow-hidden">
        <Image
          src={HOME_HERO_IMAGE}
          alt={dict.selector.imageAlt}
          fill
          priority
          sizes="100vw"
          className="object-cover object-[52%_center]"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(0,0,0,0.88)_0%,rgba(0,0,0,0.58)_36%,rgba(0,0,0,0.16)_68%,rgba(0,0,0,0.34)_100%)]" />
        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black via-black/30 to-transparent" />

        <div className="relative mx-auto flex w-full max-w-7xl flex-col gap-10 px-6 pb-10 pt-32 sm:pb-14 lg:pb-16">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-gold-light sm:text-sm">
              {dict.home.heroEyebrow}
            </p>
            <h1 className="mt-5 text-4xl font-semibold leading-[1.05] tracking-tight text-white sm:text-6xl lg:text-7xl">
              {dict.home.heroTitle}
            </h1>
            <p className="mt-6 max-w-xl text-base leading-7 text-white/72 sm:text-lg">
              {dict.home.heroSubtitle}
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link
                href={`/${locale}/apartments`}
                className="inline-flex items-center justify-center gap-2 rounded-md bg-gold px-6 py-3 text-sm font-semibold text-black shadow-[0_14px_40px_rgba(212,175,55,0.28)] transition-opacity hover:opacity-90"
              >
                {dict.home.ctaExplore}
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href={`/${locale}/contact`}
                className="inline-flex items-center justify-center gap-2 rounded-md border border-white/25 bg-black/20 px-6 py-3 text-sm font-semibold text-white backdrop-blur-sm transition-colors hover:border-gold/60 hover:text-gold-light"
              >
                {dict.home.ctaContact}
              </Link>
            </div>
          </div>

          <div className="grid max-w-2xl grid-cols-3 divide-x divide-white/10 border-y border-white/10 bg-black/28 text-white backdrop-blur-md">
            <div className="px-4 py-4">
              <p className="text-2xl font-semibold text-white">9</p>
              <p className="mt-1 text-xs uppercase tracking-[0.18em] text-white/45">
                {dict.home.heroStats.floors}
              </p>
            </div>
            <div className="px-4 py-4">
              <p className="text-2xl font-semibold text-white">18</p>
              <p className="mt-1 text-xs uppercase tracking-[0.18em] text-white/45">
                {dict.home.heroStats.apartments}
              </p>
            </div>
            <div className="px-4 py-4">
              <p className="text-2xl font-semibold text-white">24/7</p>
              <p className="mt-1 text-xs uppercase tracking-[0.18em] text-white/45">
                {dict.home.heroStats.support}
              </p>
            </div>
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
                alt={imageLabels[image.id] ?? dict.selector.imageAlt}
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
