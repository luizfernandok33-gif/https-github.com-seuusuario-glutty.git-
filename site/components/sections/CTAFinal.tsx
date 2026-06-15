"use client";

import Image from "next/image";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import Reveal from "@/components/ui/Reveal";
import PillCard from "@/components/ui/PillCard";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { ArrowRight } from "lucide-react";

export default function CTAFinal() {
  const { t } = useLanguage();

  return (
    <section id="cta" className="relative overflow-hidden bg-(--color-primary-tint) py-24 sm:py-32">
      <Container className="relative z-10 grid items-center gap-12 lg:grid-cols-[1.1fr_0.8fr]">
        <Reveal>
          <span className="mb-5 inline-flex items-center gap-2 rounded-full bg-(--color-primary)/10 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.18em] text-(--color-primary)">
            {t.ctaFinal.eyebrow}
          </span>
          <h2 className="font-display text-4xl font-semibold leading-[1.1] tracking-tight text-(--color-primary) sm:text-5xl lg:text-[3.4rem]">
            {t.ctaFinal.title}
          </h2>
          <p className="mt-5 max-w-lg text-lg leading-relaxed text-(--color-primary)/70">
            {t.ctaFinal.description}
          </p>
          <div className="mt-9 flex flex-wrap items-center gap-4">
            <Button href="#" variant="secondary" icon={<ArrowRight size={18} />}>
              {t.ctaFinal.ctaPrimary}
            </Button>
            <Button href="#servicos" variant="ghost">
              {t.ctaFinal.ctaSecondary}
            </Button>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <PillCard className="relative mx-auto h-[280px] w-full max-w-sm overflow-hidden border border-(--color-primary)/10 bg-white/30 sm:h-[360px]">
            <Image src="/cta-prato.webp" alt={t.ctaFinal.imageAlt} fill className="object-cover" />
          </PillCard>
        </Reveal>
      </Container>
    </section>
  );
}
