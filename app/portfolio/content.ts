/* ============================================================
   Conteúdo do portfólio: réplica do artigo publicado no Medium.
   https://medium.com/@luizfernandok33/gl%C3%BAtty-mais-seguran%C3%A7a-e-confian%C3%A7a-para-pessoas-cel%C3%ADacas-ao-comer-fora-3d0f45849a14

   - content/article.pt.json: o artigo em blocos, extraído do Medium sem alterações.
   - content/strings.en.json e strings.de.json: traduções, bloco a bloco.
   - Imagens originais do artigo em /public/portfolio/medium.
   - Links externos: todos em LINKS, abaixo. Troque a URL que quiser
     (por exemplo, apontar os artigos para as subpáginas do portfólio).
   ============================================================ */

import articlePt from "./content/article.pt.json";
import stringsEn from "./content/strings.en.json";
import stringsDe from "./content/strings.de.json";

export const LANGS = ["pt", "en", "de"] as const;
export type Lang = (typeof LANGS)[number];

export const MEDIUM_URL =
  "https://medium.com/@luizfernandok33/gl%C3%BAtty-mais-seguran%C3%A7a-e-confian%C3%A7a-para-pessoas-cel%C3%ADacas-ao-comer-fora-3d0f45849a14";

// Cabeçalho igual ao do Medium.
export const AUTHOR = "Luíz Assiz";
export const AUTHOR_PHOTO = "/portfolio/autor.jpg";
export const READ_MINUTES = 22;
export const PUBLISHED_ISO = "2026-05-21";

/* ───────────── Links externos do artigo ─────────────
   Chave usada no texto -> URL. Os valores são os mesmos do Medium.
   Se uma URL ficar vazia, o link aparece pontilhado e não abre nada. */
export const LINKS: Record<string, string> = {
  // Fontes citadas
  mayoClinic: "https://www.mayoclinic.org/diseases-conditions/celiac-disease/symptoms-causes/syc-20352220",
  celiacFoundation: "https://celiac.org/2018/08/23/global-prevalence-of-celiac-disease/",
  pubmedBrasil: "https://pmc.ncbi.nlm.nih.gov/articles/PMC4100646/",
  // Jornadas em alta qualidade no Figma
  figmaJornada1: "https://www.figma.com/board/gOJUuT9pJKZN8ssMGFswqR/Fluxo-do-usu%C3%A1rio?node-id=0-1&t=9FeAlgC10lfK1uLy-0",
  figmaJornada2: "https://www.figma.com/board/JtFtiO9g3VPu0M5clpFl6B/Fluxo-do-Usu%C3%A1rio?node-id=0-1&t=AP0DSL3ywC3lDhNA-0",
  // Artigos detalhados (subpáginas)
  artigoUxStrategy: "https://medium.com/@luizfernandok33/ux-strategy-direcionamento-estrat%C3%A9gico-inicial-para-conectar-cel%C3%ADacos-a-restaurantes-seguros-f0a47cd3d757",
  artigoUxResearch: "https://medium.com/@luizfernandok33/ux-research-processo-de-pesquisa-com-usu%C3%A1rios-na-pr%C3%A1tica-b28a2861a342",
  artigoJornada: "https://medium.com/@luizfernandok33/an%C3%A1lise-da-jornada-e-tomada-de-decis%C3%A3o-do-usu%C3%A1rio-cel%C3%ADaco-ao-comer-fora-f69cf3d0647e",
  artigoArquitetura: "https://medium.com/@luizfernandok33/arquitetura-da-solu%C3%A7%C3%A3o-conectando-jornadas-em-um-fluxo-cont%C3%ADnuo-152bb6b03f75",
  artigoMvp: "https://medium.com/@luizfernandok33/defini%C3%A7%C3%A3o-do-mvp-e-prioriza%C3%A7%C3%A3o-de-funcionalidades-3c7b8949dbd8",
  artigoExploracao: "https://medium.com/@luizfernandok33/explora%C3%A7%C3%A3o-inicial-rabiscos-e-wireframes-de-baixa-fidelidade-ce9ef357450e",
  artigoUxWriting: "https://medium.com/@luizfernandok33/ux-writing-comunica%C3%A7%C3%A3o-como-apoio-%C3%A0-decis%C3%A3o-72458ede18c2",
};

