import React, { createContext, useContext, useMemo, useState } from "react";
import ca from "./ca";
import es from "./es";
import en from "./en";
import fr from "./fr";

export type Language = "ca" | "es" | "en" | "fr";

const messages = {
  ca,
  es,
  en,
  fr,
};

type LanguageContextType = {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: typeof es;
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>("ca");

  const value = useMemo(
    () => ({
      language,
      setLanguage,
      t: messages[language],
    }),
    [language]
  );

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);

  if (!context) {
    throw new Error("useLanguage debe usarse dentro de LanguageProvider");
  }

  return context;
}