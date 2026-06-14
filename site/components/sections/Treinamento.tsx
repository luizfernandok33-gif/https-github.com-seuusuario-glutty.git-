import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import {
  Users,
  ChefHat,
  UtensilsCrossed,
  Sparkles,
  CheckCircle2,
} from "lucide-react";

const audiences = [
  { icon: Users, label: "Donos e gerentes" },
  { icon: ChefHat, label: "Chefs e cozinha" },
  { icon: UtensilsCrossed, label: "Equipe de salão" },
  { icon: Sparkles, label: "Limpeza e louça" },
];

const topics = [
  "O que é a doença celíaca e por que ela exige tanto cuidado",
  "Como evitar a contaminação cruzada na prática, do estoque ao prato",
  "Separação correta de utensílios, superfícies e áreas de preparo",
  "Manuseio seguro de ingredientes e produtos sem glúten",
  "Como orientar e tranquilizar o cliente celíaco no atendimento",
  "Organização da cozinha para reduzir riscos no dia a dia",
  "Como lidar com dúvidas, exceções e situações inesperadas",
];

export default function Treinamento() {
  return (
    <section id="treinamento" className="relative overflow-hidden bg-(--color-primary) py-24 sm:py-32">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -right-40 top-10 h-[26rem] w-[26rem] rounded-full bg-(--color-primary-tint)/10 blur-[120px]" />
        <div className="absolute -left-32 bottom-0 h-[22rem] w-[22rem] rounded-full bg-(--color-accent)/10 blur-[120px]" />
      </div>

      <Container className="relative z-10">
        <SectionHeading
          eyebrow="Treinamento obrigatório"
          tone="light"
          title="Toda a equipe passa pelo treinamento Glútty — sem exceções"
          description="Antes de receber o selo, cada pessoa que trabalha no restaurante participa do treinamento Glútty sobre doença celíaca e segurança alimentar. Do salão à cozinha, todo mundo aprende a mesma linguagem de cuidado."
        />

        <Reveal stagger={0.08} className="mt-10 flex flex-wrap gap-3">
          {audiences.map(({ icon: Icon, label }) => (
            <div
              key={label}
              className="flex items-center gap-2.5 rounded-full border border-white/10 bg-white/5 px-5 py-2.5 text-sm font-semibold text-(--color-cream) transition-colors duration-300 hover:border-(--color-primary-tint)/40 hover:bg-white/10"
            >
              <Icon size={18} className="text-(--color-primary-tint)" />
              {label}
            </div>
          ))}
        </Reveal>

        <Reveal stagger={0.06} className="mt-10 grid gap-4 sm:grid-cols-2">
          {topics.map((topic) => (
            <div
              key={topic}
              className="flex items-start gap-3 rounded-2xl border border-white/8 bg-white/[0.04] p-5"
            >
              <span className="mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-(--color-primary-tint)/20 text-(--color-primary-tint)">
                <CheckCircle2 size={14} strokeWidth={2.5} />
              </span>
              <p className="text-sm leading-relaxed text-(--color-cream)/85 sm:text-base">{topic}</p>
            </div>
          ))}
        </Reveal>
      </Container>
    </section>
  );
}
