
import React, { createContext, useContext, ReactNode } from "react";
import { translations } from "./translations";
import { useLanguageDetection } from "@/hooks/useLanguageDetection";

export type Language = "en" | "fr" | "ar" | "ha" | "ber";

interface LanguageContextType {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: string) => string;
  wasAutoDetected: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { language, setLanguage, wasAutoDetected } = useLanguageDetection();

  const t = (key: string): string => {
    return translations[language]?.[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, wasAutoDetected }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
