"use client";
import { useState, use } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowLeft, Heart, Star, MapPin, Phone, Globe,
  Shield, AlertTriangle, MessageCircle, CheckCircle,
  Share2, Clock, Mail, Lock, Flag, UtensilsCrossed, BadgeCheck,
} from "lucide-react";
import SafetyBadge from "@/components/SafetyBadge";
import Tag from "@/components/Tag";
import { mockRestaurants, safetyLevelConfig } from "@/lib/data";
import { formatPrice } from "@/lib/utils";
import { getRestrictionColor } from "@/lib/tags";

export default function RestaurantePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const restaurant = mockRestaurants.find((r) => r.id === id) ?? mockRestaurants[0];

  const [isFav, setIsFav] = useState(restaurant.isFavorite);
  const [activeTab, setActiveTab] = useState<"sobre" | "pratos" | "avaliacoes">("sobre");
  const [reportDishId, setReportDishId] = useState<string | null>(null);
  const safetyConfig = safetyLevelConfig[restaurant.safetyLevel];

  return (
    <div className="bg-background min-h-dvh">
      {/* Hero Image */}
      <div className="relative h-56">
        <Image src={restaurant.image} alt={restaurant.name} fill className="object-cover" unoptimized />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/50" />

        {/* Top controls */}
        <div className="absolute top-12 left-5 right-5 flex items-center justify-between">
          <Link
            href="/busca"
            className="w-10 h-10 bg-white/90 rounded-full flex items-center justify-center shadow-md active:scale-90 transition-transform"
          >
            <ArrowLeft size={18} className="text-text-primary" />
          </Link>
          <div className="flex items-center gap-2">
            <button
              onClick={() => navigator.share?.({ title: restaurant.name, url: window.location.href })}
              className="w-10 h-10 bg-white/90 rounded-full flex items-center justify-center shadow-md active:scale-90 transition-transform"
            >
              <Share2 size={18} className="text-text-secondary" />
            </button>
            <button
              onClick={() => setIsFav(!isFav)}
              className="w-10 h-10 bg-white/90 rounded-full flex items-center justify-center shadow-md active:scale-90 transition-transform"
            >
              <Heart size={18} fill={isFav ? "#FF8FA3" : "none"} className={isFav ? "text-[#FF8FA3]" : "text-text-secondary"} />
            </button>
          </div>
        </div>

      </div>

      {/* Info Card */}
      <div className="bg-surface px-5 pt-4 pb-0 shadow-sm">
        {/* Name + rating row */}
        <div className="flex items-start justify-between mb-2">
          <div className="flex-1 min-w-0">
            <h1 className="text-2xl font-extrabold text-primary leading-tight">{restaurant.name}</h1>
            <p className="text-text-disabled text-xs mt-0.5">#{restaurant.cuisine.replace(/ /g, "")}</p>
          </div>
          <div className="flex flex-col items-end gap-0.5 shrink-0 ml-3">
            <div className="flex items-center gap-1">
              <Star size={14} fill="#FFC24D" className="text-warning" />
              <span className="font-extrabold text-text-primary">{restaurant.rating}</span>
            </div>
            <span className="text-text-disabled text-[10px]">{restaurant.reviewCount} avaliações</span>
          </div>
        </div>

        {/* Badge + open status (separated) */}
        <div className="flex items-center justify-between mb-3">
          <SafetyBadge level={restaurant.safetyLevel} size="sm" />
          <span className={`text-xs font-bold px-3 py-1.5 rounded-full ${restaurant.isOpen ? "bg-success/15 text-success" : "bg-border/60 text-text-disabled"}`}>
            {restaurant.isOpen ? "Aberto agora" : "Fechado"}
          </span>
        </div>

        {/* Quick info */}
        <div className="flex flex-col gap-1.5 pb-4">
          <div className="flex items-center gap-2 text-xs text-text-secondary">
            <MapPin size={12} className="text-primary shrink-0" />
            {restaurant.address} · {restaurant.distance}
          </div>
          {restaurant.openingHours && (
            <div className="flex items-center gap-2 text-xs text-text-secondary">
              <Clock size={12} className="text-primary shrink-0" />
              {restaurant.openingHours}
            </div>
          )}
          <div className="flex items-center gap-2 text-xs text-text-secondary">
            <Phone size={12} className="text-primary shrink-0" />
            {restaurant.phone}
          </div>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-border/60">
          {(["sobre", "pratos", "avaliacoes"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 py-3 text-xs font-bold transition-colors ${
                activeTab === tab ? "text-primary border-b-2 border-primary" : "text-text-disabled"
              }`}
            >
              {tab === "sobre" ? "Sobre" : tab === "pratos" ? "Pratos" : "Avaliações"}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      <div className="px-5 py-4">

        {/* Sobre */}
        {activeTab === "sobre" && (
          <div className="space-y-5">

            {/* Descrição */}
            <div>
              <h3 className="font-extrabold text-text-primary text-[15px] mb-2">Sobre o restaurante</h3>
              <p className="text-text-secondary text-sm leading-relaxed">{restaurant.description}</p>
            </div>

            {/* Restrições atendidas */}
            {restaurant.restrictions && restaurant.restrictions.length > 0 && (
              <div>
                <h3 className="font-extrabold text-primary text-[15px] mb-3">Restrições atendidas</h3>
                <div className="flex flex-wrap gap-2">
                  {restaurant.restrictions.map((r) => (
                    <Tag key={r} label={r} colorConfig={getRestrictionColor(r)} size="md" />
                  ))}
                </div>
              </div>
            )}

            {/* Galeria de fotos */}
            <div>
              <h3 className="font-extrabold text-text-primary text-[15px] mb-3">Fotos do restaurante</h3>
              {restaurant.galleryImages && restaurant.galleryImages.length > 0 ? (
                <div className="flex gap-2 overflow-x-auto -mx-5 px-5 pb-1 scrollbar-none">
                  {restaurant.galleryImages.map((src, i) => (
                    <div
                      key={i}
                      className="relative shrink-0 rounded-2xl overflow-hidden"
                      style={{ width: 160, height: 110 }}
                    >
                      <Image
                        src={src}
                        alt={`${restaurant.name} foto ${i + 1}`}
                        fill
                        className="object-cover"
                        unoptimized
                      />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex gap-2 overflow-x-auto -mx-5 px-5 pb-1 scrollbar-none">
                  {[0, 1, 2].map((i) => (
                    <div
                      key={i}
                      className="relative shrink-0 rounded-2xl overflow-hidden flex flex-col items-center justify-center gap-1.5"
                      style={{ width: 160, height: 110, backgroundColor: "#F0EDE8", border: "1.5px dashed #C8BFB5" }}
                    >
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" stroke="#B0977E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        <circle cx="12" cy="13" r="4" stroke="#B0977E" strokeWidth="1.5"/>
                      </svg>
                      <span className="text-[10px] font-semibold" style={{ color: "#B0977E" }}>Em breve</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Pratos principais */}
            {restaurant.dishes.length > 0 && (
              <div>
                <h3 className="font-extrabold text-primary text-[15px] mb-3">Pratos principais</h3>
                <div className="flex gap-3 overflow-x-auto pb-1 -mx-5 px-5 scrollbar-none">
                  {restaurant.dishes.map((dish) => {
                    const isUnsafe = !dish.isGlutenFree && !(dish.adaptations && dish.adaptations.length > 0);
                    const isAdaptable = !!(dish.adaptations && dish.adaptations.length > 0);
                    return (
                      <div key={dish.id} className="flex-none w-32">
                        {isUnsafe ? (
                          /* Status 3: unsafe — greyscale + report */
                          <button
                            onClick={() => setReportDishId(dish.id)}
                            className="w-full text-left active:scale-95 transition-transform"
                          >
                            <div className="relative w-32 h-24 rounded-2xl overflow-hidden mb-2">
                              <Image src={dish.image} alt={dish.name} fill className="object-cover grayscale" unoptimized />
                              <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                                <Lock size={20} className="text-white" />
                              </div>
                            </div>
                            <p className="text-text-disabled text-xs font-bold leading-tight line-clamp-2">{dish.name}</p>
                            <p className="text-text-disabled text-xs mt-0.5">{formatPrice(dish.price)}</p>
                            {reportDishId === dish.id && (
                              <div className="mt-1.5 bg-background rounded-xl p-2 border border-border/50 shadow-sm">
                                <p className="text-[10px] text-text-secondary mb-1.5 leading-relaxed">Prato incompatível — sem adaptação disponível.</p>
                                <button
                                  onClick={(e) => { e.stopPropagation(); setReportDishId(null); }}
                                  className="w-full flex items-center justify-center gap-1 bg-warning/15 text-warning rounded-lg py-1.5 text-[10px] font-bold"
                                >
                                  <Flag size={10} />
                                  Solicitar adaptação
                                </button>
                              </div>
                            )}
                          </button>
                        ) : (
                          /* Status 1 (safe) or Status 2 (adaptable) */
                          <Link href={`/restaurante/${restaurant.id}/prato/${dish.id}`} className="block active:scale-95 transition-transform">
                            <div className="relative w-32 h-24 rounded-2xl overflow-hidden mb-2">
                              <Image src={dish.image} alt={dish.name} fill className="object-cover" unoptimized />
                              {isAdaptable ? (
                                <div className="absolute bottom-1.5 left-1.5 bg-warning text-white text-[9px] font-bold px-1.5 py-0.5 rounded-full">Adaptável</div>
                              ) : (
                                <div className="absolute bottom-1.5 left-1.5 bg-success text-white text-[9px] font-bold px-1.5 py-0.5 rounded-full">Seguro</div>
                              )}
                            </div>
                            <p className="text-text-primary text-xs font-bold leading-tight line-clamp-2">{dish.name}</p>
                            <p className="text-primary text-xs font-extrabold mt-0.5">{formatPrice(dish.price)}</p>
                          </Link>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Controle de contaminação cruzada */}
            {restaurant.safetyProcedures && restaurant.safetyProcedures.length > 0 && (
              <div>
                <h3 className="font-extrabold text-text-primary text-[15px] mb-3">Controle de contaminação cruzada</h3>
                <div className="rounded-2xl overflow-hidden border border-warning/40">
                  <div className="flex items-center gap-2 px-4 py-3 bg-warning/15">
                    <AlertTriangle size={14} className="text-warning shrink-0" />
                    <p className="text-warning font-extrabold text-xs tracking-wide uppercase">Procedimentos de segurança</p>
                  </div>
                  <div className="bg-surface px-4 py-3 space-y-2">
                    {restaurant.safetyProcedures.map((proc) => (
                      <div key={proc} className="flex items-start gap-2">
                        <CheckCircle size={13} className="text-success shrink-0 mt-0.5" />
                        <p className="text-text-secondary text-xs leading-relaxed">{proc}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Disclaimer */}
            <div className="flex items-start gap-2 px-1">
              <AlertTriangle size={13} className="text-warning shrink-0 mt-0.5" />
              <p className="text-text-disabled text-[11px] leading-relaxed">
                Informações fornecidas pelo restaurante. Confirme sempre essas informações diretamente com o restaurante antes de consumir.
              </p>
            </div>

            {/* Footer — contact + chef */}
            <div className="bg-surface rounded-2xl p-4 shadow-sm border border-border/50">
              <h3 className="font-bold text-text-primary text-sm mb-3">Informações de contato</h3>

              <div className="space-y-2.5 mb-4">
                <div className="flex items-center gap-2.5">
                  <MapPin size={13} className="text-primary shrink-0" />
                  <span className="text-text-secondary text-xs">{restaurant.address}</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Phone size={13} className="text-primary shrink-0" />
                  <span className="text-text-secondary text-xs">{restaurant.phone}</span>
                </div>
                {restaurant.email && (
                  <div className="flex items-center gap-2.5">
                    <Mail size={13} className="text-primary shrink-0" />
                    <span className="text-text-secondary text-xs">{restaurant.email}</span>
                  </div>
                )}
                {restaurant.website && (
                  <div className="flex items-center gap-2.5">
                    <Globe size={13} className="text-primary shrink-0" />
                    <a
                      href={restaurant.website.startsWith("http") ? restaurant.website : `https://${restaurant.website}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary text-xs font-medium underline underline-offset-2 active:opacity-60"
                    >
                      {restaurant.website.replace(/^https?:\/\//, "")}
                    </a>
                  </div>
                )}
              </div>

              {restaurant.chef && (
                <>
                  <div className="h-px bg-border/40 mb-3" />
                  <div className="flex items-center gap-3">
                    {restaurant.chefPhoto ? (
                      <div className="relative w-12 h-12 rounded-full overflow-hidden shrink-0">
                        <Image src={restaurant.chefPhoto} alt={restaurant.chef} fill className="object-cover" unoptimized />
                      </div>
                    ) : (
                      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0 text-primary font-bold text-lg">
                        {restaurant.chef[0]}
                      </div>
                    )}
                    <div>
                      <p className="text-[10px] text-text-disabled uppercase tracking-wide font-semibold">Chefe de cozinha</p>
                      <p className="font-bold text-text-primary text-sm">{restaurant.chef}</p>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        )}

        {/* Pratos */}
        {activeTab === "pratos" && (
          <div className="space-y-3">
            {restaurant.dishes.length === 0 ? (
              <div className="flex flex-col items-center py-10 text-center">
                <div className="w-16 h-16 rounded-full bg-border/30 flex items-center justify-center mb-3">
                    <UtensilsCrossed size={28} className="text-text-disabled" strokeWidth={1.5} />
                  </div>
                <p className="text-text-disabled text-sm">Cardápio não disponível ainda</p>
              </div>
            ) : (
              restaurant.dishes.map((dish) => (
                <Link
                  key={dish.id}
                  href={`/restaurante/${restaurant.id}/prato/${dish.id}`}
                  className="block bg-surface rounded-2xl overflow-hidden shadow-sm border border-border/50 active:scale-[0.98] transition-transform"
                >
                  <div className="relative h-40">
                    <Image src={dish.image} alt={dish.name} fill className="object-cover" unoptimized />
                    {dish.isCertified && (
                      <div className="absolute top-3 left-3 bg-success text-white text-[10px] font-bold px-2 py-1 rounded-full flex items-center gap-1">
                        <CheckCircle size={10} />
                        Aprovado por celíacos
                      </div>
                    )}
                  </div>
                  <div className="p-4">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex-1">
                        <h3 className="font-bold text-text-primary text-base">{dish.name}</h3>
                        <p className="text-text-disabled text-xs mt-1 leading-relaxed">{dish.description}</p>
                      </div>
                      <span className="font-extrabold text-primary text-base shrink-0">
                        {formatPrice(dish.price)}
                      </span>
                    </div>
                    <div className="mt-3">
                      <p className="text-text-disabled text-xs font-semibold mb-2">Ingredientes declarados:</p>
                      <div className="flex flex-wrap gap-1.5">
                        {dish.ingredients.map((ing) => (
                          <span key={ing} className="bg-background text-text-secondary text-[10px] font-medium px-2 py-1 rounded-full border border-border">
                            {ing}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </Link>
              ))
            )}
          </div>
        )}

        {/* Avaliações */}
        {activeTab === "avaliacoes" && (
          <div className="space-y-4">

            {/* Resumo de segurança */}
            <div className="bg-surface rounded-2xl p-4 shadow-sm border border-border/50">
              <div className="flex items-center gap-4 mb-4">
                <div className="text-center shrink-0">
                  <p className="text-4xl font-extrabold text-text-primary">{restaurant.rating}</p>
                  <div className="flex justify-center my-1">
                    {[1,2,3,4,5].map((s) => (
                      <Star key={s} size={11} fill={s <= Math.round(restaurant.rating) ? "#FFC24D" : "none"} className={s <= Math.round(restaurant.rating) ? "text-warning" : "text-border"} />
                    ))}
                  </div>
                  <p className="text-text-disabled text-[10px]">{restaurant.reviewCount} avaliações</p>
                </div>
                <div className="flex-1 space-y-1.5">
                  {(["muito_seguro","seguro","moderado","nao_seguro"] as const).map((lvl) => {
                    const count = restaurant.reviews.filter(r => r.safetyLevel === lvl).length;
                    const pct = restaurant.reviews.length ? Math.round((count / restaurant.reviews.length) * 100) : 0;
                    const colors: Record<string,string> = { muito_seguro:"#43A047", seguro:"#F59E0B", moderado:"#FB8C00", nao_seguro:"#EF5350" };
                    const labels: Record<string,string> = { muito_seguro:"Muito seguro", seguro:"Seguro", moderado:"Moderado", nao_seguro:"Não seguro" };
                    return (
                      <div key={lvl} className="flex items-center gap-2">
                        <span className="text-[10px] text-text-disabled w-16 truncate">{labels[lvl]}</span>
                        <div className="flex-1 h-1.5 bg-border/40 rounded-full overflow-hidden">
                          <div className="h-full rounded-full transition-all" style={{ width: `${pct}%`, backgroundColor: colors[lvl] }} />
                        </div>
                        <span className="text-[10px] text-text-disabled w-6 text-right">{count}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {restaurant.reviews.map((review) => {
              const contamLabels: Record<string,string> = { nenhum:"Sem contaminação", pequeno:"Pequeno risco", alto:"Alto risco", nao_sei:"Risco incerto" };
              const contamColors: Record<string,string> = { nenhum:"#2E7D32", pequeno:"#D97706", alto:"#C62828", nao_sei:"#616161" };
              const contamBg:     Record<string,string> = { nenhum:"#E8F5E9",  pequeno:"#FEF3C7",  alto:"#FFEBEE",   nao_sei:"#F5F5F5"  };
              const teamLabels:   Record<string,string> = { total:"Equipe preparada", parcial:"Equipe parcial", nao_sabiam:"Equipe despreparada", nao_perguntei:"Não verificado" };
              const teamColors:   Record<string,string> = { total:"#2E7D32", parcial:"#D97706", nao_sabiam:"#C62828", nao_perguntei:"#616161" };
              const teamBg:       Record<string,string> = { total:"#E8F5E9",  parcial:"#FEF3C7",   nao_sabiam:"#FFEBEE",     nao_perguntei:"#F5F5F5" };

              return (
                <div
                  key={review.id}
                  className="bg-surface rounded-[18px] p-4"
                  style={{ boxShadow: "0 2px 12px rgba(0,0,0,0.07)" }}
                >
                  {/* Author row */}
                  <div className="flex items-center gap-2.5 mb-3">
                    <div className="w-10 h-10 rounded-full bg-primary/15 flex items-center justify-center text-sm font-extrabold text-primary shrink-0">
                      {review.avatar}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-bold text-text-primary text-[13px] truncate">{review.author}</p>
                      <p className="text-text-disabled text-[10px]">{review.date}</p>
                    </div>
                    {review.verified && (
                      <BadgeCheck size={16} className="text-primary shrink-0" />
                    )}
                  </div>

                  {/* Stars */}
                  <div className="flex items-center gap-0.5 mb-3">
                    {[1,2,3,4,5].map((s) => (
                      <Star key={s} size={12} fill={s <= review.rating ? "#FFC24D" : "none"} className={s <= review.rating ? "text-warning" : "text-border"} />
                    ))}
                  </div>

                  {/* Comment */}
                  {review.comment && (
                    <p className="text-text-secondary text-[13px] leading-relaxed mb-3">
                      "{review.comment}"
                    </p>
                  )}

                  {/* Safety + team tags */}
                  <div className="flex flex-wrap gap-1.5 mb-2">
                    <span
                      className="text-[10px] font-bold px-2.5 py-1 rounded-full"
                      style={{ backgroundColor: contamBg[review.contamRisk], color: contamColors[review.contamRisk] }}
                    >
                      {contamLabels[review.contamRisk]}
                    </span>
                    <span
                      className="text-[10px] font-bold px-2.5 py-1 rounded-full"
                      style={{ backgroundColor: teamBg[review.teamKnowledge], color: teamColors[review.teamKnowledge] }}
                    >
                      {teamLabels[review.teamKnowledge]}
                    </span>
                    {review.tags?.map((tag) => (
                      <span
                        key={tag}
                        className="text-[10px] font-bold px-2.5 py-1 rounded-full"
                        style={{ backgroundColor: "#FC690415", color: "#FC6904" }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}

            <Link
              href={`/restaurante/${id}/avaliar`}
              className="w-full flex items-center justify-center gap-2 font-bold py-4 rounded-2xl shadow-md active:scale-95 transition-transform"
              style={{ backgroundColor: "#C6F59D", color: "#1F3D34" }}
            >
              <MessageCircle size={18} />
              Avaliar este restaurante
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
