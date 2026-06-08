"use client";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { ArrowLeft, Eye, EyeOff } from "lucide-react";
import { useLanguage } from "@/lib/i18n/LanguageProvider";
import type { Translations } from "@/lib/i18n/translations";

function getStrength(
  pwd: string,
  labels: Translations["cadastro"]["passwordStrength"]
): { level: 0 | 1 | 2 | 3; label: string; color: string } {
  if (!pwd) return { level: 0, label: "", color: "" };
  let score = 0;
  if (pwd.length >= 8) score++;
  if (/[A-Z]/.test(pwd)) score++;
  if (/[0-9]/.test(pwd)) score++;
  if (/[^A-Za-z0-9]/.test(pwd)) score++;

  if (score <= 1) return { level: 1, label: labels.weak,   color: "#EF4444" };
  if (score <= 2) return { level: 2, label: labels.medium, color: "#F59E0B" };
  return           { level: 3, label: labels.strong, color: "#22C55E" };
}

export default function CadastroPage() {
  const { t } = useLanguage();
  const [password, setPassword]       = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const strength = getStrength(password, t.cadastro.passwordStrength);

  return (
    <div
      className="min-h-dvh flex flex-col px-6"
      style={{
        backgroundColor: "#FFFFFF",
        backgroundImage: "url('/pattern-tela-splasch.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        paddingTop: "calc(env(safe-area-inset-top, 0px) + 48px)",
        paddingBottom: "calc(env(safe-area-inset-bottom, 0px) + 32px)",
      }}
    >
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <Link
          href="/welcome"
          className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 active:scale-90 transition-transform"
          style={{ backgroundColor: "#1F3D34" }}
        >
          <ArrowLeft size={18} style={{ color: "#C6F59D" }} />
        </Link>
        <h2 className="font-black text-base" style={{ color: "#1F3D34" }}>{t.cadastro.headerTitle}</h2>
      </div>

      {/* Logo */}
      <div className="flex justify-center mb-6">
        <Image
          src="/glútty novo.png"
          alt="Glútty"
          width={110}
          height={110}
          priority
          className="object-contain"
          unoptimized
        />
      </div>

      {/* Title */}
      <h1 className="text-2xl font-black mb-2 font-display" style={{ color: "#1F3D34" }}>{t.cadastro.title}</h1>
      <p className="text-sm font-semibold mb-6" style={{ color: "#5A6B65" }}>{t.cadastro.subtitle}</p>

      {/* Form */}
      <form className="space-y-4 flex-1" onSubmit={(e) => e.preventDefault()}>

        <div>
          <label className="block font-semibold text-sm mb-1.5" style={{ color: "#1F3D34" }}>{t.cadastro.name}</label>
          <input
            type="text"
            placeholder={t.cadastro.namePlaceholder}
            className="w-full rounded-2xl px-4 py-3.5 text-sm outline-none transition-colors"
            style={{
              backgroundColor: "#fff",
              border: "1.5px solid #D4EDD4",
              color: "#1F3D34",
            }}
          />
        </div>

        <div>
          <label className="block font-semibold text-sm mb-1.5" style={{ color: "#1F3D34" }}>{t.cadastro.email}</label>
          <input
            type="email"
            placeholder={t.cadastro.emailPlaceholder}
            className="w-full rounded-2xl px-4 py-3.5 text-sm outline-none transition-colors"
            style={{
              backgroundColor: "#fff",
              border: "1.5px solid #D4EDD4",
              color: "#1F3D34",
            }}
          />
        </div>

        <div>
          <label className="block font-semibold text-sm mb-1.5" style={{ color: "#1F3D34" }}>{t.cadastro.password}</label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder={t.cadastro.passwordPlaceholder}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-2xl px-4 py-3.5 pr-12 text-sm outline-none transition-colors"
              style={{
                backgroundColor: "#fff",
                border: "1.5px solid #D4EDD4",
                color: "#1F3D34",
              }}
            />
            <button
              type="button"
              onClick={() => setShowPassword((v) => !v)}
              className="absolute right-4 top-1/2 -translate-y-1/2 active:scale-90 transition-transform"
              style={{ color: "#C2A898" }}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          {/* Password strength */}
          {password.length > 0 && (
            <div className="mt-2.5 px-1">
              <div className="flex gap-1.5 mb-1">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="h-1 flex-1 rounded-full transition-all duration-300"
                    style={{ backgroundColor: strength.level >= i ? strength.color : "#E2C9B8" }}
                  />
                ))}
              </div>
              <p className="text-[11px] font-semibold" style={{ color: strength.color }}>
                {t.cadastro.passwordStrength.label.replace("{strength}", strength.label)}
              </p>
            </div>
          )}
        </div>

        <div className="mt-auto pt-6 space-y-3">
          <Link
            href="/onboarding"
            className="block w-full text-center font-bold py-4 rounded-full text-base active:scale-95 transition-transform"
            style={{ backgroundColor: "#1F3D34", color: "#C6F59D" }}
          >
            {t.cadastro.submit}
          </Link>
          <p className="text-center text-sm font-semibold" style={{ color: "#5A6B65" }}>
            {t.cadastro.haveAccount}{" "}
            <Link href="/login" className="font-black" style={{ color: "#1F3D34" }}>
              {t.cadastro.login}
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
}
