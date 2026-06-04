"use client";
// avaliar restaurante
import { use, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import {
  ArrowLeft, Star, Camera, Plus, X, ChevronDown,
  Shield, AlertTriangle, Users, Building2, UtensilsCrossed,
  MapPin, Phone, ChefHat, CalendarDays, CheckCircle,
} from "lucide-react";
import { mockRestaurants } from "@/lib/data";
import SafetyBadge from "@/components/SafetyBadge";

type SafetyChoice = "muito_seguro" | "seguro" | "moderado" | "nao_seguro" | null;
type ContamChoice = "nenhum" | "pequeno" | "alto" | "nao_sei" | null;
type TeamChoice   = "total" | "parcial" | "nao_sabiam" | "nao_perguntei" | null;

const safetyOptions = [
  { value: "muito_seguro" as SafetyChoice, dot: "#43A047", label: "Muito seguro para mim",  color: "#2E7D32", bg: "#E8F5E9", border: "#43A047" },
  { value: "seguro"       as SafetyChoice, dot: "#F59E0B", label: "Seguro para mim",        color: "#D97706", bg: "#FFFBEB", border: "#F59E0B" },
  { value: "moderado"     as SafetyChoice, dot: "#FB8C00", label: "Moderado",               color: "#E65100", bg: "#FFF3E0", border: "#FB8C00" },
  { value: "nao_seguro"   as SafetyChoice, dot: "#EF5350", label: "Não me senti seguro",    color: "#C62828", bg: "#FFEBEE", border: "#EF5350" },
];
const contamOptions = [
  { value: "nenhum"  as ContamChoice, dot: "#43A047", label: "Nenhum risco",   color: "#2E7D32", bg: "#E8F5E9", border: "#43A047" },
  { value: "pequeno" as ContamChoice, dot: "#F59E0B", label: "Pequeno risco",  color: "#D97706", bg: "#FFFBEB", border: "#F59E0B" },
  { value: "alto"    as ContamChoice, dot: "#EF5350", label: "Alto risco",     color: "#C62828", bg: "#FFEBEE", border: "#EF5350" },
  { value: "nao_sei" as ContamChoice, dot: "#9E9E9E", label: "Não sei dizer",  color: "#616161", bg: "#F5F5F5", border: "#9E9E9E" },
];
const teamOptions = [
  { value: "total"         as TeamChoice, dot: "#43A047", label: "Sim, total confiança", color: "#2E7D32", bg: "#E8F5E9", border: "#43A047" },
  { value: "parcial"       as TeamChoice, dot: "#F59E0B", label: "Parcialmente",         color: "#D97706", bg: "#FFFBEB", border: "#F59E0B" },
  { value: "nao_sabiam"    as TeamChoice, dot: "#EF5350", label: "Não sabiam",           color: "#C62828", bg: "#FFEBEE", border: "#EF5350" },
  { value: "nao_perguntei" as TeamChoice, dot: "#9E9E9E", label: "Não perguntei",        color: "#616161", bg: "#F5F5F5", border: "#9E9E9E" },
];
const structureOptions = ["Cozinha separada","Utensílios exclusivos","Área compartilhada","Menu dedicado SG","Não informado"];
const quickTags = ["Sem contaminação","Equipe bem informada","Me senti seguro","Voltaria com certeza","Não voltaria","Precisa melhorar","Cardápio claro","Ambiente limpo"];

function StarRow({ value, onChange }: { value: number; onChange: (v: number) => void }) {
  const [hovered, setHovered] = useState(0);
  return (
    <div className="flex gap-2">
      {[1,2,3,4,5].map((i) => (
        <button key={i} onMouseEnter={() => setHovered(i)} onMouseLeave={() => setHovered(0)}
          onClick={() => onChange(i)} className="active:scale-90 transition-transform p-0.5">
          <Star size={32} strokeWidth={1.5}
            fill={(hovered || value) >= i ? "#FFC24D" : "none"}
            className={(hovered || value) >= i ? "text-warning" : "text-border"} />
        </button>
      ))}
    </div>
  );
}

// ── Accordion item ────────────────────────────────────────────────────────────
function AccordionItem({
  icon: Icon, iconColor = "#FC6904", title, subtitle, summary, open, onToggle, required, done, children,
}: {
  icon: React.ElementType; iconColor?: string; title: string; subtitle: string;
  summary?: string; open: boolean; onToggle: () => void;
  required?: boolean; done?: boolean; children: React.ReactNode;
}) {
  return (
    <div className="bg-surface rounded-2xl shadow-sm border overflow-hidden transition-all"
      style={{ borderColor: done ? "#43A047" : open ? "#FC6904" : "#E5E5E5" }}>
      {/* Header — always visible */}
      <button onClick={onToggle}
        className="w-full flex items-center gap-3 px-4 py-4 text-left active:bg-background transition-colors">
        <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
          style={{ backgroundColor: done ? "#E8F5E9" : `${iconColor}18` }}>
          <Icon size={17} style={{ color: done ? "#2E7D32" : iconColor }} />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5">
            <p className="font-extrabold text-text-primary text-[14px] leading-tight">{title}</p>
            {required && !done && <span className="text-[10px] text-error font-bold">*</span>}
          </div>
          <p className="text-[11px] mt-0.5 truncate" style={{ color: done && summary ? "#2E7D32" : "#9E9E9E" }}>
            {done && summary ? `✓ ${summary}` : subtitle}
          </p>
        </div>
        {!open && !done && (
          <span className="shrink-0 text-[11px] font-bold text-primary bg-primary/10 px-3 py-1.5 rounded-full whitespace-nowrap">
            Responder
          </span>
        )}
        {(open || done) && (
          <ChevronDown size={16} className="text-text-disabled shrink-0 transition-transform"
            style={{ transform: open ? "rotate(180deg)" : "rotate(0deg)" }} />
        )}
      </button>

      {/* Body — collapses */}
      {open && (
        <div className="px-4 pb-4 border-t border-border/40 pt-3">
          {children}
        </div>
      )}
    </div>
  );
}

function OptionBtn({ active, dot, label, color, bg, border, onClick }: {
  active: boolean; dot: string; label: string; color: string; bg: string; border: string; onClick: () => void;
}) {
  return (
    <button onClick={onClick}
      className="flex items-center gap-3 px-4 py-3 rounded-xl border-2 transition-all active:scale-[0.98] text-left w-full"
      style={{ borderColor: active ? border : "#E5E5E5", backgroundColor: active ? bg : "#FAFAFA" }}>
      <span className="w-3 h-3 rounded-full shrink-0" style={{ backgroundColor: dot }} />
      <span className="text-sm font-semibold flex-1" style={{ color: active ? color : "#6F6F6F" }}>{label}</span>
      {active && (
        <span className="w-5 h-5 rounded-full flex items-center justify-center shrink-0" style={{ backgroundColor: border }}>
          <svg width="10" height="8" viewBox="0 0 10 8" fill="none"><path d="M1 4l3 3 5-6" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </span>
      )}
    </button>
  );
}

// ── Main ──────────────────────────────────────────────────────────────────────
export default function AvaliarPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();
  const restaurant = mockRestaurants.find((r) => r.id === id) ?? mockRestaurants[0];

  const [openSection, setOpenSection] = useState<string | null>("safety");

  const [visitDate, setVisitDate]   = useState("");
  const [safety, setSafety]         = useState<SafetyChoice>(null);
  const [contam, setContam]         = useState<ContamChoice>(null);
  const [team, setTeam]             = useState<TeamChoice>(null);
  const [structure, setStructure]   = useState<string[]>([]);
  const [dishes, setDishes]         = useState<string[]>([""]);
  const [stars, setStars]           = useState(0);
  const [comment, setComment]       = useState("");
  const [tags, setTags]             = useState<string[]>([]);
  const [submitted, setSubmitted]   = useState(false);
  const [loading, setLoading]       = useState(false);

  const toggle = (key: string) => setOpenSection((p) => (p === key ? null : key));

  const canSubmit = safety !== null && contam !== null;

  const handleSubmit = () => {
    if (!canSubmit) return;
    setLoading(true);
    setTimeout(() => { setLoading(false); setSubmitted(true); }, 1200);
  };

  if (submitted) {
    return (
      <div
        className="min-h-dvh bg-background flex flex-col items-center justify-center px-5 text-center"
        style={{
          paddingTop: "calc(env(safe-area-inset-top, 0px) + 48px)",
          paddingBottom: "calc(env(safe-area-inset-bottom, 0px) + 100px)",
        }}
      >
        <div className="w-24 h-24 rounded-full bg-success/15 flex items-center justify-center mb-6">
          <CheckCircle size={48} className="text-success" strokeWidth={1.5} />
        </div>
        <h1 className="text-[24px] font-extrabold text-text-primary mb-2">Avaliação enviada!</h1>
        <p className="text-text-secondary text-sm leading-relaxed mb-2">
          Obrigado por ajudar outros celíacos<br />a se alimentarem com segurança.
        </p>
        <p className="text-text-disabled text-xs mb-8">
          Sua avaliação contribuirá para o score de segurança do restaurante.
        </p>
        <button onClick={() => router.push(`/restaurante/${id}`)}
          className="w-full font-bold py-4 rounded-full text-base active:scale-95 transition-transform shadow-md"
          style={{ backgroundColor: "#C6F59D", color: "#1F3D34" }}>
          Voltar ao restaurante
        </button>
      </div>
    );
  }

  return (
    <div className="bg-background min-h-dvh" style={{ paddingBottom: "calc(env(safe-area-inset-bottom, 0px) + 100px)" }}>

      {/* Hero */}
      <div className="relative h-64">
        <Image src={restaurant.image} alt={restaurant.name} fill className="object-cover" unoptimized />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/20 to-black/70" />

        {/* Back button */}
        <button onClick={() => router.back()}
          className="absolute left-5 w-10 h-10 bg-white/90 rounded-full flex items-center justify-center shadow-md active:scale-90 transition-transform"
          style={{ top: "calc(env(safe-area-inset-top, 0px) + 14px)" }}>
          <ArrowLeft size={18} className="text-text-primary" />
        </button>

        {/* Title top */}
        <div className="absolute left-1/2 -translate-x-1/2" style={{ top: "calc(env(safe-area-inset-top, 0px) + 14px)" }}>
          <p className="text-white/80 text-xs font-semibold text-center tracking-wide uppercase">Avaliar restaurante</p>
        </div>

        {/* Info overlay bottom */}
        <div className="absolute bottom-0 left-0 right-0 px-5 pb-5">
          <SafetyBadge level={restaurant.safetyLevel} size="sm" />
          <h1 className="text-white font-extrabold text-[22px] leading-tight mt-2 drop-shadow-sm">
            {restaurant.name}
          </h1>
          <div className="flex flex-col gap-1 mt-2">
            <div className="flex items-center gap-1.5">
              <MapPin size={11} className="text-white/70 shrink-0" />
              <p className="text-white/80 text-xs">{restaurant.address}, {restaurant.neighborhood}</p>
            </div>
            {restaurant.phone && (
              <div className="flex items-center gap-1.5">
                <Phone size={11} className="text-white/70 shrink-0" />
                <p className="text-white/80 text-xs">{restaurant.phone}</p>
              </div>
            )}
            <div className="flex items-center gap-1.5">
              <ChefHat size={11} className="text-white/70 shrink-0" />
              <p className="text-white/80 text-xs">Chef responsável: {restaurant.name.split(" ")[0]} Cozinha</p>
            </div>
          </div>
        </div>
      </div>

      {/* Date picker strip */}
      <div className="bg-surface px-5 py-3 border-b border-border/50 flex items-center gap-3">
        <CalendarDays size={15} className="text-primary shrink-0" />
        <p className="text-text-secondary text-sm font-semibold flex-1">Quando você visitou?</p>
        <input type="date" value={visitDate} onChange={(e) => setVisitDate(e.target.value)}
          className="text-xs text-text-secondary bg-background border border-border/50 rounded-xl px-3 py-1.5 outline-none focus:border-primary/50" />
      </div>

      <div className="px-5 py-4 space-y-3">

        {/* 1. Segurança — obrigatório */}
        <AccordionItem icon={Shield} iconColor="#2E7D32" title="Quão seguro você se sentiu?" subtitle="Pergunta principal — obrigatória"
          summary={safetyOptions.find(o => o.value === safety)?.label}
          open={openSection === "safety"} onToggle={() => toggle("safety")} required done={safety !== null}>
          <div className="space-y-2">
            {safetyOptions.map((opt) => (
              <OptionBtn key={String(opt.value)} active={safety === opt.value} {...opt}
                onClick={() => { setSafety(opt.value); toggle("contam"); }} />
            ))}
          </div>
        </AccordionItem>

        {/* 2. Contaminação — obrigatório */}
        <AccordionItem icon={AlertTriangle} iconColor="#E65100" title="Risco de contaminação cruzada?" subtitle="Houve sinais de contato com glúten?"
          summary={contamOptions.find(o => o.value === contam)?.label}
          open={openSection === "contam"} onToggle={() => toggle("contam")} required done={contam !== null}>
          <div className="space-y-2">
            {contamOptions.map((opt) => (
              <OptionBtn key={String(opt.value)} active={contam === opt.value} {...opt}
                onClick={() => { setContam(opt.value); toggle("team"); }} />
            ))}
          </div>
        </AccordionItem>

        {/* 3. Equipe */}
        <AccordionItem icon={Users} iconColor="#6A1B9A" title="A equipe sabia sobre dieta SG?" subtitle="Demonstraram conhecimento sobre celíaca?"
          summary={teamOptions.find(o => o.value === team)?.label}
          open={openSection === "team"} onToggle={() => toggle("team")} done={team !== null}>
          <div className="space-y-2">
            {teamOptions.map((opt) => (
              <OptionBtn key={String(opt.value)} active={team === opt.value} {...opt}
                onClick={() => { setTeam(opt.value); toggle("structure"); }} />
            ))}
          </div>
        </AccordionItem>

        {/* 4. Estrutura */}
        <AccordionItem icon={Building2} iconColor="#1565C0" title="Estrutura do local" subtitle="Pode selecionar mais de um"
          summary={structure.length > 0 ? structure.join(", ") : undefined}
          open={openSection === "structure"} onToggle={() => toggle("structure")} done={structure.length > 0}>
          <div className="flex flex-wrap gap-2">
            {structureOptions.map((opt) => {
              const active = structure.includes(opt);
              return (
                <button key={opt} onClick={() => setStructure(p => active ? p.filter(x => x !== opt) : [...p, opt])}
                  className="text-sm font-semibold px-3.5 py-2 rounded-full border-2 transition-all active:scale-95"
                  style={{ borderColor: active ? "#1565C0" : "#E5E5E5", backgroundColor: active ? "#E3F2FD" : "#FAFAFA", color: active ? "#1565C0" : "#6F6F6F" }}>
                  {opt}
                </button>
              );
            })}
          </div>
        </AccordionItem>

        {/* 5. Pratos */}
        <AccordionItem icon={UtensilsCrossed} iconColor="#00695C" title="O que você comeu?" subtitle="Informe os pratos (opcional)"
          summary={dishes.filter(Boolean).join(", ") || undefined}
          open={openSection === "dishes"} onToggle={() => toggle("dishes")} done={dishes.some(Boolean)}>
          <div className="space-y-2">
            {dishes.map((dish, i) => (
              <div key={i} className="flex items-center gap-2">
                <input value={dish} onChange={(e) => setDishes(p => p.map((d, idx) => idx === i ? e.target.value : d))}
                  placeholder={`Prato ${i + 1}...`}
                  className="flex-1 text-sm text-text-primary bg-background rounded-xl px-3.5 py-2.5 border border-border/50 outline-none focus:border-primary/50 placeholder:text-text-disabled" />
                {dishes.length > 1 && (
                  <button onClick={() => setDishes(p => p.filter((_, idx) => idx !== i))}
                    className="w-8 h-8 rounded-full bg-background border border-border flex items-center justify-center active:scale-90 transition-transform">
                    <X size={13} className="text-text-disabled" />
                  </button>
                )}
              </div>
            ))}
            <button onClick={() => setDishes(p => [...p, ""])}
              className="flex items-center gap-2 text-primary text-sm font-semibold mt-1 active:scale-95 transition-transform">
              <Plus size={15} /> Adicionar prato
            </button>
          </div>
        </AccordionItem>

        {/* 6. Nota geral + comentário */}
        <AccordionItem icon={Star} iconColor="#D97706" title="Avaliação geral" subtitle="Nota e comentário (opcional)"
          summary={stars > 0 ? `${stars} estrela${stars > 1 ? "s" : ""}` : undefined}
          open={openSection === "stars"} onToggle={() => toggle("stars")} done={stars > 0}>
          <div className="flex flex-col items-center gap-2 mb-3">
            <StarRow value={stars} onChange={setStars} />
            <p className="text-text-disabled text-xs">
              {["Toque para avaliar","Muito ruim","Ruim","Regular","Bom","Excelente!"][stars]}
            </p>
          </div>
          <textarea value={comment} onChange={(e) => setComment(e.target.value)}
            placeholder="Comentário opcional..."
            rows={3}
            className="w-full text-sm text-text-primary bg-background rounded-xl p-3 border border-border/50 resize-none outline-none focus:border-primary/50 placeholder:text-text-disabled leading-relaxed" />
        </AccordionItem>

        {/* 7. Foto */}
        <AccordionItem icon={Camera} iconColor="#AD1457" title="Adicionar foto" subtitle="Prato, menu ou local (opcional)"
          open={openSection === "photo"} onToggle={() => toggle("photo")}>
          <button className="w-full h-20 rounded-xl border-2 border-dashed border-border flex flex-col items-center justify-center gap-2 active:bg-background transition-colors">
            <Camera size={20} className="text-text-disabled" />
            <span className="text-text-disabled text-xs">Toque para adicionar foto</span>
          </button>
        </AccordionItem>

        {/* 8. Tags rápidas */}
        <AccordionItem icon={Shield} iconColor="#FC6904" title="Destaques rápidos" subtitle="Tags que resumem sua visita (opcional)"
          summary={tags.length > 0 ? `${tags.length} selecionada${tags.length > 1 ? "s" : ""}` : undefined}
          open={openSection === "tags"} onToggle={() => toggle("tags")} done={tags.length > 0}>
          <div className="flex flex-wrap gap-2">
            {quickTags.map((tag) => {
              const active = tags.includes(tag);
              return (
                <button key={tag} onClick={() => setTags(p => active ? p.filter(x => x !== tag) : [...p, tag])}
                  className="text-xs font-semibold px-3 py-1.5 rounded-full border-2 transition-all active:scale-95"
                  style={{ borderColor: active ? "#FC6904" : "#E5E5E5", backgroundColor: active ? "#FC6904" : "#FAFAFA", color: active ? "#fff" : "#6F6F6F" }}>
                  {tag}
                </button>
              );
            })}
          </div>
        </AccordionItem>

        {/* Microcopy */}
        <div className="flex items-start gap-3 px-1">
          <span className="text-lg shrink-0">🛡️</span>
          <p className="text-text-secondary text-[13px] leading-relaxed">
            Sua avaliação ajuda outras pessoas celíacas a tomarem decisões mais seguras.
          </p>
        </div>

        {/* CTA */}
        <button onClick={handleSubmit} disabled={!canSubmit || loading}
          className="w-full font-bold py-4 rounded-full text-base transition-all active:scale-95 shadow-md"
          style={{ backgroundColor: canSubmit ? "#C6F59D" : "#E5E5E5", color: canSubmit ? "#1F3D34" : "#AAAAAA" }}>
          {loading ? "Enviando..." : "Enviar avaliação"}
        </button>

        {!canSubmit && (
          <p className="text-center text-text-disabled text-xs -mt-2">
            Responda segurança e contaminação para continuar
          </p>
        )}
      </div>
    </div>
  );
}
