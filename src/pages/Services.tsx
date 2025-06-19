
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ServiceCard from "@/components/ServiceCard";
import ServiceRequestForm from "@/components/ServiceRequestForm";
import IMEIChecker from "@/components/IMEIChecker";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Smartphone, Info } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

const Services = () => {
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const { t } = useLanguage();
  
  const allServices = [
    {
      id: "web-development",
      title: t("services.categories.webDevelopment"),
      description: t("services.categories.webDevelopmentDesc"),
      price: `${t("services.pricing.from")} 300 TND`,
      icon: "Monitor" as const,
      category: "development"
    },
    {
      id: "it-support",
      title: t("services.categories.itSupport"),
      description: t("services.categories.itSupportDesc"),
      price: `25 TND${t("services.pricing.perHour")}`,
      icon: "LifeBuoy" as const,
      category: "support"
    },
    {
      id: "wordpress",
      title: t("services.categories.wordpress"),
      description: t("services.categories.wordpressDesc"),
      price: `${t("services.pricing.from")} 200 TND`,
      icon: "Layout" as const,
      category: "development"
    },
    {
      id: "seo",
      title: t("services.categories.seo"),
      description: t("services.categories.seoDesc"),
      price: `${t("services.pricing.from")} 150 TND`,
      icon: "Search" as const,
      category: "marketing"
    },
    {
      id: "system-security",
      title: t("services.categories.systemSecurity"),
      description: t("services.categories.systemSecurityDesc"),
      price: `${t("services.pricing.from")} 400 TND`,
      icon: "Shield" as const,
      category: "security"
    },
    {
      id: "custom-tools",
      title: t("services.categories.customTools"),
      description: t("services.categories.customToolsDesc"),
      price: `${t("services.pricing.from")} 250 TND`,
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
    <div className="flex flex-col min-h-screen overflow-x-hidden">
      <Navbar />
      
      <main className="flex-grow">
        {/* Featured Free Tool Section */}
        <section className="py-6 sm:py-8 md:py-12 lg:py-16 bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-950/20 dark:to-blue-950/20 overflow-hidden">
          <div className="w-full max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
            <div className="text-center mb-4 sm:mb-6 md:mb-8 lg:mb-12">
              <div className="flex items-center justify-center gap-1.5 sm:gap-2 mb-2 sm:mb-3 md:mb-4">
                <Smartphone className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 lg:h-8 lg:w-8 text-green-600 flex-shrink-0" />
                <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold leading-tight">
                  {t("nav.freeImeiCheck").split(" ")[0]} <span className="text-green-600">{t("nav.freeImeiCheck").split(" ").slice(1).join(" ")}</span>
                </h2>
              </div>
              <p className="text-xs sm:text-sm md:text-base lg:text-lg text-muted-foreground max-w-2xl mx-auto px-2 sm:px-4">
                {t("imei.description")}
              </p>
            </div>
            
            <div className="w-full">
              <IMEIChecker />
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section className="py-8 sm:py-12 md:py-16 lg:py-20 bg-gradient-to-b from-background to-muted/20 overflow-hidden">
          <div className="w-full max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
            <div className="text-center mb-6 sm:mb-8 md:mb-12 lg:mb-16">
              <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold mb-2 sm:mb-3 md:mb-4 leading-tight">
                {t("services.ourServices").split(" ")[0]} <span className="text-gradient">{t("services.ourServices").split(" ").slice(1).join(" ")}</span>
              </h2>
              <p className="text-sm sm:text-base md:text-lg lg:text-xl text-muted-foreground max-w-3xl mx-auto px-2 sm:px-4 leading-relaxed">
                {t("services.ourServicesSubtitle")}
              </p>
            </div>

            {/* Category Filter */}
            <div className="mb-4 sm:mb-6 md:mb-8 lg:mb-12">
              <div className="flex flex-wrap justify-center gap-1.5 sm:gap-2 md:gap-3 lg:gap-4 px-2 sm:px-4">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setActiveCategory(category.id)}
                    className={`px-2 sm:px-3 md:px-4 lg:px-6 py-1.5 sm:py-2 md:py-2.5 lg:py-3 rounded-full font-medium transition-all duration-300 text-xs sm:text-sm md:text-base min-h-[36px] sm:min-h-[40px] md:min-h-[44px] whitespace-nowrap flex-shrink-0 ${
                      activeCategory === category.id
                        ? 'bg-primary text-primary-foreground shadow-lg'
                        : 'bg-muted hover:bg-muted/80 text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    {category.name} ({category.count})
                  </button>
                ))}
              </div>
            </div>
            
            {/* Services Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-6 lg:gap-8 mb-4 sm:mb-6 md:mb-8 lg:mb-12 w-full">
              {filteredServices.map((service) => (
                <ServiceCard 
                  key={service.id}
                  id={service.id}
                  title={service.title}
                  description={service.description}
                  price={service.price}
                  icon={service.icon}
                  onSelect={() => setSelectedService(service.title)}
                />
              ))}
            </div>

            {/* Pricing Notice */}
            <div className="mb-6 sm:mb-8 md:mb-12 lg:mb-16 w-full">
              <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20 border-blue-200 dark:border-blue-800 max-w-none">
                <CardContent className="p-3 sm:p-4 md:p-6">
                  <div className="flex items-start gap-2 sm:gap-3">
                    <Info className="h-3 w-3 sm:h-4 sm:w-4 md:h-5 md:w-5 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />
                    <div className="text-center w-full">
                      <h3 className="font-semibold text-blue-900 dark:text-blue-100 mb-1 sm:mb-2 text-xs sm:text-sm md:text-base">
                        {t("services.pricing.negotiableTitle")}
                      </h3>
                      <p className="text-blue-700 dark:text-blue-200 text-xs sm:text-sm leading-relaxed">
                        {t("services.pricing.negotiableDescription")}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <div className="w-full">
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
