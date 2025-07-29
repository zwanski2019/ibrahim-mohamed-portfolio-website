import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { navItems, NAV_DISPLAY_LIMIT } from "./navbar/navItems";
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
  const { user, isAuthenticated, signOut } = useAuth();
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
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single();
      if (error && error.code !== "PGRST116") {
        if (process.env.NODE_ENV === "development") {
          console.error("Error fetching profile:", error);
        }
        return;
      }
      setUserProfile(data);
    } catch (error) {
      if (process.env.NODE_ENV === "development") {
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
      if (process.env.NODE_ENV === "development") {
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

  const isActivePath = (path: string) => location.pathname === path;

  return (
    <nav className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 min-h-16">
          {/* Logo */}
          <div className="flex items-center flex-shrink-0 min-w-0">
            <ZwanskiLogo onClick={handleLogoClick} />
          </div>

          {/* Search */}
          <div className="flex-1 max-w-2xl mx-2 sm:mx-4">
            <GlobalSearchBar
              placeholder="Search services, tools, courses..."
              className="w-full h-10 sm:h-12 rounded-lg border-2 border-border hover:border-primary/50 focus-within:border-primary transition-colors shadow-sm"
            />
          </div>

          {/* User Actions */}
          <div className="flex items-center space-x-1 sm:space-x-2 flex-shrink-0">
            <div className="hidden sm:flex items-center space-x-1">
              <ThemeToggle />
              <LanguageSelector />
            </div>

            {isAuthenticated && user ? (
              <div className="flex items-center space-x-1 sm:space-x-2">
                <NotificationButton unreadCount={unreadNotifications} />
                <UserMenu userProfile={userProfile} />
              </div>
            ) : (
              <div className="hidden sm:flex items-center space-x-1">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => navigate("/auth?tab=signin")}
                  className="text-xs px-2 sm:px-3 h-8 sm:h-9"
                >
                  Sign In
                </Button>
                <Button
                  size="sm"
                  onClick={() => navigate("/auth?tab=signup")}
                  className="text-xs px-2 sm:px-3 h-8 sm:h-9 bg-primary hover:bg-primary/90"
                >
                  Sign Up
                </Button>
              </div>
            )}

            {/* Mobile Menu Toggle */}
            <Button
              variant="ghost"
              size="sm"
              className="lg:hidden flex-shrink-0 p-2"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Secondary Nav */}
        <div className="hidden lg:block border-t border-border/30 py-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-1">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate("/services")}
                className="flex items-center gap-2 text-sm font-medium hover:bg-primary/10"
              >
                <Menu className="h-4 w-4" />
                All Services
              </Button>
              {navItems.slice(0, NAV_DISPLAY_LIMIT).map((item) => {
                const Icon = item.icon;
                return (
                  <Button
                    key={item.path}
                    variant={isActivePath(item.path) ? "secondary" : "ghost"}
                    size="sm"
                    onClick={() => navigate(item.path)}
                    className="flex items-center gap-1 text-sm px-3 py-1.5 hover:bg-primary/10"
                  >
                    <Icon className="h-3.5 w-3.5" />
                    <span>{item.label}</span>
                    {item.description && (
                      <span className="hidden xl:inline text-xs text-muted-foreground ml-1">
                        - {item.description}
                      </span>
                    )}
                  </Button>
                );
              })}
              {navItems.length > NAV_DISPLAY_LIMIT && (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm" className="nav-btn">
                      More
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    {navItems.slice(NAV_DISPLAY_LIMIT).map((item) => {
                      const Icon = item.icon;
                      return (
                        <DropdownMenuItem asChild key={item.path}>
                          <Link to={item.path} className="flex items-center gap-2">
                            {Icon && <Icon className="h-4 w-4" />}
                            {item.label}
                          </Link>
                        </DropdownMenuItem>
                      );
                    })}
                  </DropdownMenuContent>
                </DropdownMenu>
              )}
            </div>
            <div className="flex items-center space-x-2 text-sm">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate("/support")}
                className="text-sm hover:bg-primary/10"
              >
                Customer Service
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate("/freelancers")}
                className="text-sm hover:bg-primary/10"
              >
                Hire Freelancers
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden border-t border-border/30 py-4 bg-background/95 backdrop-blur-sm">
            <div className="space-y-4">
              {!isAuthenticated && (
                <div className="grid grid-cols-2 gap-1 px-2 sm:hidden">
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1 h-8 px-2 py-1 text-xs"
                    onClick={() => {
                      navigate("/auth?tab=signin");
                      setIsMenuOpen(false);
                    }}
                  >
                    Sign In
                  </Button>
                  <Button
                    size="sm"
                    className="flex-1 h-8 px-2 py-1 text-xs"
                    onClick={() => {
                      navigate("/auth?tab=signup");
                      setIsMenuOpen(false);
                    }}
                  >
                    Sign Up
                  </Button>
                </div>
              )}

              {/* Services */}
              <div className="px-2">
                <h3 className="text-sm font-semibold text-muted-foreground mb-2 px-2">
                  SERVICES
                </h3>
                <div className="grid grid-cols-2 gap-1">
                  {navItems.slice(1, 5).map((item) => {
                    const Icon = item.icon;
                    return (
                      <Button
                        key={item.path}
                        variant={isActivePath(item.path) ? "secondary" : "ghost"}
                        className="justify-start h-auto p-2 flex-col items-start text-xs"
                        onClick={() => {
                          navigate(item.path);
                          setIsMenuOpen(false);
                        }}
                      >
                        <div className="flex items-center gap-2 mb-1">
                          <Icon className="h-4 w-4" />
                          <span className="font-medium text-xs">{item.label}</span>
                        </div>
                        {item.description && (
                          <span className="text-xs text-muted-foreground">
                            {item.description}
                          </span>
                        )}
                      </Button>
                    );
                  })}
                </div>
              </div>

              {/* Explore */}
              <div className="px-2">
                <h3 className="text-sm font-semibold text-muted-foreground mb-2 px-2">
                  EXPLORE
                </h3>
                <div className="space-y-1">
                  {navItems.slice(5).map((item) => {
                    const Icon = item.icon;
                    return (
                      <Button
                        key={item.path}
                        variant={isActivePath(item.path) ? "secondary" : "ghost"}
                        className="justify-start w-full text-xs px-3 py-2"
                        onClick={() => {
                          navigate(item.path);
                          setIsMenuOpen(false);
                        }}
                      >
                        <Icon className="mr-2 h-4 w-4" />
                        {item.label}
                      </Button>
                    );
                  })}
                </div>
              </div>

              {/* Settings */}
              <div className="px-2 pt-2 border-t border-border/30 sm:hidden">
                <h3 className="text-sm font-semibold text-muted-foreground mb-2 px-2">
                  SETTINGS
                </h3>
                <div className="flex items-center justify-between px-2">
                  <div className="flex items-center space-x-2">
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
