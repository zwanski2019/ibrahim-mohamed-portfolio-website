import { Github, LinkedinIcon, Mail, MapPin, Phone } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Link } from "react-router-dom";
import { TurnstileWidget } from "@/components/ui/turnstile";
import { useTurnstile } from "@/hooks/useTurnstile";
import { supabase } from "@/integrations/supabase/client";

export default function ContactWithTurnstile() {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const {
    token,
    isVerified,
    turnstileRef,
    handleVerify,
    handleError,
    handleExpire,
    reset: resetTurnstile,
  } = useTurnstile();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const verifyTurnstileToken = async (turnstileToken: string) => {
    try {
      const { data, error } = await supabase.functions.invoke('verify-turnstile', {
        body: { token: turnstileToken },
      });

      if (error || !data?.success) {
        throw new Error(data?.error || 'Verification failed');
      }

      return true;
    } catch (error) {
      console.error('Turnstile verification error:', error);
      return false;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isVerified || !token) {
      toast({
        title: "Verification required",
        description: "Please complete the security verification before submitting.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Verify the Turnstile token server-side
      const isTokenValid = await verifyTurnstileToken(token);
      
      if (!isTokenValid) {
        toast({
          title: "Verification failed",
          description: "Security verification failed. Please try again.",
          variant: "destructive",
        });
        resetTurnstile();
        setIsSubmitting(false);
        return;
      }

      // Simulate form submission
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      toast({
        title: "Message sent!",
        description: "Thanks for reaching out. I'll get back to you soon.",
      });
      
      setFormData({ name: "", email: "", message: "" });
      resetTurnstile();
    } catch (error) {
      console.error('Form submission error:', error);
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-20">
      <div className="section-container">
        <h2 className="section-title">
          Get In <span className="text-gradient">Touch</span>
        </h2>
        
        <p className="section-subtitle">
          Have a project in mind or want to discuss potential collaboration? Feel free to reach out!
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="card-3d bg-card rounded-xl p-8 shadow-3d border border-border">
            <h3 className="text-xl font-bold mb-6">Send Me a Message</h3>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-2">
                  Your Name
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
                  Email Address
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
              
              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-2">
                  Your Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="w-full px-4 py-2 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all resize-none"
                  placeholder="How can I help you?"
                ></textarea>
              </div>

              <div className="space-y-4">
                <TurnstileWidget
                  ref={turnstileRef}
                  onVerify={handleVerify}
                  onError={handleError}
                  onExpire={handleExpire}
                  theme="auto"
                  className="flex justify-center"
                />
                
                <button
                  type="submit"
                  disabled={isSubmitting || !isVerified}
                  className="w-full py-3 px-6 rounded-lg bg-primary text-primary-foreground font-medium shadow-lg hover:shadow-xl transition-all hover:scale-105 disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:scale-100"
                >
                  {isSubmitting ? "Sending..." : "Send Message"}
                </button>
              </div>
            </form>
          </div>
          
          
          <div>
            <h3 className="text-xl font-bold mb-6">Contact Information</h3>
            
            <div className="space-y-8">
              <div className="flex items-start">
                <Mail className="h-6 w-6 text-primary mt-1 mr-4" />
                <div>
                  <h4 className="font-semibold mb-1">Email</h4>
                  <a 
                    href="mailto:support@zwanski.org"
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    support@zwanski.org
                  </a>
                </div>
              </div>
              
              <div className="flex items-start">
                <Phone className="h-6 w-6 text-primary mt-1 mr-4" />
                <div>
                  <h4 className="font-semibold mb-1">Phone</h4>
                  <a
                    href="tel:+21694934141"
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    +216 94934141
                  </a>
                </div>
              </div>
              
              <div className="flex items-start">
                <MapPin className="h-6 w-6 text-primary mt-1 mr-4" />
                <div>
                  <h4 className="font-semibold mb-1">Location</h4>
                  <p className="text-muted-foreground">Tunis, Tunisia</p>
                </div>
              </div>
              
              <div className="pt-4 border-t border-border">
                <h4 className="font-semibold mb-4">Connect with me</h4>
                <div className="flex gap-4">
                  <a
                    href="https://github.com/zwanski2019"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-full bg-muted/50 hover:bg-muted transition-colors"
                    aria-label="GitHub Profile"
                  >
                    <Github className="h-5 w-5" />
                  </a>
                  
                  <a
                    href="mailto:support@zwanski.org"
                    className="p-3 rounded-full bg-muted/50 hover:bg-muted transition-colors"
                    aria-label="Email"
                  >
                    <Mail className="h-5 w-5" />
                  </a>
                  
                  <a
                    href="#"
                    className="p-3 rounded-full bg-muted/50 hover:bg-muted transition-colors"
                    aria-label="LinkedIn Profile"
                  >
                    <LinkedinIcon className="h-5 w-5" />
                  </a>
                </div>
              </div>
              
              <div className="card-3d bg-card-gradient rounded-xl p-6 border border-border shadow-md mt-8">
                <h4 className="font-semibold mb-2">Available for Freelance</h4>
                <p className="text-sm text-muted-foreground mb-4">
                  I'm currently available for freelance work. Let's collaborate on your next project!
                </p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <Link 
                    to="/services" 
                    className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-primary rounded-lg hover:bg-primary/90 transition-colors"
                  >
                    Browse My Services
                  </Link>
                  <a 
                    href="#contact" 
                    className="inline-flex items-center text-sm font-medium text-primary hover:text-primary/80"
                  >
                    Contact Me
                    <svg className="ml-1 h-4 w-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="5" y1="12" x2="19" y2="12"/>
                      <polyline points="12 5 19 12 12 19"/>
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
