import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Loader2 } from "lucide-react";

export default function GameGenerator() {
  const [prompt, setPrompt] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setResult("");
    try {
      const { data, error } = await supabase.functions.invoke("chatgpt-tools", {
        body: { tool: "game", prompt },
      });
      if (error) throw error;
      setResult(data.result || "No response received.");
    } catch (err) {
      setResult("Failed to generate a game. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Mini-Game Generator</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <label htmlFor="game-prompt" className="block mb-1 text-sm font-medium">
              Game Idea
            </label>
            <Textarea
              id="game-prompt"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Describe the type of game"
              rows={4}
            />
          </div>
          <Button type="submit" disabled={loading} className="flex items-center">
            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {loading ? "Generating..." : "Generate"}
          </Button>
        </form>
        {result && (
          <div className="prose max-w-none bg-muted/50 p-4 rounded" aria-live="polite">
            {result}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
