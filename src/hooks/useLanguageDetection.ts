
import { useState, useEffect, useCallback } from "react";
import { Language } from "@/context/LanguageContext";
import { getInitialLanguage } from "@/utils/languageDetection";

export function useLanguageDetection() {
  // Initialize immediately with detected language (synchronous)
  const [language, setLanguageState] = useState<Language>(() => {
    if (typeof window !== 'undefined') {
      return getInitialLanguage();
    }
    return 'en';
  });
  
  const [wasAutoDetected, setWasAutoDetected] = useState(() => {
    if (typeof window !== 'undefined') {
      try {
        const savedLanguage = localStorage.getItem('language');
        const initialLanguage = getInitialLanguage();
        return !savedLanguage && initialLanguage !== 'en';
      } catch (error) {
        console.warn('Error checking localStorage:', error);
        return false;
      }
    }
    return false;
  });
  
  const [isInitialized, setIsInitialized] = useState(true); // Always initialized now

  // Set initial direction on mount
  useEffect(() => {
    if (typeof document !== 'undefined') {
      if (language === 'ar') {
        document.documentElement.dir = 'rtl';
      } else {
        document.documentElement.dir = 'ltr';
      }
    }
  }, []);

  const setLanguage = useCallback((newLanguage: Language) => {
    setLanguageState(newLanguage);
    
    try {
      localStorage.setItem('language', newLanguage);
    } catch (error) {
      console.warn('Error saving language to localStorage:', error);
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
  }, []);

  // Update direction when language changes
  useEffect(() => {
    if (typeof document !== 'undefined') {
      if (language === 'ar') {
        document.documentElement.dir = 'rtl';
      } else {
        document.documentElement.dir = 'ltr';
      }
    }
  }, [language]);

  return {
    language,
    setLanguage,
    wasAutoDetected,
    isInitialized
  };
}
