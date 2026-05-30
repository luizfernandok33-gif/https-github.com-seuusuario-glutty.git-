"use client";
import { useState } from "react";
import { Heart } from "lucide-react";
import RestaurantCard from "@/components/RestaurantCard";
import BackButton from "@/components/BackButton";
import { mockRestaurants } from "@/lib/data";

export default function FavoritosPage() {
  const [favorites] = useState(mockRestaurants.filter((r) => r.isFavorite));

  return (
    <div className="bg-brand-cream min-h-dvh">
      <div className="px-5 pt-14 pb-4">
        <div className="flex items-start gap-3">
          <BackButton />
          <div>
            <h1 className="text-2xl font-black text-primary font-display leading-tight">Favoritos</h1>
            <p className="text-text-disabled text-[12px] mt-0.5">Seus lugares seguros</p>
          </div>
        </div>
      </div>

      <div className="px-5">
        {favorites.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="w-20 h-20 rounded-full bg-brand-pink/10 flex items-center justify-center mb-4">
              <Heart size={36} className="text-brand-pink" />
            </div>
            <h3 className="text-brand-brown font-bold text-lg">Nenhum favorito ainda</h3>
            <p className="text-brand-brown/50 text-sm mt-1 max-w-xs">
              Toque no coração dos restaurantes que você ama para salvá-los aqui.
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {favorites.map((r) => (
              <RestaurantCard key={r.id} restaurant={r} variant="horizontal" />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
