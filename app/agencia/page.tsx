"use client";

import { useState, type FormEvent } from "react";
import {
  PenTool,
  Megaphone,
  Share2,
  FileText,
  Search,
  Rocket,
  Mic,
  Camera,
  Smartphone,
  Globe,
  LayoutTemplate,
  Mail,
  Phone,
  User,
  Check,
  Loader2,
  ArrowRight,
  Sparkles,
} from "lucide-react";

const SERVICES = [
  { icon: PenTool, label: "Criação de logo" },
  { icon: Megaphone, label: "Campanhas publicitárias" },
  { icon: Share2, label: "Social media" },
  { icon: FileText, label: "Criação de conteúdo" },
  { icon: Search, label: "Google Ads" },
  { icon: Rocket, label: "Mídia paga nas redes sociais" },
  { icon: Mic, label: "Roteiro para rádio e TV" },
  { icon: Camera, label: "Fotografia publicitária" },
  { icon: Smartphone, label: "Criação de aplicativos" },
  { icon: Globe, label: "Criação de sites" },
  { icon: LayoutTemplate, label: "Landing pages" },
];

function formatPhone(raw: string) {
  const digits = raw.replace(/\D/g, "").slice(0, 11);
  if (digits.length <= 2) return digits;
  if (digits.length <= 6) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
  if (digits.length <= 10) {
    return `(${digits.slice(0, 2)}) ${digits.slice(2, 6)}-${digits.slice(6)}`;
  }
  return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
}

type Status = "idle" | "submitting" | "success" | "error";

