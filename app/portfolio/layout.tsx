import type { Metadata } from "next";
import { Figtree, Source_Serif_4 } from "next/font/google";
import "./portfolio.css";

// Corpo do texto em serifada, como na leitura do Medium.
const serif = Source_Serif_4({
  subsets: ["latin"],
  style: ["normal", "italic"],
  axes: ["opsz"],
  variable: "--font-md-serif",
});

// Fonte geométrica da capa do estudo de caso.
const cover = Figtree({
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  variable: "--font-md-cover",
});

export const metadata: Metadata = {
  title: "Glútty: Mais segurança e confiança para pessoas celíacas ao comer fora",
  description:
    "Uma solução digital desenvolvida para apoiar decisões alimentares mais seguras através de transparência, experiências compartilhadas e redução da insegurança alimentar.",
};

export default function PortfolioLayout({ children }: { children: React.ReactNode }) {
  return <div className={`${serif.variable} ${cover.variable} md-root`}>{children}</div>;
}
