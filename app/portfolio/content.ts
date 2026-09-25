/* ============================================================
   Conteúdo do portfólio em português, inglês e alemão.
   Formatação simples dentro dos textos:
     **negrito**   *itálico*   [texto do link](url)
   ============================================================ */

export const LANGS = ["pt", "en", "de"] as const;
export type Lang = (typeof LANGS)[number];

export const MEDIUM_URL =
  "https://medium.com/@luizfernandok33/gl%C3%BAtty-mais-seguran%C3%A7a-e-confian%C3%A7a-para-pessoas-cel%C3%ADacas-ao-comer-fora-3d0f45849a14";
export const MEDIUM_PROFILE = "https://medium.com/@luizfernandok33";
export const PROTOTYPE_URL = "/welcome";
export const AUTHOR = "Luíz Assiz";
export const AUTHOR_PHOTO = "/portfolio/autor.jpg";
// Data de publicação no Medium (21 de maio).
export const PUBLISHED = new Date(2026, 4, 21);
const MAYO_URL = "https://www.mayoclinic.org/diseases-conditions/celiac-disease/symptoms-causes/syc-20352220";
const CDF_URL = "https://pubmed.ncbi.nlm.nih.gov/?term=Global+Prevalence+of+Celiac+Disease+Systematic+Review+and+Meta-analysis";

// Total de respostas válidas da pesquisa quantitativa (PT + DE + EN).
export const N = 86;
export const pct = (n: number) => Math.round((n / N) * 100);

export type FigureKind =
  | "cover"
  | "hero"
  | "competitors"
  | "stats"
  | "charts"
  | "personas"
  | "journey"
  | "mvp"
  | "badges"
  | "brand"
  | "test";

export type Block =
  | { t: "p"; text: string }
  | { t: "h2"; id: string; text: string }
  | { t: "h3"; text: string }
  | { t: "ul"; items: string[] }
  | { t: "quote"; text: string; cite: string }
  | { t: "pull"; text: string }
  | { t: "sep" }
  | { t: "decision"; text: string }
  | { t: "figure"; kind: FigureKind; caption: string }
  | { t: "screens"; items: { path: string; label: string }[]; caption: string };

export type Content = {
  htmlLang: string;
  langName: string;
  ui: {
    openPrototype: string;
    readOnMedium: string;
    follow: string;
    minRead: (n: number) => string;
    date: string;
    coverTitle: [string, string, string];
    kind: string;
    decision: string;
    prototypeHint: string;
    ofPeople: string;
    step: string;
    strong: string;
    weak: string;
    mvpTag: string;
    laterTag: string;
    needs: string;
    does: string;
    feels: string;
    inGlutty: string;
    topics: string;
    writtenBy: string;
    authorBio: string;
    footnote: string;
    clap: string;
    comment: string;
    save: string;
    share: string;
    language: string;
    screenAlt: (label: string) => string;
  };
  title: string;
  subtitle: string;
  blocks: Block[];
  fig: {
    competitors: { name: string; sub: string; strong: string; weak: string }[];
    stats: { value: number; label: string }[];
    charts: { title: string; sub: string; bars: { label: string; n: number }[] }[];
    personas: { name: string; role: string; mvp: boolean; bio: string; needs: string }[];
    journey: { title: string; does: string; feels: string; glutty: string }[];
    mvp: { inTitle: string; laterTitle: string; in: string[]; later: string[] };
    brand: { tagline: string; slogans: string[]; typeNote: string; mascotAlt: string; colors: { name: string; hex: string }[] };
    test: { title: string; q: string }[];
  };
  tags: string[];
};

/* ───────────────────────── Português ───────────────────────── */

