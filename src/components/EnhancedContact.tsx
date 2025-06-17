
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { MessageCircle, Phone, Mail, MapPin, Clock, Send, Zap } from "lucide-react";
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
        { icon: MessageCircle, label: "Live Chat", value: "Chat Now", action: "chat" },
        { icon: Phone, label: "WhatsApp", value: "+216 XX XXX XXX", action: "whatsapp" },
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
        { icon: MessageCircle, label: "Chat en Direct", value: "Chatter Maintenant", action: "chat" },
        { icon: Phone, label: "WhatsApp", value: "+216 XX XXX XXX", action: "whatsapp" },
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
        { icon: MessageCircle, label: "دردشة مباشرة", value: "ابدأ المحادثة", action: "chat" },
        { icon: Phone, label: "واتساب", value: "+216 XX XXX XXX", action: "whatsapp" },
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
      case 'chat':
        // Open chat widget
        break;
      case 'whatsapp':
        window.open('https://wa.me/21600000000', '_blank');
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
    <section className="py-20 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,rgba(59,130,246,0.15),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(34,197,94,0.15),transparent_50%)]" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16 animate-on-scroll">
          <h2 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-emerald-400 to-blue-400 bg-clip-text text-transparent">
            {currentContent.title}
          </h2>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            {currentContent.subtitle}
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-7xl mx-auto">
          {/* Contact Form */}
          <Card className="bg-slate-800/50 backdrop-blur-sm border-slate-700/50 hover:border-blue-500/50 transition-all duration-300 animate-on-scroll">
            <CardHeader>
              <CardTitle className="text-2xl text-white flex items-center gap-3">
                <Zap className="h-6 w-6 text-emerald-400" />
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
                      className="bg-slate-700/50 border-slate-600 focus:border-blue-500 text-white placeholder-slate-400"
                    />
                  </div>
                  <div>
                    <Input
                      type="email"
                      placeholder={currentContent.form.email}
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      className="bg-slate-700/50 border-slate-600 focus:border-blue-500 text-white placeholder-slate-400"
                    />
                  </div>
                </div>
                
                <select
                  className="w-full p-3 bg-slate-700/50 border border-slate-600 rounded-md focus:border-blue-500 text-white"
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
                  className="bg-slate-700/50 border-slate-600 focus:border-blue-500 text-white placeholder-slate-400"
                />
                
                <Button 
                  type="submit"
                  size="lg"
                  className="w-full bg-gradient-to-r from-blue-600 to-emerald-600 hover:from-blue-700 hover:to-emerald-700 text-white font-semibold h-12"
                >
                  {currentContent.form.submit}
                  <Send className="ml-2 h-5 w-5" />
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Contact Methods */}
          <div className="space-y-6 animate-on-scroll">
            <Card className="bg-slate-800/50 backdrop-blur-sm border-slate-700/50">
              <CardHeader>
                <CardTitle className="text-2xl text-white flex items-center gap-3">
                  <MessageCircle className="h-6 w-6 text-blue-400" />
                  {language === 'en' ? 'Get in Touch' : language === 'fr' ? 'Contactez-nous' : 'تواصل معنا'}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {currentContent.contact.map((item, index) => (
                  <div
                    key={index}
                    onClick={() => handleContactAction(item.action)}
                    className="flex items-center gap-4 p-4 rounded-lg bg-slate-700/30 hover:bg-slate-700/50 transition-all duration-300 cursor-pointer group"
                  >
                    <div className="p-3 rounded-full bg-blue-500/20 group-hover:bg-blue-500/30 transition-colors">
                      <item.icon className="h-5 w-5 text-blue-400" />
                    </div>
                    <div>
                      <div className="font-semibold text-white">{item.label}</div>
                      <div className="text-slate-400 group-hover:text-slate-300 transition-colors">{item.value}</div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-emerald-500/10 to-blue-500/10 backdrop-blur-sm border-emerald-500/30">
              <CardContent className="p-6">
                <div className="flex items-center gap-4 mb-4">
                  <Clock className="h-6 w-6 text-emerald-400" />
                  <div>
                    <div className="font-semibold text-white">
                      {language === 'en' ? 'Response Time' : language === 'fr' ? 'Temps de Réponse' : 'وقت الاستجابة'}
                    </div>
                    <div className="text-emerald-300">
                      {language === 'en' ? 'Usually within 2-4 hours' : language === 'fr' ? 'Généralement sous 2-4 heures' : 'عادة خلال 2-4 ساعات'}
                    </div>
                  </div>
                </div>
                <div className="text-slate-300 text-sm">
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
