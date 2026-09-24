import Image from "next/image";
import Link from "next/link";
import SafetyBadge from "@/components/SafetyBadge";

// Artigo original publicado no Medium.
const MEDIUM_URL =
  "https://medium.com/@luizfernandok33/gl%C3%BAtty-mais-seguran%C3%A7a-e-confian%C3%A7a-para-pessoas-cel%C3%ADacas-ao-comer-fora-3d0f45849a14";
const MEDIUM_PROFILE = "https://medium.com/@luizfernandok33";

// Tempo de leitura calculado a partir do texto da página (~230 palavras/min).
const READING_MINUTES = 13;

// Total de respostas válidas da pesquisa quantitativa (PT + DE + EN).
const N = 86;
const pct = (n: number) => Math.round((n / N) * 100);

/* ───────────────────────── Dados ───────────────────────── */

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

const PERSONAS = [
  { name: "Luana", role: "A jovem urbana", mvp: true, bio: "25–35 anos, trabalha em cidade grande e tem vida social ativa.", needs: "Achar lugares seguros rápido, com filtros e prova social." },
  { name: "Guilherme", role: "Recém-diagnosticado do interior", mvp: true, bio: "20–40 anos, vive em cidade pequena e recebeu o diagnóstico há pouco.", needs: "Um passo a passo inicial, comunidade local e mercados próximos." },
  { name: "Vera", role: "Mãe cuidadora", mvp: false, bio: "35–50 anos, cuida de um filho celíaco em idade escolar.", needs: "Planejar festas, falar com a escola e achar buffets verificados." },
  { name: "Breno", role: "Viajante e empreendedor", mvp: false, bio: "30–55 anos, viaja a trabalho entre cidades e países.", needs: "Informação confiável por cidade e apoio em viagem." },
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
  "Reserva online e delivery",
  "Comunidade local",
  "Sugestões personalizadas por comportamento",
  "Selo de compromisso com a segurança",
  "Fotos dos pratos e vídeos educativos",
];

const TEST_STAGES = [
  { title: "Primeiro contato", q: "Você sentiu vontade de continuar explorando o aplicativo? Por quê?" },
  { title: "Encontrar restaurante", q: "Quais informações mais ajudaram você a confiar, ou desconfiar, do restaurante?" },
  { title: "Analisar prato", q: "As informações sobre ingredientes, adaptações e segurança pareceram claras?" },
  { title: "Comunidade", q: "As experiências de outros usuários ajudaram você a decidir com mais confiança?" },
  { title: "Avaliar restaurante", q: "Como você se sentiu ao compartilhar sua experiência para ajudar outras pessoas?" },
  { title: "Perfil", q: "Você sentiu que tinha controle e clareza sobre suas preferências alimentares?" },
  { title: "Encerramento", q: "Em que momento você se sentiu mais seguro, acolhido ou compreendido?" },
];

const COLORS = [
  { name: "Verde Glútty", hex: "#1F3D34" },
  { name: "Lima", hex: "#C6F59D" },
  { name: "Creme", hex: "#F5F2DF" },
  { name: "Laranja", hex: "#FC6904" },
];

/* ───────────────────────── Componentes ───────────────────────── */

function Phone({ path, title, large = false, interactive = false }: { path: string; title: string; large?: boolean; interactive?: boolean }) {
  return (
    <div className={`md-phone ${large ? "md-phone-lg" : ""} ${interactive ? "" : "md-phone-static"}`}>
      <div className="md-phone-screen">
        <iframe
          src={path}
          title={title}
          loading="lazy"
          tabIndex={interactive ? 0 : -1}
          aria-hidden={interactive ? undefined : true}
          // Evita pedido de localização para quem lê o portfólio.
          allow="geolocation 'none'"
        />
      </div>
    </div>
  );
}

function Screens({ items, caption }: { items: { path: string; label: string }[]; caption: React.ReactNode }) {
  return (
    <figure className="md-figure md-wide">
      <div className="md-panel">
        <div className="md-phones">
          {items.map((s) => (
            <div className="md-phone-item" key={s.path}>
              <Phone path={s.path} title={`Tela ${s.label} do Glútty`} />
              <span>{s.label}</span>
            </div>
          ))}
        </div>
      </div>
      <figcaption>{caption}</figcaption>
    </figure>
  );
}

