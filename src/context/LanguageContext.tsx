import React, { createContext, useContext, useState, useEffect } from 'react';

// Define available languages
export type Language = 'en' | 'fr' | 'ar' | 'ha' | 'ber';

// Create translation dictionaries for each language
export const translations: Record<Language, Record<string, string>> = {
  en: {
    // English translations
    'nav.about': 'About',
    'nav.skills': 'Skills',
    'nav.projects': 'Projects',
    'nav.experience': 'Experience',
    'nav.contact': 'Contact',
    'nav.services': 'Services',
    'hero.title': 'Hi, I\'m',
    'hero.subtitle': 'Web Developer & IT Support Specialist',
    'hero.description': 'I build responsive websites, develop web applications, and provide comprehensive IT support. With expertise in WordPress, PHP, and various web technologies, I create efficient digital solutions for businesses.',
    'hero.viewWork': 'View My Work',
    'hero.contactMe': 'Contact Me',
    'skills.title': 'My Skills',
    'projects.title': 'Latest Projects',
    'experience.title': 'My Journey',
    'contact.title': 'Get In Touch',
    'contact.subtitle': 'Have a project in mind or want to discuss potential collaboration? Feel free to reach out!',
    'contact.name': 'Your Name',
    'contact.email': 'Email Address',
    'contact.message': 'Your Message',
    'contact.send': 'Send Message',
    'contact.sending': 'Sending...',
    'contact.success': 'Message sent!',
    'contact.successDesc': 'Thanks for reaching out. I\'ll get back to you soon.',
    'footer.rights': 'All rights reserved.',
    'companies.title': 'Companies & Organizations',
    'services.title': 'My Services',
    'youtube.title': 'My YouTube Videos',
    'youtube.subtitle': 'Watch my tutorials and tech demonstrations to learn about web development, IT support, and more.',
    'youtube.watchAll': 'View All Videos',
    'youtube.watch': 'Watch on YouTube',
  },
  fr: {
    // French translations
    'nav.about': 'À propos',
    'nav.skills': 'Compétences',
    'nav.projects': 'Projets',
    'nav.experience': 'Expérience',
    'nav.contact': 'Contact',
    'nav.services': 'Services',
    'hero.title': 'Bonjour, je suis',
    'hero.subtitle': 'Développeur Web & Spécialiste en Support Informatique',
    'hero.description': 'Je crée des sites web responsifs, développe des applications web et fournis un support informatique complet. Avec une expertise en WordPress, PHP et diverses technologies web, je crée des solutions numériques efficaces pour les entreprises.',
    'hero.viewWork': 'Voir mon travail',
    'hero.contactMe': 'Me contacter',
    'skills.title': 'Mes compétences',
    'projects.title': 'Derniers projets',
    'experience.title': 'Mon parcours',
    'contact.title': 'Prendre contact',
    'contact.subtitle': 'Vous avez un projet en tête ou souhaitez discuter d\'une collaboration potentielle ? N\'hésitez pas à me contacter !',
    'contact.name': 'Votre nom',
    'contact.email': 'Adresse e-mail',
    'contact.message': 'Votre message',
    'contact.send': 'Envoyer le message',
    'contact.sending': 'Envoi en cours...',
    'contact.success': 'Message envoyé !',
    'contact.successDesc': 'Merci de m\'avoir contacté. Je vous répondrai bientôt.',
    'footer.rights': 'Tous droits réservés.',
    'companies.title': 'Entreprises et Organisations',
    'services.title': 'Mes services',
    'youtube.title': 'Mes Vidéos YouTube',
    'youtube.subtitle': 'Regardez mes tutoriels et démonstrations techniques pour en savoir plus sur le développement web, le support informatique, et plus.',
    'youtube.watchAll': 'Voir Toutes les Vidéos',
    'youtube.watch': 'Regarder sur YouTube',
  },
  ar: {
    // Arabic translations
    'nav.about': 'حول',
    'nav.skills': 'المهارات',
    'nav.projects': 'المشاريع',
    'nav.experience': 'الخبرة',
    'nav.contact': 'اتصل بي',
    'nav.services': 'الخدمات',
    'hero.title': 'مرحبا، أنا',
    'hero.subtitle': 'مطور ويب ومتخصص دعم تقني',
    'hero.description': 'أقوم ببناء مواقع ويب متجاوبة، وتطوير تطبيقات الويب، وتقديم دعم تقني شامل. بفضل خبرتي في ووردبريس، PHP، والتقنيات المختلفة للويب، أقدم حلولًا رقمية فعالة للشركات.',
    'hero.viewWork': 'عرض أعمالي',
    'hero.contactMe': 'اتصل بي',
    'skills.title': 'مهاراتي',
    'projects.title': 'أحدث المشاريع',
    'experience.title': 'رحلتي',
    'contact.title': 'ابقى على تواصل',
    'contact.subtitle': 'هل لديك مشروع في ذهنك أو ترغب في مناقشة تعاون محتمل؟ لا تتردد في التواصل!',
    'contact.name': 'اسمك',
    'contact.email': 'البريد الإلكتروني',
    'contact.message': 'رسالتك',
    'contact.send': 'إرسال الرسالة',
    'contact.sending': 'جاري الإرسال...',
    'contact.success': 'تم إرسال الرسالة!',
    'contact.successDesc': 'شكرًا للتواصل. سأرد عليك قريبًا.',
    'footer.rights': 'جميع الحقوق محفوظة.',
    'companies.title': 'الشركات والمنظمات',
    'services.title': 'خدماتي',
    'youtube.title': 'فيديوهاتي على يوتيوب',
    'youtube.subtitle': 'شاهد دروسي وعروضي التقنية لتتعلم عن تطوير الويب، والدعم التقني، والمزيد.',
    'youtube.watchAll': 'مشاهدة جميع الفيديوهات',
    'youtube.watch': 'مشاهدة على يوتيوب',
  },
  ha: {
    // Hausa translations
    'nav.about': 'Game da ni',
    'nav.skills': 'Iyawa',
    'nav.projects': 'Ayyuka',
    'nav.experience': 'Ƙwarewa',
    'nav.contact': 'Tuntuɓa',
    'nav.services': 'Ayyuka',
    'hero.title': 'Barka, Ni ne',
    'hero.subtitle': 'Mai Ginin Yanar Gizo & Ƙwararren Mai Tallafawa IT',
    'hero.description': 'Ina gina yanar gizo masu amsa, in haɓaka manhajar yanar gizo, kuma in bayar da cikakken tallafi na IT. Da masaniya a WordPress, PHP, da dabaru daban-daban na yanar gizo, ina ƙirƙirar mafita ta dijital mai kyau ga kasuwanci.',
    'hero.viewWork': 'Duba Ayyukana',
    'hero.contactMe': 'Tuntuɓa Ni',
    'skills.title': 'Iyawata',
    'projects.title': 'Ayyukan Baya-bayan nan',
    'experience.title': 'Tafiyata',
    'contact.title': 'Tuntuɓa Ni',
    'contact.subtitle': 'Kana da wani aiki a zuciya ko kana son tattaunawa kan haɗin gwiwa? Ka yi shakka a tuntuɓa ni!',
    'contact.name': 'Sunanka',
    'contact.email': 'Adireshin imel',
    'contact.message': 'Saƙonka',
    'contact.send': 'Aika Saƙo',
    'contact.sending': 'Ana aikawa...',
    'contact.success': 'An aika saƙo!',
    'contact.successDesc': 'Na gode da tuntuɓa ni. Zan dawo maka nan ba da jimawa ba.',
    'footer.rights': 'Duk haƙƙoƙi a ajiye.',
    'companies.title': 'Kamfanoni da Ma\'aikatai',
    'services.title': 'Ayyukana',
    'youtube.title': 'Bidiyon YouTube Na',
    'youtube.subtitle': 'Kalla koyawa na da nuna fasaha don koyo game da haɓaka yanar gizo, tallafi na IT, da sauransu.',
    'youtube.watchAll': 'Duba Duk Bidiyo',
    'youtube.watch': 'Kalla akan YouTube',
  },
  ber: {
    // Berber translations
    'nav.about': 'Fell-i',
    'nav.skills': 'Tamusniwin',
    'nav.projects': 'Isenfaren',
    'nav.experience': 'Tarmit',
    'nav.contact': 'Nermes',
    'nav.services': 'Tanfawin',
    'hero.title': 'Azul, Nekk d',
    'hero.subtitle': 'Aneflay n Web & Amzizzel n Tallelt IT',
    'hero.description': 'Bennu ismal web, sneflay isnasen web, d usekker n tallelt n IT. S tmusni di WordPress, PHP, d tetiknologiyin web, snulfuy-d tifrat timegdayin i tkebaniyin.',
    'hero.viewWork': 'Ẓer Amahil-iw',
    'hero.contactMe': 'Nermes-iyi',
    'skills.title': 'Tamusniwin-iw',
    'projects.title': 'Isenfaren Ineggura',
    'experience.title': 'Abrid-iw',
    'contact.title': 'Nermes-iyi',
    'contact.subtitle': 'Tesɛiḍ asenfar neɣ tebɣiḍ ad tessiwleḍ ɣef umɛiwen? Ur ttaggʷad ara ad iyi-tnermeseḍ!',
    'contact.name': 'Isem-ik',
    'contact.email': 'Tansa email',
    'contact.message': 'Izen-ik',
    'contact.send': 'Azen Izen',
    'contact.sending': 'Tuzna...',
    'contact.success': 'Izen yettwazen!',
    'contact.successDesc': 'Tanemmirt imi iyi-tnermeseḍ. Ad ak-d-uɣaleɣ deg wakud aqrib.',
    'footer.rights': 'Akk izerfan ttwaḥerzen.',
    'companies.title': 'Tikebbaniyin d Tuddsiwin',
    'services.title': 'Tanfawin-iw',
    'youtube.title': 'Tividuten-iw n YouTube',
    'youtube.subtitle': 'Ẓer isalmaden-iw d uskan n tektiknologiyin i lemmer ɣef uneflay web, tallelt n IT, d wiyaḍ.',
    'youtube.watchAll': 'Wali Akk Tividuten',
    'youtube.watch': 'Ẓer ɣef YouTube',
  }
};

// Language detection helpers
const getUserLanguage = (): Language => {
  // Try to get from localStorage first
  const savedLanguage = localStorage.getItem('preferredLanguage') as Language;
  if (savedLanguage && Object.keys(translations).includes(savedLanguage)) {
    return savedLanguage;
  }
  
  // Try to detect from browser
  const browserLang = navigator.language.split('-')[0];
  if (browserLang === 'fr') return 'fr';
  if (browserLang === 'ar') return 'ar';
  if (browserLang === 'ha') return 'ha';
  if (browserLang === 'ber' || browserLang === 'kab') return 'ber';
  
  // Default to English
  return 'en';
};

// Create the context
type LanguageContextType = {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>('en');
  
  // Initialize language on component mount
  useEffect(() => {
    const detectedLanguage = getUserLanguage();
    setLanguageState(detectedLanguage);
  }, []);
  
  // Update localStorage when language changes
  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('preferredLanguage', lang);
  };
  
  // Translation function
  const t = (key: string): string => {
    return translations[language][key] || key;
  };
  
  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

// Custom hook for using the language context
export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
