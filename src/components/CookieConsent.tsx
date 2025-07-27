
import React, { useState } from "react";
import { Shield, ChevronDown, ChevronUp } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/context/LanguageContext";
import { useCookieConsent } from "@/hooks/use-cookie-consent";
import { CookieDetails } from "./cookies/CookieDetails";
import { CookieActions } from "./cookies/CookieActions";

export const CookieConsent: React.FC = () => {
  const [showDetails, setShowDetails] = useState(false);
  const [showSheet, setShowSheet] = useState(false);
  const { t } = useLanguage();
  const { showBanner, handleAcceptAll } = useCookieConsent();

  if (!showBanner) return null;

  const handleAcceptAllClick = () => {
    handleAcceptAll();
  };

  const handleSettingsClick = () => {
    setShowSheet(true);
  };

  return (
    <>
      <div className="fixed bottom-0 left-0 right-0 z-[9999] flex justify-center p-2">
        <div className="bg-card border border-border rounded-lg shadow-lg w-full max-w-md mx-auto">
          <div className="p-3 sm:p-4">
            <div className="flex items-start justify-between gap-2">
              <div className="flex items-center gap-2">
                <Shield className="h-4 w-4 text-primary" />
                <p className="text-sm font-medium">
                  {t('cookie.title')}
                </p>
              </div>
              <div className="flex items-center gap-1">
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-7 px-1.5 text-xs"
                  onClick={handleSettingsClick}
                >
                  {t('cookie.settings')}
                </Button>
                <Button
                  variant="default"
                  size="sm"
                  className="h-7 px-2 text-xs"
                  onClick={handleAcceptAllClick}
                >
                  {t('cookie.acceptAll')}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <Sheet open={showSheet} onOpenChange={setShowSheet}>
        <SheetTrigger asChild>
          <button className="hidden" aria-label="Open cookie settings" />
        </SheetTrigger>
        <SheetContent className="sm:max-w-md">
          <SheetHeader className="space-y-3">
            <SheetTitle className="flex items-center gap-2 text-xl">
              <Shield className="h-5 w-5 text-primary" />
              {t('cookie.title')}
            </SheetTitle>
            <SheetDescription className="text-sm">
              {t('cookie.description')}
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
              {showDetails ? t('cookie.hideDetails') : t('cookie.showDetails')}
            </Button>
          </div>

          <CookieDetails showDetails={showDetails} />
          <CookieActions onClose={() => setShowSheet(false)} />
        </SheetContent>
      </Sheet>
    </>
  );
};

export default CookieConsent;
