
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
      className="craft-card hover-lift h-full flex flex-col group"
    >
      <div className="mb-4 p-3 rounded-xl craft-hero-gradient w-fit">
        <IconComponent className="h-6 w-6 text-craft-mint" />
      </div>
      
      <h3 className="text-xl font-bold text-craft-gray-900 mb-2">{title}</h3>
      
      <p className="text-craft-gray-600 mb-4 flex-grow leading-relaxed">{description}</p>
      
      <div className="mt-auto">
        <div className="text-lg font-bold text-craft-gray-900 mb-4">{price}</div>
        
        <Button 
          onClick={onSelect}
          className="w-full craft-button-primary"
        >
          Request Service
        </Button>
      </div>
    </div>
  );
};

export default ServiceCard;
