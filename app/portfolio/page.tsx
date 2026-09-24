import Image from "next/image";
import Link from "next/link";
import SafetyBadge from "@/components/SafetyBadge";

// Artigo original publicado no Medium.
const MEDIUM_URL =
  "https://medium.com/@luizfernandok33/gl%C3%BAtty-mais-seguran%C3%A7a-e-confian%C3%A7a-para-pessoas-cel%C3%ADacas-ao-comer-fora-3d0f45849a14";

// Total de respostas válidas da pesquisa quantitativa (PT + DE + EN).
const N = 86;
const pct = (n: number) => Math.round((n / N) * 100);

/* ───────────────────────── Dados da pesquisa ───────────────────────── */

const STATS = [
  { value: 86, suffix: "", text: <>respostas em <strong>3 idiomas</strong>, sobretudo do Brasil (43) e da Suíça (38).</> },
  { value: pct(58), suffix: "%", text: <>já <strong>passaram mal</strong> depois de uma refeição vendida como “sem glúten”.</> },
  { value: pct(77), suffix: "%", text: <>já <strong>deixaram de sair</strong> por falta de opções confiáveis.</> },
  { value: pct(67), suffix: "%", text: <>se sentiram <strong>constrangidos</strong> ao explicar a própria restrição.</> },
];

type Bar = { label: string; n: number };
const CHARTS: { title: string; sub: string; bars: Bar[] }[] = [
  {
    title: "Maiores medos ao comer fora",
    sub: "Até 3 escolhas por pessoa",
    bars: [
      { label: "Equipe despreparada", n: 77 },
      { label: "Contaminação cruzada", n: 72 },
      { label: "Ingredientes escondidos", n: 58 },
      { label: "Informação pouco clara no cardápio", n: 44 },
      { label: "Reações físicas graves", n: 28 },
    ],
  },
  {
    title: "O que gera confiança em um restaurante",
    sub: "Múltipla escolha",
    bars: [
      { label: "Avaliações de outros celíacos", n: 77 },
      { label: "Equipe treinada", n: 72 },
      { label: "Selo de certificação sem glúten", n: 69 },
      { label: "Cozinha separada", n: 62 },
      { label: "Cardápio detalhado com ingredientes", n: 59 },
    ],
  },
  {
    title: "Onde buscam lugares seguros hoje",
    sub: "Múltipla escolha",
    bars: [
      { label: "Recomendações de outros celíacos", n: 76 },
      { label: "Google", n: 58 },
      { label: "Instagram", n: 50 },
      { label: "Aplicativos especializados", n: 38 },
    ],
  },
  {
    title: "O que esperam de uma plataforma",
    sub: "Múltipla escolha",
    bars: [
      { label: "Lista de restaurantes seguros", n: 81 },
      { label: "Avaliações de outros celíacos", n: 75 },
      { label: "Geolocalização de lugares próximos", n: 69 },
      { label: "Informações sobre contaminação cruzada", n: 50 },
      { label: "Produtos certificados na região", n: 33 },
      { label: "Filtros por tipo de intolerância", n: 30 },
    ],
  },
];

const PAINS = [
  { title: "Medo de contaminação", text: "Uma migalha basta para dias ou semanas de sintomas. O medo acompanha cada refeição fora de casa." },
  { title: "Perda de espontaneidade", text: "Comer fora exige pesquisa, ligações e planejamento. Nada é “só ir”." },
  { title: "Informação pouco confiável", text: "Apps, cardápios e até atendentes passam dados vagos ou contraditórios." },
  { title: "Custo e acesso", text: "Comida sem glúten costuma ser mais cara e quase some fora das capitais." },
  { title: "Falta de preparo e empatia", text: "Equipes que minimizam a doença ou confundem celíaca com dieta da moda." },
  { title: "Isolamento social", text: "Convites recusados e a sensação constante de ser “a pessoa diferente” da mesa." },
];

// Citações das entrevistas, sem identificar os participantes.
const QUOTES = [
  { text: "Comer fora é um ato de coragem. Mas quando há empatia, vira um ato de amor.", who: "Participante, Rio Grande do Sul", wide: true },
  { text: "Quando o atendente não sabe responder, eu já sei que não é o lugar certo.", who: "Participante, São Paulo" },
  { text: "Nosso iFood são os colegas celíacos. A gente pergunta no grupo, não no app.", who: "Participante, São Paulo" },
  { text: "Se tivesse um aplicativo com todos os lugares sem glúten, com filtro por tipo de comida e cidade, seria perfeito.", who: "Participante, São Paulo", wide: true },
  { text: "Um aplicativo assim ia ser uma mão na roda para quem está começando.", who: "Participante, interior da Paraíba", full: true },
];

