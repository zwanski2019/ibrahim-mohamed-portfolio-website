import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@4.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const ALLOWED_ORIGINS = Deno.env.get("ALLOWED_ORIGINS") ?? "https://zwanski.org";

const corsHeaders = {
  "Access-Control-Allow-Origin": ALLOWED_ORIGINS,
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

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { to, subject, html, type, customerName, from }: CustomerEmailRequest = await req.json();

    console.log(`Sending ${type} email to ${to}`);

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

    
    const emailConfig: any = {
      from: senderEmail,
      to: [to],
      subject,
      html,
    };

    const emailResponse = await resend.emails.send(emailConfig);

    console.log("Email sent successfully:", emailResponse);

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
  } catch (error: any) {
    console.error("Error in send-customer-email function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);