/* Texto dos blocos: HTML mínimo com <strong>, <em>, <br> e <a href="link:chave">. */
export type Block =
  | { t: "p" | "h2" | "h3" | "quote"; text: string }
  | { t: "ul" | "ol"; items: string[] }
  | { t: "image"; src: string; width: number; height: number; alt: string; caption?: string }
  | { t: "embed"; url: string; title: string }
  | { t: "sep" };

export type Content = {
  htmlLang: string;
  langName: string;
  ui: {
    readOnMedium: string;
    minRead: (n: number) => string;
    date: string;
    language: string;
    writtenBy: string;
    linkPending: string;
    embedTitle: (name: string) => string;
    clap: string;
    comment: string;
    save: string;
    share: string;
  };
  title: string;
  subtitle: string;
  blocks: Block[];
};

const BLOCKS_PT = articlePt as Block[];

// Aplica a tradução (id "índice.campo") sobre os blocos originais.
function translate(strings: Record<string, string>): Block[] {
  return BLOCKS_PT.map((b, i) => {
    const pick = (field: string, fallback: string) => strings[`${i}.${field}`] ?? fallback;
    switch (b.t) {
      case "p":
      case "h2":
      case "h3":
      case "quote":
        return { ...b, text: pick("text", b.text) };
      case "ul":
      case "ol":
        return { ...b, items: b.items.map((it, j) => pick(`items.${j}`, it)) };
      case "image":
        return { ...b, alt: pick("alt", b.alt), ...(b.caption ? { caption: pick("caption", b.caption) } : {}) };
      default:
        return b;
    }
  });
}

const pt: Content = {
  htmlLang: "pt-BR",
  langName: "Português",
  ui: {
    readOnMedium: "Ler no Medium",
    minRead: (n) => `${n} min de leitura`,
    date: "21 de mai.",
    language: "Idioma",
    writtenBy: `Escrito por ${AUTHOR}`,
    linkPending: "Link a definir",
    embedTitle: (name) => `${name} (Figma)`,
    clap: "Aplaudir no Medium",
    comment: "Comentar no Medium",
    save: "Salvar no Medium",
    share: "Abrir o artigo original no Medium",
  },
  title: "Glútty: Mais segurança e confiança para pessoas celíacas ao comer fora",
  subtitle:
    "Uma solução digital desenvolvida para apoiar decisões alimentares mais seguras através de transparência, experiências compartilhadas e redução da insegurança alimentar.",
  blocks: BLOCKS_PT,
};

const en: Content = {
  htmlLang: "en",
  langName: "English",
  ui: {
    readOnMedium: "Read on Medium",
    minRead: (n) => `${n} min read`,
    date: "May 21",
    language: "Language",
    writtenBy: `Written by ${AUTHOR}`,
    linkPending: "Link to be added",
    embedTitle: (name) => `${name} (Figma)`,
    clap: "Clap on Medium",
    comment: "Respond on Medium",
    save: "Save on Medium",
    share: "Open the original article on Medium",
  },
  title: "Glútty: More safety and confidence for people with celiac disease when eating out",
  subtitle:
    "A digital solution designed to support safer food decisions through transparency, shared experiences and less food insecurity.",
  blocks: translate(stringsEn),
};

const de: Content = {
  htmlLang: "de",
  langName: "Deutsch",
  ui: {
    readOnMedium: "Auf Medium lesen",
    minRead: (n) => `${n} Min. Lesezeit`,
    date: "21. Mai",
    language: "Sprache",
    writtenBy: `Geschrieben von ${AUTHOR}`,
    linkPending: "Link folgt",
    embedTitle: (name) => `${name} (Figma)`,
    clap: "Auf Medium applaudieren",
    comment: "Auf Medium kommentieren",
    save: "Auf Medium speichern",
    share: "Originalartikel auf Medium öffnen",
  },
  title: "Glútty: Mehr Sicherheit und Vertrauen für Menschen mit Zöliakie beim Essen auswärts",
  subtitle:
    "Eine digitale Lösung, die sicherere Essensentscheidungen unterstützt – durch Transparenz, geteilte Erfahrungen und weniger Unsicherheit beim Essen.",
  blocks: translate(stringsDe),
};

export const CONTENT: Record<Lang, Content> = { pt, en, de };
