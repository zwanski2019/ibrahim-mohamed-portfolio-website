
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { MessageCircle, Phone, Mail, MapPin, Clock, Send, Zap, MessageSquare } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { useState } from "react";

const EnhancedContact = () => {
  const { language } = useLanguage();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    service: '',
    message: ''
  });

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Handle form submission
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

        <div className="grid lg:grid-cols-2 gap-12 max-w-7xl mx-auto">
          {/* Contact Form */}
          <Card className="axeptio-card">
            <CardHeader>
              <CardTitle className="axeptio-feature-title flex items-center gap-3">
                <Zap className="h-6 w-6 text-primary" />
                {language === 'en' ? 'Quick Project Start' : language === 'fr' ? 'Démarrage Rapide de Projet' : 'بداية سريعة للمشروع'}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Input
                      placeholder={currentContent.form.name}
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                    />
                  </div>
                  <div>
                    <Input
                      type="email"
                      placeholder={currentContent.form.email}
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                    />
                  </div>
                </div>
                
                <select
                  className="w-full p-3 bg-background border border-border rounded-md focus:border-primary text-foreground"
                  value={formData.service}
                  onChange={(e) => setFormData({...formData, service: e.target.value})}
                >
                  <option value="">{currentContent.form.service}</option>
                  {currentContent.services.map((service, index) => (
                    <option key={index} value={service}>{service}</option>
                  ))}
                </select>
                
                <Textarea
                  placeholder={currentContent.form.message}
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                  rows={4}
                />
                
                <Button 
                  type="submit"
                  size="lg"
                  className="w-full axeptio-button-primary"
                >
                  {currentContent.form.submit}
                  <Send className="ml-2 h-5 w-5" />
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Contact Methods */}
          <div className="space-y-6">
            <Card className="axeptio-card">
              <CardHeader>
                <CardTitle className="axeptio-feature-title flex items-center gap-3">
                  <MessageCircle className="h-6 w-6 text-primary" />
                  {language === 'en' ? 'Get in Touch' : language === 'fr' ? 'Contactez-nous' : 'تواصل معنا'}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {currentContent.contact.map((item, index) => (
                  <div
                    key={index}
                    onClick={() => handleContactAction(item.action)}
                    className={`flex items-center gap-4 p-4 rounded-lg transition-all duration-300 cursor-pointer group hover:bg-accent ${
                      item.action === 'telegram' 
                        ? 'bg-primary/5 border border-primary/20'
                        : 'bg-muted/30'
                    }`}
                  >
                    <div className="axeptio-feature-icon">
                      <item.icon className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <div className="font-semibold text-foreground">{item.label}</div>
                      <div className="text-muted-foreground group-hover:text-foreground transition-colors">{item.value}</div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="axeptio-card bg-primary/5 border-primary/20">
              <CardContent className="p-6">
                <div className="flex items-center gap-4 mb-4">
                  <Clock className="h-6 w-6 text-primary" />
                  <div>
                    <div className="font-semibold text-foreground">
                      {language === 'en' ? 'Response Time' : language === 'fr' ? 'Temps de Réponse' : 'وقت الاستجابة'}
                    </div>
                    <div className="text-primary">
                      {language === 'en' ? 'Usually within 2-4 hours' : language === 'fr' ? 'Généralement sous 2-4 heures' : 'عادة خلال 2-4 ساعات'}
                    </div>
                  </div>
                </div>
                <div className="text-muted-foreground text-sm">
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
