
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";

interface ServiceRequestFormProps {
  selectedService: string | null;
}

const ServiceRequestForm = ({ selectedService }: ServiceRequestFormProps) => {
  const { toast } = useToast();
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
        title: "Service request submitted!",
        description: "Thanks for your interest. I'll get back to you within 24 hours.",
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
    <div id="service-request-form" className="card-3d bg-card rounded-xl p-8 shadow-3d border border-border">
      <h2 className="text-2xl font-bold mb-6">Request a Service</h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium mb-2">
              Your Name*
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
              placeholder="John Doe"
            />
          </div>
          
          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-2">
              Email Address*
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
              placeholder="john@example.com"
            />
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="phone" className="block text-sm font-medium mb-2">
              Phone Number
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
              placeholder="+1 (123) 456-7890"
            />
          </div>
          
          <div>
            <label htmlFor="budget" className="block text-sm font-medium mb-2">
              Your Budget
            </label>
            <select
              id="budget"
              name="budget"
              value={formData.budget}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
            >
              <option value="">Select a budget range</option>
              <option value="< $300">Less than $300</option>
              <option value="$300 - $500">$300 - $500</option>
              <option value="$500 - $1000">$500 - $1000</option>
              <option value="$1000 - $2000">$1000 - $2000</option>
              <option value="> $2000">More than $2000</option>
              <option value="Contact for pricing">Contact for pricing</option>
            </select>
          </div>
        </div>
        
        <div>
          <label htmlFor="service" className="block text-sm font-medium mb-2">
            Service You're Interested In*
          </label>
          <select
            id="service"
            name="service"
            value={formData.service}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
          >
            <option value="">Select a service</option>
            <option value="Web Development">Web Development</option>
            <option value="IT Support">IT Support</option>
            <option value="WordPress Development">WordPress Development</option>
            <option value="SEO Optimization">SEO Optimization</option>
            <option value="System Security">System Security</option>
            <option value="Custom Tools Development">Custom Tools Development</option>
            <option value="IMEI, FRP & Remote">IMEI, FRP & Remote</option>
            <option value="Server, Cards & Games">Server, Cards & Games</option>
            <option value="Expert Support">Expert Support</option>
            <option value="Other">Other (please specify in message)</option>
          </select>
        </div>
        
        <div>
          <label htmlFor="message" className="block text-sm font-medium mb-2">
            Project Details*
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
            rows={5}
            className="w-full px-4 py-2 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all resize-none"
            placeholder="Please describe your project or service needs in detail."
          ></textarea>
        </div>
        
        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-3"
        >
          {isSubmitting ? "Submitting..." : "Submit Service Request"}
        </Button>
      </form>
    </div>
  );
};

export default ServiceRequestForm;
