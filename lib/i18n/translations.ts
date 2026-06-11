export const SUPPORTED_LANGUAGES = ["pt", "en"] as const;
export type Language = (typeof SUPPORTED_LANGUAGES)[number];

export const DEFAULT_LANGUAGE: Language = "pt";

const pt = {
  idioma: {
    title: "Selecione o idioma",
    subtitle: "Choose your language · Sprache auswählen",
    continue: "Continuar",
  },
  welcome: {
    slides: [
      {
        title: "Coma fora sem ansiedade.\nPela primeira vez.",
        subtitle: "Tenha acesso a detalhes que ajudam você a escolher com mais confiança.",
        bullets: [
          "Veja experiências de outros usuários",
          "Entenda melhor os riscos",
          "Escolha com mais confiança",
        ],
      },
      {
        title: "Mais clareza\nantes de escolher",
        subtitle: "Use filtros inteligentes para encontrar lugares mais adequados para você.",
        bullets: [
          "Pratos com certificação celíaca",
          "Sem risco de contaminação cruzada",
          "Ingredientes verificados",
        ],
      },
      {
        title: "Baseado em experiências\nde outros celíacos.",
        subtitle: "Veja avaliações e recomendações de quem já passou por lá.",
        bullets: [
          "Avaliações de celíacos reais",
          "Experiências compartilhadas",
          "Comunidade ativa e engajada",
        ],
      },
    ],
    createAccount: "Criar conta grátis",
    haveAccount: "Já tenho conta",
  },
  login: {
    headerTitle: "Entrar",
    title: "Bem-vindo de volta!",
    subtitle: "Acesse sua conta para continuar.",
    email: "E-mail",
    emailPlaceholder: "seu@email.com",
    password: "Senha",
    passwordPlaceholder: "sua senha",
    forgotPassword: "Esqueceu a senha?",
    submit: "Entrar",
    orContinueWith: "ou entre com",
    noAccount: "Ainda não tem conta?",
    createAccount: "Criar conta →",
  },
  cadastro: {
    headerTitle: "Criar conta",
    title: "Cadastro",
    subtitle: "Crie sua conta para começar",
    name: "Nome",
    namePlaceholder: "Seu nome completo",
    email: "E-mail",
    emailPlaceholder: "seu@email.com",
    password: "Senha",
    passwordPlaceholder: "mínimo 8 caracteres",
    passwordStrength: {
      weak: "Fraca",
      medium: "Média",
      strong: "Forte",
      label: "Senha {strength}",
    },
    submit: "Cadastrar",
    haveAccount: "Já tem conta?",
    login: "Fazer login",
  },
  esqueciSenha: {
    title: "Esqueceu a\nsenha?",
    subtitle: "Sem problema! Digite seu e-mail e enviaremos um link para você criar uma nova senha.",
    email: "E-mail",
    emailPlaceholder: "seu@email.com",
    submit: "Enviar link",
    rememberedPassword: "Lembrou a senha?",
    login: "Entrar",
    sentTitle: "E-mail enviado!",
    sentSubtitlePrefix: "Enviamos um link para",
    sentHint: "Verifique sua caixa de entrada e a pasta de spam. O link é válido por 30 minutos.",
    backToLogin: "Voltar ao login",
    resend: "Não recebi o e-mail — reenviar",
  },
  onboarding: {
    step1: {
      title: "Vamos definir o que\né seguro para você?",
      subtitle: "Personalize sua experiência para encontrar restaurantes seguros para você.",
      cta: "Vamos sim!",
      skip: "Agora não",
    },
    skipConfirm: {
      title: "Prefere configurar isso depois?",
      subtitle: "Definir suas restrições ajuda a encontrar opções mais seguras.",
      description: "Você pode adicionar ou ajustar suas restrições a qualquer momento no perfil.",
      cta: "Definir agora",
      skip: "Agora não",
    },
    skipFinal: {
      title: "Vamos aplicar um padrão de segurança baseado em pessoas com restrição ao glúten.",
      description: "Você pode ajustar suas restrições a qualquer momento no seu perfil.\n\nSem personalização, algumas recomendações podem não refletir totalmente suas necessidades.",
      cta: "Definir agora",
      skip: "Continuar sem personalizar",
    },
    step2: {
      progress: "Etapa 1 de 3",
      title: "O que excluir do\nseu cardápio?",
      subtitle: "Selecione o que você não pode consumir.",
      glutenWarning: "O Glútty é focado em pessoas com restrição ao glúten, por isso essa opção permanece ativa.",
      customPlaceholder: "Outra restrição",
      cta: "Continuar",
      skip: "Agora não",
    },
    ingredientes: {
      progress: "Etapa 2 de 3",
      title: "Algo te faz mal\nao consumir?",
      subtitle: "Não é uma alergia, mas você passa mal quando consome. Selecione ou escreva os ingredientes.",
      customPlaceholder: "Outra restrição",
      ctaSave: "Salvar e continuar",
      cta: "Continuar",
      skip: "Pular",
    },
    success: {
      progress: "Etapa 3 de 3",
      title: "Parabéns!",
      subtitle: "Seu padrão de segurança alimentar foi definido com sucesso!",
      description: "Você pode alterar ou adicionar novas restrições direto no seu perfil",
      cta: "Avançar",
    },
    allergenLabels: {},
    problemSuggestions: {},
  },
  preparando: {
    steps: [
      "Identificando suas restrições alimentares...",
      "Filtrando pratos compatíveis com você...",
      "Mapeando restaurantes alinhados ao seu perfil...",
      "Preparando suas recomendações seguras...",
    ],
    title: "Preparando sua experiência personalizada",
    subtitle: "Estamos configurando sua experiência com base nas suas escolhas.",
    doneTitle: "Tudo pronto!",
    doneSubtitle: "Sua experiência foi personalizada. Bem-vinda ao Glútty!",
  },
  preparandoPadrao: {
    steps: [
      "Aplicando um padrão de segurança inicial...",
      "Filtrando opções com base nesse padrão...",
      "Mostrando restaurantes mais seguros para você...",
      "Preparando sua experiência...",
    ],
    title: "Preparando sua\nexperiência",
    subtitle: "Estamos usando um padrão de segurança para começar.",
    doneTitle: "Tudo pronto!",
    doneSubtitle: "Estamos usando um padrão de segurança para começar. Bem-vindo ao Glútty!",
  },
  bottomNav: {
    inicio: "Início",
    restaurantes: "Restaurantes",
    favoritos: "Favoritos",
    comunidade: "Comunidade",
    perfil: "Perfil",
  },
  home: {
    greeting: { morning: "Bom dia", afternoon: "Boa tarde", evening: "Boa noite" },
    question: "Aonde você quer comer hoje?",
    searchPlaceholder: "Cidade ou país…",
    recentSearches: "Buscas recentes",
    suggestions: "Sugestões",
    locationTypes: { cidade: "Cidade", estado: "Estado", pais: "País" },
    clearHistory: "Limpar histórico",
    resultsFor: "Resultados para {location} · com base no seu perfil",
    promo: {
      badge: "NOVO",
      title: "Novos restaurantes\nrecomendados",
      subtitle: "Baseado no seu padrão de segurança",
      cta: "Ver agora →",
    },
    categoriesTitle: "Categorias celíaca",
    seeAll: "Ver todos",
    categories: [
      "Mais\nseguros",
      "Festa sem\nglúten",
      "Para a\nfamília",
      "Doces sem\nglúten",
      "Para sair\ncom amigos",
    ],
    recommendedTitle: "Recomendado para você",
    nearbyPrefix: "Mais próximos de {location}",
    noResultsTitle: "Nada encontrado em {location}",
    noResultsSubtitle: "Mostrando os restaurantes mais próximos dessa região",
    mostNearby: "Mais próximos",
    bestForCeliacs: { title: "Melhores para celíacos", subtitle: "Avaliados pela comunidade" },
    recommendedDishes: { title: "Pratos recomendados", nearbyPrefix: "Próximos de {location}" },
    nearbyDishesLabel: "Pratos próximos",
    topRated: { title: "Bem avaliados próximo de você", subtitle: "Avaliações de celíacos verificados" },
    verified: "Verificado",
    feedback: "Feedback",
    viewAllFeedbacks: "Ver todos os feedbacks deste prato",
    reviewersCount: "+{count} celíacos avaliaram",
    seeWhatTheySay: "Veja o que estão dizendo",
    viewFeedbacks: "Ver feedbacks",
    safetySheet: { title: "Padrão de segurança", subtitle: "Filtra os restaurantes exibidos" },
    safetyOptionDescriptions: {
      certificado: "Altamente avaliado e recomendado por celíacos",
      muito_seguro: "Protocolo rigoroso, sem risco de contaminação",
      verificado: "Verificado e aprovado pela comunidade Glútty",
      seguro: "Adaptações disponíveis com cuidado",
      moderado: "Pratos sem glúten, atenção à contaminação",
    },
    dishPreviews: {
      dd1: { comment: "A Marguerita da Pizza For Fun é perfeita — massa crocante, sem glúten de verdade. Não tive nenhuma reação!", date: "há 2 dias" },
      dd2: { comment: "O pão francês do Grão Fino é incrível, parece um pão normal de padaria. A equipe sabe muito sobre celíaca!", date: "há 3 dias" },
      dd3: { comment: "A tarte de framboesa da Jackie's é uma obra de arte — linda e deliciosa. 100% sem glúten e sem sintomas.", date: "há 1 semana" },
      dd4: { comment: "O bowl da Libera é fresquinho e nutritivo. Ambiente acolhedor e totalmente seguro para celíacos.", date: "há 4 dias" },
      dd5: { comment: "A Marinara do Granò é autentica — masa napolitana, sem glúten. Uma das melhores pizzas que já comi na Suíça!", date: "há 5 dias" },
      dd6: { comment: "As brioches da À VIE são leves e macias demais. Nunca imaginei que sem glúten poderia ser tão bom!", date: "há 2 dias" },
    },
    topReviews: {
      r1: { comment: "Frequento há 4 anos. Nunca tive nenhuma reação. A equipe conhece celíaca de verdade, não é só marketing. Prato favorito: o tagliatelle de arroz.", tags: ["Sem contaminação", "Equipe bem informada", "Me senti seguro"] },
      r3: { comment: "O Pandan é incrível — comi um pão francês sem glúten que parecia de verdade. A equipe entende muito de celíaca e me fiz segura do início ao fim.", tags: ["Me senti seguro", "Voltaria com certeza", "Cardápio claro"] },
      r6: { comment: "O Haus Hiltl é incrível — cada item do buffet tem etiqueta com alérgenos e a equipe fala sobre celíaca com naturalidade.", tags: ["Sem contaminação", "Equipe bem informada", "Ambiente limpo"] },
    },
  },
  common: {
    closed: "Fechado",
    open: "Aberto agora",
    ratedDishPhoto: "Prato avaliado",
    dishPhoto: "Foto do prato",
  },
  favoritos: {
    title: "Favoritos",
    subtitle: "Seus lugares seguros",
    emptyTitle: "Nenhum favorito ainda",
    emptySubtitle: "Toque no coração dos restaurantes que você ama para salvá-los aqui.",
  },
  comunidade: {
    title: "Comunidade",
    subtitle: "Experiências reais de celíacos",
    searchPlaceholder: "Buscar por restaurante ou usuário...",
    stats: { reviews: "Avaliações", restaurants: "Restaurantes", celiacs: "Celíacos" },
    verifiedBanner: { title: "Avaliações verificadas", subtitle: "Feedbacks reais — o restaurante não pode alterar avaliações." },
    recentReviews: "Avaliações recentes",
    helpful: "útil",
    comment: "Comentar",
    reviews: {
      "1": { comment: "Melhor restaurante para celíacos de SP! Me sinto completamente segura aqui. O atendimento é impecável e a comida é deliciosa.", tags: ["Sem contaminação", "Equipe bem informada", "Me senti seguro"] },
      "2": { comment: "Fui com minha filha celíaca e foi uma experiência incrível. Pela primeira vez ela pode comer de tudo no cardápio sem preocupação!", tags: ["Voltaria com certeza", "Cardápio claro", "Equipe bem informada"] },
      "3": { comment: "Ambiente lindo e comida deliciosa. Eles realmente entendem sobre celíaca! Voltarei com certeza.", tags: ["Ambiente limpo", "Me senti seguro", "Sem contaminação"] },
      "4": { comment: "Boa experiência. O nhoque sem glúten é delicioso e o atendente foi atencioso ao explicar os processos.", tags: ["Cardápio claro", "Precisa melhorar"] },
    },
  },
  notificacoes: {
    title: "Notificações",
    subtitle: "Fique por dentro das novidades",
    markAll: "Marcar todas",
    newSection: "Novas",
    previousSection: "Anteriores",
    emptyTitle: "Tudo em dia!",
    emptySubtitle: "Você não tem nenhuma notificação no momento.",
    items: {
      "1": { title: "Alerta de segurança", body: "Cantina da Nona atualizou seu cardápio. Verifique as novas opções sem glúten.", time: "Agora" },
      "2": { title: "Novo restaurante perto de você", body: "Verde & Saudável foi adicionado na sua área. Cardápio 100% sem glúten.", time: "15 min" },
      "3": { title: "Sua avaliação foi útil!", body: "12 celíacos marcaram sua avaliação do Sabor Brasil como útil.", time: "1h" },
      "4": { title: "Aviso de contaminação cruzada", body: "Um usuário relatou possível contaminação cruzada no Bistrô Gourmet. Tenha atenção.", time: "3h" },
      "5": { title: "Restaurante favorito atualizado", body: "Sabor Brasil adicionou 3 novos pratos sem glúten ao cardápio.", time: "5h" },
      "6": { title: "Alguém respondeu sua avaliação", body: "O dono do Cantina da Nona respondeu à sua avaliação de 5 estrelas.", time: "Ontem" },
      "7": { title: "Boas-vindas ao Glútty!", body: "Você está protegida. Explore restaurantes seguros perto de você.", time: "2 dias" },
    },
  },
  safetyBadge: {
    muito_seguro: { label: "Muito seguro" },
    seguro: { label: "Seguro" },
    certificado: { label: "Bem avaliado por celíacos", labelSm: "Bem avaliado" },
    moderado: { label: "Adaptável" },
    cuidado: { label: "Cuidado" },
    verificado: { label: "Seguro" },
    novo: { label: "Bem avaliado por celíacos", labelSm: "Bem avaliado" },
    recomendado: { label: "Muito seguro" },
  },
  busca: {
    title: "Restaurantes",
    subtitle: "Avaliados por celíacos",
    searchPlaceholder: "Cidade ou país…",
    recentSearches: "Buscas recentes",
    suggestions: "Sugestões",
    locationTypes: { cidade: "Cidade", estado: "Estado", pais: "País" },
    clearHistory: "Limpar histórico",
    categories: { pizza: "Pizza", hamburguer: "Hambúrguer", japonesa: "Japonesa", mexicana: "Mexicana", churrasco: "Churrasco" },
    notFoundTitle: "Nada encontrado em {location}",
    notFoundSubtitle: "Mostrando os mais próximos dessa região",
    countIn: "{count} em {location}",
    countNearby: "{count} mais próximos",
    moreNearby: "+{count} próximos",
    closestLabel: "MAIS PRÓXIMOS",
  },
  categoria: {
    seeAll: "Ver todos",
    nearbyTitle: "Perto de você",
    communityTitle: "Recomendados pela comunidade",
    productsTitle: "Produtos relacionados",
    gettingLocation: "Obtendo sua localização...",
    showingResultsNear: "Mostrando resultados {location}",
    showingResultsFor: "Mostrando resultados para {location} · ative sua localização para resultados mais próximos",
    noResultsFound: 'Nenhum restaurante encontrado para "{query}".',
    nearYouLabel: "perto de você",
    defaultLocation: "São Paulo",
    configs: {
      "mais-seguros": {
        title: "Mais seguros",
        description: "Restaurantes com os protocolos mais rigorosos contra contaminação cruzada, pensados para quem não pode arriscar.",
        searchPlaceholder: "Buscar restaurantes mais seguros...",
      },
      "festa": {
        title: "Festa sem glúten",
        description: "Lugares perfeitos para comemorar com tranquilidade — petiscos, bolos e bebidas sem glúten para curtir sem preocupação.",
        searchPlaceholder: "Buscar lugares para festejar...",
      },
      "familia": {
        title: "Para a família",
        description: "Ambientes acolhedores e cardápios variados, ideais para refeições em família com opções seguras para todos.",
        searchPlaceholder: "Buscar restaurantes para a família...",
      },
      "doces": {
        title: "Doces sem glúten",
        description: "De bolos a brigadeiros, confeitarias e doces que provam que sem glúten pode ser ainda mais gostoso.",
        searchPlaceholder: "Buscar doces e confeitarias...",
      },
      "amigos": {
        title: "Para sair com amigos",
        description: "Bares, restaurantes e cafés para curtir momentos em grupo com tranquilidade e boas indicações da comunidade.",
        searchPlaceholder: "Buscar lugares para curtir com amigos...",
      },
    },
  },
  configuracoes: {
    title: "Configurações",
    subtitle: "Personaliza o seu aplicativo",
    sections: {
      language: "Idioma",
      notifications: "Notificações",
      appearance: "Aparência",
      security: "Segurança e privacidade",
      help: "Ajuda e suporte",
      about: "Sobre o Glútty",
    },
    appLanguage: "Idioma do app",
    currentLanguageName: "Português",
    notificationRows: {
      safety:  { label: "Alertas de segurança",        description: "Avisos sobre contaminação cruzada e atualizações de restaurantes" },
      new:     { label: "Novos restaurantes",          description: "Quando um restaurante seguro é adicionado perto de você" },
      reviews: { label: "Respostas às avaliações",     description: "Quando alguém responde ou curte sua avaliação" },
      promo:   { label: "Novidades e promoções",       description: "Dicas, novidades e conteúdos da comunidade Glútty" },
    },
    appearanceRows: {
      darkMode:  { label: "Modo escuro", description: "Usar tema escuro no aplicativo" },
      vibration: { label: "Vibração",    description: "Feedback tátil ao interagir com o app" },
    },
    security: {
      pattern: "Padrão de segurança",
      patternValue: "Muito seguro",
      dataPrivacy: "Dados e privacidade",
      deleteAccount: "Excluir conta",
    },
    help: {
      helpCenter: "Central de ajuda",
      contactUs: "Fale conosco",
      reportProblem: "Reportar um problema",
    },
    about: {
      version: "Versão do app",
      terms: "Termos de uso",
      privacyPolicy: "Política de privacidade",
      rateApp: "Avaliar o Glútty",
    },
    languageNames: {},
  },
  perfil: {
    title: "Meu Perfil",
    subtitle: "Suas informações e preferências",
    cancel: "Cancelar",
    save: "Salvar",
    viewPublic: "Ver público",
    edit: "Editar",
    location: "Zurique, Suíça",
    aboutMe: "Sobre mim",
    bioPlaceholder: "Conte um pouco sobre você — há quanto tempo é celíaca, onde mora, como lida com a dieta...",
    foodProfile: {
      title: "Perfil Alimentar",
      subtitle: "Personaliza suas recomendações e contextualiza avaliações",
      diagnosis: "Diagnóstico",
      celiac: "Celíaca",
      notRemovable: "· não removível",
      myRestrictions: "Minhas restrições",
      prohibitedIngredients: "Ingredientes proibidos",
    },
    ingredients: {
      trigo: "Trigo", cevada: "Cevada", malte: "Malte", leite: "Leite", aveia: "Aveia", centeio: "Centeio",
    },
    journey: {
      title: "Sua jornada no Glútty",
      since: "Desde Jan 2023",
      stats: {
        restaurants: "Restaurantes\nseguros",
        dishes: "Pratos\nexperimentados",
        reviews: "Avaliações\nfeitas",
        favorites: "Favoritos\nsalvos",
      },
    },
    recentActivity: {
      title: "Atividade recente",
      seeAll: "Ver todas",
      items: {
        "1": { title: "Le Manjue Organique", subtitle: "Avaliado há 3 dias" },
        "2": { title: "Risoto de cogumelos", subtitle: "Favorito salvo há 1 semana" },
      },
    },
    settingsSection: {
      title: "Configurações",
      items: { language: "Idioma", help: "Ajuda e suporte", about: "Sobre o Glútty" },
    },
    logout: "Sair da conta",
  },
  perfilPublico: {
    title: "Meu perfil público",
    subtitle: "Assim outros usuários te veem",
    reviewsCount: "avaliações",
    memberSince: "desde {date}",
    bio: "Sou celíaca há 10 anos, moro em Zurique e evito lugares onde pode ocorrer contaminação cruzada.",
    restrictions: { celiac: "Celíaca", glutenFree: "Sem Glúten", lactoseFree: "Sem Lactose", nutFree: "Sem Nozes" },
    doesNotEat: "Não consome",
    triedDishes: { title: "Pratos experimentados", count: "{count} pratos" },
    reviewedRestaurants: { title: "Restaurantes avaliados", count: "{count} avaliações" },
    microcopy: "Avaliações baseadas no perfil alimentar desta usuária. Sua experiência pode variar.",
    dishes: {
      d1: "Risoto de Cogumelos GF",
      d2: "Bowl de Quinoa",
      d3: "Prato do dia vegetariano",
      d4: "Nhoque sem glúten",
    },
    reviews: {
      r1: { comment: "Melhor restaurante para celíacos de SP!", tags: ["Sem contaminação", "Me senti seguro"] },
      r2: { comment: "Ambiente lindo, eles entendem sobre celíaca!", tags: ["Ambiente limpo", "Sem contaminação"] },
      r3: { comment: "Melhor vegetariano de Zurique, muito bem avaliado por celíacos.", tags: ["Bem avaliado GF", "Voltaria com certeza"] },
    },
  },
  restricoes: {
    title: "Editar restrições",
    subtitle: "Suas alergias e intolerâncias",
    glutenNotice: "O Glútty é focado em pessoas com restrição ao glúten, por isso essa opção permanece ativa.",
    dietarySection: { title: "Restrições alimentares", subtitle: "Selecione o que você não pode consumir." },
    ingredientsSection: { title: "Ingredientes proibidos", subtitle: "Toque para marcar ingredientes que você não pode consumir." },
    customPlaceholder: "Outra restrição",
    saveButton: "Salvar alterações",
    savedButton: "✓ Salvo!",
    restrictionLabels: {
      sem_gluten: "Sem glúten", sem_lactose: "Sem lactose", sem_nozes: "Sem nozes", sem_ovo: "Sem ovo",
      vegano: "Vegano", vegetariano: "Vegetariano", sem_soja: "Sem soja", sem_amendoim: "Sem amendoim",
      sem_frutos: "Sem frutos do mar",
    },
    ingredientNames: {},
  },
  seguranca: {
    title: "Padrão de segurança",
    subtitle: "Defina o que deve ser evitado nas suas recomendações",
    baseSection: { title: "Base do app", description: "O Glútty sempre considera opções sem glúten" },
    restrictionsSection: { title: "Suas restrições alimentares" },
    glutenWarning: "O Glútty é focado em pessoas com restrição ao glúten, por isso essa opção permanece ativa.",
    customRestrictionPlaceholder: "+ Outra restrição",
    avoidSection: { title: "Ingredientes que você evita", subtitle: "Serão apenas sinalizados nos pratos — você decide." },
    customIngredientPlaceholder: "Outro ingrediente",
    safetyLevelSection: { title: "Nível de segurança" },
    safetyLevels: {
      muito_seguro: { label: "Muito seguro", description: "Menor risco possível de contaminação cruzada" },
      seguro: { label: "Seguro", description: "Inclui opções com boas práticas anti-contaminação" },
      flexivel: { label: "Flexível", description: "Mais opções disponíveis, com possíveis riscos" },
    },
    saveButton: "Salvar alterações",
    allergenLabels: {
      gluten: "Glúten", lactose: "Lactose", frutose: "Frutose", caseina: "Caseína",
      oleaginosas: "Oleaginosas", histamina: "Histamina", sulfitos: "Sulfitos", ovos: "Ovos",
      amendoim: "Amendoim", soja: "Soja", frutos_do_mar: "Frutos do Mar", mostarda: "Mostarda",
      gergelim: "Gergelim", tremoco: "Tremoço", outras: "Outras", proteina_veg: "Proteína vegetal",
    },
    problemSuggestions: {},
  },
  restaurante: {
    headerTitle: "Restaurante",
    reviewsCount: "{count} avaliações",
    tabs: { sobre: "Sobre", pratos: "Pratos", avaliacoes: "Avaliações" },
    about: {
      title: "Sobre o restaurante",
      restrictionsTitle: "Restrições atendidas",
      galleryTitle: "Fotos do restaurante",
      comingSoon: "Em breve",
      mainDishesTitle: "Pratos principais",
      crossContaminationTitle: "Controle de contaminação cruzada",
      safetyProceduresTitle: "Procedimentos de segurança",
      disclaimer: "Informações fornecidas pelo restaurante. Confirme sempre essas informações diretamente com o restaurante antes de consumir.",
      contactTitle: "Informações de contato",
      chefLabel: "Chefe de cozinha",
      incompatibleDish: "Prato incompatível — sem adaptação disponível.",
      requestAdaptation: "Solicitar adaptação",
      adaptable: "Adaptável",
      safe: "Seguro",
    },
    dishes: {
      empty: "Cardápio não disponível ainda",
      certified: "Aprovado por celíacos",
      declaredIngredients: "Ingredientes declarados:",
    },
    reviews: {
      verified: "Verificado",
      writeReview: "Avaliar este restaurante",
      safetyLevels: { muito_seguro: "Muito seguro", seguro: "Seguro", moderado: "Moderado", nao_seguro: "Não seguro" },
      contamLabels: { nenhum: "Sem contaminação", pequeno: "Pequeno risco", alto: "Alto risco", nao_sei: "Risco incerto" },
      teamLabels: { total: "Equipe preparada", parcial: "Equipe parcial", nao_sabiam: "Equipe despreparada", nao_perguntei: "Não verificado" },
    },
  },
  avaliar: {
    successTitle: "Avaliação enviada!",
    successMessageLine1: "Obrigado por ajudar outros celíacos",
    successMessageLine2: "a se alimentarem com segurança.",
    successNote: "Sua avaliação contribuirá para o score de segurança do restaurante.",
    backToRestaurant: "Voltar ao restaurante",
    headerTitle: "Avaliar restaurante",
    headerSubtitle: "Compartilhe sua experiência com a comunidade",
    chefLabel: "Chef responsável: {name} Cozinha",
    visitDatePrompt: "Quando você visitou?",
    respondButton: "Responder",
    sections: {
      safety: { title: "Quão seguro você se sentiu?", subtitle: "Pergunta principal — obrigatória" },
      contam: { title: "Risco de contaminação cruzada?", subtitle: "Houve sinais de contato com glúten?" },
      team: { title: "A equipe sabia sobre dieta SG?", subtitle: "Demonstraram conhecimento sobre celíaca?" },
      structure: { title: "Estrutura do local", subtitle: "Pode selecionar mais de um" },
      dishes: { title: "O que você comeu?", subtitle: "Informe os pratos (opcional)" },
      stars: { title: "Avaliação geral", subtitle: "Nota e comentário (opcional)" },
      photo: { title: "Adicionar foto", subtitle: "Prato, menu ou local (opcional)" },
      tags: { title: "Destaques rápidos", subtitle: "Tags que resumem sua visita (opcional)" },
    },
    safetyLabels: { muito_seguro: "Muito seguro para mim", seguro: "Seguro para mim", moderado: "Moderado", nao_seguro: "Não me senti seguro" },
    contamLabels: { nenhum: "Nenhum risco", pequeno: "Pequeno risco", alto: "Alto risco", nao_sei: "Não sei dizer" },
    teamLabels: { total: "Sim, total confiança", parcial: "Parcialmente", nao_sabiam: "Não sabiam", nao_perguntei: "Não perguntei" },
    structureOptions: {},
    dishPlaceholder: "Prato {n}...",
    addDish: "Adicionar prato",
    starLabels: ["Toque para avaliar", "Muito ruim", "Ruim", "Regular", "Bom", "Excelente!"],
    commentPlaceholder: "Comentário opcional...",
    photoCta: "Toque para adicionar foto",
    quickTags: {},
    starsSummary: { singular: "{count} estrela", plural: "{count} estrelas" },
    tagsSelected: { singular: "{count} selecionada", plural: "{count} selecionadas" },
    microcopy: "Sua avaliação ajuda outras pessoas celíacas a tomarem decisões mais seguras.",
    submitting: "Enviando...",
    submit: "Enviar avaliação",
    submitHint: "Responda segurança e contaminação para continuar",
  },
  prato: {
    notFound: "Prato não encontrado.",
    adaptationApplied: "Adaptação aplicada",
    adaptationDesc: "Este prato foi adaptado às suas restrições. Verifique os ingredientes substituídos abaixo.",
    ingredients: "Ingredientes",
    legendSafe: "Alinhado ao seu perfil de segurança",
    legendSubstituted: "Substituído",
    contamWarning: "Pode haver risco de contaminação cruzada. Confirme com o restaurante antes de consumir.",
    dishInfo: "Informações do prato",
    restaurantLabel: "Restaurante",
    chefLabel: "Chef",
    safetyLevelLabel: "Nível de segurança",
    crossContamPrepTitle: "Como evitam a contaminação cruzada",
    crossContamPrepFallback:
      "O restaurante segue boas práticas para evitar contaminação cruzada neste prato, como uso de utensílios e equipamentos separados para o preparo sem glúten. Confirme os detalhes com a equipe.",
    restrictionsMet: "Restrições atendidas",
    otherDishes: "Outros pratos que você pode gostar",
    viewDish: "Ver prato →",
    viewRestaurant: "Ver restaurante completo",
    contactTitle: "Contato do restaurante",
    phoneLabel: "Telefone",
    addressLabel: "Endereço",
    websiteLabel: "Site",
    hoursLabel: "Horário de funcionamento",
  },
} satisfies Translations;

