
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useLanguage } from "@/context/LanguageContext";
import { DesktopNavigation } from "./navbar/DesktopNavigation";
import { MobileNavigation } from "./navbar/MobileNavigation";
import { cn } from "@/lib/utils";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const { t } = useLanguage();

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

  return (
    <header
      className={cn(
        "sticky top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled
          ? "py-2 craft-nav-blur shadow-craft"
          : "py-4 bg-white/95 backdrop-blur-sm"
      )}
    >
      <div className="craft-container">
        <nav className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link
              to="/"
              className="text-2xl font-bold font-inter text-craft-gray-900 hover:text-craft-mint transition-colors duration-200"
              aria-label="ZWANSKI TECH - Digital Solutions"
            >
              ZWANSKI TECH
            </Link>
          </div>

          <DesktopNavigation />
          <MobileNavigation />
        </nav>
      </div>
    </header>
  );
}
