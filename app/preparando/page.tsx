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
    }, 3200);

    let pct = 0;
    const progressInterval = setInterval(() => {
      pct += 0.7;
      if (pct >= 100) {
        pct = 100;
        clearInterval(progressInterval);
        setTimeout(() => setDone(true), 400);
        setTimeout(() => router.replace("/home"), 2500);
      }
      setProgress(pct);
    }, 100);

    return () => { clearInterval(stepInterval); clearInterval(progressInterval); };
  }, [router]);

  return (
    <div
      className="min-h-dvh flex flex-col items-center justify-center px-8 text-center"
      style={{ backgroundColor: "#FEF5EF" }}
    >
      {/* Mascote com ripple */}
      <div className="relative mb-6">
        <div
          className="absolute inset-0 rounded-full"
          style={{ border: "2px solid #C6F59D", animation: "ripple 1.6s ease-out infinite", opacity: 0.5 }}
        />
        <div
          className="absolute inset-0 rounded-full"
          style={{ border: "2px solid #C6F59D", animation: "ripple 1.6s ease-out infinite 0.5s", opacity: 0.3 }}
        />
        <div
          className="w-24 h-24 rounded-full flex items-center justify-center overflow-hidden"
          style={{ backgroundColor: "#E8F5E0", border: "2.5px solid #C6F59D" }}
        >
          <Image
            src="/mascot-new.png"
            alt="Glútty"
            width={80}
            height={80}
            className="object-contain"
            unoptimized
          />
        </div>
      </div>

      {/* Heading */}
      {!done ? (
        <>
          <h1 className="text-[22px] font-extrabold leading-snug mb-2 font-display" style={{ color: "#1F3D34" }}>
            Preparando sua<br />experiência personalizada
          </h1>
          <p className="text-sm leading-relaxed mb-8 max-w-xs" style={{ color: "#7A5C4E" }}>
            Estamos configurando sua experiência com base nas suas escolhas.
          </p>
        </>
      ) : (
        <>
          <h1 className="text-[22px] font-extrabold leading-snug mb-2 font-display" style={{ color: "#1F3D34" }}>
            Tudo pronto!
          </h1>
          <p className="text-sm leading-relaxed mb-8 max-w-xs" style={{ color: "#7A5C4E" }}>
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
                className="text-sm text-left font-medium leading-tight flex-1"
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
        <div className="w-full h-2 rounded-full overflow-hidden mb-2" style={{ backgroundColor: "#D6ECC8" }}>
          <div
            className="h-full rounded-full"
            style={{
              width: `${progress}%`,
              backgroundColor: "#4A9070",
              transition: "width 0.1s ease-out",
            }}
          />
        </div>
        <p className="text-[11px] font-semibold" style={{ color: "#4A9070" }}>{Math.round(progress)}%</p>
      </div>

      <style>{`
        @keyframes ripple {
          0%   { transform: scale(1);   opacity: 0.4; }
          100% { transform: scale(2.2); opacity: 0;   }
        }
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
