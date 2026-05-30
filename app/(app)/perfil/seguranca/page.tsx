"use client";
import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { X, AlertTriangle, ShieldCheck, Zap, Layers } from "lucide-react";
import { allergenConfig, tagSizes, palette } from "@/lib/tags";
import BackButton from "@/components/BackButton";

const ALLERGENS = [
  "lactose","frutose","caseina","oleaginosas",
  "histamina","sulfitos","ovos","amendoim","soja",
  "frutos_do_mar","mostarda","gergelim","tremoco","proteina_veg",
] as const;

const PROBLEM_SUGGESTIONS = [
  "Cebola","Alho","Pimenta","Tomate","Milho",
  "Batata","Frituras","Temperos industriais","Açúcar","Vinagre",
];

const SAFETY_LEVELS = [
  {
    id: "muito_seguro",
    label: "Muito seguro",
    description: "Menor risco possível de contaminação cruzada",
    Icon: ShieldCheck,
    color: "#2E7D32",
    bg: "#E8F5E9",
    border: "#2E7D32",
  },
  {
    id: "seguro",
    label: "Seguro",
    description: "Inclui opções com boas práticas anti-contaminação",
    Icon: Layers,
    color: "#D97706",
    bg: "#FFFBEB",
    border: "#D97706",
  },
  {
    id: "flexivel",
    label: "Flexível",
    description: "Mais opções disponíveis, com possíveis riscos",
    Icon: Zap,
    color: "#C0392B",
    bg: "#FDECEA",
    border: "#C0392B",
  },
];

