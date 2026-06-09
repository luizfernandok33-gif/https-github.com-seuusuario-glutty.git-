"use client";
import { useState } from "react";
import {
  Globe, Bell, HelpCircle, Info,
  ChevronRight, ShieldCheck, Moon, Vibrate,
  MessageSquare, ExternalLink, Star,
} from "lucide-react";
import BackButton from "@/components/BackButton";
import { useLanguage } from "@/lib/i18n/LanguageProvider";

/* ── Toggle component ── */
function Toggle({ active, onToggle }: { active: boolean; onToggle: () => void }) {
  return (
    <button
      onClick={onToggle}
      className="relative transition-all active:scale-95"
      style={{
        width: 44,
        height: 26,
        borderRadius: 999,
        backgroundColor: active ? "#FC6904" : "#E5E7EB",
        flexShrink: 0,
      }}
    >
      <span
        className="absolute top-1 transition-all"
        style={{
          width: 18,
          height: 18,
          borderRadius: "50%",
          backgroundColor: "#fff",
          boxShadow: "0 1px 4px rgba(0,0,0,0.2)",
          left: active ? 22 : 4,
        }}
      />
    </button>
  );
}

export default function ConfiguracoesPage() {
  const { t } = useLanguage();
  const [language,        setLanguage]        = useState("Português");
  const [notifSafety,     setNotifSafety]     = useState(true);
  const [notifNew,        setNotifNew]        = useState(true);
  const [notifReviews,    setNotifReviews]    = useState(false);
  const [notifPromo,      setNotifPromo]      = useState(false);
  const [darkMode,        setDarkMode]        = useState(false);
  const [vibration,       setVibration]       = useState(true);

  const LANGUAGES = ["Português", "English", "Español", "Deutsch", "Français"];
  const [showLangPicker, setShowLangPicker] = useState(false);

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
        <div className="flex items-start gap-3">
          <BackButton />
          <div>
            <h1 className="font-black text-primary text-base font-display leading-tight">{t.configuracoes.title}</h1>
            <p className="text-[12px] text-text-disabled mt-0.5">{t.configuracoes.subtitle}</p>
          </div>
        </div>
      </div>

      <div className="px-5 pt-4 space-y-4">

        {/* ── Idioma ── */}
        <Section title={t.configuracoes.sections.language} icon={Globe} iconColor="#1565C0" iconBg="#E3F2FD">
          <div>
            <button
              onClick={() => setShowLangPicker(!showLangPicker)}
              className="w-full flex items-center justify-between py-3 active:scale-[0.98] transition-transform"
            >
              <span className="text-text-primary text-[14px] font-semibold">{t.configuracoes.appLanguage}</span>
              <div className="flex items-center gap-1.5">
                <span className="text-text-disabled text-[13px]">{t.configuracoes.languageNames[language] ?? language}</span>
                <ChevronRight
                  size={14}
                  className="text-text-disabled transition-transform"
                  style={{ transform: showLangPicker ? "rotate(90deg)" : "rotate(0deg)" }}
                />
              </div>
            </button>

            {showLangPicker && (
              <div className="mt-1 border-t border-border pt-2 space-y-0.5">
                {LANGUAGES.map((lang) => (
                  <button
                    key={lang}
                    onClick={() => { setLanguage(lang); setShowLangPicker(false); }}
                    className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl active:bg-background transition-colors"
                  >
                    <span className="text-text-primary text-[13px] font-medium">{lang}</span>
                    {language === lang && (
                      <span className="w-2 h-2 rounded-full" style={{ backgroundColor: "#FC6904" }} />
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>
        </Section>

        {/* ── Notificações ── */}
        <Section title={t.configuracoes.sections.notifications} icon={Bell} iconColor="#FC6904" iconBg="#FFF0E6">
          <ToggleRow
            label={t.configuracoes.notificationRows.safety.label}
            description={t.configuracoes.notificationRows.safety.description}
            active={notifSafety}
            onToggle={() => setNotifSafety(!notifSafety)}
          />
          <div className="border-t border-border" />
          <ToggleRow
            label={t.configuracoes.notificationRows.new.label}
            description={t.configuracoes.notificationRows.new.description}
            active={notifNew}
            onToggle={() => setNotifNew(!notifNew)}
          />
          <div className="border-t border-border" />
          <ToggleRow
            label={t.configuracoes.notificationRows.reviews.label}
            description={t.configuracoes.notificationRows.reviews.description}
            active={notifReviews}
            onToggle={() => setNotifReviews(!notifReviews)}
          />
          <div className="border-t border-border" />
          <ToggleRow
            label={t.configuracoes.notificationRows.promo.label}
            description={t.configuracoes.notificationRows.promo.description}
            active={notifPromo}
            onToggle={() => setNotifPromo(!notifPromo)}
          />
        </Section>

        {/* ── Aparência ── */}
        <Section title={t.configuracoes.sections.appearance} icon={Moon} iconColor="#6A1B9A" iconBg="#F3E5F5">
          <ToggleRow
            label={t.configuracoes.appearanceRows.darkMode.label}
            description={t.configuracoes.appearanceRows.darkMode.description}
            active={darkMode}
            onToggle={() => setDarkMode(!darkMode)}
          />
          <div className="border-t border-border" />
          <ToggleRow
            label={t.configuracoes.appearanceRows.vibration.label}
            description={t.configuracoes.appearanceRows.vibration.description}
            active={vibration}
            onToggle={() => setVibration(!vibration)}
          />
        </Section>

        {/* ── Segurança ── */}
        <Section title={t.configuracoes.sections.security} icon={ShieldCheck} iconColor="#2E7D32" iconBg="#E8F5E9">
          <LinkRow label={t.configuracoes.security.pattern} detail={t.configuracoes.security.patternValue} />
          <div className="border-t border-border" />
          <LinkRow label={t.configuracoes.security.dataPrivacy} />
          <div className="border-t border-border" />
          <LinkRow label={t.configuracoes.security.deleteAccount} danger />
        </Section>

        {/* ── Ajuda ── */}
        <Section title={t.configuracoes.sections.help} icon={HelpCircle} iconColor="#1565C0" iconBg="#E3F2FD">
          <LinkRow label={t.configuracoes.help.helpCenter} external />
          <div className="border-t border-border" />
          <LinkRow label={t.configuracoes.help.contactUs} external />
          <div className="border-t border-border" />
          <LinkRow label={t.configuracoes.help.reportProblem} icon={MessageSquare} />
        </Section>

        {/* ── Sobre ── */}
        <Section title={t.configuracoes.sections.about} icon={Info} iconColor="#7C3AED" iconBg="#EDE9FE">
          <LinkRow label={t.configuracoes.about.version} detail="1.0.0" />
          <div className="border-t border-border" />
          <LinkRow label={t.configuracoes.about.terms} external />
          <div className="border-t border-border" />
          <LinkRow label={t.configuracoes.about.privacyPolicy} external />
          <div className="border-t border-border" />
          <button
            className="w-full flex items-center justify-between py-3 active:scale-[0.98] transition-transform"
          >
            <span className="text-text-primary text-[14px] font-semibold">{t.configuracoes.about.rateApp}</span>
            <div className="flex items-center gap-1">
              {[1,2,3,4,5].map((i) => (
                <Star key={i} size={13} fill="#F59E0B" className="text-warning" />
              ))}
            </div>
          </button>
        </Section>

      </div>
    </div>
  );
}

/* ── Helpers ── */

function Section({
  title,
  icon: Icon,
  iconColor,
  iconBg,
  children,
}: {
  title: string;
  icon: React.ElementType;
  iconColor: string;
  iconBg: string;
  children: React.ReactNode;
}) {
  return (
    <div className="bg-surface rounded-2xl overflow-hidden" style={{ boxShadow: "0 2px 12px rgba(0,0,0,0.05)" }}>
      {/* Section header */}
      <div className="flex items-center gap-2.5 px-4 pt-4 pb-3">
        <div
          className="w-7 h-7 rounded-full flex items-center justify-center shrink-0"
          style={{ backgroundColor: iconBg }}
        >
          <Icon size={14} style={{ color: iconColor }} />
        </div>
        <p className="font-extrabold text-text-primary text-[13px] uppercase tracking-wide">{title}</p>
      </div>
      <div className="border-t border-border mx-4" />
      <div className="px-4 py-1">{children}</div>
    </div>
  );
}

function ToggleRow({
  label,
  description,
  active,
  onToggle,
}: {
  label: string;
  description?: string;
  active: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="flex items-center gap-3 py-3">
      <div className="flex-1 min-w-0">
        <p className="text-text-primary text-[14px] font-semibold">{label}</p>
        {description && (
          <p className="text-text-disabled text-[11px] mt-0.5 leading-snug">{description}</p>
        )}
      </div>
      <Toggle active={active} onToggle={onToggle} />
    </div>
  );
}

function LinkRow({
  label,
  detail,
  danger,
  external,
  icon: Icon,
}: {
  label: string;
  detail?: string;
  danger?: boolean;
  external?: boolean;
  icon?: React.ElementType;
}) {
  return (
    <button className="w-full flex items-center justify-between py-3 active:scale-[0.98] transition-transform">
      <span
        className="text-[14px] font-semibold"
        style={{ color: danger ? "#EF4444" : "var(--color-text-primary)" }}
      >
        {label}
      </span>
      <div className="flex items-center gap-1.5">
        {detail && <span className="text-text-disabled text-[12px]">{detail}</span>}
        {external ? (
          <ExternalLink size={13} className="text-text-disabled" />
        ) : (
          <ChevronRight size={14} className="text-text-disabled" />
        )}
      </div>
    </button>
  );
}
