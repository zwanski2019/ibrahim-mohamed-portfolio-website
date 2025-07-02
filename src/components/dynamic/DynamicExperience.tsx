
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Building, Calendar, MapPin, Trophy, ExternalLink } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

const DynamicExperience = () => {
  const { language } = useLanguage();

  const aboutContent = {
    en: {
      title: "About Our Expertise",
      description: "With over five years of dedicated experience in the IT industry, we provide comprehensive solutions spanning web development, cybersecurity, and advanced technical support. Our expertise lies in building responsive, user-focused websites and maintaining robust digital infrastructures. We are committed to delivering excellence, whether it's developing a custom Chrome extension, automating workflows to boost efficiency, or implementing security measures like Wazuh to significantly reduce vulnerabilities.",
      additionalInfo: "Our services extend to specialized hardware and software diagnostics and repair for both laptops and mobile devices. We are also proud to offer advanced solutions including IMEI services for Android and iPhones, and intricate BIOS repairs for laptops. For our clients' convenience, we provide expert remote IT support, ensuring seamless assistance no matter the location.",
      stats: [
        { number: "300+", label: "Devices Successfully Repaired", description: "Professional hardware and software repair services" },
        { number: "98%", label: "Customer Satisfaction Rate", description: "Proven track record of excellence" },
        { number: "65%", label: "Security Vulnerability Reduction", description: "Through advanced SIEM implementation" },
        { number: "5+", label: "Years of IT Experience", description: "Dedicated expertise in the industry" }
      ]
    },
    fr: {
      title: "À Propos de Notre Expertise",
      description: "Avec plus de cinq ans d'expérience dédiée dans l'industrie IT, nous fournissons des solutions complètes couvrant le développement web, la cybersécurité et le support technique avancé. Notre expertise réside dans la création de sites web réactifs et centrés sur l'utilisateur ainsi que dans la maintenance d'infrastructures numériques robustes.",
      additionalInfo: "Nos services s'étendent aux diagnostics spécialisés et à la réparation de matériel et logiciel pour ordinateurs portables et appareils mobiles. Nous sommes également fiers d'offrir des solutions avancées incluant les services IMEI pour Android et iPhone, et les réparations BIOS complexes pour ordinateurs portables.",
      stats: [
        { number: "300+", label: "Appareils Réparés avec Succès", description: "Services de réparation matériel et logiciel professionnels" },
        { number: "98%", label: "Taux de Satisfaction Client", description: "Historique prouvé d'excellence" },
        { number: "65%", label: "Réduction des Vulnérabilités", description: "Grâce à l'implémentation SIEM avancée" },
        { number: "5+", label: "Années d'Expérience IT", description: "Expertise dédiée dans l'industrie" }
      ]
    },
    ar: {
      title: "حول خبرتنا",
      description: "مع أكثر من خمس سنوات من الخبرة المتخصصة في صناعة تقنية المعلومات، نقدم حلولاً شاملة تشمل تطوير الويب والأمن السيبراني والدعم التقني المتقدم. تكمن خبرتنا في بناء مواقع ويب متجاوبة ومتمحورة حول المستخدم والحفاظ على بنى تحتية رقمية قوية.",
      additionalInfo: "تمتد خدماتنا إلى التشخيص المتخصص وإصلاح الأجهزة والبرامج لأجهزة الكمبيوتر المحمولة والأجهزة المحمولة. نحن فخورون أيضاً بتقديم حلول متقدمة تشمل خدمات IMEI لأجهزة الأندرويد والآيفون، وإصلاحات BIOS المعقدة لأجهزة الكمبيوتر المحمولة.",
      stats: [
        { number: "300+", label: "جهاز تم إصلاحه بنجاح", description: "خدمات إصلاح احترافية للأجهزة والبرامج" },
        { number: "98%", label: "معدل رضا العملاء", description: "سجل حافل بالتميز" },
        { number: "65%", label: "تقليل الثغرات الأمنية", description: "من خلال تطبيق SIEM المتقدم" },
        { number: "5+", label: "سنوات من الخبرة التقنية", description: "خبرة متخصصة في الصناعة" }
      ]
    }
  };

  const currentContent = aboutContent[language];

  return (
    <section className="py-20 bg-gradient-to-b from-muted/20 to-background">
      <div className="container mx-auto px-4">
        {/* About Section */}
        <div className="max-w-4xl mx-auto mb-16 text-center animate-on-scroll">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
            {currentContent.title}
          </h2>
          <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
            <p>{currentContent.description}</p>
            <p>{currentContent.additionalInfo}</p>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {currentContent.stats.map((stat, index) => (
            <Card key={index} className="text-center group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 bg-card/50 backdrop-blur-sm border-border/50 animate-on-scroll">
              <CardHeader className="pb-2">
                <div className="text-4xl md:text-5xl font-bold text-primary mb-2 group-hover:scale-110 transition-transform">
                  {stat.number}
                </div>
                <CardTitle className="text-lg font-semibold">
                  {stat.label}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-sm">
                  {stat.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Professional Experience Cards */}
        <div className="space-y-8">
          <div className="text-center mb-12 animate-on-scroll">
            <h3 className="text-2xl md:text-3xl font-bold mb-4">
              {language === 'en' ? 'Professional Experience' : language === 'fr' ? 'Expérience Professionnelle' : 'الخبرة المهنية'}
            </h3>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              {language === 'en' 
                ? 'Our proven track record in IT solutions and device repair services'
                : language === 'fr'
                ? 'Notre historique prouvé en solutions IT et services de réparation d\'appareils'
                : 'سجلنا الحافل في حلول تقنية المعلومات وخدمات إصلاح الأجهزة'
              }
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* IT Solutions & Web Development */}
            <Card className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-card/50 backdrop-blur-sm border-border/50 animate-on-scroll">
              <CardHeader className="pb-4">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <Building className="h-5 w-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <CardTitle className="text-xl">
                      {language === 'en' ? 'IT Solutions & Web Development' : language === 'fr' ? 'Solutions IT & Développement Web' : 'حلول تقنية المعلومات وتطوير الويب'}
                    </CardTitle>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                      <Calendar className="h-4 w-4" />
                      <span>2019 - {language === 'en' ? 'Present' : language === 'fr' ? 'Présent' : 'الحاضر'}</span>
                    </div>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2 mb-4">
                  <Badge variant="secondary">React</Badge>
                  <Badge variant="secondary">PHP</Badge>
                  <Badge variant="secondary">WordPress</Badge>
                  <Badge variant="secondary">JavaScript</Badge>
                  <Badge variant="secondary">Cybersecurity</Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-start gap-3">
                  <Trophy className="h-4 w-4 text-primary mt-1 flex-shrink-0" />
                  <span className="text-sm text-muted-foreground">
                    {language === 'en' 
                      ? 'Developed custom Chrome extensions and automation workflows'
                      : language === 'fr'
                      ? 'Développé des extensions Chrome personnalisées et des workflows d\'automatisation'
                      : 'طور إضافات Chrome مخصصة وسير عمل الأتمتة'
                    }
                  </span>
                </div>
                <div className="flex items-start gap-3">
                  <Trophy className="h-4 w-4 text-primary mt-1 flex-shrink-0" />
                  <span className="text-sm text-muted-foreground">
                    {language === 'en' 
                      ? 'Implemented Wazuh SIEM solutions reducing vulnerabilities by 65%'
                      : language === 'fr'
                      ? 'Implémenté des solutions Wazuh SIEM réduisant les vulnérabilités de 65%'
                      : 'نفذ حلول Wazuh SIEM مما قلل الثغرات بنسبة 65%'
                    }
                  </span>
                </div>
                <div className="flex items-start gap-3">
                  <Trophy className="h-4 w-4 text-primary mt-1 flex-shrink-0" />
                  <span className="text-sm text-muted-foreground">
                    {language === 'en' 
                      ? 'Built responsive websites and managed IT infrastructure for SMEs'
                      : language === 'fr'
                      ? 'Construit des sites web réactifs et géré l\'infrastructure IT pour PME'
                      : 'بنى مواقع ويب متجاوبة وأدار البنية التحتية التقنية للمؤسسات الصغيرة والمتوسطة'
                    }
                  </span>
                </div>
              </CardContent>
            </Card>

            {/* Device Repair & Technical Support */}
            <Card className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-card/50 backdrop-blur-sm border-border/50 animate-on-scroll">
              <CardHeader className="pb-4">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <Building className="h-5 w-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <CardTitle className="text-xl">
                      {language === 'en' ? 'Device Repair & Technical Support' : language === 'fr' ? 'Réparation d\'Appareils & Support Technique' : 'إصلاح الأجهزة والدعم التقني'}
                    </CardTitle>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                      <Calendar className="h-4 w-4" />
                      <span>2020 - {language === 'en' ? 'Present' : language === 'fr' ? 'Présent' : 'الحاضر'}</span>
                    </div>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2 mb-4">
                  <Badge variant="secondary">IMEI Repair</Badge>
                  <Badge variant="secondary">BIOS Repair</Badge>
                  <Badge variant="secondary">Remote Support</Badge>
                  <Badge variant="secondary">Hardware Diagnostics</Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-start gap-3">
                  <Trophy className="h-4 w-4 text-primary mt-1 flex-shrink-0" />
                  <span className="text-sm text-muted-foreground">
                    {language === 'en' 
                      ? 'Successfully repaired 300+ devices with 98% customer satisfaction'
                      : language === 'fr'
                      ? 'Réparé avec succès 300+ appareils avec 98% de satisfaction client'
                      : 'أصلح بنجاح أكثر من 300 جهاز بمعدل رضا عملاء 98%'
                    }
                  </span>
                </div>
                <div className="flex items-start gap-3">
                  <Trophy className="h-4 w-4 text-primary mt-1 flex-shrink-0" />
                  <span className="text-sm text-muted-foreground">
                    {language === 'en' 
                      ? 'Specialized in IMEI services for Android & iPhone devices'
                      : language === 'fr'
                      ? 'Spécialisé dans les services IMEI pour appareils Android et iPhone'
                      : 'متخصص في خدمات IMEI لأجهزة الأندرويد والآيفون'
                    }
                  </span>
                </div>
                <div className="flex items-start gap-3">
                  <Trophy className="h-4 w-4 text-primary mt-1 flex-shrink-0" />
                  <span className="text-sm text-muted-foreground">
                    {language === 'en' 
                      ? 'Expert-level BIOS and firmware repair for all major laptop brands'
                      : language === 'fr'
                      ? 'Réparation BIOS et firmware niveau expert pour toutes marques de laptops'
                      : 'إصلاح BIOS والبرامج الثابتة على مستوى الخبراء لجميع العلامات التجارية للأجهزة المحمولة'
                    }
                  </span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DynamicExperience;
