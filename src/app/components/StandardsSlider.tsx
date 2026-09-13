"use client";

import { useState } from "react";
import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import api from "@/app/core/config/api";

// تایپ مطابق با JSON واقعی سرور
export interface TourItem {
  id: string;
  title: string;
  image: string;
  price?: number;
  availableSeats?: number;
  fleetVehicle?: string;
}

const getTourImages = async (): Promise<{ id: string; image: string; title: string }[]> => {
  const { data } = await api.get<TourItem[]>("/tour");

  // استخراج تصاویر معتبر همراه با عنوان و id
  return data
    .filter((tour) => Boolean(tour.image))
    .map((tour) => ({
      id: tour.id,
      image: tour.image,
      title: tour.title,
    }));
};

export default function StandardsSlider() {
  const [index, setIndex] = useState(0);

  const {
    data: tourImages = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["tour-slider-images"],
    queryFn: getTourImages,
    staleTime: 5 * 60 * 1000,
  });

  const total = tourImages.length;

  const next = () => {
    if (total === 0) return;
    setIndex((prev) => (prev + 1) % total);
  };

  const prev = () => {
    if (total === 0) return;
    setIndex((prev) => (prev - 1 + total) % total);
  };

  if (isLoading) {
    return (
      <div className="flex h-[360px] items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-green-500 border-t-transparent"></div>
      </div>
    );
  }

  if (isError || total === 0) {
    return (
      <div className="flex h-[360px] items-center justify-center">
        <p className="text-sm text-gray-500">تصویری از سرور دریافت نشد.</p>
      </div>
    );
  }

  const safeIndex = index % total;

  return (
    <div className="flex flex-col items-center">
      {/* کارت‌های ۳ بعدی اسلایدر */}
      <div className="relative h-[340px] w-[260px] cursor-pointer">
        {tourImages.map((item, i) => {
          const position = (i - safeIndex + total) % total;

          // فقط ۳ کارت اول نمایش داده می‌شوند
          if (position > 2) return null;

          const styles = [
            {
              transform: "translateX(0px) scale(1) rotate(0deg)",
              zIndex: 30,
              opacity: 1,
            },
            {
              transform: "translateX(-18px) scale(0.92) rotate(-3deg)",
              zIndex: 20,
              opacity: 0.9,
            },
            {
              transform: "translateX(-36px) scale(0.85) rotate(-6deg)",
              zIndex: 10,
              opacity: 0.8,
            },
          ];

          return (
            <div
              key={item.id || i}
              onClick={next}
              className="absolute transition-all duration-500 ease-in-out"
              style={styles[position]}
            >
              <div className="relative h-[320px] w-[240px] overflow-hidden rounded-2xl bg-white shadow-xl border border-gray-100">
                <Image
                  src={item.image}
                  alt={item.title || "عکس تور"}
                  fill
                  sizes="240px"
                  className="object-cover"
                  priority={position === 0}
                />

                {position === 0 && (
                  <div className="absolute bottom-3 right-3 rounded-full bg-green-600/90 backdrop-blur-md px-3 py-1 text-xs font-semibold text-white shadow-md">
                    {item.title}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* دکمه‌های کنترل اسلایدر */}
      <div className="mt-4 flex items-center gap-6 text-gray-700 font-semibold select-none">
        <button
          type="button"
          onClick={prev}
          aria-label="قبلی"
          className="text-2xl transition hover:text-green-600 active:scale-95"
        >
          →
        </button>

        <span className="text-sm dir-ltr">
          {safeIndex + 1} / {total}
        </span>

        <button
          type="button"
          onClick={next}
          aria-label="بعدی"
          className="text-2xl transition hover:text-green-600 active:scale-95"
        >
          ←
        </button>
      </div>
    </div>
  );
}