const PERSONAS = [
  {
    name: "Luana",
    role: "A jovem urbana",
    mvp: true,
    bio: "25–35 anos, trabalha em cidade grande e tem vida social ativa.",
    needs: "Descobrir lugares seguros rápido, com filtros e prova social.",
    feels: "Quer liberdade e menos ansiedade.",
  },
  {
    name: "Guilherme",
    role: "Recém-diagnosticado do interior",
    mvp: true,
    bio: "20–40 anos, vive em cidade pequena e recebeu o diagnóstico há pouco.",
    needs: "Um passo a passo inicial, comunidade local e mercados próximos.",
    feels: "Quer segurança e acolhimento.",
  },
  {
    name: "Vera",
    role: "Mãe cuidadora",
    mvp: false,
    bio: "35–50 anos, cuida de um filho celíaco em idade escolar.",
    needs: "Planejar festas e eventos, falar com a escola, achar buffets verificados.",
    feels: "Quer respeito e menos culpa.",
  },
  {
    name: "Breno",
    role: "Viajante e empreendedor",
    mvp: false,
    bio: "30–55 anos, viaja a trabalho entre cidades e países.",
    needs: "Informação confiável por cidade, filtros por país e apoio em viagem.",
    feels: "Quer representatividade e impacto.",
  },
];

const RESEARCH_TO_DESIGN = [
  {
    heard: "Contaminação cruzada",
    detail: `${pct(72)}% citam como um dos maiores medos.`,
    did: <><b>Selos de segurança</b> em todo restaurante e prato, do “Muito seguro” ao “Cuidado”, com o mesmo código visual no app inteiro.</>,
  },
  {
    heard: "Confiança vem de outros celíacos",
    detail: `${pct(76)}% buscam indicações na comunidade.`,
    did: <><b>Avaliações feitas por celíacos</b> e uma área de comunidade com relatos verificados, em vez de notas genéricas.</>,
  },
  {
    heard: "Equipe despreparada",
    detail: `${pct(77)}% têm esse medo.`,
    did: <>Na avaliação, <b>tags estruturadas</b> como “Equipe treinada”, “Cozinha separada” e “Ingredientes claros” mostram o que realmente importa.</>,
  },
  {
    heard: "Ingredientes escondidos",
    detail: `${pct(58)}% têm esse medo.`,
    did: <>A tela do prato lista os <b>ingredientes declarados</b> pelo restaurante e destaca as adaptações feitas.</>,
  },
  {
    heard: "Constrangimento ao explicar",
    detail: `${pct(67)}% já passaram por isso.`,
    did: <>Um <b>perfil alimentar</b> com restrições, ingredientes proibidos e padrão de segurança, que filtra tudo o que o app mostra.</>,
  },
];

const MVP_IN = [
  "Busca de restaurantes pela localização ou por uma região escolhida",
  "Filtros por restrições alimentares, a partir do padrão de segurança",
  "Padrão de segurança do usuário, definido no onboarding e editável no perfil",
  "Feedbacks de usuários focados em segurança",
  "Pratos e ingredientes declarados pelo restaurante",
  "Cartão digital de segurança para usar no atendimento",
  "Favoritar restaurantes seguros",
];
const MVP_LATER = [
  "Reserva online e delivery, que dependem de integrações externas",
  "Comunidade local, que exige moderação e curadoria",
  "Sugestões personalizadas por comportamento",
  "Selo de compromisso com a segurança, que pede governança",
  "Fotos dos pratos e vídeos educativos sobre contaminação cruzada",
];

type Screen = { path: string; title: string; note: string };
const JOURNEY: { title: string; text: string; task: string; screens: Screen[] }[] = [
  {
    title: "Primeiro contato",
    text: "O onboarding escolhe o idioma, apresenta a proposta e pergunta o que é seguro para a pessoa. Essa resposta vira o padrão de segurança que filtra o resto do app.",
    task: "Depois das primeiras telas e do cadastro, você sentiu vontade de continuar explorando?",
    screens: [
      { path: "/idioma", title: "Idioma", note: "Português, inglês e alemão, pensando no público da Suíça." },
      { path: "/welcome", title: "Boas-vindas", note: "A promessa: comer fora sem ansiedade." },
      { path: "/onboarding", title: "Padrão de segurança", note: "O usuário define o que é seguro para ele." },
    ],
  },
  {
    title: "Encontrar um restaurante",
    text: "A home abre com a localização e o padrão de segurança à vista. As listas priorizam lugares muito seguros por perto e os mais bem avaliados por celíacos.",
    task: "Quais informações mais ajudaram você a confiar, ou desconfiar, do restaurante?",
    screens: [
      { path: "/home", title: "Home", note: "Saudação, busca por cidade e restaurantes próximos." },
      { path: "/busca", title: "Busca", note: "Filtros por culinária e pelo nível de segurança." },
      { path: "/categoria/mais-seguros", title: "Categoria", note: "Coleções como “Mais seguros” e “Festa sem glúten”." },
    ],
  },
  {
    title: "Analisar o prato",
    text: "O restaurante mostra protocolos contra contaminação cruzada, restrições atendidas e avaliações. No prato, cada ingrediente aparece com o status em relação ao perfil do usuário.",
    task: "As informações sobre ingredientes, adaptações e segurança pareceram claras?",
    screens: [
      { path: "/restaurante/1", title: "Restaurante", note: "Selo, protocolos, restrições atendidas e avaliações." },
      { path: "/restaurante/1/prato/d1", title: "Prato", note: "Ingredientes alinhados ao perfil e alertas de risco." },
    ],
  },
  {
    title: "Comunidade e avaliação",
    text: "A pergunta principal da avaliação não é sobre estrelas. É “Você se sentiu seguro?”. Cada relato vira informação para a próxima pessoa celíaca.",
    task: "Como você se sentiu ao poder compartilhar sua experiência e ajudar outras pessoas?",
    screens: [
      { path: "/comunidade", title: "Comunidade", note: "Relatos verificados de quem tem as mesmas restrições." },
      { path: "/restaurante/1/avaliar", title: "Avaliar", note: "Segurança primeiro, depois tags e comentário." },
    ],
  },
  {
    title: "Perfil",
    text: "O perfil é o cérebro da personalização. Restrições, ingredientes proibidos e padrão de segurança mudam a busca, as recomendações e os alertas.",
    task: "Você sentiu que tinha controle e clareza sobre suas preferências alimentares?",
    screens: [
      { path: "/perfil", title: "Meu perfil", note: "Diagnóstico, restrições e jornada no app." },
      { path: "/perfil/restricoes", title: "Restrições", note: "Restrições e ingredientes proibidos editáveis." },
      { path: "/perfil/seguranca", title: "Padrão de segurança", note: "O que deve ser evitado nas recomendações." },
    ],
  },
];

