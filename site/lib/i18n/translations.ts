export interface NavLink {
  label: string;
  href: string;
}

export interface ItemCopy {
  title: string;
  description: string;
}

export interface TestimonialCopy {
  quote: string;
  name: string;
  role: string;
}

export interface TextDict {
  nav: NavLink[];
  ctaLabel: string;
  menuLabel: string;
  hero: {
    features: string[];
    titleLine1: string;
    titleLine2: string;
    description: string;
    ctaPrimary: string;
    ctaSecondary: string;
  };
  porQueParticipar: {
    eyebrow: string;
    title: string;
    description: string;
    badge: string;
    subtitle: string;
    imageAlt: string;
    items: ItemCopy[];
  };
  numeros: {
    stats: { value: string; suffix: string; label: string }[];
  };
  nossosServicos: {
    eyebrow: string;
    title: string;
    description: string;
    services: (ItemCopy & { photoLabel: string })[];
    cta: string;
  };
  certificacao: {
    imageAlt: string;
    eyebrow: string;
    title: string;
    description: string;
    importantLabel: string;
    importantText: string;
    steps: ItemCopy[];
  };
  facaParte: {
    eyebrow: string;
    title: string;
    description: string;
    items: string[];
    imageAlt: string;
  };
  depoimento: TestimonialCopy;
  depoimentoParceiro: TestimonialCopy;
  beneficios: {
    eyebrow: string;
    title: string;
    description: string;
    items: ItemCopy[];
  };
  comoFunciona: {
    eyebrow: string;
    title: string;
    description: string;
    steps: ItemCopy[];
  };
  statement: {
    words: string[];
  };
  regions: {
    selectorLabel: string;
    labels: { BR: string; US: string; CH: string };
  };
  pricing: {
    eyebrow: string;
    title: string;
    description: string;
    mostPopularLabel: string;
    recommendedForLabel: string;
    priceNote: string;
    ctaLabel: string;
    tiers: {
      name: string;
      recommendedFor: string;
      features: string[];
      highlighted?: boolean;
    }[];
  };
  faq: {
    eyebrow: string;
    title: string;
    description: string;
    items: ItemCopy[];
  };
  ctaFinal: {
    eyebrow: string;
    title: string;
    description: string;
    ctaSecondary: string;
    reassurance: string[];
    form: {
      restaurantLabel: string;
      restaurantPlaceholder: string;
      nameLabel: string;
      namePlaceholder: string;
      regionLabel: string;
      cityLabel: string;
      cityPlaceholder: string;
      phoneLabel: string;
      phonePlaceholder: string;
      messageLabel: string;
      messagePlaceholder: string;
      submitLabel: string;
    };
  };
  footer: {
    description: string;
    exploreHeading: string;
    contatoHeading: string;
    partnerLink: string;
    legalText: string;
  };
}

const navPt: NavLink[] = [
  { label: "Por que participar", href: "#beneficios" },
  { label: "Nossos Serviços", href: "#servicos" },
  { label: "Selo Glútty", href: "#certificacao" },
  { label: "Faça Parte", href: "#faca-parte" },
  { label: "Como funciona", href: "#como-funciona" },
  { label: "FAQ", href: "#faq" },
];

const navEn: NavLink[] = [
  { label: "Why participate", href: "#beneficios" },
  { label: "Our Services", href: "#servicos" },
  { label: "Glútty Seal", href: "#certificacao" },
  { label: "Get Involved", href: "#faca-parte" },
  { label: "How it works", href: "#como-funciona" },
  { label: "FAQ", href: "#faq" },
];

const navDe: NavLink[] = [
  { label: "Warum mitmachen", href: "#beneficios" },
  { label: "Unsere Leistungen", href: "#servicos" },
  { label: "Glútty-Siegel", href: "#certificacao" },
  { label: "Mitmachen", href: "#faca-parte" },
  { label: "So funktioniert's", href: "#como-funciona" },
  { label: "FAQ", href: "#faq" },
];

