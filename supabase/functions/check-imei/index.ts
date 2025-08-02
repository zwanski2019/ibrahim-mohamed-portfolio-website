
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { logflare } from "../_shared/logflare.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { imei, service = 'basic' } = await req.json();

    if (!imei) {
      return new Response(
        JSON.stringify({ error: 'IMEI number is required' }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    // Get API key from Supabase secrets
    const apiKey = Deno.env.get('IMEI_API_KEY');
    if (!apiKey) {
      console.error('IMEI_API_KEY not found in environment variables');
      return new Response(
        JSON.stringify({ error: 'Service configuration error' }),
        { 
          status: 500, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    console.log('Checking IMEI:', imei, 'with service:', service);
    logflare({ message: 'Checking IMEI', imei, service });

    // Prepare form data for the API request
    const formData = new FormData();
    formData.append('service', service);
    formData.append('imei', imei);
    formData.append('key', apiKey);

    // Make request to IMEI API with timeout
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 10000);
    let response;
    try {
      response = await fetch('https://api.ifreeicloud.co.uk', {
        method: 'POST',
        body: formData,
        signal: controller.signal,
      });
    } catch (err) {
      if (err.name === 'AbortError') {
        console.error('IMEI API request timed out');
        return new Response(
          JSON.stringify({ error: 'IMEI check service timed out' }),
          {
            status: 504,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' }
          }
        );
      }
      throw err;
    } finally {
      clearTimeout(timeout);
    }

    if (!response.ok) {
      console.error('IMEI API error:', response.status, response.statusText);
      logflare({
        message: 'IMEI API error',
        status: response.status,
        statusText: response.statusText,
        level: 'error',
      });
      return new Response(
        JSON.stringify({ error: 'IMEI check service is currently unavailable' }),
        { 
          status: 502, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    const result = await response.text();
    console.log('IMEI API response:', result);
    logflare({ message: 'IMEI API response', result });

    return new Response(
      JSON.stringify({ result }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );

  } catch (error) {
    console.error('Error in check-imei function:', error);
    logflare({ message: 'Error in check-imei function', error: String(error), level: 'error' });
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );
  }
});