const en: Translations = {
  idioma: {
    title: "Select your language",
    subtitle: "Selecione o idioma · Sprache auswählen",
    continue: "Continue",
  },
  welcome: {
    slides: [
      {
        title: "Eat out without anxiety.\nFor the first time.",
        subtitle: "Get access to details that help you choose with more confidence.",
        bullets: [
          "See other users' experiences",
          "Better understand the risks",
          "Choose with more confidence",
        ],
      },
      {
        title: "More clarity\nbefore you choose",
        subtitle: "Use smart filters to find places that suit you best.",
        bullets: [
          "Dishes with celiac certification",
          "No cross-contamination risk",
          "Verified ingredients",
        ],
      },
      {
        title: "Based on experiences\nfrom other celiacs.",
        subtitle: "See reviews and recommendations from people who've been there.",
        bullets: [
          "Reviews from real celiacs",
          "Shared experiences",
          "Active and engaged community",
        ],
      },
    ],
    createAccount: "Create free account",
    haveAccount: "I already have an account",
  },
  login: {
    headerTitle: "Sign in",
    title: "Welcome back!",
    subtitle: "Access your account to continue.",
    email: "Email",
    emailPlaceholder: "you@email.com",
    password: "Password",
    passwordPlaceholder: "your password",
    forgotPassword: "Forgot your password?",
    submit: "Sign in",
    orContinueWith: "or continue with",
    noAccount: "Don't have an account yet?",
    createAccount: "Create account →",
  },
  cadastro: {
    headerTitle: "Create account",
    title: "Sign up",
    subtitle: "Create your account to get started",
    name: "Name",
    namePlaceholder: "Your full name",
    email: "Email",
    emailPlaceholder: "you@email.com",
    password: "Password",
    passwordPlaceholder: "minimum 8 characters",
    passwordStrength: {
      weak: "Weak",
      medium: "Medium",
      strong: "Strong",
      label: "{strength} password",
    },
    submit: "Sign up",
    haveAccount: "Already have an account?",
    login: "Sign in",
  },
  esqueciSenha: {
    title: "Forgot your\npassword?",
    subtitle: "No problem! Enter your email and we'll send you a link to create a new password.",
    email: "Email",
    emailPlaceholder: "you@email.com",
    submit: "Send link",
    rememberedPassword: "Remembered your password?",
    login: "Sign in",
    sentTitle: "Email sent!",
    sentSubtitlePrefix: "We sent a link to",
    sentHint: "Check your inbox and spam folder. The link is valid for 30 minutes.",
    backToLogin: "Back to sign in",
    resend: "Didn't get the email — resend",
  },
  onboarding: {
    step1: {
      title: "Let's define what's\nsafe for you?",
      subtitle: "Customize your experience to find restaurants that are safe for you.",
      cta: "Let's do it!",
      skip: "Not now",
    },
    skipConfirm: {
      title: "Prefer to set this up later?",
      subtitle: "Defining your restrictions helps you find safer options.",
      description: "You can add or adjust your restrictions anytime in your profile.",
      cta: "Set up now",
      skip: "Not now",
    },
    skipFinal: {
      title: "We'll apply a safety standard based on people with gluten restrictions.",
      description: "You can adjust your restrictions anytime in your profile.\n\nWithout personalization, some recommendations may not fully reflect your needs.",
      cta: "Set up now",
      skip: "Continue without personalizing",
    },
    step2: {
      progress: "Step 1 of 3",
      title: "What should be\nexcluded from your menu?",
      subtitle: "Select what you can't consume.",
      glutenWarning: "Glútty is focused on people with gluten restrictions, so this option stays active.",
      customPlaceholder: "Other restriction",
      cta: "Continue",
      skip: "Not now",
    },
    ingredientes: {
      progress: "Step 2 of 3",
      title: "Does anything make\nyou feel unwell?",
      subtitle: "Not an allergy, but you feel unwell when you eat it. Select or write the ingredients.",
      customPlaceholder: "Other restriction",
      ctaSave: "Save and continue",
      cta: "Continue",
      skip: "Skip",
    },
    success: {
      progress: "Step 3 of 3",
      title: "Congratulations!",
      subtitle: "Your food safety profile has been set up successfully!",
      description: "You can change or add new restrictions directly in your profile",
      cta: "Next",
    },
    allergenLabels: {
      gluten: "Gluten", lactose: "Lactose", frutose: "Fructose", caseina: "Casein",
      oleaginosas: "Tree nuts", histamina: "Histamine", sulfitos: "Sulfites", ovos: "Eggs",
      amendoim: "Peanut", soja: "Soy", frutos_do_mar: "Shellfish", mostarda: "Mustard",
      gergelim: "Sesame", tremoco: "Lupin", outras: "Other", proteina_veg: "Plant protein",
    },
    problemSuggestions: {
      "Trigo": "Wheat", "Cevada": "Barley", "Malte": "Malt", "Centeio": "Rye", "Aveia": "Oats",
      "Leite": "Milk", "Queijo": "Cheese", "Manteiga": "Butter", "Iogurte": "Yogurt",
      "Ovo": "Egg", "Clara de ovo": "Egg white",
      "Castanha": "Chestnut", "Nozes": "Walnuts", "Amêndoa": "Almond",
      "Amendoim": "Peanut", "Soja": "Soy", "Tofu": "Tofu",
      "Camarão": "Shrimp", "Peixe": "Fish", "Atum": "Tuna",
      "Tomate": "Tomato", "Vinagre": "Vinegar", "Embutido": "Processed meat",
      "Mel": "Honey", "Maçã": "Apple", "Cebola": "Onion", "Alho": "Garlic", "Pimenta": "Pepper",
    },
  },
  preparando: {
    steps: [
      "Identifying your dietary restrictions...",
      "Filtering dishes that match you...",
      "Mapping restaurants aligned with your profile...",
      "Preparing your safe recommendations...",
    ],
    title: "Preparing your personalized experience",
    subtitle: "We're setting up your experience based on your choices.",
    doneTitle: "All set!",
    doneSubtitle: "Your experience has been personalized. Welcome to Glútty!",
  },
  preparandoPadrao: {
    steps: [
      "Applying an initial safety standard...",
      "Filtering options based on this standard...",
      "Showing the safest restaurants for you...",
      "Preparing your experience...",
    ],
    title: "Preparing your\nexperience",
    subtitle: "We're using a safety standard to get you started.",
    doneTitle: "All set!",
    doneSubtitle: "We're using a safety standard to get you started. Welcome to Glútty!",
  },
  bottomNav: {
    inicio: "Home",
    restaurantes: "Restaurants",
    favoritos: "Favorites",
    comunidade: "Community",
    perfil: "Profile",
  },
  home: {
    greeting: { morning: "Good morning", afternoon: "Good afternoon", evening: "Good evening" },
    question: "Where do you want to eat today?",
    searchPlaceholder: "City or country…",
    recentSearches: "Recent searches",
    suggestions: "Suggestions",
    locationTypes: { cidade: "City", estado: "State", pais: "Country" },
    clearHistory: "Clear history",
    resultsFor: "Results for {location} · based on your profile",
    promo: {
      badge: "NEW",
      title: "New recommended\nrestaurants",
      subtitle: "Based on your safety standard",
      cta: "See now →",
    },
    categoriesTitle: "Celiac categories",
    seeAll: "See all",
    categories: [
      "Safest\noptions",
      "Gluten-free\nparty",
      "For the\nfamily",
      "Gluten-free\ndesserts",
      "Hanging out\nwith friends",
    ],
    recommendedTitle: "Recommended for you",
    nearbyPrefix: "Closest to {location}",
    noResultsTitle: "Nothing found in {location}",
    noResultsSubtitle: "Showing the closest restaurants to this region",
    mostNearby: "Nearby",
    bestForCeliacs: { title: "Best for celiacs", subtitle: "Rated by the community" },
    recommendedDishes: { title: "Recommended dishes", nearbyPrefix: "Near {location}" },
    nearbyDishesLabel: "Nearby dishes",
    topRated: { title: "Top rated near you", subtitle: "Reviews from verified celiacs" },
    verified: "Verified",
    feedback: "Feedback",
    viewAllFeedbacks: "See all feedback for this dish",
    reviewersCount: "+{count} celiacs reviewed",
    seeWhatTheySay: "See what they're saying",
    viewFeedbacks: "See feedback",
    safetySheet: { title: "Safety standard", subtitle: "Filters the restaurants shown" },
    safetyOptionDescriptions: {
      certificado: "Highly rated and recommended by celiacs",
      muito_seguro: "Strict protocol, no contamination risk",
      verificado: "Verified and approved by the Glútty community",
      seguro: "Adaptations available with care",
      moderado: "Gluten-free options, watch for contamination",
    },
    dishPreviews: {
      dd1: { comment: "Pizza For Fun's Margherita is perfect — crispy crust, truly gluten-free. I didn't have any reaction!", date: "2 days ago" },
      dd2: { comment: "Grão Fino's French bread is amazing, it tastes like real bakery bread. The staff really knows about celiac disease!", date: "3 days ago" },
      dd3: { comment: "Jackie's raspberry tart is a work of art — beautiful and delicious. 100% gluten-free and no symptoms.", date: "1 week ago" },
      dd4: { comment: "Libera's bowl is fresh and nutritious. Cozy atmosphere and completely safe for celiacs.", date: "4 days ago" },
      dd5: { comment: "Granò's Marinara is authentic — Neapolitan dough, gluten-free. One of the best pizzas I've ever had in Switzerland!", date: "5 days ago" },
      dd6: { comment: "À VIE's brioches are incredibly light and soft. I never imagined gluten-free could be this good!", date: "2 days ago" },
    },
    topReviews: {
      r1: { comment: "I've been going for 4 years. Never had a reaction. The staff really understands celiac disease, it's not just marketing. Favorite dish: the rice tagliatelle.", tags: ["No contamination", "Knowledgeable staff", "I felt safe"] },
      r3: { comment: "Pandan is amazing — I had gluten-free French bread that tasted like the real thing. The staff knows a lot about celiac disease and I felt safe from start to finish.", tags: ["I felt safe", "Would definitely return", "Clear menu"] },
      r6: { comment: "Haus Hiltl is amazing — every item on the buffet has an allergen label and the staff talks about celiac disease naturally.", tags: ["No contamination", "Knowledgeable staff", "Clean environment"] },
    },
  },
  common: {
    closed: "Closed",
    open: "Open now",
    ratedDishPhoto: "Rated dish",
    dishPhoto: "Dish photo",
  },
  favoritos: {
    title: "Favorites",
    subtitle: "Your safe places",
    emptyTitle: "No favorites yet",
    emptySubtitle: "Tap the heart on restaurants you love to save them here.",
  },
  comunidade: {
    title: "Community",
    subtitle: "Real experiences from celiacs",
    searchPlaceholder: "Search by restaurant or user...",
    stats: { reviews: "Reviews", restaurants: "Restaurants", celiacs: "Celiacs" },
    verifiedBanner: { title: "Verified reviews", subtitle: "Real feedback — restaurants can't alter reviews." },
    recentReviews: "Recent reviews",
    helpful: "helpful",
    comment: "Comment",
    reviews: {
      "1": { comment: "Best restaurant for celiacs in SP! I feel completely safe here. The service is impeccable and the food is delicious.", tags: ["No contamination", "Knowledgeable staff", "I felt safe"] },
      "2": { comment: "I went with my celiac daughter and it was an amazing experience. For the first time she could eat anything on the menu without worry!", tags: ["Would definitely return", "Clear menu", "Knowledgeable staff"] },
      "3": { comment: "Beautiful place and delicious food. They really understand celiac disease! I'll definitely be back.", tags: ["Clean environment", "I felt safe", "No contamination"] },
      "4": { comment: "Good experience. The gluten-free gnocchi is delicious and the staff was attentive in explaining the processes.", tags: ["Clear menu", "Needs improvement"] },
    },
  },
  notificacoes: {
    title: "Notifications",
    subtitle: "Stay up to date",
    markAll: "Mark all as read",
    newSection: "New",
    previousSection: "Earlier",
    emptyTitle: "All caught up!",
    emptySubtitle: "You don't have any notifications right now.",
    items: {
      "1": { title: "Safety alert", body: "Cantina da Nona updated its menu. Check out the new gluten-free options.", time: "Now" },
      "2": { title: "New restaurant near you", body: "Verde & Saudável was added in your area. 100% gluten-free menu.", time: "15 min" },
      "3": { title: "Your review was helpful!", body: "12 celiacs marked your review of Sabor Brasil as helpful.", time: "1h" },
      "4": { title: "Cross-contamination notice", body: "A user reported possible cross-contamination at Bistrô Gourmet. Please be careful.", time: "3h" },
      "5": { title: "Favorite restaurant updated", body: "Sabor Brasil added 3 new gluten-free dishes to its menu.", time: "5h" },
      "6": { title: "Someone replied to your review", body: "The owner of Cantina da Nona replied to your 5-star review.", time: "Yesterday" },
      "7": { title: "Welcome to Glútty!", body: "You're protected. Explore safe restaurants near you.", time: "2 days" },
    },
  },
  safetyBadge: {
    muito_seguro: { label: "Very safe" },
    seguro: { label: "Safe" },
    certificado: { label: "Highly rated by celiacs", labelSm: "Highly rated" },
    moderado: { label: "Adaptable" },
    cuidado: { label: "Careful" },
    verificado: { label: "Safe" },
    novo: { label: "Highly rated by celiacs", labelSm: "Highly rated" },
    recomendado: { label: "Very safe" },
  },
  busca: {
    title: "Restaurants",
    subtitle: "Rated by celiacs",
    searchPlaceholder: "City or country…",
    recentSearches: "Recent searches",
    suggestions: "Suggestions",
    locationTypes: { cidade: "City", estado: "State", pais: "Country" },
    clearHistory: "Clear history",
    categories: { pizza: "Pizza", hamburguer: "Burger", japonesa: "Japanese", mexicana: "Mexican", churrasco: "Barbecue" },
    notFoundTitle: "Nothing found in {location}",
    notFoundSubtitle: "Showing the closest options in this region",
    countIn: "{count} in {location}",
    countNearby: "{count} closest options",
    moreNearby: "+{count} nearby",
    closestLabel: "CLOSEST OPTIONS",
  },
  categoria: {
    seeAll: "See all",
    nearbyTitle: "Near you",
    communityTitle: "Recommended by the community",
    productsTitle: "Related dishes",
    gettingLocation: "Getting your location...",
    showingResultsNear: "Showing results {location}",
    showingResultsFor: "Showing results for {location} · enable your location for closer results",
    noResultsFound: 'No restaurants found for "{query}".',
    nearYouLabel: "near you",
    defaultLocation: "São Paulo",
    configs: {
      "mais-seguros": {
        title: "Safest places",
        description: "Restaurants with the strictest cross-contamination protocols, designed for those who can't take risks.",
        searchPlaceholder: "Search the safest restaurants...",
      },
      "festa": {
        title: "Gluten-free party",
        description: "Perfect places to celebrate worry-free — gluten-free snacks, cakes and drinks to enjoy without concern.",
        searchPlaceholder: "Search places to celebrate...",
      },
      "familia": {
        title: "For the family",
        description: "Welcoming spaces and varied menus, ideal for family meals with safe options for everyone.",
        searchPlaceholder: "Search restaurants for the family...",
      },
      "doces": {
        title: "Gluten-free sweets",
        description: "From cakes to brigadeiros, bakeries and sweets that prove gluten-free can be even tastier.",
        searchPlaceholder: "Search sweets and bakeries...",
      },
      "amigos": {
        title: "Hanging out with friends",
        description: "Bars, restaurants and cafés to enjoy time with friends worry-free, with great recommendations from the community.",
        searchPlaceholder: "Search places to hang out with friends...",
      },
    },
  },
  configuracoes: {
    title: "Settings",
    subtitle: "Customize your app",
    sections: {
      language: "Language",
      notifications: "Notifications",
      appearance: "Appearance",
      security: "Security and privacy",
      help: "Help and support",
      about: "About Glútty",
    },
    appLanguage: "App language",
    currentLanguageName: "English",
    notificationRows: {
      safety:  { label: "Safety alerts",          description: "Notices about cross-contamination and restaurant updates" },
      new:     { label: "New restaurants",        description: "When a safe restaurant is added near you" },
      reviews: { label: "Replies to your reviews", description: "When someone replies to or likes your review" },
      promo:   { label: "News and promotions",    description: "Tips, news and content from the Glútty community" },
    },
    appearanceRows: {
      darkMode:  { label: "Dark mode",  description: "Use dark theme in the app" },
      vibration: { label: "Vibration",  description: "Haptic feedback when interacting with the app" },
    },
    security: {
      pattern: "Safety standard",
      patternValue: "Very safe",
      dataPrivacy: "Data and privacy",
      deleteAccount: "Delete account",
    },
    help: {
      helpCenter: "Help center",
      contactUs: "Contact us",
      reportProblem: "Report a problem",
    },
    about: {
      version: "App version",
      terms: "Terms of use",
      privacyPolicy: "Privacy policy",
      rateApp: "Rate Glútty",
    },
    languageNames: {
      "Português": "Portuguese",
      "English": "English",
      "Español": "Spanish",
      "Deutsch": "German",
      "Français": "French",
    },
  },
  perfil: {
    title: "My Profile",
    subtitle: "Your information and preferences",
    cancel: "Cancel",
    save: "Save",
    viewPublic: "View public profile",
    edit: "Edit",
    location: "Zurich, Switzerland",
    aboutMe: "About me",
    bioPlaceholder: "Tell a bit about yourself — how long you've been celiac, where you live, how you handle the diet...",
    foodProfile: {
      title: "Food Profile",
      subtitle: "Customizes your recommendations and adds context to reviews",
      diagnosis: "Diagnosis",
      celiac: "Celiac",
      notRemovable: "· not removable",
      myRestrictions: "My restrictions",
      prohibitedIngredients: "Prohibited ingredients",
    },
    ingredients: {
      trigo: "Wheat", cevada: "Barley", malte: "Malt", leite: "Milk", aveia: "Oats", centeio: "Rye",
    },
    journey: {
      title: "Your journey on Glútty",
      since: "Since Jan 2023",
      stats: {
        restaurants: "Safe\nrestaurants",
        dishes: "Dishes\ntried",
        reviews: "Reviews\nwritten",
        favorites: "Favorites\nsaved",
      },
    },
    recentActivity: {
      title: "Recent activity",
      seeAll: "See all",
      items: {
        "1": { title: "Le Manjue Organique", subtitle: "Reviewed 3 days ago" },
        "2": { title: "Mushroom risotto", subtitle: "Favorite saved 1 week ago" },
      },
    },
    settingsSection: {
      title: "Settings",
      items: { language: "Language", help: "Help and support", about: "About Glútty" },
    },
    logout: "Log out",
  },
  perfilPublico: {
    title: "My public profile",
    subtitle: "How other users see you",
    reviewsCount: "reviews",
    memberSince: "since {date}",
    bio: "I've been celiac for 10 years, I live in Zurich and I avoid places where cross-contamination could occur.",
    restrictions: { celiac: "Celiac", glutenFree: "Gluten-Free", lactoseFree: "Lactose-Free", nutFree: "Nut-Free" },
    doesNotEat: "Doesn't eat",
    triedDishes: { title: "Dishes tried", count: "{count} dishes" },
    reviewedRestaurants: { title: "Reviewed restaurants", count: "{count} reviews" },
    microcopy: "Reviews based on this user's food profile. Your experience may vary.",
    dishes: {
      d1: "GF Mushroom Risotto",
      d2: "Quinoa Bowl",
      d3: "Vegetarian dish of the day",
      d4: "Gluten-free gnocchi",
    },
    reviews: {
      r1: { comment: "Best restaurant for celiacs in SP!", tags: ["No contamination", "Felt safe"] },
      r2: { comment: "Beautiful place, they really understand celiac needs!", tags: ["Clean environment", "No contamination"] },
      r3: { comment: "Best vegetarian spot in Zurich, highly rated by celiacs.", tags: ["Highly rated GF", "Would come back"] },
    },
  },
  restricoes: {
    title: "Edit restrictions",
    subtitle: "Your allergies and intolerances",
    glutenNotice: "Glútty is focused on people with gluten restrictions, so this option remains active.",
    dietarySection: { title: "Dietary restrictions", subtitle: "Select what you can't consume." },
    ingredientsSection: { title: "Forbidden ingredients", subtitle: "Tap to mark ingredients you can't consume." },
    customPlaceholder: "Other restriction",
    saveButton: "Save changes",
    savedButton: "✓ Saved!",
    restrictionLabels: {
      sem_gluten: "Gluten-free", sem_lactose: "Lactose-free", sem_nozes: "Nut-free", sem_ovo: "Egg-free",
      vegano: "Vegan", vegetariano: "Vegetarian", sem_soja: "Soy-free", sem_amendoim: "Peanut-free",
      sem_frutos: "Shellfish-free",
    },
    ingredientNames: {
      "Trigo": "Wheat", "Cevada": "Barley", "Malte": "Malt", "Aveia": "Oats", "Centeio": "Rye",
      "Leite": "Milk", "Manteiga": "Butter", "Queijo": "Cheese", "Creme de leite": "Heavy cream",
      "Ovo": "Egg", "Clara": "Egg white", "Gema": "Egg yolk",
      "Amendoim": "Peanut", "Castanha": "Cashew", "Nozes": "Walnuts", "Amêndoa": "Almond",
      "Soja": "Soy", "Tofu": "Tofu", "Missô": "Miso",
      "Camarão": "Shrimp", "Marisco": "Shellfish", "Lagosta": "Lobster",
    },
  },
  seguranca: {
    title: "Safety profile",
    subtitle: "Define what should be avoided in your recommendations",
    baseSection: { title: "App baseline", description: "Glútty always considers gluten-free options" },
    restrictionsSection: { title: "Your dietary restrictions" },
    glutenWarning: "Glútty is focused on people with gluten restrictions, so this option remains active.",
    customRestrictionPlaceholder: "+ Other restriction",
    avoidSection: { title: "Ingredients you avoid", subtitle: "These will only be flagged on dishes — you decide." },
    customIngredientPlaceholder: "Other ingredient",
    safetyLevelSection: { title: "Safety level" },
    safetyLevels: {
      muito_seguro: { label: "Very safe", description: "Lowest possible risk of cross-contamination" },
      seguro: { label: "Safe", description: "Includes options with good anti-contamination practices" },
      flexivel: { label: "Flexible", description: "More options available, with possible risks" },
    },
    saveButton: "Save changes",
    allergenLabels: {
      gluten: "Gluten", lactose: "Lactose", frutose: "Fructose", caseina: "Casein",
      oleaginosas: "Tree nuts", histamina: "Histamine", sulfitos: "Sulfites", ovos: "Eggs",
      amendoim: "Peanut", soja: "Soy", frutos_do_mar: "Shellfish", mostarda: "Mustard",
      gergelim: "Sesame", tremoco: "Lupin", outras: "Other", proteina_veg: "Plant protein",
    },
    problemSuggestions: {
      "Cebola": "Onion", "Alho": "Garlic", "Pimenta": "Pepper", "Tomate": "Tomato", "Milho": "Corn",
      "Batata": "Potato", "Frituras": "Fried foods", "Temperos industriais": "Industrial seasonings",
      "Açúcar": "Sugar", "Vinagre": "Vinegar",
    },
  },
  restaurante: {
    headerTitle: "Restaurant",
    reviewsCount: "{count} reviews",
    tabs: { sobre: "About", pratos: "Dishes", avaliacoes: "Reviews" },
    about: {
      title: "About the restaurant",
      restrictionsTitle: "Restrictions catered for",
      galleryTitle: "Restaurant photos",
      comingSoon: "Coming soon",
      mainDishesTitle: "Main dishes",
      crossContaminationTitle: "Cross-contamination control",
      safetyProceduresTitle: "Safety procedures",
      disclaimer: "Information provided by the restaurant. Always confirm this information directly with the restaurant before consuming.",
      contactTitle: "Contact information",
      chefLabel: "Head chef",
      incompatibleDish: "Incompatible dish — no adaptation available.",
      requestAdaptation: "Request adaptation",
      adaptable: "Adaptable",
      safe: "Safe",
    },
    dishes: {
      empty: "Menu not available yet",
      certified: "Approved by celiacs",
      declaredIngredients: "Declared ingredients:",
    },
    reviews: {
      verified: "Verified",
      writeReview: "Review this restaurant",
      safetyLevels: { muito_seguro: "Very safe", seguro: "Safe", moderado: "Moderate", nao_seguro: "Not safe" },
      contamLabels: { nenhum: "No contamination", pequeno: "Slight risk", alto: "High risk", nao_sei: "Uncertain risk" },
      teamLabels: { total: "Team well-prepared", parcial: "Team partially aware", nao_sabiam: "Team unaware", nao_perguntei: "Not verified" },
    },
  },
  avaliar: {
    successTitle: "Review submitted!",
    successMessageLine1: "Thank you for helping other celiacs",
    successMessageLine2: "eat with safety.",
    successNote: "Your review will contribute to the restaurant's safety score.",
    backToRestaurant: "Back to restaurant",
    headerTitle: "Review restaurant",
    headerSubtitle: "Share your experience with the community",
    chefLabel: "Head chef: {name} Kitchen",
    visitDatePrompt: "When did you visit?",
    respondButton: "Answer",
    sections: {
      safety: { title: "How safe did you feel?", subtitle: "Main question — required" },
      contam: { title: "Cross-contamination risk?", subtitle: "Were there any signs of contact with gluten?" },
      team: { title: "Did the staff know about gluten-free diets?", subtitle: "Did they show knowledge about celiac disease?" },
      structure: { title: "Venue structure", subtitle: "You can select more than one" },
      dishes: { title: "What did you eat?", subtitle: "List the dishes (optional)" },
      stars: { title: "Overall rating", subtitle: "Rating and comment (optional)" },
      photo: { title: "Add photo", subtitle: "Dish, menu, or venue (optional)" },
      tags: { title: "Quick highlights", subtitle: "Tags that summarize your visit (optional)" },
    },
    safetyLabels: { muito_seguro: "Very safe for me", seguro: "Safe for me", moderado: "Moderate", nao_seguro: "I didn't feel safe" },
    contamLabels: { nenhum: "No risk", pequeno: "Slight risk", alto: "High risk", nao_sei: "Can't say" },
    teamLabels: { total: "Yes, total confidence", parcial: "Partially", nao_sabiam: "They didn't know", nao_perguntei: "I didn't ask" },
    structureOptions: {
      "Cozinha separada": "Separate kitchen",
      "Utensílios exclusivos": "Dedicated utensils",
      "Área compartilhada": "Shared area",
      "Menu dedicado SG": "Dedicated GF menu",
      "Não informado": "Not informed",
    },
    dishPlaceholder: "Dish {n}...",
    addDish: "Add dish",
    starLabels: ["Tap to rate", "Very bad", "Bad", "Average", "Good", "Excellent!"],
    commentPlaceholder: "Optional comment...",
    photoCta: "Tap to add a photo",
    quickTags: {
      "Sem contaminação": "No contamination",
      "Equipe bem informada": "Well-informed staff",
      "Me senti seguro": "Felt safe",
      "Voltaria com certeza": "Would definitely return",
      "Não voltaria": "Would not return",
      "Precisa melhorar": "Needs improvement",
      "Cardápio claro": "Clear menu",
      "Ambiente limpo": "Clean environment",
    },
    starsSummary: { singular: "{count} star", plural: "{count} stars" },
    tagsSelected: { singular: "{count} selected", plural: "{count} selected" },
    microcopy: "Your review helps other celiac people make safer decisions.",
    submitting: "Submitting...",
    submit: "Submit review",
    submitHint: "Answer the safety and contamination questions to continue",
  },
  prato: {
    notFound: "Dish not found.",
    adaptationApplied: "Adaptation applied",
    adaptationDesc: "This dish was adapted to your restrictions. Check the substituted ingredients below.",
    ingredients: "Ingredients",
    legendSafe: "Aligned with your safety profile",
    legendSubstituted: "Substituted",
    contamWarning: "There may be a risk of cross-contamination. Confirm with the restaurant before eating.",
    dishInfo: "Dish information",
    restaurantLabel: "Restaurant",
    chefLabel: "Chef",
    safetyLevelLabel: "Safety level",
    crossContamPrepTitle: "How they prevent cross-contamination",
    crossContamPrepFallback:
      "The restaurant follows good practices to avoid cross-contamination for this dish, such as using separate utensils and equipment for gluten-free preparation. Confirm details with the staff.",
    restrictionsMet: "Restrictions met",
    otherDishes: "Other dishes you might like",
    viewDish: "View dish →",
    viewRestaurant: "View full restaurant",
    contactTitle: "Restaurant contact",
    phoneLabel: "Phone",
    addressLabel: "Address",
    websiteLabel: "Website",
    hoursLabel: "Opening hours",
  },
};

