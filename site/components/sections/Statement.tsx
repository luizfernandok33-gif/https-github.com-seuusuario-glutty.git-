"use client";

import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import clsx from "clsx";

interface StatementProps {
  bgClassName: string;
  textClassName: string;
  plusClassName: string;
}

export default function Statement({ bgClassName, textClassName, plusClassName }: StatementProps) {
  const { t } = useLanguage();
  const words = t.statement.words;

  return (
    <section className={clsx("relative overflow-hidden py-14 sm:py-20", bgClassName)}>
      <Container>
        <Reveal>
          <p
            className={clsx(
              "flex flex-wrap items-center justify-center gap-x-3 gap-y-2 text-center font-display text-3xl font-semibold tracking-tight sm:text-5xl lg:text-6xl",
              textClassName
            )}
          >
            {words.map((word, i) => (
              <span key={word} className="inline-flex items-center gap-x-3 sm:gap-x-4">
                {word}
                {i < words.length - 1 && <span className={plusClassName}>+</span>}
              </span>
            ))}
          </p>
        </Reveal>
      </Container>
    </section>
  );
}
