"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Search, MapPin, Star, ChevronRight } from "lucide-react";
import RestaurantCard from "@/components/RestaurantCard";
import { DishImagePlaceholder } from "@/components/DishPlaceholder";
import { mockRestaurants, mockDishes } from "@/lib/data";
import { useLanguage } from "@/lib/i18n/LanguageProvider";

// ── Configuração reutilizável por categoria ──────────────────────────────────
// Para criar uma nova categoria, basta adicionar uma entrada aqui — a estrutura
// da página (seções, componentes, layout) permanece idêntica.
type CategoryId = "mais-seguros" | "festa" | "familia" | "doces" | "amigos";

type CategoryConfig = {
  bg: string;
  color: string;
  icon: string;
  // ids de restaurantes (de mockRestaurants) usados para preencher as seções
  nearbyIds: string[];
  communityIds: string[];
  inspirationIds: string[];
};

const CATEGORY_CONFIG: Record<CategoryId, CategoryConfig> = {
  "mais-seguros": {
    bg: "#E4EFC6", color: "#2E4F2A", icon: "/feliz.png",
    nearbyIds: ["1", "grao-fino", "pandan"],
    communityIds: ["6", "libera", "healthy-bites-atelier"],
    inspirationIds: ["dd2", "dd4"],
  },
  "festa": {
    bg: "#FDEFCC", color: "#6B5F2A", icon: "/festa.png",
    nearbyIds: ["pizza-for-fun", "jampa-nutrileve", "grano"],
    communityIds: ["a-vie", "jackies", "zufreeden"],
    inspirationIds: ["dd1", "dd5"],
  },
  "familia": {
    bg: "#DDEFE5", color: "#1F4A44", icon: "/familia.png",
    nearbyIds: ["7", "5", "healthy-bites-atelier"],
    communityIds: ["1", "tibits", "marktkuche"].filter((id) => mockRestaurants.some(r => r.id === id)),
    inspirationIds: ["dd3", "dd6"],
  },
  "doces": {
    bg: "#F0E0F2", color: "#5A4580", icon: "/doces.png",
    nearbyIds: ["a-vie", "juro-de-dedinho", "lola-paleo"],
    communityIds: ["healthy-bites-atelier", "jackies", "grano"],
    inspirationIds: ["dd6", "dd3"],
  },
  "amigos": {
    bg: "#D9E7F0", color: "#1F4A60", icon: "/amigos.png",
    nearbyIds: ["pandan", "pizza-for-fun", "6"],
    communityIds: ["zufreeden", "libera", "grano"],
    inspirationIds: ["dd1", "dd4"],
  },
};

const DEFAULT_CATEGORY_ID: CategoryId = "mais-seguros";

function getRestaurants(ids: string[]) {
  return ids
    .map((id) => mockRestaurants.find((r) => r.id === id))
    .filter((r): r is NonNullable<typeof r> => Boolean(r));
}

function getDishes(ids: string[]) {
  return ids
    .map((id) => mockDishes.find((d) => d.id === id))
    .filter((d): d is NonNullable<typeof d> => Boolean(d));
}

// ── Cabeçalho de seção reutilizável ───────────────────────────────────────────
function SectionHeader({ title, href }: { title: string; href?: string }) {
  const { t } = useLanguage();
  return (
    <div className="flex items-center justify-between mb-3 px-5">
      <h2 className="font-extrabold text-[16px]" style={{ color: "#1F3D34", fontFamily: "var(--font-nunito), 'Nunito', sans-serif" }}>
        {title}
      </h2>
      {href && (
        <Link href={href} className="flex items-center gap-0.5 text-[12px] font-semibold active:opacity-60 transition-opacity" style={{ color: "#4A9070" }}>
          {t.categoria.seeAll} <ChevronRight size={13} />
        </Link>
      )}
    </div>
  );
}

