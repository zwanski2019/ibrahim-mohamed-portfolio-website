import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Menu, X, Home, Wrench, Shield, GraduationCap, Briefcase, Settings2, FileText, MessageSquare, Bot, Activity } from "lucide-react";
import ZwanskiLogo from "./ZwanskiLogo";
import { ThemeToggle } from "./ThemeToggle";
import { LanguageSelector } from "./LanguageSelector";
import { GlobalSearchBar } from "./search/GlobalSearchBar";
import { UserMenu } from "./navbar/UserMenu";
import { NotificationButton } from "./navbar/NotificationButton";
import { supabase } from "@/integrations/supabase/client";
const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const {
    user,
    isAuthenticated,
    signOut
  } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
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
      const {
        data,
        error
      } = await supabase.from("profiles").select("*").eq("id", user.id).single();
      if (error && error.code !== 'PGRST116') {
        if (process.env.NODE_ENV === 'development') {
          console.error("Error fetching profile:", error);
        }
        return;
      }
      setUserProfile(data);
    } catch (error) {
      if (process.env.NODE_ENV === 'development') {
        console.error("Error fetching user profile:", error);
      }
    }
  };
  const fetchNotifications = async () => {
    if (!user) return;
    try {
      const {
        count,
        error
      } = await supabase.from("notifications").select("*", {
        count: "exact",
        head: true
      }).eq("user_id", user.id).eq("read", false);
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
    setIsMenuOpen(false); // Close mobile menu if open
  };
  const isActivePath = (path: string) => {
    return location.pathname === path;
  };
  const mainNavItems = [{
    label: "Home",
    path: "/",
    icon: Home
  }, {
    label: "Fix",
    path: "/services?category=repair",
    icon: Wrench,
    description: "Device Repair & Recovery"
  }, {
    label: "Build",
    path: "/services?category=development",
    icon: Briefcase,
    description: "Custom Development"
  }, {
    label: "Secure",
    path: "/services?category=security",
    icon: Shield,
    description: "Cybersecurity Solutions"
  }, {
    label: "Teach",
    path: "/academy",
    icon: GraduationCap,
    description: "Education & Training"
  }, {
    label: "Tools",
    path: "/tools",
    icon: Settings2
  }, {
    label: "Jobs",
    path: "/jobs",
    icon: Briefcase
  }, {
    label: "Blog",
    path: "/blog",
    icon: FileText
  }, {
    label: "Chat",
    path: "/chat",
    icon: MessageSquare
  }, {
    label: "Threat Map",
    path: "/threat-map",
    icon: Activity
  }, {
    label: "AI",
    path: "/ai",
    icon: Bot
  }];
  return <nav className="sticky top-0 z-50 bg-background/95 backdrop-blur-lg border-b border-border/30 shadow-sm">
      {/* Top banner for promotions (Amazon-style) */}
      
      
      <div className="container mx-auto px-2 sm:px-4">
        {/* Main header row */}
        <div className="flex items-center justify-between h-14 sm:h-16">
          {/* Left section - Logo */}
          <div className="flex items-center flex-shrink-0 min-w-0 mr-2 sm:mr-4">
            <ZwanskiLogo onClick={handleLogoClick} />
          </div>

          {/* Center section - Enhanced Search Bar (Amazon-inspired) */}
          <div className="flex-1 max-w-2xl mx-2 sm:mx-4">
            <div className="relative">
              <GlobalSearchBar placeholder="Search services, tools, courses..." className="w-full h-10 sm:h-12 rounded-lg border-2 border-border hover:border-primary/50 focus-within:border-primary transition-colors shadow-sm" />
            </div>
          </div>

          {/* Right section - User actions */}
          <div className="flex items-center space-x-1 sm:space-x-2 flex-shrink-0">
            {/* Theme & Language - Hidden on small screens */}
            <div className="hidden sm:flex items-center space-x-1">
              <ThemeToggle />
              <LanguageSelector />
            </div>
            
            {/* Authentication Section */}
            {isAuthenticated && user ? <div className="flex items-center space-x-1 sm:space-x-2">
                <NotificationButton unreadCount={unreadNotifications} />
                <UserMenu userProfile={userProfile} />
              </div> : <div className="hidden sm:flex items-center space-x-1">
                <Button variant="ghost" size="sm" onClick={() => navigate("/auth?tab=signin")} className="text-xs px-2 sm:px-3 h-8 sm:h-9">
                  Sign In
                </Button>
                <Button size="sm" onClick={() => navigate("/auth?tab=signup")} className="text-xs px-2 sm:px-3 h-8 sm:h-9 bg-primary hover:bg-primary/90">
                  Sign Up
                </Button>
              </div>}

            {/* Mobile Menu Button */}
            <Button variant="ghost" size="sm" className="lg:hidden flex-shrink-0 p-2" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Secondary navigation bar (Amazon-style departments) */}
        <div className="hidden lg:block border-t border-border/30 py-2">
          <div className="flex items-center justify-between">
            {/* Main navigation categories */}
            <div className="flex items-center space-x-1">
              <Button variant="ghost" size="sm" onClick={() => setIsMenuOpen(!isMenuOpen)} className="flex items-center gap-2 text-sm font-medium hover:bg-primary/10">
                <Menu className="h-4 w-4" />
                All Services
              </Button>
              
              {mainNavItems.slice(0, 6).map(item => {
              const Icon = item.icon;
              const showItem = !(item as any).authRequired || isAuthenticated;
              if (!showItem) return null;
              return <Button key={item.path} variant={isActivePath(item.path) ? "secondary" : "ghost"} size="sm" onClick={() => navigate(item.path)} className="flex items-center gap-1 text-sm px-3 py-1.5 hover:bg-primary/10">
                    <Icon className="h-3.5 w-3.5" />
                    <span>{item.label}</span>
                    {(item as any).description && <span className="hidden xl:inline text-xs text-muted-foreground ml-1">
                        - {(item as any).description}
                      </span>}
                  </Button>;
            })}
            </div>

            {/* Right side secondary nav */}
            <div className="flex items-center space-x-2 text-sm">
              <Button variant="ghost" size="sm" onClick={() => navigate("/support")} className="text-sm hover:bg-primary/10">
                Customer Service
              </Button>
              <Button variant="ghost" size="sm" onClick={() => navigate("/freelancers")} className="text-sm hover:bg-primary/10">
                Hire Freelancers
              </Button>
            </div>
          </div>
        </div>

        {/* Enhanced Mobile Menu with categorized sections */}
        {isMenuOpen && <div className="lg:hidden border-t border-border/30 py-4 bg-background/95 backdrop-blur-sm">
            <div className="space-y-4">
              {/* Mobile auth buttons for non-authenticated users */}
              {!isAuthenticated && <div className="flex gap-2 px-2 sm:hidden">
                  <Button variant="outline" className="flex-1" onClick={() => {
              navigate("/auth?tab=signin");
              setIsMenuOpen(false);
            }}>
                    Sign In
                  </Button>
                  <Button className="flex-1" onClick={() => {
              navigate("/auth?tab=signup");
              setIsMenuOpen(false);
            }}>
                    Sign Up
                  </Button>
                </div>}

              {/* Service Categories */}
              <div className="px-2">
                <h3 className="text-sm font-semibold text-muted-foreground mb-2 px-2">SERVICES</h3>
                <div className="grid grid-cols-2 gap-1">
                  {mainNavItems.slice(1, 5).map(item => {
                const Icon = item.icon;
                return <Button key={item.path} variant={isActivePath(item.path) ? "secondary" : "ghost"} className="justify-start h-auto p-3 flex-col items-start" onClick={() => {
                  navigate(item.path);
                  setIsMenuOpen(false);
                }}>
                        <div className="flex items-center gap-2 mb-1">
                          <Icon className="h-4 w-4" />
                          <span className="font-medium">{item.label}</span>
                        </div>
                        {(item as any).description && <span className="text-xs text-muted-foreground text-left">
                            {(item as any).description}
                          </span>}
                      </Button>;
              })}
                </div>
              </div>

              {/* Other Pages */}
              <div className="px-2">
                <h3 className="text-sm font-semibold text-muted-foreground mb-2 px-2">EXPLORE</h3>
                <div className="space-y-1">
                  {mainNavItems.slice(5).map(item => {
                const Icon = item.icon;
                const showItem = !(item as any).authRequired || isAuthenticated;
                if (!showItem) return null;
                return <Button key={item.path} variant={isActivePath(item.path) ? "secondary" : "ghost"} className="justify-start w-full" onClick={() => {
                  navigate(item.path);
                  setIsMenuOpen(false);
                }}>
                        <Icon className="mr-2 h-4 w-4" />
                        {item.label}
                      </Button>;
              })}
                </div>
              </div>

              {/* Mobile Settings */}
              <div className="px-2 pt-2 border-t border-border/30 sm:hidden">
                <h3 className="text-sm font-semibold text-muted-foreground mb-2 px-2">SETTINGS</h3>
                <div className="flex items-center justify-between px-2">
                  <div className="flex items-center space-x-2">
                    <ThemeToggle />
                    <span className="text-sm">Theme</span>
                  </div>
                  <LanguageSelector />
                </div>
              </div>
            </div>
          </div>}
      </div>
    </nav>;
};
export default Navbar;