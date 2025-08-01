
import React, { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/heroui";
import { Input } from "@/components/ui/input";
import { FormControl, FormField, FormItem, FormLabel, Form } from "@/components/heroui";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Sparkles } from "lucide-react";
import { toast } from "sonner";

// Form validation schema
const formSchema = z.object({
  username: z.string().min(3, {
    message: "Username must be at least 3 characters",
  }).max(20, {
    message: "Username must be 20 characters or less",
  }).regex(/^[a-zA-Z0-9_-]+$/, {
    message: "Username can only contain letters, numbers, underscores and dashes",
  }),
});

type FormData = z.infer<typeof formSchema>;

const LoginForm = () => {
  const { user, isAuthenticated } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Initialize form with react-hook-form and zod validation
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
    },
  });

  // Handle form submission - for chat this just sets a display name
  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    
    try {
      // Simulating API request delay
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      toast.success("Welcome to the chat!", {
        description: "You've successfully joined the chat.",
      });
    } catch (error) {
      console.error("Error during chat login:", error);
      toast.error("Login failed", {
        description: "Please try again later.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // If user is authenticated, show they're ready for chat
  if (isAuthenticated && user) {
    return (
      <div className="p-8 max-w-md mx-auto text-center">
        <div className="mb-6">
          <h2 className="text-xl font-bold mb-2">Welcome to Chat!</h2>
          <p className="text-muted-foreground">You're signed in and ready to chat</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8 max-w-md mx-auto">
      <div className="text-center mb-6">
        <h2 className="text-xl font-bold mb-2">Join the Magical Chat</h2>
        <p className="text-muted-foreground">Please sign in to start chatting</p>
      </div>
      
      <div className="text-center">
        <Button
          onClick={() => window.location.href = '/auth'}
          className="w-full group relative overflow-hidden"
          aria-label="open-authentication"
        >
          <span className="relative z-10 flex items-center justify-center gap-2">
            <Sparkles className="h-4 w-4 transition-transform group-hover:rotate-12" />
            Sign In to Chat
          </span>
          <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 transform group-hover:scale-105 transition-transform"></div>
        </Button>
      </div>
      
      <p className="mt-6 text-center text-sm text-muted-foreground">
        Sign in to join the live chat. Your messages will be stored securely.
      </p>
    </div>
  );
};

export default LoginForm;
