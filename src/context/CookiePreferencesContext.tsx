
import React, { createContext, useContext, useState } from "react";
import { useCookieConsent } from "@/hooks/use-cookie-consent";

interface CookiePreferencesContextType {
  cookiePreferences: {
    necessary: boolean;
    analytics: boolean;
    marketing: boolean;
    preferences: boolean;
  };
  showBanner: boolean;
  setShowBanner: (show: boolean) => void;
  handleAcceptAll: () => void;
  handleRejectAll: () => void;
  handleAcceptSelected: () => void;
  handleTogglePreference: (key: "necessary" | "analytics" | "marketing" | "preferences") => void;
}

const CookiePreferencesContext = createContext<CookiePreferencesContextType | undefined>(undefined);

export function CookiePreferencesProvider({ children }: { children: React.ReactNode }) {
  const {
    cookiePreferences,
    showBanner, 
    setShowBanner,
    saveCookiePreferences
  } = useCookieConsent();

  const handleAcceptAll = () => {
    const allAccepted = {
      necessary: true,
      analytics: true,
      marketing: true,
      preferences: true,
    };
    saveCookiePreferences(allAccepted);
  };

  const handleAcceptSelected = () => {
    saveCookiePreferences(cookiePreferences);
  };

  const handleRejectAll = () => {
    const onlyNecessary = {
      necessary: true,
      analytics: false,
      marketing: false,
      preferences: false,
    };
    saveCookiePreferences(onlyNecessary);
  };

  const handleTogglePreference = (key: keyof typeof cookiePreferences) => {
    if (key === "necessary") return; // Cannot toggle necessary cookies
    const newPreferences = {
      ...cookiePreferences,
      [key]: !cookiePreferences[key],
    };
    saveCookiePreferences(newPreferences);
  };

  const value = {
    cookiePreferences,
    showBanner,
    setShowBanner,
    handleAcceptAll,
    handleRejectAll,
    handleAcceptSelected,
    handleTogglePreference,
  };

  return (
    <CookiePreferencesContext.Provider value={value}>
      {children}
    </CookiePreferencesContext.Provider>
  );
}

export function useCookiePreferences() {
  const context = useContext(CookiePreferencesContext);
  if (context === undefined) {
    throw new Error("useCookiePreferences must be used within a CookiePreferencesProvider");
  }
  return context;
}
