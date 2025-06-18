
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { LanguageSelector } from "../LanguageSelector";

export function NavbarActions() {
  return (
    <div className="flex items-center space-x-2 ml-4">
      <Button variant="outline" size="sm" asChild>
        <Link to="/post-job">Post a Job</Link>
      </Button>
      <LanguageSelector />
    </div>
  );
}
