import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@4.0.0";
import { logflare } from "../_shared/logflare.ts";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface CustomerEmailRequest {
  to: string;
  subject: string;
  html: string;
  type: 'contact-confirmation' | 'service-update' | 'thank-you' | 'internal' | 'general-inquiry' | 'business-contact';
  customerName?: string;
  from?: string;
}

const SUPPORT_EMAIL = "support@zwanski.org";
const CONTACT_EMAIL = "contact@zwanski.org";

const maskEmail = (email: string): string => {
  const [local, domain] = email.split("@");
  if (!local || !domain) return email;
  return `${local[0]}***@${domain}`;
};

/**
 * Handles customer email requests.
 *
 * Logging best practices:
 * - Avoid logging personally identifiable information (PII) such as full email addresses.
 * - Mask or redact sensitive data before logging.
 * - Log only what is necessary for debugging and monitoring.
 */
const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { to, subject, html, type, customerName, from }: CustomerEmailRequest = await req.json();

    // Log intent to send, mask the email for privacy
    console.log(`Sending ${type} email to ${maskEmail(to)}`);
    logflare({ message: 'Sending customer email', type, to: maskEmail(to) });

    // Determine sender email based on type or provided from address
    const getSenderEmail = (emailType: string, providedFrom?: string): string => {
      if (providedFrom) return providedFrom;
      switch (emailType) {
        case 'general-inquiry':
        case 'business-contact':
        case 'contact-confirmation':
          return CONTACT_EMAIL;
        case 'service-update':
        case 'thank-you':
        default:
          return SUPPORT_EMAIL;
      }
    };

    const senderEmail = getSenderEmail(type, from);

    const emailConfig = {
      from: senderEmail,
      to: [to],
      subject,
      html,
    };

    const emailResponse = await resend.emails.send(emailConfig);

    console.log("Email sent successfully with ID:", emailResponse.data?.id);
    logflare({ message: 'Email sent successfully', emailId: emailResponse.data?.id });

    return new Response(JSON.stringify({
      success: true,
      emailId: emailResponse.data?.id
    }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : String(error);
    console.error("Error in send-customer-email function:", message);
    logflare({ message: 'Error in send-customer-email', error: message, level: 'error' });

    return new Response(
      JSON.stringify({ error: message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
