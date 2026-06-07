"use client";
import Link from "next/link";
import { ShieldCheck, Store, Star, MessageCircle, Bell, Check, Trash2 } from "lucide-react";
import BackButton from "@/components/BackButton";
import { useState } from "react";

type NotifType = "safety" | "restaurant" | "review" | "system";

interface Notif {
  id: string;
  type: NotifType;
  title: string;
  body: string;
  time: string;
  read: boolean;
}

const initialNotifs: Notif[] = [
  {
    id: "1",
    type: "safety",
    title: "Alerta de segurança",
    body: "Cantina da Nona atualizou seu cardápio. Verifique as novas opções sem glúten.",
    time: "Agora",
    read: false,
  },
  {
    id: "2",
    type: "restaurant",
    title: "Novo restaurante perto de você",
    body: "Verde & Saudável foi adicionado na sua área. Cardápio 100% sem glúten.",
    time: "15 min",
    read: false,
  },
  {
    id: "3",
    type: "review",
    title: "Sua avaliação foi útil!",
    body: "12 celíacos marcaram sua avaliação do Sabor Brasil como útil.",
    time: "1h",
    read: false,
  },
  {
    id: "4",
    type: "safety",
    title: "Aviso de contaminação cruzada",
    body: "Um usuário relatou possível contaminação cruzada no Bistrô Gourmet. Tenha atenção.",
    time: "3h",
    read: true,
  },
  {
    id: "5",
    type: "restaurant",
    title: "Restaurante favorito atualizado",
    body: "Sabor Brasil adicionou 3 novos pratos sem glúten ao cardápio.",
    time: "5h",
    read: true,
  },
  {
    id: "6",
    type: "review",
    title: "Alguém respondeu sua avaliação",
    body: "O dono do Cantina da Nona respondeu à sua avaliação de 5 estrelas.",
    time: "Ontem",
    read: true,
  },
  {
    id: "7",
    type: "system",
    title: "Boas-vindas ao Glútty!",
    body: "Você está protegida. Explore restaurantes seguros perto de você.",
    time: "2 dias",
    read: true,
  },
];

const typeConfig: Record<NotifType, { icon: React.ElementType; color: string; bg: string }> = {
  safety:     { icon: ShieldCheck,     color: "#2E7D32", bg: "#E8F5E9" },
  restaurant: { icon: Store,           color: "#1565C0", bg: "#E3F2FD" },
  review:     { icon: Star,            color: "#D97706", bg: "#FEF3C7" },
  system:     { icon: Bell,            color: "var(--color-accent)", bg: "var(--color-accent-tint)" },
};

export default function NotificacoesPage() {
  const [notifs, setNotifs] = useState<Notif[]>(initialNotifs);

  const unreadCount = notifs.filter((n) => !n.read).length;

  const markAllRead = () => setNotifs((prev) => prev.map((n) => ({ ...n, read: true })));
  const dismiss = (id: string) => setNotifs((prev) => prev.filter((n) => n.id !== id));
  const markRead = (id: string) => setNotifs((prev) => prev.map((n) => n.id === id ? { ...n, read: true } : n));

  const unread = notifs.filter((n) => !n.read);
  const read   = notifs.filter((n) =>  n.read);

  return (
    <div
      className="min-h-dvh bg-background"
      style={{ paddingBottom: "calc(env(safe-area-inset-bottom, 0px) + 100px)" }}
    >
      {/* ── Header ── */}
      <div
        className="px-5 pb-4 bg-background sticky top-0 z-30"
        style={{ paddingTop: "calc(env(safe-area-inset-top, 0px) + 28px)" }}
      >
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-3">
            <BackButton />
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-black text-primary text-base font-display leading-tight">Notificações</h1>
                {unreadCount > 0 && (
                  <span
                    className="text-white text-[10px] font-extrabold px-2 py-0.5 rounded-full"
                    style={{ backgroundColor: "#FC6904" }}
                  >
                    {unreadCount}
                  </span>
                )}
              </div>
              <p className="text-[12px] text-text-disabled mt-0.5">Fique por dentro das novidades</p>
            </div>
          </div>
          {unreadCount > 0 && (
            <button
              onClick={markAllRead}
              className="flex items-center gap-1.5 active:scale-95 transition-transform"
            >
              <Check size={13} className="text-primary" strokeWidth={2.5} />
              <span className="text-primary font-bold text-xs">Marcar todas</span>
            </button>
          )}
        </div>
      </div>

      <div className="px-5 pt-4 space-y-6">

        {/* ── Não lidas ── */}
        {unread.length > 0 && (
          <div>
            <p className="text-[11px] font-extrabold text-text-disabled uppercase tracking-widest mb-3">
              Novas
            </p>
            <div className="space-y-2">
              {unread.map((n) => (
                <NotifCard key={n.id} notif={n} onDismiss={dismiss} onRead={markRead} />
              ))}
            </div>
          </div>
        )}

        {/* ── Lidas ── */}
        {read.length > 0 && (
          <div>
            <p className="text-[11px] font-extrabold text-text-disabled uppercase tracking-widest mb-3">
              Anteriores
            </p>
            <div className="space-y-2">
              {read.map((n) => (
                <NotifCard key={n.id} notif={n} onDismiss={dismiss} onRead={markRead} />
              ))}
            </div>
          </div>
        )}

        {/* ── Vazio ── */}
        {notifs.length === 0 && (
          <div className="flex flex-col items-center text-center py-16">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
              <Bell size={28} className="text-primary" />
            </div>
            <p className="font-bold text-text-primary text-sm mb-1">Tudo em dia!</p>
            <p className="text-text-disabled text-xs max-w-[220px]">
              Você não tem nenhuma notificação no momento.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

function NotifCard({
  notif,
  onDismiss,
  onRead,
}: {
  notif: Notif;
  onDismiss: (id: string) => void;
  onRead: (id: string) => void;
}) {
  const cfg = typeConfig[notif.type];
  const Icon = cfg.icon;

  return (
    <div
      className="flex items-start gap-3 bg-surface rounded-2xl p-4 border transition-all active:scale-[0.98]"
      style={{
        borderColor: notif.read ? "var(--color-border)" : "#FC690430",
        boxShadow: notif.read ? "none" : "0 2px 12px rgba(252,105,4,0.08)",
      }}
      onClick={() => !notif.read && onRead(notif.id)}
    >
      {/* Icon */}
      <div
        className="w-10 h-10 rounded-full flex items-center justify-center shrink-0"
        style={{ backgroundColor: cfg.bg }}
      >
        <Icon size={18} style={{ color: cfg.color }} />
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2">
          <p
            className="font-bold text-text-primary text-[13px] leading-tight"
            style={{ opacity: notif.read ? 0.6 : 1 }}
          >
            {notif.title}
          </p>
          <div className="flex items-center gap-1.5 shrink-0">
            <span className="text-text-disabled text-[10px] whitespace-nowrap">{notif.time}</span>
            {!notif.read && (
              <span className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: "#FC6904" }} />
            )}
          </div>
        </div>
        <p
          className="text-text-secondary text-[11px] mt-1 leading-relaxed"
          style={{ opacity: notif.read ? 0.55 : 1 }}
        >
          {notif.body}
        </p>
      </div>

      {/* Dismiss */}
      <button
        onClick={(e) => { e.stopPropagation(); onDismiss(notif.id); }}
        className="shrink-0 w-6 h-6 rounded-full flex items-center justify-center active:scale-90 transition-transform mt-0.5"
        style={{ backgroundColor: "var(--color-background)" }}
      >
        <Trash2 size={11} className="text-text-disabled" />
      </button>
    </div>
  );
}