export default function AgenciaPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const toggleService = (label: string) => {
    setSelectedServices((prev) =>
      prev.includes(label) ? prev.filter((s) => s !== label) : [...prev, label]
    );
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus("submitting");
    setErrorMsg("");

    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, phone, services: selectedServices }),
      });
      const data = await res.json();

      if (!res.ok) {
        setStatus("error");
        setErrorMsg(data.error || "Não foi possível enviar. Tente novamente.");
        return;
      }

      setStatus("success");
    } catch {
      setStatus("error");
      setErrorMsg("Falha de conexão. Tente novamente em instantes.");
    }
  };

  return (
    <div
      className="fixed inset-0 overflow-y-auto text-white"
      style={{
        backgroundColor: "#050308",
        backgroundImage: [
          "radial-gradient(ellipse 900px 600px at 15% -10%, rgba(168,85,247,0.35), transparent 60%)",
          "radial-gradient(ellipse 800px 600px at 110% 15%, rgba(236,72,153,0.28), transparent 60%)",
          "radial-gradient(ellipse 700px 500px at 50% 100%, rgba(99,102,241,0.22), transparent 60%)",
          "radial-gradient(circle at 20% 30%, rgba(255,255,255,0.9) 0, rgba(255,255,255,0.9) 1px, transparent 1px)",
          "radial-gradient(circle at 70% 60%, rgba(255,255,255,0.7) 0, rgba(255,255,255,0.7) 1px, transparent 1px)",
          "radial-gradient(circle at 45% 80%, rgba(255,255,255,0.6) 0, rgba(255,255,255,0.6) 1px, transparent 1px)",
        ].join(", "),
        backgroundSize: "100% 100%, 100% 100%, 100% 100%, 180px 180px, 220px 220px, 260px 260px",
      }}
    >
      <div className="mx-auto max-w-5xl px-6 py-10 sm:py-16">
        {/* ── Brand bar ── */}
        <div className="flex items-center justify-center gap-2.5">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-violet-400 to-pink-400 text-sm font-black text-[#050308]">
            +
          </span>
          <span className="text-lg font-extrabold tracking-tight">Somar Criativa</span>
        </div>

        {/* ── Hero ── */}
        <header className="mt-10 text-center max-w-2xl mx-auto">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-violet-300">
            <Sparkles size={12} />
            Agência de marketing digital
          </span>
          <h1 className="mt-6 text-4xl sm:text-5xl font-extrabold leading-tight">
            Sua marca em todo lugar que{" "}
            <span className="bg-gradient-to-r from-violet-400 to-pink-400 bg-clip-text text-transparent">
              importa
            </span>
          </h1>
          <p className="mt-5 text-base sm:text-lg text-white/60">
            Logo, campanhas, conteúdo, tráfego pago e presença digital completa —
            tudo em um só lugar. Deixe seu contato e nossa equipe te chama com uma
            proposta sob medida.
          </p>
        </header>

        {/* ── Services ── */}
        <section className="mt-16">
          <h2 className="text-center text-sm font-semibold uppercase tracking-wider text-white/40">
            O que fazemos
          </h2>
          <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
            {SERVICES.map(({ icon: Icon, label }) => (
              <div
                key={label}
                className="flex items-center gap-2.5 rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3.5 backdrop-blur-sm transition-colors hover:border-violet-400/40"
              >
                <Icon size={18} className="shrink-0 text-violet-300" />
                <span className="text-sm font-medium text-white/85">{label}</span>
              </div>
            ))}
          </div>
        </section>

        {/* ── Lead form ── */}
        <section id="contato" className="mt-20 max-w-lg mx-auto">
          <div className="rounded-3xl border border-white/10 bg-white/[0.05] p-6 sm:p-8 backdrop-blur-sm shadow-[0_0_60px_-15px_rgba(168,85,247,0.35)]">
            {status === "success" ? (
              <div className="text-center py-8">
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-emerald-400/15">
                  <Check size={26} className="text-emerald-400" />
                </div>
                <h3 className="text-xl font-bold">Recebemos seu contato!</h3>
                <p className="mt-2 text-sm text-white/60">
                  Nossa equipe vai te chamar em breve para falar sobre o seu
                  projeto.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <h3 className="text-xl font-bold">Peça sua proposta</h3>
                  <p className="mt-1 text-sm text-white/60">
                    Preenchimento rápido, sem compromisso.
                  </p>
                </div>

                <div className="relative">
                  <User
                    size={16}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40"
                  />
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Seu nome"
                    className="w-full rounded-xl border border-white/10 bg-white/5 py-3.5 pl-11 pr-4 text-sm outline-none placeholder:text-white/35 focus:border-violet-400 transition-colors"
                  />
                </div>

                <div className="relative">
                  <Mail
                    size={16}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40"
                  />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Seu e-mail"
                    className="w-full rounded-xl border border-white/10 bg-white/5 py-3.5 pl-11 pr-4 text-sm outline-none placeholder:text-white/35 focus:border-violet-400 transition-colors"
                  />
                </div>

                <div className="relative">
                  <Phone
                    size={16}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40"
                  />
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(formatPhone(e.target.value))}
                    placeholder="(11) 91234-5678"
                    className="w-full rounded-xl border border-white/10 bg-white/5 py-3.5 pl-11 pr-4 text-sm outline-none placeholder:text-white/35 focus:border-violet-400 transition-colors"
                  />
                </div>

                <div>
                  <p className="mb-2 text-xs font-semibold text-white/50">
                    Serviços de interesse (opcional)
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {SERVICES.map(({ label }) => {
                      const active = selectedServices.includes(label);
                      return (
                        <button
                          key={label}
                          type="button"
                          onClick={() => toggleService(label)}
                          className={`rounded-full px-3 py-1.5 text-xs font-semibold transition-colors ${
                            active
                              ? "bg-violet-400 text-[#0B0B12]"
                              : "bg-white/5 text-white/60 border border-white/10"
                          }`}
                        >
                          {label}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {status === "error" && (
                  <p className="text-sm text-red-400">{errorMsg}</p>
                )}

                <button
                  type="submit"
                  disabled={status === "submitting"}
                  className="w-full flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-violet-500 to-pink-500 py-3.5 text-sm font-bold transition-transform active:scale-95 disabled:opacity-60"
                >
                  {status === "submitting" ? (
                    <>
                      <Loader2 size={16} className="animate-spin" />
                      Enviando...
                    </>
                  ) : (
                    <>
                      Quero uma proposta
                      <ArrowRight size={16} />
                    </>
                  )}
                </button>

                <p className="text-center text-[11px] text-white/35">
                  Seus dados são usados apenas para entrarmos em contato sobre o
                  seu projeto.
                </p>
              </form>
            )}
          </div>
        </section>

        {/* ── Footer ── */}
        <footer className="mt-16 text-center text-[11px] text-white/30">
          © {new Date().getFullYear()} Somar Criativa. Todos os direitos reservados.
        </footer>
      </div>
    </div>
  );
}
