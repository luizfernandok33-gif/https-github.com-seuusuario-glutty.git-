import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import TiltCard from "@/components/ui/TiltCard";
import { Users, ClipboardCheck, Award, GraduationCap } from "lucide-react";

const benefits = [
  {
    icon: Users,
    title: "Novo público fiel",
    description:
      "A comunidade celíaca valoriza e indica os lugares em que confia — gerando clientes recorrentes para o seu restaurante.",
  },
  {
    icon: ClipboardCheck,
    title: "Redução de erros e retrabalho",
    description:
      "Processos mais claros significam menos devoluções, reclamações e prejuízos causados por contaminação cruzada.",
  },
  {
    icon: Award,
    title: "Marca associada à confiança",
    description:
      "O Selo Glútty Verificado comunica, à primeira vista, que o seu restaurante se importa com segurança alimentar.",
  },
  {
    icon: GraduationCap,
    title: "Equipe mais preparada",
    description:
      "Capacitação contínua reduz riscos, melhora o atendimento e fortalece a cultura de cuidado do seu time.",
  },
];

export default function Beneficios() {
  return (
    <section id="vantagens" className="relative bg-(--color-cream) py-24 sm:py-32">
      <Container>
        <SectionHeading
          eyebrow="Benefícios para o seu negócio"
          align="center"
          title="O que muda na prática para o seu restaurante"
          description="Fazer parte do Glútty é mais do que aparecer em um app — é fortalecer a forma como o seu restaurante se relaciona com a comunidade celíaca."
          className="mx-auto"
        />

        <Reveal stagger={0.1} className="mt-14 grid gap-6 sm:grid-cols-2">
          {benefits.map(({ icon: Icon, title, description }) => (
            <TiltCard
              key={title}
              className="rounded-3xl border border-(--color-primary)/8 bg-white p-8 shadow-[0_25px_55px_-30px_rgba(31,61,52,0.25)]"
            >
              <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-(--color-primary) text-(--color-primary-tint)">
                <Icon size={26} />
              </div>
              <h3 className="font-display text-xl font-semibold text-(--color-primary)">{title}</h3>
              <p className="mt-2.5 text-base leading-relaxed text-(--color-ink-soft)">{description}</p>
            </TiltCard>
          ))}
        </Reveal>
      </Container>
    </section>
  );
}
