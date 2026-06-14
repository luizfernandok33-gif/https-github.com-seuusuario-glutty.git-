import Reveal from "@/components/ui/Reveal";
import clsx from "clsx";

interface Stat {
  value: string;
  label: string;
}

export default function StatsBar({ stats, tone = "light" }: { stats: Stat[]; tone?: "light" | "dark" }) {
  const isLight = tone === "light";

  return (
    <Reveal stagger={0.08} className="grid grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-4">
      {stats.map((stat) => (
        <div key={stat.label} className="flex flex-col gap-1.5">
          <span
            className={clsx(
              "font-display text-4xl font-semibold tracking-tight sm:text-5xl",
              isLight ? "text-(--color-cream)" : "text-(--color-primary)"
            )}
          >
            {stat.value}
          </span>
          <span className={clsx("text-sm leading-snug", isLight ? "text-(--color-cream)/60" : "text-(--color-ink-soft)")}>
            {stat.label}
          </span>
        </div>
      ))}
    </Reveal>
  );
}
