"use client";
import Link from "next/link";
import Image from "next/image";
import { Star, ShieldCheck, ThumbsUp, MessageCircle, BadgeCheck } from "lucide-react";
import BackButton from "@/components/BackButton";
import SafetyBadge from "@/components/SafetyBadge";
import RestaurantCard from "@/components/RestaurantCard";
import { mockRestaurants } from "@/lib/data";

const recommended = mockRestaurants.filter(
  (r) => r.safetyLevel === "muito_seguro" || r.safetyLevel === "certificado"
);

const allRestaurants = mockRestaurants.slice(0, 5);

// Feedback highlights — extraído das reviews dos restaurantes
const feedbacks = [
  {
    author: "Ana Paula",
    avatar: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=80&h=80&fit=crop&crop=face",
    restaurant: "Sabor do Brasil",
    rating: 5,
    comment: "Finalmente consegui comer fora sem ansiedade! A equipe entende tudo sobre doença celíaca. Super recomendo para celíacos.",
    tags: ["Equipe treinada", "Sem risco"],
    verified: true,
  },
  {
    author: "Carlos M.",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=face",
    restaurant: "Verde & Saudável",
    rating: 5,
    comment: "Lugar incrível! Cardápio 100% sem glúten, ingredientes de qualidade e ainda muito gostoso. Voltarei sempre.",
    tags: ["Cardápio GF", "Delicioso"],
    verified: true,
  },
  {
    author: "Mariana S.",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop&crop=face",
    restaurant: "Cantina da Nona",
    rating: 4,
    comment: "Perguntei sobre contaminação cruzada e eles souberam responder tudo. Me senti muito segura aqui.",
    tags: ["Transparência", "Confiável"],
    verified: true,
  },
];

export default function RecomendadosPage() {
  return (
    <div
      className="min-h-dvh bg-background"
      style={{ paddingBottom: "calc(env(safe-area-inset-bottom, 0px) + 100px)" }}
    >
      {/* ── Header ── */}
      <div
        className="px-5 pb-4 bg-background sticky top-0 z-30"
        style={{ paddingTop: "calc(env(safe-area-inset-top, 0px) + 14px)" }}
      >
        <div className="flex items-start gap-3">
          <BackButton />
          <div>
            <h1 className="font-black text-primary text-base font-display leading-tight">Recomendados</h1>
            <p className="text-[12px] text-text-disabled mt-0.5">Baseado no seu perfil</p>
          </div>
        </div>
      </div>

      {/* ── Hero ── */}
      <div
        className="mx-5 mb-6 rounded-[22px] px-5 py-5"
        style={{ background: "linear-gradient(135deg, #1F3D34 0%, #4A7C55 100%)" }}
      >
        <span className="inline-block text-[10px] font-extrabold px-3 py-1 rounded-full uppercase tracking-widest mb-3" style={{ backgroundColor: "#C6F59D", color: "#1F3D34" }}>
          NOVO
        </span>
        <h2 className="text-white font-extrabold text-[20px] leading-snug mb-2 font-display">
          Novos restaurantes<br />recomendados
        </h2>
        <p className="text-white/70 text-sm">
          Baseado no seu padrão de segurança
        </p>
        <div className="flex items-center gap-4 mt-4">
          <div className="flex items-center gap-1.5">
            <ShieldCheck size={14} style={{ color: "#C6F59D" }} />
            <span className="text-white text-xs font-semibold">{allRestaurants.length} restaurantes</span>
          </div>
          <div className="flex items-center gap-1.5">
            <MessageCircle size={14} style={{ color: "#C6F59D" }} />
            <span className="text-white text-xs font-semibold">Avaliados por celíacos</span>
          </div>
        </div>
      </div>

      {/* ── Destaques da comunidade ── */}
      <div className="mb-6">
        <div className="flex items-center justify-between px-5 mb-3">
          <h3 className="font-extrabold text-text-primary text-base">O que celíacos dizem</h3>
          <div className="flex items-center gap-1">
            <BadgeCheck size={13} className="text-primary" />
            <span className="text-[11px] font-bold text-primary">Verificados</span>
          </div>
        </div>

        <div className="flex gap-3 overflow-x-auto px-5 pb-2">
          {feedbacks.map((fb, i) => (
            <div
              key={i}
              className="shrink-0 bg-surface rounded-[18px] p-4"
              style={{ width: 260, boxShadow: "0 2px 12px rgba(0,0,0,0.07)" }}
            >
              {/* Header do feedback */}
              <div className="flex items-center gap-2.5 mb-3">
                <div className="w-9 h-9 rounded-full overflow-hidden shrink-0">
                  <Image src={fb.avatar} alt={fb.author} width={36} height={36} className="object-cover" unoptimized />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-text-primary text-[12px] truncate">{fb.author}</p>
                  <p className="text-text-disabled text-[10px] truncate">{fb.restaurant}</p>
                </div>
                {fb.verified && (
                  <BadgeCheck size={14} className="text-primary shrink-0" />
                )}
              </div>

              {/* Stars */}
              <div className="flex items-center gap-0.5 mb-2">
                {Array.from({ length: 5 }).map((_, si) => (
                  <Star
                    key={si}
                    size={11}
                    fill={si < fb.rating ? "#F59E0B" : "none"}
                    className={si < fb.rating ? "text-warning" : "text-border"}
                  />
                ))}
              </div>

              {/* Comentário */}
              <p className="text-text-secondary text-[11px] leading-relaxed mb-3 line-clamp-3">
                "{fb.comment}"
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-1.5">
                {fb.tags.map((tag, ti) => (
                  <span
                    key={ti}
                    className="text-[10px] font-bold px-2 py-0.5 rounded-full"
                    style={{ backgroundColor: "#C6F59D", color: "#1F3D34" }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Lista de restaurantes ── */}
      <div className="px-5">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-extrabold text-text-primary text-base">Restaurantes seguros</h3>
          <span className="text-[11px] text-text-disabled">{allRestaurants.length} encontrados</span>
        </div>

        <div className="space-y-3">
          {allRestaurants.map((r) => (
            <RestaurantCard key={r.id} restaurant={r} variant="horizontal" />
          ))}
        </div>
      </div>
    </div>
  );
}
