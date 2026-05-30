"use client";
import { useState, useEffect, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import {
  X, Star, ChevronRight, Shield, Navigation,
  MapPin, Clock, Globe, Building2,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import SafetyBadge from "@/components/SafetyBadge";
import { mockRestaurants, safetyLevelConfig } from "@/lib/data";
import type { Restaurant, SafetyLevel } from "@/lib/data";

// ── Constantes ────────────────────────────────────────────────────────────────
const RECENT_KEY  = "glutty_busca_locations";
const MAX_RECENT  = 5;
const DEFAULT_LOC = "São Paulo";

// ── Categorias ────────────────────────────────────────────────────────────────
const FOOD_CATEGORIES = [
  { id: "todos",     label: "Para você",      icon: "https://www.figma.com/api/mcp/asset/236f25e3-786a-4258-8364-c5b53eca50b1", bg: "#C6F59D",  fg: "#1F3D34" },
  { id: "fastfood",  label: "Fast Food",      icon: "https://www.figma.com/api/mcp/asset/c238047b-c35d-4181-bf69-1dfe4a60ca23", bg: "#E8DCFF",  fg: "#6B21A8" },
  { id: "salada",    label: "Salada",         icon: "https://www.figma.com/api/mcp/asset/7e570b33-148c-4113-a24e-648fdef61ac4", bg: "#D4F0DC",  fg: "#166534" },
  { id: "frutos",    label: "Frutos do mar",  icon: "https://www.figma.com/api/mcp/asset/cbbc16c4-184c-4ba1-89a6-742d27d77d65", bg: "#FFE4CC",  fg: "#9A3412" },
  { id: "sobremesa", label: "Sobremesa",      icon: "https://www.figma.com/api/mcp/asset/9d1667fa-cb27-40ed-b978-a792b2ab415a", bg: "#D4F0E8",  fg: "#065F46" },
  { id: "happyhour", label: "Happy Hour",     icon: "https://www.figma.com/api/mcp/asset/e60c7b84-d49f-46e7-b2e6-aa7313bb784d", bg: "#EDE4FF",  fg: "#5B21B6" },
];

// ── Coordenadas dos restaurantes ──────────────────────────────────────────────
const RESTAURANT_COORDS: Record<string, [number, number]> = {
  "1":               [-23.5874, -46.6725],
  "5":               [ 47.3735,   8.5360],
  "6":               [ 47.3574,   8.5548],
  "7":               [ 47.3748,   8.5258],
  "pandan":          [-23.5682, -46.6892],
  "grao-fino":       [-23.5629, -46.6800],
  "pizza-for-fun":   [-23.5560, -46.6340],
  "juro-de-dedinho": [-30.0346, -51.2177],
  "libera":          [ 47.3748,   8.5262],
  "grano":           [ 47.3748,   8.5262],
  "zufreeden":       [ 47.3868,   8.5364],
  "a-vie":           [ 47.3741,   8.5227],
  "jackies":         [ 47.4561,   8.6968],
};

// ── Centros das cidades para o mapa ──────────────────────────────────────────
const CITY_CENTERS: Record<string, { center: [number, number]; zoom: number }> = {
  "são paulo":          { center: [-23.5505, -46.6333], zoom: 13 },
  "sao paulo":          { center: [-23.5505, -46.6333], zoom: 13 },
  "sp":                 { center: [-23.5505, -46.6333], zoom: 13 },
  "joão pessoa":        { center: [-7.1153,  -34.8641], zoom: 13 },
  "joao pessoa":        { center: [-7.1153,  -34.8641], zoom: 13 },
  "porto alegre":       { center: [-30.0346, -51.2177], zoom: 13 },
  "zürich":             { center: [ 47.3769,   8.5417], zoom: 14 },
  "zurich":             { center: [ 47.3769,   8.5417], zoom: 14 },
  "zurique":            { center: [ 47.3769,   8.5417], zoom: 14 },
  "kemptthal":          { center: [ 47.4561,   8.6968], zoom: 14 },
  "brasil":             { center: [-14.2350, -51.9253], zoom:  4 },
  "suíça":              { center: [  46.818,   8.2275], zoom:  7 },
  "suica":              { center: [  46.818,   8.2275], zoom:  7 },
  "sp — são paulo":     { center: [-23.5505, -46.6333], zoom: 13 },
  "pb — paraíba":       { center: [-7.1153,  -34.8641], zoom: 10 },
  "rs — rio grande do sul": { center: [-30.0346, -51.2177], zoom: 10 },
};

// ── Lógica de região ──────────────────────────────────────────────────────────
function getRegionInfo(city: string): { country: string; state: string } {
  const c = (city ?? "").toLowerCase();
  if (["zürich", "zurique", "zurich", "kemptthal"].includes(c)) return { country: "Suíça",  state: "Zürich" };
  if (c === "joão pessoa")  return { country: "Brasil", state: "Paraíba" };
  if (c === "porto alegre") return { country: "Brasil", state: "Rio Grande do Sul" };
  return { country: "Brasil", state: "São Paulo" };
}

function matchesLocation(city: string, query: string): boolean {
  if (!query) return true;
  const q = query.toLowerCase().trim();
  const c = (city ?? "").toLowerCase();
  const { country, state } = getRegionInfo(city);
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
  const r   = getRegionInfo(city);
  const ref = getRegionInfo(refCity || DEFAULT_LOC);
  if ((city ?? "").toLowerCase() === (refCity ?? "").toLowerCase()) return 0;
  if (r.country === ref.country) return 1;
  return 2;
}

// ── Sugestões de localização ──────────────────────────────────────────────────
const LOCATION_SUGGESTIONS = [
  { label: "São Paulo",               type: "cidade"  as const, match: ["são paulo", "sp", "sao paulo"] },
  { label: "João Pessoa",             type: "cidade"  as const, match: ["joão pessoa", "joao pessoa", "pb"] },
  { label: "Porto Alegre",            type: "cidade"  as const, match: ["porto alegre", "rs"] },
  { label: "Zürich",                  type: "cidade"  as const, match: ["zürich", "zurich", "zurique", "zh"] },
  { label: "Kemptthal",               type: "cidade"  as const, match: ["kemptthal"] },
  { label: "Brasil",                  type: "pais"    as const, match: ["brasil", "brazil", "br"] },
  { label: "Suíça",                   type: "pais"    as const, match: ["suíça", "suica", "switzerland", "ch"] },
  { label: "SP — São Paulo",          type: "estado"  as const, match: ["sp — são paulo", "estado de são paulo"] },
  { label: "PB — Paraíba",            type: "estado"  as const, match: ["pb — paraíba", "paraíba", "paraiba"] },
  { label: "RS — Rio Grande do Sul",  type: "estado"  as const, match: ["rs — rio grande do sul", "rio grande do sul"] },
];

function filterSuggestions(input: string) {
  if (!input.trim()) return [];
  const q = input.toLowerCase();
  return LOCATION_SUGGESTIONS.filter(
    s => s.label.toLowerCase().includes(q) || s.match.some(m => m.includes(q))
  ).slice(0, 5);
}

// ── LocalStorage ──────────────────────────────────────────────────────────────
function loadRecent(): string[] {
  try { return JSON.parse(localStorage.getItem(RECENT_KEY) ?? "[]"); } catch { return []; }
}
function saveRecent(term: string) {
  const prev = loadRecent().filter(s => s.toLowerCase() !== term.toLowerCase());
  localStorage.setItem(RECENT_KEY, JSON.stringify([term, ...prev].slice(0, MAX_RECENT)));
}

// ── Ícones de localização ─────────────────────────────────────────────────────
type LocType = "cidade" | "estado" | "pais" | "recent";
function LocIcon({ type }: { type: LocType }) {
  if (type === "recent") return <Clock     size={13} className="shrink-0" style={{ color: "#B0977E" }} />;
  if (type === "pais")   return <Globe     size={13} className="shrink-0" style={{ color: "#5B7FA6" }} />;
  if (type === "estado") return <Building2 size={13} className="shrink-0" style={{ color: "#A07050" }} />;
  return                        <MapPin    size={13} className="shrink-0" style={{ color: "#4A9070" }} />;
}

// ── Cores dos pins ────────────────────────────────────────────────────────────
const PIN_COLORS: Record<string, string> = {
  certificado:  "#00838F",
  muito_seguro: "#2E7D32",
  verificado:   "#6A1B9A",
  seguro:       "#D97706",
  moderado:     "#E65100",
  cuidado:      "#B71C1C",
  novo:         "#C62828",
  recomendado:  "#AD1457",
};

// ── Card do carrossel ─────────────────────────────────────────────────────────
function CarouselCard({ restaurant, isActive, onClick }: {
  restaurant: Restaurant; isActive: boolean; onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="shrink-0 text-left active:scale-[0.97] transition-transform"
      style={{ width: 220 }}
    >
      <div
        className="rounded-2xl overflow-hidden"
        style={{
          boxShadow: isActive ? "0 4px 20px rgba(31,61,52,0.25)" : "0 2px 10px rgba(0,0,0,0.10)",
          border: isActive ? "2px solid #1F3D34" : "2px solid transparent",
        }}
      >
        <div className="relative h-[110px] w-full">
          <Image src={restaurant.image} alt={restaurant.name} fill className="object-cover" unoptimized />
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
          <div className="absolute top-2 left-2">
            <SafetyBadge level={restaurant.safetyLevel} size="sm" />
          </div>
          {!restaurant.isOpen && (
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
              <span className="text-white text-[10px] font-bold bg-black/50 px-2.5 py-0.5 rounded-full">Fechado</span>
            </div>
          )}
        </div>
        <div className="bg-white px-3 py-2.5">
          <p className="font-extrabold text-[13px] text-text-primary truncate">{restaurant.name}</p>
          <p className="text-text-disabled text-[11px] truncate mt-0.5">{restaurant.cuisine}</p>
          <div className="flex items-center justify-between mt-1.5">
            <div className="flex items-center gap-1">
              <Star size={11} fill="#F59E0B" className="text-warning" />
              <span className="text-[12px] font-bold text-text-primary">{restaurant.rating > 0 ? restaurant.rating : "—"}</span>
              {restaurant.reviewCount > 0 && (
                <span className="text-[10px] text-text-disabled">({restaurant.reviewCount})</span>
              )}
            </div>
            <div className="flex items-center gap-0.5">
              <MapPin size={10} className="text-primary shrink-0" />
              <span className="text-[11px] font-semibold text-primary truncate max-w-[80px]">
                {restaurant.city || "—"}
              </span>
            </div>
          </div>
        </div>
      </div>
    </button>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────
export default function BuscaPage() {
  const router = useRouter();

  const [searchInput,      setSearchInput]      = useState("");
  const [locationFilter,   setLocationFilter]   = useState(DEFAULT_LOC);
  const [showDropdown,     setShowDropdown]     = useState(false);
  const [recentLocations,  setRecentLocations]  = useState<string[]>([]);
  const [activeCategory,   setActiveCategory]   = useState("todos");
  const [safetyPreference, setSafetyPreference] = useState<SafetyLevel>("seguro");
  const [selectedId,       setSelectedId]       = useState<string | null>(null);

  const inputRef    = useRef<HTMLInputElement>(null);
  const mapRef      = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<any>(null);
  const markersRef  = useRef<any[]>([]);
  const carouselRef = useRef<HTMLDivElement>(null);

  useEffect(() => { setRecentLocations(loadRecent()); }, []);

  // ── Filtragem por localização ─────────────────────────────────────────────
  const localRestaurants = mockRestaurants.filter(r => matchesLocation(r.city, locationFilter));
  const nearbyRestaurants = mockRestaurants
    .filter(r => !matchesLocation(r.city, locationFilter))
    .sort((a, b) => proximityScore(a.city, locationFilter) - proximityScore(b.city, locationFilter));
  const hasLocalResults = localRestaurants.length > 0;

  const displayList = hasLocalResults ? localRestaurants : nearbyRestaurants;
  const selectedRestaurant = mockRestaurants.find(r => r.id === selectedId) ?? null;

  // ── Sugestões ─────────────────────────────────────────────────────────────
  const suggestions = filterSuggestions(searchInput);
  const showDropdownContent = showDropdown && (searchInput.trim() ? suggestions.length > 0 : recentLocations.length > 0);

  // ── Aplicar localização ───────────────────────────────────────────────────
  const applyLocation = (label: string) => {
    setLocationFilter(label);
    setSearchInput(label);
    setShowDropdown(false);
    saveRecent(label);
    setRecentLocations(loadRecent());
    inputRef.current?.blur();
    flyToCity(label.toLowerCase());
  };

  const clearLocation = () => {
    setLocationFilter(DEFAULT_LOC);
    setSearchInput("");
    setShowDropdown(false);
    flyToCity("são paulo");
  };

  const removeRecent = (term: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const updated = recentLocations.filter(s => s !== term);
    setRecentLocations(updated);
    localStorage.setItem(RECENT_KEY, JSON.stringify(updated));
  };

  // ── Inicializa mapa Leaflet ───────────────────────────────────────────────
  const initMap = useCallback(() => {
    if (!mapRef.current || mapInstance.current) return;
    const L = (window as any).L;
    if (!L) return;

    const cityKey = locationFilter.toLowerCase();
    const cityData = CITY_CENTERS[cityKey] ?? CITY_CENTERS["são paulo"];

    const map = L.map(mapRef.current, {
      center: cityData.center,
      zoom: cityData.zoom,
      zoomControl: false,
      attributionControl: false,
    });

    L.tileLayer(
      "https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png",
      { subdomains: "abcd", maxZoom: 19 }
    ).addTo(map);

    mapInstance.current = map;
    addMarkers(L, map);
  }, [locationFilter]);

  const addMarkers = (L: any, map: any) => {
    markersRef.current.forEach(m => map.removeLayer(m));
    markersRef.current = [];

    mockRestaurants.forEach(restaurant => {
      const coords = RESTAURANT_COORDS[restaurant.id];
      if (!coords) return;

      const color = PIN_COLORS[restaurant.safetyLevel] ?? "#1F3D34";
      const isLocal = matchesLocation(restaurant.city, locationFilter);

      const icon = L.divIcon({
        className: "",
        html: `<div style="
          width:${isLocal ? 36 : 28}px; height:${isLocal ? 36 : 28}px;
          background:${isLocal ? color : "#9E9E9E"};
          border:${isLocal ? 3 : 2}px solid white;
          border-radius:50% 50% 50% 0;
          transform:rotate(-45deg);
          box-shadow:0 3px 10px rgba(0,0,0,0.3);
          opacity:${isLocal ? 1 : 0.5};
        ">
          <div style="transform:rotate(45deg); width:${isLocal ? 14 : 10}px; height:${isLocal ? 14 : 10}px; background:white; border-radius:50%; opacity:0.9; margin:auto; margin-top:${isLocal ? 8 : 7}px;"></div>
        </div>`,
        iconSize: [isLocal ? 36 : 28, isLocal ? 36 : 28],
        iconAnchor: [isLocal ? 18 : 14, isLocal ? 36 : 28],
        popupAnchor: [0, isLocal ? -36 : -28],
      });

      const marker = L.marker(coords, { icon }).addTo(map);
      marker.on("click", () => {
        setSelectedId(restaurant.id);
        map.setView(coords, Math.max(map.getZoom(), 15), { animate: true });
        setTimeout(() => {
          const all = [...localRestaurants, ...nearbyRestaurants];
          const idx = all.findIndex(r => r.id === restaurant.id);
          carouselRef.current?.scrollTo({ left: idx * 232, behavior: "smooth" });
        }, 100);
      });
      markersRef.current.push(marker);
    });
  };

  // ── Carrega Leaflet ───────────────────────────────────────────────────────
  useEffect(() => {
    if (!document.getElementById("leaflet-css")) {
      const link = document.createElement("link");
      link.id = "leaflet-css"; link.rel = "stylesheet";
      link.href = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css";
      document.head.appendChild(link);
    }
    if ((window as any).L) { initMap(); return; }
    if (!document.getElementById("leaflet-js")) {
      const script = document.createElement("script");
      script.id = "leaflet-js";
      script.src = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.js";
      script.onload = initMap;
      document.head.appendChild(script);
    } else {
      const check = setInterval(() => {
        if ((window as any).L) { clearInterval(check); initMap(); }
      }, 100);
    }
    return () => {
      if (mapInstance.current) { mapInstance.current.remove(); mapInstance.current = null; }
    };
  }, []);

  // ── Navega no mapa ────────────────────────────────────────────────────────
  const flyToCity = (key: string) => {
    const data = CITY_CENTERS[key.toLowerCase()];
    if (!data || !mapInstance.current) return;
    mapInstance.current.flyTo(data.center, data.zoom, { animate: true, duration: 1.2 });
  };

  return (
    <div
      className="flex flex-col bg-background"
      style={{ height: "100dvh", paddingBottom: "calc(env(safe-area-inset-bottom,0px) + 80px)" }}
    >
      {/* ── Header ── */}
      <div
        className="bg-background z-40 px-5 pb-3 shrink-0"
        style={{ paddingTop: "calc(env(safe-area-inset-top,0px) + 16px)" }}
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
            <h1 className="text-[22px] font-black text-primary font-display leading-tight">Restaurantes</h1>
            <p className="text-[12px] text-text-disabled mt-0.5">Avaliados por celíacos</p>
          </div>
        </div>

        {/* ── Search bar ── */}
        <div className="relative mb-2">
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
              placeholder="Cidade, estado ou país…"
              className="flex-1 text-[14px] text-text-primary outline-none placeholder:text-text-disabled bg-transparent font-medium"
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
              <span className="text-[11px] font-bold" style={{ color: "#2E7D32" }}>
                {safetyLevelConfig[safetyPreference].label} ▾
              </span>
            </button>
          </div>

          {/* ── Dropdown ── */}
          {showDropdownContent && (
            <div
              className="absolute left-0 right-0 bg-white z-50 overflow-hidden"
              style={{
                border: "1px solid #1F3D34", borderTop: "none",
                borderBottomLeftRadius: 16, borderBottomRightRadius: 16,
                boxShadow: "0 12px 32px rgba(0,0,0,0.12)",
              }}
            >
              <div className="px-4 pt-3 pb-1.5">
                <span className="text-[10px] font-bold uppercase tracking-widest" style={{ color: "#B0977E" }}>
                  {!searchInput.trim() ? "Buscas recentes" : "Sugestões"}
                </span>
              </div>

              {searchInput.trim()
                ? suggestions.map((s, i) => (
                    <button key={s.label}
                      className="w-full text-left px-4 py-2.5 flex items-center gap-3 active:bg-[#F5EDE6] transition-colors"
                      style={{ borderTop: i > 0 ? "1px solid #F5EDE6" : "none" }}
                      onMouseDown={e => e.preventDefault()}
                      onClick={() => applyLocation(s.label)}
                    >
                      <LocIcon type={s.type} />
                      <div className="flex-1 min-w-0">
                        <span className="text-[13px] font-semibold text-text-primary block truncate">{s.label}</span>
                        <span className="text-[10px] font-medium" style={{ color: "#B0977E" }}>
                          {{ cidade: "Cidade", estado: "Estado", pais: "País" }[s.type]}
                        </span>
                      </div>
                    </button>
                  ))
                : recentLocations.map((loc, i) => (
                    <button key={loc}
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
                  className="w-full text-center py-2.5 text-[11px] font-bold"
                  style={{ color: "#B0977E", borderTop: "1px solid #F5EDE6" }}
                  onMouseDown={e => e.preventDefault()}
                  onClick={() => { setRecentLocations([]); localStorage.removeItem(RECENT_KEY); setShowDropdown(false); }}
                >
                  Limpar histórico
                </button>
              )}
            </div>
          )}
        </div>

        {/* Chip localização ativa */}
        <div className="flex items-center gap-1.5 mb-3 px-1">
          <MapPin size={11} style={{ color: "#4A9070" }} />
          <span className="text-[12px] font-semibold" style={{ color: "#4A9070" }}>
            Resultados para <span style={{ color: "#1F3D34" }}>{locationFilter}</span> · com base no seu perfil
          </span>
        </div>

        {/* Categorias */}
        <div className="flex gap-2 overflow-x-auto pb-1" style={{ scrollbarWidth: "none" }}>
          {FOOD_CATEGORIES.map(cat => {
            const isActive = activeCategory === cat.id;
            return (
              <button key={cat.id} onClick={() => setActiveCategory(cat.id)}
                className="shrink-0 flex items-center gap-1.5 px-3 py-2 rounded-full transition-all active:scale-95"
                style={{ backgroundColor: isActive ? "#1F3D34" : cat.bg }}
              >
                <img src={cat.icon} alt={cat.label} className="w-4 h-4 object-contain" />
                <span className="text-[12px] font-bold whitespace-nowrap" style={{ color: isActive ? "#C6F59D" : cat.fg }}>
                  {cat.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* ── Mapa ── */}
      <div className="relative flex-1 overflow-hidden" onClick={() => setShowDropdown(false)}>
        <div ref={mapRef} className="absolute inset-0 z-0" />

        {/* Botão localização atual */}
        <button
          onClick={() => flyToCity("são paulo")}
          className="absolute top-3 right-3 z-10 w-10 h-10 bg-white rounded-full flex items-center justify-center active:scale-90 transition-transform"
          style={{ boxShadow: "0 2px 10px rgba(0,0,0,0.15)" }}
        >
          <Navigation size={16} style={{ color: "#1F3D34" }} />
        </button>

        {/* Popup restaurante selecionado */}
        {selectedRestaurant && (
          <div
            className="absolute bottom-4 z-20 rounded-2xl overflow-hidden"
            style={{ width: 280, left: "50%", transform: "translateX(-50%)", boxShadow: "0 8px 32px rgba(0,0,0,0.28)" }}
          >
            <Link href={`/restaurante/${selectedRestaurant.id}`} className="block active:scale-[0.98] transition-transform">
              <div className="relative h-[100px] w-full">
                <Image src={selectedRestaurant.image} alt={selectedRestaurant.name} fill className="object-cover" unoptimized />
                <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />
                <div className="absolute top-2.5 left-2.5">
                  <SafetyBadge level={selectedRestaurant.safetyLevel} size="sm" />
                </div>
                <button
                  onClick={e => { e.preventDefault(); setSelectedId(null); }}
                  className="absolute top-2.5 right-2.5 w-6 h-6 bg-black/40 rounded-full flex items-center justify-center active:scale-90"
                >
                  <X size={11} color="white" />
                </button>
              </div>
              <div className="bg-white px-3 py-2.5">
                <div className="flex items-center justify-between gap-2">
                  <div className="flex-1 min-w-0">
                    <p className="font-extrabold text-[13px] text-text-primary font-display truncate">
                      {selectedRestaurant.name}
                    </p>
                    <p className="text-text-disabled text-[11px] truncate mt-0.5">
                      {selectedRestaurant.cuisine} · {selectedRestaurant.city}
                    </p>
                  </div>
                  <div className="flex items-center gap-1 shrink-0">
                    <Star size={11} fill="#F59E0B" className="text-warning" />
                    <span className="font-extrabold text-[13px] text-text-primary">
                      {selectedRestaurant.rating > 0 ? selectedRestaurant.rating : "—"}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-1 mt-1.5">
                  <MapPin size={10} style={{ color: "#1F3D34" }} />
                  <span className="text-[11px] font-semibold truncate" style={{ color: "#1F3D34" }}>
                    {selectedRestaurant.address || selectedRestaurant.city}
                  </span>
                </div>
              </div>
            </Link>
          </div>
        )}
      </div>

      {/* ── Carrossel inferior ── */}
      <div className="shrink-0 bg-background pt-3 pb-1" style={{ boxShadow: "0 -4px 20px rgba(0,0,0,0.08)" }}>

        {/* Banner nada encontrado */}
        {!hasLocalResults && (
          <div className="mx-4 mb-3 px-3.5 py-3 rounded-2xl flex items-center gap-2.5" style={{ backgroundColor: "#FFF3E0", border: "1px solid #FFD180" }}>
            <span className="text-[18px]">📍</span>
            <div className="flex-1 min-w-0">
              <p className="text-[12px] font-bold truncate" style={{ color: "#E65100" }}>
                Nada encontrado em {locationFilter}
              </p>
              <p className="text-[10px] mt-0.5" style={{ color: "#BF360C" }}>
                Mostrando os mais próximos dessa região
              </p>
            </div>
          </div>
        )}

        {/* Cabeçalho */}
        <div className="flex items-center justify-between px-5 mb-2.5">
          <p className="text-[13px] font-extrabold text-text-primary">
            {hasLocalResults
              ? `${localRestaurants.length} em ${locationFilter}`
              : `${nearbyRestaurants.length} mais próximos`}
          </p>
          {hasLocalResults && nearbyRestaurants.length > 0 && (
            <span className="text-[11px] text-text-disabled font-medium">
              +{nearbyRestaurants.length} próximos
            </span>
          )}
        </div>

        {/* Carrossel */}
        <div
          ref={carouselRef}
          className="flex gap-3 overflow-x-auto px-5 pb-3"
          style={{ scrollbarWidth: "none" }}
        >
          {/* Locais */}
          {displayList.map(r => (
            <CarouselCard key={r.id} restaurant={r} isActive={selectedId === r.id}
              onClick={() => {
                setSelectedId(r.id);
                const coords = RESTAURANT_COORDS[r.id];
                if (coords && mapInstance.current) mapInstance.current.setView(coords, 15, { animate: true });
              }}
            />
          ))}

          {/* Separador + Mais próximos (quando há resultados locais) */}
          {hasLocalResults && nearbyRestaurants.length > 0 && (
            <>
              <div className="shrink-0 flex flex-col items-center justify-center gap-1 px-1" style={{ minWidth: 60 }}>
                <div className="w-px flex-1 bg-border" />
                <span className="text-[9px] font-bold text-text-disabled whitespace-nowrap text-center leading-tight" style={{ writingMode: "vertical-rl" }}>
                  MAIS PRÓXIMOS
                </span>
                <div className="w-px flex-1 bg-border" />
              </div>
              {nearbyRestaurants.map(r => (
                <CarouselCard key={r.id} restaurant={r} isActive={selectedId === r.id}
                  onClick={() => {
                    setSelectedId(r.id);
                    const coords = RESTAURANT_COORDS[r.id];
                    if (coords && mapInstance.current) mapInstance.current.setView(coords, 15, { animate: true });
                  }}
                />
              ))}
            </>
          )}

          <div className="shrink-0 w-2" />
        </div>
      </div>
    </div>
  );
}
