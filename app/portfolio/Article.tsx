"use client";

import { Fragment, useEffect, useSyncExternalStore, type ReactNode } from "react";
import Image from "next/image";
import {
  AUTHOR,
  AUTHOR_PHOTO,
  CONTENT,
  LANGS,
  LINKS,
  MEDIUM_URL,
  PUBLISHED_ISO,
  READ_MINUTES,
  type Block,
  type Content,
  type Lang,
} from "./content";

const STORAGE_KEY = "glutty:portfolio-lang";

/* ───────────── Texto: HTML mínimo (<strong>, <em>, <br>, <a href>) vindo do Medium ───────────── */

const ENTITIES: Record<string, string> = { "&amp;": "&", "&lt;": "<", "&gt;": ">", "&quot;": '"', "&#39;": "'" };
const decode = (s: string) => s.replace(/&(amp|lt|gt|quot|#39);/g, (m) => ENTITIES[m] ?? m);

type Node = string | { tag: "strong" | "em" | "a"; href?: string; children: Node[] } | { tag: "br" };

function parseInline(html: string): Node[] {
  const root: Node[] = [];
  const stack: { tag: string; href?: string; children: Node[] }[] = [];
  const push = (n: Node) => (stack.length ? stack[stack.length - 1].children : root).push(n);
  const re = /<(\/?)(strong|em|a|br)(?:\s+href="([^"]*)")?\s*\/?>/g;
  let last = 0;
  let m: RegExpExecArray | null;
  while ((m = re.exec(html))) {
    if (m.index > last) push(decode(html.slice(last, m.index)));
    const [, closing, tag, href] = m;
    if (tag === "br") push({ tag: "br" });
    else if (!closing) stack.push({ tag, href, children: [] });
    else {
      const node = stack.pop();
      if (node) push(node as Node);
    }
    last = re.lastIndex;
  }
  if (last < html.length) push(decode(html.slice(last)));
  while (stack.length) push(stack.pop() as Node);
  return root;
}

function renderNodes(nodes: Node[], c: Content, key = "n"): ReactNode[] {
  return nodes.map((n, i) => {
    const k = `${key}-${i}`;
    if (typeof n === "string") return <Fragment key={k}>{n}</Fragment>;
    if (n.tag === "br") return <br key={k} />;
    const kids = renderNodes(n.children, c, k);
    if (n.tag === "strong") return <strong key={k}>{kids}</strong>;
    if (n.tag === "em") return <em key={k}>{kids}</em>;
    const target = n.href ?? "";
    const href = target.startsWith("link:") ? LINKS[target.slice(5)] ?? "" : target;
    return href ? (
      <a key={k} href={href} target="_blank" rel="noopener noreferrer">
        {kids}
      </a>
    ) : (
      // Link ainda sem URL: preencher em LINKS (content.ts)
      <span key={k} className="md-link-pending" title={c.ui.linkPending}>
        {kids}
      </span>
    );
  });
}

const rich = (html: string, c: Content) => renderNodes(parseInline(html), c);

// Embed do Figma, como o Medium mostra (proporção 800 × 450).
const figmaEmbed = (url: string) => `https://www.figma.com/embed?embed_host=share&url=${encodeURIComponent(url)}`;

function BlockView({ b, c, index }: { b: Block; c: Content; index: number }) {
  switch (b.t) {
    case "p":
      return <p>{rich(b.text, c)}</p>;
    case "h2":
      return <h2>{rich(b.text, c)}</h2>;
    case "h3":
      return <h3>{rich(b.text, c)}</h3>;
    case "quote":
      return <blockquote>{rich(b.text, c)}</blockquote>;
    case "ul":
      return (
        <ul>
          {b.items.map((it, i) => (
            <li key={i}>{rich(it, c)}</li>
          ))}
        </ul>
      );
    case "ol":
      return (
        <ol>
          {b.items.map((it, i) => (
            <li key={i}>{rich(it, c)}</li>
          ))}
        </ol>
      );
    case "sep":
      return <hr className="md-sep" />;
    case "image":
      return (
        <figure className="md-figure">
          <Image
            className="md-img"
            src={b.src}
            alt={b.alt}
            width={b.width}
            height={b.height}
            sizes="(max-width: 728px) 100vw, 680px"
            preload={index === 0}
          />
          {b.caption && <figcaption>{rich(b.caption, c)}</figcaption>}
        </figure>
      );
    case "embed":
      return (
        <figure className="md-figure">
          <div className="md-embed">
            <iframe src={figmaEmbed(b.url)} title={c.ui.embedTitle(b.title)} loading="lazy" allowFullScreen />
          </div>
        </figure>
      );
  }
}

/* ───────────────────────── Barra de ações (como no Medium) ───────────────────────── */

const ICONS = {
  clap: "M8.5 11.5 5.3 8.3a1.3 1.3 0 0 1 1.8-1.8l4.6 4.6M9.8 8.4 8 6.6a1.3 1.3 0 0 1 1.8-1.8l4.6 4.6m-2.7-2.7a1.3 1.3 0 0 1 1.8-1.8l4.2 4.2c2.4 2.4 2.4 6.3 0 8.7a6.1 6.1 0 0 1-8.7 0l-4.4-4.4a1.3 1.3 0 0 1 1.8-1.8l2.1 2.1M15 3.5l.6-1.8M18 4.3l1.3-1.3M19 7l1.8-.5",
  comment: "M18 16.8a7.1 7.1 0 0 0 2.2-5.1C20.2 7.4 16.5 4 12 4s-8.2 3.4-8.2 7.7 3.7 7.7 8.2 7.7c1 0 2-.2 2.9-.5l3.9 1.6-.8-3.7Z",
  save: "M17.5 20 12 16.2 6.5 20V5.5A1.5 1.5 0 0 1 8 4h8a1.5 1.5 0 0 1 1.5 1.5V20Z",
  share: "M15.2 7.8 12 4.6 8.8 7.8M12 4.6v10M7 11H5.5v8.5h13V11H17",
};

function ActionBar({ c }: { c: Content }) {
  const link = (d: string, label: string, href = MEDIUM_URL) => (
    <a href={href} target="_blank" rel="noopener noreferrer" aria-label={label} title={label}>
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden>
        <path d={d} stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </a>
  );
  return (
    <div className="md-actions">
      <div className="md-actions-group">
        {link(ICONS.clap, c.ui.clap)}
        {link(ICONS.comment, c.ui.comment, `${MEDIUM_URL}#responses`)}
      </div>
      <div className="md-actions-group">
        {link(ICONS.save, c.ui.save)}
        {link(ICONS.share, c.ui.share)}
      </div>
    </div>
  );
}

/* ───────────────────────── Seletor de idioma ───────────────────────── */

function LangSwitch({ lang, onChange, label }: { lang: Lang; onChange: (l: Lang) => void; label: string }) {
  return (
    <div className="md-lang" role="group" aria-label={label}>
      {LANGS.map((l) => (
        <button
          key={l}
          type="button"
          className={l === lang ? "is-active" : ""}
          aria-pressed={l === lang}
          lang={CONTENT[l].htmlLang}
          title={CONTENT[l].langName}
          onClick={() => onChange(l)}
        >
          {l.toUpperCase()}
        </button>
      ))}
    </div>
  );
}

// O artigo abre em português, como no Medium. Outro idioma só por escolha (botão, ?lang= ou escolha salva).
function pickInitialLang(): Lang {
  try {
    const q = new URLSearchParams(window.location.search).get("lang");
    if (q && (LANGS as readonly string[]).includes(q)) return q as Lang;
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored && (LANGS as readonly string[]).includes(stored)) return stored as Lang;
  } catch {
    // sem armazenamento: segue em português
  }
  return "pt";
}