export const pt: TextDict = {
  nav: navPt,
  ctaLabel: "Quero ser parceiro",
  menuLabel: "Menu",
  hero: {
    features: ["100% verificado", "Equipe treinada", "Comunidade celíaca"],
    titleLine1: "Alimentação segura",
    titleLine2: "fora de casa",
    description:
      "O Glútty conecta estabelecimentos preparados a pessoas celíacas que precisam de informação clara, atendimento treinado e transparência antes de escolher onde comer.",
    ctaPrimary: "Quero ser parceiro do Glútty",
    ctaSecondary: "Conhecer nossos serviços",
  },
  porQueParticipar: {
    eyebrow: "Sobre o Glútty",
    title: "Sua marca, perto de quem mais precisa de transparência",
    description:
      "A comunidade celíaca está, todos os dias, em busca de lugares onde possa comer com mais confiança. O Glútty é a ponte entre essa comunidade e restaurantes que se preparam de verdade para recebê-la.",
    badge: "O que oferecemos",
    subtitle: "Vantagens de fazer parte da comunidade Glútty",
    imageAlt: "Comunidade Glútty",
    items: [
      {
        title: "Visibilidade qualificada",
        description:
          "Seu restaurante aparece para uma comunidade que já está em busca de opções seguras — sem precisar competir por atenção genérica.",
      },
      {
        title: "Confiança construída com transparência",
        description:
          "Mostrar seus processos, ingredientes e cuidados constrói uma reputação que avaliações comuns não conseguem.",
      },
      {
        title: "Presença no app Glútty",
        description:
          "Seu restaurante no mapa, na busca por categoria e nas recomendações personalizadas para a comunidade celíaca.",
      },
      {
        title: "Avaliações da comunidade",
        description:
          "Feedback real sobre prato, atendimento, clareza e segurança — informações valiosas para melhorar continuamente.",
      },
      {
        title: "Destaque pelo treinamento",
        description:
          "Equipes certificadas recebem destaque especial, mostrando que o cuidado do seu restaurante vai além do cardápio.",
      },
      {
        title: "Participação em eventos Glútty",
        description:
          "Feiras, degustações seguras e workshops aproximam o seu restaurante da comunidade celíaca pessoalmente.",
      },
    ],
  },
  numeros: {
    stats: [
      { value: "500", suffix: "+", label: "Restaurantes parceiros" },
      { value: "12 mil", suffix: "+", label: "Pessoas na comunidade celíaca" },
      { value: "100", suffix: "%", label: "Equipes treinadas e certificadas" },
      { value: "50", suffix: "+", label: "Cidades com restaurantes parceiros" },
      { value: "4 mil", suffix: "+", label: "Avaliações da comunidade" },
    ],
  },
  nossosServicos: {
    eyebrow: "Nossos Serviços",
    title: "Como preparamos seu restaurante para a comunidade celíaca",
    description:
      "Antes de receber o Selo Glútty Verificado, cada restaurante parceiro passa por um conjunto de exigências e treinamentos que deixam cardápio, processos e atendimento prontos para receber a comunidade celíaca com confiança.",
    services: [
      {
        title: "Cardápio e transparência",
        description:
          "Cardápio sem glúten real, identificado e sempre atualizado, com transparência total sobre ingredientes, rótulos e fornecedores.",
        photoLabel: "Foto: cardápio sem glúten do restaurante parceiro",
      },
      {
        title: "Prevenção de contaminação cruzada",
        description:
          "Processos definidos para evitar contaminação cruzada, com separação correta de utensílios, superfícies e áreas de preparo.",
        photoLabel: "Foto: cozinha organizada do restaurante parceiro",
      },
      {
        title: "Treinamento obrigatório da equipe",
        description:
          "Da cozinha ao salão, toda a equipe passa pelo treinamento Glútty sobre doença celíaca, segurança alimentar e atendimento ao cliente celíaco.",
        photoLabel: "Foto: equipe durante o treinamento Glútty",
      },
    ],
    cta: "Saiba mais",
  },
  certificacao: {
    imageAlt: "Selo Glútty Verificado em destaque",
    eyebrow: "Por quê o Glútty?",
    title: "O Selo Glútty Verificado",
    description:
      "O selo indica que o restaurante passou pelo treinamento obrigatório, declarou seus processos de segurança alimentar e segue boas práticas para reduzir riscos de contaminação cruzada.",
    importantLabel: "Importante:",
    importantText:
      " o selo não é uma garantia de 100% de segurança — doença celíaca exige cuidado contínuo de todas as partes. Ele representa um compromisso público com transparência, treinamento e melhoria constante dos processos.",
    steps: [
      {
        title: "Treinamento concluído",
        description: "Toda a equipe finaliza o treinamento obrigatório Glútty sobre doença celíaca e segurança alimentar.",
      },
      {
        title: "Processos declarados",
        description: "O restaurante declara seus processos de segurança alimentar e boas práticas de cozinha.",
      },
      {
        title: "Selo ativado no perfil",
        description: "O Selo Glútty Verificado é exibido no perfil do restaurante dentro do aplicativo.",
      },
    ],
  },
  facaParte: {
    eyebrow: "Faça Parte",
    title: "Uma comunidade que avalia com cuidado — e constrói confiança",
    description:
      "Pessoas celíacas avaliam restaurantes parceiros em sabor, atendimento, clareza e segurança — construindo uma rede de confiança. Além do app, o Glútty promove feiras, degustações, workshops e encontros presenciais.",
    items: [
      "Avaliações da comunidade sobre sabor, atendimento, clareza e segurança",
      "Feiras gastronômicas sem glúten",
      "Degustações seguras e guiadas pelo cardápio",
      "Workshops e palestras com chefs e especialistas",
      "Encontros presenciais sobre contaminação cruzada",
    ],
    imageAlt: "Comunidade Glútty em evento",
  },
  depoimento: {
    quote:
      "Antes do Glútty eu evitava sair para comer, com medo de contaminação cruzada. Hoje escolho pelo Selo Verificado e me sinto segura para experimentar pratos novos com a minha família.",
    name: "Marina Souza",
    role: "Pessoa celíaca, usuária do app Glútty",
  },
  depoimentoParceiro: {
    quote:
      "Depois do Selo Glútty Verificado, o treinamento da equipe deixou nossos processos muito mais claros e passamos a receber clientes celíacos com muito mais confiança — e eles voltam.",
    name: "Restaurante parceiro Glútty",
    role: "Depoimento de exemplo — substituir por um parceiro real",
  },
  beneficios: {
    eyebrow: "Benefícios para o seu negócio",
    title: "O que muda na prática para o seu restaurante",
    description:
      "Fazer parte do Glútty é mais do que aparecer em um app — é fortalecer a forma como o seu restaurante se relaciona com a comunidade celíaca.",
    items: [
      {
        title: "Novo público fiel",
        description:
          "A comunidade celíaca valoriza e indica os lugares em que confia — gerando clientes recorrentes para o seu restaurante.",
      },
      {
        title: "Redução de erros e retrabalho",
        description:
          "Processos mais claros significam menos devoluções, reclamações e prejuízos causados por contaminação cruzada.",
      },
      {
        title: "Marca associada à confiança",
        description:
          "O Selo Glútty Verificado comunica, à primeira vista, que o seu restaurante se importa com segurança alimentar.",
      },
      {
        title: "Equipe mais preparada",
        description:
          "Capacitação contínua reduz riscos, melhora o atendimento e fortalece a cultura de cuidado do seu time.",
      },
    ],
  },
  comoFunciona: {
    eyebrow: "Como funciona",
    title: "Do cadastro ao selo: veja o caminho até fazer parte do Glútty",
    description:
      "Um processo guiado, em oito etapas, que prepara o seu restaurante para receber a comunidade celíaca com confiança.",
    steps: [
      {
        title: "Cadastro",
        description: "Você registra seu restaurante e conta um pouco sobre sua estrutura, cardápio e processos atuais.",
      },
      {
        title: "Análise inicial",
        description: "Nossa equipe avalia as informações enviadas e identifica pontos de atenção antes do treinamento.",
      },
      {
        title: "Treinamento da equipe",
        description: "Todo o time participa do treinamento obrigatório Glútty sobre doença celíaca e segurança alimentar.",
      },
      {
        title: "Ajustes de processos",
        description:
          "Com o que foi aprendido, o restaurante revisa rotinas, separação de utensílios e comunicação com o cliente.",
      },
      {
        title: "Certificação",
        description: "Após concluir o treinamento e declarar seus processos, o restaurante recebe o Selo Glútty Verificado.",
      },
      {
        title: "Entrada no app",
        description: "O perfil do restaurante é publicado no aplicativo, com selo, cardápio e informações verificadas.",
      },
      {
        title: "Avaliações da comunidade",
        description: "Clientes celíacos começam a avaliar pratos, atendimento, clareza e segurança percebida.",
      },
      {
        title: "Participação em eventos",
        description: "O restaurante passa a integrar feiras, degustações e ações da comunidade Glútty.",
      },
    ],
  },
  statement: {
    words: ["Cuidado", "Comunidade", "Pertencimento"],
  },
  regions: {
    selectorLabel: "Região",
    labels: { BR: "Brasil", US: "Estados Unidos", CH: "Suíça" },
  },
  pricing: {
    eyebrow: "Pacotes de parceria",
    title: "Um pacote para cada etapa da sua jornada celíaca-segura",
    description:
      "Escolha o pacote que faz sentido para o tamanho do seu restaurante hoje — e evolua quando quiser. Selecione sua região para ver a moeda correspondente.",
    mostPopularLabel: "Mais escolhido",
    recommendedForLabel: "Indicado para",
    priceNote: "Valores em definição — fale com a gente pelo WhatsApp para receber uma proposta personalizada.",
    ctaLabel: "Quero esse pacote",
    tiers: [
      {
        name: "Básico",
        recommendedFor: "Restaurantes que estão começando a jornada de certificação",
        features: [
          "Treinamento obrigatório da equipe (módulo essencial)",
          "Selo Glútty Verificado",
          "Perfil no app Glútty",
          "Avaliações da comunidade",
        ],
      },
      {
        name: "Intermediário",
        recommendedFor: "Restaurantes que já têm fluxo de clientes celíacos e querem crescer",
        features: [
          "Tudo do pacote Básico",
          "Destaque na busca e nas recomendações do app",
          "Participação em eventos Glútty",
          "Suporte prioritário",
        ],
        highlighted: true,
      },
      {
        name: "Avançado",
        recommendedFor: "Redes e restaurantes que querem liderar a categoria sem glúten",
        features: [
          "Tudo do pacote Intermediário",
          "Consultoria personalizada de processos",
          "Campanhas de marketing conjuntas com o Glútty",
          "Relatórios de insights da comunidade",
        ],
      },
    ],
  },
  faq: {
    eyebrow: "Perguntas frequentes",
    title: "Tudo o que você precisa saber antes de se tornar parceiro",
    description:
      "Reunimos as dúvidas mais comuns de quem está avaliando entrar para a comunidade Glútty.",
    items: [
      {
        title: "Quanto custa ser parceiro Glútty?",
        description:
          "O investimento varia de acordo com o pacote escolhido (Básico, Intermediário ou Avançado) e com a sua região (Brasil, Estados Unidos ou Suíça). Veja os pacotes na seção acima ou fale com a gente pelo WhatsApp para receber uma proposta personalizada.",
      },
      {
        title: "Quanto tempo dura o treinamento da equipe?",
        description:
          "O treinamento obrigatório é dividido em módulos online e um checklist prático aplicado na cozinha e no salão, concluído em poucos dias sem pausar o funcionamento do restaurante.",
      },
      {
        title: "Minha equipe tem alta rotatividade. O selo continua valendo?",
        description:
          "Sim. Recomendamos treinar novos colaboradores assim que entrarem — o acesso ao treinamento Glútty continua disponível durante toda a parceria, sem custo adicional por pessoa.",
      },
      {
        title: "Existe exclusividade de bairro ou cidade?",
        description:
          "Não. O Glútty não limita o número de restaurantes parceiros por região — nosso objetivo é que a comunidade celíaca tenha o maior número possível de opções seguras.",
      },
      {
        title: "O Selo Glútty Verificado garante 100% de segurança contra contaminação cruzada?",
        description:
          "Não. O selo representa um compromisso público com transparência, treinamento e melhoria contínua dos processos — mas a doença celíaca exige cuidado constante de toda a equipe, todos os dias.",
      },
    ],
  },
  ctaFinal: {
    eyebrow: "Faça parte do Glútty",
    title: "Prepare seu restaurante para receber melhor a comunidade celíaca.",
    description:
      "Preencha o formulário abaixo e nossa equipe entra em contato pelo WhatsApp para apresentar o pacote ideal para o seu restaurante.",
    ctaSecondary: "Conhecer nossos serviços",
    reassurance: ["Sem compromisso", "Resposta em até 1 dia útil", "Atendimento em português, inglês e alemão"],
    form: {
      restaurantLabel: "Nome do restaurante",
      restaurantPlaceholder: "Ex: Cantina da Maria",
      nameLabel: "Seu nome",
      namePlaceholder: "Ex: João Silva",
      regionLabel: "Região do seu restaurante",
      cityLabel: "Cidade",
      cityPlaceholder: "Ex: São Paulo",
      phoneLabel: "WhatsApp para contato",
      phonePlaceholder: "(00) 00000-0000",
      messageLabel: "Conte um pouco sobre o seu restaurante",
      messagePlaceholder: "Tipo de cozinha, tamanho da equipe, dúvidas...",
      submitLabel: "Quero ser parceiro do Glútty",
    },
  },
  footer: {
    description:
      "O Glútty conecta a comunidade celíaca a restaurantes preparados, treinados e transparentes — para que comer fora possa ser, cada vez mais, uma experiência sem medo.",
    exploreHeading: "Explore",
    contatoHeading: "Contato",
    partnerLink: "Quero ser parceiro",
    legalText: "O Selo Glútty Verificado não constitui garantia de ausência total de risco de contaminação cruzada.",
  },
};

