import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { MessageCircle, Phone, Mail, MapPin, Clock, Send, Zap, MessageSquare } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface ValidationResult {
  valid: boolean;
  errors: string[];
}

const EnhancedContact = () => {
  const { language } = useLanguage();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    service: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const content = {
    en: {
      title: "Have a Project in Mind?",
      subtitle: "Let's turn your ideas into digital reality. Get started today!",
      form: {
        name: "Your Name",
        email: "Email Address",
        service: "Service Needed",
        message: "Project Details",
        submit: "Start Project"
      },
      contact: [
        { icon: MessageSquare, label: "Telegram", value: "Join for instant news", action: "telegram" },
        { icon: MessageCircle, label: "Live Chat", value: "Chat Now", action: "chat" },
        { icon: Phone, label: "WhatsApp", value: "+216 94934141", action: "whatsapp" },
        { icon: Mail, label: "Email", value: "contact@zwanski.org", action: "email" },
        { icon: MapPin, label: "Location", value: "Tunis, Tunisia", action: "location" }
      ],
      services: ["Web Development", "Device Repair", "Security Audit", "Custom Software", "IT Support", "Other"]
    },
    fr: {
      title: "Avez-vous un Projet en Tête?",
      subtitle: "Transformons vos idées en réalité numérique. Commencez aujourd'hui!",
      form: {
        name: "Votre Nom",
        email: "Adresse Email",
        service: "Service Requis",
        message: "Détails du Projet",
        submit: "Démarrer le Projet"
      },
      contact: [
        { icon: MessageSquare, label: "Telegram", value: "Rejoignez pour les nouvelles", action: "telegram" },
        { icon: MessageCircle, label: "Chat en Direct", value: "Chatter Maintenant", action: "chat" },
        { icon: Phone, label: "WhatsApp", value: "+216 94934141", action: "whatsapp" },
        { icon: Mail, label: "Email", value: "contact@zwanski.org", action: "email" },
        { icon: MapPin, label: "Localisation", value: "Tunis, Tunisie", action: "location" }
      ],
      services: ["Développement Web", "Réparation d'Appareils", "Audit Sécurité", "Logiciel Sur Mesure", "Support IT", "Autre"]
    },
    ar: {
      title: "هل لديك مشروع في الاعتبار؟",
      subtitle: "دعنا نحول أفكارك إلى واقع رقمي. ابدأ اليوم!",
      form: {
        name: "اسمك",
        email: "عنوان البريد الإلكتروني",
        service: "الخدمة المطلوبة",
        message: "تفاصيل المشروع",
        submit: "ابدأ المشروع"
      },
      contact: [
        { icon: MessageSquare, label: "تلغرام", value: "انضم للأخبار الفورية", action: "telegram" },
        { icon: MessageCircle, label: "دردشة مباشرة", value: "ابدأ المحادثة", action: "chat" },
        { icon: Phone, label: "واتساب", value: "+216 94934141", action: "whatsapp" },
        { icon: Mail, label: "البريد الإلكتروني", value: "contact@zwanski.org", action: "email" },
        { icon: MapPin, label: "الموقع", value: "تونس، تونس", action: "location" }
      ],
      services: ["تطوير الويب", "إصلاح الأجهزة", "تدقيق الأمان", "برمجيات مخصصة", "دعم تقني", "أخرى"]
    }
  };

  const currentContent = content[language];


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Client-side validation
    if (!formData.name.trim() || formData.name.length < 2) {
      toast({
        title: "Invalid name",
        description: "Name must be at least 2 characters long.",
        variant: "destructive"
      });
      return;
    }

    if (!formData.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      toast({
        title: "Invalid email",
        description: "Please enter a valid email address.",
        variant: "destructive"
      });
      return;
    }

    if (!formData.message.trim() || formData.message.length < 10) {
      toast({
        title: "Invalid message",
        description: "Message must be at least 10 characters long.",
        variant: "destructive"
      });
      return;
    }

    if (formData.message.length > 5000) {
      toast({
        title: "Message too long",
        description: "Message must be less than 5000 characters.",
        variant: "destructive"
      });
      return;
    }

    // Check for suspicious content (XSS prevention)
    const suspiciousPatterns = /(script|javascript|<iframe|<object|<embed|onclick|onerror|<script|javascript:|data:|vbscript:)/i;
    if (suspiciousPatterns.test(formData.message) || suspiciousPatterns.test(formData.name)) {
      toast({
        title: "Invalid content",
        description: "Message contains potentially harmful content.",
        variant: "destructive"
      });
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Check rate limit
      const { data: rateLimitCheck, error: rateLimitError } = await supabase.rpc('check_rate_limit', {
        p_identifier: formData.email,
        p_action: 'enhanced_contact_form',
        p_max_requests: 3,
        p_window_minutes: 60
      });

      if (rateLimitError || !rateLimitCheck) {
        toast({
          title: "Rate limit exceeded",
          description: "Please wait before sending another message.",
          variant: "destructive"
        });
        return;
      }

      // Server-side validation
      const { data: validationResult, error: validationError } = await supabase.rpc('validate_contact_input', {
        p_name: formData.name,
        p_email: formData.email,
        p_message: formData.message
      });

      const validation = validationResult as unknown as ValidationResult;
      if (validationError || !validation?.valid) {
        const errors = validation?.errors || ['Validation failed'];
        toast({
          title: "Validation error",
          description: errors[0],
          variant: "destructive"
        });
        return;
      }

      const { error } = await supabase
        .from('contact_messages')
        .insert([
          {
            name: formData.name.trim(),
            email: formData.email.trim().toLowerCase(),
            subject: formData.service?.trim() || 'Service Inquiry',
            message: formData.message.trim()
          }
        ]);

      if (error) throw error;

      // Log successful contact for security monitoring
      await supabase.from('security_events').insert({
        event_type: 'enhanced_contact_form_submission',
        event_data: {
          email: formData.email,
          service: formData.service || 'Service Inquiry',
          name_length: formData.name.length,
          message_length: formData.message.length
        }
      });

      toast({
        title: "Message sent!",
        description: "We'll get back to you soon.",
      });
      setFormData({ name: '', email: '', service: '', message: '' });
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

  const handleContactAction = (action: string) => {
    switch (action) {
      case 'telegram':
        window.open('https://t.me/zwanski_tech', '_blank');
        break;
      case 'chat':
        window.location.href = '/chat';
        break;
      case 'whatsapp':
        window.open('https://wa.me/21694934141', '_blank');
        break;
      case 'email':
        window.location.href = 'mailto:contact@zwanski.org';
        break;
      case 'location':
        window.open('https://maps.google.com/?q=Tunis,Tunisia', '_blank');
        break;
    }
  };

  return (
    <section className="axeptio-section">
      <div className="axeptio-container">
        <div className="text-center mb-16">
          <h2 className="axeptio-heading mb-6">
            {currentContent.title}
          </h2>
          <p className="axeptio-subheading max-w-3xl mx-auto">
            {currentContent.subtitle}
          </p>
        </div>

        <div className="grid gap-8 lg:gap-12 lg:grid-cols-2 max-w-7xl mx-auto">
          {/* Contact Form */}
          <div className="order-2 lg:order-1">
            <Card className="axeptio-card">
              <CardHeader>
                <CardTitle className="axeptio-feature-title flex items-center gap-3">
                  <div className="axeptio-feature-icon flex-shrink-0">
                    <Zap className="h-5 w-5" />
                  </div>
                  <span className="text-base sm:text-lg">
                    {language === 'en' ? 'Quick Project Start' : language === 'fr' ? 'Démarrage Rapide de Projet' : 'بداية سريعة للمشروع'}
                  </span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="w-full">
                      <Label htmlFor="contact-name" className="sr-only">
                        {currentContent.form.name}
                      </Label>
                      <Input
                        id="contact-name"
                        placeholder={currentContent.form.name}
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full"
                        maxLength={100}
                        required
                      />
                    </div>
                    <div className="w-full">
                      <Label htmlFor="contact-email" className="sr-only">
                        {currentContent.form.email}
                      </Label>
                      <Input
                        id="contact-email"
                        type="email"
                        placeholder={currentContent.form.email}
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full"
                        maxLength={320}
                        required
                      />
                    </div>
                  </div>
                  
                  <Label htmlFor="contact-service" className="sr-only">
                    {currentContent.form.service}
                  </Label>
                  <select
                    id="contact-service"
                    className="w-full p-3 bg-background border border-border rounded-md focus:border-primary text-foreground text-sm sm:text-base"
                    value={formData.service}
                    onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                  >
                    <option value="">{currentContent.form.service}</option>
                    {currentContent.services.map((service, index) => (
                      <option key={index} value={service}>{service}</option>
                    ))}
                  </select>

                  <Label htmlFor="contact-message" className="sr-only">
                    {currentContent.form.message}
                  </Label>
                  <Textarea
                    id="contact-message"
                    placeholder={currentContent.form.message}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    rows={4}
                    className="w-full resize-none"
                    maxLength={5000}
                    required
                  />
                  
                  
                  <Button 
                    type="submit"
                    size="lg"
                    className="w-full axeptio-button-primary flex items-center justify-center gap-2"
                    disabled={isSubmitting}
                  >
                    <span>{isSubmitting ? 'Sending...' : currentContent.form.submit}</span>
                    <Send className="h-4 w-4" />
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Contact Methods */}
          <div className="order-1 lg:order-2 space-y-4 sm:space-y-6">
            <Card className="axeptio-card">
              <CardHeader>
                <CardTitle className="axeptio-feature-title flex items-center gap-3">
                  <div className="axeptio-feature-icon flex-shrink-0">
                    <MessageCircle className="h-5 w-5" />
                  </div>
                  <span className="text-base sm:text-lg">
                    {language === 'en' ? 'Get in Touch' : language === 'fr' ? 'Contactez-nous' : 'تواصل معنا'}
                  </span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 sm:space-y-4">
                {currentContent.contact.map((item, index) => (
                  <div
                    key={index}
                    onClick={() => handleContactAction(item.action)}
                    className={`flex items-center gap-3 sm:gap-4 p-3 sm:p-4 rounded-lg transition-all duration-300 cursor-pointer group hover:bg-accent ${
                      item.action === 'telegram' 
                        ? 'bg-primary/5 border border-primary/20'
                        : 'bg-muted/30'
                    }`}
                  >
                    <div className="axeptio-feature-icon flex-shrink-0">
                      <item.icon className="h-4 w-4 sm:h-5 sm:w-5" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="font-semibold text-foreground text-sm sm:text-base truncate">{item.label}</div>
                      <div className="text-muted-foreground group-hover:text-foreground transition-colors text-xs sm:text-sm truncate">
                        {item.value}
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="axeptio-card bg-primary/5 border-primary/20">
              <CardContent className="p-4 sm:p-6">
                <div className="flex items-start gap-3 sm:gap-4 mb-3 sm:mb-4">
                  <div className="axeptio-feature-icon flex-shrink-0 mt-1">
                    <Clock className="h-5 w-5 sm:h-6 sm:w-6" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="font-semibold text-foreground text-sm sm:text-base">
                      {language === 'en' ? 'Response Time' : language === 'fr' ? 'Temps de Réponse' : 'وقت الاستجابة'}
                    </div>
                    <div className="text-primary font-medium text-sm sm:text-base">
                      {language === 'en' ? 'Usually within 2-4 hours' : language === 'fr' ? 'Généralement sous 2-4 heures' : 'عادة خلال 2-4 ساعات'}
                    </div>
                  </div>
                </div>
                <div className="text-muted-foreground text-xs sm:text-sm leading-relaxed">
                  {language === 'en' 
                    ? 'We pride ourselves on quick response times and efficient project delivery.'
                    : language === 'fr'
                    ? 'Nous sommes fiers de nos temps de réponse rapides et de notre livraison efficace de projets.'
                    : 'نحن نفخر بأوقات الاستجابة السريعة والتسليم الفعال للمشاريع.'
                  }
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EnhancedContact;
