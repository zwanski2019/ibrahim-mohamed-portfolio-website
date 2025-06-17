
import { useLanguage } from "@/context/LanguageContext";
import { Code, Shield, Wrench, Globe, Zap, Users, Star, Trophy } from "lucide-react";

const ServiceHero = () => {
  const { language } = useLanguage();

  const trustIndicators = [
    { icon: Star, label: language === 'en' ? '5+ Years of Experience' : language === 'fr' ? '5+ Années d\'Expérience' : '5+ سنوات خبرة', color: 'text-yellow-400' },
    { icon: Wrench, label: language === 'en' ? '300+ Devices Repaired' : language === 'fr' ? '300+ Appareils Réparés' : '300+ جهاز تم إصلاحه', color: 'text-orange-400' },
    { icon: Shield, label: language === 'en' ? '65% Security Improvement' : language === 'fr' ? '65% Amélioration Sécurité' : '65% تحسين الأمان', color: 'text-emerald-400' },
    { icon: Globe, label: language === 'en' ? 'Trusted by Global Clients' : language === 'fr' ? 'Apprécié par des Clients Mondiaux' : 'موثوق من قبل عملاء عالميين', color: 'text-blue-400' }
  ];

  return (
    <div className="text-center mb-20 animate-on-scroll">
      <div className="mb-12">
        <h2 className="text-5xl md:text-6xl font-bold mb-8 bg-gradient-to-r from-orange-400 via-red-400 to-orange-400 bg-clip-text text-transparent">
          {language === 'en' ? 'Professional IT Services' : language === 'fr' ? 'Services IT Professionnels' : 'الخدمات التقنية المهنية'}
        </h2>
        <p className="text-2xl text-slate-300 max-w-5xl mx-auto mb-12 leading-relaxed">
          {language === 'en' 
            ? 'Comprehensive IT solutions from web development to advanced device repair and cybersecurity. Your trusted partner for all technical needs.'
            : language === 'fr'
            ? 'Solutions IT complètes du développement web à la réparation avancée d\'appareils et à la cybersécurité. Votre partenaire de confiance pour tous vos besoins techniques.'
            : 'حلول تقنية شاملة من تطوير الويب إلى الإصلاح المتقدم للأجهزة والأمن السيبراني. شريكك الموثوق لجميع احتياجاتك التقنية.'
          }
        </p>
      </div>

      {/* Enhanced Trust Indicators */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
        {trustIndicators.map((indicator, index) => (
          <div 
            key={index}
            className="group p-6 rounded-2xl bg-gradient-to-br from-slate-800/60 to-slate-900/60 backdrop-blur-sm border border-slate-700/50 hover:border-orange-500/50 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-orange-500/20"
          >
            <div className="mb-4 flex justify-center">
              <div className="p-3 rounded-full bg-gradient-to-br from-orange-500/20 to-red-500/20 group-hover:from-orange-500/30 group-hover:to-red-500/30 transition-all duration-300">
                <indicator.icon className={`h-8 w-8 ${indicator.color}`} />
              </div>
            </div>
            <div className="text-slate-300 font-semibold text-sm md:text-base leading-tight">
              {indicator.label}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ServiceHero;
