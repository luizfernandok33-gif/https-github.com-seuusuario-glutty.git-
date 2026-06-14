"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Search } from "lucide-react";
import { useLanguage } from "@/lib/i18n/LanguageProvider";

// Ícone de Favoritos — SVG enviado pelo usuário (coração).
function IconFavorito({ size, active, color }: { size: number; active: boolean; color: string }) {
  if (active) {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M2 9.1371C2 14 6.01943 16.5914 8.96173 18.9109C10 19.7294 11 20.5 12 20.5C13 20.5 14 19.7294 15.0383 18.9109C17.9806 16.5914 22 14 22 9.1371C22 4.27416 16.4998 0.825464 12 5.50063C7.50016 0.825464 2 4.27416 2 9.1371Z" fill={color}/>
      </svg>
    );
  }
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M16.1111 3C19.6333 3 22 6.3525 22 9.48C22 15.8138 12.1778 21 12 21C11.8222 21 2 15.8138 2 9.48C2 6.3525 4.36667 3 7.88889 3C9.91111 3 11.2333 4.02375 12 4.92375C12.7667 4.02375 14.0889 3 16.1111 3Z" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

// Ícone de Perfil — SVGs enviados pelo usuário (outline / filled).
function IconPerfil({ size, active, color }: { size: number; active: boolean; color: string }) {
  if (active) {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fillRule="evenodd" clipRule="evenodd" d="M6.75 6.5C6.75 3.6005 9.1005 1.25 12 1.25C14.8995 1.25 17.25 3.6005 17.25 6.5C17.25 9.3995 14.8995 11.75 12 11.75C9.1005 11.75 6.75 9.3995 6.75 6.5Z" fill={color}/>
        <path fillRule="evenodd" clipRule="evenodd" d="M4.25 18.5714C4.25 15.6325 6.63249 13.25 9.57143 13.25H14.4286C17.3675 13.25 19.75 15.6325 19.75 18.5714C19.75 20.8792 17.8792 22.75 15.5714 22.75H8.42857C6.12081 22.75 4.25 20.8792 4.25 18.5714Z" fill={color}/>
      </svg>
    );
  }
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 11C14.4853 11 16.5 8.98528 16.5 6.5C16.5 4.01472 14.4853 2 12 2C9.51472 2 7.5 4.01472 7.5 6.5C7.5 8.98528 9.51472 11 12 11Z" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M5 18.5714C5 16.0467 7.0467 14 9.57143 14H14.4286C16.9533 14 19 16.0467 19 18.5714C19 20.465 17.465 22 15.5714 22H8.42857C6.53502 22 5 20.465 5 18.5714Z" stroke={color} strokeWidth="1.5"/>
    </svg>
  );
}

// Ícone de Início — SVG enviado pelo usuário (casinha preenchida),
// recolorido via currentColor para acompanhar os estados ativo/inativo da nav.
function IconHome({ size, color }: { size: number; active: boolean; color: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path fillRule="evenodd" clipRule="evenodd" d="M20.479 7.57827L15.093 3.12502C13.2787 1.62499 10.7213 1.62499 8.90703 3.12502L3.52097 7.57827C2.55059 8.38059 2 9.59705 2 10.8663V17.8109C2 20.066 3.73415 22 6 22H8C9.10457 22 10 21.1046 10 20V16.7478C10 15.4803 10.9521 14.5587 12 14.5587C13.0479 14.5587 14 15.4803 14 16.7478V20C14 21.1046 14.8954 22 16 22H18C20.2659 22 22 20.066 22 17.8109V10.8663C22 9.59706 21.4494 8.38059 20.479 7.57827Z" fill={color}/>
    </svg>
  );
}

