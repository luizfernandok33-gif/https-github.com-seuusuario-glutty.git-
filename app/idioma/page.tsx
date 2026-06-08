"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Check } from "lucide-react";
import Image from "next/image";
import { useLanguage } from "@/lib/i18n/LanguageProvider";
import type { Language } from "@/lib/i18n/translations";

const languages: { code: Language | "de"; name: string; region: string; flag: string; phrase: string }[] = [
  {
    code: "pt",
    name: "Português",
    region: "Brasil",
    flag: "/brasil.png",
    phrase: "Com a Glútty, a hora de se alimentar não precisa de medo.",
  },
  {
    code: "en",
    name: "English",
    region: "International",
    flag: "/estados-unidos.png",
    phrase: "With Glútty, mealtime doesn't have to be scary.",
  },
  {
    code: "de",
    name: "Deutsch",
    region: "Deutschland / Schweiz",
    flag: "/alemanha.png",
    phrase: "Mit Glútty muss das Essen keine Angst mehr haben.",
  },
];

export default function IdiomaPage() {
  const router = useRouter();
  const { language, setLanguage, t } = useLanguage();
  const [selected, setSelected] = useState<string>(language);

  const handleContinue = () => {
    if (selected === "pt" || selected === "en") {
      setLanguage(selected);
    }
    router.replace("/welcome");
  };

  return (
    <div
      className="min-h-dvh flex flex-col px-6"
      style={{
        paddingTop: "calc(env(safe-area-inset-top, 0px) + 48px)",
        paddingBottom: "calc(env(safe-area-inset-bottom, 0px) + 32px)",
        backgroundColor: "#FFFFFF",
        backgroundImage: "url('/pattern-tela-splasch.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Logo */}
      <div className="flex flex-col items-center pb-8">
        <Image
          src="/glútty novo.png"
          alt="Glútty"
          width={160}
          height={160}
          priority
          className="object-contain"
          unoptimized
        />
      </div>

      {/* Título */}
      <div className="mb-6">
        <h1 className="text-[26px] font-black text-center font-display leading-tight" style={{ color: "#1F3D34", textWrap: "balance" } as React.CSSProperties}>
          {t.idioma.title}
        </h1>
        <p className="text-center text-[13px] mt-1.5" style={{ color: "#6B9E7E", textWrap: "balance" } as React.CSSProperties}>
          {t.idioma.subtitle}
        </p>
      </div>

      {/* Cards de idioma */}
      <div className="flex flex-col gap-3 flex-1">
        {languages.map((lang) => {
          const isActive = selected === lang.code;
          return (
            <button
              key={lang.code}
              onClick={() => setSelected(lang.code)}
              className="w-full text-left rounded-2xl p-4 transition-all active:scale-[0.98]"
              style={{
                backgroundColor: isActive ? "#C6F59D" : "#fff",
                border: isActive ? "2px solid #1F3D34" : "2px solid #E8F0E8",
                boxShadow: isActive
                  ? "0 4px 16px rgba(31,61,52,0.15)"
                  : "0 2px 8px rgba(0,0,0,0.04)",
              }}
            >
              <div className="flex items-start justify-between gap-3">
                {/* Esquerda: flag + nome */}
                <div className="flex items-center gap-3">
                  <Image src={lang.flag} alt={lang.name} width={40} height={40} className="rounded-full object-cover shrink-0" unoptimized />
                  <div>
                    <p
                      className="font-extrabold text-[16px] leading-tight"
                      style={{ color: "#1F3D34" }}
                    >
                      {lang.name}
                    </p>
                    <p
                      className="text-[11px] font-medium mt-0.5"
                      style={{ color: isActive ? "#2E6B55" : "#9AB59A" }}
                    >
                      {lang.region}
                    </p>
                  </div>
                </div>

                {/* Check */}
                <div
                  className="w-6 h-6 rounded-full flex items-center justify-center shrink-0 mt-0.5 transition-all"
                  style={{
                    backgroundColor: isActive ? "#1F3D34" : "transparent",
                    border: isActive ? "2px solid #1F3D34" : "2px solid #C8DEC8",
                  }}
                >
                  {isActive && <Check size={13} color="#C6F59D" strokeWidth={3} />}
                </div>
              </div>

              {/* Frase no idioma */}
              <p
                className="text-[13px] leading-snug mt-3 italic"
                style={{ color: isActive ? "#1F3D34" : "#9AB59A" }}
              >
                "{lang.phrase}"
              </p>
            </button>
          );
        })}
      </div>

      {/* CTA */}
      <div className="mt-auto pt-6 pb-0">
        <button
          onClick={handleContinue}
          className="w-full py-4 rounded-full font-bold text-base active:scale-95 transition-transform"
          style={{ backgroundColor: "#1F3D34", color: "#C6F59D" }}
        >
          {t.idioma.continue}
        </button>
      </div>
    </div>
  );
}
