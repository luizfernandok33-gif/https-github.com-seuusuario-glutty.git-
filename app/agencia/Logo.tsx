export function LogoMark({ className = "h-11 w-11" }: { className?: string }) {
  return (
    <span
      className={`flex shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-400 to-pink-400 font-black text-[#050308] ${className}`}
    >
      L
    </span>
  );
}

export function LogoLockup({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <LogoMark className="h-12 w-12 text-2xl sm:h-14 sm:w-14 sm:text-3xl" />
      <div className="text-left">
        <span className="block -skew-x-6 text-3xl font-black tracking-tight sm:text-4xl">
          Luíz
        </span>
        <span className="block bg-gradient-to-r from-violet-400 to-pink-400 bg-clip-text text-[11px] font-bold uppercase tracking-[0.25em] text-transparent sm:text-xs">
          Agência de Marketing Digital
        </span>
      </div>
    </div>
  );
}
