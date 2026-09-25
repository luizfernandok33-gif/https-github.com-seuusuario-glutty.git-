"use client";

import { Fragment, useEffect, useSyncExternalStore, type ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import SafetyBadge from "@/components/SafetyBadge";
import {
  AUTHOR,
  AUTHOR_PHOTO,
  CONTENT,
  LANGS,
  MEDIUM_URL,
  PROTOTYPE_URL,
  N,
  pct,
  readingMinutes,
  type Block,
  type Content,
  type FigureKind,
  type Lang,
} from "./content";

const STORAGE_KEY = "glutty:portfolio-lang";

/* ───────────── Texto com **negrito**, *itálico* e [links](url) ───────────── */

function rich(text: string): ReactNode {
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
      const href = m[4];
      const external = href.startsWith("http");
      out.push(
        external ? (
          <a key={k++} href={href} target="_blank" rel="noopener noreferrer">
            {m[3]}
          </a>
        ) : (
          <Link key={k++} href={href} target="_blank">
            {m[3]}
          </Link>
        ),
      );
    }
    last = re.lastIndex;
  }
  if (last < text.length) out.push(text.slice(last));
  return out;
}

/* ───────────────────────── Peças visuais ───────────────────────── */

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

function Cover({ c }: { c: Content }) {
  const [lead, joiner, circled] = c.ui.coverTitle;
  return (
    <div className="md-cover" role="img" aria-label={`Case study. Glútty: ${lead} ${joiner} ${circled}`}>
      <div className="md-cover-blob" aria-hidden />
      <div className="md-cover-copy">
        <span className="md-cover-pill">CASE STUDY</span>
        <p className="md-cover-title">
          <b>Glútty:</b> {lead} {joiner}{" "}
          <span className="md-cover-circle">
            {circled}
            <svg viewBox="0 0 200 60" preserveAspectRatio="none" aria-hidden>
              <path d="M12 34C14 14 70 6 118 8c46 2 76 12 74 26-2 16-54 22-104 20C38 52 8 46 12 30c2-8 20-14 42-17" />
            </svg>
          </span>
        </p>
        <span className="md-cover-rule" aria-hidden />
        <ul className="md-cover-tags" aria-hidden>
          {["UX WRITING", "UX STRATEGY", "UX RESEARCH", "UI DESIGN", "INFORMATION ARCHITECTURE", "PROTOTYPING", "USABILITY TESTING", "DESIGN SYSTEM"].map((t) => (
            <li key={t}>{t}</li>
          ))}
        </ul>
      </div>
      <div className="md-cover-art" aria-hidden>
        <div className="md-cover-phone">
          <i />
        </div>
        <div className="md-cover-card md-cover-card-1" />
        <div className="md-cover-card md-cover-card-2" />
      </div>
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

function FigureBody({ kind, c }: { kind: FigureKind; c: Content }) {
  const f = c.fig;
  switch (kind) {
    case "cover":
      return <Cover c={c} />;
    case "hero":
      return (
        <div className="md-panel">
          <div className="md-phones md-phones-1">
            <div className="md-phone-item">
              <Phone path={PROTOTYPE_URL} title="Glútty" large interactive />
              <span>{c.ui.prototypeHint}</span>
            </div>
          </div>
        </div>
      );
    case "competitors":
      return (
        <div className="md-panel">
          <div className="md-cards">
            {f.competitors.map((x) => (
              <div className="md-card" key={x.name}>
                <h4>{x.name}</h4>
                <p className="md-card-sub">{x.sub}</p>
                <p><b>{c.ui.strong}:</b> {x.strong}</p>
                <p><b>{c.ui.weak}:</b> {x.weak}</p>
              </div>
            ))}
          </div>
        </div>
      );
    case "stats":
      return (
        <div className="md-panel">
          <div className="md-stats">
            {f.stats.map((s) => (
              <div className="md-stat" key={s.label}>
                <b>{s.value}%</b>
                <span>{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      );
    case "charts":
      return (
        <div className="md-panel">
          <div className="md-charts">
            {f.charts.map((ch) => (
              <div className="md-chart" key={ch.title}>
                <h4>{ch.title}</h4>
                <p>{ch.sub} · {c.ui.ofPeople}</p>
                <ul className="md-bars">
                  {ch.bars.map((b) => (
                    <li key={b.label} className="md-bar" title={`${b.label}: ${b.n}/${N} (${pct(b.n)}%)`}>
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
            ))}
          </div>
        </div>
      );
    case "personas":
      return (
        <div className="md-panel">
          <div className="md-cards">
            {f.personas.map((p) => (
              <div className="md-card" key={p.name}>
                <span className={`md-tag ${p.mvp ? "" : "md-tag-muted"}`}>{p.mvp ? c.ui.mvpTag : c.ui.laterTag}</span>
                <p className="md-persona-name">{p.name}</p>
                <p className="md-card-sub">{p.role}</p>
                <p>{p.bio}</p>
                <p><b>{c.ui.needs}:</b> {p.needs}</p>
              </div>
            ))}
          </div>
        </div>
      );
    case "journey":
      return (
        <div className="md-panel">
          <div className="md-journey">
            {f.journey.map((j) => (
              <div className="md-journey-col" key={j.title}>
                <h4>{j.title}</h4>
                <dl>
                  <div><dt>{c.ui.does}</dt><dd>{j.does}</dd></div>
                  <div><dt>{c.ui.feels}</dt><dd>{j.feels}</dd></div>
                  <div><dt>{c.ui.inGlutty}</dt><dd>{j.glutty}</dd></div>
                </dl>
              </div>
            ))}
          </div>
        </div>
      );
    case "mvp":
      return (
        <div className="md-panel">
          <div className="md-mvp">
            <div className="md-mvp-in">
              <h4>{f.mvp.inTitle}</h4>
              <ul>
                {f.mvp.in.map((i) => (
                  <li key={i}><Check color="#C6F59D" /><span>{i}</span></li>
                ))}
              </ul>
            </div>
            <div>
              <h4>{f.mvp.laterTitle}</h4>
              <ul>
                {f.mvp.later.map((i) => (
                  <li key={i}><Clock /><span>{i}</span></li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      );
    case "badges":
      return (
        <div className="md-panel md-panel-badges">
          <SafetyBadge level="muito_seguro" size="md" />
          <SafetyBadge level="seguro" size="md" />
          <SafetyBadge level="certificado" size="md" />
          <SafetyBadge level="moderado" size="md" />
          <SafetyBadge level="cuidado" size="md" />
        </div>
      );
    case "brand":
      return (
        <div className="md-panel">
          <div className="md-brand">
            <div className="md-brand-hero">
              <div className="md-brand-mascot">
                <Image src="/parabens-novo.png" alt={f.brand.mascotAlt} width={578} height={517} unoptimized />
              </div>
              <strong>Glútty</strong>
              <em>{f.brand.tagline}</em>
            </div>
            <div className="md-brand-side">
              <div className="md-swatches">
                {f.brand.colors.map((col) => (
                  <div className="md-swatch" key={col.hex}>
                    <i style={{ background: col.hex }} />
                    <b>{col.name}</b>
                    <small>{col.hex}</small>
                  </div>
                ))}
              </div>
              <div className="md-slogans">
                {f.brand.slogans.map((s) => (
                  <p key={s}>{s}</p>
                ))}
              </div>
              <div className="md-type">
                <span>Aa</span>
                <span>{f.brand.typeNote}</span>
              </div>
            </div>
          </div>
        </div>
      );
    case "test":
      return (
        <div className="md-panel">
          <div className="md-test">
            {f.test.map((t, i) => (
              <div key={t.title}>
                <span className="md-test-step">{c.ui.step} {i + 1}</span>
                <h4>{t.title}</h4>
                <p>“{t.q}”</p>
              </div>
            ))}
          </div>
        </div>
      );
  }
}

function BlockView({ b, c }: { b: Block; c: Content }) {
  switch (b.t) {
    case "p":
      return <p>{rich(b.text)}</p>;
    case "h2":
      return <h2 id={b.id}>{b.text}</h2>;
    case "h3":
      return <h3>{b.text}</h3>;
    case "ul":
      return (
        <ul>
          {b.items.map((i) => (
            <li key={i}>{rich(i)}</li>
          ))}
        </ul>
      );
    case "quote":
      return (
        <blockquote>
          {b.text}
          <cite>{b.cite}</cite>
        </blockquote>
      );
    case "pull":
      return <p className="md-pull">{rich(b.text)}</p>;
    case "sep":
      return <hr className="md-sep" />;
    case "decision":
      return (
        <div className="md-decision">
          <b>{c.ui.decision}</b>
          <p>{rich(b.text)}</p>
        </div>
      );
    case "figure":
      return (
        <figure className={`md-figure ${b.kind === "badges" ? "" : "md-wide"}`}>
          <FigureBody kind={b.kind} c={c} />
          {b.caption && <figcaption>{b.caption}</figcaption>}
        </figure>
      );
    case "screens":
      return (
        <figure className="md-figure md-wide">
          <div className="md-panel">
            <div className="md-phones">
              {b.items.map((s) => (
                <div className="md-phone-item" key={s.path}>
                  <Phone path={s.path} title={c.ui.screenAlt(s.label)} />
                  <span>{s.label}</span>
                </div>
              ))}
            </div>
          </div>
          <figcaption>{b.caption}</figcaption>
        </figure>
      );
  }
}

/* ───────────────────────── Ícones da barra de ações ───────────────────────── */

const ICONS = {
  clap: "M8.5 11.5 5.3 8.3a1.3 1.3 0 0 1 1.8-1.8l4.6 4.6M9.8 8.4 8 6.6a1.3 1.3 0 0 1 1.8-1.8l4.6 4.6m-2.7-2.7a1.3 1.3 0 0 1 1.8-1.8l4.2 4.2c2.4 2.4 2.4 6.3 0 8.7a6.1 6.1 0 0 1-8.7 0l-4.4-4.4a1.3 1.3 0 0 1 1.8-1.8l2.1 2.1M15 3.5l.6-1.8M18 4.3l1.3-1.3M19 7l1.8-.5",
  comment: "M18 16.8a7.1 7.1 0 0 0 2.2-5.1C20.2 7.4 16.5 4 12 4s-8.2 3.4-8.2 7.7 3.7 7.7 8.2 7.7c1 0 2-.2 2.9-.5l3.9 1.6-.8-3.7Z",
  save: "M17.5 20 12 16.2 6.5 20V5.5A1.5 1.5 0 0 1 8 4h8a1.5 1.5 0 0 1 1.5 1.5V20Z",
  share: "M15.2 7.8 12 4.6 8.8 7.8M12 4.6v10M7 11H5.5v8.5h13V11H17",
};

function ActionIcon({ d }: { d: string }) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d={d} stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ActionBar({ c }: { c: Content }) {
  const link = (d: string, label: string, href = MEDIUM_URL) => (
    <a href={href} target="_blank" rel="noopener noreferrer" aria-label={label} title={label}>
      <ActionIcon d={d} />
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

function pickInitialLang(): Lang | null {
  try {
    const q = new URLSearchParams(window.location.search).get("lang");
    if (q && (LANGS as readonly string[]).includes(q)) return q as Lang;
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored && (LANGS as readonly string[]).includes(stored)) return stored as Lang;
  } catch {
    // localStorage indisponível: abre em português, como no Medium
  }
  return null;
}

// Idioma escolhido, guardado fora do React. No servidor vale sempre "pt".
const listeners = new Set<() => void>();
let currentLang: Lang | null = null;
function getLang(): Lang {
  if (currentLang === null) currentLang = pickInitialLang() ?? "pt";
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
    document.title = `${c.title}`;
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
            {c.ui.minRead(readingMinutes(c))} · <time dateTime="2026-05-21">{c.ui.date}</time>
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

          <ul className="md-tags" aria-label={c.ui.topics}>
            {c.tags.map((t) => (
              <li key={t}>{t}</li>
            ))}
          </ul>

          <ActionBar c={c} />
        </article>
      </main>

      <aside className="md-author" aria-label={c.ui.writtenBy} lang={c.htmlLang}>
        <div className="md-author-inner">
          <div className="md-avatar md-avatar-lg">
            <Image src={AUTHOR_PHOTO} alt={AUTHOR} width={72} height={72} unoptimized />
          </div>
          <div className="md-author-row">
            <div>
              <h3>{c.ui.writtenBy}</h3>
              <p>{c.ui.authorBio}</p>
            </div>
            <div className="md-author-links">
              <a className="md-btn md-btn-green" href={MEDIUM_URL} target="_blank" rel="noopener noreferrer">
                {c.ui.readOnMedium}
              </a>
              <Link className="md-btn md-btn-outline" href={PROTOTYPE_URL} target="_blank">
                {c.ui.openPrototype}
              </Link>
            </div>
          </div>
          <p className="md-footnote">{c.ui.footnote}</p>
        </div>
      </aside>
    </>
  );
}
