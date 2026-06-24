"use client";

import Image from "next/image";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { GraduationCap, FileCheck2, BadgeCheck } from "lucide-react";

const stepIcons = [GraduationCap, FileCheck2, BadgeCheck];

export default function Certificacao() {
  const { t } = useLanguage();

  return (
    <section id="certificacao" className="relative overflow-hidden bg-(--color-primary)">
      <div className="grid lg:grid-cols-2">
        <div className="relative min-h-[320px] lg:min-h-[640px]">
          <Image src="/selo-glutty.webp" alt={t.certificacao.imageAlt} fill className="object-cover lg:object-[10%_center]" />
        </div>

        <div className="flex items-center py-16 sm:py-24">
          <Container>
            <SectionHeading
              eyebrow={t.certificacao.eyebrow}
              title={t.certificacao.title}
              description={t.certificacao.description}
              tone="light"
            />

            <Reveal delay={0.1} className="mt-6 max-w-xl rounded-2xl border border-white/10 bg-white/5 p-5">
              <p className="text-sm leading-relaxed text-(--color-cream)/70">
                <strong className="text-(--color-primary-tint)">{t.certificacao.importantLabel}</strong>
                {t.certificacao.importantText}
              </p>
            </Reveal>

            <Reveal stagger={0.08} className="mt-8 space-y-5">
              {t.certificacao.steps.map(({ title, description }, i) => {
                const Icon = stepIcons[i];
                return (
                  <div key={title} className="flex items-start gap-4">
                    <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-(--color-primary-tint)/15 text-(--color-primary-tint)">
                      <Icon size={18} />
                    </span>
                    <div>
                      <p className="font-display text-base font-semibold text-(--color-cream)">
                        {i + 1}. {title}
                      </p>
                      <p className="mt-1 text-sm leading-relaxed text-(--color-cream)/60">{description}</p>
                    </div>
                  </div>
                );
              })}
            </Reveal>
          </Container>
        </div>
      </div>
    </section>
  );
}
