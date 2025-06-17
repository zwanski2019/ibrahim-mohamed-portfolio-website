
import { useLanguage } from "@/context/LanguageContext";
import { Code, Shield, Wrench, Globe, Zap, Users, Star, Trophy } from "lucide-react";

const ServiceHero = () => {
  const { t } = useLanguage();

  const trustIndicators = [
    { icon: Star, label: `5+ ${t("services.stats.yearsExperience")}`, color: 'text-craft-mint' },
    { icon: Wrench, label: `300+ ${t("services.stats.devicesRepaired")}`, color: 'text-craft-blue' },
    { icon: Shield, label: `65% ${t("services.stats.securityImprovement")}`, color: 'text-craft-mint' },
    { icon: Globe, label: t("services.stats.trustedByGlobalClients"), color: 'text-craft-blue' }
  ];

  return (
    <div className="text-center mb-20 craft-fade-in">
      <div className="mb-12">
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-craft-gray-900 mb-6">
          Professional <span className="craft-text-gradient">Services</span>
        </h2>
        <p className="text-xl text-craft-gray-600 max-w-4xl mx-auto leading-relaxed">
          {t("services.heroSubtitle")}
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
        {trustIndicators.map((indicator, index) => (
          <div 
            key={index}
            className="craft-card p-6 text-center hover-lift group"
          >
            <div className="mb-4 flex justify-center">
              <div className="p-3 rounded-xl bg-craft-gradient">
                <indicator.icon className={`h-6 w-6 ${indicator.color}`} />
              </div>
            </div>
            <div className="text-craft-gray-900 font-semibold text-sm md:text-base leading-tight">
              {indicator.label}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ServiceHero;
