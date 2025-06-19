
import { Button } from "@/components/ui/button";
import { ArrowRight, Play, Shield, Globe, Zap, Users, MessageSquare, Star, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { useLanguage } from "@/context/LanguageContext";
import { useEffect, useState, useCallback, Suspense } from "react";
import LaptopCanvas from "@/components/3d/LaptopCanvas";

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
    const duration = 2500; // 2.5 seconds for smoother animation
    const steps = 80; // More steps for smoother animation
    const stepDuration = duration / steps;

    let step = 0;
    const timer = setInterval(() => {
      step++;
      const progress = step / steps;
      
      // Use easing function for smoother animation
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
    // Trigger visibility and animation
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
      color: "from-emerald-400 to-cyan-400"
    },
    { 
      number: "98%", 
      label: t("hero.stats.customerSatisfaction"), 
      icon: Users, 
      value: counters.satisfaction,
      color: "from-blue-400 to-indigo-400"
    },
    { 
      number: "5+", 
      label: t("hero.stats.yearsExperience"), 
      icon: Shield, 
      value: counters.experience,
      color: "from-purple-400 to-pink-400"
    },
    { 
      number: "65%", 
      label: t("hero.stats.securityImprovement"), 
      icon: Globe, 
      value: counters.security,
      color: "from-orange-400 to-red-400"
    }
  ];

  const features = [
    { icon: Shield, text: "Enterprise Security", color: "text-emerald-400" },
    { icon: Globe, text: "Global Support", color: "text-blue-400" },
    { icon: Zap, text: "24/7 Available", color: "text-purple-400" },
    { icon: Star, text: "5-Star Rated", color: "text-yellow-400" }
  ];

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Enhanced Background with Multiple Layers */}
      <div className="absolute inset-0">
        {/* Animated gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-brand-900/40 via-slate-900 to-accent-900/40 animate-gradient-shift bg-[length:400%_400%]" />
        
        {/* Radial gradients for depth */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_25%,rgba(59,130,246,0.15),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_75%,rgba(34,197,94,0.1),transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(168,85,247,0.05),transparent_70%)]" />
        
        {/* Subtle grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px]" />
      </div>
      
      {/* Floating Tech Elements with Enhanced Animation */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-emerald-500/20 rounded-full blur-xl animate-pulse-slow" />
      <div className="absolute bottom-20 right-10 w-32 h-32 bg-blue-500/20 rounded-full blur-2xl animate-float" />
      <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-purple-500/20 rounded-full blur-lg animate-spin-slow" />
      <div className="absolute top-1/3 right-1/3 w-24 h-24 bg-cyan-500/10 rounded-full blur-xl animate-bounce-gentle" />
      <div className="absolute bottom-1/3 left-1/5 w-12 h-12 bg-pink-500/15 rounded-full blur-md animate-pulse-slow" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-7xl mx-auto">
          {/* Split Layout: Content on Left, 3D Model on Right */}
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            
            {/* Left Column - Content */}
            <div className="text-center lg:text-left">
              {/* Enhanced Telegram Notice Banner */}
              <div className={`mb-8 transition-all duration-700 delay-100 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                <a
                  href="https://t.me/zwanski_tech"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-600/20 to-blue-500/20 border border-blue-500/30 rounded-2xl text-blue-300 hover:text-blue-200 hover:from-blue-600/30 hover:to-blue-500/30 transition-all duration-300 backdrop-blur-sm group shadow-elevation-2 hover:shadow-elevation-3"
                  aria-label={t("hero.telegramNotice")}
                >
                  <MessageSquare className="h-5 w-5 group-hover:scale-110 transition-transform" aria-hidden="true" />
                  <span className="font-medium">{t("hero.telegramNotice")}</span>
                  <Sparkles className="h-4 w-4 text-blue-400 animate-pulse-slow" aria-hidden="true" />
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
                </a>
              </div>

              {/* Enhanced Main Headlines with Staggered Animation */}
              <div className={`mb-12 transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-8 bg-gradient-to-r from-blue-300 via-emerald-300 to-blue-400 bg-clip-text text-transparent leading-tight will-change-transform">
                  {t("hero.headline")}
                </h1>
                <h2 className="text-2xl md:text-3xl text-emerald-300 mb-8 font-serif font-semibold tracking-wide">
                  {t("hero.subheadline")}
                </h2>
              </div>

              {/* Enhanced Description */}
              <div className={`mb-16 transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                <p className="text-lg text-slate-300 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                  {t("hero.description")}
                </p>
              </div>

              {/* Enhanced CTA Buttons with Micro-Interactions */}
              <div className={`flex flex-col sm:flex-row gap-6 justify-center lg:justify-start mb-12 transition-all duration-1000 delay-400 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                <Link to="/services" aria-label={t("hero.cta1")}>
                  <Button size="lg" className="group h-16 px-10 text-xl bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 shadow-elevation-3 hover:shadow-elevation-4 transition-all duration-300 transform hover:scale-105 will-change-transform">
                    {t("hero.cta1")}
                    <ArrowRight className="ml-3 h-6 w-6 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                  </Button>
                </Link>
                <Link to="/infrastructure" aria-label="View Our Infrastructure">
                  <Button variant="outline" size="lg" className="group h-16 px-10 text-xl border-2 border-emerald-500 text-emerald-400 hover:bg-emerald-500/10 shadow-elevation-3 hover:shadow-elevation-4 transition-all duration-300 transform hover:scale-105 backdrop-blur-sm will-change-transform">
                    <Play className="mr-3 h-6 w-6 transition-transform group-hover:scale-110" aria-hidden="true" />
                    View Infrastructure
                  </Button>
                </Link>
              </div>

              {/* Enhanced Trust Indicators */}
              <div className={`transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                <div className="flex flex-wrap justify-center lg:justify-start items-center gap-8 text-slate-400">
                  {features.map((feature, index) => (
                    <div key={index} className="flex items-center gap-3 group">
                      <feature.icon className={`h-5 w-5 ${feature.color} group-hover:scale-110 transition-transform`} aria-hidden="true" />
                      <span className="text-sm font-medium group-hover:text-slate-300 transition-colors">{feature.text}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column - Interactive 3D Laptop */}
            <div className={`relative h-[500px] lg:h-[600px] transition-all duration-1000 delay-600 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-transparent to-emerald-500/10 rounded-3xl backdrop-blur-sm border border-white/10" />
              
              <Suspense fallback={
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-400"></div>
                </div>
              }>
                <LaptopCanvas />
              </Suspense>
              
              {/* Interaction Hint */}
              <div className="absolute bottom-4 left-4 right-4 text-center">
                <p className="text-sm text-slate-400 bg-slate-900/80 backdrop-blur-sm rounded-lg px-4 py-2 border border-slate-700/50">
                  🖱️ Click to open • 🔄 Drag to rotate • 📱 Interactive laptop
                </p>
              </div>
            </div>
          </div>

          {/* Enhanced Animated Stats Grid - Full Width Below */}
          <div className={`grid grid-cols-2 md:grid-cols-4 gap-8 max-w-6xl mx-auto mt-20 transition-all duration-1000 delay-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            {stats.map((stat, index) => (
              <div 
                key={index} 
                className="relative group p-8 rounded-3xl bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-lg border border-slate-700/50 hover:border-emerald-500/50 transition-all duration-500 hover:scale-105 shadow-elevation-2 hover:shadow-elevation-4 will-change-transform"
                style={{
                  transitionDelay: `${index * 100}ms`
                }}
                role="group"
                aria-label={`${stat.label}: ${index === 0 ? `${stat.value}+` :
                   index === 1 ? `${stat.value}%` :
                   index === 2 ? `${stat.value}+` :
                   `${stat.value}%`}`}
              >
                {/* Gradient border effect */}
                <div className={`absolute inset-0 rounded-3xl bg-gradient-to-r ${stat.color} opacity-0 group-hover:opacity-20 transition-opacity duration-500 blur-sm`} />
                
                {/* Icon */}
                <div className="mb-6 flex justify-center relative z-10">
                  <div className={`p-4 rounded-2xl bg-gradient-to-br ${stat.color} bg-opacity-20 group-hover:bg-opacity-30 transition-all duration-300 backdrop-blur-sm`}>
                    <stat.icon className={`h-8 w-8 bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`} aria-hidden="true" />
                  </div>
                </div>
                
                {/* Animated Number */}
                <div className="text-5xl font-bold text-white mb-3 font-mono tabular-nums relative z-10" aria-live="polite">
                  {index === 0 ? `${stat.value}+` :
                   index === 1 ? `${stat.value}%` :
                   index === 2 ? `${stat.value}+` :
                   `${stat.value}%`}
                </div>
                
                {/* Label */}
                <div className="text-sm text-slate-300 font-medium leading-tight relative z-10">
                  {stat.label}
                </div>
                
                {/* Hover glow effect */}
                <div className={`absolute inset-0 rounded-3xl bg-gradient-to-r ${stat.color} opacity-0 group-hover:opacity-5 transition-all duration-500`} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