export type Translations = {
  idioma: {
    title: string;
    subtitle: string;
    continue: string;
  };
  welcome: {
    slides: { title: string; subtitle: string; bullets: string[] }[];
    createAccount: string;
    haveAccount: string;
  };
  login: {
    headerTitle: string;
    title: string;
    subtitle: string;
    email: string;
    emailPlaceholder: string;
    password: string;
    passwordPlaceholder: string;
    forgotPassword: string;
    submit: string;
    orContinueWith: string;
    noAccount: string;
    createAccount: string;
  };
  cadastro: {
    headerTitle: string;
    title: string;
    subtitle: string;
    name: string;
    namePlaceholder: string;
    email: string;
    emailPlaceholder: string;
    password: string;
    passwordPlaceholder: string;
    passwordStrength: { weak: string; medium: string; strong: string; label: string };
    submit: string;
    haveAccount: string;
    login: string;
  };
  esqueciSenha: {
    title: string;
    subtitle: string;
    email: string;
    emailPlaceholder: string;
    submit: string;
    rememberedPassword: string;
    login: string;
    sentTitle: string;
    sentSubtitlePrefix: string;
    sentHint: string;
    backToLogin: string;
    resend: string;
  };
  onboarding: {
    step1: { title: string; subtitle: string; cta: string; skip: string };
    skipConfirm: { title: string; subtitle: string; description: string; cta: string; skip: string };
    skipFinal: { title: string; description: string; cta: string; skip: string };
    step2: {
      progress: string;
      title: string;
      subtitle: string;
      glutenWarning: string;
      customPlaceholder: string;
      cta: string;
      skip: string;
    };
    ingredientes: {
      progress: string;
      title: string;
      subtitle: string;
      customPlaceholder: string;
      ctaSave: string;
      cta: string;
      skip: string;
    };
    success: { progress: string; title: string; subtitle: string; description: string; cta: string };
    allergenLabels: Record<string, string>;
    problemSuggestions: Record<string, string>;
  };
  preparando: {
    steps: string[];
    title: string;
    subtitle: string;
    doneTitle: string;
    doneSubtitle: string;
  };
  preparandoPadrao: {
    steps: string[];
    title: string;
    subtitle: string;
    doneTitle: string;
    doneSubtitle: string;
  };
  bottomNav: {
    inicio: string;
    restaurantes: string;
    favoritos: string;
    comunidade: string;
    perfil: string;
  };
  home: {
    greeting: { morning: string; afternoon: string; evening: string };
    question: string;
    searchPlaceholder: string;
    recentSearches: string;
    suggestions: string;
    locationTypes: { cidade: string; estado: string; pais: string };
    clearHistory: string;
    resultsFor: string;
    promo: { badge: string; title: string; subtitle: string; cta: string };
    categoriesTitle: string;
    seeAll: string;
    categories: string[];
    recommendedTitle: string;
    nearbyPrefix: string;
    noResultsTitle: string;
    noResultsSubtitle: string;
    mostNearby: string;
    bestForCeliacs: { title: string; subtitle: string };
    recommendedDishes: { title: string; nearbyPrefix: string };
    nearbyDishesLabel: string;
    topRated: { title: string; subtitle: string };
    verified: string;
    feedback: string;
    viewAllFeedbacks: string;
    reviewersCount: string;
    seeWhatTheySay: string;
    viewFeedbacks: string;
    safetySheet: { title: string; subtitle: string };
    safetyOptionDescriptions: { certificado: string; muito_seguro: string; verificado: string; seguro: string; moderado: string };
    dishPreviews: Record<string, { comment: string; date: string }>;
    topReviews: Record<string, { comment: string; tags: string[] }>;
  };
  common: {
    closed: string;
    open: string;
    ratedDishPhoto: string;
    dishPhoto: string;
  };
  favoritos: {
    title: string;
    subtitle: string;
    emptyTitle: string;
    emptySubtitle: string;
  };
  comunidade: {
    title: string;
    subtitle: string;
    searchPlaceholder: string;
    stats: { reviews: string; restaurants: string; celiacs: string };
    verifiedBanner: { title: string; subtitle: string };
    recentReviews: string;
    helpful: string;
    comment: string;
    reviews: Record<string, { comment: string; tags: string[] }>;
  };
  notificacoes: {
    title: string;
    subtitle: string;
    markAll: string;
    newSection: string;
    previousSection: string;
    emptyTitle: string;
    emptySubtitle: string;
    items: Record<string, { title: string; body: string; time: string }>;
  };
  safetyBadge: Record<
    "muito_seguro" | "seguro" | "certificado" | "moderado" | "cuidado" | "verificado" | "novo" | "recomendado",
    { label: string; labelSm?: string }
  >;
  busca: {
    title: string;
    subtitle: string;
    searchPlaceholder: string;
    recentSearches: string;
    suggestions: string;
    locationTypes: Record<"cidade" | "estado" | "pais", string>;
    clearHistory: string;
    categories: Record<"pizza" | "hamburguer" | "japonesa" | "mexicana" | "churrasco", string>;
    notFoundTitle: string;
    notFoundSubtitle: string;
    countIn: string;
    countNearby: string;
    moreNearby: string;
    closestLabel: string;
  };
  categoria: {
    seeAll: string;
    nearbyTitle: string;
    communityTitle: string;
    productsTitle: string;
    gettingLocation: string;
    showingResultsNear: string;
    showingResultsFor: string;
    noResultsFound: string;
    nearYouLabel: string;
    defaultLocation: string;
    configs: Record<
      "mais-seguros" | "festa" | "familia" | "doces" | "amigos",
      { title: string; description: string; searchPlaceholder: string }
    >;
  };
  configuracoes: {
    title: string;
    subtitle: string;
    sections: {
      language: string;
      notifications: string;
      appearance: string;
      security: string;
      help: string;
      about: string;
    };
    appLanguage: string;
    currentLanguageName: string;
    notificationRows: Record<"safety" | "new" | "reviews" | "promo", { label: string; description: string }>;
    appearanceRows: Record<"darkMode" | "vibration", { label: string; description: string }>;
    security: {
      pattern: string;
      patternValue: string;
      dataPrivacy: string;
      deleteAccount: string;
    };
    help: {
      helpCenter: string;
      contactUs: string;
      reportProblem: string;
    };
    about: {
      version: string;
      terms: string;
      privacyPolicy: string;
      rateApp: string;
    };
    languageNames: Record<string, string>;
  };
  perfil: {
    title: string;
    subtitle: string;
    cancel: string;
    save: string;
    viewPublic: string;
    edit: string;
    location: string;
    aboutMe: string;
    bioPlaceholder: string;
    foodProfile: {
      title: string;
      subtitle: string;
      diagnosis: string;
      celiac: string;
      notRemovable: string;
      myRestrictions: string;
      prohibitedIngredients: string;
    };
    ingredients: Record<"trigo" | "cevada" | "malte" | "leite" | "aveia" | "centeio", string>;
    journey: {
      title: string;
      since: string;
      stats: Record<"restaurants" | "dishes" | "reviews" | "favorites", string>;
    };
    recentActivity: {
      title: string;
      seeAll: string;
      items: Record<string, { title: string; subtitle: string }>;
    };
    settingsSection: {
      title: string;
      items: Record<"language" | "help" | "about", string>;
    };
    logout: string;
  };
  perfilPublico: {
    title: string;
    subtitle: string;
    reviewsCount: string;
    memberSince: string;
    bio: string;
    restrictions: Record<"celiac" | "glutenFree" | "lactoseFree" | "nutFree", string>;
    doesNotEat: string;
    triedDishes: { title: string; count: string };
    reviewedRestaurants: { title: string; count: string };
    microcopy: string;
    dishes: Record<"d1" | "d2" | "d3" | "d4", string>;
    reviews: Record<"r1" | "r2" | "r3", { comment: string; tags: string[] }>;
  };
  restricoes: {
    title: string;
    subtitle: string;
    glutenNotice: string;
    dietarySection: { title: string; subtitle: string };
    ingredientsSection: { title: string; subtitle: string };
    customPlaceholder: string;
    saveButton: string;
    savedButton: string;
    restrictionLabels: Record<"sem_gluten" | "sem_lactose" | "sem_nozes" | "sem_ovo" | "vegano" | "vegetariano" | "sem_soja" | "sem_amendoim" | "sem_frutos", string>;
    ingredientNames: Record<string, string>;
  };
  seguranca: {
    title: string;
    subtitle: string;
    baseSection: { title: string; description: string };
    restrictionsSection: { title: string };
    glutenWarning: string;
    customRestrictionPlaceholder: string;
    avoidSection: { title: string; subtitle: string };
    customIngredientPlaceholder: string;
    safetyLevelSection: { title: string };
    safetyLevels: Record<"muito_seguro" | "seguro" | "flexivel", { label: string; description: string }>;
    saveButton: string;
    allergenLabels: Record<string, string>;
    problemSuggestions: Record<string, string>;
  };
  restaurante: {
    headerTitle: string;
    reviewsCount: string;
    tabs: Record<"sobre" | "pratos" | "avaliacoes", string>;
    about: {
      title: string;
      restrictionsTitle: string;
      galleryTitle: string;
      comingSoon: string;
      mainDishesTitle: string;
      crossContaminationTitle: string;
      safetyProceduresTitle: string;
      disclaimer: string;
      contactTitle: string;
      chefLabel: string;
      incompatibleDish: string;
      requestAdaptation: string;
      adaptable: string;
      safe: string;
    };
    dishes: {
      empty: string;
      certified: string;
      declaredIngredients: string;
    };
    reviews: {
      verified: string;
      writeReview: string;
      safetyLevels: Record<"muito_seguro" | "seguro" | "moderado" | "nao_seguro", string>;
      contamLabels: Record<"nenhum" | "pequeno" | "alto" | "nao_sei", string>;
      teamLabels: Record<"total" | "parcial" | "nao_sabiam" | "nao_perguntei", string>;
    };
  };
  avaliar: {
    successTitle: string;
    successMessageLine1: string;
    successMessageLine2: string;
    successNote: string;
    backToRestaurant: string;
    headerTitle: string;
    headerSubtitle: string;
    chefLabel: string;
    visitDatePrompt: string;
    respondButton: string;
    sections: Record<"safety" | "contam" | "team" | "structure" | "dishes" | "stars" | "photo" | "tags", { title: string; subtitle: string }>;
    safetyLabels: Record<string, string>;
    contamLabels: Record<string, string>;
    teamLabels: Record<string, string>;
    structureOptions: Record<string, string>;
    dishPlaceholder: string;
    addDish: string;
    starLabels: string[];
    commentPlaceholder: string;
    photoCta: string;
    quickTags: Record<string, string>;
    starsSummary: { singular: string; plural: string };
    tagsSelected: { singular: string; plural: string };
    microcopy: string;
    submitting: string;
    submit: string;
    submitHint: string;
  };
  prato: {
    notFound: string;
    adaptationApplied: string;
    adaptationDesc: string;
    ingredients: string;
    legendSafe: string;
    legendSubstituted: string;
    contamWarning: string;
    dishInfo: string;
    restaurantLabel: string;
    chefLabel: string;
    safetyLevelLabel: string;
    crossContamPrepTitle: string;
    crossContamPrepFallback: string;
    restrictionsMet: string;
    otherDishes: string;
    viewDish: string;
    viewRestaurant: string;
    contactTitle: string;
    phoneLabel: string;
    addressLabel: string;
    websiteLabel: string;
    hoursLabel: string;
  };
};

export const translations: Record<Language, Translations> = { pt, en };
