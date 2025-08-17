import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, Home, Wrench, Shield, GraduationCap, Briefcase, Settings2, FileText, MessageSquare, Bot, Activity, Search } from "lucide-react";
import ZwanskiLogo from "../ZwanskiLogo";
import { ThemeToggle } from "../ThemeToggle";
import { LanguageSelector } from "../LanguageSelector";
import { GlobalSearchBar } from "../search/GlobalSearchBar";

const NavbarSimple = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const handleLogoClick = () => {
    navigate("/");
    setIsMenuOpen(false);
  };

  const isActivePath = (path: string) => {
    return location.pathname === path;
  };

  const mainNavItems = [
    { label: "Home", path: "/", icon: Home },
    { label: "Services", path: "/services", icon: Wrench },
    { label: "Academy", path: "/academy", icon: GraduationCap },
    { label: "Tools", path: "/tools", icon: Settings2 },
    { label: "Jobs", path: "/jobs", icon: Briefcase },
    { label: "Blog", path: "/blog", icon: FileText },
    { label: "Chat", path: "/chat", icon: MessageSquare },
    { label: "AI", path: "/ai", icon: Bot },
    { label: "Threat Map", path: "/threat-map", icon: Activity }
  ];

  const serviceCategories = [
    { label: "Fix", path: "/services?category=repair", icon: Wrench, description: "Device Repair & Recovery" },
    { label: "Build", path: "/services?category=development", icon: Briefcase, description: "Custom Development" },
    { label: "Secure", path: "/services?category=security", icon: Shield, description: "Cybersecurity Solutions" }
  ];

  return (
    <nav className="sticky top-0 z-50 bg-background/95 backdrop-blur-lg border-b border-border/30 shadow-sm overflow-safe">
      <div className="responsive-container">
        {/* Main header row */}
        <div className="flex items-center justify-between h-14 sm:h-16">
          {/* Left section - Logo */}
          <div className="flex items-center flex-shrink-0">
            <ZwanskiLogo onClick={handleLogoClick} />
          </div>

          {/* Center section - Search Bar (Desktop) */}
          <div className="hidden lg:flex flex-1 max-w-2xl mx-4">
            <GlobalSearchBar 
              placeholder="Search services, tools, courses..." 
              className="w-full"
            />
          </div>

          {/* Right section - Controls */}
          <div className="flex items-center space-x-1 sm:space-x-2">
            {/* Search icon for mobile/tablet */}
            <Button
              variant="ghost"
              size="sm"
              className="lg:hidden touch-optimized"
              onClick={() => setIsSearchOpen(!isSearchOpen)}
            >
              <Search className="h-4 w-4 sm:h-5 sm:w-5" />
            </Button>

            {/* Theme & Language - Hidden on small screens */}
            <div className="hidden md:flex items-center space-x-1">
              <ThemeToggle />
              <LanguageSelector />
            </div>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="sm"
              className="nav-toggle lg:hidden touch-optimized"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-4 w-4 sm:h-5 sm:w-5" /> : <Menu className="h-4 w-4 sm:h-5 sm:w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile/Tablet Search Bar */}
        {isSearchOpen && (
          <div className="lg:hidden py-3 border-t border-border/30">
            <GlobalSearchBar 
              placeholder="Search services, tools, courses..." 
              className="w-full"
            />
          </div>
        )}

        {/* Desktop Navigation Bar */}
        <div className="nav-menu hidden lg:block border-t border-border/30 py-2">
          <div className="flex items-center justify-between">
            {/* Main navigation */}
            <div className="flex items-center space-x-1">
              {mainNavItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Button
                    key={item.path}
                    variant={isActivePath(item.path) ? "secondary" : "ghost"}
                    size="sm"
                    onClick={() => navigate(item.path)}
                    className="flex items-center gap-2 text-sm hover:bg-primary/10"
                  >
                    <Icon className="h-4 w-4" />
                    <span>{item.label}</span>
                  </Button>
                );
              })}
            </div>

            {/* Service categories */}
            <div className="flex items-center space-x-2 text-sm">
              {serviceCategories.map((item) => {
                const Icon = item.icon;
                return (
                  <Button
                    key={item.path}
                    variant="ghost"
                    size="sm"
                    onClick={() => navigate(item.path)}
                    className="flex items-center gap-1 text-sm hover:bg-primary/10"
                  >
                    <Icon className="h-3.5 w-3.5" />
                    <span>{item.label}</span>
                  </Button>
                );
              })}
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => navigate("/support")}
                className="text-sm hover:bg-primary/10"
              >
                Support
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="nav-menu lg:hidden border-t border-border/30 py-4 bg-background/95 backdrop-blur-sm">
            <div className="space-y-4">
              {/* Main Navigation */}
              <div>
                <h3 className="text-sm font-semibold text-muted-foreground mb-3 px-2">
                  NAVIGATION
                </h3>
                <div className="space-y-1">
                  {mainNavItems.map((item) => {
                    const Icon = item.icon;
                    return (
                      <Button
                        key={item.path}
                        variant={isActivePath(item.path) ? "secondary" : "ghost"}
                        className="w-full justify-start h-12 touch-feedback"
                        onClick={() => {
                          navigate(item.path);
                          setIsMenuOpen(false);
                        }}
                      >
                        <Icon className="h-5 w-5 mr-3" />
                        <span className="text-base">{item.label}</span>
                      </Button>
                    );
                  })}
                </div>
              </div>

              {/* Service Categories */}
              <div>
                <h3 className="text-sm font-semibold text-muted-foreground mb-3 px-2">
                  SERVICES
                </h3>
                <div className="grid grid-cols-1 gap-1">
                  {serviceCategories.map((item) => {
                    const Icon = item.icon;
                    return (
                      <Button
                        key={item.path}
                        variant="ghost"
                        className="h-auto p-4 flex-col items-start text-left touch-feedback"
                        onClick={() => {
                          navigate(item.path);
                          setIsMenuOpen(false);
                        }}
                      >
                        <div className="flex items-center gap-3 mb-1">
                          <Icon className="h-5 w-5" />
                          <span className="font-medium">{item.label}</span>
                        </div>
                        <span className="text-sm text-muted-foreground">
                          {item.description}
                        </span>
                      </Button>
                    );
                  })}
                </div>
              </div>

              {/* Mobile Settings */}
              <div className="pt-4 border-t border-border/30 md:hidden">
                <h3 className="text-sm font-semibold text-muted-foreground mb-3 px-2">
                  SETTINGS
                </h3>
                <div className="flex items-center justify-between px-2">
                  <div className="flex items-center space-x-3">
                    <ThemeToggle />
                    <span className="text-sm">Theme</span>
                  </div>
                  <LanguageSelector />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default NavbarSimple;