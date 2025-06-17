
import { Briefcase, Search } from "lucide-react";
import { Link } from "react-router-dom";
import { SearchBar } from "../SearchBar";
import { NavbarActions } from "./NavbarActions";
import { MoreDropdown } from "./MoreDropdown";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";

const mainNavigation = [
  { name: "Find Jobs", href: "/jobs", icon: Briefcase },
  { name: "Find Freelancers", href: "/freelancers", icon: Search },
  { name: "Services", href: "/services", icon: null },
  { name: "Academy", href: "/academy", icon: null },
];

export function DesktopNavigation() {
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
