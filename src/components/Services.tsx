
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import ServiceHero from "./services/ServiceHero";
import ServiceStats from "./services/ServiceStats";
import ServiceCardComponent from "./services/ServiceCardComponent";
import AdScript from "./ads/AdScript";
import { getServicesData } from "@/utils/serviceData";

const Services = () => {
  const { language, t } = useLanguage();
  const currentServices = getServicesData(language);

  return (
    <section className="py-20 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="container mx-auto px-4">
        <ServiceHero />
        
        {/* Strategic Ad Placement - After Hero */}
        <AdScript id="ad-services-hero" className="mb-12 bg-slate-800/30 rounded-xl border border-slate-700/50" />
        
        <ServiceStats />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {currentServices.map((service, index) => (
            <ServiceCardComponent key={index} service={service} index={index} />
          ))}
        </div>

        {/* Strategic Ad Placement - Between Services and CTA */}
        <AdScript id="ad-services-bottom" className="mt-12 mb-8 bg-orange-500/5 rounded-xl border border-orange-500/20" />

        <div className="text-center mt-16 animate-on-scroll">
          <Button size="lg" className="h-14 px-8 bg-orange-500 hover:bg-orange-600 text-white">
            {t("services.getStartedToday")}
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Services;
