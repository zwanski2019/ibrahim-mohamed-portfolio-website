
import React, { useState, useEffect, useRef } from "react";
import { Helmet } from "react-helmet-async";
import { useAuth } from "@/context/AuthContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Sparkles, Send, LogOut, Wifi, WifiOff, AlertCircle } from "lucide-react";
import ChatMessage from "@/components/ChatMessage";
import LoginForm from "@/components/LoginForm";
import { useWebSocket } from "@/hooks/useWebSocket";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Profile } from "@/types/profile";

const Chat = () => {
  const { user, isAuthenticated, signOut } = useAuth();
  const [newMessage, setNewMessage] = useState("");
  const [userProfile, setUserProfile] = useState<Profile | null>(null);
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
        .select("id, full_name, avatar_url, rating, verified")
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
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Connect when user is authenticated
  useEffect(() => {
    if (isAuthenticated && userProfile) {
      connect();
    } else {
      disconnect();
    }
  }, [isAuthenticated, userProfile, connect, disconnect]);

  // Show connection status notifications
  useEffect(() => {
    if (isAuthenticated && userProfile) {
      if (isConnected) {
        toast({
          title: "Connected",
          description: "You're now connected to the chat",
        });
      } else if (connectionError && !isConnecting) {
        toast({
          title: "Connection Error",
          description: connectionError,
          variant: "destructive",
        });
      }
    }
  }, [isConnected, isConnecting, connectionError, isAuthenticated, userProfile, toast]);

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

  const handleSignOut = async () => {
    disconnect();
    await signOut();
  };

  const handleRetryConnection = () => {
    if (isAuthenticated && userProfile && !isConnecting) {
      retryConnection()
    }
  };

  return (
    <>
      <Helmet>
        <title>Live Chat | SOS Services</title>
        <meta name="description" content="Join the live chat and connect with other users in real-time" />
      </Helmet>

      <Navbar />
      
      <main className="container mx-auto px-4 py-24 min-h-screen">
        <div className="max-w-4xl mx-auto bg-card/30 backdrop-blur-md rounded-xl shadow-xl border border-primary/20 overflow-hidden">
          <div className="p-6 border-b border-primary/20 flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-primary" />
              <h1 className="text-2xl font-bold">Live Chat</h1>
              <div className="flex items-center gap-2 ml-4">
                {isConnecting ? (
                  <div className="flex items-center gap-2 text-yellow-500">
                    <WifiOff className="h-4 w-4 animate-pulse" />
                    <span className="text-sm">Connecting...</span>
                  </div>
                ) : isConnected ? (
                  <div className="flex items-center gap-2 text-green-500">
                    <Wifi className="h-4 w-4" />
                    <span className="text-sm">Connected</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-2 text-red-500">
                    <WifiOff className="h-4 w-4" />
                    <span className="text-sm">
                      {connectionError || "Disconnected"}
                    </span>
                    {isAuthenticated && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={handleRetryConnection}
                        className="ml-2"
                      >
                        <AlertCircle className="h-4 w-4 mr-1" />
                        Retry
                      </Button>
                    )}
                  </div>
                )}
              </div>
            </div>
            {isAuthenticated && (
              <Button 
                variant="outline" 
                size="sm" 
                onClick={handleSignOut}
                className="gap-2"
              >
                <LogOut className="h-4 w-4" />
                Sign Out
              </Button>
            )}
          </div>

          {!isAuthenticated ? (
            <LoginForm />
          ) : (
            <div className="flex flex-col h-[600px]">
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {connectionError && (
                  <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
                    <div className="flex items-center gap-2 text-red-800">
                      <AlertCircle className="h-4 w-4" />
                      <span className="font-medium">Connection Error</span>
                    </div>
                    <p className="text-red-700 text-sm mt-1">{connectionError}</p>
                    <Button
                      onClick={handleRetryConnection}
                      size="sm"
                      className="mt-2"
                      disabled={isConnecting}
                    >
                      {isConnecting ? "Retrying..." : "Retry Connection"}
                    </Button>
                  </div>
                )}
                
                {messages.length === 0 ? (
                  <div className="text-center text-muted-foreground py-8">
                    <Sparkles className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>Welcome to the live chat!</p>
                    <p className="text-sm">Start a conversation with other users.</p>
                    {!isConnected && !connectionError && (
                      <p className="text-sm text-yellow-600 mt-2">
                        Waiting for connection...
                      </p>
                    )}
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
              
              <form
                onSubmit={handleSendMessage}
                className="border-t border-primary/20 p-4 flex gap-2"
              >
                <Label htmlFor="chat-message" className="sr-only">
                  Message
                </Label>
                <Input
                  id="chat-message"
                  placeholder={
                    isConnecting
                      ? "Connecting..."
                      : isConnected
                        ? "Type your message..."
                        : connectionError
                          ? "Connection error - check above"
                          : "Disconnected - check connection"
                  }
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  className="flex-1 bg-background/60"
                  disabled={!isConnected}
                />
                <Button 
                  type="submit" 
                  disabled={!isConnected || !newMessage.trim()}
                  className="min-w-[80px]"
                >
                  <Send className="h-4 w-4" />
                  <span className="sr-only">Send</span>
                </Button>
              </form>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </>
  );
};

export default Chat;
