import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { getInitialLanguage, isFirstVisit, detectBrowserLanguage } from '@/utils/languageDetection';

export type Language = 'en' | 'fr' | 'ar' | 'ha' | 'ber';

interface LanguageContextProps {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: string) => string;
  wasAutoDetected: boolean;
}

const LanguageContext = createContext<LanguageContextProps | undefined>(undefined);

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};

export const LanguageProvider = ({ children }: { children: React.ReactNode }) => {
  const [language, setLanguage] = useState<Language>(() => getInitialLanguage());
  const [wasAutoDetected, setWasAutoDetected] = useState<boolean>(() => {
    // Check if language was auto-detected (first visit + detected language matches current)
    if (isFirstVisit()) {
      const detected = detectBrowserLanguage();
      return detected === getInitialLanguage();
    }
    return false;
  });

  useEffect(() => {
    localStorage.setItem('language', language);
    document.documentElement.setAttribute('lang', language);
    document.documentElement.setAttribute('dir', language === 'ar' ? 'rtl' : 'ltr');
    
    // Reset auto-detection flag when user manually changes language
    if (wasAutoDetected) {
      setWasAutoDetected(false);
    }
  }, [language, wasAutoDetected]);

  const translations = useMemo(() => ({
    en: {
      nav: {
        about: "About",
        skills: "Skills",
        projects: "Projects",
        experience: "Experience",
        youtube: "YouTube",
        contact: "Contact",
        more: "More",
        services: "Services",
        findJobs: "Find Jobs",
        findFreelancers: "Find Freelancers",
        academy: "Academy",
        postJob: "Post a Job",
        newsletter: "Newsletter",
        freeImeiCheck: "Free IMEI Check",
        joinTelegram: "Join Telegram",
        liveChat: "Live Chat"
      },
      hero: {
        title: "Hi, I'm ",
        subtitle: "Crafting Digital Experiences with Code",
        description: "A passionate web developer dedicated to creating innovative and user-friendly web solutions. Explore my portfolio to see how I bring ideas to life.",
        viewWork: "View My Work",
        contactMe: "Contact Me",
      },
      skills: {
        title: "My Skills",
        subtitle: "I have a diverse skill set that allows me to create modern and dynamic web applications.",
        frontend: "Frontend Development",
        backend: "Backend Development",
        tools: "Tools & Technologies",
        allSkills: "All Skills",
        categories: {
          frontend: "Frontend Development",
          backend:  "Backend Development",
          mobile: "Mobile Development",
          devops: "DevOps & Tools",
          design: "Design & UI/UX",
          other: "Other Skills"
        }
      },
      projects: {
        title: "My Projects",
        subtitle: "A selection of projects I've worked on, showcasing my skills and passion for web development.",
        featured: "Featured Projects",
        demo: "Demo",
        code: "Code",
        viewProject: "View Project",
        sourceCode: "Source Code",
        techStack: "Tech Stack",
        liveDemo: "Live Demo",
        githubRepo: "GitHub Repository"
      },
      experience: {
        title: "My Experience",
        subtitle: "A timeline of my journey as a web developer, highlighting key experiences and achievements.",
        present: "Present",
        years: "years",
        year: "year",
        education: "Education",
        work: "Work Experience",
        certifications: "Certifications"
      },
      academy: {
        title: "Zwanski Academy",
        subtitle: "Free Learning for All - Master new skills with our comprehensive courses",
        heroTitle: "Zwanski Academy",
        heroSubtitle: "Learn Anything, Anywhere, Anytime - Completely Free",
        heroDescription: "Access thousands of high-quality courses from top universities and educators worldwide. From programming to photography, mathematics to music - all free for everyone.",
        startLearning: "Start Learning Now",
        becomeInstructor: "Become an Instructor",
        courses: "Courses",
        students: "Students",
        rating: "Rating",
        viewAllCourses: "View All Courses",
        enrolledStudents: "Enrolled Students",
        duration: "Duration",
        level: "Level",
        enroll: "Enroll Now",
        enrolled: "Enrolled",
        freeCourses: "Free Courses",
        globalStudents: "Global Students",
        languages: "Languages",
        certificates: "Certificates",
        browseByCategoryTitle: "Browse by Category",
        allCategories: "All Categories",
        noCoursesFound: "No courses found",
        noCoursesDescription: "Try adjusting your search or filter criteria.",
        showingCourses: "Showing",
        course: "course",
        coursePlural: "courses",
        gridView: "Grid",
        listView: "List",
        searchPlaceholder: "Search courses, topics, or instructors...",
        allLevels: "All Levels",
        beginner: "Beginner",
        intermediate: "Intermediate",
        advanced: "Advanced"
      },
      services: {
        title: "Professional IT Services",
        subtitle: "Comprehensive IT solutions from web development to advanced device repair and cybersecurity. Your trusted partner for all technical needs.",
        heroTitle: "Professional IT Services",
        heroSubtitle: "Comprehensive IT solutions from web development to advanced device repair and cybersecurity. Your trusted partner for all technical needs.",
        getStartedToday: "Get Started Today",
        ourServices: "Our Services",
        ourServicesSubtitle: "Professional tech services to help your business grow and succeed in the digital world.",
        allServices: "All Services",
        development: "Development",
        support: "Support",
        security: "Security",
        marketing: "Marketing",
        learnMore: "Learn More",
        requestService: "Request Service",
        stats: {
          devicesRepaired: "Devices Repaired",
          expertSupport: "Expert Support",
          securityImprovement: "Security Improvement",
          moneyBackGuarantee: "Money Back Guarantee",
          yearsExperience: "Years of Experience",
          trustedByGlobalClients: "Trusted by Global Clients"
        },
        categories: {
          webDevelopment: "Web Development",
          webDevelopmentDesc: "Custom website development using React, PHP, WordPress, or other technologies based on your needs.",
          itSupport: "IT Support",
          itSupportDesc: "Technical support, troubleshooting, and maintenance for your computers, phones, and other devices.",
          wordpress: "WordPress Development",
          wordpressDesc: "Custom WordPress themes, plugins, and site optimization for better performance.",
          seo: "SEO Optimization",
          seoDesc: "Improve your website's search engine ranking with technical SEO and content optimization.",
          systemSecurity: "System Security",
          systemSecurityDesc: "Implementation of security measures, including Wazuh installation and security audits.",
          customTools: "Custom Tools Development",
          customToolsDesc: "Development of custom tools and automation scripts to optimize your workflow."
        },
        pricing: {
          from: "From",
          perHour: "/hour"
        }
      },
      youtube: {
        title: "YouTube Channel",
        subtitle: "Check out my YouTube channel for tutorials, tips, and insights into web development.",
      },
      contact: {
        title: "Contact Me",
        subtitle: "Feel free to reach out for collaborations, projects, or just a friendly chat!",
        name: "Your Name",
        email: "Your Email",
        message: "Your Message",
        send: "Send Message",
        success: "Message sent successfully!",
        error: "Failed to send message. Please try again.",
      },
      footer: {
        rights: "All Rights Reserved",
        builtWith: "Built with",
        poweredBy: "Powered by",
        quickLinks: "Quick Links",
        services: "Services",
        connect: "Connect"
      },
      playground: {
        title: "Playground",
        subtitle: "Explore my featured projects and tools that showcase creativity and innovation.",
        featured: "Featured Project",
        item1: {
          title: "Interactive Demos",
          description: "Explore interactive demonstrations of my latest experimental projects and tools."
        },
        item2: {
          title: "AI Experiments",
          description: "Discover my work with artificial intelligence and machine learning applications."
        },
        item3: {
          title: "Creative Coding",
          description: "See examples of creative coding projects that blend art with technology."
        }
      },
      cookie: {
        title: "Cookie Preferences",
        settings: "Settings",
        acceptAll: "Accept All",
        rejectAll: "Reject All",
        acceptSelected: "Accept Selected",
        description: "We use cookies to enhance your browsing experience, analyze site traffic, and personalize content. Select your preferences below.",
        showDetails: "Show details",
        hideDetails: "Hide details",
        necessary: "Necessary",
        analytics: "Analytics",
        marketing: "Marketing",
        preferences: "Preferences",
        necessaryDescription: "Essential cookies that are required for the website to function properly. These cannot be disabled.",
        analyticsDescription: "Cookies that help us understand how visitors interact with our website by collecting and reporting information anonymously.",
        marketingDescription: "Cookies used to deliver personalized advertisements and track the effectiveness of our marketing campaigns.",
        preferencesDescription: "Cookies that remember your preferences and settings to provide a personalized experience."
      },
      common: {
        loading: "Loading...",
        error: "Error",
        tryAgain: "Try again",
        search: "Search",
        filter: "Filter",
        sort: "Sort",
        save: "Save",
        cancel: "Cancel",
        submit: "Submit",
        next: "Next",
        previous: "Previous",
        close: "Close",
        open: "Open",
        edit: "Edit",
        delete: "Delete",
        add: "Add",
        remove: "Remove"
      }
    },
    fr: {
      nav: {
        about: "À Propos",
        skills: "Compétences",
        projects: "Projets",
        experience: "Expérience",
        youtube: "YouTube",
        contact: "Contact",
        more: "Plus",
        services: "Services",
        findJobs: "Trouver des Emplois",
        findFreelancers: "Trouver des Freelancers",
        academy: "Académie",
        postJob: "Publier un Emploi",
        newsletter: "Newsletter",
        freeImeiCheck: "Vérification IMEI Gratuite",
        joinTelegram: "Rejoindre Telegram",
        liveChat: "Chat en Direct"
      },
      hero: {
        title: "Salut, je suis ",
        subtitle: "Création d'Expériences Digitales avec du Code",
        description: "Un développeur web passionné, dédié à la création de solutions web innovantes et conviviales. Explorez mon portfolio pour voir comment je donne vie aux idées.",
        viewWork: "Voir Mon Travail",
        contactMe: "Contactez-Moi",
      },
      skills: {
        title: "Mes Compétences",
        subtitle: "Je possède un ensemble de compétences variées qui me permettent de créer des applications web modernes et dynamiques.",
        frontend: "Développement Frontend",
        backend: "Développement Backend",
        tools: "Outils & Technologies",
        allSkills: "Toutes les Compétences",
        categories: {
          frontend: "Développement Frontend",
          backend: "Développement Backend",
          mobile: "Développement Mobile",
          devops: "DevOps & Outils",
          design: "Design & UI/UX",
          other: "Autres Compétences"
        }
      },
      projects: {
        title: "Mes Projets",
        subtitle: "Une sélection de projets sur lesquels j'ai travaillé, mettant en valeur mes compétences et ma passion pour le développement web.",
        featured: "Projets en Vedette",
        demo: "Démo",
        code: "Code",
        viewProject: "Voir le Projet",
        sourceCode: "Code Source",
        techStack: "Stack Technique",
        liveDemo: "Démo en Direct",
        githubRepo: "Dépôt GitHub"
      },
      experience: {
        title: "Mon Expérience",
        subtitle: "Une chronologie de mon parcours en tant que développeur web, soulignant les expériences clés et les réalisations.",
        present: "Présent",
        years: "années",
        year: "année",
        education: "Éducation",
        work: "Expérience Professionnelle",
        certifications: "Certifications"
      },
      academy: {
        title: "Académie Zwanski",
        subtitle: "Apprentissage Gratuit pour Tous - Maîtrisez de nouvelles compétences avec nos cours complets",
        heroTitle: "Académie Zwanski",
        heroSubtitle: "Apprenez N'importe Quoi, N'importe Où, N'importe Quand - Complètement Gratuit",
        heroDescription: "Accédez à des milliers de cours de haute qualité des meilleures universités et éducateurs du monde entier. De la programmation à la photographie, des mathématiques à la musique - tout gratuit pour tous.",
        startLearning: "Commencer à Apprendre Maintenant",
        becomeInstructor: "Devenir Instructeur",
        courses: "Cours",
        students: "Étudiants",
        rating: "Note",
        viewAllCourses: "Voir Tous les Cours",
        enrolledStudents: "Étudiants Inscrits",
        duration: "Durée",
        level: "Niveau",
        enroll: "S'inscrire Maintenant",
        enrolled: "Inscrit",
        freeCourses: "Cours Gratuits",
        globalStudents: "Étudiants Mondiaux",
        languages: "Langues",
        certificates: "Certificats",
        browseByCategoryTitle: "Parcourir par Catégorie",
        allCategories: "Toutes les Catégories",
        noCoursesFound: "Aucun cours trouvé",
        noCoursesDescription: "Essayez d'ajuster vos critères de recherche ou de filtre.",
        showingCourses: "Affichage de",
        course: "cours",
        coursePlural: "cours",
        gridView: "Grille",
        listView: "Liste",
        searchPlaceholder: "Rechercher des cours, sujets ou instructeurs...",
        allLevels: "Tous Niveaux",
        beginner: "Débutant",
        intermediate: "Intermédiaire",
        advanced: "Avancé"
      },
      services: {
        title: "Services IT Professionnels",
        subtitle: "Solutions IT complètes du développement web à la réparation avancée d'appareils et à la cybersécurité. Votre partenaire de confiance pour tous vos besoins techniques.",
        heroTitle: "Services IT Professionnels",
        heroSubtitle: "Solutions IT complètes du développement web à la réparation avancée d'appareils et à la cybersécurité. Votre partenaire de confiance pour tous vos besoins techniques.",
        getStartedToday: "Commencer Aujourd'hui",
        ourServices: "Nos Services",
        ourServicesSubtitle: "Services techniques professionnels pour aider votre entreprise à croître et réussir dans le monde numérique.",
        allServices: "Tous les Services",
        development: "Développement",
        support: "Support",
        security: "Sécurité",
        marketing: "Marketing",
        learnMore: "En Savoir Plus",
        requestService: "Demander un Service",
        stats: {
          devicesRepaired: "Appareils Réparés",
          expertSupport: "Support Expert",
          securityImprovement: "Amélioration Sécurité",
          moneyBackGuarantee: "Garantie Remboursement",
          yearsExperience: "Années d'Expérience",
          trustedByGlobalClients: "Apprécié par des Clients Mondiaux"
        },
        categories: {
          webDevelopment: "Développement Web",
          webDevelopmentDesc: "Développement de sites web personnalisés utilisant React, PHP, WordPress ou d'autres technologies selon vos besoins.",
          itSupport: "Support IT",
          itSupportDesc: "Support technique, dépannage et maintenance pour vos ordinateurs, téléphones et autres appareils.",
          wordpress: "Développement WordPress",
          wordpressDesc: "Thèmes WordPress personnalisés, plugins et optimisation de site pour de meilleures performances.",
          seo: "Optimisation SEO",
          seoDesc: "Améliorez le classement de votre site web dans les moteurs de recherche avec le SEO technique et l'optimisation de contenu.",
          systemSecurity: "Sécurité Système",
          systemSecurityDesc: "Mise en œuvre de mesures de sécurité, y compris l'installation Wazuh et les audits de sécurité.",
          customTools: "Développement d'Outils Personnalisés",
          customToolsDesc: "Développement d'outils personnalisés et de scripts d'automatisation pour optimiser votre flux de travail."
        },
        pricing: {
          from: "À partir de",
          perHour: "/heure"
        }
      },
      youtube: {
        title: "Chaîne YouTube",
        subtitle: "Consultez ma chaîne YouTube pour des tutoriels, des conseils et des aperçus sur le développement web.",
      },
      contact: {
        title: "Contactez-Moi",
        subtitle: "N'hésitez pas à me contacter pour des collaborations, des projets ou simplement une conversation amicale !",
        name: "Votre Nom",
        email: "Votre Email",
        message: "Votre Message",
        send: "Envoyer le Message",
        success: "Message envoyé avec succès !",
        error: "Échec de l'envoi du message. Veuillez réessayer.",
      },
      footer: {
        rights: "Tous Droits Réservés",
        builtWith: "Créé avec",
        poweredBy: "Propulsé par",
        quickLinks: "Liens Rapides",
        services: "Services",
        connect: "Se Connecter"
      },
      playground: {
        title: "Espace Ludique",
        subtitle: "Explorez mes projets et outils en vedette qui démontrent créativité et innovation.",
        featured: "Projet en Vedette",
        item1: {
          title: "Démos Interactives",
          description: "Explorez des démonstrations interactives de mes derniers projets et outils expérimentaux."
        },
        item2: {
          title: "Expériences IA",
          description: "Découvrez mon travail avec l'intelligence artificielle et les applications d'apprentissage automatique."
        },
        item3: {
          title: "Codage Créatif",
          description: "Voyez des exemples de projets de codage créatif qui mélangent l'art et la technologie."
        }
      },
      cookie: {
        title: "Préférences des Cookies",
        settings: "Paramètres",
        acceptAll: "Accepter Tout",
        rejectAll: "Rejeter Tout",
        acceptSelected: "Accepter Sélection",
        description: "Nous utilisons des cookies pour améliorer votre expérience de navigation, analyser le trafic du site et personnaliser le contenu. Sélectionnez vos préférences ci-dessous.",
        showDetails: "Afficher les détails",
        hideDetails: "Masquer les détails",
        necessary: "Nécessaires",
        analytics: "Analytiques",
        marketing: "Marketing",
        preferences: "Préférences",
        necessaryDescription: "Cookies essentiels requis pour le bon fonctionnement du site web. Ils ne peuvent pas être désactivés.",
        analyticsDescription: "Cookies qui nous aident à comprendre comment les visiteurs interagissent avec notre site web en collectant et rapportant des informations anonymement.",
        marketingDescription: "Cookies utilisés pour diffuser des publicités personnalisées et suivre l'efficacité de nos campagnes marketing.",
        preferencesDescription: "Cookies qui mémorisent vos préférences et paramètres pour fournir une expérience personnalisée."
      },
      common: {
        loading: "Chargement...",
        error: "Erreur",
        tryAgain: "Réessayer",
        search: "Recherche",
        filter: "Filtrer",
        sort: "Trier",
        save: "Sauvegarder",
        cancel: "Annuler",
        submit: "Soumettre",
        next: "Suivant",
        previous: "Précédent",
        close: "Fermer",
        open: "Ouvrir",
        edit: "Modifier",
        delete: "Supprimer",
        add: "Ajouter",
        remove: "Retirer"
      }
    },
    ar: {
      nav: {
        about: "حول",
        skills: "مهارات",
        projects: "مشاريع",
        experience: "خبرة",
        youtube: "يوتيوب",
        contact: "اتصل",
        more: "المزيد",
        services: "خدمات",
        findJobs: "البحث عن وظائف",
        findFreelancers: "العثور على المستقلين",
        academy: "الأكاديمية",
        postJob: "نشر وظيفة",
        newsletter: "النشرة الإخبارية",
        freeImeiCheck: "فحص IMEI مجاني",
        joinTelegram: "انضم إلى تيليجرام",
        liveChat: "الدردشة المباشرة"
      },
      hero: {
        title: "مرحبا، أنا ",
        subtitle: "صناعة تجارب رقمية باستخدام الكود",
        description: "مطور ويب شغوف، متخصص في إنشاء حلول ويب مبتكرة وسهلة الاستخدام. استكشف معرض أعمالي لترى كيف أحول الأفكار إلى واقع.",
        viewWork: "عرض أعمالي",
        contactMe: "اتصل بي",
      },
      skills: {
        title: "مهاراتي",
        subtitle: "لدي مجموعة مهارات متنوعة تمكنني من إنشاء تطبيقات ويب حديثة وديناميكية.",
        frontend: "تطوير الواجهة الأمامية",
        backend: "تطوير الواجهة الخلفية",
        tools: "أدوات وتقنيات",
        allSkills: "جميع المهارات",
        categories: {
          frontend: "تطوير الواجهة الأمامية",
          backend: "تطوير الواجهة الخلفية",
          mobile: "تطوير الجوال",
          devops: "DevOps والأدوات",
          design: "التصميم وواجهة المستخدم",
          other: "مهارات أخرى"
        }
      },
      projects: {
        title: "مشاريعي",
        subtitle: "مجموعة مختارة من المشاريع التي عملت عليها، تعرض مهاراتي وشغفي بتطوير الويب.",
        featured: "المشاريع المميزة",
        demo: "عرض توضيحي",
        code: "الكود",
        viewProject: "عرض المشروع",
        sourceCode: "الكود المصدري",
        techStack: "التقنيات المستخدمة",
        liveDemo: "عرض مباشر",
        githubRepo: "مستودع GitHub"
      },
      experience: {
        title: "خبرتي",
        subtitle: "تسلسل زمني لرحلتي كمطور ويب، يسلط الضوء على الخبرات والإنجازات الرئيسية.",
        present: "الحاضر",
        years: "سنوات",
        year: "سنة",
        education: "التعليم",
        work: "الخبرة العملية",
        certifications: "الشهادات"
      },
      academy: {
        title: "أكاديمية زوانسكي",
        subtitle: "التعلم المجاني للجميع - أتقن مهارات جديدة مع دوراتنا الشاملة",
        heroTitle: "أكاديمية زوانسكي",
        heroSubtitle: "تعلم أي شيء، في أي مكان، في أي وقت - مجاناً بالكامل",
        heroDescription: "احصل على آلاف الدورات عالية الجودة من أفضل الجامعات والمعلمين حول العالم. من البرمجة إلى التصوير، من الرياضيات إلى الموسيقى - كل شيء مجاني للجميع.",
        startLearning: "ابدأ التعلم الآن",
        becomeInstructor: "كن مدرساً",
        courses: "دورات",
        students: "طلاب",
        rating: "التقييم",
        viewAllCourses: "عرض جميع الدورات",
        enrolledStudents: "الطلاب المسجلين",
        duration: "المدة",
        level: "المستوى",
        enroll: "سجل الآن",
        enrolled: "مسجل",
        freeCourses: "دورات مجانية",
        globalStudents: "طلاب عالميين",
        languages: "لغات",
        certificates: "شهادات",
        browseByCategoryTitle: "تصفح حسب الفئة",
        allCategories: "جميع الفئات",
        noCoursesFound: "لم يتم العثور على دورات",
        noCoursesDescription: "جرب تعديل معايير البحث أو الفلتر.",
        showingCourses: "عرض",
        course: "دورة",
        coursePlural: "دورات",
        gridView: "شبكة",
        listView: "قائمة",
        searchPlaceholder: "البحث عن دورات أو مواضيع أو مدرسين...",
        allLevels: "جميع المستويات",
        beginner: "مبتدئ",
        intermediate: "متوسط",
        advanced: "متقدم"
      },
      services: {
        title: "الخدمات التقنية المهنية",
        subtitle: "حلول تقنية شاملة من تطوير الويب إلى الإصلاح المتقدم للأجهزة والأمن السيبراني. شريكك الموثوق لجميع احتياجاتك التقنية.",
        heroTitle: "الخدمات التقنية المهنية",
        heroSubtitle: "حلول تقنية شاملة من تطوير الويب إلى الإصلاح المتقدم للأجهزة والأمن السيبراني. شريكك الموثوق لجميع احتياجاتك التقنية.",
        getStartedToday: "ابدأ اليوم",
        ourServices: "خدماتنا",
        ourServicesSubtitle: "خدمات تقنية مهنية لمساعدة عملك على النمو والنجاح في العالم الرقمي.",
        allServices: "جميع الخدمات",
        development: "التطوير",
        support: "الدعم",
        security: "الأمان",
        marketing: "التسويق",
        learnMore: "اعرف المزيد",
        requestService: "طلب خدمة",
        stats: {
          devicesRepaired: "جهاز تم إصلاحه",
          expertSupport: "دعم خبير",
          securityImprovement: "تحسين الأمان",
          moneyBackGuarantee: "ضمان استرداد الأموال",
          yearsExperience: "سنوات خبرة",
          trustedByGlobalClients: "موثوق من قبل عملاء عالميين"
        },
        categories: {
          webDevelopment: "تطوير الويب",
          webDevelopmentDesc: "تطوير مواقع ويب مخصصة باستخدام React أو PHP أو WordPress أو تقنيات أخرى حسب احتياجاتك.",
          itSupport: "دعم تقني",
          itSupportDesc: "دعم تقني واستكشاف الأخطاء وصيانة أجهزة الكمبيوتر والهواتف والأجهزة الأخرى.",
          wordpress: "تطوير WordPress",
          wordpressDesc: "قوالب WordPress مخصصة وإضافات وتحسين الموقع لأداء أفضل.",
          seo: "تحسين محركات البحث",
          seoDesc: "حسن ترتيب موقعك في محركات البحث مع تحسين محركات البحث التقني وتحسين المحتوى.",
          systemSecurity: "أمان النظام",
          systemSecurityDesc: "تنفيذ تدابير الأمان، بما في ذلك تثبيت Wazuh وعمليات تدقيق الأمان.",
          customTools: "تطوير أدوات مخصصة",
          customToolsDesc: "تطوير أدوات مخصصة ونصوص أتمتة لتحسين سير العمل الخاص بك."
        },
        pricing: {
          from: "من",
          perHour: "/ساعة"
        }
      },
      youtube: {
        title: "قناة يوتيوب",
        subtitle: "تحقق من قناتي على يوتيوب للحصول على دروس ونصائح ورؤى حول تطوير الويب.",
      },
      contact: {
        title: "اتصل بي",
        subtitle: "لا تتردد في التواصل من أجل التعاون أو المشاريع أو مجرد دردشة ودية!",
        name: "اسمك",
        email: "بريدك الإلكتروني",
        message: "رسالتك",
        send: "إرسال الرسالة",
        success: "تم إرسال الرسالة بنجاح!",
        error: "فشل إرسال الرسالة. يرجى المحاولة مرة أخرى.",
      },
      footer: {
        rights: "جميع الحقوق محفوظة",
        builtWith: "مبني باستخدام",
        poweredBy: "مدعوم من",
        quickLinks: "روابط سريعة",
        services: "الخدمات",
        connect: "اتصل"
      },
      playground: {
        title: "منطقة التجارب",
        subtitle: "استكشف مشاريعي وأدواتي المميزة التي تعرض الإبداع والابتكار.",
        featured: "مشروع مميز",
        item1: {
          title: "عروض تفاعلية",
          description: "استكشف العروض التفاعلية لأحدث مشاريعي وأدواتي التجريبية."
        },
        item2: {
          title: "تجارب الذكاء الاصطناعي",
          description: "اكتشف عملي مع تطبيقات الذكاء الاصطناعي والتعلم الآلي."
        },
        item3: {
          title: "البرمجة الإبداعية",
          description: "شاهد أمثلة لمشاريع البرمجة الإبداعية التي تمزج الفن بالتكنولوجيا."
        }
      },
      cookie: {
        title: "تفضيلات ملفات تعريف الارتباط",
        settings: "الإعدادات",
        acceptAll: "قبول الكل",
        rejectAll: "رفض الكل",
        acceptSelected: "قبول المحدد",
        description: "نحن نستخدم ملفات تعريف الارتباط لتحسين تجربة التصفح وتحليل حركة المرور وتخصيص المحتوى. اختر تفضيلاتك أدناه.",
        showDetails: "إظهار التفاصيل",
        hideDetails: "إخفاء التفاصيل",
        necessary: "ضرورية",
        analytics: "تحليلية",
        marketing: "تسويقية",
        preferences: "التفضيلات",
        necessaryDescription: "ملفات تعريف الارتباط الأساسية مطلوبة لعمل الموقع بشكل صحيح. لا يمكن إلغاؤها.",
        analyticsDescription: "ملفات تعريف الارتباط تساعدنا في فهم كيفية تفاعل الزوار مع موقعنا من خلال جمع وتقرير المعلومات بشكل مجهول.",
        marketingDescription: "ملفات تعريف الارتباط تُستخدم لتقديم إعلانات مخصصة وتتبع فعالية حملاتنا التسويقية.",
        preferencesDescription: "ملفات تعريف الارتباط تتذكر تفضيلاتك وإعداداتك لتوفير تجربة مخصصة."
      },
      common: {
        loading: "جاري التحميل...",
        error: "خطأ",
        tryAgain: "حاول مرة أخرى",
        search: "بحث",
        filter: "تصفية",
        sort: "ترتيب",
        save: "حفظ",
        cancel: "إلغاء",
        submit: "إرسال",
        next: "التالي",
        previous: "السابق",
        close: "إغلاق",
        open: "فتح",
        edit: "تعديل",
        delete: "حذف",
        add: "إضافة",
        remove: "إزالة"
      }
    },
    ha: {
      nav: {
        about: "Game da",
        skills: "Ƙwarewa",
        projects: "Ayyuka",
        experience: "Ƙware-ƙware",
        youtube: "YouTube",
        contact: "Tuntuɓi",
        more: "Ƙari",
        services: "Ayyuka",
        findJobs: "Nemo Aiki",
        findFreelancers: "Nemo Masu Aikin Kansu",
        academy: "Makaranta",
        postJob: "Buga Aiki",
        newsletter: "Takardar Labarai",
        freeImeiCheck: "Binciken IMEI Kyauta",
        joinTelegram: "Shiga Telegram",
        liveChat: "Tattaunawa Kai Tsaye"
      },
      hero: {
        title: "Sannu, ni ne ",
        subtitle: "Ƙirƙirar Abubuwa na Dijital da Lamba",
        description: "Mai haɓaka yanar gizo mai ƙauna wanda ke ƙaddamar da sabbin hanyoyin samar da yanar gizo masu sauƙi. Duba ayyukana don ganin yadda nake rayar da ra'ayoyi.",
        viewWork: "Duba Ayyukana",
        contactMe: "Tuntuɓe Ni",
      },
      skills: {
        title: "Ƙwarewar Ta",
        subtitle: "Ina da ƙwarewa daban-daban da ke ba ni damar ƙirƙirar manhajojin yanar gizo na zamani.",
        frontend: "Haɓaka Gaba",
        backend: "Haɓaka Baya",
        tools: "Kayayyaki da Fasaha",
        allSkills: "Dukkan Ƙwarewa",
        categories: {
          frontend: "Haɓaka Gaba",
          backend: "Haɓaka Baya",
          mobile: "Haɓaka wayar hannu",
          devops: "DevOps da Kayayyaki",
          design: "Zane da UI/UX",
          other: "Sauran Ƙwarewa"
        }
      },
      projects: {
        title: "Ayyukana",
        subtitle: "Zaɓaɓɓun ayyukan da na yi, suna nuna ƙwarewar ta da sha'awar haɓaka yanar gizo.",
        featured: "Ayyuka masu Muhimmanci",
        demo: "Nunawa",
        code: "Lambar",
        viewProject: "Duba Aikin",
        sourceCode: "Lambar Tushe",
        techStack: "Fasahar da aka yi amfani",
        liveDemo: "Nunawa kai tsaye",
        githubRepo: "Ajiyar GitHub"
      },
      experience: {
        title: "Ƙwarewata",
        subtitle: "Tsarin lokaci na tafiyata a matsayin mai haɓaka yanar gizo, yana nuna manyan abubuwan da na samu.",
        present: "Yanzu",
        years: "shekaru",
        year: "shekara",
        education: "Ilimi",
        work: "Ƙwarewar Aiki",
        certifications: "Takaddun Shaida"
      },
      academy: {
        title: "Makarantar Zwanski",
        subtitle: "Koyo Kyauta ga Kowa - Koyi sabbin ƙwarewa tare da cikakkun darussan mu",
        heroTitle: "Makarantar Zwanski",
        heroSubtitle: "Koyi Komai, A Ko'ina, A Kowane Lokaci - Kyauta Gaba ɗaya",
        heroDescription: "Samun dubban darussa masu inganci daga manyan jami'o'i da malamai a duniya. Daga shirye-shirye zuwa daukar hoto, lissafi zuwa kiɗa - duk kyauta ga kowa.",
        startLearning: "Fara Koyo Yanzu",
        becomeInstructor: "Zama Malami",
        courses: "Darussa",
        students: "Ɗalibai",
        rating: "Kimanta",
        viewAllCourses: "Duba Dukkan Darussa",
        enrolledStudents: "Ɗaliban da suka Shiga",
        duration: "Tsawon Lokaci",
        level: "Matakin",
        enroll: "Yi Rajista Yanzu",
        enrolled: "An Yi Rajista",
        freeCourses: "Darussa Kyauta",
        globalStudents: "Ɗalibai na Duniya",
        languages: "Harsuna",
        certificates: "Takaddun Shaida",
        browseByCategoryTitle: "Bincika ta Nau'i",
        allCategories: "Dukkan Nau'o'i",
        noCoursesFound: "Ba a sami darussa ba",
        noCoursesDescription: "Ka gwada gyara ka'idojin bincike ko tacewa.",
        showingCourses: "Nuna",
        course: "darasi",
        coursePlural: "darussa",
        gridView: "Grid",
        listView: "Jeri",
        searchPlaceholder: "Nemo darussa, batutuwa ko malamai...",
        allLevels: "Dukkan Matakan",
        beginner: "Mai Farawa",
        intermediate: "Matsakaici",
        advanced: "Na Gaba"
      },
      services: {
        title: "Ayyukan IT na Ƙwararru",
        subtitle: "Cikakkun hanyoyin IT daga haɓaka yanar gizo zuwa gyara na'urori da tsaro na cyber. Abokin hulɗar da kake amincewa da shi don dukkan bukatun fasaha.",
        heroTitle: "Ayyukan IT na Ƙwararru",
        heroSubtitle: "Cikakkun hanyoyin IT daga haɓaka yanar gizo zuwa gyara na'urori da tsaro na cyber. Abokin hulɗar da kake amincewa da shi don dukkan bukatun fasaha.",
        getStartedToday: "Fara Yau",
        ourServices: "Ayyukanmu",
        ourServicesSubtitle: "Ayyukan fasaha na ƙwararru don taimaka wa kasuwancin ku ya girma ya yi nasara a duniyar dijital.",
        allServices: "Dukkan Ayyuka",
        development: "Haɓakawa",
        support: "Tallafi",
        security: "Tsaro",
        marketing: "Tallace-tallace",
        learnMore: "Koyi Ƙari",
        requestService: "Nemi Hidima",
        stats: {
          devicesRepaired: "Na'urori da aka Gyara",
          expertSupport: "Tallafin Ƙwararru",
          securityImprovement: "Inganta Tsaro",
          moneyBackGuarantee: "Tabbacin Dawo da Kuɗi",
          yearsExperience: "Shekarun Ƙwarewa",
          trustedByGlobalClients: "Amintaccen Abokan Ciniki na Duniya"
        },
        categories: {
          webDevelopment: "Haɓaka Yanar Gizo",
          webDevelopmentDesc: "Haɓaka yanar gizo na musamman ta amfani da React, PHP, WordPress, ko wasu fasahohi dangane da bukatunku.",
          itSupport: "Tallafin IT",
          itSupportDesc: "Tallafin fasaha, warware matsaloli da kula da kwamfutoci, wayoyinku da sauran na'urori.",
          wordpress: "Haɓaka WordPress",
          wordpressDesc: "Jigon WordPress na musamman, plugins da haɓaka shafin don ingantaccen aiki.",
          seo: "Haɓaka SEO",
          seoDesc: "Inganta matsayin yanar gizonku a injunan bincike tare da SEO na fasaha da haɓaka abun ciki.",
          systemSecurity: "Tsaron Tsarin",
          systemSecurityDesc: "Aiwatar da matakan tsaro, har da shigar da Wazuh da bincikar tsaro.",
          customTools: "Haɓaka Kayayyaki na Musamman",
          customToolsDesc: "Haɓaka kayayyaki na musamman da rubutun atomatik don haɓaka tsarin aikinku."
        },
        pricing: {
          from: "Daga",
          perHour: "/sa'a"
        }
      },
      youtube: {
        title: "Tashar YouTube",
        subtitle: "Duba tashara na YouTube don koyarwa, shawarwari, da fahimtar haɓaka yanar gizo.",
      },
      contact: {
        title: "Tuntuɓe Ni",
        subtitle: "Ka ji daɗin tuntuɓa don haɗin gwiwa, ayyuka ko tattaunawa mai daɗi kawai!",
        name: "Sunanka",
        email: "Imel ɗin ka",
        message: "Saƙonka",
        send: "Aika Saƙo",
        success: "An aika saƙo cikin nasara!",
        error: "Ba a iya aika saƙo ba. Ka sake gwadawa.",
      },
      footer: {
        rights: "Dukkan Haƙƙoƙi An Kiyaye Su",
        builtWith: "An gina shi da",
        poweredBy: "Ana amfani da shi ta",
        quickLinks: "Hanyoyin Sauri",
        services: "Ayyuka",
        connect: "Haɗa"
      },
      playground: {
        title: "Filin Wasa",
        subtitle: "Bincika ayyukana da kayayyakin da ke nuna ƙirƙirawa da sabuntawa.",
        featured: "Aiki na Musamman",
        item1: {
          title: "Nuna Abubuwa na Haɗawa",
          description: "Bincika nunin abubuwa masu haɗawa na sabbin ayyukana da kayayyakin gwaji."
        },
        item2: {
          title: "Gwaje-Gwaje na AI",
          description: "Bincika ayyukana tare da ilimin haƙƙin kai da manhajojin koyon na'ura."
        },
        item3: {
          title: "Ƙirƙirar Lamba",
          description: "Duba misalai na ayyukan ƙirƙirar lamba da suke haɗa fasaha da fasaha."
        }
      },
      cookie: {
        title: "Zaɓin Cookies",
        settings: "Saitunan",
        acceptAll: "Karɓi Duka",
        rejectAll: "Ƙi Duka",
        acceptSelected: "Karɓi Zaɓaɓɓu",
        description: "Muna amfani da cookies don inganta kwarewar ku, nazarin zirga-zirgar yanar gizo, da keɓantaccen abun ciki. Zaɓi abubuwan da kuke so a ƙasa.",
        showDetails: "Nuna cikakkun bayanai",
        hideDetails: "Ɓoye cikakkun bayanai",
        necessary: "Dole",
        analytics: "Nazari",
        marketing: "Tallace-tallace",
        preferences: "Zaɓuɓɓuka",
        necessaryDescription: "Cookies masu mahimmanci da ake buƙata don yanar gizon ya yi aiki da kyau. Ba za a iya kashe su ba.",
        analyticsDescription: "Cookies da ke taimaka mana mu fahimci yadda masu ziyara ke hulɗa da yanar gizonmu ta hanyar tattarawa da rahoton bayanai ba tare da bayyana sunayen mutane ba.",
        marketingDescription: "Cookies da ake amfani da su don isar da tallace-tallace na musamman da kuma bin diddigin ingancin kamfen-kamfen na tallan mu.",
        preferencesDescription: "Cookies da ke tunawa da zaɓuɓɓukanyu da saitunan ku don samar da ƙwarewar da ta dace da ku."
      },
      common: {
        loading: "Ana ɗaukar...",
        error: "Kuskure",
        tryAgain: "Sake gwadawa",
        search: "Bincike",
        filter: "Tacewa",
        sort: "Jera",
        save: "Ajiye",
        cancel: "Soke",
        submit: "Tura",
        next: "Na gaba",
        previous: "Na baya",
        close: "Rufe",
        open: "Buɗe",
        edit: "Gyara",
        delete: "Share",
        add: "Ƙara",
        remove: "Cire"
      }
    },
    ber: {
      nav: {
        about: "Ɣef",
        skills: "Tizmmar",
        projects: "Isenfaren",
        experience: "Tarmit",
        youtube: "YouTube",
        contact: "Nermes",
        more: "Uggar",
        services: "Tinfiwin",
        findJobs: "Af-d Ixeddimen",
        findFreelancers: "Af-d Imahilen Ilelli",
        academy: "Aɣerbaz",
        postJob: "Sufeɣ-d Axeddim",
        newsletter: "Taɣaṛabt",
        freeImeiCheck: "Asekyed IMEI Baṭel",
        joinTelegram: "Ddu ɣer Telegram",
        liveChat: "Asawal Srid"
      },
      hero: {
        title: "Azul, nekki d ",
        subtitle: "Asekker n Tedyanin Timḍanin s Tengalt",
        description: "Amsedger web yeεjben, yettwasekker i tmerna n tifrayin web timeγranin d tisehlanin. Sken asebtar-inu akken ad teẓreḍ amek i ttarra tiktiwin d tudert.",
        viewWork: "Ẓer Amahil-inu",
        contactMe: "Nermes-iyi",
      },
      skills: {
        title: "Tizmmar-inu",
        subtitle: "Sεiɣ tizmmar yemgaraden i yi-d-yettakin ad sekkreɣ isnasen web imaynuten d leqdic.",
        frontend: "Asnulfu n Udem",
        backend: "Asnulfu n Deffir", 
        tools: "Ifecka d Ttiknulujiyin",
        allSkills: "Akk Tizmmar",
        categories: {
          frontend: "Asnulfu n Udem",
          backend: "Asnulfu n Deffir",
          mobile: "Asnulfu n Uziraz",
          devops: "DevOps d Ifecka",
          design: "Aγewwas d UI/UX",
          other: "Tizmmar nniḍen"
        }
      },
      projects: {
        title: "Isenfaren-inu",
        subtitle: "Afran n isenfaren i deg xedmeɣ, i d-yeskannen tizmmar-inu d leεnaya-w deg usnulfu n web.",
        featured: "Isenfaren Ifranin",
        demo: "Askan",
        code: "Tangalt",
        viewProject: "Ẓer Asenfar",
        sourceCode: "Tangalt n Uẓar",
        techStack: "Titiknulujiyin yettwasqedcen",
        liveDemo: "Askan srid",
        githubRepo: "Aḥraz GitHub"
      },
      experience: {
        title: "Tarmit-inu",
        subtitle: "Azref n uməṛṛu-w am umsedger web, i d-yeskannen tirmitanin tigejdanin d yimaṛṛa.",
        present: "Tura",
        years: "iseggasen",
        year: "aseggas",
        education: "Aselmed",
        work: "Tarmit n Uxeddim",
        certifications: "Iselkan"
      },
      academy: {
        title: "Aɣerbaz Zwanski",
        subtitle: "Aselmed Baṭel i Yal Yiwen - Issin tizmmar timaynutin s tmellalin-nneɣ timellatin",
        heroTitle: "Aɣerbaz Zwanski",
        heroSubtitle: "Lmed Yal Acu, Anda Yella, Melmi Yella - S Baṭel Meṛṛa",
        heroDescription: "Kcem ɣer alef n tmellalin n tmeɣrit meqqren seg tesdawiyin d iselmaden ifazen deg umaḍal. Seg usihel ɣer usekjef, tusnakt ɣer tmuzikat - akk baṭel i yal yiwen.",
        startLearning: "Bdu Tura Lmend",
        becomeInstructor: "Uɣal d Aselmad",
        courses: "Tmellalin",
        students: "Inelmaden",
        rating: "Asalay",
        viewAllCourses: "Ẓer Akk Tmellalin",
        enrolledStudents: "Inelmaden Yettwajerrden",
        duration: "Azref",
        level: "Aswir",
        enroll: "Jerred Tura",
        enrolled: "Yettwajerred",
        freeCourses: "Tmellalin Baṭel",
        globalStudents: "Inelmaden n Umaḍal",
        languages: "Tutlayin",
        certificates: "Iselkan",
        browseByCategoryTitle: "Snirem s Tawsit",
        allCategories: "Akk Tawsitin",
        noCoursesFound: "Ulac tmellalin yettwafen",
        noCoursesDescription: "Ɛreḍ ad tebduleḍ asbadu n unadi neɣ n ustayi.",
        showingCourses: "Askan n",
        course: "tamellalt",
        coursePlural: "tmellalin",
        gridView: "Tagruma",
        listView: "Tabdart",
        searchPlaceholder: "Nadi tmellalin, isental neɣ iselmaden...",
        allLevels: "Akk Iswiren",
        beginner: "Amezwaru",
        intermediate: "Alemmas",
        advanced: "Ameqran"
      },
      services: {
        title: "Tinfiwin IT Timeɣriyin",
        subtitle: "Tifrayin IT timellatin seg usnulfu n web ɣer useɣɣu ameqran n yibenkan d tɣellist n cyber. Amidakul-ik yettamnen i akk tiḥwaǧin-ik titiknulujiyin.",
        heroTitle: "Tinfiwin IT Timeɣriyin",
        heroSubtitle: "Tifrayin IT timellatin seg usnulfu n web ɣer useɣɣu ameqran n yibenkan d tɣellist n cyber. Amidakul-ik yettamnen i akk tiḥwaǧin-ik titiknulujiyin.",
        getStartedToday: "Bdu Ass-a",
        ourServices: "Tinfiwin-nneɣ",
        ourServicesSubtitle: "Tinfiwin titiknulujiyin timeɣriyin i tallelt n uzref d uselmed n tesbabut-ik deg umaḍal umḍin.",
        allServices: "Akk Tinfiwin",
        development: "Asnulfu",
        support: "Tallelt",
        security: "Taɣellist",
        marketing: "Abeggez",
        learnMore: "Issin Ugar",
        requestService: "Suter Tanfiwin",
        stats: {
          devicesRepaired: "Ibenkan Yettwaɣeqqen",
          expertSupport: "Tallelt n Umeɣri",
          securityImprovement: "Asnerni n Tɣellist",
          moneyBackGuarantee: "Tameɣlist n Uɣal n Yidrimen",
          yearsExperience: "Iseggasen n Tarmit",
          trustedByGlobalClients: "Yettaman deg-s Yifriwen n Umaḍal"
        },
        categories: {
          webDevelopment: "Asnulfu n Web",
          webDevelopmentDesc: "Asnulfu n yismal web udmawanen s useqdec n React, PHP, WordPress, neɣ titiknulujiyin nniḍen skud tiḥwaǧin-ik.",
          itSupport: "Tallelt IT",
          itSupportDesc: "Tallelt tatiknulujit, afru n wuguren d uḥraz n yiselkimen, itiliγruyen d yibenkan nniḍen.",
          wordpress: "Asnulfu WordPress",
          wordpressDesc: "Isental WordPress udmawanen, plugins d usnerni n usmel i twizut ifazen.",
          seo: "Asnerni SEO",
          seoDesc: "Snerni aswir n usmel-ik deg yimsebdar s SEO atiknulujit d usnerni n ugbur.",
          systemSecurity: "Taɣellist n Unagraw",
          systemSecurityDesc: "Asebded n yimuren n tɣellist, s ugar n usbedd n Wazuh d usekyed n tɣellist.",
          customTools: "Asnulfu n Yifecka Udmawanen",
          customToolsDesc: "Asnulfu n yifecka udmawanen d yiẓrigen n tawurmant i usnerni n umahil-ik n uxeddim."
        },
        pricing: {
          from: "Seg",
          perHour: "/asrag"
        }
      },
      youtube: {
        title: "Tiliγri YouTube",
        subtitle: "Ẓer tiliγri-w YouTube i yiselmaden, iwellihen, d tiktiwin ɣef usnulfu n web.",
      },
      contact: {
        title: "Nermes-iyi",
        subtitle: "Ur tettaggad ara ad tid-nermeseḍ i umuddu, isenfaren neɣ ala i usawal amdakul!",
        name: "Isem-ik",
        email: "Imayl-ik",
        message: "Izen-ik",
        send: "Azen Izen",
        success: "Izen yettwazen s lmendad!",
        error: "Azen n yizen yecceḍ. Ɛreḍ tikelt nniḍen.",
      },
      footer: {
        rights: "Akk Izerfan Ttwamestnen",
        builtWith: "Yettwabna s",
        poweredBy: "Yessexdem",
        quickLinks: "Iseɣwan Arurad",
        services: "Tinfiwin",
        connect: "Qqen"
      },
      playground: {
        title: "Annar n Urar",
        subtitle: "Sken isenfaren-inu d ifecka yellan deg umagrad i d-yemmalen taẓuri d usnulfu.",
        featured: "Asenfar Yettwafren",
        item1: {
          title: "Iskan Imyigawanen",
          description: "Sken isalmaden imyigawanen n isenfaren-inu ineggura d ifecka iminigen."
        },
        item2: {
          title: "Tirmitanin n Tussna Taramagant",
          description: "Af-d amahil-inu s tussna taramagant d isnasen n ulmad n tmacinin."
        },
        item3: {
          title: "Asihel Aseklan",
          description: "Ẓer imedyaten n isenfaren n usihel aseklan i yesdukklen taẓuri d tetiknulujit."
        }
      },
      cookie: {
        title: "Tifranin n Cookies",
        settings: "Iγewwaren",
        acceptAll: "Qbel Akk",
        rejectAll: "Agi Akk",
        acceptSelected: "Qbel Ifran",
        description: "Nesseqdac cookies akken ad nesnerni tarmit-ik n tunigin, ad nesleḍ tuzzya n usmel, ad nessagen agbur. Fren tifranin-ik dagi.",
        showDetails: "Sken talqayt",
        hideDetails: "Ffer talqayt",
        necessary: "Ilaqen",
        analytics: "Tasleḍt",
        marketing: "Abeggez",
        preferences: "Tifranin",
        necessaryDescription: "Cookies ilaqen i umahil ameɣtu n usmel web. Ur zmiren ara ad ttwaselsen.",
        analyticsDescription: "Cookies i ɣ-d-yettawin ad nefhem amek i tteddun yinabaḍen ɣer usmel-nneɣ s ulqqaḍ d uneqqis n telɣut s tbaḍnit.",
        marketingDescription: "Cookies yettwasqedcen i tuzzna n udellel udmawan d uḍfar n wugur n tkampayt-nneɣ n ubeggez.",
        preferencesDescription: "Cookies i d-yettcekkaṛen tifranin d iγewwaren-ik akken ad k-d-fken tarmit tudmawant."
      },
      common: {
        loading: "Asali...",
        error: "Agul",
        tryAgain: "Ɛreḍ tikelt nniḍen",
        search: "Anadi",
        filter: "Astay",
        sort: "Asmizzwer",
        save: "Sekles",
        cancel: "Sefsex",
        submit: "Azen",
        next: "Ameḍfir",
        previous: "Amezwaru",
        close: "Mdel",
        open: "Ldi",
        edit: "Ẓreg",
        delete: "Mḥu",
        add: "Rnu",
        remove: "Kkes"
      }
    },
  }), []);

  const t = (key: string) => {
    const keys = key.split('.');
    let value: any = translations[language as keyof typeof translations];
    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = value[k];
      } else {
        return key;
      }
    }
    return typeof value === 'string' ? value : key;
  };

  const value = {
    language,
    setLanguage,
    t,
    wasAutoDetected,
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};
