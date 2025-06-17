
import { useState } from "react";
import { X, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/context/LanguageContext";

const SupportBanner = () => {
  const [isVisible, setIsVisible] = useState(() => {
    return !localStorage.getItem('support-banner-dismissed');
  });
  const { t } = useLanguage();

  const handleDismiss = () => {
    setIsVisible(false);
    localStorage.setItem('support-banner-dismissed', 'true');
  };

  if (!isVisible) return null;

  return (
    <div className="bg-gradient-to-r from-blue-600/90 to-purple-600/90 backdrop-blur-sm border-b border-blue-500/20 relative">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 flex-1">
            <Heart className="h-5 w-5 text-red-400 animate-pulse" />
            <div className="text-sm text-white">
              <span className="font-medium">Supporting Free Education & Services:</span>
              <span className="ml-2">We show ads to keep our courses, tools, and services completely free for everyone.</span>
              <a 
                href="/support" 
                className="ml-2 underline hover:text-blue-200 transition-colors font-medium"
              >
                Learn how you can help →
              </a>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleDismiss}
            className="text-white hover:bg-white/10 h-8 w-8 p-0 flex-shrink-0"
            aria-label="Dismiss support banner"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SupportBanner;
