import React from "react";
import { Link } from "react-router-dom";

import { useLanguage } from "@/hooks/useLanguage";
import { MoreDropdown } from "@/components/navbar/MoreDropdown";

export const DesktopNavigation = () => {
  const { t } = useLanguage();

  return (
    <nav className="hidden lg:flex items-center space-x-8">
      <Link 
        to="/" 
        className="text-foreground hover:text-primary transition-colors font-medium"
      >
        {t('nav.home')}
      </Link>
      <Link 
        to="/services" 
        className="text-foreground hover:text-primary transition-colors font-medium"
      >
        {t('nav.services')}
      </Link>
      <Link 
        to="/about" 
        className="text-foreground hover:text-primary transition-colors font-medium"
      >
        {t('nav.about')}
      </Link>
      <Link 
        to="/forum" 
        className="text-foreground hover:text-primary transition-colors font-medium"
      >
        Forum
      </Link>
      <MoreDropdown />
    </nav>
  );
};
