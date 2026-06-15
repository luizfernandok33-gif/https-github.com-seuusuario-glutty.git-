"use client";

import { useEffect, useState } from "react";
import Button from "@/components/ui/Button";
import { ArrowRight } from "lucide-react";

const links = [
  { label: "Por que participar", href: "#beneficios" },
  { label: "Exigências", href: "#exigencias" },
  { label: "Treinamento", href: "#treinamento" },
  { label: "Selo Glútty", href: "#certificacao" },
  { label: "Comunidade", href: "#comunidade" },
  { label: "Eventos", href: "#eventos" },
  { label: "Como funciona", href: "#como-funciona" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 bg-(--color-cream) transition-shadow duration-300 ${
        scrolled ? "shadow-[0_8px_30px_-12px_rgba(31,61,52,0.25)]" : ""
      }`}
    >
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-4 py-4 lg:px-8">
        <a href="#top" className="flex items-center gap-1 font-display text-2xl font-bold text-(--color-primary)">
          Gl<span className="text-(--color-leaf)">ú</span>tty
        </a>

        <nav className="hidden items-center gap-1 lg:flex">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="rounded-full px-3.5 py-2 text-sm font-semibold text-(--color-primary)/80 transition-colors hover:bg-(--color-primary)/8 hover:text-(--color-primary)"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <Button href="#cta" variant="primary" className="px-5 py-2.5 text-sm" icon={<ArrowRight size={16} />}>
          Quero ser parceiro
        </Button>
      </div>
    </header>
  );
}
