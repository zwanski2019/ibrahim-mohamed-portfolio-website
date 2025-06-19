
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
      className="relative card-transform-3d bg-card rounded-xl p-3 sm:p-4 md:p-5 lg:p-6 shadow-3d border border-border h-full flex flex-col group overflow-hidden max-w-full"
    >
      <div className="mb-2 sm:mb-3 md:mb-4 p-1.5 sm:p-2 md:p-3 rounded-full bg-primary/10 w-fit flex-shrink-0">
        <IconComponent className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 text-primary" />
      </div>
      
      <h3 className="text-base sm:text-lg md:text-xl font-bold mb-1.5 sm:mb-2 leading-tight break-words">{title}</h3>
      
      <p className="text-muted-foreground mb-2 sm:mb-3 md:mb-4 flex-grow text-xs sm:text-sm md:text-base leading-relaxed break-words">{description}</p>
      
      <div className="mt-auto">
        <div className="text-sm sm:text-base md:text-lg font-bold mb-2 sm:mb-3 md:mb-4 break-words">{price}</div>
        
        <Button 
          onClick={onSelect}
          className="w-full min-h-[40px] sm:min-h-[44px] text-xs sm:text-sm md:text-base px-2 sm:px-4"
          variant="default"
        >
          Request Service
        </Button>
      </div>
      
      <div className="absolute -top-8 -right-8 sm:-top-10 sm:-right-10 w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 bg-primary/10 rounded-full blur-2xl opacity-60 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
      <div className="absolute -bottom-8 -left-8 sm:-bottom-10 sm:-left-10 w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 bg-secondary/10 rounded-full blur-2xl opacity-60 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
    </div>
  );
};

export default ServiceCard;
