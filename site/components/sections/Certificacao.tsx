"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import { GraduationCap, FileCheck2, BadgeCheck } from "lucide-react";

const SeloScene = dynamic(() => import("@/components/three/SeloScene"), {
  ssr: false,
  loading: () => null,
});

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
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => setActive(entry.isIntersecting),
      { threshold: 0.4 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="certificacao" className="relative overflow-hidden bg-(--color-cream) py-24 sm:py-32">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute right-0 top-1/4 h-[26rem] w-[26rem] rounded-full bg-(--color-primary-tint)/25 blur-[120px]" />
      </div>

      <Container className="relative z-10 grid items-center gap-14 lg:grid-cols-[1fr_0.9fr]">
        <div>
          <SectionHeading
            eyebrow="Certificação Glútty"
            title="O Selo Glútty Verificado"
            description="O selo indica que o restaurante passou pelo treinamento obrigatório, declarou seus processos de segurança alimentar e segue boas práticas para reduzir riscos de contaminação cruzada."
          />

          <Reveal delay={0.1} className="mt-6 max-w-xl rounded-2xl border border-(--color-primary)/10 bg-white/60 p-5">
            <p className="text-sm leading-relaxed text-(--color-ink-soft)">
              <strong className="text-(--color-primary)">Importante:</strong> o selo não é uma
              garantia de 100% de segurança — doença celíaca exige cuidado contínuo de todas as
              partes. Ele representa um compromisso público com transparência, treinamento e
              melhoria constante dos processos.
            </p>
          </Reveal>

          <Reveal stagger={0.08} className="mt-10 space-y-4">
            {steps.map(({ icon: Icon, title, description }, i) => (
              <div key={title} className="flex items-start gap-4 rounded-2xl bg-white/70 p-4">
                <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-(--color-primary) text-(--color-primary-tint)">
                  <Icon size={18} />
                </span>
                <div>
                  <p className="font-display text-base font-semibold text-(--color-primary)">
                    {i + 1}. {title}
                  </p>
                  <p className="mt-1 text-sm leading-relaxed text-(--color-ink-soft)">{description}</p>
                </div>
              </div>
            ))}
          </Reveal>
        </div>

        <div ref={ref} className="relative mx-auto h-[360px] w-full max-w-md sm:h-[440px]">
          <SeloScene active={active} />
          <p className="pointer-events-none absolute bottom-2 left-1/2 -translate-x-1/2 text-center text-xs uppercase tracking-[0.2em] text-(--color-primary)/40">
            {active ? "Selo ativado" : "Role para ativar o selo"}
          </p>
        </div>
      </Container>
    </section>
  );
}
