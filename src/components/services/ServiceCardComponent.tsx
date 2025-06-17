
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
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
  const { language } = useLanguage();

  return (
    <Card className="group relative bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 hover:border-orange-500/50 transition-all duration-300 hover:shadow-2xl hover:shadow-orange-500/10 hover:-translate-y-2 animate-on-scroll">
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      
      <CardHeader className="pb-4 relative z-10">
        <div className="flex items-center justify-between mb-4">
          <div className={`p-3 rounded-xl bg-gradient-to-br ${service.color} p-0.5`}>
            <div className="w-full h-full bg-slate-800 rounded-lg p-2">
              <service.icon className="h-6 w-6 text-white" />
            </div>
          </div>
          <Badge variant="secondary" className="text-xs bg-slate-700/50 text-slate-300 border-slate-600">
            {service.badge}
          </Badge>
        </div>
        <CardTitle className="text-lg font-bold text-white group-hover:text-orange-400 transition-colors">
          {service.title}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 relative z-10">
        <CardDescription className="text-sm text-slate-400 leading-relaxed group-hover:text-slate-300 transition-colors">
          {service.description}
        </CardDescription>
        
        <div className="space-y-2">
          {service.features.map((feature, featureIndex) => (
            <div key={featureIndex} className="flex items-center text-sm">
              <div className="w-1.5 h-1.5 bg-orange-400 rounded-full mr-2 flex-shrink-0" />
              <span className="text-slate-400 group-hover:text-slate-300 transition-colors">{feature}</span>
            </div>
          ))}
        </div>

        <Button 
          variant="ghost" 
          size="sm" 
          className="w-full group/btn hover:bg-orange-500/10 mt-4 text-slate-300 hover:text-orange-400 border border-slate-600 hover:border-orange-500/50"
        >
          {language === 'en' ? 'Learn More' : language === 'fr' ? 'En Savoir Plus' : 'اعرف المزيد'}
          <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
        </Button>
      </CardContent>
      
      {/* Bottom gradient line */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-orange-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-b-xl"></div>
    </Card>
  );
};

export default ServiceCardComponent;
