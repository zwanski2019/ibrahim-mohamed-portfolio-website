
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
      // Store the contact message in the database
      const { error } = await supabase
        .from('contact_messages')
        .insert([data]);
      
      if (error) throw error;

      // Send confirmation email with Trustpilot BCC integration
      try {
        const emailHtml = `
          <div style="font-family: Inter, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
            <h1 style="color: #1a202c; font-size: 28px; margin-bottom: 24px;">Thank You for Contacting Us!</h1>
            
            <p style="color: #4a5568; font-size: 16px; line-height: 24px;">Hi ${data.name},</p>
            
            <p style="color: #4a5568; font-size: 16px; line-height: 24px;">
              Thank you for reaching out to Zwanski Tech. We have successfully received your message and our team will review it carefully.
            </p>

            <div style="background: #f7fafc; border: 1px solid #e2e8f0; border-radius: 6px; padding: 20px; margin: 24px 0;">
              <h3 style="color: #2d3748; font-size: 18px; margin: 0 0 12px 0;">Your Message Details:</h3>
              ${data.subject ? `<p style="margin: 8px 0;"><strong>Subject:</strong> ${data.subject}</p>` : ''}
              <p style="margin: 8px 0;"><strong>Email:</strong> ${data.email}</p>
              <p style="margin: 8px 0;"><strong>Message:</strong></p>
              <div style="background: white; border: 1px solid #e2e8f0; border-radius: 4px; padding: 12px; margin: 8px 0;">
                ${data.message.replace(/\n/g, '<br>')}
              </div>
            </div>

            <p style="color: #4a5568; font-size: 16px; line-height: 24px;"><strong>What happens next?</strong></p>
            
            <p style="color: #4a5568; font-size: 16px; line-height: 24px;">
              • Our team typically responds within 24-48 hours<br/>
              • For urgent technical issues, we prioritize faster response times<br/>
              • You'll receive a detailed response at ${data.email}
            </p>

            <p style="color: #4a5568; font-size: 16px; line-height: 24px; margin-top: 32px; padding-top: 24px; border-top: 1px solid #e2e8f0;">
              Best regards,<br/>
              The Zwanski Tech Team<br/>
              <a href="https://zwanski.org" style="color: #3182ce; text-decoration: none;">zwanski.org</a>
            </p>

            <p style="color: #a0aec0; font-size: 12px; text-align: center; margin-top: 32px;">
              Zwanski Tech - Empowering migrants, students, and underserved communities through technology education and services.
            </p>
          </div>
        `;

        await supabase.functions.invoke('send-customer-email', {
          body: {
            to: data.email,
            subject: `Thank you for contacting Zwanski Tech${data.subject ? ` - Re: ${data.subject}` : ''}`,
            html: emailHtml,
            type: 'contact-confirmation',
            customerName: data.name,
          },
        });

        console.log('Confirmation email sent with Trustpilot BCC');
      } catch (emailError) {
        console.warn('Failed to send confirmation email:', emailError);
        // Don't throw here - the contact form submission was successful
      }
    },
    onSuccess: () => {
      toast({
        title: "Message sent successfully!",
        description: "Thank you for your message. We'll get back to you soon. Check your email for confirmation.",
      });
    },
    onError: (error) => {
      console.error('Contact form error:', error);
      toast({
        title: "Error sending message",
        description: "Please try again later or contact us directly.",
        variant: "destructive",
      });
    },
  });
};
