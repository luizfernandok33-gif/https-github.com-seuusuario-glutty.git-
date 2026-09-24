import type { Metadata } from "next";
import { Fraunces } from "next/font/google";
import "./portfolio.css";

const fraunces = Fraunces({
  subsets: ["latin"],
  style: ["normal", "italic"],
  axes: ["opsz", "SOFT"],
  variable: "--font-fraunces",
});

export const metadata: Metadata = {
  title: "Glútty — Estudo de caso UX/UI",
  description:
    "Da pesquisa com 86 pessoas celíacas ao protótipo navegável: como o Glútty ajuda a comer fora com segurança.",
};

export default function PortfolioLayout({ children }: { children: React.ReactNode }) {
  return <div className={`${fraunces.variable} pf-root`}>{children}</div>;
}
