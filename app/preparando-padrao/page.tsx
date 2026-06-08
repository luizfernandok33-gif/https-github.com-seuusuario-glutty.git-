"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ShieldCheck, Utensils, MapPin, CheckCircle, Check } from "lucide-react";
import { useLanguage } from "@/lib/i18n/LanguageProvider";

const stepIcons = [ShieldCheck, Utensils, MapPin, CheckCircle];

export default function PreparandoPadraoPage() {
  const router = useRouter();
  const { t } = useLanguage();
  const steps = stepIcons.map((icon, i) => ({ icon, label: t.preparandoPadrao.steps[i] }));
  const [currentStep, setCurrentStep] = useState(0);
  const [done, setDone]               = useState(false);
  const [progress, setProgress]       = useState(0);

  useEffect(() => {
    const stepInterval = setInterval(() => {
      setCurrentStep((prev) => {
        if (prev >= steps.length - 1) {
          clearInterval(stepInterval);
          return prev;
        }
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
      className="min-h-dvh bg-white flex flex-col items-center justify-center px-8 text-center"
      style={{
        paddingTop: "calc(env(safe-area-inset-top, 0px) + 48px)",
        paddingBottom: "calc(env(safe-area-inset-bottom, 0px) + 32px)",
      }}
    >

      {/* Icon ring — pulsing */}
      <div className="relative mb-8">
        <div
          className="w-24 h-24 rounded-full flex items-center justify-center"
          style={{ backgroundColor: "#FFF0E6" }}
        >
          <ShieldCheck size={44} strokeWidth={1.8} style={{ color: "#FC6904" }} />
        </div>
        <div
          className="absolute inset-0 rounded-full"
          style={{
            border: "2px solid #FC6904",
            animation: "ripple 1.6s ease-out infinite",
            opacity: 0.3,
          }}
        />
        <div
          className="absolute inset-0 rounded-full"
          style={{
            border: "2px solid #FC6904",
            animation: "ripple 1.6s ease-out infinite 0.5s",
            opacity: 0.2,
          }}
        />
      </div>

      {/* Heading */}
      {!done ? (
        <>
          <h1 className="text-[22px] font-extrabold text-gray-900 leading-snug mb-2 whitespace-pre-line">
            {t.preparandoPadrao.title}
          </h1>
          <p className="text-gray-400 text-sm leading-relaxed mb-6 max-w-xs">
            {t.preparandoPadrao.subtitle}
          </p>
        </>
      ) : (
        <>
          <h1 className="text-[22px] font-extrabold leading-snug mb-2" style={{ color: "#FC6904" }}>
            {t.preparandoPadrao.doneTitle}
          </h1>
          <p className="text-gray-400 text-sm leading-relaxed mb-6 max-w-xs">
            {t.preparandoPadrao.doneSubtitle}
          </p>
        </>
      )}

      {/* Steps list */}
      <div className="w-full max-w-xs space-y-3 mb-10">
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
                  backgroundColor: isComplete ? "#FC6904" : isActive ? "#FFF0E6" : "#F5F5F5",
                  border: isActive ? "2px solid #FC6904" : "none",
                }}
              >
                {isComplete ? (
                  <Check size={13} strokeWidth={3} color="white" />
                ) : (
                  <Icon size={13} strokeWidth={2} style={{ color: isActive ? "#FC6904" : "#bbb" }} />
                )}
              </div>

              <p
                className="text-sm text-left font-medium leading-tight"
                style={{ color: isComplete ? "#1C1C1C" : isActive ? "#FC6904" : "#bbb" }}
              >
                {step.label}
              </p>

              {isActive && (
                <div
                  className="ml-auto w-4 h-4 rounded-full border-2 shrink-0"
                  style={{
                    borderColor: "#FC6904",
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
        <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden mb-2">
          <div
            className="h-full rounded-full"
            style={{
              width: `${progress}%`,
              backgroundColor: "#FC6904",
              transition: "width 0.1s ease-out",
            }}
          />
        </div>
        <p className="text-gray-300 text-[11px]">{Math.round(progress)}%</p>
      </div>

      <style>{`
        @keyframes ripple {
          0%   { transform: scale(1);    opacity: 0.3; }
          100% { transform: scale(2.2);  opacity: 0; }
        }
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
