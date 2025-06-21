
import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

export const LanguageDetectionNotice = () => {
  const { language, wasAutoDetected, setLanguage } = useLanguage();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (wasAutoDetected) {
      setIsVisible(true);
    }
  }, [wasAutoDetected]);

  if (!isVisible || !wasAutoDetected) return null;

  const handleAccept = () => {
    setIsVisible(false);
  };

  const handleChangeLanguage = (newLang: "en" | "fr" | "ar" | "ha" | "ber") => {
    setLanguage(newLang);
    setIsVisible(false);
  };

  const getLanguageName = (lang: string) => {
    const names = {
      en: 'English',
      fr: 'Français',
      ar: 'العربية',
      ha: 'Hausa',
      ber: 'Tamazight'
    };
    return names[lang] || lang;
  };

  return (
    <div className="fixed top-0 left-0 right-0 bg-blue-600 text-white p-4 z-50 shadow-lg">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <div className="flex-1">
          <p className="text-sm">
            We detected your language as <strong>{getLanguageName(language)}</strong>. 
            Is this correct?
          </p>
        </div>
        <div className="flex items-center gap-2 ml-4">
          <button
            onClick={handleAccept}
            className="bg-white text-blue-600 px-3 py-1 rounded text-sm font-medium hover:bg-gray-100 transition-colors"
          >
            Yes, continue
          </button>
          <div className="flex gap-1">
            {['en', 'fr', 'ar', 'ha', 'ber'].map((lang) => (
              <button
                key={lang}
                onClick={() => handleChangeLanguage(lang as any)}
                className={`px-2 py-1 text-xs rounded border border-white/30 hover:bg-white/10 transition-colors ${
                  language === lang ? 'bg-white/20' : ''
                }`}
              >
                {getLanguageName(lang)}
              </button>
            ))}
          </div>
          <button
            onClick={() => setIsVisible(false)}
            className="ml-2 p-1 hover:bg-white/10 rounded transition-colors"
            aria-label="Close"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
