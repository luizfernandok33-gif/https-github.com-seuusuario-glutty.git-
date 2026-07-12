"use client";

import { useId } from "react";

function PlusGlyph({ className }: { className?: string }) {
  const gradId = useId();
  return (
    <svg viewBox="0 0 100 100" className={className} aria-hidden>
      <defs>
        <linearGradient id={gradId} x1="0" y1="0" x2="100" y2="100">
          <stop offset="0" stopColor="#a78bfa" />
          <stop offset="1" stopColor="#f472b6" />
        </linearGradient>
      </defs>
      <rect x="38" y="4" width="24" height="92" rx="12" fill={`url(#${gradId})`} />
      <rect x="4" y="38" width="92" height="24" rx="12" fill={`url(#${gradId})`} />
    </svg>
  );
}

export function LogoLockup({ className = "" }: { className?: string }) {
  return (
    <div className={`flex flex-col items-center ${className}`}>
      <div className="flex items-center gap-1.5 -skew-x-6 sm:gap-2">
        <span className="text-5xl font-black tracking-tight sm:text-6xl">SO</span>
        <PlusGlyph className="h-9 w-9 sm:h-11 sm:w-11" />
        <span className="text-5xl font-black tracking-tight sm:text-6xl">MA</span>
      </div>
      <span className="-mt-1.5 -skew-x-6 bg-gradient-to-r from-violet-400 to-pink-400 bg-clip-text text-3xl font-black tracking-tight text-transparent sm:text-4xl">
        CRIATIVA
      </span>
      <span className="mt-2.5 text-[11px] font-semibold uppercase tracking-[0.3em] text-white/45">
        Publicidade e Marketing
      </span>
    </div>
  );
}
