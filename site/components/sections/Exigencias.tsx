import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import { CheckCircle2 } from "lucide-react";

const requirements = [
  "Cardápio sem glúten real, identificado e atualizado",
  "Transparência sobre ingredientes, rótulos e fornecedores",
  "Processos definidos para evitar contaminação cruzada",
  "Equipe capacitada após o treinamento obrigatório Glútty",
  "Comunicação clara com o cliente sobre riscos e preparo",
  "Disposição para receber avaliações da comunidade, incluindo críticas construtivas",
  "Informações do restaurante sempre atualizadas no app",
];

export default function Exigencias() {
  return (
    <section id="exigencias" className="relative bg-(--color-cream-deep) py-24 sm:py-32">
      <Container className="grid items-start gap-14 lg:grid-cols-[1fr_1fr]">
        <SectionHeading
          eyebrow="Exigências para participar"
          title="O que pedimos para garantir uma experiência confiável"
          description={
            <>
              A confiança da comunidade celíaca é construída com critérios claros. Antes de
              entrar para o Glútty, todo restaurante parceiro precisa atender a alguns requisitos
              básicos — não como burocracia, mas como compromisso com quem vai confiar no seu
              espaço.
              <br />
              <br />
              Esses critérios fazem parte da declaração inicial do restaurante e são revisados ao
              longo da parceria.
            </>
          }
          className="lg:sticky lg:top-28"
        />

        <Reveal stagger={0.07}>
          <div className="rounded-[2rem] border border-(--color-primary)/8 bg-(--color-cream) p-3 shadow-[0_30px_60px_-30px_rgba(31,61,52,0.25)] sm:p-4">
            <ul className="divide-y divide-(--color-primary)/8">
              {requirements.map((req) => (
                <li key={req} className="flex items-start gap-4 px-4 py-5 sm:px-6">
                  <span className="mt-0.5 flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-(--color-primary-tint)/50 text-(--color-primary)">
                    <CheckCircle2 size={16} strokeWidth={2.5} />
                  </span>
                  <p className="text-base leading-snug text-(--color-primary)/90 sm:text-[1.05rem]">
                    {req}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
