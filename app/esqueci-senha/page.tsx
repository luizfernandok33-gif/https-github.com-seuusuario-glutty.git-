"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Mail, ArrowRight, CheckCircle } from "lucide-react";
import Link from "next/link";
import BackButton from "@/components/BackButton";
import { useLanguage } from "@/lib/i18n/LanguageProvider";

export default function EsqueciSenhaPage() {
  const router = useRouter();
  const { t } = useLanguage();
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
    <div
      className="min-h-dvh bg-white flex flex-col px-6"
      style={{
        paddingTop: "calc(env(safe-area-inset-top, 0px) + 48px)",
        paddingBottom: "calc(env(safe-area-inset-bottom, 0px) + 32px)",
      }}
    >

      {/* Back */}
      <div className="self-start mb-6">
        <BackButton />
      </div>

      {!sent ? (
        /* ── Form state ── */
        <div className="flex-1 flex flex-col">
          {/* Icon */}
          <div
            className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6"
            style={{ backgroundColor: "#D4EDD4" }}
          >
            <Mail size={28} style={{ color: "#1F3D34" }} />
          </div>

          <h1 className="text-[28px] font-black leading-tight mb-2 font-display whitespace-pre-line" style={{ color: "#1F3D34" }}>
            {t.esqueciSenha.title}
          </h1>
          <p className="text-sm font-semibold mb-6 leading-relaxed" style={{ color: "#5A6B65" }}>
            {t.esqueciSenha.subtitle}
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold mb-1.5" style={{ color: "#1F3D34" }}>{t.esqueciSenha.email}</label>
              <div className="relative">
                <Mail size={15} className="absolute left-4 top-1/2 -translate-y-1/2" style={{ color: "#8FA89E" }} />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={t.esqueciSenha.emailPlaceholder}
                  className="w-full rounded-xl pl-10 pr-4 py-3.5 text-sm outline-none transition-colors"
                  style={{ border: `1.5px solid ${isValid ? "#1F3D34" : "#D4EDD4"}`, color: "#1F3D34", backgroundColor: "#fff" }}
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={!isValid || loading}
              className="w-full flex items-center justify-center gap-2 font-black py-4 rounded-full text-base shadow-md transition-all active:scale-95 disabled:opacity-50"
              style={{ backgroundColor: "#1F3D34", color: "#C6F59D" }}
            >
              {loading ? (
                <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <span>{t.esqueciSenha.submit}</span>
                  <ArrowRight size={16} strokeWidth={2.5} />
                </>
              )}
            </button>
          </form>

          <p className="text-center text-xs font-semibold mt-6" style={{ color: "#5A6B65" }}>
            {t.esqueciSenha.rememberedPassword}{" "}
            <Link href="/login" className="font-black" style={{ color: "#1F3D34" }}>
              {t.esqueciSenha.login}
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

          <h2 className="text-[26px] font-black leading-tight mb-2 font-display" style={{ color: "#1F3D34" }}>
            {t.esqueciSenha.sentTitle}
          </h2>
          <p className="text-sm font-semibold leading-relaxed max-w-[280px] mb-2" style={{ color: "#5A6B65" }}>
            {t.esqueciSenha.sentSubtitlePrefix}{" "}
            <span className="font-black" style={{ color: "#1F3D34" }}>{email}</span>
          </p>
          <p className="text-xs font-semibold leading-relaxed max-w-[260px] mb-10" style={{ color: "#8FA89E" }}>
            {t.esqueciSenha.sentHint}
          </p>

          <button
            onClick={() => router.push("/login")}
            className="w-full font-black py-4 rounded-full text-base shadow-md active:scale-95 transition-transform"
            style={{ backgroundColor: "#1F3D34", color: "#C6F59D" }}
          >
            {t.esqueciSenha.backToLogin}
          </button>

          <button
            onClick={() => setSent(false)}
            className="mt-4 text-xs font-semibold active:scale-95 transition-transform" style={{ color: "#8FA89E" }}
          >
            {t.esqueciSenha.resend}
          </button>
        </div>
      )}
    </div>
  );
}
