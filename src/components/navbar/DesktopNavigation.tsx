import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Shield, Home, Wrench, GraduationCap, Briefcase, Users, MessageSquare, Mail, Settings, BookOpen, Info, FileText, LifeBuoy, Rss, PenTool } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

const navItems = [
  { label: "Home", path: "/", icon: Home },
  { label: "Services", path: "/services", icon: Wrench },
  { label: "Academy", path: "/academy", icon: GraduationCap },
  { label: "Jobs", path: "/jobs", icon: Briefcase },
  { label: "Freelancers", path: "/freelancers", icon: Users },
  { label: "Blog", path: "/blog", icon: PenTool },
  { label: "Chat", path: "/chat", icon: MessageSquare },
  { label: "Newsletter", path: "/newsletter", icon: Mail },
  { label: "Tools", path: "/tools", icon: Settings },
  { label: "Contact", path: "/contact", icon: Mail },
  { label: "3D Model", path: "/3d", icon: BookOpen },
  { label: "About", path: "/about", icon: Info },
  { label: "FAQ", path: "/faq", icon: FileText },
  { label: "Support", path: "/support", icon: LifeBuoy },
  { label: "Infrastructure", path: "/infrastructure" },
  { label: "Privacy", path: "/privacy-policy" },
  { label: "Terms", path: "/terms-of-service" },
  { label: "RSS", path: "/rss", icon: Rss },
];

export default function DesktopNavigation() {
  const { isAuthenticated } = useAuth();
  const location = useLocation();
  const isAdmin = false; // Simplified for now - can be enhanced later with profile data

  return (
    <div className="flex gap-1 items-center">
      {navItems.map((item) => {
        return (
          <Button
            asChild
            key={item.path}
            variant={location.pathname === item.path ? "secondary" : "ghost"}
            className="nav-btn"
          >
            <Link to={item.path}>
              {item.icon && <item.icon className="inline-block mr-1 h-4 w-4" />}
              {item.label}
            </Link>
          </Button>
        );
      })}
      {isAdmin && (
        <Button
          asChild
          variant={location.pathname.startsWith("/admin") ? "secondary" : "ghost"}
          className="nav-btn"
        >
          <Link to="/admin">
            <Shield className="inline-block mr-1 h-4 w-4" />
            Admin Dashboard
          </Link>
        </Button>
      )}
    </div>
  );
}
