import React, { useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { ZwanskiLogo } from "@/components/ZwanskiLogo";
import { Link } from "react-router-dom";
import { useLanguage } from "@/hooks/useLanguage";

export const MobileNavigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useLanguage();

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <>
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon" className="lg:hidden">
            <Menu className="h-6 w-6" />
            <span className="sr-only">Toggle menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-80">
          <SheetHeader>
            <SheetTitle className="flex items-center gap-2">
              <ZwanskiLogo className="h-6 w-6" />
              Zwanski Tech
            </SheetTitle>
          </SheetHeader>
          <nav className="flex flex-col space-y-4 mt-8">
            <Link 
              to="/" 
              className="text-foreground hover:text-primary transition-colors font-medium py-2"
              onClick={() => setIsOpen(false)}
            >
              {t('nav.home')}
            </Link>
            <Link 
              to="/services" 
              className="text-foreground hover:text-primary transition-colors font-medium py-2"
              onClick={() => setIsOpen(false)}
            >
              {t('nav.services')}
            </Link>
            <Link 
              to="/about" 
              className="text-foreground hover:text-primary transition-colors font-medium py-2"
              onClick={() => setIsOpen(false)}
            >
              {t('nav.about')}
            </Link>
            <Link 
              to="/forum" 
              className="text-foreground hover:text-primary transition-colors font-medium py-2"
              onClick={() => setIsOpen(false)}
            >
              Forum
            </Link>
            <Link 
              to="/academy" 
              className="text-foreground hover:text-primary transition-colors font-medium py-2"
              onClick={() => setIsOpen(false)}
            >
              {t('nav.academy')}
            </Link>
            <Link 
              to="/jobs" 
              className="text-foreground hover:text-primary transition-colors font-medium py-2"
              onClick={() => setIsOpen(false)}
            >
              {t('nav.jobs')}
            </Link>
            <Link 
              to="/freelancers" 
              className="text-foreground hover:text-primary transition-colors font-medium py-2"
              onClick={() => setIsOpen(false)}
            >
              {t('nav.freelancers')}
            </Link>
            <Link 
              to="/community" 
              className="text-foreground hover:text-primary transition-colors font-medium py-2"
              onClick={() => setIsOpen(false)}
            >
              {t('nav.community')}
            </Link>
            <Link 
              to="/chat" 
              className="text-foreground hover:text-primary transition-colors font-medium py-2"
              onClick={() => setIsOpen(false)}
            >
              {t('nav.chat')}
            </Link>
            <Link 
              to="/imei-check" 
              className="text-foreground hover:text-primary transition-colors font-medium py-2"
              onClick={() => setIsOpen(false)}
            >
              {t('nav.imeiCheck')}
            </Link>
            <Link 
              to="/support" 
              className="text-foreground hover:text-primary transition-colors font-medium py-2"
              onClick={() => setIsOpen(false)}
            >
              {t('nav.support')}
            </Link>
          </nav>
        </SheetContent>
      </Sheet>
    </>
  );
};
