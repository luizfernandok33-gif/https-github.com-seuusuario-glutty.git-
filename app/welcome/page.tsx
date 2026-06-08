"use client";
// welcome
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useLanguage } from "@/lib/i18n/LanguageProvider";

// ── Ícones inline ─────────────────────────────────────────────────────────────
const IconOlho = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
    <path d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" stroke="#1F3D34" strokeWidth="1.8" strokeLinecap="round"/>
    <path d="M12 5C7.523 5 3.733 7.943 2.459 12 3.733 16.057 7.523 19 12 19c4.478 0 8.268-2.943 9.542-7C20.268 7.943 16.478 5 12 5Z" stroke="#1F3D34" strokeWidth="1.8" strokeLinecap="round"/>
  </svg>
);
const IconLupa = () => (
  <svg width="20" height="20" viewBox="0 0 45 45" fill="none">
    <path d="M43.5 36 32 24.5c1.2-2.4 1.8-5 1.8-7.7C33.8 7.3 26.4 0 17.4 0S1 7.3 1 16.8s7.4 16.8 16.4 16.8c2.7 0 5.3-.6 7.7-1.8L36.6 43.5c1 1 2.4 1.5 3.7 1.5s2.7-.5 3.7-1.5c2-2 2-5.2.5-7.5Zm-26.1-11A9.5 9.5 0 0 1 7.9 16.8a9.5 9.5 0 0 1 9.5-9.5 9.5 9.5 0 0 1 9.5 9.5 9.5 9.5 0 0 1-9.5 9.5Z" fill="#1F3D34" opacity="0.9"/>
  </svg>
);
const IconTrend = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
    <path d="M3 17l5-5 4 4 9-9" stroke="#1F3D34" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M14 7h6v6" stroke="#1F3D34" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);
const IconEscudo = () => (
  <svg width="20" height="20" viewBox="0 0 16 16" fill="none">
    <path fillRule="evenodd" clipRule="evenodd" d="M8 16L4.35 13.39C2.25 11.89 1 9.47 1 6.88V3L8 0l7 3v3.88C15 9.47 13.75 11.89 11.65 13.39L8 16Zm4.21-10.29L10.79 4.29 7 8.09 5.21 6.29 3.79 7.71 7 10.91l5.21-5.2Z" fill="#1F3D34"/>
  </svg>
);
const IconCheck = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
    <path fillRule="evenodd" clipRule="evenodd" d="M22 12c0 5.523-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2s10 4.477 10 10Zm-5.97-3.03a.75.75 0 0 1 0 1.06l-5 5a.75.75 0 0 1-1.06 0l-2-2a.75.75 0 1 1 1.06-1.06l1.47 1.468 2.235-2.234L14.97 8.97a.75.75 0 0 1 1.06 0Z" fill="#1F3D34"/>
  </svg>
);
const IconChat = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
    <path fillRule="evenodd" clipRule="evenodd" d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12c0 1.6.376 3.112 1.043 4.453.178.356.237.763.134 1.148l-.595 2.226c-.259.966.625 1.85 1.591 1.591l2.226-.595a2.298 2.298 0 0 1 1.148.134A9.96 9.96 0 0 0 12 22ZM8 14.25a.75.75 0 0 0 0 1.5h5.5a.75.75 0 0 0 0-1.5H8Zm-.75-3.75c0-.414.336-.75.75-.75h8a.75.75 0 0 1 0 1.5H8a.75.75 0 0 1-.75-.75Z" fill="#1F3D34"/>
  </svg>
);
const IconStar = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
    <path d="M9.153 5.408C10.42 3.136 11.053 2 12 2c.947 0 1.58 1.136 2.847 3.408l.327.588c.36.645.54.968.821 1.181.28.213.63.292 1.328.45l.637.144C20.42 8.329 21.65 8.607 21.943 9.548c.292.94-.547 1.92-2.224 3.881l-.433.507c-.477.557-.715.836-.822 1.18-.107.345-.071.717.001 1.46l.065.677c.254 2.616.38 3.924-.385 4.506-.767.581-1.918.051-4.221-1.009l-.596-.274A2.819 2.819 0 0 0 12 20.025a2.819 2.819 0 0 0-1.329.451l-.595.274c-2.303 1.06-3.454 1.59-4.221 1.009-.767-.582-.64-1.89-.385-4.506l.065-.677c.072-.743.108-1.115.001-1.46-.107-.344-.345-.623-.822-1.18l-.433-.507C2.665 11.47 1.826 10.488 2.119 9.548 2.411 8.607 3.64 8.33 6.1 7.772l.636-.143c.7-.159 1.049-.238 1.33-.451.28-.213.46-.536.82-1.182l.327-.588Z" fill="#1F3D34"/>
  </svg>
);

