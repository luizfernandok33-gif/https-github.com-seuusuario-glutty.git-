"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import { gsap } from "@/lib/gsap";
import { ArrowRight, ShieldCheck, Users, ChefHat } from "lucide-react";

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
    <section
      id="top"
      ref={root}
      className="relative isolate flex min-h-[640px] items-center overflow-hidden bg-(--color-primary) pt-28 pb-20 lg:min-h-[760px]"
    >
      <Image src="/hero-bg-3.png" alt="" fill priority sizes="100vw" className="object-cover" />
      <div
        className="absolute inset-0"
        style={{ background: "linear-gradient(89.69deg, #142F17 54.115%, rgba(22, 38, 21, 0) 99.652%)" }}
      />
      <div className="pointer-events-none absolute -left-[27px] top-[511px] h-[28rem] w-[28rem] rounded-full bg-[rgba(237,244,161,0.15)] blur-[120px]" />

      <Container className="relative z-10">
        <div className="max-w-xl">
          <h1 className="hero-anim font-display text-4xl font-bold leading-[1.05] tracking-tight sm:text-5xl lg:text-[60px] lg:leading-[63px] lg:tracking-[-1.5px]">
            <span className="block text-(--color-cream)">Alimentação segura</span>
            <span className="block text-(--color-primary-tint)">fora de casa</span>
          </h1>

          <p className="hero-anim mt-6 max-w-md text-lg leading-relaxed text-[rgba(219,227,207,0.75)]">
            O Glútty conecta estabelecimentos preparados a pessoas celíacas que
            precisam de informação clara, atendimento treinado e transparência
            antes de escolher onde comer.
          </p>

          <div className="hero-anim mt-9 flex flex-wrap items-center gap-4">
            <Button href="#cta" variant="tint" icon={<ArrowRight size={18} />}>
              Quero ser parceiro do Glútty
            </Button>
            <Button href="#servicos" variant="ghost-light">
              Conhecer nossos serviços
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
      </Container>
    </section>
  );
}
