"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Plus, X, ShieldCheck } from "lucide-react";
import BackButton from "@/components/BackButton";
import { restrictionConfig, getIngredientColor, palette, type TagColor } from "@/lib/tags";

const RESTRICTION_OPTIONS = [
  { key: "sem_gluten",    label: "Sem glúten",    icon: "🌾", locked: true  },
  { key: "sem_lactose",   label: "Sem lactose",   icon: "🥛", locked: false },
  { key: "sem_nozes",     label: "Sem nozes",     icon: "🥜", locked: false },
  { key: "sem_ovo",       label: "Sem ovo",       icon: "🥚", locked: false },
  { key: "vegano",        label: "Vegano",        icon: "🥗", locked: false },
  { key: "vegetariano",   label: "Vegetariano",   icon: "🌿", locked: false },
  { key: "sem_soja",      label: "Sem soja",      icon: "🫘", locked: false },
  { key: "sem_amendoim",  label: "Sem amendoim",  icon: "🥜", locked: false },
  { key: "sem_frutos",    label: "Sem frutos do mar", icon: "🦐", locked: false },
];

const INGREDIENT_OPTIONS = [
  "Trigo", "Cevada", "Malte", "Aveia", "Centeio",
  "Leite", "Manteiga", "Queijo", "Creme de leite",
  "Ovo", "Clara", "Gema",
  "Amendoim", "Castanha", "Nozes", "Amêndoa",
  "Soja", "Tofu", "Missô",
  "Camarão", "Marisco", "Lagosta",
];

// Cores extras para restrições que não estão no restrictionConfig
const extraRestrictionColor: Record<string, TagColor> = {
  sem_soja:     palette.verde,
  sem_amendoim: palette.marrom,
  sem_frutos:   palette.teal,
};

function getRestrictionColor(key: string): TagColor {
  return restrictionConfig[key] ?? extraRestrictionColor[key] ?? palette.cinza;
}

