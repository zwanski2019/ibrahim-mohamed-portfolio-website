
import React, { useState, useEffect, useRef } from "react";
import { Helmet } from "react-helmet-async";
import { useAuth } from "@/context/AuthContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sparkles, Send, LogOut } from "lucide-react";
import ChatMessage from "@/components/ChatMessage";
import LoginForm from "@/components/LoginForm";

// Mock messages for initial display
const initialMessages = [
  { id: "1", sender: "system", username: "System", message: "Welcome to the chat! This is a demo of the live chat functionality.", timestamp: new Date().toISOString() },
  { id: "2", sender: "system", username: "System", message: "Sign up with a username to start chatting!", timestamp: new Date().toISOString() }
];

const Chat = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const [messages, setMessages] = useState(initialMessages);
  const [newMessage, setNewMessage] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Auto-scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Send a new message
  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newMessage.trim() || !user) return;
    
    const message = {
      id: `msg_${Date.now()}`,
      sender: user.id,
      username: user.username,
      avatar: user.avatar,
      message: newMessage.trim(),
      timestamp: new Date().toISOString()
    };
    
    // Add to local messages (would be sent to backend in real implementation)
    setMessages((prev) => [...prev, message]);
    setNewMessage("");
  };

  return (
    <>
      <Helmet>
        <title>Live Chat | ZWANSKI</title>
        <meta name="description" content="Join the live chat and connect with other users in real-time" />
      </Helmet>

      <Navbar />
      
      <main className="container mx-auto px-4 py-24 min-h-screen">
        <div className="max-w-4xl mx-auto bg-card/30 backdrop-blur-md rounded-xl shadow-xl border border-primary/20 overflow-hidden">
          <div className="p-6 border-b border-primary/20 flex justify-between items-center">
            <h1 className="text-2xl font-bold flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-primary" />
              Magic Chat
            </h1>
            {isAuthenticated && (
              <Button 
                variant="outline" 
                size="sm" 
                onClick={logout}
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
                {messages.map((msg) => (
                  <ChatMessage 
                    key={msg.id}
                    message={msg}
                    isOwnMessage={msg.sender === user?.id}
                  />
                ))}
                <div ref={messagesEndRef} />
              </div>
              
              <form 
                onSubmit={handleSendMessage}
                className="border-t border-primary/20 p-4 flex gap-2"
              >
                <Input
                  placeholder="Type your message..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  className="flex-1 bg-background/60"
                />
                <Button type="submit">
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
