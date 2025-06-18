
import { Button } from "@/components/ui/button";
import { ArrowRight, Star, Award, Zap, Shield } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import ServiceHero from "./services/ServiceHero";
import ServiceStats from "./services/ServiceStats";
import ServiceCardComponent from "./services/ServiceCardComponent";
import { getServicesData } from "@/utils/serviceData";

const Services = () => {
  const { language, t } = useLanguage();
  const currentServices = getServicesData(language);

  const achievements = [
    { 
      icon: Star, 
      title: "5-Star Rating", 
      description: "Consistently rated by clients",
      color: "from-blue-400 to-cyan-400"
    },
    { 
      icon: Award, 
      title: "Industry Recognition", 
      description: "Certified IT professionals",
      color: "from-emerald-400 to-blue-400"
    },
    { 
      icon: Zap, 
      title: "Fast Delivery", 
      description: "24-48 hour turnaround",
      color: "from-purple-400 to-indigo-400"
    },
    { 
      icon: Shield, 
      title: "Secure Solutions", 
      description: "Enterprise-grade security",
      color: "from-blue-400 to-emerald-400"
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden">
      {/* Enhanced Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,rgba(59,130,246,0.1),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(34,197,94,0.1),transparent_50%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:60px_60px]" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <ServiceHero />
        
        {/* Achievement Badges */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12 max-w-5xl mx-auto">
          {achievements.map((achievement, index) => (
            <div 
              key={index}
              className="group p-6 rounded-2xl bg-gradient-to-br from-slate-800/60 to-slate-900/60 backdrop-blur-sm border border-slate-700/50 hover:border-blue-500/30 transition-all duration-500 hover:scale-105 hover:shadow-elevation-3"
            >
              <div className="mb-4 flex justify-center">
                <div className={`p-3 rounded-xl bg-gradient-to-r ${achievement.color} bg-opacity-20 group-hover:bg-opacity-30 transition-all duration-300`}>
                  <achievement.icon className={`h-6 w-6 bg-gradient-to-r ${achievement.color} bg-clip-text text-transparent`} />
                </div>
              </div>
              <h4 className="text-white font-semibold text-sm mb-2 text-center">{achievement.title}</h4>
              <p className="text-slate-400 text-xs text-center leading-relaxed">{achievement.description}</p>
            </div>
          ))}
        </div>

        <ServiceStats />

        {/* Enhanced Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mb-16">
          {currentServices.map((service, index) => (
            <ServiceCardComponent key={index} service={service} index={index} />
          ))}
        </div>

        {/* Enhanced CTA Section */}
        <div className="text-center animate-on-scroll bg-gradient-to-r from-slate-800/50 to-slate-900/50 backdrop-blur-sm rounded-3xl p-12 border border-slate-700/50">
          <div className="max-w-2xl mx-auto mb-8">
            <h3 className="text-heading-2 font-display text-white mb-4">
              Ready to Transform Your Digital Future?
            </h3>
            <p className="text-body-large text-slate-300 mb-8">
              Join hundreds of satisfied clients who trust Zwanski Tech for their digital transformation needs.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="h-14 px-8 bg-gradient-to-r from-blue-600 to-emerald-600 hover:from-blue-700 hover:to-emerald-700 text-white shadow-elevation-3 hover:shadow-elevation-4 transition-all duration-300 transform hover:scale-105">
              {t("services.getStartedToday")}
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            
            <Button variant="outline" size="lg" className="h-14 px-8 border-2 border-blue-500/50 text-blue-400 hover:bg-blue-500/10 shadow-elevation-2 hover:shadow-elevation-3 transition-all duration-300 backdrop-blur-sm">
              View Portfolio
              <Star className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
