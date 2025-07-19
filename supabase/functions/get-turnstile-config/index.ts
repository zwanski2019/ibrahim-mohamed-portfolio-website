
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const TURNSTILE_SITE_KEY = Deno.env.get('CLOUDFLARE_TURNSTILE_SITE_KEY');
    
    if (!TURNSTILE_SITE_KEY) {
      console.error('CLOUDFLARE_TURNSTILE_SITE_KEY not found in environment');
      return new Response(
        JSON.stringify({ error: 'Turnstile configuration not found' }),
        {
          status: 500,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    }

    return new Response(
      JSON.stringify({
        siteKey: TURNSTILE_SITE_KEY,
      }),
      {
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );

  } catch (error) {
    console.error('Error getting Turnstile config:', error);
    return new Response(
      JSON.stringify({ error: 'Failed to get Turnstile configuration' }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});
