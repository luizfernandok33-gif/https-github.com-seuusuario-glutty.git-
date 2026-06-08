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

// ── Ícones SVG inline ─────────────────────────────────────────────────────────
const SvgPizza = () => (
  <svg viewBox="0 0 511.999 511.999" width="16" height="16" fill="currentColor">
    <path d="M387.428,337.889c-2.841-7.201-5.896-14.333-9.193-21.381c-18.182-38.887-43.293-75.311-75.358-107.378c-32.068-32.069-68.492-57.179-107.382-75.362c-7.05-3.297-14.184-6.352-21.383-9.191c-7.242-2.858-14.55-5.497-21.923-7.891L1.775,479.821c-3.603,8.696-1.61,18.705,5.045,25.362c4.451,4.451,10.404,6.816,16.46,6.816c2.999,0,6.023-0.579,8.901-1.773L395.319,359.81C392.923,352.44,390.284,345.131,387.428,337.889z M159.834,352.172c-15.329,15.327-39.559,16.322-56.045,2.991c-1.148-0.928-2.262-1.924-3.33-2.991c-6.2-6.2-10.051-13.858-11.563-21.87c-2.485-13.174,1.367-27.309,11.563-37.506c1.888-1.888,3.917-3.548,6.045-5.004c8.391-5.73,18.395-8.082,28.11-7.048c9.211,0.982,18.159,4.994,25.22,12.052C176.224,309.193,176.224,335.774,159.834,352.172z M201.395,227.485c16.393-16.393,42.978-16.393,59.373,0.003c16.393,16.393,16.393,42.978,0,59.373c-16.393,16.393-42.978,16.393-59.373,0C184.998,270.466,185.001,243.882,201.395,227.485z M290.057,378.222c-1.567,7.857-5.388,15.354-11.478,21.445c-14.399,14.403-36.66,16.148-52.973,5.252c-2.259-1.51-4.406-3.258-6.4-5.252c-4.003-4-7.021-8.612-9.069-13.531c-6.344-15.236-3.325-33.452,9.069-45.842c16.393-16.393,42.978-16.393,59.373,0c4.048,4.049,7.093,8.722,9.141,13.707C290.886,361.701,291.665,370.152,290.057,378.222z"/>
    <path d="M510.225,287.028c-26.194-63.236-63.726-119.914-111.554-168.458C349.143,68.296,290.704,29.002,224.977,1.779c-11.872-4.921-25.49,0.718-30.408,12.594l-24.424,58.966c7.368,2.467,14.655,5.148,21.868,8.018c7.21,2.867,14.341,5.93,21.383,9.194c44.934,20.821,86.331,49.606,122.393,85.666c36.061,36.063,64.843,77.457,85.664,122.393c3.263,7.038,6.327,14.168,9.193,21.377c2.87,7.214,5.551,14.503,8.018,21.87l58.966-24.424c5.703-2.363,10.234-6.893,12.595-12.594C512.587,299.136,512.587,292.726,510.225,287.028z"/>
  </svg>
);
const SvgHamburguer = () => (
  <svg viewBox="0 0 512 512" width="16" height="16" fill="currentColor">
    <path d="M469.342,397.667H44.654c-24.653,0-33.28,19.993-33.28,44.654v4.451c0,24.669,19.993,44.654,44.646,44.654h401.846c24.653,0,44.646-19.984,44.646-44.654v-4.451C502.513,417.66,494.012,397.667,469.342,397.667z"/>
    <path d="M447.177,373.682c22.891,0,41.448-14.765,41.448-33.004v-0.96c0-18.223-18.556-33.004-41.448-33.004H74.193c-22.882,0-41.439,14.782-41.439,33.004v0.96c0,18.239,18.556,33.004,41.439,33.004H447.177z"/>
    <path d="M41.672,205.52h430.534c16.376,0,25.83-8.936,25.83-25.906c0-5.787-0.518-3.156-1.478-8.878C483.338,91.593,381.127,20.574,256.952,20.574c-124.192,0-226.403,71.02-239.623,150.164h-0.008c-0.96,5.721-1.479,3.091-1.479,8.878C15.842,196.585,25.296,205.52,41.672,205.52z"/>
    <path d="M497.126,231.727c-8.217,0-14.882,6.664-14.882,14.882c0,8.218,6.664,14.882,14.882,14.882c2.306,0,3.918,0.318,5.32,0.777s2.18,1.152,3.449,1.502c2.305,3.349,5.396,5.662,7.625,6.99v-52.824C505.336,231.727,505.336,231.727,497.126,231.727z"/>
  </svg>
);
const SvgJaponesa = () => (
  <svg viewBox="0 0 349.908 349.909" width="16" height="16" fill="currentColor">
    <path d="M326.028,223.54c-2.593,0-5.322-0.167-8.184-0.469c-0.689-0.073-2.119-0.133-2.789,1.02c-9.573,17.916-25.66,28.549-44.773,28.549H79.634c-19.113,0-35.376-10.945-44.952-28.862c-0.523-0.859-1.586-0.816-2.116-0.758c-3.04,0.334-5.939,0.521-8.679,0.521c-1.778,0-3.468-0.084-5.076-0.243c-1.772-0.176-3.902,0.026-3.902,1.276c7.296,29.128,28.768,48.297,55.521,48.297h209.052c26.754,0,48.83-19.293,56.128-48.418c0.299-1.623-1.234-1.59-2.142-1.453C331.142,223.352,328.669,223.539,326.028,223.54z"/>
    <path d="M63.607,103.295c-0.885-1.536-2.331-0.822-3.172-0.379C23.418,122.362,0,151.065,0,183.088c0,40.992,38.373,24.607,94.527,11.078c0.81-0.195,2.174-1.136,1.543-3.013L63.607,103.295z"/>
    <path d="M189.025,79.281v102.75c0,1.375,0.95,1.518,1.429,1.547c21.702,1.337,42.266,5.261,60.967,9.646c0.854,0.2,2.531,0.475,3.264-0.95l38.895-84.686c0.791-1.475-0.404-2.672-1.06-3.032C265.257,89.551,230.154,79.688,191.371,77.5C190.589,77.456,189.025,77.499,189.025,79.281z"/>
    <path d="M176.025,79.031c0-1.653-2.019-1.995-2.491-1.993c-35.705,0.172-68.853,6.832-96.416,18.124c-0.772,0.316-2.084,1.348-1.514,3.095l33.604,90.945c0.701,1.537,2.251,1.143,2.912,1.004c19.247-4.002,40.406-7.072,62.239-7.182c0.41-0.002,1.667,0.006,1.667-1.119L176.025,79.031z"/>
    <path d="M304.505,114.94c-10.647,19.907-37.227,81.003-37.227,81.003c-0.41,0.919,0.555,1.319,1.061,1.449c49.018,12.528,81.569,23.448,81.569-14.307c0-26.411-15.936-50.561-42.28-69.125C306.958,113.493,305.327,113.406,304.505,114.94z"/>
  </svg>
);
const SvgMexicana = () => (
  <svg viewBox="0 0 576.943 576.944" width="16" height="16" fill="currentColor">
    <path d="M576.943,346.325c0-24.519-50.785-46.13-127.945-58.829l-19.537,14.708c48.76,8.013,79.818,20.109,79.818,33.631c0,5.565-5.307,10.882-14.889,15.778c-31.977,16.342-112.082,27.932-205.909,27.932c-93.828,0-173.942-11.589-205.919-27.932c-9.582-4.896-14.889-10.213-14.889-15.778c0-11.207,21.353-21.43,56.409-29.165l-15.415-15.692C42.467,303.954,0.01,323.919,0.01,346.325c0,1.778,0.354,3.538,0.889,5.288H0l1.377,1.578c2.132,5.44,6.828,10.7,13.693,15.711l84.934,97.461h-3.978c-12.546,0-22.711,10.165-22.711,22.711v2.391c0,12.546,10.165,22.711,22.711,22.711H490.48c12.545,0,22.711-10.165,22.711-22.711v-2.391c0-12.546-10.166-22.711-22.711-22.711h-13.531l84.924-97.461c6.867-5.011,11.553-10.271,13.684-15.711l1.387-1.578h-0.889C576.58,349.863,576.943,348.103,576.943,346.325z"/>
    <path d="M364.197,294.764l2.553,30.705l35.928-27.053l19.67-14.812l143.389-107.961L344.871,62.768l3.768,45.202l94.238,21.478c3.281,0.746,5.93,3.175,6.973,6.369c1.031,3.203,0.314,6.722-1.895,9.247l-87.859,100.444l2.695,32.397L364.197,294.764z"/>
    <path d="M233.899,293.473l17.356,47.41l42.62-48.73l14.391-16.447l32.092-36.691l8.76-10.012l8.76-10.012l65.121-74.454l-72.705-16.572l-9.781-2.228l-9.783-2.228l-79.541-18.13L213.569,238.01l14.315,39.082L233.899,293.473z"/>
    <path d="M224.05,99.191l-55.338,16.266l-9.189,2.706l-9.199,2.706L9.094,162.38l122.41,124.552l15.147,15.415l22.367,22.759l7.64-26.947l4.992-17.595l11.848-41.788l4.446-15.673l4.447-15.664l30.15-106.306l1.368-4.829L224.05,99.191z"/>
  </svg>
);
const SvgChurrasco = () => (
  <svg viewBox="0 0 512 512" width="16" height="16" fill="currentColor">
    <path d="M511.903,253.069c-1.554-48.548-44.376-84.942-104.409-88.656c-120.864-7.486-109.509-67.345-209.663-73.722c-5.642-0.361-11.207-0.536-16.662-0.536c-102.294,0-171.103,61.839-180.098,137.418c-0.548,4.591-0.839,9.124-0.968,13.612H0v52.824h0.31c3.218,66.926,53.423,119.234,135.051,121.51c48.123,1.342,182.039,5.082,224.552,6.268c69.628,1.94,136.721-44.738,149.856-104.255c0.87-3.94,1.418-7.815,1.767-11.639H512v-52.824H511.903z"/>
    <path d="M297.455,186.182L192.898,324.805l66.236,1.844l91.552-121.381C328.691,200.426,311.661,193.584,297.455,186.182z"/>
    <path d="M265.04,166.244c-17.926-12.136-30.519-20.634-56.144-23.968L85.284,306.17c14.644,10.652,33.898,16.572,56.686,17.21l13.128,0.368l115.81-153.558C268.915,168.862,266.956,167.54,265.04,166.244z"/>
    <path d="M56.273,233.125c-2.166,18.228,0.767,35.265,8.267,49.367l106.498-141.202C108.716,145.893,62.322,182.351,56.273,233.125z"/>
    <path d="M398.015,211.639c-4.398-0.271-8.641-0.619-12.768-1.019L296.94,327.707l59.472,1.657c0.961,0.019,1.922,0.038,2.882,0.038c44.286,0,88.27-29.771,96.046-65.03c2.528-11.465,0.594-21.556-5.764-29.99C439.748,221.351,420.951,213.058,398.015,211.639z"/>
  </svg>
);

