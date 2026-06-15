"use client";

import { useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import PillCard from "@/components/ui/PillCard";
import StatsBar from "@/components/ui/StatsBar";
import { gsap } from "@/lib/gsap";
import { ArrowRight, ShieldCheck, Users, ChefHat } from "lucide-react";

const HeroScene = dynamic(() => import("@/components/three/HeroScene"), {
  ssr: false,
  loading: () => null,
});

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
      gsap.to(".hero-mascot", {
        y: -16,
        duration: 2.6,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="top"
      ref={root}
      className="relative flex min-h-[100vh] items-center overflow-hidden bg-(--color-primary) pt-28 pb-16"
    >
      {/* ambient gradient + glow */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-32 top-1/3 h-[28rem] w-[28rem] rounded-full bg-(--color-primary-tint)/15 blur-[120px]" />
        <div className="absolute right-0 top-0 h-[24rem] w-[24rem] rounded-full bg-(--color-accent)/15 blur-[120px]" />
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
            backgroundSize: "32px 32px",
          }}
        />
      </div>

      <Container className="relative z-10">
        <div className="grid items-center gap-16 lg:grid-cols-[1.05fr_1fr]">
          <div>
            <span className="hero-anim mb-6 inline-flex items-center gap-2 rounded-full border border-(--color-primary-tint)/25 bg-white/5 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.18em] text-(--color-primary-tint)">
              Glútty para Restaurantes
            </span>

            <h1 className="hero-anim font-display text-6xl font-bold leading-[0.95] tracking-tight sm:text-7xl">
              <span className="block text-(--color-cream)">Sem glúten.</span>
              <span className="block text-(--color-primary-tint)">Sem medo.</span>
            </h1>

            <p className="hero-anim mt-6 max-w-xl text-lg leading-relaxed text-(--color-cream)/75">
              O Glútty conecta estabelecimentos preparados a pessoas celíacas que
              precisam de informação clara, atendimento treinado e transparência
              antes de escolher onde comer.
            </p>

            <div className="hero-anim mt-9 flex flex-wrap items-center gap-4">
              <Button href="#cta" variant="primary" icon={<ArrowRight size={18} />}>
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

          {/* video background, with 3D scene + mascot as fallback, in a rounded pill card */}
          <PillCard className="hero-anim relative h-[420px] w-full overflow-hidden border border-white/10 bg-white/[0.03] sm:h-[520px] lg:h-[600px]">
            <div className="absolute inset-0">
              <HeroScene />
            </div>
            <Image
              src="/mascote-aceno.png"
              alt="Mascote Glútty acenando"
              width={679}
              height={853}
              className="hero-mascot absolute bottom-0 left-1/2 h-[55%] w-auto -translate-x-1/2 drop-shadow-2xl sm:h-[60%]"
              priority
            />
            {/* Drop a /public/hero-bg.mp4 to replace the 3D scene with a real background video */}
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
          </PillCard>
        </div>

        <div className="hero-anim mt-16 border-t border-white/10 pt-10 sm:mt-20">
          <StatsBar stats={heroStats} tone="light" />
        </div>
      </Container>
    </section>
  );
}
