"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  Settings, Camera, MapPin, Pencil, ChevronRight,
  Store, UtensilsCrossed, Star, Heart, Globe, Bell,
  HelpCircle, Info, LogOut, ShieldCheck, Eye, Check,
} from "lucide-react";
import Tag from "@/components/Tag";
import SafetyBadge from "@/components/SafetyBadge";
import { restrictionConfig, getIngredientColor } from "@/lib/tags";
import type { SafetyLevel } from "@/lib/data";

const restrictionKeys = ["sem_gluten","sem_lactose","sem_nozes","sem_ovo","vegano","vegetariano"] as const;
const prohibitedIngredients = ["Trigo", "Cevada", "Malte", "Leite", "Aveia", "Centeio"];

const journeyStats = [
  { icon: Store,           value: 12, label: "Restaurantes\nseguros",  color: "#1F3D34", bg: "#C6F59D" },
  { icon: UtensilsCrossed, value: 34, label: "Pratos\nexperimentados", color: "#2E7D32", bg: "#E8F5E9" },
  { icon: Star,            value: 18, label: "Avaliações\nfeitas",     color: "#7C3AED", bg: "#EDE9FE" },
  { icon: Heart,           value: 5,  label: "Favoritos\nsalvos",      color: "#D97706", bg: "#FEF3C7" },
];

const recentActivity: { title: string; subtitle: string; image: string; level: SafetyLevel }[] = [
  {
    title: "Le Manjue Organique",
    subtitle: "Avaliado há 3 dias",
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=80&h=80&fit=crop",
    level: "certificado",
  },
  {
    title: "Risoto de cogumelos",
    subtitle: "Favorito salvo há 1 semana",
    image: "https://images.unsplash.com/photo-1476124369491-e7addf5db371?w=80&h=80&fit=crop",
    level: "muito_seguro",
  },
];

const configItems = [
  { icon: Globe,      label: "Idioma",          detail: "Português", href: "/idioma"       },
  { icon: HelpCircle, label: "Ajuda e suporte", detail: "",          href: "/configuracoes" },
  { icon: Info,       label: "Sobre o Glútty",  detail: "",          href: "/configuracoes" },
];

