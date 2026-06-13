import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import type { Locale } from '../../data/landing';

interface LangContextValue {
  locale: Locale;
  setLocale: (locale: Locale) => void;
}

const LangContext = createContext<LangContextValue | null>(null);

function readSavedLocale(): Locale {
  if (typeof localStorage === 'undefined') return 'id';
  const saved = localStorage.getItem('widya-locale');
  return saved === 'en' ? 'en' : 'id';
}

export function LangProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(readSavedLocale);

  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  const setLocale = (next: Locale) => {
    setLocaleState(next);
    localStorage.setItem('widya-locale', next);
    document.documentElement.lang = next;
  };

  return (
    <LangContext.Provider value={{ locale, setLocale }}>
      {children}
    </LangContext.Provider>
  );
}

export function useLang() {
  const ctx = useContext(LangContext);
  if (!ctx) throw new Error('useLang must be used within LangProvider');
  return ctx;
}
