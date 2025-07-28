
import { Button } from "@/components/ui/button";
import { ArrowRight, Star, Award, Zap, Shield, X, MessageCircle, Phone, Clock, CheckCircle } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { Link } from "react-router-dom";
import ServiceHero from "./services/ServiceHero";
import ServiceStats from "./services/ServiceStats";
import ServiceCardComponent from "./services/ServiceCardComponent";
import { getServicesData } from "@/utils/serviceData";
import { useState } from "react";

const Services = () => {
  const { language, t } = useLanguage();
  const currentServices = getServicesData(language);
  const [selectedService, setSelectedService] = useState(null);

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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-12 sm:mb-16">
          {achievements.map((achievement, index) => (
            <div key={index} className="axeptio-stat p-4 sm:p-6">
              <div className="axeptio-feature-icon mb-3 sm:mb-4 w-10 h-10 sm:w-12 sm:h-12">
                <achievement.icon className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
              </div>
              <h4 className="axeptio-feature-title text-sm sm:text-lg">{achievement.title}</h4>
              <p className="axeptio-feature-description text-xs sm:text-sm">{achievement.description}</p>
            </div>
          ))}
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 mb-12 sm:mb-16">
          {currentServices.map((service, index) => (
            <div
              key={index}
              onClick={() => setSelectedService(service)}
              className="group cursor-pointer transform transition-all duration-300 hover:scale-105 active:scale-95"
            >
              <div className="bg-card rounded-xl p-4 sm:p-6 border border-border hover:border-primary/30 hover:shadow-xl h-full">
                <div className="relative overflow-hidden mb-3 sm:mb-4">
                  <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-gradient-to-r ${service.color} flex items-center justify-center mb-3 sm:mb-4`}>
                    <service.icon className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
                  </div>
                  {service.badge && (
                    <span className="absolute top-0 right-0 bg-primary text-primary-foreground text-xs px-2 py-1 rounded-full">
                      {service.badge}
                    </span>
                  )}
                </div>
                
                <h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3 group-hover:text-primary transition-colors">
                  {service.title}
                </h3>
                
                <p className="text-muted-foreground mb-3 sm:mb-4 line-clamp-2 text-sm sm:text-base">
                  {service.description}
                </p>
                
                <div className="flex flex-wrap gap-1 sm:gap-2 mb-3 sm:mb-4">
                  {service.features.slice(0, 2).map((feature, featureIndex) => (
                    <span
                      key={featureIndex}
                      className="text-xs bg-secondary text-secondary-foreground px-2 py-1 rounded-full"
                    >
                      {feature}
                    </span>
                  ))}
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-xs sm:text-sm text-primary font-medium">Learn More</span>
                  <ArrowRight className="h-3 w-3 sm:h-4 sm:w-4 text-primary group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Service Detail Modal */}
        {selectedService && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-2 sm:p-4">
            <div className="bg-background rounded-xl max-w-4xl w-full max-h-[95vh] sm:max-h-[90vh] overflow-y-auto shadow-2xl animate-scale-in">
              <div className="relative">
                {/* Header */}
                <div className={`bg-gradient-to-r ${selectedService.color} p-4 sm:p-6 text-white rounded-t-xl`}>
                  <button
                    onClick={() => setSelectedService(null)}
                    className="absolute top-2 right-2 sm:top-4 sm:right-4 text-white hover:bg-white/20 rounded-full p-2 transition-colors z-10"
                  >
                    <X className="h-4 w-4 sm:h-5 sm:w-5" />
                  </button>
                  
                  <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 mb-3 sm:mb-4">
                    <div className="w-12 h-12 sm:w-16 sm:h-16 bg-white/20 rounded-lg flex items-center justify-center">
                      <selectedService.icon className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
                    </div>
                    <div className="text-center sm:text-left">
                      <h2 className="text-xl sm:text-2xl font-bold">{selectedService.title}</h2>
                      {selectedService.badge && (
                        <span className="bg-white/20 text-white text-xs sm:text-sm px-2 sm:px-3 py-1 rounded-full inline-block mt-1">
                          {selectedService.badge}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-4 sm:p-6">
                  <p className="text-muted-foreground text-base sm:text-lg mb-4 sm:mb-6 leading-relaxed">
                    {selectedService.description}
                  </p>

                  {/* Features */}
                  <div className="mb-4 sm:mb-6">
                    <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4 flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5 text-green-500" />
                      What's Included
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 sm:gap-3">
                      {selectedService.features.map((feature, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-primary rounded-full flex-shrink-0" />
                          <span className="text-xs sm:text-sm">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Service Details */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 mb-4 sm:mb-6 p-3 sm:p-4 bg-secondary/50 rounded-lg">
                    <div className="text-center">
                      <Clock className="h-4 w-4 sm:h-5 sm:w-5 text-primary mx-auto mb-1 sm:mb-2" />
                      <div className="text-xs sm:text-sm font-medium">Quick Response</div>
                      <div className="text-xs text-muted-foreground">24-48 hours</div>
                    </div>
                    <div className="text-center">
                      <Star className="h-4 w-4 sm:h-5 sm:w-5 text-primary mx-auto mb-1 sm:mb-2" />
                      <div className="text-xs sm:text-sm font-medium">Quality Assured</div>
                      <div className="text-xs text-muted-foreground">100% Guaranteed</div>
                    </div>
                    <div className="text-center">
                      <Phone className="h-4 w-4 sm:h-5 sm:w-5 text-primary mx-auto mb-1 sm:mb-2" />
                      <div className="text-xs sm:text-sm font-medium">Support</div>
                      <div className="text-xs text-muted-foreground">24/7 Available</div>
                    </div>
                  </div>

                  {/* Call to Action */}
                  <div className="text-center">
                    <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4">Ready to get started?</h3>
                    <p className="text-muted-foreground mb-4 sm:mb-6 text-sm sm:text-base">
                      Contact us on WhatsApp for a free consultation and quote.
                    </p>
                    
                    <a
                      href={`https://wa.me/21694934141?text=Hi! I'm interested in your ${selectedService.title} service. Can you provide more details?`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-medium transition-colors text-sm sm:text-base"
                    >
                      <MessageCircle className="h-4 w-4 sm:h-5 sm:w-5" />
                      Chat on WhatsApp
                    </a>
                    
                    <div className="mt-3 sm:mt-4 text-xs sm:text-sm text-muted-foreground">
                      Or call us at: <span className="font-medium">+216 94 934 141</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* CTA Section */}
        <div className="text-center axeptio-card p-6 sm:p-8 lg:p-12">
          <div className="max-w-2xl mx-auto mb-6 sm:mb-8">
            <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-3 sm:mb-4">
              Ready to Transform Your Digital Future?
            </h3>
            <p className="axeptio-body mb-6 sm:mb-8 text-sm sm:text-base">
              Join hundreds of satisfied clients who trust Zwanski Tech for their digital transformation needs.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
            <Button size="lg" className="axeptio-button-primary text-sm sm:text-base" asChild>
              <Link to="/services">
                {t("services.getStartedToday")}
                <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
              </Link>
            </Button>
            
            <Button variant="outline" size="lg" className="axeptio-button-secondary text-sm sm:text-base">
              View Portfolio
              <Star className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
