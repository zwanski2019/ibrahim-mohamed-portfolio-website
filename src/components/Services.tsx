
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
      description: "Consistently rated by clients"
    },
    { 
      icon: Award, 
      title: "Industry Recognition", 
      description: "Certified IT professionals"
    },
    { 
      icon: Zap, 
      title: "Fast Delivery", 
      description: "24-48 hour turnaround"
    },
    { 
      icon: Shield, 
      title: "Secure Solutions", 
      description: "Enterprise-grade security"
    }
  ];

  return (
    <section className="axeptio-section">
      <div className="axeptio-container">
        <div className="text-center mb-16">
          <h2 className="axeptio-heading mb-6">
            Our <span className="text-primary">Services</span>
          </h2>
          <p className="axeptio-subheading max-w-3xl mx-auto">
            Professional IT solutions designed to help your business thrive in the digital age. 
            From development to security, we've got you covered.
          </p>
        </div>
        
        {/* Achievement Stats */}
        <div className="axeptio-grid-4 mb-16">
          {achievements.map((achievement, index) => (
            <div key={index} className="axeptio-stat">
              <div className="axeptio-feature-icon mb-4">
                <achievement.icon className="h-6 w-6 text-primary" />
              </div>
              <h4 className="axeptio-feature-title">{achievement.title}</h4>
              <p className="axeptio-feature-description">{achievement.description}</p>
            </div>
          ))}
        </div>

        {/* Services Grid */}
        <div className="axeptio-grid-3 mb-16">
          {currentServices.map((service, index) => (
            <ServiceCardComponent key={index} service={service} index={index} />
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center axeptio-card p-12">
          <div className="max-w-2xl mx-auto mb-8">
            <h3 className="text-heading-2 mb-4">
              Ready to Transform Your Digital Future?
            </h3>
            <p className="axeptio-body mb-8">
              Join hundreds of satisfied clients who trust Zwanski Tech for their digital transformation needs.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="axeptio-button-primary" asChild>
              <Link to="/services">
                {t("services.getStartedToday")}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            
            <Button variant="outline" size="lg" className="axeptio-button-secondary">
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
