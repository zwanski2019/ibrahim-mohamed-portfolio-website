import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Shield } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { navItems } from "./navItems";

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