function BarChart({ title, sub, bars }: { title: string; sub: string; bars: Bar[] }) {
  return (
    <div className="md-chart">
      <h4>{title}</h4>
      <p>{sub} · % das {N} pessoas</p>
      <ul className="md-bars">
        {bars.map((b) => (
          <li key={b.label} className="md-bar" title={`${b.label}: ${b.n} de ${N} pessoas (${pct(b.n)}%)`}>
            <div className="md-bar-label">
              <span>{b.label}</span>
              <b>
                {pct(b.n)}%<small>{b.n}</small>
              </b>
            </div>
            <div className="md-bar-track" aria-hidden>
              <div className="md-bar-fill" style={{ "--w": `${pct(b.n)}%` } as React.CSSProperties} />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

function Decision({ children }: { children: React.ReactNode }) {
  return (
    <div className="md-decision">
      <b>Por que essa decisão</b>
      <p>{children}</p>
    </div>
  );
}

function Check({ color }: { color: string }) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M5 12.5 10 17.5 19 7" stroke={color} strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
function Clock() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="12" cy="12" r="8" stroke="#6b6b6b" strokeWidth="2" />
      <path d="M12 8v4l2.5 2" stroke="#6b6b6b" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}
function IconClap() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M8.5 11.5 5.3 8.3a1.3 1.3 0 0 1 1.8-1.8l4.6 4.6M9.8 8.4 8 6.6a1.3 1.3 0 0 1 1.8-1.8l4.6 4.6m-2.7-2.7a1.3 1.3 0 0 1 1.8-1.8l4.2 4.2c2.4 2.4 2.4 6.3 0 8.7a6.1 6.1 0 0 1-8.7 0l-4.4-4.4a1.3 1.3 0 0 1 1.8-1.8l2.1 2.1M15 3.5l.6-1.8M18 4.3l1.3-1.3M19 7l1.8-.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
function IconComment() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M18 16.8a7.1 7.1 0 0 0 2.2-5.1C20.2 7.4 16.5 4 12 4s-8.2 3.4-8.2 7.7 3.7 7.7 8.2 7.7c1 0 2-.2 2.9-.5l3.9 1.6-.8-3.7Z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" />
    </svg>
  );
}
function IconShare() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M15.2 7.8 12 4.6 8.8 7.8M12 4.6v10M7 11H5.5v8.5h13V11H17" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
function IconBookmark() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M17.5 20 12 16.2 6.5 20V5.5A1.5 1.5 0 0 1 8 4h8a1.5 1.5 0 0 1 1.5 1.5V20Z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" />
    </svg>
  );
}

function ActionBar() {
  return (
    <div className="md-actions">
      <div className="md-actions-group">
        <a href={MEDIUM_URL} target="_blank" rel="noopener noreferrer" aria-label="Aplaudir no Medium">
          <IconClap />
        </a>
        <a href={`${MEDIUM_URL}#responses`} target="_blank" rel="noopener noreferrer" aria-label="Comentar no Medium">
          <IconComment />
        </a>
      </div>
      <div className="md-actions-group">
        <a href={MEDIUM_URL} target="_blank" rel="noopener noreferrer" aria-label="Salvar no Medium">
          <IconBookmark />
        </a>
        <a href={MEDIUM_URL} target="_blank" rel="noopener noreferrer" aria-label="Abrir o artigo original no Medium">
          <IconShare />
        </a>
      </div>
    </div>
  );
}

/* ───────────────────────── Página ───────────────────────── */

