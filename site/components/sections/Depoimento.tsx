import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
import { Quote } from "lucide-react";

// Depoimento de exemplo — substituir por um relato real da comunidade Glútty quando disponível.
const testimonial = {
  quote:
    "Antes do Glútty eu evitava sair para comer, com medo de contaminação cruzada. Hoje escolho pelo Selo Verificado e me sinto segura para experimentar pratos novos com a minha família.",
  name: "Marina Souza",
  role: "Pessoa celíaca, usuária do app Glútty",
};

export default function Depoimento() {
  return (
    <section className="relative overflow-hidden bg-(--color-primary-shade) py-24 sm:py-32">
      <Container className="mx-auto max-w-3xl text-center">
        <Reveal>
          <Quote size={56} strokeWidth={1.5} className="mx-auto text-(--color-primary-tint)" />
        </Reveal>

        <Reveal delay={0.08}>
          <p className="mt-8 font-display text-2xl font-medium leading-relaxed text-(--color-cream) sm:text-3xl">
            “{testimonial.quote}”
          </p>
        </Reveal>

        <Reveal delay={0.16}>
          <div className="mt-8">
            <p className="font-display text-base font-semibold text-(--color-primary-tint)">{testimonial.name}</p>
            <p className="mt-1 text-sm text-(--color-cream)/60">{testimonial.role}</p>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
