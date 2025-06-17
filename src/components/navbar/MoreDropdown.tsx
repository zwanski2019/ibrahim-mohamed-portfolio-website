
import { MessageCircle, MessageSquare } from "lucide-react";
import { Link } from "react-router-dom";
import { useLanguage } from "@/context/LanguageContext";
import {
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

export function MoreDropdown() {
  const { t } = useLanguage();

  return (
    <NavigationMenuItem>
      <NavigationMenuTrigger className="bg-transparent hover:bg-accent/50">
        {t("nav.more")}
      </NavigationMenuTrigger>
      <NavigationMenuContent className="left-0 top-full z-50">
        <div className="w-[220px] p-4 bg-popover border border-border shadow-xl rounded-md">
          <div className="flex flex-col space-y-2">
            <NavigationMenuLink asChild>
              <Link
                to="/newsletter"
                className="flex items-center p-3 hover:bg-accent rounded-md transition-colors text-popover-foreground hover:text-accent-foreground"
              >
                {t("nav.newsletter")}
              </Link>
            </NavigationMenuLink>
            
            <NavigationMenuLink asChild>
              <Link
                to="/imei-check"
                className="flex items-center p-3 hover:bg-accent rounded-md transition-colors text-green-600 hover:text-green-700 dark:text-green-400 dark:hover:text-green-300"
              >
                {t("nav.freeImeiCheck")}
              </Link>
            </NavigationMenuLink>
            
            <NavigationMenuLink asChild>
              <a
                href="https://t.me/zwanski_tech"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 p-3 hover:bg-accent rounded-md transition-colors text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
              >
                <MessageSquare className="h-4 w-4" />
                {t("nav.joinTelegram")}
              </a>
            </NavigationMenuLink>
            
            <NavigationMenuLink asChild>
              <Link
                to="/chat"
                className="flex items-center gap-2 p-3 hover:bg-accent rounded-md transition-colors text-popover-foreground hover:text-accent-foreground"
              >
                <MessageCircle className="h-4 w-4" />
                {t("nav.liveChat")}
              </Link>
            </NavigationMenuLink>
          </div>
        </div>
      </NavigationMenuContent>
    </NavigationMenuItem>
  );
}
