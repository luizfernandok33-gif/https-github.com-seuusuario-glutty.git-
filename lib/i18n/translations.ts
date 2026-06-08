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
};

export const translations: Record<Language, Translations> = { pt, en };
