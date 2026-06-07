"use client";
import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { X, CheckCircle, AlertTriangle, ChevronLeft } from "lucide-react";
import { allergenConfig, palette, selectedStyle, getIngredientColor } from "@/lib/tags";
import { tagSizes } from "@/lib/tags";

const ALLERGENS = [
  "gluten","lactose","frutose","caseina","oleaginosas",
  "histamina","sulfitos","ovos","amendoim","soja",
  "frutos_do_mar","mostarda","gergelim","tremoco","outras","proteina_veg",
] as const;

// Sugestões de ingredientes problemáticos — cada item compartilha a cor do seu alérgeno pai.
// Glúten → primaria | Lactose → azul | Ovos → amarelo | Oleaginosas → verde
// Amendoim → marrom | Soja → verde | Frutos do mar → teal
// Histamina → roxo | Frutose → amarelo | Tremoço → laranja
const PROBLEM_SUGGESTIONS = [
  // Glúten (primaria — verde escuro)
  "Trigo",        "Cevada",       "Malte",        "Centeio",      "Aveia",
  // Lactose (azul)
  "Leite",        "Queijo",       "Manteiga",     "Iogurte",
  // Ovos (amarelo)
  "Ovo",          "Clara de ovo",
  // Oleaginosas (verde)
  "Castanha",     "Nozes",        "Amêndoa",
  // Amendoim (marrom)
  "Amendoim",
  // Soja (verde)
  "Soja",         "Tofu",
  // Frutos do mar (teal)
  "Camarão",      "Peixe",        "Atum",
  // Histamina (roxo)
  "Tomate",       "Vinagre",      "Embutido",
  // Frutose (amarelo)
  "Mel",          "Maçã",         "Cebola",       "Alho",
  // Pimenta (laranja)
  "Pimenta",
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
      <div
        className="min-h-dvh flex flex-col px-6"
        style={{
          backgroundColor: "#FFFFFF",
          backgroundImage: "url('/pattern-tela-splasch.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          paddingTop: "calc(env(safe-area-inset-top, 0px) + 48px)",
          paddingBottom: "calc(env(safe-area-inset-bottom, 0px) + 32px)",
        }}
      >
        <div className="flex-1 flex flex-col justify-center items-center text-center">
          <div className="mb-10">
            <style>{`
              @keyframes mascotFloat {
                0%, 100% { transform: translateY(0px); }
                50% { transform: translateY(-12px); }
              }
              @keyframes mascotSpark {
                0%, 100% { transform: scale(1) rotate(0deg); opacity: 1; }
                50% { transform: scale(1.2) rotate(15deg); opacity: 0.7; }
              }
              .mascot-float { animation: mascotFloat 3s ease-in-out infinite; }
            `}</style>
            <div className="mascot-float">
              <Image
                src="/Ativo 26.png"
                alt="Glútty"
                width={160}
                height={160}
                className="object-contain"
                unoptimized
              />
            </div>
          </div>
          <h1 className="text-[26px] font-black leading-tight mb-3 font-display" style={{ color: "#1F3D34" }}>
            Vamos definir o que<br />é seguro para você?
          </h1>
          <p className="text-text-secondary text-sm leading-relaxed max-w-xs">
            Personalize sua experiência para encontrar restaurantes seguros para você.
          </p>
        </div>
        <div className="space-y-3 mt-auto pt-6">
          <button
            onClick={() => setStep(2)}
            className="w-full font-bold py-4 rounded-full text-base active:scale-95 transition-transform shadow-md"
            style={{ backgroundColor: "#1F3D34", color: "#C6F59D" }}
          >
            Vamos sim!
          </button>
          <button
            onClick={() => setStep("skip_confirm")}
            className="w-full font-semibold text-sm py-3 active:scale-95 transition-transform" style={{ color: "#1F3D34" }}
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
      <div
        className="min-h-dvh flex flex-col px-6"
        style={{
          backgroundColor: "#FFFFFF",
          backgroundImage: "url('/pattern-tela-splasch.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          paddingTop: "calc(env(safe-area-inset-top, 0px) + 48px)",
          paddingBottom: "calc(env(safe-area-inset-bottom, 0px) + 32px)",
        }}
      >
        <div className="flex-1 flex flex-col justify-center items-center text-center">
          <h1 className="text-[24px] font-extrabold text-primary leading-tight mb-2 font-display">
            Prefere configurar isso depois?
          </h1>
          <h2 className="text-[20px] font-bold text-primary leading-snug mb-6">
            Definir suas restrições ajuda a encontrar opções mais seguras.
          </h2>
          <p className="text-text-secondary text-sm leading-relaxed max-w-xs">
            Você pode adicionar ou ajustar suas restrições a qualquer momento no perfil.
          </p>
        </div>
        <div className="space-y-3 mt-auto pt-6">
          <button
            onClick={() => setStep(2)}
            className="w-full font-bold py-4 rounded-full text-base active:scale-95 transition-transform shadow-md"
            style={{ backgroundColor: "#1F3D34", color: "#C6F59D" }}
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
      <div
        className="min-h-dvh flex flex-col px-6"
        style={{
          backgroundColor: "#FFFFFF",
          backgroundImage: "url('/pattern-tela-splasch.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          paddingTop: "calc(env(safe-area-inset-top, 0px) + 48px)",
          paddingBottom: "calc(env(safe-area-inset-bottom, 0px) + 32px)",
        }}
      >
        <div className="flex-1 flex flex-col justify-center items-center text-center">
          <h1 className="text-[22px] font-extrabold text-primary leading-snug mb-6 font-display">
            Vamos aplicar um padrão de segurança baseado em pessoas com restrição ao glúten.
          </h1>
          <p className="text-text-secondary text-sm leading-relaxed max-w-xs">
            Você pode ajustar suas restrições a qualquer momento no seu perfil.{"\n\n"}Sem personalização, algumas recomendações podem não refletir totalmente suas necessidades.
          </p>
        </div>
        <div className="space-y-3 mt-auto pt-6">
          <button
            onClick={() => setStep(2)}
            className="w-full font-bold py-4 rounded-full text-base active:scale-95 transition-transform shadow-md"
            style={{ backgroundColor: "#1F3D34", color: "#C6F59D" }}
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
      <div
        className="min-h-dvh flex flex-col px-6"
        style={{
          backgroundColor: "#FFFFFF",
          backgroundImage: "url('/pattern-tela-splasch.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          paddingTop: "calc(env(safe-area-inset-top, 0px) + 48px)",
          paddingBottom: "calc(env(safe-area-inset-bottom, 0px) + 32px)",
        }}
      >
        {/* Progress header */}
        <div className="flex items-center gap-3 mb-8">
          <button
            onClick={() => setStep(1)}
            className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 active:scale-90 transition-transform"
            style={{ backgroundColor: "#1F3D34" }}
          >
            <ChevronLeft size={18} style={{ color: "#C6F59D" }} />
          </button>
          <div className="flex-1">
            <div className="flex items-center justify-between mb-1.5">
              <span style={{ fontFamily: "var(--font-nunito),'Nunito',sans-serif", fontWeight: 700, fontSize: 11, color: "#1F3D34" }}>Etapa 1 de 3</span>
              <span style={{ fontFamily: "var(--font-nunito),'Nunito',sans-serif", fontWeight: 700, fontSize: 11, color: "#1F3D34" }}>33%</span>
            </div>
            <div className="w-full overflow-hidden" style={{ height: 8, borderRadius: 999, backgroundColor: "#87AB39" }}>
              <div style={{ height: "100%", width: "33%", borderRadius: 999, backgroundColor: "#1F3D34", transition: "width 0.5s ease" }} />
            </div>
          </div>
        </div>

        {/* Título + subtítulo — elementos irmãos: gap pequeno (8 px) */}
        <h1 className="text-[24px] font-extrabold text-primary leading-tight mb-2 font-display">
          O que excluir do<br />seu cardápio?
        </h1>
        <p className="text-text-secondary text-sm leading-relaxed mb-6">
          Selecione o que você não pode consumir.
        </p>

        {/* Gluten warning */}
        {glutenWarning && (
          <div className="flex items-center gap-2 bg-red-50 border border-red-200 rounded-xl px-3 py-2 mb-4">
            <AlertTriangle size={14} className="text-red-500 shrink-0" />
            <p className="text-red-600 text-xs font-semibold">
              O Glútty é focado em pessoas com restrição ao glúten, por isso essa opção permanece ativa.
            </p>
          </div>
        )}

        {/* Tags selecionadas — área de confirmação visual */}
        {allSelected.length > 0 && (
          <>
            <div className="flex flex-wrap gap-2.5 mb-4">
              {selected.map((key) => {
                const cfg = allergenConfig[key];
                return (
                  <button
                    key={key}
                    onClick={() => toggle(key)}
                    className="flex items-center gap-1.5 rounded-full text-white font-bold active:scale-95 transition-transform"
                    style={{
                      backgroundColor: "#1F3D34",
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
                    backgroundColor: "#1F3D34",
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
            {/* Divisor entre selecionados e opções */}
            <div className="h-px bg-border/40 mb-5" />
          </>
        )}

        {/* Opções disponíveis — área scrollável com flex-1 */}
        <div className="flex flex-wrap gap-2.5 flex-1 content-start">
          {unselected.map((key) => {
            const cfg = allergenConfig[key];
            return (
              <button
                key={key}
                onClick={() => toggle(key)}
                className="rounded-full font-bold active:scale-95 transition-transform"
                style={{
                  color: cfg.color,
                  backgroundColor: cfg.bg,
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

          {/* Campo personalizado */}
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

        {/* CTA — empurrado para o fundo com mt-auto + respiro (24 px) */}
        <div className="space-y-3 mt-auto pt-6">
          <button
            onClick={() => setStep("ingredientes")}
            className="w-full font-bold py-4 rounded-full text-base active:scale-95 transition-transform shadow-md"
            style={{ backgroundColor: "#1F3D34", color: "#C6F59D" }}
          >
            Continuar
          </button>
          <button
            onClick={() => setStep("skip_confirm")}
            className="w-full font-semibold text-sm py-3 active:scale-95 transition-transform" style={{ color: "#1F3D34" }}
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
      <div
        className="min-h-dvh flex flex-col px-6"
        style={{
          backgroundColor: "#FFFFFF",
          backgroundImage: "url('/pattern-tela-splasch.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          paddingTop: "calc(env(safe-area-inset-top, 0px) + 48px)",
          paddingBottom: "calc(env(safe-area-inset-bottom, 0px) + 32px)",
        }}
      >
        {/* Progress header */}
        <div className="flex items-center gap-3 mb-8">
          <button
            onClick={() => setStep(2)}
            className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 active:scale-90 transition-transform"
            style={{ backgroundColor: "#1F3D34" }}
          >
            <ChevronLeft size={18} style={{ color: "#C6F59D" }} />
          </button>
          <div className="flex-1">
            <div className="flex items-center justify-between mb-1.5">
              <span style={{ fontFamily: "var(--font-nunito),'Nunito',sans-serif", fontWeight: 700, fontSize: 11, color: "#1F3D34" }}>Etapa 2 de 3</span>
              <span style={{ fontFamily: "var(--font-nunito),'Nunito',sans-serif", fontWeight: 700, fontSize: 11, color: "#1F3D34" }}>66%</span>
            </div>
            <div className="w-full overflow-hidden" style={{ height: 8, borderRadius: 999, backgroundColor: "#87AB39" }}>
              <div style={{ height: "100%", width: "66%", borderRadius: 999, backgroundColor: "#1F3D34", transition: "width 0.5s ease" }} />
            </div>
          </div>
        </div>

        {/* Título + subtítulo — gap pequeno entre irmãos (8 px) */}
        <h1 className="text-[24px] font-extrabold text-primary leading-tight mb-2 font-display">
          Algo te faz mal<br />ao consumir?
        </h1>
        <p className="text-text-secondary text-sm leading-relaxed mb-6">
          Não é uma alergia, mas você passa mal quando consome. Selecione ou escreva os ingredientes.
        </p>

        {/* Tags selecionadas — área de confirmação visual */}
        {problemSelected.length > 0 && (
          <>
            <div className="flex flex-wrap gap-2.5 mb-4">
              {problemSelected.map((item) => (
                <button
                  key={item}
                  onClick={() => removeProblem(item)}
                  className="flex items-center gap-1.5 rounded-full font-bold active:scale-95 transition-transform"
                  style={{
                    backgroundColor: "#1F3D34",
                    color: "#ffffff",
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
            {/* Divisor entre selecionados e opções */}
            <div className="h-px bg-border/40 mb-5" />
          </>
        )}

        {/* Opções disponíveis — área scrollável com flex-1 */}
        <div className="flex flex-wrap gap-2.5 flex-1 content-start">
          {unselectedProblems.map((item) => {
            const cfg = getIngredientColor(item);
            return (
              <button
                key={item}
                onClick={() => toggleProblem(item)}
                className="rounded-full font-semibold active:scale-95 transition-transform"
                style={{
                  color: cfg.color,
                  backgroundColor: cfg.bg,
                  fontSize: tagSizes.lg.fontSize,
                  paddingLeft: tagSizes.lg.px,
                  paddingRight: tagSizes.lg.px,
                  paddingTop: tagSizes.lg.py,
                  paddingBottom: tagSizes.lg.py,
                }}
              >
                {item}
              </button>
            );
          })}

          {/* Campo personalizado */}
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
              ref={problemInputRef}
              value={problemInput}
              onChange={(e) => setProblemInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && addProblemCustom()}
              placeholder="Outra restrição"
              className="bg-transparent outline-none font-semibold w-28 text-text-primary placeholder:text-text-disabled"
              style={{ fontSize: tagSizes.lg.fontSize }}
            />
            {problemInput && (
              <button onClick={addProblemCustom} className="ml-1 font-bold text-xs text-primary">+</button>
            )}
          </div>
        </div>

        {/* CTA — empurrado para o fundo com mt-auto + respiro (24 px) */}
        <div className="space-y-3 mt-auto pt-6">
          <button
            onClick={() => setStep(3)}
            className="w-full font-bold py-4 rounded-full text-base active:scale-95 transition-transform shadow-md"
            style={{ backgroundColor: "#1F3D34", color: "#C6F59D" }}
          >
            {problemSelected.length > 0 ? "Salvar e continuar" : "Continuar"}
          </button>
          <button
            onClick={() => setStep(3)}
            className="w-full font-semibold text-sm py-3 active:scale-95 transition-transform" style={{ color: "#1F3D34" }}
          >
            Pular
          </button>
        </div>
      </div>
    );
  }

  // ── Step 3: Success ──────────────────────────────
  return (
    <div
      className="min-h-dvh flex flex-col items-center justify-center px-6 text-center"
      style={{
        backgroundColor: "#FFFFFF",
        backgroundImage: "url('/pattern-tela-splasch.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        paddingTop: "calc(env(safe-area-inset-top, 0px) + 48px)",
        paddingBottom: "calc(env(safe-area-inset-bottom, 0px) + 32px)",
      }}
    >
      {/* Progress header */}
      <div className="absolute left-6 right-6 flex items-center gap-3" style={{ top: "calc(env(safe-area-inset-top, 0px) + 12px)" }}>
        <button
          onClick={() => setStep("ingredientes")}
          className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 active:scale-90 transition-transform"
          style={{ backgroundColor: "#1F3D34" }}
        >
          <ChevronLeft size={18} style={{ color: "#C6F59D" }} />
        </button>
        <div className="flex-1">
          <div className="flex items-center justify-between mb-1.5">
            <span style={{ fontFamily: "var(--font-nunito),'Nunito',sans-serif", fontWeight: 700, fontSize: 11, color: "#1F3D34" }}>Etapa 3 de 3</span>
            <span style={{ fontFamily: "var(--font-nunito),'Nunito',sans-serif", fontWeight: 700, fontSize: 11, color: "#1F3D34" }}>100%</span>
          </div>
          <div className="w-full overflow-hidden" style={{ height: 8, borderRadius: 999, backgroundColor: "#87AB39" }}>
            <div style={{ height: "100%", width: "100%", borderRadius: 999, backgroundColor: "#1F3D34", transition: "width 0.5s ease" }} />
          </div>
        </div>
      </div>

      <div className="mb-3 mt-10">
        <Image
          src="/parabens-novo.png"
          alt="Parabéns"
          width={220}
          height={220}
          className="object-contain"
          unoptimized
        />
      </div>
      <h1 className="font-black mb-2" style={{ fontSize: 36, color: "#1F3D34", fontFamily: "var(--font-nunito), 'Nunito', sans-serif" }}>Parabéns!</h1>
      <h2 className="font-black mb-6" style={{ fontSize: 18, color: "#1F3D34", lineHeight: 1.3, textWrap: "balance" } as React.CSSProperties}>
        Seu padrão de segurança alimentar foi definido com sucesso!
      </h2>
      <p className="font-semibold mb-8 text-text-secondary" style={{ fontSize: 14, lineHeight: 1.6, textWrap: "balance" } as React.CSSProperties}>
        Você pode alterar ou adicionar novas restrições direto no seu perfil
      </p>
      <button
        onClick={() => router.push("/preparando")}
        className="w-full max-w-xs font-black py-4 rounded-full text-base active:scale-95 transition-transform shadow-md"
        style={{ backgroundColor: "#1F3D34", color: "#C6F59D" }}
      >
        Avançar
      </button>
    </div>
  );
}