const pt: Content = {
  htmlLang: "pt-BR",
  langName: "Português",
  ui: {
    openPrototype: "Abrir protótipo",
    readOnMedium: "Ler no Medium",
    follow: "Seguir",
    minRead: (n) => `${n} min de leitura`,
    date: "21 de mai.",
    coverTitle: ["Mais segurança e confiança para pessoas celíacas", "ao", "comer fora"],
    kind: "Estudo de caso UX/UI",
    decision: "Por que essa decisão",
    prototypeHint: "Protótipo navegável. Toque e explore.",
    ofPeople: `% das ${N} pessoas`,
    step: "Etapa",
    strong: "Forte",
    weak: "Fraco",
    mvpTag: "Foco do MVP",
    laterTag: "Próximas fases",
    needs: "Precisa de",
    does: "Faz",
    feels: "Sente",
    inGlutty: "Glútty",
    topics: "Tópicos",
    writtenBy: `Escrito por ${AUTHOR}`,
    authorBio: "Publicitário em transição para UX Design. Pesquisa, estratégia, interface e escrita, de ponta a ponta.",
    footnote:
      "Os nomes dos participantes das entrevistas foram omitidos. As telas desta página são carregadas ao vivo do protótipo do Glútty.",
    clap: "Aplaudir no Medium",
    comment: "Comentar no Medium",
    save: "Salvar no Medium",
    share: "Abrir o artigo original no Medium",
    language: "Idioma",
    screenAlt: (l) => `Tela ${l} do Glútty`,
  },
  title: "Glútty: Mais segurança e confiança para pessoas celíacas ao comer fora",
  subtitle:
    "Uma solução digital desenvolvida para apoiar decisões alimentares mais seguras através de transparência, experiências compartilhadas e redução da insegurança alimentar.",
  blocks: [
    { t: "figure", kind: "cover", caption: "" },
    { t: "h2", id: "introducao", text: "Introdução" },
    {
      t: "p",
      text: `A doença celíaca é uma condição autoimune desencadeada pela ingestão de glúten — proteína presente no trigo, cevada, centeio e derivados — que pode causar inflamações no intestino delgado e comprometer a absorção de nutrientes essenciais pelo organismo. [Mayo Clinic — Celiac Disease Overview](${MAYO_URL})`,
    },
    {
      t: "p",
      text: `Estudos internacionais apontam que a doença celíaca afeta aproximadamente 1% da população mundial, com crescimento contínuo nos diagnósticos nas últimas décadas. Revisões sistemáticas indicam que a prevalência da doença aumentou significativamente nos últimos anos, tanto em países europeus quanto em outras regiões do mundo. [Celiac Disease Foundation — Global Prevalence Study](${CDF_URL})`,
    },
    {
      t: "p",
      text: "O Glútty é um aplicativo que conecta pessoas celíacas a restaurantes mais seguros, com foco em contaminação cruzada, informação clara e na experiência de quem vive a mesma rotina. O projeto foi feito para aplicar o que aprendi no curso UX Unicórnio, de ponta a ponta.",
    },
    { t: "figure", kind: "hero", caption: "O protótipo do Glútty, carregado ao vivo. Dá para navegar aqui mesmo." },
    { t: "h3", text: "Sobre o projeto" },
    {
      t: "ul",
      items: [
        "**Minhas funções:** UX Research, UX Strategy, UX Design e UX Writing.",
        "**Ferramentas:** Figma, Google Docs, Maze, Tactiq, ChatGPT, Claude Code e Vercel.",
        "**Processo:** descobrir (desk research, matriz CSD e UX research), definir (personas e mapa de jornada), desenvolver (wireflow, wireframes e UI) e validar (teste de usabilidade).",
      ],
    },
    { t: "sep" },
    { t: "h2", id: "problema", text: "O problema: comer fora não deveria ser um risco" },
    {
      t: "p",
      text: "O único tratamento é uma dieta sem glúten, para sempre, e ela exige atenção a cada refeição.",
    },
    {
      t: "p",
      text: "O maior perigo fora de casa é a **contaminação cruzada**. Uma migalha na chapa, o óleo da mesma fritura ou uma faca compartilhada bastam para causar uma reação. Como o glúten é uma proteína, o calor não o elimina. A única saída é evitar o contato.",
    },
    {
      t: "p",
      text: "E o rótulo nem sempre protege. Um estudo citado pela Celiac Disease Foundation encontrou glúten detectável em **32% dos pratos vendidos como “sem glúten”** em restaurantes. Sem fiscalização formal, quem é celíaco acaba dependendo de perguntas ao garçom, grupos de WhatsApp e posts no Instagram.",
    },
    { t: "pull", text: "Para quem é celíaco, **comer fora é um ato de planejamento**, não de espontaneidade." },
    { t: "sep" },
    { t: "h2", id: "descobrir", text: "Descobrir: entender antes de desenhar" },
    {
      t: "p",
      text: "Comecei com um plano de pesquisa. O objetivo era entender como pessoas celíacas vivem o ato de comer fora, o que as faz confiar em um lugar e quais impactos sociais e emocionais a doença traz para a rotina.",
    },
    { t: "h3", text: "Desk research e matriz CSD" },
    {
      t: "p",
      text: "Reuni artigos científicos, conteúdos de associações de celíacos e estudos sobre qualidade de vida. Eles mostram que restaurantes e viagens são fontes de ansiedade, pela oferta limitada de refeições seguras e pelo pouco conhecimento das equipes sobre glúten.",
    },
    {
      t: "p",
      text: "Organizei o que eu sabia, o que eu supunha e o que precisava descobrir em uma matriz CSD. As dúvidas viraram as perguntas do survey e dos roteiros de entrevista.",
    },
    { t: "h3", text: "Análise de concorrentes" },
    {
      t: "p",
      text: "Analisei apps de restrição alimentar e também estabelecimentos 100% sem glúten e supermercados da Suíça. Os apps resolvem parte do problema. Nenhum deles coloca a segurança contra contaminação cruzada no centro.",
    },
    { t: "figure", kind: "competitors", caption: "Resumo da análise de concorrentes digitais e estabelecimentos." },
    {
      t: "decision",
      text: "Os concorrentes mostraram uma lacuna clara. Existe informação sobre onde comer sem glúten, mas ninguém explica *por que* um lugar é seguro. Essa virou a proposta de valor do Glútty: tornar a segurança visível.",
    },
    { t: "h3", text: "Pesquisa quantitativa: 86 respostas em 3 idiomas" },
    {
      t: "p",
      text: `Fiz um survey em português, alemão e inglês, divulgado em grupos e comunidades de pessoas celíacas. Foram ${N} respostas válidas, a maioria do Brasil (43) e da Suíça (38). A maior parte já segue a dieta há mais de três anos, então as respostas vêm de quem conhece o problema a fundo.`,
    },
    { t: "figure", kind: "stats", caption: `Principais números da pesquisa quantitativa, com ${N} respostas.` },
    { t: "figure", kind: "charts", caption: "Medos, fontes de confiança e expectativas. Perguntas de múltipla escolha somam mais de 100%." },
    {
      t: "p",
      text: `Dois números guiaram o resto do projeto. **O medo número um é a equipe despreparada**, citada por ${pct(77)}% das pessoas, logo à frente da contaminação cruzada. E **a fonte de confiança número um são outros celíacos**: ${pct(76)}% buscam indicações na comunidade, e ${pct(77)}% dizem que avaliações de outros celíacos geram confiança.`,
    },
    {
      t: "decision",
      text: "Se as pessoas já confiam umas nas outras, o app não precisa inventar uma autoridade. Ele precisa organizar a experiência da comunidade e mostrar os sinais que mais geram confiança: equipe treinada, cozinha separada e ingredientes claros.",
    },
    { t: "h3", text: "Pesquisa qualitativa: 8 conversas em profundidade" },
    {
      t: "p",
      text: "Os números mostraram o tamanho do problema. As entrevistas mostraram como ele se sente. Conversei com oito pessoas, entre celíacos de capitais e do interior, uma mãe de criança celíaca e um dono de restaurante 100% sem glúten. Seis dores apareceram em quase todas as conversas:",
    },
    {
      t: "ul",
      items: [
        "**Medo de contaminação.** Uma migalha basta para dias ou semanas de sintomas.",
        "**Perda de espontaneidade.** Comer fora exige pesquisa, ligações e planejamento.",
        "**Informação pouco confiável.** Apps, cardápios e atendentes passam dados vagos.",
        "**Custo e acesso.** Comida sem glúten é mais cara e quase some fora das capitais.",
        "**Falta de preparo e empatia.** Equipes que minimizam a doença ou a confundem com dieta da moda.",
        "**Isolamento social.** Convites recusados e a sensação de ser “a pessoa diferente” da mesa.",
      ],
    },
    { t: "quote", text: "“Quando o atendente não sabe responder, eu já sei que não é o lugar certo.”", cite: "Participante, São Paulo" },
    { t: "quote", text: "“Nosso iFood são os colegas celíacos. A gente pergunta no grupo, não no app.”", cite: "Participante, São Paulo" },
    { t: "quote", text: "“Comer fora é um ato de coragem. Mas quando há empatia, vira um ato de amor.”", cite: "Participante, Rio Grande do Sul" },
    { t: "sep" },
    { t: "h2", id: "definir", text: "Definir: para quem e para quê" },
    { t: "h3", text: "Personas" },
    { t: "p", text: "Transformei os perfis das entrevistas em quatro proto-personas. Para o MVP, priorizei a Luana e o Guilherme." },
    { t: "figure", kind: "personas", caption: "Proto-personas construídas a partir das entrevistas." },
    {
      t: "decision",
      text: "A Luana representa o maior volume de usuários, nas grandes cidades. O Guilherme representa a maior vulnerabilidade: quem acabou de receber o diagnóstico e está longe das capitais. Juntos, eles cobrem quem mais usaria o app e quem mais precisaria dele.",
    },
    { t: "h3", text: "Mapa de jornada" },
    {
      t: "p",
      text: "Mapeei a jornada desde o momento em que a pessoa decide sair de casa até depois da refeição. Ficou claro que o Glútty precisa ser um **sistema de apoio contínuo**, presente antes, durante e depois de comer fora.",
    },
    { t: "figure", kind: "journey", caption: "Resumo do mapa de jornada de quem é celíaco ao comer fora." },
    { t: "h3", text: "MVP e priorização" },
    {
      t: "p",
      text: "Para escolher as funcionalidades, usei uma matriz de impacto × esforço. O MVP foi pensado para a **segurança crítica**: entrou o que ajuda a avaliar a confiabilidade de um lugar e reduz a incerteza na hora de decidir.",
    },
    { t: "figure", kind: "mvp", caption: "Funcionalidades do MVP e o que ficou para as próximas versões." },
    {
      t: "decision",
      text: "Reserva, delivery, comunidade e um selo próprio são valiosos, mas exigem integrações, moderação e governança. Lançar isso sem curadoria poderia gerar interpretações erradas sobre segurança, o que é justamente o que o Glútty quer evitar. Por isso ficaram para depois.",
    },
    { t: "sep" },
    { t: "h2", id: "ui", text: "UI Design: traduzindo estratégia em interface" },
    {
      t: "p",
      text: "Com o escopo definido, passei por wireflows de baixa fidelidade e wireframes de média fidelidade antes da interface final. Cada tela abaixo responde a um insight da pesquisa. Todas estão carregadas ao vivo a partir do protótipo.",
    },
    { t: "h3", text: "1. Primeiro contato: o usuário diz o que é seguro para ele" },
    {
      t: "p",
      text: "O onboarding escolhe o idioma, apresenta a proposta e pergunta o que é seguro para a pessoa. Essa resposta vira o **padrão de segurança**, que filtra tudo o que o app mostra depois.",
    },
    {
      t: "screens",
      items: [
        { path: "/idioma", label: "Idioma" },
        { path: "/welcome", label: "Boas-vindas" },
        { path: "/onboarding", label: "Padrão de segurança" },
      ],
      caption: "Onboarding em português, inglês e alemão, pensando no público do Brasil e da Suíça.",
    },
    {
      t: "decision",
      text: `A pesquisa mostrou que explicar a restrição gera constrangimento para ${pct(67)}% das pessoas. Com o perfil configurado uma vez, o app passa a “falar” pelo usuário, sem que ele precise se justificar a cada busca.`,
    },
    { t: "h3", text: "2. Encontrar um restaurante" },
    {
      t: "p",
      text: "A home abre com a localização e o padrão de segurança à vista. As listas priorizam lugares muito seguros por perto e os mais bem avaliados por celíacos.",
    },
    {
      t: "screens",
      items: [
        { path: "/home", label: "Home" },
        { path: "/busca", label: "Busca" },
        { path: "/categoria/mais-seguros", label: "Categoria" },
      ],
      caption: "Home, busca e categorias como “Mais seguros” e “Festa sem glúten”.",
    },
    {
      t: "decision",
      text: `Lista de restaurantes seguros (${pct(81)}%) e geolocalização (${pct(69)}%) foram duas das funcionalidades mais pedidas. Por isso a primeira tela já responde “onde posso comer com segurança perto de mim?”.`,
    },
    { t: "h3", text: "3. Analisar o restaurante e o prato" },
    {
      t: "p",
      text: "O restaurante mostra seus procedimentos contra contaminação cruzada, as restrições atendidas e as avaliações. No prato, cada ingrediente aparece com o status em relação ao perfil do usuário.",
    },
    {
      t: "screens",
      items: [
        { path: "/restaurante/1", label: "Restaurante" },
        { path: "/restaurante/1/prato/d1", label: "Prato" },
      ],
      caption: "A página do restaurante e o detalhe do prato, com ingredientes declarados.",
    },
    {
      t: "decision",
      text: `Ingredientes escondidos preocupam ${pct(58)}% das pessoas. Mostrar os ingredientes declarados não substitui a conversa com o restaurante, mas ajuda o usuário a saber o que perguntar antes de pedir.`,
    },
    { t: "h3", text: "4. Comunidade e avaliação: segurança antes de estrelas" },
    {
      t: "p",
      text: "A avaliação não começa pelas estrelas. A primeira pergunta é **“Você se sentiu seguro?”**. Depois vêm tags como “Equipe treinada”, “Cozinha separada” e “Ingredientes claros”, e só então o comentário.",
    },
    {
      t: "screens",
      items: [
        { path: "/comunidade", label: "Comunidade" },
        { path: "/restaurante/1/avaliar", label: "Avaliar" },
      ],
      caption: "A comunidade reúne relatos de quem tem as mesmas restrições. A avaliação começa pela segurança.",
    },
    {
      t: "decision",
      text: "O Glútty não é um app de avaliação de restaurantes comum. O foco não é sabor nem preço. As tags de avaliação são exatamente os sinais que a pesquisa apontou como geradores de confiança, então cada relato vira informação útil para a próxima pessoa celíaca.",
    },
    { t: "h3", text: "5. Perfil: o cérebro da personalização" },
    {
      t: "p",
      text: "No perfil ficam o diagnóstico, as restrições, os ingredientes proibidos e o padrão de segurança. Esses dados mudam a busca, as recomendações e os alertas de risco.",
    },
    {
      t: "screens",
      items: [
        { path: "/perfil", label: "Meu perfil" },
        { path: "/perfil/restricoes", label: "Restrições" },
        { path: "/perfil/seguranca", label: "Padrão de segurança" },
      ],
      caption: "Perfil alimentar, restrições e padrão de segurança editáveis.",
    },
    { t: "h3", text: "Selos de segurança" },
    {
      t: "p",
      text: "Restaurantes e pratos usam os mesmos selos em todas as telas. Cada um combina cor, ícone e texto, para que a informação nunca dependa só da cor.",
    },
    { t: "figure", kind: "badges", caption: "A escala de selos, do mais seguro ao que pede cuidado." },
    {
      t: "decision",
      text: "Uma tag colorida reduz o esforço de leitura: a pessoa entende o nível de segurança num relance, sem precisar ler o cardápio inteiro. E o texto no selo garante que a informação chegue também a quem não distingue cores.",
    },
    { t: "h3", text: "UX Writing: informar sem assustar" },
    {
      t: "p",
      text: "O objetivo do app é diminuir o medo, não aumentar. Na revisão das telas, questionei rótulos como *“Risco de contaminação: baixo”*. A informação precisa estar lá, mas com um tom claro e acolhedor, sem soar alarmista.",
    },
    { t: "sep" },
    { t: "h2", id: "branding", text: "Branding: criando conexões afetivas entre a escolha do nome e o propósito do aplicativo" },
    {
      t: "p",
      text: "O nome Glútty parte da palavra que está no centro da vida de quem é celíaco, o glúten, mas com um tom leve e próximo. A ideia é que a marca acolha, em vez de soar como um alerta médico.",
    },
    { t: "figure", kind: "brand", caption: "Mascote, paleta, tipografia e frases da marca Glútty." },
    {
      t: "ul",
      items: [
        "**Verde profundo** transmite segurança e confiança. É a cor dos botões principais e do selo “Muito seguro”.",
        "**Lima** traz leveza e energia, e marca as ações positivas.",
        "**Creme** deixa o fundo quente e acolhedor, longe do branco clínico de apps de saúde.",
        "**O mascote** aparece nos momentos de espera, boas-vindas e conquistas, para humanizar a experiência.",
        "**O símbolo do trigo** representa cuidado, segurança e consciência.",
      ],
    },
    {
      t: "decision",
      text: "Quem é celíaco já convive com medo e desconfiança. Uma marca fria e técnica reforçaria esse sentimento. O tom do Glútty é o de um amigo que entende do assunto: claro, acolhedor e sem alarmismo.",
    },
    { t: "sep" },
    { t: "h2", id: "teste", text: "Teste de usabilidade: apoiando decisões mais seguras" },
    {
      t: "p",
      text: "Para validar o protótipo, planejei um teste remoto no Maze, com a técnica think aloud: os participantes falam em voz alta o que pensam e sentem enquanto navegam. As tarefas acompanham a jornada, do primeiro acesso até o perfil.",
    },
    {
      t: "p",
      text: "O cenário é próximo do dia a dia: *você está viajando para São Paulo, não vai ter tempo de cozinhar hoje e um amigo recomenda o Glútty para achar um restaurante seguro.*",
    },
    { t: "figure", kind: "test", caption: "As sete etapas do teste e a pergunta de cada uma." },
    {
      t: "decision",
      text: "Mais do que medir se a pessoa conclui a tarefa, o teste pergunta se ela *se sentiu segura*. Em um app sobre confiança, a percepção de segurança é tão importante quanto a navegação.",
    },
    { t: "sep" },
    { t: "h2", id: "aprendizados", text: "Aprendizados e próximos passos" },
    {
      t: "ul",
      items: [
        "**Números mostram o tamanho, conversas mostram o peso.** O survey provou que o medo é quase unânime. As entrevistas mostraram o isolamento, a culpa dos pais e a emoção de ser bem atendido.",
        "**Confiança é o produto.** Mais do que listar restaurantes, o app precisa mostrar por que um lugar é seguro.",
        "**Dizer não também é design.** Deixar funcionalidades fora do MVP protegeu a confiança, que é o que o Glútty tem de mais valioso.",
        "**Próximos passos:** consolidar os aprendizados do teste, refinar as telas de restaurante e prato, e explorar um módulo para restaurantes com guias e treinamento de equipe.",
      ],
    },
    { t: "pull", text: "A solução que buscamos não é só tecnológica. **É humana.**" },
    {
      t: "p",
      text: `Obrigado por ler até aqui. Se você é celíaco, cuida de alguém que é, ou trabalha com restaurantes, adoraria ouvir sua opinião. O artigo completo também está no [Medium](${MEDIUM_URL}), e o protótipo está no ar para [navegar](${PROTOTYPE_URL}).`,
    },
  ],
  fig: {
    competitors: [
      { name: "App de referência sem glúten", sub: "Comunidade e geolocalização", strong: "comunidade ativa e ranking de avaliações.", weak: "só em inglês, design confuso, poucas fotos e recursos básicos no plano pago." },
      { name: "HappyCow", sub: "Restaurantes veganos no mundo todo", strong: "cobertura global, mapas e comunidade engajada.", weak: "o foco é vegano. Não diferencia dieta de doença celíaca." },
      { name: "Fig", sub: "Scanner de produtos e perfis alimentares", strong: "personalização profunda de dietas e alergias.", weak: "foca em produtos de mercado e existe em poucos países." },
      { name: "Restaurantes 100% sem glúten", sub: "Padarias e restaurantes em Zurique", strong: "protocolos rígidos e clientes que se emocionam ao comer sem medo.", weak: "a segurança quase não aparece no site e nas redes." },
    ],
    stats: [
      { value: pct(58), label: "já passaram mal depois de uma refeição vendida como “sem glúten”." },
      { value: pct(77), label: "já deixaram de sair por falta de opções confiáveis." },
      { value: pct(67), label: "se sentiram constrangidos ao explicar a própria restrição." },
      { value: pct(50), label: "confiam em poucos restaurantes que dizem ter opções sem glúten." },
    ],
    charts: [
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
    ],
    personas: [
      { name: "Luana", role: "A jovem urbana", mvp: true, bio: "25–35 anos, trabalha em cidade grande e tem vida social ativa.", needs: "Achar lugares seguros rápido, com filtros e prova social." },
      { name: "Guilherme", role: "Recém-diagnosticado do interior", mvp: true, bio: "20–40 anos, vive em cidade pequena e recebeu o diagnóstico há pouco.", needs: "Um passo a passo inicial, comunidade local e mercados próximos." },
      { name: "Vera", role: "Mãe cuidadora", mvp: false, bio: "35–50 anos, cuida de um filho celíaco em idade escolar.", needs: "Planejar festas, falar com a escola e achar buffets verificados." },
      { name: "Breno", role: "Viajante e empreendedor", mvp: false, bio: "30–55 anos, viaja a trabalho entre cidades e países.", needs: "Informação confiável por cidade e apoio em viagem." },
    ],
    journey: [
      { title: "Antes", does: "Pesquisa em grupos, Google e Instagram. Liga para o restaurante.", feels: "Ansiedade e cansaço de planejar tudo.", glutty: "Busca por região, filtros pelo padrão de segurança e avaliações de celíacos." },
      { title: "Durante", does: "Explica a restrição, pergunta sobre chapa, óleo e utensílios.", feels: "Constrangimento e medo de não ser levado a sério.", glutty: "Ingredientes declarados e cartão digital de segurança para mostrar no atendimento." },
      { title: "Depois", does: "Espera para ver se vai passar mal. Conta para outros celíacos.", feels: "Alívio e gratidão, ou frustração e sintomas.", glutty: "Avaliação focada em segurança e restaurantes favoritos." },
    ],
    mvp: {
      inTitle: "No MVP",
      laterTitle: "No roadmap",
      in: [
        "Busca de restaurantes pela localização ou por uma região escolhida",
        "Filtros por restrições alimentares, a partir do padrão de segurança",
        "Padrão de segurança do usuário, definido no onboarding e editável no perfil",
        "Feedbacks de usuários focados em segurança",
        "Pratos e ingredientes declarados pelo restaurante",
        "Cartão digital de segurança para usar no atendimento",
        "Favoritar restaurantes seguros",
      ],
      later: [
        "Reserva online e delivery",
        "Comunidade local",
        "Sugestões personalizadas por comportamento",
        "Selo de compromisso com a segurança",
        "Fotos dos pratos e vídeos educativos",
      ],
    },
    brand: {
      tagline: "Mais segurança em cada refeição.",
      slogans: ["“Segurança que acolhe. Cuidado que transforma.”", "“Contaminação cruzada não é tempero.”"],
      typeNote: "Nunito: arredondada, próxima e fácil de ler.",
      mascotAlt: "Mascote do Glútty comemorando",
      colors: [
        { name: "Verde Glútty", hex: "#1F3D34" },
        { name: "Lima", hex: "#C6F59D" },
        { name: "Creme", hex: "#F5F2DF" },
        { name: "Laranja", hex: "#FC6904" },
      ],
    },
    test: [
      { title: "Primeiro contato", q: "Você sentiu vontade de continuar explorando o aplicativo? Por quê?" },
      { title: "Encontrar restaurante", q: "Quais informações mais ajudaram você a confiar, ou desconfiar, do restaurante?" },
      { title: "Analisar prato", q: "As informações sobre ingredientes, adaptações e segurança pareceram claras?" },
      { title: "Comunidade", q: "As experiências de outros usuários ajudaram você a decidir com mais confiança?" },
      { title: "Avaliar restaurante", q: "Como você se sentiu ao compartilhar sua experiência para ajudar outras pessoas?" },
      { title: "Perfil", q: "Você sentiu que tinha controle e clareza sobre suas preferências alimentares?" },
      { title: "Encerramento", q: "Em que momento você se sentiu mais seguro, acolhido ou compreendido?" },
    ],
  },
  tags: ["UX Design", "UX Research", "Estudo de Caso", "Doença Celíaca", "UI Design"],
};

