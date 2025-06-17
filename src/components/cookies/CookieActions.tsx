
import React from "react";
import { Button } from "@/components/ui/button";
import { SheetFooter } from "@/components/ui/sheet";
import { useLanguage } from "@/context/LanguageContext";
import { useCookieConsent } from "@/hooks/use-cookie-consent";
import { useIsMobile } from "@/hooks/use-mobile";

interface CookieActionsProps {
  onClose: () => void;
}

export function CookieActions({ onClose }: CookieActionsProps) {
  const { t } = useLanguage();
  const isMobile = useIsMobile();
  const { cookiePreferences, saveCookiePreferences } = useCookieConsent();

  const handleAcceptAll = () => {
    const allAccepted = {
      necessary: true,
      analytics: true,
      marketing: true,
      preferences: true,
    };
    saveCookiePreferences(allAccepted);
    onClose();
  };

  const handleAcceptSelected = () => {
    saveCookiePreferences(cookiePreferences);
    onClose();
  };

  const handleRejectAll = () => {
    const onlyNecessary = {
      necessary: true,
      analytics: false,
      marketing: false,
      preferences: false,
    };
    saveCookiePreferences(onlyNecessary);
    onClose();
  };

  return (
    <SheetFooter className={`flex ${isMobile ? 'flex-col gap-2' : 'sm:justify-between'} pt-2`}>
      <Button 
        variant="outline" 
        onClick={handleRejectAll}
        className={`${isMobile ? 'w-full' : ''}`}
      >
        {t('cookie.rejectAll') || "Reject All"}
      </Button>
      <div className={`flex gap-2 ${isMobile ? 'w-full' : ''}`}>
        <Button 
          variant="outline" 
          onClick={handleAcceptSelected}
          className={`${isMobile ? 'flex-1' : ''}`}
        >
          {t('cookie.acceptSelected') || "Accept Selected"}
        </Button>
        <Button 
          onClick={handleAcceptAll}
          className={`${isMobile ? 'flex-1' : ''} bg-primary text-primary-foreground hover:bg-primary/90`}
        >
          {t('cookie.acceptAll') || "Accept All"}
        </Button>
      </div>
    </SheetFooter>
  );
}
