"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ChevronRight, MapPin, Star, Shield, MessageCircle, Calendar } from "lucide-react";
import { getIngredientColor, palette } from "@/lib/tags";

/* ─── Dados ─── */
const USER = {
  name: "Michelle Sagas",
  photo: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop&crop=face",
  location: "Zurique, Suíça",
  memberSince: "Jan 2023",
  reviewCount: 14,
  bio: "Sou celíaca há 10 anos, moro em Zurique e evito lugares onde pode ocorrer contaminação cruzada.",
  restrictions: [
    { label: "Celíaca",     bg: "#E0F7FA", color: "#00838F" },
    { label: "Sem Glúten",  bg: "#D4EDD4", color: "#1F3D34" },
    { label: "Sem Lactose", bg: "#E3F2FD", color: "#1565C0" },
    { label: "Sem Nozes",   bg: "#FDECEA", color: "#C0392B" },
  ],
  prohibited: ["Trigo", "Cevada", "Malte", "Leite", "Aveia", "Centeio"],
};

const REVIEWS = [
  {
    id: "r1", restaurantId: "1",
    name: "Le Manjue Organique",
    photo: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=80&h=80&fit=crop",
    rating: 5,
    comment: "Melhor restaurante para celíacos de SP!",
    tags: ["Sem contaminação", "Me senti seguro"],
  },
  {
    id: "r2", restaurantId: "3",
    name: "Quinoa Restaurante",
    photo: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=80&h=80&fit=crop",
    rating: 5,
    comment: "Ambiente lindo, eles entendem sobre celíaca!",
    tags: ["Ambiente limpo", "Sem contaminação"],
  },
  {
    id: "r3", restaurantId: "5",
    name: "Hiltl · Zurique",
    photo: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=80&h=80&fit=crop",
    rating: 5,
    comment: "Melhor vegetariano de Zurique, muito bem avaliado por celíacos.",
    tags: ["Bem avaliado GF", "Voltaria com certeza"],
  },
];