/* ───────────────────────── English ───────────────────────── */

const en: Content = {
  htmlLang: "en",
  langName: "English",
  ui: {
    openPrototype: "Open prototype",
    readOnMedium: "Read on Medium",
    follow: "Follow",
    minRead: (n) => `${n} min read`,
    date: "May 21",
    coverTitle: ["More safety and confidence for people with celiac disease", "when", "eating out"],
    kind: "UX/UI case study",
    decision: "Why this decision",
    prototypeHint: "Clickable prototype. Tap and explore.",
    ofPeople: `% of ${N} people`,
    step: "Step",
    strong: "Strength",
    weak: "Weakness",
    mvpTag: "MVP focus",
    laterTag: "Later phases",
    needs: "Needs",
    does: "Does",
    feels: "Feels",
    inGlutty: "Glútty",
    topics: "Topics",
    writtenBy: `Written by ${AUTHOR}`,
    authorBio: "Advertising professional moving into UX Design. Research, strategy, interface and writing, end to end.",
    footnote:
      "Interview participants’ names have been omitted. Quotes were translated from Portuguese. The screens on this page load live from the Glútty prototype, which is in Portuguese.",
    clap: "Clap on Medium",
    comment: "Respond on Medium",
    save: "Save on Medium",
    share: "Open the original article on Medium",
    language: "Language",
    screenAlt: (l) => `Glútty ${l} screen`,
  },
  title: "Glútty: More safety and confidence for people with celiac disease when eating out",
  subtitle:
    "A digital solution designed to support safer food choices through transparency, shared experiences and less food insecurity.",
  blocks: [
    { t: "figure", kind: "cover", caption: "" },
    { t: "h2", id: "introducao", text: "Introduction" },
    {
      t: "p",
      text: `Celiac disease is an autoimmune condition triggered by eating gluten — a protein found in wheat, barley, rye and their derivatives — that can inflame the small intestine and impair the body’s absorption of essential nutrients. [Mayo Clinic — Celiac Disease Overview](${MAYO_URL})`,
    },
    {
      t: "p",
      text: `International studies indicate that celiac disease affects about 1% of the world’s population, with diagnoses rising steadily over recent decades. Systematic reviews show that its prevalence has increased significantly in recent years, both in European countries and in other regions of the world. [Celiac Disease Foundation — Global Prevalence Study](${CDF_URL})`,
    },
    {
      t: "p",
      text: "Glútty is an app that connects people with celiac disease to safer restaurants, focused on cross-contamination, clear information and the experience of people who live the same routine. I built it end to end to apply what I learned in the UX Unicórnio course.",
    },
    { t: "figure", kind: "hero", caption: "The Glútty prototype, loaded live. You can navigate it right here." },
    { t: "h3", text: "About the project" },
    {
      t: "ul",
      items: [
        "**My roles:** UX Research, UX Strategy, UX Design and UX Writing.",
        "**Tools:** Figma, Google Docs, Maze, Tactiq, ChatGPT, Claude Code and Vercel.",
        "**Process:** discover (desk research, CSD matrix and UX research), define (personas and journey map), develop (wireflow, wireframes and UI) and validate (usability testing).",
      ],
    },
    { t: "sep" },
    { t: "h2", id: "problema", text: "The problem: eating out shouldn’t be a risk" },
    {
      t: "p",
      text: "The only treatment is a lifelong gluten-free diet, and it demands attention at every meal.",
    },
    {
      t: "p",
      text: "The biggest danger outside the home is **cross-contamination**. A crumb on the griddle, oil shared with the fryer or a shared knife is enough to trigger a reaction. Because gluten is a protein, heat doesn’t remove it. The only way out is to avoid contact.",
    },
    {
      t: "p",
      text: "And labels don’t always protect. A study cited by the Celiac Disease Foundation found detectable gluten in **32% of dishes sold as “gluten-free”** in restaurants. With no formal oversight, people with celiac disease end up relying on questions to the waiter, WhatsApp groups and Instagram posts.",
    },
    { t: "pull", text: "For people with celiac disease, **eating out is an act of planning**, not spontaneity." },
    { t: "sep" },
    { t: "h2", id: "descobrir", text: "Discover: understand before designing" },
    {
      t: "p",
      text: "I started with a research plan. The goal was to understand how people with celiac disease experience eating out, what makes them trust a place and what social and emotional impact the disease has on their routine.",
    },
    { t: "h3", text: "Desk research and CSD matrix" },
    {
      t: "p",
      text: "I gathered scientific articles, content from celiac associations and studies on quality of life. They show that restaurants and travel are sources of anxiety, because safe meals are scarce and staff know little about gluten.",
    },
    {
      t: "p",
      text: "I organized what I knew, what I assumed and what I still needed to find out in a CSD matrix (certainties, suppositions and doubts). The doubts became the questions for the survey and the interview scripts.",
    },
    { t: "h3", text: "Competitor analysis" },
    {
      t: "p",
      text: "I analyzed dietary-restriction apps as well as 100% gluten-free venues and supermarkets in Switzerland. The apps solve part of the problem. None of them puts safety against cross-contamination at the center.",
    },
    { t: "figure", kind: "competitors", caption: "Summary of the analysis of digital competitors and venues." },
    {
      t: "decision",
      text: "The competitors revealed a clear gap. There is information about where to eat gluten-free, but nobody explains *why* a place is safe. That became Glútty’s value proposition: make safety visible.",
    },
    { t: "h3", text: "Quantitative research: 86 responses in 3 languages" },
    {
      t: "p",
      text: `I ran a survey in Portuguese, German and English, shared in groups and communities of people with celiac disease. There were ${N} valid responses, mostly from Brazil (43) and Switzerland (38). Most respondents have followed the diet for more than three years, so the answers come from people who know the problem deeply.`,
    },
    { t: "figure", kind: "stats", caption: `Key figures from the quantitative research, with ${N} responses.` },
    { t: "figure", kind: "charts", caption: "Fears, sources of trust and expectations. Multiple-choice questions add up to more than 100%." },
    {
      t: "p",
      text: `Two numbers guided the rest of the project. **The number one fear is unprepared staff**, cited by ${pct(77)}% of people, just ahead of cross-contamination. And **the number one source of trust is other people with celiac disease**: ${pct(76)}% look for recommendations in the community, and ${pct(77)}% say reviews from other celiacs build trust.`,
    },
    {
      t: "decision",
      text: "If people already trust each other, the app doesn’t need to invent an authority. It needs to organize the community’s experience and surface the signals that build the most trust: trained staff, a separate kitchen and clear ingredients.",
    },
    { t: "h3", text: "Qualitative research: 8 in-depth conversations" },
    {
      t: "p",
      text: "The numbers showed the size of the problem. The interviews showed how it feels. I spoke with eight people: people with celiac disease from big cities and small towns, a mother of a child with celiac disease and the owner of a 100% gluten-free restaurant. Six pain points came up in almost every conversation:",
    },
    {
      t: "ul",
      items: [
        "**Fear of contamination.** One crumb is enough for days or weeks of symptoms.",
        "**Loss of spontaneity.** Eating out requires research, phone calls and planning.",
        "**Unreliable information.** Apps, menus and staff give vague answers.",
        "**Cost and access.** Gluten-free food is more expensive and almost disappears outside big cities.",
        "**Lack of training and empathy.** Staff who downplay the disease or confuse it with a fad diet.",
        "**Social isolation.** Turned-down invitations and the feeling of being “the different one” at the table.",
      ],
    },
    { t: "quote", text: "“When the server can’t answer, I already know it’s not the right place.”", cite: "Participant, São Paulo (translated)" },
    { t: "quote", text: "“Our iFood is our fellow celiacs. We ask the group, not the app.”", cite: "Participant, São Paulo (translated)" },
    { t: "quote", text: "“Eating out is an act of courage. But when there is empathy, it becomes an act of love.”", cite: "Participant, Rio Grande do Sul (translated)" },
    { t: "sep" },
    { t: "h2", id: "definir", text: "Define: for whom and for what" },
    { t: "h3", text: "Personas" },
    { t: "p", text: "I turned the interview profiles into four proto-personas. For the MVP, I prioritized Luana and Guilherme." },
    { t: "figure", kind: "personas", caption: "Proto-personas built from the interviews." },
    {
      t: "decision",
      text: "Luana represents the largest group of users, in big cities. Guilherme represents the greatest vulnerability: someone who was just diagnosed and lives far from the big cities. Together they cover the people who would use the app most and the people who would need it most.",
    },
    { t: "h3", text: "Journey map" },
    {
      t: "p",
      text: "I mapped the journey from the moment a person decides to go out until after the meal. It became clear that Glútty needs to be a **continuous support system**, present before, during and after eating out.",
    },
    { t: "figure", kind: "journey", caption: "Summary of the journey map of a person with celiac disease eating out." },
    { t: "h3", text: "MVP and prioritization" },
    {
      t: "p",
      text: "To choose the features, I used an impact × effort matrix. The MVP was designed for **critical safety**: it includes what helps people judge how reliable a place is and reduces uncertainty when deciding.",
    },
    { t: "figure", kind: "mvp", caption: "MVP features and what was left for future versions." },
    {
      t: "decision",
      text: "Booking, delivery, community and a Glútty seal are valuable, but they require integrations, moderation and governance. Launching them without curation could lead to wrong conclusions about safety, which is exactly what Glútty wants to avoid. That’s why they were left for later.",
    },
    { t: "sep" },
    { t: "h2", id: "ui", text: "UI Design: translating strategy into interface" },
    {
      t: "p",
      text: "With the scope defined, I went through low-fidelity wireflows and mid-fidelity wireframes before the final interface. Each screen below responds to a research insight. All of them load live from the prototype, which is in Portuguese.",
    },
    { t: "h3", text: "1. First contact: users say what is safe for them" },
    {
      t: "p",
      text: "Onboarding picks the language, presents the proposal and asks what is safe for the person. That answer becomes the **safety standard**, which filters everything the app shows afterwards.",
    },
    {
      t: "screens",
      items: [
        { path: "/idioma", label: "Language" },
        { path: "/welcome", label: "Welcome" },
        { path: "/onboarding", label: "Safety standard" },
      ],
      caption: "Onboarding in Portuguese, English and German, designed for users in Brazil and Switzerland.",
    },
    {
      t: "decision",
      text: `The research showed that explaining the restriction is embarrassing for ${pct(67)}% of people. With the profile set up once, the app “speaks” for the user, so they don’t have to justify themselves on every search.`,
    },
    { t: "h3", text: "2. Finding a restaurant" },
    {
      t: "p",
      text: "The home screen opens with the location and the safety standard in view. The lists prioritize very safe places nearby and the ones best rated by people with celiac disease.",
    },
    {
      t: "screens",
      items: [
        { path: "/home", label: "Home" },
        { path: "/busca", label: "Search" },
        { path: "/categoria/mais-seguros", label: "Category" },
      ],
      caption: "Home, search and categories such as “Safest” and “Gluten-free party”.",
    },
    {
      t: "decision",
      text: `A list of safe restaurants (${pct(81)}%) and geolocation (${pct(69)}%) were two of the most requested features. That’s why the first screen already answers “where can I eat safely near me?”.`,
    },
    { t: "h3", text: "3. Reviewing the restaurant and the dish" },
    {
      t: "p",
      text: "The restaurant page shows its cross-contamination procedures, the restrictions it caters for and its reviews. On the dish page, each ingredient shows its status against the user’s profile.",
    },
    {
      t: "screens",
      items: [
        { path: "/restaurante/1", label: "Restaurant" },
        { path: "/restaurante/1/prato/d1", label: "Dish" },
      ],
      caption: "The restaurant page and the dish detail, with declared ingredients.",
    },
    {
      t: "decision",
      text: `Hidden ingredients worry ${pct(58)}% of people. Showing declared ingredients doesn’t replace talking to the restaurant, but it helps users know what to ask before ordering.`,
    },
    { t: "h3", text: "4. Community and reviews: safety before stars" },
    {
      t: "p",
      text: "Reviews don’t start with stars. The first question is **“Did you feel safe?”**. Then come tags such as “Trained staff”, “Separate kitchen” and “Clear ingredients”, and only then the comment.",
    },
    {
      t: "screens",
      items: [
        { path: "/comunidade", label: "Community" },
        { path: "/restaurante/1/avaliar", label: "Review" },
      ],
      caption: "The community gathers reports from people with the same restrictions. Reviews start with safety.",
    },
    {
      t: "decision",
      text: "Glútty is not a regular restaurant review app. The focus is neither taste nor price. The review tags are exactly the signals the research identified as trust builders, so every report becomes useful information for the next person with celiac disease.",
    },
    { t: "h3", text: "5. Profile: the brain of personalization" },
    {
      t: "p",
      text: "The profile holds the diagnosis, restrictions, forbidden ingredients and safety standard. This data changes the search, the recommendations and the risk alerts.",
    },
    {
      t: "screens",
      items: [
        { path: "/perfil", label: "My profile" },
        { path: "/perfil/restricoes", label: "Restrictions" },
        { path: "/perfil/seguranca", label: "Safety standard" },
      ],
      caption: "Editable dietary profile, restrictions and safety standard.",
    },
    { t: "h3", text: "Safety badges" },
    {
      t: "p",
      text: "Restaurants and dishes use the same badges on every screen. Each one combines color, icon and text, so the information never depends on color alone.",
    },
    { t: "figure", kind: "badges", caption: "The badge scale, from safest to “take care”. Badges are shown in Portuguese, as in the app." },
    {
      t: "decision",
      text: "A colored tag reduces reading effort: people grasp the safety level at a glance, without reading the whole menu. And the text on the badge makes sure the information also reaches people who can’t tell colors apart.",
    },
    { t: "h3", text: "UX Writing: inform without scaring" },
    {
      t: "p",
      text: "The app’s goal is to reduce fear, not increase it. While reviewing the screens, I questioned labels such as *“Contamination risk: low”*. The information has to be there, but in a clear and welcoming tone, without sounding alarming.",
    },
    { t: "sep" },
    { t: "h2", id: "branding", text: "Branding: building emotional connections between the name and the app’s purpose" },
    {
      t: "p",
      text: "The name Glútty starts from the word at the center of every celiac person’s life, gluten (“glúten” in Portuguese), but with a light, friendly tone. The idea is for the brand to welcome people instead of sounding like a medical warning.",
    },
    { t: "figure", kind: "brand", caption: "Glútty’s mascot, palette, typography and brand lines." },
    {
      t: "ul",
      items: [
        "**Deep green** conveys safety and trust. It is the color of the main buttons and the “Very safe” badge.",
        "**Lime** brings lightness and energy, and marks positive actions.",
        "**Cream** keeps the background warm and welcoming, far from the clinical white of health apps.",
        "**The mascot** appears in moments of waiting, welcome and achievement, to humanize the experience.",
        "**The wheat symbol** stands for care, safety and awareness.",
      ],
    },
    {
      t: "decision",
      text: "People with celiac disease already live with fear and distrust. A cold, technical brand would reinforce that feeling. Glútty’s tone is that of a friend who knows the subject: clear, welcoming and never alarmist.",
    },
    { t: "sep" },
    { t: "h2", id: "teste", text: "Usability testing: supporting safer decisions" },
    {
      t: "p",
      text: "To validate the prototype, I planned a remote test on Maze using the think-aloud technique: participants say out loud what they think and feel while navigating. The tasks follow the journey, from first launch to the profile.",
    },
    {
      t: "p",
      text: "The scenario is close to everyday life: *you’re traveling to São Paulo, you won’t have time to cook today and a friend recommends Glútty to find a safe restaurant.*",
    },
    { t: "figure", kind: "test", caption: "The seven steps of the test and the question for each one." },
    {
      t: "decision",
      text: "Beyond measuring whether people complete the task, the test asks whether they *felt safe*. In an app about trust, the perception of safety matters as much as navigation.",
    },
    { t: "sep" },
    { t: "h2", id: "aprendizados", text: "Learnings and next steps" },
    {
      t: "ul",
      items: [
        "**Numbers show the size, conversations show the weight.** The survey proved the fear is nearly unanimous. The interviews revealed the isolation, the parents’ guilt and the emotion of being treated well.",
        "**Trust is the product.** More than listing restaurants, the app must show why a place is safe.",
        "**Saying no is also design.** Leaving features out of the MVP protected trust, which is Glútty’s most valuable asset.",
        "**Next steps:** consolidate the learnings from the test, refine the restaurant and dish screens, and explore a module for restaurants with guides and staff training.",
      ],
    },
    { t: "pull", text: "The solution we’re looking for isn’t just technological. **It’s human.**" },
    {
      t: "p",
      text: `Thanks for reading this far. If you have celiac disease, care for someone who does, or work in restaurants, I’d love to hear your thoughts. The full article is also on [Medium](${MEDIUM_URL}), and the prototype is live for you to [explore](${PROTOTYPE_URL}).`,
    },
  ],
  fig: {
    competitors: [
      { name: "Leading gluten-free app", sub: "Community and geolocation", strong: "active community and review ranking.", weak: "English only, confusing design, few photos and basic features behind a paywall." },
      { name: "HappyCow", sub: "Vegan restaurants worldwide", strong: "global coverage, maps and an engaged community.", weak: "vegan focus. It doesn’t tell a diet apart from celiac disease." },
      { name: "Fig", sub: "Product scanner and dietary profiles", strong: "deep personalization of diets and allergies.", weak: "focused on grocery products and available in few countries." },
      { name: "100% gluten-free venues", sub: "Bakeries and restaurants in Zurich", strong: "strict protocols and customers moved to eat without fear.", weak: "safety barely shows on their websites and social media." },
    ],
    stats: [
      { value: pct(58), label: "got sick after a meal sold as “gluten-free”." },
      { value: pct(77), label: "have skipped going out for lack of trustworthy options." },
      { value: pct(67), label: "felt embarrassed explaining their own restriction." },
      { value: pct(50), label: "trust only a few restaurants that claim to offer gluten-free options." },
    ],
    charts: [
      {
        title: "Biggest fears when eating out",
        sub: "Up to 3 choices per person",
        bars: [
          { label: "Unprepared staff", n: 77 },
          { label: "Cross-contamination", n: 72 },
          { label: "Hidden ingredients", n: 58 },
          { label: "Unclear menu information", n: 44 },
          { label: "Severe physical reactions", n: 28 },
        ],
      },
      {
        title: "What builds trust in a restaurant",
        sub: "Multiple choice",
        bars: [
          { label: "Reviews from other celiacs", n: 77 },
          { label: "Trained staff", n: 72 },
          { label: "Gluten-free certification", n: 69 },
          { label: "Separate kitchen", n: 62 },
          { label: "Detailed menu with ingredients", n: 59 },
        ],
      },
      {
        title: "Where they look for safe places today",
        sub: "Multiple choice",
        bars: [
          { label: "Recommendations from other celiacs", n: 76 },
          { label: "Google", n: 58 },
          { label: "Instagram", n: 50 },
          { label: "Specialized apps", n: 38 },
        ],
      },
      {
        title: "What they expect from a platform",
        sub: "Multiple choice",
        bars: [
          { label: "List of safe restaurants", n: 81 },
          { label: "Reviews from other celiacs", n: 75 },
          { label: "Geolocation of nearby places", n: 69 },
          { label: "Cross-contamination information", n: 50 },
          { label: "Certified products in the region", n: 33 },
          { label: "Filters by type of intolerance", n: 30 },
        ],
      },
    ],
    personas: [
      { name: "Luana", role: "The young urbanite", mvp: true, bio: "25–35 years old, works in a big city and has an active social life.", needs: "Find safe places fast, with filters and social proof." },
      { name: "Guilherme", role: "Newly diagnosed, small town", mvp: true, bio: "20–40 years old, lives in a small town and was recently diagnosed.", needs: "A step-by-step start, a local community and nearby stores." },
      { name: "Vera", role: "Caregiving mother", mvp: false, bio: "35–50 years old, cares for a school-age child with celiac disease.", needs: "Plan parties, talk to the school and find verified caterers." },
      { name: "Breno", role: "Traveler and entrepreneur", mvp: false, bio: "30–55 years old, travels for work between cities and countries.", needs: "Reliable information per city and support while traveling." },
    ],
    journey: [
      { title: "Before", does: "Searches groups, Google and Instagram. Calls the restaurant.", feels: "Anxiety and the fatigue of planning everything.", glutty: "Search by area, filters based on the safety standard and reviews from celiacs." },
      { title: "During", does: "Explains the restriction, asks about the griddle, oil and utensils.", feels: "Embarrassment and fear of not being taken seriously.", glutty: "Declared ingredients and a digital safety card to show the staff." },
      { title: "After", does: "Waits to see whether they get sick. Tells other celiacs.", feels: "Relief and gratitude, or frustration and symptoms.", glutty: "Safety-focused reviews and favorite restaurants." },
    ],
    mvp: {
      inTitle: "In the MVP",
      laterTitle: "On the roadmap",
      in: [
        "Restaurant search by location or by a chosen area",
        "Filters by dietary restrictions, based on the safety standard",
        "User safety standard, set during onboarding and editable in the profile",
        "Safety-focused user feedback",
        "Dishes and ingredients declared by the restaurant",
        "Digital safety card to use when ordering",
        "Save safe restaurants as favorites",
      ],
      later: [
        "Online booking and delivery",
        "Local community",
        "Behavior-based personalized suggestions",
        "Safety commitment seal",
        "Dish photos and educational videos",
      ],
    },
    brand: {
      tagline: "More safety in every meal.",
      slogans: ["“Safety that welcomes. Care that transforms.”", "“Cross-contamination is not a seasoning.”"],
      typeNote: "Nunito: rounded, friendly and easy to read.",
      mascotAlt: "Glútty mascot celebrating",
      colors: [
        { name: "Glútty green", hex: "#1F3D34" },
        { name: "Lime", hex: "#C6F59D" },
        { name: "Cream", hex: "#F5F2DF" },
        { name: "Orange", hex: "#FC6904" },
      ],
    },
    test: [
      { title: "First contact", q: "Did you feel like continuing to explore the app? Why?" },
      { title: "Find a restaurant", q: "Which information helped you most to trust, or distrust, the restaurant?" },
      { title: "Review a dish", q: "Was the information on ingredients, adaptations and safety clear?" },
      { title: "Community", q: "Did other users’ experiences help you decide with more confidence?" },
      { title: "Review a restaurant", q: "How did you feel sharing your experience to help other people?" },
      { title: "Profile", q: "Did you feel in control of, and clear about, your dietary preferences?" },
      { title: "Wrap-up", q: "At what moment did you feel safest, most welcome or most understood?" },
    ],
  },
  tags: ["UX Design", "UX Research", "Case Study", "Celiac Disease", "UI Design"],
};

