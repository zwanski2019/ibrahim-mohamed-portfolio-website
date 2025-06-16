
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, Smartphone, Laptop, Globe, Shield, Wrench, Settings, Code, Users } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

const Services = () => {
  const { language } = useLanguage();

  const services = {
    en: [
      {
        icon: Smartphone,
        title: "IMEI Services (Android & iPhone)",
        description: "Professional and reliable IMEI repair and servicing for a wide range of Android and iPhone models. Our solutions can help with network-related issues and restore your device's connectivity.",
        features: ["Network Connectivity Restoration", "Professional IMEI Repair", "Android & iPhone Support", "Fast Turnaround"],
        badge: "Mobile Repair"
      },
      {
        icon: Laptop,
        title: "Laptop BIOS Repair",
        description: "Expert-level BIOS and firmware repair for all major laptop brands. We can resolve booting issues, remove BIOS passwords, and fix firmware corruption to restore your machine to perfect working order.",
        features: ["BIOS Password Removal", "Firmware Corruption Fix", "Boot Issue Resolution", "All Major Brands"],
        badge: "Hardware Repair"
      },
      {
        icon: Globe,
        title: "Remote IT Support",
        description: "Get expert IT help wherever you are. We offer secure and efficient remote support to troubleshoot software issues, manage system configurations, install updates, and provide technical guidance.",
        features: ["Secure Remote Access", "Software Troubleshooting", "System Configuration", "Technical Guidance"],
        badge: "Remote Support"
      },
      {
        icon: Wrench,
        title: "Hardware & Software Repair",
        description: "With experience repairing over 300 devices, we offer comprehensive diagnostic and repair services for laptops and mobile phones. This includes screen replacement, battery replacement, motherboard repairs, and OS installations.",
        features: ["300+ Devices Repaired", "Comprehensive Diagnostics", "Component Replacement", "OS Installation"],
        badge: "Device Repair"
      },
      {
        icon: Code,
        title: "Custom Web Development",
        description: "We build modern, responsive websites using technologies like HTML5, CSS3, JavaScript, PHP, and React. From custom WordPress themes to dynamic web applications, we create user-focused designs that perform optimally.",
        features: ["Modern Technologies", "Responsive Design", "Custom WordPress Themes", "Dynamic Web Apps"],
        badge: "Web Development"
      },
      {
        icon: Users,
        title: "IT Infrastructure & Networking",
        description: "We handle office networking setup, IT infrastructure management for small and medium-sized enterprises (SMEs), and virtualization using VMware vSAN. Our goal is to create a stable and efficient digital environment.",
        features: ["Office Networking", "SME Infrastructure", "VMware vSAN", "Digital Environment Setup"],
        badge: "Infrastructure"
      },
      {
        icon: Shield,
        title: "Cybersecurity Solutions",
        description: "We help protect your digital assets by implementing robust security measures. Our experience includes deploying SIEM tools like Wazuh to reduce security vulnerabilities by up to 65% and proficiency in Kali Linux for penetration testing.",
        features: ["SIEM Tool Deployment", "65% Vulnerability Reduction", "Penetration Testing", "Digital Asset Protection"],
        badge: "Security"
      },
      {
        icon: Settings,
        title: "Process Automation",
        description: "Improve your business efficiency with our automation services. We create custom Python scripts and Excel Macros to automate data reporting and other repetitive tasks, saving you time and resources.",
        features: ["Python Script Automation", "Excel Macro Development", "Data Reporting", "Efficiency Improvement"],
        badge: "Automation"
      }
    ],
    fr: [
      {
        icon: Smartphone,
        title: "Services IMEI (Android & iPhone)",
        description: "Réparation et service IMEI professionnels et fiables pour une large gamme de modèles Android et iPhone. Nos solutions peuvent aider avec les problèmes liés au réseau et restaurer la connectivité de votre appareil.",
        features: ["Restauration Connectivité", "Réparation IMEI Pro", "Support Android & iPhone", "Délai Rapide"],
        badge: "Réparation Mobile"
      },
      {
        icon: Laptop,
        title: "Réparation BIOS Laptop",
        description: "Réparation BIOS et firmware de niveau expert pour toutes les grandes marques d'ordinateurs portables. Nous pouvons résoudre les problèmes de démarrage, supprimer les mots de passe BIOS et corriger la corruption du firmware.",
        features: ["Suppression Mot de Passe", "Correction Corruption", "Résolution Démarrage", "Toutes Marques"],
        badge: "Réparation Matériel"
      },
      {
        icon: Globe,
        title: "Support IT à Distance",
        description: "Obtenez une aide IT experte où que vous soyez. Nous offrons un support à distance sécurisé et efficace pour dépanner les problèmes logiciels, gérer les configurations système et fournir des conseils techniques.",
        features: ["Accès Distant Sécurisé", "Dépannage Logiciel", "Configuration Système", "Conseils Techniques"],
        badge: "Support Distant"
      },
      {
        icon: Wrench,
        title: "Réparation Matériel & Logiciel",
        description: "Avec l'expérience de la réparation de plus de 300 appareils, nous offrons des services complets de diagnostic et de réparation pour ordinateurs portables et téléphones mobiles.",
        features: ["300+ Appareils Réparés", "Diagnostics Complets", "Remplacement Composants", "Installation OS"],
        badge: "Réparation Appareil"
      },
      {
        icon: Code,
        title: "Développement Web Personnalisé",
        description: "Nous construisons des sites web modernes et réactifs en utilisant des technologies comme HTML5, CSS3, JavaScript, PHP et React. Des thèmes WordPress personnalisés aux applications web dynamiques.",
        features: ["Technologies Modernes", "Design Réactif", "Thèmes WordPress", "Applications Web"],
        badge: "Développement Web"
      },
      {
        icon: Users,
        title: "Infrastructure IT & Réseaux",
        description: "Nous gérons la configuration de réseaux de bureau, la gestion d'infrastructure IT pour les PME, et la virtualisation avec VMware vSAN pour créer un environnement numérique stable et efficace.",
        features: ["Réseaux Bureau", "Infrastructure PME", "VMware vSAN", "Environnement Numérique"],
        badge: "Infrastructure"
      },
      {
        icon: Shield,
        title: "Solutions de Cybersécurité",
        description: "Nous aidons à protéger vos actifs numériques en implémentant des mesures de sécurité robustes. Notre expérience inclut le déploiement d'outils SIEM comme Wazuh pour réduire les vulnérabilités de sécurité jusqu'à 65%.",
        features: ["Déploiement Outils SIEM", "65% Réduction Vulnérabilités", "Tests de Pénétration", "Protection Actifs"],
        badge: "Sécurité"
      },
      {
        icon: Settings,
        title: "Automatisation des Processus",
        description: "Améliorez l'efficacité de votre entreprise avec nos services d'automatisation. Nous créons des scripts Python personnalisés et des macros Excel pour automatiser les rapports de données et autres tâches répétitives.",
        features: ["Scripts Python", "Macros Excel", "Rapports Données", "Amélioration Efficacité"],
        badge: "Automatisation"
      }
    ],
    ar: [
      {
        icon: Smartphone,
        title: "خدمات IMEI (أندرويد وآيفون)",
        description: "إصلاح وخدمة IMEI محترفة وموثوقة لمجموعة واسعة من أجهزة الأندرويد والآيفون. يمكن لحلولنا أن تساعد في المشاكل المتعلقة بالشبكة واستعادة اتصال جهازك.",
        features: ["استعادة اتصال الشبكة", "إصلاح IMEI محترف", "دعم أندرويد وآيفون", "إنجاز سريع"],
        badge: "إصلاح الجوال"
      },
      {
        icon: Laptop,
        title: "إصلاح BIOS اللابتوب",
        description: "إصلاح BIOS والبرامج الثابتة على مستوى الخبراء لجميع العلامات التجارية الرئيسية للابتوب. يمكننا حل مشاكل الإقلاع وإزالة كلمات مرور BIOS وإصلاح تلف البرامج الثابتة.",
        features: ["إزالة كلمة مرور BIOS", "إصلاح تلف البرامج", "حل مشاكل الإقلاع", "جميع العلامات التجارية"],
        badge: "إصلاح الأجهزة"
      },
      {
        icon: Globe,
        title: "الدعم التقني عن بُعد",
        description: "احصل على مساعدة تقنية خبيرة أينما كنت. نقدم دعماً عن بُعد آمناً وفعالاً لاستكشاف مشاكل البرامج وإدارة تكوينات النظام وتقديم الإرشاد التقني.",
        features: ["وصول آمن عن بُعد", "استكشاف أخطاء البرامج", "تكوين النظام", "إرشاد تقني"],
        badge: "دعم عن بُعد"
      },
      {
        icon: Wrench,
        title: "إصلاح الأجهزة والبرامج",
        description: "مع خبرة في إصلاح أكثر من 300 جهاز، نقدم خدمات شاملة للتشخيص والإصلاح للابتوب والهواتف المحمولة. يشمل ذلك استبدال الشاشة والبطارية وإصلاح اللوحة الأم وتثبيت نظام التشغيل.",
        features: ["300+ جهاز تم إصلاحه", "تشخيص شامل", "استبدال المكونات", "تثبيت نظام التشغيل"],
        badge: "إصلاح الأجهزة"
      },
      {
        icon: Code,
        title: "تطوير الويب المخصص",
        description: "نبني مواقع ويب حديثة ومتجاوبة باستخدام تقنيات مثل HTML5 وCSS3 وJavaScript وPHP وReact. من قوالب ووردبريس المخصصة إلى تطبيقات الويب الديناميكية.",
        features: ["تقنيات حديثة", "تصميم متجاوب", "قوالب ووردبريس", "تطبيقات ويب ديناميكية"],
        badge: "تطوير الويب"
      },
      {
        icon: Users,
        title: "البنية التحتية وشبكات تقنية المعلومات",
        description: "نتعامل مع إعداد شبكات المكاتب وإدارة البنية التحتية لتقنية المعلومات للمؤسسات الصغيرة والمتوسطة والمحاكاة الافتراضية باستخدام VMware vSAN.",
        features: ["شبكات المكاتب", "بنية تحتية للمؤسسات", "VMware vSAN", "إعداد البيئة الرقمية"],
        badge: "البنية التحتية"
      },
      {
        icon: Shield,
        title: "حلول الأمن السيبراني",
        description: "نساعد في حماية أصولك الرقمية من خلال تنفيذ تدابير أمنية قوية. تشمل خبرتنا نشر أدوات SIEM مثل Wazuh لتقليل نقاط الضعف الأمنية بنسبة تصل إلى 65%.",
        features: ["نشر أدوات SIEM", "تقليل الثغرات 65%", "اختبار الاختراق", "حماية الأصول الرقمية"],
        badge: "الأمن السيبراني"
      },
      {
        icon: Settings,
        title: "أتمتة العمليات",
        description: "حسّن كفاءة عملك مع خدمات الأتمتة لدينا. ننشئ نصوص Python مخصصة وماكرو Excel لأتمتة تقارير البيانات والمهام المتكررة الأخرى.",
        features: ["أتمتة نصوص Python", "تطوير ماكرو Excel", "تقارير البيانات", "تحسين الكفاءة"],
        badge: "الأتمتة"
      }
    ]
  };

  const currentServices = services[language];

  return (
    <section className="py-20 bg-gradient-to-b from-background to-muted/20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-on-scroll">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
            {language === 'en' ? 'Professional IT Services' : language === 'fr' ? 'Services IT Professionnels' : 'الخدمات التقنية المهنية'}
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            {language === 'en' 
              ? 'Comprehensive IT solutions from web development to advanced device repair and cybersecurity'
              : language === 'fr'
              ? 'Solutions IT complètes du développement web à la réparation avancée d\'appareils et à la cybersécurité'
              : 'حلول تقنية شاملة من تطوير الويب إلى الإصلاح المتقدم للأجهزة والأمن السيبراني'
            }
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {currentServices.map((service, index) => (
            <Card key={index} className="group hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 bg-card/50 backdrop-blur-sm border-border/50 animate-on-scroll">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 rounded-xl bg-primary/10 group-hover:bg-primary/20 transition-colors">
                    <service.icon className="h-6 w-6 text-primary" />
                  </div>
                  <Badge variant="secondary" className="text-xs">
                    {service.badge}
                  </Badge>
                </div>
                <CardTitle className="text-lg font-bold group-hover:text-primary transition-colors">
                  {service.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <CardDescription className="text-sm text-muted-foreground leading-relaxed">
                  {service.description}
                </CardDescription>
                
                <div className="space-y-2">
                  {service.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-center text-sm">
                      <div className="w-1.5 h-1.5 bg-primary rounded-full mr-2 flex-shrink-0" />
                      <span className="text-muted-foreground">{feature}</span>
                    </div>
                  ))}
                </div>

                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="w-full group/btn hover:bg-primary/10 mt-4"
                >
                  {language === 'en' ? 'Learn More' : language === 'fr' ? 'En Savoir Plus' : 'اعرف المزيد'}
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-16 animate-on-scroll">
          <Button size="lg" className="h-14 px-8">
            {language === 'en' ? 'Get Started Today' : language === 'fr' ? 'Commencer Aujourd\'hui' : 'ابدأ اليوم'}
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Services;
