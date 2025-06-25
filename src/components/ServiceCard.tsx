
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
      className="relative bg-gradient-to-br from-slate-800/60 to-slate-900/60 backdrop-blur-md border border-purple-500/30 rounded-xl p-3 sm:p-4 md:p-5 lg:p-6 h-full flex flex-col group overflow-hidden max-w-full hover:border-purple-400/50 transition-all duration-500 hover:shadow-2xl hover:shadow-purple-500/25 hover:-translate-y-2"
    >
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-blue-500/10 to-indigo-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl"></div>
      
      {/* Icon with enhanced styling */}
      <div className="mb-2 sm:mb-3 md:mb-4 p-1.5 sm:p-2 md:p-3 rounded-full bg-gradient-to-br from-purple-500/20 to-blue-500/20 w-fit flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
        <IconComponent className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 text-purple-400 group-hover:text-purple-300 transition-colors duration-300" />
      </div>
      
      <h3 className="text-base sm:text-lg md:text-xl font-bold mb-1.5 sm:mb-2 leading-tight break-words text-white group-hover:text-purple-300 transition-colors duration-300">{title}</h3>
      
      <p className="text-slate-400 group-hover:text-slate-300 mb-2 sm:mb-3 md:mb-4 flex-grow text-xs sm:text-sm md:text-base leading-relaxed break-words transition-colors duration-300">{description}</p>
      
      <div className="mt-auto">
        <div className="text-sm sm:text-base md:text-lg font-bold mb-2 sm:mb-3 md:mb-4 break-words bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">{price}</div>
        
        <Button 
          onClick={onSelect}
          className="w-full min-h-[40px] sm:min-h-[44px] text-xs sm:text-sm md:text-base px-2 sm:px-4 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white shadow-lg hover:shadow-xl transition-all duration-300"
          variant="default"
        >
          Request Service
        </Button>
      </div>
      
      {/* Enhanced floating elements */}
      <div className="absolute -top-8 -right-8 sm:-top-10 sm:-right-10 w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 bg-purple-500/10 rounded-full blur-2xl opacity-60 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
      <div className="absolute -bottom-8 -left-8 sm:-bottom-10 sm:-left-10 w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 bg-blue-500/10 rounded-full blur-2xl opacity-60 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
    </div>
  );
};

export default ServiceCard;
