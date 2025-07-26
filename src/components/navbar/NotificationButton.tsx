import React from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Bell } from "lucide-react";

interface NotificationButtonProps {
  unreadCount: number;
}

export const NotificationButton: React.FC<NotificationButtonProps> = ({ unreadCount }) => {
  return (
    <Button variant="ghost" size="sm" className="relative">
      <Bell className="h-4 w-4" />
      {unreadCount > 0 && (
        <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs">
          {unreadCount > 9 ? "9+" : unreadCount}
        </Badge>
      )}
    </Button>
  );
};