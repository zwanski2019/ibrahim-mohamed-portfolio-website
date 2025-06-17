
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
          className="text-craft-gray-700 hover:text-craft-mint hover:bg-craft-gray-50 px-4 py-2 h-10 font-medium"
        >
          {t("nav.more")}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent 
        className="w-[220px] bg-white border border-craft-gray-200 shadow-craft-lg z-50 rounded-xl p-2" 
        align="end"
        sideOffset={8}
      >
        <DropdownMenuItem asChild>
          <Link
            to="/newsletter"
            className="flex items-center hover:bg-craft-gray-50 rounded-lg transition-colors text-craft-gray-700 hover:text-craft-gray-900 cursor-pointer p-3"
          >
            {t("nav.newsletter")}
          </Link>
        </DropdownMenuItem>
        
        <DropdownMenuItem asChild>
          <Link
            to="/imei-check"
            className="flex items-center hover:bg-craft-gray-50 rounded-lg transition-colors text-craft-mint hover:text-craft-mint/80 cursor-pointer p-3 font-medium"
          >
            {t("nav.freeImeiCheck")}
          </Link>
        </DropdownMenuItem>
        
        <DropdownMenuItem asChild>
          <a
            href="https://t.me/zwanski_tech"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 hover:bg-craft-gray-50 rounded-lg transition-colors text-craft-blue hover:text-craft-blue/80 cursor-pointer p-3"
          >
            <MessageSquare className="h-4 w-4" />
            {t("nav.joinTelegram")}
          </a>
        </DropdownMenuItem>
        
        <DropdownMenuItem asChild>
          <Link
            to="/chat"
            className="flex items-center gap-3 hover:bg-craft-gray-50 rounded-lg transition-colors text-craft-gray-700 hover:text-craft-gray-900 cursor-pointer p-3"
          >
            <MessageCircle className="h-4 w-4" />
            {t("nav.liveChat")}
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
