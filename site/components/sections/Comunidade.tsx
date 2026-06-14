import Image from "next/image";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import { Star } from "lucide-react";

const criteria = [
  { label: "Sabor do prato sem glúten", value: 92 },
  { label: "Atendimento e cuidado da equipe", value: 88 },
  { label: "Clareza das informações", value: 95 },
  { label: "Segurança percebida", value: 85 },
];

function Stars({ value }: { value: number }) {
  const filled = Math.round((value / 100) * 5);
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          size={14}
          className={i < filled ? "fill-(--color-accent) text-(--color-accent)" : "text-(--color-primary)/15"}
        />
      ))}
    </div>
  );
}

export default function Comunidade() {
  return (
    <section
      id="comunidade"
      className="relative overflow-hidden bg-gradient-to-b from-(--color-cream) via-(--color-primary-tint)/25 to-(--color-cream) py-24 sm:py-32"
    >
      <Container className="grid items-center gap-14 lg:grid-cols-[1fr_0.95fr]">
        <SectionHeading
          eyebrow="Comunidade Glútty"
          title="Uma comunidade que avalia com cuidado — e constrói confiança"
          description="Pessoas celíacas avaliam restaurantes parceiros em critérios que vão além da nota geral: sabor do prato sem glúten, atendimento, clareza das informações e segurança percebida. Essa rede de confiança ajuda outras pessoas da comunidade a escolher onde comer — e ajuda você a entender exatamente onde focar para melhorar."
        />

        <Reveal delay={0.1}>
          <div className="relative mx-auto w-full max-w-md rounded-[2rem] border border-(--color-primary)/8 bg-white p-7 shadow-[0_30px_70px_-30px_rgba(31,61,52,0.3)]">
            <div className="flex items-center gap-4 border-b border-(--color-primary)/8 pb-5">
              <Image
                src="/mascote-comunidade.png"
                alt="Comunidade Glútty"
                width={64}
                height={64}
                className="h-14 w-14 rounded-2xl object-cover"
              />
              <div>
                <p className="font-display text-lg font-semibold text-(--color-primary)">
                  Avaliação da comunidade
                </p>
                <p className="text-xs uppercase tracking-[0.15em] text-(--color-ink-soft)">
                  Exemplo ilustrativo de perfil
                </p>
              </div>
            </div>

            <div className="mt-5 space-y-4">
              {criteria.map(({ label, value }) => (
                <div key={label}>
                  <div className="mb-1.5 flex items-center justify-between text-sm">
                    <span className="text-(--color-primary)/85">{label}</span>
                    <Stars value={value} />
                  </div>
                  <div className="h-2 w-full overflow-hidden rounded-full bg-(--color-primary)/8">
                    <div
                      className="h-full rounded-full bg-(--color-leaf)"
                      style={{ width: `${value}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>

            <p className="mt-5 text-xs leading-relaxed text-(--color-ink-soft)">
              Ilustração de como as avaliações da comunidade aparecem no perfil do restaurante
              dentro do app Glútty.
            </p>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
