
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
      className="card-transform-3d bg-card rounded-xl p-4 sm:p-5 md:p-6 shadow-3d border border-border h-full flex flex-col group"
    >
      <div className="mb-3 sm:mb-4 p-2 sm:p-3 rounded-full bg-primary/10 w-fit">
        <IconComponent className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
      </div>
      
      <h3 className="text-lg sm:text-xl font-bold mb-2 leading-tight">{title}</h3>
      
      <p className="text-muted-foreground mb-3 sm:mb-4 flex-grow text-sm sm:text-base leading-relaxed">{description}</p>
      
      <div className="mt-auto">
        <div className="text-base sm:text-lg font-bold mb-3 sm:mb-4">{price}</div>
        
        <Button 
          onClick={onSelect}
          className="w-full min-h-[44px] text-sm sm:text-base"
          variant="default"
        >
          Request Service
        </Button>
      </div>
      
      <div className="absolute -top-10 -right-10 w-32 h-32 sm:w-40 sm:h-40 bg-primary/10 rounded-full blur-2xl opacity-60 group-hover:opacity-100 transition-opacity"></div>
      <div className="absolute -bottom-10 -left-10 w-32 h-32 sm:w-40 sm:h-40 bg-secondary/10 rounded-full blur-2xl opacity-60 group-hover:opacity-100 transition-opacity"></div>
    </div>
  );
};

export default ServiceCard;