// ── Slides (imagens e ícones são fixos; texto vem da tradução) ───────────────
const slideAssets = [
  { image: "/Para celiacos.png", icons: [IconOlho, IconLupa, IconTrend] },
  { image: "/Mais clareza.png", icons: [IconEscudo, IconCheck, IconLupa] },
  { image: "/Comunidade real.png", icons: [IconChat, IconStar, IconTrend] },
];

// ── Page ──────────────────────────────────────────────────────────────────────
export default function WelcomePage() {
  const { t } = useLanguage();
  const [current, setCurrent] = useState(0);

  const slides = slideAssets.map((asset, i) => {
    const text = t.welcome.slides[i];
    return {
      image: asset.image,
      title: text.title,
      subtitle: text.subtitle,
      bullets: asset.icons.map((Icon, j) => ({ Icon, text: text.bullets[j] })),
    };
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const slide = slides[current];

  return (
    <div
      className="min-h-dvh flex flex-col overflow-hidden"
      style={{
        backgroundColor: "#F5F0E8",
        paddingTop: "calc(env(safe-area-inset-top, 0px) + 32px)",
        paddingBottom: "calc(env(safe-area-inset-bottom, 0px) + 32px)",
      }}
    >
      <style>{`
        @keyframes fadeUp { from{opacity:0;transform:translateY(12px)} to{opacity:1;transform:translateY(0)} }
        @keyframes floatImg { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-8px)} }
        .slide-in { animation: fadeUp 0.4s ease-out both; }
        .img-float { animation: floatImg 4s ease-in-out infinite; }
      `}</style>

      {/* ── Dots (topo) ── */}
      <div className="flex justify-center gap-2 mb-6">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className="rounded-full transition-all duration-300"
            style={{
              width: i === current ? 24 : 7,
              height: 7,
              backgroundColor: i === current ? "#1F3D34" : "rgba(31,61,52,0.2)",
            }}
          />
        ))}
      </div>

      {/* ── Título + texto de apoio ── */}
      <div key={`title-${current}`} className="px-8 mb-6 text-center slide-in">
        <p
          className="font-black text-[28px] leading-tight whitespace-pre-line mb-2.5"
          style={{ color: "#1F3D34", fontFamily: "var(--font-nunito), 'Nunito', sans-serif" }}
        >
          {slide.title}
        </p>
        <p
          className="text-[14px] leading-relaxed"
          style={{ color: "rgba(31,61,52,0.6)", fontFamily: "var(--font-nunito), 'Nunito', sans-serif", textWrap: "balance" } as React.CSSProperties}
        >
          {slide.subtitle}
        </p>
      </div>

      {/* ── Imagem mascote ── */}
      <div className="flex items-center justify-center px-6 mb-2" style={{ height: 195 }}>
        <div key={`img-${current}`} className="img-float relative w-full h-full">
          <Image
            src={slide.image}
            alt={slide.title}
            fill
            className="object-contain"
            unoptimized
            priority
          />
        </div>
      </div>

      {/* ── Logo tipografia (estática) ── */}
      <div className="flex justify-center mb-6">
        <Image
          src="/glútty logo tipografia.png"
          alt="Glútty"
          width={220}
          height={80}
          className="object-contain"
          unoptimized
        />
      </div>

      {/* ── Bullets ── */}
      <div key={`bullets-${current}`} className="px-8 mb-8 slide-in" style={{ animationDelay: "0.1s" }}>
        {slide.bullets.map(({ Icon, text }, i) => (
          <div key={i} className="flex items-center gap-3 py-2">
            <div className="shrink-0">
              <Icon />
            </div>
            <p className="text-[13px] font-semibold" style={{ color: "#1F3D34" }}>{text}</p>
          </div>
        ))}
      </div>


      {/* ── Espaço flexível ── */}
      <div className="flex-1" />

      {/* ── Botões ── */}
      <div className="space-y-3 px-6">
        <Link
          href="/cadastro"
          className="block w-full text-center font-black py-4 rounded-full text-base active:scale-95 transition-transform shadow-md"
          style={{ backgroundColor: "#1F3D34", color: "#C6F59D" }}
        >
          {t.welcome.createAccount}
        </Link>
        <Link
          href="/login"
          className="block w-full text-center font-black py-4 rounded-full text-base active:scale-95 transition-transform"
          style={{ backgroundColor: "#C6F59D", color: "#1F3D34" }}
        >
          {t.welcome.haveAccount}
        </Link>
      </div>
    </div>
  );
}
