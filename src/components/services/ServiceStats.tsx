
import { useLanguage } from "@/context/LanguageContext";

const ServiceStats = () => {
  const { t } = useLanguage();

  const stats = [
    { number: "300+", label: t("services.stats.devicesRepaired") },
    { number: "24/7", label: t("services.stats.expertSupport") },
    { number: "65%", label: t("services.stats.securityImprovement") },
    { number: "100%", label: t("services.stats.moneyBackGuarantee") }
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
      {stats.map((stat, index) => (
        <div key={index} className="text-center">
          <div className="text-3xl md:text-4xl font-bold craft-text-gradient mb-2">
            {stat.number}
          </div>
          <div className="text-craft-gray-600 font-medium">
            {stat.label}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ServiceStats;