const TEST_STAGES = [
  { title: "Primeiro contato", q: "Você sentiu vontade de continuar explorando o aplicativo? Por quê?" },
  { title: "Encontrar restaurante", q: "Quais informações mais ajudaram você a confiar, ou desconfiar, do restaurante?" },
  { title: "Analisar prato", q: "As informações sobre ingredientes, adaptações e segurança pareceram claras?" },
  { title: "Comunidade", q: "As experiências de outros usuários ajudaram você a decidir com mais confiança?" },
  { title: "Avaliar restaurante", q: "Como você se sentiu ao compartilhar sua experiência para ajudar outras pessoas?" },
  { title: "Perfil", q: "Você sentiu que tinha controle e clareza sobre suas preferências alimentares?" },
  { title: "Encerramento", q: "O Glútty ajudaria você no dia a dia? Em que momento você se sentiu mais seguro ou acolhido?" },
];

const COLORS = [
  { name: "Verde Glútty", hex: "#1F3D34" },
  { name: "Lima", hex: "#C6F59D" },
  { name: "Creme", hex: "#F5F2DF" },
  { name: "Laranja", hex: "#FC6904" },
  { name: "Sucesso", hex: "#2E7D32" },
  { name: "Alerta", hex: "#F59E0B" },
  { name: "Erro", hex: "#E53935" },
  { name: "Texto", hex: "#1C1C1C" },
];

/* ───────────────────────── Componentes ───────────────────────── */

function Phone({ path, title, interactive = false, className = "" }: { path: string; title: string; interactive?: boolean; className?: string }) {
  return (
    <div className={`pf-phone ${interactive ? "" : "pf-phone-static"} ${className}`}>
      <div className="pf-phone-screen">
        <iframe
          src={path}
          title={title}
          loading="lazy"
          tabIndex={interactive ? 0 : -1}
          // Evita pedidos de permissão (ex.: localização) para quem visita o portfólio.
          allow="geolocation 'none'"
          aria-hidden={interactive ? undefined : true}
        />
      </div>
    </div>
  );
}

function BarChart({ title, sub, bars }: { title: string; sub: string; bars: Bar[] }) {
  return (
    <figure className="pf-chart pf-reveal">
      <figcaption>
        <h3>{title}</h3>
        <p>{sub} · % das {N} pessoas respondentes</p>
      </figcaption>
      <ul className="pf-bars">
        {bars.map((b) => (
          <li key={b.label} className="pf-bar" title={`${b.label}: ${b.n} de ${N} pessoas (${pct(b.n)}%)`}>
            <div className="pf-bar-label">
              <span>{b.label}</span>
              <span className="pf-bar-value">
                {pct(b.n)}%<span>{b.n}</span>
              </span>
            </div>
            <div className="pf-bar-track" aria-hidden>
              <div className="pf-bar-fill" style={{ "--w": `${pct(b.n)}%` } as React.CSSProperties} />
            </div>
          </li>
        ))}
      </ul>
    </figure>
  );
}