export const en: TextDict = {
  nav: navEn,
  ctaLabel: "Become a partner",
  menuLabel: "Menu",
  hero: {
    features: ["100% verified", "Trained staff", "Celiac community"],
    titleLine1: "Safe eating",
    titleLine2: "away from home",
    description:
      "Glútty connects well-prepared establishments with people with celiac disease who need clear information, trained service, and transparency before choosing where to eat.",
    ctaPrimary: "I want to become a Glútty partner",
    ctaSecondary: "See our services",
  },
  porQueParticipar: {
    eyebrow: "About Glútty",
    title: "Your brand, close to those who need transparency most",
    description:
      "Every day, the celiac community is looking for places where they can eat with more confidence. Glútty is the bridge between this community and restaurants that truly prepare to welcome them.",
    badge: "What we offer",
    subtitle: "Benefits of being part of the Glútty community",
    imageAlt: "Glútty community",
    items: [
      {
        title: "Qualified visibility",
        description:
          "Your restaurant is shown to a community that's already looking for safe options — without competing for generic attention.",
      },
      {
        title: "Trust built through transparency",
        description:
          "Showing your processes, ingredients and care builds a reputation that ordinary reviews can't.",
      },
      {
        title: "Presence in the Glútty app",
        description:
          "Your restaurant on the map, in category search, and in personalized recommendations for the celiac community.",
      },
      {
        title: "Community reviews",
        description:
          "Real feedback on food, service, clarity and safety — valuable information for continuous improvement.",
      },
      {
        title: "Recognition for training",
        description:
          "Certified teams get special recognition, showing that your restaurant's care goes beyond the menu.",
      },
      {
        title: "Participation in Glútty events",
        description:
          "Fairs, safe tastings and workshops bring your restaurant closer to the celiac community in person.",
      },
    ],
  },
  numeros: {
    stats: [
      { value: "500", suffix: "+", label: "Partner restaurants" },
      { value: "12K", suffix: "+", label: "People in the celiac community" },
      { value: "100", suffix: "%", label: "Trained and certified teams" },
      { value: "50", suffix: "+", label: "Cities with partner restaurants" },
      { value: "4K", suffix: "+", label: "Community reviews" },
    ],
  },
  nossosServicos: {
    eyebrow: "Our Services",
    title: "How we prepare your restaurant for the celiac community",
    description:
      "Before receiving the Glútty Verified Seal, every partner restaurant goes through a set of requirements and training that gets the menu, processes and service ready to confidently welcome the celiac community.",
    services: [
      {
        title: "Menu and transparency",
        description:
          "A real, clearly labeled and always up-to-date gluten-free menu, with full transparency about ingredients, labels and suppliers.",
        photoLabel: "Photo: partner restaurant's gluten-free menu",
      },
      {
        title: "Cross-contamination prevention",
        description:
          "Defined processes to prevent cross-contamination, with proper separation of utensils, surfaces and prep areas.",
        photoLabel: "Photo: partner restaurant's organized kitchen",
      },
      {
        title: "Mandatory staff training",
        description:
          "From the kitchen to the dining room, the whole team goes through Glútty training on celiac disease, food safety and serving celiac customers.",
        photoLabel: "Photo: team during Glútty training",
      },
    ],
    cta: "Learn more",
  },
  certificacao: {
    imageAlt: "Glútty Verified Seal featured",
    eyebrow: "Why Glútty?",
    title: "The Glútty Verified Seal",
    description:
      "The seal indicates that the restaurant has completed mandatory training, declared its food safety processes, and follows best practices to reduce the risk of cross-contamination.",
    importantLabel: "Important:",
    importantText:
      " the seal is not a 100% safety guarantee — celiac disease requires ongoing care from everyone involved. It represents a public commitment to transparency, training and continuous process improvement.",
    steps: [
      {
        title: "Training completed",
        description: "The entire team completes the mandatory Glútty training on celiac disease and food safety.",
      },
      {
        title: "Processes declared",
        description: "The restaurant declares its food safety processes and kitchen best practices.",
      },
      {
        title: "Seal activated on profile",
        description: "The Glútty Verified Seal is displayed on the restaurant's profile within the app.",
      },
    ],
  },
  facaParte: {
    eyebrow: "Get Involved",
    title: "A community that reviews with care — and builds trust",
    description:
      "People with celiac disease review partner restaurants on taste, service, clarity and safety — building a network of trust. Beyond the app, Glútty hosts fairs, tastings, workshops and in-person meetups.",
    items: [
      "Community reviews on taste, service, clarity and safety",
      "Gluten-free food fairs",
      "Safe, menu-guided tastings",
      "Workshops and talks with chefs and experts",
      "In-person meetups on cross-contamination",
    ],
    imageAlt: "Glútty community at an event",
  },
  depoimento: {
    quote:
      "Before Glútty, I avoided eating out for fear of cross-contamination. Today I choose by the Verified Seal and feel safe trying new dishes with my family.",
    name: "Marina Souza",
    role: "Person with celiac disease, Glútty app user",
  },
  depoimentoParceiro: {
    quote:
      "After the Glútty Verified Seal, staff training made our processes much clearer and we started welcoming celiac customers with a lot more confidence — and they keep coming back.",
    name: "Glútty partner restaurant",
    role: "Example testimonial — to be replaced with a real partner",
  },
  beneficios: {
    eyebrow: "Benefits for your business",
    title: "What changes in practice for your restaurant",
    description:
      "Being part of Glútty is more than appearing in an app — it's strengthening how your restaurant connects with the celiac community.",
    items: [
      {
        title: "New loyal customers",
        description:
          "The celiac community values and recommends the places it trusts — generating repeat customers for your restaurant.",
      },
      {
        title: "Fewer errors and less rework",
        description:
          "Clearer processes mean fewer returns, complaints and losses caused by cross-contamination.",
      },
      {
        title: "A brand associated with trust",
        description:
          "The Glútty Verified Seal shows at a glance that your restaurant cares about food safety.",
      },
      {
        title: "A more prepared team",
        description:
          "Ongoing training reduces risks, improves service and strengthens your team's culture of care.",
      },
    ],
  },
  comoFunciona: {
    eyebrow: "How it works",
    title: "From sign-up to seal: see the path to becoming part of Glútty",
    description:
      "A guided, eight-step process that prepares your restaurant to confidently welcome the celiac community.",
    steps: [
      {
        title: "Sign-up",
        description: "You register your restaurant and share a bit about your setup, menu and current processes.",
      },
      {
        title: "Initial review",
        description: "Our team reviews the information submitted and identifies points of attention before training.",
      },
      {
        title: "Team training",
        description: "The whole team takes part in the mandatory Glútty training on celiac disease and food safety.",
      },
      {
        title: "Process adjustments",
        description:
          "With what was learned, the restaurant reviews routines, utensil separation and customer communication.",
      },
      {
        title: "Certification",
        description: "After completing training and declaring its processes, the restaurant receives the Glútty Verified Seal.",
      },
      {
        title: "App listing",
        description: "The restaurant's profile is published in the app, with seal, menu and verified information.",
      },
      {
        title: "Community reviews",
        description: "Celiac customers start reviewing dishes, service, clarity and perceived safety.",
      },
      {
        title: "Event participation",
        description: "The restaurant starts taking part in Glútty community fairs, tastings and activities.",
      },
    ],
  },
  statement: {
    words: ["Care", "Community", "Belonging"],
  },
  regions: {
    selectorLabel: "Region",
    labels: { BR: "Brazil", US: "United States", CH: "Switzerland" },
  },
  pricing: {
    eyebrow: "Partnership packages",
    title: "A package for every stage of your celiac-safe journey",
    description:
      "Pick the package that fits your restaurant's size today — and upgrade whenever you're ready. Select your region to see the matching currency.",
    mostPopularLabel: "Most chosen",
    recommendedForLabel: "Recommended for",
    priceNote: "Prices are being finalized — reach out on WhatsApp for a personalized quote.",
    ctaLabel: "I want this package",
    tiers: [
      {
        name: "Basic",
        recommendedFor: "Restaurants just starting their certification journey",
        features: [
          "Mandatory staff training (core module)",
          "Glútty Verified Seal",
          "Profile in the Glútty app",
          "Community reviews",
        ],
      },
      {
        name: "Intermediate",
        recommendedFor: "Restaurants already serving celiac customers and ready to grow",
        features: [
          "Everything in Basic",
          "Featured placement in app search and recommendations",
          "Participation in Glútty events",
          "Priority support",
        ],
        highlighted: true,
      },
      {
        name: "Advanced",
        recommendedFor: "Chains and restaurants aiming to lead the gluten-free category",
        features: [
          "Everything in Intermediate",
          "Personalized process consulting",
          "Joint marketing campaigns with Glútty",
          "Community insight reports",
        ],
      },
    ],
  },
  faq: {
    eyebrow: "Frequently asked questions",
    title: "Everything you need to know before becoming a partner",
    description:
      "We've gathered the most common questions from restaurants evaluating the Glútty community.",
    items: [
      {
        title: "How much does it cost to become a Glútty partner?",
        description:
          "Investment varies by package (Basic, Intermediate or Advanced) and by region (Brazil, United States or Switzerland). See the packages above or reach out on WhatsApp for a personalized quote.",
      },
      {
        title: "How long does staff training take?",
        description:
          "Mandatory training is split into online modules and a practical checklist applied in the kitchen and dining room, completed in a few days without pausing the restaurant's operations.",
      },
      {
        title: "My team has high turnover. Does the seal still hold?",
        description:
          "Yes. We recommend training new hires as soon as they join — access to Glútty training stays available for the entire partnership, with no extra cost per person.",
      },
      {
        title: "Is there neighborhood or city exclusivity?",
        description:
          "No. Glútty doesn't limit the number of partner restaurants per region — our goal is for the celiac community to have as many safe options as possible.",
      },
      {
        title: "Does the Glútty Verified Seal guarantee 100% protection against cross-contamination?",
        description:
          "No. The seal represents a public commitment to transparency, training and continuous process improvement — but celiac disease requires constant care from the whole team, every day.",
      },
    ],
  },
  ctaFinal: {
    eyebrow: "Become part of Glútty",
    title: "Prepare your restaurant to better welcome the celiac community.",
    description:
      "Fill out the form below and our team will reach out on WhatsApp to present the right package for your restaurant.",
    ctaSecondary: "See our services",
    reassurance: ["No commitment", "Response within 1 business day", "Support in Portuguese, English and German"],
    form: {
      restaurantLabel: "Restaurant name",
      restaurantPlaceholder: "E.g. Maria's Kitchen",
      nameLabel: "Your name",
      namePlaceholder: "E.g. John Smith",
      regionLabel: "Your restaurant's region",
      cityLabel: "City",
      cityPlaceholder: "E.g. New York",
      phoneLabel: "WhatsApp number",
      phonePlaceholder: "(000) 000-0000",
      messageLabel: "Tell us a bit about your restaurant",
      messagePlaceholder: "Type of cuisine, team size, questions...",
      submitLabel: "I want to become a Glútty partner",
    },
  },
  footer: {
    description:
      "Glútty connects the celiac community with prepared, trained and transparent restaurants — so eating out can increasingly be a fearless experience.",
    exploreHeading: "Explore",
    contatoHeading: "Contact",
    partnerLink: "Become a partner",
    legalText: "The Glútty Verified Seal does not guarantee a complete absence of cross-contamination risk.",
  },
};

