import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import { Eye, ShieldCheck, MapPin, MessageCircle, GraduationCap, Calendar } from "lucide-react";

const items = [
  {
    icon: Eye,
    title: "Visibilidade qualificada",
    description:
      "Seu restaurante aparece para uma comunidade que já está em busca de opções seguras — sem precisar competir por atenção genérica.",
  },
  {
    icon: ShieldCheck,
    title: "Confiança construída com transparência",
    description:
      "Mostrar seus processos, ingredientes e cuidados constrói uma reputação que avaliações comuns não conseguem.",
  },
  {
    icon: MapPin,
    title: "Presença no app Glútty",
    description:
      "Seu restaurante no mapa, na busca por categoria e nas recomendações personalizadas para a comunidade celíaca.",
  },
  {
    icon: MessageCircle,
    title: "Avaliações da comunidade",
    description:
      "Feedback real sobre prato, atendimento, clareza e segurança — informações valiosas para melhorar continuamente.",
  },
  {
    icon: GraduationCap,
    title: "Destaque pelo treinamento",
    description:
      "Equipes certificadas recebem destaque especial, mostrando que o cuidado do seu restaurante vai além do cardápio.",
  },
  {
    icon: Calendar,
    title: "Participação em eventos Glútty",
    description:
      "Feiras, degustações seguras e workshops aproximam o seu restaurante da comunidade celíaca pessoalmente.",
  },
];

export default function PorQueParticipar() {
  return (
    <section id="beneficios" className="relative bg-(--color-cream) py-24 sm:py-32">
      <Container>
        <SectionHeading
          eyebrow="Por que participar"
          title="Sua marca, perto de quem mais precisa de transparência"
          description="A comunidade celíaca está, todos os dias, em busca de lugares onde possa comer com mais confiança. O Glútty é a ponte entre essa comunidade e restaurantes que se preparam de verdade para recebê-la."
        />

        <Reveal stagger={0.08} className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {items.map(({ icon: Icon, title, description }) => (
            <div
              key={title}
              className="group rounded-3xl border border-(--color-primary)/8 bg-white p-7 transition-all duration-300 hover:-translate-y-1.5 hover:border-(--color-primary)/15 hover:shadow-[0_20px_45px_-20px_rgba(31,61,52,0.25)]"
            >
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-(--color-primary-tint)/40 text-(--color-primary) transition-colors duration-300 group-hover:bg-(--color-primary) group-hover:text-(--color-primary-tint)">
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
