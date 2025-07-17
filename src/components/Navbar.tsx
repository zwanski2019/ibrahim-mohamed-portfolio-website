import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { 
  User, 
  Settings, 
  LogOut, 
  Bell,
  MessageSquare,
  GraduationCap,
  Briefcase,
  Users,
  Home,
  Wrench,
  Shield,
  Info,
  Menu,
  X,
  PenTool,
  Settings2,
  FileText
} from "lucide-react";
import ZwanskiLogo from "./ZwanskiLogo";
import { ThemeToggle } from "./ThemeToggle";
import { LanguageSelector } from "./LanguageSelector";
import { GlobalSearchBar } from "./search/GlobalSearchBar";
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
    setIsMenuOpen(false); // Close mobile menu if open
  };

  const isActivePath = (path: string) => {
    return location.pathname === path;
  };

  const mainNavItems = [
    { label: "Home", path: "/", icon: Home },
    { 
      label: "Fix", 
      path: "/services?category=repair", 
      icon: Wrench,
      description: "Device Repair & Recovery"
    },
    { 
      label: "Build", 
      path: "/services?category=development", 
      icon: Briefcase,
      description: "Custom Development"
    },
    { 
      label: "Secure", 
      path: "/services?category=security", 
      icon: Shield,
      description: "Cybersecurity Solutions"
    },
    { 
      label: "Teach", 
      path: "/academy", 
      icon: GraduationCap,
      description: "Education & Training"
    },
    { label: "Tools", path: "/tools", icon: Settings2 },
    { label: "Jobs", path: "/jobs", icon: Briefcase },
    { label: "Blog", path: "/blog", icon: FileText },
    { label: "Chat", path: "/chat", icon: MessageSquare },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-4">
            <ZwanskiLogo onClick={handleLogoClick} />
          </div>

          {/* Right Side */}
          <div className="flex items-center space-x-4">
            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-6">
              {mainNavItems.map((item) => {
                const Icon = item.icon;
                const showItem = !(item as any).authRequired || isAuthenticated;
                
                if (!showItem) return null;
                
                return (
                  <Button
                    key={item.path}
                    variant={isActivePath(item.path) ? "default" : "ghost"}
                    size="sm"
                    onClick={() => navigate(item.path)}
                    className="flex items-center gap-2"
                  >
                    <Icon className="h-4 w-4" />
                    {item.label}
                  </Button>
                );
              })}
            </div>
            
            {/* Global Search - Hidden on small screens */}
            <div className="hidden md:block w-64">
              <GlobalSearchBar placeholder="Search..." compact />
            </div>
            
            {/* Theme Toggle */}
            <ThemeToggle />
            
            {/* Language Selector */}
            <LanguageSelector />

            {/* Authentication Section */}
            {isAuthenticated && user ? (
              <div className="flex items-center space-x-3">
                {/* Notifications */}
                <Button variant="ghost" size="sm" className="relative">
                  <Bell className="h-4 w-4" />
                  {unreadNotifications > 0 && (
                    <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs">
                      {unreadNotifications > 9 ? "9+" : unreadNotifications}
                    </Badge>
                  )}
                </Button>

                {/* User Menu */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 rounded-full p-0">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={userProfile?.avatar_url || ""} />
                        <AvatarFallback>
                          {userProfile?.full_name?.split(" ").map((n: string) => n[0]).join("") || 
                           user.email?.charAt(0).toUpperCase() || "U"}
                        </AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56">
                    <div className="flex items-center justify-start gap-2 p-2">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={userProfile?.avatar_url || ""} />
                        <AvatarFallback>
                          {userProfile?.full_name?.split(" ").map((n: string) => n[0]).join("") || 
                           user.email?.charAt(0).toUpperCase() || "U"}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium">
                          {userProfile?.full_name || user.email}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {user.email}
                        </p>
                      </div>
                    </div>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => navigate("/profile")}>
                      <User className="mr-2 h-4 w-4" />
                      Profile
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => navigate("/settings")}>
                      <Settings className="mr-2 h-4 w-4" />
                      Settings
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleSignOut}>
                      <LogOut className="mr-2 h-4 w-4" />
                      Sign Out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            ) : (
              <div className="hidden lg:flex items-center space-x-2">
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => navigate("/auth?tab=signin")}
                >
                  Sign In
                </Button>
                <Button 
                  size="sm"
                  onClick={() => navigate("/auth?tab=signup")}
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

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden border-t border-border/50 py-4">
            <div className="flex flex-col space-y-2">
              {/* Mobile Search */}
              <div className="px-4 pb-4">
                <GlobalSearchBar placeholder="Search..." />
              </div>
              
              {mainNavItems.map((item) => {
                const Icon = item.icon;
                const showItem = !(item as any).authRequired || isAuthenticated;
                
                if (!showItem) return null;
                
                return (
                  <Button
                    key={item.path}
                    variant={isActivePath(item.path) ? "default" : "ghost"}
                    className="justify-start"
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
              
              {!isAuthenticated && (
                <>
                  <Button
                    variant="ghost"
                    className="justify-start"
                    onClick={() => {
                      navigate("/auth?tab=signin");
                      setIsMenuOpen(false);
                    }}
                  >
                    Sign In
                  </Button>
                  <Button
                    className="justify-start"
                    onClick={() => {
                      navigate("/auth?tab=signup");
                      setIsMenuOpen(false);
                    }}
                  >
                    Sign Up
                  </Button>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
