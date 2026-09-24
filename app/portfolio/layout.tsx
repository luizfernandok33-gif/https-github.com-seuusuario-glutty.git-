import type { Metadata } from "next";
import { Source_Serif_4 } from "next/font/google";
import "./portfolio.css";

// Corpo do texto em serifada, como na leitura do Medium.
const serif = Source_Serif_4({
  subsets: ["latin"],
  style: ["normal", "italic"],
  axes: ["opsz"],
  variable: "--font-md-serif",
});

export const metadata: Metadata = {
  title: "Glútty: mais segurança e confiança para pessoas celíacas ao comer fora",
  description:
    "Estudo de caso UX/UI do Glútty, da pesquisa com 86 pessoas celíacas ao protótipo navegável, por Luiz Fernando Mendes.",
};

export default function PortfolioLayout({ children }: { children: React.ReactNode }) {
  return <div className={`${serif.variable} md-root`}>{children}</div>;
}
