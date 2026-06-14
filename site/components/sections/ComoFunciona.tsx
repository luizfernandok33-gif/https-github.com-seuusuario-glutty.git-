"use client";

import { useEffect, useRef } from "react";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import {
  UserPlus,
  SearchCheck,
  GraduationCap,
  Settings2,
  BadgeCheck,
  Smartphone,
  MessageCircle,
  PartyPopper,
} from "lucide-react";

const steps = [
  {
    icon: UserPlus,
    title: "Cadastro",
    description:
      "Você registra seu restaurante e conta um pouco sobre sua estrutura, cardápio e processos atuais.",
  },
  {
    icon: SearchCheck,
    title: "Análise inicial",
    description:
      "Nossa equipe avalia as informações enviadas e identifica pontos de atenção antes do treinamento.",
  },
  {
    icon: GraduationCap,
    title: "Treinamento da equipe",
    description:
      "Todo o time participa do treinamento obrigatório Glútty sobre doença celíaca e segurança alimentar.",
  },
  {
    icon: Settings2,
    title: "Ajustes de processos",
    description:
      "Com o que foi aprendido, o restaurante revisa rotinas, separação de utensílios e comunicação com o cliente.",
  },
  {
    icon: BadgeCheck,
    title: "Certificação",
    description:
      "Após concluir o treinamento e declarar seus processos, o restaurante recebe o Selo Glútty Verificado.",
  },
  {
    icon: Smartphone,
    title: "Entrada no app",
    description:
      "O perfil do restaurante é publicado no aplicativo, com selo, cardápio e informações verificadas.",
  },
  {
    icon: MessageCircle,
    title: "Avaliações da comunidade",
    description:
      "Clientes celíacos começam a avaliar pratos, atendimento, clareza e segurança percebida.",
  },
  {
    icon: PartyPopper,
    title: "Participação em eventos",
    description: "O restaurante passa a integrar feiras, degustações e ações da comunidade Glútty.",
  },
];

export default function ComoFunciona() {
  const root = useRef<HTMLDivElement>(null);
  const fillRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const rootEl = root.current;
    const fill = fillRef.current;
    if (!rootEl || !fill) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        fill,
        { height: "0%" },
        {
          height: "100%",
          ease: "none",
          scrollTrigger: {
            trigger: rootEl,
            start: "top 35%",
            end: "bottom 75%",
            scrub: true,
          },
        }
      );

      gsap.utils.toArray<HTMLElement>(".timeline-step").forEach((step) => {
        const badge = step.querySelector(".timeline-badge");
        gsap.set(step, { opacity: 0, y: 30 });

        ScrollTrigger.create({
          trigger: step,
          start: "top 65%",
          end: "bottom 35%",
          onEnter: () => {
            badge?.classList.add("is-active");
            gsap.to(step, { opacity: 1, y: 0, duration: 0.7, ease: "power3.out" });
          },
          onLeaveBack: () => {
            badge?.classList.remove("is-active");
            gsap.to(step, { opacity: 0, y: 30, duration: 0.5, ease: "power3.out" });
          },
        });
      });
    }, rootEl);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="como-funciona"
      ref={root}
      className="relative overflow-hidden bg-(--color-primary) py-24 sm:py-32"
    >
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-40 top-1/2 h-[26rem] w-[26rem] -translate-y-1/2 rounded-full bg-(--color-primary-tint)/10 blur-[120px]" />
      </div>

      <Container className="relative z-10">
        <SectionHeading
          eyebrow="Como funciona"
          tone="light"
          align="center"
          title="Do cadastro ao selo: veja o caminho até fazer parte do Glútty"
          description="Um processo guiado, em oito etapas, que prepara o seu restaurante para receber a comunidade celíaca com confiança."
          className="mx-auto"
        />

        <div className="relative mx-auto mt-16 max-w-2xl">
          <div className="absolute left-6 top-3 bottom-3 w-px bg-white/10 sm:left-7" />
          <div
            ref={fillRef}
            className="absolute left-6 top-3 w-px bg-(--color-primary-tint) sm:left-7"
            style={{ height: "0%" }}
          />

          <div className="space-y-8">
            {steps.map((step, i) => {
              const Icon = step.icon;
              return (
                <div key={step.title} className="timeline-step relative flex gap-5 sm:gap-6">
                  <div className="timeline-badge relative z-10 flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full border border-white/15 bg-(--color-primary) text-(--color-cream) sm:h-14 sm:w-14">
                    <Icon size={20} className="sm:h-[22px] sm:w-[22px]" />
                  </div>
                  <div className="pt-1.5">
                    <p className="text-xs font-bold uppercase tracking-[0.2em] text-(--color-primary-tint)/70">
                      Passo {i + 1}
                    </p>
                    <h3 className="mt-1 font-display text-xl font-semibold text-(--color-cream) sm:text-2xl">
                      {step.title}
                    </h3>
                    <p className="mt-2 max-w-md text-sm leading-relaxed text-(--color-cream)/70 sm:text-base">
                      {step.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </Container>
    </section>
  );
}
