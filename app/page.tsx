"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function SplashPage() {
  const router = useRouter();
  const [phase, setPhase]       = useState<"hidden" | "in" | "hold" | "out">("hidden");
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const t1 = setTimeout(() => setPhase("in"),    50);
    const t2 = setTimeout(() => setPhase("hold"),  900);
    const t3 = setTimeout(() => setPhase("out"),  5500);
    const t4 = setTimeout(() => router.replace("/idioma"), 6200);

    // Progress — sincronizado com o tempo de exibição da tela (5 500 ms)
    const startTime = Date.now();
    const DURATION  = 5400; // termina um tique antes do fade-out em 5 500 ms
    const interval  = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const pct     = Math.min((elapsed / DURATION) * 100, 100);
      setProgress(pct);
      if (elapsed >= DURATION) clearInterval(interval);
    }, 50);

    return () => {
      clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); clearTimeout(t4);
      clearInterval(interval);
    };
  }, [router]);

  const isIn  = phase === "in" || phase === "hold";
  const isOut = phase === "out";

  return (
    <div
      className="min-h-dvh flex flex-col items-center justify-center px-8 overflow-hidden"
      style={{ backgroundColor: "#FFFFFF" }}
    >
      {/* Mascot */}
      <div
        className="mb-10"
        style={{
          transform: isIn
            ? "translateY(0) scale(1)"
            : isOut
            ? "translateY(-20px) scale(0.92)"
            : "translateY(60px) scale(0.85)",
          opacity: isIn ? 1 : 0,
          transition: isIn
            ? "transform 0.65s cubic-bezier(0.34,1.56,0.64,1), opacity 0.45s ease"
            : "transform 0.4s ease-in, opacity 0.4s ease-in",
        }}
      >
        <Image
          src="/glútty novo.png"
          alt="Glútty"
          width={180}
          height={180}
          priority
          className="object-contain"
          unoptimized
        />
      </div>

      {/* Progress bar */}
      <div
        className="w-full flex flex-col items-center gap-2"
        style={{
          opacity: phase === "hold" || phase === "out" ? 1 : 0,
          transition: "opacity 0.4s ease 0.3s",
          maxWidth: 240,
        }}
      >
        {/* Track */}
        <div
          className="w-full overflow-hidden"
          style={{ height: 12, borderRadius: 999, backgroundColor: "#C6F59D" }}
        >
          {/* Fill */}
          <div
            style={{
              height: "100%",
              width: `${progress}%`,
              borderRadius: 999,
              backgroundColor: "#1F3D34",
              transition: "width 0.2s ease-out",
            }}
          />
        </div>

        {/* Percentage */}
        <p
          className="text-[12px] font-semibold tabular-nums"
          style={{ color: "#1F3D34" }}
        >
          {Math.round(progress)}%
        </p>
      </div>
    </div>
  );
}
