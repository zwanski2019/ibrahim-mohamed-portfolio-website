
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
  const { language, setLanguage, wasAutoDetected, isInitialized } = useLanguageDetection();

  const t = (key: string): string => {
    if (!isInitialized) return key; // Return key while initializing
    return translations[language]?.[key] || key;
  };

  // Don't render children until language is initialized to prevent hydration mismatches
  if (!isInitialized) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin h-8 w-8 border-2 border-primary border-t-transparent rounded-full"></div>
      </div>
    );
  }

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
