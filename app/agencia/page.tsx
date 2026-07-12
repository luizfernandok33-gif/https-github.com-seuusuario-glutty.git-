"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import Image from "next/image";
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
  Building2,
  MessageSquare,
  Compass,
  Lightbulb,
  Palette,
  ClipboardCheck,
  Send,
  ExternalLink,
  Clock,
} from "lucide-react";
import Link from "next/link";

type SocialIconProps = { size?: number; className?: string };

function LinkedinIcon({ size = 15, className }: SocialIconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden>
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

function InstagramIcon({ size = 15, className }: SocialIconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden>
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}

function GithubIcon({ size = 15, className }: SocialIconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden>
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  );
}

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
  {
    icon: Globe,
    title: "Design gráfico institucional",
    detail: "ARCTEL-CPLP, Lisboa · 2020",
  },
  {
    icon: GraduationCap,
    title: "UX, UI e Product Design",
    detail: "UX Unicorn Program · 2023, com formação em IA em andamento",
  },
];

const SERVICES = [
  { icon: PenTool, label: "Identidade visual & logo" },
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
  { icon: Palette, label: "UX/UI & Product Design" },
  { icon: Sparkles, label: "IA aplicada a produtos digitais" },
];

const PROCESS_STEPS = [
  {
    icon: Compass,
    title: "Descoberta",
    detail: "Entendo seu negócio, seu público e o que você quer alcançar.",
  },
  {
    icon: Search,
    title: "Pesquisa",
    detail: "Analiso mercado, concorrência e comportamento do seu cliente.",
  },
  {
    icon: Lightbulb,
    title: "Estratégia",
    detail: "Defino o caminho: canais, mensagem e prioridades.",
  },
  {
    icon: Palette,
    title: "Design",
    detail: "Crio as peças, campanhas ou produto com identidade própria.",
  },
  {
    icon: ClipboardCheck,
    title: "Validação",
    detail: "Testo com pessoas reais e ajusto antes de lançar.",
  },
  {
    icon: Send,
    title: "Entrega",
    detail: "Lanço, acompanho os resultados e otimizo com você.",
  },
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

function Reveal({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("is-visible");
          io.disconnect();
        }
      },
      { threshold: 0.12 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <div ref={ref} className={`reveal ${className}`}>
      {children}
    </div>
  );
}

function SectionHeading({ index, title }: { index: string; title: string }) {
  return (
    <div className="mb-8 flex items-end gap-4">
      <div>
        <p className="text-[11px] font-bold tracking-[0.3em] text-white/30">{index}</p>
        <h2 className="mt-1 text-2xl font-extrabold uppercase tracking-tight sm:text-3xl">
          {title}
        </h2>
      </div>
      <span className="mb-2 h-px flex-1 bg-white/10" />
    </div>
  );
}

const NAV_LINKS = [
  { href: "#sobre", label: "Sobre" },
  { href: "#servicos", label: "Serviços" },
  { href: "#processo", label: "Processo" },
  { href: "#projeto", label: "Projeto" },
  { href: "#contato", label: "Contato" },
];

const STATS = [
  { value: "9+", label: "anos criando para marcas" },
  { value: "3", label: "países de experiência" },
  { value: "5", label: "anos em Zurique" },
];

// Artes geradas no Higgsfield (Cinema Studio 2.5, 21:9).
// Para produção definitiva, baixe os PNGs para /public e troque as URLs.
const HERO_BG_URL =
  "https://d8j0ntlcm91z4.cloudfront.net/user_3F8mywUHWPcC5g8h8XCNYqmVDVb/hf_20260712_123622_5a844b6d-867a-4b24-9194-b8ba1f2fe206.png";
const UFO_BANNER_URL =
  "https://d8j0ntlcm91z4.cloudfront.net/user_3F8mywUHWPcC5g8h8XCNYqmVDVb/hf_20260712_104726_e4e8c9dc-12f4-41e6-a3b5-63525a523f0f.png";

