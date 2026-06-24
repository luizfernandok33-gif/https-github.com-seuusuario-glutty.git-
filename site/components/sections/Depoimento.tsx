"use client";

import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { Quote, UtensilsCrossed } from "lucide-react";
import type { TestimonialCopy } from "@/lib/i18n/translations";

function TestimonialBlock({
  testimonial,
  icon,
  delay,
}: {
  testimonial: TestimonialCopy;
  icon: React.ReactNode;
  delay: number;
}) {
  return (
    <Reveal delay={delay} className="flex flex-col items-center text-center">
      {icon}
      <p className="mt-7 font-display text-xl font-medium leading-relaxed text-(--color-cream) sm:text-2xl">
        “{testimonial.quote}”
      </p>
      <div className="mt-7">
        <p className="font-display text-base font-semibold text-(--color-primary-tint)">{testimonial.name}</p>
        <p className="mt-1 text-sm text-(--color-cream)/60">{testimonial.role}</p>
      </div>
    </Reveal>
  );
}

export default function Depoimento() {
  const { t } = useLanguage();

  return (
    <section className="relative overflow-hidden bg-(--color-primary-shade) py-24 sm:py-32">
      <Container className="mx-auto grid max-w-5xl gap-16 lg:grid-cols-2 lg:gap-10">
        <TestimonialBlock
          testimonial={t.depoimento}
          icon={<Quote size={48} strokeWidth={1.5} className="text-(--color-primary-tint)" />}
          delay={0}
        />
        <TestimonialBlock
          testimonial={t.depoimentoParceiro}
          icon={<UtensilsCrossed size={48} strokeWidth={1.5} className="text-(--color-leaf)" />}
          delay={0.1}
        />
      </Container>
    </section>
  );
}
