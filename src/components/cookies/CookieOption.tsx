
import React from "react";
import { LucideIcon } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { useLanguage } from "@/context/LanguageContext";

interface CookieOptionProps {
  type: "necessary" | "analytics" | "marketing" | "preferences";
  icon: LucideIcon;
  iconColor: string;
  checked: boolean;
  disabled?: boolean;
  onToggle: () => void;
}

export function CookieOption({
  type,
  icon: Icon,
  iconColor,
  checked,
  disabled = false,
  onToggle,
}: CookieOptionProps) {
  const { t } = useLanguage();

  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <Icon className={`h-3.5 w-3.5 ${iconColor}`} />
          <h3 className="text-sm font-medium">{t(`cookie.${type}`) || type.charAt(0).toUpperCase() + type.slice(1)}</h3>
        </div>
        <Switch 
          checked={checked}
          onCheckedChange={onToggle}
          disabled={disabled}
          className="scale-90"
        />
      </div>
      <p className="text-xs text-muted-foreground pl-5">
        {t(`cookie.${type}Description`) || 
          `Cookie preference for ${type}`}
      </p>
      <Separator className="my-1" />
    </div>
  );
}
