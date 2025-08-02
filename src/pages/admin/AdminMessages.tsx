import React, { useState, useEffect } from "react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/integrations/supabase/client";
import { Search, Mail, MailOpen, Reply, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { formatDistanceToNow } from "date-fns";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject: string | null;
  message: string;
  read: boolean;
  replied: boolean;
  created_at: string;
}

export default function AdminMessages() {
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedMessage, setSelectedMessage] = useState<ContactMessage | null>(null);
  const [replyContent, setReplyContent] = useState("");

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      const { data, error } = await supabase
        .from("contact_messages")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setMessages(data || []);
    } catch (error) {
      console.error("Error fetching messages:", error);
      toast.error("Failed to load messages");
    } finally {
      setLoading(false);
    }
  };

  const markAsRead = async (messageId: string) => {
    try {
      const { error } = await supabase
        .from("contact_messages")
        .update({ read: true })
        .eq("id", messageId);

      if (error) throw error;

      setMessages(messages.map(msg =>
        msg.id === messageId ? { ...msg, read: true } : msg
      ));
    } catch (error) {
      console.error("Error marking message as read:", error);
      toast.error("Failed to update message");
    }
  };

  const markAsReplied = async (messageId: string) => {
    try {
      const { error } = await supabase
        .from("contact_messages")
        .update({ replied: true })
        .eq("id", messageId);

      if (error) throw error;

      setMessages(messages.map(msg =>
        msg.id === messageId ? { ...msg, replied: true } : msg
      ));

      toast.success("Message marked as replied");
      setSelectedMessage(null);
      setReplyContent("");
    } catch (error) {
      console.error("Error marking message as replied:", error);
      toast.error("Failed to update message");
    }
  };

  const deleteMessage = async (messageId: string) => {
    try {
      const { error } = await supabase
        .from("contact_messages")
        .delete()
        .eq("id", messageId);

      if (error) throw error;

      setMessages(messages.filter(msg => msg.id !== messageId));
      toast.success("Message deleted successfully");
    } catch (error) {
      console.error("Error deleting message:", error);
      toast.error("Failed to delete message");
    }
  };

  const filteredMessages = messages.filter(message =>
    message.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    message.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    message.subject?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    message.message.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const unreadCount = messages.filter(msg => !msg.read).length;

  if (loading) {
    return (
      <AdminLayout>
        <div className="space-y-6">
          <h2 className="text-2xl font-bold">Contact Messages</h2>
          <div className="space-y-4">
            {[...Array(5)].map((_, i) => (
              <Card key={i} className="animate-pulse">
                <CardContent className="p-6">
                  <div className="space-y-3">
                    <div className="h-4 bg-muted rounded w-3/4"></div>
                    <div className="h-3 bg-muted rounded w-1/2"></div>
                    <div className="h-3 bg-muted rounded w-full"></div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Contact Messages</h2>
            <p className="text-muted-foreground">
              Manage contact form submissions {unreadCount > 0 && `(${unreadCount} unread)`}
            </p>
          </div>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Label htmlFor="message-search" className="sr-only">
            Search messages
          </Label>
          <Input
            id="message-search"
            placeholder="Search messages by name, email, or content..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Messages List */}
        <div className="space-y-4">
          {filteredMessages.map((message) => (
            <Card 
              key={message.id} 
              className={`hover:shadow-md transition-shadow ${!message.read ? 'ring-2 ring-primary/20' : ''}`}
            >
              <CardContent className="p-6">
                <div className="space-y-4">
                  {/* Message Header */}
                  <div className="flex items-start justify-between">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <h4 className="font-semibold">{message.name}</h4>
                        {!message.read && (
                          <Badge variant="destructive">Unread</Badge>
                        )}
                        {message.replied && (
                          <Badge variant="secondary">Replied</Badge>
                        )}
                      </div>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span>{message.email}</span>
                        <span>{formatDistanceToNow(new Date(message.created_at), { addSuffix: true })}</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      {!message.read && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => markAsRead(message.id)}
                        >
                          <MailOpen className="h-4 w-4 mr-1" />
                          Mark Read
                        </Button>
                      )}
                      
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => {
                              setSelectedMessage(message);
                              if (!message.read) markAsRead(message.id);
                            }}
                          >
                            <Reply className="h-4 w-4 mr-1" />
                            Reply
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-2xl">
                          <DialogHeader>
                            <DialogTitle>Reply to {message.name}</DialogTitle>
                            <DialogDescription>
                              Responding to message from {message.email}
                            </DialogDescription>
                          </DialogHeader>
                          
                          <div className="space-y-4">
                            {/* Original Message */}
                            <div className="bg-muted p-4 rounded-lg">
                              <h5 className="font-medium mb-2">Original Message:</h5>
                              {message.subject && (
                                <p className="text-sm font-medium mb-2">Subject: {message.subject}</p>
                              )}
                              <p className="text-sm">{message.message}</p>
                            </div>
                            
                            {/* Reply Form */}
                            <div className="space-y-2">
                              <label className="text-sm font-medium">Your Reply:</label>
                              <Textarea
                                placeholder="Type your reply here..."
                                value={replyContent}
                                onChange={(e) => setReplyContent(e.target.value)}
                                rows={6}
                              />
                            </div>
                          </div>
                          
                          <DialogFooter>
                            <Button
                              variant="outline"
                              onClick={() => {
                                setSelectedMessage(null);
                                setReplyContent("");
                              }}
                            >
                              Cancel
                            </Button>
                            <Button
                              onClick={() => markAsReplied(message.id)}
                              disabled={!replyContent.trim()}
                            >
                              Mark as Replied
                            </Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                      
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => deleteMessage(message.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  {/* Message Content */}
                  {message.subject && (
                    <div>
                      <span className="text-sm font-medium text-muted-foreground">Subject: </span>
                      <span className="font-medium">{message.subject}</span>
                    </div>
                  )}
                  
                  <div className="bg-muted/30 p-4 rounded-lg">
                    <p className="text-sm whitespace-pre-wrap">{message.message}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
          
          {filteredMessages.length === 0 && (
            <Card>
              <CardContent className="text-center py-12">
                <Mail className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                <p className="text-muted-foreground">No messages found matching your search.</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </AdminLayout>
  );
}