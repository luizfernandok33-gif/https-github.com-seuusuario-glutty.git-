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

    // Progress — fills over ~5.5s
    let pct = 0;
    const interval = setInterval(() => {
      pct += Math.random() * 3 + 1;
      if (pct >= 100) { pct = 100; clearInterval(interval); }
      setProgress(pct);
    }, 160);

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
      style={{ backgroundColor: "#FEF5EF" }}
    >
      {/* Mascot */}
      <div
        className="mb-14"
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
          src="/logo.png"
          alt="Glútty"
          width={220}
          height={220}
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
          style={{ height: 8, borderRadius: 999, backgroundColor: "#E0E0E0" }}
        >
          {/* Fill */}
          <div
            style={{
              height: "100%",
              width: `${progress}%`,
              borderRadius: 999,
              background: "linear-gradient(90deg, #4A7C55 0%, #6BAF7A 100%)",
              transition: "width 0.15s ease-out",
            }}
          />
        </div>

        {/* Percentage */}
        <p
          className="text-[12px] font-semibold tabular-nums"
          style={{ color: "#4A7C55" }}
        >
          {Math.round(progress)}%
        </p>
      </div>
    </div>
  );
}
