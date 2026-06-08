"use client";
import { useState } from "react";
import SafetyBadge from "@/components/SafetyBadge";
import Tag from "@/components/Tag";
import BackButton from "@/components/BackButton";
import { palette, allergenConfig, restrictionConfig, getIngredientColor } from "@/lib/tags";
import { Heart, Search, MapPin, Bell, Plus, Check, ChevronRight, Star, ShieldCheck } from "lucide-react";

// ─── Section wrapper ────────────────────────────────────────────────────────
function Section({ id, title, children }: { id: string; title: string; children: React.ReactNode }) {
  return (
    <section id={id} className="scroll-mt-20 mb-14">
      <h2 className="text-[11px] font-black uppercase tracking-[0.15em] text-text-disabled mb-4 pb-2 border-b border-border">
        {title}
      </h2>
      {children}
    </section>
  );
}

// ─── Color swatch ───────────────────────────────────────────────────────────
function Swatch({ name, hex, textDark = false }: { name: string; hex: string; textDark?: boolean }) {
  const [copied, setCopied] = useState(false);
  const copy = () => {
    navigator.clipboard.writeText(hex);
    setCopied(true);
    setTimeout(() => setCopied(false), 1200);
  };
  return (
    <button
      onClick={copy}
      className="flex flex-col rounded-2xl overflow-hidden shadow-sm active:scale-95 transition-transform text-left"
      style={{ minWidth: 80 }}
    >
      <div className="h-14 w-full" style={{ backgroundColor: hex }} />
      <div className="bg-surface px-3 py-2">
        <p className="text-[11px] font-bold text-text-primary truncate">{name}</p>
        <p className="text-[10px] text-text-disabled font-mono mt-0.5">{copied ? "Copiado!" : hex}</p>
      </div>
    </button>
  );
}

// ─── Token row ──────────────────────────────────────────────────────────────
function TokenRow({ name, value, preview }: { name: string; value: string; preview?: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between py-2.5 border-b border-border/50 last:border-0">
      <span className="font-mono text-[12px] text-text-secondary">{name}</span>
      <div className="flex items-center gap-3">
        {preview}
        <span className="font-mono text-[11px] text-text-disabled bg-background px-2 py-0.5 rounded-md">{value}</span>
      </div>
    </div>
  );
}

// ─── Nav anchor ─────────────────────────────────────────────────────────────
const NAV_ITEMS = [
  { id: "colors",     label: "Cores"       },
  { id: "typography", label: "Tipografia"  },
  { id: "spacing",    label: "Espaçamento" },
  { id: "badges",     label: "Badges"      },
  { id: "tags",       label: "Tags"        },
  { id: "buttons",    label: "Botões"      },
  { id: "inputs",     label: "Inputs"      },
  { id: "bottomnav",  label: "Nav"         },
];

