"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Button from "@/components/ui/Button";
import LanguageToggle from "@/components/ui/LanguageToggle";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { ArrowRight } from "lucide-react";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const { t } = useLanguage();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 bg-[#F7FAF3] transition-shadow duration-300 ${
        scrolled ? "shadow-[0_8px_30px_-12px_rgba(20,47,23,0.25)]" : ""
      }`}
    >
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-4 py-4 lg:px-8">
        <a href="#top" className="flex items-center">
          <Image src="/logo-glutty.webp" alt="Glútty" width={252} height={100} priority className="h-9 w-auto sm:h-10" />
        </a>

        <nav className="hidden items-center gap-1 lg:flex">
          {t.nav.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="rounded-full px-3.5 py-2 text-sm font-semibold text-(--color-primary)/80 transition-colors hover:bg-(--color-primary)/8 hover:text-(--color-primary)"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <LanguageToggle />
          <div className="hidden sm:block">
            <Button
              href="#cta"
              variant="secondary"
              className="whitespace-nowrap px-5 py-2.5 text-sm"
              icon={<ArrowRight size={16} />}
            >
              {t.ctaLabel}
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
