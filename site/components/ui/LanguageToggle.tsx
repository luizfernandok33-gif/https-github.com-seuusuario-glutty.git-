"use client";

import clsx from "clsx";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import type { Lang } from "@/lib/i18n/translations";

const options: { code: Lang; label: string }[] = [
  { code: "pt", label: "PT" },
  { code: "en", label: "EN" },
];

export default function LanguageToggle({ className }: { className?: string }) {
  const { lang, setLang } = useLanguage();

  return (
    <div className={clsx("inline-flex items-center rounded-full bg-(--color-primary)/8 p-1 text-xs font-bold", className)}>
      {options.map(({ code, label }) => (
        <button
          key={code}
          type="button"
          onClick={() => setLang(code)}
          aria-pressed={lang === code}
          className={clsx(
            "rounded-full px-2.5 py-1 transition-colors",
            lang === code
              ? "bg-(--color-primary) text-(--color-primary-tint)"
              : "text-(--color-primary)/60 hover:text-(--color-primary)"
          )}
        >
          {label}
        </button>
      ))}
    </div>
  );
}
