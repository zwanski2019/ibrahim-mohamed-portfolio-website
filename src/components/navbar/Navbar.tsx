import React, { useState } from "react";
import { Link } from "react-router-dom";
import ZwanskiLogo from "../ZwanskiLogo";
import { ThemeToggle } from "../ThemeToggle";
import { LanguageSelector } from "../LanguageSelector";
import DesktopNavigation from "./DesktopNavigation";
import MobileNavigation from "./MobileNavigation";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { User, X, Menu } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isAuthenticated, signOut, user } = useAuth();

  const handleSignOut = async () => {
    await signOut();
  };

  return (
    <nav className="bg-background border-b border-border flex items-center justify-between px-6 py-4 sticky top-0 z-50 backdrop-blur-sm">
      <div className="flex items-center gap-2">
        <Link to="/" className="logo-btn"><ZwanskiLogo /></Link>
      </div>
      {/* Desktop nav */}
      <div className="hidden md:flex flex-1 justify-center">
        <DesktopNavigation />
      </div>
      {/* User menu and mobile button */}
      <div className="flex items-center gap-2">
        <LanguageSelector />
        <ThemeToggle />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm" className="touch-target" aria-label="User menu">
              {isAuthenticated ? (
                <Avatar>
                  <AvatarImage src={user?.user_metadata?.avatar_url} />
                  <AvatarFallback>U</AvatarFallback>
                </Avatar>
              ) : (
                <User className="h-4 w-4" />
              )}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {isAuthenticated ? (
              <>
                <DropdownMenuItem asChild>
                  <Link to="/profile">Profile</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/settings">Settings</Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleSignOut}>Sign Out</DropdownMenuItem>
              </>
            ) : (
              <DropdownMenuItem asChild>
                <Link to="/auth">Sign In / Register</Link>
              </DropdownMenuItem>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
        {/* Mobile menu button */}
        <div className="md:hidden flex items-center">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="p-2 hover:bg-accent rounded-md transition-colors"
            aria-label="Open menu"
          >
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>
      {/* Mobile nav */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-50 bg-black/50">
          <div className="fixed top-0 left-0 right-0 bg-background shadow-lg border-b border-border">
            <div className="flex justify-between items-center p-4">
              <ZwanskiLogo />
              <button onClick={() => setIsMenuOpen(false)} className="p-2 hover:bg-accent rounded-md transition-colors">
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="flex flex-col gap-2 p-4">
              <MobileNavigation onNavigate={() => setIsMenuOpen(false)} />
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
