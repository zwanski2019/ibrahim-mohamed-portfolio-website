
import React, { useState, useEffect } from "react";
import { Language } from "@/context/LanguageContext";
import { getInitialLanguage } from "@/utils/languageDetection";

export function useLanguageDetection() {
  const [language, setLanguageState] = useState<Language>(getInitialLanguage);
  const [wasAutoDetected, setWasAutoDetected] = useState(false);

  useEffect(() => {
    // Check if language was auto-detected (not from localStorage)
    const savedLanguage = localStorage.getItem('language');
    if (!savedLanguage && language !== 'en') {
      setWasAutoDetected(true);
    }
  }, [language]);

  const setLanguage = (newLanguage: Language) => {
    setLanguageState(newLanguage);
    localStorage.setItem('language', newLanguage);
    setWasAutoDetected(false); // Reset auto-detection flag when user manually changes language
    
    // Update document direction for RTL languages
    if (newLanguage === 'ar') {
      document.documentElement.dir = 'rtl';
    } else {
      document.documentElement.dir = 'ltr';
    }
  };

  // Set initial direction based on language
  useEffect(() => {
    if (language === 'ar') {
      document.documentElement.dir = 'rtl';
    } else {
      document.documentElement.dir = 'ltr';
    }
  }, [language]);

  return {
    language,
    setLanguage,
    wasAutoDetected
  };
}
