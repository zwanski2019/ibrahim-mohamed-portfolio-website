
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  console.log('get-hcaptcha-config function called:', req.method);
  
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const HCAPTCHA_SITE_KEY = Deno.env.get('HCAPTCHA_SITE_KEY');

    console.log('HCAPTCHA_SITE_KEY found:', !!HCAPTCHA_SITE_KEY);

    if (!HCAPTCHA_SITE_KEY) {
      console.error('HCAPTCHA_SITE_KEY not found in environment');
      
      // Return a fallback response instead of error to prevent blocking
      return new Response(
        JSON.stringify({ 
          siteKey: null,
          error: 'hCaptcha configuration not available',
          fallback: true 
        }),
        {
          status: 200, // Changed from 500 to 200 to prevent blocking
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    }

    console.log('Returning site key successfully');
    return new Response(
      JSON.stringify({
        siteKey: HCAPTCHA_SITE_KEY,
        success: true
      }),
      {
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );

  } catch (error) {
    console.error('Error getting hCaptcha config:', error);
    
    // Return fallback instead of error to prevent blocking
    return new Response(
      JSON.stringify({ 
        siteKey: null,
        error: 'Failed to get hCaptcha configuration',
        fallback: true 
      }),
      {
        status: 200, // Changed from 500 to 200
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});
