import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';

export type Language = 'en' | 'fr' | 'ar' | 'ha' | 'ber';

interface LanguageContextProps {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextProps | undefined>(undefined);

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};

const defaultLanguage: Language = (localStorage.getItem('language') as Language) || 'en';

export const LanguageProvider = ({ children }: { children: React.ReactNode }) => {
  const [language, setLanguage] = useState<Language>(defaultLanguage);

  useEffect(() => {
    localStorage.setItem('language', language);
    document.documentElement.setAttribute('lang', language);
  }, [language]);

  const translations = useMemo(() => ({
    en: {
      navbar: {
        about: "About",
        skills: "Skills",
        projects: "Projects",
        experience: "Experience",
        youtube: "YouTube",
        contact: "Contact",
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
      },
      projects: {
        title: "My Projects",
        subtitle: "A selection of projects I've worked on, showcasing my skills and passion for web development.",
      },
      experience: {
        title: "My Experience",
        subtitle: "A timeline of my journey as a web developer, highlighting key experiences and achievements.",
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
    },
    fr: {
      navbar: {
        about: "À Propos",
        skills: "Compétences",
        projects: "Projets",
        experience: "Expérience",
        youtube: "YouTube",
        contact: "Contact",
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
      },
      projects: {
        title: "Mes Projets",
        subtitle: "Une sélection de projets sur lesquels j'ai travaillé, mettant en valeur mes compétences et ma passion pour le développement web.",
      },
      experience: {
        title: "Mon Expérience",
        subtitle: "Une chronologie de mon parcours en tant que développeur web, soulignant les expériences clés et les réalisations.",
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
    },
    ar: {
      navbar: {
        about: "حول",
        skills: "مهارات",
        projects: "مشاريع",
        experience: "خبرة",
        youtube: "يوتيوب",
        contact: "اتصل",
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
      },
      projects: {
        title: "مشاريعي",
        subtitle: "مجموعة مختارة من المشاريع التي عملت عليها، تعرض مهاراتي وشغفي بتطوير الويب.",
      },
      experience: {
        title: "خبرتي",
        subtitle: "تسلسل زمني لرحلتي كمطور ويب، يسلط الضوء على الخبرات والإنجازات الرئيسية.",
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
    },
    ha: {
      navbar: {
        about: "Game da",
        skills: "Ƙwarewa",
        projects: "Ayyuka",
        experience: "Ƙware-ƙware",
        youtube: "YouTube",
        contact: "Tuntuɓi",
      },
      hero: {
        title: "Sannu, ni ne ",
        subtitle: "Ƙirƙirar Abubuwa na Dijital da Lamba",
        description: "Mai haɓaka yanar gizo mai ƙauna wanda ke ƙaddamar da sabbin hanyoyin samar da yanar gizo masu sauƙi. Duba ayyukana don ganin yadda nake rayar da ra'ayoyi.",
        viewWork: "Duba Ayyukana",
        contactMe: "Tuntuɓe Ni",
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
    },
    ber: {
      navbar: {
        about: "Ɣef",
        skills: "Tizmmar",
        projects: "Isenfaren",
        experience: "Tarmit",
        youtube: "YouTube",
        contact: "Nermes",
      },
      hero: {
        title: "Azul, nekki d ",
        subtitle: "Asekker n Tedyanin Timḍanin s Tengalt",
        description: "Amsedger web yeεjben, yettwasekker i tmerna n tifrayin web timeγranin d tisehlanin. Sken asebter-inu akken ad teẓreḍ amek i ttarra tiktiwin d tudert.",
        viewWork: "Ẓer Amahil-inu",
        contactMe: "Nermes-iyi",
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
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};
