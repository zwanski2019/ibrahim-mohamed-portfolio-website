
import { Button } from "@/components/ui/button";
import { ArrowRight, Play, Shield, Globe, Zap, Users, MessageSquare } from "lucide-react";
import { Link } from "react-router-dom";
import { useLanguage } from "@/context/LanguageContext";
import { useEffect, useState } from "react";

const Hero = () => {
  const { language } = useLanguage();
  const [counters, setCounters] = useState({
    devices: 0,
    satisfaction: 0,
    experience: 0,
    security: 0
  });

  const content = {
    en: {
      headline: "Your Partner in Building, Repairing & Securing Digital Futures",
      subheadline: "Digital Solutions, Reimagined. Fix. Build. Secure. Empower.",
      description: "With over five years of dedicated experience in the IT industry, we provide comprehensive solutions spanning web development, cybersecurity, and advanced technical support. From custom Chrome extensions to IMEI services and BIOS repairs, we deliver excellence in every project.",
      cta1: "Explore Services",
      cta2: "Watch Demo",
      cta3: "Start Project",
      telegramNotice: "📢 Join our Telegram for instant tech news & updates!",
      stats: [
        { number: "300+", label: "Devices Repaired", icon: Zap, target: 300 },
        { number: "98%", label: "Customer Satisfaction", icon: Users, target: 98 },
        { number: "5+", label: "Years Experience", icon: Shield, target: 5 },
        { number: "65%", label: "Security Improvement", icon: Globe, target: 65 }
      ]
    },
    fr: {
      headline: "Votre Partenaire pour Construire, Réparer et Sécuriser l'Avenir Numérique",
      subheadline: "Solutions Numériques, Réinventées. Réparer. Construire. Sécuriser. Autonomiser.",
      description: "Avec plus de cinq ans d'expérience dédiée dans l'industrie IT, nous fournissons des solutions complètes couvrant le développement web, la cybersécurité et le support technique avancé.",
      cta1: "Découvrir les Services",
      cta2: "Voir la Démo",
      cta3: "Démarrer un Projet",
      telegramNotice: "📢 Rejoignez notre Telegram pour les nouvelles tech instantanées!",
      stats: [
        { number: "300+", label: "Appareils Réparés", icon: Zap, target: 300 },
        { number: "98%", label: "Satisfaction Client", icon: Users, target: 98 },
        { number: "5+", label: "Années d'Expérience", icon: Shield, target: 5 },
        { number: "65%", label: "Amélioration Sécurité", icon: Globe, target: 65 }
      ]
    },
    ar: {
      headline: "شريكك في بناء وإصلاح وتأمين المستقبل الرقمي",
      subheadline: "حلول رقمية مبتكرة. إصلاح. بناء. حماية. تمكين.",
      description: "مع أكثر من خمس سنوات من الخبرة المتخصصة في صناعة تقنية المعلومات، نقدم حلولاً شاملة تشمل تطوير الويب والأمن السيبراني والدعم التقني المتقدم.",
      cta1: "استكشف الخدمات",
      cta2: "شاهد العرض",
      cta3: "ابدأ مشروع",
      telegramNotice: "📢 انضم إلى تلغرام للأخبار التقنية الفورية!",
      stats: [
        { number: "300+", label: "جهاز تم إصلاحه", icon: Zap, target: 300 },
        { number: "98%", label: "رضا العملاء", icon: Users, target: 98 },
        { number: "5+", label: "سنوات خبرة", icon: Shield, target: 5 },
        { number: "65%", label: "تحسين الأمان", icon: Globe, target: 65 }
      ]
    }
  };

  const currentContent = content[language];

  // Animated counters effect
  useEffect(() => {
    const animateCounters = () => {
      const duration = 2000;
      const steps = 60;
      const stepDuration = duration / steps;

      let step = 0;
      const timer = setInterval(() => {
        step++;
        const progress = step / steps;
        
        setCounters({
          devices: Math.floor(300 * progress),
          satisfaction: Math.floor(98 * progress),
          experience: Math.floor(5 * progress),
          security: Math.floor(65 * progress)
        });

        if (step >= steps) {
          clearInterval(timer);
          setCounters({
            devices: 300,
            satisfaction: 98,
            experience: 5,
            security: 65
          });
        }
      }, stepDuration);
    };

    const timeout = setTimeout(animateCounters, 500);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-craft-hero overflow-hidden">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,212,170,0.03),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(59,130,246,0.03),transparent_50%)]" />
      
      {/* Floating elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-craft-mint/10 rounded-full blur-xl animate-gentle-bounce" />
      <div className="absolute bottom-20 right-10 w-32 h-32 bg-craft-blue/10 rounded-full blur-2xl animate-float" />
      <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-craft-mint/5 rounded-full blur-lg animate-pulse-slow" />

      <div className="craft-container relative z-10">
        <div className="max-w-6xl mx-auto text-center">
          {/* Telegram Notice Banner */}
          <div className="mb-12 craft-fade-in">
            <a
              href="https://t.me/zwanski_tech"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-6 py-3 bg-white/80 backdrop-blur-sm border border-gray-200/50 rounded-full text-gray-700 hover:text-craft-mint hover:bg-white transition-all duration-300 group shadow-craft"
            >
              <MessageSquare className="h-4 w-4 group-hover:scale-110 transition-transform" />
              <span className="font-medium">{currentContent.telegramNotice}</span>
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>

          {/* Main Headlines */}
          <div className="mb-16 craft-spacing">
            <h1 className="font-inter font-bold text-5xl md:text-6xl lg:text-7xl text-craft-gray-900 leading-tight mb-8 tracking-tight">
              Your Partner in{" "}
              <span className="craft-text-gradient">Building, Repairing</span>{" "}
              & Securing Digital Futures
            </h1>
            <h2 className="text-xl md:text-2xl lg:text-3xl text-craft-gray-600 mb-8 font-medium">
              {currentContent.subheadline}
            </h2>
          </div>

          {/* Description */}
          <div className="mb-16">
            <p className="text-lg md:text-xl text-craft-gray-600 max-w-4xl mx-auto leading-relaxed">
              {currentContent.description}
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-20">
            <Link to="/services">
              <button className="craft-button-primary group">
                {currentContent.cta1}
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </button>
            </Link>
            <Link to="/computer-model">
              <button className="craft-button-secondary group">
                <Play className="mr-2 h-5 w-5 transition-transform group-hover:scale-110" />
                {currentContent.cta2}
              </button>
            </Link>
            <Link to="/chat">
              <button className="craft-button-primary group bg-craft-blue hover:bg-craft-blue/90">
                {currentContent.cta3}
                <Zap className="ml-2 h-5 w-5 transition-transform group-hover:rotate-12" />
              </button>
            </Link>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {currentContent.stats.map((stat, index) => (
              <div 
                key={index} 
                className="craft-card p-8 hover-lift group"
              >
                {/* Icon */}
                <div className="mb-4 flex justify-center">
                  <div className="p-3 rounded-xl bg-craft-mint/10 group-hover:bg-craft-mint/20 transition-all duration-300">
                    <stat.icon className="h-8 w-8 text-craft-mint" />
                  </div>
                </div>
                
                {/* Animated Number */}
                <div className="text-3xl md:text-4xl font-bold text-craft-gray-900 mb-2 font-inter">
                  {index === 0 ? `${counters.devices}+` :
                   index === 1 ? `${counters.satisfaction}%` :
                   index === 2 ? `${counters.experience}+` :
                   `${counters.security}%`}
                </div>
                
                {/* Label */}
                <div className="text-sm md:text-base text-craft-gray-600 font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>

          {/* Trust Indicators */}
          <div className="mt-16">
            <div className="flex flex-wrap justify-center items-center gap-8 text-craft-gray-500">
              <div className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-craft-mint" />
                <span className="font-medium">Certified & Secure</span>
              </div>
              <div className="flex items-center gap-2">
                <Globe className="h-5 w-5 text-craft-blue" />
                <span className="font-medium">Global Support</span>
              </div>
              <div className="flex items-center gap-2">
                <Zap className="h-5 w-5 text-craft-mint" />
                <span className="font-medium">24/7 Available</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
