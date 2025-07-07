import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import { Shield, Home, Wrench, GraduationCap, Briefcase, Users, MessageSquare, Mail, CheckCircle, BookOpen, Info, FileText, LifeBuoy, Rss } from "lucide-react";

const navItems = [
  { label: "Home", path: "/", icon: Home },
  { label: "Services", path: "/services", icon: Wrench },
  { label: "Academy", path: "/academy", icon: GraduationCap },
  { label: "Jobs", path: "/jobs", icon: Briefcase },
  { label: "Freelancers", path: "/freelancers", icon: Users },
  { label: "Community", path: "/community", icon: Users, authRequired: true },
  { label: "Chat", path: "/chat", icon: MessageSquare },
  { label: "Newsletter", path: "/newsletter", icon: Mail },
  { label: "IMEI Check", path: "/imei-check", icon: CheckCircle },
  { label: "3D Model", path: "/3d", icon: BookOpen },
  { label: "About", path: "/about", icon: Info },
  { label: "FAQ", path: "/faq", icon: FileText },
  { label: "Support", path: "/support", icon: LifeBuoy },
  { label: "Infrastructure", path: "/infrastructure" },
  { label: "Privacy", path: "/privacy-policy" },
  { label: "Terms", path: "/terms-of-service" },
  { label: "RSS", path: "/rss", icon: Rss },
];

export default function MobileNavigation({ onNavigate }: { onNavigate?: () => void }) {
  const { isAuthenticated, user } = useAuth();
  const location = useLocation();
  const isAdmin = false; // Simplified for now - can be enhanced later with profile data

  return (
    <div className="flex flex-col gap-2">
      {navItems.map((item) => {
        if (item.authRequired && !isAuthenticated) return null;
        return (
          <Button
            asChild
            key={item.path}
            variant={location.pathname === item.path ? "secondary" : "ghost"}
            className="w-full text-left"
            onClick={onNavigate}
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
          className="w-full text-left"
          onClick={onNavigate}
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
