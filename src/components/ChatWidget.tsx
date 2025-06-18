import React, { useState, useEffect, useRef } from "react";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MessageCircle, Send, X, Users, Wifi, WifiOff, AlertCircle } from "lucide-react";
import ChatMessage from "@/components/ChatMessage";
import LoginForm from "@/components/LoginForm";
import { useWebSocket } from "@/hooks/useWebSocket";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { supabase } from "@/integrations/supabase/client";

const ChatWidget = () => {
  const { user, isAuthenticated, signOut } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [newMessage, setNewMessage] = useState("");
  const [userProfile, setUserProfile] = useState<any>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();
  
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
      const { data, error } = await supabase
        .from("profiles")
        .select("full_name, avatar_url")
        .eq("id", user.id)
        .single();

      if (error && error.code !== 'PGRST116') {
        console.error("Error fetching profile:", error);
        return;
      }

      setUserProfile(data);
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
  
  const { 
    messages, 
    isConnected, 
    isConnecting, 
    connectionError,
    connect, 
    disconnect, 
    sendMessage,
    retryConnection
  } = useWebSocket({
    username: getDisplayName(),
    avatar: getAvatarUrl()
  });

  // Auto-scroll to bottom of messages
  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isOpen]);

  // Connect when user is authenticated and widget is open
  useEffect(() => {
    if (isAuthenticated && userProfile && isOpen) {
      connect();
    } else if (!isOpen) {
      disconnect();
    }
  }, [isAuthenticated, userProfile, isOpen, connect, disconnect]);

  // Send a new message
  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newMessage.trim()) return;
    
    if (!isConnected) {
      toast({
        title: "Not Connected",
        description: "Please wait for connection to be established",
        variant: "destructive",
      });
      return;
    }
    
    const success = sendMessage(newMessage);
    if (success) {
      setNewMessage("");
    } else {
      toast({
        title: "Message Failed",
        description: "Failed to send message. Please try again.",
        variant: "destructive",
      });
    }
  };

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const handleSignOut = async () => {
    disconnect();
    await signOut();
  };

  return (
    <div className="fixed bottom-4 left-4 z-50">
      {/* Chat Toggle Button */}
      {!isOpen && (
        <Button
          onClick={toggleChat}
          className="h-14 w-14 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 bg-primary hover:bg-primary/90 relative"
        >
          <MessageCircle className="h-6 w-6" />
          {messages.length > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center animate-pulse">
              {messages.length > 9 ? '9+' : messages.length}
            </span>
          )}
        </Button>
      )}

      {/* Chat Widget */}
      {isOpen && (
        <div className="bg-card/95 backdrop-blur-md rounded-lg shadow-2xl border border-primary/20 w-80 h-96 flex flex-col animate-scale-in">
          {/* Header */}
          <div className="p-3 border-b border-primary/20 flex justify-between items-center bg-primary/5 rounded-t-lg">
            <div className="flex items-center gap-2">
              <MessageCircle className="h-4 w-4 text-primary" />
              <h3 className="font-semibold text-sm">Live Chat</h3>
              <div className="flex items-center gap-1">
                {isConnecting ? (
                  <WifiOff className="h-3 w-3 text-yellow-500 animate-pulse" />
                ) : isConnected ? (
                  <Wifi className="h-3 w-3 text-green-500" />
                ) : (
                  <WifiOff className="h-3 w-3 text-red-500" />
                )}
              </div>
            </div>
            <div className="flex items-center gap-1">
              <Users className="h-3 w-3 text-muted-foreground" />
              <span className="text-xs text-muted-foreground">
                {isConnected ? 'Online' : 'Offline'}
              </span>
              <Button
                variant="ghost"
                size="sm"
                onClick={toggleChat}
                className="h-6 w-6 p-0 ml-2"
              >
                <X className="h-3 w-3" />
              </Button>
            </div>
          </div>

          {!isAuthenticated ? (
            <div className="flex-1 p-3 overflow-y-auto">
              <div className="text-center mb-4">
                <p className="text-sm text-muted-foreground mb-2">
                  Join the conversation!
                </p>
              </div>
              <LoginForm />
            </div>
          ) : (
            <>
              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-2 space-y-2">
                {connectionError && (
                  <div className="bg-red-50 border border-red-200 rounded p-2 mb-2">
                    <div className="flex items-center gap-1 text-red-800 text-xs">
                      <AlertCircle className="h-3 w-3" />
                      <span>Connection Error</span>
                    </div>
                    <p className="text-red-700 text-xs mt-1">{connectionError}</p>
                    <Button
                      onClick={retryConnection}
                      size="sm"
                      className="mt-1 h-6 text-xs"
                      disabled={isConnecting}
                    >
                      {isConnecting ? "Retrying..." : "Retry"}
                    </Button>
                  </div>
                )}
                
                {messages.length === 0 ? (
                  <div className="text-center text-muted-foreground py-4">
                    <MessageCircle className="h-8 w-8 mx-auto mb-2 opacity-50" />
                    <p className="text-xs">No messages yet</p>
                    <p className="text-xs">Start the conversation!</p>
                  </div>
                ) : (
                  messages.map((msg) => (
                    <ChatMessage 
                      key={msg.id}
                      message={{
                        id: msg.id,
                        sender: msg.username === getDisplayName() ? user!.id : 'other',
                        username: msg.username,
                        avatar: msg.avatar,
                        message: msg.message,
                        timestamp: msg.timestamp
                      }}
                      isOwnMessage={msg.username === getDisplayName()}
                    />
                  ))
                )}
                <div ref={messagesEndRef} />
              </div>
              
              {/* Input */}
              <form 
                onSubmit={handleSendMessage}
                className="border-t border-primary/20 p-2 flex gap-2"
              >
                <Input
                  placeholder={
                    isConnecting 
                      ? "Connecting..." 
                      : isConnected 
                        ? "Type a message..." 
                        : "Disconnected"
                  }
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  className="flex-1 h-8 text-xs"
                  disabled={!isConnected}
                />
                <Button 
                  type="submit" 
                  disabled={!isConnected || !newMessage.trim()}
                  size="sm"
                  className="h-8 w-8 p-0"
                >
                  <Send className="h-3 w-3" />
                </Button>
              </form>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default ChatWidget;
