
import { 
  Monitor, 
  Code, 
  Smartphone, 
  Shield, 
  Search, 
  Cloud,
  Database,
  Wifi
} from "lucide-react";
import { Language } from "@/context/LanguageContext";

export const getServicesData = (language: Language) => {
  const services = {
    en: [
      {
        icon: Monitor,
        title: "Web Development",
        description: "Custom websites and web applications built with modern technologies like React, Node.js, and more.",
        features: ["Responsive Design", "Modern Frameworks", "SEO Optimized", "Fast Performance"],
        badge: "Popular",
        color: "from-blue-500 to-cyan-500"
      },
      {
        icon: Code,
        title: "Custom Software",
        description: "Tailored software solutions to meet your specific business needs and requirements.",
        features: ["Custom Logic", "Scalable Architecture", "API Integration", "Database Design"],
        badge: "Enterprise",
        color: "from-purple-500 to-pink-500"
      },
      {
        icon: Smartphone,
        title: "Device Repair",
        description: "Professional repair services for smartphones, tablets, laptops, and other electronic devices.",
        features: ["Quick Turnaround", "Quality Parts", "Warranty Included", "Data Recovery"],
        badge: "24/7",
        color: "from-green-500 to-emerald-500"
      },
      {
        icon: Shield,
        title: "Cybersecurity",
        description: "Comprehensive security solutions including Wazuh installation, security audits, and protection strategies.",
        features: ["Threat Detection", "Security Audits", "Compliance", "Incident Response"],
        badge: "Secure",
        color: "from-red-500 to-orange-500"
      },
      {
        icon: Search,
        title: "SEO Services",
        description: "Improve your online visibility with professional SEO optimization and digital marketing strategies.",
        features: ["Keyword Research", "Content Optimization", "Link Building", "Analytics"],
        badge: "Growth",
        color: "from-yellow-500 to-orange-500"
      },
      {
        icon: Cloud,
        title: "Cloud Solutions",
        description: "Cloud infrastructure setup, migration, and management for scalable and reliable systems.",
        features: ["Cloud Migration", "Auto Scaling", "Cost Optimization", "Backup Solutions"],
        badge: "Scalable",
        color: "from-indigo-500 to-blue-500"
      },
      {
        icon: Database,
        title: "Database Management",
        description: "Database design, optimization, and management for efficient data storage and retrieval.",
        features: ["Performance Tuning", "Data Migration", "Backup Strategies", "Security"],
        badge: "Reliable",
        color: "from-teal-500 to-cyan-500"
      },
      {
        icon: Wifi,
        title: "Network Setup",
        description: "Professional network installation and configuration for homes and businesses.",
        features: ["WiFi Setup", "Security Config", "Performance Optimization", "Troubleshooting"],
        badge: "Fast",
        color: "from-emerald-500 to-green-500"
      }
    ],
    fr: [
      {
        icon: Monitor,
        title: "Développement Web",
        description: "Sites web et applications web personnalisés construits avec des technologies modernes comme React, Node.js, et plus.",
        features: ["Design Responsive", "Frameworks Modernes", "Optimisé SEO", "Performance Rapide"],
        badge: "Populaire",
        color: "from-blue-500 to-cyan-500"
      },
      {
        icon: Code,
        title: "Logiciel Personnalisé",
        description: "Solutions logicielles sur mesure pour répondre à vos besoins et exigences commerciales spécifiques.",
        features: ["Logique Personnalisée", "Architecture Évolutive", "Intégration API", "Conception BDD"],
        badge: "Entreprise",
        color: "from-purple-500 to-pink-500"
      },
      {
        icon: Smartphone,
        title: "Réparation d'Appareils",
        description: "Services de réparation professionnels pour smartphones, tablettes, ordinateurs portables et autres appareils électroniques.",
        features: ["Délai Rapide", "Pièces de Qualité", "Garantie Incluse", "Récupération de Données"],
        badge: "24/7",
        color: "from-green-500 to-emerald-500"
      },
      {
        icon: Shield,
        title: "Cybersécurité",
        description: "Solutions de sécurité complètes incluant l'installation Wazuh, les audits de sécurité et les stratégies de protection.",
        features: ["Détection de Menaces", "Audits de Sécurité", "Conformité", "Réponse aux Incidents"],
        badge: "Sécurisé",
        color: "from-red-500 to-orange-500"
      },
      {
        icon: Search,
        title: "Services SEO",
        description: "Améliorez votre visibilité en ligne avec l'optimisation SEO professionnelle et les stratégies de marketing digital.",
        features: ["Recherche de Mots-clés", "Optimisation de Contenu", "Link Building", "Analytics"],
        badge: "Croissance",
        color: "from-yellow-500 to-orange-500"
      },
      {
        icon: Cloud,
        title: "Solutions Cloud",
        description: "Configuration, migration et gestion d'infrastructure cloud pour des systèmes évolutifs et fiables.",
        features: ["Migration Cloud", "Auto Scaling", "Optimisation des Coûts", "Solutions de Sauvegarde"],
        badge: "Évolutif",
        color: "from-indigo-500 to-blue-500"
      },
      {
        icon: Database,
        title: "Gestion de Base de Données",
        description: "Conception, optimisation et gestion de bases de données pour un stockage et une récupération efficaces des données.",
        features: ["Optimisation Performance", "Migration de Données", "Stratégies de Sauvegarde", "Sécurité"],
        badge: "Fiable",
        color: "from-teal-500 to-cyan-500"
      },
      {
        icon: Wifi,
        title: "Configuration Réseau",
        description: "Installation et configuration professionnelles de réseaux pour particuliers et entreprises.",
        features: ["Configuration WiFi", "Config Sécurité", "Optimisation Performance", "Dépannage"],
        badge: "Rapide",
        color: "from-emerald-500 to-green-500"
      }
    ],
    ar: [
      {
        icon: Monitor,
        title: "تطوير الويب",
        description: "مواقع وتطبيقات ويب مخصصة مبنية بتقنيات حديثة مثل React و Node.js وأكثر.",
        features: ["تصميم متجاوب", "أطر عمل حديثة", "محسن لمحركات البحث", "أداء سريع"],
        badge: "شائع",
        color: "from-blue-500 to-cyan-500"
      },
      {
        icon: Code,
        title: "برمجيات مخصصة",
        description: "حلول برمجية مصممة خصيصاً لتلبية احتياجاتك ومتطلبات عملك المحددة.",
        features: ["منطق مخصص", "هندسة قابلة للتوسع", "تكامل API", "تصميم قاعدة البيانات"],
        badge: "مؤسسي",
        color: "from-purple-500 to-pink-500"
      },
      {
        icon: Smartphone,
        title: "إصلاح الأجهزة",
        description: "خدمات إصلاح احترافية للهواتف الذكية والأجهزة اللوحية وأجهزة الكمبيوتر المحمولة والأجهزة الإلكترونية الأخرى.",
        features: ["مدة تسليم سريعة", "قطع عالية الجودة", "ضمان مشمول", "استرداد البيانات"],
        badge: "24/7",
        color: "from-green-500 to-emerald-500"
      },
      {
        icon: Shield,
        title: "الأمن السيبراني",
        description: "حلول أمنية شاملة تشمل تثبيت Wazuh ومراجعات الأمان واستراتيجيات الحماية.",
        features: ["كشف التهديدات", "مراجعات الأمان", "الامتثال", "الاستجابة للحوادث"],
        badge: "آمن",
        color: "from-red-500 to-orange-500"
      },
      {
        icon: Search,
        title: "خدمات SEO",
        description: "حسن ظهورك على الإنترنت مع تحسين SEO الاحترافي واستراتيجيات التسويق الرقمي.",
        features: ["بحث الكلمات المفتاحية", "تحسين المحتوى", "بناء الروابط", "التحليلات"],
        badge: "نمو",
        color: "from-yellow-500 to-orange-500"
      },
      {
        icon: Cloud,
        title: "حلول السحابة",
        description: "إعداد البنية التحتية السحابية والهجرة والإدارة للأنظمة القابلة للتوسع والموثوقة.",
        features: ["هجرة السحابة", "التوسع التلقائي", "تحسين التكلفة", "حلول النسخ الاحتياطي"],
        badge: "قابل للتوسع",
        color: "from-indigo-500 to-blue-500"
      },
      {
        icon: Database,
        title: "إدارة قواعد البيانات",
        description: "تصميم وتحسين وإدارة قواعد البيانات لتخزين واسترداد البيانات بكفاءة.",
        features: ["ضبط الأداء", "هجرة البيانات", "استراتيجيات النسخ الاحتياطي", "الأمان"],
        badge: "موثوق",
        color: "from-teal-500 to-cyan-500"
      },
      {
        icon: Wifi,
        title: "إعداد الشبكة",
        description: "تثبيت وتكوين شبكات احترافية للمنازل والشركات.",
        features: ["إعداد WiFi", "تكوين الأمان", "تحسين الأداء", "استكشاف الأخطاء"],
        badge: "سريع",
        color: "from-emerald-500 to-green-500"
      }
    ],
    ha: [
      {
        icon: Monitor,
        title: "Haɓaka Yanar Gizo",
        description: "Keɓantattun gidajen yanar gizo da manhajojin yanar gizo da aka gina tare da fasahar zamani kamar React, Node.js, da sauransu.",
        features: ["Zane mai Amsawa", "Tsarin Zamani", "An Inganta SEO", "Aiki mai Sauri"],
        badge: "Shahararren",
        color: "from-blue-500 to-cyan-500"
      },
      {
        icon: Code,
        title: "Software na Musamman",
        description: "Hanyoyin software da aka keɓanta don biyan bukatun kasuwancin ku na musamman.",
        features: ["Dabaru na Musamman", "Ginin mai Girma", "Haɗin API", "Tsarin Database"],
        badge: "Kasuwanci",
        color: "from-purple-500 to-pink-500"
      },
      {
        icon: Smartphone,
        title: "Gyaran Na'urori",
        description: "Ayyukan gyara na ƙwararru don wayoyin hannu, allunan, kwamfutoci masu ɗaukar nauyi, da sauran na'urorin lantarki.",
        features: ["Saurin Komawa", "Kayayyaki masu Inganci", "Garantin da ke Ciki", "Dawo da Bayanai"],
        badge: "24/7",
        color: "from-green-500 to-emerald-500"
      },
      {
        icon: Shield,
        title: "Tsaron Yanar Gizo",
        description: "Cikakkun hanyoyin tsaro da suka haɗa da shigar da Wazuh, binciken tsaro, da dabarun kariya.",
        features: ["Gano Barazana", "Binciken Tsaro", "Bin Ka'ida", "Amsa Lamura"],
        badge: "Amintacce",
        color: "from-red-500 to-orange-500"
      },
      {
        icon: Search,
        title: "Ayyukan SEO",
        description: "Inganta bayyanar ku akan yanar gizo tare da ingantaccen SEO da dabarun tallan dijital.",
        features: ["Binciken Kalmomin", "Inganta Abun Ciki", "Ginin Hanyoyin Haɗi", "Bincike"],
        badge: "Girma",
        color: "from-yellow-500 to-orange-500"
      },
      {
        icon: Cloud,
        title: "Hanyoyin Gajimare",
        description: "Saitin kayan aikin gajimare, ƙaura, da gudanarwa don tsarin da za a iya girma da aminci.",
        features: ["Ƙaurar Gajimare", "Girman Kai", "Inganta Farashi", "Hanyoyin Ajiya"],
        badge: "Mai Girma",
        color: "from-indigo-500 to-blue-500"
      },
      {
        icon: Database,
        title: "Gudanar da Database",
        description: "Zane, ingantawa, da gudanar da database don ingantaccen ajiya da dawo da bayanai.",
        features: ["Gyaran Aiki", "Ƙaurar Bayanai", "Dabarun Ajiya", "Tsaro"],
        badge: "Abin Dogara",
        color: "from-teal-500 to-cyan-500"
      },
      {
        icon: Wifi,
        title: "Saitin Cibiyar Sadarwa",
        description: "Shigar da cibiyar sadarwa na ƙwararru da saiti don gidaje da kasuwanci.",
        features: ["Saitin WiFi", "Saiti na Tsaro", "Inganta Aiki", "Magance Matsala"],
        badge: "Sauri",
        color: "from-emerald-500 to-green-500"
      }
    ],
    ber: [
      {
        icon: Monitor,
        title: "Asnulfu n Web",
        description: "Ismal web d isnasen web yuganen s titiknulujiyin timeγranin am React, Node.js, d wiyaḍ.",
        features: ["Aγewwas Anmeggay", "Iγbula Imaynuten", "Yettwasγel i SEO", "Axeddim Arurad"],
        badge: "Yufraren",
        color: "from-blue-500 to-cyan-500"
      },
      {
        icon: Code,
        title: "Iseɣẓanen Isufen",
        description: "Tifrayin n iseɣẓanen yettwaganen akken ad mlint isebtar-ik d tutlayin-ik n uzref.",
        features: ["Aẓref Asuf", "Taẓurt Yezmer ad Yimɣur", "Amyager API", "Aγewwas n Taffa"],
        badge: "Takebbanit",
        color: "from-purple-500 to-pink-500"
      },
      {
        icon: Smartphone,
        title: "Asseɣti n Yibenkan",
        description: "Tanfa n usseɣti taqbuṛt i tiliγriyin, itablaten, iselkim ifaḍazen, d yibenkan nniḍen n tiliγri.",
        features: ["Tuffɣa Taruradt", "Iferdisen n Taɣara", "Aḍman Yeddan", "Tiririt n Yisefka"],
        badge: "24/7",
        color: "from-green-500 to-emerald-500"
      },
      {
        icon: Shield,
        title: "Taɣellist Tukrisayt",
        description: "Tifrayin n tɣellist timellatin i deg yella usebded n Wazuh, asekyed n tɣellist, d tisirag n ummesten.",
        features: ["Tifin n Ugur", "Asekyed n Tɣellist", "Amlay", "Tririt ɣer Yineḍruyen"],
        badge: "Yettwaɣels",
        color: "from-red-500 to-orange-500"
      },
      {
        icon: Search,
        title: "Tanfatin SEO",
        description: "Sseɣti abani-k deg Internet s usleḥ n SEO aqbur d tisirag n usellek umḍin.",
        features: ["Anadi n Awalen", "Asleḥ n Ugbur", "Tebna n Yiseɣwan", "Tasleṭ"],
        badge: "Timɣi",
        color: "from-yellow-500 to-orange-500"
      },
      {
        icon: Cloud,
        title: "Tifrayin n Usigna",
        description: "Asbadu, asiweḍ, d usefrek n ugrud n usigna i yinagrawen yezmer ad imɣuren d yettwattkelen.",
        features: ["Asiweḍ n Usigna", "Aseɣti Awurman", "Asleḥ n Ssaraf", "Tifrayin n Uklas"],
        badge: "Yezmer ad imɣur",
        color: "from-indigo-500 to-blue-500"
      },
      {
        icon: Database,
        title: "Asefrek n Taffa",
        description: "Aγewwas, asleḥ, d usefrek n tfafin i uklas d tiririt n yisefka s taɣara.",
        features: ["Asleḥ n Uselkem", "Asiweḍ n Yisefka", "Tisirag n Uklas", "Taɣellist"],
        badge: "Yettwatkel",
        color: "from-teal-500 to-cyan-500"
      },
      {
        icon: Wifi,
        title: "Asbadu n Uẓeṭṭa",
        description: "Asebded d usefrek aqbuṛen n uẓeṭṭa i wejmaɛen d tkebbanin.",
        features: ["Asbadu WiFi", "Aswel n Tɣellist", "Asleḥ n Uselkem", "Tifin n Wuguren"],
        badge: "Arurad",
        color: "from-emerald-500 to-green-500"
      }
    ]
  };

  // Return English as fallback if language not found
  return services[language] || services.en;
};
