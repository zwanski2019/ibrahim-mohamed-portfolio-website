
import React, { useEffect, useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Play, Shield, Globe, Zap, Users, MessageSquare, Star, Sparkles, Monitor, Award, Clock } from "lucide-react";
import { Link } from "react-router-dom";
import { useLanguage } from "@/context/LanguageContext";
import heroImage from "@/assets/hero-it-services-optimized.webp";

const Hero = () => {
  const { t } = useLanguage();
  const [counters, setCounters] = useState({
    devices: 0,
    satisfaction: 0,
    experience: 0,
    security: 0
  });

  const [isVisible, setIsVisible] = useState(false);

  // Optimized counter animation with requestAnimationFrame to prevent forced reflows
  const animateCounters = useCallback(() => {
    const duration = 2000;
    const targetValues = { devices: 300, satisfaction: 98, experience: 5, security: 65 };
    const startTime = performance.now();

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Use easeOutQuart for smooth animation
      const ease = 1 - Math.pow(1 - progress, 3);
      
      // Batch DOM updates to prevent layout thrashing
      setCounters({
        devices: Math.floor(targetValues.devices * ease),
        satisfaction: Math.floor(targetValues.satisfaction * ease),
        experience: Math.floor(targetValues.experience * ease),
        security: Math.floor(targetValues.security * ease)
      });

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        // Set final values to ensure precision
        setCounters(targetValues);
      }
    };

    requestAnimationFrame(animate);
  }, []);

  useEffect(() => {
    // Use Intersection Observer for better performance
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !isVisible) {
          setIsVisible(true);
          // Delay animation start to prevent layout issues
          requestAnimationFrame(() => {
            setTimeout(animateCounters, 300);
          });
        }
      },
      { threshold: 0.1, rootMargin: '0px 0px -10% 0px' }
    );

    const heroElement = document.querySelector('.hero-container');
    if (heroElement) {
      observer.observe(heroElement);
    }

    return () => {
      observer.disconnect();
    };
  }, [animateCounters, isVisible]);

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
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background">
      {/* Clean background with subtle elements */}
      <div className="absolute inset-0">
        {/* Subtle gradient for depth */}
        <div className="absolute inset-0 bg-gradient-to-br from-muted/20 via-background to-muted/10" />
        
        {/* Minimal accent elements */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(255,193,7,0.03),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(15,20,25,0.02),transparent_60%)]" />
      </div>
      
      {/* Minimal floating elements */}
      <div className="absolute top-20 right-20 w-2 h-2 bg-primary/20 rounded-full" />
      <div className="absolute bottom-32 left-20 w-1 h-1 bg-foreground/10 rounded-full" />
      <div className="absolute top-1/3 right-1/4 w-1.5 h-1.5 bg-primary/15 rounded-full" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-7xl mx-auto">
          {/* Split Layout: Content on Left, 3D Model on Right */}
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            
            {/* Left Column - Content */}
            <div className="text-center lg:text-left">
              {/* Clean Telegram Notice Banner */}
              <div className={`mb-8 transition-all duration-500 delay-100 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                <a
                  href="https://t.me/zwanski_tech"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 px-6 py-3 bg-secondary border border-border rounded-lg text-foreground hover:bg-accent transition-all duration-200 group shadow-sm hover:shadow-md"
                  aria-label={t("hero.telegramNotice")}
                >
                  <MessageSquare className="h-4 w-4 group-hover:scale-105 transition-transform" aria-hidden="true" />
                  <span className="font-medium text-sm">{t("hero.telegramNotice")}</span>
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
                </a>
              </div>

              {/* Enhanced Value Proposition */}
              <div className={`mb-12 transition-all duration-500 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                {/* Value Proposition Tagline */}
                <div className="mb-6">
                  <div className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4">
                    <span className="bg-gradient-to-r from-emerald-500 to-green-500 bg-clip-text text-transparent">Fix.</span>{" "}
                    <span className="bg-gradient-to-r from-blue-500 to-cyan-500 bg-clip-text text-transparent">Build.</span>{" "}
                    <span className="bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent">Secure.</span>{" "}
                    <span className="bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">Teach.</span>
                  </div>
                </div>
                
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-foreground leading-tight">
                  Professional IT Services & Digital Education Platform in Tunisia
                </h1>
                <h2 className="text-xl md:text-2xl text-muted-foreground mb-8 font-medium">
                  From device repair to cybersecurity education — empowering your digital journey
                </h2>
              </div>

              {/* Clean Description */}
              <div className={`mb-12 transition-all duration-500 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                  {t("hero.description")}
                </p>
              </div>

              {/* Clean CTA Buttons */}
              <div className={`flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-12 transition-all duration-500 delay-400 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                <Link to="/services" aria-label={t("hero.cta1")}>
                  <Button size="lg" className="group px-8 py-3 text-base">
                    {t("hero.cta1")}
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                  </Button>
                </Link>
                <Link to="/infrastructure" aria-label="View Our Infrastructure">
                  <Button variant="outline" size="lg" className="group px-8 py-3 text-base">
                    <Play className="mr-2 h-4 w-4" aria-hidden="true" />
                    View Infrastructure
                  </Button>
                </Link>
              </div>

              {/* Clean Trust Indicators */}
              <div className={`transition-all duration-500 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                <div className="flex flex-wrap justify-center lg:justify-start items-center gap-6 text-muted-foreground">
                  {features.map((feature, index) => (
                    <div key={index} className="flex items-center gap-2 group">
                      <feature.icon className="h-4 w-4 text-primary" aria-hidden="true" />
                      <span className="text-sm font-medium">{feature.text}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column - Hero Image with Trust Signals */}
            <div className={`relative h-[500px] lg:h-[600px] transition-all duration-500 delay-600 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              <div className="absolute inset-0 bg-gradient-to-br from-secondary/30 to-secondary/10 rounded-2xl border border-border overflow-hidden">
                <img 
                  src={heroImage}
                  alt="Professional IT services in Tunisia - Computer repair, cybersecurity, web development"
                  className="w-full h-full object-cover"
                  loading="eager"
                  fetchPriority="high"
                  width="600"
                  height="500"
                  onError={() => {
                    // Silently handle image load errors
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
              </div>
              
              {/* Trust Signals Overlay */}
              <div className="absolute bottom-6 left-6 right-6">
                <div className="bg-background/95 backdrop-blur-sm rounded-xl p-4 border border-border shadow-lg">
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div className="flex flex-col items-center">
                      <Award className="h-5 w-5 text-yellow-500 mb-1" />
                      <span className="text-xs font-medium text-foreground">5-Star Rated</span>
                    </div>
                    <div className="flex flex-col items-center">
                      <Shield className="h-5 w-5 text-green-500 mb-1" />
                      <span className="text-xs font-medium text-foreground">Secure Solutions</span>
                    </div>
                    <div className="flex flex-col items-center">
                      <Clock className="h-5 w-5 text-blue-500 mb-1" />
                      <span className="text-xs font-medium text-foreground">24/7 Support</span>
                    </div>
                  </div>
                  <div className="mt-3 text-center">
                    <Link to="/computer-model">
                      <Button variant="outline" size="sm" className="text-xs">
                        <Monitor className="mr-1 h-3 w-3" />
                        View 3D Model
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Clean Stats Grid - Full Width Below */}
          <div className={`grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto mt-20 transition-all duration-500 delay-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            {stats.map((stat, index) => (
              <div 
                key={index} 
                className="relative group p-6 rounded-xl bg-card border border-border hover:border-primary/20 transition-all duration-200 hover:shadow-md"
                style={{
                  transitionDelay: `${index * 50}ms`
                }}
                role="group"
                aria-label={`${stat.label}: ${index === 0 ? `${stat.value}+` :
                   index === 1 ? `${stat.value}%` :
                   index === 2 ? `${stat.value}+` :
                   `${stat.value}%`}`}
              >
                {/* Icon */}
                <div className="mb-4 flex justify-center">
                  <div className="p-3 rounded-lg bg-secondary">
                    <stat.icon className="h-6 w-6 text-primary" aria-hidden="true" />
                  </div>
                </div>
                
                {/* Animated Number */}
                <div className="text-3xl font-bold text-foreground mb-2 font-mono tabular-nums text-center" aria-live="polite">
                  {index === 0 ? `${stat.value}+` :
                   index === 1 ? `${stat.value}%` :
                   index === 2 ? `${stat.value}+` :
                   `${stat.value}%`}
                </div>
                
                {/* Label */}
                <div className="text-sm text-muted-foreground font-medium leading-tight text-center">
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

const MemoizedHero = React.memo(Hero);
MemoizedHero.displayName = 'Hero';

export default MemoizedHero;
