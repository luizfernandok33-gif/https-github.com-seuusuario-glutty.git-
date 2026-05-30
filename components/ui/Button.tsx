"use client";
import { forwardRef } from "react";

/**
 * Glútty Button Design System
 *
 * Variants:
 *  primary   — ação principal       bg #C6F59D  | text #1F3D34
 *  secondary — ação alternativa     border #1F3D34 | text #1F3D34
 *  soft      — ênfase baixa         bg verde claro translúcido | text #1F3D34
 *  ghost     — inline / texto puro  sem bg | text #1F3D34
 *  danger    — ação destrutiva      bg #FDECEC | text/border #E53935
 *
 * Sizes:
 *  lg  — py-4  text-base  (CTA full-width)
 *  md  — py-3  text-sm    (botão regular)
 *  sm  — py-2  text-xs    (chip / inline)
 */

type Variant = "primary" | "secondary" | "soft" | "ghost" | "danger";
type Size    = "lg" | "md" | "sm";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  fullWidth?: boolean;
  children: React.ReactNode;
}

const variantStyles: Record<Variant, React.CSSProperties> = {
  primary: {
    backgroundColor: "#C6F59D",
    color: "#1F3D34",
    border: "none",
  },
  secondary: {
    backgroundColor: "transparent",
    color: "#1F3D34",
    border: "1.5px solid #1F3D34",
  },
  soft: {
    backgroundColor: "rgba(198,245,157,0.28)",
    color: "#1F3D34",
    border: "none",
  },
  ghost: {
    backgroundColor: "transparent",
    color: "#1F3D34",
    border: "none",
  },
  danger: {
    backgroundColor: "#FDECEC",
    color: "#E53935",
    border: "1.5px solid rgba(229,57,53,0.35)",
  },
};

const sizeClasses: Record<Size, string> = {
  lg: "py-4 px-6 text-base font-bold",
  md: "py-3 px-5 text-sm font-bold",
  sm: "py-2 px-4 text-xs font-semibold",
};

const disabledStyles: React.CSSProperties = {
  backgroundColor: "#E2F5CC",
  color: "#8AAF7A",
  border: "none",
  cursor: "not-allowed",
  opacity: 0.7,
};

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = "primary",
      size = "lg",
      fullWidth = false,
      children,
      disabled,
      className = "",
      style,
      ...rest
    },
    ref
  ) => {
    const baseClass = [
      "rounded-full",
      "text-center",
      "transition-transform",
      "active:scale-95",
      "leading-none",
      sizeClasses[size],
      fullWidth ? "w-full block" : "inline-flex items-center justify-center",
      className,
    ]
      .filter(Boolean)
      .join(" ");

    const computedStyle: React.CSSProperties = {
      ...(disabled ? disabledStyles : variantStyles[variant]),
      ...style,
    };

    return (
      <button
        ref={ref}
        disabled={disabled}
        className={baseClass}
        style={computedStyle}
        {...rest}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
export default Button;
