
import React, { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FormControl, FormField, FormItem, FormLabel, Form } from "@/components/ui/form";
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
  const { login } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Initialize form with react-hook-form and zod validation
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
    },
  });

  // Handle form submission
  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    
    try {
      // Simulating API request delay
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      // Login the user
      login(data.username);
      
      toast.success("Welcome to the chat!", {
        description: "You've successfully signed in.",
      });
    } catch (error) {
      console.error("Error during login:", error);
      toast.error("Login failed", {
        description: "Please try again later.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="p-8 max-w-md mx-auto">
      <div className="text-center mb-6">
        <h2 className="text-xl font-bold mb-2">Join the Magical Chat</h2>
        <p className="text-muted-foreground">Enter a username to start chatting</p>
      </div>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input 
                    placeholder="coolwizard123" 
                    className="bg-background/50 backdrop-blur-sm border-purple-500/30 focus:border-purple-500"
                    {...field} 
                  />
                </FormControl>
              </FormItem>
            )}
          />
          
          <Button 
            type="submit" 
            className="w-full group relative overflow-hidden" 
            disabled={isSubmitting}
          >
            <span className="relative z-10 flex items-center justify-center gap-2">
              <Sparkles className="h-4 w-4 transition-transform group-hover:rotate-12" />
              {isSubmitting ? "Signing In..." : "Enter the Magic Chat"}
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 transform group-hover:scale-105 transition-transform"></div>
          </Button>
        </form>
      </Form>
      
      <p className="mt-6 text-center text-sm text-muted-foreground">
        This is a demo chat app. Messages are not persistent and will be lost on page refresh.
      </p>
    </div>
  );
};

export default LoginForm;
