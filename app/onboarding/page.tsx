"use client";
import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { X, CheckCircle, AlertTriangle, ChevronLeft } from "lucide-react";
import { allergenConfig, palette, selectedStyle } from "@/lib/tags";
import { tagSizes } from "@/lib/tags";

const ALLERGENS = [
  "gluten","lactose","frutose","caseina","oleaginosas",
  "histamina","sulfitos","ovos","amendoim","soja",
  "frutos_do_mar","mostarda","gergelim","tremoco","outras","proteina_veg",
] as const;

// Sugestões de ingredientes problemáticos comuns
const PROBLEM_SUGGESTIONS = [
  "Arroz", "Feijão", "Carne bovina", "Carne suína", "Frango",
  "Cebola", "Alho", "Pimenta", "Tomate", "Milho",
  "Batata", "Mandioca", "Azeite", "Vinagre", "Açúcar",
  "Sal em excesso", "Frituras", "Temperos industriais",
];

export default function OnboardingPage() {
  const router = useRouter();
  const [step, setStep] = useState<1 | 2 | "ingredientes" | 3 | "skip_confirm" | "skip_final">(1);

  // Step 2 — alérgenos
  const [selected, setSelected] = useState<string[]>(["gluten"]);
  const [customInput, setCustomInput] = useState("");
  const [customTags, setCustomTags] = useState<string[]>([]);
  const [glutenWarning, setGlutenWarning] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // Step ingredientes problemáticos
  const [problemSelected, setProblemSelected] = useState<string[]>([]);
  const [problemInput, setProblemInput] = useState("");
  const problemInputRef = useRef<HTMLInputElement>(null);

  const toggle = (key: string) => {
    if (key === "gluten" && selected.includes("gluten")) {
      setGlutenWarning(true);
      setTimeout(() => setGlutenWarning(false), 2500);
      return;
    }
    setGlutenWarning(false);
    setSelected((prev) => prev.includes(key) ? prev.filter((x) => x !== key) : [...prev, key]);
  };

  const removeCustom = (tag: string) => setCustomTags((prev) => prev.filter((t) => t !== tag));

  const addCustom = () => {
    const val = customInput.trim();
    if (val && !customTags.includes(val)) setCustomTags((prev) => [...prev, val]);
    setCustomInput("");
  };

  const toggleProblem = (item: string) =>
    setProblemSelected((prev) =>
      prev.includes(item) ? prev.filter((x) => x !== item) : [...prev, item]
    );

  const addProblemCustom = () => {
    const val = problemInput.trim();
    if (val && !problemSelected.includes(val)) setProblemSelected((prev) => [...prev, val]);
    setProblemInput("");
  };

  const removeProblem = (item: string) =>
    setProblemSelected((prev) => prev.filter((x) => x !== item));

  const unselectedProblems = PROBLEM_SUGGESTIONS.filter((s) => !problemSelected.includes(s));

  // ── Step 1: Welcome ──────────────────────────────
  if (step === 1) {
    return (
      <div className="min-h-dvh flex flex-col px-6 pt-16 pb-10" style={{ backgroundColor: "#FEF7F3" }}>
        <div className="flex-1 flex flex-col justify-center items-center text-center">
          <div className="mb-10">
            <Image
              src="/procurando.png"
              alt="Glútty"
              width={200}
              height={200}
              className="object-contain"
              unoptimized
            />
          </div>
          <h1 className="text-[26px] font-extrabold text-text-primary leading-tight mb-3 font-display">
            Vamos definir o que<br />é seguro para você?
          </h1>
          <p className="text-text-secondary text-sm leading-relaxed max-w-xs">
            Personalize sua experiência para encontrar restaurantes seguros para você.
          </p>
        </div>
        <div className="space-y-3">
          <button
            onClick={() => setStep(2)}
            className="w-full font-bold py-4 rounded-full text-base active:scale-95 transition-transform shadow-md"
            style={{ backgroundColor: "#C6F59D", color: "#1F3D34" }}
          >
            Vamos sim!
          </button>
          <button
            onClick={() => setStep("skip_confirm")}
            className="w-full text-text-secondary font-semibold text-sm py-3 active:scale-95 transition-transform"
          >
            Agora não
          </button>
        </div>
      </div>
    );
  }

  // ── Skip confirm ─────────────────────────────────
  if (step === "skip_confirm") {
    return (
      <div className="min-h-dvh bg-[#FEF9F9] flex flex-col px-6 pt-16 pb-10">
        <div className="flex-1 flex flex-col justify-center items-center text-center">
          <h1 className="text-[24px] font-extrabold text-primary leading-tight mb-4 font-display">
            Prefere configurar isso depois?
          </h1>
          <h2 className="text-[20px] font-bold text-primary leading-snug mb-5">
            Definir suas restrições ajuda a encontrar opções mais seguras.
          </h2>
          <p className="text-text-secondary text-sm leading-relaxed max-w-xs">
            Você pode adicionar ou ajustar suas restrições a qualquer momento no perfil.
          </p>
        </div>
        <div className="space-y-3">
          <button
            onClick={() => setStep(2)}
            className="w-full font-bold py-4 rounded-full text-base active:scale-95 transition-transform shadow-md"
            style={{ backgroundColor: "#C6F59D", color: "#1F3D34" }}
          >
            Definir agora
          </button>
          <button
            onClick={() => setStep("skip_final")}
            className="w-full bg-background font-semibold py-4 rounded-full text-base active:scale-95 transition-transform"
            style={{ border: "1.5px solid #1F3D34", color: "#1F3D34" }}
          >
            Agora não
          </button>
        </div>
      </div>
    );
  }

  // ── Skip final ────────────────────────────────────
  if (step === "skip_final") {
    return (
      <div className="min-h-dvh bg-[#FEF9F9] flex flex-col px-6 pt-16 pb-10">
        <div className="flex-1 flex flex-col justify-center items-center text-center">
          <h1 className="text-[22px] font-extrabold text-primary leading-snug mb-5 font-display">
            Vamos aplicar um padrão de segurança baseado em pessoas com restrição ao glúten.
          </h1>
          <p className="text-text-secondary text-sm leading-relaxed max-w-xs">
            Você pode ajustar suas restrições a qualquer momento no seu perfil.{"\n\n"}Sem personalização, algumas recomendações podem não refletir totalmente suas necessidades.
          </p>
        </div>
        <div className="space-y-3">
          <button
            onClick={() => setStep(2)}
            className="w-full font-bold py-4 rounded-full text-base active:scale-95 transition-transform shadow-md"
            style={{ backgroundColor: "#C6F59D", color: "#1F3D34" }}
          >
            Definir agora
          </button>
          <button
            onClick={() => router.push("/preparando-padrao")}
            className="w-full bg-background font-semibold py-4 rounded-full text-base active:scale-95 transition-transform"
            style={{ border: "1.5px solid #1F3D34", color: "#1F3D34" }}
          >
            Continuar sem personalizar
          </button>
        </div>
      </div>
    );
  }

  // ── Step 2: Allergen tag selection ───────────────
  if (step === 2) {
    const allSelected = [...selected, ...customTags];
    const unselected = ALLERGENS.filter((k) => !selected.includes(k));

    return (
      <div className="min-h-dvh bg-[#FEF9F9] flex flex-col px-6 pt-12 pb-10">
        {/* Progress header */}
        <div className="flex items-center gap-3 mb-8">
          <button
            onClick={() => setStep(1)}
            className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 active:scale-90 transition-transform"
            style={{ backgroundColor: "rgba(31,61,52,0.08)" }}
          >
            <ChevronLeft size={18} style={{ color: "#1F3D34" }} />
          </button>
          <div className="flex-1">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-[11px] font-bold uppercase tracking-wide" style={{ color: "#1F3D34" }}>Etapa 1 de 3</span>
              <span className="text-[11px] font-semibold" style={{ color: "#1F3D34" }}>33%</span>
            </div>
            <div className="w-full h-2 rounded-full" style={{ backgroundColor: "#D6ECC8" }}>
              <div className="h-2 rounded-full transition-all duration-500" style={{ width: "33%", backgroundColor: "#4A9070" }} />
            </div>
          </div>
        </div>

        <h1 className="text-[24px] font-extrabold text-primary leading-tight mb-1 font-display">
          O que excluir do<br />seu cardápio?
        </h1>
        <p className="text-text-secondary text-sm mb-3">
          Selecione o que você não pode consumir.
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

        {/* Selected tags floating at top */}
        {allSelected.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4 min-h-[36px]">
            {selected.map((key) => {
              const cfg = allergenConfig[key];
              return (
                <button
                  key={key}
                  onClick={() => toggle(key)}
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
                onClick={() => removeCustom(tag)}
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
        )}

        {allSelected.length > 0 && <div className="h-px bg-border/40 mb-4" />}

        <div className="flex flex-wrap gap-2.5 flex-1">
          {unselected.map((key) => {
            const cfg = allergenConfig[key];
            return (
              <button
                key={key}
                onClick={() => toggle(key)}
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

          {/* Custom input */}
          <div className="flex items-center rounded-full border border-dashed border-primary/50 overflow-hidden"
            style={{
              fontSize: tagSizes.lg.fontSize,
              paddingLeft: tagSizes.lg.px,
              paddingRight: "8px",
              paddingTop: tagSizes.lg.py,
              paddingBottom: tagSizes.lg.py,
            }}
          >
            <input
              ref={inputRef}
              value={customInput}
              onChange={(e) => setCustomInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && addCustom()}
              placeholder="Outra restrição"
              className="bg-transparent outline-none text-primary font-semibold w-28 placeholder:text-primary/40"
              style={{ fontSize: tagSizes.lg.fontSize }}
            />
            {customInput && (
              <button onClick={addCustom} className="ml-1 text-primary font-bold text-xs">+</button>
            )}
          </div>
        </div>

        <div className="space-y-3 mt-8">
          <button
            onClick={() => setStep("ingredientes")}
            className="w-full font-bold py-4 rounded-full text-base active:scale-95 transition-transform shadow-md"
            style={{ backgroundColor: "#C6F59D", color: "#1F3D34" }}
          >
            Continuar
          </button>
          <button
            onClick={() => setStep("skip_confirm")}
            className="w-full text-text-secondary font-semibold text-sm py-3 active:scale-95 transition-transform"
          >
            Agora não
          </button>
        </div>
      </div>
    );
  }

  // ── Step ingredientes: Ingredientes problemáticos ─
  if (step === "ingredientes") {
    return (
      <div className="min-h-dvh bg-[#FEF9F9] flex flex-col px-6 pt-12 pb-10">
        {/* Progress header */}
        <div className="flex items-center gap-3 mb-8">
          <button
            onClick={() => setStep(2)}
            className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 active:scale-90 transition-transform"
            style={{ backgroundColor: "rgba(31,61,52,0.08)" }}
          >
            <ChevronLeft size={18} style={{ color: "#1F3D34" }} />
          </button>
          <div className="flex-1">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-[11px] font-bold uppercase tracking-wide" style={{ color: "#1F3D34" }}>Etapa 2 de 3</span>
              <span className="text-[11px] font-semibold" style={{ color: "#1F3D34" }}>66%</span>
            </div>
            <div className="w-full h-2 rounded-full" style={{ backgroundColor: "#D6ECC8" }}>
              <div className="h-2 rounded-full transition-all duration-500" style={{ width: "66%", backgroundColor: "#4A9070" }} />
            </div>
          </div>
        </div>

        <h1 className="text-[22px] font-extrabold text-primary leading-tight font-display mb-4">
          Algo te faz mal<br />ao consumir?
        </h1>

        <p className="text-text-secondary text-sm mb-1 leading-relaxed">
          Não é uma alergia, mas você passa mal quando consome. Selecione ou escreva os ingredientes.
        </p>

        {/* Info tip */}
        <div className="flex items-start gap-2 bg-warning-surface border border-warning/30 rounded-xl px-3 py-2 mb-4">
          <AlertTriangle size={13} className="text-warning shrink-0 mt-0.5" />
          <p className="text-text-secondary text-[11px] leading-relaxed">
            Esses ingredientes serão apenas sinalizados nos pratos — você decide.
          </p>
        </div>

        {/* Selected problem tags */}
        {problemSelected.length > 0 && (
          <>
            <div className="flex flex-wrap gap-2 mb-4">
              {problemSelected.map((item) => (
                <button
                  key={item}
                  onClick={() => removeProblem(item)}
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

        {/* Suggestions */}
        <div className="flex flex-wrap gap-2 flex-1">
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

          {/* Custom input */}
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
              placeholder="Outra restrição"
              className="bg-transparent outline-none font-semibold w-28 text-text-primary placeholder:text-text-disabled"
              style={{ fontSize: tagSizes.lg.fontSize }}
            />
            {problemInput && (
              <button onClick={addProblemCustom} className="ml-1 font-bold text-xs text-warning">+</button>
            )}
          </div>
        </div>

        <div className="space-y-3 mt-8">
          <button
            onClick={() => setStep(3)}
            className="w-full font-bold py-4 rounded-full text-base active:scale-95 transition-transform shadow-md"
            style={{ backgroundColor: "#C6F59D", color: "#1F3D34" }}
          >
            {problemSelected.length > 0 ? "Salvar e continuar" : "Continuar"}
          </button>
          <button
            onClick={() => setStep(3)}
            className="w-full text-text-secondary font-semibold text-sm py-3 active:scale-95 transition-transform"
          >
            Pular esta etapa
          </button>
        </div>
      </div>
    );
  }

  // ── Step 3: Success ──────────────────────────────
  return (
    <div className="min-h-dvh bg-[#FEF9F9] flex flex-col items-center justify-center px-6 pb-10 text-center">
      {/* Progress header */}
      <div className="absolute top-12 left-6 right-6 flex items-center gap-3">
        <button
          onClick={() => setStep("ingredientes")}
          className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 active:scale-90 transition-transform"
          style={{ backgroundColor: "rgba(31,61,52,0.08)" }}
        >
          <ChevronLeft size={18} style={{ color: "#1F3D34" }} />
        </button>
        <div className="flex-1">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-[11px] font-bold uppercase tracking-wide" style={{ color: "#1F3D34" }}>Etapa 3 de 3</span>
            <span className="text-[11px] font-semibold" style={{ color: "#1F3D34" }}>100%</span>
          </div>
          <div className="w-full h-2 rounded-full" style={{ backgroundColor: "#D6ECC8" }}>
            <div className="h-2 rounded-full transition-all duration-500" style={{ width: "100%", backgroundColor: "#4A9070" }} />
          </div>
        </div>
      </div>

      <div className="mb-3 mt-10">
        <Image
          src="/mascote parabéns.png"
          alt="Parabéns"
          width={180}
          height={180}
          className="object-contain"
          unoptimized
        />
      </div>
      <h1 className="text-[26px] font-extrabold text-primary mb-2 font-display">Parabéns!</h1>
      <h2 className="text-[18px] font-bold text-primary leading-snug mb-5">
        Seu padrão de segurança alimentar foi definido com sucesso!
      </h2>
      <p className="text-text-secondary text-sm leading-relaxed mb-10">
        Você pode alterar ou adicionar novas restrições direto no seu perfil
      </p>
      <button
        onClick={() => router.push("/preparando")}
        className="w-full max-w-xs font-bold py-4 rounded-full text-base active:scale-95 transition-transform"
        style={{ backgroundColor: "#C6F59D", color: "#1F3D34" }}
      >
        Avançar
      </button>
    </div>
  );
}
