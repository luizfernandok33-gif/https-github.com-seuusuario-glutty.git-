"use client";

import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { Quote } from "lucide-react";

export default function Depoimento() {
  const { t } = useLanguage();

  return (
    <section className="relative overflow-hidden bg-(--color-primary-shade) py-24 sm:py-32">
      <Container className="mx-auto max-w-3xl text-center">
        <Reveal>
          <Quote size={56} strokeWidth={1.5} className="mx-auto text-(--color-primary-tint)" />
        </Reveal>

        <Reveal delay={0.08}>
          <p className="mt-8 font-display text-2xl font-medium leading-relaxed text-(--color-cream) sm:text-3xl">
            “{t.depoimento.quote}”
          </p>
        </Reveal>

        <Reveal delay={0.16}>
          <div className="mt-8">
            <p className="font-display text-base font-semibold text-(--color-primary-tint)">{t.depoimento.name}</p>
            <p className="mt-1 text-sm text-(--color-cream)/60">{t.depoimento.role}</p>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
