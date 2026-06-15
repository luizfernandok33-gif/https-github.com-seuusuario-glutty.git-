import Image from "next/image";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import { GraduationCap, FileCheck2, BadgeCheck } from "lucide-react";

const steps = [
  {
    icon: GraduationCap,
    title: "Treinamento concluído",
    description: "Toda a equipe finaliza o treinamento obrigatório Glútty sobre doença celíaca e segurança alimentar.",
  },
  {
    icon: FileCheck2,
    title: "Processos declarados",
    description: "O restaurante declara seus processos de segurança alimentar e boas práticas de cozinha.",
  },
  {
    icon: BadgeCheck,
    title: "Selo ativado no perfil",
    description: "O Selo Glútty Verificado é exibido no perfil do restaurante dentro do aplicativo.",
  },
];

export default function Certificacao() {
  return (
    <section id="certificacao" className="relative overflow-hidden bg-(--color-primary)">
      <div className="grid lg:grid-cols-2">
        <div className="relative min-h-[320px] lg:min-h-[640px]">
          <Image src="/selo-glutty.webp" alt="Selo Glútty Verificado em destaque" fill className="object-cover" />
        </div>

        <div className="flex items-center py-16 sm:py-24">
          <Container>
            <SectionHeading
              eyebrow="Por quê o Glútty?"
              title="O Selo Glútty Verificado"
              description="O selo indica que o restaurante passou pelo treinamento obrigatório, declarou seus processos de segurança alimentar e segue boas práticas para reduzir riscos de contaminação cruzada."
              tone="light"
            />

            <Reveal delay={0.1} className="mt-6 max-w-xl rounded-2xl border border-white/10 bg-white/5 p-5">
              <p className="text-sm leading-relaxed text-(--color-cream)/70">
                <strong className="text-(--color-primary-tint)">Importante:</strong> o selo não é uma
                garantia de 100% de segurança — doença celíaca exige cuidado contínuo de todas as
                partes. Ele representa um compromisso público com transparência, treinamento e
                melhoria constante dos processos.
              </p>
            </Reveal>

            <Reveal stagger={0.08} className="mt-8 space-y-5">
              {steps.map(({ icon: Icon, title, description }, i) => (
                <div key={title} className="flex items-start gap-4">
                  <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-(--color-primary-tint)/15 text-(--color-primary-tint)">
                    <Icon size={18} />
                  </span>
                  <div>
                    <p className="font-display text-base font-semibold text-(--color-cream)">
                      {i + 1}. {title}
                    </p>
                    <p className="mt-1 text-sm leading-relaxed text-(--color-cream)/60">{description}</p>
                  </div>
                </div>
              ))}
            </Reveal>
          </Container>
        </div>
      </div>
    </section>
  );
}
