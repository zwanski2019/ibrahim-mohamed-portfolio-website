import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createHash } from "node:crypto";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

export async function gravatarHandler(req: Request): Promise<Response> {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { email } = await req.json();
    if (!email) {
      return new Response(
        JSON.stringify({ error: 'Email is required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } },
      );
    }

    const hash = createHash('md5').update(email.trim().toLowerCase()).digest('hex');
    const profileRes = await fetch(`https://www.gravatar.com/${hash}.json`);

    if (!profileRes.ok) {
      return new Response(
        JSON.stringify({ error: 'Failed to fetch profile' }),
        { status: 502, headers: { ...corsHeaders, 'Content-Type': 'application/json' } },
      );
    }

    let profile;
    try {
      profile = await profileRes.json();
    } catch (_e) {
      return new Response(
        JSON.stringify({ error: 'Failed to fetch profile' }),
        { status: 502, headers: { ...corsHeaders, 'Content-Type': 'application/json' } },
      );
    }

    return new Response(
      JSON.stringify(profile),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } },
    );
  } catch (_e) {
    return new Response(
      JSON.stringify({ error: 'Invalid request' }),
      { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } },
    );
  }
}

if (import.meta.main) {
  serve(gravatarHandler);
}
