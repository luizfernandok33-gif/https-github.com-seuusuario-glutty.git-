"use client";
import Link from "next/link";
import Image from "next/image";
import { Star, MapPin, Heart } from "lucide-react";
import { useState } from "react";
import SafetyBadge from "./SafetyBadge";
import { localizeRestaurant } from "@/lib/data";
import type { Restaurant, SafetyLevel } from "@/lib/data";
import { useLanguage } from "@/lib/i18n/LanguageProvider";


interface RestaurantCardProps {
  restaurant: Restaurant;
  variant?: "horizontal" | "vertical";
  width?: number;
}

export default function RestaurantCard({ restaurant: rawRestaurant, variant = "vertical", width = 168 }: RestaurantCardProps) {
  const { t, language } = useLanguage();
  const restaurant = localizeRestaurant(rawRestaurant, language);
  const [isFav, setIsFav] = useState(restaurant.isFavorite);

  // ── Horizontal (list view) ──────────────────────
  if (variant === "horizontal") {
    return (
      <Link
        href={`/restaurante/${restaurant.id}`}
        className="flex items-start gap-3 bg-surface rounded-2xl p-3 active:scale-[0.98] transition-transform"
        style={{ boxShadow: "0 2px 12px rgba(0,0,0,0.07)" }}
      >
        {/* Thumbnail */}
        <div className="relative w-[80px] h-[80px] rounded-xl overflow-hidden shrink-0">
          <Image src={restaurant.image} alt={restaurant.name} fill className="object-cover" unoptimized />
          {!restaurant.isOpen && (
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
              <span className="text-white text-[9px] font-bold">{t.common.closed}</span>
            </div>
          )}
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          {/* 1. Nome + heart */}
          <div className="flex items-start justify-between gap-1 mb-1">
            <h3 className="font-extrabold text-text-primary text-[14px] leading-snug flex-1">{restaurant.name}</h3>
            <button
              onClick={(e) => { e.preventDefault(); setIsFav(!isFav); }}
              className="shrink-0 active:scale-90 transition-transform"
            >
              <Heart size={16} fill={isFav ? "var(--color-accent)" : "none"} className={isFav ? "text-accent" : "text-border"} />
            </button>
          </div>

          {/* 2. Distância + endereço */}
          <div className="flex items-center gap-1 mb-0">
            <MapPin size={10} className="text-primary shrink-0" />
            <span className="text-primary text-[11px] font-bold">{restaurant.distance}</span>
            <span className="text-text-disabled text-[11px] truncate">· {restaurant.address}</span>
          </div>

          {/* Divisor */}
          <div className="h-px bg-border/30 my-2" />

          {/* 3. Safety badge */}
          <SafetyBadge level={restaurant.safetyLevel} size="sm" />

          {/* 4. Rating — direita */}
          <div className="flex justify-end mt-1.5">
            <div className="flex items-center gap-0.5">
              <Star size={11} fill="#FFC24D" className="text-warning" />
              <span className="text-xs font-bold text-text-primary">{restaurant.rating}</span>
            </div>
          </div>
        </div>
      </Link>
    );
  }

  // ── Vertical (card scroll) ──────────────────────
  return (
    <Link
      href={`/restaurante/${restaurant.id}`}
      className="block shrink-0 active:scale-[0.97] transition-transform"
      style={{ width }}
    >
      {/* Image — rounded all corners, standalone */}
      <div
        className="relative w-full overflow-hidden mb-2.5"
        style={{ height: 160, borderRadius: 16 }}
      >
        <Image src={restaurant.image} alt={restaurant.name} fill className="object-cover" unoptimized />

        {/* Badge — canto superior esquerdo, sobre a imagem */}
        <div className="absolute top-2.5 left-2.5">
          <SafetyBadge level={restaurant.safetyLevel} size="sm" />
        </div>

        {/* Heart */}
        <button
          onClick={(e) => { e.preventDefault(); setIsFav(!isFav); }}
          className="absolute top-2.5 right-2.5 w-7 h-7 bg-white/90 rounded-full flex items-center justify-center shadow-sm active:scale-90 transition-transform"
        >
          <Heart size={13} fill={isFav ? "var(--color-accent)" : "none"} className={isFav ? "text-accent" : "text-text-disabled"} />
        </button>

        {/* Closed overlay */}
        {!restaurant.isOpen && (
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center" style={{ borderRadius: 16 }}>
            <span className="text-white text-[10px] font-bold bg-black/50 px-2.5 py-1 rounded-full">{t.common.closed}</span>
          </div>
        )}
      </div>

      {/* Info — abaixo da imagem */}
      <div className="px-0.5">
        <h3 className="font-bold text-text-primary text-[14px] truncate leading-snug mb-0.5">{restaurant.name}</h3>
        <p className="text-text-disabled text-[11px] truncate mb-1.5">{restaurant.address}</p>
        <div className="flex items-center gap-1">
          <Star size={13} fill="#F59E0B" className="text-warning" />
          <span className="text-[13px] font-bold text-text-primary">{restaurant.rating}</span>
        </div>
      </div>
    </Link>
  );
}
