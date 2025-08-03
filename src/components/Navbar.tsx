import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import ZwanskiLogo from "./ZwanskiLogo";
import { ThemeToggle } from "./ThemeToggle";
import { LanguageSelector } from "./LanguageSelector";
import { GlobalSearchBar } from "./search/GlobalSearchBar";
import { UserMenu } from "./navbar/UserMenu";
import { NotificationButton } from "./navbar/NotificationButton";
import { supabase } from "@/integrations/supabase/client";
import { trackEvent } from "@/utils/analytics";
import { 
  Home, 
  Wrench, 
  GraduationCap, 
  Settings2, 
  Briefcase, 
  FileText, 
  MessageSquare, 
  Bot, 
  Shield, 
  Search, 
  X, 
  Menu 
} from "lucide-react";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, isAuthenticated, signOut } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [unreadNotifications, setUnreadNotifications] = useState(0);
  const [userProfile, setUserProfile] = useState<any>(null);

  // Fetch user profile and notifications
  useEffect(() => {
    if (isAuthenticated && user) {
      fetchUserProfile();
      fetchNotifications();
    }
  }, [isAuthenticated, user]);

  const fetchUserProfile = async () => {
    if (!user) return;
    try {
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single();
      
      if (error && error.code !== 'PGRST116') {
        if (process.env.NODE_ENV === 'development') {
          console.error("Error fetching profile:", error);
        }
        return;
      }
      setUserProfile(data);
      trackEvent('profile_fetch', { user_id: user.id, email: user.email });
    } catch (error) {
      if (process.env.NODE_ENV === 'development') {
        console.error("Error fetching user profile:", error);
      }
    }
  };

  const fetchNotifications = async () => {
    if (!user) return;
    try {
      const { count, error } = await supabase
        .from("notifications")
        .select("*", { count: "exact", head: true })
        .eq("user_id", user.id)
        .eq("read", false);
      
      if (error) throw error;
      setUnreadNotifications(count || 0);
    } catch (error) {
      if (process.env.NODE_ENV === 'development') {
        console.error("Error fetching notifications:", error);
      }
    }
  };

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

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
  ];

  const serviceCategories = [
    { label: "Fix", path: "/services?category=repair", icon: Wrench, description: "Device Repair & Recovery" },
    { label: "Build", path: "/services?category=development", icon: Briefcase, description: "Custom Development" },
    { label: "Secure", path: "/services?category=security", icon: Shield, description: "Cybersecurity Solutions" }
  ];

  return (
    <nav className="sticky top-0 z-50 bg-background/95 backdrop-blur-lg border-b border-border/30 shadow-sm">
      <div className="container mx-auto px-4">
        {/* Main header row */}
        <div className="flex items-center justify-between h-16">
          {/* Left section - Logo */}
          <div className="flex items-center flex-shrink-0">
            <ZwanskiLogo onClick={handleLogoClick} />
          </div>

          {/* Center section - Search Bar (Desktop) */}
          <div className="hidden md:flex flex-1 max-w-2xl mx-4">
            <GlobalSearchBar 
              placeholder="Search services, tools, courses..." 
              className="w-full"
            />
          </div>

          {/* Right section - User actions */}
          <div className="flex items-center space-x-2">
            {/* Search icon for mobile */}
            <Button
              variant="ghost"
              size="sm"
              className="md:hidden"
              onClick={() => setIsSearchOpen(!isSearchOpen)}
            >
              <Search className="h-5 w-5" />
            </Button>

            {/* Theme & Language - Hidden on small screens */}
            <div className="hidden sm:flex items-center space-x-1">
              <ThemeToggle />
              <LanguageSelector />
            </div>
            
            {/* Authentication Section */}
            {isAuthenticated && user ? (
              <div className="flex items-center space-x-2">
                <NotificationButton unreadCount={unreadNotifications} />
                <UserMenu userProfile={userProfile} />
              </div>
            ) : (
              <div className="hidden sm:flex items-center space-x-2">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => navigate("/auth?tab=signin")}
                  className="text-sm"
                >
                  Sign In
                </Button>
                <Button 
                  size="sm" 
                  onClick={() => navigate("/auth?tab=signup")}
                  className="text-sm"
                >
                  Sign Up
                </Button>
              </div>
            )}

            {/* Mobile Menu Button */}
            <Button 
              variant="ghost" 
              size="sm" 
              className="lg:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Search Bar */}
        {isSearchOpen && (
          <div className="md:hidden py-3 border-t border-border/30">
            <GlobalSearchBar 
              placeholder="Search services, tools, courses..." 
              className="w-full"
            />
          </div>
        )}

        {/* Desktop Navigation Bar */}
        <div className="hidden lg:block border-t border-border/30 py-2">
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
          <div className="lg:hidden border-t border-border/30 py-4 bg-background/95 backdrop-blur-sm">
            <div className="space-y-4">
              {/* Mobile auth buttons for non-authenticated users */}
              {!isAuthenticated && (
                <div className="flex gap-2 sm:hidden mb-4">
                  <Button 
                    variant="outline" 
                    className="flex-1" 
                    onClick={() => {
                      navigate("/auth?tab=signin");
                      setIsMenuOpen(false);
                    }}
                  >
                    Sign In
                  </Button>
                  <Button 
                    className="flex-1" 
                    onClick={() => {
                      navigate("/auth?tab=signup");
                      setIsMenuOpen(false);
                    }}
                  >
                    Sign Up
                  </Button>
                </div>
              )}

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
                        className="w-full justify-start h-12"
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
                        className="h-auto p-4 flex-col items-start text-left"
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
              <div className="pt-4 border-t border-border/30 sm:hidden">
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

export default Navbar;