import Container from "@/components/ui/Container";

const links = [
  { label: "Por que participar", href: "#beneficios" },
  { label: "Exigências", href: "#exigencias" },
  { label: "Treinamento", href: "#treinamento" },
  { label: "Selo Glútty", href: "#certificacao" },
  { label: "Comunidade", href: "#comunidade" },
  { label: "Eventos", href: "#eventos" },
  { label: "Como funciona", href: "#como-funciona" },
];

export default function Footer() {
  return (
    <footer className="bg-(--color-primary-shade) py-16">
      <Container className="flex flex-col gap-10 sm:flex-row sm:items-start sm:justify-between">
        <div className="max-w-sm">
          <span className="font-display text-2xl font-bold text-(--color-cream)">
            Gl<span className="text-(--color-primary-tint)">ú</span>tty
          </span>
          <p className="mt-4 text-sm leading-relaxed text-(--color-cream)/60">
            O Glútty conecta a comunidade celíaca a restaurantes preparados, treinados e
            transparentes — para que comer fora possa ser, cada vez mais, uma experiência sem
            medo.
          </p>
        </div>

        <nav className="grid grid-cols-2 gap-2 text-sm sm:grid-cols-1">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-(--color-cream)/70 transition-colors hover:text-(--color-primary-tint)"
            >
              {link.label}
            </a>
          ))}
        </nav>
      </Container>

      <Container className="mt-12 flex flex-col gap-3 border-t border-white/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs text-(--color-cream)/40">
          Copyright © {new Date().getFullYear()} Glútty by Luiz Fernando Mendes
        </p>
        <p className="text-xs text-(--color-cream)/40">
          O Selo Glútty Verificado não constitui garantia de ausência total de risco de
          contaminação cruzada.
        </p>
      </Container>
    </footer>
  );
}
