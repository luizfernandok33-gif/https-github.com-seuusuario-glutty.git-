import clsx from "clsx";

export default function NumberMark({
  index,
  tone = "dark",
  className,
}: {
  index: number;
  tone?: "dark" | "light";
  className?: string;
}) {
  return (
    <span
      className={clsx(
        "font-display text-3xl font-bold leading-none tracking-tight tabular-nums sm:text-4xl",
        tone === "light" ? "text-(--color-primary-tint)/35" : "text-(--color-primary)/15",
        className
      )}
    >
      {String(index).padStart(2, "0")}
    </span>
  );
}
