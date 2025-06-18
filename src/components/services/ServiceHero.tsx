
import { useLanguage } from "@/context/LanguageContext";
import { Code, Shield, Wrench, Globe, Zap, Users, Star, Trophy } from "lucide-react";

const ServiceHero = () => {
  const { t } = useLanguage();

  const trustIndicators = [
    { icon: Star, label: `5+ ${t("services.stats.yearsExperience")}`, color: 'text-yellow-400' },
    { icon: Wrench, label: `300+ ${t("services.stats.devicesRepaired")}`, color: 'text-orange-400' },
    { icon: Shield, label: `65% ${t("services.stats.securityImprovement")}`, color: 'text-emerald-400' },
    { icon: Globe, label: t("services.stats.trustedByGlobalClients"), color: 'text-blue-400' }
  ];

  return (
    <div className="text-center mb-20 animate-on-scroll">
      <div className="mb-12">
        <h2 className="text-5xl md:text-6xl font-bold mb-8 bg-gradient-to-r from-orange-400 via-red-400 to-orange-400 bg-clip-text text-transparent">
          {t("services.heroTitle")}
        </h2>
        <p className="text-2xl text-slate-300 max-w-5xl mx-auto mb-12 leading-relaxed">
          {t("services.heroSubtitle")}
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
