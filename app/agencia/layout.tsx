import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Luíz Agência de Marketing Digital",
  description:
    "Logo, campanhas, social media, conteúdo, Google Ads, mídia paga, rádio e TV, fotografia, apps, sites e landing pages. Deixe seu contato e receba uma proposta.",
};

export default function AgenciaLayout({ children }: { children: React.ReactNode }) {
  return children;
}
