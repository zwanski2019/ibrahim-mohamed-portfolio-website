import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.50.0';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface TurnstileVerifyResponse {
  success: boolean;
  'error-codes'?: string[];
  challenge_ts?: string;
  hostname?: string;
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log('Turnstile verification request received');
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

    console.log('Sending verification request to Cloudflare Turnstile');

    // Verify the token with Cloudflare Turnstile
    const formData = new FormData();
    formData.append('secret', TURNSTILE_SECRET);
    formData.append('response', token);

    const verifyResponse = await Promise.race([
      fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
        method: 'POST',
        body: formData,
      }),
      new Promise((_, reject) =>
        setTimeout(() => reject(new Error('Verification timeout')), 10000)
      )
    ]);

    if (!verifyResponse.ok) {
      console.error('Turnstile verification request failed:', verifyResponse.status);
      throw new Error(`Verification request failed: ${verifyResponse.status}`);
    }

    const result: TurnstileVerifyResponse = await verifyResponse.json();

    console.log('Turnstile verification result:', {
      success: result.success,
      errors: result['error-codes'] || [],
      hostname: result.hostname,
      challenge_ts: result.challenge_ts
    });

    // Initialize Supabase client for logging
    const supabaseUrl = Deno.env.get('SUPABASE_URL');
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');
    
    if (supabaseUrl && supabaseServiceKey) {
      const supabase = createClient(supabaseUrl, supabaseServiceKey);
      
      // Log the verification attempt
      await supabase.from('turnstile_logs').insert({
        token: token.substring(0, 20) + '...', // Log only first 20 chars for privacy
        success: result.success,
        errors: result['error-codes'] || null,
        hostname: result.hostname || null,
        challenge_ts: result.challenge_ts || null
      });

      // Log security event
      await supabase.from('security_events').insert({
        event_type: 'turnstile_verification',
        event_data: {
          success: result.success,
          errors: result['error-codes'] || [],
          hostname: result.hostname
        }
      });
    }

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
    console.error('Error verifying Turnstile token:', {
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