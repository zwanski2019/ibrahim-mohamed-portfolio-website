
import { Button } from "@/components/ui/button";
import { ArrowRight, Star, Award, Zap, Shield } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { Link } from "react-router-dom";
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
      color: "from-yellow-400 to-orange-400"
    },
    { 
      icon: Award, 
      title: "Industry Recognition", 
      description: "Certified IT professionals",
      color: "from-purple-400 to-pink-400"
    },
    { 
      icon: Zap, 
      title: "Fast Delivery", 
      description: "24-48 hour turnaround",
      color: "from-emerald-400 to-cyan-400"
    },
    { 
      icon: Shield, 
      title: "Secure Solutions", 
      description: "Enterprise-grade security",
      color: "from-blue-400 to-indigo-400"
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-slate-900 via-purple-900/20 to-slate-900 relative overflow-hidden">
      {/* Enhanced Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(147,51,234,0.15),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(59,130,246,0.08),transparent_60%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:60px_60px]" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <ServiceHero />
        
        {/* Achievement Badges */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12 max-w-5xl mx-auto">
          {achievements.map((achievement, index) => (
            <div 
              key={index}
              className="group p-6 rounded-2xl glass-card border border-purple-500/30 hover:border-purple-400/50 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/25"
            >
              <div className="mb-4 flex justify-center">
                <div className={`p-3 rounded-xl bg-gradient-to-r ${achievement.color} bg-opacity-20 group-hover:bg-opacity-30 transition-all duration-300`}>
                  <achievement.icon className={`h-6 w-6 text-white`} />
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
        <div className="text-center animate-on-scroll glass-card rounded-3xl p-12 border border-purple-500/30">
          <div className="max-w-2xl mx-auto mb-8">
            <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Ready to Transform Your <span className="bg-gradient-to-r from-purple-400 via-blue-400 to-indigo-400 bg-clip-text text-transparent">Digital Future?</span>
            </h3>
            <p className="text-lg text-slate-300 mb-8">
              Join hundreds of satisfied clients who trust Zwanski Tech for their digital transformation needs.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="h-14 px-8 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white shadow-2xl shadow-purple-500/25 hover:shadow-purple-500/40 transition-all duration-300 transform hover:scale-105" asChild>
              <Link to="/services">
                {t("services.getStartedToday")}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            
            <Button variant="outline" size="lg" className="h-14 px-8 border-2 border-purple-500/50 text-purple-400 hover:bg-purple-500/10 shadow-xl hover:shadow-2xl transition-all duration-300 backdrop-blur-sm">
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
