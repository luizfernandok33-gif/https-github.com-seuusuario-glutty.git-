import Image from "next/image";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import Reveal from "@/components/ui/Reveal";
import { ArrowRight } from "lucide-react";

export default function CTAFinal() {
  return (
    <section id="cta" className="relative overflow-hidden bg-(--color-primary-tint) py-24 sm:py-32">
      <div className="pointer-events-none absolute inset-0">
        <div className="blob absolute -left-24 -top-24 h-72 w-72 bg-(--color-primary)/8" />
        <div className="blob absolute -right-16 bottom-0 h-80 w-80 bg-(--color-accent)/10" />
      </div>

      <Container className="relative z-10 grid items-center gap-12 lg:grid-cols-[1.1fr_0.8fr]">
        <Reveal>
          <span className="mb-5 inline-flex items-center gap-2 rounded-full bg-(--color-primary)/10 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.18em] text-(--color-primary)">
            Faça parte do Glútty
          </span>
          <h2 className="font-display text-4xl font-semibold leading-[1.1] tracking-tight text-(--color-primary) sm:text-5xl lg:text-[3.4rem]">
            Prepare seu restaurante para receber melhor a comunidade celíaca.
          </h2>
          <p className="mt-5 max-w-lg text-lg leading-relaxed text-(--color-primary)/70">
            Treinamento, certificação, presença no app e uma comunidade pronta para confiar em
            quem se importa de verdade com segurança alimentar.
          </p>
          <div className="mt-9 flex flex-wrap items-center gap-4">
            <Button href="#" variant="secondary" icon={<ArrowRight size={18} />}>
              Quero ser parceiro do Glútty
            </Button>
            <Button href="#treinamento" variant="ghost">
              Conhecer o treinamento
            </Button>
          </div>
        </Reveal>

        <Reveal delay={0.1} className="relative mx-auto h-[280px] w-full max-w-sm sm:h-[360px]">
          <Image
            src="/mascote-prato.png"
            alt="Mascote Glútty com prato e selo de verificação"
            fill
            className="object-contain drop-shadow-2xl"
          />
        </Reveal>
      </Container>
    </section>
  );
}