function Check({ color = "currentColor" }: { color?: string }) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M5 12.5 10 17.5 19 7" stroke={color} strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function Later() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="12" cy="12" r="8" stroke="#6c776f" strokeWidth="2" />
      <path d="M12 8v4l2.5 2" stroke="#6c776f" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function ArrowRight() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function SectionHead({ index, eyebrow, title, lead }: { index: string; eyebrow: string; title: React.ReactNode; lead?: React.ReactNode }) {
  return (
    <header className="pf-section-head pf-reveal">
      <span className="pf-eyebrow">
        <span className="pf-index">{index}</span> {eyebrow}
      </span>
      <h2 className="pf-h2">{title}</h2>
      {lead && <p className="pf-lead">{lead}</p>}
    </header>
  );
}

/* ───────────────────────── Página ───────────────────────── */

export default function PortfolioPage() {
  return (
    <main>
      {/* Navegação */}
      <nav className="pf-nav" aria-label="Seções do estudo de caso">
        <div className="pf-wrap pf-nav-inner">
          <a href="#topo" className="pf-brand">
            <Image src="/glútty novo.png" alt="" width={34} height={34} unoptimized />
            Glútty <small>Estudo de caso UX/UI</small>
          </a>
          <div className="pf-nav-links">
            <a href="#problema">Problema</a>
            <a href="#pesquisa">Pesquisa</a>
            <a href="#definicao">Definição</a>
            <a href="#telas">Telas</a>
            <a href="#validacao">Validação</a>
          </div>
          <a className="pf-btn pf-btn-primary pf-btn-sm" href={MEDIUM_URL} target="_blank" rel="noopener noreferrer">
            Ler no Medium
          </a>
        </div>
      </nav>

      {/* Hero */}
      <section className="pf-hero" id="topo">
        <div className="pf-wrap pf-hero-grid">
          <div className="pf-hero-copy">
            <span className="pf-eyebrow">Estudo de caso · UX/UI · 2025–2026</span>
            <h1 className="pf-h1">
              Comer fora <em>sem medo</em>.
            </h1>
            <p className="pf-lead">
              O Glútty é um app que dá mais segurança e confiança para pessoas celíacas na hora de comer fora. Este estudo
              mostra como a pesquisa com 86 pessoas e 8 entrevistas virou um protótipo navegável.
            </p>
            <div className="pf-hero-actions">
              <a className="pf-btn pf-btn-primary" href="#telas">
                Ver as telas <ArrowRight />
              </a>
              <a className="pf-btn pf-btn-ghost" href={MEDIUM_URL} target="_blank" rel="noopener noreferrer">
                Artigo completo no Medium
              </a>
            </div>
            <dl className="pf-meta">
              <div>
                <dt>Meu papel</dt>
                <dd>UX Research, UX Strategy, UX Design e UX Writing</dd>
              </div>
              <div>
                <dt>Contexto</dt>
                <dd>Projeto do curso UX Unicórnio, feito de ponta a ponta</dd>
              </div>
              <div>
                <dt>Métodos</dt>
                <dd>Desk research, matriz CSD, survey, entrevistas, personas, jornada, teste no Maze</dd>
              </div>
              <div>
                <dt>Ferramentas</dt>
                <dd>Figma, Google Docs, Maze, Tactiq, ChatGPT, Claude Code e Vercel</dd>
              </div>
            </dl>
          </div>
          <div className="pf-hero-device">
            <Phone path="/welcome" title="Protótipo navegável do Glútty" interactive className="pf-phone-hero" />
            <span className="pf-hero-hint">Protótipo real. Navegue aqui dentro.</span>
          </div>
        </div>
      </section>

      {/* Números */}
      <section className="pf-section pf-dark" aria-labelledby="numeros">
        <div className="pf-wrap">
          <SectionHead
            index="00"
            eyebrow="O cenário em números"
            title={<span id="numeros">Para quem é celíaco, comer fora <em>é um risco</em>.</span>}
          />
          <div className="pf-stats pf-reveal">
            {STATS.map((s, i) => (
              <div className="pf-stat" key={i}>
                <div className="pf-stat-num">
                  {s.value}
                  {s.suffix && <small>{s.suffix}</small>}
                </div>
                <p>{s.text}</p>
              </div>
            ))}
          </div>
          <p className="pf-footnote">Pesquisa quantitativa com {N} respostas válidas em português, alemão e inglês.</p>
        </div>
      </section>

      {/* Problema */}
      <section className="pf-section" id="problema">
        <div className="pf-wrap pf-split">
          <div className="pf-reveal">
            <span className="pf-eyebrow">
              <span className="pf-index">01</span> Como tudo começou
            </span>
            <p className="pf-origin" style={{ marginTop: 20 }}>
              Num encontro em casa, um amigo não comeu nada. Ninguém tinha perguntado se ele tinha alguma restrição
              alimentar.
            </p>
          </div>
          <div className="pf-prose pf-reveal">
            <h2 className="pf-h3" style={{ marginBottom: 20 }}>
              O problema
            </h2>
            <p>
              A doença celíaca é autoimune. Para quem a tem, o glúten do trigo, da cevada e do centeio danifica o intestino,
              e o único tratamento é uma dieta rigorosa sem glúten.
            </p>
            <p>
              O maior perigo fora de casa é a <strong>contaminação cruzada</strong>. Uma migalha na chapa, o mesmo óleo da
              fritura ou uma faca compartilhada bastam para causar uma reação. E como o glúten é uma proteína, o calor não o
              elimina.
            </p>
            <p>
              Hoje, a pessoa celíaca decide onde comer com base em grupos de WhatsApp, posts no Instagram e perguntas ao
              garçom. <strong>Como ajudar essas pessoas a escolher um lugar com confiança, sem transformar cada refeição em
              uma investigação?</strong>
            </p>
          </div>
        </div>
      </section>

      {/* Processo */}
      <section className="pf-section pf-paper" style={{ paddingTop: "clamp(56px, 7vw, 96px)" }}>
        <div className="pf-wrap">
          <SectionHead
            index="02"
            eyebrow="Processo"
            title={<>Do <em>problema</em> ao protótipo em código.</>}
            lead="Descobrir, definir e desenvolver, com uma etapa de validação com usuários no final."
          />
          <div className="pf-process">
            {[
              { t: "Descobrir", items: ["Desk research", "Análise de concorrentes", "Matriz CSD", "Survey com 86 respostas", "8 entrevistas em profundidade"] },
              { t: "Definir", items: ["Síntese e padrões", "4 proto-personas", "Mapa de jornada", "Matriz impacto × esforço", "Escopo do MVP"] },
              { t: "Desenvolver", items: ["Wireflow de baixa fidelidade", "Wireframes de média fidelidade", "UI e design system", "UX writing", "Protótipo navegável em código"] },
              { t: "Validar", items: ["Teste remoto no Maze", "Think aloud", "7 etapas progressivas", "Perguntas de percepção de segurança"] },
            ].map((s) => (
              <article className="pf-step pf-reveal" key={s.t}>
                <h3>{s.t}</h3>
                <ul>
                  {s.items.map((i) => (
                    <li key={i}>{i}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Concorrentes */}
      <section className="pf-section">
        <div className="pf-wrap">
          <SectionHead
            index="03"
            eyebrow="Análise de concorrentes"
            title={<>O que já existe <em>não foi feito</em> para celíacos.</>}
            lead="Analisei apps de restrição alimentar e também estabelecimentos 100% sem glúten e supermercados da Suíça. Os apps resolvem parte do problema, mas nenhum coloca a segurança contra contaminação cruzada no centro."
          />
          <div className="pf-cards">
            <article className="pf-card pf-reveal">
              <h3>App de referência sem glúten</h3>
              <p className="pf-card-kind">Comunidade + geolocalização</p>
              <p><b>Forte:</b> comunidade ativa e ranking de avaliações.</p>
              <p><b>Fraco:</b> só em inglês, design confuso, poucas fotos e recursos básicos só no plano pago.</p>
            </article>
            <article className="pf-card pf-reveal">
              <h3>HappyCow</h3>
              <p className="pf-card-kind">Restaurantes veganos no mundo todo</p>
              <p><b>Forte:</b> cobertura global, mapas e comunidade engajada.</p>
              <p><b>Fraco:</b> foco vegano. Não diferencia dieta de doença celíaca.</p>
            </article>
            <article className="pf-card pf-reveal">
              <h3>Fig</h3>
              <p className="pf-card-kind">Scanner de produtos e perfis alimentares</p>
              <p><b>Forte:</b> personalização profunda de dietas e alergias.</p>
              <p><b>Fraco:</b> focado em produtos de mercado e disponível em poucos países.</p>
            </article>
            <article className="pf-card pf-reveal">
              <h3>Restaurantes 100% sem glúten</h3>
              <p className="pf-card-kind">Padarias, pizzarias e restaurantes em Zurique</p>
              <p><b>Forte:</b> protocolos rígidos e clientes que se emocionam ao comer sem medo.</p>
              <p><b>Fraco:</b> a segurança quase não aparece no site e nas redes. Quem não conhece, não confia.</p>
            </article>
          </div>
        </div>
      </section>

      {/* Pesquisa quantitativa */}
      <section className="pf-section pf-paper" id="pesquisa">
        <div className="pf-wrap">
          <SectionHead
            index="04"
            eyebrow="Pesquisa quantitativa"
            title={<>A confiança vem <em>de quem vive</em> a mesma coisa.</>}
            lead="O survey rodou em português, alemão e inglês. A maioria já segue a dieta há mais de três anos, então as respostas vêm de quem conhece o problema a fundo."
          />
          <div className="pf-charts">
            {CHARTS.map((c) => (
              <BarChart key={c.title} {...c} />
            ))}
          </div>
          <p className="pf-chart-note">
            Amostra majoritariamente feminina (81 de {N}). Perguntas de múltipla escolha somam mais de 100%.
          </p>
        </div>
      </section>

      {/* Pesquisa qualitativa */}
      <section className="pf-section pf-dark">
        <div className="pf-wrap">
          <SectionHead
            index="05"
            eyebrow="Pesquisa qualitativa"
            title={<>Oito conversas, <em>seis dores</em> que se repetem.</>}
            lead="Fiz 8 entrevistas semiestruturadas com pessoas celíacas, uma mãe de criança celíaca e um dono de restaurante 100% sem glúten, de capitais e do interior. Os números mostraram o tamanho do problema. As conversas mostraram como ele se sente."
          />
          <ul className="pf-pains">
            {PAINS.map((p) => (
              <li key={p.title} className="pf-reveal">
                <h3>{p.title}</h3>
                <p>{p.text}</p>
              </li>
            ))}
          </ul>
          <div className="pf-quotes">
            {QUOTES.map((q) => (
              <figure key={q.text} className={`pf-quote pf-reveal ${q.wide ? "pf-quote-wide" : ""} ${q.full ? "pf-quote-full" : ""}`}>
                <blockquote>“{q.text}”</blockquote>
                <figcaption>{q.who}</figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* Personas */}
      <section className="pf-section" id="definicao">
        <div className="pf-wrap">
          <SectionHead
            index="06"
            eyebrow="Personas"
            title={<>Quatro perfis, <em>dois</em> para começar.</>}
            lead="As proto-personas nasceram das entrevistas. Para o MVP, priorizei a Luana e o Guilherme: juntos, cobrem o volume das grandes cidades e a vulnerabilidade de quem acabou de receber o diagnóstico."
          />
          <div className="pf-personas">
            {PERSONAS.map((p) => (
              <article key={p.name} className={`pf-persona pf-reveal ${p.mvp ? "pf-persona-mvp" : ""}`}>
                <span className={`pf-persona-tag ${p.mvp ? "" : "pf-muted-tag"}`}>{p.mvp ? "Foco do MVP" : "Próximas fases"}</span>
                <h3>{p.name}</h3>
                <p className="pf-persona-role">{p.role}</p>
                <p>{p.bio}</p>
                <dl>
                  <div>
                    <dt>Precisa de</dt>
                    <dd>{p.needs}</dd>
                  </div>
                  <div>
                    <dt>Sente</dt>
                    <dd>{p.feels}</dd>
                  </div>
                </dl>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Pesquisa → design */}
      <section className="pf-section pf-paper">
        <div className="pf-wrap pf-split">
          <div className="pf-reveal" style={{ position: "sticky", top: 92 }}>
            <span className="pf-eyebrow">
              <span className="pf-index">07</span> Da pesquisa ao design
            </span>
            <h2 className="pf-h2" style={{ marginTop: 18 }}>
              O que ouvi, <em>o que desenhei</em>.
            </h2>
            <p className="pf-lead" style={{ marginTop: 18 }}>
              Cada decisão importante do app responde a uma dor medida na pesquisa.
            </p>
          </div>
          <div className="pf-map">
            {RESEARCH_TO_DESIGN.map((r) => (
              <div className="pf-map-row pf-reveal" key={r.heard}>
                <div className="pf-map-heard">
                  <b>{r.heard}</b>
                  {r.detail}
                </div>
                <div className="pf-map-arrow" aria-hidden>
                  <ArrowRight />
                </div>
                <div className="pf-map-did">{r.did}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MVP */}
      <section className="pf-section">
        <div className="pf-wrap">
          <SectionHead
            index="08"
            eyebrow="MVP"
            title={<>Um MVP orientado à <em>segurança crítica</em>.</>}
            lead="Priorizei com uma matriz de impacto × esforço. Entrou o que reduz incerteza na hora de decidir. Ficou para depois o que exige automação, curadoria contínua ou poderia gerar interpretações erradas."
          />
          <div className="pf-mvp">
            <div className="pf-mvp-col pf-mvp-in pf-reveal">
              <h3>No MVP</h3>
              <p>Alto impacto e baixo esforço</p>
              <ul>
                {MVP_IN.map((i) => (
                  <li key={i}>
                    <Check color="#C6F59D" />
                    <span>{i}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="pf-mvp-col pf-reveal">
              <h3>No roadmap</h3>
              <p>Alto esforço ou menor impacto imediato</p>
              <ul>
                {MVP_LATER.map((i) => (
                  <li key={i}>
                    <Later />
                    <span>{i}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Telas */}
      <section className="pf-section pf-paper" id="telas">
        <div className="pf-wrap">
          <SectionHead
            index="09"
            eyebrow="As telas"
            title={<>A jornada, <em>tela a tela</em>.</>}
            lead="Estas são as telas reais do protótipo, carregadas ao vivo. A ordem segue as etapas do teste de usabilidade."
          />
          <div className="pf-journey">
            {JOURNEY.map((stage, i) => (
              <div className="pf-stage" key={stage.title}>
                <div className="pf-stage-copy pf-reveal">
                  <span className="pf-index">Etapa {i + 1}</span>
                  <h3 className="pf-h3">{stage.title}</h3>
                  <p>{stage.text}</p>
                  <div className="pf-stage-task">
                    <b>Pergunta do teste</b>
                    {stage.task}
                  </div>
                </div>
                <div className="pf-screens">
                  {stage.screens.map((s) => (
                    <figure className="pf-screen pf-reveal" key={s.path}>
                      <Phone path={s.path} title={`Tela ${s.title} do Glútty`} />
                      <figcaption>
                        <strong>{s.title}</strong>
                        <span>{s.note}</span>
                        <Link href={s.path} target="_blank">
                          Abrir tela
                        </Link>
                      </figcaption>
                    </figure>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Decisões de design */}
      <section className="pf-section pf-dark">
        <div className="pf-wrap">
          <SectionHead
            index="10"
            eyebrow="Decisões de design"
            title={<>Segurança antes <em>de estrelas</em>.</>}
            lead="O Glútty não é um app de avaliação de restaurantes comum. O foco não é sabor nem preço. É segurança alimentar."
          />
          <div className="pf-decisions">
            <article className="pf-decision pf-reveal">
              <span className="pf-index">a</span>
              <h3>A avaliação começa por “Você se sentiu seguro?”</h3>
              <p>
                Estrelas vêm depois. Cinco respostas, do verde ao vermelho, viram a base de dados de segurança para outros
                celíacos.
              </p>
              <div className="pf-decision-demo" aria-label="Opções de segurança na avaliação">
                <span className="pf-chip" style={{ background: "#E8F5E9", color: "#1F5D3B" }}>Muito seguro</span>
                <span className="pf-chip" style={{ background: "#FEF3C7", color: "#7A4E00" }}>Adaptaram para mim</span>
                <span className="pf-chip" style={{ background: "#FFF0E6", color: "#9A3F00" }}>Fiquei em dúvida</span>
                <span className="pf-chip" style={{ background: "#FDECEC", color: "#B3261E" }}>Não me senti seguro</span>
                <span className="pf-chip" style={{ background: "#B3261E", color: "#fff" }}>Houve contaminação</span>
              </div>
            </article>
            <article className="pf-decision pf-reveal">
              <span className="pf-index">b</span>
              <h3>Um selo, o mesmo significado em qualquer tela</h3>
              <p>
                Restaurantes e pratos usam os mesmos selos. Cada um combina cor, ícone e texto, para nunca depender só da
                cor.
              </p>
              <div className="pf-decision-demo">
                <SafetyBadge level="muito_seguro" size="md" />
                <SafetyBadge level="seguro" size="md" />
                <SafetyBadge level="certificado" size="md" />
                <SafetyBadge level="moderado" size="md" />
                <SafetyBadge level="cuidado" size="md" />
              </div>
            </article>
            <article className="pf-decision pf-reveal">
              <span className="pf-index">c</span>
              <h3>O perfil controla o app</h3>
              <p>
                O padrão de segurança, as restrições e os ingredientes proibidos definem o que aparece na busca, quais
                pratos são recomendados e quando mostrar um alerta.
              </p>
              <div className="pf-decision-demo">
                <span className="pf-chip" style={{ background: "#C6F59D", color: "#1F3D34" }}>Rigoroso</span>
                <span className="pf-chip" style={{ background: "rgba(198,245,157,.14)", color: "#F5F2DF" }}>Moderado</span>
                <span className="pf-chip" style={{ background: "rgba(198,245,157,.14)", color: "#F5F2DF" }}>Flexível</span>
              </div>
            </article>
            <article className="pf-decision pf-reveal">
              <span className="pf-index">d</span>
              <h3>Textos que acolhem, sem assustar</h3>
              <p>
                O objetivo é diminuir o medo, não aumentar. Na revisão das telas, rótulos como “Risco de contaminação:
                baixo” foram questionados: a informação precisa ser clara sem soar alarmista.
              </p>
            </article>
          </div>
        </div>
      </section>

      {/* Design system */}
      <section className="pf-section">
        <div className="pf-wrap">
          <SectionHead
            index="11"
            eyebrow="Design system"
            title={<>Acolhedor, <em>nunca</em> clínico.</>}
            lead="O verde profundo transmite segurança e o lima traz leveza. Os selos seguem uma escala de risco. A Nunito, arredondada, deixa o tom mais próximo e menos hospitalar, e o mascote Glútty acompanha os momentos de espera e de boas-vindas."
          />
          <div className="pf-ds">
            <div className="pf-ds-block pf-reveal">
              <h3>Cores</h3>
              <div className="pf-swatches">
                {COLORS.map((c) => (
                  <div className="pf-swatch" key={c.hex}>
                    <i style={{ background: c.hex }} />
                    <b>{c.name}</b>
                    <span>{c.hex}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="pf-ds-block pf-reveal">
              <h3>Tipografia</h3>
              <div className="pf-type-sample">
                <div className="pf-type-big">Aa Nunito</div>
                <div className="pf-type-row">
                  <span style={{ fontWeight: 900 }}>Black 900</span>
                  <span style={{ fontWeight: 800 }}>ExtraBold 800</span>
                  <span style={{ fontWeight: 600 }}>SemiBold 600</span>
                </div>
              </div>
              <h3 style={{ marginTop: 32 }}>Selos de segurança</h3>
              <div className="pf-badges">
                <SafetyBadge level="muito_seguro" size="sm" />
                <SafetyBadge level="seguro" size="sm" />
                <SafetyBadge level="certificado" size="sm" />
                <SafetyBadge level="moderado" size="sm" />
                <SafetyBadge level="cuidado" size="sm" />
              </div>
              <p style={{ marginTop: 24, fontSize: 14, color: "#6c776f" }}>
                Tokens, botões e componentes documentados na{" "}
                <Link href="/design-system" target="_blank" style={{ color: "#1F3D34" }}>
                  página do design system
                </Link>
                .
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Validação */}
      <section className="pf-section pf-paper" id="validacao">
        <div className="pf-wrap">
          <SectionHead
            index="12"
            eyebrow="Validação"
            title={<>Teste de usabilidade <em>no Maze</em>.</>}
            lead="Um teste remoto com o protótipo navegável, em que participantes com restrições alimentares pensavam em voz alta. O cenário: você está viajando para São Paulo, não vai cozinhar hoje, e um amigo recomenda o Glútty."
          />
          <ol className="pf-test">
            {TEST_STAGES.map((t) => (
              <li key={t.title} className="pf-reveal">
                <h3>{t.title}</h3>
                <p>“{t.q}”</p>
              </li>
            ))}
          </ol>
          <ul className="pf-tags" aria-label="Metodologia">
            <li>Remoto</li>
            <li>Think aloud</li>
            <li>Tarefas progressivas</li>
            <li>Protótipo navegável</li>
            <li>Percepção de segurança</li>
          </ul>
        </div>
      </section>

      {/* Aprendizados */}
      <section className="pf-section">
        <div className="pf-wrap pf-split">
          <div className="pf-reveal">
            <span className="pf-eyebrow">
              <span className="pf-index">13</span> Aprendizados
            </span>
            <h2 className="pf-h2" style={{ marginTop: 18 }}>
              A solução não é só tecnológica. <em>É humana.</em>
            </h2>
          </div>
          <ol className="pf-learn">
            {[
              { t: "Números mostram o tamanho, conversas mostram o peso", d: "O survey provou que o medo é quase unânime. As entrevistas mostraram o isolamento, a culpa dos pais e a emoção de ser bem atendido." },
              { t: "Confiança é o produto", d: "Mais do que achar restaurantes, o app precisa provar por que um lugar é seguro. Por isso a segurança vem antes das estrelas." },
              { t: "Dizer não também é design", d: "Comunidade, delivery e selo próprio são valiosos, mas ficaram fora do MVP para não comprometer a confiança com algo sem curadoria." },
              { t: "Prototipar em código acelera a validação", d: "Levar o protótipo para o navegador permitiu testar no Maze com interações reais e em mais de um idioma." },
              { t: "Próximos passos", d: "Consolidar os aprendizados do teste, iterar as telas de restaurante e prato, e explorar um módulo para restaurantes com guias e treinamento de equipe." },
            ].map((l, i) => (
              <li key={l.t} className="pf-reveal">
                <span>{String(i + 1).padStart(2, "0")}</span>
                <div>
                  <h3>{l.t}</h3>
                  <p>{l.d}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Final */}
      <section className="pf-final">
        <div className="pf-wrap" style={{ position: "relative" }}>
          <span className="pf-eyebrow" style={{ color: "#C6F59D" }}>Obrigado pela leitura</span>
          <h2 className="pf-h2" style={{ marginTop: 18 }}>
            Quer ver <em>mais detalhes</em> do processo?
          </h2>
          <p className="pf-lead" style={{ marginTop: 18, color: "rgba(245,242,223,.78)" }}>
            O artigo no Medium conta a pesquisa completa. O protótipo está no ar para navegar.
          </p>
          <div className="pf-final-actions">
            <a className="pf-btn pf-btn-lime" href={MEDIUM_URL} target="_blank" rel="noopener noreferrer">
              Ler o artigo no Medium <ArrowRight />
            </a>
            <Link className="pf-btn pf-btn-ghost" href="/welcome" target="_blank" style={{ color: "#C6F59D", boxShadow: "inset 0 0 0 1.5px #C6F59D" }}>
              Abrir o protótipo
            </Link>
          </div>
          <div className="pf-final-mascot" aria-hidden>
            <Image src="/parabens-novo.png" alt="" width={578} height={517} unoptimized />
          </div>
          <footer className="pf-footer">
            <span>Glútty · Estudo de caso UX/UI por Luiz Fernando Mendes</span>
            <span>Telas carregadas ao vivo do protótipo</span>
          </footer>
        </div>
      </section>
    </main>
  );
}
