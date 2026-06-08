"use client";
import { use, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Heart, Star, AlertTriangle, ChefHat, Building2, ShieldCheck, MapPin, RefreshCw } from "lucide-react";
import { mockRestaurants } from "@/lib/data";
import { formatPrice } from "@/lib/utils";
import Tag from "@/components/Tag";
import SafetyBadge from "@/components/SafetyBadge";
import { DishImagePlaceholder } from "@/components/DishPlaceholder";
import { palette, getRestrictionColor, getIngredientColor } from "@/lib/tags";

const contamRiskConfig = {
  baixo:  { label: "Baixo",  color: "#2E7D32" },
  medio:  { label: "Médio",  color: "#D97706" },
  alto:   { label: "Alto",   color: "#C62828" },
};

export default function DishDetailPage({
  params,
}: {
  params: Promise<{ id: string; dishId: string }>;
}) {
  const { id, dishId } = use(params);
  const restaurant = mockRestaurants.find((r) => r.id === id) ?? mockRestaurants[0];
  const dish = restaurant.dishes.find((d) => d.id === dishId) ?? restaurant.dishes[0];
  const [isFav, setIsFav] = useState(false);

  if (!dish) {
    return (
      <div className="min-h-dvh bg-background flex items-center justify-center">
        <p className="text-text-disabled">Prato não encontrado.</p>
      </div>
    );
  }

  // Other dishes from same restaurant (excluding current)
  const otherDishes = restaurant.dishes.filter((d) => d.id !== dish.id);

  const hasAdaptations = dish.adaptations && dish.adaptations.length > 0;
  const safetyLevel = dish.safetyLevel ?? restaurant.safetyLevel;
  const contamRisk = dish.crossContaminationRisk ?? "baixo";

  return (
    <div className="bg-background min-h-dvh" style={{ paddingBottom: "calc(env(safe-area-inset-bottom, 0px) + 100px)" }}>

      {/* Hero */}
      <div className="relative h-64">
        {dish.image ? (
          <Image src={dish.image} alt={dish.name} fill className="object-cover" unoptimized />
        ) : (
          <DishImagePlaceholder rounded={0} />
        )}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60" />

        <div className="absolute left-5 right-5 flex items-center justify-between" style={{ top: "calc(env(safe-area-inset-top, 0px) + 28px)" }}>
          <Link href={`/restaurante/${restaurant.id}`}
            className="w-10 h-10 bg-white/90 rounded-full flex items-center justify-center shadow-md active:scale-90 transition-transform">
            <ArrowLeft size={18} className="text-text-primary" />
          </Link>
          <button onClick={() => setIsFav(!isFav)}
            className="w-10 h-10 bg-white/90 rounded-full flex items-center justify-center shadow-md active:scale-90 transition-transform">
            <Heart size={18} fill={isFav ? "#FF8FA3" : "none"}
              className={isFav ? "text-[#FF8FA3]" : "text-text-secondary"} />
          </button>
        </div>
      </div>

      <div className="px-5 py-5 space-y-6">

        {/* Safety tag + name + description */}
        <div>
          <SafetyBadge level={safetyLevel} size="md" />
          <h1 className="font-extrabold text-text-primary text-[22px] leading-tight mt-2 mb-2">{dish.name}</h1>
          <p className="text-text-secondary text-sm leading-relaxed">{dish.description}</p>
        </div>

        {/* Price + rating */}
        <div className="flex items-center justify-between">
          <span className="text-3xl font-extrabold text-primary">{formatPrice(dish.price)}</span>
          <div className="flex items-center gap-1.5 bg-surface rounded-full px-3 py-1.5 border border-border/50 shadow-sm">
            <Star size={14} fill="#FFC24D" className="text-warning" />
            <span className="font-bold text-text-primary text-sm">4.8</span>
            <span className="text-text-disabled text-xs">(32)</span>
          </div>
        </div>

        {/* Adaptation notice */}
        {hasAdaptations && (
          <div className="flex items-start gap-3 rounded-2xl px-4 py-3 border"
            style={{ backgroundColor: "#FFF8F0", borderColor: "#FC6904" + "33" }}>
            <RefreshCw size={16} className="text-primary shrink-0 mt-0.5" />
            <div>
              <p className="font-bold text-primary text-sm">Adaptação aplicada</p>
              <p className="text-text-secondary text-xs mt-0.5 leading-relaxed">
                Este prato foi adaptado às suas restrições. Verifique os ingredientes substituídos abaixo.
              </p>
            </div>
          </div>
        )}

        {/* Ingredients */}
        <div className="bg-surface rounded-2xl p-4 shadow-sm border border-border/50">
          <h3 className="font-bold text-text-primary text-sm mb-3">Ingredientes</h3>

          {/* Legend */}
          <div className="flex items-center gap-4 mb-3">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#2E7D32] shrink-0" />
              <span className="text-[11px] text-text-secondary">Alinhado ao seu perfil de segurança</span>
            </div>
            {hasAdaptations && (
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#D97706] shrink-0" />
                <span className="text-[11px] text-text-secondary">Substituído</span>
              </div>
            )}
          </div>

          {/* Safe ingredients */}
          <div className="flex flex-wrap gap-2">
            {dish.ingredients.map((ing) => (
              <Tag key={ing} label={ing} colorConfig={palette.verde} size="sm" />
            ))}
          </div>

          {/* Adaptations: original (strikethrough) → replacement */}
          {hasAdaptations && (
            <div className="mt-3 space-y-2">
              {dish.adaptations!.map((a) => (
                <Tag
                  key={a.original}
                  label={a.original}
                  colorConfig={getIngredientColor(a.original)}
                  size="sm"
                  strikethrough
                  arrow={a.replacement}
                />
              ))}
            </div>
          )}

          <div className="mt-3 flex items-start gap-2">
            <AlertTriangle size={13} className="text-warning shrink-0 mt-0.5" />
            <p className="text-text-disabled text-[11px] leading-relaxed">
              Pode haver risco de contaminação cruzada. Confirme com o restaurante antes de consumir.
            </p>
          </div>
        </div>

        {/* Dish info */}
        <div className="bg-surface rounded-2xl p-4 shadow-sm border border-border/50">
          <h3 className="font-bold text-text-primary text-sm mb-3">Informações do prato</h3>
          <div className="space-y-2.5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Building2 size={13} className="text-text-disabled shrink-0" />
                <span className="text-text-disabled text-xs">Restaurante</span>
              </div>
              <span className="text-text-primary text-xs font-semibold">{restaurant.name}</span>
            </div>
            {restaurant.chef && (
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <ChefHat size={13} className="text-text-disabled shrink-0" />
                  <span className="text-text-disabled text-xs">Chef</span>
                </div>
                <span className="text-text-primary text-xs font-semibold">{restaurant.chef}</span>
              </div>
            )}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ShieldCheck size={13} className="text-text-disabled shrink-0" />
                <span className="text-text-disabled text-xs">Nível de segurança</span>
              </div>
              <SafetyBadge level={safetyLevel} size="sm" />
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <AlertTriangle size={13} className="text-text-disabled shrink-0" />
                <span className="text-text-disabled text-xs">Risco contaminação cruzada</span>
              </div>
              <span className="text-xs font-bold" style={{ color: contamRiskConfig[contamRisk].color }}>
                {contamRiskConfig[contamRisk].label}
              </span>
            </div>
          </div>
        </div>

        {/* Restriction tags */}
        {dish.restrictions && dish.restrictions.length > 0 && (
          <div className="bg-surface rounded-2xl p-4 shadow-sm border border-border/50">
            <h3 className="font-bold text-text-primary text-sm mb-3">Restrições atendidas</h3>
            <div className="flex flex-wrap gap-2">
              {dish.restrictions.map((r) => (
                <Tag key={r} label={r} colorConfig={getRestrictionColor(r)} size="md" />
              ))}
            </div>
          </div>
        )}

        {/* Other dishes you might like */}
        {otherDishes.length > 0 && (
          <div>
            <h3 className="font-extrabold text-text-primary text-[15px] mb-3">Outros pratos que você pode gostar</h3>
            <div className="space-y-3">
              {otherDishes.map((d) => (
                <Link key={d.id} href={`/restaurante/${restaurant.id}/prato/${d.id}`}
                  className="flex items-start gap-3 bg-surface rounded-2xl p-3 border border-border/50 shadow-sm active:scale-[0.98] transition-transform">
                  <div className="relative w-[72px] h-[72px] rounded-xl overflow-hidden shrink-0">
                    {d.image ? (
                      <Image src={d.image} alt={d.name} fill className="object-cover" unoptimized />
                    ) : (
                      <DishImagePlaceholder rounded={12} />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    {/* 1. Nome + rating */}
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <p className="font-extrabold text-text-primary text-sm leading-tight flex-1">{d.name}</p>
                      <div className="flex items-center gap-0.5 shrink-0">
                        <Star size={11} fill="#FFC24D" className="text-warning" />
                        <span className="text-text-secondary text-xs font-bold">4.8</span>
                      </div>
                    </div>
                    {/* 2. Distância + endereço */}
                    <div className="flex items-center gap-1">
                      <MapPin size={10} className="text-primary shrink-0" />
                      <span className="text-primary text-[11px] font-bold">{restaurant.distance}</span>
                      <span className="text-text-disabled text-[11px]">· {restaurant.address}</span>
                    </div>
                    {/* Divisor */}
                    <div className="h-px bg-border/30 my-2" />
                    {/* 3. Tags */}
                    {d.restrictions && d.restrictions.length > 0 && (
                      <div className="flex flex-wrap gap-1 mb-2">
                        {d.restrictions.map((r) => (
                          <Tag key={r} label={r} colorConfig={getRestrictionColor(r)} size="sm" />
                        ))}
                      </div>
                    )}
                    {/* 4. Ação */}
                    <div className="flex justify-end">
                      <p className="text-primary text-xs font-bold">Ver prato →</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* CTA */}
        <Link href={`/restaurante/${restaurant.id}`}
          className="flex items-center justify-center gap-2 w-full font-bold py-4 rounded-full text-base shadow-md active:scale-95 transition-transform"
          style={{ backgroundColor: "#C6F59D", color: "#1F3D34" }}>
          Ver restaurante completo
        </Link>
      </div>
    </div>
  );
}
