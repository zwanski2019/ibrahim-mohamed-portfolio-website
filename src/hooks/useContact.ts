
import { useMutation } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface ContactFormData {
  name: string;
  email: string;
  subject?: string;
  message: string;
}

export const useContact = () => {
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (data: ContactFormData) => {
      const { error } = await supabase
        .from('contact_messages')
        .insert([data]);
      
      if (error) throw error;
    },
    onSuccess: () => {
      toast({
        title: "Message sent successfully!",
        description: "Thank you for your message. I'll get back to you soon.",
      });
    },
    onError: (error) => {
      console.error('Contact form error:', error);
      toast({
        title: "Error sending message",
        description: "Please try again later or contact me directly.",
        variant: "destructive",
      });
    },
  });
};
