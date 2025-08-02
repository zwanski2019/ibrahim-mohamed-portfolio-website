import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import {
  Shield,
  Home,
  Wrench,
  GraduationCap,
  Briefcase,
  Users,
  MessageSquare,
  Mail,
  Settings,
  BookOpen,
  Info,
  FileText,
  LifeBuoy,
  Rss,
  PenTool,
} from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

const navItems = [
  { labelKey: "nav.home", path: "/", icon: Home },
  { labelKey: "nav.services", path: "/services", icon: Wrench },
  { labelKey: "nav.academy", path: "/academy", icon: GraduationCap },
  { labelKey: "nav.jobs", path: "/jobs", icon: Briefcase },
  { labelKey: "nav.freelancers", path: "/freelancers", icon: Users },
  { labelKey: "nav.blog", path: "/blog", icon: PenTool },
  { labelKey: "nav.liveChat", path: "/chat", icon: MessageSquare },
  { labelKey: "nav.newsletter", path: "/newsletter", icon: Mail },
  { labelKey: "nav.tools", path: "/tools", icon: Settings },
  { labelKey: "nav.model3d", path: "/3d", icon: BookOpen },
  { labelKey: "nav.about", path: "/about", icon: Info },
  { labelKey: "nav.faq", path: "/faq", icon: FileText },
  { labelKey: "nav.support", path: "/support", icon: LifeBuoy },
  { labelKey: "nav.infrastructure", path: "/infrastructure" },
  { labelKey: "nav.privacy", path: "/privacy-policy" },
  { labelKey: "nav.terms", path: "/terms-of-service" },
  { labelKey: "nav.rss", path: "/rss", icon: Rss },
];

export default function MobileNavigation({ onNavigate }: { onNavigate?: () => void }) {
  const { isAuthenticated, user } = useAuth();
  const { t } = useLanguage();
  const location = useLocation();
  const isAdmin = false; // Simplified for now - can be enhanced later with profile data

  return (
    <div className="flex flex-col gap-2">
      {navItems.map((item) => {
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
              {t(item.labelKey)}
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