export default function AgenciaPage() {
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
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
          company,
          email,
          phone: `${dial} ${phone}`,
          message,
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
        html { scroll-behavior: smooth; }
        .reveal {
          opacity: 0;
          transform: translateY(28px);
          transition: opacity 0.7s ease, transform 0.7s ease;
        }
        .reveal.is-visible {
          opacity: 1;
          transform: none;
        }
        @media (prefers-reduced-motion: reduce) {
          .agencia-stars { animation: none !important; }
          html { scroll-behavior: auto; }
          .reveal { opacity: 1; transform: none; transition: none; }
        }
      `}</style>

      {/* Campo de estrelas animado */}
      <div
        aria-hidden
        className="agencia-stars pointer-events-none fixed inset-0"
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
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-[640px] sm:h-[760px]">
        <div
          className="h-full w-full"
          style={{
            backgroundImage: `url(${HERO_BG_URL})`,
            backgroundSize: "cover",
            backgroundPosition: "center right",
          }}
        />
        {/* Texto à esquerda: escurece a esquerda e funde a base com o fundo */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#050308] via-[#050308]/55 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#050308]" />
      </div>

      {/* ── Nav ── */}
      <nav className="sticky top-0 z-40 border-b border-white/5 bg-[#050308]/70 backdrop-blur">
        <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-6 py-3">
          <a href="#topo" aria-label="Luiz — Digital Marketing">
            <Image
              src="/logo-luiz.png"
              alt=""
              width={799}
              height={250}
              priority
              className="h-7 w-auto sm:h-8"
            />
          </a>
          <div className="flex items-center gap-4 overflow-x-auto text-[11px] font-bold uppercase tracking-wider">
            {NAV_LINKS.map(({ href, label }) => (
              <a
                key={href}
                href={href}
                className={
                  href === "#contato"
                    ? "shrink-0 rounded-full bg-gradient-to-r from-violet-500 to-pink-500 px-3.5 py-1.5"
                    : "hidden shrink-0 text-white/55 transition-colors hover:text-white sm:block"
                }
              >
                {label}
              </a>
            ))}
          </div>
        </div>
      </nav>

      <div id="topo" className="relative z-10 mx-auto max-w-5xl px-6 py-10 sm:py-14">
        {/* ── Hero ── */}
        <header className="flex min-h-[520px] max-w-xl flex-col items-start justify-center text-left sm:min-h-[600px]">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-violet-300">
            <Sparkles size={12} />
            Marketing digital para brasileiros em Zurique
          </span>
          <h1 className="mt-6 text-4xl sm:text-5xl font-extrabold leading-tight">
            Transformo ideias em{" "}
            <span className="bg-gradient-to-r from-violet-400 to-pink-400 bg-clip-text text-transparent">
              experiências digitais
            </span>
          </h1>
          <p className="mt-5 text-base sm:text-lg text-white/60">
            Sou Luiz — publicitário, UX/UI e Product Designer. Desenvolvo marcas,
            campanhas, sites e produtos digitais combinando pesquisa, estratégia,
            design e tecnologia. Deixe seu contato que eu te chamo com uma
            proposta sob medida.
          </p>
          <div className="mt-7 flex flex-wrap items-center gap-3">
            <a
              href="#contato"
              className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-violet-500 to-pink-500 px-6 py-3.5 text-sm font-bold transition-transform active:scale-95"
            >
              Iniciar um projeto
              <ArrowRight size={16} />
            </a>
            <a
              href="#projeto"
              className="flex items-center gap-2 rounded-xl border border-white/15 bg-white/5 px-6 py-3.5 text-sm font-bold text-white/80 transition-colors hover:border-violet-400/40"
            >
              Ver projeto em destaque
            </a>
          </div>
        </header>

        {/* ── Stats ── */}
        <Reveal>
          <section className="mx-auto mt-20 grid max-w-3xl grid-cols-3 gap-4 text-center">
            {STATS.map(({ value, label }) => (
              <div key={label}>
                <p className="text-4xl font-light tabular-nums sm:text-6xl">{value}</p>
                <p className="mx-auto mt-2 max-w-[140px] text-[10px] font-semibold uppercase tracking-[0.2em] text-white/40">
                  {label}
                </p>
              </div>
            ))}
          </section>
        </Reveal>

        {/* ── About ── */}
        <section id="sobre" className="mt-20 max-w-2xl mx-auto scroll-mt-20">
          <Reveal>
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
              Também trabalhei em Lisboa com design institucional e, já na
              Suíça, me especializei em UX/UI e Product Design — incluindo IA
              aplicada a produtos digitais. Há 5 anos moro em Zurique, me
              capacitando para atuar com o público brasileiro que vive por aqui
              e tem seu próprio negócio. Meu objetivo é ajudar esses
              empreendedores a estarem mais presentes no marketing digital e
              transformar seguidores em clientes.
            </p>

            <div className="mt-4 flex flex-wrap gap-2">
              {[
                "🇧🇷 Brasil",
                "🇵🇹 Portugal",
                "🇨🇭 Suíça",
                "Português — nativo",
                "Espanhol — B2",
                "Alemão — B1",
              ].map((chip) => (
                <span
                  key={chip}
                  className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] font-semibold text-white/60"
                >
                  {chip}
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
          </Reveal>
        </section>

        {/* ── Services ── */}
        <section id="servicos" className="mt-20 scroll-mt-20">
          <Reveal>
          <SectionHeading index="01" title="O que eu faço" />
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
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
          </Reveal>
        </section>

        {/* ── Processo ── */}
        <section id="processo" className="mt-20 scroll-mt-20">
          <Reveal>
          <SectionHeading index="02" title="Como eu trabalho" />
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {PROCESS_STEPS.map(({ icon: Icon, title, detail }, i) => (
              <div
                key={title}
                className="rounded-2xl border border-white/10 bg-white/[0.04] p-5 backdrop-blur-sm"
              >
                <div className="flex items-center gap-3">
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-violet-400/15">
                    <Icon size={16} className="text-violet-300" />
                  </span>
                  <p className="text-sm font-bold">
                    <span className="mr-1.5 text-white/35">{i + 1}.</span>
                    {title}
                  </p>
                </div>
                <p className="mt-3 text-xs leading-relaxed text-white/55">{detail}</p>
              </div>
            ))}
          </div>
          </Reveal>
        </section>

        {/* ── Projeto em destaque ── */}
        <section id="projeto" className="mt-20 scroll-mt-20">
          <Reveal>
          <SectionHeading index="03" title="Projeto em destaque" />
          <div className="flex flex-col items-center gap-6 rounded-3xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur-sm sm:flex-row sm:p-8">
            <Image
              src="/case-glutty.png"
              alt="Mascote do app Glútty"
              width={160}
              height={160}
              className="h-32 w-32 shrink-0 object-contain sm:h-40 sm:w-40"
            />
            <div className="text-center sm:text-left">
              <p className="text-xl font-extrabold">Glútty</p>
              <p className="mt-1 text-xs font-semibold uppercase tracking-wider text-violet-300">
                Product Design de ponta a ponta
              </p>
              <p className="mt-3 text-sm leading-relaxed text-white/70">
                App que ajuda pessoas celíacas a encontrar e avaliar restaurantes
                sem glúten com confiança, transparência e validação da
                comunidade. Conduzi tudo: pesquisa com 86 participantes,
                entrevistas, arquitetura de informação, design system, protótipo
                e lançamento.
              </p>
              <Link
                href="/"
                className="mt-4 inline-flex items-center gap-1.5 text-sm font-bold text-violet-300 transition-colors hover:text-violet-200"
              >
                Ver o projeto ao vivo
                <ExternalLink size={14} />
              </Link>
            </div>
          </div>
          </Reveal>
        </section>

        {/* ── Banner UFO (Higgsfield) ── */}
        <section className="mt-16" aria-hidden>
          <Reveal>
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
          </Reveal>
        </section>

        {/* ── Lead form ── */}
        <section id="contato" className="mt-20 max-w-lg mx-auto scroll-mt-20">
          <Reveal>
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
                  <Building2
                    size={16}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40"
                  />
                  <input
                    type="text"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    placeholder="Sua empresa (opcional)"
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

                <div className="relative">
                  <MessageSquare
                    size={16}
                    className="absolute left-4 top-4 text-white/40"
                  />
                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Conte um pouco do seu projeto (opcional)"
                    rows={3}
                    className="w-full resize-none rounded-xl border border-white/10 bg-white/5 py-3.5 pl-11 pr-4 text-sm outline-none placeholder:text-white/35 focus:border-violet-400 transition-colors"
                  />
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
          </Reveal>
        </section>

        {/* ── Footer ── */}
        <footer className="mt-16 border-t border-white/10 pt-10">
          <div className="flex flex-col items-center gap-6 text-center">
            <LogoLockup className="h-12 sm:h-14" />

            <div className="flex flex-col items-center gap-1.5 text-xs text-white/50">
              <p className="flex items-center gap-1.5">
                <MapPin size={12} />
                Zurique, Suíça
              </p>
              <p className="flex items-center gap-1.5">
                <Clock size={12} />
                Seg–Qui 10h–21h · Sex e Sáb 10h–18h · Dom 10h–20h (horário
                suíço)
              </p>
            </div>

            {/* Perfis sociais — atualizar os links quando definidos */}
            <div className="flex items-center gap-3">
              {[
                { icon: LinkedinIcon, label: "LinkedIn" },
                { icon: InstagramIcon, label: "Instagram" },
                { icon: GithubIcon, label: "GitHub" },
              ].map(({ icon: Icon, label }) => (
                <a
                  key={label}
                  href="#"
                  aria-label={label}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/60 transition-colors hover:border-violet-400/40 hover:text-white"
                >
                  <Icon size={15} />
                </a>
              ))}
            </div>

            <p className="pb-2 text-[11px] text-white/30">
              © {new Date().getFullYear()} Luiz Digital Marketing. Todos os
              direitos reservados.
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
}
