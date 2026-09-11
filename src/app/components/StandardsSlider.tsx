"use client";

import { useState } from "react";
import Image from "next/image";

const images = [
  "/images/1a.jpg",
  "/images/2a.jpg",
  "/images/3a.jpg",
  "/images/4a.jpg",
  "/images/5a.jpg",
  "/images/6a.jpg",
  "/images/7a.jpg",
  "/images/8a.png",
  "/images/9a.jpg",
  "/images/10a.jpg",
  "/images/11a.jpg",
  "/images/12a.jpg",
];

export default function StandardsSlider() {
  const [index, setIndex] = useState(0);
  const total = images.length;

  const next = () => setIndex((prev) => (prev + 1) % total);

  const prev = () =>
    setIndex((prev) => (prev - 1 + total) % total);

  return (
    <div className="flex flex-col items-center">
      
      <div className="relative w-[260px] h-[340px] cursor-pointer">
        {images.map((img, i) => {
          const position = (i - index + total) % total;

          if (position > 2) return null;

          const styles = [
            {
              transform: "translateX(0px) scale(1) rotate(0deg)",
              zIndex: 30,
            },
            {
              transform: "translateX(-18px) scale(0.92) rotate(-3deg)",
              zIndex: 20,
            },
            {
              transform: "translateX(-36px) scale(0.85) rotate(-6deg)",
              zIndex: 10,
            },
          ];

          return (
            <div
              key={i}
              onClick={next}
              className="absolute transition-all duration-500"
              style={styles[position]}
            >
              <div className="relative w-[240px] h-[320px] rounded-2xl overflow-hidden shadow-xl bg-white">
                <Image src={img} alt="tour" fill className="object-cover" />

                {position === 0 && (
                  <div className="absolute bottom-3 right-3 bg-blue-500 text-white text-xs px-2 py-1 rounded-full">
                    تورینو
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* controls */}
      <div className="flex items-center gap-6 mt-4 text-gray-700">

        <button
          onClick={prev}
          className="text-2xl hover:text-green-600 transition"
        >
          ←
        </button>

        <span className="text-sm">
          {index + 1} / {total}
        </span>

        <button
          onClick={next}
          className="text-2xl hover:text-green-600 transition"
        >
          →
        </button>

      </div>
    </div>
  );
}
