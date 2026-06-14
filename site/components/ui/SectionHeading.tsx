import type { ReactNode } from "react";
import clsx from "clsx";
import Reveal from "@/components/ui/Reveal";

interface SectionHeadingProps {
  eyebrow: string;
  title: ReactNode;
  description?: ReactNode;
  align?: "left" | "center";
  tone?: "dark" | "light";
  className?: string;
}

export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  tone = "dark",
  className,
}: SectionHeadingProps) {
  const isCenter = align === "center";
  const isLight = tone === "light";

  return (
    <Reveal
      className={clsx(
        "max-w-2xl",
        isCenter && "mx-auto text-center",
        className
      )}
    >
      <span
        className={clsx(
          "mb-4 inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-bold uppercase tracking-[0.18em]",
          isLight
            ? "bg-white/10 text-(--color-primary-tint)"
            : "bg-(--color-primary)/8 text-(--color-primary)"
        )}
      >
        {eyebrow}
      </span>
      <h2
        className={clsx(
          "font-display text-4xl font-semibold leading-[1.1] tracking-tight sm:text-5xl",
          isLight ? "text-(--color-cream)" : "text-(--color-primary)"
        )}
      >
        {title}
      </h2>
      {description && (
        <p
          className={clsx(
            "mt-5 text-lg leading-relaxed",
            isLight ? "text-(--color-cream)/70" : "text-(--color-ink-soft)"
          )}
        >
          {description}
        </p>
      )}
    </Reveal>
  );
}
