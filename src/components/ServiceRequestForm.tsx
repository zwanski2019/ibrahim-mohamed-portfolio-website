
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/context/LanguageContext";

interface ServiceRequestFormProps {
  selectedService: string | null;
}

const ServiceRequestForm = ({ selectedService }: ServiceRequestFormProps) => {
  const { toast } = useToast();
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    budget: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (selectedService) {
      setFormData(prev => ({ ...prev, service: selectedService }));
      
      // Scroll to form when a service is selected
      const formElement = document.getElementById("service-request-form");
      if (formElement) {
        formElement.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  }, [selectedService]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission with a delay
    setTimeout(() => {
      console.log("Service request data:", formData);
      toast({
        title: t("form.submitted"),
        description: t("form.submittedDesc"),
      });
      setFormData({
        name: "",
        email: "",
        phone: "",
        service: selectedService || "",
        budget: "",
        message: "",
      });
      setIsSubmitting(false);
    }, 1500);
  };

  return (
    <div id="service-request-form" className="card-3d bg-card rounded-xl p-3 sm:p-4 md:p-6 lg:p-8 shadow-3d border border-border w-full max-w-none overflow-hidden">
      <h2 className="text-lg sm:text-xl md:text-2xl font-bold mb-3 sm:mb-4 md:mb-6 break-words">{t("form.requestService")}</h2>
      
      <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4 md:space-y-6 w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 md:gap-6">
          <div className="w-full">
            <label htmlFor="name" className="block text-xs sm:text-sm font-medium mb-1 sm:mb-2">
              {t("form.yourName")} <span className="text-red-500">{t("form.required")}</span>
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-2 sm:px-3 md:px-4 py-2 sm:py-2.5 md:py-3 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all text-xs sm:text-sm md:text-base min-h-[40px] sm:min-h-[44px]"
              placeholder="John Doe"
            />
          </div>
          
          <div className="w-full">
            <label htmlFor="email" className="block text-xs sm:text-sm font-medium mb-1 sm:mb-2">
              {t("form.emailAddress")} <span className="text-red-500">{t("form.required")}</span>
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-2 sm:px-3 md:px-4 py-2 sm:py-2.5 md:py-3 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all text-xs sm:text-sm md:text-base min-h-[40px] sm:min-h-[44px]"
              placeholder="john@example.com"
            />
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 md:gap-6">
          <div className="w-full">
            <label htmlFor="phone" className="block text-xs sm:text-sm font-medium mb-1 sm:mb-2">
              {t("form.phoneNumber")}
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full px-2 sm:px-3 md:px-4 py-2 sm:py-2.5 md:py-3 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all text-xs sm:text-sm md:text-base min-h-[40px] sm:min-h-[44px]"
              placeholder="+1 (123) 456-7890"
            />
          </div>
          
          <div className="w-full">
            <label htmlFor="budget" className="block text-xs sm:text-sm font-medium mb-1 sm:mb-2">
              {t("form.yourBudget")}
            </label>
            <select
              id="budget"
              name="budget"
              value={formData.budget}
              onChange={handleChange}
              className="w-full px-2 sm:px-3 md:px-4 py-2 sm:py-2.5 md:py-3 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all text-xs sm:text-sm md:text-base min-h-[40px] sm:min-h-[44px]"
            >
              <option value="">{t("form.selectBudget")}</option>
              <option value="< $300">{t("form.lessThan300")}</option>
              <option value="$300 - $500">{t("form.budget300to500")}</option>
              <option value="$500 - $1000">{t("form.budget500to1000")}</option>
              <option value="$1000 - $2000">{t("form.budget1000to2000")}</option>
              <option value="> $2000">{t("form.moreThan2000")}</option>
              <option value="Contact for pricing">{t("form.contactForPricing")}</option>
            </select>
          </div>
        </div>
        
        <div className="w-full">
          <label htmlFor="service" className="block text-xs sm:text-sm font-medium mb-1 sm:mb-2">
            {t("form.serviceInterested")} <span className="text-red-500">{t("form.required")}</span>
          </label>
          <select
            id="service"
            name="service"
            value={formData.service}
            onChange={handleChange}
            required
            className="w-full px-2 sm:px-3 md:px-4 py-2 sm:py-2.5 md:py-3 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all text-xs sm:text-sm md:text-base min-h-[40px] sm:min-h-[44px]"
          >
            <option value="">{t("form.selectService")}</option>
            <option value="Web Development">{t("form.webDevelopment")}</option>
            <option value="IT Support">{t("form.itSupport")}</option>
            <option value="WordPress Development">{t("form.wordpressDevelopment")}</option>
            <option value="SEO Optimization">{t("form.seoOptimization")}</option>
            <option value="System Security">{t("form.systemSecurity")}</option>
            <option value="Custom Tools Development">{t("form.customToolsDevelopment")}</option>
            <option value="IMEI, FRP & Remote">{t("form.imeiFrpRemote")}</option>
            <option value="Server, Cards & Games">{t("form.serverCardsGames")}</option>
            <option value="Expert Support">{t("form.expertSupport")}</option>
            <option value="Other">{t("form.other")}</option>
          </select>
        </div>
        
        <div className="w-full">
          <label htmlFor="message" className="block text-xs sm:text-sm font-medium mb-1 sm:mb-2">
            {t("form.projectDetails")} <span className="text-red-500">{t("form.required")}</span>
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
            rows={4}
            className="w-full px-2 sm:px-3 md:px-4 py-2 sm:py-2.5 md:py-3 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all resize-none text-xs sm:text-sm md:text-base"
            placeholder={t("form.projectDetailsPlaceholder")}
          ></textarea>
        </div>
        
        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-2.5 sm:py-3 min-h-[44px] sm:min-h-[48px] text-xs sm:text-sm md:text-base"
        >
          {isSubmitting ? t("form.submitting") : t("form.submitRequest")}
        </Button>
      </form>
    </div>
  );
};

export default ServiceRequestForm;
