
import React, { useState, useEffect } from "react";
import { Shield, CheckCircle2, Info, X, ChevronDown, ChevronUp } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { useLanguage } from "@/context/LanguageContext";
import { useIsMobile } from "@/hooks/use-mobile";

type CookiePreferences = {
  necessary: boolean;
  analytics: boolean;
  marketing: boolean;
  preferences: boolean;
};

export const CookieConsent: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const { t } = useLanguage();
  const isMobile = useIsMobile();
  
  const [cookiePreferences, setCookiePreferences] = useState<CookiePreferences>({
    necessary: true, // Always required
    analytics: false,
    marketing: false,
    preferences: false,
  });

  // Check if cookie preferences are already set
  useEffect(() => {
    const consentCookie = getCookie("cookie-consent");
    if (!consentCookie) {
      // If no cookie is set, show the dialog
      setOpen(true);
    } else {
      // Parse the cookie and set preferences
      try {
        const savedPreferences = JSON.parse(consentCookie);
        setCookiePreferences(savedPreferences);
      } catch (e) {
        console.error("Error parsing cookie consent:", e);
      }
    }
  }, []);

  const handleAcceptAll = () => {
    const allAccepted = {
      necessary: true,
      analytics: true,
      marketing: true,
      preferences: true,
    };
    setCookiePreferences(allAccepted);
    saveCookiePreferences(allAccepted);
    setOpen(false);
  };

  const handleAcceptSelected = () => {
    saveCookiePreferences(cookiePreferences);
    setOpen(false);
  };

  const handleRejectAll = () => {
    const onlyNecessary = {
      necessary: true,
      analytics: false,
      marketing: false,
      preferences: false,
    };
    setCookiePreferences(onlyNecessary);
    saveCookiePreferences(onlyNecessary);
    setOpen(false);
  };

  const handleTogglePreference = (key: keyof CookiePreferences) => {
    if (key === "necessary") return; // Cannot toggle necessary cookies
    setCookiePreferences((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const saveCookiePreferences = (preferences: CookiePreferences) => {
    // Set cookie for 6 months
    const expiryDate = new Date();
    expiryDate.setMonth(expiryDate.getMonth() + 6);
    document.cookie = `cookie-consent=${JSON.stringify(
      preferences
    )}; expires=${expiryDate.toUTCString()}; path=/; SameSite=Lax`;
    
    // Here you would typically initialize your analytics/marketing tools
    // based on the user's preferences
    console.log("Cookie preferences saved:", preferences);
  };

  const getCookie = (name: string): string | null => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop()?.split(";").shift() || null;
    return null;
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className={`sm:max-w-md ${isMobile ? 'p-4' : 'p-6'} rounded-xl`}>
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

        {showDetails && (
          <div className="space-y-4 mb-4 max-h-[30vh] overflow-y-auto">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-green-500" />
                  <h3 className="font-medium">{t('cookie.necessary') || "Necessary"}</h3>
                </div>
                <Switch checked={cookiePreferences.necessary} disabled />
              </div>
              <p className="text-xs text-muted-foreground pl-6">
                {t('cookie.necessaryDescription') || 
                  "These cookies are essential for the website to function properly."}
              </p>
              <Separator />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Info className="h-4 w-4 text-blue-500" />
                  <h3 className="font-medium">{t('cookie.analytics') || "Analytics"}</h3>
                </div>
                <Switch 
                  checked={cookiePreferences.analytics}
                  onCheckedChange={() => handleTogglePreference("analytics")}
                />
              </div>
              <p className="text-xs text-muted-foreground pl-6">
                {t('cookie.analyticsDescription') || 
                  "Help us improve our website by collecting and reporting information on how you use it."}
              </p>
              <Separator />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Info className="h-4 w-4 text-purple-500" />
                  <h3 className="font-medium">{t('cookie.marketing') || "Marketing"}</h3>
                </div>
                <Switch 
                  checked={cookiePreferences.marketing}
                  onCheckedChange={() => handleTogglePreference("marketing")}
                />
              </div>
              <p className="text-xs text-muted-foreground pl-6">
                {t('cookie.marketingDescription') || 
                  "Used to track visitors across websites to display relevant advertisements."}
              </p>
              <Separator />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Info className="h-4 w-4 text-orange-500" />
                  <h3 className="font-medium">{t('cookie.preferences') || "Preferences"}</h3>
                </div>
                <Switch 
                  checked={cookiePreferences.preferences}
                  onCheckedChange={() => handleTogglePreference("preferences")}
                />
              </div>
              <p className="text-xs text-muted-foreground pl-6">
                {t('cookie.preferencesDescription') || 
                  "Enable the website to remember your preferences and settings for a better experience."}
              </p>
            </div>
          </div>
        )}

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
              className={`${isMobile ? 'flex-1' : ''}`}
            >
              {t('cookie.acceptAll') || "Accept All"}
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CookieConsent;
