"use client";

import Image from "next/image";
import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import { GALLERY_IMAGES } from "@/components/building-explorer/building-data";

export function ExteriorGallery() {
  return (
    <div className="mx-auto w-full max-w-4xl">
      <Swiper
        modules={[Navigation, Pagination]}
        navigation
        pagination={{ clickable: true }}
        spaceBetween={16}
        slidesPerView={1}
        className="aurum-gallery overflow-hidden rounded-2xl"
      >
        {GALLERY_IMAGES.map((src, i) => (
          <SwiperSlide key={src}>
            <div className="relative aspect-video w-full">
              <Image
                src={src}
                alt={`Aurum Residences exterior view ${i + 1}`}
                fill
                sizes="(min-width: 1024px) 960px, 100vw"
                className="object-cover"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
