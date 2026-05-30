"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Mail, ArrowRight, CheckCircle } from "lucide-react";
import Link from "next/link";
import BackButton from "@/components/BackButton";

export default function EsqueciSenhaPage() {
  const router = useRouter();
  const [email, setEmail]     = useState("");
  const [sent, setSent]       = useState(false);
  const [loading, setLoading] = useState(false);

  const isValid = /\S+@\S+\.\S+/.test(email);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValid) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSent(true);
    }, 1200);
  };

  return (
    <div className="min-h-dvh bg-white flex flex-col px-6 py-10">

      {/* Back */}
      <div className="self-start mb-8">
        <BackButton />
      </div>

      {!sent ? (
        /* ── Form state ── */
        <div className="flex-1 flex flex-col">
          {/* Icon */}
          <div
            className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6"
            style={{ backgroundColor: "#FFF0E6" }}
          >
            <Mail size={28} style={{ color: "#FC6904" }} />
          </div>

          <h1 className="text-[28px] font-extrabold text-gray-900 leading-tight mb-2 font-display">
            Esqueceu a<br />senha?
          </h1>
          <p className="text-gray-500 text-sm mb-8 leading-relaxed">
            Sem problema! Digite seu e-mail e enviaremos um link para você criar uma nova senha.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-gray-700 text-sm font-medium mb-1.5">E-mail</label>
              <div className="relative">
                <Mail size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="seu@email.com"
                  className="w-full border border-gray-200 rounded-xl pl-10 pr-4 py-3.5 text-gray-800 text-sm outline-none transition-colors"
                  style={{ borderColor: isValid ? "#FC6904" : undefined }}
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={!isValid || loading}
              className="w-full flex items-center justify-center gap-2 font-bold py-4 rounded-full text-base shadow-md transition-all active:scale-95 disabled:opacity-50"
              style={{ backgroundColor: "#C6F59D", color: "#1F3D34" }}
            >
              {loading ? (
                <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <span>Enviar link</span>
                  <ArrowRight size={16} strokeWidth={2.5} />
                </>
              )}
            </button>
          </form>

          <p className="text-center text-gray-400 text-xs mt-6">
            Lembrou a senha?{" "}
            <Link href="/login" className="font-bold" style={{ color: "#1F3D34" }}>
              Entrar
            </Link>
          </p>
        </div>
      ) : (
        /* ── Success state ── */
        <div className="flex-1 flex flex-col items-center justify-center text-center">
          <div
            className="w-20 h-20 rounded-full flex items-center justify-center mb-6"
            style={{ backgroundColor: "#E8F5E9" }}
          >
            <CheckCircle size={36} style={{ color: "#2E7D32" }} />
          </div>

          <h2 className="text-[26px] font-extrabold text-gray-900 leading-tight mb-3">
            E-mail enviado!
          </h2>
          <p className="text-gray-500 text-sm leading-relaxed max-w-[280px] mb-2">
            Enviamos um link para{" "}
            <span className="font-bold text-gray-700">{email}</span>
          </p>
          <p className="text-gray-400 text-xs leading-relaxed max-w-[260px] mb-10">
            Verifique sua caixa de entrada e a pasta de spam. O link é válido por 30 minutos.
          </p>

          <button
            onClick={() => router.push("/login")}
            className="w-full font-bold py-4 rounded-full text-base shadow-md active:scale-95 transition-transform"
            style={{ backgroundColor: "#C6F59D", color: "#1F3D34" }}
          >
            Voltar ao login
          </button>

          <button
            onClick={() => setSent(false)}
            className="mt-4 text-xs font-semibold text-gray-400 active:scale-95 transition-transform"
          >
            Não recebi o e-mail — reenviar
          </button>
        </div>
      )}
    </div>
  );
}
