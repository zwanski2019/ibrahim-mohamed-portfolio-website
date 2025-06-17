
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

  const mainNavigation = [
    { name: t("nav.findJobs"), href: "/jobs", icon: Briefcase },
    { name: t("nav.findFreelancers"), href: "/freelancers", icon: Search },
    { name: t("nav.services"), href: "/services", icon: null },
    { name: t("nav.academy"), href: "/academy", icon: null },
  ];

  return (
    <div className="hidden lg:flex items-center space-x-6">
      <div className="mr-4">
        <SearchBar />
      </div>
      
      <NavigationMenu>
        <NavigationMenuList className="space-x-2">
          {mainNavigation.map((item) => (
            <NavigationMenuItem key={item.name}>
              <NavigationMenuLink asChild>
                <Link
                  to={item.href}
                  className={cn(
                    navigationMenuTriggerStyle(),
                    "bg-transparent hover:bg-accent/50 px-4 py-2 flex items-center gap-2"
                  )}
                >
                  {item.icon && <item.icon className="h-4 w-4" />}
                  {item.name}
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
          ))}
          
          <MoreDropdown />
        </NavigationMenuList>
      </NavigationMenu>
      
      <NavbarActions />
    </div>
  );
}
