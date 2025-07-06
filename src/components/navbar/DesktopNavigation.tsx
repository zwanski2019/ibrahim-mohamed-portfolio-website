import { Briefcase, Search } from "lucide-react";
import { Link } from "react-router-dom";
import { SearchBar } from "../SearchBar";
import { NavbarActions } from "./NavbarActions";
import { MoreDropdown } from "./MoreDropdown";
import { useLanguage } from "@/context/LanguageContext";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";

export function DesktopNavigation() {
  const { t } = useLanguage();

  // Main navigation items with clear structure
  const NAV_ITEMS = [
    { 
      name: t("nav.findJobs"), 
      href: "/jobs", 
      icon: Briefcase,
      ariaLabel: "Browse job opportunities" 
    },
    { 
      name: t("nav.findFreelancers"), 
      href: "/freelancers", 
      icon: Search,
      ariaLabel: "Find freelance professionals" 
    },
    { 
      name: t("nav.services"), 
      href: "/services", 
      icon: null,
      ariaLabel: "View our services" 
    },
    { 
      name: t("nav.academy"), 
      href: "/academy", 
      icon: null,
      ariaLabel: "Explore learning resources" 
    },
  ];

  return (
    <div className="hidden lg:flex items-center space-x-6 flex-1 justify-center">
      <div className="flex items-center space-x-6">
        {/* Search bar with clear positioning */}
        <div className="mr-2">
          <SearchBar placeholder={t("search.placeholder")} />
        </div>
        
        {/* Main navigation menu */}
        <div className="flex items-center space-x-2">
          <NavigationMenu>
            <NavigationMenuList className="space-x-2">
              {NAV_ITEMS.map((item) => (
                <NavigationMenuItem key={item.name}>
                  <NavigationMenuLink asChild>
                    <Link
                      to={item.href}
                      className={cn(
                        navigationMenuTriggerStyle(),
                        "bg-transparent hover:bg-accent/50 px-3 py-2 flex items-center gap-2 text-sm font-medium whitespace-nowrap",
                        "transition-colors duration-200" // Smooth hover transition
                      )}
                      aria-label={item.ariaLabel}
                    >
                      {/* Icon for the navigation item */}
                      {item.icon && (
                        <item.icon 
                          className="h-4 w-4" 
                          aria-hidden="true" 
                        />
                      )}
                      
                      {/* Full text for larger screens */}
                      <span className="hidden xl:inline">
                        {item.name}
                      </span>
                      
                      {/* Shortened text for smaller screens */}
                      <span className="xl:hidden">
                        {item.name.split(' ')[0]}
                      </span>
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
          
          {/* Additional options dropdown */}
          <MoreDropdown 
            ariaLabel="More navigation options"
          />
        </div>
      </div>
      
      {/* User actions section (login, profile, etc.) */}
      <NavbarActions 
        className="ml-auto" 
        ariaLabel="User account actions"
      />
    </div>
  );
}
