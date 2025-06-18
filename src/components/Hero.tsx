
import { Button } from "@/components/ui/button";
import { ArrowRight, Play, Shield, Globe, Zap, Users, MessageSquare, Star, Sparkles } from "lucide-react";
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

  const [isVisible, setIsVisible] = useState(false);

  // Enhanced animated counters effect with useCallback
  const animateCounters = useCallback(() => {
    const duration = 2500;
    const steps = 80;
    const stepDuration = duration / steps;

    let step = 0;
    const timer = setInterval(() => {
      step++;
      const progress = step / steps;
      
      const easeOutCubic = 1 - Math.pow(1 - progress, 3);
      
      setCounters({
        devices: Math.floor(300 * easeOutCubic),
        satisfaction: Math.floor(98 * easeOutCubic),
        experience: Math.floor(5 * easeOutCubic),
        security: Math.floor(65 * easeOutCubic)
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
    const timeout = setTimeout(() => {
      setIsVisible(true);
      const timer = animateCounters();
      return () => clearInterval(timer);
    }, 300);
    
    return () => clearTimeout(timeout);
  }, [animateCounters]);

  const stats = [
    { 
      number: "300+", 
      label: t("hero.stats.devicesRepaired"), 
      icon: Zap, 
      value: counters.devices,
      color: "from-success-400 to-info-400"
    },
    { 
      number: "98%", 
      label: t("hero.stats.customerSatisfaction"), 
      icon: Users, 
      value: counters.satisfaction,
      color: "from-brand-400 to-brand-600"
    },
    { 
      number: "5+", 
      label: t("hero.stats.yearsExperience"), 
      icon: Shield, 
      value: counters.experience,
      color: "from-brand-500 to-success-500"
    },
    { 
      number: "65%", 
      label: t("hero.stats.securityImprovement"), 
      icon: Globe, 
      value: counters.security,
      color: "from-success-400 to-brand-400"
    }
  ];

  const features = [
    { icon: Shield, text: "Enterprise Security", color: "text-success-400" },
    { icon: Globe, text: "Global Support", color: "text-brand-400" },
    { icon: Zap, text: "24/7 Available", color: "text-info-400" },
    { icon: Star, text: "5-Star Rated", color: "text-warning-400" }
  ];

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-hero-pattern">
      {/* Enhanced Background with Professional Gradients */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:60px_60px]" />
      </div>
      
      {/* Professional Floating Elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-success-500/10 rounded-full blur-xl animate-float" />
      <div className="absolute bottom-20 right-10 w-32 h-32 bg-brand-500/10 rounded-full blur-2xl animate-glow-pulse" />
      <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-info-500/10 rounded-full blur-lg animate-float" style={{ animationDelay: '1s' }} />
      <div className="absolute top-1/3 right-1/3 w-24 h-24 bg-success-500/5 rounded-full blur-xl animate-glow-pulse" style={{ animationDelay: '2s' }} />

      <div className="container-professional relative z-10">
        <div className="max-w-7xl mx-auto text-center">
          {/* Enhanced Telegram Notice with Professional Styling */}
          <div className={`mb-8 transition-all duration-700 delay-100 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <a
              href="https://t.me/zwanski_tech"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-8 py-4 bg-glass-professional rounded-2xl text-brand-300 hover:text-brand-200 hover:bg-brand-500/10 transition-all duration-300 group shadow-elevation-2 hover:shadow-brand-subtle interactive-scale"
              aria-label={t("hero.telegramNotice")}
            >
              <MessageSquare className="h-5 w-5 group-hover:scale-110 transition-transform" aria-hidden="true" />
              <span className="font-medium">{t("hero.telegramNotice")}</span>
              <Sparkles className="h-4 w-4 text-brand-400 animate-glow-pulse" aria-hidden="true" />
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
            </a>
          </div>

          {/* Enhanced Headlines with Professional Typography */}
          <div className={`mb-12 transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <h1 className="text-display-2xl font-bold mb-8 text-gradient-primary leading-tight will-change-transform">
              {t("hero.headline")}
            </h1>
            <h2 className="text-heading-1 text-success-300 mb-8 font-display font-semibold tracking-tight">
              {t("hero.subheadline")}
            </h2>
          </div>

          {/* Enhanced Description with Professional Typography */}
          <div className={`mb-16 transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <p className="text-body-xl text-slate-300 max-w-5xl mx-auto leading-relaxed font-feature-default">
              {t("hero.description")}
            </p>
          </div>

          {/* Enhanced CTA Buttons with Professional Design */}
          <div className={`flex flex-col sm:flex-row gap-6 justify-center mb-20 transition-all duration-1000 delay-400 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <Link to="/services" aria-label={t("hero.cta1")}>
              <Button size="lg" className="cta-button-primary h-16 px-10 text-xl">
                {t("hero.cta1")}
                <ArrowRight className="ml-3 h-6 w-6 transition-transform group-hover:translate-x-1" aria-hidden="true" />
              </Button>
            </Link>
            <Link to="/computer-model" aria-label={t("hero.cta2")}>
              <Button variant="outline" size="lg" className="cta-button-secondary h-16 px-10 text-xl">
                <Play className="mr-3 h-6 w-6 transition-transform group-hover:scale-110" aria-hidden="true" />
                {t("hero.cta2")}
              </Button>
            </Link>
            <Link to="/chat" aria-label={t("hero.cta3")}>
              <Button size="lg" className="h-16 px-10 text-xl bg-gradient-to-r from-success-600 to-brand-600 hover:from-success-700 hover:to-brand-700 shadow-elevation-3 hover:shadow-success transition-all duration-300 interactive-scale">
                {t("hero.cta3")}
                <Zap className="ml-3 h-6 w-6 transition-transform group-hover:rotate-12" aria-hidden="true" />
              </Button>
            </Link>
          </div>

          {/* Enhanced Stats Grid with Professional Design */}
          <div className={`grid grid-cols-2 md:grid-cols-4 gap-8 max-w-6xl mx-auto mb-16 transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            {stats.map((stat, index) => (
              <div 
                key={index} 
                className="stat-card group interactive-lift"
                style={{
                  transitionDelay: `${index * 100}ms`
                }}
                role="group"
                aria-label={`${stat.label}: ${index === 0 ? `${stat.value}+` :
                   index === 1 ? `${stat.value}%` :
                   index === 2 ? `${stat.value}+` :
                   `${stat.value}%`}`}
              >
                {/* Enhanced Gradient Border Effect */}
                <div className={`absolute inset-0 rounded-3xl bg-gradient-to-r ${stat.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500 blur-sm`} />
                
                {/* Professional Icon Display */}
                <div className="mb-6 flex justify-center relative z-10">
                  <div className={`p-4 rounded-2xl bg-gradient-to-br ${stat.color} bg-opacity-15 group-hover:bg-opacity-25 transition-all duration-300 backdrop-blur-sm shadow-lg`}>
                    <stat.icon className={`h-8 w-8 text-gradient-brand`} aria-hidden="true" />
                  </div>
                </div>
                
                {/* Enhanced Animated Number */}
                <div className="stat-number mb-3 relative z-10" aria-live="polite">
                  {index === 0 ? `${stat.value}+` :
                   index === 1 ? `${stat.value}%` :
                   index === 2 ? `${stat.value}+` :
                   `${stat.value}%`}
                </div>
                
                {/* Professional Label */}
                <div className="stat-label relative z-10">
                  {stat.label}
                </div>
                
                {/* Enhanced Hover Glow */}
                <div className={`absolute inset-0 rounded-3xl bg-gradient-to-r ${stat.color} opacity-0 group-hover:opacity-5 transition-all duration-500`} />
              </div>
            ))}
          </div>

          {/* Enhanced Trust Indicators with Professional Styling */}
          <div className={`transition-all duration-1000 delay-600 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="flex flex-wrap justify-center items-center gap-8 text-slate-400">
              {features.map((feature, index) => (
                <div key={index} className="flex items-center gap-3 group interactive-brand">
                  <feature.icon className={`h-5 w-5 ${feature.color} group-hover:scale-110 transition-transform`} aria-hidden="true" />
                  <span className="text-sm font-medium group-hover:text-slate-300 transition-colors">{feature.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
