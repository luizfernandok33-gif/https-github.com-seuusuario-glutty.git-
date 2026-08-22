"use client";

import { useState } from "react";

const NAV_LINKS = [
  { href: "#sobre", label: "Sobre" },
  { href: "#servicos", label: "Serviços" },
  { href: "#consultoria", label: "Consultoria" },
  { href: "#processo", label: "Processo" },
  { href: "#ferramentas", label: "Ferramentas" },
  { href: "#projeto", label: "Projeto" },
];

export default function SiteHeader() {
  const [open, setOpen] = useState(false);

  const closeMenu = () => setOpen(false);

  return (
    <header>
      <nav>
        <a href="#" className="logo" aria-label="Astroluz — página inicial">
          <span className="logo-text">Astroluz</span>
        </a>
        <button
          className="burger"
          id="burger"
          aria-label="Abrir menu"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          ☰
        </button>
        <div className={`nav-links${open ? " open" : ""}`} id="navLinks">
          {NAV_LINKS.map((link) => (
            <a key={link.href} href={link.href} onClick={closeMenu}>
              {link.label}
            </a>
          ))}
          <a href="#contato" className="nav-cta" onClick={closeMenu}>
            Contato ↗
          </a>
        </div>
      </nav>
    </header>
  );
}
