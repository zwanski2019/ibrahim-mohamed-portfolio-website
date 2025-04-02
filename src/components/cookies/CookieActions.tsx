
import React from "react";
import { Button } from "@/components/ui/button";
import { DialogFooter } from "@/components/ui/dialog";
import { useLanguage } from "@/context/LanguageContext";
import { useCookiePreferences } from "@/context/CookiePreferencesContext";
import { useIsMobile } from "@/hooks/use-mobile";

export function CookieActions() {
  const { t } = useLanguage();
  const isMobile = useIsMobile();
  const { handleAcceptAll, handleAcceptSelected, handleRejectAll } = useCookiePreferences();

  return (
    <DialogFooter className={`flex ${isMobile ? 'flex-col gap-2' : 'sm:justify-between'} pt-2`}>
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
    </DialogFooter>
  );
}
