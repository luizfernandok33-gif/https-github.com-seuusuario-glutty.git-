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
import { useLanguage } from "@/lib/i18n/LanguageProvider";

const contamRiskConfig = {
  baixo:  { color: "#2E7D32" },
  medio:  { color: "#D97706" },
  alto:   { color: "#C62828" },
} as const;

export default function DishDetailPage({
  params,
}: {
  params: Promise<{ id: string; dishId: string }>;
}) {
  const { id, dishId } = use(params);
  const { t } = useLanguage();
  const restaurant = mockRestaurants.find((r) => r.id === id) ?? mockRestaurants[0];
  const dish = restaurant.dishes.find((d) => d.id === dishId) ?? restaurant.dishes[0];
  const [isFav, setIsFav] = useState(false);

  if (!dish) {
    return (
      <div className="min-h-dvh bg-background flex items-center justify-center">
        <p className="text-text-disabled">{t.prato.notFound}</p>
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
            className="w-9 h-9 rounded-full flex items-center justify-center active:scale-90 transition-transform"
            style={{ backgroundColor: "#1F3D34" }}>
            <ArrowLeft size={18} style={{ color: "#FFFFFF" }} />
          </Link>
          <div className="flex items-center gap-2">
            <button
              onClick={() => navigator.share?.({ title: dish.name, url: window.location.href })}
              className="w-9 h-9 rounded-full flex items-center justify-center active:scale-90 transition-transform"
              style={{ backgroundColor: "#1F3D34" }}>
              <svg width={16} height={16} viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
                <path fill="#FFFFFF" d="M27.71,4.29a1,1,0,0,0-1.05-.23l-22,8a1,1,0,0,0,0,1.87l9.6,3.84,3.84,9.6A1,1,0,0,0,19,28h0a1,1,0,0,0,.92-.66l8-22A1,1,0,0,0,27.71,4.29ZM19,24.2l-2.79-7L21,12.41,19.59,11l-4.83,4.83L7.8,13,25.33,6.67Z"/>
              </svg>
            </button>
            <button onClick={() => setIsFav(!isFav)}
              className="w-9 h-9 rounded-full flex items-center justify-center active:scale-90 transition-transform"
              style={{ backgroundColor: "#1F3D34" }}>
              <Heart size={16} fill={isFav ? "#E53935" : "none"} style={{ color: isFav ? "#E53935" : "#FFFFFF" }} />
            </button>
          </div>
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
              <p className="font-bold text-primary text-sm">{t.prato.adaptationApplied}</p>
              <p className="text-text-secondary text-xs mt-0.5 leading-relaxed">
                {t.prato.adaptationDesc}
              </p>
            </div>
          </div>
        )}

        {/* Ingredients */}
        <div className="bg-surface rounded-2xl p-4 shadow-sm border border-border/50">
          <h3 className="font-bold text-text-primary text-sm mb-3">{t.prato.ingredients}</h3>

          {/* Legend */}
          <div className="flex items-center gap-4 mb-3">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#2E7D32] shrink-0" />
              <span className="text-[11px] text-text-secondary">{t.prato.legendSafe}</span>
            </div>
            {hasAdaptations && (
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#D97706] shrink-0" />
                <span className="text-[11px] text-text-secondary">{t.prato.legendSubstituted}</span>
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
              {t.prato.contamWarning}
            </p>
          </div>
        </div>

        {/* Dish info */}
        <div className="bg-surface rounded-2xl p-4 shadow-sm border border-border/50">
          <h3 className="font-bold text-text-primary text-sm mb-3">{t.prato.dishInfo}</h3>
          <div className="space-y-2.5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Building2 size={13} className="text-text-disabled shrink-0" />
                <span className="text-text-disabled text-xs">{t.prato.restaurantLabel}</span>
              </div>
              <span className="text-text-primary text-xs font-semibold">{restaurant.name}</span>
            </div>
            {restaurant.chef && (
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <ChefHat size={13} className="text-text-disabled shrink-0" />
                  <span className="text-text-disabled text-xs">{t.prato.chefLabel}</span>
                </div>
                <span className="text-text-primary text-xs font-semibold">{restaurant.chef}</span>
              </div>
            )}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ShieldCheck size={13} className="text-text-disabled shrink-0" />
                <span className="text-text-disabled text-xs">{t.prato.safetyLevelLabel}</span>
              </div>
              <SafetyBadge level={safetyLevel} size="sm" />
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <AlertTriangle size={13} className="text-text-disabled shrink-0" />
                <span className="text-text-disabled text-xs">{t.prato.contamRiskLabel}</span>
              </div>
              <span className="text-xs font-bold" style={{ color: contamRiskConfig[contamRisk].color }}>
                {t.prato.contamRiskLabels[contamRisk] ?? contamRisk}
              </span>
            </div>
          </div>
        </div>

        {/* Restriction tags */}
        {dish.restrictions && dish.restrictions.length > 0 && (
          <div className="bg-surface rounded-2xl p-4 shadow-sm border border-border/50">
            <h3 className="font-bold text-text-primary text-sm mb-3">{t.prato.restrictionsMet}</h3>
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
            <h3 className="font-extrabold text-text-primary text-[15px] mb-3">{t.prato.otherDishes}</h3>
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
                      <p className="text-primary text-xs font-bold">{t.prato.viewDish}</p>
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
          {t.prato.viewRestaurant}
        </Link>
      </div>
    </div>
  );
}