export default function PortfolioPage() {
  return (
    <>
      <header className="md-top">
        <div className="md-top-inner">
          <a className="md-logo" href="#topo" aria-label="Glútty, início do artigo">
            <Image src="/glútty novo.png" alt="" width={30} height={30} unoptimized />
            Glútty
          </a>
          <div className="md-top-actions">
            <Link className="md-quiet" href="/welcome" target="_blank">
              Abrir protótipo
            </Link>
            <a className="md-btn md-btn-green" href={MEDIUM_URL} target="_blank" rel="noopener noreferrer">
              Ler no Medium
            </a>
          </div>
        </div>
      </header>

      <main className="md-article" id="topo">
        <article>
          <h1 className="md-title">Glútty: mais segurança e confiança para pessoas celíacas ao comer fora</h1>
          <p className="md-subtitle">
            Estudo de caso UX/UI: da pesquisa com 86 pessoas e 8 entrevistas ao protótipo navegável de um app que ajuda
            celíacos a escolher onde comer.
          </p>

          <div className="md-byline">
            <div className="md-avatar" aria-hidden>
              <Image src="/glútty novo.png" alt="" width={44} height={44} unoptimized />
            </div>
            <div className="md-byline-text">
              <div className="md-byline-name">
                Luiz Fernando Mendes
                <span aria-hidden>·</span>
                <a href={MEDIUM_PROFILE} target="_blank" rel="noopener noreferrer">
                  Seguir
                </a>
              </div>
              <div className="md-byline-meta">{READING_MINUTES} min de leitura · Estudo de caso UX/UI</div>
            </div>
          </div>

          <ActionBar />

          <div className="md-body">
            <p>
              Tudo começou em casa. Organizei um encontro com amigos e, no fim, percebi que um deles não tinha comido nada.
              Eu não tinha perguntado se alguém tinha alguma restrição alimentar. Depois, com calma, ele me explicou a
              restrição que tinha, e aquilo virou a pergunta deste projeto:{" "}
              <strong>como ajudar pessoas celíacas a comer fora com segurança e confiança?</strong>
            </p>
            <p>
              O Glútty é a resposta que construí. É um aplicativo que conecta pessoas celíacas a restaurantes mais seguros,
              com foco em contaminação cruzada, informação clara e na experiência de quem vive a mesma rotina. O projeto foi
              feito para aplicar o que aprendi no curso UX Unicórnio, de ponta a ponta.
            </p>

            <figure className="md-figure md-wide">
              <div className="md-panel">
                <div className="md-phones md-phones-1">
                  <div className="md-phone-item">
                    <Phone path="/welcome" title="Protótipo navegável do Glútty" large interactive />
                    <span>Protótipo navegável. Toque e explore.</span>
                  </div>
                </div>
              </div>
              <figcaption>O protótipo do Glútty, carregado ao vivo. Dá para navegar aqui mesmo.</figcaption>
            </figure>

            <h3>Sobre o projeto</h3>
            <ul>
              <li>
                <strong>Minhas funções:</strong> UX Research, UX Strategy, UX Design e UX Writing.
              </li>
              <li>
                <strong>Ferramentas:</strong> Figma, Google Docs, Maze, Tactiq, ChatGPT, Claude Code e Vercel.
              </li>
              <li>
                <strong>Processo:</strong> descobrir (desk research, matriz CSD e UX research), definir (personas e mapa de
                jornada), desenvolver (wireflow, wireframes e UI) e validar (teste de usabilidade).
              </li>
            </ul>

            <hr className="md-sep" />

            <h2 id="problema">O problema: comer fora não deveria ser um risco</h2>
            <p>
              A doença celíaca é autoimune. Para quem a tem, o glúten do trigo, da cevada e do centeio danifica o intestino.
              O único tratamento é uma dieta sem glúten, para sempre, e ela exige atenção a cada refeição.
            </p>
            <p>
              O maior perigo fora de casa é a <strong>contaminação cruzada</strong>. Uma migalha na chapa, o óleo da mesma
              fritura ou uma faca compartilhada bastam para causar uma reação. Como o glúten é uma proteína, o calor não o
              elimina. A única saída é evitar o contato.
            </p>
            <p>
              E o rótulo nem sempre protege. Um estudo citado pela Celiac Disease Foundation encontrou glúten detectável em{" "}
              <strong>32% dos pratos vendidos como “sem glúten”</strong> em restaurantes. Sem fiscalização formal, quem é
              celíaco acaba dependendo de perguntas ao garçom, grupos de WhatsApp e posts no Instagram.
            </p>

            <p className="md-pull">
              Para quem é celíaco, <strong>comer fora é um ato de planejamento</strong>, não de espontaneidade.
            </p>

            <hr className="md-sep" />

            <h2 id="descobrir">Descobrir: entender antes de desenhar</h2>
            <p>
              Comecei com um plano de pesquisa. O objetivo era entender como pessoas celíacas vivem o ato de comer fora, o
              que as faz confiar em um lugar e quais impactos sociais e emocionais a doença traz para a rotina.
            </p>

            <h3>Desk research e matriz CSD</h3>
            <p>
              Reuni artigos científicos, conteúdos de associações de celíacos e estudos sobre qualidade de vida. Eles mostram
              que restaurantes e viagens são fontes de ansiedade, pela oferta limitada de refeições seguras e pelo pouco
              conhecimento das equipes sobre glúten.
            </p>
            <p>
              Organizei o que eu sabia, o que eu supunha e o que precisava descobrir em uma matriz CSD. As dúvidas viraram
              as perguntas do survey e dos roteiros de entrevista.
            </p>

            <h3>Análise de concorrentes</h3>
            <p>
              Analisei apps de restrição alimentar e também estabelecimentos 100% sem glúten e supermercados da Suíça. Os
              apps resolvem parte do problema. Nenhum deles coloca a segurança contra contaminação cruzada no centro.
            </p>

            <figure className="md-figure md-wide">
              <div className="md-panel">
                <div className="md-cards">
                  <div className="md-card">
                    <h4>App de referência sem glúten</h4>
                    <p className="md-card-sub">Comunidade e geolocalização</p>
                    <p><b>Forte:</b> comunidade ativa e ranking de avaliações.</p>
                    <p><b>Fraco:</b> só em inglês, design confuso, poucas fotos e recursos básicos no plano pago.</p>
                  </div>
                  <div className="md-card">
                    <h4>HappyCow</h4>
                    <p className="md-card-sub">Restaurantes veganos no mundo todo</p>
                    <p><b>Forte:</b> cobertura global, mapas e comunidade engajada.</p>
                    <p><b>Fraco:</b> o foco é vegano. Não diferencia dieta de doença celíaca.</p>
                  </div>
                  <div className="md-card">
                    <h4>Fig</h4>
                    <p className="md-card-sub">Scanner de produtos e perfis alimentares</p>
                    <p><b>Forte:</b> personalização profunda de dietas e alergias.</p>
                    <p><b>Fraco:</b> foca em produtos de mercado e existe em poucos países.</p>
                  </div>
                  <div className="md-card">
                    <h4>Restaurantes 100% sem glúten</h4>
                    <p className="md-card-sub">Padarias e restaurantes em Zurique</p>
                    <p><b>Forte:</b> protocolos rígidos e clientes que se emocionam ao comer sem medo.</p>
                    <p><b>Fraco:</b> a segurança quase não aparece no site e nas redes.</p>
                  </div>
                </div>
              </div>
              <figcaption>Resumo da análise de concorrentes digitais e estabelecimentos.</figcaption>
            </figure>

            <Decision>
              Os concorrentes mostraram uma lacuna clara. Existe informação sobre onde comer sem glúten, mas ninguém explica{" "}
              <em>por que</em> um lugar é seguro. Essa virou a proposta de valor do Glútty: tornar a segurança visível.
            </Decision>

            <h3>Pesquisa quantitativa: 86 respostas em 3 idiomas</h3>
            <p>
              Fiz um survey em português, alemão e inglês, divulgado em grupos e comunidades de pessoas celíacas. Foram{" "}
              {N} respostas válidas, a maioria do Brasil (43) e da Suíça (38). A maior parte já segue a dieta há mais de
              três anos, então as respostas vêm de quem conhece o problema a fundo.
            </p>

            <figure className="md-figure md-wide">
              <div className="md-panel">
                <div className="md-stats">
                  <div className="md-stat">
                    <b>{pct(58)}%</b>
                    <span>já passaram mal depois de uma refeição vendida como “sem glúten”.</span>
                  </div>
                  <div className="md-stat">
                    <b>{pct(77)}%</b>
                    <span>já deixaram de sair por falta de opções confiáveis.</span>
                  </div>
                  <div className="md-stat">
                    <b>{pct(67)}%</b>
                    <span>se sentiram constrangidos ao explicar a própria restrição.</span>
                  </div>
                  <div className="md-stat">
                    <b>{pct(50)}%</b>
                    <span>confiam em poucos restaurantes que dizem ter opções sem glúten.</span>
                  </div>
                </div>
              </div>
              <figcaption>Principais números da pesquisa quantitativa, com {N} respostas.</figcaption>
            </figure>

            <figure className="md-figure md-wide">
              <div className="md-panel">
                <div className="md-charts">
                  {CHARTS.map((c) => (
                    <BarChart key={c.title} {...c} />
                  ))}
                </div>
              </div>
              <figcaption>
                Medos, fontes de confiança e expectativas. Perguntas de múltipla escolha somam mais de 100%.
              </figcaption>
            </figure>

            <p>
              Dois números guiaram o resto do projeto. <strong>O medo número um é a equipe despreparada</strong>, citada por{" "}
              {pct(77)}% das pessoas, logo à frente da contaminação cruzada. E{" "}
              <strong>a fonte de confiança número um são outros celíacos</strong>: {pct(76)}% buscam indicações na comunidade,
              e {pct(77)}% dizem que avaliações de outros celíacos geram confiança.
            </p>

            <Decision>
              Se as pessoas já confiam umas nas outras, o app não precisa inventar uma autoridade. Ele precisa organizar a
              experiência da comunidade e mostrar os sinais que mais geram confiança: equipe treinada, cozinha separada e
              ingredientes claros.
            </Decision>

            <h3>Pesquisa qualitativa: 8 conversas em profundidade</h3>
            <p>
              Os números mostraram o tamanho do problema. As entrevistas mostraram como ele se sente. Conversei com oito
              pessoas, entre celíacos de capitais e do interior, uma mãe de criança celíaca e um dono de restaurante 100% sem
              glúten. Seis dores apareceram em quase todas as conversas:
            </p>
            <ul>
              <li><strong>Medo de contaminação.</strong> Uma migalha basta para dias ou semanas de sintomas.</li>
              <li><strong>Perda de espontaneidade.</strong> Comer fora exige pesquisa, ligações e planejamento.</li>
              <li><strong>Informação pouco confiável.</strong> Apps, cardápios e atendentes passam dados vagos.</li>
              <li><strong>Custo e acesso.</strong> Comida sem glúten é mais cara e quase some fora das capitais.</li>
              <li><strong>Falta de preparo e empatia.</strong> Equipes que minimizam a doença ou a confundem com dieta da moda.</li>
              <li><strong>Isolamento social.</strong> Convites recusados e a sensação de ser “a pessoa diferente” da mesa.</li>
            </ul>

            <blockquote>
              “Quando o atendente não sabe responder, eu já sei que não é o lugar certo.”
              <cite>Participante, São Paulo</cite>
            </blockquote>
            <blockquote>
              “Nosso iFood são os colegas celíacos. A gente pergunta no grupo, não no app.”
              <cite>Participante, São Paulo</cite>
            </blockquote>
            <blockquote>
              “Comer fora é um ato de coragem. Mas quando há empatia, vira um ato de amor.”
              <cite>Participante, Rio Grande do Sul</cite>
            </blockquote>

            <hr className="md-sep" />

            <h2 id="definir">Definir: para quem e para quê</h2>

            <h3>Personas</h3>
            <p>
              Transformei os perfis das entrevistas em quatro proto-personas. Para o MVP, priorizei a Luana e o Guilherme.
            </p>

            <figure className="md-figure md-wide">
              <div className="md-panel">
                <div className="md-cards">
                  {PERSONAS.map((p) => (
                    <div className="md-card" key={p.name}>
                      <span className={`md-tag ${p.mvp ? "" : "md-tag-muted"}`}>{p.mvp ? "Foco do MVP" : "Próximas fases"}</span>
                      <p className="md-persona-name">{p.name}</p>
                      <p className="md-card-sub">{p.role}</p>
                      <p>{p.bio}</p>
                      <p><b>Precisa de:</b> {p.needs}</p>
                    </div>
                  ))}
                </div>
              </div>
              <figcaption>Proto-personas construídas a partir das entrevistas.</figcaption>
            </figure>

            <Decision>
              A Luana representa o maior volume de usuários, nas grandes cidades. O Guilherme representa a maior
              vulnerabilidade: quem acabou de receber o diagnóstico e está longe das capitais. Juntos, eles cobrem quem mais
              usaria o app e quem mais precisaria dele.
            </Decision>

            <h3>Mapa de jornada</h3>
            <p>
              Mapeei a jornada desde o momento em que a pessoa decide sair de casa até depois da refeição. Ficou claro que o
              Glútty precisa ser um <strong>sistema de apoio contínuo</strong>, presente antes, durante e depois de comer
              fora.
            </p>

            <figure className="md-figure md-wide">
              <div className="md-panel">
                <div className="md-journey">
                  <div className="md-journey-col">
                    <h4>Antes</h4>
                    <dl>
                      <div><dt>Faz</dt><dd>Pesquisa em grupos, Google e Instagram. Liga para o restaurante.</dd></div>
                      <div><dt>Sente</dt><dd>Ansiedade e cansaço de planejar tudo.</dd></div>
                      <div><dt>Glútty</dt><dd>Busca por região, filtros pelo padrão de segurança e avaliações de celíacos.</dd></div>
                    </dl>
                  </div>
                  <div className="md-journey-col">
                    <h4>Durante</h4>
                    <dl>
                      <div><dt>Faz</dt><dd>Explica a restrição, pergunta sobre chapa, óleo e utensílios.</dd></div>
                      <div><dt>Sente</dt><dd>Constrangimento e medo de não ser levado a sério.</dd></div>
                      <div><dt>Glútty</dt><dd>Ingredientes declarados e cartão digital de segurança para mostrar no atendimento.</dd></div>
                    </dl>
                  </div>
                  <div className="md-journey-col">
                    <h4>Depois</h4>
                    <dl>
                      <div><dt>Faz</dt><dd>Espera para ver se vai passar mal. Conta para outros celíacos.</dd></div>
                      <div><dt>Sente</dt><dd>Alívio e gratidão, ou frustração e sintomas.</dd></div>
                      <div><dt>Glútty</dt><dd>Avaliação focada em segurança e restaurantes favoritos.</dd></div>
                    </dl>
                  </div>
                </div>
              </div>
              <figcaption>Resumo do mapa de jornada de quem é celíaco ao comer fora.</figcaption>
            </figure>

            <h3>MVP e priorização</h3>
            <p>
              Para escolher as funcionalidades, usei uma matriz de impacto × esforço. O MVP foi pensado para a{" "}
              <strong>segurança crítica</strong>: entrou o que ajuda a avaliar a confiabilidade de um lugar e reduz a
              incerteza na hora de decidir.
            </p>

            <figure className="md-figure md-wide">
              <div className="md-panel">
                <div className="md-mvp">
                  <div className="md-mvp-in">
                    <h4>No MVP</h4>
                    <ul>
                      {MVP_IN.map((i) => (
                        <li key={i}><Check color="#C6F59D" /><span>{i}</span></li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4>No roadmap</h4>
                    <ul>
                      {MVP_LATER.map((i) => (
                        <li key={i}><Clock /><span>{i}</span></li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
              <figcaption>Funcionalidades do MVP e o que ficou para as próximas versões.</figcaption>
            </figure>

            <Decision>
              Reserva, delivery, comunidade e um selo próprio são valiosos, mas exigem integrações, moderação e governança.
              Lançar isso sem curadoria poderia gerar interpretações erradas sobre segurança, o que é justamente o que o
              Glútty quer evitar. Por isso ficaram para depois.
            </Decision>

            <hr className="md-sep" />

            <h2 id="ui">UI Design: traduzindo estratégia em interface</h2>
            <p>
              Com o escopo definido, passei por wireflows de baixa fidelidade e wireframes de média fidelidade antes da
              interface final. Cada tela abaixo responde a um insight da pesquisa. Todas estão carregadas ao vivo a partir do
              protótipo.
            </p>

            <h3>1. Primeiro contato: o usuário diz o que é seguro para ele</h3>
            <p>
              O onboarding escolhe o idioma, apresenta a proposta e pergunta o que é seguro para a pessoa. Essa resposta
              vira o <strong>padrão de segurança</strong>, que filtra tudo o que o app mostra depois.
            </p>
            <Screens
              items={[
                { path: "/idioma", label: "Idioma" },
                { path: "/welcome", label: "Boas-vindas" },
                { path: "/onboarding", label: "Padrão de segurança" },
              ]}
              caption="Onboarding em português, inglês e alemão, pensando no público do Brasil e da Suíça."
            />
            <Decision>
              A pesquisa mostrou que explicar a restrição gera constrangimento para {pct(67)}% das pessoas. Com o perfil
              configurado uma vez, o app passa a “falar” pelo usuário, sem que ele precise se justificar a cada busca.
            </Decision>

            <h3>2. Encontrar um restaurante</h3>
            <p>
              A home abre com a localização e o padrão de segurança à vista. As listas priorizam lugares muito seguros por
              perto e os mais bem avaliados por celíacos.
            </p>
            <Screens
              items={[
                { path: "/home", label: "Home" },
                { path: "/busca", label: "Busca" },
                { path: "/categoria/mais-seguros", label: "Categoria" },
              ]}
              caption="Home, busca e categorias como “Mais seguros” e “Festa sem glúten”."
            />
            <Decision>
              Lista de restaurantes seguros ({pct(81)}%) e geolocalização ({pct(69)}%) foram duas das funcionalidades mais
              pedidas. Por isso a primeira tela já responde “onde posso comer com segurança perto de mim?”.
            </Decision>

            <h3>3. Analisar o restaurante e o prato</h3>
            <p>
              O restaurante mostra seus procedimentos contra contaminação cruzada, as restrições atendidas e as avaliações.
              No prato, cada ingrediente aparece com o status em relação ao perfil do usuário.
            </p>
            <Screens
              items={[
                { path: "/restaurante/1", label: "Restaurante" },
                { path: "/restaurante/1/prato/d1", label: "Prato" },
              ]}
              caption="A página do restaurante e o detalhe do prato, com ingredientes declarados."
            />
            <Decision>
              Ingredientes escondidos preocupam {pct(58)}% das pessoas. Mostrar os ingredientes declarados não substitui a
              conversa com o restaurante, mas ajuda o usuário a saber o que perguntar antes de pedir.
            </Decision>

            <h3>4. Comunidade e avaliação: segurança antes de estrelas</h3>
            <p>
              A avaliação não começa pelas estrelas. A primeira pergunta é <strong>“Você se sentiu seguro?”</strong>. Depois
              vêm tags como “Equipe treinada”, “Cozinha separada” e “Ingredientes claros”, e só então o comentário.
            </p>
            <Screens
              items={[
                { path: "/comunidade", label: "Comunidade" },
                { path: "/restaurante/1/avaliar", label: "Avaliar" },
              ]}
              caption="A comunidade reúne relatos de quem tem as mesmas restrições. A avaliação começa pela segurança."
            />
            <Decision>
              O Glútty não é um app de avaliação de restaurantes comum. O foco não é sabor nem preço. As tags de avaliação
              são exatamente os sinais que a pesquisa apontou como geradores de confiança, então cada relato vira informação
              útil para a próxima pessoa celíaca.
            </Decision>

            <h3>5. Perfil: o cérebro da personalização</h3>
            <p>
              No perfil ficam o diagnóstico, as restrições, os ingredientes proibidos e o padrão de segurança. Esses dados
              mudam a busca, as recomendações e os alertas de risco.
            </p>
            <Screens
              items={[
                { path: "/perfil", label: "Meu perfil" },
                { path: "/perfil/restricoes", label: "Restrições" },
                { path: "/perfil/seguranca", label: "Padrão de segurança" },
              ]}
              caption="Perfil alimentar, restrições e padrão de segurança editáveis."
            />

            <h3>Selos de segurança</h3>
            <p>
              Restaurantes e pratos usam os mesmos selos em todas as telas. Cada um combina cor, ícone e texto, para que a
              informação nunca dependa só da cor.
            </p>
            <figure className="md-figure">
              <div className="md-panel" style={{ display: "flex", flexWrap: "wrap", gap: 10, justifyContent: "center" }}>
                <SafetyBadge level="muito_seguro" size="md" />
                <SafetyBadge level="seguro" size="md" />
                <SafetyBadge level="certificado" size="md" />
                <SafetyBadge level="moderado" size="md" />
                <SafetyBadge level="cuidado" size="md" />
              </div>
              <figcaption>A escala de selos, do mais seguro ao que pede cuidado.</figcaption>
            </figure>
            <Decision>
              Uma tag colorida reduz o esforço de leitura: a pessoa entende o nível de segurança num relance, sem precisar
              ler o cardápio inteiro. E o texto no selo garante que a informação chegue também a quem não distingue cores.
            </Decision>

            <h3>UX Writing: informar sem assustar</h3>
            <p>
              O objetivo do app é diminuir o medo, não aumentar. Na revisão das telas, questionei rótulos como{" "}
              <em>“Risco de contaminação: baixo”</em>. A informação precisa estar lá, mas com um tom claro e acolhedor, sem
              soar alarmista.
            </p>

            <hr className="md-sep" />

            <h2 id="branding">Branding: criando conexões afetivas entre a escolha do nome e o propósito do aplicativo</h2>
            <p>
              O nome Glútty parte da palavra que está no centro da vida de quem é celíaco, o glúten, mas com um tom leve e
              próximo. A ideia é que a marca acolha, em vez de soar como um alerta médico.
            </p>

            <figure className="md-figure md-wide">
              <div className="md-panel">
                <div className="md-brand">
                  <div className="md-brand-hero">
                    <div className="md-brand-mascot">
                      <Image src="/parabens-novo.png" alt="Mascote do Glútty comemorando" width={578} height={517} unoptimized />
                    </div>
                    <strong>Glútty</strong>
                    <em>Mais segurança em cada refeição.</em>
                  </div>
                  <div className="md-brand-side">
                    <div className="md-swatches">
                      {COLORS.map((c) => (
                        <div className="md-swatch" key={c.hex}>
                          <i style={{ background: c.hex }} />
                          <b>{c.name}</b>
                          <small>{c.hex}</small>
                        </div>
                      ))}
                    </div>
                    <div className="md-slogans">
                      <p>“Segurança que acolhe. Cuidado que transforma.”</p>
                      <p>“Contaminação cruzada não é tempero.”</p>
                    </div>
                    <div className="md-badges" style={{ fontFamily: "var(--font-nunito), Nunito, sans-serif", color: "#1F3D34" }}>
                      <span style={{ fontSize: 34, fontWeight: 900, lineHeight: 1 }}>Aa</span>
                      <span style={{ alignSelf: "center", fontSize: 15, fontWeight: 700 }}>
                        Nunito: arredondada, próxima e fácil de ler.
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <figcaption>Mascote, paleta, tipografia e frases da marca Glútty.</figcaption>
            </figure>

            <ul>
              <li>
                <strong>Verde profundo</strong> transmite segurança e confiança. É a cor dos botões principais e do selo
                “Muito seguro”.
              </li>
              <li>
                <strong>Lima</strong> traz leveza e energia, e marca as ações positivas.
              </li>
              <li>
                <strong>Creme</strong> deixa o fundo quente e acolhedor, longe do branco clínico de apps de saúde.
              </li>
              <li>
                <strong>O mascote</strong> aparece nos momentos de espera, boas-vindas e conquistas, para humanizar a
                experiência.
              </li>
              <li>
                <strong>O símbolo do trigo</strong> representa cuidado, segurança e consciência.
              </li>
            </ul>

            <Decision>
              Quem é celíaco já convive com medo e desconfiança. Uma marca fria e técnica reforçaria esse sentimento. O tom do
              Glútty é o de um amigo que entende do assunto: claro, acolhedor e sem alarmismo.
            </Decision>

            <hr className="md-sep" />

            <h2 id="teste">Teste de usabilidade: apoiando decisões mais seguras</h2>
            <p>
              Para validar o protótipo, planejei um teste remoto no Maze, com a técnica think aloud: os participantes falam
              em voz alta o que pensam e sentem enquanto navegam. As tarefas acompanham a jornada, do primeiro acesso até o
              perfil.
            </p>
            <p>
              O cenário é próximo do dia a dia: <em>você está viajando para São Paulo, não vai ter tempo de cozinhar hoje e
              um amigo recomenda o Glútty para achar um restaurante seguro.</em>
            </p>

            <figure className="md-figure md-wide">
              <div className="md-panel">
                <div className="md-test">
                  {TEST_STAGES.map((t) => (
                    <div key={t.title}>
                      <h4>{t.title}</h4>
                      <p>“{t.q}”</p>
                    </div>
                  ))}
                </div>
              </div>
              <figcaption>As sete etapas do teste e a pergunta de cada uma.</figcaption>
            </figure>

            <Decision>
              Mais do que medir se a pessoa conclui a tarefa, o teste pergunta se ela <em>se sentiu segura</em>. Em um app
              sobre confiança, a percepção de segurança é tão importante quanto a navegação.
            </Decision>

            <hr className="md-sep" />

            <h2 id="aprendizados">Aprendizados e próximos passos</h2>
            <ul>
              <li>
                <strong>Números mostram o tamanho, conversas mostram o peso.</strong> O survey provou que o medo é quase
                unânime. As entrevistas mostraram o isolamento, a culpa dos pais e a emoção de ser bem atendido.
              </li>
              <li>
                <strong>Confiança é o produto.</strong> Mais do que listar restaurantes, o app precisa mostrar por que um
                lugar é seguro.
              </li>
              <li>
                <strong>Dizer não também é design.</strong> Deixar funcionalidades fora do MVP protegeu a confiança, que é o
                que o Glútty tem de mais valioso.
              </li>
              <li>
                <strong>Próximos passos:</strong> consolidar os aprendizados do teste, refinar as telas de restaurante e
                prato, e explorar um módulo para restaurantes com guias e treinamento de equipe.
              </li>
            </ul>

            <p className="md-pull">
              A solução que buscamos não é só tecnológica. <strong>É humana.</strong>
            </p>

            <p>
              Obrigado por ler até aqui. Se você é celíaco, cuida de alguém que é, ou trabalha com restaurantes, adoraria
              ouvir sua opinião. O artigo completo também está no{" "}
              <a href={MEDIUM_URL} target="_blank" rel="noopener noreferrer">
                Medium
              </a>
              , e o protótipo está no ar para{" "}
              <Link href="/welcome" target="_blank">
                navegar
              </Link>
              .
            </p>
          </div>

          <ul className="md-tags" aria-label="Tópicos">
            <li>UX Design</li>
            <li>UX Research</li>
            <li>Estudo de Caso</li>
            <li>Doença Celíaca</li>
            <li>UI Design</li>
          </ul>

          <ActionBar />
        </article>
      </main>

      <aside className="md-author" aria-label="Sobre o autor">
        <div className="md-author-inner">
          <div className="md-avatar" aria-hidden>
            <Image src="/glútty novo.png" alt="" width={72} height={72} unoptimized />
          </div>
          <div className="md-author-row">
            <div>
              <h3>Escrito por Luiz Fernando Mendes</h3>
              <p>Publicitário em transição para UX Design. Pesquisa, estratégia, interface e escrita, de ponta a ponta.</p>
            </div>
            <div className="md-author-links">
              <a className="md-btn md-btn-green" href={MEDIUM_URL} target="_blank" rel="noopener noreferrer">
                Ler no Medium
              </a>
              <Link className="md-btn md-btn-outline" href="/welcome" target="_blank">
                Abrir protótipo
              </Link>
            </div>
          </div>
          <p className="md-footnote">
            Os nomes dos participantes das entrevistas foram omitidos. As telas desta página são carregadas ao vivo do
            protótipo do Glútty.
          </p>
        </div>
      </aside>
    </>
  );
}
