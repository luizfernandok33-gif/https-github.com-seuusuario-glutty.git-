"use client";

import { useEffect, useRef } from "react";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import PhotoPlaceholder from "@/components/ui/PhotoPlaceholder";
import StatsBar from "@/components/ui/StatsBar";
import { gsap } from "@/lib/gsap";
import { ArrowRight, ShieldCheck, Users, ChefHat } from "lucide-react";

const heroStats = [
  { value: "8", label: "etapas guiadas, do cadastro ao Selo Glútty Verificado" },
  { value: "7", label: "critérios de segurança avaliados antes da certificação" },
  { value: "100%", label: "da equipe passa pelo treinamento obrigatório" },
  { value: "1", label: "selo que conecta seu restaurante à comunidade celíaca" },
];

const heroFeatures = [
  { icon: ShieldCheck, label: "100% verificado" },
  { icon: ChefHat, label: "Equipe treinada" },
  { icon: Users, label: "Comunidade celíaca" },
];

export default function Hero() {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".hero-anim", {
        opacity: 0,
        y: 28,
        duration: 1,
        ease: "power3.out",
        stagger: 0.12,
        delay: 0.15,
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section id="top" ref={root} className="relative overflow-hidden bg-(--color-primary) pt-28 pb-16">
      <Container className="relative z-10">
        <div className="grid overflow-hidden rounded-[2.5rem] lg:grid-cols-[1.1fr_1fr] sm:rounded-[3rem]">
          {/* left: dark content panel */}
          <div className="relative bg-(--color-primary) px-6 py-12 sm:px-10 sm:py-16 lg:py-20">
            {/* ambient gradient + glow */}
            <div className="pointer-events-none absolute inset-0">
              <div className="absolute -left-32 top-1/3 h-[28rem] w-[28rem] rounded-full bg-(--color-primary-tint)/15 blur-[120px]" />
              <div
                className="absolute inset-0 opacity-[0.04]"
                style={{
                  backgroundImage:
                    "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
                  backgroundSize: "32px 32px",
                }}
              />
            </div>

            <div className="relative">
              <h1 className="hero-anim font-display text-4xl font-bold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
                <span className="block text-(--color-cream)">Alimentação segura</span>
                <span className="block text-(--color-primary-tint)">fora de casa</span>
              </h1>

              <p className="hero-anim mt-6 max-w-xl text-lg leading-relaxed text-(--color-cream)/75">
                O Glútty conecta estabelecimentos preparados a pessoas celíacas que
                precisam de informação clara, atendimento treinado e transparência
                antes de escolher onde comer.
              </p>

              <div className="hero-anim mt-9 flex flex-wrap items-center gap-4">
                <Button href="#cta" variant="tint" icon={<ArrowRight size={18} />}>
                  Quero ser parceiro do Glútty
                </Button>
                <Button href="#treinamento" variant="ghost-light">
                  Conhecer o treinamento
                </Button>
              </div>

              <div className="hero-anim mt-12 flex flex-wrap divide-x divide-white/10 text-sm text-(--color-cream)/70">
                {heroFeatures.map(({ icon: Icon, label }) => (
                  <div key={label} className="flex flex-col items-start gap-2 px-5 first:pl-0">
                    <Icon size={20} className="text-(--color-primary-tint)" />
                    {label}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* right: photo panel, full bleed */}
          <div className="hero-anim relative min-h-[320px] bg-(--color-cream-deep) sm:min-h-[420px] lg:min-h-[560px]">
            <PhotoPlaceholder
              tone="dark"
              label="Foto: equipe do restaurante preparando um prato sem glúten"
              className="absolute inset-0 rounded-none border-0"
            />
            {/* Drop a /public/hero-bg.mp4 to show a background video instead of the photo */}
            <video
              className="absolute inset-0 h-full w-full object-cover"
              src="/hero-bg.mp4"
              autoPlay
              muted
              loop
              playsInline
              onError={(e) => {
                e.currentTarget.style.display = "none";
              }}
            />
          </div>
        </div>

        <div className="hero-anim mt-16 border-t border-white/10 pt-10 sm:mt-20">
          <StatsBar stats={heroStats} tone="light" />
        </div>
      </Container>
    </section>
  );
}
