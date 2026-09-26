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

/* ───────────── Texto com **negrito**, *itálico* e [links](url ou link:chave) ───────────── */

function rich(text: string, c: Content): ReactNode {
  const out: ReactNode[] = [];
  const re = /\*\*([^*]+)\*\*|\*([^*]+)\*|\[([^\]]+)\]\(([^)]+)\)/g;
  let last = 0;
  let m: RegExpExecArray | null;
  let k = 0;
  while ((m = re.exec(text))) {
    if (m.index > last) out.push(text.slice(last, m.index));
    if (m[1] !== undefined) out.push(<strong key={k++}>{m[1]}</strong>);
    else if (m[2] !== undefined) out.push(<em key={k++}>{m[2]}</em>);
    else {
      const target = m[4];
      const href = target.startsWith("link:") ? LINKS[target.slice(5)] ?? "" : target;
      out.push(
        href ? (
          <a key={k++} href={href} target="_blank" rel="noopener noreferrer">
            {m[3]}
          </a>
        ) : (
          // Link externo ainda sem URL: fica marcado para preencher em content.ts
          <span key={k++} className="md-link-pending" title={c.ui.linkPending}>
            {m[3]}
          </span>
        ),
      );
    }
    last = re.lastIndex;
  }
  if (last < text.length) out.push(text.slice(last));
  return out;
}

function BlockView({ b, c }: { b: Block; c: Content }) {
  switch (b.t) {
    case "p":
      return <p>{rich(b.text, c)}</p>;
    case "h2":
      return <h2 id={b.id}>{b.text}</h2>;
    case "h3":
      return <h3>{b.text}</h3>;
    case "ul":
      return (
        <ul>
          {b.items.map((i) => (
            <li key={i}>{rich(i, c)}</li>
          ))}
        </ul>
      );
    case "quote":
      return <blockquote>{rich(b.text, c)}</blockquote>;
    case "sep":
      return <hr className="md-sep" />;
    case "image":
      return (
        <figure className={`md-figure ${b.wide ? "md-wide" : ""}`}>
          <Image className="md-img" src={b.src} alt={b.alt} width={b.width} height={b.height} unoptimized />
          {b.caption && <figcaption>{rich(b.caption, c)}</figcaption>}
        </figure>
      );
    case "todo":
      return (
        <div className="md-todo" role="note">
          <b>{c.ui.todoLabel}</b>
          <p>{b.text}</p>
        </div>
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
                <BlockView b={b} c={c} />
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