/* ───────────────────────── Deutsch ───────────────────────── */

const de: Content = {
  htmlLang: "de",
  langName: "Deutsch",
  ui: {
    openPrototype: "Prototyp öffnen",
    readOnMedium: "Auf Medium lesen",
    follow: "Folgen",
    minRead: (n) => `${n} Min. Lesezeit`,
    date: "21. Mai",
    coverTitle: ["Mehr Sicherheit und Vertrauen für Menschen mit Zöliakie", "beim", "Essen auswärts"],
    kind: "UX/UI-Fallstudie",
    decision: "Warum diese Entscheidung",
    prototypeHint: "Klickbarer Prototyp. Einfach antippen und erkunden.",
    ofPeople: `% der ${N} Personen`,
    step: "Schritt",
    strong: "Stärke",
    weak: "Schwäche",
    mvpTag: "MVP-Fokus",
    laterTag: "Spätere Phasen",
    needs: "Braucht",
    does: "Tut",
    feels: "Fühlt",
    inGlutty: "Glútty",
    topics: "Themen",
    writtenBy: `Geschrieben von ${AUTHOR}`,
    authorBio: "Werbefachmann auf dem Weg ins UX Design. Research, Strategie, Interface und Texte, von Anfang bis Ende.",
    footnote:
      "Die Namen der Interviewten wurden weggelassen. Zitate wurden aus dem Portugiesischen übersetzt. Die Screens auf dieser Seite werden live aus dem Glútty-Prototyp geladen, der auf Portugiesisch ist.",
    clap: "Auf Medium applaudieren",
    comment: "Auf Medium kommentieren",
    save: "Auf Medium speichern",
    share: "Originalartikel auf Medium öffnen",
    language: "Sprache",
    screenAlt: (l) => `Glútty-Screen ${l}`,
  },
  title: "Glútty: Mehr Sicherheit und Vertrauen für Menschen mit Zöliakie beim Essen auswärts",
  subtitle:
    "Eine digitale Lösung, die sicherere Essensentscheidungen unterstützt – durch Transparenz, geteilte Erfahrungen und weniger Unsicherheit beim Essen.",
  blocks: [
    { t: "figure", kind: "cover", caption: "" },
    { t: "h2", id: "introducao", text: "Einleitung" },
    {
      t: "p",
      text: `Zöliakie ist eine Autoimmunerkrankung, die durch die Aufnahme von Gluten ausgelöst wird – einem Protein in Weizen, Gerste, Roggen und daraus hergestellten Produkten. Sie kann Entzündungen im Dünndarm verursachen und die Aufnahme lebenswichtiger Nährstoffe beeinträchtigen. [Mayo Clinic — Celiac Disease Overview](${MAYO_URL})`,
    },
    {
      t: "p",
      text: `Internationale Studien zeigen, dass rund 1 % der Weltbevölkerung von Zöliakie betroffen ist, mit stetig steigenden Diagnosen in den letzten Jahrzehnten. Systematische Übersichtsarbeiten belegen, dass die Prävalenz in den letzten Jahren deutlich zugenommen hat, sowohl in europäischen Ländern als auch in anderen Regionen der Welt. [Celiac Disease Foundation — Global Prevalence Study](${CDF_URL})`,
    },
    {
      t: "p",
      text: "Glútty ist eine App, die Menschen mit Zöliakie mit sichereren Restaurants verbindet, mit Fokus auf Kreuzkontamination, klaren Informationen und den Erfahrungen von Menschen mit demselben Alltag. Ich habe das Projekt von Anfang bis Ende umgesetzt, um das Gelernte aus dem Kurs UX Unicórnio anzuwenden.",
    },
    { t: "figure", kind: "hero", caption: "Der Glútty-Prototyp, live geladen. Du kannst ihn direkt hier bedienen." },
    { t: "h3", text: "Über das Projekt" },
    {
      t: "ul",
      items: [
        "**Meine Rollen:** UX Research, UX Strategy, UX Design und UX Writing.",
        "**Tools:** Figma, Google Docs, Maze, Tactiq, ChatGPT, Claude Code und Vercel.",
        "**Prozess:** entdecken (Desk Research, CSD-Matrix und UX Research), definieren (Personas und Journey Map), entwickeln (Wireflow, Wireframes und UI) und validieren (Usability-Test).",
      ],
    },
    { t: "sep" },
    { t: "h2", id: "problema", text: "Das Problem: Auswärts essen sollte kein Risiko sein" },
    {
      t: "p",
      text: "Die einzige Behandlung ist eine lebenslange glutenfreie Ernährung, und sie verlangt bei jeder Mahlzeit Aufmerksamkeit.",
    },
    {
      t: "p",
      text: "Die größte Gefahr außer Haus ist die **Kreuzkontamination**. Ein Krümel auf der Grillplatte, dasselbe Frittieröl oder ein gemeinsam genutztes Messer reichen für eine Reaktion. Da Gluten ein Protein ist, wird es durch Hitze nicht zerstört. Der einzige Ausweg ist, Kontakt zu vermeiden.",
    },
    {
      t: "p",
      text: "Und die Kennzeichnung schützt nicht immer. Eine von der Celiac Disease Foundation zitierte Studie fand nachweisbares Gluten in **32 % der als „glutenfrei“ verkauften Gerichte** in Restaurants. Ohne formelle Kontrolle sind Betroffene auf Fragen an das Servicepersonal, WhatsApp-Gruppen und Instagram-Posts angewiesen.",
    },
    { t: "pull", text: "Für Menschen mit Zöliakie ist **auswärts essen eine Frage der Planung**, nicht der Spontaneität." },
    { t: "sep" },
    { t: "h2", id: "descobrir", text: "Entdecken: verstehen, bevor man gestaltet" },
    {
      t: "p",
      text: "Ich begann mit einem Research-Plan. Ziel war zu verstehen, wie Menschen mit Zöliakie das Essen außer Haus erleben, was ihnen Vertrauen in einen Ort gibt und welche sozialen und emotionalen Folgen die Krankheit für ihren Alltag hat.",
    },
    { t: "h3", text: "Desk Research und CSD-Matrix" },
    {
      t: "p",
      text: "Ich sammelte wissenschaftliche Artikel, Inhalte von Zöliakie-Verbänden und Studien zur Lebensqualität. Sie zeigen, dass Restaurants und Reisen Angst auslösen, weil es wenige sichere Mahlzeiten gibt und das Personal wenig über Gluten weiß.",
    },
    {
      t: "p",
      text: "Was ich wusste, was ich vermutete und was ich noch herausfinden musste, ordnete ich in einer CSD-Matrix (Gewissheiten, Annahmen und Zweifel). Aus den Zweifeln wurden die Fragen für die Umfrage und die Interview-Leitfäden.",
    },
    { t: "h3", text: "Wettbewerbsanalyse" },
    {
      t: "p",
      text: "Ich analysierte Apps für Ernährungseinschränkungen sowie 100 % glutenfreie Betriebe und Supermärkte in der Schweiz. Die Apps lösen einen Teil des Problems. Keine stellt den Schutz vor Kreuzkontamination in den Mittelpunkt.",
    },
    { t: "figure", kind: "competitors", caption: "Zusammenfassung der Analyse von digitalen Wettbewerbern und Betrieben." },
    {
      t: "decision",
      text: "Die Wettbewerber zeigten eine klare Lücke. Es gibt Informationen darüber, wo man glutenfrei essen kann, aber niemand erklärt, *warum* ein Ort sicher ist. Daraus wurde das Nutzenversprechen von Glútty: Sicherheit sichtbar machen.",
    },
    { t: "h3", text: "Quantitative Forschung: 86 Antworten in 3 Sprachen" },
    {
      t: "p",
      text: `Ich führte eine Umfrage auf Portugiesisch, Deutsch und Englisch durch, verbreitet in Gruppen und Communitys von Menschen mit Zöliakie. Es gab ${N} gültige Antworten, die meisten aus Brasilien (43) und der Schweiz (38). Die meisten ernähren sich seit über drei Jahren glutenfrei, die Antworten kommen also von Menschen, die das Problem genau kennen.`,
    },
    { t: "figure", kind: "stats", caption: `Die wichtigsten Zahlen der quantitativen Umfrage mit ${N} Antworten.` },
    { t: "figure", kind: "charts", caption: "Ängste, Vertrauensquellen und Erwartungen. Bei Mehrfachauswahl ergibt die Summe über 100 %." },
    {
      t: "p",
      text: `Zwei Zahlen prägten den Rest des Projekts. **Die größte Angst ist unvorbereitetes Personal**, genannt von ${pct(77)} % der Befragten, knapp vor der Kreuzkontamination. Und **die wichtigste Vertrauensquelle sind andere Betroffene**: ${pct(76)} % suchen Empfehlungen in der Community, und ${pct(77)} % sagen, dass Bewertungen anderer Betroffener Vertrauen schaffen.`,
    },
    {
      t: "decision",
      text: "Wenn Menschen einander bereits vertrauen, muss die App keine Autorität erfinden. Sie muss die Erfahrungen der Community ordnen und die Signale zeigen, die am meisten Vertrauen schaffen: geschultes Personal, getrennte Küche und klare Zutaten.",
    },
    { t: "h3", text: "Qualitative Forschung: 8 Tiefeninterviews" },
    {
      t: "p",
      text: "Die Zahlen zeigten, wie groß das Problem ist. Die Interviews zeigten, wie es sich anfühlt. Ich sprach mit acht Personen: Betroffenen aus Großstädten und kleinen Orten, einer Mutter eines Kindes mit Zöliakie und dem Inhaber eines 100 % glutenfreien Restaurants. Sechs Schmerzpunkte tauchten in fast jedem Gespräch auf:",
    },
    {
      t: "ul",
      items: [
        "**Angst vor Kontamination.** Ein Krümel reicht für Tage oder Wochen mit Symptomen.",
        "**Verlust an Spontaneität.** Auswärts essen erfordert Recherche, Anrufe und Planung.",
        "**Unzuverlässige Informationen.** Apps, Speisekarten und Personal geben vage Auskünfte.",
        "**Kosten und Zugang.** Glutenfreies Essen ist teurer und außerhalb der Großstädte kaum zu finden.",
        "**Fehlende Schulung und Empathie.** Personal, das die Krankheit verharmlost oder mit einer Modediät verwechselt.",
        "**Soziale Isolation.** Abgesagte Einladungen und das Gefühl, am Tisch „die Andere“ oder „der Andere“ zu sein.",
      ],
    },
    { t: "quote", text: "„Wenn die Bedienung keine Antwort weiß, weiß ich schon, dass es nicht der richtige Ort ist.“", cite: "Teilnehmende Person, São Paulo (übersetzt)" },
    { t: "quote", text: "„Unser iFood sind die anderen Betroffenen. Wir fragen in der Gruppe, nicht in der App.“", cite: "Teilnehmende Person, São Paulo (übersetzt)" },
    { t: "quote", text: "„Auswärts essen ist ein Akt des Mutes. Aber wenn Empathie da ist, wird es ein Akt der Liebe.“", cite: "Teilnehmende Person, Rio Grande do Sul (übersetzt)" },
    { t: "sep" },
    { t: "h2", id: "definir", text: "Definieren: für wen und wofür" },
    { t: "h3", text: "Personas" },
    { t: "p", text: "Aus den Interviewprofilen entstanden vier Proto-Personas. Für das MVP habe ich Luana und Guilherme priorisiert." },
    { t: "figure", kind: "personas", caption: "Proto-Personas auf Basis der Interviews." },
    {
      t: "decision",
      text: "Luana steht für die größte Nutzergruppe in den Großstädten. Guilherme steht für die größte Verletzlichkeit: jemand, der gerade die Diagnose erhalten hat und weit weg von den Großstädten lebt. Zusammen decken sie ab, wer die App am meisten nutzen und wer sie am dringendsten brauchen würde.",
    },
    { t: "h3", text: "Journey Map" },
    {
      t: "p",
      text: "Ich habe die Journey vom Entschluss, auswärts zu essen, bis nach der Mahlzeit kartiert. Dabei wurde klar, dass Glútty ein **kontinuierliches Unterstützungssystem** sein muss, vor, während und nach dem Essen.",
    },
    { t: "figure", kind: "journey", caption: "Zusammenfassung der Journey Map von Menschen mit Zöliakie beim Essen auswärts." },
    { t: "h3", text: "MVP und Priorisierung" },
    {
      t: "p",
      text: "Für die Auswahl der Funktionen nutzte ich eine Impact-Effort-Matrix. Das MVP ist auf **kritische Sicherheit** ausgelegt: Aufgenommen wurde, was hilft, die Verlässlichkeit eines Ortes einzuschätzen, und die Unsicherheit bei der Entscheidung verringert.",
    },
    { t: "figure", kind: "mvp", caption: "Funktionen des MVP und was für spätere Versionen bleibt." },
    {
      t: "decision",
      text: "Reservierung, Lieferung, Community und ein eigenes Siegel sind wertvoll, erfordern aber Integrationen, Moderation und klare Regeln. Ohne Kuratierung könnten sie zu falschen Schlüssen über Sicherheit führen, und genau das will Glútty vermeiden. Deshalb kommen sie später.",
    },
    { t: "sep" },
    { t: "h2", id: "ui", text: "UI Design: Strategie in Interface übersetzen" },
    {
      t: "p",
      text: "Nachdem der Umfang feststand, arbeitete ich mit Low-Fidelity-Wireflows und Mid-Fidelity-Wireframes, bevor das finale Interface entstand. Jeder Screen unten beantwortet eine Erkenntnis aus der Forschung. Alle werden live aus dem Prototyp geladen, der auf Portugiesisch ist.",
    },
    { t: "h3", text: "1. Erster Kontakt: Nutzer sagen, was für sie sicher ist" },
    {
      t: "p",
      text: "Das Onboarding wählt die Sprache, stellt das Angebot vor und fragt, was für die Person sicher ist. Diese Antwort wird zum **Sicherheitsstandard**, der alles filtert, was die App danach zeigt.",
    },
    {
      t: "screens",
      items: [
        { path: "/idioma", label: "Sprache" },
        { path: "/welcome", label: "Willkommen" },
        { path: "/onboarding", label: "Sicherheitsstandard" },
      ],
      caption: "Onboarding auf Portugiesisch, Englisch und Deutsch, für Nutzer in Brasilien und der Schweiz.",
    },
    {
      t: "decision",
      text: `Die Forschung zeigte, dass es ${pct(67)} % der Befragten unangenehm ist, ihre Einschränkung zu erklären. Mit einem einmal eingerichteten Profil „spricht“ die App für die Nutzer, damit sie sich nicht bei jeder Suche rechtfertigen müssen.`,
    },
    { t: "h3", text: "2. Ein Restaurant finden" },
    {
      t: "p",
      text: "Der Startscreen zeigt Standort und Sicherheitsstandard auf einen Blick. Die Listen priorisieren sehr sichere Orte in der Nähe und die von Betroffenen am besten bewerteten.",
    },
    {
      t: "screens",
      items: [
        { path: "/home", label: "Start" },
        { path: "/busca", label: "Suche" },
        { path: "/categoria/mais-seguros", label: "Kategorie" },
      ],
      caption: "Start, Suche und Kategorien wie „Am sichersten“ und „Glutenfreie Party“.",
    },
    {
      t: "decision",
      text: `Eine Liste sicherer Restaurants (${pct(81)} %) und Geolokalisierung (${pct(69)} %) gehörten zu den meistgewünschten Funktionen. Deshalb beantwortet schon der erste Screen die Frage „Wo kann ich in meiner Nähe sicher essen?“.`,
    },
    { t: "h3", text: "3. Restaurant und Gericht prüfen" },
    {
      t: "p",
      text: "Die Restaurantseite zeigt die Maßnahmen gegen Kreuzkontamination, die berücksichtigten Einschränkungen und die Bewertungen. Beim Gericht erscheint jede Zutat mit ihrem Status im Verhältnis zum Profil der Person.",
    },
    {
      t: "screens",
      items: [
        { path: "/restaurante/1", label: "Restaurant" },
        { path: "/restaurante/1/prato/d1", label: "Gericht" },
      ],
      caption: "Die Restaurantseite und die Detailansicht des Gerichts mit deklarierten Zutaten.",
    },
    {
      t: "decision",
      text: `Versteckte Zutaten beunruhigen ${pct(58)} % der Befragten. Die deklarierten Zutaten zu zeigen, ersetzt nicht das Gespräch mit dem Restaurant, hilft aber zu wissen, was man vor der Bestellung fragen sollte.`,
    },
    { t: "h3", text: "4. Community und Bewertung: Sicherheit vor Sternen" },
    {
      t: "p",
      text: "Die Bewertung beginnt nicht mit Sternen. Die erste Frage lautet **„Hast du dich sicher gefühlt?“**. Danach folgen Tags wie „Geschultes Personal“, „Getrennte Küche“ und „Klare Zutaten“, und erst dann der Kommentar.",
    },
    {
      t: "screens",
      items: [
        { path: "/comunidade", label: "Community" },
        { path: "/restaurante/1/avaliar", label: "Bewerten" },
      ],
      caption: "Die Community sammelt Berichte von Menschen mit denselben Einschränkungen. Die Bewertung beginnt mit der Sicherheit.",
    },
    {
      t: "decision",
      text: "Glútty ist keine gewöhnliche Restaurant-Bewertungs-App. Im Fokus stehen weder Geschmack noch Preis. Die Bewertungs-Tags sind genau die Signale, die die Forschung als vertrauensbildend identifiziert hat. So wird jeder Bericht zu nützlicher Information für die nächste betroffene Person.",
    },
    { t: "h3", text: "5. Profil: das Gehirn der Personalisierung" },
    {
      t: "p",
      text: "Im Profil stehen Diagnose, Einschränkungen, verbotene Zutaten und Sicherheitsstandard. Diese Daten verändern die Suche, die Empfehlungen und die Risikohinweise.",
    },
    {
      t: "screens",
      items: [
        { path: "/perfil", label: "Mein Profil" },
        { path: "/perfil/restricoes", label: "Einschränkungen" },
        { path: "/perfil/seguranca", label: "Sicherheitsstandard" },
      ],
      caption: "Bearbeitbares Ernährungsprofil, Einschränkungen und Sicherheitsstandard.",
    },
    { t: "h3", text: "Sicherheitssiegel" },
    {
      t: "p",
      text: "Restaurants und Gerichte verwenden auf allen Screens dieselben Siegel. Jedes kombiniert Farbe, Symbol und Text, damit die Information nie nur von der Farbe abhängt.",
    },
    { t: "figure", kind: "badges", caption: "Die Siegel-Skala, von sehr sicher bis Vorsicht. Die Siegel erscheinen wie in der App auf Portugiesisch." },
    {
      t: "decision",
      text: "Ein farbiger Tag verringert den Leseaufwand: Man erfasst das Sicherheitsniveau auf einen Blick, ohne die ganze Speisekarte zu lesen. Und der Text im Siegel stellt sicher, dass die Information auch Menschen erreicht, die Farben nicht unterscheiden können.",
    },
    { t: "h3", text: "UX Writing: informieren, ohne Angst zu machen" },
    {
      t: "p",
      text: "Ziel der App ist, Angst zu verringern, nicht zu verstärken. Bei der Überprüfung der Screens hinterfragte ich Bezeichnungen wie *„Kontaminationsrisiko: niedrig“*. Die Information muss da sein, aber in einem klaren, einladenden Ton, ohne alarmierend zu wirken.",
    },
    { t: "sep" },
    { t: "h2", id: "branding", text: "Branding: emotionale Verbindungen zwischen Name und Zweck der App schaffen" },
    {
      t: "p",
      text: "Der Name Glútty geht von dem Wort aus, das im Zentrum des Lebens von Menschen mit Zöliakie steht, Gluten („glúten“ auf Portugiesisch), aber mit einem leichten, nahbaren Ton. Die Marke soll willkommen heißen, statt wie eine medizinische Warnung zu klingen.",
    },
    { t: "figure", kind: "brand", caption: "Maskottchen, Farbpalette, Typografie und Markenclaims von Glútty." },
    {
      t: "ul",
      items: [
        "**Tiefes Grün** vermittelt Sicherheit und Vertrauen. Es ist die Farbe der Haupt-Buttons und des Siegels „Sehr sicher“.",
        "**Limette** bringt Leichtigkeit und Energie und kennzeichnet positive Aktionen.",
        "**Creme** macht den Hintergrund warm und einladend, weit weg vom klinischen Weiß von Gesundheits-Apps.",
        "**Das Maskottchen** erscheint in Momenten des Wartens, der Begrüßung und des Erfolgs, um das Erlebnis menschlicher zu machen.",
        "**Das Weizensymbol** steht für Fürsorge, Sicherheit und Bewusstsein.",
      ],
    },
    {
      t: "decision",
      text: "Menschen mit Zöliakie leben bereits mit Angst und Misstrauen. Eine kühle, technische Marke würde dieses Gefühl verstärken. Glútty spricht wie ein Freund, der sich auskennt: klar, herzlich und ohne Panikmache.",
    },
    { t: "sep" },
    { t: "h2", id: "teste", text: "Usability-Test: sicherere Entscheidungen unterstützen" },
    {
      t: "p",
      text: "Um den Prototyp zu validieren, plante ich einen Remote-Test auf Maze mit der Think-Aloud-Methode: Die Teilnehmenden sagen laut, was sie beim Navigieren denken und fühlen. Die Aufgaben folgen der Journey, vom ersten Öffnen bis zum Profil.",
    },
    {
      t: "p",
      text: "Das Szenario ist alltagsnah: *Du reist nach São Paulo, hast heute keine Zeit zum Kochen, und ein Freund empfiehlt dir Glútty, um ein sicheres Restaurant zu finden.*",
    },
    { t: "figure", kind: "test", caption: "Die sieben Schritte des Tests und die jeweilige Frage." },
    {
      t: "decision",
      text: "Der Test misst nicht nur, ob die Aufgabe gelöst wird, sondern fragt, ob sich die Person *sicher gefühlt* hat. In einer App über Vertrauen ist das Sicherheitsgefühl genauso wichtig wie die Navigation.",
    },
    { t: "sep" },
    { t: "h2", id: "aprendizados", text: "Erkenntnisse und nächste Schritte" },
    {
      t: "ul",
      items: [
        "**Zahlen zeigen die Größe, Gespräche zeigen das Gewicht.** Die Umfrage belegte, dass die Angst fast einhellig ist. Die Interviews zeigten die Isolation, die Schuldgefühle der Eltern und die Rührung, gut bedient zu werden.",
        "**Vertrauen ist das Produkt.** Mehr als Restaurants aufzulisten, muss die App zeigen, warum ein Ort sicher ist.",
        "**Nein sagen ist auch Design.** Funktionen aus dem MVP herauszulassen, hat das Vertrauen geschützt, das wertvollste Gut von Glútty.",
        "**Nächste Schritte:** die Erkenntnisse aus dem Test zusammenführen, die Restaurant- und Gerichtsscreens verfeinern und ein Modul für Restaurants mit Leitfäden und Personalschulung entwickeln.",
      ],
    },
    { t: "pull", text: "Die Lösung, die wir suchen, ist nicht nur technisch. **Sie ist menschlich.**" },
    {
      t: "p",
      text: `Danke fürs Lesen. Wenn du Zöliakie hast, dich um jemanden mit Zöliakie kümmerst oder in der Gastronomie arbeitest, freue ich mich auf deine Meinung. Der vollständige Artikel ist auch auf [Medium](${MEDIUM_URL}), und der Prototyp ist online zum [Ausprobieren](${PROTOTYPE_URL}).`,
    },
  ],
  fig: {
    competitors: [
      { name: "Führende glutenfreie App", sub: "Community und Geolokalisierung", strong: "aktive Community und Bewertungsranking.", weak: "nur auf Englisch, unübersichtliches Design, wenige Fotos und Basisfunktionen nur im Bezahlabo." },
      { name: "HappyCow", sub: "Vegane Restaurants weltweit", strong: "weltweite Abdeckung, Karten und engagierte Community.", weak: "veganer Fokus. Unterscheidet nicht zwischen Diät und Zöliakie." },
      { name: "Fig", sub: "Produktscanner und Ernährungsprofile", strong: "tiefgehende Personalisierung von Diäten und Allergien.", weak: "auf Supermarktprodukte fokussiert und nur in wenigen Ländern verfügbar." },
      { name: "100 % glutenfreie Betriebe", sub: "Bäckereien und Restaurants in Zürich", strong: "strenge Abläufe und Gäste, die gerührt sind, ohne Angst essen zu können.", weak: "die Sicherheit ist auf Website und Social Media kaum sichtbar." },
    ],
    stats: [
      { value: pct(58), label: "wurden nach einer als „glutenfrei“ verkauften Mahlzeit krank." },
      { value: pct(77), label: "sind schon zu Hause geblieben, weil es keine verlässlichen Optionen gab." },
      { value: pct(67), label: "war es unangenehm, die eigene Einschränkung zu erklären." },
      { value: pct(50), label: "vertrauen nur wenigen Restaurants, die glutenfreie Optionen anbieten." },
    ],
    charts: [
      {
        title: "Größte Ängste beim Essen auswärts",
        sub: "Bis zu 3 Antworten pro Person",
        bars: [
          { label: "Unvorbereitetes Personal", n: 77 },
          { label: "Kreuzkontamination", n: 72 },
          { label: "Versteckte Zutaten", n: 58 },
          { label: "Unklare Angaben auf der Karte", n: 44 },
          { label: "Schwere körperliche Reaktionen", n: 28 },
        ],
      },
      {
        title: "Was Vertrauen in ein Restaurant schafft",
        sub: "Mehrfachauswahl",
        bars: [
          { label: "Bewertungen anderer Betroffener", n: 77 },
          { label: "Geschultes Personal", n: 72 },
          { label: "Glutenfrei-Zertifizierung", n: 69 },
          { label: "Getrennte Küche", n: 62 },
          { label: "Detaillierte Karte mit Zutaten", n: 59 },
        ],
      },
      {
        title: "Wo heute nach sicheren Orten gesucht wird",
        sub: "Mehrfachauswahl",
        bars: [
          { label: "Empfehlungen anderer Betroffener", n: 76 },
          { label: "Google", n: 58 },
          { label: "Instagram", n: 50 },
          { label: "Spezialisierte Apps", n: 38 },
        ],
      },
      {
        title: "Was von einer Plattform erwartet wird",
        sub: "Mehrfachauswahl",
        bars: [
          { label: "Liste sicherer Restaurants", n: 81 },
          { label: "Bewertungen anderer Betroffener", n: 75 },
          { label: "Geolokalisierung naher Orte", n: 69 },
          { label: "Infos zur Kreuzkontamination", n: 50 },
          { label: "Zertifizierte Produkte in der Region", n: 33 },
          { label: "Filter nach Art der Unverträglichkeit", n: 30 },
        ],
      },
    ],
    personas: [
      { name: "Luana", role: "Die junge Städterin", mvp: true, bio: "25–35 Jahre, arbeitet in einer Großstadt und hat ein aktives Sozialleben.", needs: "Schnell sichere Orte finden, mit Filtern und Social Proof." },
      { name: "Guilherme", role: "Frisch diagnostiziert, vom Land", mvp: true, bio: "20–40 Jahre, lebt in einer Kleinstadt und hat die Diagnose erst kürzlich erhalten.", needs: "Eine Schritt-für-Schritt-Einführung, lokale Community und Läden in der Nähe." },
      { name: "Vera", role: "Fürsorgliche Mutter", mvp: false, bio: "35–50 Jahre, kümmert sich um ein Schulkind mit Zöliakie.", needs: "Feste planen, mit der Schule sprechen und geprüfte Caterer finden." },
      { name: "Breno", role: "Reisender und Unternehmer", mvp: false, bio: "30–55 Jahre, reist beruflich zwischen Städten und Ländern.", needs: "Verlässliche Infos pro Stadt und Unterstützung auf Reisen." },
    ],
    journey: [
      { title: "Vorher", does: "Sucht in Gruppen, auf Google und Instagram. Ruft das Restaurant an.", feels: "Angst und Müdigkeit vom ständigen Planen.", glutty: "Suche nach Gegend, Filter nach Sicherheitsstandard und Bewertungen von Betroffenen." },
      { title: "Währenddessen", does: "Erklärt die Einschränkung, fragt nach Grillplatte, Öl und Utensilien.", feels: "Scham und Angst, nicht ernst genommen zu werden.", glutty: "Deklarierte Zutaten und eine digitale Sicherheitskarte für das Personal." },
      { title: "Danach", does: "Wartet ab, ob es Beschwerden gibt. Erzählt anderen Betroffenen davon.", feels: "Erleichterung und Dankbarkeit, oder Frust und Symptome.", glutty: "Sicherheitsfokussierte Bewertungen und Lieblingsrestaurants." },
    ],
    mvp: {
      inTitle: "Im MVP",
      laterTitle: "Auf der Roadmap",
      in: [
        "Restaurantsuche nach Standort oder gewählter Gegend",
        "Filter nach Ernährungseinschränkungen, basierend auf dem Sicherheitsstandard",
        "Sicherheitsstandard, im Onboarding festgelegt und im Profil änderbar",
        "Sicherheitsfokussiertes Feedback von Nutzern",
        "Vom Restaurant deklarierte Gerichte und Zutaten",
        "Digitale Sicherheitskarte für die Bestellung",
        "Sichere Restaurants als Favoriten speichern",
      ],
      later: [
        "Online-Reservierung und Lieferung",
        "Lokale Community",
        "Personalisierte Vorschläge nach Verhalten",
        "Siegel für Sicherheitsengagement",
        "Fotos der Gerichte und Lernvideos",
      ],
    },
    brand: {
      tagline: "Mehr Sicherheit bei jeder Mahlzeit.",
      slogans: ["„Sicherheit, die willkommen heißt. Fürsorge, die verändert.“", "„Kreuzkontamination ist kein Gewürz.“"],
      typeNote: "Nunito: rund, nahbar und gut lesbar.",
      mascotAlt: "Glútty-Maskottchen beim Feiern",
      colors: [
        { name: "Glútty-Grün", hex: "#1F3D34" },
        { name: "Limette", hex: "#C6F59D" },
        { name: "Creme", hex: "#F5F2DF" },
        { name: "Orange", hex: "#FC6904" },
      ],
    },
    test: [
      { title: "Erster Kontakt", q: "Hattest du Lust, die App weiter zu erkunden? Warum?" },
      { title: "Restaurant finden", q: "Welche Informationen haben dir am meisten geholfen, dem Restaurant zu vertrauen oder zu misstrauen?" },
      { title: "Gericht prüfen", q: "Waren die Infos zu Zutaten, Anpassungen und Sicherheit klar?" },
      { title: "Community", q: "Haben dir die Erfahrungen anderer geholfen, sicherer zu entscheiden?" },
      { title: "Restaurant bewerten", q: "Wie hast du dich gefühlt, als du deine Erfahrung geteilt hast, um anderen zu helfen?" },
      { title: "Profil", q: "Hattest du das Gefühl, deine Ernährungseinstellungen im Griff und klar vor Augen zu haben?" },
      { title: "Abschluss", q: "In welchem Moment hast du dich am sichersten, willkommensten oder verstandensten gefühlt?" },
    ],
  },
  tags: ["UX Design", "UX Research", "Fallstudie", "Zöliakie", "UI Design"],
};

export const CONTENT: Record<Lang, Content> = { pt, en, de };

// Tempo de leitura a partir do texto do artigo (~230 palavras por minuto).
export function readingMinutes(c: Content): number {
  const parts: string[] = [c.title, c.subtitle];
  for (const b of c.blocks) {
    if ("text" in b) parts.push(b.text);
    if (b.t === "ul") parts.push(...b.items);
    if ("caption" in b) parts.push(b.caption);
  }
  const words = parts.join(" ").split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 230));
}
