
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { format } from "date-fns";

interface Message {
  id: string;
  sender: string;
  username: string;
  avatar?: string;
  message: string;
  timestamp: string;
}

interface ChatMessageProps {
  message: Message;
  isOwnMessage: boolean;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message, isOwnMessage }) => {
  const formattedTime = format(new Date(message.timestamp), "h:mm a");
  const isSystemMessage = message.sender === "system";

  if (isSystemMessage) {
    return (
      <div className="flex justify-center my-4">
        <div className="bg-muted/50 text-muted-foreground px-4 py-2 rounded-full text-sm">
          {message.message}
        </div>
      </div>
    );
  }

  return (
    <div 
      className={cn(
        "flex gap-3 max-w-[80%]", 
        isOwnMessage ? "ml-auto flex-row-reverse" : ""
      )}
    >
      <Avatar className="h-8 w-8 border border-primary/10">
        <AvatarImage src={message.avatar} alt={message.username} />
        <AvatarFallback>{message.username[0].toUpperCase()}</AvatarFallback>
      </Avatar>

      <div 
        className={cn(
          "rounded-2xl p-3 flex flex-col",
          isOwnMessage 
            ? "bg-primary text-primary-foreground rounded-tr-none" 
            : "bg-muted rounded-tl-none"
        )}
      >
        <div className="flex items-center gap-2 mb-1">
          <span className={cn(
            "text-xs font-medium",
            isOwnMessage ? "text-primary-foreground/90" : "text-muted-foreground"
          )}>
            {isOwnMessage ? "You" : message.username}
          </span>
          <span className={cn(
            "text-[10px]",
            isOwnMessage ? "text-primary-foreground/70" : "text-muted-foreground/70"
          )}>
            {formattedTime}
          </span>
        </div>
        <p className="break-words">{message.message}</p>
      </div>
    </div>
  );
};

export default ChatMessage;
