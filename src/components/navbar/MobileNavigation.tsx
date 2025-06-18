
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
      <div className="flex items-center lg:hidden space-x-2">
        <LanguageSelector />
        <ThemeToggle />
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 rounded-md hover:bg-accent transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
          aria-label="Toggle Menu"
        >
          {isOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <>
          <div 
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 lg:hidden"
            onClick={() => setIsOpen(false)}
          />
          <div className="fixed top-[73px] left-0 right-0 z-50 lg:hidden">
            <div className="bg-background/95 backdrop-blur-lg shadow-xl border-b max-h-[calc(100vh-73px)] overflow-y-auto">
              <div className="p-4 space-y-4">
                <div className="mb-4">
                  <SearchBar />
                </div>
                
                <div className="space-y-2">
                  {mainNavigation.map((item) => (
                    <Link
                      key={item.name}
                      to={item.href}
                      className="flex items-center gap-3 px-4 py-3 text-base font-medium hover:bg-accent rounded-lg transition-colors min-h-[44px]"
                      onClick={() => setIsOpen(false)}
                    >
                      {item.icon && <item.icon className="h-5 w-5" />}
                      {item.name}
                    </Link>
                  ))}
                  
                  <hr className="border-border my-4" />
                  
                  <Link
                    to="/post-job"
                    className="flex items-center px-4 py-3 text-base font-medium hover:bg-accent rounded-lg transition-colors min-h-[44px]"
                    onClick={() => setIsOpen(false)}
                  >
                    {t("nav.postJob")}
                  </Link>

                  <Link
                    to="/newsletter"
                    className="flex items-center px-4 py-3 text-base font-medium hover:bg-accent rounded-lg transition-colors min-h-[44px]"
                    onClick={() => setIsOpen(false)}
                  >
                    {t("nav.newsletter")}
                  </Link>
                  
                  <Link
                    to="/imei-check"
                    className="flex items-center px-4 py-3 text-base font-medium hover:bg-accent rounded-lg transition-colors text-green-600 min-h-[44px]"
                    onClick={() => setIsOpen(false)}
                  >
                    {t("nav.freeImeiCheck")}
                  </Link>
                  
                  <a
                    href="https://t.me/zwanski_tech"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 px-4 py-3 text-base font-medium hover:bg-accent rounded-lg transition-colors text-blue-600 min-h-[44px]"
                    onClick={() => setIsOpen(false)}
                  >
                    <MessageSquare className="h-5 w-5" />
                    {t("nav.joinTelegram")}
                  </a>
                  
                  <Link
                    to="/chat"
                    className="flex items-center gap-3 px-4 py-3 text-base font-medium hover:bg-accent rounded-lg transition-colors min-h-[44px]"
                    onClick={() => setIsOpen(false)}
                  >
                    <MessageCircle className="h-5 w-5" />
                    {t("nav.liveChat")}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
