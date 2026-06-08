import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import Script from "next/script";
import { LanguageProvider } from "@/lib/i18n/LanguageProvider";
import "./globals.css";

const nunito = Nunito({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-nunito",
});

export const metadata: Metadata = {
  title: "Glútty — Segurança em cada refeição",
  description: "Encontre restaurantes seguros para celíacos perto de você",
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      className={`${nunito.variable} h-full`}
    >

      <head>
        <Script
          id="maze-snippet"
          strategy="afterInteractive"
        >
          {`
            (function(m, a, z, e) {
              var s, t, u, v;
              try {
                t = m.sessionStorage.getItem('maze-us');
              } catch (error) {}

              if (!t) {
                t = new Date().getTime();
                try {
                  m.sessionStorage.setItem('maze-us', t);
                } catch (error) {}
              }

              u = document.currentScript || (function () {
                var w = document.getElementsByTagName('script');
                return w[w.length - 1];
              })();

              v = u && u.nonce;

              s = a.createElement('script');
              s.src = z + '?apiKey=' + e;
              s.async = true;

              if (v) s.setAttribute('nonce', v);

              a.getElementsByTagName('head')[0].appendChild(s);

              m.mazeUniversalSnippetApiKey = e;
            })(
              window,
              document,
              'https://snippet.maze.co/maze-universal-loader.js',
              '84be2187-18c7-43bb-9ebe-9742b44e58be'
            );
          `}
        </Script>
      </head>

      <body className="min-h-full">
        <LanguageProvider>{children}</LanguageProvider>
      </body>

    </html>
  );
}