export default function DesignSystemPage() {
  const [inputVal, setInputVal] = useState("");

  return (
    <div className="bg-background min-h-dvh">

      {/* ── Top bar ── */}
      <div className="sticky top-0 z-40 bg-surface/95 backdrop-blur border-b border-border">
        <div className="flex items-center gap-3 px-5 py-3">
          <BackButton />
          <div>
            <h1 className="text-[15px] font-black text-text-primary leading-tight">Design System</h1>
            <p className="text-[10px] text-text-disabled">Glútty · v1.0</p>
          </div>
          <div className="ml-auto flex items-center gap-1.5">
            <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-primary/10 text-primary">Inter</span>
            <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-primary/10 text-primary">Tailwind v4</span>
          </div>
        </div>

        {/* Anchors */}
        <div className="flex gap-1 px-4 pb-3 overflow-x-auto no-scrollbar">
          {NAV_ITEMS.map(({ id, label }) => (
            <a
              key={id}
              href={`#${id}`}
              className="shrink-0 text-[11px] font-semibold px-3 py-1.5 rounded-full bg-background text-text-secondary active:scale-95 transition-transform"
            >
              {label}
            </a>
          ))}
        </div>
      </div>

      <div className="px-5 pt-8 pb-24">

        {/* ── COLORS ────────────────────────────────────────────────── */}
        <Section id="colors" title="Cores">

          <div className="space-y-6">
            {/* Brand */}
            <div>
              <p className="text-[12px] font-bold text-text-secondary mb-3">Brand</p>
              <div className="grid grid-cols-3 gap-2">
                <Swatch name="Primary"     hex="#FC6904" />
                <Swatch name="Primary Dark" hex="#D95A00" />
                <Swatch name="Nav"         hex="#FFAF78" />
              </div>
            </div>

            {/* Safety */}
            <div>
              <p className="text-[12px] font-bold text-text-secondary mb-3">Safety Gradients (start)</p>
              <div className="grid grid-cols-3 gap-2">
                <Swatch name="Certificado" hex="#11998E" />
                <Swatch name="Muito Seguro" hex="#2EC4B6" />
                <Swatch name="Adaptável"   hex="#FFB347" />
                <Swatch name="Atenção"     hex="#FF8C42" />
                <Swatch name="Cuidado"     hex="#FF3C3C" />
                <Swatch name="Verificado"  hex="#667EEA" />
              </div>
            </div>

            {/* Semantic */}
            <div>
              <p className="text-[12px] font-bold text-text-secondary mb-3">Semânticas</p>
              <div className="grid grid-cols-3 gap-2">
                <Swatch name="Success"  hex="#2E7D32" />
                <Swatch name="Warning"  hex="#F59E0B" />
                <Swatch name="Error"    hex="#EF4444" />
                <Swatch name="Info"     hex="#1565C0" />
              </div>
            </div>

            {/* Neutrals */}
            <div>
              <p className="text-[12px] font-bold text-text-secondary mb-3">Neutros</p>
              <div className="grid grid-cols-3 gap-2">
                <Swatch name="text-primary"   hex="#1C1C1C" />
                <Swatch name="text-secondary" hex="#555555" />
                <Swatch name="text-disabled"  hex="#A0A0A0" />
                <Swatch name="border"         hex="#E5E7EB" />
                <Swatch name="surface"        hex="#FFFFFF" textDark />
                <Swatch name="background"     hex="#F7F4F0" textDark />
              </div>
            </div>

            {/* Tag palette */}
            <div>
              <p className="text-[12px] font-bold text-text-secondary mb-3">Paleta Tom-sobre-Tom</p>
              <div className="grid grid-cols-3 gap-2">
                {Object.entries(palette).map(([name, { bg, color }]) => (
                  <div key={name} className="rounded-2xl overflow-hidden shadow-sm">
                    <div className="h-8" style={{ backgroundColor: bg }} />
                    <div className="h-4" style={{ backgroundColor: color }} />
                    <div className="bg-surface px-2 py-1.5">
                      <p className="text-[10px] font-bold text-text-primary capitalize">{name}</p>
                      <p className="text-[9px] font-mono text-text-disabled">{color}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Section>

        {/* ── TYPOGRAPHY ────────────────────────────────────────────── */}
        <Section id="typography" title="Tipografia">
          <div className="bg-surface rounded-2xl p-5 space-y-1" style={{ boxShadow: "0 2px 12px rgba(0,0,0,0.06)" }}>
            <TokenRow name="font-family" value="Inter, sans-serif" />
          </div>

          <div className="mt-4 space-y-3">
            {[
              { name: "Display / H1", size: "32px", weight: "800", sample: "Coma fora com segurança" },
              { name: "Heading / H2", size: "24px", weight: "700", sample: "Restaurantes próximos"   },
              { name: "Subtitle / H3",size: "20px", weight: "600", sample: "Pratos recomendados"     },
              { name: "Body Large",   size: "16px", weight: "400", sample: "Sem glúten e sem lactose" },
              { name: "Body",         size: "14px", weight: "400", sample: "Cardápio revisado pela comunidade" },
              { name: "Caption",      size: "12px", weight: "500", sample: "2,3 km · Aberto agora"  },
              { name: "Overline",     size: "11px", weight: "600", sample: "RECOMENDADO PARA VOCÊ"  },
            ].map(({ name, size, weight, sample }) => (
              <div
                key={name}
                className="bg-surface rounded-2xl px-4 py-3 flex items-baseline justify-between gap-4"
                style={{ boxShadow: "0 2px 8px rgba(0,0,0,0.05)" }}
              >
                <p style={{ fontSize: size, fontWeight: weight, lineHeight: 1.3 }} className="text-text-primary flex-1 min-w-0 truncate">
                  {sample}
                </p>
                <div className="shrink-0 text-right">
                  <p className="text-[10px] font-bold text-text-secondary">{name}</p>
                  <p className="text-[10px] font-mono text-text-disabled">{size} · {weight}</p>
                </div>
              </div>
            ))}
          </div>
        </Section>

        {/* ── SPACING ───────────────────────────────────────────────── */}
        <Section id="spacing" title="Espaçamento">
          <div className="bg-surface rounded-2xl p-4 space-y-2" style={{ boxShadow: "0 2px 12px rgba(0,0,0,0.06)" }}>
            {[
              { token: "spacing-1",  val: "4px",  tw: "p-1"  },
              { token: "spacing-2",  val: "8px",  tw: "p-2"  },
              { token: "spacing-3",  val: "12px", tw: "p-3"  },
              { token: "spacing-4",  val: "16px", tw: "p-4"  },
              { token: "spacing-5",  val: "20px", tw: "p-5"  },
              { token: "spacing-6",  val: "24px", tw: "p-6"  },
              { token: "spacing-8",  val: "32px", tw: "p-8"  },
              { token: "radius-sm",  val: "8px",  tw: "rounded-lg"    },
              { token: "radius-md",  val: "12px", tw: "rounded-xl"    },
              { token: "radius-lg",  val: "16px", tw: "rounded-2xl"   },
              { token: "radius-full",val: "999px",tw: "rounded-full"  },
            ].map(({ token, val, tw }) => (
              <div key={token} className="flex items-center justify-between py-1.5 border-b border-border/40 last:border-0">
                <span className="font-mono text-[11px] text-text-secondary">{token}</span>
                <div className="flex items-center gap-3">
                  <div
                    className="bg-primary/20"
                    style={{
                      width: token.startsWith("radius") ? 24 : parseInt(val),
                      height: token.startsWith("radius") ? 24 : parseInt(val),
                      borderRadius: token.startsWith("radius") ? val : 4,
                      minWidth: 4,
                      minHeight: 4,
                    }}
                  />
                  <span className="font-mono text-[10px] text-text-disabled bg-background px-2 py-0.5 rounded-md">{val}</span>
                  <span className="font-mono text-[10px] text-primary/70 hidden sm:block">.{tw}</span>
                </div>
              </div>
            ))}
          </div>
        </Section>

        {/* ── SAFETY BADGES ─────────────────────────────────────────── */}
        <Section id="badges" title="Safety Badges">
          <div className="space-y-3">
            {(["certificado","muito_seguro","verificado","seguro","moderado","cuidado","recomendado","novo"] as const).map((level) => (
              <div key={level} className="bg-surface rounded-2xl px-4 py-3 flex items-center justify-between" style={{ boxShadow: "0 2px 8px rgba(0,0,0,0.05)" }}>
                <div>
                  <p className="text-[12px] font-semibold text-text-primary">{level.replace("_", " ")}</p>
                </div>
                <div className="flex items-center gap-2">
                  <SafetyBadge level={level} size="sm" />
                  <SafetyBadge level={level} size="md" />
                  <SafetyBadge level={level} size="lg" />
                </div>
              </div>
            ))}
          </div>
        </Section>

        {/* ── TAGS ──────────────────────────────────────────────────── */}
        <Section id="tags" title="Tags">

          {/* Restrictions */}
          <div className="mb-5">
            <p className="text-[12px] font-bold text-text-secondary mb-3">Restrições</p>
            <div className="bg-surface rounded-2xl p-4 flex flex-wrap gap-2" style={{ boxShadow: "0 2px 8px rgba(0,0,0,0.05)" }}>
              {Object.entries(restrictionConfig).map(([key, cfg]) => (
                <Tag key={key} label={cfg.tag} colorConfig={cfg} size="md" />
              ))}
              {/* selected state */}
              {Object.entries(restrictionConfig).slice(0, 2).map(([key, cfg]) => (
                <Tag key={`sel-${key}`} label={cfg.tag} colorConfig={cfg} size="md" selected />
              ))}
            </div>
          </div>

          {/* Allergens */}
          <div className="mb-5">
            <p className="text-[12px] font-bold text-text-secondary mb-3">Alérgenos</p>
            <div className="bg-surface rounded-2xl p-4 flex flex-wrap gap-2" style={{ boxShadow: "0 2px 8px rgba(0,0,0,0.05)" }}>
              {Object.entries(allergenConfig).map(([key, cfg]) => (
                <Tag key={key} label={cfg.tag} colorConfig={cfg} size="sm" />
              ))}
            </div>
          </div>

          {/* Strikethrough */}
          <div>
            <p className="text-[12px] font-bold text-text-secondary mb-3">Ingredientes proibidos (strikethrough)</p>
            <div className="bg-surface rounded-2xl p-4 flex flex-wrap gap-2" style={{ boxShadow: "0 2px 8px rgba(0,0,0,0.05)" }}>
              {["Trigo", "Leite", "Aveia", "Cevada"].map((ing) => (
                <Tag
                  key={ing}
                  label={ing}
                  colorConfig={getIngredientColor(ing)}
                  size="md"
                  strikethrough
                />
              ))}
            </div>
          </div>
        </Section>

        {/* ── BUTTONS ───────────────────────────────────────────────── */}
        <Section id="buttons" title="Botões">
          <div className="space-y-4">

            {/* Primary */}
            <div className="bg-surface rounded-2xl p-4" style={{ boxShadow: "0 2px 8px rgba(0,0,0,0.05)" }}>
              <p className="text-[11px] font-bold text-text-disabled mb-3 uppercase tracking-wide">Primary</p>
              <div className="flex flex-wrap gap-3 items-center">
                <button className="px-6 py-3.5 rounded-full font-bold text-white text-[15px] active:scale-95 transition-transform" style={{ backgroundColor: "#FC6904" }}>
                  Criar conta grátis
                </button>
                <button className="px-5 py-2.5 rounded-full font-bold text-white text-[14px] active:scale-95 transition-transform" style={{ backgroundColor: "#FC6904" }}>
                  Confirmar
                </button>
                <button className="px-4 py-2 rounded-full font-bold text-white text-[13px] active:scale-95 transition-transform" style={{ backgroundColor: "#FC6904" }}>
                  Salvar
                </button>
              </div>
            </div>

            {/* Secondary / Outline */}
            <div className="bg-surface rounded-2xl p-4" style={{ boxShadow: "0 2px 8px rgba(0,0,0,0.05)" }}>
              <p className="text-[11px] font-bold text-text-disabled mb-3 uppercase tracking-wide">Outline</p>
              <div className="flex flex-wrap gap-3 items-center">
                <button className="px-6 py-3.5 rounded-full font-bold text-[15px] border-2 active:scale-95 transition-transform" style={{ borderColor: "#FC6904", color: "#FC6904" }}>
                  Já tenho conta
                </button>
                <button className="px-5 py-2.5 rounded-full font-bold text-[14px] border active:scale-95 transition-transform" style={{ borderColor: "#FC6904", color: "#FC6904" }}>
                  Editar perfil
                </button>
              </div>
            </div>

            {/* Ghost */}
            <div className="bg-surface rounded-2xl p-4" style={{ boxShadow: "0 2px 8px rgba(0,0,0,0.05)" }}>
              <p className="text-[11px] font-bold text-text-disabled mb-3 uppercase tracking-wide">Ghost / Link</p>
              <div className="flex flex-wrap gap-3 items-center">
                <button className="flex items-center gap-1 font-bold text-[14px] active:scale-95 transition-transform" style={{ color: "#FC6904" }}>
                  Ver todos <ChevronRight size={14} />
                </button>
                <button className="flex items-center gap-1 font-bold text-[14px] active:scale-95 transition-transform" style={{ color: "#FC6904" }}>
                  Editar <span className="text-[12px]">✏️</span>
                </button>
              </div>
            </div>

            {/* Icon buttons */}
            <div className="bg-surface rounded-2xl p-4" style={{ boxShadow: "0 2px 8px rgba(0,0,0,0.05)" }}>
              <p className="text-[11px] font-bold text-text-disabled mb-3 uppercase tracking-wide">Ícone</p>
              <div className="flex flex-wrap gap-3 items-center">
                <BackButton />
                <button className="w-10 h-10 rounded-full flex items-center justify-center active:scale-90 transition-transform" style={{ backgroundColor: "#FFF0E6" }}>
                  <Heart size={18} style={{ color: "#FC6904" }} />
                </button>
                <button className="w-10 h-10 rounded-full flex items-center justify-center active:scale-90 transition-transform" style={{ backgroundColor: "#FFF0E6" }}>
                  <Bell size={18} style={{ color: "#FC6904" }} />
                </button>
                <button className="w-10 h-10 rounded-full flex items-center justify-center active:scale-90 transition-transform" style={{ backgroundColor: "#FC6904" }}>
                  <Plus size={18} color="white" />
                </button>
                {/* Heart — saved */}
                <button className="w-10 h-10 rounded-full flex items-center justify-center active:scale-90 transition-transform" style={{ backgroundColor: "#e60023" }}>
                  <Heart size={18} fill="white" color="white" />
                </button>
              </div>
            </div>

            {/* Danger */}
            <div className="bg-surface rounded-2xl p-4" style={{ boxShadow: "0 2px 8px rgba(0,0,0,0.05)" }}>
              <p className="text-[11px] font-bold text-text-disabled mb-3 uppercase tracking-wide">Danger</p>
              <div className="flex flex-wrap gap-3 items-center">
                <button className="flex items-center gap-2 px-5 py-2.5 rounded-full border font-bold text-[14px] active:scale-95 transition-transform" style={{ borderColor: "#EF4444", color: "#EF4444" }}>
                  Sair da conta
                </button>
              </div>
            </div>
          </div>
        </Section>

        {/* ── INPUTS ────────────────────────────────────────────────── */}
        <Section id="inputs" title="Inputs">
          <div className="space-y-3">

            {/* Default */}
            <div className="bg-surface rounded-2xl p-4" style={{ boxShadow: "0 2px 8px rgba(0,0,0,0.05)" }}>
              <p className="text-[11px] font-bold text-text-disabled mb-3 uppercase tracking-wide">Default</p>
              <input
                className="w-full rounded-2xl px-4 py-3.5 text-[14px] font-medium outline-none border border-border bg-background text-text-primary"
                placeholder="Cidade, bairro ou restaurante..."
              />
            </div>

            {/* With icon */}
            <div className="bg-surface rounded-2xl p-4" style={{ boxShadow: "0 2px 8px rgba(0,0,0,0.05)" }}>
              <p className="text-[11px] font-bold text-text-disabled mb-3 uppercase tracking-wide">Com ícone</p>
              <div className="relative">
                <MapPin size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-primary" />
                <input
                  className="w-full rounded-2xl pl-10 pr-4 py-3.5 text-[14px] font-medium outline-none border border-border bg-background text-text-primary"
                  placeholder="Zurich, Granò, Pizza..."
                />
              </div>
            </div>

            {/* Search */}
            <div className="bg-surface rounded-2xl p-4" style={{ boxShadow: "0 2px 8px rgba(0,0,0,0.05)" }}>
              <p className="text-[11px] font-bold text-text-disabled mb-3 uppercase tracking-wide">Search</p>
              <div className="relative">
                <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-text-disabled" />
                <input
                  value={inputVal}
                  onChange={(e) => setInputVal(e.target.value)}
                  className="w-full rounded-2xl pl-10 pr-12 py-3.5 text-[14px] font-medium outline-none border bg-background text-text-primary focus:border-primary transition-colors"
                  placeholder="Buscar restaurante..."
                  style={{ borderColor: inputVal ? "#FC6904" : undefined }}
                />
                {inputVal && (
                  <button
                    onClick={() => setInputVal("")}
                    className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 rounded-full bg-border flex items-center justify-center"
                  >
                    <span className="text-text-disabled text-[10px] font-bold">✕</span>
                  </button>
                )}
              </div>
            </div>

            {/* Filled / success */}
            <div className="bg-surface rounded-2xl p-4" style={{ boxShadow: "0 2px 8px rgba(0,0,0,0.05)" }}>
              <p className="text-[11px] font-bold text-text-disabled mb-3 uppercase tracking-wide">Preenchido</p>
              <div className="relative">
                <input
                  className="w-full rounded-2xl px-4 py-3.5 text-[14px] font-medium outline-none border bg-background text-text-primary"
                  defaultValue="michellesagas@hotmail.com"
                  style={{ borderColor: "#2E7D32" }}
                  readOnly
                />
                <Check size={16} className="absolute right-4 top-1/2 -translate-y-1/2" style={{ color: "#2E7D32" }} />
              </div>
            </div>
          </div>
        </Section>

        {/* ── BOTTOM NAV ────────────────────────────────────────────── */}
        <Section id="bottomnav" title="Bottom Nav">
          <div className="bg-surface rounded-2xl p-6 flex flex-col items-center gap-6" style={{ boxShadow: "0 2px 12px rgba(0,0,0,0.06)" }}>
            <p className="text-[12px] text-text-disabled">Ativo vs inativo — cor <span className="font-mono">#FFAF78</span></p>

            {/* Active state */}
            <div>
              <p className="text-[11px] font-bold text-text-disabled mb-3 text-center uppercase tracking-wide">Active (opacity 1 · filled)</p>
              <div
                className="flex items-center gap-1 px-4 py-3 bg-surface rounded-full border border-border/50"
                style={{ boxShadow: "0 8px 32px rgba(0,0,0,0.14)" }}
              >
                {[
                  { label: "Início",       active: true  },
                  { label: "Restaurantes", active: false },
                  { label: "Favoritos",    active: false },
                  { label: "Perfil",       active: false },
                ].map(({ label, active }) => (
                  <div
                    key={label}
                    className="flex flex-col items-center gap-0.5 px-3 py-2 rounded-full"
                    style={{ opacity: active ? 1 : 0.5 }}
                  >
                    <div className="w-[22px] h-[22px] rounded bg-primary/10 flex items-center justify-center">
                      <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: "#FFAF78", opacity: active ? 1 : 0.4 }} />
                    </div>
                    <span className="text-[10px] font-semibold" style={{ color: "#FFAF78" }}>{label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Tokens */}
            <div className="w-full">
              <p className="text-[11px] font-bold text-text-disabled mb-2 uppercase tracking-wide">Tokens</p>
              <div className="bg-background rounded-xl p-3 space-y-1">
                <TokenRow name="nav-color"          value="#FFAF78" preview={<span className="w-4 h-4 rounded-full inline-block" style={{ backgroundColor: "#FFAF78" }} />} />
                <TokenRow name="nav-opacity-active" value="1.0" />
                <TokenRow name="nav-opacity-inactive" value="0.5" />
                <TokenRow name="nav-bg"             value="bg-surface" />
                <TokenRow name="nav-border"         value="border-border/50" />
                <TokenRow name="nav-shadow"         value="0 8px 32px rgba(0,0,0,.14)" />
              </div>
            </div>
          </div>
        </Section>

      </div>
    </div>
  );
}
