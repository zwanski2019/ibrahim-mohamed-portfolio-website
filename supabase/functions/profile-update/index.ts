import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-csrf-token",
  "Access-Control-Allow-Credentials": "true",
};

function getCookie(req: Request, name: string): string | undefined {
  const cookie = req.headers.get("Cookie");
  return cookie
    ?.split("; ")
    .find((c) => c.startsWith(`${name}=`))
    ?.split("=")[1];
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  const csrfCookie = getCookie(req, "csrf-token");
  const csrfHeader = req.headers.get("x-csrf-token");

  if (!csrfCookie || !csrfHeader || csrfCookie !== csrfHeader) {
    return new Response(
      JSON.stringify({ error: "Invalid CSRF token" }),
      { status: 403, headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  }

  try {
    const { id, ...profileData } = await req.json();

    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    const { data, error } = await supabase
      .from("freelancer_profiles")
      .update(profileData)
      .eq("id", id)
      .select()
      .single();

    if (error) {
      return new Response(
        JSON.stringify({ error: error.message }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    return new Response(
      JSON.stringify({ data }),
      {
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
          "Set-Cookie": `csrf-token=${crypto.randomUUID()}; Path=/; HttpOnly; SameSite=Strict`,
        },
      },
    );
  } catch (err) {
    return new Response(
      JSON.stringify({ error: "Internal server error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  }
});
