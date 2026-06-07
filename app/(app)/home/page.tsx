"use client";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Search, Shield, ChevronRight, Star, Heart, X, Check, Camera, MapPin, Globe, Building2, Clock, BadgeCheck } from "lucide-react";
import RestaurantCard from "@/components/RestaurantCard";
import SafetyBadge from "@/components/SafetyBadge";
import { DishImagePlaceholder } from "@/components/DishPlaceholder";
import { mockRestaurants, mockDishes, safetyLevelConfig } from "@/lib/data";
import type { SafetyLevel, Restaurant } from "@/lib/data";

// ── Localização ───────────────────────────────────────────────────────────────
const LOCATION_RECENT_KEY = "glutty_home_locations";

const LOCATION_SUGGESTIONS = [
  { label: "São Paulo",            type: "cidade"  as const, match: ["são paulo", "sp", "sao paulo"] },
  { label: "João Pessoa",          type: "cidade"  as const, match: ["joão pessoa", "joao pessoa", "pb"] },
  { label: "Porto Alegre",         type: "cidade"  as const, match: ["porto alegre", "rs"] },
  { label: "Zürich",               type: "cidade"  as const, match: ["zürich", "zurich", "zurique", "zh"] },
  { label: "Kemptthal",            type: "cidade"  as const, match: ["kemptthal"] },
  { label: "Brasil",               type: "pais"    as const, match: ["brasil", "brazil", "br"] },
  { label: "Suíça",                type: "pais"    as const, match: ["suíça", "suica", "switzerland", "ch"] },
  { label: "SP — São Paulo",       type: "estado"  as const, match: ["sp — são paulo", "estado de são paulo"] },
  { label: "PB — Paraíba",         type: "estado"  as const, match: ["pb — paraíba", "paraíba", "paraiba"] },
  { label: "RS — Rio Grande do Sul", type: "estado" as const, match: ["rs — rio grande do sul", "rio grande do sul"] },
];

function getRegionInfo(city: string): { country: string; state: string } {
  const c = (city ?? "").toLowerCase();
  if (["zürich", "zurique", "zurich", "kemptthal"].includes(c)) return { country: "Suíça",  state: "Zürich" };
  if (c === "joão pessoa")   return { country: "Brasil", state: "Paraíba" };
  if (c === "porto alegre")  return { country: "Brasil", state: "Rio Grande do Sul" };
  if (c.includes("são paulo") || c === "") return { country: "Brasil", state: "São Paulo" };
  return { country: "Brasil", state: "" };
}

function matchesLocation(city: string, query: string): boolean {
  if (!query) return true;
  const q = query.toLowerCase().trim();
  const c = (city ?? "").toLowerCase();
  const { country, state } = getRegionInfo(city);
  // Aliases de estado abreviados
  const stateAliases: Record<string, string> = {
    "sp": "São Paulo", "pb": "Paraíba", "rs": "Rio Grande do Sul",
  };
  const resolvedState = stateAliases[q] ?? "";

  return (
    c.includes(q) || q.includes(c) ||
    country.toLowerCase().includes(q) ||
    state.toLowerCase().includes(q) ||
    (resolvedState !== "" && state === resolvedState)
  );
}

function proximityScore(city: string, refCity: string): number {
  const r = getRegionInfo(city);
  const ref = getRegionInfo(refCity || "São Paulo");
  if ((city ?? "").toLowerCase() === (refCity ?? "").toLowerCase()) return 0;
  if (r.country === ref.country) return 1;
  return 2;
}

function filterSuggestions(input: string) {
  if (!input.trim()) return [];
  const q = input.toLowerCase();
  return LOCATION_SUGGESTIONS.filter(
    s => s.label.toLowerCase().includes(q) || s.match.some(m => m.includes(q))
  ).slice(0, 5);
}

function loadRecentLocations(): string[] {
  try { return JSON.parse(localStorage.getItem(LOCATION_RECENT_KEY) ?? "[]"); } catch { return []; }
}
function saveRecentLocation(term: string) {
  const prev = loadRecentLocations().filter(s => s.toLowerCase() !== term.toLowerCase());
  localStorage.setItem(LOCATION_RECENT_KEY, JSON.stringify([term, ...prev].slice(0, 5)));
}

type LocType = "cidade" | "estado" | "pais" | "recent";
function LocIcon({ type }: { type: LocType }) {
  if (type === "recent") return <Clock    size={13} className="shrink-0" style={{ color: "#B0977E" }} />;
  if (type === "pais")   return <Globe    size={13} className="shrink-0" style={{ color: "#5B7FA6" }} />;
  if (type === "estado") return <Building2 size={13} className="shrink-0" style={{ color: "#A07050" }} />;
  return                        <MapPin   size={13} className="shrink-0" style={{ color: "#4A9070" }} />;
}

// Ordem do mais seguro para menos seguro
const SAFETY_ORDER: SafetyLevel[] = ["certificado", "muito_seguro", "verificado", "seguro", "moderado", "cuidado"];

const SAFETY_OPTIONS: { level: SafetyLevel; description: string }[] = [
  { level: "certificado",  description: "Altamente avaliado e recomendado por celíacos"   },
  { level: "muito_seguro", description: "Protocolo rigoroso, sem risco de contaminação"   },
  { level: "verificado",   description: "Verificado e aprovado pela comunidade Glútty"    },
  { level: "seguro",       description: "Adaptações disponíveis com cuidado"              },
  { level: "moderado",     description: "Pratos sem glúten, atenção à contaminação"       },
];

