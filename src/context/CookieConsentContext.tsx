
import React, { createContext, useContext, ReactNode } from "react";

interface CookieConsentContextType {
  consentGiven: boolean;
  setConsentGiven: (consent: boolean) => void;
}

const CookieConsentContext = createContext<CookieConsentContextType | undefined>(undefined);

export const CookieConsentProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [consentGiven, setConsentGiven] = React.useState(false);

  return (
    <CookieConsentContext.Provider value={{ consentGiven, setConsentGiven }}>
      {children}
    </CookieConsentContext.Provider>
  );
};

export const useCookieConsent = () => {
  const context = useContext(CookieConsentContext);
  if (context === undefined) {
    throw new Error('useCookieConsent must be used within a CookieConsentProvider');
  }
  return context;
};
