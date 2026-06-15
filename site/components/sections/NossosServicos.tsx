import Image from "next/image";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import PhotoPlaceholder from "@/components/ui/PhotoPlaceholder";
import { ArrowRight } from "lucide-react";

const services = [
  {
    title: "Cardápio e transparência",
    description:
      "Cardápio sem glúten real, identificado e sempre atualizado, com transparência total sobre ingredientes, rótulos e fornecedores.",
    photoLabel: "Foto: cardápio sem glúten do restaurante parceiro",
    photo: "/cardapio-sem-gluten.webp",
  },
  {
    title: "Prevenção de contaminação cruzada",
    description:
      "Processos definidos para evitar contaminação cruzada, com separação correta de utensílios, superfícies e áreas de preparo.",
    photoLabel: "Foto: cozinha organizada do restaurante parceiro",
    photo: "/cozinha-organizada.webp",
  },
  {
    title: "Treinamento obrigatório da equipe",
    description:
      "Da cozinha ao salão, toda a equipe passa pelo treinamento Glútty sobre doença celíaca, segurança alimentar e atendimento ao cliente celíaco.",
    photoLabel: "Foto: equipe durante o treinamento Glútty",
    photo: "/treinamento-glutty.webp",
  },
];

export default function NossosServicos() {
  return (
    <section id="servicos" className="relative overflow-hidden bg-(--color-primary-shade) py-24 sm:py-32">
      <Container className="relative z-10">
        <SectionHeading
          eyebrow="Nossos Serviços"
          title="Como preparamos seu restaurante para a comunidade celíaca"
          description="Antes de receber o Selo Glútty Verificado, cada restaurante parceiro passa por um conjunto de exigências e treinamentos que deixam cardápio, processos e atendimento prontos para receber a comunidade celíaca com confiança."
          align="center"
          tone="light"
          className="mx-auto"
        />

        <Reveal stagger={0.08} className="mt-14 grid gap-6 sm:grid-cols-3">
          {services.map(({ title, description, photoLabel, photo }) => (
            <div key={title}>
              {photo ? (
                <div className="relative aspect-[328/435] overflow-hidden rounded-2xl">
                  <Image src={photo} alt={photoLabel} fill className="object-cover" />
                </div>
              ) : (
                <PhotoPlaceholder
                  tone="light"
                  label={photoLabel}
                  className="aspect-[328/435] rounded-2xl border-0 bg-white/[0.03]"
                />
              )}
              <h3 className="mt-5 font-display text-xl font-semibold text-(--color-cream)">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-(--color-cream)/60">{description}</p>
              <a
                href="#cta"
                className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-(--color-primary-tint) transition-colors hover:text-(--color-leaf)"
              >
                Saiba mais
                <ArrowRight size={14} />
              </a>
            </div>
          ))}
        </Reveal>
      </Container>
    </section>
  );
}
