
import { Briefcase, Search } from "lucide-react";
import { Link } from "react-router-dom";
import { SearchBar } from "../SearchBar";
import { NavbarActions } from "./NavbarActions";
import { MoreDropdown } from "./MoreDropdown";
import { useLanguage } from "@/context/LanguageContext";
import { cn } from "@/lib/utils";

export function DesktopNavigation() {
  const { t } = useLanguage();

  const mainNavigation = [
    { name: t("nav.findJobs"), href: "/jobs", icon: Briefcase },
    { name: t("nav.findFreelancers"), href: "/freelancers", icon: Search },
    { name: t("nav.services"), href: "/services", icon: null },
    { name: t("nav.academy"), href: "/academy", icon: null },
  ];

  return (
    <div className="hidden lg:flex items-center space-x-8">
      <div className="mr-6">
        <SearchBar />
      </div>
      
      <div className="flex items-center space-x-1">
        {mainNavigation.map((item) => (
          <Link
            key={item.name}
            to={item.href}
            className={cn(
              "flex items-center gap-2 px-4 py-2 text-craft-gray-700 hover:text-craft-mint font-medium transition-all duration-200 rounded-lg hover:bg-craft-gray-50"
            )}
          >
            {item.icon && <item.icon className="h-4 w-4" />}
            {item.name}
          </Link>
        ))}
        
        <MoreDropdown />
      </div>
      
      <NavbarActions />
    </div>
  );
}
