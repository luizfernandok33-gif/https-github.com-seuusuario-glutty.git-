"use client";

import { useState, type FormEvent } from "react";
import { LogoLockup } from "./Logo";
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
  GraduationCap,
  Landmark,
  Briefcase,
  MapPin,
} from "lucide-react";

const EXPERIENCE = [
  {
    icon: GraduationCap,
    title: "Comunicação Social — Publicidade e Propaganda",
    detail: "Centro Universitário IESB, Brasília · 2019",
  },
  {
    icon: Landmark,
    title: "Estágio em direção de arte",
    detail: "Interlegis — Senado Federal · 2017–2018",
  },
  {
    icon: Briefcase,
    title: "Direção de arte de social media",
    detail: "Agência Cobra Criada · 2021–2022",
  },
];

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

const COUNTRIES = [
  { iso: "CH", dial: "+41", flag: "🇨🇭", name: "Suíça" },
  { iso: "BR", dial: "+55", flag: "🇧🇷", name: "Brasil" },
  { iso: "DE", dial: "+49", flag: "🇩🇪", name: "Alemanha" },
  { iso: "AT", dial: "+43", flag: "🇦🇹", name: "Áustria" },
  { iso: "LI", dial: "+423", flag: "🇱🇮", name: "Liechtenstein" },
  { iso: "FR", dial: "+33", flag: "🇫🇷", name: "França" },
  { iso: "IT", dial: "+39", flag: "🇮🇹", name: "Itália" },
  { iso: "PT", dial: "+351", flag: "🇵🇹", name: "Portugal" },
  { iso: "ES", dial: "+34", flag: "🇪🇸", name: "Espanha" },
  { iso: "GB", dial: "+44", flag: "🇬🇧", name: "Reino Unido" },
  { iso: "US", dial: "+1", flag: "🇺🇸", name: "Estados Unidos" },
];

const PHONE_PLACEHOLDERS: Record<string, string> = {
  CH: "79 123 45 67",
  BR: "(11) 91234-5678",
};

function formatPhone(raw: string, iso: string) {
  if (iso === "BR") {
    const digits = raw.replace(/\D/g, "").slice(0, 11);
    if (digits.length <= 2) return digits;
    if (digits.length <= 6) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
    if (digits.length <= 10) {
      return `(${digits.slice(0, 2)}) ${digits.slice(2, 6)}-${digits.slice(6)}`;
    }
    return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
  }
  if (iso === "CH") {
    // Padrão suíço: 79 123 45 67
    const digits = raw.replace(/\D/g, "").slice(0, 9);
    return [digits.slice(0, 2), digits.slice(2, 5), digits.slice(5, 7), digits.slice(7, 9)]
      .filter(Boolean)
      .join(" ");
  }
  const digits = raw.replace(/\D/g, "").slice(0, 12);
  return digits.replace(/(\d{3})(?=\d)/g, "$1 ").trim();
}

type Status = "idle" | "submitting" | "success" | "error";

// Artes geradas no Higgsfield (Cinema Studio 2.5, 21:9).
// Para produção definitiva, baixe os PNGs para /public e troque as URLs.
const HERO_BG_URL =
  "https://d8j0ntlcm91z4.cloudfront.net/user_3F8mywUHWPcC5g8h8XCNYqmVDVb/hf_20260712_104626_4c6d1e62-5a6a-4add-86d1-9636b650f6e9.png";
const UFO_BANNER_URL =
  "https://d8j0ntlcm91z4.cloudfront.net/user_3F8mywUHWPcC5g8h8XCNYqmVDVb/hf_20260712_104726_e4e8c9dc-12f4-41e6-a3b5-63525a523f0f.png";

