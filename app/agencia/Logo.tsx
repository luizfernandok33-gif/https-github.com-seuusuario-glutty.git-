"use client";

import { useId } from "react";

export function LogoMark({ className = "h-11 w-11" }: { className?: string }) {
  const gradId = useId();
  return (
    <svg viewBox="0 0 100 100" className={className} aria-hidden>
      <defs>
        <linearGradient id={gradId} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#a78bfa" />
          <stop offset="1" stopColor="#f472b6" />
        </linearGradient>
      </defs>
      {/* Haste e pé do "L" com cantos arredondados */}
      <rect x="16" y="8" width="26" height="84" rx="13" fill={`url(#${gradId})`} />
      <rect x="16" y="66" width="68" height="26" rx="13" fill={`url(#${gradId})`} />
      {/* Planeta orbitando o espaço negativo do L */}
      <circle cx="71" cy="35" r="11" fill={`url(#${gradId})`} />
    </svg>
  );
}

export function LogoLockup({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <LogoMark className="h-12 w-12 sm:h-14 sm:w-14" />
      <div className="text-left">
        <span className="block text-3xl font-black lowercase leading-none tracking-tight sm:text-4xl">
          luíz
        </span>
        <span className="mt-1.5 block text-[10px] font-bold uppercase tracking-[0.28em] text-white/50 sm:text-[11px]">
          Agência de Marketing Digital
        </span>
      </div>
    </div>
  );
}