export const de: TextDict = {
  nav: navDe,
  ctaLabel: "Partner werden",
  menuLabel: "Menü",
  hero: {
    features: ["100 % geprüft", "Geschultes Personal", "Zöliakie-Community"],
    titleLine1: "Sicher essen",
    titleLine2: "außer Haus",
    description:
      "Glútty verbindet gut vorbereitete Betriebe mit Menschen mit Zöliakie, die vor der Wahl eines Restaurants klare Informationen, geschultes Personal und Transparenz brauchen.",
    ctaPrimary: "Ich möchte Glútty-Partner werden",
    ctaSecondary: "Unsere Leistungen ansehen",
  },
  porQueParticipar: {
    eyebrow: "Über Glútty",
    title: "Ihre Marke, nah an denen, die Transparenz am meisten brauchen",
    description:
      "Die Zöliakie-Community sucht jeden Tag nach Orten, an denen sie mit mehr Vertrauen essen kann. Glútty ist die Brücke zwischen dieser Community und Restaurants, die sich wirklich darauf vorbereiten, sie willkommen zu heißen.",
    badge: "Was wir bieten",
    subtitle: "Vorteile der Mitgliedschaft in der Glútty-Community",
    imageAlt: "Glútty-Community",
    items: [
      {
        title: "Qualifizierte Sichtbarkeit",
        description:
          "Ihr Restaurant wird einer Community gezeigt, die bereits nach sicheren Optionen sucht — ohne um allgemeine Aufmerksamkeit konkurrieren zu müssen.",
      },
      {
        title: "Vertrauen durch Transparenz",
        description:
          "Wer seine Prozesse, Zutaten und Sorgfalt zeigt, baut sich einen Ruf auf, den gewöhnliche Bewertungen nicht erreichen.",
      },
      {
        title: "Präsenz in der Glútty-App",
        description:
          "Ihr Restaurant auf der Karte, in der Kategoriesuche und in personalisierten Empfehlungen für die Zöliakie-Community.",
      },
      {
        title: "Bewertungen der Community",
        description:
          "Echtes Feedback zu Essen, Service, Klarheit und Sicherheit — wertvolle Informationen für stetige Verbesserung.",
      },
      {
        title: "Anerkennung für Schulung",
        description:
          "Zertifizierte Teams erhalten besondere Anerkennung und zeigen, dass die Sorgfalt Ihres Restaurants über die Speisekarte hinausgeht.",
      },
      {
        title: "Teilnahme an Glútty-Events",
        description:
          "Messen, sichere Verkostungen und Workshops bringen Ihr Restaurant der Zöliakie-Community persönlich näher.",
      },
    ],
  },
  numeros: {
    stats: [
      { value: "500", suffix: "+", label: "Partnerrestaurants" },
      { value: "12.000", suffix: "+", label: "Menschen in der Zöliakie-Community" },
      { value: "100", suffix: "%", label: "Geschulte und zertifizierte Teams" },
      { value: "50", suffix: "+", label: "Städte mit Partnerrestaurants" },
      { value: "4.000", suffix: "+", label: "Bewertungen der Community" },
    ],
  },
  nossosServicos: {
    eyebrow: "Unsere Leistungen",
    title: "So bereiten wir Ihr Restaurant auf die Zöliakie-Community vor",
    description:
      "Bevor ein Partnerrestaurant das Glútty-Verifiziert-Siegel erhält, durchläuft es eine Reihe von Anforderungen und Schulungen, die Speisekarte, Prozesse und Service darauf vorbereiten, die Zöliakie-Community sicher willkommen zu heißen.",
    services: [
      {
        title: "Speisekarte und Transparenz",
        description:
          "Eine echte, klar gekennzeichnete und stets aktuelle glutenfreie Speisekarte mit voller Transparenz über Zutaten, Kennzeichnungen und Lieferanten.",
        photoLabel: "Foto: glutenfreie Speisekarte des Partnerrestaurants",
      },
      {
        title: "Vermeidung von Kreuzkontamination",
        description:
          "Festgelegte Prozesse zur Vermeidung von Kreuzkontamination mit korrekter Trennung von Utensilien, Oberflächen und Zubereitungsbereichen.",
        photoLabel: "Foto: organisierte Küche des Partnerrestaurants",
      },
      {
        title: "Verpflichtende Mitarbeiterschulung",
        description:
          "Von der Küche bis zum Service durchläuft das gesamte Team die Glútty-Schulung zu Zöliakie, Lebensmittelsicherheit und dem Umgang mit Gästen mit Zöliakie.",
        photoLabel: "Foto: Team während der Glútty-Schulung",
      },
    ],
    cta: "Mehr erfahren",
  },
  certificacao: {
    imageAlt: "Glútty-Verifiziert-Siegel im Fokus",
    eyebrow: "Warum Glútty?",
    title: "Das Glútty-Verifiziert-Siegel",
    description:
      "Das Siegel zeigt, dass das Restaurant die Pflichtschulung abgeschlossen, seine Lebensmittelsicherheitsprozesse erklärt hat und bewährte Verfahren zur Reduzierung des Kreuzkontaminationsrisikos befolgt.",
    importantLabel: "Wichtig:",
    importantText:
      " das Siegel ist keine 100%ige Sicherheitsgarantie — Zöliakie erfordert kontinuierliche Sorgfalt von allen Beteiligten. Es steht für ein öffentliches Bekenntnis zu Transparenz, Schulung und stetiger Prozessverbesserung.",
    steps: [
      {
        title: "Schulung abgeschlossen",
        description: "Das gesamte Team schließt die verpflichtende Glútty-Schulung zu Zöliakie und Lebensmittelsicherheit ab.",
      },
      {
        title: "Prozesse erklärt",
        description: "Das Restaurant erklärt seine Lebensmittelsicherheitsprozesse und bewährten Küchenpraktiken.",
      },
      {
        title: "Siegel im Profil aktiviert",
        description: "Das Glútty-Verifiziert-Siegel wird im Profil des Restaurants in der App angezeigt.",
      },
    ],
  },
  facaParte: {
    eyebrow: "Mitmachen",
    title: "Eine Community, die sorgfältig bewertet — und Vertrauen schafft",
    description:
      "Menschen mit Zöliakie bewerten Partnerrestaurants nach Geschmack, Service, Klarheit und Sicherheit — und schaffen so ein Vertrauensnetzwerk. Über die App hinaus veranstaltet Glútty Messen, Verkostungen, Workshops und persönliche Treffen.",
    items: [
      "Bewertungen der Community zu Geschmack, Service, Klarheit und Sicherheit",
      "Glutenfreie Food-Messen",
      "Sichere, speisekartengeführte Verkostungen",
      "Workshops und Vorträge mit Köchen und Experten",
      "Persönliche Treffen zum Thema Kreuzkontamination",
    ],
    imageAlt: "Glútty-Community bei einem Event",
  },
  depoimento: {
    quote:
      "Vor Glútty habe ich es vermieden, auswärts zu essen, aus Angst vor Kreuzkontamination. Heute wähle ich nach dem Verifiziert-Siegel und fühle mich sicher, neue Gerichte mit meiner Familie auszuprobieren.",
    name: "Marina Souza",
    role: "Person mit Zöliakie, Nutzerin der Glútty-App",
  },
  depoimentoParceiro: {
    quote:
      "Seit dem Glútty-Verifiziert-Siegel sind unsere Abläufe durch die Mitarbeiterschulung viel klarer geworden, und wir empfangen Gäste mit Zöliakie mit viel mehr Sicherheit — und sie kommen wieder.",
    name: "Glútty-Partnerrestaurant",
    role: "Beispiel-Erfahrungsbericht — wird durch einen echten Partner ersetzt",
  },
  beneficios: {
    eyebrow: "Vorteile für Ihr Unternehmen",
    title: "Was sich in der Praxis für Ihr Restaurant ändert",
    description:
      "Teil von Glútty zu sein bedeutet mehr, als nur in einer App zu erscheinen — es stärkt die Verbindung Ihres Restaurants mit der Zöliakie-Community.",
    items: [
      {
        title: "Neue Stammgäste",
        description:
          "Die Zöliakie-Community schätzt und empfiehlt die Orte, denen sie vertraut — das bringt Ihrem Restaurant Stammgäste.",
      },
      {
        title: "Weniger Fehler und Nacharbeit",
        description:
          "Klarere Prozesse bedeuten weniger Rückgaben, Beschwerden und Verluste durch Kreuzkontamination.",
      },
      {
        title: "Eine Marke, die für Vertrauen steht",
        description:
          "Das Glútty-Verifiziert-Siegel zeigt auf einen Blick, dass Ihrem Restaurant Lebensmittelsicherheit wichtig ist.",
      },
      {
        title: "Ein besser vorbereitetes Team",
        description:
          "Kontinuierliche Schulung reduziert Risiken, verbessert den Service und stärkt die Sorgfaltskultur Ihres Teams.",
      },
    ],
  },
  comoFunciona: {
    eyebrow: "So funktioniert's",
    title: "Von der Anmeldung bis zum Siegel: der Weg zur Glútty-Partnerschaft",
    description:
      "Ein begleiteter Acht-Schritte-Prozess, der Ihr Restaurant darauf vorbereitet, die Zöliakie-Community sicher willkommen zu heißen.",
    steps: [
      {
        title: "Anmeldung",
        description: "Sie registrieren Ihr Restaurant und teilen ein paar Informationen zu Ihrer Struktur, Speisekarte und aktuellen Prozessen.",
      },
      {
        title: "Erste Prüfung",
        description: "Unser Team prüft die übermittelten Informationen und identifiziert Punkte, die vor der Schulung beachtet werden müssen.",
      },
      {
        title: "Teamschulung",
        description: "Das gesamte Team nimmt an der verpflichtenden Glútty-Schulung zu Zöliakie und Lebensmittelsicherheit teil.",
      },
      {
        title: "Prozessanpassungen",
        description:
          "Mit dem Erlernten überprüft das Restaurant Abläufe, die Trennung von Utensilien und die Kommunikation mit den Gästen.",
      },
      {
        title: "Zertifizierung",
        description: "Nach Abschluss der Schulung und Erklärung seiner Prozesse erhält das Restaurant das Glútty-Verifiziert-Siegel.",
      },
      {
        title: "Eintrag in der App",
        description: "Das Profil des Restaurants wird in der App veröffentlicht, mit Siegel, Speisekarte und geprüften Informationen.",
      },
      {
        title: "Bewertungen der Community",
        description: "Gäste mit Zöliakie beginnen, Gerichte, Service, Klarheit und gefühlte Sicherheit zu bewerten.",
      },
      {
        title: "Teilnahme an Events",
        description: "Das Restaurant nimmt fortan an Messen, Verkostungen und Aktionen der Glútty-Community teil.",
      },
    ],
  },
  statement: {
    words: ["Fürsorge", "Gemeinschaft", "Zugehörigkeit"],
  },
  regions: {
    selectorLabel: "Region",
    labels: { BR: "Brasilien", US: "USA", CH: "Schweiz" },
  },
  pricing: {
    eyebrow: "Partnerschaftspakete",
    title: "Ein Paket für jede Etappe Ihrer zöliakiesicheren Reise",
    description:
      "Wählen Sie das Paket, das zur aktuellen Größe Ihres Restaurants passt — und wechseln Sie jederzeit. Wählen Sie Ihre Region, um die passende Währung zu sehen.",
    mostPopularLabel: "Meistgewählt",
    recommendedForLabel: "Empfohlen für",
    priceNote: "Preise werden noch festgelegt — kontaktieren Sie uns per WhatsApp für ein individuelles Angebot.",
    ctaLabel: "Dieses Paket wählen",
    tiers: [
      {
        name: "Basic",
        recommendedFor: "Restaurants, die mit der Zertifizierung beginnen",
        features: [
          "Verpflichtende Mitarbeiterschulung (Kernmodul)",
          "Glútty-Verifiziert-Siegel",
          "Profil in der Glútty-App",
          "Bewertungen der Community",
        ],
      },
      {
        name: "Intermediate",
        recommendedFor: "Restaurants, die bereits Gäste mit Zöliakie bedienen und wachsen möchten",
        features: [
          "Alles aus Basic",
          "Hervorhebung in Suche und Empfehlungen der App",
          "Teilnahme an Glútty-Events",
          "Bevorzugter Support",
        ],
        highlighted: true,
      },
      {
        name: "Advanced",
        recommendedFor: "Ketten und Restaurants, die die glutenfreie Kategorie anführen wollen",
        features: [
          "Alles aus Intermediate",
          "Individuelle Prozessberatung",
          "Gemeinsame Marketingkampagnen mit Glútty",
          "Insight-Berichte aus der Community",
        ],
      },
    ],
  },
  faq: {
    eyebrow: "Häufige Fragen",
    title: "Alles, was Sie vor der Partnerschaft wissen müssen",
    description:
      "Wir haben die häufigsten Fragen von Restaurants gesammelt, die eine Partnerschaft mit Glútty prüfen.",
    items: [
      {
        title: "Wie viel kostet eine Glútty-Partnerschaft?",
        description:
          "Die Investition richtet sich nach dem gewählten Paket (Basic, Intermediate oder Advanced) und Ihrer Region (Brasilien, USA oder Schweiz). Sehen Sie sich die Pakete oben an oder kontaktieren Sie uns per WhatsApp für ein individuelles Angebot.",
      },
      {
        title: "Wie lange dauert die Mitarbeiterschulung?",
        description:
          "Die Pflichtschulung besteht aus Online-Modulen und einer praktischen Checkliste für Küche und Service und wird in wenigen Tagen abgeschlossen, ohne den Restaurantbetrieb zu unterbrechen.",
      },
      {
        title: "Unser Team hat eine hohe Fluktuation. Bleibt das Siegel trotzdem gültig?",
        description:
          "Ja. Wir empfehlen, neue Mitarbeitende sofort zu schulen — der Zugang zur Glútty-Schulung bleibt während der gesamten Partnerschaft ohne zusätzliche Kosten pro Person bestehen.",
      },
      {
        title: "Gibt es eine Exklusivität nach Stadtteil oder Stadt?",
        description:
          "Nein. Glútty begrenzt die Anzahl der Partnerrestaurants pro Region nicht — unser Ziel ist es, der Zöliakie-Community möglichst viele sichere Optionen zu bieten.",
      },
      {
        title: "Garantiert das Glútty-Verifiziert-Siegel 100 % Schutz vor Kreuzkontamination?",
        description:
          "Nein. Das Siegel steht für ein öffentliches Bekenntnis zu Transparenz, Schulung und stetiger Prozessverbesserung — Zöliakie erfordert jedoch täglich kontinuierliche Sorgfalt des gesamten Teams.",
      },
    ],
  },
  ctaFinal: {
    eyebrow: "Werden Sie Teil von Glútty",
    title: "Bereiten Sie Ihr Restaurant darauf vor, die Zöliakie-Community besser willkommen zu heißen.",
    description:
      "Füllen Sie das Formular unten aus — unser Team meldet sich per WhatsApp und stellt Ihnen das passende Paket vor.",
    ctaSecondary: "Unsere Leistungen ansehen",
    reassurance: ["Ohne Verpflichtung", "Antwort innerhalb von 1 Werktag", "Support auf Portugiesisch, Englisch und Deutsch"],
    form: {
      restaurantLabel: "Name des Restaurants",
      restaurantPlaceholder: "Z. B. Maria's Küche",
      nameLabel: "Ihr Name",
      namePlaceholder: "Z. B. Hans Müller",
      regionLabel: "Region Ihres Restaurants",
      cityLabel: "Stadt",
      cityPlaceholder: "Z. B. Zürich",
      phoneLabel: "WhatsApp-Nummer",
      phonePlaceholder: "(000) 000 00 00",
      messageLabel: "Erzählen Sie uns kurz von Ihrem Restaurant",
      messagePlaceholder: "Art der Küche, Teamgröße, Fragen...",
      submitLabel: "Ich möchte Glútty-Partner werden",
    },
  },
  footer: {
    description:
      "Glútty verbindet die Zöliakie-Community mit vorbereiteten, geschulten und transparenten Restaurants — damit Essengehen zunehmend zu einem sorgenfreien Erlebnis wird.",
    exploreHeading: "Entdecken",
    contatoHeading: "Kontakt",
    partnerLink: "Partner werden",
    legalText: "Das Glútty-Verifiziert-Siegel garantiert kein vollständiges Fehlen des Risikos einer Kreuzkontamination.",
  },
};

export const translations = { pt, en, de };
export type Lang = keyof typeof translations;
