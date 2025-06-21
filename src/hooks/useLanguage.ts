
import { useContext } from 'react';
import { useLanguage as useLanguageFromContext } from '@/context/LanguageContext';

export const useLanguage = () => {
  return useLanguageFromContext();
};
