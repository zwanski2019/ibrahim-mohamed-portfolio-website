
import { Language } from "@/context/LanguageContext";

// Language mapping from browser language codes to our supported languages
const languageMapping: Record<string, Language> = {
  // English variations
  'en': 'en',
  'en-US': 'en',
  'en-GB': 'en',
  'en-CA': 'en',
  'en-AU': 'en',
  
  // French variations
  'fr': 'fr',
  'fr-FR': 'fr',
  'fr-CA': 'fr',
  'fr-BE': 'fr',
  'fr-CH': 'fr',
  
  // Arabic variations
  'ar': 'ar',
  'ar-SA': 'ar',
  'ar-EG': 'ar',
  'ar-TN': 'ar',
  'ar-DZ': 'ar',
  'ar-MA': 'ar',
  'ar-LY': 'ar',
  
  // Hausa variations
  'ha': 'ha',
  'ha-NG': 'ha',
  'ha-NE': 'ha',
  
  // Berber/Tamazight variations
  'ber': 'ber',
  'tzm': 'ber',
  'kab': 'ber',
  'taq': 'ber',
};

/**
 * Detects the user's preferred language from browser settings
 * @returns The detected language code that matches our supported languages, or null if none match
 */
export const detectBrowserLanguage = (): Language | null => {
  // Get all browser language preferences
  const browserLanguages = [
    navigator.language,
    ...(navigator.languages || [])
  ];

  // Try to find a matching language
  for (const browserLang of browserLanguages) {
    const normalizedLang = browserLang.toLowerCase();
    
    // Direct match
    if (languageMapping[normalizedLang]) {
      return languageMapping[normalizedLang];
    }
    
    // Try base language (e.g., 'fr' from 'fr-FR')
    const baseLang = normalizedLang.split('-')[0];
    if (languageMapping[baseLang]) {
      return languageMapping[baseLang];
    }
  }

  return null;
};

/**
 * Gets the initial language considering browser detection and localStorage
 * @returns The language to use on app initialization
 */
export const getInitialLanguage = (): Language => {
  // Check if user has a saved preference
  const savedLanguage = localStorage.getItem('language') as Language;
  if (savedLanguage) {
    return savedLanguage;
  }

  // Detect browser language for first-time visitors
  const detectedLanguage = detectBrowserLanguage();
  if (detectedLanguage) {
    return detectedLanguage;
  }

  // Fallback to English
  return 'en';
};

/**
 * Checks if this is the user's first visit (no language preference saved)
 * @returns true if this is a first visit, false otherwise
 */
export const isFirstVisit = (): boolean => {
  return !localStorage.getItem('language');
};
