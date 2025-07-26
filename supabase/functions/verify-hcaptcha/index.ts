import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface HCaptchaResponse {
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
  console.log('hCaptcha verification request received');
    const { token } = await req.json();

    if (!token) {
      console.error('No token provided in request');
      return new Response(
        JSON.stringify({ success: false, error: 'Token is required' }),
        {
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    }

    const HCAPTCHA_SECRET = Deno.env.get('HCAPTCHA_SECRET_KEY');
    
    if (!HCAPTCHA_SECRET) {
      console.error('HCAPTCHA_SECRET_KEY not found in environment');
      return new Response(
        JSON.stringify({ success: false, error: 'Server config missing' }),
        {
          status: 500,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    }

    console.log('Sending verification request to hCaptcha');

    // Verify the token with hCaptcha with timeout
    const formData = new FormData();
    formData.append('secret', HCAPTCHA_SECRET);
    formData.append('response', token);

    const verifyResponse = await Promise.race([
      fetch('https://hcaptcha.com/siteverify', {
        method: 'POST',
        body: formData,
      }),
      new Promise((_, reject) =>
        setTimeout(() => reject(new Error('Verification timeout')), 10000)
      )
    ]);

    if (!verifyResponse.ok) {
      console.error('hCaptcha verification request failed:', verifyResponse.status);
      throw new Error(`Verification request failed: ${verifyResponse.status}`);
    }

    const result: HCaptchaResponse = await verifyResponse.json();

    console.log('hCaptcha verification result:', {
      success: result.success,
      errors: result['error-codes'] || [],
      hostname: result.hostname,
      action: result.action
    });

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
    console.error('Error verifying hCaptcha token:', {
      message: error.message,
      stack: error.stack,
      name: error.name
    });
    
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: error.message === 'Verification timeout' 
          ? 'Verification timeout - please try again' 
          : 'Verification failed - please try again'
      }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});