const DISHES = [
  { id: "d1", name: "Risoto de Cogumelos GF",   photo: "https://images.unsplash.com/photo-1476124369491-e7addf5db371?w=100&h=100&fit=crop", restaurantId: "1" },
  { id: "d2", name: "Bowl de Quinoa",            photo: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=100&h=100&fit=crop", restaurantId: "3" },
  { id: "d3", name: "Prato do dia vegetariano",  photo: "https://images.unsplash.com/photo-1547592166-23ac45744acd?w=100&h=100&fit=crop", restaurantId: "5" },
  { id: "d4", name: "Nhoque sem glúten",         photo: "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?w=100&h=100&fit=crop", restaurantId: "4" },
];

export default function PublicProfilePage() {
  const router = useRouter();

  return (
    <div className="bg-background min-h-dvh" style={{ paddingBottom: "calc(env(safe-area-inset-bottom,0px) + 100px)" }}>

      {/* Header */}
      <div
        className="bg-background sticky top-0 z-40 px-5 pb-3"
        style={{ paddingTop: "calc(env(safe-area-inset-top,0px) + 14px)", boxShadow: "0 2px 12px rgba(0,0,0,0.06)" }}
      >
        <div className="flex items-center gap-3">
          <button
            onClick={() => router.back()}
            className="w-9 h-9 bg-surface rounded-full flex items-center justify-center border border-border shrink-0 active:scale-90 transition-transform"
          >
            <ChevronRight size={18} className="text-text-secondary rotate-180" />
          </button>
          <div>
            <h1 className="text-[17px] font-black text-text-primary leading-tight">Meu perfil público</h1>
            <p className="text-[11px] text-text-disabled">Assim outros usuários te veem</p>
          </div>
        </div>
      </div>

      <div className="px-5 pt-5 space-y-3">

        {/* ── Identity ── */}
        <div
          className="bg-surface rounded-2xl overflow-hidden"
          style={{ boxShadow: "0 2px 12px rgba(0,0,0,0.07)", border: "1px solid var(--color-border)" }}
        >
          <div className="px-4 pt-4 pb-4">
            <div className="flex items-end justify-between mb-2">
              <div className="w-[56px] h-[56px] rounded-full overflow-hidden border-[2.5px]" style={{ borderColor: "#C6F59D", boxShadow: "0 2px 8px rgba(0,0,0,0.10)" }}>
                <Image src={USER.photo} alt={USER.name} width={56} height={56} className="object-cover w-full h-full" unoptimized />
              </div>
              {/* Stats */}
              <div className="flex items-center gap-3 pb-0.5">
                <div className="flex items-center gap-1">
                  <MessageCircle size={11} style={{ color: "#1F3D34" }} />
                  <span className="text-[12px] font-black" style={{ color: "#1F3D34" }}>{USER.reviewCount}</span>
                  <span className="text-[10px] text-text-disabled">avaliações</span>
                </div>
                <div className="flex items-center gap-1">
                  <Calendar size={11} style={{ color: "#1F3D34" }} />
                  <span className="text-[10px] text-text-disabled">desde {USER.memberSince}</span>
                </div>
              </div>
            </div>

            <h2 className="text-[16px] font-black text-text-primary leading-tight">{USER.name}</h2>
            <div className="flex items-center gap-1 mt-0.5 mb-2">
              <MapPin size={10} className="text-text-disabled shrink-0" />
              <span className="text-[11px] text-text-disabled">{USER.location}</span>
            </div>
            {USER.bio && (
              <p className="text-[12px] text-text-secondary leading-relaxed">{USER.bio}</p>
            )}
          </div>
        </div>

        {/* ── Perfil Alimentar ── */}
        <div
          className="bg-surface rounded-2xl p-4"
          style={{ boxShadow: "0 2px 12px rgba(0,0,0,0.06)", border: "1px solid var(--color-border)" }}
        >
          <div className="flex items-center gap-2 mb-3">
            <div className="w-6 h-6 rounded-lg flex items-center justify-center" style={{ backgroundColor: "#C6F59D" }}>
              <Shield size={12} style={{ color: "#1F3D34" }} />
            </div>
            <p className="text-[13px] font-extrabold text-text-primary">Perfil Alimentar</p>
          </div>

          {/* Restrições inline */}
          <div className="flex flex-wrap gap-1.5 mb-3">
            {USER.restrictions.map(r => (
              <span key={r.label} className="text-[11px] font-semibold px-2.5 py-1 rounded-full" style={{ backgroundColor: r.bg, color: r.color }}>
                {r.label}
              </span>
            ))}
          </div>

          {/* Não consome inline */}
          <p className="text-[10px] font-bold text-text-disabled uppercase tracking-wide mb-1.5">Não consome</p>
          <div className="flex flex-wrap gap-1.5">
            {USER.prohibited.map(ing => {
              const col = getIngredientColor(ing);
              return (
                <span key={ing} className="text-[11px] font-semibold px-2.5 py-1 rounded-full line-through" style={{ backgroundColor: col.bg, color: col.color }}>
                  {ing}
                </span>
              );
            })}
          </div>
        </div>

        {/* ── Pratos experimentados ── */}
        <div
          className="bg-surface rounded-2xl p-4"
          style={{ boxShadow: "0 2px 12px rgba(0,0,0,0.06)", border: "1px solid var(--color-border)" }}
        >
          <p className="text-[13px] font-extrabold text-text-primary mb-3">
            Pratos experimentados
            <span className="ml-2 text-[11px] font-semibold text-text-disabled">{DISHES.length} pratos</span>
          </p>
          <div className="flex gap-2 overflow-x-auto pb-1" style={{ scrollbarWidth: "none" }}>
            {DISHES.map(dish => (
              <Link key={dish.id} href={`/restaurante/${dish.restaurantId}`} className="shrink-0 active:scale-95 transition-transform">
                <div className="w-[72px]">
                  <div className="w-[72px] h-[72px] rounded-xl overflow-hidden mb-1">
                    <Image src={dish.photo} alt={dish.name} width={72} height={72} className="object-cover w-full h-full" unoptimized />
                  </div>
                  <p className="text-[10px] font-semibold text-text-primary leading-tight line-clamp-2 text-center">{dish.name}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* ── Avaliações ── */}
        <div
          className="bg-surface rounded-2xl overflow-hidden"
          style={{ boxShadow: "0 2px 12px rgba(0,0,0,0.06)", border: "1px solid var(--color-border)" }}
        >
          <p className="text-[13px] font-extrabold text-text-primary px-4 pt-4 pb-3">
            Restaurantes avaliados
            <span className="ml-2 text-[11px] font-semibold text-text-disabled">{REVIEWS.length} avaliações</span>
          </p>

          {REVIEWS.map((review, i) => (
            <Link
              key={review.id}
              href={`/restaurante/${review.restaurantId}`}
              className="flex items-center gap-3 px-4 py-3 active:bg-background transition-colors"
              style={{ borderTop: i === 0 ? "1px solid var(--color-border)" : "1px solid var(--color-border)" }}
            >
              {/* Foto restaurante */}
              <div className="w-10 h-10 rounded-xl overflow-hidden shrink-0">
                <Image src={review.photo} alt={review.name} width={40} height={40} className="object-cover w-full h-full" unoptimized />
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <p className="text-[13px] font-extrabold text-text-primary truncate">{review.name}</p>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <div className="flex gap-0.5">
                    {Array.from({ length: 5 }).map((_, s) => (
                      <Star key={s} size={9} fill={s < review.rating ? "#F59E0B" : "none"} className={s < review.rating ? "text-warning" : "text-border"} />
                    ))}
                  </div>
                  <span className="text-[10px] text-text-disabled truncate">· {review.comment}</span>
                </div>
                <div className="flex gap-1 mt-1 flex-wrap">
                  {review.tags.map(tag => (
                    <span key={tag} className="text-[9px] font-semibold px-1.5 py-0.5 rounded-full" style={{ backgroundColor: "#C6F59D", color: "#1F3D34" }}>
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <ChevronRight size={14} className="text-text-disabled shrink-0" />
            </Link>
          ))}
        </div>

        {/* Microcópia */}
        <p className="text-[10px] text-text-disabled text-center leading-relaxed pb-2">
          Avaliações baseadas no perfil alimentar desta usuária. Sua experiência pode variar.
        </p>

      </div>
    </div>
  );
}
