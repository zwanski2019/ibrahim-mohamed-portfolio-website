import React, { useState, useEffect, useRef } from "react";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MessageCircle, Send, X, Users, Wifi, WifiOff, AlertCircle } from "lucide-react";
import ChatMessage from "@/components/ChatMessage";
import LoginForm from "@/components/LoginForm";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { supabase } from "@/integrations/supabase/client";
import { trackEvent } from "@/utils/analytics";
interface ChatMessageType {
  id: number;
  message: string;
  username: string;
  avatar_url?: string;
  created_at: string;
  user_id?: string;
}
const ChatWidget = () => {
  const {
    user,
    isAuthenticated,
    signOut
  } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [newMessage, setNewMessage] = useState("");
  const [userProfile, setUserProfile] = useState<any>(null);
  const [messages, setMessages] = useState<ChatMessageType[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const {
    toast
  } = useToast();

  // Fetch user profile data when user is authenticated
  useEffect(() => {
    if (isAuthenticated && user) {
      fetchUserProfile();
    } else {
      setUserProfile(null);
    }
  }, [isAuthenticated, user]);
  const fetchUserProfile = async () => {
    if (!user) return;
    try {
      const {
        data,
        error
      } = await supabase.from("profiles").select("full_name, avatar_url").eq("id", user.id).single();
      if (error && error.code !== 'PGRST116') {
        console.error("Error fetching profile:", error);
        return;
      }
      setUserProfile(data);
      trackEvent('profile_fetch', { user_id: user.id, email: user.email });
    } catch (error) {
      console.error("Error fetching user profile:", error);
    }
  };
  const getDisplayName = () => {
    if (userProfile?.full_name) return userProfile.full_name;
    if (user?.email) return user.email.split('@')[0];
    return 'User';
  };
  const getAvatarUrl = () => {
    return userProfile?.avatar_url || '';
  };

  // Fetch messages from Supabase
  const fetchMessages = async () => {
    try {
      const {
        data,
        error
      } = await supabase.from("chat_messages").select("*").order("created_at", {
        ascending: true
      });
      if (error) {
        console.error("Error fetching messages:", error);
        return;
      }
      setMessages(data || []);
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  };

  // Load messages when chat opens and user is authenticated
  useEffect(() => {
    if (isAuthenticated && isOpen) {
      fetchMessages();
    }
  }, [isAuthenticated, isOpen]);

  // Set up real-time subscription for new messages
  useEffect(() => {
    if (!isAuthenticated || !isOpen) return;
    const channel = supabase.channel('chat-messages').on('postgres_changes', {
      event: 'INSERT',
      schema: 'public',
      table: 'chat_messages'
    }, payload => {
      const newMessage = payload.new as ChatMessageType;
      setMessages(prev => [...prev, newMessage]);
    }).subscribe();
    return () => {
      supabase.removeChannel(channel);
    };
  }, [isAuthenticated, isOpen]);

  // Auto-scroll to bottom of messages
  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({
        behavior: "smooth"
      });
    }
  }, [messages, isOpen]);

  // Send a new message
  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || !isAuthenticated || !user) return;
    setIsLoading(true);
    try {
      const {
        error
      } = await supabase.from("chat_messages").insert({
        message: newMessage.trim(),
        username: getDisplayName(),
        avatar_url: getAvatarUrl(),
        user_id: user.id
      });
      if (error) {
        toast({
          title: "Message Failed",
          description: "Failed to send message. Please try again.",
          variant: "destructive"
        });
        console.error("Error sending message:", error);
        return;
      }
      setNewMessage("");
    } catch (error) {
      toast({
        title: "Message Failed",
        description: "Failed to send message. Please try again.",
        variant: "destructive"
      });
      console.error("Error sending message:", error);
    } finally {
      setIsLoading(false);
    }
  };
  const toggleChat = () => {
    setIsOpen(!isOpen);
  };
  const handleSignOut = async () => {
    await signOut();
  };
  return <div className="fixed bottom-4 right-4 z-50">
      {/* Chat Toggle Button */}
      {!isOpen}

      {/* Chat Widget */}
      {isOpen && <div className="bg-card/95 backdrop-blur-md rounded-lg shadow-2xl border border-primary/20 w-80 h-96 flex flex-col animate-scale-in">
          {/* Header */}
          <div className="p-3 border-b border-primary/20 flex justify-between items-center bg-primary/5 rounded-t-lg">
            <div className="flex items-center gap-2">
              <MessageCircle className="h-4 w-4 text-primary" />
              <h3 className="font-semibold text-sm">Live Chat</h3>
              <div className="flex items-center gap-1">
                <Wifi className="h-3 w-3 text-green-500" />
              </div>
            </div>
            <div className="flex items-center gap-1">
              <Users className="h-3 w-3 text-muted-foreground" />
              <span className="text-xs text-muted-foreground">
                Connected
              </span>
              <Button variant="ghost" size="sm" onClick={toggleChat} className="h-6 w-6 p-0 ml-2">
                <X className="h-3 w-3" />
              </Button>
            </div>
          </div>

          {!isAuthenticated ? <div className="flex-1 p-3 overflow-y-auto">
              <div className="text-center mb-4">
                <p className="text-sm text-muted-foreground mb-2">
                  Join the conversation!
                </p>
              </div>
              <LoginForm />
            </div> : <>
              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-2 space-y-2">
                {messages.length === 0 ? <div className="text-center text-muted-foreground py-4">
                    <MessageCircle className="h-8 w-8 mx-auto mb-2 opacity-50" />
                    <p className="text-xs">You're now connected.</p>
                    <p className="text-xs">Messages are stored securely.</p>
                  </div> : messages.map(msg => <ChatMessage key={msg.id} message={{
            id: msg.id.toString(),
            sender: msg.username === getDisplayName() ? user!.id : 'other',
            username: msg.username,
            avatar: msg.avatar_url,
            message: msg.message,
            timestamp: msg.created_at
          }} isOwnMessage={msg.username === getDisplayName()} />)}
                <div ref={messagesEndRef} />
              </div>
              
              {/* Input */}
              <form onSubmit={handleSendMessage} className="border-t border-primary/20 p-2 flex gap-2">
                <Label htmlFor="widget-message" className="sr-only">
                  Message
                </Label>
                <Input
                  id="widget-message"
                  placeholder="Type a message..."
                  value={newMessage}
                  onChange={e => setNewMessage(e.target.value)}
                  className="flex-1 h-8 text-xs"
                  disabled={isLoading}
                />
                <Button type="submit" disabled={isLoading || !newMessage.trim()} size="sm" className="h-8 w-8 p-0">
                  <Send className="h-3 w-3" />
                </Button>
              </form>
            </>}
        </div>}
    </div>;
};
export default ChatWidget;