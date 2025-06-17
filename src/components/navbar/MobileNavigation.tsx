
import { useState } from "react";
import { Menu, X, Briefcase, Search, MessageSquare, MessageCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { SearchBar } from "../SearchBar";
import { LanguageSelector } from "../LanguageSelector";
import { ThemeToggle } from "../ThemeToggle";
import { useLanguage } from "@/context/LanguageContext";

export function MobileNavigation() {
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useLanguage();

  const mainNavigation = [
    { name: t("nav.findJobs"), href: "/jobs", icon: Briefcase },
    { name: t("nav.findFreelancers"), href: "/freelancers", icon: Search },
    { name: t("nav.services"), href: "/services", icon: null },
    { name: t("nav.academy"), href: "/academy", icon: null },
  ];

  return (
    <>
      {/* Mobile Navigation Trigger */}
      <div className="flex items-center lg:hidden">
        <LanguageSelector />
        <ThemeToggle />
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="ml-2 p-2 rounded-md hover:bg-accent"
          aria-label="Toggle Menu"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="lg:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 bg-background/95 backdrop-blur-lg shadow-lg border-t">
            <div className="px-3 py-2">
              <SearchBar />
            </div>
            
            {mainNavigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className="flex items-center gap-2 px-3 py-2 text-base font-medium hover:bg-accent rounded-md transition-colors"
                onClick={() => setIsOpen(false)}
              >
                {item.icon && <item.icon className="h-4 w-4" />}
                {item.name}
              </Link>
            ))}
            
            <hr className="border-border my-2" />
            
            <Link
              to="/post-job"
              className="block px-3 py-2 text-base font-medium hover:bg-accent rounded-md transition-colors"
              onClick={() => setIsOpen(false)}
            >
              {t("nav.postJob")}
            </Link>

            <Link
              to="/newsletter"
              className="block px-3 py-2 text-base font-medium hover:bg-accent rounded-md transition-colors"
              onClick={() => setIsOpen(false)}
            >
              {t("nav.newsletter")}
            </Link>
            
            <Link
              to="/imei-check"
              className="block px-3 py-2 text-base font-medium hover:bg-accent rounded-md transition-colors text-green-600"
              onClick={() => setIsOpen(false)}
            >
              {t("nav.freeImeiCheck")}
            </Link>
            
            <a
              href="https://t.me/zwanski_tech"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-3 py-2 text-base font-medium hover:bg-accent rounded-md transition-colors text-blue-600"
              onClick={() => setIsOpen(false)}
            >
              <MessageSquare className="h-4 w-4" />
              {t("nav.joinTelegram")}
            </a>
            
            <Link
              to="/chat"
              className="flex items-center gap-2 px-3 py-2 text-base font-medium hover:bg-accent rounded-md transition-colors"
              onClick={() => setIsOpen(false)}
            >
              <MessageCircle className="h-4 w-4" />
              {t("nav.liveChat")}
            </Link>
          </div>
        </div>
      )}
    </>
  );
}
