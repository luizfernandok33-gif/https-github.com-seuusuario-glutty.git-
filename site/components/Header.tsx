"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Button from "@/components/ui/Button";
import LanguageToggle from "@/components/ui/LanguageToggle";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { ArrowRight, Menu, X } from "lucide-react";
import clsx from "clsx";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { t } = useLanguage();
  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;

    const onClickOutside = (e: MouseEvent) => {
      if (headerRef.current && !headerRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    };
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };

    document.addEventListener("mousedown", onClickOutside);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onClickOutside);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [menuOpen]);

  return (
    <header
      ref={headerRef}
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

        <div className="flex items-center gap-2 sm:gap-3">
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

          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={t.menuLabel}
            className="flex h-10 w-10 items-center justify-center rounded-full text-(--color-primary) transition-colors hover:bg-(--color-primary)/8 lg:hidden"
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      <div
        id="mobile-menu"
        className={clsx(
          "overflow-hidden transition-[max-height,opacity] duration-300 ease-out lg:hidden",
          menuOpen ? "max-h-[26rem] opacity-100" : "max-h-0 opacity-0"
        )}
      >
        <nav className="flex flex-col gap-1 border-t border-(--color-primary)/10 px-4 py-3">
          {t.nav.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="rounded-xl px-4 py-3 text-base font-semibold text-(--color-primary)/80 transition-colors hover:bg-(--color-primary)/8 hover:text-(--color-primary)"
            >
              {link.label}
            </a>
          ))}

          <Button
            href="#cta"
            variant="secondary"
            onClick={() => setMenuOpen(false)}
            className="mt-2 w-full justify-center px-5 py-3 text-sm sm:hidden"
            icon={<ArrowRight size={16} />}
          >
            {t.ctaLabel}
          </Button>
        </nav>
      </div>
    </header>
  );
}
