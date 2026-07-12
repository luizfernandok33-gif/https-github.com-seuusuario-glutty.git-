import type { Metadata } from "next";

const description =
  "Marketing digital para brasileiros empreendedores em Zurique: identidade visual, campanhas, social media, Google Ads, sites, apps e UX/Product Design. Deixe seu contato e receba uma proposta.";

export const metadata: Metadata = {
  title: "Luiz — Digital Marketing",
  description,
  openGraph: {
    title: "Luiz — Digital Marketing",
    description,
    locale: "pt_BR",
    type: "website",
    images: [{ url: "/logo-luiz.png", width: 799, height: 250 }],
  },
};

export default function AgenciaLayout({ children }: { children: React.ReactNode }) {
  return children;
}
