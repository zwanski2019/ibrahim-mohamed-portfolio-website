import { Phone, MessageSquare, Mail, Clock, MapPin, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useLanguage } from "@/context/LanguageContext";

const QuickContact = () => {
  const { t } = useLanguage();

  const contactMethods = [
    {
      icon: MessageSquare,
      title: "WhatsApp",
      subtitle: "Instant Support",
      description: "Get immediate help via WhatsApp",
      action: "Chat Now",
      link: "https://wa.me/1234567890",
      color: "from-green-500 to-emerald-500",
      bgColor: "bg-green-50 dark:bg-green-950/20",
      badge: "Fastest"
    },
    {
      icon: MessageSquare,
      title: "Telegram",
      subtitle: "24/7 Available",
      description: "Join our Telegram channel for updates",
      action: "Join Channel",
      link: "https://t.me/zwanski_tech",
      color: "from-blue-500 to-cyan-500",
      bgColor: "bg-blue-50 dark:bg-blue-950/20",
      badge: "Popular"
    },
    {
      icon: Phone,
      title: "Emergency Call",
      subtitle: "Urgent Repairs",
      description: "For critical device issues",
      action: "Call Now",
      link: "tel:+1234567890",
      color: "from-red-500 to-orange-500",
      bgColor: "bg-red-50 dark:bg-red-950/20",
      badge: "24/7"
    },
    {
      icon: Mail,
      title: "Email Support",
      subtitle: "Detailed Inquiries",
      description: "For complex project discussions",
      action: "Send Email",
      link: "mailto:contact@zwanski.org",
      color: "from-purple-500 to-pink-500",
      bgColor: "bg-purple-50 dark:bg-purple-950/20",
      badge: "Professional"
    }
  ];

  const quickServices = [
    { 
      title: "Emergency Device Repair", 
      time: "Same Day", 
      description: "Critical repairs with fast turnaround" 
    },
    { 
      title: "Security Audit", 
      time: "48 Hours", 
      description: "Comprehensive security assessment" 
    },
    { 
      title: "Website Development", 
      time: "1-2 Weeks", 
      description: "Custom web solutions" 
    },
    { 
      title: "Cloud Migration", 
      time: "3-5 Days", 
      description: "Seamless cloud transition" 
    }
  ];

  return (
    <section className="axeptio-section bg-gradient-to-br from-background via-secondary/10 to-background">
      <div className="axeptio-container">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full text-primary font-medium text-sm mb-6">
            🚀 Ready to Get Started?
          </div>
          <h2 className="axeptio-heading mb-4">
            Get In Touch Today
          </h2>
          <p className="axeptio-body max-w-2xl mx-auto">
            Choose your preferred contact method and get immediate assistance. 
            We're here to help 24/7 with all your IT needs.
          </p>
        </div>

        {/* Contact Methods Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {contactMethods.map((method, index) => {
            const Icon = method.icon;
            return (
              <Card 
                key={index} 
                className={`axeptio-card group hover:scale-105 transition-all duration-300 ${method.bgColor} border-2 hover:border-primary/20`}
              >
                <CardContent className="p-6 text-center">
                  {/* Badge */}
                  <div className="mb-4">
                    <Badge variant="secondary" className="text-xs">
                      {method.badge}
                    </Badge>
                  </div>

                  {/* Icon */}
                  <div className="mb-4 mx-auto">
                    <div className={`inline-flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-br ${method.color} text-white`}>
                      <Icon className="h-7 w-7" />
                    </div>
                  </div>

                  {/* Content */}
                  <h3 className="font-bold text-foreground mb-1">
                    {method.title}
                  </h3>
                  <p className="text-sm font-medium text-muted-foreground mb-2">
                    {method.subtitle}
                  </p>
                  <p className="text-xs text-muted-foreground mb-4">
                    {method.description}
                  </p>

                  {/* Action Button */}
                  <a 
                    href={method.link} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="block"
                  >
                    <Button 
                      size="sm" 
                      className={`w-full group-hover:shadow-md transition-all bg-gradient-to-r ${method.color} border-0`}
                    >
                      {method.action}
                      <ArrowRight className="ml-2 h-3 w-3 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </a>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Quick Services Overview */}
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold mb-4">Popular Services & Timelines</h3>
            <p className="text-muted-foreground">
              Get an idea of our service delivery times and what to expect
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {quickServices.map((service, index) => (
              <Card key={index} className="axeptio-card">
                <CardContent className="p-4 flex items-center justify-between">
                  <div className="flex-1">
                    <h4 className="font-semibold text-foreground mb-1">
                      {service.title}
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      {service.description}
                    </p>
                  </div>
                  <div className="ml-4 text-right">
                    <div className="flex items-center gap-1 text-primary">
                      <Clock className="h-4 w-4" />
                      <span className="font-medium text-sm">{service.time}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Location & Hours */}
        <div className="mt-12 text-center">
          <Card className="axeptio-card max-w-2xl mx-auto">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row items-center justify-center gap-6">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <MapPin className="h-5 w-5 text-primary" />
                  <span>Remote & On-site Services Available</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Clock className="h-5 w-5 text-primary" />
                  <span>24/7 Emergency Support</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default QuickContact;