export default function RestricoesPerfil() {
  const router = useRouter();
  const [activeRestrictions, setActiveRestrictions] = useState<string[]>(
    ["sem_gluten", "sem_lactose", "sem_nozes", "sem_ovo", "vegano", "vegetariano"]
  );
  const [activeIngredients, setActiveIngredients] = useState<string[]>(
    ["Trigo", "Cevada", "Malte", "Leite", "Aveia", "Centeio"]
  );
  const [customInput, setCustomInput] = useState("");
  const [customIngredients, setCustomIngredients] = useState<string[]>([]);
  const [saved, setSaved] = useState(false);

  const toggleRestriction = (key: string, locked: boolean) => {
    if (locked) return;
    setActiveRestrictions((prev) =>
      prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]
    );
  };

  const toggleIngredient = (ing: string) => {
    setActiveIngredients((prev) =>
      prev.includes(ing) ? prev.filter((i) => i !== ing) : [...prev, ing]
    );
  };

  const addCustom = () => {
    const v = customInput.trim();
    if (!v) return;
    if (!customIngredients.includes(v) && !INGREDIENT_OPTIONS.includes(v)) {
      setCustomIngredients((prev) => [...prev, v]);
    }
    if (!activeIngredients.includes(v)) {
      setActiveIngredients((prev) => [...prev, v]);
    }
    setCustomInput("");
  };

  const removeCustom = (ing: string) => {
    setCustomIngredients((prev) => prev.filter((i) => i !== ing));
    setActiveIngredients((prev) => prev.filter((i) => i !== ing));
  };

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => router.back(), 800);
  };

  return (
    <div
      className="min-h-dvh bg-background"
      style={{ paddingBottom: "calc(env(safe-area-inset-bottom, 0px) + 100px)" }}
    >
      {/* ── Header ── */}
      <div
        className="px-5 pb-4 bg-background sticky top-0 z-30"
        style={{ paddingTop: "calc(env(safe-area-inset-top, 0px) + 28px)" }}
      >
        <div className="flex items-start gap-3">
          <BackButton />
          <div className="flex-1">
            <h1 className="font-black text-primary text-base font-display leading-tight">Editar restrições</h1>
            <p className="text-[12px] text-text-disabled mt-0.5">Suas alergias e intolerâncias</p>
          </div>
        </div>
      </div>

      <div className="px-5 space-y-6">

        {/* ── Gluten notice ── */}
        <div
          className="flex items-start gap-3 rounded-2xl px-4 py-3"
          style={{ backgroundColor: "#E0F7FA" }}
        >
          <ShieldCheck size={18} style={{ color: "#00838F" }} className="shrink-0 mt-0.5" />
          <p className="text-[12px] leading-relaxed" style={{ color: "#00838F" }}>
            O Glútty é focado em pessoas com restrição ao glúten, por isso essa opção permanece ativa.
          </p>
        </div>

        {/* ── Restrições ── */}
        <div>
          <p className="font-extrabold text-text-primary text-base mb-2">Restrições alimentares</p>
          <p className="text-text-disabled text-xs mb-3">Selecione o que você não pode consumir.</p>

          <div className="flex flex-wrap gap-2">
            {RESTRICTION_OPTIONS.map(({ key, label, locked }) => {
              const isActive = activeRestrictions.includes(key);
              const col = getRestrictionColor(key);
              return (
                <button
                  key={key}
                  onClick={() => toggleRestriction(key, locked)}
                  className="inline-flex items-center gap-1.5 rounded-full font-semibold transition-all active:scale-95"
                  style={{
                    fontSize: "12px",
                    paddingLeft: "12px",
                    paddingRight: "12px",
                    paddingTop: "5px",
                    paddingBottom: "5px",
                    backgroundColor: col.bg,
                    color: col.color,
                    opacity: isActive ? 1 : 0.35,
                  }}
                >
                  {label}
                  {locked && <ShieldCheck size={10} style={{ color: col.color }} />}
                </button>
              );
            })}
          </div>
        </div>

        {/* ── Ingredientes proibidos ── */}
        <div>
          <p className="font-extrabold text-text-primary text-base mb-2">Ingredientes proibidos</p>
          <p className="text-text-disabled text-xs mb-3">
            Toque para marcar ingredientes que você não pode consumir.
          </p>

          <div className="flex flex-wrap gap-2">
            {INGREDIENT_OPTIONS.map((ing) => {
              const isActive = activeIngredients.includes(ing);
              const col = getIngredientColor(ing);
              return (
                <button
                  key={ing}
                  onClick={() => toggleIngredient(ing)}
                  className="rounded-full px-3 py-1.5 text-[12px] font-semibold transition-all active:scale-95"
                  style={{
                    backgroundColor: col.bg,
                    color: col.color,
                    border: isActive ? `1.5px solid ${col.color}` : "1.5px solid transparent",
                    textDecoration: isActive ? "line-through" : "none",
                    opacity: isActive ? 1 : 0.5,
                  }}
                >
                  {ing}
                </button>
              );
            })}

            {/* Custom ingredients */}
            {customIngredients.map((ing) => {
              const isActive = activeIngredients.includes(ing);
              return (
                <div
                  key={ing}
                  className="flex items-center gap-1.5 rounded-full px-3 py-1.5"
                  style={{
                    backgroundColor: palette.cinza.bg,
                    color: palette.cinza.color,
                    border: isActive ? `1.5px solid ${palette.cinza.color}` : "1.5px solid transparent",
                    opacity: isActive ? 1 : 0.5,
                  }}
                >
                  <span
                    className="text-[12px] font-semibold"
                    style={{ textDecoration: isActive ? "line-through" : "none" }}
                  >
                    {ing}
                  </span>
                  <button onClick={() => removeCustom(ing)} className="active:scale-90 ml-0.5">
                    <X size={10} strokeWidth={3} />
                  </button>
                </div>
              );
            })}
          </div>

          {/* Add custom ingredient */}
          <div className="flex items-center gap-2 mt-4">
            <div className="flex-1 flex items-center gap-2 bg-surface rounded-full px-4 py-3 border border-border/60">
              <input
                value={customInput}
                onChange={(e) => setCustomInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && addCustom()}
                placeholder="Outra restrição"
                className="flex-1 text-sm text-text-primary outline-none placeholder:text-text-disabled bg-transparent"
              />
            </div>
            <button
              onClick={addCustom}
              disabled={!customInput.trim()}
              className="w-10 h-10 rounded-full flex items-center justify-center transition-all active:scale-90"
              style={{
                backgroundColor: customInput.trim() ? "#1F3D34" : "var(--color-border)",
              }}
            >
              <Plus size={18} className="text-white" strokeWidth={2.5} />
            </button>
          </div>
        </div>
      </div>

      {/* ── Save button ── */}
      <div
        className="fixed bottom-0 left-0 right-0 px-5 bg-background/95"
        style={{
          paddingBottom: "calc(env(safe-area-inset-bottom, 0px) + 96px)",
          paddingTop: 12,
          borderTop: "1px solid var(--color-border)",
        }}
      >
        <button
          onClick={handleSave}
          className="w-full py-4 rounded-full font-bold text-sm transition-all active:scale-95"
          style={{
            backgroundColor: saved ? "#2E7D32" : "#C6F59D",
            color: saved ? "#fff" : "#1F3D34",
            boxShadow: saved ? "0 4px 16px rgba(46,125,50,0.35)" : "none",
          }}
        >
          {saved ? "✓ Salvo!" : "Salvar alterações"}
        </button>
      </div>
    </div>
  );
}
