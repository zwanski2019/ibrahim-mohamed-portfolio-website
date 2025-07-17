import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface TurnstileResponse {
  success: boolean;
  challenge_ts?: string;
  hostname?: string;
  'error-codes'?: string[];
  action?: string;
  cdata?: string;
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { token } = await req.json();

    if (!token) {
      return new Response(
        JSON.stringify({ success: false, error: 'Token is required' }),
        {
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    }

    const TURNSTILE_SECRET = Deno.env.get('CLOUDFLARE_TURNSTILE_SECRET_KEY');
    
    if (!TURNSTILE_SECRET) {
      console.error('CLOUDFLARE_TURNSTILE_SECRET_KEY not found in environment');
      return new Response(
        JSON.stringify({ success: false, error: 'Server configuration error' }),
        {
          status: 500,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    }

    // Verify the token with Cloudflare
    const formData = new FormData();
    formData.append('secret', TURNSTILE_SECRET);
    formData.append('response', token);

    const verifyResponse = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'POST',
      body: formData,
    });

    const result: TurnstileResponse = await verifyResponse.json();

    console.log('Turnstile verification result:', result);

    return new Response(
      JSON.stringify({
        success: result.success,
        errors: result['error-codes'] || [],
      }),
      {
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );

  } catch (error) {
    console.error('Error verifying Turnstile token:', error);
    return new Response(
      JSON.stringify({ success: false, error: 'Verification failed' }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});