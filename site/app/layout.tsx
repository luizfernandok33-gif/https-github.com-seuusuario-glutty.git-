import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import { LanguageProvider } from "@/lib/i18n/LanguageContext";
import "./globals.css";

const nunito = Nunito({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-nunito",
});

const siteUrl = "https://https-github-com-seuusuario-glutty.vercel.app";
const title = "Glútty para Restaurantes — Faça parte da comunidade celíaca";
const description =
  "Leve seu restaurante para uma comunidade que busca comer sem medo. Conheça o programa de parceria, treinamento e certificação Glútty.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title,
  description,
  openGraph: {
    type: "website",
    url: siteUrl,
    title,
    description,
    siteName: "Glútty",
    locale: "pt_BR",
    images: [{ url: "/selo-glutty.webp", width: 1620, height: 971, alt: "Selo Glútty Verificado" }],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/selo-glutty.webp"],
  },
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
    <html lang="pt-BR" className={nunito.variable}>
      <body className="antialiased">
        <div className="grain" />
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}