export default function PerfilPage() {
  const router = useRouter();
  const PHOTO = "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop&crop=face";
  const [isEditing, setIsEditing] = useState(false);
  const [bio,       setBio]       = useState("");
  const [bioSaved,  setBioSaved]  = useState("");

  const handleSave = () => { setBioSaved(bio); setIsEditing(false); };
  const handleCancel = () => { setBio(bioSaved); setIsEditing(false); };

  return (
    <div className="bg-background min-h-dvh" style={{ paddingBottom: "calc(env(safe-area-inset-bottom, 0px) + 100px)" }}>

      {/* ── Header ── */}
      <div className="flex items-start gap-3 px-5 pb-5" style={{ paddingTop: "calc(env(safe-area-inset-top, 0px) + 48px)" }}>
        <button
          onClick={() => router.back()}
          className="w-9 h-9 rounded-full flex items-center justify-center shrink-0 active:scale-90 transition-transform"
          style={{ backgroundColor: "#1F3D34" }}
        >
          <ChevronRight size={18} className="rotate-180" style={{ color: "white" }} />
        </button>
        <div className="flex-1">
          <h1 className="text-xl font-extrabold text-primary font-display leading-tight">Meu Perfil</h1>
          <p className="text-[12px] text-text-disabled mt-0.5">Suas informações e preferências</p>
        </div>

        <Link
          href="/configuracoes"
          className="w-9 h-9 bg-surface rounded-full flex items-center justify-center border border-border shadow-sm active:scale-90 transition-transform"
        >
          <Settings size={16} className="text-text-secondary" />
        </Link>

        {/* Sino com badge */}
        <Link
          href="/notificacoes"
          className="relative w-9 h-9 bg-surface rounded-full flex items-center justify-center border border-border shadow-sm active:scale-90 transition-transform"
        >
          <Bell size={16} className="text-text-secondary" />
          <span
            className="absolute -top-1 -right-1 min-w-[18px] h-[18px] rounded-full flex items-center justify-center border-2 border-background"
            style={{ backgroundColor: "#E53935", fontSize: "10px", fontWeight: 700, color: "#fff", paddingInline: 3 }}
          >
            3
          </span>
        </Link>
      </div>

      <div className="px-5 space-y-4">

        {/* ── Identidade ── */}
        <div
          className="bg-surface rounded-3xl overflow-hidden"
          style={{ boxShadow: "0 2px 16px rgba(0,0,0,0.08)", border: "1px solid var(--color-border)" }}
        >
          <div className="px-5 pt-5 pb-5">
            <div className="flex items-end justify-between mb-3">
              <div className="relative">
                <div
                  className="w-[72px] h-[72px] rounded-full overflow-hidden border-[2.5px]"
                  style={{ borderColor: "#C6F59D", boxShadow: "0 4px 12px rgba(0,0,0,0.10)" }}
                >
                  <Image src={PHOTO} alt="Michelle Sagas" width={72} height={72} className="object-cover w-full h-full" unoptimized />
                </div>
                <button
                  className="absolute bottom-0 right-0 w-6 h-6 rounded-full flex items-center justify-center border-2 border-surface active:scale-90 transition-transform"
                  style={{ backgroundColor: "#1F3D34" }}
                >
                  <Camera size={10} color="#C6F59D" />
                </button>
              </div>

              {/* Botões de ação */}
              <div className="flex items-center gap-2 pb-1">
                {isEditing ? (
                  <>
                    <button
                      onClick={handleCancel}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-border bg-surface active:scale-95 transition-transform"
                    >
                      <span className="text-text-secondary font-semibold text-[11px]">Cancelar</span>
                    </button>
                    <button
                      onClick={handleSave}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-full active:scale-95 transition-transform"
                      style={{ backgroundColor: "#1F3D34" }}
                    >
                      <Check size={11} color="#C6F59D" />
                      <span className="font-bold text-[11px]" style={{ color: "#C6F59D" }}>Salvar</span>
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      href="/perfil/1"
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-border bg-surface active:scale-95 transition-transform"
                      style={{ boxShadow: "0 1px 4px rgba(0,0,0,0.06)" }}
                    >
                      <Eye size={12} className="text-text-secondary" />
                      <span className="text-text-secondary font-semibold text-[11px]">Ver público</span>
                    </Link>
                    <button
                      onClick={() => setIsEditing(true)}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-full active:scale-95 transition-transform"
                      style={{ backgroundColor: "#1F3D34" }}
                    >
                      <Pencil size={11} color="#C6F59D" />
                      <span className="font-bold text-[11px]" style={{ color: "#C6F59D" }}>Editar</span>
                    </button>
                  </>
                )}
              </div>
            </div>

            {/* Nome + info */}
            <h2 className="text-[19px] font-black text-text-primary leading-tight">Michelle Sagas</h2>
            <p className="text-text-disabled text-[12px] mt-0.5">michellesagas@hotmail.com</p>
            <div className="flex items-center gap-1 mt-1">
              <MapPin size={11} className="shrink-0" style={{ color: "#1F3D34" }} />
              <span className="text-text-secondary text-[12px]">Zurique, Suíça</span>
            </div>

            {/* Bio */}
            <div className="mt-4">
              <div
                className="rounded-2xl p-3"
                style={{
                  backgroundColor: "var(--color-background)",
                  border: isEditing ? "1.5px solid #1F3D34" : "1px solid var(--color-border)",
                  transition: "border-color 0.2s",
                }}
              >
                <p className="text-[10px] font-bold text-text-disabled uppercase tracking-wide mb-1.5">Sobre mim</p>
                {isEditing ? (
                  <textarea
                    value={bio}
                    onChange={e => setBio(e.target.value)}
                    autoFocus
                    placeholder="Conte um pouco sobre você — há quanto tempo é celíaca, onde mora, como lida com a dieta..."
                    className="w-full text-[13px] text-text-primary bg-transparent outline-none resize-none leading-relaxed placeholder:text-text-disabled"
                    rows={3}
                  />
                ) : (
                  <p
                    className="text-[13px] leading-relaxed"
                    style={{ color: bioSaved ? "var(--color-text-primary)" : "var(--color-text-disabled)" }}
                  >
                    {bioSaved || "Conte um pouco sobre você — há quanto tempo é celíaca, onde mora, como lida com a dieta..."}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* ── Perfil Alimentar ── */}
        <div className="bg-surface rounded-2xl p-4" style={{ boxShadow: "0 2px 12px rgba(0,0,0,0.06)" }}>
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-extrabold text-text-primary text-[15px]">Perfil Alimentar</h3>
              <p className="text-text-disabled text-[11px] mt-0.5">Personaliza suas recomendações e contextualiza avaliações</p>
            </div>
            <Link href="/perfil/restricoes" className="flex items-center gap-1 active:scale-95 transition-transform">
              <Pencil size={12} style={{ color: "#1F3D34" }} />
              <span className="font-bold text-[12px]" style={{ color: "#1F3D34" }}>Editar</span>
            </Link>
          </div>

          {/* Diagnóstico */}
          <p className="text-[11px] font-bold text-text-disabled uppercase tracking-wide mb-2">Diagnóstico</p>
          <div className="flex items-center gap-2 mb-5">
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full" style={{ backgroundColor: "#E0F7FA" }}>
              <ShieldCheck size={12} style={{ color: "#00838F" }} />
              <span className="text-[12px] font-bold" style={{ color: "#00838F" }}>Celíaca</span>
            </div>
            <span className="text-[10px] text-text-disabled italic">· não removível</span>
          </div>

          {/* Restrições */}
          <p className="text-[11px] font-bold text-text-disabled uppercase tracking-wide mb-2">Minhas restrições</p>
          <div className="flex flex-wrap gap-2 mb-5">
            {restrictionKeys.filter(k => k !== "sem_gluten").map((key) => {
              const cfg = restrictionConfig[key];
              return <Tag key={key} label={cfg.tag} colorConfig={{ color: cfg.color, bg: cfg.bg }} size="md" />;
            })}
          </div>

          {/* Separador */}
          <div className="border-t border-border mb-5" />

          {/* Ingredientes proibidos */}
          <p className="text-[11px] font-bold text-text-disabled uppercase tracking-wide mb-2">Ingredientes proibidos</p>
          <div className="flex flex-wrap gap-2">
            {prohibitedIngredients.map(ing => (
              <Tag key={ing} label={ing} colorConfig={getIngredientColor(ing)} size="md" strikethrough />
            ))}
          </div>
        </div>

        {/* ── Jornada no Glútty ── */}
        <div className="bg-surface rounded-2xl p-4" style={{ boxShadow: "0 2px 12px rgba(0,0,0,0.06)" }}>
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-extrabold text-text-primary text-[15px]">Sua jornada no Glútty</h3>
            <span className="text-[11px] font-medium text-text-disabled">Desde Jan 2023</span>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {journeyStats.map(({ icon: Icon, value, label, color, bg }) => (
              <div
                key={label}
                className="flex flex-col items-center justify-center gap-2 py-4 rounded-2xl"
                style={{ backgroundColor: bg }}
              >
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: `${color}20` }}
                >
                  <Icon size={20} style={{ color }} />
                </div>
                <span className="text-[26px] font-extrabold leading-none" style={{ color }}>{value}</span>
                <p className="text-text-secondary text-[11px] text-center leading-tight whitespace-pre-line">{label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ── Atividade Recente ── */}
        <div className="bg-surface rounded-2xl p-4" style={{ boxShadow: "0 2px 12px rgba(0,0,0,0.06)" }}>
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-extrabold text-text-primary text-[15px]">Atividade recente</h3>
            <button className="flex items-center gap-0.5 active:scale-95 transition-transform">
              <span className="font-bold text-[12px]" style={{ color: "#1F3D34" }}>Ver todas</span>
              <ChevronRight size={14} style={{ color: "#1F3D34" }} />
            </button>
          </div>
          <div className="space-y-3">
            {recentActivity.map(item => (
              <div key={item.title} className="flex items-center gap-3">
                <div className="relative w-12 h-12 rounded-xl overflow-hidden shrink-0">
                  <Image src={item.image} alt={item.title} fill className="object-cover" unoptimized />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-text-primary text-[13px] truncate">{item.title}</p>
                  <p className="text-text-disabled text-[11px] mt-0.5">{item.subtitle}</p>
                </div>
                <div className="flex items-center gap-1.5 shrink-0">
                  <SafetyBadge level={item.level} size="sm" />
                  <ChevronRight size={14} className="text-text-disabled" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Configurações ── */}
        <div className="bg-surface rounded-2xl overflow-hidden" style={{ boxShadow: "0 2px 12px rgba(0,0,0,0.06)" }}>
          <h3 className="font-extrabold text-text-primary text-[15px] px-4 pt-4 pb-2">Configurações</h3>
          <div className="grid grid-cols-2 divide-x divide-y divide-border">
            {configItems.map(({ icon: Icon, label, detail, href }) => (
              <Link
                key={label}
                href={href}
                className="flex items-center gap-2.5 px-4 py-3.5 text-left active:bg-background transition-colors"
              >
                <Icon size={16} className="text-text-secondary shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-text-primary text-[13px] font-semibold truncate">{label}</p>
                  {detail && <p className="text-text-disabled text-[11px] mt-0.5">{detail}</p>}
                </div>
                <ChevronRight size={13} className="text-text-disabled shrink-0" />
              </Link>
            ))}
          </div>
        </div>

        {/* ── Logout ── */}
        <button className="w-full flex items-center justify-center gap-2 py-3.5 rounded-full border border-error/40 active:scale-95 transition-transform">
          <LogOut size={16} className="text-error" />
          <span className="text-error font-bold text-[14px]">Sair da conta</span>
        </button>

      </div>

    </div>
  );
}
