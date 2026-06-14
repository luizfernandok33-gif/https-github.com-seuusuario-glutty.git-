import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import { Soup, Salad, ChefHat, BookOpen, HandHeart, Megaphone } from "lucide-react";

const events = [
  {
    icon: Soup,
    title: "Feiras gastronômicas sem glúten",
    description: "Espaços para apresentar seus pratos sem glúten diretamente para a comunidade celíaca.",
  },
  {
    icon: Salad,
    title: "Degustações seguras",
    description: "Experiências guiadas em que a comunidade conhece seu cardápio com tranquilidade.",
  },
  {
    icon: ChefHat,
    title: "Workshops com chefs e nutricionistas",
    description: "Trocas práticas sobre receitas, substituições e técnicas para cozinha sem glúten.",
  },
  {
    icon: BookOpen,
    title: "Palestras com especialistas",
    description: "Conteúdo sobre doença celíaca, sensibilidade ao glúten e segurança alimentar.",
  },
  {
    icon: HandHeart,
    title: "Encontros da comunidade celíaca",
    description: "Momentos para aproximar pessoas celíacas dos restaurantes parceiros, pessoalmente.",
  },
  {
    icon: Megaphone,
    title: "Ações educativas sobre contaminação cruzada",
    description: "Conteúdos e dinâmicas para reforçar boas práticas entre equipes e clientes.",
  },
];

export default function Eventos() {
  return (
    <section id="eventos" className="relative bg-(--color-accent-tint) py-24 sm:py-32">
      <Container>
        <SectionHeading
          eyebrow="Eventos Glútty"
          title="Feiras, degustações e encontros que aproximam você da comunidade"
          description="Além do app, o Glútty promove momentos presenciais para conectar restaurantes parceiros à comunidade celíaca — fortalecendo relacionamento, confiança e troca de conhecimento."
        />

        <Reveal stagger={0.08} className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {events.map(({ icon: Icon, title, description }) => (
            <div
              key={title}
              className="group rounded-3xl bg-white p-7 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_20px_45px_-20px_rgba(252,105,4,0.3)]"
            >
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-(--color-accent)/12 text-(--color-accent) transition-colors duration-300 group-hover:bg-(--color-accent) group-hover:text-white">
                <Icon size={22} strokeWidth={2.2} />
              </div>
              <h3 className="font-display text-lg font-semibold text-(--color-primary)">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-(--color-ink-soft)">{description}</p>
            </div>
          ))}
        </Reveal>
      </Container>
    </section>
  );
}
