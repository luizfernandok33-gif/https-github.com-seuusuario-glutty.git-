"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Search, Heart, User, MessageCircle } from "lucide-react";

const navItems = [
  { href: "/home",       label: "Início",       Icon: Home          },
  { href: "/busca",      label: "Restaurantes", Icon: Search        },
  { href: "/favoritos",  label: "Favoritos",    Icon: Heart         },
  { href: "/comunidade", label: "Comunidade",   Icon: MessageCircle },
  { href: "/perfil",     label: "Perfil",       Icon: User          },
];

export default function BottomNav() {
  const pathname = usePathname();

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
              <Icon
                size={20}
                strokeWidth={isActive ? 2.5 : 1.8}
                fill={isActive ? "#1F3D34" : "none"}
                style={{ color: isActive ? "#1F3D34" : "#C6F59D", flexShrink: 0 }}
              />
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