// Ícone de Comunidade — SVGs enviados pelo usuário (balão de chat com 3 pontos),
// recoloridos via currentColor para acompanhar os estados ativo/inativo da nav.
function IconComunidade({ size, active, color }: { size: number; active: boolean; color: string }) {
  if (active) {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 13.5997 2.37562 15.1116 3.04346 16.4525C3.22094 16.8088 3.28001 17.2161 3.17712 17.6006L2.58151 19.8267C2.32295 20.793 3.20701 21.677 4.17335 21.4185L6.39939 20.8229C6.78393 20.72 7.19121 20.7791 7.54753 20.9565C8.88837 21.6244 10.4003 22 12 22Z" fill={color}/>
        <path d="M15 12C15 12.5523 15.4477 13 16 13C16.5523 13 17 12.5523 17 12C17 11.4477 16.5523 11 16 11C15.4477 11 15 11.4477 15 12Z" fill="#C6F59D"/>
        <path d="M11 12C11 12.5523 11.4477 13 12 13C12.5523 13 13 12.5523 13 12C13 11.4477 12.5523 11 12 11C11.4477 11 11 11.4477 11 12Z" fill="#C6F59D"/>
        <path d="M7 12C7 12.5523 7.44772 13 8 13C8.55228 13 9 12.5523 9 12C9 11.4477 8.55228 11 8 11C7.44772 11 7 11.4477 7 12Z" fill="#C6F59D"/>
      </svg>
    );
  }
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 13.5997 2.37562 15.1116 3.04346 16.4525C3.22094 16.8088 3.28001 17.2161 3.17712 17.6006L2.58151 19.8267C2.32295 20.793 3.20701 21.677 4.17335 21.4185L6.39939 20.8229C6.78393 20.72 7.19121 20.7791 7.54753 20.9565C8.88837 21.6244 10.4003 22 12 22Z" stroke={color} strokeWidth="1.5"/>
      <path opacity="0.5" d="M8 12H8.009M11.991 12H12M15.991 12H16" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

export default function BottomNav() {
  const pathname = usePathname();
  const { t } = useLanguage();

  const navItems = [
    { href: "/home",       label: t.bottomNav.inicio,       Icon: null   },
    { href: "/busca",      label: t.bottomNav.restaurantes, Icon: Search },
    { href: "/favoritos",  label: t.bottomNav.favoritos,    Icon: null   },
    { href: "/comunidade", label: t.bottomNav.comunidade,   Icon: null   },
    { href: "/perfil",     label: t.bottomNav.perfil,       Icon: null   },
  ];

  return (
    <nav className="fixed bottom-5 left-1/2 -translate-x-1/2 z-50">
      <div
        className="flex items-center gap-1 px-2 py-2 rounded-full"
        style={{
          backgroundColor: "#1F3D34",
          boxShadow: "0 8px 32px rgba(31,61,52,0.4), 0 2px 8px rgba(0,0,0,0.18)",
        }}
      >
        {navItems.map(({ href, label, Icon }) => {
          const isActive = pathname === href || (pathname.startsWith(href + "/") && href !== "/");
          const isPerfil = href === "/perfil";

          return (
            <Link
              key={href}
              href={href}
              className="relative flex items-center rounded-full transition-all duration-300 active:scale-95"
              style={{
                backgroundColor: isActive ? "#C6F59D" : "transparent",
                paddingTop: 10,
                paddingBottom: 10,
                paddingLeft: isActive ? 16 : 14,
                paddingRight: isActive ? 20 : 14,
                gap: isActive ? 8 : 0,
              }}
            >
              {Icon ? (
                <Icon
                  size={20}
                  strokeWidth={isActive ? 2.5 : 1.8}
                  fill={isActive ? "#1F3D34" : "none"}
                  style={{ color: isActive ? "#1F3D34" : "#C6F59D", flexShrink: 0 }}
                />
              ) : (
                <span style={{ flexShrink: 0, display: "inline-flex" }}>
                  {href === "/comunidade" && <IconComunidade size={20} active={isActive} color={isActive ? "#1F3D34" : "#C6F59D"} />}
                  {href === "/home" && <IconHome size={20} active={isActive} color={isActive ? "#1F3D34" : "#C6F59D"} />}
                  {href === "/favoritos" && <IconFavorito size={20} active={isActive} color={isActive ? "#1F3D34" : "#C6F59D"} />}
                  {href === "/perfil" && <IconPerfil size={20} active={isActive} color={isActive ? "#1F3D34" : "#C6F59D"} />}
                </span>
              )}
              {/* Ponto de notificação no ícone de Perfil */}
              {isPerfil && !isActive && (
                <span
                  className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full border border-[#1F3D34]"
                  style={{ backgroundColor: "#E53935" }}
                />
              )}
              <span
                className="text-[13px] overflow-hidden whitespace-nowrap transition-all duration-300"
                style={{
                  fontFamily: "var(--font-nunito), 'Nunito', sans-serif",
                  fontWeight: 900,
                  color: "#1F3D34",
                  maxWidth: isActive ? 90 : 0,
                  opacity: isActive ? 1 : 0,
                }}
              >
                {label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
