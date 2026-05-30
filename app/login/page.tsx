"use client";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ArrowLeft, Eye, EyeOff } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);

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
        <h2 className="font-bold text-base" style={{ color: "#1F3D34" }}>Entrar</h2>
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
      <h1 className="text-2xl font-black mb-1 font-display" style={{ color: "#1F3D34" }}>
        Bem-vindo de volta!
      </h1>
      <p className="text-sm mb-6" style={{ color: "#7A5C4E" }}>Acesse sua conta para continuar.</p>

      {/* Form */}
      <form className="space-y-4 flex-1" onSubmit={(e) => { e.preventDefault(); router.push("/onboarding"); }}>

        <div>
          <label className="block font-semibold text-sm mb-1.5" style={{ color: "#1F3D34" }}>E-mail</label>
          <input
            type="email"
            placeholder="seu@email.com"
            className="w-full rounded-2xl px-4 py-4 text-sm outline-none transition-colors"
            style={{ backgroundColor: "#fff", border: "1.5px solid #E2C9B8", color: "#1F3D34" }}
          />
        </div>

        <div>
          <label className="block font-semibold text-sm mb-1.5" style={{ color: "#1F3D34" }}>Senha</label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="sua senha"
              className="w-full rounded-2xl px-4 py-4 pr-12 text-sm outline-none transition-colors"
              style={{ backgroundColor: "#fff", border: "1.5px solid #E2C9B8", color: "#1F3D34" }}
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
        </div>

        {/* Esqueceu a senha */}
        <div className="flex justify-end">
          <Link href="/esqueci-senha" className="text-xs font-semibold" style={{ color: "#1F3D34" }}>
            Esqueceu a senha?
          </Link>
        </div>

        {/* Entrar */}
        <button
          type="submit"
          className="w-full font-bold py-4 rounded-full text-base active:scale-95 transition-transform"
          style={{ backgroundColor: "#1F3D34", color: "#C6F59D" }}
        >
          Entrar
        </button>
      </form>

      {/* Divider */}
      <div className="flex items-center gap-3 my-5">
        <div className="flex-1 h-px" style={{ backgroundColor: "#E2C9B8" }} />
        <span className="text-xs" style={{ color: "#C2A898" }}>ou entre com</span>
        <div className="flex-1 h-px" style={{ backgroundColor: "#E2C9B8" }} />
      </div>

      {/* Social */}
      <div className="flex items-center justify-center gap-4">
        <button
          className="w-12 h-12 rounded-2xl flex items-center justify-center active:scale-95 transition-transform"
          style={{ backgroundColor: "#fff", border: "1.5px solid #E2C9B8" }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="#1877F2">
            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
          </svg>
        </button>
        <button
          className="w-12 h-12 rounded-2xl flex items-center justify-center active:scale-95 transition-transform"
          style={{ backgroundColor: "#fff", border: "1.5px solid #E2C9B8" }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
          </svg>
        </button>
        <button
          className="w-12 h-12 rounded-2xl flex items-center justify-center active:scale-95 transition-transform"
          style={{ backgroundColor: "#fff", border: "1.5px solid #E2C9B8" }}
        >
          <svg width="17" height="20" viewBox="0 0 17 20" fill="#000">
            <path d="M13.634 10.524c-.022-2.354 1.923-3.489 2.01-3.545-1.097-1.602-2.8-1.82-3.405-1.843-1.446-.147-2.836.857-3.571.857-.736 0-1.866-.838-3.072-.814-1.572.023-3.032.921-3.838 2.33C.03 10.192 1.19 14.573 2.86 16.967c.836 1.194 1.822 2.528 3.112 2.481 1.254-.05 1.724-.8 3.237-.8 1.513 0 1.948.8 3.271.773 1.348-.023 2.198-1.208 3.025-2.409.957-1.378 1.347-2.718 1.366-2.787-.03-.013-2.613-1.001-2.637-3.701zM11.317 3.44C12.003 2.604 12.47 1.453 12.34.28c-.98.041-2.175.654-2.881 1.472-.629.726-1.184 1.894-1.036 3.01 1.1.084 2.22-.558 2.894-1.321z"/>
          </svg>
        </button>
      </div>

      {/* Criar conta */}
      <p className="text-center text-xs mt-8" style={{ color: "#7A5C4E" }}>
        Ainda não tem conta?{" "}
        <Link href="/cadastro" className="font-bold" style={{ color: "#1F3D34" }}>
          Criar conta →
        </Link>
      </p>
    </div>
  );
}
