import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@4.0.0";

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

const TRUSTPILOT_BCC = "zwanski.org+7beee01bb3@invite.trustpilot.com";
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

    // Determine if this should include Trustpilot BCC (only for customer-facing emails)
    const shouldBccTrustpilot = type !== 'internal';
    
    const emailConfig: any = {
      from: senderEmail,
      to: [to],
      subject,
      html,
    };

    // Add Trustpilot BCC for customer-facing emails to trigger review invitations
    if (shouldBccTrustpilot) {
      emailConfig.bcc = [TRUSTPILOT_BCC];
      console.log(`Adding Trustpilot BCC for ${type} email`);
    }

    const emailResponse = await resend.emails.send(emailConfig);

    console.log("Email sent successfully:", emailResponse);

    return new Response(JSON.stringify({ 
      success: true, 
      emailId: emailResponse.data?.id,
      trustpilotTriggered: shouldBccTrustpilot 
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