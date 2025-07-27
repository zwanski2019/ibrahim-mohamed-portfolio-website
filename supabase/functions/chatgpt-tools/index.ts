import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

console.log("chatgpt-tools worker starting");

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    const res = new Response(null, { headers: corsHeaders });
    console.log("chatgpt-tools response sent (options)");
    return res;
  }

  try {
    const { prompt, tool } = await req.json();
    console.log("chatgpt-tools request tool", tool);

    if (!prompt) {
      console.log("chatgpt-tools response sent (missing prompt)");
      return new Response(
        JSON.stringify({ error: "Prompt is required" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const OPENAI_API_KEY = Deno.env.get("OPENAI_API_KEY");
    if (!OPENAI_API_KEY) {
      console.log("chatgpt-tools response sent (config error)");
      return new Response(
        JSON.stringify({ error: "Server configuration error" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const messages = [
      { role: "system", content: "You are a helpful assistant." },
      { role: "user", content: prompt },
    ];

    switch (tool) {
      case "cv":
        messages.unshift({
          role: "system",
          content: "Generate a concise professional CV based on the user input.",
        });
        break;
      case "seo":
        messages.unshift({
          role: "system",
          content: "Act as an SEO expert and analyse the provided text.",
        });
        break;
      case "mental":
        messages.unshift({
          role: "system",
          content: "Provide supportive mental health advice.",
        });
        break;
      case "student":
        messages.unshift({
          role: "system",
          content:
            "Act as a helpful tutor and answer the student's question in a clear and concise manner.",
        });
        break;
      case "code":
        messages.unshift({
          role: "system",
          content: "Explain the provided code snippet in clear, simple terms.",
        });
        break;
      case "game":
        messages.unshift({
          role: "system",
          content:
            "Generate a short concept or instructions for a simple text-based mini-game based on the user's idea.",
        });
        break;
      case "vuln":
        messages.unshift({
          role: "system",
          content:
            "Identify potential security vulnerabilities in the provided text and suggest improvements.",
        });
        break;
      case "language":
        messages.unshift({
          role: "system",
          content:
            "Assist with language learning queries, providing grammar explanations and examples.",
        });
        break;
      case "video":
        messages.unshift({
          role: "system",
          content:
            "Suggest educational video topics or titles related to the user's query.",
        });
        break;
      default:
        break;
    }

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages,
      }),
    });

    if (!response.ok) {
      throw new Error(`OpenAI API error: ${response.status}`);
    }

    const result = await response.json();
    const answer = result.choices?.[0]?.message?.content || "";

    const res = new Response(
      JSON.stringify({ result: answer }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
    console.log("chatgpt-tools response sent");
    return res;
  } catch (err) {
    console.error("chatgpt-tools error", err);
    const isDevelopment = Deno.env.get("NODE_ENV") === "development";
    const errorPayload =
      isDevelopment && err instanceof Error
        ? { error: err.message }
        : { error: "Internal server error" };

    const res = new Response(
      JSON.stringify(errorPayload),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
    console.log("chatgpt-tools response sent (error)");
    return res;
  }
});
