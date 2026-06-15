import type { Metadata } from "next";
import { Nunito, Archivo_Black } from "next/font/google";
import "./globals.css";

const nunito = Nunito({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-nunito",
});

const archivoBlack = Archivo_Black({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-archivo-black",
});

export const metadata: Metadata = {
  title: "Glútty para Restaurantes — Faça parte da comunidade celíaca",
  description:
    "Leve seu restaurante para uma comunidade que busca comer sem medo. Conheça o programa de parceria, treinamento e certificação Glútty.",
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={`${nunito.variable} ${archivoBlack.variable}`}>
      <body className="antialiased">
        <div className="grain" />
        {children}
      </body>
    </html>
  );
}
