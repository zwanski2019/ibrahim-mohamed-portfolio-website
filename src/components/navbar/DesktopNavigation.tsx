
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
    <div className="hidden lg:flex items-center space-x-6 flex-1 justify-center">
      <div className="flex items-center space-x-6">
        <div className="mr-2">
          <SearchBar />
        </div>
        
        <div className="flex items-center space-x-2">
          <NavigationMenu>
            <NavigationMenuList className="space-x-2">
              {mainNavigation.map((item) => (
                <NavigationMenuItem key={item.name}>
                  <NavigationMenuLink asChild>
                    <Link
                      to={item.href}
                      className={cn(
                        navigationMenuTriggerStyle(),
                        "bg-transparent hover:bg-accent/50 px-3 py-2 flex items-center gap-2 text-sm font-medium whitespace-nowrap"
                      )}
                    >
                      {item.icon && <item.icon className="h-4 w-4" />}
                      <span className="hidden xl:inline">{item.name}</span>
                      <span className="xl:hidden">{item.name.split(' ')[0]}</span>
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
          
          <MoreDropdown />
        </div>
      </div>
      
      <NavbarActions />
    </div>
  );
}
