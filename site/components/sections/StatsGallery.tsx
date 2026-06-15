import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
import PhotoPlaceholder from "@/components/ui/PhotoPlaceholder";
import { ShieldCheck, Camera, ThumbsUp, Play } from "lucide-react";

const socials = [Camera, ThumbsUp, Play];

export default function StatsGallery() {
  return (
    <section className="bg-(--color-primary) py-12 sm:py-16">
      <Container>
        <Reveal stagger={0.08} className="grid grid-cols-2 gap-3 sm:grid-cols-4">
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

          <div className="flex aspect-square flex-col justify-between rounded-2xl bg-(--color-primary-tint) p-5">
            <ShieldCheck size={28} className="text-(--color-primary)" />
            <div>
              <span className="font-display text-4xl font-black text-(--color-primary)">100%</span>
              <p className="mt-1 text-sm font-semibold text-(--color-primary)/70">Equipe treinada</p>
            </div>
          </div>

          <div className="relative aspect-square overflow-hidden rounded-2xl">
            <PhotoPlaceholder
              tone="dark"
              label="Foto: equipe do restaurante"
              className="h-full w-full rounded-none border-0"
            />
            <div className="absolute inset-x-0 bottom-0 flex justify-center gap-2 p-3">
              {socials.map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="flex h-8 w-8 items-center justify-center rounded-full bg-(--color-primary-tint) text-(--color-primary) transition-transform hover:scale-110"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
