import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Loader2 } from "lucide-react";

export default function CVGenerator() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setResult("");
    try {
      const { data, error } = await supabase.functions.invoke("chatgpt-tools", {
        body: { tool: "cv", prompt: input },
      });
      if (error) throw error;
      setResult(data.result || "No response received.");
    } catch (err) {
      setResult("Failed to generate CV. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    async function generatePdf(text: string) {
      const { data, error } = await supabase.functions.invoke("generate-pdf", {
        body: { text },
      });
      if (error) {
        console.error(error);
        return;
      }
      if (data?.pdf) {
        const binary = Uint8Array.from(atob(data.pdf), (c) => c.charCodeAt(0));
        const blob = new Blob([binary], { type: "application/pdf" });
        setPdfUrl(URL.createObjectURL(blob));
      }
    }

    if (result) {
      generatePdf(result);
    } else {
      setPdfUrl(null);
    }
  }, [result]);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>CV Generator</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <label className="block mb-1 text-sm font-medium" htmlFor="cv-input">
              Career Details
            </label>
            <Textarea
              id="cv-input"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Describe your skills and experience"
              rows={5}
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
        {pdfUrl && (
          <a href={pdfUrl} download="cv.pdf">
            <Button variant="secondary">Download PDF</Button>
          </a>
        )}
      </CardContent>
    </Card>
  );
}
