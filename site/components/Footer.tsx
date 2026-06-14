import Image from "next/image";
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
          <Image src="/glutty-logo.png" alt="Glútty" width={132} height={52} className="h-9 w-auto" />
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

      <Container className="mt-12 border-t border-white/10 pt-6">
        <p className="text-xs text-(--color-cream)/40">
          © {new Date().getFullYear()} Glútty. Comunicação informativa — o Selo Glútty Verificado
          não constitui garantia de ausência total de risco de contaminação cruzada.
        </p>
      </Container>
    </footer>
  );
}
