
import { useState, useEffect } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { Button } from "@/components/ui/button";
import { X, Globe } from "lucide-react";
import { cn } from "@/lib/utils";

export function LanguageDetectionNotice() {
  const { language, wasAutoDetected, setLanguage } = useLanguage();
  const [isVisible, setIsVisible] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (wasAutoDetected) {
      // Show the notice after a short delay
      const timer = setTimeout(() => {
        setIsVisible(true);
        setIsAnimating(true);
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [wasAutoDetected]);

  const handleDismiss = () => {
    setIsAnimating(false);
    setTimeout(() => setIsVisible(false), 200);
  };

  const getLanguageName = (lang: string) => {
    const names = {
      en: "English",
      fr: "Français",
      ar: "العربية",
      ha: "Hausa",
      ber: "Tamaziɣt"
    };
    return names[lang as keyof typeof names] || lang;
  };

  const getMessage = () => {
    switch (language) {
      case 'fr':
        return `Nous avons détecté votre langue comme ${getLanguageName(language)}`;
      case 'ar':
        return `تم اكتشاف لغتك كـ ${getLanguageName(language)}`;
      case 'ha':
        return `Mun gano harshenku a matsayin ${getLanguageName(language)}`;
      case 'ber':
        return `Naf-d tutlayt-ik d ${getLanguageName(language)}`;
      default:
        return `We detected your language as ${getLanguageName(language)}`;
    }
  };

  if (!isVisible || !wasAutoDetected) return null;

  return (
    <div
      className={cn(
        "fixed top-20 right-4 z-40 bg-background/95 backdrop-blur-lg border rounded-lg shadow-lg p-4 max-w-sm transition-all duration-200",
        isAnimating ? "opacity-100 translate-x-0" : "opacity-0 translate-x-full"
      )}
    >
      <div className="flex items-center gap-3">
        <Globe className="h-5 w-5 text-primary" />
        <div className="flex-1">
          <p className="text-sm font-medium">{getMessage()}</p>
          <p className="text-xs text-muted-foreground mt-1">
            {language === 'fr' && "Vous pouvez changer cela à tout moment"}
            {language === 'ar' && "يمكنك تغيير هذا في أي وقت"}
            {language === 'ha' && "Kuna iya canza wannan koyaushe"}
            {language === 'ber' && "Tzemreḍ ad tbeddleḍ aya melmi tebɣiḍ"}
            {language === 'en' && "You can change this anytime"}
          </p>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={handleDismiss}
          className="h-8 w-8 p-0"
        >
          <X className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
