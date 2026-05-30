"use client";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Eye, Search, TrendingUp } from "lucide-react";

const slides = [
  {
    image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&h=1200&fit=crop",
    eyebrow: "Para celíacos",
    title: "Coma fora sem ansiedade.\nPela primeira vez.",
  },
  {
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&h=1200&fit=crop",
    eyebrow: "Mais clareza antes de escolher",
    title: "Pratos seguros,\nlivres de contaminação cruzada.",
  },
  {
    image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&h=1200&fit=crop",
    eyebrow: "Comunidade real",
    title: "Baseado em experiências\nde outros celíacos.",
  },
];

export default function WelcomePage() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-dvh relative overflow-hidden bg-black">

      {/* Full-screen slide backgrounds */}
      {slides.map((slide, i) => (
        <div
          key={i}
          className="absolute inset-0 transition-opacity duration-1000"
          style={{ opacity: i === current ? 1 : 0 }}
        >
          <Image
            src={slide.image}
            alt={slide.title}
            fill
            className="object-cover"
            unoptimized
          />
        </div>
      ))}

      {/* Gradientes */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-transparent" style={{ height: "55%" }} />
      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/88 via-black/55 to-transparent" style={{ height: "70%" }} />

      {/* Layout */}
      <div
        className="absolute inset-0 z-10 flex flex-col px-6"
        style={{
          paddingTop: "env(safe-area-inset-top, 0px)",
          paddingBottom: "env(safe-area-inset-bottom, 0px)",
        }}
      >
        {/* Logo — círculo com máscara */}
        <div className="flex flex-col items-center pt-12 pb-4">
          <div
            className="overflow-hidden shrink-0 flex items-center justify-center"
            style={{
              width: 100,
              height: 100,
              borderRadius: "50%",
              border: "3px solid rgba(255,255,255,0.6)",
              boxShadow: "0 4px 20px rgba(0,0,0,0.30)",
              backgroundColor: "#FEF5EF",
              padding: 8,
            }}
          >
            <Image
              src="/mascot-new.png"
              alt="Glútty"
              width={84}
              height={84}
              priority
              className="object-contain w-full h-full"
              unoptimized
            />
          </div>

          <h1 className="text-[32px] font-black text-white drop-shadow-lg leading-none mt-3 font-display">
            Glútty
          </h1>
          <p className="text-white/75 text-sm font-medium tracking-widest mt-1">
            Segurança em cada refeição
          </p>
        </div>

        <div className="flex-1" />

        {/* Slide text */}
        <div className="mb-5">
          <span
            className="inline-block text-[11px] font-extrabold uppercase tracking-widest px-3 py-1 rounded-full mb-2"
            style={{ backgroundColor: "#C6F59D", color: "#1F3D34" }}
          >
            {slides[current].eyebrow}
          </span>
          <p className="text-white font-extrabold text-[22px] leading-snug drop-shadow-md whitespace-pre-line font-display">
            {slides[current].title}
          </p>
        </div>

        {/* Dots */}
        <div className="flex gap-2 mb-5">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className="rounded-full transition-all duration-300"
              style={{
                width: i === current ? 22 : 7,
                height: 7,
                backgroundColor: i === current ? "#C6F59D" : "rgba(255,255,255,0.4)",
              }}
            />
          ))}
        </div>

        {/* Social proof */}
        <div className="flex flex-col gap-2 mb-6">
          <div className="flex items-center gap-1.5">
            <Eye size={13} className="text-white/70 shrink-0" />
            <span className="text-white/70 text-xs font-semibold">Veja experiências de outros usuários</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Search size={13} className="text-white/70 shrink-0" />
            <span className="text-white/70 text-xs font-semibold">Entenda melhor os riscos</span>
          </div>
          <div className="flex items-center gap-1.5">
            <TrendingUp size={13} className="text-white/70 shrink-0" />
            <span className="text-white/70 text-xs font-semibold">Escolha com mais confiança</span>
          </div>
        </div>

        {/* Botões */}
        <div className="space-y-3 pb-12">
          <Link
            href="/cadastro"
            className="block w-full text-center font-bold py-4 rounded-full text-base active:scale-95 transition-transform"
            style={{ backgroundColor: "#C6F59D", color: "#1F3D34" }}
          >
            Criar conta grátis
          </Link>
          <Link
            href="/login"
            className="block w-full text-center font-semibold py-4 rounded-full text-base active:scale-95 transition-transform"
            style={{ border: "1.5px solid rgba(255,255,255,0.5)", color: "rgba(255,255,255,0.85)" }}
          >
            Já tenho conta
          </Link>
        </div>
      </div>
    </div>
  );
}
