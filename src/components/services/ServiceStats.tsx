
import { useLanguage } from "@/context/LanguageContext";

const ServiceStats = () => {
  const { t } = useLanguage();

  return (
    <div className="flex flex-wrap justify-center gap-6 mb-12">
      <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-xl p-6 text-center">
        <div className="text-3xl font-bold text-orange-400 mb-2">300+</div>
        <div className="text-slate-300">{t("services.stats.devicesRepaired")}</div>
      </div>
      <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-xl p-6 text-center">
        <div className="text-3xl font-bold text-orange-400 mb-2">24/7</div>
        <div className="text-slate-300">{t("services.stats.expertSupport")}</div>
      </div>
      <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-xl p-6 text-center">
        <div className="text-3xl font-bold text-orange-400 mb-2">65%</div>
        <div className="text-slate-300">{t("services.stats.securityImprovement")}</div>
      </div>
      <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-xl p-6 text-center">
        <div className="text-3xl font-bold text-orange-400 mb-2">100%</div>
        <div className="text-slate-300">{t("services.stats.moneyBackGuarantee")}</div>
      </div>
    </div>
  );
};

export default ServiceStats;