export default function SegurancaPage() {
  const router = useRouter();

  // Restrições alimentares (gluten é fixo)
  const [selected, setSelected]     = useState<string[]>([]);
  const [customTags, setCustomTags] = useState<string[]>([]);
  const [customInput, setCustomInput] = useState("");
  const [glutenWarning, setGlutenWarning] = useState(false);
  const customInputRef = useRef<HTMLInputElement>(null);

  // Ingredientes que evita
  const [problemSelected, setProblemSelected] = useState<string[]>([]);
  const [problemInput, setProblemInput]       = useState("");
  const problemInputRef = useRef<HTMLInputElement>(null);

  // Nível de segurança
  const [safetyLevel, setSafetyLevel] = useState("muito_seguro");

  // ── Helpers ──────────────────────────────────────
  const toggleAllergen = (key: string) => {
    if (key === "gluten") {
      setGlutenWarning(true);
      setTimeout(() => setGlutenWarning(false), 2500);
      return;
    }
    setSelected(prev => prev.includes(key) ? prev.filter(x => x !== key) : [...prev, key]);
  };

  const addCustom = () => {
    const val = customInput.trim();
    if (val && !customTags.includes(val)) setCustomTags(prev => [...prev, val]);
    setCustomInput("");
  };

  const toggleProblem = (item: string) =>
    setProblemSelected(prev => prev.includes(item) ? prev.filter(x => x !== item) : [...prev, item]);

  const addProblemCustom = () => {
    const val = problemInput.trim();
    if (val && !problemSelected.includes(val)) setProblemSelected(prev => [...prev, val]);
    setProblemInput("");
  };

  const unselectedAllergens = ALLERGENS.filter(k => !selected.includes(k));
  const unselectedProblems  = PROBLEM_SUGGESTIONS.filter(s => !problemSelected.includes(s));

  return (
    <div className="min-h-dvh bg-[#FEF9F9] flex flex-col" style={{ paddingBottom: "calc(env(safe-area-inset-bottom,0px) + 100px)" }}>

      {/* ── Header ── */}
      <div className="px-6 pt-14 pb-5">
        <div className="flex items-center gap-3 mb-5">
          <BackButton />
        </div>
        <h1 className="text-[24px] font-extrabold text-primary leading-tight font-display mb-1">
          Padrão de segurança
        </h1>
        <p className="text-text-secondary text-sm">
          Defina o que deve ser evitado nas suas recomendações
        </p>
      </div>

      <div className="px-6 space-y-8">

        {/* ── Seção 1: Base do app ── */}
        <section>
          <p className="text-[11px] font-extrabold text-text-disabled uppercase tracking-widest mb-3">
            Base do app
          </p>
          <div className="bg-surface rounded-2xl px-4 py-4 border border-border/50">
            <div className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                <ShieldCheck size={18} className="text-primary" strokeWidth={1.5} />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1.5">
                  {/* Tag glúten — estilo selecionado (laranja, não removível) */}
                  <span
                    className="inline-flex items-center gap-1.5 rounded-full font-bold text-white"
                    style={{
                      backgroundColor: "#FC6904",
                      fontSize: tagSizes.md.fontSize,
                      paddingLeft: tagSizes.md.px,
                      paddingRight: tagSizes.md.px,
                      paddingTop: tagSizes.md.py,
                      paddingBottom: tagSizes.md.py,
                    }}
                  >
                    {allergenConfig.gluten.tag}
                  </span>
                </div>
                <p className="text-text-disabled text-[12px] leading-relaxed">
                  O Glútty sempre considera opções sem glúten
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ── Seção 2: Restrições alimentares ── */}
        <section>
          <p className="text-[11px] font-extrabold text-text-disabled uppercase tracking-widest mb-3">
            Suas restrições alimentares
          </p>

          {/* Gluten warning */}
          {glutenWarning && (
            <div className="flex items-center gap-2 bg-red-50 border border-red-200 rounded-xl px-3 py-2 mb-3">
              <AlertTriangle size={14} className="text-red-500 shrink-0" />
              <p className="text-red-600 text-xs font-semibold">
                O Glútty é focado em pessoas com restrição ao glúten, por isso essa opção permanece ativa.
              </p>
            </div>
          )}

          {/* Tags selecionadas */}
          {selected.length > 0 && (
            <>
              <div className="flex flex-wrap gap-2 mb-4">
                {selected.map((key) => {
                  const cfg = allergenConfig[key];
                  return (
                    <button
                      key={key}
                      onClick={() => toggleAllergen(key)}
                      className="flex items-center gap-1.5 rounded-full text-white font-bold active:scale-95 transition-transform"
                      style={{
                        backgroundColor: "#FC6904",
                        fontSize: tagSizes.md.fontSize,
                        paddingLeft: tagSizes.md.px,
                        paddingRight: "8px",
                        paddingTop: tagSizes.md.py,
                        paddingBottom: tagSizes.md.py,
                      }}
                    >
                      {cfg.tag}
                      <X size={11} strokeWidth={3} />
                    </button>
                  );
                })}
                {customTags.map((tag) => (
                  <button
                    key={tag}
                    onClick={() => setCustomTags(prev => prev.filter(t => t !== tag))}
                    className="flex items-center gap-1.5 rounded-full text-white font-bold active:scale-95 transition-transform"
                    style={{
                      backgroundColor: "#FC6904",
                      fontSize: tagSizes.md.fontSize,
                      paddingLeft: tagSizes.md.px,
                      paddingRight: "8px",
                      paddingTop: tagSizes.md.py,
                      paddingBottom: tagSizes.md.py,
                    }}
                  >
                    {tag}
                    <X size={11} strokeWidth={3} />
                  </button>
                ))}
              </div>
              <div className="h-px bg-border/40 mb-4" />
            </>
          )}

          {/* Tags disponíveis */}
          <div className="flex flex-wrap gap-2.5">
            {unselectedAllergens.map((key) => {
              const cfg = allergenConfig[key];
              return (
                <button
                  key={key}
                  onClick={() => toggleAllergen(key)}
                  className="rounded-full font-bold active:scale-95 transition-transform border"
                  style={{
                    color: cfg.color,
                    backgroundColor: cfg.bg,
                    borderColor: cfg.color + "40",
                    fontSize: tagSizes.lg.fontSize,
                    paddingLeft: tagSizes.lg.px,
                    paddingRight: tagSizes.lg.px,
                    paddingTop: tagSizes.lg.py,
                    paddingBottom: tagSizes.lg.py,
                  }}
                >
                  {cfg.tag}
                </button>
              );
            })}

            {/* Input custom */}
            <div
              className="flex items-center rounded-full border border-dashed border-primary/50 overflow-hidden"
              style={{
                fontSize: tagSizes.lg.fontSize,
                paddingLeft: tagSizes.lg.px,
                paddingRight: "8px",
                paddingTop: tagSizes.lg.py,
                paddingBottom: tagSizes.lg.py,
              }}
            >
              <input
                ref={customInputRef}
                value={customInput}
                onChange={(e) => setCustomInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && addCustom()}
                placeholder="+ Outra restrição"
                className="bg-transparent outline-none text-primary font-semibold w-32 placeholder:text-primary/50"
                style={{ fontSize: tagSizes.lg.fontSize }}
              />
              {customInput && (
                <button onClick={addCustom} className="ml-1 text-primary font-bold text-sm">+</button>
              )}
            </div>
          </div>
        </section>

        {/* ── Seção 3: Ingredientes que você evita ── */}
        <section>
          <p className="text-[11px] font-extrabold text-text-disabled uppercase tracking-widest mb-1">
            Ingredientes que você evita
          </p>
          <p className="text-text-disabled text-[12px] mb-3">
            Serão apenas sinalizados nos pratos — você decide.
          </p>

          {/* Tags selecionadas */}
          {problemSelected.length > 0 && (
            <>
              <div className="flex flex-wrap gap-2 mb-4">
                {problemSelected.map((item) => (
                  <button
                    key={item}
                    onClick={() => setProblemSelected(prev => prev.filter(x => x !== item))}
                    className="flex items-center gap-1.5 rounded-full text-white font-bold active:scale-95 transition-transform"
                    style={{
                      backgroundColor: "var(--color-warning)",
                      fontSize: tagSizes.md.fontSize,
                      paddingLeft: tagSizes.md.px,
                      paddingRight: "8px",
                      paddingTop: tagSizes.md.py,
                      paddingBottom: tagSizes.md.py,
                    }}
                  >
                    {item}
                    <X size={11} strokeWidth={3} />
                  </button>
                ))}
              </div>
              <div className="h-px bg-border/40 mb-4" />
            </>
          )}

          {/* Sugestões */}
          <div className="flex flex-wrap gap-2">
            {unselectedProblems.map((item) => (
              <button
                key={item}
                onClick={() => toggleProblem(item)}
                className="rounded-full font-semibold active:scale-95 transition-transform border border-amber-200"
                style={{
                  color: "var(--color-text-primary)",
                  backgroundColor: "var(--color-warning-surface)",
                  fontSize: tagSizes.lg.fontSize,
                  paddingLeft: tagSizes.lg.px,
                  paddingRight: tagSizes.lg.px,
                  paddingTop: tagSizes.lg.py,
                  paddingBottom: tagSizes.lg.py,
                }}
              >
                {item}
              </button>
            ))}

            {/* Input custom */}
            <div
              className="flex items-center rounded-full border border-dashed border-warning/50 overflow-hidden"
              style={{
                fontSize: tagSizes.lg.fontSize,
                paddingLeft: tagSizes.lg.px,
                paddingRight: "8px",
                paddingTop: tagSizes.lg.py,
                paddingBottom: tagSizes.lg.py,
              }}
            >
              <input
                ref={problemInputRef}
                value={problemInput}
                onChange={(e) => setProblemInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && addProblemCustom()}
                placeholder="Outro ingrediente"
                className="bg-transparent outline-none font-semibold w-32 text-text-primary placeholder:text-text-disabled"
                style={{ fontSize: tagSizes.lg.fontSize }}
              />
              {problemInput && (
                <button onClick={addProblemCustom} className="ml-1 font-bold text-xs text-warning">+</button>
              )}
            </div>
          </div>
        </section>

        {/* ── Seção 4: Nível de segurança ── */}
        <section>
          <p className="text-[11px] font-extrabold text-text-disabled uppercase tracking-widest mb-3">
            Nível de segurança
          </p>
          <div className="space-y-3">
            {SAFETY_LEVELS.map(({ id, label, description, Icon, color, bg, border }) => {
              const isSelected = safetyLevel === id;
              return (
                <button
                  key={id}
                  onClick={() => setSafetyLevel(id)}
                  className="w-full flex items-center gap-3 rounded-2xl px-4 py-4 text-left active:scale-[0.98] transition-all"
                  style={{
                    backgroundColor: isSelected ? bg : "var(--color-surface)",
                    border: isSelected ? `1.5px solid ${border}` : "1.5px solid var(--color-border)",
                  }}
                >
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center shrink-0"
                    style={{ backgroundColor: isSelected ? color + "20" : "#F5F5F5" }}
                  >
                    <Icon size={20} strokeWidth={1.5} style={{ color: isSelected ? color : "#9E9E9E" }} />
                  </div>
                  <div className="flex-1">
                    <p className="font-extrabold text-[14px]" style={{ color: isSelected ? color : "var(--color-text-primary)" }}>
                      {label}
                    </p>
                    <p className="text-text-disabled text-[12px] mt-0.5 leading-snug">{description}</p>
                  </div>
                  {/* Radio dot */}
                  <div
                    className="w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0"
                    style={{ borderColor: isSelected ? color : "var(--color-border)" }}
                  >
                    {isSelected && (
                      <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: color }} />
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </section>
      </div>

      {/* ── CTA fixo ── */}
      <div
        className="fixed bottom-0 left-0 right-0 max-w-[430px] mx-auto px-6 bg-[#FEF9F9]/95 backdrop-blur-sm"
        style={{ paddingBottom: "calc(env(safe-area-inset-bottom,0px) + 24px)", paddingTop: 16, borderTop: "1px solid var(--color-border)" }}
      >
        <button
          onClick={() => router.back()}
          className="w-full font-bold py-4 rounded-full text-base active:scale-95 transition-transform shadow-md"
          style={{ backgroundColor: "#C6F59D", color: "#1F3D34" }}
        >
          Salvar alterações
        </button>
      </div>
    </div>
  );
}
