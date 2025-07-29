import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import { Shield } from "lucide-react";
import { navItems } from "./navItems";

export default function MobileNavigation({ onNavigate }: { onNavigate?: () => void }) {
  const { isAuthenticated, user } = useAuth();
  const location = useLocation();
  const isAdmin = false; // Simplified for now - can be enhanced later with profile data

  return (
    <div className="flex flex-col gap-2">
      {navItems.map((item) => (
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
      ))}

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
