
import React, { createContext, useContext, ReactNode } from "react";
import { useCookieConsent } from "@/hooks/use-cookie-consent";

interface CookieConsentContextType {
  cookiePreferences: {
    necessary: boolean;
    analytics: boolean;
    preferences: boolean;
  };
  showBanner: boolean;
  setShowBanner: (show: boolean) => void;
}

const CookieConsentContext = createContext<CookieConsentContextType | undefined>(undefined);

export function CookieConsentProvider({ children }: { children: ReactNode }) {
  const {
    cookiePreferences,
    showBanner,
    setShowBanner
  } = useCookieConsent();

  const value = {
    cookiePreferences,
    showBanner,
    setShowBanner
  };

  return (
    <CookieConsentContext.Provider value={value}>
      {children}
    </CookieConsentContext.Provider>
  );
}

export function useCookieConsentContext() {
  const context = useContext(CookieConsentContext);
  if (context === undefined) {
    throw new Error("useCookieConsentContext must be used within a CookieConsentProvider");
  }
  return context;
}
