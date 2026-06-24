"use client";

import Image from "next/image";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { ArrowRight } from "lucide-react";

const photos = ["/cardapio-sem-gluten.webp", "/contaminacao-cruzada.webp", "/treinamento-glutty.webp"];

export default function NossosServicos() {
  const { t } = useLanguage();

  return (
    <section id="servicos" className="relative overflow-hidden bg-(--color-primary-shade) py-24 sm:py-32">
      <Container className="relative z-10">
        <SectionHeading
          eyebrow={t.nossosServicos.eyebrow}
          title={t.nossosServicos.title}
          description={t.nossosServicos.description}
          align="center"
          tone="light"
          className="mx-auto"
        />

        <Reveal stagger={0.08} className="mt-14 grid gap-6 sm:grid-cols-3">
          {t.nossosServicos.services.map(({ title, description, photoLabel }, i) => (
            <div key={title}>
              <div className="relative aspect-[328/435] overflow-hidden rounded-2xl">
                <Image src={photos[i]} alt={photoLabel} fill className="object-cover" />
              </div>
              <h3 className="mt-5 font-display text-xl font-semibold text-(--color-cream)">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-(--color-cream)/60">{description}</p>
              <a
                href="#cta"
                className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-(--color-primary-tint) transition-colors hover:text-(--color-leaf)"
              >
                {t.nossosServicos.cta}
                <ArrowRight size={14} />
              </a>
            </div>
          ))}
        </Reveal>
      </Container>
    </section>
  );
}
