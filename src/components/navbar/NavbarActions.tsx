
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "../ThemeToggle";
import { LanguageSelector } from "../LanguageSelector";

export function NavbarActions() {
  return (
    <div className="flex items-center space-x-3 ml-6">
      <Button 
        variant="outline" 
        size="sm" 
        asChild
        className="border-craft-gray-200 text-craft-gray-700 hover:text-craft-mint hover:border-craft-mint transition-all duration-200"
      >
        <Link to="/post-job">Post a Job</Link>
      </Button>
      <LanguageSelector />
      <ThemeToggle />
    </div>
  );
}