export default function AgenciaPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [country, setCountry] = useState("CH");
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
      const dial = COUNTRIES.find((c) => c.iso === country)?.dial ?? "+41";
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          phone: `${dial} ${phone}`,
          services: selectedServices,
        }),
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
        ].join(", "),
        backgroundSize: "100% 100%, 100% 100%, 100% 100%",
      }}
    >
      <style>{`
        @keyframes agencia-drift {
          from { background-position: 0 0, 0 0, 0 0; }
          to   { background-position: -540px 180px, 440px -260px, -280px -520px; }
        }
      `}</style>

      {/* Campo de estrelas animado */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0"
        style={{
          backgroundImage: [
            "radial-gradient(circle at 20% 30%, rgba(255,255,255,0.9) 0, rgba(255,255,255,0.9) 1px, transparent 1px)",
            "radial-gradient(circle at 70% 60%, rgba(255,255,255,0.7) 0, rgba(255,255,255,0.7) 1px, transparent 1px)",
            "radial-gradient(circle at 45% 80%, rgba(255,255,255,0.6) 0, rgba(255,255,255,0.6) 1px, transparent 1px)",
          ].join(", "),
          backgroundSize: "180px 180px, 220px 220px, 260px 260px",
          animation: "agencia-drift 240s linear infinite alternate",
        }}
      />

      {/* Arte do hero — astronauta (Higgsfield) */}
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-[560px] sm:h-[680px]">
        <div
          className="h-full w-full"
          style={{
            backgroundImage: `url(${HERO_BG_URL})`,
            backgroundSize: "cover",
            backgroundPosition: "center right",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#050308]/45 via-[#050308]/35 to-[#050308]" />
      </div>

      <div className="relative z-10 mx-auto max-w-5xl px-6 py-10 sm:py-16">
        {/* ── Brand ── */}
        <div className="flex justify-center">
          <LogoLockup />
        </div>

        {/* ── Hero ── */}
        <header className="mt-12 text-center max-w-2xl mx-auto">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-violet-300">
            <Sparkles size={12} />
            Marketing digital para brasileiros em Zurique
          </span>
          <h1 className="mt-6 text-4xl sm:text-5xl font-extrabold leading-tight">
            Sua marca em todo lugar que{" "}
            <span className="bg-gradient-to-r from-violet-400 to-pink-400 bg-clip-text text-transparent">
              importa
            </span>
          </h1>
          <p className="mt-5 text-base sm:text-lg text-white/60">
            Logo, campanhas, conteúdo, tráfego pago e presença digital completa —
            tudo em um só lugar. Deixe seu contato que eu te chamo com uma
            proposta sob medida.
          </p>
        </header>

        {/* ── About ── */}
        <section className="mt-16 max-w-2xl mx-auto">
          <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 sm:p-8 backdrop-blur-sm">
            <div className="flex items-center gap-4">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-violet-400 to-pink-400 text-[#050308]">
                <User size={22} />
              </span>
              <div>
                <h2 className="text-lg font-bold">Sobre mim</h2>
                <p className="flex items-center gap-1.5 text-xs text-white/50">
                  <MapPin size={12} />
                  Morando em Zurique, na Suíça, há 5 anos
                </p>
              </div>
            </div>

            <p className="mt-5 text-sm leading-relaxed text-white/70">
              Sou publicitário, formado em Comunicação Social — Publicidade e
              Propaganda pelo Centro Universitário IESB, em Brasília. Comecei
              como estagiário de direção de arte no Senado Federal e, depois,
              passei pela agência Cobra Criada, onde fui responsável pela
              direção de arte das peças de social media do órgão atendido.
            </p>
            <p className="mt-3 text-sm leading-relaxed text-white/70">
              Há 5 anos moro em Zurique, e nesse tempo venho me capacitando
              para atuar com o público brasileiro que vive por aqui e tem seu
              próprio negócio. Meu objetivo é ajudar esses empreendedores a
              estarem mais presentes no marketing digital e transformar
              seguidores em clientes.
            </p>

            <div className="mt-4 flex flex-wrap gap-2">
              {["Português — nativo", "Espanhol — B2", "Alemão — B1"].map((lang) => (
                <span
                  key={lang}
                  className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] font-semibold text-white/60"
                >
                  {lang}
                </span>
              ))}
            </div>

            <div className="mt-6 space-y-3 border-t border-white/10 pt-5">
              {EXPERIENCE.map(({ icon: Icon, title, detail }) => (
                <div key={title} className="flex items-start gap-3">
                  <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-violet-400/15">
                    <Icon size={15} className="text-violet-300" />
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-white/90">{title}</p>
                    <p className="text-xs text-white/50">{detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

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

        {/* ── Banner UFO (Higgsfield) ── */}
        <section className="mt-16" aria-hidden>
          <div
            className="flex min-h-[220px] items-end overflow-hidden rounded-3xl border border-white/10 sm:min-h-[300px]"
            style={{
              backgroundImage: `url(${UFO_BANNER_URL})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <div className="w-full bg-gradient-to-t from-[#050308]/85 to-transparent p-6 sm:p-8">
              <p className="text-lg font-extrabold sm:text-xl">
                Ideias de outro mundo{" "}
                <span className="bg-gradient-to-r from-violet-400 to-pink-400 bg-clip-text text-transparent">
                  para o seu negócio
                </span>
              </p>
            </div>
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
                  Vou entrar em contato em breve para falar sobre o seu
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

                <div className="flex gap-2">
                  <select
                    value={country}
                    onChange={(e) => {
                      setCountry(e.target.value);
                      setPhone(formatPhone(phone, e.target.value));
                    }}
                    aria-label="Código do país"
                    className="shrink-0 rounded-xl border border-white/10 bg-white/5 px-3 py-3.5 text-sm outline-none transition-colors focus:border-violet-400 [&>option]:bg-[#0B0B12] [&>option]:text-white"
                  >
                    {COUNTRIES.map(({ iso, dial, flag }) => (
                      <option key={iso} value={iso}>
                        {flag} {dial}
                      </option>
                    ))}
                  </select>
                  <div className="relative flex-1">
                    <Phone
                      size={16}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40"
                    />
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(formatPhone(e.target.value, country))}
                      placeholder={PHONE_PLACEHOLDERS[country] ?? "123 456 789"}
                      className="w-full rounded-xl border border-white/10 bg-white/5 py-3.5 pl-11 pr-4 text-sm outline-none placeholder:text-white/35 focus:border-violet-400 transition-colors"
                    />
                  </div>
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
          © {new Date().getFullYear()} Luiz Digital Marketing. Todos os
          direitos reservados.
        </footer>
      </div>
    </div>
  );
}
