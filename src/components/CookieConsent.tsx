
import React, { useState } from "react";
import { Shield, ChevronDown, ChevronUp } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/context/LanguageContext";
import { useIsMobile } from "@/hooks/use-mobile";
import { useCookieConsent } from "@/hooks/use-cookie-consent";
import { CookiePreferencesProvider } from "@/context/CookiePreferencesContext";
import { CookieDetails } from "./cookies/CookieDetails";
import { CookieActions } from "./cookies/CookieActions";

export const CookieConsent: React.FC = () => {
  const [showDetails, setShowDetails] = useState(false);
  const { t } = useLanguage();
  const isMobile = useIsMobile();
  const { showBanner, setShowBanner } = useCookieConsent();

  return (
    <CookiePreferencesProvider>
      <Dialog open={showBanner} onOpenChange={setShowBanner}>
        <DialogContent className={`sm:max-w-md ${isMobile ? 'p-4' : 'p-6'} rounded-xl bg-card border-border`}>
          <DialogHeader className="space-y-3">
            <DialogTitle className="flex items-center gap-2 text-xl">
              <Shield className="h-5 w-5 text-primary" />
              {t('cookie.title') || "Cookie Preferences"}
            </DialogTitle>
            <DialogDescription className="text-sm">
              {t('cookie.description') || 
                "We use cookies to enhance your browsing experience, analyze site traffic, and personalize content. Select your preferences below."}
            </DialogDescription>
          </DialogHeader>
          
          <div className="flex items-center justify-between py-2">
            <Button
              variant="ghost"
              size="sm"
              className="flex items-center text-sm"
              onClick={() => setShowDetails(!showDetails)}
            >
              {showDetails ? <ChevronUp className="h-4 w-4 mr-1" /> : <ChevronDown className="h-4 w-4 mr-1" />}
              {showDetails ? t('cookie.hideDetails') || "Hide details" : t('cookie.showDetails') || "Show details"}
            </Button>
          </div>

          <CookieDetails showDetails={showDetails} />
          <CookieActions />
        </DialogContent>
      </Dialog>
    </CookiePreferencesProvider>
  );
};

export default CookieConsent;