const listeners = new Set<() => void>();
let currentLang: Lang | null = null;
function getLang(): Lang {
  if (currentLang === null) currentLang = pickInitialLang();
  return currentLang;
}
function subscribeLang(cb: () => void) {
  listeners.add(cb);
  return () => {
    listeners.delete(cb);
  };
}
function setStoredLang(l: Lang) {
  currentLang = l;
  listeners.forEach((cb) => cb());
}

/* ───────────────────────── Artigo ───────────────────────── */

export default function Article() {
  const lang = useSyncExternalStore(subscribeLang, getLang, () => "pt" as Lang);
  const c = CONTENT[lang];

  useEffect(() => {
    document.documentElement.lang = c.htmlLang;
    document.title = c.title;
  }, [c]);

  const changeLang = (l: Lang) => {
    setStoredLang(l);
    try {
      window.localStorage.setItem(STORAGE_KEY, l);
    } catch {
      // sem armazenamento: a escolha vale só para esta visita
    }
    const url = new URL(window.location.href);
    if (l === "pt") url.searchParams.delete("lang");
    else url.searchParams.set("lang", l);
    window.history.replaceState(null, "", url);
  };

  return (
    <>
      <header className="md-top">
        <div className="md-top-inner">
          <a className="md-logo" href="#topo" aria-label="Glútty">
            <Image src="/glútty novo.png" alt="" width={30} height={30} unoptimized />
            Glútty
          </a>
          <div className="md-top-actions">
            <LangSwitch lang={lang} onChange={changeLang} label={c.ui.language} />
            <a className="md-btn md-btn-green" href={MEDIUM_URL} target="_blank" rel="noopener noreferrer">
              {c.ui.readOnMedium}
            </a>
          </div>
        </div>
      </header>

      <main className="md-article" id="topo" lang={c.htmlLang}>
        <article>
          <h1 className="md-title">{c.title}</h1>
          <div className="md-meta">
            {c.ui.minRead(READ_MINUTES)} · <time dateTime={PUBLISHED_ISO}>{c.ui.date}</time>
          </div>
          <div className="md-byline">
            <div className="md-avatar">
              <Image src={AUTHOR_PHOTO} alt={AUTHOR} width={44} height={44} unoptimized />
            </div>
            <span className="md-byline-name">{AUTHOR}</span>
          </div>
          <p className="md-subtitle">{c.subtitle}</p>

          <div className="md-body">
            {c.blocks.map((b, i) => (
              <Fragment key={i}>
                <BlockView b={b} c={c} index={i} />
              </Fragment>
            ))}
          </div>

          <ActionBar c={c} />
        </article>
      </main>

      <aside className="md-author" aria-label={c.ui.writtenBy} lang={c.htmlLang}>
        <div className="md-author-inner">
          <div className="md-avatar md-avatar-lg">
            <Image src={AUTHOR_PHOTO} alt={AUTHOR} width={72} height={72} unoptimized />
          </div>
          <div className="md-author-row">
            <h3>{c.ui.writtenBy}</h3>
            <a className="md-btn md-btn-green" href={MEDIUM_URL} target="_blank" rel="noopener noreferrer">
              {c.ui.readOnMedium}
            </a>
          </div>
        </div>
      </aside>
    </>
  );
}
