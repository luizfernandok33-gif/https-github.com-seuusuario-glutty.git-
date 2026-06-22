import type { ReactNode } from "react";
import clsx from "clsx";

interface ButtonProps {
  children: ReactNode;
  href?: string;
  type?: "button" | "submit";
  disabled?: boolean;
  variant?: "primary" | "secondary" | "tint" | "ghost" | "ghost-light";
  className?: string;
  icon?: ReactNode;
  onClick?: () => void;
}

export default function Button({
  children,
  href = "#",
  type,
  disabled,
  variant = "primary",
  className,
  icon,
  onClick,
}: ButtonProps) {
  const base =
    "group inline-flex items-center justify-center gap-2 rounded-full px-7 py-3.5 font-semibold tracking-tight transition-all duration-300 ease-out will-change-transform";

  const variants = {
    primary:
      "bg-(--color-accent) text-white shadow-[0_10px_30px_-10px_rgba(252,105,4,0.6)] hover:shadow-[0_14px_36px_-8px_rgba(252,105,4,0.7)] hover:-translate-y-0.5 hover:scale-[1.02] disabled:opacity-50 disabled:pointer-events-none disabled:hover:translate-y-0 disabled:hover:scale-100",
    secondary:
      "bg-(--color-primary) text-(--color-primary-tint) hover:-translate-y-0.5 hover:scale-[1.02] hover:bg-(--color-primary-shade) disabled:opacity-50 disabled:pointer-events-none disabled:hover:translate-y-0 disabled:hover:scale-100",
    tint:
      "bg-(--color-primary-tint) text-(--color-primary) hover:-translate-y-0.5 hover:scale-[1.02] hover:bg-(--color-leaf) disabled:opacity-50 disabled:pointer-events-none disabled:hover:translate-y-0 disabled:hover:scale-100",
    ghost:
      "border-2 border-(--color-primary)/15 text-(--color-primary) hover:border-(--color-primary)/40 hover:-translate-y-0.5 bg-white/40 disabled:opacity-50 disabled:pointer-events-none disabled:hover:translate-y-0",
    "ghost-light":
      "border-2 border-white/15 text-(--color-cream) hover:border-white/40 hover:-translate-y-0.5 bg-white/5 disabled:opacity-50 disabled:pointer-events-none disabled:hover:translate-y-0",
  };

  const content = (
    <>
      {children}
      {icon && (
        <span className="transition-transform duration-300 group-hover:translate-x-1">{icon}</span>
      )}
    </>
  );

  if (type) {
    return (
      <button type={type} disabled={disabled} onClick={onClick} className={clsx(base, variants[variant], className)}>
        {content}
      </button>
    );
  }

  return (
    <a href={href} onClick={onClick} className={clsx(base, variants[variant], className)}>
      {content}
    </a>
  );
}
