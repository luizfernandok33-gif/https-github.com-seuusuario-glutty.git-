"use client";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { ArrowLeft, Eye, EyeOff } from "lucide-react";

function getStrength(pwd: string): { level: 0 | 1 | 2 | 3; label: string; color: string } {
  if (!pwd) return { level: 0, label: "", color: "" };
  let score = 0;
  if (pwd.length >= 8) score++;
  if (/[A-Z]/.test(pwd)) score++;
  if (/[0-9]/.test(pwd)) score++;
  if (/[^A-Za-z0-9]/.test(pwd)) score++;

  if (score <= 1) return { level: 1, label: "Fraca",  color: "#EF4444" };
  if (score <= 2) return { level: 2, label: "Média",  color: "#F59E0B" };
  return           { level: 3, label: "Forte",  color: "#22C55E" };
}

export default function CadastroPage() {
  const [password, setPassword]       = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const strength = getStrength(password);

  return (
    <div
      className="min-h-dvh flex flex-col px-6 pt-6 pb-10"
      style={{ backgroundColor: "#FEF5EF" }}
    >
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <Link
          href="/welcome"
          className="w-9 h-9 rounded-full flex items-center justify-center border active:scale-95 transition-transform"
          style={{ borderColor: "#C2A898", backgroundColor: "rgba(255,255,255,0.6)" }}
        >
          <ArrowLeft size={18} style={{ color: "#1F3D34" }} />
        </Link>
        <h2 className="font-bold text-base" style={{ color: "#1F3D34" }}>Criar conta</h2>
      </div>

      {/* Logo */}
      <div className="flex justify-center mb-6">
        <Image
          src="/logo.png"
          alt="Glútty"
          width={110}
          height={110}
          priority
          className="object-contain"
          unoptimized
        />
      </div>

      {/* Title */}
      <h1 className="text-2xl font-black mb-1 font-display" style={{ color: "#1F3D34" }}>Cadastro</h1>
      <p className="text-sm mb-6" style={{ color: "#7A5C4E" }}>Crie sua conta para começar</p>

      {/* Form */}
      <form className="space-y-4 flex-1" onSubmit={(e) => e.preventDefault()}>

        <div>
          <label className="block font-semibold text-sm mb-1.5" style={{ color: "#1F3D34" }}>Nome</label>
          <input
            type="text"
            placeholder="Seu nome completo"
            className="w-full rounded-2xl px-4 py-4 text-sm outline-none transition-colors"
            style={{
              backgroundColor: "#fff",
              border: "1.5px solid #E2C9B8",
              color: "#1F3D34",
            }}
          />
        </div>

        <div>
          <label className="block font-semibold text-sm mb-1.5" style={{ color: "#1F3D34" }}>E-mail</label>
          <input
            type="email"
            placeholder="seu@email.com"
            className="w-full rounded-2xl px-4 py-4 text-sm outline-none transition-colors"
            style={{
              backgroundColor: "#fff",
              border: "1.5px solid #E2C9B8",
              color: "#1F3D34",
            }}
          />
        </div>

        <div>
          <label className="block font-semibold text-sm mb-1.5" style={{ color: "#1F3D34" }}>Senha</label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="mínimo 8 caracteres"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-2xl px-4 py-4 pr-12 text-sm outline-none transition-colors"
              style={{
                backgroundColor: "#fff",
                border: "1.5px solid #E2C9B8",
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
                Senha {strength.label}
              </p>
            </div>
          )}
        </div>

        <div className="pt-2 space-y-3">
          <Link
            href="/onboarding"
            className="block w-full text-center font-bold py-4 rounded-full text-base active:scale-95 transition-transform"
            style={{ backgroundColor: "#1F3D34", color: "#C6F59D" }}
          >
            Cadastrar
          </Link>
          <p className="text-center text-sm" style={{ color: "#7A5C4E" }}>
            Já tem conta?{" "}
            <Link href="/login" className="font-bold" style={{ color: "#1F3D34" }}>
              Fazer login
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
}
