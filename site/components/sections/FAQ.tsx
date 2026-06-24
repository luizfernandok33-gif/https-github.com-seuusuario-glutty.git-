"use client";

import { useState } from "react";
import clsx from "clsx";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { ChevronDown } from "lucide-react";

export default function FAQ() {
  const { t } = useLanguage();
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="relative bg-(--color-cream) py-24 sm:py-32">
      <Container className="mx-auto max-w-3xl">
        <SectionHeading
          eyebrow={t.faq.eyebrow}
          align="center"
          title={t.faq.title}
          description={t.faq.description}
          className="mx-auto"
        />

        <Reveal stagger={0.08} className="mt-12 space-y-3">
          {t.faq.items.map(({ title, description }, i) => {
            const isOpen = openIndex === i;
            return (
              <div
                key={title}
                className="overflow-hidden rounded-2xl border border-(--color-primary)/10 bg-white"
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
                >
                  <span className="font-display text-lg font-semibold text-(--color-primary)">{title}</span>
                  <ChevronDown
                    size={20}
                    className={clsx(
                      "shrink-0 text-(--color-primary)/60 transition-transform duration-300",
                      isOpen && "rotate-180"
                    )}
                  />
                </button>
                <div
                  className={clsx(
                    "grid transition-all duration-300 ease-out",
                    isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                  )}
                >
                  <div className="overflow-hidden">
                    <p className="px-6 pb-5 text-base leading-relaxed text-(--color-ink-soft)">{description}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </Reveal>
      </Container>
    </section>
  );
}
