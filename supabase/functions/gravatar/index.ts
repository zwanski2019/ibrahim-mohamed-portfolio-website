import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createHash } from "https://deno.land/std@0.168.0/hash/md5.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Parse out the email from query params
    const url = new URL(req.url);
    const email = url.searchParams.get('email');
    if (!email) {
      return new Response(
        JSON.stringify({ error: 'Email is required' }),
        {
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    }

    // Optional: require an API key (if you have one configured)
    const apiKey = Deno.env.get('GRAVATAR_API_KEY');
    if (!apiKey) {
      console.error('GRAVATAR_API_KEY not found in environment variables');
      return new Response(
        JSON.stringify({ error: 'Service configuration error' }),
        {
          status: 500,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    }

    // Compute MD5 hash of the trimmed, lowercased email
    const hash = createHash('md5')
      .update(email.trim().toLowerCase())
      .toString();

    // Fetch the Gravatar profile JSON
    const profileRes = await fetch(
      `https://www.gravatar.com/${hash}.json?apikey=${apiKey}`
    );
    if (!profileRes.ok) {
      console.error(
        'Gravatar API error:',
        profileRes.status,
        profileRes.statusText
      );
      return new Response(
        JSON.stringify({ error: 'Gravatar service is currently unavailable' }),
        {
          status: 502,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    }

    const profile = await profileRes.json();

    return new Response(JSON.stringify(profile), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (err) {
    console.error('Error in gravatar function:', err);
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});
