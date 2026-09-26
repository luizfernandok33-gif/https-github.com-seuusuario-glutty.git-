/* ============================================================
   Conteúdo do portfólio: réplica do artigo do Medium.
   https://medium.com/@luizfernandok33/gl%C3%BAtty-mais-seguran%C3%A7a-e-confian%C3%A7a-para-pessoas-cel%C3%ADacas-ao-comer-fora-3d0f45849a14

   Regras desta página:
   - Só entra o que está publicado no Medium. Nada de texto ou gráfico novo.
   - Imagens e gráficos são os arquivos originais do artigo (em /public/portfolio).
   - Links externos ficam em LINKS, abaixo, para preencher à mão.
   - O que ainda não foi importado aparece como bloco "todo" (exemplo).

   Formatação dentro dos textos:
     **negrito**   *itálico*   [texto](link:chave)  ->  usa LINKS.chave
   ============================================================ */

export const LANGS = ["pt", "en", "de"] as const;
export type Lang = (typeof LANGS)[number];

export const MEDIUM_URL =
  "https://medium.com/@luizfernandok33/gl%C3%BAtty-mais-seguran%C3%A7a-e-confian%C3%A7a-para-pessoas-cel%C3%ADacas-ao-comer-fora-3d0f45849a14";

// Dados do cabeçalho, iguais aos do Medium.
export const AUTHOR = "Luíz Assiz";
export const AUTHOR_PHOTO = "/portfolio/autor.jpg";
export const READ_MINUTES = 22;
export const PUBLISHED_ISO = "2026-05-21";

/* ───────────── Links externos: preencha as URLs aqui ─────────────
   Enquanto a URL estiver vazia, o link aparece sublinhado com
   pontilhado e não abre nada. */
export const LINKS: Record<string, string> = {
  mayoClinic: "", // Mayo Clinic — Celiac Disease Overview
  celiacFoundation: "", // Celiac Disease Foundation — Global Prevalence Study
};

export type Block =
  | { t: "p"; text: string }
  | { t: "h2"; id?: string; text: string }
  | { t: "h3"; text: string }
  | { t: "ul"; items: string[] }
  | { t: "quote"; text: string }
  | { t: "sep" }
  | { t: "image"; src: string; alt: string; width: number; height: number; caption?: string; wide?: boolean }
  | { t: "todo"; text: string };

export type Content = {
  htmlLang: string;
  langName: string;
  ui: {
    readOnMedium: string;
    minRead: (n: number) => string;
    date: string;
    language: string;
    writtenBy: string;
    todoLabel: string;
    linkPending: string;
    clap: string;
    comment: string;
    save: string;
    share: string;
  };
  title: string;
  subtitle: string;
  blocks: Block[];
};

const COVER = {
  src: "/portfolio/capa.jpg",
  width: 1256,
  height: 839,
  alt: "Case study — Glútty: Mais segurança e confiança para pessoas celíacas ao comer fora. UX Writing, UX Strategy, UX Research, UI Design, Information Architecture, Prototyping, Usability Testing, Design System.",
};

/* ───────────────────────── Português (original do Medium) ───────────────────────── */

const pt: Content = {
  htmlLang: "pt-BR",
  langName: "Português",
  ui: {
    readOnMedium: "Ler no Medium",
    minRead: (n) => `${n} min de leitura`,
    date: "21 de mai.",
    language: "Idioma",
    writtenBy: `Escrito por ${AUTHOR}`,
    todoLabel: "Conteúdo a importar do Medium",
    linkPending: "Link a definir",
    clap: "Aplaudir no Medium",
    comment: "Comentar no Medium",
    save: "Salvar no Medium",
    share: "Abrir o artigo original no Medium",
  },
  title: "Glútty: Mais segurança e confiança para pessoas celíacas ao comer fora",
  subtitle:
    "Uma solução digital desenvolvida para apoiar decisões alimentares mais seguras através de transparência, experiências compartilhadas e redução da insegurança alimentar.",
  blocks: [
    { t: "image", ...COVER, wide: true },
    { t: "h2", id: "introducao", text: "Introdução" },
    {
      t: "p",
      text: "A doença celíaca é uma condição autoimune desencadeada pela ingestão de glúten — proteína presente no trigo, cevada, centeio e derivados — que pode causar inflamações no intestino delgado e comprometer a absorção de nutrientes essenciais pelo organismo. [Mayo Clinic — Celiac Disease Overview](link:mayoClinic)",
    },
    {
      t: "p",
      text: "Estudos internacionais apontam que a doença celíaca afeta aproximadamente 1% da população mundial, com crescimento contínuo nos diagnósticos nas últimas décadas. Revisões sistemáticas indicam que a prevalência da doença aumentou significativamente nos últimos anos, tanto em países europeus quanto em outras regiões do mundo. [Celiac Disease Foundation — Global Prevalence Study](link:celiacFoundation)",
    },
    {
      t: "todo",
      text: "Continuação da Introdução, a partir de “No Brasil, embora ainda existam limitações relacionadas ao diagnóstico e subnotificação dos casos, estudos apontam prevalências…”, e todo o restante do artigo, com os títulos, textos, imagens e gráficos originais.",
    },
  ],
};

