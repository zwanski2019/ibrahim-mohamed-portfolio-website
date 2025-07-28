import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const ALLOWED_ORIGINS = Deno.env.get("ALLOWED_ORIGINS") ?? "https://zwanski.org";
const BLOGGER_API_KEY = Deno.env.get("BLOGGER_API_KEY");
const BLOGGER_BLOG_ID = Deno.env.get("BLOGGER_BLOG_ID");
const BLOGGER_API_URL = "https://www.googleapis.com/blogger/v3";

const corsHeaders = {
  "Access-Control-Allow-Origin": ALLOWED_ORIGINS,
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Content-Type": "application/json",
};

function buildError(status: number, message: string): Response {
  return new Response(JSON.stringify({ error: message }), {
    status,
    headers: corsHeaders,
  });
}

async function fetchFromBlogger(path: string, params: URLSearchParams): Promise<Response> {
  if (!BLOGGER_API_KEY || !BLOGGER_BLOG_ID) {
    return buildError(500, "Server configuration error");
  }
  params.set("key", BLOGGER_API_KEY);
  const url = `${BLOGGER_API_URL}/blogs/${BLOGGER_BLOG_ID}${path}?${params.toString()}`;
  const res = await fetch(url);
  if (!res.ok) {
    return buildError(res.status, `Blogger API error: ${res.status}`);
  }
  const data = await res.json();
  return new Response(JSON.stringify(data), {
    headers: corsHeaders,
  });
}

serve(async (req) => {
  // Handle CORS preflight
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  const url = new URL(req.url);
  let path = url.pathname;
  if (path.startsWith("/blogger-proxy")) {
    path = path.slice("/blogger-proxy".length);
  }

  try {
    // List posts: GET /blogger-proxy/posts?maxResults=...&pageToken=...
    if (path === "/posts") {
      const params = new URLSearchParams({
        maxResults: url.searchParams.get("maxResults") ?? "12",
        orderBy: "published",
        fetchImages: "true",
        fetchBodies: "true",
      });
      const pageToken = url.searchParams.get("pageToken");
      if (pageToken) params.set("pageToken", pageToken);
      return await fetchFromBlogger("/posts", params);
    }

    // Get single post: GET /blogger-proxy/posts/{postId}
    const postMatch = path.match(/^\/posts\/(.+)$/);
    if (postMatch) {
      const params = new URLSearchParams({
        fetchImages: "true",
        fetchBodies: "true",
      });
      return await fetchFromBlogger(`/posts/${postMatch[1]}`, params);
    }

    // Search posts: GET /blogger-proxy/search?q=...&maxResults=...
    if (path === "/search") {
      const q = url.searchParams.get("q");
      if (!q) {
        return buildError(400, "Missing search query");
      }
      const params = new URLSearchParams({
        q,
        maxResults: url.searchParams.get("maxResults") ?? "12",
        orderBy: "published",
        fetchImages: "true",
        fetchBodies: "true",
      });
      return await fetchFromBlogger("/posts/search", params);
    }

    // Not found
    return buildError(404, "Not found");
  } catch (err) {
    console.error("blogger-proxy error", err);
    return buildError(500, "Internal server error");
  }
});
