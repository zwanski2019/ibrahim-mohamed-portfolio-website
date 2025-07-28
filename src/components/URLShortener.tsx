import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";

export default function URLShortener() {
  const [url, setUrl] = useState("");
  const [shortUrl, setShortUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!url.trim()) return;
    setLoading(true);
    setShortUrl(null);
    try {
      const res = await fetch(`https://is.gd/create.php?format=simple&url=${encodeURIComponent(url)}`);
      const text = await res.text();
      setShortUrl(text);
    } catch {
      setShortUrl("Failed to shorten URL");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>URL Shortener</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <label htmlFor="long-url" className="block mb-1 text-sm font-medium">
              Long URL
            </label>
            <Input
              id="long-url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://example.com/very/long/url"
            />
          </div>
          <Button type="submit" disabled={loading} className="flex items-center">
            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {loading ? "Shortening..." : "Shorten"}
          </Button>
        </form>
        {shortUrl && (
          <div className="p-4 bg-muted/50 rounded break-all" aria-live="polite">
            <a href={shortUrl} target="_blank" rel="noopener noreferrer" className="underline text-primary">
              {shortUrl}
            </a>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
