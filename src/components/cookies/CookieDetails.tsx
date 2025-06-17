
import React from "react";
import { CheckCircle2, Info } from "lucide-react";
import { CookieOption } from "./CookieOption";
import { useCookieConsent } from "@/hooks/use-cookie-consent";

interface CookieDetailsProps {
  showDetails: boolean;
}

export function CookieDetails({ showDetails }: CookieDetailsProps) {
  const { cookiePreferences, saveCookiePreferences } = useCookieConsent();

  if (!showDetails) return null;

  const handleTogglePreference = (key: keyof typeof cookiePreferences) => {
    if (key === "necessary") return; // Cannot toggle necessary cookies
    const newPreferences = {
      ...cookiePreferences,
      [key]: !cookiePreferences[key],
    };
    saveCookiePreferences(newPreferences);
  };

  return (
    <div className="space-y-4 mb-4 max-h-[30vh] overflow-y-auto">
      <CookieOption
        type="necessary"
        icon={CheckCircle2}
        iconColor="text-green-500"
        checked={cookiePreferences.necessary}
        disabled={true}
        onToggle={() => {}}
      />

      <CookieOption
        type="analytics"
        icon={Info}
        iconColor="text-blue-500"
        checked={cookiePreferences.analytics}
        onToggle={() => handleTogglePreference("analytics")}
      />

      <CookieOption
        type="marketing"
        icon={Info}
        iconColor="text-purple-500"
        checked={cookiePreferences.marketing}
        onToggle={() => handleTogglePreference("marketing")}
      />

      <CookieOption
        type="preferences"
        icon={Info}
        iconColor="text-orange-500"
        checked={cookiePreferences.preferences}
        onToggle={() => handleTogglePreference("preferences")}
      />
    </div>
  );
}
