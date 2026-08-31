/**
 * Ícones decorativos de traço fino no espírito místico das referências
 * do Luiz (cartas de tarot, pôster da Lunas): estrela de 8 pontas, lua
 * crescente, uma pequena constelação e um punhado de sparkles.
 *
 * Cada um é usado dentro de <FloatIcon> (ver page.tsx), que já cuida
 * da cor (dourado via CSS), do drop-shadow sutil e da flutuação leve.
 * Aqui dentro só a geometria.
 */

export function StarburstIcon() {
  return (
    <svg viewBox="0 0 52 52" fill="none" strokeWidth="1.5" strokeLinecap="round" width="34" height="34">
      <line x1="26" y1="1" x2="26" y2="51" />
      <line x1="1" y1="26" x2="51" y2="26" />
      <line x1="8" y1="8" x2="44" y2="44" />
      <line x1="8" y1="44" x2="44" y2="8" />
      <circle cx="26" cy="26" r="2.5" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function MoonIcon() {
  return (
    <svg viewBox="0 0 32 32" fill="none" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" width="30" height="30">
      <path d="M18 3a13 13 0 1 0 0 26 9.5 9.5 0 0 1 0-26Z" />
    </svg>
  );
}

export function SparkleClusterIcon() {
  return (
    <svg viewBox="0 0 48 40" fill="none" width="36" height="30">
      <path d="M14 4c0.6 5 2.4 6.8 7 7.4-4.6 0.6-6.4 2.4-7 7.4-0.6-5-2.4-6.8-7-7.4 4.6-0.6 6.4-2.4 7-7.4Z" fill="currentColor" />
      <path d="M36 14c0.4 3.3 1.6 4.5 4.6 4.9-3 0.4-4.2 1.6-4.6 4.9-0.4-3.3-1.6-4.5-4.6-4.9 3-0.4 4.2-1.6 4.6-4.9Z" fill="currentColor" opacity="0.75" />
      <path d="M26 26c0.3 2.4 1.2 3.3 3.4 3.6-2.2 0.3-3.1 1.2-3.4 3.6-0.3-2.4-1.2-3.3-3.4-3.6 2.2-0.3 3.1-1.2 3.4-3.6Z" fill="currentColor" opacity="0.6" />
    </svg>
  );
}

export function ConstellationIcon() {
  return (
    <svg viewBox="0 0 70 44" fill="none" strokeWidth="0.9" width="52" height="32">
      <path d="M4 34 L28 6 L44 24 L66 4" />
      <circle cx="4" cy="34" r="2.2" fill="currentColor" stroke="none" />
      <circle cx="28" cy="6" r="2.2" fill="currentColor" stroke="none" />
      <circle cx="44" cy="24" r="2.2" fill="currentColor" stroke="none" />
      <circle cx="66" cy="4" r="2.2" fill="currentColor" stroke="none" />
    </svg>
  );
}
