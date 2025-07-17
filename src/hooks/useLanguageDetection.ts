
import { useState, useEffect, useCallback } from "react";
import { Language } from "@/context/LanguageContext";
import { getInitialLanguage } from "@/utils/languageDetection";

export function useLanguageDetection() {
  // Initialize immediately with detected language (synchronous)
  const [language, setLanguageState] = useState<Language>(() => {
    try {
      if (typeof window !== 'undefined') {
        return getInitialLanguage();
      }
      return 'en';
    } catch (error) {
      console.debug('Language detection error:', error);
      return 'en';
    }
  });
  
  const [wasAutoDetected, setWasAutoDetected] = useState(() => {
    try {
      if (typeof window !== 'undefined') {
        const savedLanguage = localStorage.getItem('language');
        const initialLanguage = getInitialLanguage();
        return !savedLanguage && initialLanguage !== 'en';
      }
      return false;
    } catch (error) {
      console.debug('Auto-detection check error:', error);
      return false;
    }
  });
  
  const [isInitialized, setIsInitialized] = useState(true); // Always initialized now

  // Set initial direction on mount
  useEffect(() => {
    try {
      if (typeof document !== 'undefined') {
        if (language === 'ar') {
          document.documentElement.dir = 'rtl';
        } else {
          document.documentElement.dir = 'ltr';
        }
      }
    } catch (error) {
      console.debug('Error setting document direction:', error);
    }
  }, []);

  const setLanguage = useCallback((newLanguage: Language) => {
    try {
      setLanguageState(newLanguage);
      
      try {
        localStorage.setItem('language', newLanguage);
      } catch (error) {
        console.debug('Error saving language to localStorage:', error);
      }
      
      setWasAutoDetected(false); // Reset auto-detection flag when user manually changes language
      
      // Update document direction for RTL languages
      if (typeof document !== 'undefined') {
        if (newLanguage === 'ar') {
          document.documentElement.dir = 'rtl';
        } else {
          document.documentElement.dir = 'ltr';
        }
      }
    } catch (error) {
      console.debug('Error setting language:', error);
    }
  }, []);

  // Update direction when language changes
  useEffect(() => {
    try {
      if (typeof document !== 'undefined') {
        if (language === 'ar') {
          document.documentElement.dir = 'rtl';
        } else {
          document.documentElement.dir = 'ltr';
        }
      }
    } catch (error) {
      console.debug('Error updating document direction:', error);
    }
  }, [language]);

  return {
    language,
    setLanguage,
    wasAutoDetected,
    isInitialized
  };
}
