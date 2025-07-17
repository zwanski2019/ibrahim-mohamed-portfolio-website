
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ServiceCard from "@/components/ServiceCard";
import ServiceRequestForm from "@/components/ServiceRequestForm";
import { useLanguage } from "@/context/LanguageContext";

const Services = () => {
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const { t } = useLanguage();
  
  const allServices = [
    {
      id: "web-development",
      title: t("services.categories.webDevelopment"),
      description: t("services.categories.webDevelopmentDesc"),
      price: `${t("services.pricing.from")} $500`,
      icon: "Monitor" as const,
      category: "development"
    },
    {
      id: "it-support",
      title: t("services.categories.itSupport"),
      description: t("services.categories.itSupportDesc"),
      price: `$50${t("services.pricing.perHour")}`,
      icon: "LifeBuoy" as const,
      category: "support"
    },
    {
      id: "wordpress",
      title: t("services.categories.wordpress"),
      description: t("services.categories.wordpressDesc"),
      price: `${t("services.pricing.from")} $300`,
      icon: "Layout" as const,
      category: "development"
    },
    {
      id: "seo",
      title: t("services.categories.seo"),
      description: t("services.categories.seoDesc"),
      price: `${t("services.pricing.from")} $200`,
      icon: "Search" as const,
      category: "marketing"
    },
    {
      id: "system-security",
      title: t("services.categories.systemSecurity"),
      description: t("services.categories.systemSecurityDesc"),
      price: `${t("services.pricing.from")} $400`,
      icon: "Shield" as const,
      category: "security"
    },
    {
      id: "custom-tools",
      title: t("services.categories.customTools"),
      description: t("services.categories.customToolsDesc"),
      price: `${t("services.pricing.from")} $300`,
      icon: "Code" as const,
      category: "development"
    }
  ];

  const categories = [
    { id: "all", name: t("services.allServices"), count: allServices.length },
    { id: "development", name: t("services.development"), count: allServices.filter(s => s.category === "development").length },
    { id: "support", name: t("services.support"), count: allServices.filter(s => s.category === "support").length },
    { id: "security", name: t("services.security"), count: allServices.filter(s => s.category === "security").length },
    { id: "marketing", name: t("services.marketing"), count: allServices.filter(s => s.category === "marketing").length }
  ];

  const [activeCategory, setActiveCategory] = useState("all");
  const filteredServices = activeCategory === "all" 
    ? allServices 
    : allServices.filter(service => service.category === activeCategory);
  
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-grow">
        {/* Services Section */}
        <section className="axeptio-section">
          <div className="axeptio-container">
            <div className="text-center mb-8 lg:mb-12">
              <h2 className="axeptio-heading text-2xl sm:text-3xl md:text-4xl lg:text-5xl mb-4 sm:mb-6">
                {t("services.ourServices").split(" ")[0]} <span className="text-primary">{t("services.ourServices").split(" ").slice(1).join(" ")}</span>
              </h2>
              <p className="axeptio-subheading text-sm sm:text-base md:text-lg lg:text-xl max-w-3xl mx-auto">
                {t("services.ourServicesSubtitle")}
              </p>
            </div>

            {/* Category Filter */}
            <div className="mb-8 lg:mb-12">
              <div className="flex flex-wrap justify-center gap-2 sm:gap-3 lg:gap-4">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setActiveCategory(category.id)}
                    className={`px-3 sm:px-4 lg:px-6 py-2 sm:py-2.5 lg:py-3 rounded-full font-medium transition-all duration-300 text-xs sm:text-sm lg:text-base min-h-[40px] sm:min-h-[44px] lg:min-h-[48px] ${
                      activeCategory === category.id
                        ? 'axeptio-button-primary'
                        : 'axeptio-button-secondary'
                    }`}
                  >
                    <span className="whitespace-nowrap">
                      {category.name} ({category.count})
                    </span>
                  </button>
                ))}
              </div>
            </div>
            
            {/* Services Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 mb-8 lg:mb-12">
              {filteredServices.map((service) => (
                <div key={service.id} className="w-full">
                  <ServiceCard 
                    id={service.id}
                    title={service.title}
                    description={service.description}
                    price={service.price}
                    icon={service.icon}
                    onSelect={() => setSelectedService(service.title)}
                  />
                </div>
              ))}
            </div>
            
            {/* Service Request Form */}
            <div className="max-w-4xl mx-auto">
              <ServiceRequestForm selectedService={selectedService} />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Services;
