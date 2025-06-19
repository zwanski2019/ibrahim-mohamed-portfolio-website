
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
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-grow">
        {/* Featured Free Tool Section */}
        <section className="py-12 md:py-16 bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-950/20 dark:to-blue-950/20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8 md:mb-12">
              <div className="flex items-center justify-center gap-2 mb-4">
                <Smartphone className="h-6 w-6 md:h-8 md:w-8 text-green-600" />
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold">
                  {t("nav.freeImeiCheck").split(" ")[0]} <span className="text-green-600">{t("nav.freeImeiCheck").split(" ").slice(1).join(" ")}</span>
                </h2>
              </div>
              <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto px-4">
                {t("imei.description")}
              </p>
            </div>
            
            <IMEIChecker />
          </div>
        </section>

        {/* Services Section */}
        <section className="py-16 md:py-20 bg-gradient-to-b from-background to-muted/20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12 md:mb-16">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
                {t("services.ourServices").split(" ")[0]} <span className="text-gradient">{t("services.ourServices").split(" ").slice(1).join(" ")}</span>
              </h2>
              <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto px-4">
                {t("services.ourServicesSubtitle")}
              </p>
            </div>

            {/* Category Filter */}
            <div className="mb-8 md:mb-12 animate-on-scroll">
              <div className="flex flex-wrap justify-center gap-2 md:gap-4 px-4">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setActiveCategory(category.id)}
                    className={`px-4 md:px-6 py-2 md:py-3 rounded-full font-medium transition-all duration-300 text-sm md:text-base min-h-[44px] ${
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
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-8 md:mb-12 px-4">
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
            <div className="mb-12 md:mb-16 px-4">
              <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20 border-blue-200 dark:border-blue-800">
                <CardContent className="p-6">
                  <div className="flex items-start gap-3">
                    <Info className="h-5 w-5 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />
                    <div className="text-center w-full">
                      <h3 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">
                        {t("services.pricing.negotiableTitle")}
                      </h3>
                      <p className="text-blue-700 dark:text-blue-200 text-sm leading-relaxed">
                        {t("services.pricing.negotiableDescription")}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <div className="px-4">
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
