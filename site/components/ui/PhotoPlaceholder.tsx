import { ImageIcon } from "lucide-react";
import clsx from "clsx";

export default function PhotoPlaceholder({
  label,
  tone = "light",
  iconSize = 28,
  className,
}: {
  label?: string;
  tone?: "light" | "dark";
  iconSize?: number;
  className?: string;
}) {
  return (
    <div
      className={clsx(
        "flex h-full w-full flex-col items-center justify-center gap-3 border-2 border-dashed px-6 text-center",
        tone === "light"
          ? "border-white/15 bg-white/[0.03] text-(--color-cream)/45"
          : "border-(--color-primary)/15 bg-(--color-primary)/[0.03] text-(--color-primary)/35",
        className
      )}
    >
      <ImageIcon size={iconSize} strokeWidth={1.5} />
      {label && (
        <span className="max-w-[16rem] text-xs font-semibold uppercase tracking-[0.15em]">{label}</span>
      )}
    </div>
  );
}
