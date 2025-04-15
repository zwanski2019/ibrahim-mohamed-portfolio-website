
import { useState, useEffect } from "react";
import { Menu, X, ChevronDown, Sparkles, MessageCircle, ShoppingCart } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";
import { SearchBar } from "./SearchBar";
import { LanguageSelector } from "./LanguageSelector";
import { useLanguage } from "@/context/LanguageContext";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { t } = useLanguage();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      if (offset > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const navigation = [
    { name: t('nav.about'), href: "#about" },
    { name: t('nav.skills'), href: "#skills" },
    { name: t('nav.projects'), href: "#projects" },
    { name: t('nav.experience'), href: "#experience" },
    { name: t('nav.contact'), href: "#contact" },
  ];

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setIsOpen(false);
    }
  };

  return (
    <header
      className={`fixed top-12 left-0 right-0 z-50 transition-all duration-200 ${
        scrolled
          ? "py-2 bg-[#131921]/95 backdrop-blur-lg shadow-md border-b border-[#232f3e]/50"
          : "py-3 bg-gradient-to-r from-[#232f3e] to-[#131921]"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Link
              to="/"
              className="text-xl font-bold bg-gradient-to-r from-[#f90] to-[#f97316] text-transparent bg-clip-text"
              aria-label="Zwanski - Web Developer"
            >
              ZWANSKI
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <div className="mr-4">
              <SearchBar />
            </div>
            
            <NavigationMenu>
              <NavigationMenuList>
                {navigation.map((item) => (
                  <NavigationMenuItem key={item.name}>
                    <NavigationMenuLink
                      onClick={(e) => {
                        e.preventDefault();
                        scrollToSection(item.href);
                      }}
                      href={item.href}
                      className={cn(
                        navigationMenuTriggerStyle(),
                        "bg-transparent hover:bg-white/10 text-white"
                      )}
                    >
                      {item.name}
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                ))}
                
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="bg-transparent hover:bg-white/10 text-white">
                    {t('nav.more')}
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[200px] gap-2 p-4 bg-[#131921] border border-[#232f3e]/50">
                      <li>
                        <NavigationMenuLink asChild>
                          <Link
                            to="/services"
                            className="block p-2 hover:bg-[#232f3e] rounded-md text-white"
                          >
                            {t('nav.services')}
                          </Link>
                        </NavigationMenuLink>
                      </li>
                      <li>
                        <NavigationMenuLink asChild>
                          <Link
                            to="/newsletter"
                            className="block p-2 hover:bg-[#232f3e] rounded-md text-white"
                          >
                            <div className="flex items-center gap-1">
                              <Sparkles className="h-3 w-3 text-[#f90]" />
                              Newsletter
                            </div>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                      <li>
                        <NavigationMenuLink asChild>
                          <Link
                            to="/chat"
                            className="block p-2 hover:bg-[#232f3e] rounded-md text-white"
                          >
                            <div className="flex items-center gap-1">
                              <MessageCircle className="h-3 w-3 text-[#f90]" />
                              Live Chat
                            </div>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                      <li>
                        <NavigationMenuLink asChild>
                          <a
                            href="#playground"
                            onClick={(e) => {
                              e.preventDefault();
                              scrollToSection("#playground");
                            }}
                            className="block p-2 hover:bg-[#232f3e] rounded-md text-white"
                          >
                            {t('playground.title')}
                          </a>
                        </NavigationMenuLink>
                      </li>
                      <li>
                        <NavigationMenuLink asChild>
                          <a
                            href="#youtube"
                            onClick={(e) => {
                              e.preventDefault();
                              scrollToSection("#youtube");
                            }}
                            className="block p-2 hover:bg-[#232f3e] rounded-md text-white"
                          >
                            {t('nav.youtube')}
                          </a>
                        </NavigationMenuLink>
                      </li>
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
            
            <div className="flex items-center space-x-2 ml-4">
              <LanguageSelector />
              <ThemeToggle />
            </div>
          </div>

          {/* Mobile Navigation Toggle */}
          <div className="flex items-center md:hidden">
            <LanguageSelector />
            <ThemeToggle />
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="ml-2 p-2 rounded-md text-white hover:bg-white/10"
              aria-label="Toggle Menu"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 bg-[#131921]/95 backdrop-blur-lg shadow-lg border-t border-[#232f3e]/50">
            <div className="px-3 py-2">
              <SearchBar />
            </div>
            
            {navigation.map((item) => (
              <a
                key={item.name}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection(item.href);
                }}
                href={item.href}
                className="block px-3 py-2 text-base font-medium text-white hover:text-[#f90] transition-colors"
              >
                {item.name}
              </a>
            ))}
            
            <hr className="border-[#232f3e]/50 my-2" />
            
            <Link
              to="/services"
              className="block px-3 py-2 text-base font-medium text-white hover:text-[#f90] transition-colors"
              onClick={() => setIsOpen(false)}
            >
              {t('nav.services')}
            </Link>

            <Link
              to="/newsletter"
              className="block px-3 py-2 text-base font-medium text-white hover:text-[#f90] transition-colors"
              onClick={() => setIsOpen(false)}
            >
              <div className="flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-[#f90]" />
                Newsletter
              </div>
            </Link>
            
            <Link
              to="/chat"
              className="block px-3 py-2 text-base font-medium text-white hover:text-[#f90] transition-colors"
              onClick={() => setIsOpen(false)}
            >
              <div className="flex items-center gap-2">
                <MessageCircle className="h-4 w-4 text-[#f90]" />
                Live Chat
              </div>
            </Link>
            
            <a
              href="#playground"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection("#playground");
              }}
              className="block px-3 py-2 text-base font-medium text-white hover:text-[#f90] transition-colors"
            >
              {t('playground.title')}
            </a>
            
            <a
              href="#youtube"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection("#youtube");
              }}
              className="block px-3 py-2 text-base font-medium text-white hover:text-[#f90] transition-colors"
            >
              {t('nav.youtube')}
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
