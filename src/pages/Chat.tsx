
import React, { useState, useEffect, useRef } from "react";
import { Helmet } from "react-helmet-async";
import { useAuth } from "@/context/AuthContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sparkles, Send, LogOut, Wifi, WifiOff } from "lucide-react";
import ChatMessage from "@/components/ChatMessage";
import LoginForm from "@/components/LoginForm";
import { useWebSocket } from "@/hooks/useWebSocket";

const Chat = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const [newMessage, setNewMessage] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const { messages, isConnected, isConnecting, connect, disconnect, sendMessage } = useWebSocket({
    username: user?.username,
    avatar: user?.avatar
  });

  // Auto-scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Connect when user is authenticated
  useEffect(() => {
    if (isAuthenticated && user?.username) {
      connect();
    } else {
      disconnect();
    }
  }, [isAuthenticated, user?.username, connect, disconnect]);

  // Send a new message
  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newMessage.trim() || !isConnected) return;
    
    sendMessage(newMessage);
    setNewMessage("");
  };

  const handleLogout = () => {
    disconnect();
    logout();
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
                    <span className="text-sm">Disconnected</span>
                  </div>
                )}
              </div>
            </div>
            {isAuthenticated && (
              <Button 
                variant="outline" 
                size="sm" 
                onClick={handleLogout}
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
                {messages.length === 0 ? (
                  <div className="text-center text-muted-foreground py-8">
                    <Sparkles className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>Welcome to the live chat!</p>
                    <p className="text-sm">Start a conversation with other users.</p>
                  </div>
                ) : (
                  messages.map((msg) => (
                    <ChatMessage 
                      key={msg.id}
                      message={{
                        id: msg.id,
                        sender: msg.username === user?.username ? user.id : 'other',
                        username: msg.username,
                        avatar: msg.avatar,
                        message: msg.message,
                        timestamp: msg.timestamp
                      }}
                      isOwnMessage={msg.username === user?.username}
                    />
                  ))
                )}
                <div ref={messagesEndRef} />
              </div>
              
              <form 
                onSubmit={handleSendMessage}
                className="border-t border-primary/20 p-4 flex gap-2"
              >
                <Input
                  placeholder={isConnected ? "Type your message..." : "Connecting..."}
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  className="flex-1 bg-background/60"
                  disabled={!isConnected}
                />
                <Button type="submit" disabled={!isConnected || !newMessage.trim()}>
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
