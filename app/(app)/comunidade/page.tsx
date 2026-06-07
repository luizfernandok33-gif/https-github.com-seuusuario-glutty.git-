"use client";
import { useState } from "react";
import { Search, Star, MapPin, MessageCircle, ThumbsUp, Shield, ChevronRight, X, BadgeCheck, Store, Users } from "lucide-react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

const reviews = [
  {
    id: "1",
    author: "Ana Paula",
    photo: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=80&h=80&fit=crop&crop=face",
    restaurantName: "Le Manjue Organique",
    restaurantId: "1",
    rating: 5,
    comment: "Melhor restaurante para celíacos de SP! Me sinto completamente segura aqui. O atendimento é impecável e a comida é deliciosa.",
    date: "10/03/2024",
    likes: 24,
    verified: true,
    tags: ["Sem contaminação", "Equipe bem informada", "Me senti seguro"],
    dishPhotos: [
      "https://images.unsplash.com/photo-1476124369491-e7addf5db371?w=120&h=120&fit=crop",
      "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?w=120&h=120&fit=crop",
    ],
  },
  {
    id: "2",
    author: "Carlos M.",
    photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=face",
    restaurantName: "Hiltl · Zurique",
    restaurantId: "5",
    rating: 5,
    comment: "Fui com minha filha celíaca e foi uma experiência incrível. Pela primeira vez ela pode comer de tudo no cardápio sem preocupação!",
    date: "08/03/2024",
    likes: 18,
    verified: true,
    tags: ["Voltaria com certeza", "Cardápio claro", "Equipe bem informada"],
    dishPhotos: [
      "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=120&h=120&fit=crop",
      "https://images.unsplash.com/photo-1547592166-23ac45744acd?w=120&h=120&fit=crop",
    ],
  },
  {
    id: "3",
    author: "Mariana S.",
    photo: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=80&h=80&fit=crop&crop=face",
    restaurantName: "Quinoa Restaurante",
    restaurantId: "3",
    rating: 5,
    comment: "Ambiente lindo e comida deliciosa. Eles realmente entendem sobre celíaca! Voltarei com certeza.",
    date: "05/03/2024",
    likes: 31,
    verified: true,
    tags: ["Ambiente limpo", "Me senti seguro", "Sem contaminação"],
    dishPhotos: [
      "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=120&h=120&fit=crop",
      "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=120&h=120&fit=crop",
    ],
  },
  {
    id: "4",
    author: "Roberto F.",
    photo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&h=80&fit=crop&crop=face",
    restaurantName: "Empório Zitti",
    restaurantId: "4",
    rating: 4,
    comment: "Boa experiência. O nhoque sem glúten é delicioso e o atendente foi atencioso ao explicar os processos.",
    date: "01/03/2024",
    likes: 9,
    verified: true,
    tags: ["Cardápio claro", "Precisa melhorar"],
    dishPhotos: [
      "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?w=120&h=120&fit=crop",
    ],
  },
];

