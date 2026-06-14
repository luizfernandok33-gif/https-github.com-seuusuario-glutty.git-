"use client";

import { useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import { gsap } from "@/lib/gsap";
import { ArrowRight, ShieldCheck, Users, ChefHat } from "lucide-react";

const HeroScene = dynamic(() => import("@/components/three/HeroScene"), {
  ssr: false,
  loading: () => null,
});

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

      <Container className="relative z-10 grid items-center gap-16 lg:grid-cols-[1.05fr_1fr]">
        <div>
          <span className="hero-anim mb-6 inline-flex items-center gap-2 rounded-full border border-(--color-primary-tint)/25 bg-white/5 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.18em] text-(--color-primary-tint)">
            Glútty para Restaurantes
          </span>

          <h1 className="hero-anim font-display text-[2.6rem] font-semibold leading-[1.08] tracking-tight text-(--color-cream) sm:text-[3.4rem] lg:text-[3.8rem]">
            Leve seu restaurante para uma comunidade que busca{" "}
            <span className="text-(--color-primary-tint)">comer sem medo</span>.
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

          <div className="hero-anim mt-12 flex flex-wrap gap-x-8 gap-y-4 text-sm text-(--color-cream)/70">
            <div className="flex items-center gap-2">
              <Users size={18} className="text-(--color-primary-tint)" />
              Comunidade celíaca ativa
            </div>
            <div className="flex items-center gap-2">
              <ChefHat size={18} className="text-(--color-primary-tint)" />
              Equipe treinada e certificada
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck size={18} className="text-(--color-primary-tint)" />
              Processos transparentes
            </div>
          </div>
        </div>

        {/* 3D scene + mascot */}
        <div className="relative h-[420px] w-full sm:h-[520px] lg:h-[600px]">
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
        </div>
      </Container>

      {/* scroll cue */}
      <div className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-(--color-cream)/50 sm:flex">
        <span className="text-xs uppercase tracking-[0.2em]">Role para descobrir</span>
        <span className="h-9 w-[1px] animate-pulse bg-(--color-cream)/30" />
      </div>
    </section>
  );
}