// ── Card de produto/prato (compacto) ──────────────────────────────────────────
function ProductCard({ dish }: { dish: ReturnType<typeof getDishes>[number] }) {
  const href = dish.restaurantId && dish.dishId
    ? `/restaurante/${dish.restaurantId}/prato/${dish.dishId}`
    : `/restaurante/${dish.restaurantId ?? ""}`;

  return (
    <Link
      href={href}
      className="shrink-0 active:scale-[0.97] transition-transform block"
      style={{ width: 148 }}
    >
      <div className="relative w-full overflow-hidden mb-2" style={{ height: 120, borderRadius: 16 }}>
        {dish.image ? (
          <Image src={dish.image} alt={dish.name} fill className="object-cover" unoptimized />
        ) : (
          <DishImagePlaceholder rounded={16} />
        )}
        <div className="absolute top-2 left-2 flex items-center gap-0.5 bg-black/40 rounded-full px-2 py-0.5 backdrop-blur-sm">
          <Star size={9} fill="#F59E0B" style={{ color: "#F59E0B" }} />
          <span className="text-[10px] font-semibold text-white">{dish.rating}</span>
        </div>
      </div>
      <p className="font-bold text-[13px] leading-snug truncate" style={{ color: "#1F3D34" }}>{dish.name}</p>
      <p className="text-[11px] truncate" style={{ color: "#9AAFA6" }}>{dish.restaurantName}</p>
    </Link>
  );
}

// ── Skeleton simples para carrosséis ──────────────────────────────────────────
function SkeletonRow({ width = 168, height = 160 }: { width?: number; height?: number }) {
  return (
    <div className="shrink-0" style={{ width }}>
      <div className="skeleton w-full mb-2" style={{ height, borderRadius: 16 }} />
      <div className="skeleton h-3 w-3/4 mb-1.5" />
      <div className="skeleton h-2.5 w-1/2" />
    </div>
  );
}

