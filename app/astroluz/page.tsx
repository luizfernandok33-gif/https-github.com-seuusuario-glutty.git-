import type { Metadata } from "next";
import { Montserrat, Poiret_One } from "next/font/google";
import SiteHeader from "./SiteHeader";
import { ConstellationIcon, MoonIcon, SparkleClusterIcon, StarburstIcon } from "./MysticIcons";
import "./astroluz.css";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-body",
});

const poiretOne = Poiret_One({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-display",
});

export const metadata: Metadata = {
  title: "Astroluz — Marketing digital para brasileiros em Zurique",
  description:
    "Agência de marketing digital para brasileiros em Zurique, Suíça — sites, branding, redes sociais e consultoria de marketing.",
};

// Sobrescreve o viewport restritivo (zoom bloqueado) herdado do shell mobile do app Glútty.
export const viewport = {
  width: "device-width",
  initialScale: 1,
};

function FloatIcon({
  className,
  style,
  children,
}: {
  className?: string;
  style?: React.CSSProperties;
  children: React.ReactNode;
}) {
  return (
    <span className={`float-icon${className ? ` ${className}` : ""}`} style={style} aria-hidden="true">
      {children}
    </span>
  );
}

export default function AstroluzPage() {
  return (
    <div className={`astroluz-page ${montserrat.variable} ${poiretOne.variable}`}>
      <div className="stars" aria-hidden="true" />

      <SiteHeader />

      <div className="hero-media">
        <img
          src="/astroluz/hero.jpg"
          alt="Astronauta observando um planeta do alto de um asteroide, em um cenário estelar"
        />
        <div className="hero-content">
          <div className="hero-content-inner">
            <h1 className="hero-title">o universo digital, sem complicações.</h1>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/astroluz/logo.png" alt="Astroluz" className="hero-logo" />
            <div className="hero-ctas">
              <a href="#contato" className="btn-primary">
                Começar um projeto
              </a>
              <a href="#sobre" className="hero-link">
                Conhecer a Astroluz →
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="stats-bar">
        <div className="wrap stats-grid" style={{ position: "relative" }}>
          <FloatIcon style={{ top: "-46px", left: "6%", width: "34px", height: "34px" }}>
            <svg
              viewBox="0 0 24 24"
              fill="none"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              width="34"
              height="34"
            >
              <circle cx="12" cy="12" r="5" />
              <ellipse cx="12" cy="12" rx="10" ry="3.2" transform="rotate(-20 12 12)" />
            </svg>
          </FloatIcon>
          <div>
            <div className="stat-big">9+</div>
            <div className="stat-cap">
              Anos criando
              <br />
              para marcas
            </div>
          </div>
          <div>
            <div className="stat-big">3</div>
            <div className="stat-cap">
              Países de
              <br />
              experiência
            </div>
          </div>
          <div>
            <div className="stat-big">5</div>
            <div className="stat-cap">
              Anos em
              <br />
              Zurique
            </div>
          </div>
        </div>
      </div>

      <div className="exp-strip">
        <div className="wrap">
          <div className="exp-label">Experiência construída em</div>
          <div className="exp-row">
            <div className="exp-item">
              <span className="org">Senado Federal</span>
              <span className="meta">Interlegis · Brasília</span>
            </div>
            <div className="exp-item">
              <span className="org">Cobra Criada</span>
              <span className="meta">Agência · Brasil</span>
            </div>
            <div className="exp-item">
              <span className="org">ARCTEL-CPLP</span>
              <span className="meta">Lisboa · Portugal</span>
            </div>
            <div className="exp-item">
              <span className="org">UX Unicorn</span>
              <span className="meta">Certificação UX/UI</span>
            </div>
          </div>
        </div>
      </div>

      <section className="statement">
        <div className="wrap">
          <h2>
            A gente não vende um pacote fechado de serviços. A gente escolhe <em>as ferramentas certas</em>{" "}
            pro que o seu negócio realmente precisa.
          </h2>
        </div>
      </section>

      <section id="servicos">
        <div className="wrap" style={{ position: "relative" }}>
          <FloatIcon style={{ top: "-24px", left: "3%", width: "36px", height: "30px" }}>
            <SparkleClusterIcon />
          </FloatIcon>
          <div className="section-tag">Serviços</div>
          <h2 className="section-title">Presença digital, sem complicação.</h2>
          <div className="plans">
            <div className="plan light">
              <div className="plan-name">Presença Básica</div>
              <div className="plan-price">CHF 300–500</div>
              <ul>
                <li>Landing page de 1 página</li>
                <li>Perfil Google Meu Negócio otimizado</li>
                <li>Aparece quando buscam seu serviço na sua cidade</li>
              </ul>
              <a href="#contato" className="plan-cta">
                Falar sobre esse pacote
              </a>
            </div>
            <div className="plan featured">
              <span className="badge">Mais escolhido</span>
              <div className="plan-name">Presença Completa</div>
              <div className="plan-price">CHF 700–1200</div>
              <ul>
                <li>Site institucional (3–5 páginas)</li>
                <li>Google Meu Negócio otimizado</li>
                <li>Perfil de Instagram estruturado</li>
                <li>Ideal pra quem já tem clientes e quer profissionalizar</li>
              </ul>
              <a href="#contato" className="plan-cta">
                Falar sobre esse pacote
              </a>
            </div>
            <div className="plan">
              <div className="plan-name">Manutenção Mensal</div>
              <div className="plan-price">
                CHF 80–150<span>/mês</span>
              </div>
              <ul>
                <li>Ajustes contínuos no site</li>
                <li>1 post por semana</li>
                <li>Monitoramento do Google Meu Negócio</li>
              </ul>
              <a href="#contato" className="plan-cta">
                Falar sobre esse pacote
              </a>
            </div>
          </div>
        </div>
      </section>

      <section id="conteudo" className="deep">
        <div className="wrap">
          <div className="section-tag">Marketing de Conteúdo</div>
          <h2 className="section-title">
            Seu negócio precisa aparecer todo dia. Não só no dia que você lembra de postar.
          </h2>
          <div className="deep-grid">
            <div>
              <p className="deep-lead">
                A maioria dos pequenos negócios brasileiros na Suíça vive de indicação. Funciona — até o dia
                que para. <strong>Conteúdo é o que mantém seu negócio visível mesmo quando ninguém te
                indicou naquela semana.</strong>
              </p>
              <p className="deep-lead">
                O problema não é falta de vontade: é falta de tempo e de constância. Você já trabalha o dia
                inteiro no seu serviço. Postar, pensar em pauta, escrever legenda, responder comentário e
                ainda manter uma linha visual coerente vira a segunda jornada que ninguém aguenta.
              </p>
              <p className="deep-lead">
                É aí que a gente entra: você toca o seu negócio, a Astroluz cuida da sua presença.
              </p>
              <div className="porque">
                <p>
                  <strong>Por que isso importa:</strong> quem posta com constância aparece mais no Google e
                  no Instagram, constrói autoridade e chega no cliente <em>antes</em> do concorrente.
                  Conteúdo não é enfeite — é o que transforma seguidor em cliente.
                </p>
              </div>
            </div>
            <div className="incluso">
              <h4>O que a gente faz por você</h4>
              <ul>
                <li>Planejamento de pauta mensal alinhado ao seu público</li>
                <li>Criação das artes e vídeos com a identidade da sua marca</li>
                <li>Redação de legendas e chamadas pensadas pra converter</li>
                <li>Calendário de publicação e agendamento dos posts</li>
                <li>Gestão de comentários e mensagens diretas</li>
                <li>Relatório mensal com o que funcionou e o que ajustar</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section id="consultoria" className="deep alt">
        <div className="wrap">
          <div className="section-tag">Consultoria de Marketing</div>
          <h2 className="section-title">Impulsionar post não é estratégia. É esperança com boleto.</h2>
          <div className="deep-grid">
            <div>
              <p className="deep-lead">
                Muita gente começa pelo fim: impulsiona um post, faz um site, cria um perfil — e depois
                descobre que estava falando com o público errado, cobrando o preço errado, ou competindo num
                lugar onde não tinha chance.
              </p>
              <p className="deep-lead">
                <strong>A consultoria existe pra evitar esse desperdício.</strong> É uma leitura honesta do
                seu negócio, do seu mercado e da sua concorrência, com um plano do que fazer nos próximos
                meses — e, igualmente importante, do que <em>não</em> fazer agora.
              </p>
              <div className="porque">
                <p>
                  <strong>Por que isso importa:</strong> uma decisão errada de posicionamento custa meses e
                  milhares de francos. Algumas horas de consultoria custam bem menos do que um ano
                  investindo na direção errada.
                </p>
              </div>
            </div>
            <div className="incluso">
              <h4>O que está incluso</h4>
              <ul>
                <li>Diagnóstico da presença digital atual (site, redes, Google)</li>
                <li>Definição de público-alvo e cliente ideal</li>
                <li>Análise de concorrentes diretos na sua região</li>
                <li>Posicionamento e proposta de valor da sua marca</li>
                <li>Orientação de precificação e pacotes de serviço</li>
                <li>Plano de ação priorizado para 90 dias</li>
                <li>Reunião de devolutiva e documento final entregue</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section id="atendimento" className="deep">
        <div className="wrap">
          <div className="section-tag">Atendimento ao Cliente</div>
          <h2 className="section-title">O cliente decide se confia em você antes de perguntar o preço.</h2>
          <p className="deep-lead" style={{ maxWidth: "760px" }}>
            A experiência do cliente com a sua marca começa na primeira vez que ele te encontra e continua
            depois que ele já pagou. <strong>Cada etapa dessa jornada é uma chance de ganhar ou perder a
            confiança dele.</strong>
          </p>
          <div className="funil">
            <div className="funil-step">
              <div className="fase">Antes da venda</div>
              <h4>A primeira impressão</h4>
              <p>
                Um perfil bem cuidado, um site que carrega rápido e uma resposta em poucas horas já colocam
                você à frente. Quando ele finalmente pergunta o preço, a decisão já está meio tomada.
              </p>
            </div>
            <div className="funil-step">
              <div className="fase">Durante a venda</div>
              <h4>Clareza gera decisão</h4>
              <p>
                Preço claro, prazo claro, o que está incluso e o que não está. Quanto menos dúvida o cliente
                tem, mais rápido ele fecha — e menos ele pechincha.
              </p>
            </div>
            <div className="funil-step">
              <div className="fase">Pós-venda</div>
              <h4>Onde nasce a fidelização</h4>
              <p>
                Um retorno depois da entrega, um pedido de feedback, um lembrete no momento certo. É mais
                barato manter um cliente do que conquistar um novo — e cliente satisfeito indica.
              </p>
            </div>
          </div>
          <div className="porque" style={{ maxWidth: "760px" }}>
            <p>
              <strong>O que a gente faz:</strong> estruturamos essa jornada com você — desde as mensagens
              padrão de primeiro contato e orçamento, até o fluxo de pós-venda e pedido de avaliação no
              Google. Nada de improviso a cada cliente novo.
            </p>
          </div>
        </div>
      </section>

      <section id="processo">
        <div className="wrap" style={{ position: "relative" }}>
          <FloatIcon style={{ top: "-10px", right: "4%", width: "34px", height: "34px" }}>
            <StarburstIcon />
          </FloatIcon>
          <div className="section-tag">Processo</div>
          <h2 className="section-title">Como a gente trabalha, do briefing à entrega.</h2>
          <div className="proc-cards">
            <div className="proc-card">
              <div className="n">01</div>
              <h4>Briefing</h4>
              <p>Entendo seu negócio, seu cliente e o que você já tentou até aqui.</p>
            </div>
            <div className="proc-card accent">
              <div className="n">02</div>
              <h4>Estratégia</h4>
              <p>Defino a estrutura certa: site, identidade ou os dois juntos.</p>
            </div>
            <div className="proc-card">
              <div className="n">03</div>
              <h4>Design &amp; Build</h4>
              <p>Construo com processo de UX real por trás de cada decisão.</p>
            </div>
            <div className="proc-card">
              <div className="n">04</div>
              <h4>Entrega &amp; Suporte</h4>
              <p>Publicação, ajustes finos e acompanhamento contínuo se precisar.</p>
            </div>
          </div>
        </div>
      </section>

      <section id="ferramentas">
        <div className="wrap">
          <div className="section-tag">Ferramentas</div>
          <h2 className="section-title">Estratégia, design e tecnologia na mesma mesa.</h2>
          <p className="skills-lead">
            Publicidade e UX não moram em mundos separados aqui. O mesmo processo que estrutura um produto
            digital é o que estrutura a presença do seu negócio.
          </p>

          <div className="skill-group">
            <h4>Estratégia &amp; Marketing</h4>
            <div className="skill-tags">
              <span className="skill-tag">Branding</span>
              <span className="skill-tag">Direção de Arte</span>
              <span className="skill-tag">Copywriting</span>
              <span className="skill-tag">SEO Local</span>
              <span className="skill-tag">Google Meu Negócio</span>
              <span className="skill-tag">Google Ads</span>
              <span className="skill-tag">Meta Ads</span>
              <span className="skill-tag">Social Media</span>
            </div>
          </div>

          <div className="skill-group">
            <h4>Design &amp; Produto</h4>
            <div className="skill-tags">
              <span className="skill-tag">UX Research</span>
              <span className="skill-tag">Personas &amp; CJM</span>
              <span className="skill-tag">Wireframing</span>
              <span className="skill-tag">Prototipação</span>
              <span className="skill-tag">Design Systems</span>
              <span className="skill-tag">UX Writing</span>
              <span className="skill-tag">Teste de Usabilidade</span>
              <span className="skill-tag">Acessibilidade</span>
            </div>
          </div>

          <div className="skill-group">
            <h4>Ferramentas</h4>
            <div className="skill-tags">
              <span className="skill-tag">Figma</span>
              <span className="skill-tag">Adobe Creative Suite</span>
              <span className="skill-tag">Miro</span>
              <span className="skill-tag">Maze</span>
              <span className="skill-tag">Notion</span>
              <span className="skill-tag">Vercel</span>
              <span className="skill-tag accent">IA aplicada a produto</span>
              <span className="skill-tag accent">Prompt Engineering</span>
            </div>
          </div>
        </div>
      </section>

      <section id="projeto">
        <div className="wrap">
          <div className="section-tag">Projeto</div>
          <h2 className="section-title">Um projeto real, do início ao fim.</h2>
          <div className="case">
            <div className="case-visual">
              <span style={{ fontSize: "2.2rem" }}>♛</span>
              <span>Glútty</span>
            </div>
            <div>
              <h3 style={{ fontSize: "1.4rem" }}>Case: App Glútty</h3>
              <div className="case-stats">
                <div>
                  <div className="stat-num">86</div>
                  <div className="stat-label">participantes de pesquisa</div>
                </div>
                <div>
                  <div className="stat-num">100%</div>
                  <div className="stat-label">processo documentado</div>
                </div>
              </div>
              <p>
                Pesquisa com usuários, wireframes, design system e prototipagem completa para um app de
                restaurantes — do problema inicial ao deploy. Um exemplo real de como pensamos produto, não
                só tela.
              </p>
              <a
                href="https://www.behance.net/luizfernandomendes"
                target="_blank"
                rel="noopener"
                className="case-link"
              >
                Ver portfólio completo no Behance →
              </a>
            </div>
          </div>
        </div>
      </section>

      <section id="depoimentos">
        <div className="wrap" style={{ position: "relative" }}>
          <FloatIcon className="delay2" style={{ top: "4px", right: "4%", width: "30px", height: "30px" }}>
            <MoonIcon />
          </FloatIcon>
          <div className="section-tag">Depoimentos &amp; Clientes</div>
          <h2 className="section-title">Ainda escrevendo essa parte da história.</h2>
          <div className="construction-box">
            <span className="construction-badge">Em construção</span>
            <p>
              A Astroluz está começando um novo capítulo agora. Ainda não temos depoimentos dessa fase pra
              mostrar aqui — e preferimos deixar essa seção vazia a inventar algo. Assim que os primeiros
              clientes começarem a chegar, os relatos reais entram aqui.
            </p>
            <p>
              Por enquanto, o{" "}
              <a href="#projeto" className="inline-link">
                case do Glútty
              </a>{" "}
              é a melhor forma de ver como a gente trabalha, na prática.
            </p>
          </div>
        </div>
      </section>

      <section id="sobre">
        <div className="cosmic-glow" aria-hidden="true" />
        <FloatIcon style={{ top: "18px", right: "6%", width: "52px", height: "32px" }}>
          <ConstellationIcon />
        </FloatIcon>
        <div className="wrap">
          <div className="bio-card">
            <div className="bio-head">
              <div className="bio-avatar">L</div>
              <div>
                <h3>Sobre mim</h3>
                <p>📍 Morando em Zurique, na Suíça, há 5 anos</p>
              </div>
            </div>
            <p className="bio-text">
              Sou publicitário, formado em Comunicação Social — Publicidade e Propaganda pelo Centro
              Universitário IESB, em Brasília. Comecei como estagiário de direção de arte no Senado Federal
              e, depois, passei pela agência Cobra Criada, onde fui responsável pela direção de arte das
              peças de social media do órgão atendido.
            </p>
            <p className="bio-text">
              Também trabalhei em Lisboa com design institucional e, já na Suíça, me especializei em UX/UI e
              Product Design — incluindo IA aplicada a produtos digitais. Há 5 anos moro em Zurique, me
              capacitando pra atuar com o público brasileiro que vive por aqui e tem seu próprio negócio.
              Meu objetivo é ajudar esses empreendedores a estarem mais presentes no marketing digital e
              transformar seguidores em clientes.
            </p>

            <div className="tags">
              <span className="tag-pill">🇧🇷 Brasil</span>
              <span className="tag-pill">🇵🇹 Portugal</span>
              <span className="tag-pill">🇨🇭 Suíça</span>
              <span className="tag-pill">Português — nativo</span>
              <span className="tag-pill">Espanhol — B2</span>
              <span className="tag-pill">Alemão — B1</span>
            </div>

            <div className="timeline">
              <div className="timeline-item">
                <span className="timeline-dot" />
                <div>
                  <h4>Comunicação Social — Publicidade e Propaganda</h4>
                  <span>Centro Universitário IESB, Brasília · 2019</span>
                </div>
              </div>
              <div className="timeline-item">
                <span className="timeline-dot" />
                <div>
                  <h4>Estágio em direção de arte</h4>
                  <span>Interlegis — Senado Federal · 2017–2018</span>
                </div>
              </div>
              <div className="timeline-item">
                <span className="timeline-dot" />
                <div>
                  <h4>Direção de arte de social media</h4>
                  <span>Agência Cobra Criada · 2021–2022</span>
                </div>
              </div>
              <div className="timeline-item">
                <span className="timeline-dot" />
                <div>
                  <h4>Design gráfico institucional</h4>
                  <span>ARCTEL-CPLP, Lisboa · 2020</span>
                </div>
              </div>
              <div className="timeline-item">
                <span className="timeline-dot" />
                <div>
                  <h4>UX, UI e Product Design</h4>
                  <span>UX Unicorn Program · 2023, com formação em IA em andamento</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="contato">
        <div className="wrap contato-inner">
          <div className="section-tag">Contato</div>
          <h2>Vamos conversar sobre o seu negócio?</h2>
          <p>Me conta o que você faz e o que precisa — em 1 dia útil eu te respondo com uma sugestão de pacote e prazo.</p>
          <div className="contato-ctas">
            <a href="https://wa.me/41782170897" className="btn-primary">
              Chamar no WhatsApp
            </a>
            <a href="mailto:luizfernando.cdc1@hotmail.com" className="btn-ghost">
              Enviar e-mail
            </a>
          </div>

          <div className="socials">
            <span className="socials-label">Siga a Astroluz</span>
            <div className="social-row">
              <a
                href="https://instagram.com/SEU_USUARIO"
                target="_blank"
                rel="noopener"
                className="social"
                aria-label="Instagram da Astroluz"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round">
                  <rect x="3" y="3" width="18" height="18" rx="5" />
                  <circle cx="12" cy="12" r="4" />
                  <circle cx="17.4" cy="6.6" r="1.1" fill="currentColor" stroke="none" />
                </svg>
                <span>Instagram</span>
              </a>
              <a
                href="https://facebook.com/SEU_USUARIO"
                target="_blank"
                rel="noopener"
                className="social"
                aria-label="Facebook da Astroluz"
              >
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M14 9h3V6h-3c-2.2 0-4 1.8-4 4v2H8v3h2v7h3v-7h3l1-3h-4v-2c0-.6.4-1 1-1z" />
                </svg>
                <span>Facebook</span>
              </a>
              <a
                href="https://www.behance.net/luizfernandomendes"
                target="_blank"
                rel="noopener"
                className="social"
                aria-label="Portfólio no Behance"
              >
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M7.8 6.2c.9 0 1.7.1 2.4.2.7.2 1.3.4 1.8.8.5.3.8.8 1.1 1.4.2.6.4 1.2.4 2 0 .9-.2 1.6-.6 2.2-.4.6-1 1-1.7 1.4 1 .3 1.8.8 2.3 1.6.5.8.7 1.6.7 2.7 0 .9-.2 1.6-.5 2.2-.3.6-.8 1.1-1.3 1.5-.6.4-1.2.7-1.9.8-.7.2-1.5.3-2.2.3H1V6.2h6.8zm-.4 6.8c.7 0 1.3-.2 1.7-.5.5-.3.7-.9.7-1.6 0-.4-.1-.7-.2-1-.1-.3-.3-.5-.6-.6-.2-.1-.5-.2-.8-.3-.3 0-.6-.1-1-.1H4v4.1h3.4zm.2 7.1c.4 0 .7 0 1.1-.1.3-.1.6-.2.9-.3.2-.2.4-.4.6-.7.1-.3.2-.7.2-1.1 0-.9-.3-1.5-.8-1.9-.5-.4-1.2-.6-2-.6H4v4.7h3.6zM17.6 20.3c.4.4 1 .6 1.8.6.6 0 1.1-.1 1.5-.4.4-.3.7-.6.8-.9h2.2c-.4 1.1-.9 1.9-1.6 2.4-.7.5-1.6.7-2.7.7-.7 0-1.4-.1-2-.4-.6-.2-1.1-.6-1.5-1-.4-.5-.7-1-.9-1.6-.2-.6-.3-1.3-.3-2.1s.1-1.4.3-2c.2-.6.6-1.2 1-1.6.4-.5.9-.8 1.5-1.1.6-.3 1.2-.4 2-.4.8 0 1.5.2 2.1.5.6.3 1.1.7 1.5 1.3.4.5.7 1.1.8 1.8.2.7.2 1.4.2 2.1h-7c0 .8.2 1.6.6 2.1h-.3zm3.1-5.5c-.3-.4-.9-.6-1.5-.6-.5 0-.8.1-1.1.2-.3.1-.5.3-.7.6-.2.2-.3.5-.4.7 0 .2-.1.5-.1.7h4.4c-.1-.7-.3-1.3-.6-1.6zM16.8 9.1h5.5v1.3h-5.5z" />
                </svg>
                <span>Behance</span>
              </a>
              <a
                href="https://linkedin.com/in/SEU_USUARIO"
                target="_blank"
                rel="noopener"
                className="social"
                aria-label="LinkedIn da Astroluz"
              >
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M4.98 3.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM3 9h4v12H3zM9 9h3.8v1.7h.05c.53-.95 1.83-1.95 3.76-1.95C20.5 8.75 21 11 21 14v7h-4v-6.2c0-1.5-.03-3.4-2.1-3.4-2.1 0-2.4 1.6-2.4 3.3V21H9z" />
                </svg>
                <span>LinkedIn</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      <footer>
        <div className="wrap">
          <div className="foot-links">
            <a href="https://wa.me/41782170897">+41 78 217 0897</a>
            <span className="sep">·</span>
            <a href="mailto:luizfernando.cdc1@hotmail.com">luizfernando.cdc1@hotmail.com</a>
          </div>
          <div>
            <strong>Astroluz</strong> — Agência de Marketing — Zurique, Suíça
          </div>
        </div>
      </footer>
    </div>
  );
}
