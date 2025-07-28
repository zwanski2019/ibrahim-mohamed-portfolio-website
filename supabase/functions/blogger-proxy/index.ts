import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const ALLOWED_ORIGINS = Deno.env.get("ALLOWED_ORIGINS") ?? "https://zwanski.org";
const BLOGGER_API_KEY = Deno.env.get("BLOGGER_API_KEY");
const BLOGGER_BLOG_ID = Deno.env.get("BLOGGER_BLOG_ID");
const BLOGGER_API_URL = "https://www.googleapis.com/blogger/v3";

const corsHeaders = {
  "Access-Control-Allow-Origin": ALLOWED_ORIGINS,
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

async function handleList(body: any) {
  const params = new URLSearchParams({
    key: BLOGGER_API_KEY!,
    orderBy: "published",
    fetchImages: "true",
    fetchBodies: "true",
    maxResults: String(body?.maxResults ?? 12),
  });
  if (body?.pageToken) params.append("pageToken", body.pageToken);
  const res = await fetch(`${BLOGGER_API_URL}/blogs/${BLOGGER_BLOG_ID}/posts?${params}`);
  if (!res.ok) throw new Error(`HTTP error: ${res.status}`);
  const data = await res.json();
  return {
    items: data.items || [],
    nextPageToken: data.nextPageToken,
    prevPageToken: data.prevPageToken,
  };
}

async function handleGet(postId: string) {
  const params = new URLSearchParams({
    key: BLOGGER_API_KEY!,
    fetchImages: "true",
    fetchBodies: "true",
  });
  const res = await fetch(`${BLOGGER_API_URL}/blogs/${BLOGGER_BLOG_ID}/posts/${postId}?${params}`);
  if (!res.ok) throw new Error(`HTTP error: ${res.status}`);
  return await res.json();
}

async function handleSearch(body: any) {
  const params = new URLSearchParams({
    key: BLOGGER_API_KEY!,
    q: body?.query ?? "",
    orderBy: "published",
    fetchImages: "true",
    fetchBodies: "true",
    maxResults: String(body?.maxResults ?? 12),
  });
  const res = await fetch(`${BLOGGER_API_URL}/blogs/${BLOGGER_BLOG_ID}/posts/search?${params}`);
  if (!res.ok) throw new Error(`HTTP error: ${res.status}`);
  const data = await res.json();
  return {
    items: data.items || [],
    nextPageToken: data.nextPageToken,
    prevPageToken: data.prevPageToken,
  };
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  if (!BLOGGER_API_KEY || !BLOGGER_BLOG_ID) {
    return new Response(
      JSON.stringify({ error: "Server configuration error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }

  const url = new URL(req.url);
  const segments = url.pathname.replace(/^\/blogger-proxy/, "").split("/").filter(Boolean);
  try {
    let result;
    if (segments[0] === "posts" && segments.length === 1) {
      const body = await req.json().catch(() => ({}));
      result = await handleList(body);
    } else if (segments[0] === "posts" && segments.length === 2) {
      result = await handleGet(segments[1]);
    } else if (segments[0] === "search") {
      const body = await req.json().catch(() => ({}));
      result = await handleSearch(body);
    } else {
      return new Response("Not Found", { status: 404, headers: corsHeaders });
    }

    return new Response(JSON.stringify(result), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("blogger-proxy error", err);
    return new Response(
      JSON.stringify({ error: "Internal server error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
