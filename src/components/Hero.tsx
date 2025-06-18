
import { Button } from "@/components/ui/button";
import { ArrowRight, Play, Shield, Globe, Zap, Users, MessageSquare } from "lucide-react";
import { Link } from "react-router-dom";
import { useLanguage } from "@/context/LanguageContext";
import { useEffect, useState, useCallback } from "react";

const Hero = () => {
  const { t } = useLanguage();
  const [counters, setCounters] = useState({
    devices: 0,
    satisfaction: 0,
    experience: 0,
    security: 0
  });

  // Optimized animated counters effect with useCallback
  const animateCounters = useCallback(() => {
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

    return timer;
  }, []);

  useEffect(() => {
    // Start animation after component mounts
    const timeout = setTimeout(() => {
      const timer = animateCounters();
      return () => clearInterval(timer);
    }, 500);
    
    return () => clearTimeout(timeout);
  }, [animateCounters]);

  const stats = [
    { 
      number: "300+", 
      label: t("hero.stats.devicesRepaired"), 
      icon: Zap, 
      value: counters.devices
    },
    { 
      number: "98%", 
      label: t("hero.stats.customerSatisfaction"), 
      icon: Users, 
      value: counters.satisfaction
    },
    { 
      number: "5+", 
      label: t("hero.stats.yearsExperience"), 
      icon: Shield, 
      value: counters.experience
    },
    { 
      number: "65%", 
      label: t("hero.stats.securityImprovement"), 
      icon: Globe, 
      value: counters.security
    }
  ];

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
              aria-label={t("hero.telegramNotice")}
            >
              <MessageSquare className="h-4 w-4 group-hover:scale-110 transition-transform" aria-hidden="true" />
              <span className="text-sm font-medium">{t("hero.telegramNotice")}</span>
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
            </a>
          </div>

          {/* Enhanced Main Headlines */}
          <div className="mb-12 animate-on-scroll">
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-8 bg-gradient-to-r from-blue-400 via-emerald-400 to-blue-400 bg-clip-text text-transparent leading-tight animate-pulse-slow">
              {t("hero.headline")}
            </h1>
            <h2 className="text-2xl md:text-3xl lg:text-4xl text-emerald-300 mb-8 font-bold tracking-wide">
              {t("hero.subheadline")}
            </h2>
          </div>

          {/* Enhanced Description */}
          <div className="mb-16 animate-on-scroll">
            <p className="text-xl md:text-2xl text-slate-300 max-w-5xl mx-auto leading-relaxed">
              {t("hero.description")}
            </p>
          </div>

          {/* Enhanced CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center mb-20 animate-on-scroll">
            <Link to="/services" aria-label={t("hero.cta1")}>
              <Button size="lg" className="group h-16 px-10 text-xl bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 shadow-2xl shadow-blue-500/25">
                {t("hero.cta1")}
                <ArrowRight className="ml-3 h-6 w-6 transition-transform group-hover:translate-x-1" aria-hidden="true" />
              </Button>
            </Link>
            <Link to="/computer-model" aria-label={t("hero.cta2")}>
              <Button variant="outline" size="lg" className="group h-16 px-10 text-xl border-emerald-500 text-emerald-400 hover:bg-emerald-500/10 shadow-2xl shadow-emerald-500/25">
                <Play className="mr-3 h-6 w-6 transition-transform group-hover:scale-110" aria-hidden="true" />
                {t("hero.cta2")}
              </Button>
            </Link>
            <Link to="/chat" aria-label={t("hero.cta3")}>
              <Button size="lg" className="group h-16 px-10 text-xl bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-700 hover:to-emerald-600 shadow-2xl shadow-emerald-500/25">
                {t("hero.cta3")}
                <Zap className="ml-3 h-6 w-6 transition-transform group-hover:rotate-12" aria-hidden="true" />
              </Button>
            </Link>
          </div>

          {/* Enhanced Animated Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-6xl mx-auto animate-on-scroll">
            {stats.map((stat, index) => (
              <div 
                key={index} 
                className="relative group p-8 rounded-2xl bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-sm border border-slate-700/50 hover:border-emerald-500/50 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-emerald-500/20"
                role="group"
                aria-label={`${stat.label}: ${index === 0 ? `${stat.value}+` :
                   index === 1 ? `${stat.value}%` :
                   index === 2 ? `${stat.value}+` :
                   `${stat.value}%`}`}
              >
                {/* Icon */}
                <div className="mb-4 flex justify-center">
                  <div className="p-4 rounded-full bg-gradient-to-br from-emerald-500/20 to-blue-500/20 group-hover:from-emerald-500/30 group-hover:to-blue-500/30 transition-all duration-300">
                    <stat.icon className="h-8 w-8 text-emerald-400" aria-hidden="true" />
                  </div>
                </div>
                
                {/* Animated Number */}
                <div className="text-4xl md:text-5xl font-bold text-white mb-2 font-mono" aria-live="polite">
                  {index === 0 ? `${stat.value}+` :
                   index === 1 ? `${stat.value}%` :
                   index === 2 ? `${stat.value}+` :
                   `${stat.value}%`}
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
                <Shield className="h-5 w-5 text-emerald-400" aria-hidden="true" />
                <span className="text-sm font-medium">Certified & Secure</span>
              </div>
              <div className="flex items-center gap-2">
                <Globe className="h-5 w-5 text-blue-400" aria-hidden="true" />
                <span className="text-sm font-medium">Global Support</span>
              </div>
              <div className="flex items-center gap-2">
                <Zap className="h-5 w-5 text-purple-400" aria-hidden="true" />
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