export default function CategoriaPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const { t } = useLanguage();
  const id = (params?.id as string) ?? "";
  const categoryId = (id in CATEGORY_CONFIG ? id : DEFAULT_CATEGORY_ID) as CategoryId;
  const config = CATEGORY_CONFIG[categoryId];
  const text = t.categoria.configs[categoryId];

  const [search, setSearch] = useState("");
  const [locStatus, setLocStatus] = useState<"idle" | "loading" | "granted" | "denied">("idle");
  const [locLabel, setLocLabel] = useState<string>(t.categoria.defaultLocation);

  // ── Geolocalização (MVP: apenas obtém permissão e exibe rótulo) ────────────
  useEffect(() => {
    if (!("geolocation" in navigator)) { setLocStatus("denied"); return; }
    setLocStatus("loading");
    navigator.geolocation.getCurrentPosition(
      () => { setLocStatus("granted"); setLocLabel(t.categoria.nearYouLabel); },
      () => { setLocStatus("denied"); setLocLabel(t.categoria.defaultLocation); },
      { timeout: 4000 }
    );
  }, [t]);

  const nearby       = getRestaurants(config.nearbyIds);
  const community    = getRestaurants(config.communityIds);
  const products     = getDishes(config.inspirationIds);

  const filteredNearby = search.trim()
    ? nearby.filter(r => r.name.toLowerCase().includes(search.toLowerCase()) || r.cuisine?.toLowerCase().includes(search.toLowerCase()))
    : nearby;

  return (
    <div className="min-h-dvh flex flex-col" style={{ backgroundColor: "#F5F2DF", fontFamily: "var(--font-nunito), 'Nunito', sans-serif" }}>

      {/* ── Header + Busca — fundo verde primário escuro ── */}
      <div
        className="px-5 pt-5 pb-7"
        style={{ backgroundColor: config.bg, borderBottomLeftRadius: 28, borderBottomRightRadius: 28 }}
      >
        <div className="flex items-center justify-between gap-3 mb-4">
          <button
            onClick={() => router.back()}
            className="w-9 h-9 rounded-full flex items-center justify-center shrink-0 active:scale-90 transition-transform"
            style={{ backgroundColor: "rgba(31,61,52,0.1)" }}
          >
            <ArrowLeft size={17} style={{ color: config.color }} />
          </button>

          <div
            className="w-12 h-12 rounded-full flex items-center justify-center shrink-0"
            style={{ backgroundColor: config.color }}
          >
            <img src={config.icon} alt="" width={26} height={26} style={{ objectFit: "contain", filter: "brightness(0) invert(1)", opacity: 0.9 }} />
          </div>
        </div>

        <h1 className="font-black text-[24px] leading-tight mb-1.5" style={{ color: config.color, fontWeight: 900 }}>
          {text.title}
        </h1>
        <p className="text-[13px] leading-relaxed mb-5" style={{ color: config.color, opacity: 0.65, textWrap: "balance" } as React.CSSProperties}>
          {text.description}
        </p>

        {/* Busca contextual */}
        <div
          className="flex items-center gap-2.5 rounded-2xl px-4 py-3.5"
          style={{ backgroundColor: "#FFFFFF", boxShadow: "0 4px 18px rgba(0,0,0,0.18)" }}
        >
          <Search size={17} style={{ color: "#9AAFA6" }} />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={text.searchPlaceholder}
            className="flex-1 outline-none text-[13px] bg-transparent"
            style={{ color: "#1F3D34" }}
          />
        </div>
      </div>

      <div className="mb-2" />

      {/* ── Perto de você ── */}
      <div className="mb-7 mt-6">
        <div className="flex items-center justify-between mb-3 px-5">
          <div className="flex items-center gap-1.5">
            <MapPin size={15} style={{ color: "#4A9070" }} />
            <h2 className="font-extrabold text-[16px]" style={{ color: "#1F3D34" }}>{t.categoria.nearbyTitle}</h2>
          </div>
          <Link href={`/busca?filter=${id}`} className="flex items-center gap-0.5 text-[12px] font-semibold active:opacity-60 transition-opacity" style={{ color: "#4A9070" }}>
            {t.categoria.seeAll} <ChevronRight size={13} />
          </Link>
        </div>

        {locStatus !== "idle" && (
          <p className="text-[11px] font-semibold mb-3 px-5" style={{ color: "#9AAFA6" }}>
            {locStatus === "loading" && t.categoria.gettingLocation}
            {locStatus === "granted" && t.categoria.showingResultsNear.replace("{location}", locLabel)}
            {locStatus === "denied"  && t.categoria.showingResultsFor.replace("{location}", locLabel)}
          </p>
        )}

        <div className="flex gap-4 overflow-x-auto px-5 hide-scrollbar" style={{ scrollSnapType: "x mandatory" }}>
          {locStatus === "loading"
            ? Array.from({ length: 3 }).map((_, i) => <SkeletonRow key={i} width={236} />)
            : filteredNearby.length > 0
              ? filteredNearby.map((r) => <RestaurantCard key={r.id} restaurant={r} variant="vertical" width={236} />)
              : <p className="text-[12px] py-6" style={{ color: "#9AAFA6" }}>{t.categoria.noResultsFound.replace("{query}", search)}</p>
          }
        </div>
      </div>

      {/* ── Recomendados pela comunidade ── */}
      <div className="mb-7">
        <SectionHeader title={t.categoria.communityTitle} href={`/busca?filter=${id}&sort=community`} />
        <div className="flex gap-4 overflow-x-auto px-5 hide-scrollbar" style={{ scrollSnapType: "x mandatory" }}>
          {community.map((r) => (
            <RestaurantCard key={r.id} restaurant={r} variant="vertical" width={236} />
          ))}
        </div>
      </div>

      {/* ── Produtos relacionados ── */}
      {products.length > 0 && (
        <div className="mb-7">
          <SectionHeader title={t.categoria.productsTitle} />
          <div className="flex gap-3.5 overflow-x-auto px-5 hide-scrollbar">
            {products.map((d) => <ProductCard key={d.id} dish={d} />)}
          </div>
        </div>
      )}

      <style>{`
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
}
