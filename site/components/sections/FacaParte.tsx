import Image from "next/image";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import { CheckCircle2 } from "lucide-react";

const items = [
  "Avaliações da comunidade sobre sabor, atendimento, clareza e segurança",
  "Feiras gastronômicas sem glúten",
  "Degustações seguras e guiadas pelo cardápio",
  "Workshops e palestras com chefs e especialistas",
  "Encontros presenciais sobre contaminação cruzada",
];

export default function FacaParte() {
  return (
    <section id="faca-parte" className="relative overflow-hidden bg-(--color-leaf) py-24 sm:py-32">
      <Container className="grid items-center gap-14 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <SectionHeading
            eyebrow="Faça Parte"
            title="Uma comunidade que avalia com cuidado — e constrói confiança"
            description="Pessoas celíacas avaliam restaurantes parceiros em sabor, atendimento, clareza e segurança — construindo uma rede de confiança. Além do app, o Glútty promove feiras, degustações, workshops e encontros presenciais."
          />

          <Reveal stagger={0.06} className="mt-8 space-y-3">
            {items.map((item) => (
              <div key={item} className="flex items-start gap-3">
                <CheckCircle2 size={20} className="mt-0.5 flex-shrink-0 text-(--color-primary)" />
                <p className="text-base leading-relaxed text-(--color-primary)/85">{item}</p>
              </div>
            ))}
          </Reveal>
        </div>

        <Reveal delay={0.1}>
          <div className="relative aspect-[4/5] overflow-hidden rounded-[2.5rem] sm:rounded-[3rem]">
            <Image src="/comunidade-evento.webp" alt="Comunidade Glútty em evento" fill className="object-cover" />
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
