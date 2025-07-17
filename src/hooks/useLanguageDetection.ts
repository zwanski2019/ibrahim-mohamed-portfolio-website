
import { useState, useEffect, useCallback } from "react";
import { Language } from "@/context/LanguageContext";
import { getInitialLanguage } from "@/utils/languageDetection";

export function useLanguageDetection() {
  const [language, setLanguageState] = useState<Language>('en');
  const [wasAutoDetected, setWasAutoDetected] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);

  // Initialize language only on client side
  useEffect(() => {
    if (typeof window !== 'undefined' && !isInitialized) {
      const initialLanguage = getInitialLanguage();
      setLanguageState(initialLanguage);
      
      // Check if language was auto-detected (not from localStorage)
      try {
        const savedLanguage = localStorage.getItem('language');
        if (!savedLanguage && initialLanguage !== 'en') {
          setWasAutoDetected(true);
        }
      } catch (error) {
        console.warn('Error checking localStorage:', error);
      }
      
      setIsInitialized(true);
    }
  }, [isInitialized]);

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

  // Set initial direction based on language
  useEffect(() => {
    if (typeof document !== 'undefined' && isInitialized) {
      if (language === 'ar') {
        document.documentElement.dir = 'rtl';
      } else {
        document.documentElement.dir = 'ltr';
      }
    }
  }, [language, isInitialized]);

  return {
    language,
    setLanguage,
    wasAutoDetected,
    isInitialized
  };
}