export default function ComunidadePage() {
  const router = useRouter();
  const [searchValue,   setSearchValue]   = useState("");
  const [likedReviews,  setLikedReviews]  = useState<string[]>([]);
  const [lightbox,      setLightbox]      = useState<string | null>(null);

  const toggleLike = (id: string) => {
    setLikedReviews(prev =>
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  const filtered = reviews.filter(r =>
    !searchValue || r.restaurantName.toLowerCase().includes(searchValue.toLowerCase()) ||
    r.author.toLowerCase().includes(searchValue.toLowerCase())
  );

  return (
    <div className="bg-background min-h-dvh" style={{ paddingBottom: "calc(env(safe-area-inset-bottom,0px) + 100px)", fontFamily: "var(--font-nunito), 'Nunito', sans-serif" }}>

      {/* ── Header fixo ── */}
      <div
        className="bg-background sticky top-0 z-40 px-5 pb-4"
        style={{
          paddingTop: "calc(env(safe-area-inset-top, 0px) + 28px)",
          boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
        }}
      >
        {/* Título */}
        <div className="flex items-start gap-3 mb-4">
          <button
            onClick={() => router.back()}
            className="w-9 h-9 rounded-full flex items-center justify-center shrink-0 active:scale-90 transition-transform"
            style={{ backgroundColor: "#1F3D34" }}
          >
            <ChevronRight size={18} className="rotate-180" style={{ color: "white" }} />
          </button>
          <div>
            <h1 className="text-[22px] font-black text-primary font-display leading-tight">Comunidade</h1>
            <p className="text-[12px] text-text-disabled mt-0.5">Experiências reais de celíacos</p>
          </div>
        </div>

        {/* Search */}
        <div
          className="flex items-center gap-3 bg-surface rounded-full px-4 py-3.5 border border-border/60 mb-4"
          style={{ boxShadow: "0 2px 10px rgba(0,0,0,0.07)" }}
        >
          <Search size={16} className="text-text-disabled shrink-0" />
          <input
            value={searchValue}
            onChange={e => setSearchValue(e.target.value)}
            placeholder="Buscar por restaurante ou usuário..."
            className="flex-1 text-[14px] text-text-primary outline-none placeholder:text-text-disabled bg-transparent font-medium"
          />
        </div>

        {/* Stats */}
        <div className="flex gap-3 mb-4">
          {[
            { value: "142", label: "Avaliações",   icon: Star,  color: "#7C3AED", bg: "#EDE9FE" },
            { value: "38",  label: "Restaurantes", icon: Store, color: "#1F3D34", bg: "#C6F59D" },
            { value: "521", label: "Celíacos",     icon: Users, color: "#0E7490", bg: "#CFFAFE" },
          ].map(stat => (
            <div key={stat.label} className="flex-1 rounded-2xl p-3 text-center" style={{ backgroundColor: stat.bg }}>
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center mx-auto mb-1.5"
                style={{ backgroundColor: `${stat.color}20` }}
              >
                <stat.icon size={15} style={{ color: stat.color }} strokeWidth={2.3} />
              </div>
              <p className="text-xl" style={{ color: stat.color, fontFamily: "var(--font-nunito), 'Nunito', sans-serif", fontWeight: 900 }}>{stat.value}</p>
              <p className="text-[10px] mt-0.5" style={{ color: stat.color, opacity: 0.75, fontFamily: "var(--font-nunito), 'Nunito', sans-serif", fontWeight: 900 }}>{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Banner verificado */}
        <div className="rounded-2xl px-4 py-3 flex items-center gap-3 mb-1" style={{ backgroundColor: "#1F3D34" }}>
          <BadgeCheck size={16} strokeWidth={2.2} style={{ color: "#C6F59D" }} className="shrink-0" />
          <div>
            <p className="font-bold text-[12px]" style={{ color: "#C6F59D" }}>Avaliações verificadas</p>
            <p className="text-[11px]" style={{ color: "#C6F59D", opacity: 0.75 }}>
              Feedbacks reais — o restaurante não pode alterar avaliações.
            </p>
          </div>
        </div>

        {/* Título da lista */}
        <p className="font-extrabold text-text-primary text-[15px] mt-4">Avaliações recentes</p>
      </div>

      {/* ── Reviews ── */}
      <div className="px-5 space-y-4 pt-4">

        {filtered.map(review => (
          <div
            key={review.id}
            className="bg-surface rounded-2xl p-4"
            style={{ boxShadow: "0 2px 14px rgba(0,0,0,0.08)", border: "1px solid var(--color-border)" }}
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-full overflow-hidden shrink-0 border-2 border-border">
                  <Image src={review.photo} alt={review.author} width={44} height={44} className="object-cover w-full h-full" unoptimized />
                </div>
                <div>
                  <p className="font-extrabold text-[14px] text-text-primary leading-tight">{review.author}</p>
                  <p className="text-[11px] text-text-disabled mt-0.5">
                    <Link href={`/restaurante/${review.restaurantId}`} className="font-semibold" style={{ color: "#1F3D34" }}>
                      {review.restaurantName}
                    </Link>
                    {" "}· {review.date}
                  </p>
                </div>
              </div>
              {/* Selo verificado */}
              {review.verified && (
                <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-full" style={{ backgroundColor: "#1F3D34" }}>
                  <BadgeCheck size={14} strokeWidth={2.2} style={{ color: "#C6F59D" }} />
                  <span className="text-[11px] font-bold" style={{ color: "#C6F59D" }}>Verificado</span>
                </div>
              )}
            </div>

            {/* Estrelas */}
            <div className="flex gap-0.5 mb-2.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} size={14} fill={i < review.rating ? "#F59E0B" : "none"} className={i < review.rating ? "text-warning" : "text-border"} />
              ))}
            </div>

            {/* Comentário */}
            <p className="text-[13px] text-text-secondary leading-relaxed mb-3">
              "{review.comment}"
            </p>

            {/* Fotos dos pratos */}
            <div className="flex gap-2 mb-3">
              {review.dishPhotos.map((photo, i) => (
                <button
                  key={i}
                  onClick={() => setLightbox(photo.replace("w=120&h=120", "w=800&h=800"))}
                  className="w-[72px] h-[72px] rounded-xl overflow-hidden shrink-0 active:scale-95 transition-transform"
                  style={{ boxShadow: "0 2px 8px rgba(0,0,0,0.12)" }}
                >
                  <Image src={photo} alt="Prato avaliado" width={72} height={72} className="object-cover w-full h-full" unoptimized />
                </button>
              ))}
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-1.5 mb-3">
              {review.tags.map(tag => (
                <span
                  key={tag}
                  className="text-[11px] px-2.5 py-1 rounded-full"
                  style={{ backgroundColor: "#C6F59D", color: "#1F3D34", fontFamily: "var(--font-nunito), 'Nunito', sans-serif", fontWeight: 900 }}
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Ações */}
            <div className="flex items-center gap-4 pt-2.5 border-t border-border">
              <button
                onClick={() => toggleLike(review.id)}
                className="flex items-center gap-1.5 text-[12px] font-semibold active:scale-90 transition-all"
                style={{ color: likedReviews.includes(review.id) ? "#1F3D34" : "var(--color-text-disabled)" }}
              >
                <ThumbsUp size={13} fill={likedReviews.includes(review.id) ? "currentColor" : "none"} />
                {review.likes + (likedReviews.includes(review.id) ? 1 : 0)} útil
              </button>
              <button className="flex items-center gap-1.5 text-[12px] font-semibold active:scale-90 transition-transform text-text-disabled">
                <MessageCircle size={13} />
                Comentar
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* ── Lightbox ── */}
      {lightbox && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center"
          style={{ backgroundColor: "rgba(0,0,0,0.88)" }}
          onClick={() => setLightbox(null)}
        >
          {/* Botão fechar */}
          <button
            onClick={() => setLightbox(null)}
            className="absolute top-5 right-5 w-9 h-9 rounded-full flex items-center justify-center active:scale-90 transition-transform"
            style={{ backgroundColor: "rgba(255,255,255,0.15)" }}
          >
            <X size={18} color="#fff" />
          </button>

          {/* Imagem */}
          <div
            className="relative rounded-2xl overflow-hidden"
            style={{ width: "72vw", aspectRatio: "1 / 1" }}
            onClick={e => e.stopPropagation()}
          >
            <Image
              src={lightbox}
              alt="Foto do prato"
              fill
              className="object-cover"
              unoptimized
            />
          </div>
        </div>
      )}

    </div>
  );
}
