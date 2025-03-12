
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ServiceCard from "@/components/ServiceCard";
import ServiceRequestForm from "@/components/ServiceRequestForm";
import { ThemeProvider } from "@/context/ThemeContext";

const Services = () => {
  const [selectedService, setSelectedService] = useState<string | null>(null);
  
  return (
    <ThemeProvider>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow">
          <section className="py-20">
            <div className="section-container">
              <h1 className="text-4xl font-bold mb-4">
                My <span className="text-gradient">Services</span>
              </h1>
              <p className="text-muted-foreground mb-12 max-w-2xl">
                I offer a range of services in web development, IT support, and technical solutions.
                Browse the options below and request a service that fits your needs.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
                <ServiceCard 
                  id="web-development"
                  title="Web Development"
                  description="Custom website development using React, PHP, WordPress, or other technologies based on your needs."
                  price="From $500"
                  icon="Monitor"
                  onSelect={() => setSelectedService("Web Development")}
                />
                <ServiceCard 
                  id="it-support"
                  title="IT Support"
                  description="Technical support, troubleshooting, and maintenance for your computers, phones, and other devices."
                  price="$50/hour"
                  icon="LifeBuoy"
                  onSelect={() => setSelectedService("IT Support")}
                />
                <ServiceCard 
                  id="wordpress"
                  title="WordPress Development"
                  description="Custom WordPress themes, plugins, and site optimization for better performance."
                  price="From $300"
                  icon="Layout"
                  onSelect={() => setSelectedService("WordPress Development")}
                />
                <ServiceCard 
                  id="seo"
                  title="SEO Optimization"
                  description="Improve your website's search engine ranking with technical SEO and content optimization."
                  price="From $200"
                  icon="Search"
                  onSelect={() => setSelectedService("SEO Optimization")}
                />
                <ServiceCard 
                  id="system-security"
                  title="System Security"
                  description="Implementation of security measures, including Wazuh installation and security audits."
                  price="From $400"
                  icon="Shield"
                  onSelect={() => setSelectedService("System Security")}
                />
                <ServiceCard 
                  id="custom-tools"
                  title="Custom Tools Development"
                  description="Development of custom tools and automation scripts to optimize your workflow."
                  price="From $300"
                  icon="Code"
                  onSelect={() => setSelectedService("Custom Tools Development")}
                />
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