function meetsPreference(restaurantLevel: SafetyLevel, preference: SafetyLevel): boolean {
  const rIdx = SAFETY_ORDER.indexOf(restaurantLevel);
  const pIdx = SAFETY_ORDER.indexOf(preference);
  if (rIdx === -1 || pIdx === -1) return true;
  return rIdx <= pIdx; // quanto menor o índice, mais seguro
}

type DishData = { id: string; name: string; restaurantName: string; restaurantId?: string; dishId?: string; rating: number; image: string };

const DISH_PREVIEWS: Record<string, {
  reviewCount: number;
  avatars: string[];
  topReview: { author: string; avatar: string; comment: string; stars: number; date: string };
}> = {
  dd1: {
    reviewCount: 43,
    avatars: [
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=face",
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop&crop=face",
      "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=80&h=80&fit=crop&crop=face",
    ],
    topReview: { author: "Mariana L.", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=face", comment: "A Marguerita da Pizza For Fun é perfeita — massa crocante, sem glúten de verdade. Não tive nenhuma reação!", stars: 5, date: "há 2 dias" },
  },
  dd2: {
    reviewCount: 28,
    avatars: [
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop&crop=face",
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&h=80&fit=crop&crop=face",
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=face",
    ],
    topReview: { author: "Felipe S.", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop&crop=face", comment: "O pão francês do Grão Fino é incrível, parece um pão normal de padaria. A equipe sabe muito sobre celíaca!", stars: 5, date: "há 3 dias" },
  },
  dd3: {
    reviewCount: 35,
    avatars: [
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&h=80&fit=crop&crop=face",
      "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=80&h=80&fit=crop&crop=face",
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop&crop=face",
    ],
    topReview: { author: "Anna K.", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&h=80&fit=crop&crop=face", comment: "A tarte de framboesa da Jackie's é uma obra de arte — linda e deliciosa. 100% sem glúten e sem sintomas.", stars: 5, date: "há 1 semana" },
  },
  dd4: {
    reviewCount: 19,
    avatars: [
      "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=80&h=80&fit=crop&crop=face",
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=face",
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&h=80&fit=crop&crop=face",
    ],
    topReview: { author: "Giulia R.", avatar: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=80&h=80&fit=crop&crop=face", comment: "O bowl da Libera é fresquinho e nutritivo. Ambiente acolhedor e totalmente seguro para celíacos.", stars: 5, date: "há 4 dias" },
  },
  dd5: {
    reviewCount: 22,
    avatars: [
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=face",
      "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=80&h=80&fit=crop&crop=face",
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop&crop=face",
    ],
    topReview: { author: "Marco B.", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=face", comment: "A Marinara do Granò é autentica — masa napolitana, sem glúten. Uma das melhores pizzas que já comi na Suíça!", stars: 5, date: "há 5 dias" },
  },
  dd6: {
    reviewCount: 14,
    avatars: [
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop&crop=face",
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&h=80&fit=crop&crop=face",
      "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=80&h=80&fit=crop&crop=face",
    ],
    topReview: { author: "Sophie M.", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop&crop=face", comment: "As brioches da À VIE são leves e macias demais. Nunca imaginei que sem glúten poderia ser tão bom!", stars: 5, date: "há 2 dias" },
  },
};

function DishCard({ dish }: { dish: DishData }) {
  const router = useRouter();
  const [fav, setFav] = useState(false);
  const preview = DISH_PREVIEWS[dish.id];
  const href = dish.restaurantId && dish.dishId
    ? `/restaurante/${dish.restaurantId}/prato/${dish.dishId}`
    : `/restaurante/${dish.restaurantId ?? ""}`;

  return (
    <Link
      href={href}
      className="shrink-0 overflow-hidden active:scale-[0.97] transition-transform cursor-pointer relative block"
      style={{ width: 160, height: 240, borderRadius: 20, boxShadow: "0 4px 18px rgba(0,0,0,0.14)" }}
    >
      {/* Full-card image */}
      {dish.image ? (
        <Image src={dish.image} alt={dish.name} fill className="object-cover" unoptimized />
      ) : (
        <DishImagePlaceholder rounded={20} />
      )}

      {/* Subtle gradient — only bottom third */}
      <div
        className="absolute inset-0"
        style={{ background: "linear-gradient(to bottom, transparent 45%, rgba(0,0,0,0.72) 100%)" }}
      />

      {/* Save button — Pinterest style: solid colored circle top-right */}
      <button
        onClick={(e) => { e.stopPropagation(); setFav(!fav); }}
        className="absolute top-3 right-3 z-10 w-9 h-9 rounded-full flex items-center justify-center shadow-lg active:scale-90 transition-all"
        style={{ backgroundColor: fav ? "#e60023" : "rgba(255,255,255,0.92)" }}
      >
        <Heart
          size={15}
          fill={fav ? "#fff" : "none"}
          strokeWidth={fav ? 0 : 2}
          style={{ color: fav ? "#fff" : "#111" }}
        />
      </button>

      {/* Rating — top left, minimal pill */}
      <div className="absolute top-3 left-3 z-10 flex items-center gap-0.5 bg-black/40 rounded-full px-2 py-1 backdrop-blur-sm">
        <Star size={9} fill="#F59E0B" style={{ color: "#F59E0B" }} />
        <span className="text-[10px] font-semibold text-white">{dish.rating}</span>
      </div>

      {/* Bottom content */}
      <div className="absolute z-10 left-0 right-0" style={{ bottom: 0, padding: "0 12px 12px" }}>
        {/* Dish name */}
        <p className="text-white font-semibold text-[14px] leading-tight mb-1">{dish.name}</p>
        {/* Restaurant */}
        <p className="text-white/55 text-[9px] font-semibold uppercase tracking-wider mb-3">{dish.restaurantName}</p>

        {/* Avatars + Feedback */}
        <button
          type="button"
          onClick={(e) => { e.stopPropagation(); }}
          className="flex items-center gap-2 active:opacity-70 transition-opacity"
        >
          <div className="flex">
            {preview.avatars.map((src, i) => (
              <div
                key={i}
                className="w-[24px] h-[24px] rounded-full overflow-hidden shrink-0"
                style={{ border: "2px solid rgba(255,255,255,0.35)", marginLeft: i > 0 ? -7 : 0, position: "relative", zIndex: preview.avatars.length - i }}
              >
                <Image src={src} alt="" width={24} height={24} className="object-cover w-full h-full" unoptimized />
              </div>
            ))}
          </div>
          <span className="text-[10px] font-semibold" style={{ color: "#a8c09a" }}>Feedback</span>
          <ChevronRight size={9} strokeWidth={2.5} style={{ color: "#6aaa62" }} />
        </button>
      </div>
    </Link>
  );
}

function FeedbackBottomSheet({ dishId, onClose }: { dishId: string; onClose: () => void }) {
  const data = DISH_PREVIEWS[dishId];
  if (!data) return null;
  const { topReview, avatars, reviewCount } = data;

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 z-40" style={{ background: "rgba(0,0,0,0.45)" }} onClick={onClose} />

      {/* Sheet */}
      <div
        className="fixed left-0 right-0 z-50 rounded-t-[28px] px-5 pt-5 pb-8"
        style={{ bottom: 0, background: "#fff", boxShadow: "0 -8px 40px rgba(0,0,0,0.18)" }}
      >
        {/* Handle */}
        <div className="w-10 h-1 rounded-full bg-gray-200 mx-auto mb-5" />

        {/* Avatars row + count */}
        <div className="flex items-center gap-3 mb-5">
          <div className="flex">
            {avatars.map((src, i) => (
              <div
                key={i}
                className="w-9 h-9 rounded-full overflow-hidden border-2 border-white shrink-0"
                style={{ marginLeft: i > 0 ? -10 : 0, position: "relative", zIndex: avatars.length - i }}
              >
                <Image src={src} alt="" width={36} height={36} className="object-cover" unoptimized />
              </div>
            ))}
          </div>
          <div>
            <p className="font-semibold text-gray-800 text-[13px]">+{reviewCount} celíacos avaliaram</p>
            <p className="text-gray-400 text-[11px] mt-0.5">Veja o que estão dizendo</p>
          </div>
        </div>

        {/* Top review */}
        <div className="rounded-2xl p-4 mb-5" style={{ backgroundColor: "#f8f6f2" }}>
          <div className="flex items-center gap-2.5 mb-3">
            <div className="w-8 h-8 rounded-full overflow-hidden border-2 shrink-0" style={{ borderColor: "#e8ede5" }}>
              <Image src={topReview.avatar} alt={topReview.author} width={32} height={32} className="object-cover" unoptimized />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-gray-800 text-[12px]">{topReview.author}</p>
              <p className="text-gray-400 text-[10px]">{topReview.date}</p>
            </div>
            <div className="flex items-center gap-0.5">
              {[1,2,3,4,5].map((i) => (
                <Star key={i} size={11} fill={i <= topReview.stars ? "#c9a84c" : "#e0dcd0"} style={{ color: i <= topReview.stars ? "#c9a84c" : "#e0dcd0" }} />
              ))}
            </div>
          </div>
          <p className="text-gray-600 text-[12.5px] leading-relaxed pl-3" style={{ borderLeft: "2px solid #c5d8b8" }}>
            {topReview.comment}
          </p>
        </div>

        {/* CTA */}
        <button
          className="w-full py-4 rounded-full font-semibold text-[14px] active:scale-95 transition-transform"
          style={{ backgroundColor: "#C6F59D", color: "#1F3D34" }}
        >
          Ver todos os feedbacks deste prato
        </button>
      </div>
    </>
  );
}

const categories = [
  { id: "mais-seguros", label: "Mais\nseguros",         icon: "/feliz.png",   bg: "#E4EFC6", color: "#2E4F2A", href: "/categoria/mais-seguros"    },
  { id: "festa",        label: "Festa sem\nglúten",     icon: "/festa.png",   bg: "#FDEFCC", color: "#6B5F2A", href: "/categoria/festa"   },
  { id: "familia",      label: "Para a\nfamília",       icon: "/familia.png", bg: "#DDEFE5", color: "#1F4A44", href: "/categoria/familia" },
  { id: "doces",        label: "Doces sem\nglúten",     icon: "/doces.png",   bg: "#F0E0F2", color: "#5A4580", href: "/categoria/doces"   },
  { id: "amigos",       label: "Para sair\ncom amigos", icon: "/amigos.png",  bg: "#D9E7F0", color: "#1F4A60", href: "/categoria/amigos"  },
];

// ── Skeleton card (layout sem conteúdo) ──────────────────────────────────────
function SkeletonCard({ width = 168 }: { width?: number }) {
  return (
    <div className="shrink-0" style={{ width }}>
      <div className="skeleton w-full mb-2.5" style={{ height: 160, borderRadius: 16 }} />
      <div className="skeleton h-3.5 w-3/4 mb-1.5" />
      <div className="skeleton h-3 w-1/2 mb-2" />
      <div className="skeleton h-3 w-1/4" />
    </div>
  );
}

export default function HomePage() {
  const router = useRouter();
  const [activeCategory,    setActiveCategory]    = useState<string | null>(null);
  const [searchInput,       setSearchInput]       = useState("");
  const [locationFilter,    setLocationFilter]    = useState("São Paulo");
  const [showDropdown,      setShowDropdown]      = useState(false);
  const [recentLocations,   setRecentLocations]   = useState<string[]>([]);
  const [safetyPreference,  setSafetyPreference]  = useState<SafetyLevel>("seguro");
  const [showSafetySheet,   setShowSafetySheet]   = useState(false);
  const [reviewSlide,       setReviewSlide]       = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => { setRecentLocations(loadRecentLocations()); }, []);

  // Auto-avança o slide de reviews a cada 5s
  useEffect(() => {
    const timer = setInterval(() => {
      setReviewSlide(prev => (prev + 1) % 3);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  // ── Filtragem por localização ─────────────────────────────────────────────
  const localRestaurants = mockRestaurants.filter(r =>
    matchesLocation(r.city, locationFilter) && meetsPreference(r.safetyLevel, safetyPreference)
  );
  const nearbyRestaurants = mockRestaurants
    .filter(r => !matchesLocation(r.city, locationFilter) && meetsPreference(r.safetyLevel, safetyPreference))
    .sort((a, b) => proximityScore(a.city, locationFilter) - proximityScore(b.city, locationFilter));

  const hasLocalResults = localRestaurants.length > 0;

  // Pratos: mapeia restaurante → cidade
  const restaurantCityMap = Object.fromEntries(mockRestaurants.map(r => [r.name, r.city]));
  const localDishes  = mockDishes.filter(d => matchesLocation(restaurantCityMap[d.restaurantName] ?? "", locationFilter));
  const nearbyDishes = mockDishes.filter(d => !matchesLocation(restaurantCityMap[d.restaurantName] ?? "", locationFilter));

  const suggestions = filterSuggestions(searchInput);
  const showDropdownContent = showDropdown && (searchInput.trim() ? suggestions.length > 0 : recentLocations.length > 0);

  const applyLocation = (label: string) => {
    setLocationFilter(label);
    setSearchInput(label);
    setShowDropdown(false);
    saveRecentLocation(label);
    setRecentLocations(loadRecentLocations());
    inputRef.current?.blur();
  };

  const clearLocation = () => {
    setLocationFilter("São Paulo");
    setSearchInput("");
    setShowDropdown(false);
  };

  const removeRecent = (term: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const updated = recentLocations.filter(s => s !== term);
    setRecentLocations(updated);
    localStorage.setItem(LOCATION_RECENT_KEY, JSON.stringify(updated));
  };

  return (
    <div className="bg-background min-h-dvh" onClick={() => showDropdown && setShowDropdown(false)}>

      {/* ── Header ── */}
      <div className="px-5 pb-4" style={{ paddingTop: "calc(env(safe-area-inset-top, 0px) + 48px)" }}>
        {/* Linha superior: saudação + foto + sino */}
        <div className="flex items-center justify-between gap-3">

          {/* Esquerda: texto */}
          <div className="flex-1 min-w-0 pt-1">
            <p className="text-text-secondary text-[13px] leading-snug mb-1">
              {(() => {
                const h = new Date().getHours();
                if (h < 12) return "Bom dia";
                if (h < 18) return "Boa tarde";
                return "Boa noite";
              })()}
            </p>
            <h1 style={{ fontFamily: "var(--font-nunito), 'Nunito', sans-serif", fontSize: 32, fontWeight: 900, lineHeight: "36px", letterSpacing: "-0.5px", color: "#2E7D32" }}>
              Michelle
            </h1>
            <p className="text-text-secondary text-[13px] mt-1.5 leading-snug">
              Aonde você quer comer hoje?
            </p>
          </div>

          {/* Direita: foto de perfil */}
          <div className="flex flex-col items-center shrink-0">
            <Link href="/perfil" className="relative block active:scale-95 transition-transform">
              <div
                className="w-[72px] h-[72px] rounded-full overflow-hidden bg-surface shadow-md"
              >
                <Image
                  src="/michelle.jpg.jpg"
                  alt="Michelle"
                  width={96}
                  height={96}
                  className="object-cover w-full h-full"
                  style={{ objectPosition: "center top", transform: "scale(1.45)", transformOrigin: "center 12%" }}
                  unoptimized
                />
              </div>
            </Link>
          </div>
        </div>
      </div>

      {/* ── Search Bar ── */}
      <div className="px-5 mb-5">
        <div className="relative">
          <div
            className="flex items-center gap-3 bg-surface px-4 py-3.5 border transition-all"
            style={{
              borderRadius: showDropdownContent ? "20px 20px 0 0" : 999,
              boxShadow: showDropdownContent ? "0 4px 20px rgba(31,61,52,0.13)" : "0 2px 10px rgba(0,0,0,0.07)",
              borderColor: showDropdownContent ? "#1F3D34" : "rgba(0,0,0,0.08)",
            }}
          >
            <MapPin size={15} className="shrink-0" style={{ color: showDropdownContent ? "#1F3D34" : "#B0977E" }} />
            <input
              ref={inputRef}
              value={searchInput}
              onChange={e => { setSearchInput(e.target.value); setShowDropdown(true); }}
              onFocus={() => setShowDropdown(true)}
              onKeyDown={e => {
                if (e.key === "Enter" && searchInput.trim()) applyLocation(searchInput.trim());
                if (e.key === "Escape") setShowDropdown(false);
              }}
              placeholder="Cidade ou país…"
              className="flex-1 min-w-0 text-[14px] text-text-primary outline-none placeholder:text-text-disabled bg-transparent font-semibold"
            />
            {searchInput && (
              <button onClick={clearLocation} className="active:scale-90 shrink-0">
                <X size={14} className="text-text-disabled" />
              </button>
            )}
            <div className="w-px h-4 bg-border shrink-0" />
            <button
              onClick={() => router.push("/perfil/seguranca")}
              className="shield-pulse flex items-center gap-1.5 rounded-full px-2.5 py-1.5 shrink-0 active:scale-95 transition-transform"
              style={{ backgroundColor: "#E8F5E9" }}
            >
              <Shield size={12} fill="#2E7D32" strokeWidth={2} style={{ color: "#2E7D32" }} />
              <span className="text-[11px] font-semibold" style={{ color: "#2E7D32" }}>
                {safetyLevelConfig[safetyPreference].label} ▾
              </span>
            </button>
          </div>

          {/* ── Dropdown de localização ── */}
          {showDropdownContent && (
            <div
              className="absolute left-0 right-0 bg-white z-50 overflow-hidden"
              style={{
                border: "1px solid #1F3D34",
                borderTop: "none",
                borderBottomLeftRadius: 16,
                borderBottomRightRadius: 16,
                boxShadow: "0 12px 32px rgba(0,0,0,0.12)",
              }}
            >
              <div className="px-4 pt-3 pb-1.5">
                <span className="text-[10px] font-semibold uppercase tracking-widest" style={{ color: "#B0977E" }}>
                  {!searchInput.trim() ? "Buscas recentes" : "Sugestões"}
                </span>
              </div>

              {searchInput.trim()
                ? suggestions.map((s, i) => (
                    <button
                      key={s.label}
                      className="w-full text-left px-4 py-2.5 flex items-center gap-3 active:bg-[#F5EDE6] transition-colors"
                      style={{ borderTop: i > 0 ? "1px solid #F5EDE6" : "none" }}
                      onMouseDown={e => e.preventDefault()}
                      onClick={() => applyLocation(s.label)}
                    >
                      <LocIcon type={s.type} />
                      <div className="flex-1 min-w-0">
                        <span className="text-[13px] font-semibold text-text-primary block truncate">{s.label}</span>
                        <span className="text-[10px] font-semibold" style={{ color: "#B0977E" }}>
                          {{ cidade: "Cidade", estado: "Estado", pais: "País" }[s.type]}
                        </span>
                      </div>
                    </button>
                  ))
                : recentLocations.map((loc, i) => (
                    <button
                      key={loc}
                      className="w-full text-left px-4 py-2.5 flex items-center gap-3 active:bg-[#F5EDE6] transition-colors"
                      style={{ borderTop: i > 0 ? "1px solid #F5EDE6" : "none" }}
                      onMouseDown={e => e.preventDefault()}
                      onClick={() => applyLocation(loc)}
                    >
                      <LocIcon type="recent" />
                      <span className="flex-1 text-[13px] font-semibold text-text-primary truncate">{loc}</span>
                      <button
                        className="w-5 h-5 flex items-center justify-center rounded-full shrink-0"
                        style={{ backgroundColor: "#F0E8E0" }}
                        onMouseDown={e => e.preventDefault()}
                        onClick={e => removeRecent(loc, e)}
                      >
                        <X size={9} style={{ color: "#B0977E" }} />
                      </button>
                    </button>
                  ))
              }

              {!searchInput.trim() && recentLocations.length > 0 && (
                <button
                  className="w-full text-center py-2.5 text-[11px] font-semibold"
                  style={{ color: "#B0977E", borderTop: "1px solid #F5EDE6" }}
                  onMouseDown={e => e.preventDefault()}
                  onClick={() => { setRecentLocations([]); localStorage.removeItem(LOCATION_RECENT_KEY); setShowDropdown(false); }}
                >
                  Limpar histórico
                </button>
              )}
            </div>
          )}
        </div>

        {/* Chip de localização ativa */}
        <div className="flex items-center gap-1.5 mt-2.5 px-1">
          <MapPin size={11} style={{ color: "#4A9070" }} />
          <span className="text-[12px] font-semibold" style={{ color: "#4A9070" }}>
            Resultados para <span style={{ color: "#1F3D34" }}>{locationFilter}</span> · com base no seu perfil
          </span>
        </div>
      </div>

      {/* ── Promo Banner ── */}
      <div className="px-5 mb-6">
        <div
          className="relative overflow-hidden rounded-[22px] block"
          style={{ backgroundColor: "#1A1A1A", height: 138 }}
        >
          {/* Food image — full cover */}
          <Image
            src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600&h=300&fit=crop"
            alt="Prato saudável"
            fill
            className="object-cover"
            style={{ objectPosition: "center 40%" }}
            unoptimized
          />

          {/* Mask: dark left → transparent right */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{ background: "linear-gradient(to right, #1A1A1A 35%, rgba(26,26,26,0.5) 65%, transparent 100%)" }}
          />

          {/* Content overlay */}
          <div className="absolute inset-0 flex flex-col justify-center px-5 z-10">
            <span
              className="inline-block self-start text-white text-[9px] font-semibold px-2.5 py-1 rounded-full uppercase tracking-widest mb-2"
              style={{ background: "linear-gradient(135deg, #1F3D34 0%, #2E6B55 100%)" }}
            >
              NOVO
            </span>
            <h2 style={{ fontFamily: "var(--font-nunito), 'Nunito', sans-serif", fontWeight: 900, fontSize: 17, lineHeight: 1.2, color: "white" }}>
              Novos restaurantes<br />recomendados
            </h2>
            <p className="text-white/55 text-[10px] mt-1 font-semibold">Baseado no seu padrão de segurança</p>
          </div>

          {/* CTA pill — bottom right */}
          <div className="absolute bottom-4 right-4 z-10">
            <span
              className="px-4 py-2 rounded-full font-semibold text-[11px]"
              style={{ backgroundColor: "#C6F59D", color: "#1F3D34", boxShadow: "0 3px 10px rgba(198,245,157,0.4)" }}
            >
              Ver agora →
            </span>
          </div>
        </div>
      </div>

      {/* ── Categorias ── */}
      <div className="mb-6">
        <div className="flex items-center justify-between px-5 mb-3">
          <h2 style={{ fontFamily: "var(--font-nunito), 'Nunito', sans-serif", fontWeight: 900, fontSize: 18, color: "#1F3D34" }}>Categorias celíaca</h2>
          <Link href="/busca" className="text-primary font-semibold text-[13px]">Ver todos</Link>
        </div>
        <div className="flex gap-5 overflow-x-auto px-5 pb-1">
          {categories.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <Link
                key={cat.id}
                href={cat.href}
                onClick={() => setActiveCategory(isActive ? null : cat.id)}
                className="shrink-0 active:scale-95 transition-all flex flex-col items-center"
                style={{ width: 76 }}
              >
                <div
                  className="flex flex-col items-center pt-3 pb-3 transition-all"
                  style={{
                    width: 76,
                    borderRadius: 28,
                    backgroundColor: isActive ? "#1F3D34" : cat.bg,
                    boxShadow: isActive ? "0 6px 18px rgba(31,61,52,0.25)" : "0 2px 12px rgba(0,0,0,0.08)",
                  }}
                >
                  <div
                    className="relative flex items-center justify-center mb-2 overflow-hidden"
                    style={{
                      width: 48,
                      height: 48,
                      borderRadius: "50%",
                      backgroundColor: "#FFFFFF",
                    }}
                  >
                    <img src={cat.icon} alt={cat.label} width={28} height={28}
                      style={{ objectFit: "contain", filter: "brightness(0)", opacity: 0.85 }} />
                    {!isActive && (
                      <div className="absolute inset-0" style={{ backgroundColor: cat.color, mixBlendMode: "color" }} />
                    )}
                  </div>
                  <p className="text-center leading-tight whitespace-pre-line"
                    style={{ fontFamily: "var(--font-nunito), 'Nunito', sans-serif", fontWeight: 900, fontSize: 11, color: isActive ? "#FFFFFF" : cat.color }}>
                    {cat.label}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      {/* ── Recomendado para você ── */}
      <div className="mb-6" onClick={() => setShowDropdown(false)}>
        <div className="flex items-start justify-between px-5 mb-1">
          <div>
            <h2 style={{ fontFamily: "var(--font-nunito), 'Nunito', sans-serif", fontWeight: 900, fontSize: 18, color: "#1F3D34" }}>Recomendado para você</h2>
            <p className="text-text-disabled text-[12px] mt-0.5">
              {hasLocalResults ? locationFilter : `Mais próximos de ${locationFilter}`}
            </p>
          </div>
          <Link href="/busca" className="text-primary text-[13px] shrink-0 mt-1">Ver todos</Link>
        </div>

        {/* Sem resultados locais */}
        {!hasLocalResults && (
          <div className="mx-5 mb-3 px-4 py-3.5 rounded-2xl flex items-center gap-3" style={{ backgroundColor: "#FFF3E0", border: "1px solid #FFD180" }}>
            <span className="text-[22px]">📍</span>
            <div>
              <p className="text-[13px] font-semibold" style={{ color: "#E65100" }}>Nada encontrado em {locationFilter}</p>
              <p className="text-[11px] mt-0.5" style={{ color: "#BF360C" }}>Mostrando os restaurantes mais próximos dessa região</p>
            </div>
          </div>
        )}

        <div className="flex gap-3 overflow-x-auto pl-5 pb-2 mt-3">
          {(hasLocalResults ? localRestaurants : nearbyRestaurants).map(r => (
            <RestaurantCard key={r.id} restaurant={r} variant="vertical" width={236} />
          ))}
          <div className="shrink-0 w-2" />
        </div>

        {/* Se tem locais, mostrar próximos depois */}
        {hasLocalResults && nearbyRestaurants.length > 0 && (
          <>
            <div className="flex items-center gap-3 px-5 mt-4 mb-3">
              <div className="flex-1 h-px bg-border" />
              <span className="text-[11px] font-semibold text-text-disabled whitespace-nowrap">Mais próximos</span>
              <div className="flex-1 h-px bg-border" />
            </div>
            <div className="flex gap-3 overflow-x-auto pl-5 pb-2">
              {nearbyRestaurants.map(r => (
                <RestaurantCard key={r.id} restaurant={r} variant="vertical" width={236} />
              ))}
              <div className="shrink-0 w-2" />
            </div>
          </>
        )}
      </div>

      {/* ── Melhores para celíacos ── */}
      <div className="mb-6" onClick={() => setShowDropdown(false)}>
        <div className="flex items-start justify-between px-5 mb-1">
          <div>
            <h2 style={{ fontFamily: "var(--font-nunito), 'Nunito', sans-serif", fontWeight: 900, fontSize: 18, color: "#1F3D34" }}>Melhores para celíacos</h2>
            <p className="text-text-disabled text-[12px] mt-0.5">Avaliados pela comunidade</p>
          </div>
          <Link href="/busca" className="text-primary text-[13px] shrink-0 mt-1">Ver todos</Link>
        </div>
        <div className="flex gap-3 overflow-x-auto px-5 pb-2 mt-3">
          {(hasLocalResults ? localRestaurants : nearbyRestaurants).slice(0, 4).map(r => (
            <RestaurantCard key={r.id} restaurant={r} variant="vertical" />
          ))}
        </div>
      </div>

      {/* ── Pratos Recomendados ── */}
      <div className="mb-6" onClick={() => setShowDropdown(false)}>
        <div className="flex items-center justify-between px-5 mb-1">
          <div>
            <h2 style={{ fontFamily: "var(--font-nunito), 'Nunito', sans-serif", fontWeight: 900, fontSize: 18, color: "#1F3D34" }}>Pratos recomendados</h2>
            <p className="text-text-disabled text-[12px] mt-0.5">
              {localDishes.length > 0 ? locationFilter : `Próximos de ${locationFilter}`}
            </p>
          </div>
          <Link href="/busca" className="text-primary font-semibold text-[13px]">Ver todos</Link>
        </div>
        <div className="flex gap-3 overflow-x-auto px-5 pb-2 mt-3">
          {(localDishes.length > 0 ? localDishes : nearbyDishes).map(dish => (
            <DishCard key={dish.id} dish={dish} />
          ))}
        </div>
        {localDishes.length > 0 && nearbyDishes.length > 0 && (
          <>
            <div className="flex items-center gap-3 px-5 mt-4 mb-3">
              <div className="flex-1 h-px bg-border" />
              <span className="text-[11px] font-semibold text-text-disabled whitespace-nowrap">Pratos próximos</span>
              <div className="flex-1 h-px bg-border" />
            </div>
            <div className="flex gap-3 overflow-x-auto px-5 pb-2">
              {nearbyDishes.map(dish => <DishCard key={dish.id} dish={dish} />)}
            </div>
          </>
        )}
      </div>

      {/* ── Bem avaliados pelos celíacos ── */}
      {(() => {
        const reviews = [
          {
            id: "r1",
            author: "Fernanda A.",
            photo: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop&crop=face",
            date: "15/03/2024",
            rating: 5,
            comment: "Frequento há 4 anos. Nunca tive nenhuma reação. A equipe conhece celíaca de verdade, não é só marketing. Prato favorito: o tagliatelle de arroz.",
            tags: ["Sem contaminação", "Equipe bem informada", "Me senti seguro"],
            verified: true,
            restaurantName: "Le Manjue Organique",
            restaurantId: "1",
            dishPhotos: [
              "https://images.unsplash.com/photo-1476124369491-e7addf5db371?w=120&h=120&fit=crop",
              "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?w=120&h=120&fit=crop",
            ],
          },
          {
            id: "r3",
            author: "Camila R.",
            photo: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop&crop=face",
            date: "12/03/2024",
            rating: 5,
            comment: "O Pandan é incrível — comi um pão francês sem glúten que parecia de verdade. A equipe entende muito de celíaca e me fiz segura do início ao fim.",
            tags: ["Me senti seguro", "Voltaria com certeza", "Cardápio claro"],
            verified: true,
            restaurantName: "Pandan · São Paulo",
            restaurantId: "pandan",
            dishPhotos: [
              "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=120&h=120&fit=crop",
              "https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=120&h=120&fit=crop",
            ],
          },
          {
            id: "r6",
            author: "Lívia F.",
            photo: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&h=80&fit=crop&crop=face",
            date: "20/02/2024",
            rating: 5,
            comment: "O Haus Hiltl é incrível — cada item do buffet tem etiqueta com alérgenos e a equipe fala sobre celíaca com naturalidade.",
            tags: ["Sem contaminação", "Equipe bem informada", "Ambiente limpo"],
            verified: true,
            restaurantName: "Haus Hiltl · Zurique",
            restaurantId: "5",
            dishPhotos: [
              "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=120&h=120&fit=crop",
              "https://images.unsplash.com/photo-1547592166-23ac45744acd?w=120&h=120&fit=crop",
            ],
          },
        ];
        const review = reviews[reviewSlide];
        return (
          <div className="mb-10">
            {/* Cabeçalho da seção */}
            <div className="flex items-center justify-between px-5 mb-3">
              <div>
                <h2 style={{ fontFamily: "var(--font-nunito), 'Nunito', sans-serif", fontWeight: 900, fontSize: 18, color: "#1F3D34" }}>Bem avaliados próximo de você</h2>
                <p className="text-text-disabled text-[12px] mt-2">Avaliações de celíacos verificados</p>
              </div>
              <Link href="/comunidade" className="text-primary font-semibold text-[13px] shrink-0">Ver todos</Link>
            </div>

            {/* Card único — slide */}
            <div className="px-5">
              <Link
                href={`/restaurante/${review.restaurantId}`}
                className="block bg-surface rounded-2xl p-4 active:scale-[0.98] transition-all"
                style={{ boxShadow: "0 2px 14px rgba(0,0,0,0.08)", border: "1px solid var(--color-border)" }}
              >
                {/* Header */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-full overflow-hidden shrink-0 border-2 border-border">
                      <Image src={review.photo} alt={review.author} width={44} height={44} className="object-cover w-full h-full" unoptimized />
                    </div>
                    <div>
                      <p className="font-semibold text-[14px] text-text-primary leading-tight">{review.author}</p>
                      <p className="text-[11px] text-text-disabled mt-0.5">{review.restaurantName} · {review.date}</p>
                    </div>
                  </div>
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
                    <div key={i} className="w-[72px] h-[72px] rounded-xl overflow-hidden shrink-0">
                      <Image src={photo} alt="Prato avaliado" width={72} height={72} className="object-cover w-full h-full" unoptimized />
                    </div>
                  ))}
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5">
                  {review.tags.map((tag) => (
                    <span key={tag} className="text-[11px] px-2.5 py-1 rounded-full" style={{ backgroundColor: "#C6F59D", color: "#1F3D34", fontFamily: "var(--font-nunito), 'Nunito', sans-serif", fontWeight: 900 }}>
                      {tag}
                    </span>
                  ))}
                </div>
              </Link>

              {/* Dots + botão */}
              <div className="flex items-center justify-between mt-3">
                {/* Dots de paginação */}
                <div className="flex gap-1.5">
                  {reviews.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setReviewSlide(i)}
                      className="rounded-full transition-all duration-300"
                      style={{
                        width: i === reviewSlide ? 20 : 7,
                        height: 7,
                        backgroundColor: i === reviewSlide ? "#1F3D34" : "rgba(31,61,52,0.2)",
                      }}
                    />
                  ))}
                </div>

                {/* Botão feedback */}
                <Link
                  href="/comunidade"
                  className="flex items-center gap-1.5 px-3.5 py-2 rounded-full active:scale-95 transition-transform"
                  style={{ backgroundColor: "#1F3D34" }}
                >
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
                    <path d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" stroke="#C6F59D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <span className="text-[12px] font-semibold" style={{ color: "#C6F59D" }}>Ver feedbacks</span>
                </Link>
              </div>
            </div>
          </div>
        );
      })()}

      <div style={{ paddingBottom: "calc(env(safe-area-inset-bottom, 0px) + 100px)" }} />

      {/* ── Safety Preference Bottom Sheet ── */}
      {showSafetySheet && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
            onClick={() => setShowSafetySheet(false)}
          />

          {/* Sheet */}
          <div
            className="fixed bottom-0 left-0 right-0 z-50 bg-surface rounded-t-[28px] px-5 pt-5 max-w-[430px] mx-auto flex flex-col"
            style={{ boxShadow: "0 -8px 40px rgba(0,0,0,0.18)", maxHeight: "80dvh" }}
          >
            {/* Handle */}
            <div className="w-10 h-1 rounded-full bg-border mx-auto mb-5 shrink-0" />

            {/* Header */}
            <div className="flex items-center justify-between mb-2 shrink-0">
              <div>
                <h3 style={{ fontFamily: "var(--font-nunito), 'Nunito', sans-serif", fontWeight: 900, fontSize: 17, color: "#1F3D34" }}>Padrão de segurança</h3>
                <p className="text-text-disabled text-[12px] mt-0.5">Filtra os restaurantes exibidos</p>
              </div>
              <button
                onClick={() => setShowSafetySheet(false)}
                className="w-8 h-8 rounded-full bg-background flex items-center justify-center active:scale-90 transition-transform"
              >
                <X size={15} className="text-text-secondary" />
              </button>
            </div>

            {/* Options — scrollável */}
            <div className="overflow-y-auto mt-4 space-y-3" style={{ paddingBottom: "calc(env(safe-area-inset-bottom, 0px) + 110px)" }}>
              {SAFETY_OPTIONS.map(({ level, description }) => {
                const isSelected = safetyPreference === level;
                return (
                  <button
                    key={level}
                    onClick={() => { setSafetyPreference(level); setShowSafetySheet(false); }}
                    className="w-full flex items-center gap-3 p-3.5 rounded-2xl transition-all active:scale-[0.98]"
                    style={{
                      backgroundColor: isSelected ? "var(--color-primary-tint)" : "var(--color-background)",
                      border: isSelected ? "1.5px solid var(--color-primary)" : "1.5px solid var(--color-border)",
                    }}
                  >
                    <div className="shrink-0">
                      <SafetyBadge level={level} size="md" />
                    </div>
                    <p className="flex-1 text-left text-[12px] text-text-secondary leading-snug">{description}</p>
                    {isSelected && (
                      <div className="shrink-0 w-5 h-5 rounded-full bg-primary flex items-center justify-center">
                        <Check size={11} color="white" strokeWidth={3} />
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
