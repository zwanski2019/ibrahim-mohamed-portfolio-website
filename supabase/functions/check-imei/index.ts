import { serve, type ConnInfo } from "https://deno.land/std@0.168.0/http/server.ts";
import { logflare } from "../_shared/logflare.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Rate limiting configuration. Adjust MAX_REQUESTS_PER_WINDOW or
// RATE_LIMIT_WINDOW_MS to change the allowed request rate.
const RATE_LIMIT_WINDOW_MS = 60 * 1000; // 1 minute
const MAX_REQUESTS_PER_WINDOW = 60; // requests per window
const requestCounts = new Map<string, { count: number; start: number }>();

serve(async (req: Request, conn: ConnInfo) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  // Identify the requester
  const ip = req.headers.get("x-forwarded-for") ?? conn.remoteAddr.hostname;
  const identifier =
    req.headers.get("x-user-id") ?? req.headers.get("x-client-info") ?? ip;

  // Rate limiting
  const now = Date.now();
  const record = requestCounts.get(identifier);
  if (!record || now - record.start >= RATE_LIMIT_WINDOW_MS) {
    requestCounts.set(identifier, { count: 1, start: now });
  } else {
    if (record.count >= MAX_REQUESTS_PER_WINDOW) {
      return new Response(
        JSON.stringify({ error: "Too Many Requests" }),
        {
          status: 429,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        },
      );
    }
    record.count++;
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

    // Get API key from environment
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
    const timeout = setTimeout(() => controller.abort(), 10_000);
    let response: Response;
    try {
      response = await fetch('https://api.ifreeicloud.co.uk', {
        method: 'POST',
        body: formData,
        signal: controller.signal,
      });
    } catch (err: any) {
      clearTimeout(timeout);
      if (err.name === 'AbortError') {
        console.error('IMEI API request timed out');
        return new Response(
          JSON.stringify({ error: 'IMEI check service timed out' }),
          {
            status: 504,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          }
        );
      }
      throw err;
    }
    clearTimeout(timeout);

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

  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : String(error);
    console.error('Error in check-imei function:', msg);
    logflare({ message: 'Error in check-imei function', error: msg, level: 'error' });
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );
  }
});
