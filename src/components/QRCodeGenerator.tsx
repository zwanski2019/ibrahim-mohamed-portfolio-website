import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function QRCodeGenerator() {
  const [text, setText] = useState("");
  const [qrUrl, setQrUrl] = useState<string | null>(null);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!text.trim()) return;
    setQrUrl(`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(text)}`);
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>QR Code Generator</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <label htmlFor="qr-text" className="block mb-1 text-sm font-medium">
              Text or URL
            </label>
            <Input
              id="qr-text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Enter text or URL"
            />
          </div>
          <Button type="submit">Generate</Button>
        </form>
        {qrUrl && (
          <img src={qrUrl} alt="QR Code" className="mx-auto" />
        )}
      </CardContent>
    </Card>
  );
}
