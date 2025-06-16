
import { Button } from "@/components/ui/button";
import { ArrowRight, Play } from "lucide-react";
import { Link } from "react-router-dom";
import { useLanguage } from "@/context/LanguageContext";

const Hero = () => {
  const { language } = useLanguage();

  const content = {
    en: {
      headline: "Expert IT Solutions: Web Development, IMEI & BIOS Repair, Remote Support",
      subheadline: "Your Partner in Digital Infrastructure & Advanced Device Repair",
      description: "With over five years of dedicated experience in the IT industry, we provide comprehensive solutions spanning web development, cybersecurity, and advanced technical support. From custom Chrome extensions to IMEI services and BIOS repairs, we deliver excellence in every project.",
      cta: "View Services",
      watchDemo: "Watch Demo",
      stats: [
        { number: "300+", label: "Devices Repaired" },
        { number: "98%", label: "Customer Satisfaction" },
        { number: "5+", label: "Years Experience" },
        { number: "65%", label: "Security Improvement" }
      ]
    },
    fr: {
      headline: "Solutions IT Expert: Développement Web, Réparation IMEI & BIOS, Support à Distance",
      subheadline: "Votre Partenaire en Infrastructure Numérique & Réparation Avancée d'Appareils",
      description: "Avec plus de cinq ans d'expérience dédiée dans l'industrie IT, nous fournissons des solutions complètes couvrant le développement web, la cybersécurité et le support technique avancé.",
      cta: "Voir les Services",
      watchDemo: "Voir la Démo",
      stats: [
        { number: "300+", label: "Appareils Réparés" },
        { number: "98%", label: "Satisfaction Client" },
        { number: "5+", label: "Années d'Expérience" },
        { number: "65%", label: "Amélioration Sécurité" }
      ]
    },
    ar: {
      headline: "حلول تقنية متخصصة: تطوير الويب، إصلاح IMEI و BIOS، الدعم عن بُعد",
      subheadline: "شريكك في البنية التحتية الرقمية وإصلاح الأجهزة المتقدم",
      description: "مع أكثر من خمس سنوات من الخبرة المتخصصة في صناعة تقنية المعلومات، نقدم حلولاً شاملة تشمل تطوير الويب والأمن السيبراني والدعم التقني المتقدم.",
      cta: "عرض الخدمات",
      watchDemo: "مشاهدة العرض",
      stats: [
        { number: "300+", label: "جهاز تم إصلاحه" },
        { number: "98%", label: "رضا العملاء" },
        { number: "5+", label: "سنوات خبرة" },
        { number: "65%", label: "تحسين الأمان" }
      ]
    }
  };

  const currentContent = content[language];

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-background via-background to-muted/30">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-grid-16" />
      <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
      
      {/* Floating Elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-primary/10 rounded-full blur-xl animate-pulse-slow" />
      <div className="absolute bottom-20 right-10 w-32 h-32 bg-secondary/10 rounded-full blur-2xl animate-float" />
      <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-accent/10 rounded-full blur-lg animate-spin-slow" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-6xl mx-auto text-center">
          {/* Main Headlines */}
          <div className="mb-8 animate-on-scroll">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-primary via-purple-600 to-primary bg-clip-text text-transparent leading-tight">
              {currentContent.headline}
            </h1>
            <h2 className="text-xl md:text-2xl lg:text-3xl text-muted-foreground mb-8 font-medium">
              {currentContent.subheadline}
            </h2>
          </div>

          {/* Description */}
          <div className="mb-12 animate-on-scroll">
            <p className="text-lg md:text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
              {currentContent.description}
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16 animate-on-scroll">
            <Link to="/services">
              <Button size="lg" className="group h-14 px-8 text-lg">
                {currentContent.cta}
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
            <Link to="/3d-computer">
              <Button variant="outline" size="lg" className="group h-14 px-8 text-lg">
                <Play className="mr-2 h-5 w-5 transition-transform group-hover:scale-110" />
                {currentContent.watchDemo}
              </Button>
            </Link>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto animate-on-scroll">
            {currentContent.stats.map((stat, index) => (
              <div key={index} className="text-center p-6 rounded-xl bg-card/50 backdrop-blur-sm border border-border/50 hover:bg-card/80 transition-all duration-300">
                <div className="text-3xl md:text-4xl font-bold text-primary mb-2">
                  {stat.number}
                </div>
                <div className="text-sm md:text-base text-muted-foreground font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
