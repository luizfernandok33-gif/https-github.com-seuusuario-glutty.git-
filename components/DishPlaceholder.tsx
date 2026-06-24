// Placeholder reutilizável para quando NÃO temos a foto real do prato.
// Importante: nunca usar foto de outro prato/restaurante para "preencher" —
// é melhor mostrar este aviso honesto do que uma informação incorreta.
export function DishImagePlaceholder({ rounded = 16, bordered = true }: { rounded?: number; bordered?: boolean }) {
  return (
    <div
      className="w-full h-full flex flex-col items-center justify-center gap-1.5"
      style={{ backgroundColor: "#F0EDE8", border: bordered ? "1.5px dashed #C8BFB5" : "none", borderRadius: rounded }}
    >
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" stroke="#B0977E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <circle cx="12" cy="13" r="4" stroke="#B0977E" strokeWidth="1.5"/>
      </svg>
      <span className="text-[10px] font-semibold" style={{ color: "#B0977E" }}>Em breve</span>
    </div>
  );
}

// Texto reutilizável para quando ainda não temos descrição/detalhes confiáveis do prato.
export function DishInfoPlaceholder({ className = "" }: { className?: string }) {
  return (
    <p className={`text-[12.5px] italic ${className}`} style={{ color: "#B0977E" }}>
      Em breve mais informações sobre este prato.
    </p>
  );
}
