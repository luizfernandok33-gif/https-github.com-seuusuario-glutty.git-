"use client";

import { createContext, useContext, useEffect, useSyncExternalStore, type ReactNode } from "react";
import { translations, type Lang, type TextDict } from "./translations";

interface LanguageContextValue {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: TextDict;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

const STORAGE_KEY = "glutty-lang";
const listeners = new Set<() => void>();

function isLang(value: string | null): value is Lang {
  return value === "pt" || value === "en";
}

function getSnapshot(): Lang {
  const stored = localStorage.getItem(STORAGE_KEY);
  return isLang(stored) ? stored : "pt";
}

function getServerSnapshot(): Lang {
  return "pt";
}

function subscribe(callback: () => void) {
  listeners.add(callback);
  return () => listeners.delete(callback);
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const lang = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  useEffect(() => {
    document.documentElement.lang = lang === "pt" ? "pt-BR" : "en";
  }, [lang]);

  const setLang = (next: Lang) => {
    localStorage.setItem(STORAGE_KEY, next);
    listeners.forEach((listener) => listener());
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, t: translations[lang] }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within a LanguageProvider");
  return ctx;
}
