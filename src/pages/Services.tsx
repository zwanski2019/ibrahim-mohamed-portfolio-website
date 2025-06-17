
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ServiceCard from "@/components/ServiceCard";
import ServiceRequestForm from "@/components/ServiceRequestForm";
import { ThemeProvider } from "@/context/ThemeContext";

const Services = () => {
  const [selectedService, setSelectedService] = useState<string | null>(null);
  
  const allServices = [
    {
      id: "web-development",
      title: "Web Development",
      description: "Custom website development using React, PHP, WordPress, or other technologies based on your needs.",
      price: "From $500",
      icon: "Monitor" as const,
      category: "development"
    },
    {
      id: "it-support",
      title: "IT Support",
      description: "Technical support, troubleshooting, and maintenance for your computers, phones, and other devices.",
      price: "$50/hour",
      icon: "LifeBuoy" as const,
      category: "support"
    },
    {
      id: "wordpress",
      title: "WordPress Development",
      description: "Custom WordPress themes, plugins, and site optimization for better performance.",
      price: "From $300",
      icon: "Layout" as const,
      category: "development"
    },
    {
      id: "seo",
      title: "SEO Optimization",
      description: "Improve your website's search engine ranking with technical SEO and content optimization.",
      price: "From $200",
      icon: "Search" as const,
      category: "marketing"
    },
    {
      id: "system-security",
      title: "System Security",
      description: "Implementation of security measures, including Wazuh installation and security audits.",
      price: "From $400",
      icon: "Shield" as const,
      category: "security"
    },
    {
      id: "custom-tools",
      title: "Custom Tools Development",
      description: "Development of custom tools and automation scripts to optimize your workflow.",
      price: "From $300",
      icon: "Code" as const,
      category: "development"
    }
  ];

  const categories = [
    { id: "all", name: "All Services", count: allServices.length },
    { id: "development", name: "Development", count: allServices.filter(s => s.category === "development").length },
    { id: "support", name: "Support", count: allServices.filter(s => s.category === "support").length },
    { id: "security", name: "Security", count: allServices.filter(s => s.category === "security").length },
    { id: "marketing", name: "Marketing", count: allServices.filter(s => s.category === "marketing").length }
  ];

  const [activeCategory, setActiveCategory] = useState("all");
  const filteredServices = activeCategory === "all" 
    ? allServices 
    : allServices.filter(service => service.category === activeCategory);
  
  return (
    <ThemeProvider>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow">
          {/* Services Section */}
          <section className="py-20 bg-gradient-to-b from-background to-muted/20">
            <div className="section-container">
              {/* Category Filter */}
              <div className="mb-12 animate-on-scroll">
                <div className="flex flex-wrap justify-center gap-4">
                  {categories.map((category) => (
                    <button
                      key={category.id}
                      onClick={() => setActiveCategory(category.id)}
                      className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
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
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
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
              
              <ServiceRequestForm selectedService={selectedService} />
            </div>
          </section>
        </main>
        <Footer />
      </div>
    </ThemeProvider>
  );
};

export default Services;
