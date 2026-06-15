import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
import PhotoPlaceholder from "@/components/ui/PhotoPlaceholder";

export default function StatsGallery() {
  return (
    <section className="bg-(--color-primary) py-12 sm:py-16">
      <Container>
        <Reveal stagger={0.08} className="grid grid-cols-1 gap-3 sm:grid-cols-3">
          <PhotoPlaceholder
            tone="dark"
            label="Foto: salão do restaurante parceiro"
            className="aspect-square rounded-2xl border-0"
          />
          <PhotoPlaceholder
            tone="dark"
            label="Foto: prato preparado sem glúten"
            className="aspect-square rounded-2xl border-0"
          />
          <PhotoPlaceholder
            tone="dark"
            label="Foto: equipe do restaurante"
            className="aspect-square rounded-2xl border-0"
          />
        </Reveal>
      </Container>
    </section>
  );
}