/* ───────────────────────── English ───────────────────────── */

const en: Content = {
  htmlLang: "en",
  langName: "English",
  ui: {
    readOnMedium: "Read on Medium",
    minRead: (n) => `${n} min read`,
    date: "May 21",
    language: "Language",
    writtenBy: `Written by ${AUTHOR}`,
    todoLabel: "Content to import from Medium",
    linkPending: "Link to be added",
    clap: "Clap on Medium",
    comment: "Respond on Medium",
    save: "Save on Medium",
    share: "Open the original article on Medium",
  },
  title: "Glútty: More safety and confidence for people with celiac disease when eating out",
  subtitle:
    "A digital solution designed to support safer food choices through transparency, shared experiences and less food insecurity.",
  blocks: [
    { t: "image", ...COVER, wide: true },
    { t: "h2", id: "introducao", text: "Introduction" },
    {
      t: "p",
      text: "Celiac disease is an autoimmune condition triggered by eating gluten — a protein found in wheat, barley, rye and their derivatives — that can inflame the small intestine and impair the body’s absorption of essential nutrients. [Mayo Clinic — Celiac Disease Overview](link:mayoClinic)",
    },
    {
      t: "p",
      text: "International studies indicate that celiac disease affects about 1% of the world’s population, with diagnoses rising steadily over recent decades. Systematic reviews show that its prevalence has increased significantly in recent years, both in European countries and in other regions of the world. [Celiac Disease Foundation — Global Prevalence Study](link:celiacFoundation)",
    },
    {
      t: "todo",
      text: "The rest of the Introduction, starting with the paragraph about Brazil, and the remainder of the article, with its original headings, text, images and charts.",
    },
  ],
};

/* ───────────────────────── Deutsch ───────────────────────── */

const de: Content = {
  htmlLang: "de",
  langName: "Deutsch",
  ui: {
    readOnMedium: "Auf Medium lesen",
    minRead: (n) => `${n} Min. Lesezeit`,
    date: "21. Mai",
    language: "Sprache",
    writtenBy: `Geschrieben von ${AUTHOR}`,
    todoLabel: "Inhalt aus Medium noch zu übernehmen",
    linkPending: "Link folgt",
    clap: "Auf Medium applaudieren",
    comment: "Auf Medium kommentieren",
    save: "Auf Medium speichern",
    share: "Originalartikel auf Medium öffnen",
  },
  title: "Glútty: Mehr Sicherheit und Vertrauen für Menschen mit Zöliakie beim Essen auswärts",
  subtitle:
    "Eine digitale Lösung, die sicherere Essensentscheidungen unterstützt – durch Transparenz, geteilte Erfahrungen und weniger Unsicherheit beim Essen.",
  blocks: [
    { t: "image", ...COVER, wide: true },
    { t: "h2", id: "introducao", text: "Einleitung" },
    {
      t: "p",
      text: "Zöliakie ist eine Autoimmunerkrankung, die durch die Aufnahme von Gluten ausgelöst wird – einem Protein in Weizen, Gerste, Roggen und daraus hergestellten Produkten. Sie kann Entzündungen im Dünndarm verursachen und die Aufnahme lebenswichtiger Nährstoffe beeinträchtigen. [Mayo Clinic — Celiac Disease Overview](link:mayoClinic)",
    },
    {
      t: "p",
      text: "Internationale Studien zeigen, dass rund 1 % der Weltbevölkerung von Zöliakie betroffen ist, mit stetig steigenden Diagnosen in den letzten Jahrzehnten. Systematische Übersichtsarbeiten belegen, dass die Prävalenz in den letzten Jahren deutlich zugenommen hat, sowohl in europäischen Ländern als auch in anderen Regionen der Welt. [Celiac Disease Foundation — Global Prevalence Study](link:celiacFoundation)",
    },
    {
      t: "todo",
      text: "Der Rest der Einleitung, ab dem Absatz über Brasilien, und der übrige Artikel mit den originalen Überschriften, Texten, Bildern und Grafiken.",
    },
  ],
};

export const CONTENT: Record<Lang, Content> = { pt, en, de };
