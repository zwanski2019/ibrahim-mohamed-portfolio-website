
import { MessageCircle, MessageSquare } from "lucide-react";
import { Link } from "react-router-dom";
import { useLanguage } from "@/context/LanguageContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

export function MoreDropdown() {
  const { t } = useLanguage();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="ghost" 
          className="bg-transparent hover:bg-accent/50 px-4 py-2 h-10"
        >
          {t("nav.more")}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent 
        className="w-[220px] bg-popover border border-border shadow-xl" 
        align="start"
        sideOffset={4}
      >
        <DropdownMenuItem asChild>
          <Link
            to="/newsletter"
            className="flex items-center p-3 hover:bg-accent rounded-md transition-colors text-popover-foreground hover:text-accent-foreground cursor-pointer"
          >
            {t("nav.newsletter")}
          </Link>
        </DropdownMenuItem>
        
        <DropdownMenuItem asChild>
          <Link
            to="/imei-check"
            className="flex items-center p-3 hover:bg-accent rounded-md transition-colors text-green-600 hover:text-green-700 dark:text-green-400 dark:hover:text-green-300 cursor-pointer"
          >
            {t("nav.freeImeiCheck")}
          </Link>
        </DropdownMenuItem>
        
        <DropdownMenuItem asChild>
          <a
            href="https://t.me/zwanski_tech"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 p-3 hover:bg-accent rounded-md transition-colors text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 cursor-pointer"
          >
            <MessageSquare className="h-4 w-4" />
            {t("nav.joinTelegram")}
          </a>
        </DropdownMenuItem>
        
        <DropdownMenuItem asChild>
          <Link
            to="/chat"
            className="flex items-center gap-2 p-3 hover:bg-accent rounded-md transition-colors text-popover-foreground hover:text-accent-foreground cursor-pointer"
          >
            <MessageCircle className="h-4 w-4" />
            {t("nav.liveChat")}
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
