
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, ExternalLink } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

interface ServiceCardProps {
  service: {
    icon: React.ComponentType<{ className?: string }>;
    title: string;
    description: string;
    features: string[];
    badge: string;
    color: string;
  };
  index: number;
}

const ServiceCardComponent = ({ service, index }: ServiceCardProps) => {
  const { t } = useLanguage();

  return (
    <Card className="craft-card hover-lift group h-full flex flex-col">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between mb-6">
          <div className="p-4 rounded-xl craft-hero-gradient">
            <service.icon className="h-8 w-8 text-craft-mint" />
          </div>
          <Badge 
            variant="secondary" 
            className="text-xs bg-craft-mint/10 text-craft-mint border-craft-mint/20 font-medium"
          >
            {service.badge}
          </Badge>
        </div>
        <CardTitle className="text-xl font-bold text-craft-gray-900 mb-2">
          {service.title}
        </CardTitle>
      </CardHeader>
      
      <CardContent className="flex-1 flex flex-col justify-between">
        <div className="space-y-6">
          <CardDescription className="text-base text-craft-gray-600 leading-relaxed">
            {service.description}
          </CardDescription>
          
          <div className="space-y-3">
            {service.features.map((feature, featureIndex) => (
              <div 
                key={featureIndex} 
                className="flex items-center text-sm"
              >
                <div className="w-2 h-2 bg-craft-mint rounded-full mr-3 flex-shrink-0" />
                <span className="text-craft-gray-600 font-medium">
                  {feature}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="flex gap-2 pt-6 mt-auto">
          <Button 
            variant="outline" 
            size="sm" 
            className="flex-1 craft-button-secondary group/btn"
          >
            {t("services.learnMore")}
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            className="px-3 craft-button-secondary"
          >
            <ExternalLink className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ServiceCardComponent;
