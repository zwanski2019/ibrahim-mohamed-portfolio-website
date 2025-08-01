
import React from "react";
import {
  Code,
  LifeBuoy,
  Layout,
  Monitor,
  Search,
  Shield,
  HardDrive,
  Smartphone,
  Database,
  LucideIcon
} from "lucide-react";
import { Button, Card } from "@/components/heroui";

type ServiceIconType = "Code" | "LifeBuoy" | "Layout" | "Monitor" | "Search" | "Shield" | "HardDrive" | "Smartphone" | "Database";

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
    Shield,
    HardDrive,
    Smartphone,
    Database
  };

  const IconComponent = IconComponents[icon];

  return (
    <Card
      id={id}
      className="card-transform-3d bg-card rounded-xl p-6 shadow-3d border border-border h-full flex flex-col group"
    >
      <div className="mb-4 p-3 rounded-full bg-primary/10 w-fit">
        <IconComponent className="h-6 w-6 text-primary" />
      </div>
      
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      
      <p className="text-muted-foreground mb-4 flex-grow">{description}</p>
      
      <div className="mt-auto">
        <div className="text-lg font-bold mb-4">{price}</div>
        
        <Button 
          onClick={onSelect}
          className="w-full"
          variant="default"
        >
          Request Service
        </Button>
      </div>
      
      <div className="absolute -top-10 -right-10 w-40 h-40 bg-primary/10 rounded-full blur-2xl opacity-60 group-hover:opacity-100 transition-opacity"></div>
      <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-secondary/10 rounded-full blur-2xl opacity-60 group-hover:opacity-100 transition-opacity"></div>
    </Card>
  );
};

export default ServiceCard;
