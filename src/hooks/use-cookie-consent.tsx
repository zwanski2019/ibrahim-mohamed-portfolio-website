
import { useState, useEffect } from "react";

export type CookiePreferences = {
  necessary: boolean;
  analytics: boolean;
  marketing: boolean;
  preferences: boolean;
};

export const useCookieConsent = () => {
  const [cookiePreferences, setCookiePreferences] = useState<CookiePreferences>({
    necessary: true,
    analytics: false,
    marketing: false,
    preferences: false,
  });

  const [hasConsented, setHasConsented] = useState<boolean>(false);
  const [showBanner, setShowBanner] = useState<boolean>(false);

  useEffect(() => {
    const consentCookie = getCookie("cookie-consent");
    if (consentCookie) {
      try {
        const savedPreferences = JSON.parse(consentCookie);
        setCookiePreferences(savedPreferences);
        setHasConsented(true);
      } catch (e) {
        console.error("Error parsing cookie consent:", e);
        setShowBanner(true);
      }
    } else {
      // No consent cookie found, show the banner
      setShowBanner(true);
    }
  }, []);

  const saveCookiePreferences = (preferences: CookiePreferences) => {
    // Set cookie for 6 months
    const expiryDate = new Date();
    expiryDate.setMonth(expiryDate.getMonth() + 6);
    document.cookie = `cookie-consent=${JSON.stringify(
      preferences
    )}; expires=${expiryDate.toUTCString()}; path=/; SameSite=Lax`;
    
    setCookiePreferences(preferences);
    setHasConsented(true);
    setShowBanner(false);
    
    // Return the new preferences
    return preferences;
  };

  const resetConsent = () => {
    document.cookie = "cookie-consent=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    setHasConsented(false);
    setShowBanner(true);
    setCookiePreferences({
      necessary: true,
      analytics: false,
      marketing: false,
      preferences: false,
    });
  };

  const getCookie = (name: string): string | null => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop()?.split(";").shift() || null;
    return null;
  };

  const isAllowed = (type: keyof CookiePreferences): boolean => {
    return cookiePreferences[type] === true;
  };

  return {
    cookiePreferences,
    hasConsented,
    showBanner,
    setShowBanner,
    saveCookiePreferences,
    resetConsent,
    isAllowed,
  };
};
