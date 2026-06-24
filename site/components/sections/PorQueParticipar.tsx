"use client";

import Image from "next/image";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import PillCard from "@/components/ui/PillCard";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { Eye, ShieldCheck, MapPin, MessageCircle, GraduationCap, Calendar } from "lucide-react";

const itemIcons = [Eye, ShieldCheck, MapPin, MessageCircle, GraduationCap, Calendar];

export default function PorQueParticipar() {
  const { t } = useLanguage();

  return (
    <section id="beneficios" className="relative overflow-hidden bg-(--color-primary) py-24 sm:py-32">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-40 top-1/3 h-[26rem] w-[26rem] rounded-full bg-(--color-primary-tint)/10 blur-[120px]" />
      </div>

      <Container className="relative z-10">
        <SectionHeading
          eyebrow={t.porQueParticipar.eyebrow}
          title={t.porQueParticipar.title}
          description={t.porQueParticipar.description}
          align="center"
          tone="light"
          className="mx-auto"
        />

        <div className="mt-16 grid items-stretch gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
          <Reveal>
            <PillCard className="relative h-full min-h-[360px] overflow-hidden border border-white/10 bg-white/[0.02]">
              <Image
                src="/comunidade-glutty.webp"
                alt={t.porQueParticipar.imageAlt}
                fill
                className="object-cover"
              />
            </PillCard>
          </Reveal>

          <div>
            <Reveal>
              <span className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.18em] text-(--color-primary-tint)">
                {t.porQueParticipar.badge}
              </span>
              <h3 className="font-display text-2xl font-semibold leading-tight text-(--color-cream) sm:text-3xl">
                {t.porQueParticipar.subtitle}
              </h3>
            </Reveal>

            <Reveal stagger={0.08} className="mt-8 grid gap-6 sm:grid-cols-2">
              {t.porQueParticipar.items.map(({ title, description }, i) => {
                const Icon = itemIcons[i];
                return (
                  <div key={title} className="flex items-start gap-3">
                    <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-white/10 text-(--color-primary-tint)">
                      <Icon size={18} strokeWidth={2.2} />
                    </span>
                    <div>
                      <p className="font-display text-sm font-semibold text-(--color-cream)">{title}</p>
                      <p className="mt-1 text-sm leading-relaxed text-(--color-cream)/55">{description}</p>
                    </div>
                  </div>
                );
              })}
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  );
}
