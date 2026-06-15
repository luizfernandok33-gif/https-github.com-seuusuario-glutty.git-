import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import PillCard from "@/components/ui/PillCard";
import PhotoPlaceholder from "@/components/ui/PhotoPlaceholder";
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
    <section id="beneficios" className="relative overflow-hidden bg-(--color-primary) py-24 sm:py-32">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-40 top-1/3 h-[26rem] w-[26rem] rounded-full bg-(--color-primary-tint)/10 blur-[120px]" />
      </div>

      <Container className="relative z-10">
        <SectionHeading
          eyebrow="Sobre o Glútty"
          title="Sua marca, perto de quem mais precisa de transparência"
          description="A comunidade celíaca está, todos os dias, em busca de lugares onde possa comer com mais confiança. O Glútty é a ponte entre essa comunidade e restaurantes que se preparam de verdade para recebê-la."
          align="center"
          tone="light"
          className="mx-auto"
        />

        <div className="mt-16 grid items-stretch gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
          <Reveal>
            <PillCard className="relative h-full min-h-[360px] overflow-hidden border border-white/10 bg-white/[0.02]">
              <PhotoPlaceholder
                tone="light"
                label="Foto: equipe do restaurante parceiro recebendo a comunidade Glútty"
              />
            </PillCard>
          </Reveal>

          <div>
            <Reveal>
              <span className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.18em] text-(--color-primary-tint)">
                O que oferecemos
              </span>
              <h3 className="font-display text-2xl font-semibold leading-tight text-(--color-cream) sm:text-3xl">
                Vantagens de fazer parte da comunidade Glútty
              </h3>
            </Reveal>

            <Reveal stagger={0.08} className="mt-8 grid gap-6 sm:grid-cols-2">
              {items.map(({ icon: Icon, title, description }) => (
                <div key={title} className="flex items-start gap-3">
                  <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-white/10 text-(--color-primary-tint)">
                    <Icon size={18} strokeWidth={2.2} />
                  </span>
                  <div>
                    <p className="font-display text-sm font-semibold text-(--color-cream)">{title}</p>
                    <p className="mt-1 text-sm leading-relaxed text-(--color-cream)/55">{description}</p>
                  </div>
                </div>
              ))}
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  );
}
