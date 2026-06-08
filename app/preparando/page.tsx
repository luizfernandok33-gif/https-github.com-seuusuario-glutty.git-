"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { ShieldCheck, Utensils, MapPin, Star, Check } from "lucide-react";

const steps = [
  { icon: ShieldCheck, label: "Identificando suas restrições alimentares..." },
  { icon: Utensils,    label: "Filtrando pratos compatíveis com você..."      },
  { icon: MapPin,      label: "Mapeando restaurantes alinhados ao seu perfil..." },
  { icon: Star,        label: "Preparando suas recomendações seguras..."       },
];

export default function PreparandoPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);
  const [done, setDone]               = useState(false);
  const [progress, setProgress]       = useState(0);

  useEffect(() => {
    const stepInterval = setInterval(() => {
      setCurrentStep((prev) => {
        if (prev >= steps.length - 1) { clearInterval(stepInterval); return prev; }
        return prev + 1;
      });
    }, 5000);

    let pct = 0;
    const progressInterval = setInterval(() => {
      pct += 0.45;
      if (pct >= 100) {
        pct = 100;
        clearInterval(progressInterval);
        setTimeout(() => setDone(true), 600);
        setTimeout(() => router.replace("/home"), 3500);
      }
      setProgress(pct);
    }, 100);

    return () => { clearInterval(stepInterval); clearInterval(progressInterval); };
  }, [router]);

  return (
    <div
      className="min-h-dvh flex flex-col items-center justify-center px-8 text-center"
      style={{
        backgroundColor: "#FFFFFF",
        paddingTop: "calc(env(safe-area-inset-top, 0px) + 48px)",
        paddingBottom: "calc(env(safe-area-inset-bottom, 0px) + 32px)",
      }}
    >
      {/* Mascote */}
      <div className="mb-6">
        <Image
          src="/glútty novo.png"
          alt="Glútty"
          width={160}
          height={160}
          className="object-contain"
          unoptimized
        />
      </div>

      {/* Heading */}
      {!done ? (
        <>
          <h1 className="text-[22px] font-black leading-snug mb-2 font-display" style={{ color: "#1F3D34", textWrap: "balance" } as React.CSSProperties}>
            Preparando sua experiência personalizada
          </h1>
          <p className="text-sm leading-relaxed mb-6 max-w-xs" style={{ color: "#5A6B65", textWrap: "balance" } as React.CSSProperties}>
            Estamos configurando sua experiência com base nas suas escolhas.
          </p>
        </>
      ) : (
        <>
          <h1 className="text-[22px] font-black leading-snug mb-2 font-display" style={{ color: "#1F3D34", textWrap: "balance" } as React.CSSProperties}>
            Tudo pronto!
          </h1>
          <p className="text-sm leading-relaxed mb-6 max-w-xs" style={{ color: "#5A6B65", textWrap: "balance" } as React.CSSProperties}>
            Sua experiência foi personalizada. Bem-vinda ao Glútty!
          </p>
        </>
      )}

      {/* Steps list */}
      <div className="w-full max-w-xs space-y-3 mb-8">
        {steps.map((step, i) => {
          const Icon       = step.icon;
          const isActive   = i === currentStep && !done;
          const isComplete = i < currentStep || done;

          return (
            <div
              key={i}
              className="flex items-center gap-3 transition-all"
              style={{ opacity: i > currentStep && !done ? 0.3 : 1 }}
            >
              <div
                className="w-7 h-7 rounded-full flex items-center justify-center shrink-0 transition-all"
                style={{
                  backgroundColor: isComplete ? "#1F3D34" : isActive ? "#E8F5E0" : "#EEE",
                  border: isActive ? "2px solid #1F3D34" : "none",
                }}
              >
                {isComplete ? (
                  <Check size={13} strokeWidth={3} color="#C6F59D" />
                ) : (
                  <Icon size={13} strokeWidth={2} style={{ color: isActive ? "#1F3D34" : "#bbb" }} />
                )}
              </div>

              <p
                className="text-sm text-left font-semibold leading-tight flex-1"
                style={{ color: isComplete ? "#1F3D34" : isActive ? "#1F3D34" : "#bbb" }}
              >
                {step.label}
              </p>

              {isActive && (
                <div
                  className="ml-auto w-4 h-4 rounded-full border-2 shrink-0"
                  style={{
                    borderColor: "#1F3D34",
                    borderTopColor: "transparent",
                    animation: "spin 0.7s linear infinite",
                  }}
                />
              )}
            </div>
          );
        })}
      </div>

      {/* Progress bar */}
      <div className="w-full max-w-xs">
        <div className="w-full h-2 rounded-full overflow-hidden mb-2" style={{ backgroundColor: "#C6F59D" }}>
          <div
            className="h-full rounded-full"
            style={{
              width: `${progress}%`,
              backgroundColor: "#1F3D34",
              transition: "width 0.1s ease-out",
            }}
          />
        </div>
        <p className="text-[11px] font-semibold" style={{ color: "#1F3D34" }}>{Math.round(progress)}%</p>
      </div>

      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
