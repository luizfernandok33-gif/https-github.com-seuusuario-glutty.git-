"use client";

import Image from "next/image";
import Container from "@/components/ui/Container";
import { Facebook, Instagram, Youtube } from "@/components/icons/SocialIcons";
import { useLanguage } from "@/lib/i18n/LanguageContext";

const socials = [
  { icon: Facebook, href: "#", label: "Facebook" },
  { icon: Instagram, href: "#", label: "Instagram" },
  { icon: Youtube, href: "#", label: "YouTube" },
];

const contactEmail = "luizfernando.cdc1@hotmail.com";

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="bg-(--color-primary-shade) py-16">
      <Container className="grid gap-12 sm:grid-cols-3 lg:grid-cols-[1.4fr_1fr_1fr]">
        <div className="max-w-sm">
          <Image src="/logo-glutty-white.webp" alt="Glútty" width={2000} height={796} className="h-8 w-auto" />
          <p className="mt-4 text-sm leading-relaxed text-(--color-cream)/60">{t.footer.description}</p>

          <div className="mt-6 flex gap-3">
            {socials.map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                className="flex h-9 w-9 items-center justify-center rounded-full bg-(--color-primary-tint)/15 text-(--color-primary-tint) transition-colors hover:bg-(--color-primary-tint) hover:text-(--color-primary)"
              >
                <Icon size={16} />
              </a>
            ))}
          </div>
        </div>

        <div>
          <p className="font-display text-sm font-semibold uppercase tracking-[0.18em] text-(--color-cream)">
            {t.footer.exploreHeading}
          </p>
          <nav className="mt-4 flex flex-col gap-2.5 text-sm">
            {t.nav.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-(--color-cream)/70 transition-colors hover:text-(--color-primary-tint)"
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>

        <div>
          <p className="font-display text-sm font-semibold uppercase tracking-[0.18em] text-(--color-cream)">
            {t.footer.contatoHeading}
          </p>
          <div className="mt-4 flex flex-col gap-2.5 text-sm text-(--color-cream)/70">
            <a href={`mailto:${contactEmail}`} className="transition-colors hover:text-(--color-primary-tint)">
              {contactEmail}
            </a>
            <a href="#cta" className="transition-colors hover:text-(--color-primary-tint)">
              {t.footer.partnerLink}
            </a>
          </div>
        </div>
      </Container>

      <Container className="mt-12 flex flex-col gap-3 border-t border-white/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs text-(--color-cream)/40">
          Copyright © {new Date().getFullYear()} Glútty by Luiz Fernando Mendes
        </p>
        <p className="text-xs text-(--color-cream)/40 sm:text-right">{t.footer.legalText}</p>
      </Container>
    </footer>
  );
}
