
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "../ThemeToggle";
import { LanguageSelector } from "../LanguageSelector";
import { useAdmin } from "@/hooks/useAdmin";
import { Shield } from "lucide-react";

export function NavbarActions() {
  const { isAdmin } = useAdmin();

  return (
    <div className="flex items-center space-x-2 ml-4">
      <Button variant="outline" size="sm" asChild>
        <Link to="/post-job">Post a Job</Link>
      </Button>
      {isAdmin && (
        <Button variant="outline" size="sm" asChild>
          <Link to="/admin">
            <Shield className="mr-2 h-4 w-4" />
            Admin
          </Link>
        </Button>
      )}
      <LanguageSelector />
      <ThemeToggle />
    </div>
  );
}
