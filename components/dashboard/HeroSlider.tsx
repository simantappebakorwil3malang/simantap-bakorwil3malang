// components/dashboard/HeroSlider.tsx
"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

interface Banner {
  imageUrl: string;
  title: string;
}

export default function HeroSlider({ banners }: { banners: Banner[] }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-slide setiap 5 detik
  useEffect(() => {
    if (banners.length <= 1) return; // Tidak perlu auto-slide jika gambar hanya 1

    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % banners.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [banners.length]);

  // Fallback jika tidak ada data banner sama sekali dari Google Sheets
  if (!banners || banners.length === 0) {
    return (
      <div className="relative h-64 lg:h-full bg-slate-200">
        <Image 
          src="/Bakorwil.jpeg" 
          alt="Bakorwil III Malang"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-linier-to-t from-black/60 to-transparent flex items-end p-6">
          <span className="text-white font-medium text-sm md:text-base drop-shadow-md">
            Bakorwil III Malang
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="relative h-64 lg:h-full w-full bg-slate-800 overflow-hidden group">
      {banners.map((banner, index) => (
        <div 
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            index === currentIndex ? "opacity-100" : "opacity-0"
          }`}
        >
          <Image 
            src={banner.imageUrl} 
            alt={banner.title || "Kegiatan Bakorwil"}
            fill
            className="object-cover"
            priority={index === 0}
          />
          <div className="absolute inset-0 bg-linier-to-t from-black/70 via-black/20 to-transparent flex items-end p-6">
            <span className="text-white font-medium text-sm md:text-base drop-shadow-lg">
              {banner.title}
            </span>
          </div>
        </div>
      ))}

      {/* Indikator Titik (Dots) di bagian bawah */}
      {banners.length > 1 && (
        <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-2">
          {banners.map((_, index) => (
            <div 
              key={index} 
              className={`h-1.5 rounded-full transition-all duration-300 ${
                index === currentIndex ? "w-6 bg-blue-500" : "w-2 bg-white/50"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}