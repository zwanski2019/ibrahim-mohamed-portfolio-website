
import React, { useState } from "react";
import { Shield, ChevronDown, ChevronUp } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
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

  if (!showBanner) return null;

  return (
    <CookiePreferencesProvider>
      <div className="fixed bottom-0 left-0 right-0 z-50 flex justify-center p-2">
        <div className="bg-card border border-border rounded-lg shadow-lg w-full max-w-md mx-auto">
          <div className="p-3 sm:p-4">
            <div className="flex items-start justify-between gap-2">
              <div className="flex items-center gap-2">
                <Shield className="h-4 w-4 text-primary" />
                <p className="text-sm font-medium">
                  {t('cookie.title') || "Cookie Preferences"}
                </p>
              </div>
              <div className="flex items-center gap-1">
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-7 px-1.5 text-xs"
                  onClick={() => {
                    const sheet = document.getElementById('cookie-settings-sheet');
                    if (sheet) {
                      const sheetTriggerEvent = new MouseEvent('click', {
                        bubbles: true,
                        cancelable: true,
                        view: window
                      });
                      sheet.dispatchEvent(sheetTriggerEvent);
                    }
                  }}
                >
                  {t('cookie.settings') || "Settings"}
                </Button>
                <Button
                  variant="default"
                  size="sm"
                  className="h-7 px-2 text-xs"
                  onClick={() => {
                    const { handleAcceptAll } = useCookieConsent();
                    handleAcceptAll();
                  }}
                >
                  {t('cookie.acceptAll') || "Accept All"}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <Sheet>
        <Button 
          id="cookie-settings-sheet" 
          className="hidden"
          onClick={() => setShowBanner(true)}
        >
          Hidden Trigger
        </Button>
        <SheetContent className="sm:max-w-md">
          <SheetHeader className="space-y-3">
            <SheetTitle className="flex items-center gap-2 text-xl">
              <Shield className="h-5 w-5 text-primary" />
              {t('cookie.title') || "Cookie Preferences"}
            </SheetTitle>
            <SheetDescription className="text-sm">
              {t('cookie.description') || 
                "We use cookies to enhance your browsing experience, analyze site traffic, and personalize content. Select your preferences below."}
            </SheetDescription>
          </SheetHeader>
          
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
        </SheetContent>
      </Sheet>
    </CookiePreferencesProvider>
  );
};

export default CookieConsent;
