import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";

const URLShortener = () => {
  const [url, setUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [loading, setLoading] = useState(false);

  const shorten = async () => {
    if (!url) return;
    setLoading(true);
    setShortUrl("");
    try {
      const res = await fetch(`https://tinyurl.com/api-create.php?url=${encodeURIComponent(url)}`);
      const text = await res.text();
      setShortUrl(text);
    } catch {
      setShortUrl("Failed to shorten URL");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>URL Shortener</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Input
          placeholder="Enter URL"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
        <Button type="button" onClick={shorten} disabled={loading} className="flex items-center">
          {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {loading ? "Shortening..." : "Shorten"}
        </Button>
        {shortUrl && (
          <Input readOnly value={shortUrl} className="font-mono" />
        )}
      </CardContent>
    </Card>
  );
};

export default URLShortener;
