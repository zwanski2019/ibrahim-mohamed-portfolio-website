
import { useState, useEffect } from "react";

// Extend window object to include Axeptio
declare global {
  interface Window {
    axeptio: {
      on: (event: string, callback: Function) => void;
      getUserConsent: () => any;
      getAllVendorsConsent: () => any;
    };
  }
}

export type CookiePreferences = {
  necessary: boolean;
  analytics: boolean;
  preferences: boolean;
};

export const useCookieConsent = () => {
  const [cookiePreferences, setCookiePreferences] = useState<CookiePreferences>({
    necessary: true,
    analytics: false,
    preferences: false,
  });

  const [hasConsented, setHasConsented] = useState<boolean>(false);
  const [showBanner, setShowBanner] = useState<boolean>(false);

  // Function to sync with Axeptio consent data
  const syncWithAxeptio = () => {
    if (typeof window !== 'undefined' && window.axeptio) {
      try {
        const axeptioConsent = window.axeptio.getUserConsent();
        if (axeptioConsent) {
          const preferences: CookiePreferences = {
            necessary: true, // Always true
            analytics: axeptioConsent.analytics || false,
            preferences: axeptioConsent.preferences || false,
          };
          setCookiePreferences(preferences);
          setHasConsented(true);
          setShowBanner(false);
        }
      } catch (error) {
        console.error("Error syncing with Axeptio:", error);
      }
    }
  };

  useEffect(() => {
    // Check if Axeptio is loaded and sync consent
    const checkAxeptio = () => {
      if (typeof window !== 'undefined' && window.axeptio) {
        // Listen for Axeptio consent events
        window.axeptio.on('ready', syncWithAxeptio);
        window.axeptio.on('consent', syncWithAxeptio);
        
        // Initial sync
        syncWithAxeptio();
      } else {
        // Axeptio not loaded yet, try again in 100ms
        setTimeout(checkAxeptio, 100);
      }
    };

    checkAxeptio();

    // Fallback: Check for legacy cookie consent for migration
    const legacyConsent = getCookie("cookie-consent");
    if (legacyConsent && !hasConsented) {
      try {
        const savedPreferences = JSON.parse(legacyConsent);
        setCookiePreferences(savedPreferences);
        setHasConsented(true);
      } catch (e) {
        console.error("Error parsing legacy cookie consent:", e);
      }
    }
  }, []);

  const saveCookiePreferences = (preferences: CookiePreferences) => {
    setCookiePreferences(preferences);
    setHasConsented(true);
    setShowBanner(false);
    return preferences;
  };

  const resetConsent = () => {
    // Reset Axeptio consent if available
    if (typeof window !== 'undefined' && window.axeptio) {
      // Axeptio will handle resetting consent
      location.reload(); // Reload to show Axeptio banner again
    }
    
    setHasConsented(false);
    setShowBanner(true);
    setCookiePreferences({
      necessary: true,
      analytics: false,
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

  const handleAcceptAll = () => {
    // This will be handled by Axeptio
    const allAccepted = {
      necessary: true,
      analytics: true,
      preferences: true,
    };
    saveCookiePreferences(allAccepted);
  };

  return {
    cookiePreferences,
    hasConsented,
    showBanner: false, // Axeptio handles the banner
    setShowBanner,
    saveCookiePreferences,
    resetConsent,
    isAllowed,
    handleAcceptAll,
  };
};
