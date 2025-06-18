
import React from "react";
import {
  Code,
  LifeBuoy,
  Layout,
  Monitor,
  Search,
  Shield,
  LucideIcon
} from "lucide-react";
import { Button } from "@/components/ui/button";

type ServiceIconType = "Code" | "LifeBuoy" | "Layout" | "Monitor" | "Search" | "Shield";

interface ServiceCardProps {
  id: string;
  title: string;
  description: string;
  price: string;
  icon: ServiceIconType;
  onSelect: () => void;
}

const ServiceCard = ({ id, title, description, price, icon, onSelect }: ServiceCardProps) => {
  const IconComponents: Record<ServiceIconType, LucideIcon> = {
    Code,
    LifeBuoy,
    Layout,
    Monitor,
    Search,
    Shield
  };

  const IconComponent = IconComponents[icon];

  return (
    <div 
      id={id}
      className="group p-8 rounded-3xl bg-gradient-to-br from-slate-800/60 to-slate-900/60 backdrop-blur-sm border border-slate-700/50 hover:border-blue-500/50 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/20 h-full flex flex-col relative overflow-hidden"
    >
      {/* Background glow effects */}
      <div className="absolute -top-10 -right-10 w-32 h-32 bg-blue-500/10 rounded-full blur-2xl opacity-60 group-hover:opacity-100 transition-opacity" />
      <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-emerald-500/10 rounded-full blur-2xl opacity-60 group-hover:opacity-100 transition-opacity" />
      
      <div className="relative z-10 flex flex-col h-full">
        <div className="mb-6 p-4 rounded-2xl bg-gradient-to-r from-blue-500/20 to-emerald-500/20 w-fit">
          <IconComponent className="h-8 w-8 text-blue-400" />
        </div>
        
        <h3 className="text-2xl font-bold mb-4 text-white">{title}</h3>
        
        <p className="text-slate-300 mb-6 flex-grow leading-relaxed">{description}</p>
        
        <div className="mt-auto">
          <div className="text-2xl font-bold mb-6 text-emerald-400">{price}</div>
          
          <Button 
            onClick={onSelect}
            className="w-full h-12 bg-gradient-to-r from-blue-600 to-emerald-600 hover:from-blue-700 hover:to-emerald-700 text-white shadow-elevation-3 hover:shadow-elevation-4 transition-all duration-300"
            variant="default"
          >
            Request Service
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ServiceCard;
