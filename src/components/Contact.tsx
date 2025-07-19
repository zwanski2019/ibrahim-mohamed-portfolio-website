import { Github, LinkedinIcon, Mail, MapPin, Phone } from "lucide-react";
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import TurnstileWidget from "./TurnstileWidget";

export default function Contact() {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);
  const [siteKey, setSiteKey] = useState<string>("");
  const [loadingConfig, setLoadingConfig] = useState(true);
  const [turnstileEnabled, setTurnstileEnabled] = useState(false);

  useEffect(() => {
    const getTurnstileConfig = async () => {
      try {
        console.log('Fetching Turnstile config...');
        const { data, error } = await supabase.functions.invoke('get-turnstile-config');
        
        if (error) {
          console.warn('Error fetching Turnstile config:', error);
          setTurnstileEnabled(false);
        } else if (data?.siteKey) {
          console.log('Turnstile config loaded successfully');
          setSiteKey(data.siteKey);
          setTurnstileEnabled(true);
        } else {
          console.warn('No site key returned, Turnstile disabled');
          setTurnstileEnabled(false);
        }
      } catch (error) {
        console.warn('Failed to fetch Turnstile config:', error);
        setTurnstileEnabled(false);
      } finally {
        setLoadingConfig(false);
      }
    };

    getTurnstileConfig();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Only require Turnstile token if Turnstile is enabled
    if (turnstileEnabled && !turnstileToken) {
      toast({
        title: "Security verification required",
        description: "Please complete the security check.",
        variant: "destructive"
      });
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Only verify Turnstile token if it's enabled and we have a token
      if (turnstileEnabled && turnstileToken) {
        const { data: verificationData, error: verificationError } = await supabase.functions.invoke('verify-turnstile', {
          body: { token: turnstileToken }
        });

        if (verificationError || !verificationData?.success) {
          throw new Error('Security verification failed');
        }
      }

      const { error } = await supabase
        .from('contact_messages')
        .insert([
          {
            name: formData.name,
            email: formData.email,
            subject: formData.subject || 'General Inquiry',
            message: formData.message
          }
        ]);

      if (error) throw error;

      toast({
        title: "Message sent!",
        description: "Thanks for reaching out. I'll get back to you soon.",
      });
      setFormData({ name: "", email: "", subject: "", message: "" });
      setTurnstileToken(null);
    } catch (error) {
      console.error('Error sending message:', error);
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive"
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
                <label htmlFor="subject" className="block text-sm font-medium mb-2">
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                  placeholder="What's this about?"
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
              
              {/* Turnstile Widget - Only show if enabled */}
              {turnstileEnabled && !loadingConfig && siteKey && (
                <div className="py-2">
                  <TurnstileWidget
                    siteKey={siteKey}
                    onVerify={setTurnstileToken}
                    onError={() => setTurnstileToken(null)}
                    onExpire={() => setTurnstileToken(null)}
                    theme="auto"
                    size="normal"
                  />
                </div>
              )}
              
              {!turnstileEnabled && !loadingConfig && (
                <div className="py-2 text-sm text-muted-foreground">
                  Security verification is currently unavailable
                </div>
              )}
              
              <button
                type="submit"
                disabled={isSubmitting || (turnstileEnabled && !turnstileToken)}
                className="w-full py-3 px-6 rounded-lg bg-primary text-primary-foreground font-medium shadow-lg hover:shadow-xl transition-all hover:scale-105 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isSubmitting ? "Sending..." : "Send Message"}
              </button>
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
