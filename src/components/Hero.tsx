
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
      const duration = 2000; // 2 seconds
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

    // Start animation after component mounts
    const timeout = setTimeout(animateCounters, 500);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      {/* Enhanced Background Elements */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,rgba(120,119,198,0.3),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(34,197,94,0.2),transparent_50%)]" />
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-grid-16" />
      
      {/* Floating Tech Elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-emerald-500/20 rounded-full blur-xl animate-pulse-slow" />
      <div className="absolute bottom-20 right-10 w-32 h-32 bg-blue-500/20 rounded-full blur-2xl animate-float" />
      <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-purple-500/20 rounded-full blur-lg animate-spin-slow" />
      <div className="absolute top-1/3 right-1/3 w-24 h-24 bg-cyan-500/10 rounded-full blur-xl animate-pulse-slow" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-7xl mx-auto text-center">
          {/* Telegram Notice Banner */}
          <div className="mb-8 animate-on-scroll">
            <a
              href="https://t.me/zwanski_tech"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600/20 to-blue-500/20 border border-blue-500/30 rounded-full text-blue-300 hover:text-blue-200 hover:from-blue-600/30 hover:to-blue-500/30 transition-all duration-300 backdrop-blur-sm group"
            >
              <MessageSquare className="h-4 w-4 group-hover:scale-110 transition-transform" />
              <span className="text-sm font-medium">{currentContent.telegramNotice}</span>
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>

          {/* Enhanced Main Headlines */}
          <div className="mb-12 animate-on-scroll">
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-8 bg-gradient-to-r from-blue-400 via-emerald-400 to-blue-400 bg-clip-text text-transparent leading-tight animate-pulse-slow">
              {currentContent.headline}
            </h1>
            <h2 className="text-2xl md:text-3xl lg:text-4xl text-emerald-300 mb-8 font-bold tracking-wide">
              {currentContent.subheadline}
            </h2>
          </div>

          {/* Enhanced Description */}
          <div className="mb-16 animate-on-scroll">
            <p className="text-xl md:text-2xl text-slate-300 max-w-5xl mx-auto leading-relaxed">
              {currentContent.description}
            </p>
          </div>

          {/* Enhanced CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center mb-20 animate-on-scroll">
            <Link to="/services">
              <Button size="lg" className="group h-16 px-10 text-xl bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 shadow-2xl shadow-blue-500/25">
                {currentContent.cta1}
                <ArrowRight className="ml-3 h-6 w-6 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
            <Link to="/computer-model">
              <Button variant="outline" size="lg" className="group h-16 px-10 text-xl border-emerald-500 text-emerald-400 hover:bg-emerald-500/10 shadow-2xl shadow-emerald-500/25">
                <Play className="mr-3 h-6 w-6 transition-transform group-hover:scale-110" />
                {currentContent.cta2}
              </Button>
            </Link>
            <Link to="/chat">
              <Button size="lg" className="group h-16 px-10 text-xl bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-700 hover:to-emerald-600 shadow-2xl shadow-emerald-500/25">
                {currentContent.cta3}
                <Zap className="ml-3 h-6 w-6 transition-transform group-hover:rotate-12" />
              </Button>
            </Link>
          </div>

          {/* Enhanced Animated Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-6xl mx-auto animate-on-scroll">
            {currentContent.stats.map((stat, index) => (
              <div 
                key={index} 
                className="relative group p-8 rounded-2xl bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-sm border border-slate-700/50 hover:border-emerald-500/50 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-emerald-500/20"
              >
                {/* Icon */}
                <div className="mb-4 flex justify-center">
                  <div className="p-4 rounded-full bg-gradient-to-br from-emerald-500/20 to-blue-500/20 group-hover:from-emerald-500/30 group-hover:to-blue-500/30 transition-all duration-300">
                    <stat.icon className="h-8 w-8 text-emerald-400" />
                  </div>
                </div>
                
                {/* Animated Number */}
                <div className="text-4xl md:text-5xl font-bold text-white mb-2 font-mono">
                  {index === 0 ? `${counters.devices}+` :
                   index === 1 ? `${counters.satisfaction}%` :
                   index === 2 ? `${counters.experience}+` :
                   `${counters.security}%`}
                </div>
                
                {/* Label */}
                <div className="text-sm md:text-base text-slate-300 font-medium leading-tight">
                  {stat.label}
                </div>
                
                {/* Hover glow effect */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-emerald-500/0 to-blue-500/0 group-hover:from-emerald-500/5 group-hover:to-blue-500/5 transition-all duration-500" />
              </div>
            ))}
          </div>

          {/* Trust Indicators */}
          <div className="mt-20 animate-on-scroll">
            <div className="flex flex-wrap justify-center items-center gap-8 text-slate-400">
              <div className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-emerald-400" />
                <span className="text-sm font-medium">Certified & Secure</span>
              </div>
              <div className="flex items-center gap-2">
                <Globe className="h-5 w-5 text-blue-400" />
                <span className="text-sm font-medium">Global Support</span>
              </div>
              <div className="flex items-center gap-2">
                <Zap className="h-5 w-5 text-purple-400" />
                <span className="text-sm font-medium">24/7 Available</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
