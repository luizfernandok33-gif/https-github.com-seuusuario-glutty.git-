"use client";
import { use, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Heart, Star, AlertTriangle, ChefHat, Building2, ShieldCheck, MapPin, RefreshCw, Phone, Globe, Clock } from "lucide-react";
import { mockRestaurants, RESTAURANT_LOGOS } from "@/lib/data";
import Tag from "@/components/Tag";
import SafetyBadge from "@/components/SafetyBadge";
import { DishImagePlaceholder } from "@/components/DishPlaceholder";
import { palette, getRestrictionColor, getIngredientColor } from "@/lib/tags";
import { useLanguage } from "@/lib/i18n/LanguageProvider";

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

  return (
    <div className="bg-background min-h-dvh" style={{ paddingBottom: "calc(env(safe-area-inset-bottom, 0px) + 100px)" }}>

      {/* Header claro */}
      <div
        className="flex items-center justify-between gap-3 px-5"
        style={{ paddingTop: "calc(env(safe-area-inset-top, 0px) + 28px)", paddingBottom: 16, backgroundColor: "#FFFFFF" }}
      >
        <Link href={`/restaurante/${restaurant.id}`}
          className="w-9 h-9 rounded-full flex items-center justify-center active:scale-90 transition-transform shrink-0"
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

      {/* Hero */}
      <div className="relative h-64">
        {dish.image ? (
          <Image src={dish.image} alt={dish.name} fill className="object-cover" unoptimized />
        ) : (
          <DishImagePlaceholder rounded={0} bordered={false} />
        )}
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/40" />
      </div>

      <div
        className="bg-white px-5 pt-5 pb-5 space-y-6 relative z-10 -mt-8"
        style={{ borderTopLeftRadius: 32, borderTopRightRadius: 32, boxShadow: "0 -4px 20px rgba(0,0,0,0.08)" }}
      >

        {/* Name + restaurant + safety tag + description */}
        <div>
          <h1 className="font-extrabold text-text-primary text-[22px] leading-tight mb-1">{dish.name}</h1>
          <Link href={`/restaurante/${restaurant.id}`} className="flex items-center gap-2 active:opacity-70 transition-opacity">
            <div className="w-6 h-6 rounded-lg overflow-hidden shrink-0" style={{ backgroundColor: "#1F3D34" }}>
              {RESTAURANT_LOGOS[restaurant.name] ? (
                <img src={RESTAURANT_LOGOS[restaurant.name]} alt={restaurant.name} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <span className="text-[10px] font-black" style={{ color: "#C6F59D" }}>
                    {restaurant.name.charAt(0)}
                  </span>
                </div>
              )}
            </div>
            <span className="text-primary font-bold text-sm">{restaurant.name}</span>
          </Link>
          <div className="mt-2">
            <SafetyBadge level={safetyLevel} size="sm" />
          </div>
          <p className="text-text-secondary text-sm leading-relaxed mt-2">{dish.description}</p>
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

        {/* Cross-contamination preparation practices */}
        <div className="bg-surface rounded-2xl p-4 shadow-sm border border-border/50">
          <div className="flex items-center gap-2 mb-2">
            <ShieldCheck size={15} style={{ color: "#2E7D32" }} className="shrink-0" />
            <h3 className="font-bold text-text-primary text-sm">{t.prato.crossContamPrepTitle}</h3>
          </div>
          <p className="text-text-secondary text-xs leading-relaxed">
            {dish.crossContaminationPrep ?? t.prato.crossContamPrepFallback}
          </p>
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
          </div>
        </div>

        {/* Other dishes you might like — carrossel horizontal */}
        {otherDishes.length > 0 && (
          <div>
            <h3 className="font-extrabold text-text-primary text-[15px] mb-3">{t.prato.otherDishes}</h3>
            <div className="flex gap-3 overflow-x-auto -mx-5 px-5 pb-1 scrollbar-none" style={{ scrollSnapType: "x mandatory" }}>
              {otherDishes.map((d) => (
                <Link key={d.id} href={`/restaurante/${restaurant.id}/prato/${d.id}`}
                  className="flex-none w-[170px] bg-surface rounded-2xl p-3 border border-border/50 shadow-sm active:scale-[0.98] transition-transform"
                  style={{ scrollSnapAlign: "start" }}>
                  <div className="relative w-full h-24 rounded-xl overflow-hidden mb-2">
                    {d.image ? (
                      <Image src={d.image} alt={d.name} fill className="object-cover" unoptimized />
                    ) : (
                      <DishImagePlaceholder rounded={12} />
                    )}
                  </div>
                  <p className="font-extrabold text-text-primary text-sm leading-tight line-clamp-2 mb-1">{d.name}</p>
                  <div className="flex items-center gap-0.5 mb-2">
                    <Star size={11} fill="#FFC24D" className="text-warning" />
                    <span className="text-text-secondary text-xs font-bold">4.8</span>
                  </div>
                  {d.restrictions && d.restrictions.length > 0 && (
                    <div className="flex flex-wrap gap-1 mb-2">
                      {d.restrictions.slice(0, 2).map((r) => (
                        <Tag key={r} label={r} colorConfig={getRestrictionColor(r)} size="sm" />
                      ))}
                    </div>
                  )}
                  <p className="text-primary text-xs font-bold">{t.prato.viewDish}</p>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Restaurant contact */}
        <div className="bg-surface rounded-2xl p-4 shadow-sm border border-border/50">
          <h3 className="font-bold text-text-primary text-sm mb-3">{t.prato.contactTitle}</h3>
          <div className="space-y-2.5">
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-2 shrink-0">
                <Phone size={13} className="text-text-disabled shrink-0" />
                <span className="text-text-disabled text-xs">{t.prato.phoneLabel}</span>
              </div>
              <span className="text-text-primary text-xs font-semibold text-right">{restaurant.phone}</span>
            </div>
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-2 shrink-0">
                <MapPin size={13} className="text-text-disabled shrink-0" />
                <span className="text-text-disabled text-xs">{t.prato.addressLabel}</span>
              </div>
              <span className="text-text-primary text-xs font-semibold text-right">{restaurant.address}</span>
            </div>
            {restaurant.website && (
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-2 shrink-0">
                  <Globe size={13} className="text-text-disabled shrink-0" />
                  <span className="text-text-disabled text-xs">{t.prato.websiteLabel}</span>
                </div>
                <span className="text-text-primary text-xs font-semibold text-right">{restaurant.website}</span>
              </div>
            )}
            {restaurant.openingHours && (
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-2 shrink-0">
                  <Clock size={13} className="text-text-disabled shrink-0" />
                  <span className="text-text-disabled text-xs">{t.prato.hoursLabel}</span>
                </div>
                <span className="text-text-primary text-xs font-semibold text-right">{restaurant.openingHours}</span>
              </div>
            )}
          </div>
        </div>

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
