import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";

// Valores de exemplo — substituir pelos números reais do Glútty quando disponíveis.
const stats = [
  { value: "500", suffix: "+", label: "Restaurantes parceiros" },
  { value: "12 mil", suffix: "+", label: "Pessoas na comunidade celíaca" },
  { value: "100", suffix: "%", label: "Equipes treinadas e certificadas" },
  { value: "50", suffix: "+", label: "Cidades com restaurantes parceiros" },
  { value: "4 mil", suffix: "+", label: "Avaliações da comunidade" },
];

export default function Numeros() {
  return (
    <section className="bg-(--color-primary) py-16 sm:py-20">
      <Container>
        <Reveal stagger={0.08} className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3 lg:grid-cols-5">
          {stats.map((stat) => (
            <div key={stat.label}>
              <span className="font-display text-4xl font-black text-(--color-cream) sm:text-5xl">
                {stat.value}
                <span className="text-(--color-primary-tint)">{stat.suffix}</span>
              </span>
              <p className="mt-2 text-sm leading-snug text-(--color-cream)/55">{stat.label}</p>
            </div>
          ))}
        </Reveal>
      </Container>
    </section>
  );
}
