"use client";

import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import TiltCard from "@/components/ui/TiltCard";
import NumberMark from "@/components/ui/NumberMark";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { Users, ClipboardCheck, Award, GraduationCap } from "lucide-react";

const itemIcons = [Users, ClipboardCheck, Award, GraduationCap];

export default function Beneficios() {
  const { t } = useLanguage();

  return (
    <section id="vantagens" className="relative bg-(--color-cream) py-24 sm:py-32">
      <Container>
        <SectionHeading
          eyebrow={t.beneficios.eyebrow}
          align="center"
          title={t.beneficios.title}
          description={t.beneficios.description}
          className="mx-auto"
        />

        <Reveal stagger={0.1} className="mt-14 grid gap-6 sm:grid-cols-2">
          {t.beneficios.items.map(({ title, description }, i) => {
            const Icon = itemIcons[i];
            return (
              <TiltCard
                key={title}
                className="rounded-3xl border border-(--color-primary)/8 bg-white p-8 shadow-[0_25px_55px_-30px_rgba(20,47,23,0.25)]"
              >
                <div className="mb-5 flex items-start justify-between">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-(--color-primary) text-(--color-primary-tint)">
                    <Icon size={26} />
                  </div>
                  <NumberMark index={i + 1} />
                </div>
                <h3 className="font-display text-xl font-semibold text-(--color-primary)">{title}</h3>
                <p className="mt-2.5 text-base leading-relaxed text-(--color-ink-soft)">{description}</p>
              </TiltCard>
            );
          })}
        </Reveal>
      </Container>
    </section>
  );
}