// ── Categorias ────────────────────────────────────────────────────────────────
const FOOD_CATEGORIES = [
  { id: "pizza",      label: "Pizza",      Icon: SvgPizza,      bg: "#FFDDD2", fg: "#C1440E" },
  { id: "hamburguer", label: "Hambúrguer", Icon: SvgHamburguer, bg: "#FFF3C2", fg: "#A0730A" },
  { id: "japonesa",   label: "Japonesa",   Icon: SvgJaponesa,   bg: "#FFD6D6", fg: "#B71C1C" },
  { id: "mexicana",   label: "Mexicana",   Icon: SvgMexicana,   bg: "#FFE8CC", fg: "#BF5C00" },
  { id: "churrasco",  label: "Churrasco",  Icon: SvgChurrasco,  bg: "#EDE8E3", fg: "#5D4037" },
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

  // Bloqueia scroll do body enquanto a tela de busca está ativa
  useEffect(() => {
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    };
  }, []);

  const [searchInput,      setSearchInput]      = useState("");
  const [locationFilter,   setLocationFilter]   = useState(DEFAULT_LOC);
  const [showDropdown,     setShowDropdown]     = useState(false);
  const [recentLocations,  setRecentLocations]  = useState<string[]>([]);
  const [activeCategory,   setActiveCategory]   = useState("pizza");
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
    <>
    <style>{`body, html { overflow: hidden !important; max-height: 100dvh !important; }`}</style>
    <div className="fixed inset-0 overflow-hidden" onClick={() => setShowDropdown(false)}>

      {/* ── MAPA FULL SCREEN ── */}
      <div ref={mapRef} className="absolute inset-0 z-0" />

      {/* ── HEADER FLUTUANTE (topo) ── */}
      <div
        className="absolute left-0 right-0 z-30 px-4"
        style={{
          top: 0,
          paddingTop: "calc(env(safe-area-inset-top,0px) + 12px)",
          background: "rgba(245,241,237,0.97)",
          backdropFilter: "blur(8px)",
          paddingBottom: 12,
          boxShadow: "0 2px 12px rgba(0,0,0,0.08)",
        }}
        onClick={e => e.stopPropagation()}
      >
        {/* Título + voltar */}
        <div className="flex items-center gap-3 mb-3">
          <button
            onClick={() => router.back()}
            className="w-10 h-10 rounded-full flex items-center justify-center shrink-0 active:scale-90 transition-transform shadow-md"
            style={{ backgroundColor: "#1F3D34" }}
          >
            <ChevronRight size={18} className="rotate-180" style={{ color: "white" }} />
          </button>
          <div className="flex-1 min-w-0">
            <h1 className="text-[18px] font-black leading-tight" style={{ color: "#1F3D34" }}>Restaurantes</h1>
            <p className="text-[11px]" style={{ color: "#6B8E6F" }}>Avaliados por celíacos</p>
          </div>
          {/* Botão localização */}
          <button
            onClick={() => flyToCity("são paulo")}
            className="w-10 h-10 bg-white rounded-full flex items-center justify-center active:scale-90 transition-transform shadow-md"
          >
            <Navigation size={16} style={{ color: "#1F3D34" }} />
          </button>
        </div>

        {/* ── Search bar ── */}
        <div className="relative mb-2">
          <div
            className="flex items-center gap-3 bg-white px-4 py-3 border transition-all"
            style={{
              borderRadius: showDropdownContent ? "20px 20px 0 0" : 999,
              boxShadow: showDropdownContent ? "0 4px 20px rgba(31,61,52,0.2)" : "0 3px 14px rgba(0,0,0,0.18)",
              borderColor: showDropdownContent ? "#1F3D34" : "transparent",
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
              className="flex items-center gap-1.5 rounded-full px-2.5 py-1.5 shrink-0 active:scale-95 transition-transform"
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
                boxShadow: "0 12px 32px rgba(0,0,0,0.15)",
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

        {/* Categorias */}
        <div className="flex gap-2 overflow-x-auto pb-1" style={{ scrollbarWidth: "none" }}>
          {FOOD_CATEGORIES.map(cat => {
            const isActive = activeCategory === cat.id;
            return (
              <button key={cat.id} onClick={() => setActiveCategory(cat.id)}
                className="shrink-0 flex items-center gap-1.5 px-3 py-2 rounded-full transition-all active:scale-95 shadow-sm"
                style={{
                  backgroundColor: isActive ? cat.fg : "white",
                  color: isActive ? "#ffffff" : cat.fg,
                }}
              >
                <cat.Icon />
                <span className="text-[12px] font-black whitespace-nowrap">{cat.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Popup restaurante selecionado (centro do mapa) */}
      {selectedRestaurant && (
        <div
          className="absolute z-20 rounded-2xl overflow-hidden"
          style={{
            width: 280, bottom: "calc(env(safe-area-inset-bottom,0px) + 220px)",
            left: "50%", transform: "translateX(-50%)",
            boxShadow: "0 8px 32px rgba(0,0,0,0.28)",
          }}
          onClick={e => e.stopPropagation()}
        >
          <Link href={`/restaurante/${selectedRestaurant.id}`} className="block active:scale-[0.98] transition-transform">
            <div className="relative h-[100px] w-full">
              <Image src={selectedRestaurant.image} alt={selectedRestaurant.name} fill className="object-cover" unoptimized />
              <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />
              <div className="absolute top-2.5 left-2.5">
                <SafetyBadge level={selectedRestaurant.safetyLevel} size="sm" />
              </div>
              <button
                onClick={e => { e.preventDefault(); e.stopPropagation(); setSelectedId(null); }}
                className="absolute top-2.5 right-2.5 w-6 h-6 bg-black/40 rounded-full flex items-center justify-center active:scale-90"
              >
                <X size={11} color="white" />
              </button>
            </div>
            <div className="bg-white px-3 py-2.5">
              <div className="flex items-center justify-between gap-2">
                <div className="flex-1 min-w-0">
                  <p className="font-extrabold text-[13px] text-text-primary truncate">{selectedRestaurant.name}</p>
                  <p className="text-text-disabled text-[11px] truncate mt-0.5">{selectedRestaurant.cuisine} · {selectedRestaurant.city}</p>
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

      {/* ── CARROSSEL FLUTUANTE (base) ── */}
      <div
        className="absolute left-0 right-0 z-30"
        style={{
          bottom: "calc(env(safe-area-inset-bottom,0px) + 88px)",
        }}
        onClick={e => e.stopPropagation()}
      >
        {/* Banner nada encontrado */}
        {!hasLocalResults && (
          <div className="mx-4 mb-3 px-3.5 py-3 rounded-2xl flex items-center gap-2.5 shadow-md" style={{ backgroundColor: "#FFF3E0", border: "1px solid #FFD180" }}>
            <span className="text-[18px]">📍</span>
            <div className="flex-1 min-w-0">
              <p className="text-[12px] font-bold truncate" style={{ color: "#E65100" }}>Nada encontrado em {locationFilter}</p>
              <p className="text-[10px] mt-0.5" style={{ color: "#BF360C" }}>Mostrando os mais próximos dessa região</p>
            </div>
          </div>
        )}

        {/* Cabeçalho */}
        <div className="flex items-center justify-between px-5 mb-2">
          <div className="bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 shadow-sm">
            <p className="text-[12px] font-extrabold text-text-primary">
              {hasLocalResults ? `${localRestaurants.length} em ${locationFilter}` : `${nearbyRestaurants.length} mais próximos`}
            </p>
          </div>
          {hasLocalResults && nearbyRestaurants.length > 0 && (
            <div className="bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 shadow-sm">
              <span className="text-[11px] text-text-disabled font-medium">+{nearbyRestaurants.length} próximos</span>
            </div>
          )}
        </div>

        {/* Carrossel */}
        <div
          ref={carouselRef}
          className="flex gap-3 overflow-x-auto px-5 pb-2"
          style={{ scrollbarWidth: "none" }}
        >
          {displayList.map(r => (
            <CarouselCard key={r.id} restaurant={r} isActive={selectedId === r.id}
              onClick={() => {
                setSelectedId(r.id);
                const coords = RESTAURANT_COORDS[r.id];
                if (coords && mapInstance.current) mapInstance.current.setView(coords, 15, { animate: true });
              }}
            />
          ))}
          {hasLocalResults && nearbyRestaurants.length > 0 && (
            <>
              <div className="shrink-0 flex flex-col items-center justify-center gap-1 px-1" style={{ minWidth: 60 }}>
                <div className="w-px flex-1 bg-border" />
                <span className="text-[9px] font-bold text-text-disabled whitespace-nowrap text-center leading-tight" style={{ writingMode: "vertical-rl" }}>MAIS PRÓXIMOS</span>
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
    </>
  );
}
